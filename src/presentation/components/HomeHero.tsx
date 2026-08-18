import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sparkles, ArrowRight, BookOpen, Shield } from 'lucide-react';
import { theme } from '../themes/theme';

const HomeHero: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  return (
    <>
      <section style={{
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '120px 0 60px',
        background: `radial-gradient(circle at center, ${theme.colors.primary}1a 0%, transparent 70%)`
      }}>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: theme.colors.surfaceLight + '0d',
              padding: '10px 20px',
              borderRadius: '100px',
              border: `1px solid ${theme.effects.glassBorder}`,
              color: theme.colors.primary,
              fontSize: '0.9rem',
              fontWeight: 700,
              marginBottom: '2.5rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
            }}>
              <Sparkles size={16} /> {isEn ? "Architect's Field Guide v2.0" : "Kişisel Tasarım Defteri v2.0"}
            </div>

            <h1 className="gradient-text" style={{
              fontSize: '6.5rem',
              fontWeight: 950,
              lineHeight: 0.9,
              marginBottom: '2.5rem',
              letterSpacing: '-4px'
            }}>
              {isEn ? (
                <>Software Architecture <br /> <span style={{ opacity: 0.9 }}>Notebooks.</span></>
              ) : (
                <>Yazılım Mimari <br /> <span style={{ opacity: 0.9 }}>Notlarım.</span></>
              )}
            </h1>

            <p style={{
              fontSize: '1.5rem',
              color: theme.colors.textSecondary,
              maxWidth: '900px',
              margin: '0 auto 4rem',
              lineHeight: 1.7,
              fontWeight: 500
            }}>
              {isEn ? (
                <>Simplify complex systems, make senior-level decisions, and <br />
                personally build the software architectures of tomorrow.</>
              ) : (
                <>Karmaşık sistemleri basitleştirin, senior seviye kararlar alın ve <br />
                geleceğin yazılım mimarisini bizzat inşa edin.</>
              )}
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
              <Link to="/roadmap" style={{ textDecoration: 'none' }}>
                <button style={{
                  background: theme.colors.primary,
                  color: 'white',
                  padding: '1.25rem 2.5rem',
                  borderRadius: '20px',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  boxShadow: `0 10px 30px ${theme.colors.primaryGlow}`,
                  border: 'none',
                  cursor: 'pointer'
                }}>
                  {isEn ? "Start Learning" : "Eğitime Başla"} <ArrowRight size={20} />
                </button>
              </Link>
              <Link to="/compare" style={{ textDecoration: 'none' }}>
                <button style={{
                  background: theme.effects.glass,
                  color: 'white',
                  padding: '1.25rem 2.5rem',
                  borderRadius: '20px',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  border: `1px solid ${theme.effects.glassBorder}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  cursor: 'pointer'
                }}>
                  <BookOpen size={20} /> {isEn ? "Master Matrix" : "Müfredat"}
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: '20%',
            right: '-5%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            border: `1px dashed ${theme.colors.primary}1a`,
            pointerEvents: 'none'
          }}
        />
      </section>

      {/* --- CORE PHILOSOPHY SECTION --- */}
      <section style={{ padding: '80px 0', position: 'relative' }}>
        <div className="container">
          <div className="glass-card" style={{
            padding: '4rem',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(6, 78, 59, 0.1) 100%)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            alignItems: 'center',
            gap: '4rem'
          }}>

            {/* Left: Manifesto Text */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '40px', height: '2px', background: '#10b981' }}></div>
                <span style={{ color: '#10b981', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.9rem' }}>CORE PHILOSOPHY</span>
              </div>

              <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.1 }}>
                {isEn ? "Domain is Sovereign." : "Domain Özgürdür."} <br />
                <span style={{ opacity: 0.5, fontSize: '2rem' }}>
                  {isEn ? "(Uncompromising Business Core)" : "(Domain is Sovereign)"}
                </span>
              </h2>

              <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
                {isEn ? (
                  <>Technologies come and go in the software world, but business rules (the Domain) endure.
                  True clean code is the discipline of completely isolating domain logic from <strong>Databases, UI, and Frameworks</strong>.
                  The Domain must remain unpolluted, pure, and free from external infrastructure concerns.</>
                ) : (
                  <>Yazılım dünyasında teknolojiler değişir, ama iş kuralları (Domain) kalıcıdır.
                  Gerçek temiz kod, iş mantığını <strong>Veritabanından, Arayüzden (UI) ve Frameworklerden</strong> tamamen izole etme sanatıdır.
                  Domain, dış dünyadaki bu detaylardan habersiz, saf ve özgür olmalıdır.</>
                )}
              </p>

              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {(isEn ? [
                  "Infrastructure Agnostic (Total tech independence)",
                  "Isolated Testability (Test without DB or network)",
                  "Longevity (Code designed to outlive frameworks)"
                ] : [
                  "Teknoloji Bağımsızlığı (Infrastructure Agnostic)",
                  "Test Edilebilirlik (Veritabanı olmadan test)",
                  "Sürdürülebilirlik (Yıllara meydan okuyan kod)"
                ]).map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Visual Abstract Representation - THE DOMAIN FORTRESS */}
            <div style={{ position: 'relative', height: '100%', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* 1. THE CORE (DOMAIN) */}
              <div style={{
                position: 'relative',
                width: '160px',
                height: '160px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 3,
                boxShadow: '0 0 60px rgba(16, 185, 129, 0.5)',
                border: '4px solid rgba(255,255,255,0.1)'
              }}>
                <Shield size={32} color="white" style={{ marginBottom: '0.5rem' }} />
                <h3 style={{ margin: 0, color: 'white', fontSize: '1rem', fontWeight: 800, letterSpacing: '1px' }}>DOMAIN</h3>
                <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.8)', marginTop: '2px', textTransform: 'uppercase' }}>Business Rules</span>
              </div>

              {/* 2. THE SHIELD (PORTS & ADAPTERS) */}
              <div style={{
                position: 'absolute',
                width: '280px',
                height: '280px',
                borderRadius: '50%',
                border: '1px dashed rgba(16, 185, 129, 0.5)',
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
                zIndex: 2,
                boxShadow: '0 0 30px rgba(16, 185, 129, 0.1) inset'
              }}></div>

              {/* 3. THE EXTERNAL WORLD */}
              <div style={{ position: 'absolute', top: '10px', background: '#0f172a', padding: '6px 14px', borderRadius: '100px', border: '1px solid #334155', color: '#94a3b8', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 4, boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
                <div style={{ width: '6px', height: '6px', background: '#ef4444', borderRadius: '50%', boxShadow: '0 0 10px #ef4444' }}></div> UI / Web
              </div>

              <div style={{ position: 'absolute', bottom: '10px', background: '#0f172a', padding: '6px 14px', borderRadius: '100px', border: '1px solid #334155', color: '#94a3b8', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 4, boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
                <div style={{ width: '6px', height: '6px', background: '#f59e0b', borderRadius: '50%', boxShadow: '0 0 10px #f59e0b' }}></div> Database
              </div>

              <div style={{ position: 'absolute', left: '-30px', background: '#0f172a', padding: '6px 14px', borderRadius: '100px', border: '1px solid #334155', color: '#94a3b8', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 4, boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
                <div style={{ width: '6px', height: '6px', background: '#3b82f6', borderRadius: '50%', boxShadow: '0 0 10px #3b82f6' }}></div> React / Next
              </div>

              <div style={{ position: 'absolute', right: '-30px', background: '#0f172a', padding: '6px 14px', borderRadius: '100px', border: '1px solid #334155', color: '#94a3b8', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 4, boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}>
                <div style={{ width: '6px', height: '6px', background: '#a855f7', borderRadius: '50%', boxShadow: '0 0 10px #a855f7' }}></div> 3rd Party
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default HomeHero;
