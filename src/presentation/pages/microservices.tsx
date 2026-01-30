import React from 'react';
import { motion } from 'framer-motion';
import SystemHero from '../components/SystemHero';
import SystemComparison from '../components/SystemComparison';
import SystemChoice from '../components/SystemChoice';

const MicroservicesPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)' }}
    >
      <SystemHero />
      <SystemComparison />
      <SystemChoice />
      
      {/* Conclusion */}
      <section style={{ padding: '100px 0', background: 'rgba(2, 6, 23, 0.8)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="glass-card" style={{ 
            padding: '5rem', 
            background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.1) 0%, rgba(190, 18, 60, 0.1) 100%)',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            <h2 style={{ marginBottom: '1.5rem' }}>Özet: Evrimsel Mimari</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: 1.8 }}>
              En iyi yaklaşım genellikle "Monolith First" stratejisidir. Sistemi tek parça olarak kurup, 
              içerisinde Clean Architecture veya EDA gibi disiplinleri uygulayarak sınırları belirlemek, 
              ve sadece ihtiyaç duyulduğunda (ölçeklenme veya ekip büyüklüğü sebebiyle) bu sınırları 
              kırarak Microservices'e geçmek mülakatlarda en çok takdir edilen "Senior" yaklaşımdır.
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
                Definitive Guide
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                Microservices mimarisinin tanımı, James Lewis ve Martin Fowler tarafından yazılan bu kapsamlı makalede belirlenmiştir.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://martinfowler.com/articles/microservices.html" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(244, 63, 94, 0.15)', color: '#fda4af', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(244, 63, 94, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    Read on MartinFowler.com <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};

export default MicroservicesPage;
