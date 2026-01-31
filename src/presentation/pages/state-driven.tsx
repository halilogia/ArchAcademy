import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, Activity, Zap, Database, Boxes, Code2, Layers } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const StateDrivenPage = () => {
  const illustration = (
    <div style={{ position: 'relative', width: '400px', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Background Glow */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ position: 'absolute', width: '300px', height: '300px', background: '#22c55e', borderRadius: '50%', filter: 'blur(60px)', zIndex: 0 }} 
      />

      {/* State Node (The Brain) */}
      <motion.div
        style={{
          width: '100px',
          height: '100px',
          background: 'rgba(34, 197, 94, 0.15)',
          border: '2px solid #22c55e',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          boxShadow: '0 0 30px rgba(34, 197, 94, 0.3)',
        }}
      >
        <Database size={32} color="#22c55e" />
        <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'white', marginTop: '4px' }}>STATE</span>
      </motion.div>

      {/* Reactive Stream Lines */}
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <div key={angle} style={{ position: 'absolute', width: '100%', height: '100%', transform: `rotate(${angle}deg)`, pointerEvents: 'none' }}>
           <motion.div 
             animate={{ x: [60, 160], opacity: [0, 1, 0] }}
             transition={{ duration: 2, repeat: Infinity, delay: angle / 60 * 0.3 }}
             style={{ position: 'absolute', top: '50%', left: '50%', width: '30px', height: '2px', background: 'linear-gradient(to right, #22c55e, transparent)', borderRadius: '2px' }}
           />
        </div>
      ))}

      {/* UI Elements (Subscribers) */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        // Açıları 30 derece kaydırarak tam alt ve üst noktalardaki çakışmaları önlüyoruz
        const angle = (i * 60) + 30; 
        const rad = (angle - 90) * (Math.PI / 180);
        const r = 130; // Daha dar çap ile yazıya yer açıyoruz
        const x = r * Math.cos(rad);
        const y = r * Math.sin(rad);

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '45%', // Biraz daha yukarı çektik
              x: `calc(-50% + ${x}px)`,
              y: `calc(-50% + ${y}px)`,
              width: '50px',
              height: '50px',
              background: '#0f172a',
              border: '2px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 5,
              boxShadow: '0 10px 20px rgba(0,0,0,0.5)'
            }}
          >
            <motion.div
              animate={{ 
                color: ['rgba(34, 197, 94, 0.2)', '#22c55e', 'rgba(34, 197, 94, 0.2)'],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            >
              <Boxes size={22} />
            </motion.div>
          </motion.div>
        );
      })}

      {/* Floating Formula */}
      <motion.div 
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: '0px', // En alta çektik
          background: 'rgba(2, 6, 23, 0.95)',
          padding: '8px 24px',
          borderRadius: '100px',
          border: '1px solid #22c55e66',
          backdropFilter: 'blur(20px)',
          fontSize: '0.95rem',
          fontWeight: 900,
          color: '#22c55e',
          fontFamily: 'monospace',
          zIndex: 20,
          boxShadow: '0 0 30px rgba(34, 197, 94, 0.3)',
          letterSpacing: '1px'
        }}
      >
        UI = f(State)
      </motion.div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: '#020617', minHeight: '100vh', paddingBottom: '100px' }}>
      <ArchHero 
        title="State-Driven"
        subtitle="UI Paradigm"
        description="Arayüzün (UI), uygulamanın anlık durumunun (State) saf bir yansıması olduğu modern reaktif paradigma. Veri değişir, UI otomatik olarak 'bind' edilir."
        badge="Reactive Paradigm"
        color="#22c55e"
        illustration={illustration}
        features={[
          { icon: <Database />, title: 'Single Source', desc: 'Gerçek, DOM\'da değil State\'te saklanır. Veri tek bir merkezden yönetilir.' },
          { icon: <RefreshCcw />, title: 'Reactivity', desc: 'Veri değiştiğinde arayüz manuel müdahale olmadan otomatik olarak güncellenir.' },
          { icon: <Activity />, title: 'Predictability', desc: 'Aynı State değeri her zaman aynı görüntüyü oluşturur (Idempotency).' }
        ]}
      >
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: '12px 24px', borderRadius: '14px', border: '1px solid rgba(34, 197, 94, 0.2)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Zap size={18} color="#22c55e" />
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white' }}>Data Binding Enabled</span>
          </div>
        </div>
      </ArchHero>

      <div className="container" style={{ marginTop: '4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
          <div className="glass-card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', color: '#22c55e' }}>
              <Code2 /> Declarative vs Imperative
            </h3>
            <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
              Geleneksel (Imperative) yöntemde "Elemanı bul, içeriğini değiştir" dersiniz. <br/><br/>
              State-Driven (Declarative) yöntemde ise "State bu olduğunda arayüz böyle görünmeli" dersiniz. Aradaki fark, karmaşıklığın yönetiminde devrim yaratır.
            </p>
          </div>
          <div className="glass-card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', color: '#22c55e' }}>
              <Layers /> Virtual DOM & Reconciliation
            </h3>
            <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
              State değiştiğinde tüm UI'ı baştan yaratmak pahalıdır. React gibi kütüphaneler <strong>Virtual DOM</strong> kullanarak sadece değişen kısımları tespit eder ve update eder (Diffing).
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StateDrivenPage;
