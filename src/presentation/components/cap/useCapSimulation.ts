import { useState } from 'react';

export function useCapSimulation() {
  const [activeMode, setActiveMode] = useState<'CP' | 'AP'>('CP');
  const [isPartitioned, setIsPartitioned] = useState(false);
  const [nodeAData, setNodeAData] = useState(100);
  const [nodeBData, setNodeBData] = useState(100);
  const [writeStatus, setWriteStatus] = useState<'idle' | 'writing' | 'syncing' | 'failed' | 'success'>('idle');

  const handleWrite = (newNodeData: number) => {
    setWriteStatus('writing');
    
    setTimeout(() => {
      setNodeAData(newNodeData);
      
      if (!isPartitioned) {
        setWriteStatus('syncing');
        setTimeout(() => {
          setNodeBData(newNodeData);
          setWriteStatus('success');
        }, 1000);
      } else {
        if (activeMode === 'CP') {
          setWriteStatus('failed');
          setNodeAData(100); // Revert A
        } else {
          setWriteStatus('success');
        }
      }
    }, 800);
  };

  return {
    activeMode,
    setActiveMode,
    isPartitioned,
    setIsPartitioned,
    nodeAData,
    nodeBData,
    writeStatus,
    handleWrite
  };
}
