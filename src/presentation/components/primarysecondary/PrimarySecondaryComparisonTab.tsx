import React from 'react';
import { motion } from 'framer-motion';
import { HardDrive, GitMerge } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const PrimarySecondaryComparisonTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div
      key="comparison"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
        {/* Single Node */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.4rem', color: '#94a3b8', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <HardDrive /> {isEn ? "Single Monolithic Database Instance" : "Single Node"}
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            {isEn 
              ? "A single standalone database server serving both Read and Write workloads synchronously." 
              : "Tek bir veritabanı sunucusu. Hem okuma hem yazma işlemlerini o yapar."
            }
          </p>
          <ul style={{ paddingLeft: '1.5rem', color: '#94a3b8' }}>
            <li style={{ marginBottom: '10px' }}>❌ {isEn ? "Severe I/O lockups under high concurrent traffic." : "Trafik artarsa sunucu kilitlenir."}</li>
            <li style={{ marginBottom: '10px' }}>❌ {isEn ? "Single Point of Failure (SPOF); node crash takes entire platform offline." : "Sunucu çökerse site kapanır (SPOF)."}</li>
            <li>✅ {isEn ? "Zero replication lag; immediate read-after-write ACID consistency." : "Yönetimi çok basittir, veri her zaman tutarlıdır."}</li>
          </ul>
        </div>
        
        {/* Primary-Secondary */}
        <div className="glass-card" style={{ borderTop: '4px solid #eab308' }}>
          <h3 style={{ fontSize: '1.4rem', color: '#eab308', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <GitMerge /> {isEn ? "Primary-Secondary (Read Replica Cluster)" : "Primary-Secondary"}
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            {isEn 
              ? "Writes are centralized on the Primary node, while Reads scale linearly across multiple Secondary read-only replicas (ideal for 95% read-heavy workloads like YouTube/Twitter)." 
              : "Yazmalar bir yere, okumalar birçok yere. Youtube, Twitter gibi okuma ağırlıklı sistemler için idealdir."
            }
          </p>
          <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
            <li style={{ marginBottom: '10px', color: '#10b981' }}>✅ {isEn ? "Infinite linear read scalability by adding replica nodes." : "Sınırsız okuma ölçeklemesi (Read Scaling)."}</li>
            <li style={{ marginBottom: '10px', color: '#10b981' }}>✅ {isEn ? "High Availability: Automatic failover promotes a secondary if primary crashes." : "Primary çökerse, Secondary devralır (High Availability)."}</li>
            <li style={{ color: '#f59e0b' }}>⚠️ {isEn ? "Replication Lag: Asynchronous binlog replication may serve slightly stale reads." : "Kopyalama (Replication) gecikmesi yaşanabilir (Lag)."}</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default PrimarySecondaryComparisonTab;
