import React from 'react';
import { motion } from 'framer-motion';
import HexagonalHero from '../../../components/HexagonalHero';
import HexagonalDiagram from '../../../components/HexagonalDiagram';
import HexagonalPractical from '../../../components/HexagonalPractical';

const HexagonalPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)' }}
    >
      <HexagonalHero />
      <HexagonalDiagram />
      <HexagonalPractical />
      
      <section style={{ padding: '80px 0', background: 'rgba(2, 6, 23, 0.4)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section-title">Ports and Adapters</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Contracts your application signs with the outside world.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            {/* Driving Side */}
            <div className="glass-card" style={{ borderTop: '4px solid #10b981' }}>
              <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981' }}>
                Driving (Primary)
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                The side that "drives" your application. Users or other systems trigger it.
                <br/><br/>
                <strong>Adapters:</strong> REST Controller, CLI, Desktop UI.<br/>
                <strong>Port:</strong> Application API (your UseCase/Service layer).
              </p>
            </div>

            {/* Driven Side */}
            <div className="glass-card" style={{ borderTop: '4px solid #3b82f6' }}>
              <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#3b82f6' }}>
                Driven (Secondary)
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                The side your application "needs". The application accesses an external system to complete its work.
                <br/><br/>
                <strong>Port:</strong> Repository Interface, Mail Service Interface.<br/>
                <strong>Adapters:</strong> SQL Database, Kafka, SendGrid API.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '4rem', padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
             <h4 style={{ marginBottom: '1rem', textAlign: 'center' }}>Golden Rule: Dependencies Point Inward</h4>
             <p style={{ color: '#94a3b8', fontSize: '0.95rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                No external technology (Adapter) can leak directly into the inner business logic (Domain). 
                Adapters must conform to the <strong>Port</strong> (Interface) rules defined by the Domain layer.
             </p>
          </div>
        </div>
      </section>
      
      {/* Conclusion / Comparison */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div className="glass-card" style={{ 
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
            textAlign: 'center',
            padding: '4rem'
          }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Why Hexagonal Architecture?</h2>
            <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              It extends the lifespan of software. Technology changes every day; the database you use today may be obsolete tomorrow. 
              With Hexagonal Architecture, you protect your "business logic" from technology. The result: a codebase that is easy to test, 
              resilient to technology shifts, and clean.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
           <div style={{ 
             background: 'linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.5) 100%)', 
             padding: '3rem', 
             borderRadius: '24px', 
             border: '1px solid rgba(255,255,255,0.05)',
             maxWidth: '900px',
             margin: '0 auto'
           }}>
              <div style={{ fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', marginBottom: '1rem', textTransform: 'uppercase' }}>
                Original Paper
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                Hexagonal Architecture (Ports & Adapters) is based on the original paper written by Alistair Cockburn in 2005, which focuses on isolating software from the outside world.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://alistair.cockburn.us/hexagonal-architecture/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(16, 185, 129, 0.15)', color: '#6ee7b7', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(16, 185, 129, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    Read Original Paper <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};

export default HexagonalPage;