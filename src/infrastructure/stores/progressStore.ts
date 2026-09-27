import { create } from 'zustand';
import { ProgressState, QuizAttempt, emptyProgress } from '../../domain/entities/Progress';
import { ProgressSyncStatus } from '../../domain/repositories/ProgressRepository';
import { SandboxDesign } from '../../domain/entities/Sandbox';
import {
  completeStepIn,
  recordQuizAttemptIn,
  upsertDesignIn,
  visitIn
} from '../../domain/usecases/ProgressMerger';
import { progressRepository } from '../repositories/SyncingProgressRepository';
import { isOnline } from '../storage/SafeStorage';

export interface ProgressStore {
  progress: ProgressState;
  status: ProgressSyncStatus;
  lastSyncedAt: string | null;
  pendingWrites: number;
  remoteEnabled: boolean;
  hydrated: boolean;
  hydrate: () => Promise<void>;
  completeStep: (stepPath: string) => void;
  setLastVisited: (path: string) => void;
  updateQuizResult: (score: number, rank: string) => void;
  recordQuizAttempt: (attempt: QuizAttempt) => void;
  saveDesign: (design: SandboxDesign) => void;
  flush: () => Promise<void>;
  setOnline: (online: boolean) => void;
}

const now = (): string => new Date().toISOString();

export const useProgressStore = create<ProgressStore>((set, get) => {
  let pushTimer: ReturnType<typeof setTimeout> | null = null;
  let pushInFlight: Promise<void> | null = null;

  const schedulePush = () => {
    if (!progressRepository.remoteEnabled) return;
    if (pushTimer) clearTimeout(pushTimer);
    pushTimer = setTimeout(() => {
      void get().flush();
    }, 1500);
  };

  const mutate = (next: ProgressState) => {
    if (next === get().progress) return;
    set((state) => ({
      progress: next,
      pendingWrites: state.pendingWrites + 1
    }));
    schedulePush();
  };

  const runPush = async (): Promise<void> => {
    if (pushInFlight) return pushInFlight;

    const { progress, pendingWrites } = get();
    if (pendingWrites === 0) return;
    if (!isOnline()) {
      set({ status: 'offline' });
      return;
    }

    set({ status: 'syncing' });
    pushInFlight = (async () => {
      try {
        const authoritative = await progressRepository.save(progress);
        set(() => ({
          progress: authoritative,
          pendingWrites: 0,
          status: 'synced',
          lastSyncedAt: now()
        }));
      } catch {
        set({ status: isOnline() ? 'error' : 'offline' });
      } finally {
        pushInFlight = null;
      }
    })();

    return pushInFlight;
  };

  return {
    progress: emptyProgress(),
    status: 'idle',
    lastSyncedAt: null,
    pendingWrites: 0,
    remoteEnabled: progressRepository.remoteEnabled,
    hydrated: false,

    hydrate: async () => {
      if (get().hydrated) return;
      set({ status: 'syncing' });
      try {
        const loaded = await progressRepository.load();
        set({
          progress: loaded ?? emptyProgress(),
          status: isOnline() ? 'synced' : 'offline',
          lastSyncedAt: loaded ? now() : get().lastSyncedAt,
          hydrated: true
        });
        schedulePush();
      } catch {
        set({ status: 'error', hydrated: true });
      }
    },

    completeStep: (stepPath) => mutate(completeStepIn(get().progress, stepPath, now())),

    setLastVisited: (path) => mutate(visitIn(get().progress, path, now())),

    updateQuizResult: (score, rank) => {
      const current = get().progress;
      if (current.quizResult?.score === score && current.quizResult?.rank === rank) return;
      mutate({ ...current, quizResult: { score, rank }, updatedAt: now(), revision: current.revision + 1 });
    },

    recordQuizAttempt: (attempt) => mutate(recordQuizAttemptIn(get().progress, attempt, now())),

    saveDesign: (design) => mutate(upsertDesignIn(get().progress, design, now())),

    flush: async () => {
      if (pushTimer) {
        clearTimeout(pushTimer);
        pushTimer = null;
      }
      await runPush();
    },

    setOnline: (online) => {
      if (online) {
        set({ status: get().pendingWrites > 0 ? 'syncing' : 'synced' });
        if (get().pendingWrites > 0) void get().flush();
        return;
      }
      set({ status: 'offline' });
    }
  };
});
