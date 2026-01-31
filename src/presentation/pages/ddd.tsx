import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import DDDHero from '../components/DDDHero';
import StrategicDetails from '../components/StrategicDetails';
import DDDSimulation from '../components/DDDSimulation';
import DDDSection from '../components/DDDSection';
import DDDKeyConcepts from '../components/DDDKeyConcepts';
import { useProgress } from '../../context/ProgressContext';

const DDDPage = () => {
  const { completeStep } = useProgress();

  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/ddd');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)' }}
    >
      <DDDHero />
      <StrategicDetails />
      <DDDKeyConcepts />
      <DDDSimulation />
      
      <section style={{ padding: '100px 0', background: 'rgba(2, 6, 23, 0.5)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
            {/* Strategic Design */}
            <div className="glass-card" style={{ borderTop: '4px solid #7c3aed' }}>
               <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#a78bfa' }}>
                  Stratejik Tasarım (Strategic)
               </h3>
               <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
                  Büyük ve karmaşık sistemleri yönetilebilir parçalara bölmek için kullanılan üst düzey kararlar. 
                  Yazılımcılar ve iş birimleri (Business Experts) aynı dili konuşmalıdır.
               </p>
               <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <li style={{ background: 'rgba(124, 58, 237, 0.1)', padding: '12px', borderRadius: '8px' }}>
                    <strong style={{ color: 'white' }}>Bounded Context:</strong> Bir kelimenin (örn: Ürün) farklı ekipler için farklı anlamlar taşıdığı sinırlar.
                  </li>
                  <li style={{ background: 'rgba(124, 58, 237, 0.1)', padding: '12px', borderRadius: '8px' }}>
                    <strong style={{ color: 'white' }}>Ubiquitous Language:</strong> Tüm ekip tarafından (analistten yazılımcıya) kullanılan ortak dil.
                  </li>
               </ul>
            </div>

            {/* Tactical Design */}
            <div className="glass-card" style={{ borderTop: '4px solid #10b981' }}>
               <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981' }}>
                  Taktiksel Tasarım (Tactical)
               </h3>
               <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
                  Kod seviyesinde iş mantığını nasıl modelleyeceğimize odaklanan teknik desenler.
               </p>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {[
                    { t: 'Entity', d: 'Kimliği olan nesneler.' },
                    { t: 'Value Object', d: 'Kimliği olmayan değerler.' },
                    { t: 'Aggregate', d: 'Bir grup nesnenin yöneticisi.' },
                    { t: 'Repository', d: 'Veri erişim soyutlaması.' }
                  ].map((item, i) => (
                    <div key={i} style={{ padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ fontWeight: 800, color: '#10b981', fontSize: '0.85rem' }}>{item.t}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{item.d}</div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Keeping the summary section but styled as a footer detail */}
      <div style={{ paddingBottom: '100px' }}>
        <DDDSection />
        
        <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
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
                  Reference & Community
                </div>
                <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  Bu içerik, Eric Evans'ın "Domain-Driven Design" kitabına ve Domain Language topluluğunun yayınladığı referans dokümanlarına dayanmaktadır.
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                   <a 
                     href="https://www.domainlanguage.com/ddd/" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     style={{ 
                       display: 'flex', alignItems: 'center', gap: '8px', 
                       background: 'rgba(124, 58, 237, 0.15)', color: '#a78bfa', 
                       padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                       border: '1px solid rgba(124, 58, 237, 0.2)', transition: 'all 0.2s'
                     }}
                   >
                      Domain Language (Official) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                   </a>
                </div>
             </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default DDDPage;
