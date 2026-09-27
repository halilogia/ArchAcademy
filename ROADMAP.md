# 🗺️ Roadmap - ArchAcademy

Forward-looking plan for ArchAcademy. Shipped work is recorded in [CHANGELOG.md](./CHANGELOG.md), not here.

Current release: **v1.3.0** · Current phase: **Phase 2 → Phase 3**

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

- [ ] Defer Framer Motion (117 KB) off the critical path. It is loaded before first paint because animations are everywhere; a transition to CSS for the static chrome would cut the initial payload by roughly a fifth.
- [ ] Make the rate limiter shared: its state is per process, so a second instance or a restart resets every budget.
- [ ] Move the sync account directory out of a flat JSON file into the same store as progress, with a rotation and password-reset policy.

## 🧹 P4 — Hygiene

- [ ] Publish the reference services. Accounts, rate limiting and the CMS are single-writer reference implementations; they need deployment config, a real database and a secret store before real learners depend on them.
- [ ] Add a CI job that boots both services and runs the browser build against them, so the contracts are verified in the pipeline rather than only in the local test suite.
