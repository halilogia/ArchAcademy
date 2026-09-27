# Cloud Progress Sync — Reference Server

Dependency-free Node implementation of the REST contract that `CloudProgressRepository` speaks.
It exists so the cloud sync feature can be exercised end to end without provisioning a hosted backend.

## Contract

| Method | Path | Behaviour |
|--------|------|-----------|
| `GET` | `/health` | `{ "status": "ok", "owners": <number> }` |
| `GET` | `/progress/{ownerId}` | Stored envelope, or `404` when the owner is unknown |
| `PUT` | `/progress/{ownerId}` | Upserts `{ ownerId, revision, progress }`. Returns `409` plus the stored envelope when the incoming `revision` is lower than the stored one. `422` when the envelope has no `progress`. |
| `DELETE` | `/progress/{ownerId}` | Removes the document |
| `OPTIONS` | any | CORS preflight |

Every response carries permissive CORS headers so a browser-hosted SPA can call it directly.

## Running

```bash
npm run sync:serve
```

| Variable | Default | Purpose |
|----------|---------|---------|
| `PORT` | `8787` | Listen port |
| `HOST` | `127.0.0.1` | Bind address |
| `SYNC_TOKEN` | *(empty)* | When set, requests must send `Authorization: Bearer <token>` |
| `SYNC_DATA_FILE` | `server/data/progress.json` | JSON file persistence (disable with an empty value) |

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
scoping, stale-write rejection, bearer-token enforcement, malformed envelopes, cache/server divergence
and offline behaviour.

```bash
npx vitest run src/tests/infrastructure/syncConformance.test.ts
```

## Production notes

This is a reference implementation, not a production service. Before using it for real learners it needs
per-user authentication (it only understands a static bearer token), rate limiting, request size limits
beyond the 512 KB body cap, and a durable store instead of a JSON file. The wire format is what matters:
any service that implements the table above can replace it.
