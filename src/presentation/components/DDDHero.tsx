import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Star, ArrowRight } from 'lucide-react';

const DDDHero = () => {
  return (
    <section style={{
      padding: '120px 0 60px',
      position: 'relative',
      overflow: 'hidden'
    }}>
       <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(167, 139, 250, 0.2) 0%, transparent 70%)',
        zIndex: -1
      }} />

      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(167, 139, 250, 0.1)',
            padding: '8px 16px',
            borderRadius: '100px',
            color: '#a78bfa',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '2rem',
            border: '1px solid rgba(167, 139, 250, 0.2)'
          }}>
            <Star size={14} fill="#a78bfa" /> Domainin Kalbine İnin
          </div>

          <h1 className="gradient-text" style={{
            fontSize: '4.5rem',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            letterSpacing: '-2px'
          }}>
            Domain-Driven <br /> Design
          </h1>
          
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.25rem',
            maxWidth: '600px',
            marginBottom: '3rem',
            lineHeight: 1.7
          }}>
            Karmaşık iş süreçlerini modellemek, ortak dili bulmak ve yazılımı teknik bir araçtan 
            ziyade iş dünyasının yaşayan bir parçası haline getirmek için DDD rehberi.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button 
              onClick={() => window.scrollTo({ top: 900, behavior: 'smooth' })}
              style={{
                background: '#8b5cf6',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '16px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                border: 'none'
              }}>
              Modellemeye Başla <ArrowRight size={20} />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <div style={{
            width: '400px',
            height: '400px',
            background: 'var(--glass)',
            borderRadius: '40px',
            border: '1px solid var(--glass-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <Brain size={160} color="#a78bfa" style={{ filter: 'drop-shadow(0 0 30px rgba(167, 139, 250, 0.3))' }} />
            
            {/* Pulsing Elements */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 4 }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '40px',
                border: '2px solid #a78bfa'
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DDDHero;
