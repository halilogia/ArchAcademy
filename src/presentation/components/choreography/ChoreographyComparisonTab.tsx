import React from 'react';
import { motion } from 'framer-motion';
import { Music, Wind } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const ChoreographyComparisonTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div
      key="comparison"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'center' }}>
        <div className="glass-card" style={{ opacity: 0.7 }}>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#94a3b8' }}>
            <Music /> {isEn ? "Orchestration (Conductor)" : "Orchestration (Merkezi Şef)"}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {isEn 
              ? "A centralized orchestrator (e.g., Camunda, AWS Step Functions, Temporal) commands all participants: 'Inventory, deduct item! Payment, charge card!'." 
              : "Merkezi bir 'Conductor' (Örn: Camunda, Step Functions) vardır. Tüm servisleri o yönetir. 'Sen başla, sen bekle' der."
            }
          </p>
          <div style={{ marginTop: '1rem', padding: '10px', borderLeft: '2px solid #94a3b8', fontSize: '0.8rem', color: '#64748b' }}>
            <strong>{isEn ? "Risk:" : "Risk:"}</strong> {isEn ? "The central coordinator can balloon into a fragile God Object and bottleneck." : "Conductor aşırı karmaşıklaşabilir (God Object)."}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800 }}>VS</div>
        </div>

        <div className="glass-card" style={{ borderLeft: '4px solid #ec4899', background: 'linear-gradient(135deg, rgba(236,72,153,0.1) 0%, rgba(2,6,23,0) 100%)' }}>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#ec4899' }}>
            <Wind /> {isEn ? "Choreography (Event Dance)" : "Choreography (Dağıtık Dans)"}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {isEn 
              ? "No central coordinator. Participants operate on the 'Smart endpoints, dumb pipes' principle, listening to domain events and reacting autonomously." 
              : "Merkezi zeka yoktur. Servisler 'akıllı uç noktalar, aptal borular' (smart endpoints, dumb pipes) prensibiyle çalışır."
            }
          </p>
          <div style={{ marginTop: '1rem', padding: '10px', borderLeft: '2px solid #ec4899', fontSize: '0.8rem', color: '#ec4899' }}>
            <strong>{isEn ? "Advantage:" : "Avantaj:"}</strong> {isEn ? "Services remain completely decoupled, autonomous, and independently deployable." : "Servisler birbirinden bağımsız (Autonomous) kalır."}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChoreographyComparisonTab;
