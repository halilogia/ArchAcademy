import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { 
  Zap, 
  Share2, 
  Wind, 
  Layers, 
  Activity, 
  Box, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  ArrowRight,
  GitMerge,
  Music
} from 'lucide-react';

interface ServiceNode {
    id: string;
    label: string;
    icon: React.ReactNode;
    status: 'idle' | 'working' | 'done' | 'failed';
    log: string | null;
}

const ChoreographyPage = () => {
    const [activeTab, setActiveTab] = useState<'simulation' | 'comparison'>('comparison');
    
    // Simulation State
    const [processState, setProcessState] = useState<'idle' | 'running' | 'completed'>('idle');
    const [services, setServices] = useState<ServiceNode[]>([
        { id: 'order', label: 'Order Svc', icon: <Box size={20} />, status: 'idle', log: null },
        { id: 'stock', label: 'Inventory Svc', icon: <Layers size={20} />, status: 'idle', log: null },
        { id: 'payment', label: 'Payment Svc', icon: <CreditCard size={20} />, status: 'idle', log: null },
        { id: 'delivery', label: 'Delivery Svc', icon: <Truck size={20} />, status: 'idle', log: null }
    ]);

    const runSimulation = () => {
        if (processState === 'running') return;
        setProcessState('running');
        resetServices();

        // 1. Order Placed
        updateService('order', 'working', 'Creating Order...');
        setTimeout(() => {
            updateService('order', 'done', 'Event: OrderPlaced');
            triggerService('stock');
        }, 1500);
    };

    const triggerService = (id: string) => {
        updateService(id, 'working', 'Processing Event...');
        setTimeout(() => {
            if (id === 'stock') {
                updateService(id, 'done', 'Event: StockReserved');
                triggerService('payment');
            } else if (id === 'payment') {
                updateService(id, 'done', 'Event: PaymentCaptured');
                triggerService('delivery');
            } else if (id === 'delivery') {
                updateService(id, 'done', 'Event: Shipped');
                setProcessState('completed');
            }
        }, 1500);
    };

    const updateService = (id: string, status: any, log: string) => {
        setServices(prev => prev.map(s => s.id === id ? { ...s, status, log } : s));
    };

    const resetServices = () => {
        setServices(prev => prev.map(s => ({ ...s, status: 'idle', log: null })));
    };

    // Hero Illustration
    const illu = (
        <div style={{ position: 'relative', width: '400px', height: '300px' }}>
            {/* Background Flow Path */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'visible' }}>
                <defs>
                    <linearGradient id="choreogradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ec4899" stopOpacity="0.2" />
                        <stop offset="50%" stopColor="#f472b6" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2" />
                    </linearGradient>
                </defs>
                <motion.path 
                    d="M 50 150 C 100 50, 200 250, 350 150"
                    stroke="url(#choreogradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray="10 10"
                    animate={{ strokeDashoffset: [0, -20] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
            </svg>

            {/* Floating Nodes */}
            {[0, 1, 2, 3].map((i) => {
                const positions = [
                    { x: 50, y: 150 },
                    { x: 125, y: 100 },
                    { x: 225, y: 200 },
                    { x: 350, y: 150 }
                ];
                const pos = positions[i];
                
                return (
                    <motion.div
                        key={i}
                        animate={{ 
                            y: [pos.y, pos.y - 10, pos.y],
                            scale: [1, 1.1, 1],
                            boxShadow: ['0 0 0px #ec4899', '0 0 20px #ec4899', '0 0 0px #ec4899']
                        }}
                        transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                        style={{
                            position: 'absolute',
                            left: pos.x,
                            top: 0, 
                            marginTop: -25, // center vertically relative to path points? No, simple absolute pos
                            marginLeft: -25,
                            width: '50px',
                            height: '50px',
                            background: 'rgba(236, 72, 153, 0.1)',
                            border: '1px solid #ec4899',
                            overflow: 'hidden',
                            backdropFilter: 'blur(5px)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10
                        }}
                    >
                        <Zap size={20} color="#ec4899" />
                    </motion.div>
                );
            })}

            {/* Event Particles */}
            <motion.div
                style={{ width: '10px', height: '10px', background: '#ffe4e6', borderRadius: '50%', position: 'absolute', zIndex: 11, boxShadow: '0 0 10px white' }}
                animate={{
                    offsetDistance: ['0%', '100%'],
                    opacity: [0, 1, 1, 0]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{ 
                    offsetPath: 'path("M 50 150 C 100 50, 200 250, 350 150")',
                }}
            />
        </div>
    );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="Choreography"
        subtitle="Decentralized Flow"
        description="Sahnede bir şef (orkestra) yoktur, dansçılar birbirini izler. Her servis bir olayı duyar, kendi şovunu yapar ve bir sonraki olayı tetikler."
        badge="Autonomous"
        color="#ec4899"
        illustration={illu}
        features={[
          { icon: <Wind />, title: 'High Agility', desc: 'Servisler bağımsızdır, sisteme yeni adımlar eklemek için merkezi bir yeri değiştirmek gerekmez.' },
          { icon: <Share2 />, title: 'No Single Point of Failure', desc: 'Merkezi yönetici çökemez çünkü yönetici yoktur. Akış dağıtıktır.' },
          { icon: <Zap />, title: 'Reactive', desc: 'Sistem emirlerle değil, olaylarla (Event-Driven) işler. Veri akışkandır.' }
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
            { id: 'comparison', label: 'vs Orchestration', icon: <GitMerge size={18} /> },
            { id: 'simulation', label: 'Event Chain Simulation', icon: <Activity size={18} /> }
          ].map((tab) => (
             <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 24px',
                borderRadius: '18px',
                border: 'none',
                background: activeTab === tab.id ? '#ec4899' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.5)',
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
            {activeTab === 'comparison' && (
                 <motion.div
                    key="comparison"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'center' }}>
                        
                        <div className="glass-card" style={{ opacity: 0.7 }}>
                            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#94a3b8' }}>
                                <Music /> Orchestration
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                Merkezi bir "Conductor" (Örn: Camunda, Step Functions) vardır. Tüm servisleri o yönetir. "Sen başla, sen bekle" der.
                            </p>
                            <div style={{ marginTop: '1rem', padding: '10px', borderLeft: '2px solid #94a3b8', fontSize: '0.8rem', color: '#64748b' }}>
                                <strong>Risk:</strong> Conductor aşırı karmaşıklaşabilir (God Object).
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 800 }}>VS</div>
                        </div>

                        <div className="glass-card" style={{ borderLeft: '4px solid #ec4899', background: 'linear-gradient(135deg, rgba(236,72,153,0.1) 0%, rgba(2,6,23,0) 100%)' }}>
                            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#ec4899' }}>
                                <Wind /> Choreography
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                Merkezi zeka yoktur. Servisler "akıllı uç noktalar, aptal borular" (smart endpoints, dumb pipes) prensibiyle çalışır.
                            </p>
                            <div style={{ marginTop: '1rem', padding: '10px', borderLeft: '2px solid #ec4899', fontSize: '0.8rem', color: '#ec4899' }}>
                                <strong>Avantaj:</strong> Servisler birbirinden bağımsız (Autonomous) kalır.
                            </div>
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
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                         <button 
                            onClick={runSimulation}
                            disabled={processState === 'running'}
                            className="btn-bounce"
                            style={{ 
                                padding: '15px 40px', 
                                fontSize: '1.2rem', 
                                fontWeight: 800, 
                                borderRadius: '12px', 
                                border: 'none', 
                                background: processState === 'running' ? '#334155' : '#ec4899', 
                                color: 'white',
                                cursor: processState === 'running' ? 'default' : 'pointer',
                                boxShadow: processState === 'running' ? 'none' : '0 10px 30px rgba(236, 72, 153, 0.4)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                        >
                            {processState === 'running' ? 'Processing Workflow...' : 'Start New Order Saga'}
                        </button>
                    </div>

                    <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', overflowX: 'auto', padding: '20px 0' }}>
                        
                        {/* Connecting Line */}
                        <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '4px', background: '#1e293b', zIndex: 0 }} />
                        <motion.div 
                            style={{ position: 'absolute', top: '50%', left: 0, height: '4px', background: '#ec4899', zIndex: 0, boxShadow: '0 0 10px #ec4899' }} 
                            initial={{ width: '0%' }}
                            animate={{ 
                                width: processState === 'idle' ? '0%' : 
                                       processState === 'completed' ? '100%' : 
                                       services[3].status === 'working' ? '85%' :
                                       services[2].status === 'working' ? '60%' :
                                       services[1].status === 'working' ? '35%' : '10%'
                            }}
                        />

                        {services.map((svc, index) => (
                            <div key={svc.id} style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <motion.div
                                    animate={{ 
                                        scale: svc.status === 'working' ? 1.2 : 1,
                                        borderColor: svc.status === 'done' ? '#10b981' : svc.status === 'working' ? '#ec4899' : '#334155',
                                        backgroundColor: svc.status === 'done' ? '#064e3b' : '#0f172a'
                                    }}
                                    style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '24px',
                                        border: '3px solid #334155',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginBottom: '1rem',
                                        position: 'relative'
                                    }}
                                >
                                    {svc.status === 'done' ? <CheckCircle2 color="#10b981" size={32} /> : 
                                     <div style={{ color: svc.status === 'working' ? '#ec4899' : '#64748b' }}>{svc.icon}</div>}
                                    
                                    {/* Event Bubble Emission */}
                                    <AnimatePresence>
                                        {svc.status === 'done' && index < services.length - 1 && (
                                            <motion.div
                                                initial={{ left: '50%', opacity: 1, scale: 0 }}
                                                animate={{ left: '250%', opacity: 0, scale: 1.5 }}
                                                transition={{ duration: 1 }}
                                                style={{ position: 'absolute', top: '30%', width: '20px', height: '20px', background: '#ec4899', borderRadius: '50%', zIndex: -1 }}
                                            />
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                                
                                <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '5px' }}>{svc.label}</div>
                                <div style={{ 
                                    minHeight: '20px', 
                                    fontSize: '0.75rem', 
                                    color: svc.status === 'working' ? '#eab308' : svc.status === 'done' ? '#10b981' : '#64748b',
                                    fontWeight: 700 
                                }}>
                                    {svc.log || 'Waiting...'}
                                </div>
                            </div>
                        ))}

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ChoreographyPage;
