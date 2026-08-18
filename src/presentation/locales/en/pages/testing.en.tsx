import React from 'react';
import { motion } from 'framer-motion';
import { Beaker, FlaskConical, CheckCircle2, Zap, Microscope, ClipboardCheck } from 'lucide-react';
import ArchHero from '../../../components/ArchHero';

const TestingPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}
    >
      <ArchHero 
        title="Testing"
        subtitle="Architecture"
        description="Testable code is the best code. The architecture's main focus is making mistakes harder and verification easier."
        badge="Quality by Design"
        color="#10b981"
        illustration={
          <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '2rem', borderRadius: '50%', border: '2px solid #10b981' }}
            >
              <Beaker size={80} color="#10b981" />
            </motion.div>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, delay: i * 0.6, repeat: Infinity }}
                style={{ position: 'absolute', width: '100px', height: '100px', border: '1px solid #10b981', borderRadius: '50%' }}
              />
            ))}
          </div>
        }
        features={[
          { icon: <CheckCircle2 />, title: 'Automated Confidence', desc: 'Ensure the architecture stays intact with tests that run after every commit.' },
          { icon: <Microscope />, title: 'High Coverage Design', desc: 'Design independent layers that make mocking and stubbing easier.' },
          { icon: <Zap />, title: 'Fast Feedback Loop', desc: 'Speed up development with unit tests that return results in seconds.' }
        ]}
      />

      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800 }}>Test Strategy Pyramid</h2>
            <p style={{ color: 'var(--text-secondary)' }}>3 core test levels that keep the architecture sound.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            <div className="glass-card" style={{ padding: '3rem' }}>
              <div style={{ color: '#10b981', marginBottom: '1.5rem' }}><FlaskConical size={40} /></div>
              <h3 style={{ marginBottom: '1rem' }}>Unit Testing</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                The most fundamental building blocks. Verifies the business logic of a single function or class in isolation from everything else. Very fast.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '3rem' }}>
              <div style={{ color: '#10b981', marginBottom: '1.5rem' }}><ClipboardCheck size={40} /></div>
              <h3 style={{ marginBottom: '1rem' }}>Integration Testing</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                Harmony between components. Checks that the database, API, or services work correctly together.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '3rem' }}>
              <div style={{ color: '#10b981', marginBottom: '1.5rem' }}><Microscope size={40} /></div>
              <h3 style={{ marginBottom: '1rem' }}>E2E (Scenario)</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                Full flow from the user's perspective. Ensures the system responds correctly from end to end across all its parts.
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default TestingPage;