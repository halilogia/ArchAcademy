import React from 'react';
import { motion } from 'framer-motion';
import { Split, Zap, Search, ArrowRight, ShieldCheck } from 'lucide-react';

const CQRSHero = () => {
  return (
    <section style={{
      padding: '120px 0 60px',
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(circle at top left, rgba(234, 179, 8, 0.1), transparent)'
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
            background: 'rgba(234, 179, 8, 0.1)',
            padding: '8px 16px',
            borderRadius: '100px',
            color: '#eab308',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '2rem',
            border: '1px solid rgba(234, 179, 8, 0.2)'
          }}>
            <Split size={14} /> Sorumlulukların Radikal Ayrımı
          </div>

          <h1 className="gradient-text" style={{
            fontSize: '4.5rem',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            letterSpacing: '-2px'
          }}>
            CQRS <br /> Discipline
          </h1>
          
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.25rem',
            maxWidth: '600px',
            marginBottom: '3rem',
            lineHeight: 1.7
          }}>
            Veri yazma (Command) ve veri okuma (Query) işlemlerini birbirinden ayıran, 
            yüksek performanslı ve ölçeklenebilir sistemlerin temel disiplini.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <button style={{
              background: '#eab308',
              color: 'black',
              padding: '1rem 2rem',
              borderRadius: '16px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 8px 24px rgba(234, 179, 8, 0.3)'
            }}>
              Derinlemesine İncele <ArrowRight size={20} />
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px'
          }}>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                <motion.div 
                  animate={{ y: [0, -10, 0] }} 
                  transition={{ repeat: Infinity, duration: 2 }}
                  style={{ background: '#f59e0b', padding: '15px', borderRadius: '12px' }}
                >
                  <Zap size={32} color="black" />
                </motion.div>
                <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>COMMAND</span>
             </div>
             
             <div style={{ width: '2px', height: '100px', background: 'var(--glass-border)' }} />

             <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
                <motion.div 
                  animate={{ y: [0, 10, 0] }} 
                  transition={{ repeat: Infinity, duration: 2 }}
                  style={{ background: '#3b82f6', padding: '15px', borderRadius: '12px' }}
                >
                  <Search size={32} color="white" />
                </motion.div>
                <span style={{ fontSize: '0.7rem', fontWeight: 600 }}>QUERY</span>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CQRSHero;
