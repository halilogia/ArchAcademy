import React from 'react';
import { motion } from 'framer-motion';
import VerticalHero from '../components/VerticalHero';
import VerticalComparison from '../components/VerticalComparison';
import VerticalPractical from '../components/VerticalPractical';

const VerticalSlicePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)' }}
    >
      <VerticalHero />
      <VerticalComparison />
      <VerticalPractical />
      
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="glass-card" style={{ 
            background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(234, 179, 8, 0.1) 100%)',
            padding: '4rem'
          }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Özet: Ne Zaman Kullanmalı?</h3>
            <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              Eğer projeniz çok hızlı değişiyorsa, her özelliğin karmaşıklığı birbirinden çok farklıysa 
              ve katmanlar arasında veri taşımaktan yorulduysanız Vertical Slice Architecture sizin için ilaç gibidir. 
              Unutmayın; temiz kod, en az kod yazılarak en çok işin yapıldığı koddur.
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default VerticalSlicePage;
