"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createRealtimeClient } from "@neon/realtime/client";
// @neon/realtime-react has no "use client" directive: import it only from client modules.
import { RealtimeProvider, useLiveQuery } from "@neon/realtime-react";
import { applyRemoteValue, setSyncSink } from "@/lib/storage";
import { isSyncableKey, MAX_SYNC_BATCH } from "@/lib/syncKeys";

// Signed in: mirrors localStorage progress to Neon Postgres (PUT /api/progress) and pulls
// other devices' changes live through Neon Realtime. Signed out: renders nothing.
const FLUSH_DELAY_MS = 800;
const SESSION_EVENT = "iprep-session";

// Every session change (sign-out, a different user, a refused renewal) is a full page load to /,
// per Neon Realtime guidance: it drops the Realtime client and the previous user's rows.
// router.push() would keep both in memory, hence the deliberate hard navigation.
export function leaveSession(to = "/") {
  window.location.assign(to);
}

export const announceSession = (session) =>
  window.dispatchEvent(new CustomEvent(SESSION_EVENT, { detail: session }));

export function onSession(listener) {
  const handler = (e) => listener(e.detail);
  window.addEventListener(SESSION_EVENT, handler);
  return () => window.removeEventListener(SESSION_EVENT, handler);
}

async function fetchSealed(userId) {
  const res = await fetch("/api/progress/live", {
    method: "POST",
    cache: "no-store",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userId ? { userId } : {}),
  });
  if (res.status === 401) return null;
  if (!res.ok) throw new Error(`Live sync unavailable (${res.status})`);
  const body = await res.json();
  return body.signedIn === false ? null : body;
}

function localSyncableEntries() {
  const entries = [];
  try {
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (!isSyncableKey(key)) continue;
      entries.push({ key, value: JSON.parse(window.localStorage.getItem(key)) });
    }
  } catch {
    // storage blocked or a malformed value — sync what we could read
  }
  return entries;
}

// Debounced, de-duplicated batch writer. `known` holds the last JSON the server has for each
// key, so unchanged rewrites (e.g. usePersistentState writing back on mount) aren't sent.
function createOutbox(known) {
  const pending = new Map();
  let timer = null;

  async function flush() {
    timer = null;
    const batch = [...pending.entries()].slice(0, MAX_SYNC_BATCH);
    batch.forEach(([key]) => pending.delete(key));
    if (batch.length === 0) return;
    const entries = batch.map(([key, value]) => ({ key, value }));
    try {
      const res = await fetch("/api/progress", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entries }),
      });
      if (res.status === 401) {
        leaveSession(); // session ended in another tab
        return;
      }
      if (!res.ok) throw new Error(`status ${res.status}`);
      entries.forEach(({ key, value }) => known.set(key, JSON.stringify(value)));
    } catch (err) {
      console.warn("[cloud-sync] save failed, will retry on next change:", err.message);
      entries.forEach(({ key, value }) => { if (!pending.has(key)) pending.set(key, value); });
    }
    if (pending.size) schedule();
  }

  function schedule() {
    if (!timer) timer = setTimeout(flush, FLUSH_DELAY_MS);
  }

  return {
    push(key, value) {
      if (!isSyncableKey(key) || known.get(key) === JSON.stringify(value)) return;
      pending.set(key, value);
      schedule();
    },
    isPending: (key) => pending.has(key),
    cancel: () => clearTimeout(timer),
  };
}

function LiveProgress({ session }) {
  const [sealed] = useState(session.sealed); // keep the first; renewals go through refreshQuery
  const [known] = useState(() => new Map());
  const outbox = useRef(null);
  const bootstrapped = useRef(false);

  const refreshQuery = useCallback(async () => {
    const next = await fetchSealed(session.userId);
    if (!next) {
      leaveSession(); // signed out, or a different user signed in
      throw new Error("Signed out");
    }
    return next.sealed;
  }, [session.userId]);

  const { data, status, error } = useLiveQuery(sealed, { refreshQuery });

  useEffect(() => {
    outbox.current = createOutbox(known);
    setSyncSink((key, value) => outbox.current.push(key, value));
    return () => {
      setSyncSink(null);
      outbox.current.cancel();
    };
  }, [known]);

  useEffect(() => {
    if (!data) return;
    const serverKeys = new Set();
    for (const row of data) {
      serverKeys.add(row.key);
      const json = JSON.stringify(row.value);
      known.set(row.key, json);
      // Server wins unless this tab has an unsent local change for the key.
      if (outbox.current?.isPending(row.key)) continue;
      let local = null;
      try { local = window.localStorage.getItem(row.key); } catch { /* blocked */ }
      if (local !== json) applyRemoteValue(row.key, row.value);
    }
    if (!bootstrapped.current) {
      bootstrapped.current = true;
      // First sync on this device: upload local progress the cloud doesn't have yet.
      localSyncableEntries()
        .filter(({ key }) => !serverKeys.has(key))
        .forEach(({ key, value }) => outbox.current?.push(key, value));
    }
  }, [data, known]);

  useEffect(() => {
    announceSession({ email: session.email, userId: session.userId, status, error: error?.message });
  }, [session, status, error]);

  return null;
}

export default function CloudSync() {
  const [session, setSession] = useState(null);
  const [client, setClient] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchSealed()
      .then((s) => {
        if (cancelled) return;
        if (!s) {
          announceSession(null);
          return;
        }
        // One Realtime client per page load; creating it doesn't connect until subscribe.
        setClient(createRealtimeClient({ url: s.realtimeUrl }));
        setSession(s);
      })
      .catch((err) => {
        if (!cancelled) announceSession({ status: "error", error: err.message });
      });
    return () => { cancelled = true; };
  }, []);

  if (!session || !client) return null;
  return (
    <RealtimeProvider client={client}>
      <LiveProgress session={session} />
    </RealtimeProvider>
  );
}
