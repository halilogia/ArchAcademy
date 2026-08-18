import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Zap, Cpu, Server, Layers, ArrowDownUp, RefreshCcw, Box, HardDrive, Activity } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const SpaceBasedPage = () => {
    const [activeTab, setActiveTab] = useState<'simulation' | 'comparison'>('comparison');
    const [requests, setRequests] = useState<number>(0);
    const [partitions, setPartitions] = useState([
        { id: 1, load: 0, range: 'A-M', color: '#eab308' },
        { id: 2, load: 0, range: 'N-Z', color: '#f59e0b' }
    ]);
    const [dbLoad, setDbLoad] = useState(0);

    const handleLoad = () => {
        setRequests(prev => prev + 10);
        
        // Load balancing via partitioning
        // Space Based Architecture handles load in RAM (Processing Units), hardly touching DB asynchronously
        setPartitions(prev => prev.map(p => ({
            ...p,
            load: Math.min(100, p.load + Math.floor(Math.random() * 20))
        })));

        // DB Load stays low because sync is async/write-behind
        setDbLoad(prev => Math.min(100, prev + 5)); 
    };

    // Auto-decrease load to simulate processing
    useEffect(() => {
        const interval = setInterval(() => {
            setPartitions(prev => prev.map(p => ({ ...p, load: Math.max(0, p.load - 10) })));
            setDbLoad(prev => Math.max(0, prev - 5));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Background Grid */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.1, backgroundImage: 'linear-gradient(#eab308 1px, transparent 1px), linear-gradient(90deg, #eab308 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      {/* Processing Units (Nodes) */}
      {[0, 1].map((i) => (
        <motion.div
           key={i}
           animate={{ y: [0, -10, 0] }}
           transition={{ duration: 3, repeat: Infinity, delay: i * 1.5, ease: "easeInOut" }}
           style={{
               position: 'absolute',
               left: i === 0 ? '40px' : 'auto',
               right: i === 1 ? '40px' : 'auto',
               width: '100px',
               height: '120px',
               background: 'var(--glass)',
               border: '2px solid #eab308',
               borderRadius: '16px',
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               padding: '10px',
               boxShadow: '0 10px 40px rgba(234, 179, 8, 0.2)'
           }}
        >
            <div style={{ fontSize: '0.6rem', color: '#eab308', marginBottom: '5px', fontWeight: 800 }}>PU - {i+1}</div>
            
            {/* Logic Layer */}
            <div style={{ width: '80%', height: '30px', background: 'rgba(234, 179, 8, 0.2)', borderRadius: '6px', marginBottom: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Cpu size={14} color="#fde047" />
            </div>
            
            {/* RAM Grid */}
            <div style={{ width: '80%', height: '50px', border: '1px dashed #eab308', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <Database size={20} color="#eab308" />
            </div>
        </motion.div>
      ))}

      {/* Async DB Sync Line */}
      <div style={{ position: 'absolute', bottom: '20px', width: '200px', height: '2px', background: 'linear-gradient(90deg, transparent, #eab308, transparent)', opacity: 0.5 }} />
      <div style={{ position: 'absolute', bottom: '-20px', fontSize: '0.7rem', color: '#71717a' }}>Async Persistency</div>

    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="Space-Based"
        subtitle="Architecture"
        description="Designed to eliminate the database bottleneck. Application and Data live in the same place (RAM). Processes hundreds of thousands of transactions in milliseconds using 'Tuple Space' logic."
        badge="High Performance Profile"
        color="#eab308"
        illustration={illu}
        features={[
          { icon: <Cpu />, title: 'Processing Unit (PU)', desc: 'Business logic (Logic) and Data scale together as a single unit.' },
          { icon: <Database />, title: 'In-Memory Grid', desc: 'Data isn\'t on disk; it lives in RAM across hundreds of servers.' },
          { icon: <RefreshCcw />, title: 'Write-Behind', desc: 'Database writes happen asynchronously, never blocking the user.' }
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
            { id: 'comparison', label: 'DB Centric vs Space', icon: <Layers size={18} /> },
            { id: 'simulation', label: 'Load Grid Demo', icon: <Activity size={18} /> }
          ].map((tab) => (
             <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 24px',
                borderRadius: '18px',
                border: 'none