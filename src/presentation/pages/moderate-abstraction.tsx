import React from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { 
  Layers, 
  MousePointer2, 
  Gauge, 
  Scale, 
  Hammer 
} from 'lucide-react';

const ModerateAbstractionPage = () => {
    const illu = (
        <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* The Balance Scale */}
             <motion.div 
               animate={{ rotate: [-5, 5, -5] }}
               transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
               style={{ width: '200px', height: '10px', background: '#93c5fd', borderRadius: '10px', position: 'relative' }}
            >
                <div style={{ position: 'absolute', left: '0', top: '10px', width: '2px', height: '50px', background: '#93c5fd' }}>
                     <div style={{ position: 'absolute', bottom: '-40px', left: '-20px', width: '40px', height: '40px', border: '2px solid #93c5fd', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <span style={{ fontSize: '10px', color: '#93c5fd' }}>Spaghetti</span>
                     </div>
                </div>
                <div style={{ position: 'absolute', right: '0', top: '10px', width: '2px', height: '50px', background: '#93c5fd' }}>
                     <div style={{ position: 'absolute', bottom: '-40px', left: '-20px', width: '40px', height: '40px', border: '2px solid #93c5fd', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <span style={{ fontSize: '10px', color: '#93c5fd' }}>OverEng</span>
                     </div>
                </div>
            </motion.div>
            <div style={{ position: 'absolute', top: '150px', width: '20px', height: '80px', background: 'rgba(255,255,255,0.1)' }} />
        </div>
    );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ArchHero 
        title="Moderate Abstraction"
        subtitle="Architectural Balance"
        description="Soyutlama (Abstraction) güçlü bir silahtır, ama fazlası 'Over-Engineering' zehrine dönüşür. Mükemmel mimari, ne çok sığ ne çok derin olandır."
        badge="Balance is Key"
        color="#93c5fd"
        illustration={illu}
        features={[
          { icon: <Scale />, title: 'Goldilocks Principle', desc: 'Ne çok sıcak, ne çok soğuk. Soyutlama seviyeniz problemin karmaşıklığına uygun olmalı.' },
          { icon: <Hammer />, title: 'YAGNI', desc: '"You Aren\'t Gonna Need It". İleride lazım olur diye şimdiden Generic Interface yazmayın.' },
          { icon: <Gauge />, title: 'Cognitive Load', desc: 'Her yeni katman (layer), yeni bir developera ekstra bilişsel yük bindirir.' }
        ]}
      />

      {/* Content */}
      <section className="section-padding">
        <div className="container">
           <div className="glass-card" style={{ padding: '3rem' }}>
              <h2 className="gradient-text" style={{ fontSize: '2rem', marginBottom: '2rem' }}>Soyutlama Tuzakları</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                 <div>
                    <h3 style={{ color: '#ef4444', marginBottom: '1rem' }}>Under-Abstraction</h3>
                    <p style={{ color: '#cbd5e1', lineHeight: 1.6 }}>
                       Hiç soyutlama yapmazsanız kodunuz tekrar eder (DRY ihlali) ve değişime dirençli hale gelir. 
                       Örneğin: SQL sorgularını direkt UI componentinde yazmak.
                    </p>
                 </div>
                 <div>
                    <h3 style={{ color: '#f59e0b', marginBottom: '1rem' }}>Over-Abstraction (Lasagna Code)</h3>
                    <p style={{ color: '#cbd5e1', lineHeight: 1.6 }}>
                       "Hello World" yazdırmak için 5 tane Interface, 3 tane Factory ve 2 tane Adapter yazıyorsanız, yanlış yoldasınız.
                       Kodu okuyan kişi "İş nerede yapılıyor?" diye kaybolmamalı.
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </section>

       {/* Reference Section */}
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
                Rule of Thumb
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                "Duplication is far cheaper than the wrong abstraction." — Sandi Metz
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(147, 197, 253, 0.15)', color: '#93c5fd', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(147, 197, 253, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    The Wrong Abstraction (Sandi Metz) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>

    </motion.div>
  );
};

export default ModerateAbstractionPage;
