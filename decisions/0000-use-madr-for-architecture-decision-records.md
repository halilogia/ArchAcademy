# 0000. Use MADR 3.0.0 for architecture decision records

- **Status:** Accepted
- **Date:** 2026-09-27
- **Deciders:** Architecture Team
- **Technical Story:** ADR-0000

## Context

Architecture decisions in this project were being recorded in chat threads, pull request descriptions and one-off markdown files. Those records rotted: no status, no drivers, no consequences, and nothing that could be found six months later. The ADR generator added in v1.1.0 can emit a MADR document from a sandbox topology, but without a canonical template the generated output had no fixed shape to conform to.

## Decision Drivers

- A reviewer must be able to tell what was decided, why, and at what cost
- Records must be machine-checkable so a linter can enforce the format
- The generated output and the hand-written output must be interchangeable
- Numbered, immutable identifiers so decisions can supersede each other

## Considered Options

- Free-form markdown with a "please include context" note
- MADR 3.0.0
- A custom in-house template

## Decision

We use **MADR 3.0.0** for every architecture decision record. Records live in `decisions/` as `NNNN-title-slug.md` and are validated by `npm run adr:lint`, which requires the sections `Context`, `Decision Drivers`, `Considered Options`, `Decision`, `Consequences` and `Review Triggers`, plus a status from the allowed set.

The `/adr-generator` page emits the same structure from a sandbox topology, so a generated record and a hand-written record are interchangeable.

## Consequences

### Positive

- Every record has the same shape, so a decision log can be indexed mechanically
- A linter catches a malformed record before review instead of after merge
- Superseding a decision is explicit: the old record moves to `Superseded` and names its successor

### Negative

- Slight ceremony for small decisions; the numbered sequence accumulates even for trivial choices
- Contributors must learn the section names before their first record

## Review Triggers

- A reviewer asks for a field the template does not capture
- The linter rule set needs to change
- MADR publishes a new major version
