import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PackagePlus, PackageMinus, ShoppingCart, ListVideo, RotateCcw } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface CartEvent {
  id: number;
  type: string;
  data: string;
  time: string;
}

export const EventSourcingSimulationTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const [events, setEvents] = useState<CartEvent[]>([
    { id: 1, type: 'CartCreated', data: '{ userId: 1 }', time: '10:00:01' },
  ]);
  const [currentState, setCurrentState] = useState({ items: 0, total: 0 });

  const addEvent = (type: string, price: number) => {
    const newEvent = { 
      id: events.length + 1, 
      type, 
      data: `{ price: $${price} }`, 
      time: new Date().toLocaleTimeString() 
    };
    setEvents([...events, newEvent]);

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
        }
        setCurrentState({ ...tempState });
      }, (i + 1) * 800);
    });
  };

  return (
    <motion.div
      key="simulation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1fr', gap: '2rem' }}>
        {/* Control Panel */}
        <div className="glass-card">
          <h3 style={{ marginBottom: '1.5rem' }}>
            {isEn ? "E-Commerce Cart Simulation" : "Alışveriş Simülasyonu"}
          </h3>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem' }}>
            <button 
              onClick={() => addEvent('ItemAdded', 50)} 
              className="btn-primary" 
              style={{ background: '#10b981', flex: 1, padding: '12px', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}
            >
              <PackagePlus size={18} /> {isEn ? "Add Item ($50)" : "Ürün Ekle ($50)"}
            </button>
            <button 
              onClick={() => addEvent('ItemRemoved', 50)} 
              className="btn-secondary" 
              style={{ background: '#ef4444', flex: 1, padding: '12px', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}
            >
              <PackageMinus size={18} /> {isEn ? "Remove Item ($50)" : "Çıkar ($50)"}
            </button>
          </div>
          
          <div style={{ paddingTop: '2rem', borderTop: '1px dashed rgba(255,255,255,0.1)' }}>
            <h4 style={{ color: '#6366f1', marginBottom: '1rem' }}>
              {isEn ? "Projected State (Read View)" : "Sistem Durumu (State)"}
            </h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(99, 102, 241, 0.1)', padding: '1.5rem', borderRadius: '16px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'white' }}>{currentState.items}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{isEn ? "ITEMS" : "ADET"}</div>
              </div>
              <ShoppingCart size={32} color="#6366f1" />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: 'white' }}>${currentState.total}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{isEn ? "TOTAL" : "TOPLAM"}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Log */}
        <div className="glass-card" style={{ background: '#020617', border: '1px solid #334155', height: '500px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ListVideo size={20} /> Event Store (Append-Only)
            </h3>
            <button 
              onClick={replayEvents} 
              style={{ background: 'white', color: 'black', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem' }}
            >
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
  );
};

export default EventSourcingSimulationTab;
