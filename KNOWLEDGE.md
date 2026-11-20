# 🧠 Knowledge — ArchAcademy

Durable engineering knowledge for this repository. Update when a decision or gotcha changes;
do not duplicate the changelog or the roadmap here.

## What this is

A React 19 + TypeScript (strict) educational portal that teaches software architecture:
comparison matrix, architect's compass, career roadmap, system design sandbox, ADR generator,
acronym cheat sheet and 90+ concept pages. Bilingual TR/EN, PWA, offline-capable.

## Stack

| Concern | Choice |
| :--- | :--- |
| Build | Vite 7, `base` from `VITE_BASE_PATH` |
| State | Zustand (`progressStore`, sandbox store) |
| Routing | React Router 7, lazy routes, measured transitions |
| Search | Fuse.js over the `search-index` CMS collection |
| i18n | i18next + browser language detector (TR/EN) |
| Motion | Framer Motion inside lazy routes; chrome uses CSS |
| Tests | Vitest + Testing Library, jsdom |
| Services | Dependency-free Node reference servers (`server/`) |

## Layering (do not violate)

- `src/domain/` — entities, repository ports, pure use cases. No React, no I/O, no env.
- `src/infrastructure/` — adapters: CMS client, cloud progress, offline cache, Zustand stores,
  typed env. Implements domain ports.
- `src/presentation/` — pages, components, hooks, themes. May import `domain` and composed
  infrastructure singletons; never seed data or adapters directly.

The payoff is testability: scoring, topology analysis, progress merging and ADR generation are
pure functions with unit tests and no framework dependency.

## Content pipeline

Content is data, not code. Authoring modules live in `src/infrastructure/*Data.ts`; the build
exports them to `public/cms/*.json` via `npm run cms:export`. `CmsContentRepository` resolves:

1. remote CMS (`VITE_CMS_ENDPOINT`) → 2. bundled seed (`src/infrastructure/cms/seed/`) →
3. precached `public/cms/*.json`.

Registered collections: `search-index`, `acronyms`, `acronym-categories`, `glossary`,
`comparison-matrix`, `comparison-matrix-cards`, `architecture-questions`, `architectures`.
`npm run cms:check` fails when committed JSON drifts from source. Never hand-edit exported JSON.

## Progress & sync

`useProgressStore` is authoritative; `ProgressContext` is a selector adapter. localStorage holds
`arch-progress-cache-v2`, an offline cache only — the cloud wins when reachable. `mergeProgress`
unions monotonic data (completed steps, designs by id) and resolves scalars by `updatedAt`,
keeping the best quiz score. Legacy `arch_progress` is migrated once, then deleted.
`npm run sync:serve` runs the reference REST contract; a conformance test boots it for real.

## Sandbox & ADR

The sandbox topology is scored by `TopologyAnalyzer` (SPOFs, exposed databases, unconsumed
queues, missing caches, cycles). `AdrGenerator` turns a topology into MADR 3.0.0 with drivers,
options, Mermaid flowchart, consequences and risks. Both are pure domain logic; UI only renders.

## Commands that matter

```bash
npm run dev          # Vite dev server
npm run verify       # typecheck + lint + tests + cms:check + adr:lint + docs:audit
npm run test:run     # Vitest once
npm run build        # scan → cms:export → vite build → SPA fallback
npm run sync:serve   # reference progress-sync service
npm run cms:serve    # reference CMS service
npm run services:smoke
```

## Gotchas

- GitHub Pages serves `dist/404.html` for unknown routes; the SPA fallback is generated at build
  time and CI fails if it is missing. Do not delete it.
- Router basename, PWA scope, `start_url` and asset URLs all derive from `VITE_BASE_PATH`.
- Every remote path must degrade: no CMS → seed; no sync endpoint → cache-only.
- `decisions/` holds MADR records; `npm run adr:lint` enforces numbering and structure.
- Docs are capped at 200 lines; split by responsibility instead of appending.
- `.gravityguard/` and `brain/` are local working state; keep them out of product changes.
