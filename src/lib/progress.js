import "server-only";
import { createRealtime, pgParam, rawSql } from "@neon/realtime/server";
import { query } from "@/lib/db";
import { isSyncableKey, MAX_SYNC_BATCH, MAX_VALUE_BYTES } from "@/lib/syncKeys";

let realtime;

// Created on first use: `next build` imports this module without the runtime secrets.
function getRealtime() {
  if (!realtime) {
    realtime = createRealtime({
      secret: process.env.NEON_REALTIME_SECRET,
      db: new URL(process.env.DATABASE_URL).pathname.slice(1),
      debugMode: process.env.NODE_ENV === "development",
    });
  }
  return realtime;
}

// The live query is bound to the session's user id on the server, so the sealed token can
// only ever stream that user's rows. Deterministic, read-only, single SELECT (Realtime rules).
function progressQuery(userId) {
  return rawSql(
    "SELECT key, value, updated_at FROM user_progress WHERE user_id = $1 ORDER BY key",
    [pgParam.text("uuid", userId)]
  );
}

export const sealProgress = (userId) => getRealtime().seal({ query: progressQuery(userId) });

export async function readProgress(userId) {
  const { rows } = await query(
    "SELECT key, value, updated_at FROM user_progress WHERE user_id = $1 ORDER BY key",
    [userId]
  );
  return rows;
}

// Validates a PUT body into [{ key, json }] or returns { error }.
export function parseEntries(body) {
  const entries = Array.isArray(body?.entries) ? body.entries : null;
  if (!entries || entries.length === 0) return { error: "Body must be { entries: [{ key, value }] }." };
  if (entries.length > MAX_SYNC_BATCH) return { error: `At most ${MAX_SYNC_BATCH} entries per request.` };
  const parsed = [];
  for (const entry of entries) {
    if (!isSyncableKey(entry?.key)) return { error: `Key not allowed: ${String(entry?.key).slice(0, 60)}` };
    if (entry.value === undefined) return { error: `Missing value for ${entry.key}.` };
    const json = JSON.stringify(entry.value);
    if (Buffer.byteLength(json) > MAX_VALUE_BYTES) return { error: `Value too large for ${entry.key}.` };
    parsed.push({ key: entry.key, json });
  }
  return { entries: parsed };
}

// One upsert statement for the whole batch, so it commits as one transaction with one txid
// (returned for the client's optional awaitTxId()).
export async function writeProgress(userId, entries) {
  const { rows } = await query(
    `INSERT INTO user_progress (user_id, key, value, updated_at)
     SELECT $1::uuid, t.key, t.value::jsonb, now()
     FROM unnest($2::text[], $3::text[]) AS t(key, value)
     ON CONFLICT (user_id, key) DO UPDATE SET value = EXCLUDED.value, updated_at = EXCLUDED.updated_at
     RETURNING pg_current_xact_id()::text AS txid`,
    [userId, entries.map((e) => e.key), entries.map((e) => e.json)]
  );
  return rows[0]?.txid ?? null;
}
