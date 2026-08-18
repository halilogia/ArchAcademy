import { useState } from 'react';

export function useReplicationSimulation() {
  const [replicationStatus, setReplicationStatus] = useState<'IDLE' | 'SYNCING' | 'SYNCED'>('IDLE');
  const [primaryData, setPrimaryData] = useState<string[]>([]);
  const [secondary1Data, setSecondary1Data] = useState<string[]>([]);
  const [secondary2Data, setSecondary2Data] = useState<string[]>([]);

  const writeData = () => {
    const newData = `Block #${primaryData.length + 1}`;
    setPrimaryData(prev => [...prev, newData]);
    setReplicationStatus('SYNCING');

    setTimeout(() => {
      setSecondary1Data(prev => [...prev, newData]);
    }, 1500);

    setTimeout(() => {
      setSecondary2Data(prev => [...prev, newData]);
      setReplicationStatus('SYNCED');
    }, 3000);
  };

  return {
    replicationStatus,
    primaryData,
    secondary1Data,
    secondary2Data,
    writeData
  };
}
