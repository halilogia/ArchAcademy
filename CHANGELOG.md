# 📜 Changelog - ArchAcademy

All notable changes to the ArchAcademy project will be documented in this file.

## [1.1.1] - 2026-09-27
### Fixed
- **ESLint pipeline repaired.** The flat config matched only `**/*.{js,jsx}` and registered no TypeScript parser, so `npm run lint` failed with 401 parse errors and the quality gate was dead. `typescript-eslint` is now registered for `**/*.{ts,tsx}`, `no-undef`/`no-unused-vars` are swapped for their TypeScript-aware equivalents, and `--report-unused-disable-directives` is enforced. All 139 violations are cleared, including 51 explicit `any` usages and ~85 unused imports, variables and dead simulation code paths.
- Genuine defects surfaced by the newly enforced rules: a temporal dead zone in `vertical.tsx` where an effect called a function declared below it, render-time `Math.random` in `islands-arch`, `lean-architecture` and `vector-dbs`, effect-based URL-to-state syncing in `glossary` and `project-arch`, and a missing timer cleanup in `KappaReplaySimTab`.
- **GitHub Pages SPA routing.** Deploying to `halilogia.github.io/ArchAcademy/` without a `base` meant assets resolved against the domain root and a refresh on any deep link such as `/sandbox` or `/adr-generator` returned a hard 404. The base path is now env-driven, the router receives the matching basename, `dist/404.html` is generated with a path-restoring script, and the service worker has a navigation fallback that denylists API paths.
- **Cloud sync contract.** `CloudProgressRepository` treated a legitimate `409` stale-write rejection as a transport failure, and `mergeProgress` compared only collection lengths, so a remote quiz attempt with a better score was silently discarded whenever both sides held the same number of attempts.

### Added
- **Reference progress sync backend** (`server/progressSyncServer.mjs`): a dependency-free Node service implementing `GET|PUT|DELETE /progress/{ownerId}` and `/health`, with CORS, optional bearer authentication, a 512 KB body cap, JSON file persistence and `409` responses for stale revisions. Documented in `server/README.md`.
- **Sync conformance suite**: 17 tests start the server on an ephemeral port and drive the real `CloudProgressRepository` and `SyncingProgressRepository` against it.
- `npm run sync:serve` to run the reference backend, and `npm run verify` chaining typecheck, lint, tests and the search/wiki audit.

### Changed
- **All remaining content moved behind the CMS port.** `GlossaryData`, `AcronymsData`, `ComparisonMatrixData` and `ArchitectureData` are now exported to `public/cms/*.json` by `scripts/export_cms_collections.mjs` and served through a new static-JSON seed tier, precached by the service worker. The acronyms page, glossary page, `ComparisonMatrix` and `ArchitectureWizard` load them through `useCmsCollection` with loading and error states. The glossary page chunk dropped from 198 KB to 6.8 KB and the acronyms page chunk from 23 KB to 9.8 KB.
- Content and architecture-wizard types moved into the domain layer, so `ArchitectureCalculator` no longer imports from `infrastructure`.
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
