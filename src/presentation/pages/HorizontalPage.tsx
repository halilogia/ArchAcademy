import React from 'react';
import { motion } from 'framer-motion';
import HorizontalHero from '../components/HorizontalHero';
import HorizontalDiagram from '../components/HorizontalDiagram';
import HorizontalPractical from '../components/HorizontalPractical';

const HorizontalPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)' }}
    >
      <HorizontalHero />
      <HorizontalDiagram />
      <HorizontalPractical />
      
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="glass-card" style={{ 
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)',
            padding: '4rem'
          }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Özet: Ne Zaman Tercih Edilmeli?</h3>
            <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              Horizontal Architecture, özellikle ekip yapısının teknik uzmanlıklara göre ayrıldığı 
              (örn: sadece backend geliştiriciler, sadece DB uzmanları) kurumsal projelerde standarttır. 
              Katı katman kuralı sayesinde projenin teknik bütünlüğü korunur, ancak proje büyüdükçe 
              "Tight Coupling" (Sıkı Bağımlılık) sorunları baş gösterebilir. Bu noktada 
              Clean veya Vertical Slice gibi modern yaklaşımlara geçiş düşünülmelidir.
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default HorizontalPage;
