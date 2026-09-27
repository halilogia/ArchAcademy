# 🗺️ Roadmap - ArchAcademy

Forward-looking plan for ArchAcademy. Shipped work is recorded in [CHANGELOG.md](./CHANGELOG.md), not here.

Current release: **v1.1.0** · Current phase: **Phase 2 → Phase 3**

---

## 🚧 P0 — Blockers that hurt real users or the quality gate

| # | Item | Why it matters | Done when |
|---|------|----------------|-----------|
| 0.1 | **Fix the ESLint pipeline** | `npm run lint` fails with 401 parse errors: the flat config only matches `**/*.{js,jsx}` and no TS parser is registered. The lint gate has been effectively dead. | `typescript-eslint` registered for `**/*.{ts,tsx}`, existing violations triaged, `npm run lint` exits 0 |
| 0.2 | **GitHub Pages SPA routing** | Deploys to `halilogia.github.io/ArchAcademy/` but `vite.config.js` sets no `base` and there is no 404 fallback. Refreshing `/sandbox` or `/adr-generator` returns 404 and assets resolve against the wrong root. | `base` set for the Pages path, `404.html` SPA fallback generated, deep links verified in production |
| 0.3 | **Reference backend for cloud sync** | The client-side sync contract exists and is tested against a fake, but no server implements it, so the feature cannot be exercised end to end. | Minimal service implementing `GET`/`PUT /progress/{ownerId}`, deployed, plus a conformance test that runs against it |
| 0.4 | **Content module migration to the CMS port** | Only `search-index` is registered. `GlossaryData.ts` (203 KB) is still a monolithic synchronous import and is the single largest bundle contributor (`OPTIMIZATIONS.md` FINDING-001). | `glossary`, `acronyms`, `comparison-matrix` and `architecture` registered as CMS collections; presentation imports no data module directly |

## 🧪 P1 — Learning experience

- [ ] **Interactive Case Studies** (last remaining Phase 2 item): guided architectural dilemma simulations — monolith to microservices migration, event-driven transition, Kafka stream processing, CDC with Debezium, Raft consensus.
- [ ] **Topology Reviewer v2**: extend `TopologyAnalyzer` with CAP theorem checks, latency-budget modelling per hop, and cost estimates; surface findings inline on the canvas instead of only in the review panel.
- [ ] **Scenario presets**: pre-built canvases for e-commerce, payments, IoT ingestion and media delivery so learners start from a working design instead of an empty grid.
- [ ] **Topology interchange**: import/export sandbox designs as JSON, Mermaid, C4-PlantUML and Structurizr DSL, plus shareable permalinks.
- [ ] **Decision log**: a browsable ADR index that reads synced records, detects duplicate numbers and flags records superseded by a newer decision.
- [ ] **Progress analytics**: a learner dashboard over the synced store — completion per discipline, quiz score history, sandbox designs, streak.
- [ ] **Adaptive quizzes**: difficulty and scenario selection driven by the learner's quiz attempt history.

## 🤖 P2 — Phase 3: AI Architecture Copilot (v2.0.0)

- [ ] **AI Reviewer**: evaluate a designed topology against CAP, single points of failure and latency bottlenecks, with an explained verdict.
- [ ] **Senior Architect Skill Matrix**: interactive evaluation dashboard for engineering leads and staff engineers.
- [ ] **Decision copilot**: draft an ADR from a design conversation, then challenge it with the trade-off questions a staff reviewer would ask.

## ⚙️ P3 — Performance & quality debt

- [ ] Split the 554 KB entry chunk with `manualChunks` and route-level splitting (FINDING-009).
- [ ] Move Google Fonts off the render-blocking `@import` in `index.css` to `preconnect` + `<link>` (FINDING-005).
- [ ] Respect `prefers-reduced-motion` on infinite Framer Motion loops (FINDING-006).
- [ ] `React.memo` on heavy page components and virtualization in long simulation tabs (FINDING-003).
- [ ] Debounce and cap command palette search results (FINDING-002).
- [ ] Deprecate or remove `useLocalStorage` — product code no longer uses it, only its test.
- [ ] Add a public `docs:audit` script to the default verification chain so `lint`, `check`, `test` and the search/wiki audit run in one command.

## 🧹 P4 — Hygiene

- [ ] Versioned ADR template in `docs/` used by the generator and by contributors.
- [ ] ADR linting in CI (markdownlint + MADR section conformance).
- [ ] Keep `IMPROVEMENTS.md` and `OPTIMIZATIONS.md` historical; annotate resolved findings there instead of rewriting the reports.
