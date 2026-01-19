import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, Zap, Layers, Combine } from 'lucide-react';

const VerticalHero = () => {
  return (
    <section style={{
      padding: '120px 0 60px',
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(circle at top left, rgba(249, 115, 22, 0.1), transparent)'
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
            background: 'rgba(249, 115, 22, 0.1)',
            padding: '8px 16px',
            borderRadius: '100px',
            color: '#f97316',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '2rem',
            border: '1px solid rgba(249, 115, 22, 0.2)'
          }}>
            <Scissors size={14} /> Bir Mimari Şablon Değil, Bir Tasarım Stili
          </div>

          <h1 className="gradient-text" style={{
            fontSize: '4.5rem',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            letterSpacing: '-2px'
          }}>
            Vertical Slice <br /> Architecture
          </h1>
          
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.25rem',
            maxWidth: '600px',
            marginBottom: '3rem',
            lineHeight: 1.7
          }}>
            Kodu katmanlara göre değil, özelliklere göre organize etme disiplini. 
            Her "dilim" o anki ihtiyaca göre şekillenen, bağımsız ve esnek bir mimari stildir. 
            Aşırı mühendislikten kaçınan senior bir yaklaşım.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button 
              onClick={() => window.scrollTo({ top: 900, behavior: 'smooth' })}
              style={{
                background: '#f97316',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '16px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 8px 24px rgba(249, 115, 22, 0.3)',
                cursor: 'pointer',
                border: 'none'
              }}>
              Dilimleri Kes <Zap size={20} />
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
            gap: '15px'
          }}>
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  height: [200, 300, 200],
                  y: i % 2 === 0 ? [0, 20, 0] : [0, -20, 0]
                }}
                transition={{ repeat: Infinity, duration: 4, delay: i * 0.5 }}
                style={{
                  width: '80px',
                  background: i === 2 ? '#f97316' : 'var(--glass)',
                  borderRadius: '20px',
                  border: '1px solid var(--glass-border)',
                  boxShadow: i === 2 ? '0 0 30px rgba(249, 115, 22, 0.4)' : 'none'
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VerticalHero;
