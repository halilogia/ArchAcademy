import React, { createContext, useContext, ReactNode } from 'react';
import useLocalStorage from '../presentation/hooks/useLocalStorage';

interface ProgressState {
  completedSteps: string[];
  lastVisited: string | null;
  quizResult?: { score: number; rank: string };
}

interface ProgressContextType {
  progress: ProgressState;
  completeStep: (stepPath: string) => void;
  setLastVisited: (path: string) => void;
  updateQuizResult: (score: number, rank: string) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Use Custom Hook for clean persistence logic
  const [progress, setProgress] = useLocalStorage<ProgressState>('arch_progress', { 
    completedSteps: [], 
    lastVisited: null 
  });

  const completeStep = (stepPath: string) => {
    setProgress({
      ...progress,
      completedSteps: progress.completedSteps.includes(stepPath) 
        ? progress.completedSteps 
        : [...progress.completedSteps, stepPath]
    });
  };

  const setLastVisited = (path: string) => {
    setProgress({ ...progress, lastVisited: path });
  };

  const updateQuizResult = (score: number, rank: string) => {
    setProgress({ ...progress, quizResult: { score, rank } });
  };

  return (
    <ProgressContext.Provider value={{ progress, completeStep, setLastVisited, updateQuizResult }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
