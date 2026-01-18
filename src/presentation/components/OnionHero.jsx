import React from 'react';
import { motion } from 'framer-motion';
import { Circle, ChevronRight, Layers, Target } from 'lucide-react';

const OnionHero = () => {
  return (
    <section style={{
      padding: '120px 0 60px',
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(circle at top right, rgba(244, 63, 94, 0.1), transparent)'
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
            background: 'rgba(244, 63, 94, 0.1)',
            padding: '8px 16px',
            borderRadius: '100px',
            color: '#f43f5e',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '2rem',
            border: '1px solid rgba(244, 63, 94, 0.2)'
          }}>
            <Target size={14} /> Bağımlılıkların Tek Yönlü Akışı
          </div>

          <h1 className="gradient-text" style={{
            fontSize: '4.5rem',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            letterSpacing: '-2px'
          }}>
            Onion <br /> Architecture
          </h1>
          
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.25rem',
            maxWidth: '600px',
            marginBottom: '3rem',
            lineHeight: 1.7
          }}>
            Jeffrey Palermo tarafından geliştirilen, "Bağımlılığın Tersine Çevrilmesi" prensibini 
            merkeze alan katmanlı bir model. Uygulamanızın çekirdeği teknolojiden arınmış kalsın.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button style={{
              background: '#f43f5e',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '16px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 8px 24px rgba(244, 63, 94, 0.3)'
            }}>
              Katmanları Soy <ChevronRight size={20} />
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
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle, rgba(244, 63, 94, 0.15) 0%, transparent 70%)',
            zIndex: -1
          }} />
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '1rem' 
          }}>
            <div style={{
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'var(--glass)',
              border: '2px solid rgba(244, 63, 94, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: '0 0 40px rgba(0,0,0,0.3)'
            }}>
              <div style={{ width: '200px', height: '200px', borderRadius: '50%', border: '2px solid rgba(244, 63, 94, 0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: '#f43f5e', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(244, 63, 94, 0.5)' }}>
                  <Target size={40} color="white" />
                </div>
              </div>
            </div>
            <span style={{ color: '#f43f5e', fontWeight: 600, letterSpacing: '2px' }}>CORE</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OnionHero;
