import { describe, expect, it } from 'vitest';
import { QuizAttempt, emptyProgress } from '../../domain/entities/Progress';
import {
  completeStepIn,
  mergeProgress,
  progressCompletionRate,
  recordQuizAttemptIn,
  upsertDesignIn,
  visitIn
} from '../../domain/usecases/ProgressMerger';
import { SandboxDesign } from '../../domain/entities/Sandbox';

const at = (iso: string) => iso;

const attempt = (overrides: Partial<QuizAttempt> = {}): QuizAttempt => ({
  quizId: 'architect-challenge',
  correct: 2,
  total: 3,
  score: 80,
  rank: 'senior',
  at: at('2026-09-01T10:00:00.000Z'),
  ...overrides
});

const design = (id: string, updatedAt: string): SandboxDesign => ({
  id,
  name: id,
  nodes: [],
  edges: [],
  updatedAt
});

describe('completeStepIn', () => {
  it('appends a new step and bumps the revision', () => {
    const next = completeStepIn(emptyProgress(at('2026-01-01T00:00:00.000Z')), '/sandbox', at('2026-01-02T00:00:00.000Z'));
    expect(next.completedSteps).toEqual(['/sandbox']);
    expect(next.revision).toBe(1);
    expect(next.updatedAt).toBe('2026-01-02T00:00:00.000Z');
  });

  it('is idempotent and keeps the same reference when nothing changes', () => {
    const first = completeStepIn(emptyProgress(), '/sandbox', at('2026-01-01T00:00:00.000Z'));
    const second = completeStepIn(first, '/sandbox', at('2026-01-02T00:00:00.000Z'));
    expect(second).toBe(first);
  });
});

describe('visitIn', () => {
  it('tracks the last visited path', () => {
    const next = visitIn(emptyProgress(), '/clean-arch', at('2026-01-01T00:00:00.000Z'));
    expect(next.lastVisited).toBe('/clean-arch');
  });
});

describe('recordQuizAttemptIn', () => {
  it('stores the attempt and mirrors it into the legacy quizResult shape', () => {
    const next = recordQuizAttemptIn(emptyProgress(), attempt(), at('2026-09-01T10:05:00.000Z'));
    expect(next.quizAttempts).toHaveLength(1);
    expect(next.quizResult).toEqual({ score: 80, rank: 'senior' });
  });

  it('keeps a single attempt per quiz', () => {
    const first = recordQuizAttemptIn(emptyProgress(), attempt(), at('2026-09-01T10:05:00.000Z'));
    const second = recordQuizAttemptIn(first, attempt({ score: 95, at: at('2026-09-02T10:05:00.000Z') }), at('2026-09-02T10:05:00.000Z'));
    expect(second.quizAttempts).toHaveLength(1);
    expect(second.quizAttempts[0].score).toBe(95);
  });
});

describe('upsertDesignIn', () => {
  it('replaces a design with the same id', () => {
    const first = upsertDesignIn(emptyProgress(), design('d1', at('2026-01-01T00:00:00.000Z')), at('2026-01-01T00:00:00.000Z'));
    const second = upsertDesignIn(first, { ...design('d1', 'x'), name: 'renamed' }, at('2026-01-02T00:00:00.000Z'));
    expect(second.designs).toHaveLength(1);
    expect(second.designs[0].name).toBe('renamed');
  });
});

describe('mergeProgress', () => {
  it('unions monotonic completion state from both sides', () => {
    const local = { ...emptyProgress(), completedSteps: ['/a'], updatedAt: at('2026-01-01T00:00:00.000Z') };
    const remote = { ...emptyProgress(), completedSteps: ['/b', '/a'], updatedAt: at('2026-01-02T00:00:00.000Z') };
    const merged = mergeProgress(local, remote);
    expect([...merged.completedSteps].sort()).toEqual(['/a', '/b']);
    expect(merged.revision).toBeGreaterThan(0);
  });

  it('resolves scalar conflicts by last write', () => {
    const local = { ...emptyProgress(), lastVisited: '/old', updatedAt: at('2026-01-01T00:00:00.000Z') };
    const remote = { ...emptyProgress(), lastVisited: '/new', updatedAt: at('2026-01-05T00:00:00.000Z') };
    expect(mergeProgress(local, remote).lastVisited).toBe('/new');
    expect(mergeProgress(remote, local).lastVisited).toBe('/new');
  });

  it('keeps the best score per quiz regardless of arrival order', () => {
    const local = { ...emptyProgress(), quizAttempts: [attempt({ score: 40 })], updatedAt: at('2026-01-01T00:00:00.000Z') };
    const remote = { ...emptyProgress(), quizAttempts: [attempt({ score: 92 })], updatedAt: at('2026-01-02T00:00:00.000Z') };
    expect(mergeProgress(local, remote).quizAttempts[0].score).toBe(92);
    expect(mergeProgress(remote, local).quizAttempts[0].score).toBe(92);
  });

  it('merges designs by id keeping the newest revision', () => {
    const local = { ...emptyProgress(), designs: [design('d1', at('2026-01-09T00:00:00.000Z'))], updatedAt: at('2026-01-09T00:00:00.000Z') };
    const remote = { ...emptyProgress(), designs: [design('d1', at('2026-01-01T00:00:00.000Z')), design('d2', at('2026-01-02T00:00:00.000Z'))], updatedAt: at('2026-01-02T00:00:00.000Z') };
    const merged = mergeProgress(local, remote);
    expect(merged.designs.map((entry) => entry.id)).toEqual(['d1', 'd2']);
    expect(merged.designs.find((entry) => entry.id === 'd1')?.updatedAt).toBe('2026-01-09T00:00:00.000Z');
  });

  it('returns the identical local reference when the remote adds nothing', () => {
    const local = { ...emptyProgress(), completedSteps: ['/a'], updatedAt: at('2026-01-05T00:00:00.000Z') };
    const remote = { ...emptyProgress(), completedSteps: ['/a'], updatedAt: at('2026-01-01T00:00:00.000Z') };
    expect(mergeProgress(local, remote)).toBe(local);
  });
});

describe('progressCompletionRate', () => {
  it('caps at the total step count', () => {
    const state = { ...emptyProgress(), completedSteps: ['/a', '/b', '/c'] };
    expect(progressCompletionRate(state, 2)).toBe(100);
    expect(progressCompletionRate(state, 6)).toBe(50);
    expect(progressCompletionRate(state, 0)).toBe(0);
  });
});
