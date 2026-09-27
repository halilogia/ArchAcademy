# 📜 Changelog - ArchAcademy

All notable changes to the ArchAcademy project will be documented in this file.

## [1.4.1] - 2026-09-27

Closes the performance and quality work. The P3 and P4 sections are retired: what remains is
forward-looking product work plus an explicitly unbounded backlog, so this category stops
regenerating itself every pass.

### Added
- **Runtime Diagnostics** (` /diagnostics `): an in-app performance beacon that records long
  tasks, route transition cost, navigation timing and JS heap use in the reader's own browser, and
  a page that reads it back with p50 and p95. Bundle numbers were the only performance evidence in
  the project; this is the runtime half. A capability the browser does not expose is reported as
  "not recorded" rather than as a good number.
- MeasuredRoutes in the router times each lazily loaded route from request to paint and hands the
  result to the beacon.
- decisions/0001: the storage decision for the reference services, recorded with the reasoning
  and the trigger that would reopen it.

## [1.4.0] - 2026-09-27

Closes the last P3 performance and quality items and the P4 hygiene block.

### Changed
- **Framer Motion is off the critical path. Initial JavaScript payload fell from 544 KB to 427 KB.** The app chrome rendered before first paint while the library loaded anyway: `ArchHero`, `CommandPalette`, `ErrorBoundary`, `PageTemplate` and the `MotionConfig` wrapper now use CSS keyframes, and `AppRouter` lost an `AnimatePresence` wrapper that had no `key` and therefore never animated anything. The library still drives page-level motion inside lazily loaded routes.
- The sync service now keeps **progress, accounts and rate limits in one shared SQLite database**, so a second process sees the same state. The rate limiter is a fixed-window counter in a table rather than an in-process `Map`, and the account directory is no longer a separate JSON file.
- Accounts gained **session rotation, lockout and password recovery**: a successful login invalidates every earlier session, five failed attempts lock the account for 15 minutes, and `POST /auth/reset` issues a one-time token that `POST /auth/reset/confirm` exchanges for a new password. `POST /auth/password` changes a password and revokes sessions. All three revoke the account's sessions.
- `search-index` moved from a bundled TypeScript seed to an exported CMS collection, so the reference CMS can serve it and the repository has one source of truth per collection instead of two for the index.
- Content validation now has a single home in `src/shared/collectionSchema.mjs`, and the test setup serves the real `public/cms/*.json` files so component tests exercise the same static path the app uses.

### Added
- **Deployment configuration**: one multi-stage `Dockerfile` for both services, a `docker-compose.yml` with named volumes and health checks, and a `.dockerignore`.
- `server/sql/schema.sql`: the same data model in Postgres terms, for deployments that need more than one writer. It is documentation, not wired code, and says so.
- **`npm run services:smoke`** (`scripts/smoke_services.mjs`): 13 checks that boot-independent contract assertions against both services — health and backends, register, login, session rotation, progress round trip, cross-owner refusal, the collection list the app expects, and that a schema-invalid write is rejected.
- **A CI job that boots both services**, runs the smoke script, and then builds the app with `VITE_CMS_ENDPOINT` and `VITE_PROGRESS_SYNC_ENDPOINT` pointed at them, so the contracts are verified in the pipeline. The build job now depends on it.

### Fixed
- **`node:sqlite` was never actually loaded.** The services called `require('node:sqlite')` from ESM modules, where `require` is undefined, and the `try/catch` silently returned null — so the SQLite path never ran and every deployment quietly used the file log. It now loads through `createRequire`. A previous test passed because it accepted either backend; it now asserts the exact backend for the runtime.
- `node:sqlite` only accepts named parameters, and every call used positional ones. All statements converted.
- Rows come back from SQLite with snake_case columns while the rest of the service works in camelCase, so a user, a session and a reset token were `undefined` after the first read. The reads are mapped now.
- The rate limiter received the whole request in one backend and a client key in the other; both now take a key.
- The complexity guard on `ArchitectureCalculator` measured wall-clock time, which is flaky under parallel test load. It counts property reads on the option weights instead, so the assertion is deterministic: ten times the questions must mean exactly ten times the reads.

## [1.3.0] - 2026-09-27

Closes the remaining P3 performance and quality items and the P4 hygiene block.

### Added
- **Windowed `VirtualList`** (`src/presentation/components/common/VirtualList.tsx`): a dependency-free row virtualizer that measures row heights and supports multi-column layouts. The 508-row glossary grid was the one genuinely unbounded list in the app; it now mounts only the visible rows instead of everything a filter matched, and the "load more" button is gone.
- **Reference CMS service** (`server/cmsServer.mjs`, `npm run cms:serve`): serves the exported seed overlaid with atomic, schema-validated writes. It speaks the contract `HttpContentClient` already uses, so pointing `VITE_CMS_ENDPOINT` at it is all it takes to go live. Writes are validated by the same module the console displays, so a payload accepted in one place is accepted in the other.
- **Content authoring UI** in the Content Console: pick a collection, pick an item, edit its fields, and `PUT` it back to the CMS. String lists take one entry per line, nested objects are edited as JSON, rejections come back with the exact failing paths, and a reset button drops the override back to the seed.
- **Account authentication for the sync service**: scrypt password hashing with per-user salts, `POST /auth/register` and `POST /auth/login`, 14-day bearer sessions, revocation, and sessions scoped to their own owner document. `/health` reports which auth mode is live.
- **SQLite backend for progress storage**: when the runtime provides `node:sqlite` the store uses one row per owner with WAL and transactional upserts, falling back to the append-only log where it does not. `/health` reports the active backend.
- 24 new tests: VirtualList windowing, CMS server reads/writes/validation/auth/restart, account authentication, both store backends, and calculator complexity.

### Changed
- **Initial JavaScript payload down to 544 KB** from 584 KB by dropping the `icons` manual chunk, which forced every icon onto the first load. The entry carries only what the shell needs and each route carries its own.
- Collection validation moved to `src/shared/collectionSchema.mjs` so the browser and the CMS server enforce one rule set.
- `React.memo` on `PageTemplate` and `Navbar` (rendered on every route) and on the largest page components.
- The sync service keeps its per-user static tokens as a fallback mode, but account sessions take precedence when a data directory is configured.

### Fixed
- The MADR linter checked the status with `statusMatch.includes('Superseded')` on the whole match array, so the `Superseded by` status the generator emits never triggered the "names no successor" warning. A conformance test now lints generated records, so `/adr-generator` output is guaranteed to pass `npm run adr:lint`.

### Closed
- **FINDING-008** was stale: the audit described the original `.jsx` implementation. `calculateScores` is a single pass over the question set. A scaling test now asserts that ten times the questions does not cost an order of magnitude more, so a regression would fail the suite.

## [1.2.0] - 2026-09-27

Closes the P3 performance and quality block plus the P4 hygiene block from the previous roadmap.

### Added
- **Content Console** (`/content-console`): lists every collection the portal actually serves, validates each one against a registered schema (required keys, unique identifiers, localized fields) and shows the exact JSON envelope a headless CMS must publish. Backed by `CollectionValidator` in the domain layer, so the same rules can run in CI.
- **Per-user sync authentication**: `SYNC_USER_TOKENS=alice:token-a,bob:token-b` scopes a token to an owner, returns `403` when a valid token addresses someone else's document, and a `*:<token>` entry acts as an admin token.
- **Rate limiting** on the sync service with `X-RateLimit-Remaining`, `X-RateLimit-Reset` and `Retry-After` headers, configurable through `SYNC_RATE_LIMIT` and `SYNC_RATE_WINDOW_MS`.
- **Durable append-only persistence**: progress is appended to `progress.log` and compacted into `progress.snapshot.json`, so a restart replays the log instead of reloading a single JSON file, and an interrupted write leaves a torn trailing line rather than a corrupt store.
- **MADR linter** (`npm run adr:lint`) enforcing numbered filenames, a canonical section order, non-empty sections, a valid status and a parseable date. Covered by 11 unit tests and the first real record in `decisions/`.
- 7 more sync conformance tests covering rate limiting, per-user auth, log replay across a restart, snapshot compaction and torn-line recovery.

### Changed
- **Entry chunk split from 542 KB to 275 KB** with vendor `manualChunks`. React, Framer Motion, i18next, Fuse and Lucide now ship as long-lived, cacheable chunks instead of being re-parsed whenever application code changes.
- Command palette search is debounced by 120 ms, capped at 10 results, and passes a `limit` to Fuse, so typing no longer triggers a full scan per keystroke.
- `prefers-reduced-motion` is honoured app-wide: the app is wrapped in `<MotionConfig reducedMotion="user">` and `index.css` carries a media block for CSS animations and smooth scrolling.
- Google Fonts no longer blocks first paint. The stylesheet is linked with `media="print"` and swapped on load, keeping the `preconnect` hints and a `noscript` fallback.
- CI is now a real gate: `npm run lint` fails the lint job instead of being swallowed, the test job lost its `continue-on-error`, and the CMS drift guard, the ADR linter, the sync conformance suite and the search/wiki audit all run there.

### Removed
- `useLocalStorage`, which no product code used after the progress store landed.

## [1.1.1] - 2026-09-27

Closes the P0 blockers from the previous roadmap: **P0.1** the ESLint pipeline, **P0.2** GitHub Pages SPA routing, **P0.3** the reference cloud sync backend, **P0.4** the remaining content migration.

### Fixed
- **P0.1 — ESLint pipeline repaired.** The flat config matched only `**/*.{js,jsx}` and registered no TypeScript parser, so `npm run lint` failed with 401 parse errors and the quality gate was dead. `typescript-eslint` is now registered for `**/*.{ts,tsx}`, `no-undef`/`no-unused-vars` are swapped for their TypeScript-aware equivalents, and `--report-unused-disable-directives` is enforced. All 139 violations are cleared, including 51 explicit `any` usages and ~85 unused imports, variables and dead simulation code paths.
- Genuine defects surfaced by the newly enforced rules: a temporal dead zone in `vertical.tsx` where an effect called a function declared below it, render-time `Math.random` in `islands-arch`, `lean-architecture` and `vector-dbs`, effect-based URL-to-state syncing in `glossary` and `project-arch`, and a missing timer cleanup in `KappaReplaySimTab`.
- **P0.2 — GitHub Pages SPA routing.** Deploying to `halilogia.github.io/ArchAcademy/` without a `base` meant assets resolved against the domain root and a refresh on any deep link such as `/sandbox` or `/adr-generator` returned a hard 404. The base path is now env-driven, the router receives the matching basename, `dist/404.html` is generated with a path-restoring script, and the service worker has a navigation fallback that denylists API paths.
- **Cloud sync contract.** `CloudProgressRepository` treated a legitimate `409` stale-write rejection as a transport failure, and `mergeProgress` compared only collection lengths, so a remote quiz attempt with a better score was silently discarded whenever both sides held the same number of attempts.

### Added
- **P0.3 — Reference progress sync backend** (`server/progressSyncServer.mjs`): a dependency-free Node service implementing `GET|PUT|DELETE /progress/{ownerId}` and `/health`, with CORS, optional bearer authentication, a 512 KB body cap, JSON file persistence and `409` responses for stale revisions. Documented in `server/README.md`.
- **Sync conformance suite**: 17 tests start the server on an ephemeral port and drive the real `CloudProgressRepository` and `SyncingProgressRepository` against it.
- `npm run sync:serve` to run the reference backend, and `npm run verify` chaining typecheck, lint, tests and the search/wiki audit.

### Changed
- **P0.4 — All remaining content moved behind the CMS port.** `GlossaryData`, `AcronymsData`, `ComparisonMatrixData` and `ArchitectureData` are now exported to `public/cms/*.json` by `scripts/export_cms_collections.mjs` and served through a new static-JSON seed tier, precached by the service worker. The acronyms page, glossary page, `ComparisonMatrix` and `ArchitectureWizard` load them through `useCmsCollection` with loading and error states. The glossary page chunk dropped from 198 KB to 6.8 KB and the acronyms page chunk from 23 KB to 9.8 KB.
- Content and architecture-wizard types moved into the domain layer, so `ArchitectureCalculator` no longer imports from `infrastructure`.
- `scripts/export_cms_collections.mjs check` plus a test guard against the committed collections drifting from the data modules.
- CI now configures GitHub Pages, passes the base path, and fails the build if the SPA fallback is missing.

## [1.1.0] - 2026-09-27
### Added
- **System Design Sandbox** (`/sandbox`): drag-and-drop topology canvas with 13 infrastructure components across four tiers, pointer-based node dragging, click-to-add, connection drawing, undo/redo, per-component replica and technology editing, and a live topology reviewer that scores the design and flags single points of failure, client-exposed databases, unconsumed queues, missing cache layers, missing persistence and request cycles.
- **ADR Generator** (`/adr-generator`): produces a MADR 3.0.0 markdown decision record from the sandbox topology, including context, decision drivers, considered options, the decision, a component inventory, a redundancy plan, an auto-generated Mermaid flowchart, consequences, open architectural risks and review triggers. Copy to clipboard and `.md` download included. The existing Docs & ADR "generator" tab now uses the same engine.
- **Cloud progress sync**: progress, quiz scores and saved sandbox designs now sync through a REST endpoint (`VITE_PROGRESS_SYNC_ENDPOINT`) with merge-on-conflict, retry with exponential backoff, offline queueing and re-sync on reconnect.
- **Quiz scoring**: the Architect Challenge now reports a readiness score (0-100), a localized rank band, a per-archetype breakdown and a synced attempt history.
- `.env.example` documenting the CMS and progress sync configuration.

### Changed
- **Static graph data moved behind a CMS port.** The hardcoded search/graph index is now a `ContentRepository` collection (`search-index`) resolved remote-first with a bundled seed snapshot as the offline fallback, so content can be updated without a rebuild.
- **Progress is no longer sourced from `localStorage`.** `ProgressContext` is now a thin adapter over a Zustand store; localStorage is only an offline cache, and the legacy `arch_progress` key is migrated once and then removed.
- The command palette and its fuzzy search read from the CMS collection instead of a static module.
- Documentation refreshed for v1.1.0: `ROADMAP.md` now tracks only upcoming work, `ARCHITECTURE.md` documents the layering, content port and sync flow, and the READMEs describe the new modules.
- Version bumped to `1.1.0` to match this release.

## [1.0.0] - 2026-08-25
### Added
- Core educational portal designed for senior software architecture mastery.
- Interactive neural graph visualization for architectural patterns and design principles.
- Full bilingual localization (English / Turkish) powered by `i18next`.
- Fuzzy search across all architectural lessons and design patterns using `Fuse.js`.
- Glassmorphic, dark-mode first design built with Tailwind CSS and Framer Motion micro-animations.
- Vitest test suite and TypeScript strict-mode conformance.
- GNU General Public License v3.0 licensing.
