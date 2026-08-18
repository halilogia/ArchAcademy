import React from 'react';
import { motion } from 'framer-motion';
import { Database, Zap, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface PrimarySecondarySimulationTabProps {
  replicationStatus: 'IDLE' | 'SYNCING' | 'SYNCED';
  primaryData: string[];
  secondary1Data: string[];
  secondary2Data: string[];
  onWriteData: () => void;
}

export const PrimarySecondarySimulationTab: React.FC<PrimarySecondarySimulationTabProps> = ({
  replicationStatus,
  primaryData,
  secondary1Data,
  secondary2Data,
  onWriteData
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
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <button 
          onClick={onWriteData}
          disabled={replicationStatus === 'SYNCING'}
          className="btn-bounce"
          style={{ 
            padding: '15px 40px', 
            fontSize: '1.1rem', 
            fontWeight: 800, 
            borderRadius: '12px', 
            border: 'none', 
            background: replicationStatus === 'SYNCING' ? '#334155' : '#eab308', 
            color: 'black',
            cursor: replicationStatus === 'SYNCING' ? 'default' : 'pointer',
            boxShadow: '0 10px 30px rgba(234, 179, 8, 0.4)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <Zap size={20} fill="black" /> 
          {replicationStatus === 'SYNCING' 
            ? (isEn ? 'Replicating Binlog...' : 'Senkronize Ediliyor...') 
            : (isEn ? 'Write to Primary Node' : 'Primary Düğüme Yaz (INSERT)')
          }
        </button>
        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
          {isEn ? "Watch asynchronous binlog replication propagate with intentional simulated network latency." : "Secondary düğümlere verinin nasıl gecikmeli (Lag) ulaştığını izleyin."}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
        {/* Primary DB */}
        <div className="glass-card" style={{ border: '2px solid #eab308' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <Database color="#eab308" />
            <h4 style={{ color: '#eab308' }}>{isEn ? "Primary (Master)" : "Primary (Patron)"}</h4>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '8px', minHeight: '150px' }}>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '5px' }}>{isEn ? "Committed Data Blocks:" : "Veriler:"}</div>
            {primaryData.map((d, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ padding: '4px', background: 'rgba(234, 179, 8, 0.2)', marginBottom: '4px', borderRadius: '4px', fontSize: '0.8rem' }}>
                {d}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Secondary 1 */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <Database color="#fde047" />
            <h4 style={{ color: '#fde047' }}>{isEn ? "Secondary 1 (Lag: ~1.5s)" : "Secondary 1 (1.5sn Lag)"}</h4>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '8px', minHeight: '150px' }}>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '5px' }}>{isEn ? "Replicated Data:" : "Veriler:"}</div>
            {secondary1Data.map((d, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ padding: '4px', background: 'rgba(255,255,255,0.05)', marginBottom: '4px', borderRadius: '4px', fontSize: '0.8rem' }}>
                {d}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Secondary 2 */}
        <div className="glass-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <Database color="#fde047" />
            <h4 style={{ color: '#fde047' }}>{isEn ? "Secondary 2 (Lag: ~3.0s)" : "Secondary 2 (3.0sn Lag)"}</h4>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '8px', minHeight: '150px' }}>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '5px' }}>{isEn ? "Replicated Data:" : "Veriler:"}</div>
            {secondary2Data.map((d, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ padding: '4px', background: 'rgba(255,255,255,0.05)', marginBottom: '4px', borderRadius: '4px', fontSize: '0.8rem' }}>
                {d}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PrimarySecondarySimulationTab;
