-- Per-user copy of the app's localStorage progress (one row per `iprep_*` key).
-- user_id is the Neon Auth (Managed Better Auth) user id, always taken from the session.
-- No foreign key to neon_auth."user": that schema is managed by Neon, not this app.
-- The primary key doubles as the stable replica identity Realtime needs. RLS stays off:
-- Realtime rejects live queries on RLS tables, so access is enforced in the sealed query.
CREATE TABLE IF NOT EXISTS user_progress (
  user_id    uuid        NOT NULL,
  key        text        NOT NULL,
  value      jsonb       NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, key)
);
