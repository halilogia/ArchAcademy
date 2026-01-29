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
        description="Sistemin sinir ağı. Servisler birbirine bağırmak yerine, mesajlarını bir kutuya (Broker) bırakır. İlgili servis (Consumer) müsait olduğunda o kutudan alır ve işler."
        badge="Asynchronous Messaging"
        color="#eab308"
        illustration={illu}
        features={[
          { icon: <Inbox />, title: 'Load Leveling', desc: 'Sistem yoğunlaştığında mesajlar kuyrukta bekler, sunucular çökmez.' },
          { icon: <Share2 />, title: 'Decoupling', desc: 'Üreten servis, tüketen servisin kim olduğunu, nerede olduğunu bilmez.' },
          { icon: <Zap />, title: 'Reliability', desc: 'Alıcı servis kapalı olsa bile mesaj kaybolmaz, kuyrukta bekler.' }
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
                    exit={{ opacity: 0, y: -20 }}
                >
                     <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.5fr', gap: '3rem', alignItems: 'center' }}>
                         
                         <div className="glass-card" style={{ borderLeft: '4px solid #ef4444' }}>
                             <h3 style={{ fontSize: '1.4rem', color: '#ef4444', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                 <ArrowRight /> Direct Request (REST/RPC)
                             </h3>
                             <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                 Sipariş servisi, E-posta servisine "Maili gönder!" diye bağırır (Senkron).
                             </p>
                             <ul style={{ paddingLeft: '1.5rem', color: '#94a3b8', lineHeight: 2 }}>
                                 <li>❌ <strong>Temporal Coupling:</strong> E-posta servisi o an meşgulse sipariş de bekler.</li>
                                 <li>❌ <strong>Fragility:</strong> Mail servisi çökerse sipariş işlemi de hata verir.</li>
                                 <li>❌ <strong>No Buffer:</strong> Ani yük artışında sistem kilitlenir.</li>
                             </ul>
                         </div>

                         <div className="glass-card" style={{ borderLeft: '4px solid #eab308' }}>
                             <h3 style={{ fontSize: '1.4rem', color: '#eab308', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                 <Inbox /> Broker Pattern (Async)
                             </h3>
                             <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                 Sipariş servisi "Mail gönderilecek" notunu Broker'a bırakır ve işine döner.
                             </p>
                             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                 <div style={{ background: 'rgba(234, 179, 8, 0.1)', padding: '1rem', borderRadius: '12px' }}>
                                     <h4 style={{ color: '#eab308', fontSize: '1rem', marginBottom: '5px' }}>Fire & Forget</h4>
                                     <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>Gönderici cevabı beklemez. Sistem çok daha hızlı (Responsive) hale gelir.</p>
                                 </div>
                                 <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '12px' }}>
                                     <h4 style={{ color: '#10b981', fontSize: '1rem', marginBottom: '5px' }}>Throttling</h4>
                                     <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>Binlerce sipariş gelse de işçiler (consumers) kendi hızında (tane tane) işler.</p>
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
                    <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '32px', border: '1px solid var(--glass-border)' }}>
                        
                        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                                Aşağıdaki butonlarla sisteme yük bindirin. İşçilerin (Workers) meşgul olsalar bile mesajların <strong>Queue</strong>'da güvenle beklediğini gözlemleyin.
                            </p>
                            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                                <button onClick={() => produceMessage('payment')} className="btn-bounce" style={{ padding: '12px 24px', borderRadius: '12px', border: 'none', background: '#ef4444', color: 'white', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)' }}>
                                    Add Payment +
                                </button>
                                <button onClick={() => produceMessage('email')} className="btn-bounce" style={{ padding: '12px 24px', borderRadius: '12px', border: 'none', background: '#3b82f6', color: 'white', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)' }}>
                                    Add Email +
                                </button>
                                <button onClick={() => produceMessage('log')} className="btn-bounce" style={{ padding: '12px 24px', borderRadius: '12px', border: 'none', background: '#10b981', color: 'white', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)' }}>
                                    Add Log +
                                </button>
                            </div>
                        </div>

                        {/* Visual Pipeline */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '2rem', alignItems: 'center' }}>
                            
                            {/* Producers Side (Left) */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', opacity: 0.5 }}>
                                <div style={{ fontSize: '0.8rem', textAlign: 'right' }}>CHECKOUT SVC</div>
                                <div style={{ fontSize: '0.8rem', textAlign: 'right' }}>NOTIFIER SVC</div>
                                <div style={{ fontSize: '0.8rem', textAlign: 'right' }}>LOGGER SVC</div>
                            </div>

                            {/* The Broker (Center) */}
                            <div style={{ 
                                height: '200px', 
                                background: 'rgba(0,0,0,0.3)', 
                                border: '2px solid rgba(255,255,255,0.1)', 
                                borderRadius: '20px',
                                padding: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                overflowX: 'auto',
                                position: 'relative'
                            }}>
                                <div style={{ position: 'absolute', top: 10, left: 20, color: '#eab308', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <Inbox size={20} /> RABBITMQ / KAFKA QUEUE
                                </div>
                                
                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', gap: '1rem', paddingLeft: '1rem' }}>
                                    <AnimatePresence>
                                        {queue.map(msg => (
                                            <motion.div
                                                key={msg.id}
                                                initial={{ scale: 0, opacity: 0, rotate: -45 }}
                                                animate={{ scale: 1, opacity: msg.status === 'processing' ? 0.5 : 1, rotate: 0 }}
                                                exit={{ scale: 0, opacity: 0, x: 100 }}
                                                style={{ 
                                                    minWidth: '60px', 
                                                    height: '60px', 
                                                    background: msg.type === 'payment' ? '#ef4444' : msg.type === 'email' ? '#3b82f6' : '#10b981', 
                                                    borderRadius: '12px',
                                                    display: 'flex', 
                                                    flexDirection: 'column',
                                                    alignItems: 'center', 
                                                    justifyContent: 'center',
                                                    color: 'white',
                                                    fontWeight: 800,
                                                    fontSize: '0.7rem',
                                                    position: 'relative',
                                                    border: msg.status === 'processing' ? '2px solid white' : 'none'
                                                }}
                                            >
                                                {msg.type === 'payment' ? <Share2 size={16} /> : msg.type === 'email' ? <Mail size={16} /> : <Database size={16} />}
                                                {msg.status === 'processing' && <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} style={{ position: 'absolute', width: '100%', height: '100%', border: '2px dashed white', borderRadius: '12px' }} />}
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                    {queue.length === 0 && <div style={{ color: '#64748b', marginLeft: '20px' }}>Waiting for messages...</div>}
                                </div>
                            </div>

                            {/* Consumers Side (Right) */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                 {consumers.map(c => (
                                     <div key={c.id} style={{ 
                                         padding: '15px', 
                                         background: c.busy ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.2)',
                                         border: `1px solid ${c.type === 'payment' ? '#ef4444' : c.type === 'email' ? '#3b82f6' : '#10b981'}`,
                                         borderRadius: '12px',
                                         display: 'flex',
                                         alignItems: 'center',
                                         gap: '10px',
                                         minWidth: '160px',
                                         opacity: c.busy ? 1 : 0.5,
                                         transition: 'all 0.3s'
                                     }}>
                                         <Server size={20} color={c.type === 'payment' ? '#ef4444' : c.type === 'email' ? '#3b82f6' : '#10b981'} />
                                         <div>
                                             <div style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>{c.type} Worker</div>
                                             <div style={{ fontSize: '0.7rem', color: c.busy ? '#eab308' : '#94a3b8' }}>{c.busy ? '● PROCESSING' : '○ IDLE'}</div>
                                         </div>
                                     </div>
                                 ))}
                            </div>

                        </div>
                    </div>
                 </motion.div>
             )}
        </AnimatePresence>
      </div>


      <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
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
                Origin & Definition
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                Broker Pattern, ilk olarak "Pattern-Oriented Software Architecture (POSA) Vol 1" kitabında tanımlanmıştır. Dağıtık sistemlerin temel taşıdır.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://en.wikipedia.org/wiki/Broker_pattern" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(234, 179, 8, 0.15)', color: '#fde047', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(234, 179, 8, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    Broker Pattern (Wiki & POSA Ref) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};

export default BrokerPage;
