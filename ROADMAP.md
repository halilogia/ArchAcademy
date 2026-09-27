# 🗺️ Roadmap - ArchAcademy

Forward-looking plan for ArchAcademy. Shipped work is recorded in [CHANGELOG.md](./CHANGELOG.md), not here.

Current release: **v1.2.0** · Current phase: **Phase 2 → Phase 3**

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

- [ ] `React.memo` on heavy page components and virtualization in long simulation tabs (FINDING-003). Still unaddressed and unowned.
- [ ] `ArchitectureCalculator` scores in O(n²); the question set is small today so it is cheap, but it is the last open complexity finding (FINDING-008).
- [ ] Split the vendor chunks further. `motion` is 117 KB and `icons` 50 KB; Lucide in particular can be tree-shaken per icon rather than as one module.

## 🧹 P4 — Hygiene

- [ ] `React.memo` sweep and long-list virtualization, tracked above as FINDING-003 and FINDING-008.
- [ ] Add a content authoring UI that writes to a CMS backend. The Content Console validates and exports; it does not yet write.
- [ ] Point the reference sync service at a durable database and real user authentication instead of per-user static tokens.
