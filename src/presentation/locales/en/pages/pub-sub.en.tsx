import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../../../components/ArchHero';
import { 
  Radio, 
  Zap, 
  Target, 
  Share2, 
  MessageSquare,
  Users,
  Bell,
  Mail,
  Smartphone,
  Server,
  Filter
} from 'lucide-react';

type Topic = 'sports' | 'tech' | 'news';

interface Subscriber {
    id: number;
    name: string;
    topics: Topic[];
    isOnline: boolean;
    messages: string[];
}

const PubSubPage = () => {
    const [activeTab, setActiveTab] = useState<'simulation' | 'comparison'>('comparison');
    const [subscribers, setSubscribers] = useState<Subscriber[]>([
        { id: 1, name: 'Web App', topics: ['tech'], isOnline: true, messages: [] },
        { id: 2, name: 'Mobile App', topics: ['sports', 'news'], isOnline: true, messages: [] },
        { id: 3, name: 'Email Svc', topics: ['tech', 'news'], isOnline: true, messages: [] },
    ]);
    const [activeMessage, setActiveMessage] = useState<{ topic: Topic, text: string } | null>(null);

    const publishMessage = (topic: Topic) => {
        const text = `New ${topic.toUpperCase()} Update!`;
        setActiveMessage({ topic, text });

        // Simulate Broker Delay
        setTimeout(() => {
            setSubscribers(prev => prev.map(sub => {
                if (sub.isOnline && sub.topics.includes(topic)) {
                    return { ...sub, messages: [...sub.messages.slice(-4), text] };
                }
                return sub;
            }));
            setActiveMessage(null);
        }, 1200);
    };

    const toggleTopic = (id: number, topic: Topic) => {
        setSubscribers(prev => prev.map(s => {
            if (s.id !== id) return s;
            const hasTopic = s.topics.includes(topic);
            return { 
                ...s, 
                topics: hasTopic ? s.topics.filter(t => t !== topic) : [...s.topics, topic]
            };
        }));
    };

  const illu = (
    <div style={{ position: 'relative', width: '380px', height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Broker/Hub */}
      <motion.div
        animate={{ scale: activeMessage ? 1.1 : 1, boxShadow: activeMessage ? '0 0 40px #f97316' : '0 0 20px rgba(249, 115, 22, 0.2)' }}
        style={{ 
            width: '100px', 
            height: '100px', 
            borderRadius: '50%', 
            background: 'var(--glass)', 
            border: '4px solid #f97316', 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center',
            zIndex: 10
        }}
      >
          <Radio size={40} color="#f97316" />
          <span style={{ fontSize: '0.6rem', fontWeight: 900, marginTop: '5px' }}>BROKER</span>
      </motion.div>

      {/* Topics Orbit */}
      <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
          {[0, 1, 2].map((i) => {
              const angle = (i * 120 * Math.PI) / 180;
              const x = 50 + 40 * Math.cos(angle);
              const y = 50 + 40 * Math.sin(angle);
              return (
                  <motion.div
                    key={i}
                    animate={{ 
                        opacity: activeMessage ? 0.3 : 1
                    }}
                    style={{
                        position: 'absolute',
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                  >
                      <div style={{ width: '40px', height: '40px', background: '#334155', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Target size={20} color={i === 0 ? '#10b981' : i === 1 ? '#3b82f6' : '#ec4899'} />
                      </div>
                      <span style={{ fontSize: '0.7rem', marginTop: '5px', opacity: 0.7 }}>Topic {i+1}</span>
                  </motion.div>
              );
          })}
      </div>

       {/* Message Packet Animation */}
       {activeMessage && (
           <>
              {/* Publishers to Broker */}
              <motion.div
                 initial={{ opacity: 1, scale: 0, x: 0, y: 150 }}
                 animate={{ opacity: 0, scale: 1, x: 0, y: 0 }}
                 transition={{ duration: 0.5 }}
                 style={{ position: 'absolute', width: '20px', height: '20px', background: '#f97316', borderRadius: '50%', zIndex: 20 }}
              />
              
              {/* Broker to Subscribers */}
              {[0, 1, 2, 3, 4, 5].map(i => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                    animate={{ opacity: [0, 1, 0], scale: 1, x: Math.cos(i) * 150, y: Math.sin(i) * 150 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    style={{ position: 'absolute', width: '10px', height: '10px', background: '#f97316', borderRadius: '50%', zIndex: 5 }}
                  />
              ))}
           </>
       )}
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="Pub/Sub"
        subtitle="Messaging Pattern"
        description="Publishers don't know who is listening, and Subscribers don't know who is sending. The Broker in between enables fully decoupled communication."
        badge="Event Distribution"
        color="#f97316"
        illustration={illu}
        features={[
          { icon: <Radio />, title: 'Broadcasting', desc: 'Deliver a single event to thousands of listeners at the same time.' },
          { icon: <Target />, title: 'Topic Isolation', desc: 'Receivers subscribe only to the topics they care about.' },
          { icon: <Zap />, title: 'Decoupling', desc: 'System parts are completely unaware of each other; they only exchange messages.' }
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
            { id: 'comparison', label: 'Point-to-Point vs Pub/Sub', icon: <Share2 size={18} /> },
            { id: 'simulation', label: 'Message Broker Demo', icon: <MessageSquare size={18} /> }
          ].map((tab) => (
             <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 24px',
                borderRadius: '18px',
                border: 'none',
                background: activeTab === tab.id ? '#f97316' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(249, 115, 22, 0.3)' : 'none'
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
                     <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.5fr', gap: '3rem', alignItems: 'center' }}>
                         
                         <div className="glass-card">
                             <h3 style={{ fontSize: '1.4rem', color: '#94a3b8', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                 <Users /> Point-to-Point (Traditional)
                             </h3>
                             <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                 Service A calls Service B directly (HTTP/RPC).
                             </p>
                             <ul style={{ paddingLeft: '1.5rem', color: '#94a3b8', lineHeight: 2 }}>
                                 <li>❌ <strong>Tight Coupling:</strong> They must know each other.</li>
                                 <li>❌ <strong>Fragile:</strong> If Service B crashes, A also gets an error.</li>
                                 <li>❌ <strong>Not Scalable:</strong> Adding a new service requires changing A's code.</li>
                             </ul>
                         </div>

                         <div className="glass-card" style={{ borderLeft: '4px solid #f97316' }}>