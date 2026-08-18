import React from 'react';
import { motion } from 'framer-motion';
import { Target, Workflow, Sparkles, Brain, ShieldAlert, Layers, Network, Zap, Cpu, Activity, LayoutTemplate, Eye } from 'lucide-react';
import ArchHero from '../../../components/ArchHero';

const IntentArchitecturePage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: '#020617', minHeight: '100vh', color: 'white' }}>
      <ArchHero 
        title="Intent"
        subtitle="Architecture (IOA)"
        description="2050 Vision: Software is not a construction, but a living organism shaped by intents through the AI-Organizer."
        badge="AI-Organizer Era"
        color="#06b6d4"
        illustration={
          <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* AI-Organizer Core */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 0],
                boxShadow: ['0 0 20px #06b6d433', '0 0 50px #06b6d466', '0 0 20px #06b6d433']
              }}
              transition={{ duration: 8, repeat: Infinity }}
              style={{ position: 'absolute', width: '120px', height: '120px', borderRadius: '30%', border: '4px solid #06b6d4', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(6, 182, 212, 0.1)' }}
            >
               <Brain size={60} color="#06b6d4" />
            </motion.div>

            {/* Pulsing Visual Map Dots */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                   opacity: [0.1, 1, 0.1],
                   scale: [0.5, 1.5, 0.5],
                   x: Math.cos(i * 30 * Math.PI / 180) * 140,
                   y: Math.sin(i * 30 * Math.PI / 180) * 140
                }}
                transition={{ duration: 4, delay: i * 0.3, repeat: Infinity }}
                style={{ position: 'absolute', width: '8px', height: '8px', borderRadius: '50%', background: '#06b6d4' }}
              />
            ))}
            
            {/* Connecting Lines (Simulated Neural Map) */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.2 }}>
               <circle cx="175" cy="175" r="140" fill="none" stroke="#06b6d4" strokeWidth="1" strokeDasharray="5,5" />
               <circle cx="175" cy="175" r="90" fill="none" stroke="#06b6d4" strokeWidth="0.5" />
            </svg>
          </div>
        }
        features={[
          { icon: <LayoutTemplate />, title: 'AI-Organizer', desc: 'AI synthesizes the architecture map by purpose, not by humans.' },
          { icon: <Eye />, title: 'Living Blueprint', desc: 'No static documents; a visual nervous system that shifts in every moment.' },
          { icon: <Target />, title: 'Teleology-First', desc: 'Focus solely on the goal (Intent); structure emerges on its own.' }
        ]}
      />

      <section style={{ padding: '80px 0' }}>
        <div className="container">
          
          {/* Evolution Timeline Card */}
          <div className="glass-card" style={{ padding: '4rem', marginBottom: '6rem', position: 'relative', overflow: 'hidden' }}>
             <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(to right, #06b6d4, transparent)' }} />
             <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '3rem' }}>The Evolution of Intent</h2>
             
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }}>
                <div style={{ padding: '1rem' }}>
                   <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#06b6d4', marginBottom: '1rem', letterSpacing: '1px' }}>2010 - 2020 ERA</div>
                   <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Manual Construction</h4>
                   <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>Developers hand-laid every pipe (Imports, Repos, DTOs) with built-in margin for error.</p>
                </div>
                <div style={{ padding: '1rem' }}>
                   <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#06b6d4', marginBottom: '1rem', letterSpacing: '1px' }}>2024 - B0RE (PRESENT)</div>
                   <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Architecture Automation</h4>
                   <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>Tools like <strong>Intent Architect</strong> automated deterministic code by referencing human-designed models.</p>
                </div>
                <div style={{ padding: '1rem' }}>
                   <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#06b6d4', marginBottom: '1rem', letterSpacing: '1px' }}>2050 - GENESIS ERA</div>
                   <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>AI-Organizer (IOA)</h4>
                   <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>DESIGNER REMOVED FROM THE LOOP. AI synthesizes the ideal architectural organization instantly from pure intent.</p>
                </div>
             </div>
          </div>

          {/* AI-Organizer Workflow */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '5rem', alignItems: 'center', marginBottom: '8rem' }}>
             <div>
                <h2 style={{ fontSize: '2.8rem', fontWeight: 900, marginBottom: '2rem' }}>How Does AI-Organizer Work?</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                   <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'start' }}>
                      <Brain color="#06b6d4" size={32} style={{ flexShrink: 0 }} />
                      <div>
                         <h5 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Semantic Radar</h5>
                         <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Continuously scans every 'capability' (Skills) and 'part' (Atoms) in the system to build a semantic library.</p>
                      </div>
                   </div>
                   <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'start' }}>
                      <Zap color="#06b6d4" size={32} style={{ flexShrink: 0 }} />
                      <div>
                         <h5 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Ad-hoc Schema Synthesis</h5>
                         <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Instead of a fixed file structure for the given intent, computes the most efficient connection map (Neural Map) at that moment.</p>
                      </div>
                   </div>
                   <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'start' }}>
                      <ShieldAlert color="#06b6d4" size={32} style={{ flexShrink: 0 }} />
                      <div>
                         <h5 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Ontological Proof</h5>
                         <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Mathematically proves whether the synthesized structure satisfies all the constraints of the intent.</p>
                      </div>
                   </div>
                </div>
             </div>
             
             <div className="glass-card" style={{ padding: '3rem', background: 'rgba(0,0,0,0.5)', textAlign: 'center' }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  style={{ width: '200px', height: '200px', border: '2px solid rgba(6, 182, 212, 0.2)', borderRadius: '50%', margin: '0 auto', position: 'relative' }}
                >
                   <motion.div 
                     animate={{ scale: [1, 1.3, 1] }} 
                     transition={{ duration: 2, repeat: Infinity }}
                     style={{ position: 'absolute', top: '-10px', left: '50%', marginLeft: '-10px', width: '20px', height: '20px', background: '#06b6d4', borderRadius: '50%', boxShadow: '0 0 15px #06b6d4' }} 
                   />
                   <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.8rem', opacity: 0.5 }}>
                      SYNTHESIS<br/>CORE
                   </div