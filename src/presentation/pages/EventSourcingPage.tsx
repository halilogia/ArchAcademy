import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { 
  History, 
  Save, 
  RotateCcw, 
  Database, 
  FileClock, 
  GitCommitHorizontal,
  ArrowDown,
  Play,
  ListVideo,
  SearchCheck,
  PackagePlus,
  PackageMinus,
  ShoppingCart
} from 'lucide-react';

const EventSourcingPage = () => {
    const [activeTab, setActiveTab] = useState<'simulation' | 'comparison'>('comparison');
    const [events, setEvents] = useState([
        { id: 1, type: 'CartCreated', data: '{ userId: 1 }', time: '10:00:01' },
    ]);
    const [currentState, setCurrentState] = useState({ items: 0, total: 0 });

    const addEvent = (type: string, price: number) => {
        const newEvent = { 
            id: events.length + 1, 
            type, 
            data: type === 'ItemAdded' ? `{ price: $${price} }` : `{ price: $${price} }`, 
            time: new Date().toLocaleTimeString() 
        };
        setEvents([...events, newEvent]);

        // Replay logic (projection) - In real world this happens on read side
        if (type === 'ItemAdded') {
            setCurrentState(prev => ({ items: prev.items + 1, total: prev.total + price }));
        } else if (type === 'ItemRemoved') {
            setCurrentState(prev => ({ items: Math.max(0, prev.items - 1), total: Math.max(0, prev.total - price) }));
        }
    };

    const replayEvents = () => {
        setCurrentState({ items: 0, total: 0 });
        let tempState = { items: 0, total: 0 };
        
        events.forEach((ev, i) => {
            setTimeout(() => {
                if (ev.type === 'ItemAdded') {
                   const price = parseInt(ev.data.match(/\d+/)?.[0] || '0');
                   tempState.items += 1;
                   tempState.total += price;
                } else if (ev.type === 'ItemRemoved') {
                    const price = parseInt(ev.data.match(/\d+/)?.[0] || '0');
                    tempState.items -= 1;
                    tempState.total -= price;
                } else if (ev.type === 'CartCreated') {
                    // init
                }
                setCurrentState({ ...tempState });
            }, (i + 1) * 800);
        });
    };

  const illu = (
    <div style={{ position: 'relative', width: '380px', height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Event Stream (The Log) */}
      <div style={{ width: '100%', height: '220px', position: 'relative', overflow: 'hidden', background: 'rgba(99, 102, 241, 0.05)', borderRadius: '20px', border: '1px solid rgba(99, 102, 241, 0.2)', padding: '35px 15px 15px 15px' }}>
        <div style={{ position: 'absolute', top: '12px', left: '15px', fontSize: '0.65rem', fontWeight: 900, color: '#818cf8', opacity: 0.9, letterSpacing: '1px' }}>APPEND-ONLY LOG</div>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 1, duration: 0.5 }}
            style={{
              width: '90%',
              height: '45px',
              background: 'var(--glass)',
              border: '1.5px solid #6366f1',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              padding: '0 15px',
              marginBottom: '10px',
              boxShadow: '0 5px 15px rgba(99, 102, 241, 0.1)'
            }}
          >
            <GitCommitHorizontal size={18} color="#6366f1" style={{ marginRight: '10px' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'white' }}>EVENT #{1024 + i}</span>
              <span style={{ fontSize: '0.55rem', opacity: 0.6 }}>LOGGED AT {new Date().toLocaleTimeString()}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Projection Line */}
      <div style={{ height: '40px', width: '2px', background: 'linear-gradient(to bottom, #6366f1, transparent)', position: 'relative' }}>
         <motion.div 
           animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
           transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
           style={{ position: 'absolute', width: '8px', height: '8px', background: '#6366f1', borderRadius: '50%', left: '-3px', boxShadow: '0 0 10px #6366f1' }}
         />
      </div>

      {/* Reconstructed State */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: '180px', height: '80px', background: 'var(--glass)', border: '2px solid #6366f1', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)', position: 'relative' }}
      >
        <div style={{ position: 'absolute', top: '-25px', fontSize: '0.65rem', fontWeight: 900, color: '#818cf8' }}>PROJECTED STATE</div>
        <Save size={32} color="#6366f1" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: '8px', width: '60px', background: '#6366f1', borderRadius: '4px', marginBottom: '6px', opacity: 0.8 }} />
          <div style={{ height: '8px', width: '40px', background: '#818cf8', borderRadius: '4px', opacity: 0.5 }} />
        </div>
      </motion.div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="Event Sourcing"
        subtitle="The Source of Truth"
        description="Veritabanında verinin son halini değil, o hale gelmesini sağlayan tüm olayların (Events) tarihçesini saklama sanatıdır. Muhasebe defteri mantığıyla çalışır."
        badge="Audit & Replay"
        color="#6366f1"
        illustration={illu}
        features={[
          { icon: <History />, title: 'Time Travel', desc: 'Sisteme "Geçen Salı saat 14:00\'te durum neydi?" diye sorabilirsiniz.' },
          { icon: <FileClock />, title: 'Audit Log', desc: 'Kayıtlar asla silinmez veya güncellenmez (Immutable), sadece eklenir.' },
          { icon: <RotateCcw />, title: 'Replay', desc: 'Bir hata olduğunda tüm olayları yeniden oynatarak hatayı analiz edebilirsiniz.' }
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
            { id: 'comparison', label: 'CRUD vs Event Sourcing', icon: <Database size={18} /> },
            { id: 'simulation', label: 'Live Simulation', icon: <Play size={18} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 24px',
                borderRadius: '18px',
                border: 'none',
                background: activeTab === tab.id ? '#6366f1' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none'
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
                        <div className="glass-card" style={{ borderTop: '4px solid #64748b' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Database size={24} /> Geleneksel (CRUD)
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                                Veritabanında bir satır vardır. Güncelleme yapıldığında eski veri silinir, üzerine yenisi yazılır.
                            </p>
                            
                            <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '12px', fontFamily: 'monospace', border: '1px solid #334155' }}>
                                <div style={{ color: '#94a3b8', marginBottom: '10px' }}>// UPDATE users SET balance = 100 WHERE id = 1</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '5px', marginBottom: '5px' }}>
                                    <span>ID</span> <span>NAME</span> <span>BALANCE</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}>
                                    <span>1</span> <span>Ali</span> <span>$100</span>
                                </div>
                            </div>
                            <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <RotateCcw size={14} /> Eski bakiye ($50) sonsuza dek kayboldu.
                            </div>
                        </div>

                        <div className="glass-card" style={{ borderTop: '4px solid #6366f1' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: '#6366f1', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <History size={24} /> Event Sourcing
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                                Veritabanında satır güncellenmez. Sadece yeni "olay" eklenir. Mevcut durum, olayların toplamıdır.
                            </p>

                             <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '12px', fontFamily: 'monospace', border: '1px solid #334155' }}>
                                <div style={{ color: '#94a3b8', marginBottom: '10px' }}>// INSERT INTO events (type, amount) ...</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94a3b8' }}>
                                        <GitCommitHorizontal size={14} /> UserCreated (Balance: 0)
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981' }}>
                                        <GitCommitHorizontal size={14} /> MoneyDeposited (+$50)
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981' }}>
                                        <GitCommitHorizontal size={14} /> MoneyDeposited (+$50)
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#6366f1', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <RotateCcw size={14} /> İstediğimiz an geçmişe dönüp bakiyenin neden $100 olduğunu ispatlayabiliriz.
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
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1fr', gap: '2rem' }}>
                        
                        {/* Control Panel */}
                        <div className="glass-card">
                            <h3 style={{ marginBottom: '1.5rem' }}>Alışveriş Simülasyonu</h3>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem' }}>
                                <button onClick={() => addEvent('ItemAdded', 50)} className="btn-primary" style={{ background: '#10b981', flex: 1, padding: '12px', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                    <PackagePlus size={18} /> Ürün Ekle ($50)
                                </button>
                                <button onClick={() => addEvent('ItemRemoved', 50)} className="btn-secondary" style={{ background: '#ef4444', flex: 1, padding: '12px', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                                    <PackageMinus size={18} /> Çıkar ($50)
                                </button>
                            </div>
                            
                            <div style={{ paddingTop: '2rem', borderTop: '1px dashed rgba(255,255,255,0.1)' }}>
                                <h4 style={{ color: '#6366f1', marginBottom: '1rem' }}>Sistem Durumu (State)</h4>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(99, 102, 241, 0.1)', padding: '1.5rem', borderRadius: '16px' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '2rem', fontWeight: 900, color: 'white' }}>{currentState.items}</div>
                                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>ADET</div>
                                    </div>
                                    <ShoppingCart size={32} color="#6366f1" />
                                    <div style={{ textAlign: 'center' }}>
                                        <div style={{ fontSize: '2rem', fontWeight: 900, color: 'white' }}>${currentState.total}</div>
                                        <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>TOPLAM</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Event Log */}
                        <div className="glass-card" style={{ background: '#020617', border: '1px solid #334155', height: '500px', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><ListVideo size={20} /> Event Store (Log)</h3>
                                <button onClick={replayEvents} style={{ background: 'white', color: 'black', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem' }}>
                                    <RotateCcw size={14} /> Replay
                                </button>
                            </div>
                            
                            <div style={{ overflowY: 'auto', flex: 1, paddingRight: '5px' }}>
                                {events.slice().reverse().map((ev) => (
                                    <motion.div 
                                        key={ev.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        style={{ 
                                            padding: '12px', 
                                            background: 'rgba(255,255,255,0.05)', 
                                            borderRadius: '8px', 
                                            marginBottom: '8px',
                                            borderLeft: `3px solid ${ev.type === 'ItemRemoved' ? '#ef4444' : ev.type === 'ItemAdded' ? '#10b981' : '#6366f1'}`
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'white' }}>{ev.type}</span>
                                            <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>{ev.time}</span>
                                        </div>
                                        <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#94a3b8' }}>
                                            {ev.data}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default EventSourcingPage;
