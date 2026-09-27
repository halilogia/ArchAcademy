import process from 'node:process'

const syncOrigin = (process.env.SYNC_ORIGIN ?? 'http://127.0.0.1:8787').replace(/\/+$/, '')
const cmsOrigin = (process.env.CMS_ORIGIN ?? 'http://127.0.0.1:8788').replace(/\/+$/, '')
const timeoutMs = Number(process.env.SMOKE_TIMEOUT_MS ?? 20_000)
const password = 'smoke test password'

const checks = []
let failures = 0

const check = (name, passed, detail = '') => {
  checks.push({ name, passed, detail })
  if (!passed) failures += 1
  const mark = passed ? 'ok  ' : 'FAIL'
  console.log(`  ${mark} ${name}${detail ? ` (${detail})` : ''}`)
}

const waitForHealth = async (origin, label) => {
  const deadline = Date.now() + timeoutMs
  let lastError = 'timeout'
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${origin}/health`)
      if (response.ok) return await response.json()
      lastError = `status ${response.status}`
    } catch (error) {
      lastError = error.message
    }
    await new Promise((resolve) => setTimeout(resolve, 400))
  }
  throw new Error(`${label} never became healthy: ${lastError}`)
}

const post = (origin, route, body, token = '') =>
  fetch(`${origin}${route}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(body)
  })

const run = async () => {
  console.log(`[smoke] sync: ${syncOrigin}`)
  console.log(`[smoke] cms:  ${cmsOrigin}`)

  const syncHealth = await waitForHealth(syncOrigin, 'sync service')
  const cmsHealth = await waitForHealth(cmsOrigin, 'cms service')
  check('sync reports a known progress backend', Boolean(syncHealth.progressBackend), syncHealth.progressBackend)
  check('sync reports a known rate limit backend', Boolean(syncHealth.rateLimitBackend), syncHealth.rateLimitBackend)
  check('cms is writable for authoring', cmsHealth.writable === true)

  const ownerId = `smoke-${Date.now()}`

  const registered = await post(syncOrigin, '/auth/register', { ownerId, password })
  const registeredBody = await registered.json()
  check('account registers', registered.status === 201, `status ${registered.status}`)
  check('registration issues a session', Boolean(registeredBody.token))
  const token = registeredBody.token ?? ''

  const login = await post(syncOrigin, '/auth/login', { ownerId, password })
  const loginBody = await login.json()
  check('account logs in', login.status === 200, `status ${login.status}`)
  check('login rotates the session', Boolean(loginBody.token) && loginBody.token !== token)

  const authed = (route, init = {}) =>
    fetch(`${syncOrigin}${route}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loginBody.token}`,
        ...(init.headers ?? {})
      }
    })

  const put = await authed(`/progress/${ownerId}`, {
    method: 'PUT',
    body: JSON.stringify({
      ownerId,
      revision: 1,
      progress: { completedSteps: ['/sandbox'], lastVisited: '/sandbox', quizAttempts: [], designs: [], updatedAt: new Date().toISOString(), revision: 1 }
    })
  })
  check('progress push is accepted', put.ok, `status ${put.status}`)

  const pulled = await authed(`/progress/${ownerId}`)
  const pulledBody = await pulled.json()
  check('progress pull round-trips', pulledBody?.progress?.completedSteps?.[0] === '/sandbox')

  const forbidden = await fetch(`${syncOrigin}/progress/someone-else`, {
    headers: { Authorization: `Bearer ${loginBody.token}` }
  })
  check('a session cannot read another owner', forbidden.status === 403, `status ${forbidden.status}`)

  const collections = await (await fetch(`${cmsOrigin}/collections`)).json()
  const names = (collections.collections ?? []).map((entry) => entry.collection)
  check('cms lists the collections the app expects', names.includes('search-index') && names.includes('glossary'), `${names.length} collections`)

  const searchIndex = await (await fetch(`${cmsOrigin}/collections/search-index`)).json()
  check('search index carries entries', Array.isArray(searchIndex.items) && searchIndex.items.length > 50, `${searchIndex.items?.length} entries`)

  const invalidWrite = await fetch(`${cmsOrigin}/collections/glossary`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ collection: 'glossary', version: '1.0.0', updatedAt: '', items: [{ id: 1 }] })
  })
  check('cms rejects a collection that fails its schema', invalidWrite.status === 422, `status ${invalidWrite.status}`)

  console.log(`[smoke] ${checks.length - failures}/${checks.length} checks passed`)
  if (failures > 0) {
    console.error(`[smoke] ${failures} check(s) failed`)
    process.exit(1)
  }
}

run().catch((error) => {
  console.error(`[smoke] aborted: ${error.message}`)
  process.exit(1)
})
