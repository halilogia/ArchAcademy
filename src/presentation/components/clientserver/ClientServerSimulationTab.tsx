import React from 'react';
import { motion } from 'framer-motion';
import { Server, Wifi } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface ClientServerSimulationProps {
  requestStatus: 'IDLE' | 'SENDING' | 'PROCESSING' | 'RECEIVING';
  serverLoad: number;
  onSimulate: () => void;
}

export const ClientServerSimulationTab: React.FC<ClientServerSimulationProps> = ({
  requestStatus,
  serverLoad,
  onSimulate
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
          onClick={onSimulate}
          disabled={requestStatus !== 'IDLE'}
          className="btn-bounce"
          style={{ 
            padding: '15px 40px', 
            fontSize: '1.2rem', 
            fontWeight: 800, 
            borderRadius: '12px', 
            border: 'none', 
            background: requestStatus === 'IDLE' ? '#3b82f6' : '#1e293b', 
            color: requestStatus === 'IDLE' ? 'white' : '#64748b',
            cursor: requestStatus === 'IDLE' ? 'pointer' : 'default',
            boxShadow: requestStatus === 'IDLE' ? '0 10px 30px rgba(59, 130, 246, 0.4)' : 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'all 0.3s'
          }}
        >
          <Wifi size={24} /> {requestStatus === 'IDLE' ? (isEn ? 'Dispatch HTTP Request' : 'HTTP Request Gönder') : requestStatus}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '1rem', alignItems: 'center' }}>
        {/* Client Logs */}
        <div className="glass-card" style={{ height: '300px', fontSize: '0.8rem', fontFamily: 'monospace', overflowY: 'auto' }}>
          <div style={{ color: '#94a3b8', borderBottom: '1px solid #334155', paddingBottom: '5px', marginBottom: '10px' }}>
            CLIENT CONSOLE
          </div>
          {requestStatus !== 'IDLE' && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ color: '#10b981' }}>
              &gt; GET /api/data HTTP/1.1<br/>
              &gt; Host: my-server.com<br/>
              &gt; User-Agent: Mozilla/5.0...
            </motion.div>
          )}
          {requestStatus === 'RECEIVING' && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} style={{ color: '#3b82f6', marginTop: '10px' }}>
              &lt; HTTP/1.1 200 OK<br/>
              &lt; Content-Type: application/json<br/>
              &lt; &#123; "status": "success" &#125;
            </motion.div>
          )}
        </div>

        {/* Server Monitor */}
        <div className="glass-card" style={{ height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: serverLoad > 50 ? '2px solid #ef4444' : '2px solid #3b82f6' }}>
          <Server size={60} color={serverLoad > 50 ? '#ef4444' : '#3b82f6'} style={{ marginBottom: '1rem' }} />
          <h3 style={{ marginBottom: '1rem' }}>Backend Server</h3>
          
          <div style={{ width: '80%', background: '#1e293b', borderRadius: '8px', padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.8rem' }}>
              <span>CPU Load</span>
              <span>{serverLoad}%</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: '#0f172a', borderRadius: '4px', overflow: 'hidden' }}>
              <motion.div 
                animate={{ width: `${serverLoad}%` }}
                style={{ height: '100%', background: serverLoad > 50 ? '#ef4444' : '#3b82f6' }}
              />
            </div>
          </div>

          <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: requestStatus === 'PROCESSING' ? '#eab308' : '#64748b' }}>
            {requestStatus === 'PROCESSING' ? (isEn ? 'Processing SQL Query...' : 'Processing Query...') : (isEn ? 'Waiting for socket connection...' : 'Waiting for connection...')}
          </div>
        </div>

        {/* DB Logs */}
        <div className="glass-card" style={{ height: '300px', fontSize: '0.8rem', fontFamily: 'monospace', overflowY: 'auto', opacity: 0.6 }}>
          <div style={{ color: '#94a3b8', borderBottom: '1px solid #334155', paddingBottom: '5px', marginBottom: '10px' }}>
            DB LOGS
          </div>
          {requestStatus === 'PROCESSING' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#eab308' }}>
              [SQL] SELECT * FROM users WHERE active = 1;<br/>
              ... 15ms execution time
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ClientServerSimulationTab;
