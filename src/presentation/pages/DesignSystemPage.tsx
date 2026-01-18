import React from 'react';
import { motion } from 'framer-motion';
import ProjectDesignSystem from '../components/ProjectDesignSystem';
import ProjectTechStack from '../components/ProjectTechStack';
import { Palette, Sparkles, Wind } from 'lucide-react';

const DesignSystemPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)', minHeight: '100vh', paddingTop: '100px' }}
    >
      <section className="container" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: 'rgba(168, 85, 247, 0.1)', 
            padding: '8px 16px', 
            borderRadius: '100px', 
            color: '#a855f7', 
            fontSize: '0.8rem', 
            fontWeight: 700,
            marginBottom: '1.5rem'
          }}>
            <Sparkles size={14} /> UI/UX Architecture
          </div>
          <h1 className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>
            Visual Design <br /> Principles
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
            ArchAcademy'nin estetik dilini ve kullanıcı deneyimi standartlarını keşfedin. 
            Burada sadece kod değil, "Görsel Ustalık" (Visual Craftsmanship) rehberini bulacaksınız.
          </p>
        </motion.div>
      </section>

      {/* Grid of Design Stats */}
      <section className="container" style={{ marginBottom: '5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
           <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
              <Palette size={32} color="#a855f7" style={{ marginBottom: '1rem' }} />
              <h4 style={{ marginBottom: '0.5rem' }}>Aura Palette</h4>
              <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Atmospheric Gradients & Neon Highlights</p>
           </div>
           <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
              <Wind size={32} color="#3b82f6" style={{ marginBottom: '1rem' }} />
              <h4 style={{ marginBottom: '0.5rem' }}>Fluid Motion</h4>
              <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>60FPS Ease-in-out Smooth Transitions</p>
           </div>
           <div className="glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
              <Sparkles size={32} color="#10b981" style={{ marginBottom: '1rem' }} />
              <h4 style={{ marginBottom: '0.5rem' }}>Atomic UI</h4>
              <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>Reusable Glass-Card Logic</p>
           </div>
        </div>
      </section>

      <ProjectDesignSystem />
      <ProjectTechStack />

      {/* CTA at the bottom */}
      <section style={{ padding: '100px 0', textAlign: 'center' }}>
         <div className="container">
            <h3 style={{ marginBottom: '2rem' }}>Daha fazlasını kodlamaya hazır mısın?</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
              Bu tasarım sistemini kendi projende kullanmak istersen kaynak kodları inceleyebilirsin.
            </p>
            {/* Logic for going back to architecture */}
            <a href="/project-arch" style={{ color: '#10b981', fontWeight: 800, textDecoration: 'none', borderBottom: '2px solid' }}>
              Klasör Yapısını ve Mimariyi İncele →
            </a>
         </div>
      </section>

    </motion.div>
  );
};

export default DesignSystemPage;
