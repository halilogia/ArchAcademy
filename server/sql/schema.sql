-- Schema for moving the reference services onto Postgres.
--
-- The shipped services use SQLite (single node) or an append-only log. This file is
-- the same data model in Postgres terms, for deployments that need more than one
-- writer. It is documentation, not wired code: adopting it means implementing the
-- ProgressStore, AccountStore and rate limiter interfaces from
-- server/lib/auth.mjs and server/lib/sqlite.mjs against a pg pool.

CREATE TABLE IF NOT EXISTS progress (
  owner_id   TEXT PRIMARY KEY,
  revision   INTEGER NOT NULL DEFAULT 0,
  synced_at  TEXT        NOT NULL,
  payload    JSONB       NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS accounts (
  owner_id            TEXT PRIMARY KEY,
  password            TEXT        NOT NULL,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  password_changed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  failed_attempts     INTEGER     NOT NULL DEFAULT 0,
  locked_until        TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sessions (
  token      TEXT PRIMARY KEY,
  owner_id   TEXT        NOT NULL REFERENCES accounts (owner_id) ON DELETE CASCADE,
  issued_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS sessions_owner_idx ON sessions (owner_id);
CREATE INDEX IF NOT EXISTS sessions_expiry_idx ON sessions (expires_at);

CREATE TABLE IF NOT EXISTS reset_tokens (
  token      TEXT PRIMARY KEY,
  owner_id   TEXT        NOT NULL REFERENCES accounts (owner_id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at    TIMESTAMPTZ
);

-- Shared fixed-window rate limiting. Insert one row per request and count the
-- current window inside a transaction, or use INSERT ... ON CONFLICT with a
-- counter column to keep the table small.
CREATE TABLE IF NOT EXISTS rate_events (
  client       TEXT        NOT NULL,
  window_start TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS rate_events_window_idx ON rate_events (client, window_start);

-- Housekeeping: drop expired sessions and reset tokens.
-- SELECT cron.schedule('prune-sessions', '7 3 * * *', $$DELETE FROM sessions WHERE expires_at <= now()$$);
