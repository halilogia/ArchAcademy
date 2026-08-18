import React from 'react';
import { motion } from 'framer-motion';
import HorizontalHero from '../components/HorizontalHero';
import HorizontalDiagram from '../components/HorizontalDiagram';
import HorizontalPractical from '../components/HorizontalPractical';

const HorizontalPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)' }}
    >
      <HorizontalHero />
      <HorizontalDiagram />
      <HorizontalPractical />
      
      <section style={{ padding: '80px 0', background: 'rgba(2, 6, 23, 0.4)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section-title">Layer Communication Rules</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Disciplined yet strict hierarchy.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            <div className="glass-card" style={{ borderLeft: '4px solid #3b82f6' }}>
               <h3 style={{ marginBottom: '1.5rem', color: '#60a5fa' }}>Strict Layering</h3>
               <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                 A layer can access only the layer immediately below it. Presentation accesses only Business; 
                 Business accesses only Data. Skipping layers is strictly forbidden.
               </p>
            </div>
            <div className="glass-card" style={{ borderLeft: '4px solid #3b82f6' }}>
               <h3 style={{ marginBottom: '1.5rem', color: '#60a5fa' }}>Relaxed Layering</h3>
               <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                 A layer can access any layer below it. For example, Presentation may sometimes access 
                 the Persistence layer directly (e.g., fast reporting).
               </p>
            </div>
          </div>

          <div style={{ marginTop: '4rem', padding: '3rem', background: '#0f172a', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
             <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>"Sinkhole" Antipattern</h3>
             <p style={{ color: '#94a3b8', lineHeight: 1.8, textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                Biggest risk in layered architecture: Business layer becomes just a pass-through. 
                If Business layer has no logic and only forwards data from Presentation to Data, 
                you create unnecessary complexity. This is called an "Architecture Sinkhole".
             </p>
          </div>
        </div>
      </section>
      
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="glass-card" style={{ 
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%)',
            padding: '4rem'
          }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Summary: When to Choose It?</h3>
            <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              Horizontal Architecture is standard in enterprise projects where team structure is divided 
              by technical expertise (e.g., backend developers only, DB specialists only). 
              Strict layer rules preserve technical integrity, but as project grows, 
              Tight Coupling issues may emerge. At that point, consider moving to modern approaches 
              like Clean Architecture or Vertical Slice.
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
                Standard Resources
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                You can review Microsoft's comprehensive design documentation on classic multi-layer (n-tier) architecture.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/n-tier" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(59, 130, 246, 0.15)', color: '#93c5fd', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(59, 130, 246, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    N-tier architecture style (Microsoft) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};

export default HorizontalPage;