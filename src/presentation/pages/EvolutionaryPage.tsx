import React from 'react';
import { motion } from 'framer-motion';
import { GitBranch, ShieldAlert, RefreshCw, Layers, Zap } from 'lucide-react';
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)' }}>
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
           
           <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', alignItems: 'center' }}>
                 <div className="glass-card" style={{ padding: '1rem' }}>Code</div>
                 <div style={{ color: '#ec4899' }}>→</div>
                 <div className="glass-card" style={{ padding: '1.5rem', border: '2px dashed #ec4899', background: 'rgba(236, 72, 153, 0.1)' }}>
                    <div style={{ fontWeight: 800, color: '#ec4899' }}>FITNESS</div>
                    <div style={{ fontSize: '0.7rem' }}>CHECKS</div>
                 </div>
                 <div style={{ color: '#ec4899' }}>→</div>
                 <div className="glass-card" style={{ padding: '1rem', background: '#10b98122' }}>Deploy</div>
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
    </motion.div>
  );
};

export default EvolutionaryPage;
