import React from 'react';
import { motion } from 'framer-motion';
import { Container, Box, Layers, PlayCircle, Anchor, Ship } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const ContainerizationPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
      <ArchHero 
        title="Container"
        subtitle="Architecture"
        description="'Benim makinemde çalışıyordu' sorununa son. Uygulamayı ve tüm çevresini (OS, Libs) taşınabilir kutulara (Container) hapsetme sanatı."
        badge="Docker & Kubernetes"
        color="#06b6d4"
        illustration={
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', width: '220px' }}>
            {['#06b6d4', '#3b82f6', '#06b6d4', '#3b82f6'].map((c, i) => (
              <motion.div 
                key={i} 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ height: '80px', background: c, borderRadius: '8px', border: '2px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Box color="rgba(255,255,255,0.5)" />
              </motion.div>
            ))}
          </div>
        }
        features={[
          { icon: <Container />, title: 'Isolation', desc: 'Her uygulama kendi sandbox\'ında çalışır, birbirini etkilemez.' },
          { icon: <Layers />, title: 'Portability', desc: 'Laptopta çalışan kod, sunucuda da %100 aynı çalışır.' },
          { icon: <Ship />, title: 'Scalability', desc: 'Kubernetes ile binlerce kopyayı saniyeler içinde çoğaltın.' }
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
                De Facto Standard
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                Modern konteyner orkestrasyonu standardı olan Kubernetes (K8s) hakkındaki en doğru ve güncel bilgiyi resmi dokümantasyonundan edinebilirsiniz.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://kubernetes.io/docs/concepts/overview/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(6, 182, 212, 0.15)', color: '#67e8f9', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(6, 182, 212, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    Kubernetes Concepts <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};
export default ContainerizationPage;
