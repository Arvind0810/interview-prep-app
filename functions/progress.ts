// Neon Function `progress`: returns a summary of the caller's synced progress.
// Public HTTPS URL, so the caller must present a Neon Auth JWT (authClient.token()),
// verified against the branch JWKS before any query runs. Data is scoped to the JWT's `sub`.
import { createRemoteJWKSet, jwtVerify } from "jose";
import { Pool } from "pg";
import { attachDatabasePool } from "@neon/functions";

const POOL_MAX = 5;
const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: POOL_MAX });
attachDatabasePool(pool);

const jwks = createRemoteJWKSet(new URL(process.env.NEON_AUTH_JWKS_URL!));
const issuer = new URL(process.env.NEON_AUTH_BASE_URL!).origin;
const allowedOrigins = new Set((process.env.ALLOWED_ORIGINS || "").split(",").filter(Boolean));

function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get("origin") || "";
  if (!allowedOrigins.has(origin)) return { Vary: "Origin" };
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": "authorization, content-type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    Vary: "Origin",
  };
}

function json(request: Request, status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store", ...corsHeaders(request) },
  });
}

async function verifiedUserId(request: Request): Promise<string | null> {
  const header = request.headers.get("authorization") || "";
  if (!header.toLowerCase().startsWith("bearer ")) return null;
  try {
    const { payload } = await jwtVerify(header.slice(7), jwks, { issuer });
    return typeof payload.sub === "string" && payload.sub ? payload.sub : null;
  } catch {
    return null;
  }
}

const handler = {
  async fetch(request: Request): Promise<Response> {
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders(request) });
    if (request.method !== "GET") return json(request, 405, { error: "Method not allowed" });

    const userId = await verifiedUserId(request);
    if (!userId) return json(request, 401, { error: "Unauthorized" });

    try {
      const { rows } = await pool.query(
        `SELECT count(*)::int AS keys, max(updated_at) AS last_synced,
                coalesce(array_agg(key ORDER BY key) FILTER (WHERE key IS NOT NULL), '{}') AS key_names
         FROM user_progress WHERE user_id = $1::uuid`,
        [userId]
      );
      const summary = rows[0];
      return json(request, 200, {
        userId,
        syncedKeys: summary.keys,
        lastSynced: summary.last_synced,
        keyNames: summary.key_names,
        branch: process.env.NEON_BRANCH,
      });
    } catch (err) {
      console.error("progress summary failed:", (err as Error).message);
      return json(request, 500, { error: "Could not read progress" });
    }
  },
};

export default handler;
