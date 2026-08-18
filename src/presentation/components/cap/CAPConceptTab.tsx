import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const CAPConceptTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div
      key="concept"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}
    >
      <div>
        <h3 style={{ fontSize: '2rem', color: '#3b82f6', marginBottom: '1.5rem'}}>
          {isEn ? "The 2 of 3 Constraint" : "3'ünden 2'si Kuralı"}
        </h3>
        <p style={{ lineHeight: 1.6, color: '#c0cbed'}}>
          {isEn 
            ? "In distributed networks, Partition Tolerance (fiber cuts, node crashes) is non-negotiable. Physical hardware inevitably fails. The actual design trade-off is choosing between " 
            : "Modern dağıtık sistemlerde 'Partition Tolerance' (Ağ kopması durumu) kaçınılmazdır. Kablolar kopar, router'lar bozulur. Bu yüzden seçim aslında "
          }
          <strong>CP</strong> {isEn ? "and " : "ve "} <strong>AP</strong> {isEn ? "during network partitions." : "arasındadır."}
        </p>
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div className="glass-card" style={{ borderLeft: '4px solid #3b82f6', padding: '15px' }}>
            <strong style={{ color: '#fff', fontSize: '1.1rem' }}>CP (Consistency + Partition Tolerance)</strong>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: '5px 0' }}>
              {isEn 
                ? "If a network partition occurs, the system halts writes or returns errors rather than serving corrupted or stale data." 
                : "Ağ koparsa, tutarsız veri vermemek için hizmet vermeyi durdurur veya hatayı kabul eder."
              } <br/>
              <em style={{color: '#60a5fa'}}>
                {isEn ? "e.g. Core Banking Ledgers & Account Balances." : "Örn: Bankacılık işlemleri (Bakiye tutarsız olamaz)."}
              </em>
            </p>
          </div>
          <div className="glass-card" style={{ borderLeft: '4px solid #eab308', padding: '15px' }}>
            <strong style={{ color: '#fff', fontSize: '1.1rem' }}>AP (Availability + Partition Tolerance)</strong>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: '5px 0' }}>
              {isEn 
                ? "If the network breaks, the system responds immediately with locally available data even if it might be stale. Nodes catch up asynchronously (Eventual Consistency)." 
                : "Ağ koparsa, veri eski (stale) olsa bile cevap vermeye devam eder. Düzeldikten sonra eşitlenir (Eventual Consistency)."
              } <br/>
              <em style={{color: '#facc15'}}>
                {isEn ? "e.g. Social Media Feeds, Video Likes." : "Örn: Sosyal Medya (Bir beğeni 5sn geç gelse de olur)."}
              </em>
            </p>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', padding: '30px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '24px', border: '1px solid #3b82f6', position: 'relative' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px', color: '#fff', fontWeight: 'bold' }}>
            {isEn ? "Real World Distributed Scenario" : "Gerçek Dünya Senaryosu"}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#cbd5e1' }}>
            <span>{isEn ? "ATM Node A (New York)" : "ATM A (İstanbul)"}</span>
            <span>{isEn ? "ATM Node B (London)" : "ATM B (Ankara)"}</span>
          </div>
          <div style={{ margin: '15px 0', height: '4px', background: '#334155', borderRadius: '2px', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: '#020617', padding: '0 10px', color: '#eab308', fontSize: '0.8rem' }}>Network Link</div>
          </div>
          <div style={{ fontSize: '0.9rem', color: '#94a3b8', textAlign: 'center', fontStyle: 'italic' }}>
            {isEn 
              ? '"If the transatlantic fiber is severed, should ATM A allow cash withdrawal without knowing recent transactions on ATM B?"' 
              : '"Eğer link koparsa, İstanbul\'daki ATM para çekmeye izin verecek mi? (Ankara\'daki bakiyeyi bilmiyor)"'
            }
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CAPConceptTab;
