import React from 'react';
import { motion } from 'framer-motion';
import { useProgress } from '../../../context/ProgressContext';
import ComparisonMatrix from '../../../components/ComparisonMatrix';
import ArchitectureWizard from '../../../components/ArchitectureWizard';

const ComparisonPage = () => {
  const { completeStep } = useProgress();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/compare');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-dark)' }}
    >
      <div style={{ padding: '60px 0 0', textAlign: 'center' }}>
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '12px 24px',
            borderRadius: '100px',
            fontSize: '1rem',
            fontWeight: 700,
            border: '1px solid var(--glass-border)',
            marginBottom: '1rem'
          }}
        >
          🎓 Decision Support System
        </motion.div>
      </div>
      
      <ComparisonMatrix />

      <section style={{ padding: '60px 0 100px' }}>
        <div className="container">
          <ArchitectureWizard />
        </div>
      </section>

      <section style={{ padding: '0 0 100px' }}>
        <div className="container">
          <div className="glass-card" style={{ 
            background: 'rgba(255,255,255,0.02)',
            padding: '4rem',
            textAlign: 'center'
          }}>
            <h3 style={{ marginBottom: '1.5rem' }}>The Secret of the Right Architecture</h3>
            <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              "There is no 'perfect architecture'; there are only the 'most suitable trade-offs' for your current project. 
              Using Clean Architecture for a small team is like building a hut with a skyscraper foundation. 
              First determine your need, then choose your architecture."
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ComparisonPage;