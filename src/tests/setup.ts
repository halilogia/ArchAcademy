import '@testing-library/jest-dom/vitest'
import fs from 'node:fs'
import path from 'node:path'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// jsdom has no fetch for static assets, and collections are served from
// public/cms at runtime. Serving the real files keeps component tests on the
// same path the app uses instead of stubbing the data.
const realFetch = globalThis.fetch

const serveStaticCollection = async (input: RequestInfo | URL): Promise<Response | undefined> => {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url
  const match = /\/cms\/([a-z0-9-]+)\.json$/.exec(url)
  if (!match) return undefined
  const file = path.resolve(process.cwd(), 'public', 'cms', `${match[1]}.json`)
  if (!fs.existsSync(file)) return undefined
  const body = fs.readFileSync(file, 'utf8')
  return new Response(body, { status: 200, headers: { 'Content-Type': 'application/json' } })
}

vi.stubGlobal('fetch', async (input: RequestInfo | URL, init?: RequestInit) => {
  const served = await serveStaticCollection(input)
  if (served) return served
  if (typeof realFetch === 'function' && /^https?:/i.test(String(input))) return realFetch(input, init)
  return new Response(JSON.stringify({ error: 'not_found' }), { status: 404 })
})

afterEach(() => {
  cleanup()
})
