# ✅ Tasks — ArchAcademy

Working checklist for the current cycle. Shipped work belongs in [CHANGELOG.md](./CHANGELOG.md);
direction belongs in [ROADMAP.md](./ROADMAP.md). Keep this file short and current.

Current release: **v1.4.1** · Phase: **2 → 3**

## Now

- [ ] **Interactive Case Studies** — the last open Phase 2 item. Guided dilemma simulations:
      monolith → microservices, event-driven transition, Kafka stream processing, CDC with
      Debezium, Raft consensus. Each needs a scenario model, decision points and feedback.
- [ ] **Topology Reviewer v2** — add CAP checks, per-hop latency budgets and cost estimates to
      `TopologyAnalyzer`; render findings inline on the canvas, not only in the side panel.

## Next

- [ ] **Scenario presets** — working starter canvases for e-commerce, payments, IoT ingestion
      and media delivery.
- [ ] **Topology interchange** — JSON, Mermaid, C4-PlantUML and Structurizr DSL import/export,
      plus shareable permalinks.
- [ ] **Decision log** — browsable ADR index over synced records; detect duplicate numbers and
      superseded decisions.
- [ ] **Progress analytics** — learner dashboard: completion per discipline, quiz history,
      saved designs, streak.
- [ ] **Adaptive quizzes** — difficulty and scenario selection from attempt history.

## Phase 3 — AI Architecture Copilot (v2.0.0)

- [ ] **AI Reviewer** — verdict on a topology against CAP, SPOFs and latency bottlenecks, with
      reasoning.
- [ ] **Senior Architect Skill Matrix** — interactive evaluation dashboard for leads and staff.
- [ ] **Decision copilot** — draft an ADR from a design conversation, then challenge it with
      staff-level trade-off questions.

## Backlog (unscheduled)

- [ ] Move page-level Framer Motion to CSS where no gesture handling is needed. Wide refactor
      across the page layer; the library is off the critical path but still ships per route.
- [ ] Multi-writer storage for the reference services. Model is in `server/sql/schema.sql`,
      reasoning in `decisions/0001`; adopting it is real work, not a config change.
- [ ] CMS authoring surface beyond the Console field editor: draft state, review, publish history.

## Definition of done

1. `npm run verify` passes (typecheck, lint, tests, CMS drift, ADR lint, docs audit).
2. New domain logic has unit tests; remote paths have a degradation test.
3. Docs updated where behavior changed; no file exceeds 200 lines.
4. No `any`, no empty catch, no hard-coded design tokens.
