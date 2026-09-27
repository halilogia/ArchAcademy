import { describe, expect, it } from 'vitest';
import { lintAdr } from '../../../scripts/lint_adr.mjs';

const valid = `# 0007. Adopt an event-driven checkout topology

- **Status:** Accepted
- **Date:** 2026-09-27
- **Deciders:** Platform Guild

## Context

Checkout traffic spikes 10x.

## Decision Drivers

- p99 latency budget

## Considered Options

- Modular monolith

## Decision

Run the order service behind an edge load balancer.

## Consequences

### Positive

- Independent scaling

### Negative

- One more network hop

## Review Triggers

- A driver changes
`;

const withSections = (replacements: Record<string, string>) => {
  let markdown = valid;
  Object.entries(replacements).forEach(([section, body]) => {
    const pattern = new RegExp(`(##\\s+${section}\\n)`);
    markdown = markdown.replace(pattern, `$1${body}\n`);
  });
  return markdown;
};

describe('MADR linter', () => {
  it('accepts a conforming record', () => {
    const result = lintAdr(valid, '0007-adopt-an-event-driven-checkout-topology.md');
    expect(result.errors).toEqual([]);
    expect(result.warnings).toEqual([]);
    expect(result.number).toBe('0007');
  });

  it('rejects a filename that is not numbered kebab case', () => {
    const result = lintAdr(valid, 'ADR-7 Topology.md');
    expect(result.errors).toContain('filename must look like NNNN-kebab-case-title.md');
  });

  it('rejects a filename number that disagrees with the title', () => {
    const result = lintAdr(valid, '0009-adopt-an-event-driven-checkout-topology.md');
    expect(result.errors).toContain('filename number (0009) does not match the H1 number (0007)');
  });

  it('rejects an unknown status', () => {
    const result = lintAdr(valid.replace('**Status:** Accepted', '**Status:** Maybe'), '0007-decision.md');
    expect(result.errors.some((error) => error.includes('is not one of'))).toBe(true);
  });

  it('rejects a missing status line', () => {
    const result = lintAdr(valid.replace('- **Status:** Accepted\n', ''), '0007-decision.md');
    expect(result.errors).toContain('missing "- **Status:**" metadata line');
  });

  it('rejects a malformed date', () => {
    const result = lintAdr(valid.replace('- **Date:** 2026-09-27', '- **Date:** 27/09/2026'), '0007-decision.md');
    expect(result.errors).toContain('missing "- **Date:**" metadata line in YYYY-MM-DD format');
  });

  it('reports every missing MADR section', () => {
    const stripped = valid.replace(/^##\s+Considered Options[\s\S]*?(?=^##\s)/m, '');
    const result = lintAdr(stripped, '0007-decision.md');
    expect(result.errors).toContain('missing "## Considered Options" section');
  });

  it('rejects an empty section', () => {
    const emptied = valid.replace('## Decision Drivers\n\n- p99 latency budget\n', '## Decision Drivers\n\n');
    const result = lintAdr(emptied, '0007-decision.md');
    expect(result.errors).toContain('section "## Decision Drivers" is empty');
  });

  it('warns when the deciders are missing', () => {
    const result = lintAdr(valid.replace('- **Deciders:** Platform Guild\n', ''), '0007-decision.md');
    expect(result.warnings).toContain('missing "- **Deciders:**" metadata line');
  });

  it('warns about leftover placeholders', () => {
    const result = lintAdr(withSections({ Context: 'TBD' }), '0007-decision.md');
    expect(result.warnings.some((warning) => warning.includes('TBD/TODO'))).toBe(true);
  });

  it('warns when a superseded record names no successor', () => {
    const result = lintAdr(valid.replace('**Status:** Accepted', '**Status:** Superseded'), '0007-decision.md');
    expect(result.warnings.some((warning) => warning.includes('Superseded'))).toBe(true);
  });
});
