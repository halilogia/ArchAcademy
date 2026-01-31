import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
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
        description="Yayıncılar (Publishers) kimin dinlediğini bilmez, Dinleyiciler (Subscribers) kimin gönderdiğini bilmez. Aradaki 'Broker' sayesinde tam bağımsız iletişim."
        badge="Event Distribution"
        color="#f97316"
        illustration={illu}
        features={[
          { icon: <Radio />, title: 'Broadcasting', desc: 'Tek bir olayı aynı anda binlerce dinleyiciye ulaştırın.' },
          { icon: <Target />, title: 'Topic Isolation', desc: 'Alıcılar sadece ilgilendikleri konu başlıklarına (topics) abone olurlar.' },
          { icon: <Zap />, title: 'Decoupling', desc: 'Sistemin parçaları birbirinden tamamen habersizdir, sadece mesajlaşırlar.' }
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
                                 <Users /> Point-to-Point (Geleneksel)
                             </h3>
                             <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                 A Servisi, B Servisini doğrudan çağırır (HTTP/RPC).
                             </p>
                             <ul style={{ paddingLeft: '1.5rem', color: '#94a3b8', lineHeight: 2 }}>
                                 <li>❌ <strong>Tight Coupling:</strong> Birbirlerini bilmek zorundalar.</li>
                                 <li>❌ <strong>Fragile:</strong> B servisi çökerse A da hata alır.</li>
                                 <li>❌ <strong>Not Scalable:</strong> Yeni bir servis eklenirse, A'nın kodunu değiştirmek gerekir.</li>
                             </ul>
                         </div>

                         <div className="glass-card" style={{ borderLeft: '4px solid #f97316' }}>
                             <h3 style={{ fontSize: '1.4rem', color: '#f97316', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                 <Radio /> Publisher / Subscriber
                             </h3>
                             <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                 Araya bir <strong>Broker</strong> (Postacı) girer. A servisi mesajı postacıya verir ve işine bakar.
                             </p>
                             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                 <div style={{ background: 'rgba(249, 115, 22, 0.1)', padding: '1rem', borderRadius: '12px' }}>
                                     <h4 style={{ color: '#f97316', fontSize: '1rem', marginBottom: '5px' }}>Topic Logic</h4>
                                     <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>"Sports" kanalına atılan mesajı sadece o kanala abone olanlar alır.</p>
                                 </div>
                                 <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '12px' }}>
                                     <h4 style={{ color: '#10b981', fontSize: '1rem', marginBottom: '5px' }}>Loose Coupling</h4>
                                     <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>Servisler birbirini tanımaz. Yarın sisteme yeni bir servis eklense de kimsenin kodu bozulmaz.</p>
                                 </div>
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
                    {/* Control Panel */}
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '1rem' }}>
                            {['sports', 'tech', 'news'].map(topic => (
                                <button
                                    key={topic}
                                    onClick={() => publishMessage(topic as Topic)}
                                    disabled={activeMessage !== null}
                                    className="btn-bounce"
                                    style={{
                                        padding: '12px 24px',
                                        borderRadius: '12px',
                                        border: 'none',
                                        background: topic === 'tech' ? '#3b82f6' : topic === 'sports' ? '#10b981' : '#ec4899',
                                        color: 'white',
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        opacity: activeMessage ? 0.5 : 1,
                                        textTransform: 'uppercase',
                                        boxShadow: `0 4px 15px ${topic === 'tech' ? 'rgba(59, 130, 246, 0.4)' : topic === 'sports' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(236, 72, 153, 0.4)'}`
                                    }}
                                >
                                    Publish {topic}
                                </button>
                            ))}
                        </div>
                        <p style={{ color: 'var(--text-secondary)' }}>
                           Yukarıdaki butonlara basarak bir konu başlığında (Topic) mesaj yayınlayın. Aşağıdaki abonelerden sadece ilgili olanlar mesajı alacak.
                        </p>
                    </div>

                    {/* Simulation Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {subscribers.map(sub => (
                            <div key={sub.id} className="glass-card" style={{ position: 'relative', overflow: 'hidden' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        {sub.id === 1 ? <Zap color="#f97316" /> : sub.id === 2 ? <Smartphone color="#f97316" /> : <Mail color="#f97316" />}
                                        <h3 style={{ fontSize: '1.2rem' }}>{sub.name}</h3>
                                    </div>
                                    <div style={{ display: 'flex', gap: '5px' }}>
                                        {['sports', 'tech', 'news'].map(t => (
                                            <div 
                                                key={t}
                                                onClick={() => toggleTopic(sub.id, t as Topic)}
                                                style={{ 
                                                    width: '10px', 
                                                    height: '10px', 
                                                    borderRadius: '50%', 
                                                    background: t === 'tech' ? '#3b82f6' : t === 'sports' ? '#10b981' : '#ec4899',
                                                    opacity: sub.topics.includes(t as Topic) ? 1 : 0.2,
                                                    cursor: 'pointer',
                                                    border: '1px solid rgba(255,255,255,0.2)'
                                                }}
                                                title={`Toggle ${t}`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div style={{ height: '150px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '10px', overflowY: 'auto' }}>
                                    {sub.messages.length === 0 && <div style={{ textAlign: 'center', marginTop: '40px', color: '#64748b', fontSize: '0.9rem' }}>Mesaj bekleniyor...</div>}
                                    {sub.messages.slice().reverse().map((msg, i) => (
                                        <motion.div 
                                            key={i} 
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            style={{ 
                                                padding: '8px 12px', 
                                                borderRadius: '8px', 
                                                background: msg.includes('TECH') ? 'rgba(59, 130, 246, 0.15)' : msg.includes('SPORTS') ? 'rgba(16, 185, 129, 0.15)' : 'rgba(236, 72, 153, 0.15)',
                                                marginBottom: '8px',
                                                fontSize: '0.85rem',
                                                borderLeft: `3px solid ${msg.includes('TECH') ? '#3b82f6' : msg.includes('SPORTS') ? '#10b981' : '#ec4899'}`
                                            }}
                                        >
                                            {msg}
                                        </motion.div>
                                    ))}
                                </div>
                                <div style={{ marginTop: '10px', fontSize: '0.75rem', color: '#94a3b8', fontStyle: 'italic', textAlign: 'center' }}>
                                    Subscribed to: {sub.topics.join(', ')}
                                </div>
                            </div>
                        ))}
                    </div>
                 </motion.div>
             )}
        </AnimatePresence>
      </div>
      <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
           <div style={{ 
             background: 'linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.5) 100%)', 
             padding: '3rem', 
             borderRadius: '24px', 
             border: '1px solid rgba(255,255,255,0.05)',
             maxWidth: '900px',
             margin: '0 auto'
           }}>
              <div style={{ fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', marginBottom: '1rem', textTransform: 'uppercase' }}>
                Technical Deep Dive
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                Publish-Subscribe modelinin (Pub/Sub) modern bulut mimarilerindeki yeri ve kullanım senaryoları hakkında teknik detaylara ulaşın.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://aws.amazon.com/pub-sub-messaging/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(249, 115, 22, 0.15)', color: '#fdba74', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(249, 115, 22, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    What is Pub/Sub Messaging? (AWS) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};

export default PubSubPage;
