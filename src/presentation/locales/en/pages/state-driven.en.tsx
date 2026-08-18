import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, Activity, Zap, Database, Boxes, Code2, Layers } from 'lucide-react';
import ArchHero from '../../../components/ArchHero';

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
        // Shift angles by 30 degrees to avoid overlaps at exact bottom and top points
        const angle = (i * 60) + 30; 
        const rad = (angle - 90) * (Math.PI / 180);
        const r = 130; // Narrower radius leaves room for text
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
              top: '45%', // Pulled up slightly
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
          bottom: '0px', // Pulled to bottom
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
        description="Modern reactive paradigm where the interface (UI) is a pure reflection of the application's current state. Data changes and the UI automatically binds to it."
        badge="Reactive Paradigm"
        color="#22c55e"
        illustration={illustration}
        features={[
          { icon: <Database />, title: 'Single Source', desc: 'The source of truth is stored in State, not the DOM. Data is managed from a single source.' },
          { icon: <RefreshCcw />, title: 'Reactivity', desc: 'When data changes, the interface updates automatically without manual intervention.' },
          { icon: <Activity />, title: 'Predictability', desc: 'The same State value always produces the same view (Idempotency).' }
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
              In the traditional (Imperative) approach you say "Find the element, change its content." <br/><br/>
              In the State-Driven (Declarative) approach you say "When State is this, the interface should look like this." The difference revolutionizes complexity management.
            </p>
          </div>
          <div className="glass-card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', color: '#22c55e' }}>
              <Layers /> Virtual DOM & Reconciliation
            </h3>
            <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
              Recreating the entire UI when State changes is expensive. Libraries like React use the <strong>Virtual DOM</strong> to detect and update only the changed parts (Diffing).
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StateDrivenPage;