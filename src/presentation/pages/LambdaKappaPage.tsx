import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { 
  Database, 
  Zap, 
  Activity, 
  Server, 
  Layers, 
  GitMerge, 
  RotateCw,
  Network
} from 'lucide-react';

// --- KAPPA SIMULATION TYPES ---
interface LogEvent {
    id: number;
    value: number;
    timestamp: string;
}

interface DataParticle {
    id: number;
    type: 'hot' | 'cold'; 
    x: number;
    y: number;
}


const LambdaKappaPage = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'lambda-sim' | 'kappa-sim'>('overview');
    
    // ... (State definitions remain same) ...
    // --- LAMBDA SIMULATION STATE ---
    const [queryStatus, setQueryStatus] = useState<'idle' | 'querying' | 'complete'>('idle');
    const [batchResult, setBatchResult] = useState<any>(null);
    const [speedResult, setSpeedResult] = useState<any>(null);

    // --- KAPPA SIMULATION STATE ---
    const [isReplaying, setIsReplaying] = useState(false);
    const [processingIndex, setProcessingIndex] = useState(-1);
    const [processingLogic, setProcessingLogic] = useState<'sum' | 'double'>('sum');
    const [kappaResult, setKappaResult] = useState(0);

    // Mock Immutable Log
    const eventLog: LogEvent[] = [
        { id: 1, value: 10, timestamp: '10:00:01' },
        { id: 2, value: 20, timestamp: '10:00:05' },
        { id: 3, value: 5,  timestamp: '10:00:12' },
        { id: 4, value: 50, timestamp: '10:00:45' }
    ];

    const startKappaReplay = (newLogic: 'sum' | 'double') => {
        if (isReplaying) return;
        setIsReplaying(true);
        setProcessingLogic(newLogic);
        setKappaResult(0);
        setProcessingIndex(0);
    };

    // Kappa Effect to step through the log
    useEffect(() => {
        if (isReplaying && processingIndex >= 0 && processingIndex < eventLog.length) {
            const timer = setTimeout(() => {
                const event = eventLog[processingIndex];
                setKappaResult(prev => {
                    if (processingLogic === 'sum') return prev + event.value;
                    if (processingLogic === 'double') return prev + (event.value * 2);
                    return prev;
                });
                setProcessingIndex(prev => prev + 1);
            }, 800); 
            return () => clearTimeout(timer);
        } else if (processingIndex >= eventLog.length) {
            setIsReplaying(false);
            setProcessingIndex(-1);
        }
    }, [isReplaying, processingIndex, processingLogic]);


    // --- OVERVIEW ANIMATION STATE ---
    const [particles, setParticles] = useState<DataParticle[]>([]);

    // Ingest Simulation for Overview
    useEffect(() => {
        if (activeTab === 'overview') {
            const interval = setInterval(() => {
                if (Math.random() > 0.6) {
                    const id = Date.now();
                    const type = Math.random() > 0.5 ? 'hot' : 'cold';
                    // Start from the exact connection point (approx 50px, 150px)
                    setParticles(prev => [...prev, { id, type, x: 0, y: 0 }]); 
                    setTimeout(() => setParticles(prev => prev.filter(p => p.id !== id)), 2500);
                }
            }, 600);
            return () => clearInterval(interval);
        }
    }, [activeTab]);

    const runLambdaQuery = () => {
        if (queryStatus === 'querying') return;
        setQueryStatus('querying');
        setBatchResult(null);
        setSpeedResult(null);

        // Speed Layer (Fast)
        setTimeout(() => {
            setSpeedResult({ count: 42, time: '12ms', source: 'Real-time View' });
        }, 800);

        // Batch Layer (Slow)
        setTimeout(() => {
            setBatchResult({ count: 18500, time: '1.2s', source: 'Batch View' });
            setQueryStatus('complete');
        }, 2000);
    };

    const overviewIllustration = (
        <div style={{ position: 'relative', width: '350px', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {/* Source - Slightly adjusted position to align with paths */}
            <div style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 20 }}>
                <div style={{ background: '#0f172a', padding: '5px', borderRadius: '8px', border: '1px solid #06b6d4' }}>
                     <Server color="#06b6d4" size={24} />
                </div>
                <span style={{ fontSize: '0.7rem', color: '#06b6d4', fontWeight: 800, marginTop: '4px' }}>SOURCE</span>
            </div>

            {/* Architecture Visual */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                <defs>
                    <linearGradient id="gradientFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="1" />
                    </linearGradient>
                </defs>
                
                {/* 
                   Adjusted Paths: 
                   Start point (M) is now 60,150 which is right where the Source icon sits.
                   Control points (C) are adjusted for smoother separation.
                */}
                
                {/* Batch Path (Top Curve) */}
                <path d="M 50 150 C 100 150, 100 50, 200 50 L 300 120" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />

                 {/* Speed Path (Bottom Curve) */}
                 <path d="M 50 150 C 100 150, 100 250, 200 250 L 300 180" fill="none" stroke="#ec4899" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
            </svg>

            {/* Moving Particles */}
            {particles.map(p => (
                <motion.div
                    key={p.id}
                    initial={{ offsetDistance: '0%' }}
                    animate={{ offsetDistance: '100%' }}
                    transition={{ duration: 2, ease: 'linear' }}
                    style={{
                        position: 'absolute', width: '10px', height: '10px', borderRadius: '50%', 
                        background: p.type === 'hot' ? '#ec4899' : '#06b6d4',
                        boxShadow: `0 0 10px ${p.type === 'hot' ? '#ec4899' : '#06b6d4'}`,
                        offsetPath: p.type === 'hot' ? 'path("M 50 150 C 100 150, 100 250, 200 250 L 300 180")' : 'path("M 50 150 C 100 150, 100 50, 200 50 L 300 120")',
                        zIndex: 10
                    }}
                />
            ))}
        </div>
    );

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ArchHero 
                title="Lambda & Kappa"
                subtitle="Big Data Architectures"
                description="Devasa veri okyanuslarını işlemek için geliştirilen iki dev strateji. 'Batch' güvenliği mi, 'Stream' hızı mı? Yoksa ikisi birden mi?"
                badge="Processing Patterns"
                color="#06b6d4"
                illustration={overviewIllustration}
                features={[
                    { icon: <Database />, title: 'Batch Processing', desc: 'Veriyi biriktirip gece yarısı toplu işleme (Hadoop/Spark).' },
                    { icon: <Zap />, title: 'Stream Processing', desc: 'Veriyi oluştuğu an havada yakalayıp işleme (Kafka/Flink).' },
                    { icon: <GitMerge />, title: 'Hybrid Architectures', desc: 'Lambda ve Kappa ile iki dünyanın en iyisini birleştirme.' }
                ]}
            >
                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                    <button 
                        onClick={() => setActiveTab('overview')}
                        style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', background: activeTab === 'overview' ? '#06b6d4' : 'rgba(255,255,255,0.05)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 700, transition: 'all 0.3s' }}
                    >
                        Overview
                    </button>
                    <button 
                        onClick={() => setActiveTab('lambda-sim')}
                        style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', background: activeTab === 'lambda-sim' ? '#6366f1' : 'rgba(255,255,255,0.05)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 700, transition: 'all 0.3s' }}
                    >
                        Lambda Sim
                    </button>
                    <button 
                        onClick={() => setActiveTab('kappa-sim')}
                        style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', background: activeTab === 'kappa-sim' ? '#06b6d4' : 'rgba(255,255,255,0.05)', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 700, transition: 'all 0.3s' }}
                    >
                        Kappa Sim (New)
                    </button>
                </div>
            </ArchHero>

            <div className="container" style={{ marginTop: '3rem', paddingBottom: '5rem' }}>
                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            <div className="glass-card" style={{ padding: '3rem' }}>
                                <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>The Evolution of Processing</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', gap: '3rem' }}>
                                    
                                    {/* Lambda Column */}
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                            <div style={{ padding: '10px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', color: '#6366f1' }}><Layers size={24} /></div>
                                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Lambda Architecture</h3>
                                        </div>
                                        <p style={{ lineHeight: '1.7', color: '#cbd5e1', marginBottom: '1.5rem' }}>
                                            Nathan Marz tarafından tasarlanan bu mimari, <strong>Human-Fault Tolerance</strong> odaklıdır.
                                        </p>
                                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '1.5rem' }}>
                                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: 0, listStyle: 'none', margin: 0 }}>
                                                <li style={{ color: '#94a3b8' }}><span style={{ color: '#6366f1', display: 'block', fontWeight: 700 }}>Immutable Master:</span> Hadoop/S3 verisi asla silinmez.</li>
                                                <li style={{ color: '#94a3b8' }}><span style={{ color: '#ec4899', display: 'block', fontWeight: 700 }}>Complexity:</span> İki ayrı kod tabanı (Batch+Speed) gerekir.</li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Kappa Column */}
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                            <div style={{ padding: '10px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '12px', color: '#06b6d4' }}><Network size={24} /></div>
                                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Kappa Architecture</h3>
                                        </div>
                                        <p style={{ lineHeight: '1.7', color: '#cbd5e1', marginBottom: '1.5rem' }}>
                                            Jay Kreps (Kafka) tarafından önerilen modern yaklaşım. "Her şey stream'dir."
                                        </p>
                                        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '1.5rem' }}>
                                            <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: 0, listStyle: 'none', margin: 0 }}>
                                                <li style={{ color: '#94a3b8' }}><span style={{ color: '#06b6d4', display: 'block', fontWeight: 700 }}>Stream Only:</span> Batch katmanı yoktur.</li>
                                                <li style={{ color: '#94a3b8' }}><span style={{ color: '#10b981', display: 'block', fontWeight: 700 }}>Simplicity:</span> Tek teknoloji (Kafka+Flink) yeterlidir.</li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'lambda-sim' && (
                        <motion.div key="lambda-sim" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            <div className="glass-card" style={{ padding: '3rem', border: '1px solid #6366f1' }}>
                                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>Lambda "Serving Layer" Simulation</h2>
                                    <p style={{ color: '#94a3b8' }}>Batch View + Real-time View birleştirmesi.</p>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) auto minmax(250px, 1fr)', gap: '20px', alignItems: 'center' }}>
                                    <motion.div animate={{ opacity: batchResult ? 1 : 0.4 }} className="glass-card" style={{ textAlign: 'center', background: 'rgba(99, 102, 241, 0.05)' }}>
                                        <Database size={40} color="#6366f1" style={{ marginBottom: '1rem' }} />
                                        <h4 style={{ color: '#6366f1' }}>Batch View</h4>
                                        {batchResult ? (<div><div style={{ fontSize: '2.5rem', fontWeight: 900 }}>{batchResult.count.toLocaleString()}</div></div>) : <div style={{height:50}}>{queryStatus==='querying' && <RotateCw className="spin" size={24} color="#6366f1"/>}</div>}
                                    </motion.div>
                                    <button onClick={runLambdaQuery} disabled={queryStatus === 'querying'} className="btn-bounce" style={{ padding: '1rem 2rem', borderRadius: '50px', border: 'none', background: 'white', color: 'black', fontWeight: 900, cursor: 'pointer' }}>{queryStatus === 'querying' ? 'MERGING...' : 'QUERY'}</button>
                                    <motion.div animate={{ opacity: speedResult ? 1 : 0.4 }} className="glass-card" style={{ textAlign: 'center', background: 'rgba(236, 72, 153, 0.05)' }}>
                                        <Zap size={40} color="#ec4899" style={{ marginBottom: '1rem' }} />
                                        <h4 style={{ color: '#ec4899' }}>Speed View</h4>
                                        {speedResult ? (<div><div style={{ fontSize: '2.5rem', fontWeight: 900 }}>+{speedResult.count}</div></div>) : <div style={{height:50}}>{queryStatus==='querying' && <RotateCw className="spin" size={24} color="#ec4899"/>}</div>}
                                    </motion.div>
                                </div>
                                <AnimatePresence>{queryStatus === 'complete' && (<motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ marginTop: '2rem', textAlign: 'center' }}><div style={{ fontSize: '4rem', fontWeight: 900, color: 'white' }}>{(18500 + 42).toLocaleString()}</div><div style={{color:'#10b981'}}>Unified Result</div></motion.div>)}</AnimatePresence>
                            </div>
                        </motion.div>
                    )}

                     {activeTab === 'kappa-sim' && (
                        <motion.div key="kappa-sim" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                            <div className="glass-card" style={{ padding: '3rem', border: '1px solid #06b6d4' }}>
                                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                                    <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>Kappa "Replay" Simulation</h2>
                                    <p style={{ color: '#94a3b8' }}>
                                        Kod değişirse veritabanı silinir, Kafka Log başa sarılır (Replay) ve yeni kodla tekrar işlenir.
                                    </p>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(200px, 1fr) 2fr', gap: '30px' }}>
                                    {/* Controls */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                        <div style={{ padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: processingLogic === 'sum' ? '2px solid #8b5cf6' : '1px solid transparent' }}>
                                            <h4 style={{ color: 'white', marginBottom: '5px' }}>v1.0: Sum</h4>
                                            <button onClick={() => startKappaReplay('sum')} disabled={isReplaying} style={{ width: '100%', padding: '10px', background: '#334155', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer', opacity: isReplaying?0.5:1 }}>Replay v1</button>
                                        </div>
                                         <div style={{ padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: processingLogic === 'double' ? '2px solid #ec4899' : '1px solid transparent' }}>
                                            <h4 style={{ color: 'white', marginBottom: '5px' }}>v2.0: Double</h4>
                                            <button onClick={() => startKappaReplay('double')} disabled={isReplaying} style={{ width: '100%', padding: '10px', background: '#ec4899', border: 'none', borderRadius: '8px', color: 'black', fontWeight:800, cursor: 'pointer', opacity: isReplaying?0.5:1 }}>Replay v2</button>
                                        </div>
                                    </div>

                                    {/* Visualzier */}
                                    <div style={{ background: '#020617', borderRadius: '16px', padding: '20px', border: '1px solid #334155', overflow: 'hidden' }}>
                                        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.8rem' }}>
                                            <span>IMMUTABLE EVENT LOG</span>
                                            {isReplaying && <span style={{ color: '#8b5cf6' }}>Reprocessing...</span>}
                                        </div>
                                        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '20px' }}>
                                            {eventLog.map((evt, i) => (
                                                <motion.div 
                                                    key={evt.id}
                                                    animate={{ scale: processingIndex === i ? 1.1 : 1, borderColor: processingIndex === i ? '#8b5cf6' : '#334155', backgroundColor: processingIndex > i ? 'rgba(139, 92, 246, 0.2)' : 'rgba(30, 41, 59, 0.5)' }}
                                                    style={{ minWidth: '80px', height: '80px', border: '2px solid #334155', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                                                >
                                                    <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>#{evt.id}</span>
                                                    <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white' }}>{evt.value}</span>
                                                </motion.div>
                                            ))}
                                        </div>
                                        <div style={{ marginTop: '20px', padding: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Computed Result</div>
                                            </div>
                                            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff' }}>{kappaResult}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            <style>{` .spin { animation: spin 1s linear infinite; } @keyframes spin { 100% { transform: rotate(360deg); } } `}</style>
        </motion.div>
    );
};

export default LambdaKappaPage;

