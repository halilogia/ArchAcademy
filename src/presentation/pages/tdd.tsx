import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { useProgress } from '../context/ProgressContext';
import { Bug, Cpu, TestTube, CheckCircle2, Zap } from 'lucide-react';

const TDDPage = () => {
  const { completeStep } = useProgress();

  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/tdd');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ArchHero 
        title="TDD"
        subtitle="Metodolojisi"
        description="Test-Driven Development (Test Odaklı Geliştirme). Yazılımı geliştirmeden önce testini yazma disiplini. Red-Green-Refactor döngüsünün gücü."
        badge="Quality First"
        color="#10b981"
        illustration={
          <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              style={{ position: 'absolute', width: '250px', height: '250px', border: '2px dashed #10b98133', borderRadius: '50%' }}
            />
            <div className="glass-card" style={{ padding: '2rem', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)' }}>
               <TestTube size={60} color="#10b981" />
            </div>
          </div>
        }
        features={[
          { icon: <Bug />, title: "Sıfır Bug Hedefi", desc: "Hatalar daha oluşmadan testlerle engellenir." },
          { icon: <Cpu />, title: "Temiz Tasarım", desc: "Test yazmak sizi daha modüler kod yazmaya zorlar." },
          { icon: <CheckCircle2 />, title: "Güvenli Refactoring", desc: "Testleriniz varken kodda değişiklik yapmak korkutucu değildir." }
        ]}
      />

      <section className="section-padding">
        <div className="container">
          <div className="glass-card" style={{ padding: '4rem', textAlign: 'center' }}>
            <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Red - Green - Refactor</h2>
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
               <div style={{ flex: 1, minWidth: '250px', padding: '2rem', borderRadius: '24px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  <h3 style={{ color: '#ef4444' }}>🔴 RED</h3>
                  <p>Henüz yazmadığınız özelliğin testini yazın ve hata almasını (fail) izleyin.</p>
               </div>
               <div style={{ flex: 1, minWidth: '250px', padding: '2rem', borderRadius: '24px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <h3 style={{ color: '#10b981' }}>🟢 GREEN</h3>
                  <p>Testi geçecek kadar (minimum) kodu yazın.</p>
               </div>
               <div style={{ flex: 1, minWidth: '250px', padding: '2rem', borderRadius: '24px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                  <h3 style={{ color: '#3b82f6' }}>🔵 REFACTOR</h3>
                  <p>Kodu temizleyin, standartlara uydurun; testler hala yeşil mi kontrol edin.</p>
               </div>
            </div>
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
                Core Discipline
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                TDD bir test yöntemi değil, bir tasarım yöntemidir. Kent Beck tarafından popülerleştirilen bu disiplinin detaylarını inceleyin.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://martinfowler.com/bliki/TestDrivenDevelopment.html" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(16, 185, 129, 0.15)', color: '#6ee7b7', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(16, 185, 129, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    What is TDD? (Martin Fowler) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};

export default TDDPage;
