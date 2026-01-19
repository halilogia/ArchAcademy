import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Radio, Share2, ChevronRight, Activity } from 'lucide-react';

const EDAHero = () => {
  return (
    <section style={{
      padding: '120px 0 60px',
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(circle at top right, rgba(168, 85, 247, 0.1), transparent)'
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
            background: 'rgba(168, 85, 247, 0.1)',
            padding: '8px 16px',
            borderRadius: '100px',
            color: '#a855f7',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '2rem',
            border: '1px solid rgba(168, 85, 247, 0.2)'
          }}>
            <Activity size={14} /> Reaktif ve Dağıtık Sistemler
          </div>

          <h1 className="gradient-text" style={{
            fontSize: '4.5rem',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            letterSpacing: '-2px'
          }}>
            Event-Driven <br /> Architecture (EDA)
          </h1>
          
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.25rem',
            maxWidth: '600px',
            marginBottom: '3rem',
            lineHeight: 1.7
          }}>
            Sistemin durumunda olan değişiklikleri "olay" (event) olarak yayınlayın. 
            Servislerinizi birbirinden tamamen koparın, asenkron ve esnek bir yapı kurun.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button 
              onClick={() => window.scrollTo({ top: 900, behavior: 'smooth' })}
              style={{
                background: '#a855f7',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '16px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 8px 24px rgba(168, 85, 247, 0.3)',
                cursor: 'pointer',
                border: 'none'
              }}>
              Olayları Yakala <Zap size={20} />
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
            borderRadius: '50%',
            border: '2px dashed rgba(168, 85, 247, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            {/* Publisher */}
            <motion.div 
              animate={{ x: [-80, -60, -80] }}
              transition={{ repeat: Infinity, duration: 4 }}
              style={{ position: 'absolute', left: '-20px', background: '#a855f7', padding: '12px', borderRadius: '12px', boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }}
            >
              <Radio size={24} color="white" />
            </motion.div>

            {/* Event Particles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                   x: [-80, 150],
                   opacity: [0, 1, 0],
                   scale: [0.5, 1, 0.5]
                }}
                transition={{ 
                   repeat: Infinity, 
                   duration: 3, 
                   delay: i * 0.6,
                   ease: "linear"
                }}
                style={{ 
                   position: 'absolute', 
                   left: '50%',
                   width: '10px', 
                   height: '10px', 
                   background: '#a855f7', 
                   borderRadius: '50%' 
                }}
              />
            ))}

            {/* Consumer */}
            <motion.div 
              animate={{ x: [80, 60, 80] }}
              transition={{ repeat: Infinity, duration: 4 }}
              style={{ position: 'absolute', right: '-20px', background: 'var(--glass)', border: '1px solid #a855f7', padding: '12px', borderRadius: '12px' }}
            >
              <Share2 size={24} color="#a855f7" />
            </motion.div>
            
            <Zap size={60} color="#a855f7" opacity={0.3} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EDAHero;
