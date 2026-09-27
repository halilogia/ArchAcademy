import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

export const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 14
export const RESET_TTL_MS = 1000 * 60 * 60
export const MAX_FAILED_ATTEMPTS = 5
export const LOCKOUT_MS = 1000 * 60 * 15
const SCRYPT_KEYLEN = 64
const SCRYPT_OPTIONS = { N: 16_384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 }

export const hashPassword = (password, salt = crypto.randomBytes(16).toString('hex')) => {
  const derived = crypto.scryptSync(password, salt, SCRYPT_KEYLEN, SCRYPT_OPTIONS).toString('hex')
  return `${SCRYPT_KEYLEN}:${salt}:${derived}`
}

export const verifyPassword = (password, stored) => {
  if (typeof stored !== 'string') return false
  const [keylen, salt, expected] = stored.split(':')
  if (!keylen || !salt || !expected) return false;
  const derived = crypto.scryptSync(password, salt, Number(keylen), SCRYPT_OPTIONS).toString('hex')
  const expectedBuffer = Buffer.from(expected, 'hex')
  const derivedBuffer = Buffer.from(derived, 'hex')
  if (expectedBuffer.length !== derivedBuffer.length) return false
  return crypto.timingSafeEqual(expectedBuffer, derivedBuffer)
}

const randomToken = () => crypto.randomBytes(32).toString('hex')

export const normalizeBearer = (header) => String(header ?? '').replace(/^Bearer\s+/i, '').trim()

const now = () => Date.now()

const pruneExpired = (entries) => entries.filter((entry) => entry.expiresAt > now())

/**
 * File-backed store for accounts and sessions. Used when the runtime has no
 * node:sqlite. The same interface as the SQLite backend so the auth policy in
 * this module never branches on the store.
 */
export const createFileAccountStore = ({ dataDir }) => {
  const file = path.join(dataDir, 'accounts.json')
  const read = () => {
    if (!fs.existsSync(file)) return { users: [], sessions: [], resets: [] }
    try {
      const parsed = JSON.parse(fs.readFileSync(file, 'utf8'))
      return { users: parsed.users ?? [], sessions: parsed.sessions ?? [], resets: parsed.resets ?? [] }
    } catch (error) {
      console.warn('[sync-server] could not read the account store:', error.message)
      return { users: [], sessions: [], resets: [] }
    }
  }
  const write = (state) => {
    fs.mkdirSync(path.dirname(file), { recursive: true })
    const temporary = `${file}.tmp`
    fs.writeFileSync(temporary, JSON.stringify(state, null, 2), 'utf8')
    fs.renameSync(temporary, file)
  }

  return {
    backend: 'file',
    getUser: (ownerId) => read().users.find((entry) => entry.ownerId === ownerId) ?? null,
    putUser: (user) => {
      const state = read()
      write({ ...state, users: [...state.users.filter((entry) => entry.ownerId !== user.ownerId), user] })
    },
    countUsers: () => read().users.length,
    listSessions: (ownerId) => pruneExpired(read().sessions).filter((entry) => entry.ownerId === ownerId),
    getSession: (token) => pruneExpired(read().sessions).find((entry) => entry.token === token) ?? null,
    putSession: (session) => {
      const state = read()
      write({ ...state, sessions: [...state.sessions.filter((entry) => entry.token !== session.token), session] })
    },
    deleteSession: (token) => {
      const state = read()
      write({ ...state, sessions: state.sessions.filter((entry) => entry.token !== token) })
    },
    deleteSessionsFor: (ownerId) => {
      const state = read()
      write({ ...state, sessions: state.sessions.filter((entry) => entry.ownerId !== ownerId) })
    },
    getResetToken: (token) => read().resets.find((entry) => entry.token === token) ?? null,
    putResetToken: (entry) => {
      const state = read()
      write({ ...state, resets: [...state.resets.filter((item) => item.token !== entry.token), entry] })
    },
    sweep: () => {
      const state = read()
      const current = now()
      write({
        users: state.users,
        sessions: state.sessions.filter((entry) => entry.expiresAt > current),
        resets: state.resets.filter((entry) => entry.expiresAt > current)
      })
    }
  }
}

/** SQLite-backed store with the same interface as the file store. */
export const createSqliteAccountStore = (db) => {
  const statements = {
    getUser: db.prepare('SELECT * FROM users WHERE owner_id = :ownerId'),
    putUser: db.prepare(
      `INSERT INTO users (owner_id, password, created_at, password_changed_at, failed_attempts, locked_until)
       VALUES (:ownerId, :password, :createdAt, :passwordChangedAt, :failedAttempts, :lockedUntil)
       ON CONFLICT(owner_id) DO UPDATE SET
         password = excluded.password,
         password_changed_at = excluded.password_changed_at,
         failed_attempts = excluded.failed_attempts,
         locked_until = excluded.locked_until`
    ),
    countUsers: db.prepare('SELECT COUNT(*) AS total FROM users'),
    listSessions: db.prepare('SELECT * FROM sessions WHERE owner_id = :ownerId AND expires_at > :now'),
    getSession: db.prepare('SELECT * FROM sessions WHERE token = :token AND expires_at > :now'),
    putSession: db.prepare(
      `INSERT INTO sessions (token, owner_id, issued_at, expires_at) VALUES (:token, :ownerId, :issuedAt, :expiresAt)
       ON CONFLICT(token) DO UPDATE SET expires_at = excluded.expires_at`
    ),
    deleteSession: db.prepare('DELETE FROM sessions WHERE token = :token'),
    deleteSessionsFor: db.prepare('DELETE FROM sessions WHERE owner_id = :ownerId'),
    getResetToken: db.prepare('SELECT * FROM reset_tokens WHERE token = :token'),
    putResetToken: db.prepare(
      `INSERT INTO reset_tokens (token, owner_id, expires_at, used_at) VALUES (:token, :ownerId, :expiresAt, :usedAt)
       ON CONFLICT(token) DO UPDATE SET expires_at = excluded.expires_at, used_at = excluded.used_at`
    ),
    sweepSessions: db.prepare('DELETE FROM sessions WHERE expires_at <= :now'),
    sweepResets: db.prepare('DELETE FROM reset_tokens WHERE expires_at <= :now')
  }

  // Rows come back with the column names SQLite knows; the rest of the service
  // works with camelCase, so they are mapped on the way out.
  const toUser = (row) =>
    row
      ? {
          ownerId: row.owner_id,
          password: row.password,
          createdAt: row.created_at,
          passwordChangedAt: row.password_changed_at,
          failedAttempts: row.failed_attempts,
          lockedUntil: row.locked_until
        }
      : null

  const toSession = (row) =>
    row
      ? { token: row.token, ownerId: row.owner_id, issuedAt: row.issued_at, expiresAt: row.expires_at }
      : null

  const toResetToken = (row) =>
    row
      ? { token: row.token, ownerId: row.owner_id, expiresAt: row.expires_at, usedAt: row.used_at }
      : null

  return {
    backend: 'sqlite',
    getUser: (ownerId) => toUser(statements.getUser.get({ ownerId })),
    putUser: (user) =>
      statements.putUser.run({
        ownerId: user.ownerId,
        password: user.password,
        createdAt: user.createdAt,
        passwordChangedAt: user.passwordChangedAt,
        failedAttempts: user.failedAttempts,
        lockedUntil: user.lockedUntil
      }),
    countUsers: () => statements.countUsers.get().total,
    listSessions: (ownerId) =>
      statements.listSessions.all({ ownerId, now: now() }).map((row) => toSession(row)),
    getSession: (token) => toSession(statements.getSession.get({ token, now: now() })),
    putSession: (session) =>
      statements.putSession.run({
        token: session.token,
        ownerId: session.ownerId,
        issuedAt: session.issuedAt,
        expiresAt: session.expiresAt
      }),
    deleteSession: (token) => statements.deleteSession.run({ token }),
    deleteSessionsFor: (ownerId) => statements.deleteSessionsFor.run({ ownerId }),
    getResetToken: (token) => toResetToken(statements.getResetToken.get({ token })),
    putResetToken: (entry) =>
      statements.putResetToken.run({
        token: entry.token,
        ownerId: entry.ownerId,
        expiresAt: entry.expiresAt,
        usedAt: entry.usedAt ?? 0
      }),
    sweep: () => {
      const current = now()
      statements.sweepSessions.run({ now: current })
      statements.sweepResets.run({ now: current })
    }
  }
}

/**
 * Authentication policy, independent of where state lives: scrypt hashing, lockout
 * after repeated failures, session rotation on every login, and one-time password
 * reset tokens.
 */
export const createAuthService = ({ store }) => {
  const issueSession = (ownerId) => {
    const timestamp = now()
    const session = { token: randomToken(), ownerId, issuedAt: timestamp, expiresAt: timestamp + SESSION_TTL_MS }
    store.putSession(session)
    return session
  }

  return {
    backend: store.backend,
    enabled: Boolean(store),

    countUsers: () => store.countUsers(),

    issueSession,

    register: (ownerId, password) => {
      if (store.getUser(ownerId)) return { ok: false, reason: 'exists' }
      const timestamp = now()
      store.putUser({
        ownerId,
        password: hashPassword(password),
        createdAt: timestamp,
        passwordChangedAt: timestamp,
        failedAttempts: 0,
        lockedUntil: 0
      })
      return { ok: true, session: issueSession(ownerId) }
    },

    login: (ownerId, password) => {
      const user = store.getUser(ownerId)
      if (!user) return { ok: false, reason: 'invalid' }
      if (user.lockedUntil > now()) return { ok: false, reason: 'locked' }

      if (!verifyPassword(password, user.password)) {
        const failedAttempts = (user.failedAttempts ?? 0) + 1
        store.putUser({
          ...user,
          failedAttempts,
        lockedUntil: failedAttempts >= MAX_FAILED_ATTEMPTS ? now() + LOCKOUT_MS : 0
        })
        return { ok: false, reason: 'invalid' }
      }

      // Rotate: a successful login invalidates every earlier session for the account.
      store.deleteSessionsFor(ownerId)
      store.putUser({ ...user, failedAttempts: 0, lockedUntil: 0 })
      return { ok: true, session: issueSession(ownerId) }
    },

    resolve: (header) => {
      const token = normalizeBearer(header)
      if (!token) return null
      const session = store.getSession(token)
      if (!session || session.expiresAt <= now()) return null
      return { ownerId: session.ownerId, expiresAt: session.expiresAt }
    },

    revoke: (ownerId) => {
      const sessions = store.listSessions(ownerId)
      sessions.forEach((session) => store.deleteSession(session.token))
      return sessions.length
    },

    revokeToken: (token) => {
      store.deleteSession(token)
    },

  changePassword: (ownerId, currentPassword, nextPassword) => {
    const user = store.getUser(ownerId)
    if (!user) return { ok: false, reason: 'invalid' }
    if (!verifyPassword(currentPassword, user.password)) return { ok: false, reason: 'invalid' }
    store.putUser({
      ...user,
      password: hashPassword(nextPassword),
      passwordChangedAt: now(),
      failedAttempts: 0,
      lockedUntil: 0
    })
    store.deleteSessionsFor(ownerId)
    return { ok: true }
  },

  requestReset: (ownerId) => {
    if (!store.getUser(ownerId)) return { ok: false, reason: 'unknown' }
    const entry = { token: randomToken(), ownerId, expiresAt: now() + RESET_TTL_MS, usedAt: 0 }
    store.putResetToken(entry)
    return { ok: true, token: entry.token, expiresInSeconds: RESET_TTL_MS / 1000 }
  },

  completeReset: (token, nextPassword) => {
    const entry = store.getResetToken(token)
    if (!entry || entry.usedAt > 0 || entry.expiresAt <= now()) return { ok: false, reason: 'invalid' }
    const user = store.getUser(entry.ownerId)
    if (!user) return { ok: false, reason: 'unknown' }

    store.putUser({
      ...user,
      password: hashPassword(nextPassword),
      passwordChangedAt: now(),
      failedAttempts: 0,
      lockedUntil: 0
    })
    store.putResetToken({ ...entry, usedAt: now() })
    store.deleteSessionsFor(entry.ownerId)
    return { ok: true }
  },

    sweep: () => store.sweep?.()
  }
}
