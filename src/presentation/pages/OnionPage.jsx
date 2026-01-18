import React from 'react';
import { motion } from 'framer-motion';
import OnionHero from '../components/OnionHero';
import OnionDiagram from '../components/OnionDiagram';
import OnionPractical from '../components/OnionPractical';

const OnionPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)' }}
    >
      <OnionHero />
      <OnionDiagram />
      <OnionPractical />
      
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="glass-card" style={{ 
            background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.1) 0%, rgba(251, 113, 133, 0.1) 100%)',
            padding: '4rem'
          }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Özet: Katmanların Gücü</h3>
            <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              Onion Architecture, yazılımın teknik detaylarını (UI, DATABASE) en dışta bırakarak 
              "İş Kurallarını" koruma altına alır. Bu mimaride kodunuz bir soğana benzer; 
              dış katmanları soysanız dahi, en içteki değerli çekirdek (Business Logic) 
              hiçbir zarar görmeden çalışmaya devam eder.
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default OnionPage;
