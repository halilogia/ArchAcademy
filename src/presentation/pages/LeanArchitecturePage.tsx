import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, Scissors, ShieldCheck, Layers, Sparkles } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const LeanArchitecturePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}
    >
      <ArchHero 
        title="Lean"
        subtitle="Philosophy"
        description="Gereksiz her şeyi çöpe atın. Odağınızı sadece 'Değer Üreten' (Value-Adding) işlere verin ve mimari israfı (Waste) engelleyin."
        badge="Agile & Efficient Design"
        color="#84cc16"
        illustration={
          <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              style={{ position: 'absolute', width: '100%', height: '100%', border: '1px solid rgba(132, 204, 22, 0.1)', borderRadius: '50%' }}
            />
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ background: 'rgba(132, 204, 22, 0.1)', padding: '2.5rem', borderRadius: '50%', border: '2px solid #84cc16', boxShadow: '0 0 40px rgba(132, 204, 22, 0.2)' }}
            >
              <Target size={80} color="#84cc16" />
            </motion.div>
            <motion.div
               animate={{ x: [0, 20, 0] }}
               transition={{ duration: 5, repeat: Infinity }}
               style={{ position: 'absolute', top: 40, left: 20, color: '#84cc16', opacity: 0.6 }}
            >
               <Zap size={24} />
            </motion.div>
          </div>
        }
        features={[
          { icon: <Target />, title: 'Eliminate Waste', desc: 'Sadece müşteriye değer katan kodları yazın, gereksiz katmanlardan kaçının.' },
          { icon: <Zap />, title: 'Fast Delivery', desc: 'Mimari bürokrasiyi azaltın, çalışan kodu en kısa sürede yayına alın.' },
          { icon: <Scissors />, title: 'Delayed Decisions', desc: 'Veritabanı veya framework seçimini, en iyi bilgiye sahip olduğunuz ana kadar erteleyin.' }
        ]}
      />

      <section style={{ padding: '100px 0', background: 'rgba(132, 204, 22, 0.02)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800 }}>Lean Philosophy Prensipleri</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '1rem auto' }}>
              İsrafı önleyen ve verimliliği artıran 3 temel felsefi kural.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            <div className="glass-card" style={{ padding: '3rem', borderTop: '4px solid #84cc16' }}>
              <div style={{ color: '#84cc16', marginBottom: '1.5rem' }}><Layers size={40} /></div>
              <h3 style={{ marginBottom: '1rem' }}>Sadece Gerektiği Kadar</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                Gelecekte lazım olur diye kod yazmayın (YAGNI). Karmaşıklığı sadece bugünkü problemleri çözmek için ekleyin.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '3rem', borderTop: '4px solid #84cc16' }}>
              <div style={{ color: '#84cc16', marginBottom: '1.5rem' }}><ShieldCheck size={40} /></div>
              <h3 style={{ marginBottom: '1rem' }}>Bütünsel Bakış</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                Sadece bir katmanı değil, tüm sistemin akışını iyileştirin. Lokal optimizasyonlar bazen global maliyeti artırabilir.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '3rem', borderTop: '4px solid #84cc16' }}>
              <div style={{ color: '#84cc16', marginBottom: '1.5rem' }}><Sparkles size={40} /></div>
              <h3 style={{ marginBottom: '1rem' }}>Öğrenmeyi Hızlandır</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                Kısa döngülerle koda şekil verin. Büyük mimari tasarımlar yerine, geri bildirimle evrilen yalın yapılar kurun.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 0', textAlign: 'center' }}>
        <div className="container">
          <div className="glass-card" style={{ display: 'inline-block', padding: '4rem', maxWidth: '900px', border: '1px solid rgba(132, 204, 22, 0.2)' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#84cc16' }}>Lean + Clean Sinerjisi</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.8 }}>
              Clean Architecture'ın **sürdürülebilirliğini** alın, Lean Architecture'ın **hızı ve hafifliği** ile birleştirin. 
              Gereksiz katmanlarda boğulmayan ama her zaman değişime hazır, esnek ve "Senior" bir yapı kurmanın yolu budur.
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default LeanArchitecturePage;
