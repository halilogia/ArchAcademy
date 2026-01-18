import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Share2, Layers, ChevronRight } from 'lucide-react';

const FSDHero = () => {
  return (
    <section style={{
      padding: '120px 0 60px',
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(circle at top left, rgba(6, 182, 212, 0.1), transparent)'
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
            background: 'rgba(6, 182, 212, 0.1)',
            padding: '8px 16px',
            borderRadius: '100px',
            color: '#06b6d4',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '2rem',
            border: '1px solid rgba(6, 182, 212, 0.2)'
          }}>
            <LayoutGrid size={14} /> Frontend Mimarisinde Yeni Standart
          </div>

          <h1 className="gradient-text" style={{
            fontSize: '4.5rem',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            letterSpacing: '-2px'
          }}>
            Feature-Sliced <br /> Design (FSD)
          </h1>
          
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.25rem',
            maxWidth: '600px',
            marginBottom: '3rem',
            lineHeight: 1.7
          }}>
            Modern frontend projeleri için ölçeklenebilir, modüler ve açık bir mimari metodoloji. 
            Karmaşıklığı katmanlar ve dilimler ile yönetin.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button style={{
              background: '#06b6d4',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '16px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 8px 24px rgba(6, 182, 212, 0.3)'
            }}>
              Dilimleri Keşfet <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
        >
          <div style={{
            width: '350px',
            height: '350px',
            background: 'var(--glass)',
            borderRadius: '40px',
            border: '1px solid var(--glass-border)',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '10px',
            padding: '20px',
            transform: 'rotate(-5deg)'
          }}>
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 3, delay: i * 0.2 }}
                style={{
                  background: i === 4 ? '#06b6d4' : 'rgba(6, 182, 212, 0.1)',
                  borderRadius: '12px',
                  border: '1px solid rgba(6, 182, 212, 0.3)'
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FSDHero;
