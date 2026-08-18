import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export interface UiState {
  count: number;
  loading: boolean;
  message: string;
}

export interface MVISimulationTabProps {
  currentState: UiState;
  onDispatchIntent: (intent: 'INCREMENT' | 'DECREMENT' | 'RESET') => void;
}

export const MVISimulationTab: React.FC<MVISimulationTabProps> = ({
  currentState,
  onDispatchIntent
}) => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div
      key="simulation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        {/* The User Controls (Intent Trigger) */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h3 style={{ marginBottom: '1.5rem', color: '#f43f5e' }}>
            {isEn ? "1. User Intents (Pure Signals)" : "1. User Intents"}
          </h3>
          <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>
            {isEn 
              ? "The View only emits Intent signals. It is structurally impossible for UI components to mutate business state directly." 
              : "Kullanıcı sadece niyetini belirtir. State'i doğrudan değiştiremez."
            }
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
            <button 
              onClick={() => onDispatchIntent('INCREMENT')} 
              disabled={currentState.loading} 
              className="btn-bounce" 
              style={{ padding: '15px 25px', borderRadius: '12px', border: 'none', background: '#334155', color: 'white', cursor: 'pointer', flex: 1 }}
            >
              + Increment Intent
            </button>
            <button 
              onClick={() => onDispatchIntent('DECREMENT')} 
              disabled={currentState.loading} 
              className="btn-bounce" 
              style={{ padding: '15px 25px', borderRadius: '12px', border: 'none', background: '#334155', color: 'white', cursor: 'pointer', flex: 1 }}
            >
              - Decrement Intent
            </button>
            <button 
              onClick={() => onDispatchIntent('RESET')} 
              disabled={currentState.loading} 
              className="btn-bounce" 
              style={{ padding: '15px 25px', borderRadius: '12px', border: 'none', background: '#ef4444', color: 'white', cursor: 'pointer', flex: 1 }}
            >
              Reset Intent
            </button>
          </div>
        </div>

        {/* The Machine (Model & View) */}
        <div className="glass-card" style={{ background: '#020617', border: '1px solid #1e293b' }}>
          {/* State Monitor */}
          <div style={{ marginBottom: '2rem', padding: '15px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', border: '1px solid #10b981' }}>
            <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 800, marginBottom: '10px' }}>
              {isEn ? "2. MODEL (IMMUTABLE SINGLE STATE OF TRUTH)" : "2. MODEL (IMMUTABLE STATE)"}
            </div>
            <pre style={{ margin: 0, fontFamily: 'monospace', color: '#d1fae5', fontSize: '0.9rem' }}>
              {JSON.stringify(currentState, null, 2)}
            </pre>
          </div>

          {/* Rendered View */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: '#3b82f6', fontWeight: 800, marginBottom: '10px' }}>
              {isEn ? "3. VIEW (PURE FUNCTION OF MODEL STATE)" : "3. VIEW (RENDER)"}
            </div>
            <div style={{ fontSize: '4rem', fontWeight: 900, color: 'white' }}>
              {currentState.count}
            </div>
            <div style={{ 
              display: 'inline-block', 
              marginTop: '10px', 
              padding: '4px 12px', 
              borderRadius: '20px', 
              background: currentState.loading ? '#eab308' : '#334155', 
              color: currentState.loading ? 'black' : 'white',
              fontSize: '0.8rem',
              fontWeight: 700
            }}>
              Status: {currentState.message}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MVISimulationTab;
