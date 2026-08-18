import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { 
  Share2, 
  MessageSquare, 
  Zap, 
  Server, 
  ArrowRight,
  Database,
  Mail,
  Box,
  Layers,
  Inbox,
  Filter
} from 'lucide-react';

interface QueueMessage {
    id: number;
    content: string;
    type: 'payment' | 'email' | 'log';
    status: 'queued' | 'processing' | 'done';
}

const BrokerPage = () => {
    const [activeTab, setActiveTab] = useState<'simulation' | 'comparison'>('comparison');
    const [queue, setQueue] = useState<QueueMessage[]>([]);
    const [consumers, setConsumers] = useState<{ id: number, type: string, busy: boolean }[]>([
        { id: 1, type: 'payment', busy: false },
        { id: 2, type: 'email', busy: false },
        { id: 3, type: 'log', busy: false }
    ]);
    const [msgCounter, setMsgCounter] = useState(0);

    // Producer Effect
    const produceMessage = (type: 'payment' | 'email' | 'log') => {
        setMsgCounter(prev => prev + 1);
        setQueue(prev => [...prev, { 
            id: Date.now(), 
            content: `${type.toUpperCase()} #${msgCounter + 1}`, 
            type, 
            status: 'queued' 
        }]);
    };

    // Consumer Logic (Emulating Async Workers)
    useEffect(() => {
        const interval = setInterval(() => {
            const pendingMsg = queue.find(m => m.status === 'queued');
            if (!pendingMsg) return;

            // Find available consumer for this message type
            const availableConsumer = consumers.find(c => c.type === pendingMsg.type && !c.busy);
            
            if (availableConsumer) {
                // Assign message
                setQueue(prev => prev.map(m => m.id === pendingMsg.id ? { ...m, status: 'processing' } : m));
                setConsumers(prev => prev.map(c => c.id === availableConsumer.id ? { ...c, busy: true } : c));

                // Process and finish
                setTimeout(() => {
                    setQueue(prev => prev.filter(m => m.id !== pendingMsg.id)); // Remove from queue
                    setConsumers(prev => prev.map(c => c.id === availableConsumer.id ? { ...c, busy: false } : c));
                }, 2000);
            }
        }, 500);

        return () => clearInterval(interval);
    }, [queue, consumers]);

  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Producer Group */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <motion.div whileTap={{ scale: 0.9 }} style={{ padding: '8px', background: 'rgba(234, 179, 8, 0.1)', borderRadius: '8px', border: '1px solid #eab308' }}>
              <Box size={24} color="#eab308" />
          </motion.div>
      </div>

      <ArrowRight style={{ transform: 'rotate(90deg)', margin: '10px 0', opacity: 0.5 }} />

      {/* The Broker (Queue Manager) */}
      <div style={{ 
          width: '280px', 
          height: '100px', 
          background: 'none', 
          border: '2px dashed #eab308', 
          borderRadius: '16px', 
          padding: '10px',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
      }}>
          <div style={{ position: 'absolute', top: 5, left: 10, fontSize: '0.7rem', color: '#eab308' }}>MESSAGE BROKER (Queue)</div>
          
          <AnimatePresence>
            {queue.slice(0, 5).map((msg) => (
                <motion.div
                    key={msg.id}
                    initial={{ scale: 0, x: -50 }}
                    animate={{ scale: 1, x: 0 }}
                    exit={{ scale: 0, x: 50, opacity: 0 }}
                    style={{ 
                        width: '40px', 
                        height: '40px', 
                        background: msg.type === 'payment' ? '#ef4444' : msg.type === 'email' ? '#3b82f6' : '#10b981', 
                        borderRadius: '8px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                    }}
                >
                    <Mail size={20} color="white" />
                </motion.div>
            ))}
          </AnimatePresence>
      </div>

      <ArrowRight style={{ transform: 'rotate(90deg)', margin: '10px 0', opacity: 0.5 }} />

      {/* Consumers */}
      <div style={{ display: 'flex', gap: '40px' }}>
          {[1, 2, 3].map((c) => (
              <motion.div 
                key={c}
                animate={{ y: consumers[c-1].busy ? [0, -5, 0] : 0 }}
                transition={{ repeat: consumers[c-1].busy ? Infinity : 0, duration: 0.5 }}
                style={{ 
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    opacity: consumers[c-1].busy ? 1 : 0.5
                }}
              >
                  <Server size={32} color={c === 1 ? '#ef4444' : c === 2 ? '#3b82f6' : '#10b981'} />
                  <span style={{ fontSize: '0.6rem', marginTop: '5px' }}>Worker</span>
              </motion.div>
          ))}
      </div>

    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="Broker Architecture"
        subtitle="Event Bus Pattern"
        description="The system's nervous system. Services don't shout at each other; they drop messages into a box (Broker). The relevant service (Consumer) picks them up from that box when available and processes them."
        badge="Asynchronous Messaging"
        color="#eab308"
        illustration={illu}
        features={[
          { icon: <Inbox />, title: 'Load Leveling', desc: 'When the system gets busy, messages wait in the queue; servers don\'t crash.' },
          { icon: <Share2 />, title: 'Decoupling', desc: 'The producing service doesn\'t know who or where the consuming service is.' },
          { icon: <Zap />, title: 'Reliability', desc: 'Even if the receiving service is down, the message isn\'t lost; it waits in the queue.' }
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
            { id: 'comparison', label: 'Broker vs Direct', icon: <Layers size={18} /> },
            { id: 'simulation', label: 'Interactive Queue', icon: <Filter size={18} /> }
          ].map((tab) => (
             <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 24px',
                borderRadius: '18px',
                border: 'none',
                background: activeTab === tab.id ? '#eab308' : 'transparent',
                color: activeTab === tab.id ? 'black' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(234, 179, 8, 0.3)' : 'none'
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
                    exit={{ opacity: 0, y: