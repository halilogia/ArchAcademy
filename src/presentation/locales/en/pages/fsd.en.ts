```tsx
import React from 'react';
import { motion } from 'framer-motion';
import FSDHero from '../components/FSDHero';
import FSDDiagram from '../components/FSDDiagram';
import FSDPractical from '../components/FSDPractical';

const FSDPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)' }}
    >
      <FSDHero />
      <FSDDiagram />
      <FSDPractical />

      <section style={{ padding: '80px 0', background: 'rgba(2, 6, 23, 0.4)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section-title">Layer Hierarchy</h2>
            <p style={{ color: 'var(--text-secondary)' }}>An unwavering order from top to bottom.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '3rem' }}>
            {/* Visual Layers */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { n: '1. App', c: '#0891b2', d: 'Setup, providers, styles.' },
                { n: '2. Pages', c: '#0e7490', d: 'Full-length routes.' },
                { n: '3. Widgets', c: '#155e75', d: 'Large self-contained UI blocks.' },
                { n: '4. Features', c: '#164e63', d: 'User interactions & scenarios.' },
                { n: '5. Entities', c: '#0f172a', d: 'Business entities (User, Post).' },
                { n: '6. Shared', c: '#1e293b', d: 'Reusable UI, Utils, Libs.' },
              ].map((layer, i) => (
                <div key={i} style={{
                  padding: '15px 20px', background: layer.c, borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                  <strong style={{ color: 'white', fontSize: '0.9rem' }}>{layer.n}</strong>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem' }}>{layer.d}</span>
                </div>
              ))}
            </div>

            {/* Rules Text */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center' }}>
               <div className="glass-card" style={{ borderLeft: '4px solid #06b6d4' }}>
                  <h4 style={{ color: 'white', marginBottom: '10px' }}>Dependency Rule</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
                    A layer can only import from layers directly below it. It must never reach into adjacent or upper layers.
                  </p>
               </div>
               <div className="glass-card" style={{ borderLeft: '4px solid #06b6d4' }}>
                  <h4 style={{ color: 'white', marginBottom: '10px' }}>Public API (index.ts)</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>
                    Each slice exposes only what consumers actually need. Internal files must never be imported from outside.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div className="glass-card" style={{
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
            textAlign: 'center',
            padding: '4rem'
          }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Why Choose FSD?</h2>
            <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              The biggest problem in large frontend projects is tightly coupled components.
              Feature-Sliced Design keeps those dependencies in check, keeping a project maintainable for years.
              If your project is growing and your folder structure is starting to turn into spaghetti, FSD is the right move.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
           <div style={{
             background: 'linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.5) 100%)',
             padding: '3rem',
             borderRadius: '24px',
             border: '1px solid rgba(255,255,255,0.05)',
             maxWidth: '900px',
             margin: '0 auto'
           }}>
              <div style={{ fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', marginBottom: '1rem', textTransform: 'uppercase' }}>
                Official Specification
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                The official documentation for Feature-Sliced Design — a rapidly rising standard among frontend architectures — explains the methodology in full detail.
              </p>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a
                   href="https://feature-sliced.design/"
                   target="_blank"
                   rel="noopener noreferrer"
                   style={{
                     display: 'flex', alignItems: 'center', gap: '8px',
                     background: 'rgba(6, 182, 212, 0.15)', color: '#67e8f9',
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(6, 182, 212, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    feature-sliced.design (Official) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};

export default FSDPage;
```