import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { useProgress } from '../context/ProgressContext';
import { 
  Triangle, 
  Activity, 
  CheckCircle2, 
  Search, 
  Server, 
  Scissors, 
  Wifi, 
  WifiOff,
  Database,
  Ban,
  AlertTriangle
} from 'lucide-react';

const CAPTheoremPage = () => {
  const { completeStep } = useProgress();
  const [activeTab, setActiveTab] = useState<'simulation' | 'concept'>('concept');
  const [activeMode, setActiveMode] = useState<'CP' | 'AP'>('CP');
  const [isPartitioned, setIsPartitioned] = useState(false);
  
  // Data State
  const [nodeAData, setNodeAData] = useState(100);
  const [nodeBData, setNodeBData] = useState(100);
  const [writeStatus, setWriteStatus] = useState<'idle' | 'writing' | 'syncing' | 'failed' | 'success'>('idle');

  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/cap-theorem');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleWrite = (newNodeData: number) => {
      setWriteStatus('writing');
      
      // Always write to A (Master/Primary in this simplified view)
      setTimeout(() => {
          setNodeAData(newNodeData);
          
          if (!isPartitioned) {
              setWriteStatus('syncing');
              setTimeout(() => {
                  setNodeBData(newNodeData);
                  setWriteStatus('success');
              }, 1000);
          } else {
              // PARTITIONED SCENARIO
              if (activeMode === 'CP') {
                  // CP: If we can't sync, we might fail the whole write OR fail the read on B.
                  // For this demo: We'll say Node B goes DOWN/ReadOnly to preserve consistency.
                  // Or we fail the write if it requires quorum.
                  // Let's implement Quorum write failure for CP.
                  setWriteStatus('failed'); // We assume we need ack from B
                  setNodeAData(100); // Revert A
              } else {
                  // AP: Write succeeds on A, but B is stale.
                  setWriteStatus('success');
              }
          }
      }, 800);
  };

  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
       {/* Triangle Path */}
       <svg width="300" height="300" viewBox="0 0 300 300" style={{ position: 'absolute', top: 0, left: 25 }}>
           <motion.path 
             d="M150 50 L250 220 L50 220 Z" 
             fill="none" 
             stroke="#3b82f6" 
             strokeWidth="2"
             strokeDasharray="10 10"
             animate={{ strokeDashoffset: [0, 100] }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           />
       </svg>

       {/* Vertices */}
       <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: 'absolute', top: 20, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
           <div style={{ width: '60px', height: '60px', background: '#020617', border: '2px solid #3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }}>
               <CheckCircle2 color="#3b82f6" />
           </div>
           <span style={{ marginTop: '5px', fontSize: '0.8rem', fontWeight: 'bold', color: '#fff' }}>Consistency</span>
       </motion.div>

       <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} style={{ position: 'absolute', bottom: 40, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
           <div style={{ width: '60px', height: '60px', background: '#020617', border: '2px solid #3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }}>
               <Activity color="#3b82f6" />
           </div>
           <span style={{ marginTop: '5px', fontSize: '0.8rem', fontWeight: 'bold', color: '#fff' }}>Availability</span>
       </motion.div>

       <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1.2 }} style={{ position: 'absolute', bottom: 40, left: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
           <div style={{ width: '60px', height: '60px', background: '#020617', border: '2px solid #3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }}>
               <Search color="#3b82f6" />
           </div>
           <span style={{ marginTop: '5px', fontSize: '0.8rem', fontWeight: 'bold', color: '#fff' }}>Partition Tol.</span>
       </motion.div>

        {/* Selected Mode Indicator */}
        <div style={{ position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: 'rgba(255,255,255,0.1)' }}>CAP</div>
        </div>

    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="CAP"
        subtitle="Theorem"
        description="In a distributed system, you can choose only 2 of 3 properties: Consistency, Availability, and Partition Tolerance. You cannot have all three at once."
        badge="Brewer's Theorem"
        color="#3b82f6"
        illustration={illu}
        features={[
          { icon: <CheckCircle2 />, title: "Consistency", desc: "All nodes see the same data at the same time." },
          { icon: <Activity />, title: "Availability", desc: "Every request gets a response without error." },
          { icon: <WifiOff />, title: "Partition Tolerance", desc: "System keeps working even if network breaks." }
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
            { id: 'concept', label: 'Theory', icon: <Triangle size={18} /> },
            { id: 'simulation', label: 'Network Sim', icon: <Server size={18} /> }
          ].map((tab) => (
             <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 24px',
                borderRadius: '18px',
                border: 'none',
                background: activeTab === tab.id ? '#3b82f6' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </ArchHero>

      <div className="container" style={{ marginTop: '2rem' }}>
          <AnimatePresence mode="wait">
             {activeTab === 'concept' && (
                 <motion.div key="concept" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                     <div>
                         <h3 style={{ fontSize: '2rem', color: '#3b82f6', marginBottom: '1.5rem'}}>Rule of 2 out of 3</h3>
                         <p style={{ lineHeight: 1.6, color: '#c0cbed'}}>
                             In modern distributed systems, Partition Tolerance (network partition) is inevitable. Cables break, routers fail. So the actual choice is between <strong>CP</strong> and <strong>AP</strong>.
                         </p>
                         <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                             <div className="glass-card" style={{ borderLeft: '4px solid #3b82f6', padding: '15px' }}>
                                 <strong style={{ color: '#fff', fontSize: '1.1rem' }}>CP (Consistency + Partition Tolerance)</strong>
                                 <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: '5px 0' }}>
                                     If network partitions, it <strong>stops serving</strong> or rejects the request to avoid inconsistent data. <br/>
                                     <em style={{color: '#60a5fa'}}>Ex: Banking transactions (balance cannot be inconsistent).</em>
                                 </p>
                             </div>
                             <div className="glass-card" style={{ borderLeft: '4px solid #eab308', padding: '15px' }}>
                                 <strong style={{ color: '#fff', fontSize: '1.1rem' }}>AP (Availability + Partition Tolerance)</strong>
                                 <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: '5px 0' }}>
                                     If network partitions, it <strong>keeps responding</strong> even with stale data. Syncs after recovery (Eventual Consistency). <br/>
                                     <em style={{color: '#facc15'}}>Ex: Social media (a like arriving 5s late is fine).</em>
                                 </p>
                             </div>
                         </div>
                     </div>
                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         <div style={{ width: '100%', padding: '30px', background: 'rgba(59, 130, 246, 0.1)', borderRadius