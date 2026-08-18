import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Mail, Database, Inbox, Server } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface QueueMessage {
  id: number;
  content: string;
  type: 'payment' | 'email' | 'log';
  status: 'queued' | 'processing' | 'done';
}

export const BrokerSimulationTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const [queue, setQueue] = useState<QueueMessage[]>([]);
  const [consumers, setConsumers] = useState<{ id: number; type: string; busy: boolean }[]>([
    { id: 1, type: 'payment', busy: false },
    { id: 2, type: 'email', busy: false },
    { id: 3, type: 'log', busy: false }
  ]);
  const [msgCounter, setMsgCounter] = useState(0);

  const produceMessage = (type: 'payment' | 'email' | 'log') => {
    setMsgCounter(prev => prev + 1);
    setQueue(prev => [
      ...prev,
      {
        id: Date.now(),
        content: `${type.toUpperCase()} #${msgCounter + 1}`,
        type,
        status: 'queued'
      }
    ]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const pendingMsg = queue.find(m => m.status === 'queued');
      if (!pendingMsg) return;

      const availableConsumer = consumers.find(c => c.type === pendingMsg.type && !c.busy);

      if (availableConsumer) {
        setQueue(prev => prev.map(m => m.id === pendingMsg.id ? { ...m, status: 'processing' } : m));
        setConsumers(prev => prev.map(c => c.id === availableConsumer.id ? { ...c, busy: true } : c));

        setTimeout(() => {
          setQueue(prev => prev.filter(m => m.id !== pendingMsg.id));
          setConsumers(prev => prev.map(c => c.id === availableConsumer.id ? { ...c, busy: false } : c));
        }, 2000);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [queue, consumers]);

  return (
    <motion.div
      key="simulation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '32px', border: '1px solid var(--glass-border)' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            {isEn 
              ? "Trigger messages with the buttons below. Observe how messages wait safely in the Message Queue even if workers are currently saturated." 
              : "Aşağıdaki butonlarla sisteme yük bindirin. İşçilerin (Workers) meşgul olsalar bile mesajların Queue'da güvenle beklediğini gözlemleyin."
            }
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              onClick={() => produceMessage('payment')} 
              className="btn-bounce" 
              style={{ padding: '12px 24px', borderRadius: '12px', border: 'none', background: '#ef4444', color: 'white', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)' }}
            >
              + {isEn ? "Payment Event" : "Add Payment +"}
            </button>
            <button 
              onClick={() => produceMessage('email')} 
              className="btn-bounce" 
              style={{ padding: '12px 24px', borderRadius: '12px', border: 'none', background: '#3b82f6', color: 'white', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)' }}
            >
              + {isEn ? "Email Event" : "Add Email +"}
            </button>
            <button 
              onClick={() => produceMessage('log')} 
              className="btn-bounce" 
              style={{ padding: '12px 24px', borderRadius: '12px', border: 'none', background: '#10b981', color: 'white', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)' }}
            >
              + {isEn ? "Log Event" : "Add Log +"}
            </button>
          </div>
        </div>

        {/* Visual Pipeline */}
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '2rem', alignItems: 'center' }}>
          {/* Producers Side (Left) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', opacity: 0.5 }}>
            <div style={{ fontSize: '0.8rem', textAlign: 'right', fontWeight: 700 }}>CHECKOUT SVC</div>
            <div style={{ fontSize: '0.8rem', textAlign: 'right', fontWeight: 700 }}>NOTIFIER SVC</div>
            <div style={{ fontSize: '0.8rem', textAlign: 'right', fontWeight: 700 }}>LOGGER SVC</div>
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
                    {msg.status === 'processing' && (
                      <motion.div 
                        animate={{ rotate: 360 }} 
                        transition={{ repeat: Infinity, duration: 1 }} 
                        style={{ position: 'absolute', width: '100%', height: '100%', border: '2px dashed white', borderRadius: '12px' }} 
                      />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              {queue.length === 0 && (
                <div style={{ color: '#64748b', marginLeft: '20px' }}>
                  {isEn ? "Queue idle. Click buttons above to enqueue messages..." : "Kuyruk boş. Mesaj göndermek için yukarıdaki butonlara tıklayın..."}
                </div>
              )}
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
                  <div style={{ fontSize: '0.7rem', color: c.busy ? '#eab308' : '#94a3b8', fontWeight: 700 }}>
                    {c.busy ? (isEn ? '● PROCESSING' : '● İŞLENİYOR') : (isEn ? '○ IDLE' : '○ BOŞTA')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BrokerSimulationTab;
