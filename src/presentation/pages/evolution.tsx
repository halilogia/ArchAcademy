import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, ShieldAlert, RefreshCw, Layers } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const EvolutionaryPage: React.FC = () => {
  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '300px' }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ 
            x: [0, 20, 0],
            y: [i * 70, i * 70 - 10, i * 70],
            scale: [1, 1.05, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            width: '220px',
            height: '60px',
            background: 'var(--glass)',
            border: '1px solid #ec4899',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            boxShadow: '0 10px 30px rgba(236, 72, 153, 0.1)'
          }}
        >
          <GitBranch size={20} color="#ec4899" style={{ marginRight: '15px' }} />
          <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>VERSION {i + 1}.0</span>
        </motion.div>
      ))}
      <motion.div
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ position: 'absolute', right: 20, top: '50%', color: '#ec4899' }}
      >
        <RefreshCw size={40} />
      </motion.div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: '#020617', minHeight: '100vh', color: 'white' }}>
      <ArchHero   
        title="Evolutionary"
        subtitle="Architecture"
        description="'Evolutionary architecture supports guided, incremental change across multiple dimensions.' Neal Ford'un değişen dünyaya uyum sağlayan mimari disiplini."
        badge="Incremental Change"
        color="#ec4899"
        illustration={illu}
        features={[
          { icon: <GitBranch />, title: 'Incremental Change', desc: 'Sistemi tek seferde mükemmel yapmaya çalışmak yerine sürekli geliştirin.' },
          { icon: <ShieldAlert />, title: 'Fitness Functions', desc: 'Mimarinin sağlığını otomatik testlerle (performans, güvenlik) koruyun.' },
          { icon: <Layers />, title: 'Appropriate Coupling', desc: 'Her parçanın bağımsız değişebilmesi için bağları doğru yönetin.' }
        ]}
      />
      
      {/* Fitness Functions Detail */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
           <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 800 }}>Fitness Functions: Mimarinin Bekçileri</h2>
              <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                Unit test kodun doğru çalışıp çalışmadığını ölçerken, Fitness Function mimarinin doğru çalışıp çalışmadığını ölçer.
              </p>
           </div>
           
           <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 40px 1.5fr 40px 1fr', gap: '1rem', alignItems: 'center' }}>
                 <div className="glass-card" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
                    <div style={{ fontWeight: 800 }}>Code</div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.5 }}>Implementation</div>
                 </div>
                 <div style={{ color: '#ec4899', fontSize: '1.5rem' }}>→</div>
                 <div className="glass-card" style={{ padding: '2rem', border: '2px dashed #ec4899', background: 'rgba(236, 72, 153, 0.1)', position: 'relative' }}>
                    <div style={{ fontWeight: 900, color: '#ec4899', letterSpacing: '1px' }}>FITNESS</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>CHECKS</div>
                 </div>
                 <div style={{ color: '#ec4899', fontSize: '1.5rem' }}>→</div>
                 <div className="glass-card" style={{ padding: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                    <div style={{ fontWeight: 800, color: '#10b981' }}>Deploy</div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.8, color: '#10b981' }}>Success</div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Chaos Monkey Section */}
      <section style={{ padding: '80px 0', background: 'rgba(255,255,255,0.02)' }}>
        <div className="container">
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
              <div>
                 <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Örnek: Netflix Chaos Monkey</h2>
                 <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.1rem' }}>
                    Sistemin her zaman erişilebilir olması için geliştirilen <b>Chaos Monkey</b>, sunucuları rastgele kapatarak mimarinin dayanıklılığını (Fitness) ölçer.
                 </p>
              </div>
              <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
                 <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ fontSize: '4rem' }}>🐒💥</motion.div>
                 <div style={{ fontWeight: 800, color: '#ec4899', marginTop: '1rem' }}>Chaos Engineering</div>
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
                Architecture Philosophy
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                Zaman içinde değişimi destekleyen mimari yapılar, Fitness Functions ve kaos mühendisliği hakkında Neal Ford'un çalışmalarına göz atın.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://evolutionaryarchitecture.com/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(236, 72, 153, 0.15)', color: '#f472b6', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(236, 72, 153, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    Building Evolutionary Architectures <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};

export default EvolutionaryPage;
