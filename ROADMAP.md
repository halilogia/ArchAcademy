# 🗺️ Roadmap - ArchAcademy

Forward-looking plan for ArchAcademy. Shipped work is recorded in [CHANGELOG.md](./CHANGELOG.md), not here.

Current release: **v1.4.0** · Current phase: **Phase 2 → Phase 3**

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

- [ ] Move the remaining page-level Framer Motion animation to CSS where it does not need gesture handling. The library is off the critical path but still ships in every route chunk.
- [ ] Publish a follow-up perf report: the entry chunk is 427 KB and vendor-dominated, and nothing has been measured at runtime (long tasks, interaction latency, route transition cost).
- [ ] Decide the storage story for more than one writer. `server/sql/schema.sql` documents the Postgres shape; nothing is wired to it.
