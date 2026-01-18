import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import SOLIDHero from '../components/SOLIDHero';
import SOLIDSection from '../components/SOLIDSection';
import { useProgress } from '../../context/ProgressContext';

const SOLIDPage = () => {
  const { completeStep } = useProgress();

  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/solid');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)' }}
    >
      <SOLIDHero />
      <SOLIDSection />
      
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="glass-card" style={{ 
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(79, 70, 229, 0.1) 100%)',
            padding: '4rem'
          }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Son Söz: SOLID Sadece Başlangıçtır</h3>
            <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              SOLID prensipleri birer varış noktası değil, birer yardımcı kılavuzdur. 
              Her zaman %100 uygulamak mümkün veya mantıklı olmayabilir (KISS - Keep It Simple, Stupid prensibini unutmayın!). 
              Önemli olan, bu prensipleri ne zaman esnetebileceğinizi ve ne zaman taviz vermemeniz gerektiğini bilecek tecrübeye sahip olmaktır.
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default SOLIDPage;
