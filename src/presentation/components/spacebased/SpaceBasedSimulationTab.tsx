import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Cpu, HardDrive } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface PartitionNode {
  id: number;
  load: number;
  range: string;
  color: string;
}

export interface SpaceBasedSimulationTabProps {
  partitions: PartitionNode[];
  dbLoad: number;
  onHandleLoad: () => void;
}

export const SpaceBasedSimulationTab: React.FC<SpaceBasedSimulationTabProps> = ({
  partitions,
  dbLoad,
  onHandleLoad
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
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <button 
          onClick={onHandleLoad}
          className="btn-bounce"
          style={{ 
            padding: '15px 40px', 
            fontSize: '1.2rem', 
            fontWeight: 800, 
            borderRadius: '12px', 
            border: 'none', 
            background: '#eab308', 
            color: 'black',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(234, 179, 8, 0.4)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <Zap size={24} /> {isEn ? "Inject In-Memory Load (Burst Traffic)" : "Yük Bindir (Traffic Generators)"}
        </button>
        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
          {isEn 
            ? "Space-Based architecture absorbs extreme burst loads directly inside distributed RAM partitions (Tuple Space)." 
            : "Space-Based mimarisi, gelen yükü bölümlere (partition) ayırarak RAM üzerinde karşılar."
          }
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', alignItems: 'center' }}>
        {/* The In-Memory Processing Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {partitions.map((p) => (
            <div key={p.id} className="glass-card" style={{ borderColor: p.load > 80 ? '#ef4444' : p.color }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h4 style={{ color: p.color }}>Node-{p.id} ({p.range})</h4>
                <Cpu size={20} color={p.color} />
              </div>
              
              <div style={{ marginBottom: '5px', display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', opacity: 0.8 }}>
                <span>{isEn ? "Partition CPU / RAM Utilization" : "CPU / RAM Usage"}</span>
                <span>{p.load}%</span>
              </div>
              <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
                <motion.div 
                  animate={{ width: `${p.load}%` }}
                  style={{ height: '100%', background: p.load > 80 ? '#ef4444' : p.color }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* The Bottleneck Shielded (Async Write-Behind DB) */}
        <div className="glass-card" style={{ textAlign: 'center', opacity: 0.6 }}>
          <HardDrive size={40} color="#94a3b8" style={{ margin: '0 auto 10px auto' }} />
          <h4>{isEn ? "Cold Persistent Store" : "Disk Database"}</h4>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{isEn ? "Async Write-Behind Worker" : "Async Write-Behind"}</p>
          
          <div style={{ marginTop: '1rem', padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.8rem', marginBottom: '5px' }}>{isEn ? "Buffered Disk DB Load" : "DB Load"}</div>
            <div style={{ width: '100%', height: '6px', background: '#334155', borderRadius: '3px' }}>
              <motion.div 
                animate={{ width: `${dbLoad}%` }}
                style={{ height: '100%', background: '#94a3b8' }}
              />
            </div>
            <div style={{ fontSize: '0.7rem', marginTop: '5px', color: '#10b981' }}>
              {dbLoad < 30 ? (isEn ? 'Stable & Unstressed' : 'Stabil & Düşük') : (isEn ? 'Flushing Buffer...' : 'Yükseliyor')}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SpaceBasedSimulationTab;
