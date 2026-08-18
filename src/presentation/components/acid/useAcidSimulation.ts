import { useState } from 'react';

export function useAcidSimulation() {
  const [accountA, setAccountA] = useState(1000);
  const [accountB, setAccountB] = useState(1000);
  const [step, setStep] = useState(0);
  const [errorMode, setErrorMode] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => setLogs(prev => [...prev, msg]);

  const runTransaction = () => {
    if (step !== 0) return;
    setLogs([]);
    addLog("BEGIN TRANSACTION");
    
    // Step 1: Debit A
    setStep(1);
    setTimeout(() => {
      setAccountA(prev => prev - 100);
      addLog("UPDATE Accounts SET balance -= 100 WHERE id='A'");
      
      // Step 2: Simulate Failure Point
      setTimeout(() => {
        if (errorMode) {
          addLog("ERROR: Power Cut / Constraint Violation! (Simulated)");
          addLog("ROLLBACK initiated...");
          setTimeout(() => {
            setAccountA(prev => prev + 100); // Rollback
            addLog("Changes reverted. Account A restored.");
            setStep(0);
          }, 1500);
        } else {
          setStep(3);
          setTimeout(() => {
            setAccountB(prev => prev + 100);
            addLog("UPDATE Accounts SET balance += 100 WHERE id='B'");
            
            setStep(4);
            setTimeout(() => {
              addLog("COMMIT (Data safely flushed to disk WAL)");
              setStep(0);
            }, 1000);
          }, 1000);
        }
      }, 1000);
    }, 1000);
  };

  return {
    accountA,
    accountB,
    step,
    errorMode,
    setErrorMode,
    logs,
    runTransaction
  };
}
