# Local Services

Two dependency-free Node services back the portal's content and progress features. Both are
reference implementations: they exist so the contracts can be exercised end to end, and anything
that speaks the same wire format can replace them.

| Service | Script | Default port | Speaks |
|---------|--------|--------------|--------|
| Progress sync | `npm run sync:serve` | 8787 | `GET/PUT/DELETE /progress/{ownerId}`, `POST /auth/register`, `POST /auth/login`, `GET /health` |
| Content (CMS) | `npm run cms:serve` | 8788 | `GET /collections`, `GET/PUT /collections/{name}`, `POST /collections/{name}/reset` |

---

## Progress sync — `server/progressSyncServer.mjs`

### Accounts

The service has its own account system. Passwords are hashed with scrypt (N=16384) and salted
per user; plain passwords are never stored. `POST /auth/login` and `POST /auth/register` issue a
random 32-byte bearer token valid for 14 days, and `/health` reports `authMode` so you can tell
which mode is live:

| `authMode` | Enabled when | Behaviour |
|------------|--------------|-----------|
| `account` | a data directory is configured | Sessions issued by `/auth/*`; a session may only touch its own owner document (`403` otherwise) |
| `per-user` | `SYNC_USER_TOKENS` is set | `ownerId:token` pairs; `*:<token>` is an admin token |
| `shared-token` | only `SYNC_TOKEN` is set | one bearer token for every owner |
| `open` | nothing configured | development only |

### Persistence

`SYNC_BACKEND=auto` (the default) uses **SQLite** when the runtime provides `node:sqlite` — one row
per owner, WAL journal, transactional upserts. It falls back to an **append-only log plus snapshot**
(`SYNC_BACKEND=file`), which is crash safe but suited to a single process. `/health` reports the
active backend. See the "Durable store backends" tests in
`src/tests/infrastructure/syncConformance.test.ts` for both paths.

### Rate limiting

Fixed window per `X-Forwarded-For` (falling back to the socket address). Responses carry
`X-RateLimit-Remaining` and `X-RateLimit-Reset`; a throttled response adds `Retry-After`.

### Configuration

| Variable | Default | Purpose |
|----------|---------|---------|
| `PORT` | `8787` | Listen port |
| `HOST` | `127.0.0.1` | Bind address |
| `SYNC_DATA_DIR` | `server/data` | Accounts and progress; empty string disables both |
| `SYNC_BACKEND` | `auto` | `auto` picks SQLite when available, otherwise the log |
| `SYNC_USER_TOKENS` | *(empty)* | `ownerId:token` pairs, comma separated |
| `SYNC_TOKEN` | *(empty)* | Shared bearer token, used when no per-user tokens are set |
| `SYNC_RATE_LIMIT` | `120` | Requests per window per client |
| `SYNC_RATE_WINDOW_MS` | `60000` | Rate limit window |

---

## Content — `server/cmsServer.mjs`

Reads resolve from the exported seed in `public/cms`, overlaid by any write stored under the data
directory. This is exactly what `HttpContentClient` already speaks, so pointing
`VITE_CMS_ENDPOINT` at this service is all it takes to go live.

| Method | Path | Behaviour |
|--------|------|-----------|
| `GET` | `/health` | `{ status, collections, writable }` |
| `GET` | `/collections` | One summary per collection: version, updatedAt, itemCount, hasOverride |
| `GET` | `/collections/{name}` | The envelope, or `404` with the valid names |
| `PUT` | `/collections/{name}` | Upserts a collection. `422` with per-path issues when validation fails |
| `POST` | `/collections/{name}/reset` | Drops the override and falls back to the seed |

Writes are validated by `src/shared/collectionSchema.mjs`, the same module the Content Console uses
to display findings, so a payload accepted in the browser is accepted on the server and vice versa.
Writes are atomic (temp file plus rename) and survive a restart.

| Variable | Default | Purpose |
|----------|---------|---------|
| `CMS_PORT` | `8788` | Listen port |
| `CMS_HOST` | `127.0.0.1` | Bind address |
| `CMS_TOKEN` | *(empty)* | Bearer token required for every read and write |
| `CMS_DATA_DIR` | `server/data/cms` | Where overrides live; empty string serves the seed read only |

---

## Wiring the app to them

```bash
cp .env.example .env
# VITE_CMS_ENDPOINT=http://127.0.0.1:8788
# VITE_PROGRESS_SYNC_ENDPOINT=http://127.0.0.1:8787
# VITE_PROGRESS_USER_ID=local-learner
npm run dev
```

## Tests

```bash
npx vitest run src/tests/infrastructure/syncConformance.test.ts
npx vitest run src/tests/infrastructure/cmsServer.test.ts
```

## Production notes

Neither service is a production deployment. Accounts are a flat JSON file with no rotation policy,
the rate limiter state is per process, and the CMS is single-writer. What matters is the wire
format: the two tables at the top of this file are the contracts the app depends on.
