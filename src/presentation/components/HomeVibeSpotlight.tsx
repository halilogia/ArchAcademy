import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const HomeVibeSpotlight: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <section style={{ padding: '0 0 60px', position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card"
          style={{
            background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(15, 23, 42, 0.9) 100%)',
            padding: '4rem',
            borderRadius: '60px',
            border: '2px solid rgba(249, 115, 22, 0.25)',
            display: 'grid',
            gridTemplateColumns: 'minmax(300px, 1.2fr) 1fr',
            gap: '4rem',
            alignItems: 'center',
            boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 0 50px rgba(249, 115, 22, 0.05)'
          }}
        >
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(249, 115, 22, 0.15)',
              color: '#f97316',
              padding: '8px 16px',
              borderRadius: '100px',
              fontSize: '0.75rem',
              fontWeight: 900,
              marginBottom: '1.5rem',
              letterSpacing: '1px'
            }}>
              <Sparkles size={14} /> {isEn ? '2026 VIBE-CODING SPOTLIGHT' : 'YENI NESIL VIBE-CODING GOZDESI'}
            </div>
            <h2 style={{ fontSize: '4.5rem', fontWeight: 950, color: 'white', marginBottom: '1.5rem', lineHeight: 1, letterSpacing: '-3px' }}>
              Vertical Slice <br />
              <span style={{ color: '#f97316' }}>& FSD Architecture</span>
            </h2>
            <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '3rem', maxWidth: '600px' }}>
              {isEn 
                ? 'Zero context loss for AI agents. Isolate features into autonomous vertical slices and rule out butterfly-effect bugs during vibe-coding sessions.'
                : 'Yapay Zeka ve Vibe-Coding için sıfır bağlam kaybı. Özellikleri bağımsız dikey dilimlere hapsedin, kelebek etkisi hatalarını tamamen yok edin.'
              }
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/vertical" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(249, 115, 22, 0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '1.25rem 2.5rem',
                    background: '#f97316',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    fontWeight: 900,
                    fontSize: '1.05rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  {isEn ? 'Vertical Slice (VSA)' : 'Dikey Dilim (VSA)'} <ArrowUpRight size={20} />
                </motion.button>
              </Link>
              <Link to="/modular-monolith" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ scale: 1.05, background: 'rgba(56, 189, 248, 0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '1.25rem 2.5rem',
                    background: 'rgba(56, 189, 248, 0.12)',
                    color: '#38bdf8',
                    border: '1px solid rgba(56, 189, 248, 0.35)',
                    borderRadius: '20px',
                    fontWeight: 900,
                    fontSize: '1.05rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  {isEn ? 'Pragmatic Modular (PMA)' : 'Pragmatik Modüler (PMA)'} <ArrowUpRight size={20} />
                </motion.button>
              </Link>
              <Link to="/fsd" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '1.25rem 2.5rem',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'white',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: '20px',
                    fontWeight: 800,
                    fontSize: '1.05rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  {isEn ? 'Feature-Sliced (FSD)' : 'Feature-Sliced (FSD)'} <ArrowUpRight size={20} />
                </motion.button>
              </Link>
            </div>
          </div>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '350px',
              height: '350px',
              borderRadius: '50px',
              background: 'rgba(249, 115, 22, 0.03)',
              border: '1px solid rgba(249, 115, 22, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  width: '280px',
                  height: '280px',
                  borderRadius: '40px',
                  border: '2px dashed rgba(249, 115, 22, 0.3)'
                }}
              />
              <div style={{
                width: '130px',
                height: '130px',
                background: '#090d16',
                borderRadius: '32px',
                border: '3px solid #f97316',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 40px rgba(249, 115, 22, 0.3)'
              }}>
                <Target size={52} color="#f97316" />
                <span style={{ fontSize: '0.75rem', fontWeight: 900, color: 'white', marginTop: '6px' }}>VSA & FSD</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeVibeSpotlight;
