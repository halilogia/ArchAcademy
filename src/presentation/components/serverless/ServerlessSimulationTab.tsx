import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ThermometerSnowflake } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface ServerlessSimulationTabProps {
  instances: number;
  coldStarts: number;
  cost: number;
  onTriggerRequest: () => void;
}

export const ServerlessSimulationTab: React.FC<ServerlessSimulationTabProps> = ({
  instances,
  coldStarts,
  cost,
  onTriggerRequest
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
          onClick={onTriggerRequest}
          className="btn-bounce"
          style={{ 
            padding: '15px 40px', 
            fontSize: '1.2rem', 
            fontWeight: 800, 
            borderRadius: '12px', 
            border: 'none', 
            background: '#a855f7', 
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 10px 30px rgba(168, 85, 247, 0.4)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <Zap size={24} fill="white" /> {isEn ? "Dispatch HTTP Request" : "İstek Gönder (HTTP Request)"}
        </button>
        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
          {isEn ? "Click repeatedly to simulate high concurrency and sudden traffic spikes." : "Hızlıca tıklayarak ani trafik artışını (Spike) simüle edin."}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Metrics Panel */}
        <div className="glass-card">
          <h3 style={{ marginBottom: '1.5rem' }}>{isEn ? "Live Scaling Metrics" : "Canlı Metrikler"}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#a855f7' }}>{instances}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{isEn ? "Active Container Instances" : "Active Instances"}</div>
            </div>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#ef4444' }}>{coldStarts}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{isEn ? "Cold Start Hits" : "Cold Starts"}</div>
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '12px', textAlign: 'center', gridColumn: 'span 2' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#10b981' }}>${cost.toFixed(4)}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{isEn ? "Total Micro-billing (Estimated)" : "Total Cost (Estimated)"}</div>
            </div>
          </div>
        </div>

        {/* Explanation Panel */}
        <div className="glass-card" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 style={{ marginBottom: '1rem', color: '#a855f7' }}>{isEn ? "Autoscaling Dynamics" : "Sistem Tepkisi"}</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
            {isEn 
              ? "If you dispatch requests at gentle intervals, the cloud reuses already-warmed containers ('Warm Start', zero initialization delay)." 
              : "Eğer butona aralıklı olarak (yavaşça) basarsanız, sistem muhtemelen aynı instance'ı (konteynerı) tekrar kullanır ('Warm Start')."
            }
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
            {isEn 
              ? "Rapid burst requests exceed warm concurrency limits, forcing the cloud orchestrator to initialize new microVMs ('Cold Start')." 
              : "Eğer butona çok hızlı basarsanız, mevcut instance yetişemez ve bulut sağlayıcısı anında yeni instancelar başlatır ('Cold Start')."
            }
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(59, 130, 246, 0.1)', padding: '10px', borderRadius: '8px' }}>
            <ThermometerSnowflake size={20} color="#3b82f6" />
            <span style={{ fontSize: '0.8rem', color: '#93c5fd' }}>
              {isEn ? "Cold Start: The initial latency to allocate hardware, download container image, and boot runtime." : "Cold Start: Fonksiyonun ilk kez RAM'e yüklenme süresi."}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServerlessSimulationTab;
