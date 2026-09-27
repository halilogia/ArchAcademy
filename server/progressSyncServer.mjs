import fs from 'node:fs'
import path from 'node:path'
import http from 'node:http'
import { URL, pathToFileURL } from 'node:url'

const MAX_BODY_BYTES = 1024 * 512

export const createProgressStore = ({ dataFile = null } = {}) => {
  const cache = new Map()

  const load = () => {
    if (!dataFile) return
    if (!fs.existsSync(dataFile)) return
    try {
      const parsed = JSON.parse(fs.readFileSync(dataFile, 'utf8'))
      for (const [ownerId, envelope] of Object.entries(parsed)) cache.set(ownerId, envelope)
    } catch (error) {
      console.warn('[sync-server] could not read the data file:', error.message)
    }
  }

  const persist = () => {
    if (!dataFile) return
    try {
      fs.mkdirSync(path.dirname(dataFile), { recursive: true })
      fs.writeFileSync(dataFile, JSON.stringify(Object.fromEntries(cache), null, 2), 'utf8')
    } catch (error) {
      console.warn('[sync-server] could not write the data file:', error.message)
    }
  }

  load()

  return {
    get: (ownerId) => cache.get(ownerId) ?? null,
    set: (ownerId, envelope) => {
      const current = cache.get(ownerId)
      if (current && typeof envelope.revision === 'number' && envelope.revision < current.revision) {
        return { stored: current, conflict: true }
      }
      cache.set(ownerId, envelope)
      persist()
      return { stored: envelope, conflict: false }
    },
    remove: (ownerId) => {
      cache.delete(ownerId)
      persist()
    },
    size: () => cache.size
  }
}

const sendJson = (response, status, body) => {
  const payload = JSON.stringify(body)
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
    'Cache-Control': 'no-store'
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

const isAuthorized = (request, token) => {
  if (!token) return true
  const header = request.headers.authorization ?? ''
  return header === `Bearer ${token}`
}

export const createProgressServer = ({ store, token = '' } = {}) => {
  const progressStore = store ?? createProgressStore()

  const server = http.createServer(async (request, response) => {
    const requestUrl = new URL(request.url ?? '/', 'http://localhost')
    if (request.method === 'OPTIONS') {
      sendJson(response, 204, {})
      return
    }

    if (requestUrl.pathname === '/health') {
      sendJson(response, 200, { status: 'ok', owners: progressStore.size() })
      return
    }

    if (!requestUrl.pathname.startsWith('/progress/')) {
      sendJson(response, 404, { error: 'not_found' })
      return
    }

    if (!isAuthorized(request, token)) {
      sendJson(response, 401, { error: 'unauthorized' })
      return
    }

    const ownerId = decodeURIComponent(requestUrl.pathname.slice('/progress/'.length)).trim()
    if (!ownerId) {
      sendJson(response, 400, { error: 'missing_owner_id' })
      return
    }

    if (request.method === 'GET') {
      const envelope = progressStore.get(ownerId)
      if (!envelope) {
        sendJson(response, 404, { error: 'not_found' })
        return
      }
      sendJson(response, 200, envelope)
      return
    }

    if (request.method === 'PUT') {
      let payload
      try {
        payload = JSON.parse(await readBody(request))
      } catch {
        sendJson(response, 400, { error: 'invalid_json' })
        return
      }

      if (!payload || typeof payload !== 'object' || !payload.progress) {
        sendJson(response, 422, { error: 'invalid_envelope' })
        return
      }

      const { stored, conflict } = progressStore.set(ownerId, {
        ownerId,
        revision: typeof payload.revision === 'number' ? payload.revision : 0,
        syncedAt: new Date().toISOString(),
        progress: payload.progress
      })

      sendJson(response, conflict ? 409 : 200, stored)
      return
    }

    if (request.method === 'DELETE') {
      progressStore.remove(ownerId)
      sendJson(response, 204, {})
      return
    }

    sendJson(response, 405, { error: 'method_not_allowed' })
  })

  return { server, store: progressStore }
}

export const startProgressServer = ({ port = 0, host = '127.0.0.1', token = '', dataFile = null } = {}) => {
  const { server, store } = createProgressServer({ token, dataFile })
  return new Promise((resolve) => {
    server.listen(port, host, () => {
      const address = server.address()
      resolve({
        server,
        store,
        port: address.port,
        origin: `http://${host}:${address.port}`,
        close: () => new Promise((done) => server.close(() => done(undefined)))
      })
    })
  })
}

const isMain = Boolean(process.argv[1]) && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href

if (isMain) {
  const port = Number(process.env.PORT ?? 8787)
  const host = process.env.HOST ?? '127.0.0.1'
  const token = process.env.SYNC_TOKEN ?? ''
  const dataFile = process.env.SYNC_DATA_FILE ?? path.resolve(process.cwd(), 'server/data/progress.json')

  startProgressServer({ port, host, token, dataFile }).then(({ origin }) => {
    console.log(`[sync-server] listening on ${origin}`)
    console.log(`[sync-server] endpoints: GET|PUT /progress/{ownerId}, GET /health`)
    console.log(`[sync-server] persistence: ${dataFile}`)
    console.log(`[sync-server] auth: ${token ? 'bearer token required' : 'open (development only)'}`)
  })
}
