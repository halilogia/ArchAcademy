import React from 'react';
import { motion } from 'framer-motion';
import { FileJson } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface SOASimulationTabProps {
  busActive: boolean;
  messageLog: string[];
  modernWeb: 'idle' | 'processing';
  legacyCRM: 'idle' | 'processing';
  sapSystem: 'idle' | 'processing';
  onTriggerESB: () => void;
}

export const SOASimulationTab: React.FC<SOASimulationTabProps> = ({
  busActive,
  messageLog,
  modernWeb,
  legacyCRM,
  sapSystem,
  onTriggerESB
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
          onClick={onTriggerESB}
          disabled={busActive}
          className="btn-bounce"
          style={{ 
            padding: '15px 40px', 
            fontSize: '1.1rem', 
            fontWeight: 800, 
            borderRadius: '12px', 
            border: 'none', 
            background: busActive ? '#334155' : '#fbcfe8', 
            color: busActive ? '#64748b' : 'black',
            cursor: busActive ? 'default' : 'pointer',
            boxShadow: busActive ? 'none' : '0 10px 30px rgba(251, 207, 232, 0.4)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <FileJson size={20} /> {busActive ? (isEn ? 'ESB Processing Message...' : 'ESB Processing...') : (isEn ? 'Send Modern JSON Request' : 'Send Modern JSON Request')}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '2rem', alignItems: 'center' }}>
        {/* Modern Client */}
        <div className="glass-card" style={{ opacity: busActive && modernWeb === 'processing' ? 1 : 0.5, border: modernWeb === 'processing' ? '2px solid #fbcfe8' : '1px solid transparent' }}>
          <h4 style={{ color: '#fbcfe8', marginBottom: '10px' }}>Modern Web App</h4>
          <div style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: '#94a3b8' }}>
            POST /api/customer<br/>
            Content-Type: application/json
          </div>
        </div>

        {/* The ESB */}
        <div style={{ 
          height: '250px', 
          background: 'rgba(0,0,0,0.3)', 
          borderRadius: '24px', 
          border: '2px dashed #fbcfe8',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px'
        }}>
          <div style={{ position: 'absolute', top: -15, left: '50%', transform: 'translateX(-50%)', background: '#020617', padding: '0 10px', color: '#fbcfe8', fontWeight: 900 }}>
            ENTERPRISE SERVICE BUS
          </div>
          
          <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', fontSize: '0.8rem', fontFamily: 'monospace' }}>
            {messageLog.map((logItem, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ marginBottom: '5px', color: '#e2e8f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <span style={{ color: '#fbcfe8' }}>&gt;</span> {logItem}
              </motion.div>
            ))}
          </div>

          {busActive && (
            <motion.div 
              style={{ height: '4px', background: '#fbcfe8', borderRadius: '2px', marginTop: '10px' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 4 }}
            />
          )}
        </div>

        {/* Legacy Backends */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div className="glass-card" style={{ opacity: legacyCRM === 'processing' ? 1 : 0.5, border: legacyCRM === 'processing' ? '2px solid #ef4444' : '1px solid transparent' }}>
            <h4 style={{ color: '#ef4444', marginBottom: '5px' }}>Legacy CRM</h4>
            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Expects: SOAP/XML</div>
          </div>
          <div className="glass-card" style={{ opacity: sapSystem === 'processing' ? 1 : 0.5, border: sapSystem === 'processing' ? '2px solid #3b82f6' : '1px solid transparent' }}>
            <h4 style={{ color: '#3b82f6', marginBottom: '5px' }}>SAP System</h4>
            <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Expects: Proprietary</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SOASimulationTab;
