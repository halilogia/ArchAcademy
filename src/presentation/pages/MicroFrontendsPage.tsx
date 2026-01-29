import React from 'react';
import { motion } from 'framer-motion';
import { Network, Puzzle, BringToFront, Split } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const MicroFrontendsPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
      <ArchHero 
        title="Micro"
        subtitle="Frontends"
        description="Monolitik frontend uygulamalarını, bağımsız takımların geliştirebileceği küçük ve özerk parçalara bölme stratejisi."
        badge="Scalability Strategy"
        color="#ec4899"
        illustration={
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', width: '200px' }}>
            {['#ec4899', '#8b5cf6', '#3b82f6', '#10b981'].map((c, i) => (
              <motion.div 
                key={i} 
                animate={{ scale: [1, 1.1, 1] }} 
                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                style={{ height: '80px', background: c, borderRadius: '12px', opacity: 0.8 }} 
              />
            ))}
          </div>
        }
        features={[
          { icon: <Split />, title: 'Team Autonomy', desc: 'Her takım kendi teknolojisini (React, Vue) seçebilir.' },
          { icon: <Puzzle />, title: 'Independent Deploy', desc: 'Sepet takımı, Arama takımını beklemeden canlıya çıkabilir.' },
          { icon: <BringToFront />, title: 'Incremental Upgrade', desc: 'Uygulamayı parça parça modernize edebilirsiniz.' }
        ]}
      />
      
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
                Deep Dive Article
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                Micro Frontends kavramının tanımı, avantajları ve uygulama yöntemleri Martin Fowler'ın sitesinde detaylıca anlatılmıştır.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://martinfowler.com/articles/micro-frontends.html" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(236, 72, 153, 0.15)', color: '#fbcfe8', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(236, 72, 153, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    Micro Frontends Guide <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};
export default MicroFrontendsPage;
