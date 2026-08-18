import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../../../components/ArchHero';
import { 
  Server, 
  Smartphone, 
  Database, 
  Globe, 
  ArrowLeftRight, 
  ShieldCheck, 
  Activity, 
  Layers,
  Monitor,
  Wifi
} from 'lucide-react';

const ClientServerPage = () => {
  const [activeTab, setActiveTab] = useState<'simulation' | 'comparison'>('comparison');
  const [requestStatus, setRequestStatus] = useState<'IDLE' | 'SENDING' | 'PROCESSING' | 'RECEIVING'>('IDLE');
  const [serverLoad, setServerLoad] = useState(0);

  const simulateRequest = () => {
    if (requestStatus !== 'IDLE') return;

    setRequestStatus('SENDING');
    
    // Server load spikes
    setTimeout(() => {
        setServerLoad(prev => Math.min(100, prev + 20));
        setRequestStatus('PROCESSING');
    }, 1000);

    // Response returns
    setTimeout(() => {
        setServerLoad(prev => Math.max(0, prev - 20));
        setRequestStatus('RECEIVING');
    }, 2500);

    // Idle
    setTimeout(() => {
        setRequestStatus('IDLE');
    }, 3500);
  };

  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Client Device */}
      <motion.div
        animate={{ x: requestStatus === 'SENDING' ? 10 : 0 }}
        style={{ 
            position: 'absolute', 
            left: 20, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            zIndex: 10
        }}
      >
          <div style={{ width: '60px', height: '100px', background: '#334155', borderRadius: '12px', border: '2px solid #94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Smartphone size={32} color="white" />
          </div>
          <span style={{ fontSize: '0.8rem', marginTop: '10px', fontWeight: 700 }}>CLIENT</span>
      </motion.div>

      {/* Server */}
      <motion.div
        animate={{ scale: requestStatus === 'PROCESSING' ? 1.1 : 1 }}
        style={{ 
            position: 'absolute', 
            right: 20, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            zIndex: 10
        }}
      >
          <div style={{ width: '80px', height: '120px', background: '#0f172a', borderRadius: '4px', border: '2px solid #3b82f6', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', paddingTop: '10px', boxShadow: requestStatus === 'PROCESSING' ? '0 0 30px #3b82f6' : 'none' }}>
              <div style={{ width: '60px', height: '6px', background: '#3b82f6', borderRadius: '2px' }} />
              <div style={{ width: '60px', height: '6px', background: '#3b82f6', borderRadius: '2px' }} />
              <div style={{ width: '60px', height: '6px', background: '#3b82f6', borderRadius: '2px' }} />
              <div style={{ marginTop: 'auto', marginBottom: '10px' }}>
                  <Server size={24} color="#3b82f6" />
              </div>
          </div>
          <span style={{ fontSize: '0.8rem', marginTop: '10px', fontWeight: 700 }}>SERVER</span>
      </motion.div>

      {/* Connection Line */}
      <svg style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'visible' }}>
          <line x1="80" y1="150" x2="270" y2="150" stroke="#475569" strokeWidth="2" strokeDasharray="5,5" />
          
          {/* Request Packet */}
          {requestStatus === 'SENDING' && (
              <motion.circle 
                cx="80" cy="150" r="6" fill="#10b981"
                animate={{ cx: 270 }}
                transition={{ duration: 1, ease: "linear" }}
              />
          )}

          {/* Response Packet */}
          {requestStatus === 'RECEIVING' && (
               <motion.circle 
                cx="270" cy="150" r="6" fill="#3b82f6"
                animate={{ cx: 80 }}
                transition={{ duration: 1, ease: "linear" }}
              />
          )}
      </svg>
      
      {/* Cloud Icon in middle */}
      <div style={{ position: 'absolute', background: '#020617', padding: '10px' }}>
          <Globe size={32} color="#64748b" />
      </div>

    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="Client - Server"
        subtitle="Foundational Architecture"
        description="The ancestor and backbone of the web. One side requests (Request), the other serves (Response). The most fundamental building block of the modern web."
        badge="Request / Response"
        color="#3b82f6"
        illustration={illu}
        features={[
          { icon: <Monitor />, title: 'Centralized Control', desc: 'Data and business logic are stored securely on the server; the client only renders.' },
          { icon: <ArrowLeftRight />, title: 'Request Driven', desc: 'Communication always starts with a client request; the server is passive.' },
          { icon: <ShieldCheck />, title: 'Security', desc: 'Sensitive operations are handled server-side to prevent client manipulation.' }
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
            { id: 'comparison', label: 'Architecture Analysis', icon: <Layers size={18} /> },
            { id: 'simulation', label: 'HTTP Simulator', icon: <Activity size={18} /> }
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
             {activeTab === 'comparison' && (
                <motion.div
                    key="comparison"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                         <div className="glass-card">
                             <h3 style={{ fontSize: '1.4rem', color: '#3b82f6', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                 <Monitor /> Thin Client
                             </h3>
                             <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                 The client (Browser/App) only renders the UI. All computation happens on the server.
                             </p>
                             <ul style={{ paddingLeft: '1.5rem', color: '#94a3b8', lineHeight: 2 }}>
                                 <li>✅ <strong>Security:</