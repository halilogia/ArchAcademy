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
            <div style={{ position: 'relative', width: '300px', height: '350px', display: 'flex', gap: '15px' }}>
            {[0, 1, 2].map((i) => (
                <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: '300px' }}
                transition={{ delay: i * 0.3, duration: 1 }}
                style={{
                    flex: 1,
                    background: i === 1 ? '#f97316' : 'var(--glass)',
                    border: `2px solid ${i === 1 ? '#ea580c' : 'rgba(249, 115, 22, 0.2)'}`,
                    borderRadius: '15px',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    boxShadow: i === 1 ? '0 0 40px rgba(249, 115, 22, 0.3)' : 'none'
                }}
                >
                <div style={{ flex: 1, borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '0.6rem', fontWeight: 900, color: i === 1 ? 'white' : '#f97316' }}>API</span>
                </div>
                <div style={{ flex: 1, borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '0.6rem', fontWeight: 900, color: i === 1 ? 'white' : '#f97316' }}>LOGIC</span>
                </div>
                <div style={{ flex: 1, borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '0.6rem', fontWeight: 900, color: i === 1 ? 'white' : '#f97316' }}>DATA</span>
                </div>
                </motion.div>
            ))}
            <motion.div
                animate={{ y: [0, 300, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                style={{ position: 'absolute', left: '-20px', top: 0, width: '140%', height: '2px', background: '#f97316', boxShadow: '0 0 15px #f97316' }}
            />
            </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VerticalHero;
