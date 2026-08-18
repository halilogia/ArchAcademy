import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { 
  History, 
  Save, 
  RotateCcw, 
  Database, 
  FileClock, 
  GitCommitHorizontal,
  ArrowDown,
  Play,
  ListVideo,
  SearchCheck,
  PackagePlus,
  PackageMinus,
  ShoppingCart
} from 'lucide-react';

const EventSourcingPage = () => {
    const [activeTab, setActiveTab] = useState<'simulation' | 'comparison'>('comparison');
    const [events, setEvents] = useState([
        { id: 1, type: 'CartCreated', data: '{ userId: 1 }', time: '10:00:01' },
    ]);
    const [currentState, setCurrentState] = useState({ items: 0, total: 0 });

    const addEvent = (type: string, price: number) => {
        const newEvent = { 
            id: events.length + 1, 
            type, 
            data: type === 'ItemAdded' ? `{ price: $${price} }` : `{ price: $${price} }`, 
            time: new Date().toLocaleTimeString() 
        };
        setEvents([...events, newEvent]);

        // Replay logic (projection) - In real world this happens on read side
        if (type === 'ItemAdded') {
            setCurrentState(prev => ({ items: prev.items + 1, total: prev.total + price }));
        } else if (type === 'ItemRemoved') {
            setCurrentState(prev => ({ items: Math.max(0, prev.items - 1), total: Math.max(0, prev.total - price) }));
        }
    };

    const replayEvents = () => {
        setCurrentState({ items: 0, total: 0 });
        let tempState = { items: 0, total: 0 };
        
        events.forEach((ev, i) => {
            setTimeout(() => {
                if (ev.type === 'ItemAdded') {
                   const price = parseInt(ev.data.match(/\d+/)?.[0] || '0');
                   tempState.items += 1;
                   tempState.total += price;
                } else if (ev.type === 'ItemRemoved') {
                    const price = parseInt(ev.data.match(/\d+/)?.[0] || '0');
                    tempState.items -= 1;
                    tempState.total -= price;
                } else if (ev.type === 'CartCreated') {
                    // init
                }
                setCurrentState({ ...tempState });
            }, (i + 1) * 800);
        });
    };

  const illu = (
    <div style={{ position: 'relative', width: '380px', height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Event Stream (The Log) */}
      <div style={{ width: '100%', height: '220px', position: 'relative', overflow: 'hidden', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '20px', border: '1px solid rgba(99, 102, 241, 0.2)', padding: '35px 15px 15px 15px' }}>
        <div style={{ position: 'absolute', top: '12px', left: '15px', fontSize: '0.65rem', fontWeight: 900, color: '#818cf8', opacity: 0.9, letterSpacing: '1px' }}>APPEND-ONLY LOG</div>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 1, duration: 0.5 }}
            style={{
              width: '90%',
              height: '45px',
              background: 'var(--glass)',
              border: '1.5px solid #6366f1',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              padding: '0 15px',
              marginBottom: '10px',
              boxShadow: '0 5px 15px rgba(99, 102, 241, 0.1)'
            }}
          >
            <GitCommitHorizontal size={18} color="#6366f1" style={{ marginRight: '10px' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'white' }}>EVENT #{1024 + i}</span>
              <span style={{ fontSize: '0.55rem', opacity: 0.6 }}>LOGGED AT {new Date().toLocaleTimeString()}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Projection Line */}
      <div style={{ height: '40px', width: '2px', background: 'linear-gradient(to bottom, #6366f1, transparent)', position: 'relative' }}>
         <motion.div 
           animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
           style={{ position: 'absolute', width: '8px', height: '8px', background: '#6366f1', borderRadius: '50%', left: '-3px', boxShadow: '0 0 10px #6366f1' }}
         />
      </div>

      {/* Reconstructed State */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: '180px', height: '80px', background: 'var(--glass)', border: '2px solid #6366f1', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', position: 'relative' }}
      >
        <div style={{ position: 'absolute', top: '-25px', fontSize: '0.65rem', fontWeight: 900, color: '#818cf8' }}>PROJECTED STATE</div>
        <Save size={32} color="#6366f1" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: '8px', width: '60px', background: '#6366f1', borderRadius: '4px', marginBottom: '6px', opacity: 0.8 }} />
          <div style={{ height: '8px', width: '40px', background: '#818cf8', borderRadius: '4px', opacity: 0.5 }} />
        </div>
      </motion.div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="Event Sourcing"
        subtitle="The Source of Truth"
        description="The art of storing not the latest state of data in the database, but the history of all events that caused it to reach that state. Works like a ledger."
        badge="Audit & Replay"
        color="#6366f1"
        illustration={illu}
        features={[
          { icon: <History />, title: 'Time Travel', desc: 'You can ask the system: "What was the state last Tuesday at 2:00 PM?"' },
          { icon: <FileClock />, title: 'Audit Log', desc: 'Records are never deleted or updated (Immutable), only appended.' },
          { icon: <RotateCcw />, title: 'Replay', desc: 'When a bug occurs, you can replay all events to analyze the error.' }
        ]}
      >
        <div style={{ 
          marginTop: '2rem',
          padding: '6px', 
          background: 'rgba(15, 23, 42, 0.4)', 
          borderRadius: '24px', 
          border: '1px solid rgba(255,255,255,0.05)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          backdropFilter: 'blur(10px)'
        }}>
          {[
            { id: 'comparison', label: 'CRUD vs Event Sourcing', icon: <Database size={18} /> },
            { id: 'simulation', label: 'Live Simulation', icon: <Play size={18} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 24px',
                borderRadius: '18px',
                border: 'none',
                background: activeTab === tab.id ? '#6366f1' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </ArchHero>

      <div className="container" style={{ marginTop: '2rem' }}>
        <AnimatePresence mode="wait">
            {activeTab === 'comparison' && (
                <motion.div
                    key="comparison"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                        <div className="glass-card" style={{ borderTop: '4px solid #64748b' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '10