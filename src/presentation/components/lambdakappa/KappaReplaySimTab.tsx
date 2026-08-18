import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export interface LogEvent {
  id: number;
  value: number;
  timestamp: string;
}

export const KappaReplaySimTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const [isReplaying, setIsReplaying] = useState(false);
  const [processingIndex, setProcessingIndex] = useState(-1);
  const [processingLogic, setProcessingLogic] = useState<'sum' | 'double'>('sum');
  const [kappaResult, setKappaResult] = useState(0);

  const eventLog: LogEvent[] = [
    { id: 1, value: 10, timestamp: '10:00:01' },
    { id: 2, value: 20, timestamp: '10:00:05' },
    { id: 3, value: 5,  timestamp: '10:00:12' },
    { id: 4, value: 50, timestamp: '10:00:45' }
  ];

  const startKappaReplay = (newLogic: 'sum' | 'double') => {
    if (isReplaying) return;
    setIsReplaying(true);
    setProcessingLogic(newLogic);
    setKappaResult(0);
    setProcessingIndex(0);
  };

  useEffect(() => {
    if (isReplaying && processingIndex >= 0 && processingIndex < eventLog.length) {
      const timer = setTimeout(() => {
        const event = eventLog[processingIndex];
        setKappaResult(prev => {
          if (processingLogic === 'sum') return prev + event.value;
          if (processingLogic === 'double') return prev + (event.value * 2);
          return prev;
        });
        setProcessingIndex(prev => prev + 1);
      }, 800); 
      return () => clearTimeout(timer);
    } else if (processingIndex >= eventLog.length) {
      setIsReplaying(false);
      setProcessingIndex(-1);
    }
  }, [isReplaying, processingIndex, processingLogic]);

  return (
    <motion.div
      key="kappa-sim"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="glass-card" style={{ padding: '3rem', border: '1px solid #06b6d4' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
            {isEn ? "Kappa 'Stream Replay' Simulation" : "Kappa 'Stream Replay' Simülasyonu"}
          </h2>
          <p style={{ color: '#94a3b8' }}>
            {isEn 
              ? "When transformation code is upgraded, the old state store is dropped, the Kafka immutable commit log is replayed from offset 0, and the new projection is populated." 
              : "Kod değiştiğinde veritabanı silinir, Kafka Log başa sarılır (Replay) ve yeni kodla tekrar işlenir."
            }
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 2fr', gap: '30px' }}>
          {/* Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: processingLogic === 'sum' ? '2px solid #8b5cf6' : '1px solid transparent' }}>
              <h4 style={{ color: 'white', marginBottom: '5px' }}>v1.0: Sum (x)</h4>
              <button 
                onClick={() => startKappaReplay('sum')} 
                disabled={isReplaying} 
                style={{ width: '100%', padding: '10px', background: '#334155', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', opacity: isReplaying ? 0.5 : 1, fontWeight: 700 }}
              >
                {isEn ? "Replay v1 (Sum)" : "v1 ile Yeniden Oynat"}
              </button>
            </div>
            <div style={{ padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: processingLogic === 'double' ? '2px solid #ec4899' : '1px solid transparent' }}>
              <h4 style={{ color: 'white', marginBottom: '5px' }}>v2.0: Double (x * 2)</h4>
              <button 
                onClick={() => startKappaReplay('double')} 
                disabled={isReplaying} 
                style={{ width: '100%', padding: '10px', background: '#ec4899', border: 'none', borderRadius: '8px', color: 'black', fontWeight: 800, cursor: 'pointer', opacity: isReplaying ? 0.5 : 1 }}
              >
                {isEn ? "Replay v2 (Double)" : "v2 ile Yeniden Oynat"}
              </button>
            </div>
          </div>

          {/* Visualizer */}
          <div style={{ background: '#020617', borderRadius: '16px', padding: '20px', border: '1px solid #334155', overflow: 'hidden' }}>
            <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700 }}>
              <span>IMMUTABLE KAFKA EVENT LOG (Offset 0..3)</span>
              {isReplaying && <span style={{ color: '#8b5cf6' }}>{isEn ? "Reprocessing Log..." : "Log Baştan İşleniyor..."}</span>}
            </div>
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '20px' }}>
              {eventLog.map((evt, i) => (
                <motion.div 
                  key={evt.id}
                  animate={{ 
                    scale: processingIndex === i ? 1.1 : 1, 
                    borderColor: processingIndex === i ? '#8b5cf6' : '#334155', 
                    backgroundColor: processingIndex > i ? 'rgba(139, 92, 246, 0.2)' : 'rgba(30, 41, 59, 0.5)' 
                  }}
                  style={{ minWidth: '80px', height: '80px', border: '2px solid #334155', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                >
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>#{evt.id}</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white' }}>{evt.value}</span>
                </motion.div>
              ))}
            </div>
            <div style={{ marginTop: '20px', padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700 }}>{isEn ? "Computed State View" : "Hesaplanan Durum Görünümü"}</div>
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff' }}>{kappaResult}</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default KappaReplaySimTab;
