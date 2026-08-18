import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export interface ACIDSimulationTabProps {
  accountA: number;
  accountB: number;
  step: number;
  errorMode: boolean;
  logs: string[];
  onErrorModeChange: (val: boolean) => void;
  onRunTransaction: () => void;
}

export const ACIDSimulationTab: React.FC<ACIDSimulationTabProps> = ({
  accountA,
  accountB,
  step,
  errorMode,
  logs,
  onErrorModeChange,
  onRunTransaction
}) => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div 
      key="simulation" 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="glass-card" style={{ padding: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h3 style={{ color: '#facc15', marginBottom: '10px' }}>
            {isEn ? "Atomicity & Isolation Test: Bank Wire Transfer" : "Atomicity Test: Bank Transfer"}
          </h3>
          <p style={{ color: '#94a3b8' }}>
            {isEn ? "Transfer $100 from Account A to Account B under ACID transactional guarantees." : "A Hesabından B Hesabına 100 TL gönderelim."}
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px 0' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white', cursor: 'pointer' }}>
              <input type="checkbox" checked={errorMode} onChange={() => onErrorModeChange(!errorMode)} />
              {isEn ? "Simulate Mid-flight Crash after Debit (Debit A, but crash before Credit B)" : "Simulate Crash after Debit (Parayı çek ama yatırama)"}
            </label>
          </div>

          <button 
            onClick={onRunTransaction}
            disabled={step !== 0}
            className="btn-bounce"
            style={{ 
              padding: '15px 40px', 
              background: step === 0 ? '#facc15' : '#334155', 
              color: step === 0 ? 'black' : 'white', 
              border: 'none', 
              borderRadius: '12px', 
              fontWeight: 'bold', 
              cursor: step === 0 ? 'pointer' : 'default',
              fontSize: '1rem'
            }}
          >
            {step === 0 ? (isEn ? 'BEGIN TRANSACTION' : 'START TRANSACTION') : (isEn ? 'PROCESSING TRANSACTION...' : 'PROCESSING...')}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '30px', alignItems: 'center' }}>
          {/* Account A */}
          <div style={{ textAlign: 'center', padding: '20px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', background: step === 1 ? 'rgba(239, 68, 68, 0.1)' : 'transparent' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>${accountA}</div>
            <div style={{ color: '#94a3b8' }}>Account A</div>
          </div>

          {/* Transaction Log */}
          <div style={{ background: '#020617', padding: '15px', borderRadius: '12px', fontFamily: 'monospace', fontSize: '0.8rem', height: '150px', overflowY: 'auto', border: '1px solid #334155' }}>
            {logs.map((l, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                style={{ marginBottom: '5px', color: l.includes('ERROR') ? '#ef4444' : (l.includes('COMMIT') ? '#4ade80' : '#e2e8f0') }}
              >
                &gt; {l}
              </motion.div>
            ))}
          </div>

          {/* Account B */}
          <div style={{ textAlign: 'center', padding: '20px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', background: step === 3 ? 'rgba(34, 197, 94, 0.1)' : 'transparent' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>${accountB}</div>
            <div style={{ color: '#94a3b8' }}>Account B</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ACIDSimulationTab;
