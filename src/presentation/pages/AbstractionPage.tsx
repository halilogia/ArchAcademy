import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Box, Cpu, HardDrive, Network, GitPullRequest } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const AbstractionPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}
    >
      <ArchHero 
        title="Abstraction"
        subtitle="& Specification"
        description="Kodun alt seviye detayları ile üst seviye mantığını birbirinden ayırın. Doğru soyutlama düzeyi, sürdürülebilirliğin anahtarıdır."
        badge="Moderate Abstraction"
        color="#a855f7"
        illustration={
          <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.3 }}
                style={{ height: '70px', background: i === 1 ? '#a855f7' : 'var(--glass)', border: '1px solid #a855f733', borderRadius: '15px', display: 'flex', alignItems: 'center', padding: '0 20px', gap: '15px' }}
              >
                <div style={{ color: i === 1 ? 'white' : '#a855f7' }}>{i === 0 ? <Cpu size={24} /> : i === 1 ? <Layers size={24} /> : <Box size={24} />}</div>
                <div style={{ height: '8px', width: '100px', background: i === 1 ? 'rgba(255,255,255,0.3)' : 'rgba(168, 85, 247, 0.1)', borderRadius: '4px' }} />
              </motion.div>
            ))}
          </div>
        }
        features={[
          { icon: <Layers />, title: 'High Level Simplicity', desc: 'İş mantığını, teknik detaylardan (SQL, API, Libs) temizleyin ve sadeleştirin.' },
          { icon: <GitPullRequest />, title: 'Inversion of Control', desc: 'Sistemin parçalarını birbirine değil, soyut arayüzlere (Interfaces) bağlayın.' },
          { icon: <Box />, title: 'Standardization', desc: 'Değişkenliği azaltmak için ortak tip ve spesifikasyonlar (Specs) kullanın.' }
        ]}
      />

      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800 }}>Dengeli Soyutlama</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Ne çok sığ, ne de gereksiz derinlikte bir mimari.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            <div className="glass-card" style={{ padding: '3rem' }}>
              <div style={{ color: '#a855f7', marginBottom: '1.5rem' }}><Layers size={40} /></div>
              <h3 style={{ marginBottom: '1rem' }}>Moderate Abstraction</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                Her şeyi soyutlamaya çalışmayın (Over-engineering). Sadece değişmesi muhtemel ve karmaşık detayları saklayın.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '3rem' }}>
              <div style={{ color: '#a855f7', marginBottom: '1.5rem' }}><Network size={40} /></div>
              <h3 style={{ marginBottom: '1rem' }}>Global Dependencies</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                Global değişkenlerden ve yan etkilerden (Side Effects) kaçının. Her şeyi bir "Kara Kutu" (Black Box) olarak tasarlayın.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '3rem' }}>
              <div style={{ color: '#a855f7', marginBottom: '1.5rem' }}><HardDrive size={40} /></div>
              <h3 style={{ marginBottom: '1rem' }}>Code Specification</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                Ekipler arası tutarlılık için belirli standartlar (Style Guides) ve ortak desenler belirleyin. Kod bir bütün gibi okunmalıdır.
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AbstractionPage;
