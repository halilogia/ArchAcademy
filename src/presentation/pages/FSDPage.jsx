import React from 'react';
import { motion } from 'framer-motion';
import FSDHero from '../components/FSDHero';
import FSDDiagram from '../components/FSDDiagram';
import FSDPractical from '../components/FSDPractical';

const FSDPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)' }}
    >
      <FSDHero />
      <FSDDiagram />
      <FSDPractical />
      
      {/* Summary Section */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div className="glass-card" style={{ 
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
            textAlign: 'center',
            padding: '4rem'
          }}>
            <h2 style={{ marginBottom: '1.5rem' }}>FSD Neden Tercih Edilmeli?</h2>
            <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              Büyük frontend projelerinde en büyük sorun, bileşenlerin birbirine sıkı sıkıya bağlı (tightly coupled) olmasıdır. 
              Feature-Sliced Design, bu bağımlılıkları kontrol altına alarak, bir projeyi yıllar boyu sürdürülebilir kılar. 
              Eğer projeniz büyüyorsa ve klasör yapınız spagettiye dönmeye başladıysa, FSD sizin için en doğru çözümdür.
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default FSDPage;
