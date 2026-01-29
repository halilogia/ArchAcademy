import React from 'react';
import { motion } from 'framer-motion';
import HexagonalHero from '../components/HexagonalHero';
import HexagonalDiagram from '../components/HexagonalDiagram';
import HexagonalPractical from '../components/HexagonalPractical';

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
      
      {/* Conclusion / Comparison */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div className="glass-card" style={{ 
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
            textAlign: 'center',
            padding: '4rem'
          }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Neden Hexagonal Mimari?</h2>
            <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              Yazılımın ömrünü uzatır. Teknoloji her gün değişir; bugün kullandığınız veri tabanı yarın eski kalabilir. 
              Hexagonal mimari ile "iş mantığınızı" teknolojiden korursunuz. Bu sayede test edilmesi kolay, 
              teknolojiye dirençli ve tertemiz bir kod tabanı elde edersiniz.
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
                Hexagonal Mimari (Ports & Adapters), Alistair Cockburn tarafından 2005 yılında yazılan ve yazılımın dış dünyadan izolasyonunu konu alan orijinal makaleye dayanır.
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
