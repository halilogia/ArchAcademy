import fs from 'node:fs'
import path from 'node:path'
import http from 'node:http'
import crypto from 'node:crypto'
import { URL, pathToFileURL } from 'node:url'

const MAX_BODY_BYTES = 1024 * 512
const TOKEN_TTL_MS = 1000 * 60 * 60 * 24 * 14
const SCRYPT_KEYLEN = 64
const SCRYPT_OPTIONS = { N: 16_384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 }

export const hashPassword = (password, salt = crypto.randomBytes(16).toString('hex')) => {
  const derived = crypto.scryptSync(password, salt, SCRYPT_KEYLEN, SCRYPT_OPTIONS).toString('hex')
  return `${SCRYPT_KEYLEN}:${salt}:${derived}`
}

export const verifyPassword = (password, stored) => {
  if (typeof stored !== 'string') return false
  const [keylen, salt, expected] = stored.split(':')
  if (!keylen || !salt || !expected) return false
  const derived = crypto.scryptSync(password, salt, Number(keylen), SCRYPT_OPTIONS).toString('hex')
  const expectedBuffer = Buffer.from(expected, 'hex')
  const derivedBuffer = Buffer.from(derived, 'hex')
  if (expectedBuffer.length !== derivedBuffer.length) return false
  return crypto.timingSafeEqual(expectedBuffer, derivedBuffer)
}

const openSqlite = () => {
  try {
    // Available from Node 22.5 behind a flag and by default from Node 24.
    const sqlite = require('node:sqlite')
    return sqlite.DatabaseSync
  } catch {
    return null
  }
}

/**
 * Durable progress store.
 *
 * Prefers SQLite when the runtime provides it: one row per owner, transactional
 * writes. Falls back to an append-only log plus snapshot, which is crash safe but
 * suited to a single process. Whichever backend is used the interface is the same.
 */
export const createProgressStore = ({ dataDir = null, backend = 'auto' } = {}) => {
  const DatabaseSync = backend === 'file' ? null : openSqlite()
  const usingSqlite = backend !== 'file' && Boolean(DatabaseSync) && Boolean(dataDir)

  let db = null
  if (usingSqlite) {
    fs.mkdirSync(dataDir, { recursive: true })
    db = new DatabaseSync(path.join(dataDir, 'progress.db'))
    db.exec(`
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

  const logPath = usingSqlite ? null : dataDir ? path.join(dataDir, 'progress.log') : null
  const snapshotPath = usingSqlite ? null : dataDir ? path.join(dataDir, 'progress.snapshot.json') : null

  const replay = () => {
    if (db) {
      const rows = db.prepare('SELECT owner_id, revision, synced_at, payload FROM progress').all()
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
    if (db || !snapshotPath || !logPath || !dataDir) return
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
    if (db) {
      db.prepare(
        `INSERT INTO progress (owner_id, revision, synced_at, payload, updated_at)
         VALUES (?, ?, ?, ?, ?)
         ON CONFLICT(owner_id) DO UPDATE SET
           revision = excluded.revision,
           synced_at = excluded.synced_at,
           payload = excluded.payload,
           updated_at = excluded.updated_at`
      ).run(
        ownerId,
        envelope.revision ?? 0,
        envelope.syncedAt ?? new Date().toISOString(),
        JSON.stringify(envelope.progress ?? null),
        Date.now()
      )
      return
    }
    if (!logPath || !dataDir) return
    try {
      fs.mkdirSync(dataDir, { recursive: true })
      fs.appendFileSync(logPath, `${JSON.stringify({ ownerId, envelope })}\n`, 'utf8')
      appends += 1
      if (appends >= 50) compact()
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
      if (db) {
        db.prepare('DELETE FROM progress WHERE owner_id = ?').run(ownerId)
        return
      }
      append(ownerId, null)
    },
    size: () => cache.size,
    compact,
    backend: db ? 'sqlite' : logPath ? 'append-log' : 'memory',
    close: () => {
      compact()
      db?.close()
    }
  }
}

export const createRateLimiter = ({ windowMs = 60_000, max = 120 } = {}) => {
  const hits = new Map()

  const clientKey = (request) => {
    const forwarded = request.headers['x-forwarded-for']
    if (typeof forwarded === 'string' && forwarded.length > 0) return forwarded.split(',')[0].trim()
    return request.socket?.remoteAddress ?? 'unknown'
  }

  return {
    allow(request) {
      const key = clientKey(request)
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
    'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
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

export const normalizeBearer = (header) => String(header ?? '').replace(/^Bearer\s+/i, '').trim()

/** User directory backed by scrypt hashes, with issued bearer tokens. */
export const createUserDirectory = ({ dataDir = null } = {}) => {
  const file = dataDir ? path.join(dataDir, 'users.json') : null
  const users = new Map()
  const tokens = new Map()

  if (file && fs.existsSync(file)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(file, 'utf8'))
      for (const entry of parsed.users ?? []) users.set(entry.ownerId, entry)
    } catch (error) {
      console.warn('[sync-server] could not read the user directory:', error.message)
    }
  }

  const persist = () => {
    if (!file) return
    try {
      fs.mkdirSync(path.dirname(file), { recursive: true })
      fs.writeFileSync(file, JSON.stringify({ users: [...users.values()] }, null, 2), 'utf8')
    } catch (error) {
      console.warn('[sync-server] could not persist the user directory:', error.message)
    }
  }

  const issue = (ownerId) => {
    const token = crypto.randomBytes(32).toString('hex')
    tokens.set(token, { ownerId, expiresAt: Date.now() + TOKEN_TTL_MS })
    return token
  }

  const sweep = () => {
    const now = Date.now()
    for (const [token, entry] of tokens) {
      if (entry.expiresAt <= now) tokens.delete(token)
    }
  }

  return {
    enabled: Boolean(file),
    size: () => users.size,
    tokenCount: () => {
      sweep()
      return tokens.size
    },
    register: (ownerId, password) => {
      if (users.has(ownerId)) return { ok: false, reason: 'exists' };
      users.set(ownerId, { ownerId, password: hashPassword(password), createdAt: Date.now() })
      persist()
      return { ok: true, token: issue(ownerId) }
    },
    login: (ownerId, password) => {
      const user = users.get(ownerId)
      if (!user || !verifyPassword(password, user.password)) return { ok: false, reason: 'invalid' }
      return { ok: true, token: issue(ownerId) }
    },
    revoke: (ownerId) => {
      let removed = 0
      for (const [token, entry] of tokens) {
        if (entry.ownerId === ownerId) {
          tokens.delete(token)
          removed += 1
        }
      }
      return removed
    },
    /** Resolves a bearer token to an owner, or null when unknown or expired. */
    resolve: (header) => {
      const bearer = normalizeBearer(header)
      if (!bearer) return null
      sweep()
      const entry = tokens.get(bearer)
      if (!entry) return null
      if (entry.expiresAt <= Date.now()) {
        tokens.delete(bearer)
        return null
      }
      return { ownerId: entry.ownerId, expiresAt: entry.expiresAt }
    }
  }
}

export const createProgressServer = ({
  store,
  token = '',
  userTokens = [],
  rateLimit,
  dataDir = null,
  backend = 'auto',
  users = null
} = {}) => {
  const progressStore = store ?? createProgressStore({ dataDir, backend })
  const limiter = typeof rateLimit?.allow === 'function' ? rateLimit : createRateLimiter(rateLimit)
  const credentials = Array.isArray(userTokens) ? userTokens : parseUserTokens(userTokens)
  const directory = users ?? createUserDirectory({ dataDir })

  const resolveIdentity = (request) => {
    const resolved = directory.resolve(request.headers.authorization)
    if (resolved) return { ownerId: resolved.ownerId, source: 'session' }
    if (credentials.length > 0) return { ownerId: null, source: 'static-tokens' }
    if (token) return { ownerId: null, source: 'shared-token' }
    return { ownerId: null, source: 'open' }
  }

  const server = http.createServer(async (request, response) => {
    const requestUrl = new URL(request.url ?? '/', 'http://localhost')

    if (request.method === 'OPTIONS') {
      sendJson(response, 204, {})
      return
    }

    if (requestUrl.pathname === '/health') {
      sendJson(response, 200, {
        status: 'ok',
        owners: progressStore.size(),
        backend: progressStore.backend,
        rateLimitClients: limiter.size(),
        users: directory.size(),
        sessions: directory.tokenCount(),
        authMode: directory.enabled ? 'account' : credentials.length === 0 ? (token ? 'shared-token' : 'open') : 'per-user'
      })
      return
    }

    if (requestUrl.pathname === '/auth/register' && request.method === 'POST') {
      let payload
      try {
        payload = JSON.parse(await readBody(request))
      } catch {
        sendJson(response, 400, { error: 'invalid_json' })
        return
      }
      if (!payload?.ownerId || !payload?.password) {
        sendJson(response, 422, { error: 'ownerId and password are required' })
        return
      }
      if (String(payload.password).length < 8) {
        sendJson(response, 422, { error: 'password must be at least 8 characters' })
        return
      }
      const result = directory.register(String(payload.ownerId), String(payload.password))
      if (!result.ok) {
        sendJson(response, 409, { error: 'owner_already_registered' })
        return
      }
      sendJson(response, 201, { ownerId: payload.ownerId, token: result.token, expiresInSeconds: TOKEN_TTL_MS / 1000 })
      return
    }

    if (requestUrl.pathname === '/auth/login' && request.method === 'POST') {
      let payload
      try {
        payload = JSON.parse(await readBody(request))
      } catch {
        sendJson(response, 400, { error: 'invalid_json' })
        return
      }
      const result = directory.login(String(payload?.ownerId ?? ''), String(payload?.password ?? ''))
      if (!result.ok) {
        sendJson(response, 401, { error: 'invalid_credentials' })
        return
      }
      sendJson(response, 200, { ownerId: payload.ownerId, token: result.token, expiresInSeconds: TOKEN_TTL_MS / 1000 })
      return
    }

    if (!requestUrl.pathname.startsWith('/progress/')) {
      sendJson(response, 404, { error: 'not_found' })
      return
    }

    const quota = limiter.allow(request)
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

    const requestedOwner = decodeURIComponent(requestUrl.pathname.slice('/progress/'.length)).trim()
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
      let payload
      try {
        payload = JSON.parse(await readBody(request))
      } catch {
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

  return { server, store: progressStore, limiter, users: directory }
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
  const { server, store, limiter, users } = createProgressServer({ token, userTokens, dataDir, rateLimit, backend })
  return new Promise((resolve) => {
    server.listen(port, host, () => {
      const address = server.address()
      resolve({
        server,
        store,
        limiter,
        users,
        port: address.port,
        origin: `http://${host}:${address.port}`,
        close: () =>
          new Promise((done) => {
            store.close?.()
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
  }).then(({ origin, store, users }) => {
    console.log(`[sync-server] listening on ${origin}`)
    console.log(`[sync-server] endpoints: POST /auth/register, POST /auth/login, GET|PUT|DELETE /progress/{ownerId}, GET /health`)
    console.log(`[sync-server] store: ${store.backend}`)
    console.log(`[sync-server] accounts: ${users.enabled ? `${users.size} registered` : 'disabled (no data dir)'}`)
    console.log(`[sync-server] rate limit: ${rateMax} requests per ${Math.round(rateWindowMs / 1000)}s per client`)
  })
}
