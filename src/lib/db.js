import "server-only";
import { Pool } from "pg";
import { attachDatabasePool } from "@vercel/functions";

// One pooled `pg` Pool per server instance, created on first use (next build imports
// modules without runtime secrets). DATABASE_URL is Neon's pooled (-pooler) string.
const POOL_MAX = 5;
let pool;

export function getPool() {
  if (!pool) {
    if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set. Run `neon env pull`.");
    pool = new Pool({ connectionString: process.env.DATABASE_URL, max: POOL_MAX });
    // Lets Vercel Fluid compute close idle clients before suspending; also attaches an
    // error listener so an idle disconnect doesn't crash the process.
    attachDatabasePool(pool);
  }
  return pool;
}

export function query(text, params) {
  return getPool().query(text, params);
}
