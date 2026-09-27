# 0001. Single-writer SQLite for the reference services, Postgres documented for scale

- **Status:** Accepted
- **Date:** 2026-09-27
- **Deciders:** Architecture Team
- **Technical Story:** ADR-0001

## Context

The progress sync and content services began as single-process Node scripts writing a JSON file.
Three things forced a decision:

1. **State had to be shared.** The rate limiter kept its budget in an in-process `Map`, so a restart
   or a second instance reset every budget. Accounts lived in their own JSON file, separate from
   progress, so rotating a session did not touch the store that held the data it protected.
2. **A database was already available.** The runtime provides `node:sqlite` on Node 24, which is
   transactional, WAL-capable and has no dependency cost. The earlier code intended to use it and
   silently did not: it called `require('node:sqlite')` from an ESM module, where `require` is
   undefined, and a `try/catch` turned the failure into a quiet fallback to the file log.
3. **More than one writer is not on the roadmap yet.** Nothing in the project runs the services on
   more than one instance, and adding a connection-pooled database driver for a scenario that does
   not exist would be speculative.

## Decision Drivers

- Rate limit budgets and account sessions must survive a restart and be shared between processes
- Progress, accounts and rate limits must not drift across separate files
- No new runtime dependency, so the services stay deployable with a bare Node image
- The path to more than one writer must be documented even if it is not wired

## Considered Options

- Keep the JSON file and accept per-process state
- SQLite for the reference services, Postgres documented for scale
- Postgres now, behind a `pg` pool

## Decision

We use **SQLite as the single shared store** for the reference services. Progress rows, accounts,
sessions, password reset tokens and rate limit windows live in one `services.db`, so a second
process sees the same state and the rate limiter budget is genuinely shared.

`server/sql/schema.sql` records the same data model in Postgres terms. It is documentation, not
wired code: adopting it means implementing the `ProgressStore`, `AccountStore` and rate limiter
interfaces from `server/lib/auth.mjs` and `server/lib/sqlite.mjs` against a `pg` pool. Nothing about
the HTTP contract changes when that happens.

`SYNC_BACKEND=file` keeps the previous behaviour — an append-only log plus snapshot for progress and
a JSON account file — for runtimes without `node:sqlite`, and a conformance test runs the policy
against both backends so the two cannot drift.

## Consequences

### Positive

- Rate limits, sessions and lockouts survive a restart and are shared across processes
- One file is the whole service state, so backup and restore is one operation
- No new dependency: the services still run from a bare Node image
- The fallback path stays tested rather than being theoretical

### Negative

- SQLite is single-writer. Two processes writing at once serialize, which is correct but slower, and
  it is the ceiling for this design.
- The Postgres path is documented but unexercised; adopting it is real work, not a config change
- Reading `node:sqlite` through `createRequire` is easy to get wrong again, which is how the first
  attempt silently failed

## Review Triggers

- The services are deployed with more than one instance
- Write throughput outgrows serialized transactions
- Node removes or stabilizes `node:sqlite` in a way that changes the fallback assumption
