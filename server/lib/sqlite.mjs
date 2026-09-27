import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

export const loadSqlite = () => {
  try {
    // Available from Node 22.5 behind a flag and by default from Node 24.
    // ESM has no global require, so the builtin is loaded through createRequire.
    return createRequire(import.meta.url)('node:sqlite')
  } catch {
    return null
  }
}

const SCHEMA = `
PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS progress (
  owner_id  TEXT PRIMARY KEY,
  revision  INTEGER NOT NULL DEFAULT 0,
  synced_at TEXT NOT NULL,
  payload   TEXT NOT NULL,
  updated_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS rate_events (
  client       TEXT NOT NULL,
  window_start INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS rate_events_window ON rate_events (client, window_start);
CREATE TABLE IF NOT EXISTS users (
  owner_id            TEXT PRIMARY KEY,
  password            TEXT NOT NULL,
  created_at          INTEGER NOT NULL,
  password_changed_at INTEGER NOT NULL,
  failed_attempts     INTEGER NOT NULL DEFAULT 0,
  locked_until        INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS sessions (
  token      TEXT PRIMARY KEY,
  owner_id   TEXT NOT NULL,
  issued_at  INTEGER NOT NULL,
  expires_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS sessions_owner ON sessions (owner_id);
CREATE TABLE IF NOT EXISTS reset_tokens (
  token      TEXT PRIMARY KEY,
  owner_id   TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  used_at    INTEGER NOT NULL DEFAULT 0
);
`


/**
 * Opens the shared SQLite database, or returns null when the runtime has no
 * node:sqlite. The reference services fall back to file-backed stores then.
 */
export const openDatabase = (dataDir) => {
  if (!dataDir) return null
  const sqlite = loadSqlite()
  if (!sqlite) return null

  fs.mkdirSync(dataDir, { recursive: true })
  const db = new sqlite.DatabaseSync(path.join(dataDir, 'services.db'))
  db.exec(SCHEMA)
  return db
}

/** Fixed-window request counter backed by a table, so every process shares it. */
export const createSharedRateLimiter = (db, { windowMs = 60_000, max = 120 } = {}) => {
  const insert = db.prepare(
    'INSERT INTO rate_events (client, window_start) VALUES (:client, :windowStart)'
  )
  const count = db.prepare(
    'SELECT COUNT(*) AS total FROM rate_events WHERE client = :client AND window_start = :windowStart'
  )
  const prune = db.prepare(
    'DELETE FROM rate_events WHERE client = :client AND window_start < :windowStart'
  )
  const pruneAll = db.prepare('DELETE FROM rate_events WHERE window_start < :windowStart')

  return {
    backend: 'sqlite',
    allow(clientKey) {
      const now = Date.now()
      const windowStart = Math.floor(now / windowMs) * windowMs
      const resetInSeconds = Math.max(1, Math.ceil((windowStart + windowMs - now) / 1000))

      db.exec('BEGIN IMMEDIATE')
      try {
        prune.run({ client: clientKey, windowStart: windowStart - windowMs })
        const { total } = count.get({ client: clientKey, windowStart: windowStart })
        insert.run({ client: clientKey, windowStart: windowStart })
        pruneAll.run({ windowStart: windowStart - windowMs })
        db.exec('COMMIT')

        if (total + 1 > max) {
          return { allowed: false, remaining: 0, resetInSeconds }
        }
        return { allowed: true, remaining: max - total - 1, resetInSeconds }
      } catch (error) {
        db.exec('ROLLBACK')
        throw error
      }
    },
    size: () => db.prepare('SELECT COUNT(DISTINCT client) AS total FROM rate_events').get().total
  }
}
