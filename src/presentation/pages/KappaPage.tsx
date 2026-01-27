import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { 
  Zap, 
  Waves, 
  Clock, 
  RotateCcw, 
  Cpu, 
  Database,
  ArrowRight,
  Code2,
  Play,
  CheckCircle2,
  Activity
} from 'lucide-react';

interface LogEvent {
    id: number;
    value: number;
    timestamp: string;
}

const KappaPage = () => {
    const [activeTab, setActiveTab] = useState<'simulation' | 'concept'>('concept');
    const [isReplaying, setIsReplaying] = useState(false);
    const [processingIndex, setProcessingIndex] = useState(-1);
    const [processingLogic, setProcessingLogic] = useState<'sum' | 'double'>('sum');
    const [result, setResult] = useState(0);

    // Mock Immutable Log
    const eventLog: LogEvent[] = [
        { id: 1, value: 10, timestamp: '10:00:01' },
        { id: 2, value: 20, timestamp: '10:00:05' },
        { id: 3, value: 5,  timestamp: '10:00:12' },
        { id: 4, value: 50, timestamp: '10:00:45' }
    ];

    const startReplay = (newLogic: 'sum' | 'double') => {
        if (isReplaying) return;
        setIsReplaying(true);
        setProcessingLogic(newLogic);
        setResult(0);
        setProcessingIndex(0);
    };

    // Effect to step through the log
    useEffect(() => {
        if (isReplaying && processingIndex >= 0 && processingIndex < eventLog.length) {
            const timer = setTimeout(() => {
                const event = eventLog[processingIndex];
                setResult(prev => {
                    if (processingLogic === 'sum') return prev + event.value;
                    if (processingLogic === 'double') return prev + (event.value * 2);
                    return prev;
                });
                setProcessingIndex(prev => prev + 1);
            }, 800); // Processing speed
            return () => clearTimeout(timer);
        } else if (processingIndex >= eventLog.length) {
            setIsReplaying(false);
            setProcessingIndex(-1);
        }
    }, [isReplaying, processingIndex, processingLogic]);

    const illu = (
        <div style={{ position: 'relative', width: '350px', height: '280px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            
            {/* The Infinite Log Pipe */}
            <div style={{ position: 'relative', width: '300px', height: '100px', overflow: 'hidden' }}>
                <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
                    <motion.path 
                        d="M -50 50 L 350 50" 
                        stroke="#8b5cf6" 
                        strokeWidth="4" 
                        fill="none"
                        strokeDasharray="10 5"
                        animate={{ x: [-20, 0] }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    />
                </svg>
                
                {/* Log Events Floating on Stream */}
                {[0, 1, 2].map(i => (
                    <motion.div
                        key={i}
                        animate={{ x: [350, -100] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: i * 1.3 }}
                        style={{ position: 'absolute', top: 35, left: 0, width: '30px', height: '30px', background: '#020617', border: '2px solid #8b5cf6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                        <div style={{ width: '10px', height: '10px', background: '#8b5cf6', borderRadius: '50%' }} />
                    </motion.div>
                ))}
            </div>

            {/* Processor */}
            <div style={{ marginTop: '-20px', position: 'relative', zIndex: 10 }}>
                <div style={{ width: '80px', height: '80px', background: 'rgba(139, 92, 246, 0.1)', border: '2px solid #8b5cf6', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(139, 92, 246, 0.2)' }}>
                    <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px' }}
                    >
                         <Cpu size={40} color="#8b5cf6" />
                    </motion.div>
                </div>
                <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '0.7rem', color: '#c4b5fd', fontWeight: 800 }}>STREAM PROCESSOR</div>
            </div>

            {/* Connecting Line to Storage */}
            <motion.div 
                style={{ height: '40px', width: '2px', background: '#8b5cf6', margin: '5px 0' }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
            />

             {/* Unified View */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid rgba(139, 92, 246, 0.5)', padding: '8px 15px', borderRadius: '12px', background: '#020617' }}>
                <Database size={16} color="#c4b5fd" />
                <span style={{ fontSize: '0.8rem', color: '#fff' }}>Unified View</span>
            </div>

        </div>
    );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="Kappa"
        subtitle="Architecture"
        description="Lambda'nın 'iki farklı kod tabanı' sorununa verilen radikal yanıt. Batch katmanını tamamen kaldırır; her şeyi, hatta geçmişi bile bir 'Stream' olarak görür."
        badge="Zero-Batch"
        color="#8b5cf6"
        illustration={illu}
        features={[
          { icon: <RotateCcw />, title: 'Replay Ability', desc: 'Kodunuz değişirse, olay günlüğünü (Event Log) başa sarıp tekrar oynatırsınız.' },
          { icon: <Code2 />, title: 'Single Codebase', desc: 'Batch ve Speed için ayrı kod yazmazsınız. Herkes aynı Stream Processor\'ı kullanır.' },
          { icon: <Clock />, title: 'Immutable Log', desc: 'Verinin kaynağı sonsuza kadar saklanan, değiştirilemez bir olay günlüğüdür (Kafka).' }
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
            { id: 'concept', label: 'Core Concept', icon: <Waves size={18} /> },
            { id: 'simulation', label: 'Replay Simulation', icon: <Play size={18} /> }
          ].map((tab) => (
             <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 24px',
                borderRadius: '18px',
                border: 'none',
                background: activeTab === tab.id ? '#8b5cf6' : 'transparent',
                color: activeTab === tab.id ? 'black' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(139, 92, 246, 0.3)' : 'none'
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
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}
                >
                    <div>
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: '#8b5cf6' }}>"Everything is a Stream"</h3>
                        <p style={{ lineHeight: '1.7', color: '#cbd5e1', marginBottom: '20px' }}>
                            Lambda mimarisinde Batch (S3/Hadoop) ve Speed (Storm/Flink) katmanlarını senkronize tutmak bir kabustu. Kappa bu sorunu kökten çözer: <strong>Batch katmanını siler.</strong>
                        </p>
                        <p style={{ lineHeight: '1.7', color: '#cbd5e1' }}>
                            Bunun yerine, verilerinizi saklama süresi (Retention) çok uzun olan bir Log sistemine (örn: Apache Kafka) yazarsınız. Geçmiş veriyi işlemek istediğinizde, sadece Kafka'daki okuma işaretçisini (offset) başa alırsınız.
                        </p>
                    </div>
                     <div className="glass-card" style={{ border: '1px solid #8b5cf6', background: 'rgba(139, 92, 246, 0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>
                            <div style={{ width: '40px', height: '40px', background: '#8b5cf6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Code2 color="white" />
                            </div>
                            <div>
                                <h4 style={{ margin: 0, color: 'white' }}>Single Logic</h4>
                                <div style={{ fontSize: '0.8rem', color: '#c4b5fd' }}>No Duplication</div>
                            </div>
                        </div>
                        <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#e2e8f0' }}>
                            <div style={{ color: '#8b5cf6' }}>fun processEvent(evt):</div>
                            <div style={{ paddingLeft: '20px' }}>// Same code for history & realtime!</div>
                            <div style={{ paddingLeft: '20px' }}>updateStats(evt.value)</div>
                            <div style={{ paddingLeft: '20px' }}>emitResults()</div>
                        </div>
                    </div>
                </motion.div>
            )}

            {activeTab === 'simulation' && (
                 <motion.div
                    key="simulation"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                            <h3 style={{ color: '#8b5cf6', marginBottom: '10px' }}>Reprocessing Simulation</h3>
                            <p style={{ color: '#94a3b8' }}>
                                Kod değiştirdiğinizde veritabanını silersiniz, olay günlüğünü (Log) başa sararsınız ve yeni kodla tekrar işlersiniz.
                            </p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2fr', gap: '30px' }}>
                            {/* Controls */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: processingLogic === 'sum' ? '2px solid #8b5cf6' : '1px solid transparent' }}>
                                    <h4 style={{ color: 'white', marginBottom: '10px' }}>v1.0: Sum Logic</h4>
                                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '15px' }}>Toplama işlemi yapar.</p>
                                    <button 
                                        className="btn-bounce"
                                        onClick={() => startReplay('sum')} 
                                        disabled={isReplaying}
                                        style={{ width: '100%', padding: '10px', background: '#334155', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', opacity: isReplaying ? 0.5 : 1 }}
                                    >
                                        Replay v1 (Sum)
                                    </button>
                                </div>
                                 <div style={{ padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: processingLogic === 'double' ? '2px solid #ec4899' : '1px solid transparent' }}>
                                    <h4 style={{ color: 'white', marginBottom: '10px' }}>v2.0: Double Logic</h4>
                                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '15px' }}>Her değeri 2 ile çarpıp toplar.</p>
                                    <button 
                                        className="btn-bounce"
                                        onClick={() => startReplay('double')} 
                                        disabled={isReplaying}
                                        style={{ width: '100%', padding: '10px', background: '#ec4899', border: 'none', borderRadius: '8px', color: 'black', fontWeight: 800, cursor: 'pointer', opacity: isReplaying ? 0.5 : 1 }}
                                    >
                                        Replay v2 (Double)
                                    </button>
                                </div>
                            </div>

                            {/* Stream Visualizer */}
                            <div style={{ background: '#020617', borderRadius: '16px', padding: '20px', border: '1px solid #334155', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>
                                    <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>KAFKA LOG (IMMUTABLE)</span>
                                    {isReplaying && <span style={{ fontSize: '0.8rem', color: '#8b5cf6', display: 'flex', alignItems: 'center', gap: '5px' }}><Activity className="spin" size={14} /> Reprocessing...</span>}
                                </div>

                                <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '10px 10px 20px 10px' }}>
                                    {eventLog.map((evt, i) => (
                                        <motion.div 
                                            key={evt.id}
                                            animate={{ 
                                                scale: processingIndex === i ? 1.1 : 1,
                                                borderColor: processingIndex === i ? '#8b5cf6' : '#334155',
                                                backgroundColor: processingIndex > i ? 'rgba(139, 92, 246, 0.2)' : 'rgba(30, 41, 59, 0.5)'
                                            }}
                                            style={{ 
                                                minWidth: '80px', 
                                                height: '80px', 
                                                border: '2px solid #334155', 
                                                borderRadius: '12px', 
                                                display: 'flex', 
                                                flexDirection: 'column', 
                                                alignItems: 'center', 
                                                justifyContent: 'center'
                                            }}
                                        >
                                            <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>#{evt.id}</span>
                                            <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white' }}>{evt.value}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Result Box */}
                                <div style={{ marginTop: '20px', padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h4 style={{ margin: 0, color: '#fff' }}>Computed View</h4>
                                        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                                            Logic: <span style={{ color: processingLogic === 'sum' ? '#8b5cf6' : '#ec4899' }}>{processingLogic.toUpperCase()}</span>
                                        </div>
                                    </div>
                                    <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff' }}>
                                        {result}
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default KappaPage;
