import { SandboxDesign } from './Sandbox';

export type QuizBand = 'principal' | 'senior' | 'specialist' | 'trainee';

export interface QuizAttempt {
  quizId: string;
  correct: number;
  total: number;
  score: number;
  rank: QuizBand;
  at: string;
}

export interface ProgressState {
  completedSteps: string[];
  lastVisited: string | null;
  quizResult?: { score: number; rank: string };
  quizAttempts: QuizAttempt[];
  designs: SandboxDesign[];
  updatedAt: string;
  revision: number;
}

export interface ProgressEnvelope {
  ownerId: string;
  revision: number;
  syncedAt: string;
  progress: ProgressState;
}

export const PROGRESS_SCHEMA_VERSION = 2;

export const emptyProgress = (at = new Date().toISOString()): ProgressState => ({
  completedSteps: [],
  lastVisited: null,
  quizAttempts: [],
  designs: [],
  updatedAt: at,
  revision: 0
});

export const isProgressState = (value: unknown): value is ProgressState => {
  if (typeof value !== 'object' || value === null) return false;
  return Array.isArray((value as Partial<ProgressState>).completedSteps);
};

export const normalizeProgress = (value: unknown, at = new Date().toISOString()): ProgressState => {
  if (!isProgressState(value)) return emptyProgress(at);
  const candidate: Partial<ProgressState> = value;
  const steps = value.completedSteps.filter((step): step is string => typeof step === 'string');
  return {
    completedSteps: [...new Set(steps)],
    lastVisited: typeof candidate.lastVisited === 'string' ? candidate.lastVisited : null,
    ...(candidate.quizResult ? { quizResult: candidate.quizResult } : {}),
    quizAttempts: Array.isArray(candidate.quizAttempts) ? candidate.quizAttempts : [],
    designs: Array.isArray(candidate.designs) ? candidate.designs : [],
    updatedAt: typeof candidate.updatedAt === 'string' ? candidate.updatedAt : at,
    revision: typeof candidate.revision === 'number' ? candidate.revision : 0
  };
};
