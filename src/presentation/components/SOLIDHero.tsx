import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Box, Layers, Hexagon, ChevronRight } from 'lucide-react';

const SOLIDHero = () => {
  return (
    <section style={{
      padding: '120px 0 60px',
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.1), transparent)'
    }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(99, 102, 241, 0.1)',
            padding: '8px 16px',
            borderRadius: '100px',
            color: '#6366f1',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '2rem',
            border: '1px solid rgba(99, 102, 241, 0.2)'
          }}>
            <Shield size={14} /> Yazılımın 5 Temel Taşı
          </div>

          <h1 className="gradient-text" style={{
            fontSize: '4.5rem',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            letterSpacing: '-2px'
          }}>
            SOLID <br /> Principles
          </h1>
          
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.25rem',
            maxWidth: '600px',
            marginBottom: '3rem',
            lineHeight: 1.7
          }}>
            Nesne yönelimli tasarımın DNA'sı. Daha esnek, anlaşılır ve sürdürülebilir 
            kod yazmanızı sağlayan 5 altın kuralı derinlemesine inceleyin.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button style={{
              background: '#6366f1',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '16px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 8px 24px rgba(99, 102, 241, 0.3)'
            }}>
              Prensipleri Keşfet <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ position: 'relative' }}
        >
           <div style={{
             display: 'grid',
             gridTemplateColumns: 'repeat(3, 1fr)',
             gap: '1rem',
             rotate: '-10deg'
           }}>
             {['S', 'O', 'L', 'I', 'D', '✨'].map((char, i) => (
               <motion.div
                 key={i}
                 animate={{ y: [0, -10, 0] }}
                 transition={{ repeat: Infinity, duration: 4, delay: i * 0.2 }}
                 style={{
                   width: '80px',
                   height: '80px',
                   background: 'var(--glass)',
                   borderRadius: '20px',
                   border: '1px solid var(--glass-border)',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   fontSize: '1.5rem',
                   fontWeight: 800,
                   color: '#6366f1',
                   boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                 }}
               >
                 {char}
               </motion.div>
             ))}
           </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SOLIDHero;
