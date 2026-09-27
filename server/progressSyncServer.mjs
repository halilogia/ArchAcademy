import fs from 'node:fs'
import path from 'node:path'
import http from 'node:http'
import { URL, pathToFileURL } from 'node:url'
import {
  createAuthService,
  createFileAccountStore,
  createSqliteAccountStore,
  hashPassword,
  normalizeBearer,
  verifyPassword
} from './lib/auth.mjs'
import { createSharedRateLimiter, loadSqlite, openDatabase } from './lib/sqlite.mjs'

const MAX_BODY_BYTES = 1024 * 512
const TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 14
const COMPACT_AFTER_APPENDS = 50

export { createAuthService, createFileAccountStore, createSqliteAccountStore, hashPassword, verifyPassword }

/**
 * Durable progress store.
 *
 * Prefers SQLite when the runtime provides it: one row per owner, transactional
 * writes. Falls back to an append-only log plus snapshot, which is crash safe but
 * suited to a single process. Whichever backend is used the interface is the same.
 */
export const createProgressStore = ({ dataDir = null, backend = 'auto', db = null } = {}) => {
  const DatabaseSync = backend === 'file' || db ? null : loadSqlite()?.DatabaseSync ?? null

  // A database opened by the caller already carries the progress table from the
  // shared schema, so one file holds progress, accounts and rate limits.
  let database = db ?? null
  let ownsDatabase = false
  if (DatabaseSync && dataDir) {
    ownsDatabase = true
    fs.mkdirSync(dataDir, { recursive: true })
    database = new DatabaseSync(path.join(dataDir, 'progress.db'))
    database.exec(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS progress (
        owner_id  TEXT PRIMARY KEY,
        revision  INTEGER NOT NULL DEFAULT 0,
        synced_at TEXT NOT NULL,
        payload   TEXT NOT NULL,
        updated_at INTEGER NOT NULL
      );
    `)
  }

  const cache = new Map()
  let appends = 0

  const logPath = database ? null : dataDir ? path.join(dataDir, 'progress.log') : null
  const snapshotPath = database ? null : dataDir ? path.join(dataDir, 'progress.snapshot.json') : null

  const replay = () => {
    if (database) {
      const rows = database.prepare('SELECT owner_id, revision, synced_at, payload FROM progress').all()
      rows.forEach((row) => {
        try {
          cache.set(row.owner_id, {
            ownerId: row.owner_id,
            revision: Number(row.revision),
            syncedAt: row.synced_at,
            progress: JSON.parse(row.payload)
          })
        } catch {
          // A row with an unreadable payload is skipped rather than blocking startup.
        }
      })
      return
    }

    if (snapshotPath && fs.existsSync(snapshotPath)) {
      try {
        const parsed = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'))
        for (const [ownerId, envelope] of Object.entries(parsed)) cache.set(ownerId, envelope)
      } catch (error) {
        console.warn('[sync-server] could not read the snapshot:', error.message)
      }
    }

    if (!logPath || !fs.existsSync(logPath)) return
    let replayed = 0
    for (const line of fs.readFileSync(logPath, 'utf8').split('\n')) {
      if (!line.trim()) continue
      try {
        const entry = JSON.parse(line)
        if (entry?.ownerId && entry?.envelope) {
          cache.set(entry.ownerId, entry.envelope)
          replayed += 1
        }
      } catch {
        // A torn final line from an interrupted write is skipped on purpose.
      }
    }
    if (replayed > 0) console.log(`[sync-server] replayed ${replayed} log entries`)
  }

  const compact = () => {
    if (database || !snapshotPath || !logPath || !dataDir) return
    try {
      fs.mkdirSync(dataDir, { recursive: true })
      const temporary = `${snapshotPath}.tmp`
      fs.writeFileSync(temporary, JSON.stringify(Object.fromEntries(cache), null, 2), 'utf8')
      fs.renameSync(temporary, snapshotPath)
      fs.writeFileSync(logPath, '', 'utf8')
      appends = 0
    } catch (error) {
      console.warn('[sync-server] could not compact the log:', error.message)
    }
  }

  const append = (ownerId, envelope) => {
    if (database) {
      if (envelope === null) {
        database.prepare('DELETE FROM progress WHERE owner_id = :ownerId').run({ ownerId })
        cache.delete(ownerId)
        return
      }
      database
        .prepare(
          `INSERT INTO progress (owner_id, revision, synced_at, payload, updated_at)
           VALUES (:ownerId, :revision, :syncedAt, :payload, :updatedAt)
           ON CONFLICT(owner_id) DO UPDATE SET
             revision = excluded.revision,
             synced_at = excluded.synced_at,
             payload = excluded.payload,
             updated_at = excluded.updated_at`
        )
        .run({
          ownerId,
          revision: envelope.revision ?? 0,
          syncedAt: envelope.syncedAt ?? new Date().toISOString(),
          payload: JSON.stringify(envelope.progress ?? null),
          updatedAt: Date.now()
        })
      return
    }
    if (!logPath || !dataDir) return
    try {
      fs.mkdirSync(dataDir, { recursive: true })
      fs.appendFileSync(logPath, `${JSON.stringify({ ownerId, envelope })}\n`, 'utf8')
      appends += 1
      if (appends >= COMPACT_AFTER_APPENDS) compact()
    } catch (error) {
      console.warn('[sync-server] could not append to the log:', error.message)
    }
  }

  if (dataDir) replay()

  const get = (ownerId) => cache.get(ownerId) ?? null

  const set = (ownerId, envelope) => {
    const current = cache.get(ownerId)
    if (current && typeof envelope.revision === 'number' && envelope.revision < current.revision) {
      return { stored: current, conflict: true }
    }
    cache.set(ownerId, envelope)
    append(ownerId, envelope)
    return { stored: envelope, conflict: false }
  }

  return {
    get,
    set,
    remove: (ownerId) => {
      cache.delete(ownerId)
      append(ownerId, null)
    },
    size: () => cache.size,
    compact,
    backend: database ? 'sqlite' : logPath ? 'append-log' : 'memory',
    close: () => {
      compact()
      // A database opened here is ours to close; a shared one is closed by the service.
      if (ownsDatabase) database.close()
    }
  }
}

/** In-process limiter, used when no shared database is available. */
export const clientKeyOf = (request) => {
  const forwarded = request.headers['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.length > 0) return forwarded.split(',')[0].trim()
  return request.socket?.remoteAddress ?? 'unknown'
}

/** In-process limiter, used when no shared database is available. */
export const createRateLimiter = ({ windowMs = 60_000, max = 120 } = {}) => {
  const hits = new Map()

  return {
    backend: 'memory',
    allow(key) {
      const now = Date.now()
      const entry = hits.get(key)

      if (!entry || now - entry.startedAt > windowMs) {
        hits.set(key, { startedAt: now, count: 1 })
        return { allowed: true, remaining: max - 1, resetInSeconds: Math.ceil(windowMs / 1000) }
      }

      entry.count += 1
      if (entry.count > max) {
        return {
          allowed: false,
          remaining: 0,
          resetInSeconds: Math.max(1, Math.ceil((windowMs - (now - entry.startedAt)) / 1000))
        }
      }
      return { allowed: true, remaining: max - entry.count, resetInSeconds: Math.ceil(windowMs / 1000) }
    },
    size: () => hits.size
  }
}

export const parseUserTokens = (raw) => {
  if (!raw) return []
  return String(raw)
    .split(',')
    .map((pair) => pair.trim())
    .filter(Boolean)
    .map((pair) => {
      const separator = pair.indexOf(':')
      if (separator === -1) return { ownerId: '*', token: pair }
      return { ownerId: pair.slice(0, separator).trim(), token: pair.slice(separator + 1).trim() }
    })
    .filter((entry) => entry.token.length > 0)
}

const sendJson = (response, status, body, headers = {}) => {
  const payload = JSON.stringify(body)
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
    'Cache-Control': 'no-store',
    ...headers
  })
  response.end(payload)
}

const readBody = (request) =>
  new Promise((resolve, reject) => {
    const chunks = []
    let size = 0
    request.on('data', (chunk) => {
      size += chunk.length
      if (size > MAX_BODY_BYTES) {
        reject(new Error('payload too large'))
        request.destroy()
        return
      }
      chunks.push(chunk)
    })
    request.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    request.on('error', reject)
  })

export { normalizeBearer }

export const createServices = ({ dataDir = null, backend = 'auto', rateLimit = {} } = {}) => {
  const db = backend === 'file' ? null : openDatabase(dataDir)
  const accountStore = db ? createSqliteAccountStore(db) : dataDir ? createFileAccountStore({ dataDir }) : null
  const auth = accountStore ? createAuthService({ store: accountStore }) : null
  const limiter = db
    ? createSharedRateLimiter(db, rateLimit)
    : createRateLimiter(rateLimit)
  return { db, accountStore, auth, limiter, progress: createProgressStore({ dataDir, backend, db }) }
}

export const createProgressServer = ({
  store,
  token = '',
  userTokens = [],
  rateLimit,
  dataDir = null,
  backend = 'auto',
  users = null,
  services = null
} = {}) => {
  const resolved = services ?? createServices({ dataDir, backend, rateLimit: rateLimit ?? {} })
  const progressStore = store ?? resolved.progress
  const limiter = typeof rateLimit?.allow === 'function' ? rateLimit : resolved.limiter
  const credentials = Array.isArray(userTokens) ? userTokens : parseUserTokens(userTokens)
  const auth = users ?? resolved.auth

  const resolveIdentity = (request) => {
    const session = auth?.resolve(request.headers.authorization)
    if (session) return { ownerId: session.ownerId, source: 'session' }
    if (credentials.length > 0) return { ownerId: null, source: 'static-tokens' }
    if (token) return { ownerId: null, source: 'shared-token' }
    return { ownerId: null, source: 'open' }
  }

  const jsonBody = async (request) => {
    try {
      return { payload: JSON.parse(await readBody(request)) }
    } catch {
      return { error: true }
    }
  }

  const server = http.createServer(async (request, response) => {
    const requestUrl = new URL(request.url ?? '/', 'http://localhost')
    const { pathname } = requestUrl

    if (request.method === 'OPTIONS') {
      sendJson(response, 204, {})
      return
    }

    if (pathname === '/health') {
      sendJson(response, 200, {
        status: 'ok',
        owners: progressStore.size(),
        progressBackend: progressStore.backend,
        rateLimitBackend: limiter.backend,
        rateLimitClients: limiter.size(),
        users: auth?.countUsers() ?? 0,
        authMode: auth ? 'account' : credentials.length === 0 ? (token ? 'shared-token' : 'open') : 'per-user'
      })
      return
    }

    if (pathname.startsWith('/auth/')) {
      if (!auth) {
        sendJson(response, 409, { error: 'accounts_disabled' })
        return
      }
      if (request.method !== 'POST') {
        sendJson(response, 405, { error: 'method_not_allowed' })
        return
      }

      const { payload, error } = await jsonBody(request)
      if (error) {
        sendJson(response, 400, { error: 'invalid_json' })
        return
      }

      if (pathname === '/auth/register') {
        if (!payload?.ownerId || !payload?.password) {
          sendJson(response, 422, { error: 'ownerId and password are required' })
          return
        }
        if (String(payload.password).length < 8) {
          sendJson(response, 422, { error: 'password must be at least 8 characters' })
          return
        }
        const result = auth.register(String(payload.ownerId), String(payload.password))
        if (!result.ok) {
          sendJson(response, 409, { error: 'owner_already_registered' })
          return
        }
        sendJson(response, 201, {
          ownerId: payload.ownerId,
          token: result.session.token,
          expiresInSeconds: TOKEN_TTL_MS / 1000
        })
        return
      }

      if (pathname === '/auth/login') {
        const result = auth.login(String(payload?.ownerId ?? ''), String(payload?.password ?? ''))
        if (!result.ok) {
          sendJson(response, 401, { error: result.reason === 'locked' ? 'account_locked' : 'invalid_credentials' })
          return
        }
        sendJson(response, 200, {
          ownerId: payload.ownerId,
          token: result.session.token,
          expiresInSeconds: TOKEN_TTL_MS / 1000
        })
        return
      }

      if (pathname === '/auth/reset') {
        const result = auth.requestReset(String(payload?.ownerId ?? ''))
        if (!result.ok) {
          sendJson(response, 404, { error: 'unknown_owner' })
          return
        }
        sendJson(response, 202, result)
        return
      }

      if (pathname === '/auth/reset/confirm') {
        if (!payload?.token || !payload?.password || String(payload.password).length < 8) {
          sendJson(response, 422, { error: 'token and an 8+ character password are required' })
          return
        }
        const result = auth.completeReset(String(payload.token), String(payload.password))
        if (!result.ok) {
          sendJson(response, 400, { error: 'invalid_reset_token' })
          return
        }
        sendJson(response, 200, { reset: true })
        return
      }

      if (pathname === '/auth/password') {
        const result = auth.changePassword(
          String(payload?.ownerId ?? ''),
          String(payload?.currentPassword ?? ''),
          String(payload?.newPassword ?? '')
        )
        if (!result.ok) {
          sendJson(response, 401, { error: 'invalid_credentials' })
          return
        }
        sendJson(response, 200, { changed: true, sessionsRevoked: true })
        return
      }

      if (pathname === '/auth/logout') {
        const session = auth.resolve(request.headers.authorization)
        if (session) auth.revokeToken(normalizeBearer(request.headers.authorization))
        sendJson(response, 200, { revoked: Boolean(session) })
        return
      }

      sendJson(response, 404, { error: 'not_found' })
      return
    }

    if (!pathname.startsWith('/progress/')) {
      sendJson(response, 404, { error: 'not_found' })
      return
    }

    const quota = limiter.allow(clientKeyOf(request))
    const rateHeaders = {
      'X-RateLimit-Remaining': String(quota.remaining),
      'X-RateLimit-Reset': String(quota.resetInSeconds)
    }
    if (!quota.allowed) {
      sendJson(response, 429, { error: 'rate_limited', retryAfterSeconds: quota.resetInSeconds }, {
        ...rateHeaders,
        'Retry-After': String(quota.resetInSeconds)
      })
      return
    }

    const requestedOwner = decodeURIComponent(pathname.slice('/progress/'.length)).trim()
    if (!requestedOwner) {
      sendJson(response, 400, { error: 'missing_owner_id' }, rateHeaders)
      return
    }

    const identity = resolveIdentity(request)

    if (identity.source === 'session') {
      if (identity.ownerId !== requestedOwner) {
        sendJson(response, 403, { error: 'forbidden' }, rateHeaders)
        return
      }
    } else if (identity.source === 'static-tokens') {
      const match = credentials.find((entry) => entry.token === normalizeBearer(request.headers.authorization))
      if (!match) {
        sendJson(response, 401, { error: 'unauthorized' }, rateHeaders)
        return
      }
      if (match.ownerId !== '*' && match.ownerId !== requestedOwner) {
        sendJson(response, 403, { error: 'forbidden' }, rateHeaders)
        return
      }
    } else if (identity.source === 'shared-token') {
      if (normalizeBearer(request.headers.authorization) !== token) {
        sendJson(response, 401, { error: 'unauthorized' }, rateHeaders)
        return
      }
    }

    if (request.method === 'GET') {
      const envelope = progressStore.get(requestedOwner)
      if (!envelope) {
        sendJson(response, 404, { error: 'not_found' }, rateHeaders)
        return
      }
      sendJson(response, 200, envelope, rateHeaders)
      return
    }

    if (request.method === 'PUT') {
      const { payload, error } = await jsonBody(request)
      if (error) {
        sendJson(response, 400, { error: 'invalid_json' }, rateHeaders)
        return
      }
      if (!payload || typeof payload !== 'object' || !payload.progress) {
        sendJson(response, 422, { error: 'invalid_envelope' }, rateHeaders)
        return
      }

      const { stored, conflict } = progressStore.set(requestedOwner, {
        ownerId: requestedOwner,
        revision: typeof payload.revision === 'number' ? payload.revision : 0,
        syncedAt: new Date().toISOString(),
        progress: payload.progress
      })

      sendJson(response, conflict ? 409 : 200, stored, rateHeaders)
      return
    }

    if (request.method === 'DELETE') {
      progressStore.remove(requestedOwner)
      sendJson(response, 204, {}, rateHeaders)
      return
    }

    sendJson(response, 405, { error: 'method_not_allowed' }, rateHeaders)
  })

  return { server, store: progressStore, limiter, users: auth, services: resolved }
}

export const startProgressServer = ({
  port = 0,
  host = '127.0.0.1',
  token = '',
  userTokens = [],
  dataDir = null,
  rateLimit = undefined,
  backend = 'auto'
} = {}) => {
  const services = createServices({ dataDir, backend, rateLimit: rateLimit ?? {} })
  const { server, store, limiter, users } = createProgressServer({ token, userTokens, services })
  return new Promise((resolve) => {
    server.listen(port, host, () => {
      const address = server.address()
      resolve({
        server,
        store,
        limiter,
        users,
        services,
        port: address.port,
        origin: `http://${host}:${address.port}`,
        close: () =>
          new Promise((done) => {
            store.close?.()
            services.db?.close()
            server.close(() => done(undefined))
          })
      })
    })
  })
}

const isMain = Boolean(process.argv[1]) && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href

if (isMain) {
  const port = Number(process.env.PORT ?? 8787)
  const host = process.env.HOST ?? '127.0.0.1'
  const sharedToken = process.env.SYNC_TOKEN ?? ''
  const userTokens = parseUserTokens(process.env.SYNC_USER_TOKENS ?? '')
  const dataDir = process.env.SYNC_DATA_DIR ?? path.resolve(process.cwd(), 'server/data')
  const backend = process.env.SYNC_BACKEND ?? 'auto'
  const rateMax = Number(process.env.SYNC_RATE_LIMIT ?? 120)
  const rateWindowMs = Number(process.env.SYNC_RATE_WINDOW_MS ?? 60_000)

  startProgressServer({
    port,
    host,
    token: sharedToken,
    userTokens,
    dataDir: dataDir === '' ? null : dataDir,
    backend,
    rateLimit: { windowMs: rateWindowMs, max: rateMax }
  }).then(({ origin, store, limiter, users }) => {
    console.log(`[sync-server] listening on ${origin}`)
    console.log(`[sync-server] endpoints: POST /auth/{register,login,reset,reset/confirm,password,logout}, GET|PUT|DELETE /progress/{ownerId}, GET /health`)
    console.log(`[sync-server] progress store: ${store.backend}`)
    console.log(`[sync-server] rate limiter: ${limiter.backend}${limiter.backend === 'sqlite' ? ' (shared across processes)' : ''}`)
    console.log(`[sync-server] accounts: ${users ? `${users.backend}, ${users.countUsers()} registered` : 'disabled (no data dir)'}`)
    console.log(`[sync-server] rate limit: ${rateMax} requests per ${Math.round(rateWindowMs / 1000)}s per client`)
  })
}
