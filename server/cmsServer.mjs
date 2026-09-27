import fs from 'node:fs'
import path from 'node:path'
import http from 'node:http'
import { URL, pathToFileURL } from 'node:url'
import { COLLECTION_NAMES, validateEnvelope } from '../src/shared/collectionSchema.mjs'

const MAX_BODY_BYTES = 8 * 1024 * 1024

const sendJson = (response, status, body) => {
  const payload = JSON.stringify(body)
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
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

const normalizeBearer = (header) => String(header ?? '').replace(/^Bearer\s+/i, '').trim()

/**
 * Reference CMS.
 *
 * Reads come from the exported seed in public/cms, overlaid with any write stored
 * under dataDir. This is the same wire format the app's HttpContentClient speaks,
 * so pointing VITE_CMS_ENDPOINT at this service is all it takes to go live.
 */
export const createCmsStore = ({ seedDir, dataDir }) => {
  const overrideDir = dataDir ? path.join(dataDir, 'collections') : null

  const seedPath = (name) => path.join(seedDir, `${name}.json`)
  const overridePath = (name) => (overrideDir ? path.join(overrideDir, `${name}.json`) : null)

  const hasOverride = (name) => {
    const target = overridePath(name)
    return Boolean(target && fs.existsSync(target))
  }

  const get = (name) => {
    if (hasOverride(name)) {
      try {
        return JSON.parse(fs.readFileSync(overridePath(name), 'utf8'))
      } catch (error) {
        console.warn(`[cms] override for ${name} is unreadable:`, error.message)
      }
    }
    const seed = seedPath(name)
    if (!fs.existsSync(seed)) return null
    try {
      return JSON.parse(fs.readFileSync(seed, 'utf8'))
    } catch (error) {
      console.warn(`[cms] seed for ${name} is unreadable:`, error.message)
      return null
    }
  }

  const list = () =>
    COLLECTION_NAMES.map((name) => {
      const envelope = get(name)
      return {
        collection: name,
        version: envelope?.version ?? null,
        updatedAt: envelope?.updatedAt ?? null,
        itemCount: envelope?.items.length ?? 0,
        hasOverride: hasOverride(name)
      }
    })

  const set = (name, envelope) => {
    if (!overrideDir) return
    fs.mkdirSync(overrideDir, { recursive: true })
    const target = overridePath(name)
    const temporary = `${target}.tmp`
    fs.writeFileSync(temporary, `${JSON.stringify(envelope)}\n`, 'utf8')
    fs.renameSync(temporary, target)
  }

  const clear = (name) => {
    const target = overridePath(name)
    if (target && fs.existsSync(target)) fs.rmSync(target)
  }

  return { list, get, set, clear, writable: Boolean(overrideDir) }
}

export const createCmsServer = ({ store, token = '' } = {}) => {
  const cmsStore = store

  const server = http.createServer(async (request, response) => {
    const requestUrl = new URL(request.url ?? '/', 'http://localhost')

    if (request.method === 'OPTIONS') {
      sendJson(response, 204, {})
      return
    }

    if (token) {
      const bearer = normalizeBearer(request.headers.authorization)
      if (bearer !== token) {
        sendJson(response, 401, { error: 'unauthorized' })
        return
      }
    }

    if (requestUrl.pathname === '/health') {
      sendJson(response, 200, { status: 'ok', collections: COLLECTION_NAMES.length, writable: cmsStore.writable })
      return
    }

    if (requestUrl.pathname === '/collections') {
      if (request.method !== 'GET') {
        sendJson(response, 405, { error: 'method_not_allowed' })
        return
      }
      sendJson(response, 200, { collections: cmsStore.list() })
      return
    }

    const match = /^\/collections\/([^/]+)(\/reset)?$/.exec(requestUrl.pathname)
    if (!match) {
      sendJson(response, 404, { error: 'not_found' })
      return
    }

    const name = decodeURIComponent(match[1])
    if (!COLLECTION_NAMES.includes(name)) {
      sendJson(response, 404, { error: 'unknown_collection', collections: COLLECTION_NAMES })
      return
    }

    if (match[2] === '/reset') {
      if (request.method !== 'POST') {
        sendJson(response, 405, { error: 'method_not_allowed' })
        return
      }
      if (!cmsStore.writable) {
        sendJson(response, 409, { error: 'read_only' })
        return
      }
      cmsStore.clear(name)
      sendJson(response, 200, { collection: name, reset: true })
      return
    }

    if (request.method === 'GET') {
      const envelope = cmsStore.get(name)
      if (!envelope) {
        sendJson(response, 404, { error: 'not_found' })
        return
      }
      sendJson(response, 200, envelope)
      return
    }

    if (request.method === 'PUT') {
      if (!cmsStore.writable) {
        sendJson(response, 409, { error: 'read_only' })
        return
      }

      let payload
      try {
        payload = JSON.parse(await readBody(request))
      } catch {
        sendJson(response, 400, { error: 'invalid_json' })
        return
      }

      const { errors, warnings } = validateEnvelope(name, payload)
      if (errors.length > 0) {
        sendJson(response, 422, { error: 'validation_failed', errors, warnings })
        return
      }

      const stored = {
        collection: name,
        version: payload.version,
        updatedAt: new Date().toISOString(),
        items: payload.items
      }
      cmsStore.set(name, stored)
      sendJson(response, 200, { ...stored, warnings })
      return
    }

    sendJson(response, 405, { error: 'method_not_allowed' })
  })

  return { server, store: cmsStore }
}

export const startCmsServer = ({ port = 0, host = '127.0.0.1', token = '', seedDir, dataDir = null } = {}) => {
  const store = createCmsStore({
    seedDir: seedDir ?? path.resolve(process.cwd(), 'public/cms'),
    dataDir
  })
  const { server } = createCmsServer({ store, token })
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
  const port = Number(process.env.CMS_PORT ?? 8788)
  const host = process.env.CMS_HOST ?? '127.0.0.1'
  const token = process.env.CMS_TOKEN ?? ''
  const dataDir = process.env.CMS_DATA_DIR ?? path.resolve(process.cwd(), 'server/data/cms')

  startCmsServer({ port, host, token, dataDir: dataDir === '' ? null : dataDir }).then(({ origin }) => {
    console.log(`[cms] listening on ${origin}`)
    console.log(`[cms] seed: public/cms  writes: ${dataDir === '' ? 'disabled (read only)' : dataDir}`)
    console.log(`[cms] auth: ${token ? 'bearer token required' : 'open (development only)'}`)
    console.log(`[cms] endpoints: GET /collections, GET|PUT /collections/{name}, POST /collections/{name}/reset`)
  })
}
