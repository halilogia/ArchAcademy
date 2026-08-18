import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Smartphone, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export type Topic = 'sports' | 'tech' | 'news';

export interface Subscriber {
  id: number;
  name: string;
  topics: Topic[];
  isOnline: boolean;
  messages: string[];
}

export const PubSubSimulationTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const [subscribers, setSubscribers] = useState<Subscriber[]>([
    { id: 1, name: 'Web App', topics: ['tech'], isOnline: true, messages: [] },
    { id: 2, name: 'Mobile App', topics: ['sports', 'news'], isOnline: true, messages: [] },
    { id: 3, name: 'Email Svc', topics: ['tech', 'news'], isOnline: true, messages: [] }
  ]);
  const [activeMessage, setActiveMessage] = useState<{ topic: Topic; text: string } | null>(null);

  const publishMessage = (topic: Topic) => {
    const text = `New ${topic.toUpperCase()} Update!`;
    setActiveMessage({ topic, text });

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

  return (
    <motion.div
      key="simulation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Control Panel */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {(['sports', 'tech', 'news'] as Topic[]).map(topic => (
            <button
              key={topic}
              onClick={() => publishMessage(topic)}
              disabled={activeMessage !== null}
              className="btn-bounce"
              style={{
                padding: '12px 24px',
                borderRadius: '12px',
                border: 'none',
                background: topic === 'tech' ? '#3b82f6' : topic === 'sports' ? '#10b981' : '#ec4899',
                color: 'white',
                fontWeight: 800,
                cursor: activeMessage ? 'default' : 'pointer',
                opacity: activeMessage ? 0.5 : 1,
                textTransform: 'uppercase',
                boxShadow: `0 4px 15px ${topic === 'tech' ? 'rgba(59, 130, 246, 0.4)' : topic === 'sports' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(236, 72, 153, 0.4)'}`
              }}
            >
              {isEn ? `Publish ${topic}` : `${topic} Yayınla`}
            </button>
          ))}
        </div>
        <p style={{ color: 'var(--text-secondary)' }}>
          {isEn 
            ? "Click a topic button to broadcast an event. Notice how only subscribers registered for that channel receive the payload." 
            : "Yukarıdaki butonlara basarak bir konu başlığında (Topic) mesaj yayınlayın. Aşağıdaki abonelerden sadece ilgili olanlar mesajı alacaktır."
          }
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
                {(['sports', 'tech', 'news'] as Topic[]).map(t => (
                  <div 
                    key={t}
                    onClick={() => toggleTopic(sub.id, t)}
                    style={{ 
                      width: '12px', 
                      height: '12px', 
                      borderRadius: '50%', 
                      background: t === 'tech' ? '#3b82f6' : t === 'sports' ? '#10b981' : '#ec4899',
                      opacity: sub.topics.includes(t) ? 1 : 0.2,
                      cursor: 'pointer',
                      border: '1px solid rgba(255,255,255,0.3)',
                      transition: 'all 0.2s'
                    }}
                    title={`Toggle ${t}`}
                  />
                ))}
              </div>
            </div>

            <div style={{ height: '150px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '10px', overflowY: 'auto' }}>
              {sub.messages.length === 0 && (
                <div style={{ textAlign: 'center', marginTop: '40px', color: '#64748b', fontSize: '0.9rem' }}>
                  {isEn ? "Waiting for events..." : "Mesaj bekleniyor..."}
                </div>
              )}
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
              {isEn ? "Subscribed to: " : "Abone Olunan Kanallar: "} {sub.topics.join(', ')}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default PubSubSimulationTab;
