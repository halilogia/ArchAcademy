# Local Services

Two dependency-free Node services back the portal's content and progress features. Both are
reference implementations: they exist so the contracts can be exercised end to end, and anything
that speaks the same wire format can replace them.

| Service | Script | Default port | Speaks |
|---------|--------|--------------|--------|
| Progress sync | `npm run sync:serve` | 8787 | `GET/PUT/DELETE /progress/{ownerId}`, `POST /auth/{register,login,logout,password,reset,reset/confirm}`, `GET /health` |
| Content (CMS) | `npm run cms:serve` | 8788 | `GET /collections`, `GET/PUT /collections/{name}`, `POST /collections/{name}/reset` |

## Running them

```bash
npm run sync:serve          # http://127.0.0.1:8787
npm run cms:serve           # http://127.0.0.1:8788
npm run services:smoke      # 13 contract checks against a running pair
docker compose up -d        # both, with named volumes and health checks
```

`Dockerfile` is a single multi-stage image for both; the compose command argument selects which
runs, so the two cannot drift apart.

---

## Progress sync — `server/progressSyncServer.mjs`

### One shared database

`SYNC_BACKEND=auto` uses **SQLite** when the runtime provides `node:sqlite` (Node 24 by default).
Progress, accounts, sessions, password reset tokens and the rate limit windows all live in
`services.db`, so a second process sees the same state. `SYNC_BACKEND=file` forces the fallback:
an append-only log plus snapshot for progress, and a JSON account file. `/health` reports the active
`progressBackend`, `rateLimitBackend` and `authMode`.

### Accounts

Passwords are hashed with scrypt (N=16384) and salted per user; plain passwords are never stored.

| Endpoint | Behaviour |
|----------|-----------|
| `POST /auth/register` | `201` with a session; `409` if taken; `422` under 8 characters |
| `POST /auth/login` | `200` with a session; `401` on bad credentials or a locked account |
| `POST /auth/password` | Changes the password and revokes every session for the account |
| `POST /auth/reset` | Issues a one-time token, valid 1 hour |
| `POST /auth/reset/confirm` | Exchanges the token for a new password and revokes sessions |
| `POST /auth/logout` | Revokes the presented session |

Three policies worth knowing:

- **Session rotation.** A successful login deletes every earlier session for that account, so a stolen
  token dies the moment the owner logs in again.
- **Lockout.** Five consecutive failures lock the account for 15 minutes. The lock is cleared by a
  successful login, a password change or a completed reset.
- **Password recovery.** Reset tokens are single use and expire in an hour; completing one revokes
  every session for the account.

### Rate limiting

Fixed window per client, counted in a table so every process shares the budget, keyed on
`X-Forwarded-For` (falling back to the socket address). Responses carry `X-RateLimit-Remaining` and
`X-RateLimit-Reset`; a throttled response adds `Retry-After`. `src/tests/infrastructure/syncConformance.test.ts`
boots two servers on one database and asserts they consume a single budget between them.

### Configuration

| Variable | Default | Purpose |
|----------|---------|---------|
| `PORT` | `8787` | Listen port |
| `HOST` | `127.0.0.1` | Bind address |
| `SYNC_DATA_DIR` | `server/data` | Database or file location; empty string disables accounts and persistence |
| `SYNC_BACKEND` | `auto` | `auto` picks SQLite when available, otherwise files |
| `SYNC_USER_TOKENS` | *(empty)* | `ownerId:token` pairs, comma separated; `*:<token>` is an admin token |
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
npm run services:smoke
```

The CI pipeline runs the smoke script and then builds the app with both endpoints pointed at the
running services, so the contracts are checked on every push rather than only locally.

## Production notes

Neither service is a production deployment. The rate limiter and account store assume a single
writer unless you take `server/sql/schema.sql` to Postgres, and the CMS holds the whole collection
in memory per request. What matters is the wire format: the two tables at the top of this file are
the contracts the app depends on.
