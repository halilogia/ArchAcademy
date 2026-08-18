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
                style={{ 
                    width: '10px', height: '10px', background: '#ffe4e6', borderRadius: '50%', 
                    position: 'absolute', zIndex: 11, boxShadow: '0 0 10px white',
                    offsetPath: 'path("M 50 150 C 100 50, 200 250, 350 150")' 
                }}
                animate={{
                    offsetDistance: ['0%', '100%'],
                    opacity: [0, 1, 1, 0]
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </div>
    );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="Choreography"
        subtitle="Decentralized Flow"
        description="No conductor (orchestra) on stage; dancers watch each other. Each service hears an event, performs its own part, and triggers the next event."
        badge="Autonomous"
        color="#ec4899"
        illustration={illu}
        features={[
          { icon: <Wind />, title: 'High Agility', desc: 'Services are independent. Adding new steps does not require changing a central place.' },
          { icon: <Share2 />, title: 'No Single Point of Failure', desc: 'Central orchestrator cannot crash because there is none. Flow is distributed.' },
          { icon: <Zap />, title: 'Reactive', desc: 'System processes via events (Event-Driven), not commands. Data flows.' }
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
                   