import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../../../components/ArchHero';
import { 
  Layers, 
  Share2, 
  Settings, 
  Box, 
  Database, 
  Server, 
  ArrowRightLeft, 
  ShieldCheck, 
  Globe, 
  FileJson,
  Activity,
  Workflow
} from 'lucide-react';

const SOAPage = () => {
    const [activeTab, setActiveTab] = useState<'simulation' | 'comparison'>('comparison');
    
    // ESB Simulation State
    const [busActive, setBusActive] = useState(false);
    const [messageLog, setMessageLog] = useState<string[]>([]);
    
    // Legacy Systems (Simulated)
    const [legacyCRM, setLegacyCRM] = useState<'idle' | 'processing'>('idle');
    const [modernWeb, setModernWeb] = useState<'idle' | 'processing'>('idle');
    const [sapSystem, setSapSystem] = useState<'idle' | 'processing'>('idle');

    const triggerESB = () => {
        if (busActive) return;
        setBusActive(true);
        setMessageLog([]);

        // 1. Web Request
        setModernWeb('processing');
        log('Web App: SOAP Request Sent (XML)');

        setTimeout(() => {
            log('ESB: Transforming JSON <-> XML');
            
            // 2. ESB Routing
            setTimeout(() => {
                log('ESB: Routing to SAP & CRM');
                setLegacyCRM('processing');
                setSapSystem('processing');
                
                // 3. Response
                setTimeout(() => {
                    setLegacyCRM('idle');
                    setSapSystem('idle');
                    log('Systems: Data Updated');
                    
                    setTimeout(() => {
                        log('ESB: Aggregating Responses');
                        setModernWeb('idle');
                        setBusActive(false);
                    }, 1000);
                }, 1500);
            }, 1000);
        }, 1000);
    };

    const log = (msg: string) => {
        setMessageLog(prev => [...prev, `${new Date().toLocaleTimeString().split(' ')[0]} - ${msg}`]);
    };

    const illu = (
        <div style={{ position: 'relative', width: '350px', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}>
             {/* Top Service */}
             <motion.div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                 <Globe size={24} color="#fbcfe8" />
                 <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>WEB PORTAL</span>
             </motion.div>

             {/* ESB Pipeline */}
             <div style={{ position: 'relative', width: '280px', height: '140px', background: 'rgba(251, 207, 232, 0.05)', border: '2px solid #fbcfe8', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                 <div style={{ position: 'absolute', top: 5, fontSize: '0.65rem', color: '#fbcfe8', fontWeight: 900, letterSpacing: '2px' }}>ENTERPRISE SERVICE BUS</div>
                 
                 <motion.div 
                    animate={{ x: busActive ? [-100, 100] : 0, opacity: busActive ? 1 : 0 }}
                    transition={{ repeat: busActive ? Infinity : 0, duration: 1.5, ease: "linear" }}
                    style={{ width: '40px', height: '40px', background: '#ec4899', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                 >
                     <p style={{ margin: 0, fontSize: '0.6rem', color: 'white', fontWeight: 800 }}>XML</p>
                 </motion.div>

                 {/* Internal Logic Icons */}
                 <div style={{ position: 'absolute', bottom: 10, display: 'flex', gap: '20px', opacity: 0.5 }}>
                     <ArrowRightLeft size={16} color="#fbcfe8" />
                     <ShieldCheck size={16} color="#fbcfe8" />
                     <Activity size={16} color="#fbcfe8" />
                 </div>
             </div>

             {/* Bottom Services */}
             <div style={{ marginTop: '20px', display: 'flex', gap: '40px' }}>
                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                     <Server size={24} color="#fbcfe8" />
                     <span style={{ fontSize: '0.6rem', marginTop: '5px' }}>LEGACY CRM</span>
                 </div>
                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                     <Database size={24} color="#fbcfe8" />
                     <span style={{ fontSize: '0.6rem', marginTop: '5px' }}>MAINFRAME</span>
                 </div>
             </div>

             {/* Connecting Lines */}
             <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1 }}>
                 <line x1="175" y1="30" x2="175" y2="50" stroke="#fbcfe8" strokeWidth="2" strokeDasharray="4 4" />
                 <line x1="175" y1="190" x2="140" y2="210" stroke="#fbcfe8" strokeWidth="2" strokeDasharray="4 4" />
                 <line x1="175" y1="190" x2="210" y2="210" stroke="#fbcfe8" strokeWidth="2" strokeDasharray="4 4" />
             </svg>
        </div>
    );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="SOA"
        subtitle="Service Oriented Architecture"
        description="The organizer of enterprise chaos. Makes hundreds of systems speaking different languages (Java, .NET, Cobol) understand each other through a single language (ESB)."
        badge="Enterprise Standard"
        color="#fbcfe8"
        illustration={illu}
        features={[
          { icon: <Layers />, title: 'Interoperability', desc: 'Runs legacy Mainframe systems and modern Web APIs under one roof.' },
          { icon: <Share2 />, title: 'ESB (The Bus)', desc: 'All traffic passes through a central bus. Transformation and security happen here.' },
          { icon: <Settings />, title: 'Reusability', desc: 'One service (e.g., ValidateCustomer) is reused across the entire company.' }
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
            { id: 'comparison', label: 'Microservices vs SOA', icon: <Box size={18} /> },
            { id: 'simulation', label: 'ESB Integration Demo', icon: <Workflow size={18} /> }
          ].map((tab) => (
             <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 24px',
                borderRadius: '18px',
                border: 'none',
                background: activeTab === tab.id ? '#fbcfe8' : 'transparent',
                color: activeTab === tab.id ? 'black' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8