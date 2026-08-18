import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Zap, RotateCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const LambdaServingSimTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const [queryStatus, setQueryStatus] = useState<'idle' | 'querying' | 'complete'>('idle');
  const [batchResult, setBatchResult] = useState<{ count: number; time: string; source: string } | null>(null);
  const [speedResult, setSpeedResult] = useState<{ count: number; time: string; source: string } | null>(null);

  const runLambdaQuery = () => {
    if (queryStatus === 'querying') return;
    setQueryStatus('querying');
    setBatchResult(null);
    setSpeedResult(null);

    // Speed Layer (Fast)
    setTimeout(() => {
      setSpeedResult({ count: 42, time: '12ms', source: 'Real-time View' });
    }, 800);

    // Batch Layer (Slow)
    setTimeout(() => {
      setBatchResult({ count: 18500, time: '1.2s', source: 'Batch View' });
      setQueryStatus('complete');
    }, 2000);
  };

  return (
    <motion.div
      key="lambda-sim"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="glass-card" style={{ padding: '3rem', border: '1px solid #6366f1' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
            {isEn ? "Lambda 'Serving Layer' Simulation" : "Lambda 'Serving Layer' Simülasyonu"}
          </h2>
          <p style={{ color: '#94a3b8' }}>
            {isEn 
              ? "Merged query across pre-computed Batch Views and in-memory Real-time Speed Views." 
              : "Batch View (Gece işlenen devasa veri) + Real-time View (Son 1 saatin canlı verisi) birleştirmesi."
            }
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) auto minmax(250px, 1fr)', gap: '20px', alignItems: 'center' }}>
          <motion.div animate={{ opacity: batchResult ? 1 : 0.4 }} className="glass-card" style={{ textAlign: 'center', background: 'rgba(99, 102, 241, 0.05)' }}>
            <Database size={40} color="#6366f1" style={{ marginBottom: '1rem' }} />
            <h4 style={{ color: '#6366f1' }}>{isEn ? "Batch View (Hadoop/Spark)" : "Batch View (Hadoop)"}</h4>
            {batchResult ? (
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white' }}>{batchResult.count.toLocaleString()}</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{batchResult.time} (Precomputed)</div>
              </div>
            ) : (
              <div style={{ height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {queryStatus === 'querying' && <RotateCw className="spin" size={24} color="#6366f1" />}
              </div>
            )}
          </motion.div>

          <button 
            onClick={runLambdaQuery} 
            disabled={queryStatus === 'querying'} 
            className="btn-bounce" 
            style={{ padding: '1rem 2rem', borderRadius: '50px', border: 'none', background: 'white', color: 'black', fontWeight: 900, cursor: 'pointer' }}
          >
            {queryStatus === 'querying' ? (isEn ? 'MERGING...' : 'BİRLEŞTİRİLİYOR...') : (isEn ? 'EXECUTE QUERY' : 'SORGULA')}
          </button>

          <motion.div animate={{ opacity: speedResult ? 1 : 0.4 }} className="glass-card" style={{ textAlign: 'center', background: 'rgba(236, 72, 153, 0.05)' }}>
            <Zap size={40} color="#ec4899" style={{ marginBottom: '1rem' }} />
            <h4 style={{ color: '#ec4899' }}>{isEn ? "Speed View (Flink/Storm)" : "Speed View (Flink)"}</h4>
            {speedResult ? (
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ec4899' }}>+{speedResult.count}</div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{speedResult.time} (In-Memory)</div>
              </div>
            ) : (
              <div style={{ height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {queryStatus === 'querying' && <RotateCw className="spin" size={24} color="#ec4899" />}
              </div>
            )}
          </motion.div>
        </div>

        <AnimatePresence>
          {queryStatus === 'complete' && (
            <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ marginTop: '2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', fontWeight: 900, color: 'white' }}>
                {(18500 + 42).toLocaleString()}
              </div>
              <div style={{ color: '#10b981', fontWeight: 800, letterSpacing: '1px' }}>
                {isEn ? "UNIFIED QUERY RESULT" : "BİRLEŞTİRİLMİŞ KONSOLİDE SONUÇ"}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default LambdaServingSimTab;
