"use client";
import { useCallback, useEffect, useState } from "react";
import { Activity, FileText, LogOut, Trash2, Upload } from "lucide-react";
import { authClient } from "@/lib/auth/client";
import { leaveSession, onSession } from "@/components/CloudSync";
import { Badge, Button, Panel, PanelTitle } from "@/components/ui";

const KB = 1024;
const formatSize = (bytes) => (bytes >= KB * KB ? `${(bytes / KB / KB).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / KB))} KB`);
const SYNC_TONE = { live: "good", connecting: "neutral", error: "bad" };

async function readError(res) {
  try {
    return (await res.json()).error || `Request failed (${res.status})`;
  } catch {
    return `Request failed (${res.status})`;
  }
}

function SyncPanel() {
  const [sync, setSync] = useState(null);
  useEffect(() => onSession(setSync), []);
  const status = sync?.status || "connecting";
  return (
    <Panel>
      <PanelTitle icon={Activity} action={<Badge tone={SYNC_TONE[status]}>{status}</Badge>}>Live sync</PanelTitle>
      <p className="text-sm text-muted">
        Checklists, quiz scores, stories, flashcards and mock sessions are saved to Neon Postgres and stream to your
        other signed-in devices through Neon Realtime. Theme and sidebar layout stay per device.
      </p>
      {sync?.error && <p className="mt-2 text-sm text-bad">{sync.error}</p>}
    </Panel>
  );
}

function FilesPanel() {
  const [files, setFiles] = useState([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);
  const [version, setVersion] = useState(0);
  const load = useCallback(() => setVersion((v) => v + 1), []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/files", { cache: "no-store" })
      .then(async (res) => {
        if (cancelled) return;
        if (res.ok) setFiles((await res.json()).files);
        else setMessage(await readError(res));
      })
      .catch(() => { if (!cancelled) setMessage("Could not load files."); });
    return () => { cancelled = true; };
  }, [version]);

  async function upload(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setBusy(true);
    setMessage(null);
    const body = new FormData();
    body.append("file", file);
    const res = await fetch("/api/files", { method: "POST", body });
    setBusy(false);
    if (!res.ok) return setMessage(await readError(res));
    load();
  }

  async function open(key) {
    const res = await fetch(`/api/files?key=${encodeURIComponent(key)}`, { cache: "no-store" });
    if (!res.ok) return setMessage(await readError(res));
    window.open((await res.json()).url, "_blank", "noopener,noreferrer");
  }

  async function remove(key) {
    const res = await fetch(`/api/files?key=${encodeURIComponent(key)}`, { method: "DELETE" });
    if (!res.ok) return setMessage(await readError(res));
    load();
  }

  return (
    <Panel>
      <PanelTitle
        icon={FileText}
        action={
          <label className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border border-border bg-panel px-3 text-sm font-semibold text-fg hover:border-accent/60">
            <Upload size={14} /> {busy ? "Uploading…" : "Upload"}
            <input type="file" className="sr-only" disabled={busy} onChange={upload}
              accept=".pdf,.png,.jpg,.jpeg,.webp,.txt,.md,application/pdf,image/png,image/jpeg,image/webp,text/plain,text/markdown" />
          </label>
        }
      >
        Prep files
      </PanelTitle>
      <p className="text-sm text-muted">Résumé, offer letters, notes — stored privately in Neon Object Storage (max 4 MB each).</p>
      {message && <p role="alert" className="mt-2 text-sm text-bad">{message}</p>}
      <ul className="mt-3 divide-y divide-border">
        {files.length === 0 && <li className="py-2 text-sm text-subtle">No files yet.</li>}
        {files.map((f) => (
          <li key={f.key} className="flex items-center justify-between gap-3 py-2 text-sm">
            <button type="button" onClick={() => open(f.key)} className="min-w-0 truncate text-left font-medium text-accent hover:underline">
              {f.name}
            </button>
            <span className="flex shrink-0 items-center gap-2 text-subtle">
              {formatSize(f.size)}
              <button type="button" onClick={() => remove(f.key)} aria-label={`Delete ${f.name}`} className="rounded p-1 hover:bg-bad/10 hover:text-bad">
                <Trash2 size={14} />
              </button>
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

// Calls the `progress` Neon Function directly from the browser with a short-lived Neon Auth JWT.
function FunctionPanel({ functionUrl }) {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function run() {
    setError(null);
    setResult(null);
    const { data, error: tokenError } = await authClient.token();
    if (tokenError || !data?.token) return setError("Could not get a session token. Sign in again.");
    const res = await fetch(functionUrl, { headers: { Authorization: `Bearer ${data.token}` } });
    if (!res.ok) return setError(await readError(res));
    setResult(await res.json());
  }

  return (
    <Panel>
      <PanelTitle icon={Activity} action={<Button size="sm" variant="secondary" onClick={run} disabled={!functionUrl}>Run</Button>}>
        Cloud summary (Neon Function)
      </PanelTitle>
      {!functionUrl && <p className="text-sm text-bad">Function URL unavailable: run `neon env pull`.</p>}
      {error && <p role="alert" className="text-sm text-bad">{error}</p>}
      {result && (
        <p className="text-sm text-muted">
          {result.syncedKeys} synced items · last synced {result.lastSynced ? new Date(result.lastSynced).toLocaleString() : "never"} · branch {result.branch}
        </p>
      )}
    </Panel>
  );
}

export default function AccountPanels({ functionUrl }) {
  async function signOut() {
    await authClient.signOut();
    leaveSession();
  }
  return (
    <div className="flex flex-col gap-4">
      <SyncPanel />
      <FilesPanel />
      <FunctionPanel functionUrl={functionUrl} />
      <div>
        <Button variant="danger" onClick={signOut}><LogOut size={16} /> Sign out</Button>
      </div>
    </div>
  );
}
