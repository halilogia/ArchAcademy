# Cloud Progress Sync — Reference Server

Dependency-free Node implementation of the REST contract that `CloudProgressRepository` speaks.
It exists so the cloud sync feature can be exercised end to end without provisioning a hosted backend.

## Contract

| Method | Path | Behaviour |
|--------|------|-----------|
| `GET` | `/health` | `{ status, owners, rateLimitClients, authMode }` |
| `GET` | `/progress/{ownerId}` | Stored envelope, or `404` when the owner is unknown |
| `PUT` | `/progress/{ownerId}` | Upserts `{ ownerId, revision, progress }`. Returns `409` plus the stored envelope when the incoming `revision` is lower than the stored one. `422` when the envelope has no `progress`. |
| `DELETE` | `/progress/{ownerId}` | Removes the document |
| `OPTIONS` | any | CORS preflight |

Every response carries permissive CORS headers so a browser-hosted SPA can call it directly, plus
`X-RateLimit-Remaining` and `X-RateLimit-Reset`; a throttled response adds `Retry-After`.

## Authentication

Three modes, resolved in this order:

1. **Per-user tokens** (`SYNC_USER_TOKENS=alice:token-a,bob:token-b`) — a token is scoped to one owner.
   A request for someone else's document returns `403`; a missing or unknown token returns `401`.
   An entry of the form `*:some-token` acts as an admin token valid for every owner.
2. **Shared token** (`SYNC_TOKEN=secret`) — one bearer token for all owners.
3. **Open** — no credentials configured. Development only.

The `Authorization` header is normalized, so both `Bearer token-a` and a bare `token-a` are accepted.

## Rate limiting

A fixed-window limiter keyed on `X-Forwarded-For` (falling back to the socket address) rejects with
`429` once the budget is spent. Defaults: 120 requests per 60 seconds per client.

## Persistence

Writes are appended to `progress.log` and compacted into `progress.snapshot.json` every 50 appends and on
shutdown. On boot the snapshot is replayed first and the log second, so a crash or a `kill -9` loses at
most the in-flight line. A torn trailing line from an interrupted write is skipped rather than aborting
the boot. Set `SYNC_DATA_DIR=''` to run in memory only.

## Running

```bash
npm run sync:serve
```

| Variable | Default | Purpose |
|----------|---------|---------|
| `PORT` | `8787` | Listen port |
| `HOST` | `127.0.0.1` | Bind address |
| `SYNC_TOKEN` | *(empty)* | Shared bearer token, used when no per-user tokens are set |
| `SYNC_USER_TOKENS` | *(empty)* | `ownerId:token` pairs, comma separated |
| `SYNC_DATA_DIR` | `server/data` | Persistence directory; empty string disables it |
| `SYNC_RATE_LIMIT` | `120` | Requests allowed per window per client |
| `SYNC_RATE_WINDOW_MS` | `60000` | Rate limit window |

## Wiring the app to it

```bash
cp .env.example .env
# set VITE_PROGRESS_SYNC_ENDPOINT=http://127.0.0.1:8787
# set VITE_PROGRESS_USER_ID=local-learner
npm run dev
```

## Conformance test

`src/tests/infrastructure/syncConformance.test.ts` starts the server on an ephemeral port and drives the
**real** `CloudProgressRepository` and `SyncingProgressRepository` against it: round trips, per-owner
scoping, stale-write rejection, per-user and shared auth, bearer normalization, rate limiting, malformed
envelopes, cache/server divergence, offline behaviour, log replay across a restart, snapshot compaction
and torn-line recovery.

```bash
npx vitest run src/tests/infrastructure/syncConformance.test.ts
```

## Production notes

This is a reference implementation, not a production service. `SYNC_USER_TOKENS` holds static secrets that
have to be rotated by hand, the rate limiter state is per-process so it does not survive a restart or
scale beyond one instance, and persistence is a local log. What matters for a drop-in replacement is the
wire format: any service implementing the table above can take its place.
