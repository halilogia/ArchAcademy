# 🤖 AGENTS — ArchAcademy

Project contract for AI agents and contributors. Global agent rules still apply; this file adds
the boundaries specific to this repository.

## Read before writing

1. [ARCHITECTURE.md](./ARCHITECTURE.md) — layering, CMS port, sync model, build.
2. [KNOWLEDGE.md](./KNOWLEDGE.md) — gotchas and command map.
3. [DESIGN.md](./DESIGN.md) — tokens and UI rules.
4. [TASKS.md](./TASKS.md) — what is actually in flight.

## Hard boundaries

- **Respect the layers.** `domain/` stays framework-free: no React, no `window`, no fetch.
  Adapters live in `infrastructure/`; pages and components in `presentation/`.
- **Content is data.** Never import `*Data.ts` or `cms/seed/*` from presentation code. Go through
  `ContentRepository` / `useCmsCollection`. Exported `public/cms/*.json` is generated — never
  hand-edit it.
- **Offline always works.** Any remote call needs a fallback: CMS → seed, sync → local cache.
- **Pure logic stays pure.** Scoring, topology analysis, progress merge and ADR generation are
  testable functions. Do not move them into components or stores.
- **Type safety.** No `any`, no non-null assertions to silence the compiler, no untyped `catch`.
  Errors are handled or logged with context — never swallowed.
- **Design tokens.** Colors, spacing, radii and type come from `themes/theme.ts`,
  `themes/typography.ts` or the CSS variables in `index.css`. No new hex values in components.
- **Docs stay small.** 200 lines maximum per document. Split by responsibility instead of
  appending a new section to an already long file.

## Verification gate

Run before claiming a task is done:

```bash
npm run verify
```

That covers `tsc --noEmit`, ESLint with zero warnings, Vitest, CMS drift, ADR lint and the
search/wiki audit. For build-affecting changes also run `npm run build` and confirm
`dist/404.html` exists. For service changes run `npm run services:smoke`.

A task is not done because code was written. It is done when the gate passes and the behavior
has been exercised.

## Change discipline

- Make the smallest diff that solves the problem. No speculative abstractions, no dead flags.
- Read a file before editing it; preserve surrounding comments and architecture notes.
- One responsibility per module. If a file grows a second reason to change, split it.
- New architectural decision? Add a MADR record under `decisions/` and keep `npm run adr:lint`
  green.
- Git is additive: no `reset --hard`, no `push --force`, no `clean -fd`. Commit in focused units.

## Where things live

| Path | Purpose |
| :--- | :--- |
| `src/domain/` | entities, ports, pure use cases |
| `src/infrastructure/` | adapters, stores, env, CMS seed |
| `src/presentation/` | pages, components, hooks, themes |
| `src/tests/` | domain, infrastructure and component tests |
| `scripts/` | graph scan, CMS export, audits, smoke |
| `server/` | reference sync + CMS services, SQL schema |
| `decisions/` | MADR architecture decision records |
| `public/cms/` | generated collections precached by the PWA |

## Communication

Report facts: what changed, what the gate returned, what remains. No promises about future
work, no summaries that restate the diff. If something could not be verified, say so plainly.
