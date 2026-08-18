import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Network } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const LambdaKappaOverviewTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div
      key="overview"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="glass-card" style={{ padding: '3rem' }}>
        <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>
          {isEn ? "The Evolution of Big Data Processing" : "Veri İşleme Mimarilerinin Evrimi"}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', gap: '3rem' }}>
          {/* Lambda Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ padding: '10px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', color: '#6366f1' }}>
                <Layers size={24} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Lambda Architecture</h3>
            </div>
            <p style={{ lineHeight: '1.7', color: '#cbd5e1', marginBottom: '1.5rem' }}>
              {isEn 
                ? "Formulated by Nathan Marz. Prioritizes Human-Fault Tolerance and batch accuracy over low latency by running dual pipeline topologies." 
                : "Nathan Marz tarafından tasarlanan bu mimari, Human-Fault Tolerance odaklıdır. Batch katmanının doğruluğu ile Speed katmanının anlık hızını birleştirir."
              }
            </p>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '1.5rem' }}>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: 0, listStyle: 'none', margin: 0 }}>
                <li style={{ color: '#94a3b8' }}>
                  <span style={{ color: '#6366f1', display: 'block', fontWeight: 700 }}>Immutable Master:</span>
                  {isEn ? "Raw data in HDFS/S3 is strictly append-only and never mutated." : "Hadoop/S3 verisi asla silinmez, üzerine sadece eklenir."}
                </li>
                <li style={{ color: '#94a3b8' }}>
                  <span style={{ color: '#ec4899', display: 'block', fontWeight: 700 }}>Dual Codebase Tax:</span>
                  {isEn ? "Requires dual logic maintenance (MapReduce/Spark batch + Flink/Storm streaming)." : "İki ayrı kod tabanı ve motor (Batch + Speed) bakımı gerektirir."}
                </li>
              </ul>
            </div>
          </div>

          {/* Kappa Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ padding: '10px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '12px', color: '#06b6d4' }}>
                <Network size={24} />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Kappa Architecture</h3>
            </div>
            <p style={{ lineHeight: '1.7', color: '#cbd5e1', marginBottom: '1.5rem' }}>
              {isEn 
                ? "Proposed by Jay Kreps (Kafka co-creator). Built on the premise that 'Everything is a Stream'. Eliminates batch layers entirely." 
                : "Jay Kreps (Kafka kurucusu) tarafından önerilen modern yaklaşım. 'Her şey bir stream'dir' felsefesiyle batch katmanını tamamen ortadan kaldırır."
              }
            </p>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '1.5rem' }}>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: 0, listStyle: 'none', margin: 0 }}>
                <li style={{ color: '#94a3b8' }}>
                  <span style={{ color: '#06b6d4', display: 'block', fontWeight: 700 }}>Stream Only:</span>
                  {isEn ? "Single streaming engine processes both live events and historic replays." : "Ayrı bir batch motoru yoktur; geçmiş ve gelecek aynı stream motoruyla işlenir."}
                </li>
                <li style={{ color: '#94a3b8' }}>
                  <span style={{ color: '#10b981', display: 'block', fontWeight: 700 }}>Single Pipeline:</span>
                  {isEn ? "One unified codebase (Kafka + Apache Flink), slashing operational overhead." : "Tek teknoloji ve tek kod tabanı (Kafka + Flink) yeterlidir."}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LambdaKappaOverviewTab;
