import React from 'react';
import { motion } from 'framer-motion';
import HomeHero from '../components/HomeHero';
import HomeRoadmap from '../components/HomeRoadmap';
import HomeGrid from '../components/HomeGrid';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)' }}
    >
      <HomeHero />
      <HomeRoadmap />
      <HomeGrid />
      
      {/* Academy Call to Action */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div className="glass-card" style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)',
            padding: '5rem',
            textAlign: 'center',
            borderRadius: '40px'
          }}>
             <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Eğitim Ücretsiz, <br /> Bilgi Paha Biçilemez.</h2>
             <p style={{ maxWidth: '700px', margin: '0 auto 3rem', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
               Bu portal, topluluk tarafından geliştirilen açık kaynaklı bir eğitim projesidir. 
               Mimari bilginizi bir üst seviyeye taşımak için her gün yeni içerikler ekliyoruz.
             </p>
             <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <div style={{ padding: '1rem 2rem', background: 'white', color: 'black', borderRadius: '16px', fontWeight: 700 }}>Github'da Yıldızla</div>
                <div style={{ padding: '1rem 2rem', background: 'var(--glass)', color: 'white', borderRadius: '16px', fontWeight: 700, border: '1px solid var(--glass-border)' }}>Topluluğa Katıl</div>
             </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;
