import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import SOLIDHero from '../components/SOLIDHero';
import SOLIDSection from '../components/SOLIDSection';
import { useProgress } from '../context/ProgressContext';

const SOLIDPage = () => {
  const { completeStep } = useProgress();

  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/solid');
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
      <SOLIDHero />
      <SOLIDSection />

      <section style={{ padding: '80px 0', background: 'rgba(2, 6, 23, 0.3)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section-title">Prensiplerin Özeti</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Daha esnek, test edilebilir ve sürdürülebilir kod için 5 altın kural.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {[
              { id: 'S', t: 'Single Responsibility', d: 'Bir sınıfın değişmesi için sadece tek bir sebebi olmalıdır.' },
              { id: 'O', t: 'Open/Closed', d: 'Sınıflar genişletilmeye açık, değişikliğe kapalı olmalıdır.' },
              { id: 'L', t: 'Liskov Substitution', d: 'Alt sınıflar, üst sınıfların yerine geçebilmelidir.' },
              { id: 'I', t: 'Interface Segregation', d: 'Kullanılmayan metodlar sınıflara zorla implemente ettirilmemelidir.' },
              { id: 'D', t: 'Dependency Inversion', d: 'Yüksek seviyeli modüller, düşük seviyeli modüllere bağımlı olmamalıdır.' }
            ].map((item) => (
              <div key={item.id} className="glass-card" style={{ borderTop: '4px solid #3b82f6' }}>
                <div style={{ fontSize: '3rem', fontWeight: 900, color: '#3b82f6', opacity: 0.2, lineHeight: 1 }}>{item.id}</div>
                <h3 style={{ fontSize: '1.2rem', color: 'white', marginBottom: '10px' }}>{item.t}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.d}</p>
              </div>
            ))}
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
                The Origin
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                SOLID prensiplerinin kaynağı olan "Design Principles and Design Patterns" makalesi, Robert C. Martin (Uncle Bob) tarafından 2000 yılında yayınlanmıştır.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://blog.cleancoder.com/uncle-bob/2020/10/18/Solid-Relevance.html" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(99, 102, 241, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    SOLID Relevance (Uncle Bob) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};

export default SOLIDPage;
