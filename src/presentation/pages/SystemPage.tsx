import React from 'react';
import { motion } from 'framer-motion';
import SystemHero from '../components/SystemHero';
import SystemComparison from '../components/SystemComparison';
import SystemChoice from '../components/SystemChoice';

const SystemPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)' }}
    >
      <SystemHero />
      <SystemComparison />
      <SystemChoice />
      
      {/* Conclusion */}
      <section style={{ padding: '100px 0', background: 'rgba(2, 6, 23, 0.8)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="glass-card" style={{ 
            padding: '5rem', 
            background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.1) 0%, rgba(190, 18, 60, 0.1) 100%)',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Özet: Evrimsel Mimari</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.8 }}>
              En iyi yaklaşım genellikle "Monolith First" stratejisidir. Sistemi tek parça olarak kurup, 
              içerisinde Clean Architecture veya EDA gibi disiplinleri uygulayarak sınırları belirlemek, 
              ve sadece ihtiyaç duyulduğunda (ölçeklenme veya ekip büyüklüğü sebebiyle) bu sınırları 
              kırarak Microservices'e geçmek mülakatlarda en çok takdir edilen "Senior" yaklaşımdır.
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default SystemPage;
