import { ProgressState, QuizAttempt } from '../entities/Progress';
import { SandboxDesign } from '../entities/Sandbox';

const timeOf = (value: string | undefined): number => {
  if (!value) return 0;
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const unionSteps = (local: string[], remote: string[]): string[] => {
  const seen = new Set<string>();
  const merged: string[] = [];
  [...local, ...remote].forEach((step) => {
    if (typeof step !== 'string' || seen.has(step)) return;
    seen.add(step);
    merged.push(step);
  });
  return merged;
};

const mergeAttempts = (local: QuizAttempt[], remote: QuizAttempt[]): QuizAttempt[] => {
  const best = new Map<string, QuizAttempt>();
  [...remote, ...local].forEach((attempt) => {
    if (!attempt || typeof attempt.quizId !== 'string') return;
    const current = best.get(attempt.quizId);
    if (!current) {
      best.set(attempt.quizId, attempt);
      return;
    }
    if (attempt.score > current.score) {
      best.set(attempt.quizId, attempt);
      return;
    }
    if (attempt.score === current.score && timeOf(attempt.at) > timeOf(current.at)) {
      best.set(attempt.quizId, attempt);
    }
  });
  return [...best.values()].sort((a, b) => a.quizId.localeCompare(b.quizId));
};

const mergeDesigns = (local: SandboxDesign[], remote: SandboxDesign[]): SandboxDesign[] => {
  const byId = new Map<string, SandboxDesign>();
  [...remote, ...local].forEach((design) => {
    if (!design || typeof design.id !== 'string') return;
    const current = byId.get(design.id);
    if (!current || timeOf(design.updatedAt) >= timeOf(current.updatedAt)) {
      byId.set(design.id, design);
    }
  });
  return [...byId.values()].sort((a, b) => a.id.localeCompare(b.id));
};

const signature = (state: ProgressState): string =>
  JSON.stringify([
    state.completedSteps,
    state.lastVisited,
    state.quizResult ?? null,
    state.quizAttempts,
    state.designs
  ]);

export const mergeProgress = (local: ProgressState, remote: ProgressState): ProgressState => {
  const localIsNewer = timeOf(local.updatedAt) >= timeOf(remote.updatedAt);
  const completedSteps = unionSteps(local.completedSteps, remote.completedSteps);
  const quizAttempts = mergeAttempts(local.quizAttempts, remote.quizAttempts);
  const designs = mergeDesigns(local.designs, remote.designs);

  const winner = localIsNewer ? local : remote;
  const loser = localIsNewer ? remote : local;

  const merged: ProgressState = {
    completedSteps,
    lastVisited: winner.lastVisited ?? loser.lastVisited ?? null,
    ...(winner.quizResult || loser.quizResult
      ? { quizResult: winner.quizResult ?? loser.quizResult }
      : {}),
    quizAttempts,
    designs,
    updatedAt: winner.updatedAt,
    revision: local.revision
  };

  if (signature(merged) === signature(local)) return local;

  return { ...merged, revision: Math.max(local.revision, remote.revision) + 1 };
};

export const completeStepIn = (state: ProgressState, stepPath: string, at: string): ProgressState => {
  if (state.completedSteps.includes(stepPath)) return state;
  return {
    ...state,
    completedSteps: [...state.completedSteps, stepPath],
    updatedAt: at,
    revision: state.revision + 1
  };
};

export const visitIn = (state: ProgressState, path: string, at: string): ProgressState => {
  if (state.lastVisited === path) return state;
  return { ...state, lastVisited: path, updatedAt: at, revision: state.revision + 1 };
};

export const recordQuizAttemptIn = (
  state: ProgressState,
  attempt: QuizAttempt,
  at: string
): ProgressState => ({
  ...state,
  quizResult: { score: attempt.score, rank: attempt.rank },
  quizAttempts: mergeAttempts(state.quizAttempts, [attempt]),
  updatedAt: at,
  revision: state.revision + 1
});

export const upsertDesignIn = (
  state: ProgressState,
  design: SandboxDesign,
  at: string
): ProgressState => {
  const others = state.designs.filter((entry) => entry.id !== design.id);
  return {
    ...state,
    designs: [...others, { ...design, updatedAt: at }],
    updatedAt: at,
    revision: state.revision + 1
  };
};

export const progressCompletionRate = (state: ProgressState, totalSteps: number): number => {
  if (totalSteps <= 0) return 0;
  return Math.round((Math.min(state.completedSteps.length, totalSteps) / totalSteps) * 100);
};
