import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../../../components/ArchHero';
import { 
  Filter, 
  ArrowRight, 
  Activity, 
  GitCommit, 
  Binary, 
  FileText, 
  CheckCircle,
  Play,
  Layers
} from 'lucide-react';

interface DataPacket {
    id: number;
    content: string;
    stage: 'raw' | 'parsed' | 'validated' | 'encrypted';
}

const PipeFilterPage = () => {
    const [activeTab, setActiveTab] = useState<'simulation' | 'concept'>('concept');
    const [pipelineActive, setPipelineActive] = useState(false);
    const [processedPackets, setProcessedPackets] = useState<DataPacket[]>([]);
    
    // Stages of the pipeline
    const stages = [
        { id: 'raw', label: 'Raw Input', color: '#94a3b8', icon: <FileText size={16} /> },
        { id: 'parser', label: 'Filter: UpperCase', color: '#ec4899', icon: <Binary size={16} /> },
        { id: 'validator', label: 'Filter: Validator', color: '#d946ef', icon: <CheckCircle size={16} /> },
        { id: 'encryptor', label: 'Filter: Encrypt', color: '#a855f7', icon: <Layers size={16} /> }
    ];

    const runPipeline = () => {
        if (pipelineActive) return;
        setPipelineActive(true);
        setProcessedPackets([]);

        let text = "hello world";
        const steps = [
             { content: text, stage: 'raw' as const },
             { content: text.toUpperCase(), stage: 'parsed' as const }, // UPPERCASE
             { content: text.toUpperCase() + " [VALID]", stage: 'validated' as const }, // VALIDATE
             { content: btoa(text.toUpperCase() + " [VALID]").substring(0, 10) + "...", stage: 'encrypted' as const } // ENCRYPT (Mock)
        ];

        steps.forEach((step, index) => {
            setTimeout(() => {
                setProcessedPackets(prev => [...prev, { id: index, ...step }]);
                if (index === steps.length - 1) setPipelineActive(false);
            }, (index + 1) * 1200);
        });
    };

    const illu = (
        <div style={{ position: 'relative', width: '350px', height: '300px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* The Main Pipe */}
            <div style={{ position: 'absolute', left: '50px', top: '50px', bottom: '50px', width: '10px', background: '#334155', borderRadius: '5px' }} />

            {/* Filters Attached to Pipe */}
            {[0, 1, 2].map(i => (
                <div key={i} style={{ 
                    position: 'absolute', 
                    top: 80 + (i * 70), 
                    left: 30, 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '15px' 
                }}>
                    <motion.div 
                        initial={{ scale: 0.8 }}
                        animate={{ scale: pipelineActive ? [1, 1.1, 1] : 1 }}
                        transition={{ delay: i * 1.2, duration: 0.5 }}
                        style={{ 
                            width: '50px', height: '50px', 
                            background: i === 0 ? '#ec4899' : (i === 1 ? '#d946ef' : '#a855f7'), 
                            borderRadius: '12px', 
                            border: '2px solid rgba(255,255,255,0.2)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            zIndex: 10,
                            boxShadow: '0 0 20px rgba(0,0,0,0.5)'
                        }}
                    >
                        <Filter color="white" size={20} />
                    </motion.div>
                    
                    <div style={{ 
                        background: 'rgba(255,255,255,0.05)', 
                        padding: '5px 10px', 
                        borderRadius: '6px', 
                        fontSize: '0.7rem', 
                        color: '#cbd5e1',
                        border: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        {i === 0 ? 'ToUpperCase()' : (i === 1 ? 'CheckFormat()' : 'Encrypt()')}
                    </div>
                </div>
            ))}

            {/* Moving Data Drops */}
            {pipelineActive && (
                <motion.div 
                    animate={{ top: [50, 260], opacity: [1, 0] }}
                    transition={{ duration: 4, ease: 'linear' }}
                    style={{ position: 'absolute', left: '48px', width: '14px', height: '14px', background: '#fff', borderRadius: '50%', zIndex: 20 }}
                />
            )}
        </div>
    );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="Pipe & Filter"
        subtitle="Architecture"
        description="Unix philosophy: 'Do one thing, and do it very well'. Take data, pass it through small, independent filters, transform it, and hand it to the next one."
        badge="Streaming Logic"
        color="#ec4899"
        illustration={illu}
        features={[
          { icon: <Filter />, title: 'Decoupling', desc: 'Filters are unaware of each other. As long as the output format is the next one\'s input, no problem.' },
          { icon: <GitCommit />, title: 'Reusability', desc: 'You can use the same "LowerCase" filter in 10 different projects without changing it at all.' },
          { icon: <Activity />, title: 'Parallel Processing', desc: 'Filters can run on different machines; data flows through pipes.' }
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
            { id: 'concept', label: 'Logic', icon: <Binary size={18} /> },
            { id: 'simulation', label: 'Execute Pipe', icon: <Play size={18} /> }
          ].map((tab) => (
             <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 24px',
                borderRadius: '18px',
                border: 'none',
                background: activeTab === tab.id ? '#ec4899' : 'transparent',
                color: activeTab === tab.id ? 'black' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(236, 72, 153, 0.3)' : 'none'
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
                 <motion.div
                    key="concept"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div className="glass-card" style={{ borderTop: '4px solid #ec4899' }}>
                            <h3 style={{ color: '#ec4899', marginBottom: '1rem' }}>Food Processor Analogy</h3>
                            <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
                                Think of a tomato turning into ketchup in a factory:
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                                <li style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                                    <div style={{ width: '20px', height: '20px', background: '#334155', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>1</div>
                                    <span>Washing (Filter A)</span>
                                </li>
                                <li style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                                    <div style={{ width: '20px', height: '20px', background: '#334155', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>2</div>
                                    <span>Peeling (Filter B)</span>
                                </li>
                                <li style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                                    <div style={{ width: '20px', height: '20px', background: '#334155', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>3</div>
                                    <span>Crushing (Filter C)</span>
                                </li>
                            </ul>
                            <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '10px' }}>
                                The "Washing" machine doesn't know how the "Crushing