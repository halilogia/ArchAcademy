import React from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../../../components/ArchHero';
import { 
  Share2, 
  Cpu, 
  Layers, 
  Zap, 
  Database, 
  Activity, 
  Box, 
  Code2, 
  AlertTriangle, 
  Lightbulb,
  ArrowDown,
  RefreshCcw,
  Network
} from 'lucide-react';

const ComponentStatePage = () => {
  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Central State Sphere */}
      <motion.div
        animate={{ 
          boxShadow: ['0 0 20px rgba(99, 102, 241, 0.2)', '0 0 60px rgba(99, 102, 241, 0.4)', '0 0 20px rgba(99, 102, 241, 0.2)']
        }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ 
          width: '120px', 
          height: '120px', 
          background: 'radial-gradient(circle at 30% 30%, #6366f1 0%, #4338ca 100%)', 
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2
        }}
      >
        <Database color="white" size={40} />
      </motion.div>

      {/* Orbiting Components */}
      {[0, 120, 240].map((degree, i) => (
        <motion.div
          key={i}
          animate={{ rotate: 360 }}
          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'linear' }}
          style={{ 
            position: 'absolute', 
            width: '100%', 
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{ 
            transform: `rotate(${degree}deg) translateY(-140px)`,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '12px',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)'
          }}>
            <Box size={24} color="#6366f1" />
          </div>
        </motion.div>
      ))}

      {/* Connection Lines (Pulsing) */}
      <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
        <motion.circle
          cx="50%" cy="50%" r="80"
          stroke="rgba(99, 102, 241, 0.2)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5 5"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </svg>
    </div>
  );

  return (
    <div style={{ background: 'var(--bg-dark)', minHeight: '100vh', paddingBottom: '100px' }}>
      <ArchHero 
        title="Component State"
        subtitle="State Management"
        description="Manage the data lifecycle in component-based architectures. Build the nervous system of complex interfaces, from local encapsulation to global distribution."
        badge="Data Flow Mastery"
        color="#6366f1"
        illustration={illu}
        features={[
          { icon: <RefreshCcw />, title: 'Unidirectional Flow', desc: 'Predictable and error-free state management through one-way data flow.' },
          { icon: <Layers />, title: 'Lifting State Up', desc: 'Strategy of moving data to a common ancestor for sharing between sibling components.' },
          { icon: <Network />, title: 'Prop Drilling Mitigation', desc: 'Passing data through deep hierarchies with Context API and global store structures.' }
        ]}
      />

      {/* --- PHILLOSOPHY SECTION --- */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: