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
    </motion.div>
  );
};

export default HexagonalPage;
