# 🗺️ Roadmap - ArchAcademy

High-level roadmap for ArchAcademy (The Senior Architect Portal).

## 🎯 Phase 1: Architectural Foundations (v1.0.0)
- [x] High-performance glassmorphic UI with React 19, Tailwind CSS, Framer Motion.
- [x] Bilingual support (TR / EN) with `i18next`.
- [x] Interactive architectural graph visualization and search with Fuse.js.
- [x] PWA readiness & offline cache capabilities.

## 🚀 Phase 2: Interactive Decision Matrices & Sandbox (v1.1.0)
- [x] **System Design Sandbox**: Drag-and-drop system design topology canvas (load balancers, message queues, databases, cache layers).
- [x] **Architecture Decision Record (ADR) Generator**: Export standardized ADR markdown documents.
- [ ] **Interactive Case Studies**: Real-world architectural dilemma simulations (e.g. monolith-to-microservices migration, event-driven transitions).

### Platform work shipped with Phase 2
- [x] **Content moved behind a CMS port**: `ContentRepository` with remote-first reads and a bundled seed snapshot for offline/PWA use. The static `graphData` search index is now a CMS collection instead of a hardcoded module.
- [x] **Progress moved off `localStorage`**: Zustand store as the single source of truth, an offline cache that is no longer authoritative, and REST cloud sync with merge-on-conflict.
- [x] **Quiz scoring**: The Architect Challenge now produces a readiness score, a rank band and a synced attempt history.

## 🌟 Phase 3: AI Architecture Copilot & Benchmarking (v2.0.0)
- [ ] **AI Reviewer**: Evaluate user-designed topologies against CAP theorem, single points of failure, and latency bottlenecks.
- [ ] **Senior Architect Skill Matrix**: Interactive evaluation dashboard for engineering leads and staff engineers.
