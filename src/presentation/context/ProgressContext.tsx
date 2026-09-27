import React, { ReactNode, useEffect, useMemo } from 'react';
import { QuizAttempt } from '../../domain/entities/Progress';
import { SandboxDesign } from '../../domain/entities/Sandbox';
import { useProgressStore } from '../../infrastructure/stores/progressStore';

export interface ProgressContextType {
  progress: ReturnType<typeof useProgressStore.getState>['progress'];
  completeStep: (stepPath: string) => void;
  setLastVisited: (path: string) => void;
  updateQuizResult: (score: number, rank: string) => void;
  recordQuizAttempt: (attempt: QuizAttempt) => void;
  saveDesign: (design: SandboxDesign) => void;
  status: ReturnType<typeof useProgressStore.getState>['status'];
  lastSyncedAt: string | null;
  pendingWrites: number;
  remoteEnabled: boolean;
}

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const hydrate = useProgressStore((state) => state.hydrate);
  const setOnline = useProgressStore((state) => state.setOnline);

  useEffect(() => {
    void hydrate();

    const goOnline = () => setOnline(true);
    const goOffline = () => setOnline(false);
    const onVisibility = () => {
      if (document.visibilityState === 'visible') setOnline(true);
    };

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [hydrate, setOnline]);

  return <>{children}</>;
};

export const useProgress = (): ProgressContextType => {
  const progress = useProgressStore((state) => state.progress);
  const status = useProgressStore((state) => state.status);
  const lastSyncedAt = useProgressStore((state) => state.lastSyncedAt);
  const pendingWrites = useProgressStore((state) => state.pendingWrites);
  const remoteEnabled = useProgressStore((state) => state.remoteEnabled);
  const completeStep = useProgressStore((state) => state.completeStep);
  const setLastVisited = useProgressStore((state) => state.setLastVisited);
  const updateQuizResult = useProgressStore((state) => state.updateQuizResult);
  const recordQuizAttempt = useProgressStore((state) => state.recordQuizAttempt);
  const saveDesign = useProgressStore((state) => state.saveDesign);

  return useMemo(
    () => ({
      progress,
      completeStep,
      setLastVisited,
      updateQuizResult,
      recordQuizAttempt,
      saveDesign,
      status,
      lastSyncedAt,
      pendingWrites,
      remoteEnabled
    }),
    [
      progress,
      completeStep,
      setLastVisited,
      updateQuizResult,
      recordQuizAttempt,
      saveDesign,
      status,
      lastSyncedAt,
      pendingWrites,
      remoteEnabled
    ]
  );
};
