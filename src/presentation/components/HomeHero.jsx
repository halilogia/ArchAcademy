import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, BookOpen, GraduationCap } from 'lucide-react';

const HomeHero = () => {
  return (
    <section style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '120px 0 60px',
      background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)'
    }}>
      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '10px 20px',
            borderRadius: '100px',
            border: '1px solid var(--glass-border)',
            color: 'var(--primary)',
            fontSize: '0.9rem',
            fontWeight: 700,
            marginBottom: '2.5rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
          }}>
            <Sparkles size={16} /> Software Architecture Academy v2.0
          </div>
          
          <h1 className="gradient-text" style={{
            fontSize: '5.5rem',
            fontWeight: 800,
            lineHeight: 1,
            marginBottom: '2rem',
            letterSpacing: '-3px'
          }}>
            Mimari Dehası <br /> Burada Başlar.
          </h1>

          <p style={{
            fontSize: '1.4rem',
            color: 'var(--text-secondary)',
            maxWidth: '800px',
            margin: '0 auto 4rem',
            lineHeight: 1.6
          }}>
            Karmaşık sistemleri basitleştirin, senior seviye kararlar alın ve <br /> 
            geleceğin yazılım mimarisini bizzat inşa edin.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <button style={{
              background: 'var(--primary)',
              color: 'white',
              padding: '1.25rem 2.5rem',
              borderRadius: '20px',
              fontWeight: 700,
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              boxShadow: '0 10px 30px var(--primary-glow)'
            }}>
              Eğitime Başla <ArrowRight size={20} />
            </button>
            <button style={{
              background: 'var(--glass)',
              color: 'white',
              padding: '1.25rem 2.5rem',
              borderRadius: '20px',
              fontWeight: 700,
              fontSize: '1.1rem',
              border: '1px solid var(--glass-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <BookOpen size={20} /> Müfredat
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        style={{
          position: 'absolute',
          top: '20%',
          right: '-5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          border: '1px dashed rgba(59, 130, 246, 0.1)',
          pointerEvents: 'none'
        }}
      />
    </section>
  );
};

export default HomeHero;
