import React from 'react';
import { motion } from 'framer-motion';
import { Hexagon, Zap, ArrowRight, Activity } from 'lucide-react';

const HexagonalHero = () => {
  return (
    <section style={{
      padding: '120px 0 60px',
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(circle at top left, rgba(16, 185, 129, 0.1), transparent)'
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
            background: 'rgba(16, 185, 129, 0.1)',
            padding: '8px 16px',
            borderRadius: '100px',
            color: '#10b981',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '2rem',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            <Activity size={14} /> Dış Dünyadan Bağımsız Mantık
          </div>

          <h1 className="gradient-text" style={{
            fontSize: '4.5rem',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            letterSpacing: '-2px'
          }}>
            Hexagonal <br /> Architecture
          </h1>
          
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.25rem',
            maxWidth: '600px',
            marginBottom: '3rem',
            lineHeight: 1.7
          }}>
            Alistair Cockburn tarafından geliştirilen "Ports and Adapters" deseni. 
            Uygulamanızın merkezini, dışarıdaki veritabanı, UI veya API'lerden tamamen soyutlayın.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button 
              onClick={() => window.scrollTo({ top: 900, behavior: 'smooth' })}
              style={{
                background: '#10b981',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '16px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 8px 24px rgba(16, 185, 129, 0.3)',
                cursor: 'pointer',
                border: 'none'
              }}>
              Mimariyi İncele <ArrowRight size={20} />
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
            borderRadius: '20px',
            border: '1px solid var(--glass-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotate(15deg)'
          }}>
            <Hexagon size={180} color="#10b981" style={{ filter: 'drop-shadow(0 0 30px rgba(16, 185, 129, 0.4))' }} />
          </div>
          
          {/* Floating dots for "Adapters" */}
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                y: [0, -20, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ repeat: Infinity, duration: 2 + i, delay: i * 0.5 }}
              style={{
                position: 'absolute',
                width: '12px',
                height: '12px',
                background: '#10b981',
                borderRadius: '50%',
                top: `${20 * i}%`,
                left: i % 2 === 0 ? '-10%' : '110%'
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HexagonalHero;
