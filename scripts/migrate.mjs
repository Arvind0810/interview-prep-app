// Applies db/migrations/*.sql in filename order, once each, over the DIRECT connection
// (DATABASE_URL_UNPOOLED) — migrations must not run through the PgBouncer pooler.
// Usage: npm run db:migrate
import { readdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import pg from "pg";

const ROOT = path.resolve(import.meta.dirname, "..");
const MIGRATIONS_DIR = path.join(ROOT, "db", "migrations");

for (const file of [".env", ".env.local"]) {
  const full = path.join(ROOT, file);
  if (existsSync(full)) process.loadEnvFile(full);
}

const connectionString = process.env.DATABASE_URL_UNPOOLED;
if (!connectionString) {
  console.error("DATABASE_URL_UNPOOLED is not set. Run `neon env pull` first.");
  process.exit(1);
}

const client = new pg.Client({ connectionString });
await client.connect();
try {
  await client.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
    name text PRIMARY KEY,
    applied_at timestamptz NOT NULL DEFAULT now()
  )`);
  const { rows } = await client.query("SELECT name FROM schema_migrations");
  const applied = new Set(rows.map((r) => r.name));
  const files = (await readdir(MIGRATIONS_DIR)).filter((f) => f.endsWith(".sql")).sort();

  for (const name of files) {
    if (applied.has(name)) {
      console.log(`skip    ${name}`);
      continue;
    }
    const sql = await readFile(path.join(MIGRATIONS_DIR, name), "utf8");
    await client.query("BEGIN");
    try {
      await client.query(sql);
      await client.query("INSERT INTO schema_migrations (name) VALUES ($1)", [name]);
      await client.query("COMMIT");
      console.log(`applied ${name}`);
    } catch (err) {
      await client.query("ROLLBACK");
      throw new Error(`${name} failed: ${err.message}`);
    }
  }
} finally {
  await client.end();
}
