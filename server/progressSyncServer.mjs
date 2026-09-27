import fs from 'node:fs'
import path from 'node:path'
import http from 'node:http'
import { URL, pathToFileURL } from 'node:url'

const MAX_BODY_BYTES = 1024 * 512
const COMPACT_AFTER_APPENDS = 50

export const createProgressStore = ({ dataDir = null } = {}) => {
  const cache = new Map()
  let appends = 0

  const logPath = dataDir ? path.join(dataDir, 'progress.log') : null
  const snapshotPath = dataDir ? path.join(dataDir, 'progress.snapshot.json') : null

  const replay = () => {
    if (!snapshotPath || !fs.existsSync(snapshotPath)) return
    try {
      const parsed = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'))
      for (const [ownerId, envelope] of Object.entries(parsed)) cache.set(ownerId, envelope)
    } catch (error) {
      console.warn('[sync-server] could not read the snapshot:', error.message)
    }
  }

  const replayLog = () => {
    if (!logPath || !fs.existsSync(logPath)) return
    const lines = fs.readFileSync(logPath, 'utf8').split('\n')
    let replayed = 0
    for (const line of lines) {
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
    if (!snapshotPath || !logPath || !dataDir) return
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

  if (dataDir) {
    replay()
    replayLog()
  }

  return {
    get: (ownerId) => cache.get(ownerId) ?? null,
    set: (ownerId, envelope) => {
      const current = cache.get(ownerId)
      if (current && typeof envelope.revision === 'number' && envelope.revision < current.revision) {
        return { stored: current, conflict: true }
      }
      cache.set(ownerId, envelope)
      append(ownerId, envelope)
      return { stored: envelope, conflict: false }
    },
    remove: (ownerId) => {
      cache.delete(ownerId)
      append(ownerId, null)
    },
    size: () => cache.size,
    compact
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

export const authorize = ({ header, ownerId, userTokens, sharedToken }) => {
  const bearer = normalizeBearer(header)

  if (userTokens.length > 0) {
    const match = userTokens.find((entry) => entry.token === bearer)
    if (!match) return { allowed: false, reason: 'unauthorized' }
    if (match.ownerId !== '*' && match.ownerId !== ownerId) return { allowed: false, reason: 'forbidden' }
    return { allowed: true }
  }

  if (sharedToken && bearer !== sharedToken) return { allowed: false, reason: 'unauthorized' }
  return { allowed: true }
}

export const createProgressServer = ({ store, token = '', userTokens = [], rateLimit, dataDir = null } = {}) => {
  const progressStore = store ?? createProgressStore({ dataDir })
  const limiter = typeof rateLimit?.allow === 'function' ? rateLimit : createRateLimiter(rateLimit)
  const credentials = Array.isArray(userTokens) ? userTokens : parseUserTokens(userTokens)

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
        rateLimitClients: limiter.size(),
        authMode: credentials.length === 0 ? (token ? 'shared-token' : 'open') : 'per-user'
      })
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

    const ownerId = decodeURIComponent(requestUrl.pathname.slice('/progress/'.length)).trim()
    if (!ownerId) {
      sendJson(response, 400, { error: 'missing_owner_id' }, rateHeaders)
      return
    }

    const auth = authorize({
      header: request.headers.authorization,
      ownerId,
      userTokens: credentials,
      sharedToken: token
    })
    if (!auth.allowed) {
      sendJson(response, auth.reason === 'forbidden' ? 403 : 401, { error: auth.reason }, rateHeaders)
      return
    }

    if (request.method === 'GET') {
      const envelope = progressStore.get(ownerId)
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

      const { stored, conflict } = progressStore.set(ownerId, {
        ownerId,
        revision: typeof payload.revision === 'number' ? payload.revision : 0,
        syncedAt: new Date().toISOString(),
        progress: payload.progress
      })

      sendJson(response, conflict ? 409 : 200, stored, rateHeaders)
      return
    }

    if (request.method === 'DELETE') {
      progressStore.remove(ownerId)
      sendJson(response, 204, {}, rateHeaders)
      return
    }

    sendJson(response, 405, { error: 'method_not_allowed' }, rateHeaders)
  })

  return { server, store: progressStore, limiter }
}

export const startProgressServer = ({
  port = 0,
  host = '127.0.0.1',
  token = '',
  userTokens = [],
  dataDir = null,
  rateLimit = undefined
} = {}) => {
  const { server, store, limiter } = createProgressServer({ token, userTokens, dataDir, rateLimit })
  return new Promise((resolve) => {
    server.listen(port, host, () => {
      const address = server.address()
      resolve({
        server,
        store,
        limiter,
        port: address.port,
        origin: `http://${host}:${address.port}`,
        close: () =>
          new Promise((done) => {
            store.compact?.()
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
  const rateMax = Number(process.env.SYNC_RATE_LIMIT ?? 120)
  const rateWindowMs = Number(process.env.SYNC_RATE_WINDOW_MS ?? 60_000)

  startProgressServer({
    port,
    host,
    token: sharedToken,
    userTokens,
    dataDir: dataDir === '' ? null : dataDir,
    rateLimit: { windowMs: rateWindowMs, max: rateMax }
  }).then(({ origin }) => {
    console.log(`[sync-server] listening on ${origin}`)
    console.log(`[sync-server] endpoints: GET|PUT|DELETE /progress/{ownerId}, GET /health`)
    console.log(`[sync-server] persistence: ${dataDir === '' ? 'in-memory' : `${dataDir} (append-only log + snapshot)`}`)
    console.log(
      `[sync-server] auth: ${
        userTokens.length > 0
          ? `${userTokens.length} per-user token(s)`
          : sharedToken
            ? 'shared bearer token'
            : 'open (development only)'
      }`
    )
    console.log(`[sync-server] rate limit: ${rateMax} requests per ${Math.round(rateWindowMs / 1000)}s per client`)
  })
}
