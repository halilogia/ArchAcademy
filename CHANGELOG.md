# 📜 Changelog - ArchAcademy

All notable changes to the ArchAcademy project will be documented in this file.

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
