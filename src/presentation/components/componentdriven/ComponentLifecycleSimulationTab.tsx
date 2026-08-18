import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const ComponentLifecycleSimulationTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const [state, setState] = useState<'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [renderCount, setRenderCount] = useState(1);

  const triggerFlow = (targetState: 'SUCCESS' | 'ERROR') => {
    setState('LOADING');
    setRenderCount(prev => prev + 1);

    setTimeout(() => {
      setState(targetState);
      setRenderCount(prev => prev + 1);
    }, 1000);
  };

  const resetFlow = () => {
    setState('IDLE');
    setRenderCount(prev => prev + 1);
  };

  return (
    <motion.div key="simulation" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="glass-card" style={{ padding: '2.5rem' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          {isEn ? "Interactive FSM State Lifecycle Simulator" : "İnteraktif FSM Durum ve Render Simülasyonu"}
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1.5rem' }}>
          {/* Controls */}
          <div>
            <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1rem', fontWeight: 600 }}>
              {isEn ? "Dispatch Action Event:" : "Durum Geçiş Olayını Tetikle:"}
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <button
                onClick={() => triggerFlow('SUCCESS')}
                disabled={state === 'LOADING'}
                style={{
                  padding: '10px 18px',
                  borderRadius: '10px',
                  border: 'none',
                  background: '#22c55e',
                  color: '#020617',
                  fontWeight: 800,
                  cursor: state === 'LOADING' ? 'default' : 'pointer',
                  opacity: state === 'LOADING' ? 0.6 : 1
                }}
              >
                ▶ Fetch Data (Success)
              </button>

              <button
                onClick={() => triggerFlow('ERROR')}
                disabled={state === 'LOADING'}
                style={{
                  padding: '10px 18px',
                  borderRadius: '10px',
                  border: 'none',
                  background: '#ef4444',
                  color: 'white',
                  fontWeight: 800,
                  cursor: state === 'LOADING' ? 'default' : 'pointer',
                  opacity: state === 'LOADING' ? 0.6 : 1
                }}
              >
                ⚠ Simulate API Error
              </button>

              <button
                onClick={resetFlow}
                style={{
                  padding: '10px 18px',
                  borderRadius: '10px',
                  border: '1px solid #334155',
                  background: '#0f172a',
                  color: '#cbd5e1',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <RotateCcw size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Reset
              </button>
            </div>

            <div style={{ background: '#020617', padding: '1.25rem', borderRadius: '12px', border: '1px solid #1e293b' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '6px' }}>RENDER METRICS</div>
              <div style={{ color: 'white', fontWeight: 800 }}>Component Render Cycles: <span style={{ color: '#38bdf8' }}>{renderCount}</span></div>
            </div>
          </div>

          {/* Render Result Screen */}
          <div style={{ background: '#020617', padding: '2rem', borderRadius: '16px', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '180px' }}>
            {state === 'IDLE' && (
              <div style={{ textAlign: 'center', color: '#94a3b8' }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>💤</div>
                <div style={{ fontWeight: 700, color: 'white' }}>State: IDLE</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Waiting for action dispatch</div>
              </div>
            )}

            {state === 'LOADING' && (
              <div style={{ textAlign: 'center', color: '#38bdf8' }}>
                <Loader2 size={36} className="animate-spin" style={{ margin: '0 auto 8px', animation: 'spin 1s linear infinite' }} />
                <div style={{ fontWeight: 700 }}>State: LOADING</div>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Deterministic asynchronous execution</div>
              </div>
            )}

            {state === 'SUCCESS' && (
              <div style={{ textAlign: 'center', color: '#22c55e' }}>
                <CheckCircle2 size={36} style={{ margin: '0 auto 8px' }} />
                <div style={{ fontWeight: 700, color: 'white' }}>State: SUCCESS</div>
                <div style={{ fontSize: '0.8rem', color: '#86efac' }}>Data synchronized (3 items rendered)</div>
              </div>
            )}

            {state === 'ERROR' && (
              <div style={{ textAlign: 'center', color: '#ef4444' }}>
                <AlertCircle size={36} style={{ margin: '0 auto 8px' }} />
                <div style={{ fontWeight: 700, color: 'white' }}>State: ERROR</div>
                <div style={{ fontSize: '0.8rem', color: '#fca5a5' }}>Network 500: Handled gracefully</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ComponentLifecycleSimulationTab;
