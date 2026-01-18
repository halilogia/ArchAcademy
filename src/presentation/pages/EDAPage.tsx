import React from 'react';
import { motion } from 'framer-motion';
import EDAHero from '../components/EDAHero';
import EDADiagram from '../components/EDADiagram';
import EDAPractical from '../components/EDAPractical';

const EDAPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)' }}
    >
      <EDAHero />
      <EDADiagram />
      <EDAPractical />
      
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="glass-card" style={{ 
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(192, 132, 252, 0.1) 100%)',
            padding: '4rem'
          }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Sonuç: Reaktif Gelecek</h3>
            <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              Event-Driven Architecture, modern çağın yüksek trafikli ve karmaşık sistemleri için bir zorunluluktur. 
              Servislerin birincil görevi işlerini yapmak ve olanı biteni dünyaya haykırmaktır. 
              Diğer servislerin bu bilgiyle ne yapacağı onların kararıdır. Bu "Özgürlük" mimarisidir.
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default EDAPage;
