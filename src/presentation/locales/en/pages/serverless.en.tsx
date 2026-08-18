import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Cloud, DollarSign, Activity, Clock, Server, ThermometerSnowflake, Gauge } from 'lucide-react';
import ArchHero from '../../../components/ArchHero';

const ServerlessPage = () => {
    const [activeTab, setActiveTab] = useState<'simulation' | 'comparison'>('comparison');
    const [requests, setRequests] = useState<number[]>([]);
    const [instances, setInstances] = useState<number>(0);
    const [coldStarts, setColdStarts] = useState<number>(0);
    const [cost, setCost] = useState<number>(0);

    const triggerRequest = () => {
        const id = Date.now();
        setRequests(prev => [...prev.slice(-19), id]);
        
        // Simulation logic
        // If instances < needed, spin up new one (Cold Start)
        // Simple logic: 1 instance can handle 1 request "at a time" in this viz
        // Instances degrade after lack of use (not simulated here for simplicity, just accumulation)
        
        // Randomly simulate cold start if we rapidly spike or just to show effect
        const isColdStart = Math.random() > 0.7 || instances === 0;
        if (isColdStart) {
            setColdStarts(prev => prev + 1);
            setInstances(prev => prev + 1);
        }
        
        setCost(prev => prev + 0.0002); // Mock cost per request
    };

    const illu = (
    <div style={{ position: 'relative', width: '380px', height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Cloud Provider */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ zIndex: 5 }}
      >
        <Cloud size={180} color="#a855f7" strokeWidth={1} fill="rgba(168, 85, 247, 0.1)" />
      </motion.div>

      {/* Function Instances */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
         {[0, 1, 2, 3].map((i) => (
             <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.2, 0.5],
                    x: [0, (i % 2 === 0 ? 60 : -60) * (Math.ceil((i+1)/2))],
                    y: [0, (i < 2 ? -60 : 60)]
                }}
                transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: i * 0.8,
                    ease: "easeInOut"
                }}
                style={{ 
                    position: 'absolute', 
                    background: '#a855f7', 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '8px',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    boxShadow: '0 0 20px #a855f7'
                }}
             >
                 <span style={{ fontSize: '10px', fontWeight: 900, color: 'white' }}>FN</span>
             </motion.div>
         ))}
      </div>
      
      {/* Zap Icons */}
      <div style={{ position: 'absolute', bottom: 20 }}>
         <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 0.5 }}>
            <Zap size={32} color="#facc15" fill="#facc15" />
         </motion.div>
      </div>

    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="Serverless"
        subtitle="Functions as a Service"
        description="No server management. Upload your code, pay only for the milliseconds it runs. If traffic is 0, bill is $0."
        badge="Event-Driven"
        color="#a855f7"
        illustration={illu}
        features={[
          { icon: <DollarSign />, title: 'Pay-per-use', desc: 'Pay only for the milliseconds your code runs.' },
          { icon: <Activity />, title: 'Auto Scaling', desc: 'Even if request count goes from zero to millions, cloud handles it automatically.' },
          { icon: <Clock />, title: 'Zero Ops', desc: 'No