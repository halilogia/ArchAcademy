import React from 'react';
import { motion } from 'framer-motion';
import { Database, Box, ArrowDownUp, Cpu } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const SpaceBasedComparisonTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div
      key="comparison"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        {/* Database Centric */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.4rem', color: '#94a3b8', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Database size={24} /> {isEn ? "Database-Centric (Traditional Architecture)" : "Database Centric (Klasik)"}
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            {isEn 
              ? "All application stateless nodes synchronously converge on a central relational database. Under massive traffic, the database becomes an unavoidable I/O choke point." 
              : "Her şeyin merkezinde dev bir veritabanı vardır. Web sunucuları buraya bağımlıdır."
            }
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '5px' }}>
              <div style={{ width: '40px', height: '30px', background: '#334155', borderRadius: '4px' }}></div>
              <div style={{ width: '40px', height: '30px', background: '#334155', borderRadius: '4px' }}></div>
              <div style={{ width: '40px', height: '30px', background: '#334155', borderRadius: '4px' }}></div>
            </div>
            <ArrowDownUp size={20} color="#94a3b8" />
            <div style={{ width: '80px', height: '60px', background: '#eab308', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', fontWeight: 900, boxShadow: '0 0 20px rgba(234, 179, 8, 0.5)' }}>
              DB
            </div>
            <span style={{ color: '#ef4444', fontSize: '0.8rem', fontWeight: 700 }}>
              ⚠️ {isEn ? "SEVERE I/O BOTTLENECK" : "DARBOĞAZ (Bottleneck)"}
            </span>
          </div>
        </div>

        {/* Space-Based In-Memory Grid */}
        <div className="glass-card" style={{ borderTop: '4px solid #eab308' }}>
          <h3 style={{ fontSize: '1.4rem', color: '#eab308', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Box size={24} /> {isEn ? "Space-Based Architecture (In-Memory Grid)" : "Space-Based (Grid)"}
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            {isEn 
              ? "Data is replicated across partitioned RAM Processing Units (PU). The physical database acts purely as an asynchronous cold archival write-behind mirror." 
              : "Veritabanı sadece 'arşiv' gibidir. Asıl iş RAM'de dağıtık olarak yapılır."
            }
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            {[1, 2, 3].map((nodeIdx) => (
              <div key={nodeIdx} style={{ width: '80px', height: '100px', background: 'rgba(234, 179, 8, 0.2)', border: '1px solid #eab308', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                <Cpu size={16} color="#fde047" />
                <Database size={16} color="#fde047" />
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '10px', color: '#10b981', fontSize: '0.8rem', fontWeight: 700 }}>
            ✅ {isEn ? "NEAR-INFINITE HORIZONTAL LINEAR SCALING" : "SINIRSIZ ÖLÇEKLENME"}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SpaceBasedComparisonTab;
