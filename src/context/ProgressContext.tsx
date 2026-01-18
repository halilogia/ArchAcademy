import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ProgressState {
  completedSteps: string[];
  lastVisited: string | null;
}

interface ProgressContextType {
  progress: ProgressState;
  completeStep: (stepPath: string) => void;
  setLastVisited: (path: string) => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<ProgressState>(() => {
    const saved = localStorage.getItem('arch_progress');
    return saved ? JSON.parse(saved) : { completedSteps: [], lastVisited: null };
  });

  useEffect(() => {
    localStorage.setItem('arch_progress', JSON.stringify(progress));
  }, [progress]);

  const completeStep = (stepPath: string) => {
    setProgress(prev => ({
      ...prev,
      completedSteps: prev.completedSteps.includes(stepPath) 
        ? prev.completedSteps 
        : [...prev.completedSteps, stepPath]
    }));
  };

  const setLastVisited = (path: string) => {
    setProgress(prev => ({ ...prev, lastVisited: path }));
  };

  return (
    <ProgressContext.Provider value={{ progress, completeStep, setLastVisited }}>
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
