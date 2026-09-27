# 🗺️ Roadmap - ArchAcademy

Forward-looking plan for ArchAcademy. Shipped work is recorded in [CHANGELOG.md](./CHANGELOG.md), not here.

Current release: **v1.1.1** · Current phase: **Phase 2 → Phase 3**

---

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

## ⚙️ P3 — Performance & quality

- [ ] Split the 555 KB entry chunk with `manualChunks` and route-level splitting (FINDING-009). Measured after the content migration: the entry is vendor-dominated (React, Framer Motion, Router, i18next, Fuse, Lucide), not content.
- [ ] Move Google Fonts off the render-blocking `@import` in `index.css` to `preconnect` + `<link>` (FINDING-005).
- [ ] Respect `prefers-reduced-motion` on infinite Framer Motion loops (FINDING-006).
- [ ] Debounce and cap command palette search results (FINDING-002).
- [ ] Add a CMS admin surface: today collections are edited in the TypeScript data modules and re-exported. A real CMS needs an authoring UI and per-field validation.
- [ ] Harden the sync service: per-user authentication (it only understands a static bearer token), rate limiting, and a durable store instead of a JSON file.
- [ ] Deprecate or remove `useLocalStorage` — product code no longer uses it, only its test.

## 🧹 P4 — Hygiene

- [ ] Versioned ADR template in `docs/` used by the generator and by contributors.
- [ ] ADR linting in CI (markdownlint + MADR section conformance).
- [ ] Add the `cms:check` drift guard and the sync conformance suite to the CI pipeline, not just `npm run verify`.
- [ ] Link the still-open findings in `OPTIMIZATIONS.md` to their roadmap target so the audit and the plan stay in sync.
