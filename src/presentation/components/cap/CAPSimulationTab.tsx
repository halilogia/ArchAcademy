import React from 'react';
import { motion } from 'framer-motion';
import { Server, Scissors, Wifi, Ban } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface CAPSimulationTabProps {
  activeMode: 'CP' | 'AP';
  isPartitioned: boolean;
  nodeAData: number;
  nodeBData: number;
  writeStatus: 'idle' | 'writing' | 'syncing' | 'failed' | 'success';
  onSetMode: (mode: 'CP' | 'AP') => void;
  onTogglePartition: () => void;
  onWrite: (newData: number) => void;
}

export const CAPSimulationTab: React.FC<CAPSimulationTabProps> = ({
  activeMode,
  isPartitioned,
  nodeAData,
  nodeBData,
  writeStatus,
  onSetMode,
  onTogglePartition,
  onWrite
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
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <button 
          onClick={() => onSetMode('CP')}
          style={{ 
            padding: '10px 20px', 
            borderRadius: '12px', 
            border: `2px solid ${activeMode === 'CP' ? '#3b82f6' : '#334155'}`, 
            background: activeMode === 'CP' ? 'rgba(59, 130, 246, 0.2)' : 'transparent', 
            color: 'white', 
            cursor: 'pointer', 
            fontWeight: 'bold' 
          }}
        >
          {isEn ? "Mode: CP (Consistency First)" : "Mode: CP (Consistency First)"}
        </button>
        <button 
          onClick={() => onSetMode('AP')}
          style={{ 
            padding: '10px 20px', 
            borderRadius: '12px', 
            border: `2px solid ${activeMode === 'AP' ? '#eab308' : '#334155'}`, 
            background: activeMode === 'AP' ? 'rgba(234, 179, 8, 0.2)' : 'transparent', 
            color: 'white', 
            cursor: 'pointer', 
            fontWeight: 'bold' 
          }}
        >
          {isEn ? "Mode: AP (Availability First)" : "Mode: AP (Availability First)"}
        </button>
      </div>

      <div className="glass-card" style={{ padding: '3rem', position: 'relative' }}>
        {/* Network Link */}
        <div style={{ position: 'absolute', top: '50%', left: '20%', right: '20%', height: '4px', background: isPartitioned ? '#ef4444' : '#10b981', transform: 'translateY(-50%)', transition: 'background 0.3s' }} />
        
        {/* Partition Sever Toggle */}
        <div 
          onClick={onTogglePartition}
          style={{ 
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', 
            width: '50px', height: '50px', borderRadius: '50%', background: '#0f172a', border: `2px solid ${isPartitioned ? '#ef4444' : '#10b981'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10
          }}
        >
          {isPartitioned ? <Scissors color="#ef4444" /> : <Wifi color="#10b981" />}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
          {/* Node A */}
          <div style={{ width: '180px', padding: '20px', background: '#1e293b', borderRadius: '16px', border: '2px solid #3b82f6', textAlign: 'center' }}>
            <Server size={32} color="#3b82f6" style={{ marginBottom: '10px' }} />
            <h4 style={{ color: 'white' }}>Node A</h4>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'white', margin: '10px 0' }}>{nodeAData}</div>
            <button 
              onClick={() => onWrite(nodeAData + 1)}
              disabled={writeStatus === 'writing' || writeStatus === 'syncing'}
              className="btn-bounce"
              style={{ width: '100%', padding: '8px', background: '#3b82f6', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Write (+1)
            </button>
            {writeStatus === 'failed' && <div style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '5px', fontWeight: 'bold' }}>WRITE FAILED!</div>}
          </div>

          {/* Node B */}
          <div style={{ width: '180px', padding: '20px', background: '#1e293b', borderRadius: '16px', border: `2px solid ${isPartitioned && activeMode === 'CP' ? '#ef4444' : '#3b82f6'}`, textAlign: 'center', opacity: isPartitioned && activeMode === 'CP' ? 0.6 : 1 }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <Server size={32} color={isPartitioned && activeMode === 'CP' ? '#ef4444' : "#3b82f6"} style={{ marginBottom: '10px' }} />
              {isPartitioned && activeMode === 'CP' && <Ban size={20} color="#ef4444" style={{ position: 'absolute', bottom: -5, right: -5 }} />}
            </div>
            <h4 style={{ color: 'white' }}>Node B</h4>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: isPartitioned && nodeAData !== nodeBData ? '#eab308' : 'white', margin: '10px 0' }}>{nodeBData}</div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              {isPartitioned && activeMode === 'CP' ? 'Unavailable (CP)' : (nodeAData !== nodeBData ? (isEn ? 'Stale Data (AP)' : 'Stale Data (AP)') : (isEn ? 'Synced' : 'Synced'))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center', color: '#cbd5e1', fontStyle: 'italic' }}>
        {isPartitioned 
          ? (activeMode === 'CP' 
              ? (isEn 
                  ? "NETWORK PARTITION! CP Mode active. Node A cannot reach quorum with Node B and REJECTS the write. (Consistency > Availability)" 
                  : "NETWORK PARTITION! CP Mode seçili. Node A, Node B'den onay alamadığı için yazma işlemini REDDEDİYOR. (Consistency > Availability)")
              : (isEn 
                  ? "NETWORK PARTITION! AP Mode active. Node A accepts the write immediately. Node B stays stale but system stays available. (Availability > Consistency)" 
                  : "NETWORK PARTITION! AP Mode seçili. Node A yazmayı kabul etti. Node B eski veride (Stale) kaldı ama sistem ayakta. (Availability > Consistency)"))
          : (isEn ? "Healthy Network Link. Nodes A and B are continuously synchronized." : "Ağ sağlıklı. Node A ve Node B senkronize çalışıyor.")}
      </div>
    </motion.div>
  );
};

export default CAPSimulationTab;
