import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Layers, ChevronRight, Share2 } from 'lucide-react';

const HorizontalHero = () => {
  return (
    <section style={{
      padding: '120px 0 60px',
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(circle at top left, rgba(59, 130, 246, 0.1), transparent)'
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
            background: 'rgba(59, 130, 246, 0.1)',
            padding: '8px 16px',
            borderRadius: '100px',
            color: '#3b82f6',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '2rem',
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }}>
            <Building2 size={14} /> Klasik Kurumsal Standart
          </div>

          <h1 className="gradient-text" style={{
            fontSize: '4.5rem',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            letterSpacing: '-2px'
          }}>
            Horizontal <br /> Architecture
          </h1>
          
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.25rem',
            maxWidth: '600px',
            marginBottom: '3rem',
            lineHeight: 1.7
          }}>
            Yazılım dünyasının temeli: N-Tier Katmanlı Yapı. Kodu teknik sorumluluklara göre 
            yatay tabakalara bölen, ölçeklenebilir ve test edilebilir klasik bir yaklaşım.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button 
              onClick={() => window.scrollTo({ top: 900, behavior: 'smooth' })}
              style={{
                background: '#3b82f6',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '16px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)',
                cursor: 'pointer',
                border: 'none'
              }}>
              Katmanları Gör <ChevronRight size={20} />
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
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                initial={{ width: 0 }}
                animate={{ width: 300 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{
                  height: '60px',
                  background: i === 2 ? '#3b82f6' : 'var(--glass)',
                  borderRadius: '12px',
                  border: '1px solid var(--glass-border)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 20px',
                  boxShadow: i === 2 ? '0 0 30px rgba(59, 130, 246, 0.4)' : 'none'
                }}
              >
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: i === 2 ? 'white' : '#3b82f6', marginRight: '15px' }} />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, opacity: 0.8 }}>LAYER 0{i}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalHero;
