FILE: primary-secondary.tsx
CONTENT:
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { 
  Database, 
  GitMerge, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Server,
  RefreshCw,
  AlertTriangle,
  HardDrive
} from 'lucide-react';

const PrimarySecondaryPage = () => {
    const [activeTab, setActiveTab] = useState<'simulation' | 'comparison'>('comparison');
    const [replicationStatus, setReplicationStatus] = useState<'IDLE' | 'SYNCING' | 'SYNCED'>('IDLE');
    const [primaryData, setPrimaryData] = useState<string[]>([]);
    const [secondary1Data, setSecondary1Data] = useState<string[]>([]);
    const [secondary2Data, setSecondary2Data] = useState<string[]>([]);

    const writeData = () => {
        const newData = `Block #${primaryData.length + 1}`;
        setPrimaryData(prev => [...prev, newData]);
        setReplicationStatus('SYNCING');

        // Simulate Replication Lag
        setTimeout(() => {
            setSecondary1Data(prev => [...prev, newData]);
        }, 1500); // 1.5s lag for Secondary 1

        setTimeout(() => {
            setSecondary2Data(prev => [...prev, newData]);
            setReplicationStatus('SYNCED');
        }, 3000); // 3s lag for Secondary 2
    };

  const illu = (
    <div style={{ position: 'relative', width: '380px', height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Primary Node */}
      <motion.div
        animate={{ 
            boxShadow: replicationStatus === 'SYNCING' 
                ? ['0 0 20px #eab308', '0 0 50px #eab308', '0 0 20px #eab308'] 
                : '0 0 20px rgba(234, 179, 8, 0.2)' 
        }}
        transition={{ duration: 1, repeat: replicationStatus === 'SYNCING' ? Infinity : 0 }}
        style={{ width: '120px', height: '100px', background: 'var(--glass)', border: '3px solid #eab308', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, marginBottom: '40px' }}
      >
        <Database size={40} color="#eab308" />
        <span style={{ fontSize: '0.8rem', fontWeight: 900, marginTop: '5px' }}>PRIMARY</span>
        <span style={{ fontSize: '0.6rem', color: '#eab308', opacity: 0.8 }}>Read / Write</span>
      </motion.div>

      {/* Connection Lines with Data Packets */}
      <div style={{ position: 'relative', width: '300px', height: '40px', display: 'flex', justifyContent: 'center' }}>
         <svg style={{ position: 'absolute', top: -20, width: '100%', height: '100px', overflow: 'visible' }}>
             {/* Line to Secondary 1 */}
             <path d="M 150 0 L 80 100" stroke="#eab308" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" fill="none" />
             {/* Line to Secondary 2 */}
             <path d="M 150 0 L 220 100" stroke="#eab308" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" fill="none" />
         </svg>
         
         {/* Packet to S1 */}
         {replicationStatus === 'SYNCING' && (
             <motion.div 
                initial={{ x: 0, y: -20, opacity: 1 }}
                animate={{ x: -70, y: 80, opacity: 0 }}
                transition={{ duration: 1.5, ease: "linear" }}
                style={{ position: 'absolute', width: '12px', height: '12px', background: '#eab308', borderRadius: '50%' }}
             />
         )}
         {/* Packet to S2 */}
          {replicationStatus === 'SYNCING' && (
             <motion.div 
                initial={{ x: 0, y: -20, opacity: 1 }}
                animate={{ x: 70, y: 80, opacity: 0 }}
                transition={{ duration: 3, ease: "linear" }}
                style={{ position: 'absolute', width: '12px', height: '12px', background: '#eab308', borderRadius: '50%' }}
             />
         )}
      </div>

      {/* Secondary Nodes */}
      <div style={{ display: 'flex', gap: '30px', marginTop: '40px' }}>
          {[1, 2].map((i) => (
            <motion.div
                key={i}
                style={{ width: '100px', height: '90px', background: 'var(--glass)', border: '2px solid rgba(234, 179, 8, 0.4)', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.8 }}
            >
                <div style={{ position: 'relative' }}>
                    <Database size={28} color="#fde047" />
                    <div style={{ position: 'absolute', bottom: -5, right: -5, background: '#eab308', borderRadius: '50%', padding: '2px' }}>
                        <ArrowRight size={10} color="black" />
                    </div>
                </div>
                <span style={{ fontSize: '0.65rem', fontWeight: 800, marginTop: '5px' }}>SECONDARY {i}</span>
                <span style={{ fontSize: '0.55rem', opacity: 0.6 }}>Read Only</span>
            </motion.div>
          ))}
      </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="Primary-Secondary"
        subtitle="Master-Slave Replication"
        description="The most popular scaling strategy in the database world. Use a single primary for writes, and an army of secondaries for reads."
        badge="Scalability Pattern"
        color="#eab308"
        illustration={illu}
        features={[
          { icon: <Zap />, title: 'Write to Primary', desc: 'All INSERT/UPDATE/DELETE operations go only to the Primary node.' },
          { icon: <Database />, title: 'Read from Secondaries', desc: 'SELECT operations are distributed to Secondary nodes to lighten the load.' },
          { icon: <ShieldCheck />, title: 'Failover', desc: 'If Primary dies, one of the Secondaries is crowned king.' }
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
            { id: 'comparison', label: 'Single vs Replica', icon: <Server size={18} /> },
            { id: 'simulation', label: 'Replication Lag Demo', icon: <RefreshCw size={18} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 24px',
                borderRadius: '18px',
                border: 'none',
                background: activeTab === tab.id ? '#eab308' : 'transparent',
                color: activeTab === tab.id ? 'black' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(234, 179, 8, 0.3)' : 'none'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </ArchHero>

      <div className="container" style={{ marginTop: '2rem' }}>
        <An