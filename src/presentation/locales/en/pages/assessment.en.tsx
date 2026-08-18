import React from 'react';
import { motion } from 'framer-motion';
import AssessmentQuiz from '../../../components/AssessmentQuiz';
import { BrainCircuit } from 'lucide-react';

const AssessmentPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}
    >
      {/* Hero Section for Interview Simulator */}
      <section style={{ 
        padding: '120px 0 60px', 
        textAlign: 'center',
        background: 'radial-gradient(circle at top, rgba(99, 102, 241, 0.1) 0%, transparent 80%)'
      }}>
        <div className="container">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'rgba(99, 102, 241, 0.1)',
              padding: '10px 20px',
              borderRadius: '100px',
              color: 'var(--primary)',
              fontSize: '0.9rem',
              fontWeight: 700,
              marginBottom: '1.5rem',
              border: '1px solid rgba(99, 102, 241, 0.2)'
            }}>
              <BrainCircuit size={18} /> Interview Simulation
            </div>
            <h1 className="gradient-text" style={{ fontSize: '4.5rem', fontWeight: 950, marginBottom: '1.5rem', letterSpacing: '-2px' }}>
              Architect Interview <br /> <span style={{ opacity: 0.8 }}>Simulator</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', fontSize: '1.3rem', lineHeight: 1.8 }}>
              Ready to take next step in career? Experience <strong>Architecture Interview</strong> questions at 
              big tech (FAANG) level and master with 'Guru' feedback.
            </p>
          </motion.div>
        </div>
      </section>

      <AssessmentQuiz />

      <section style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }}>
            <div style={{ textAlign: 'center' }}>
               <h4 style={{ marginBottom: '1rem' }}>Prepare for Interviews</h4>
               <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Scenarios inspired by big tech interview processes.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
               <h4 style={{ marginBottom: '1rem' }}>Strategic Decision Making</h4>
               <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Architecture not just code. Art of making right trade-off.</p>
            </div>
            <div style={{ textAlign: 'center' }}>
               <h4 style={{ marginBottom: '1rem' }}>Earn Certification</h4>
               <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Complete test successfully and rise in rank in Academy community.</p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AssessmentPage;