import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Hexagon, Zap, MousePointer2, Info } from 'lucide-react';

interface ArchItem {
  name: string;
  path: string;
  color: string;
  desc: string;
}

interface ArchCategory {
  id: string;
  name: string;
  color: string;
  items: ArchItem[];
}

const CatalogPage = () => {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState<ArchItem | null>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.05) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // ByteByteGo 100% Parity Data Matrix
  const categories: ArchCategory[] = [
    {
      id: 'data-centric',
      name: 'Data-Centric',
      color: '#3b82f6',
      items: [
        { name: 'CQRS', path: '/cqrs', color: '#3b82f6', desc: 'Komut ve sorgu sorumluluklarının ayrılması.' },
        { name: 'Event Sourcing', path: '/event-sourcing', color: '#60a5fa', desc: 'Veriyi olaylar dizisi olarak saklama.' }
      ]
    },
    {
      id: 'layered',
      name: 'Layered',
      color: '#2563eb',
      items: [
        { name: 'Clean / Onion', path: '/clean-arch', color: '#2563eb', desc: 'Domain merkezli katmanlı yapılar.' },
        { name: 'n-Tier Architecture', path: '/horizontal', color: '#3b82f6', desc: 'Klasik sorumluluk bazlı katmanlandırma.' }
      ]
    },
    {
      id: 'component',
      name: 'Component-Based',
      color: '#10b981',
      items: [
        { name: 'Object-Oriented', path: '/object-oriented', color: '#10b981', desc: 'Nesne tabanlı modüler tasarım.' },
        { name: 'Microkernel', path: '/microkernel', color: '#059669', desc: 'Eklenti tabanlı çekirdek sistemi.' }
      ]
    },
    {
      id: 'service',
      name: 'Service-Oriented',
      color: '#f43f5e',
      items: [
        { name: 'Plug-in', path: '/plugin', color: '#f43f5e', desc: 'Dinamik modül ekleme mimarisi.' },
        { name: 'SOA Arch', path: '/soa', color: '#fb7185', desc: 'Kurumsal servis haberleşme stratejisi.' },
        { name: 'Broker Styles', path: '/broker', color: '#fda4af', desc: 'Mesaj tabanlı aracı sistemler.' },
        { name: 'Microservices', path: '/system', color: '#f43f5e', desc: 'Bağımsız servisler ekosistemi.' },
        { name: 'Serverless (FaaS)', path: '/serverless', color: '#e11d48', desc: 'Sunucusuz fonksiyon mimarisi.' }
      ]
    },
    {
      id: 'distributed',
      name: 'Distributed System',
      color: '#eab308',
      items: [
        { name: 'Space-Based', path: '/space-based', color: '#eab308', desc: 'In-memory veri hızı ve performans.' },
        { name: 'Peer-to-Peer', path: '/p2p', color: '#facc15', desc: 'Düğümler arası doğrudan iletişim.' }
      ]
    },
    {
      id: 'domain',
      name: 'Domain-Driven',
      color: '#a855f7',
      items: [
        { name: 'Hexagonal', path: '/hexagonal', color: '#a855f7', desc: 'Ports & Adapters soyutlama modeli.' },
        { name: 'DDD Architecture', path: '/ddd', color: '#c084fc', desc: 'Domain odaklı mimari tasarım.' }
      ]
    },
    {
      id: 'event',
      name: 'Event-Driven',
      color: '#f97316',
      items: [
        { name: 'Event-Driven', path: '/eda', color: '#f97316', desc: 'Olay yayıncıları ve dinleyicileri.' },
        { name: 'Publish-Subscribe', path: '/pub-sub', color: '#fb923c', desc: 'Mesaj abonelik haberleşme deseni.' }
      ]
    },
    {
      id: 'concern',
      name: 'Separation of Concern',
      color: '#ec4899',
      items: [
        { name: 'MVC', path: '/mvc-mvvm', color: '#ec4899', desc: 'Model-View-Controller deseni.' },
        { name: 'MVVM', path: '/mvvm', color: '#f472b6', desc: 'Model-View-ViewModel reaktif yapı.' },
        { name: 'MVP', path: '/mvp', color: '#db2777', desc: 'Model-View-Presenter etkileşimi.' }
      ]
    },
    {
      id: 'interpreter',
      name: 'Interpreter',
      color: '#06b6d4',
      items: [
        { name: 'Interpreter Logic', path: '/interpreter', color: '#06b6d4', desc: 'Komut yorumlama mimarisi.' }
      ]
    },
    {
      id: 'concurrency',
      name: 'Concurrency',
      color: '#8b5cf6',
      items: [
        { name: 'Pipe-Filter', path: '/pipe-filter', color: '#8b5cf6', desc: 'Verinin süzgeçlerden akışı.' },
        { name: 'Primary-Secondary', path: '/primary-secondary', color: '#a78bfa', desc: 'Veri replikasyonu ve yedekleme.' },
        { name: 'Choreography', path: '/choreography', color: '#7c3aed', desc: 'Dağıtık olay senkronizasyonu.' },
        { name: 'Orchestration', path: '/orchestration', color: '#8b5cf6', desc: 'Merkezi servis koordinasyonu.' },
        { name: 'Lambda', path: '/lambda', color: '#6366f1', desc: 'Hibrit büyük veri işleme.' },
        { name: 'Kappa', path: '/kappa', color: '#4f46e5', desc: 'Anlık akış odaklı veri işleme.' }
      ]
    }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh', paddingTop: '100px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '4rem', fontWeight: 950 }}>Software <span className="gradient-text">Architecture</span> Matrix</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', opacity: 0.8 }}>ByteByteGo Tasarımı - %100 Uyumlu Eğitim Haritası</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', height: '800px' }}>
            <svg viewBox="0 0 800 800" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
               <defs>
                 {categories.map(cat => (
                   <pattern key={`pat-${cat.id}`} id={`grad-${cat.id}`} patternUnits="userSpaceOnUse" width="100" height="100">
                     <rect width="100" height="100" fill={cat.color} fillOpacity="0.3" />
                   </pattern>
                 ))}
               </defs>

               <motion.g animate={{ rotate: rotation }} style={{ transformOrigin: '400px 400px' }}>
                 <circle cx="400" cy="400" r="100" fill="rgba(255,255,255,0.05)" stroke="white" strokeWidth="1" strokeDasharray="5 5" />
                 <text x="400" y="405" textAnchor="middle" fill="white" fontWeight="900" fontSize="12" style={{ letterSpacing: '2px' }}>MATRIX</text>
               </motion.g>

               {categories.map((cat, catIdx) => {
                 const sliceAngle = 360 / categories.length;
                 const startAngle = catIdx * sliceAngle;
                 
                 return (
                   <g key={cat.id}>
                     {cat.items.map((item, itemIdx) => {
                       const itemSliceAngle = sliceAngle / cat.items.length;
                       const itemStartAngle = startAngle + (itemIdx * itemSliceAngle);
                       const itemEndAngle = itemStartAngle + itemSliceAngle;
                       
                       const radStart = (itemStartAngle - 90) * (Math.PI / 180);
                       const radEnd = (itemEndAngle - 90) * (Math.PI / 180);
                       
                       const innerR = 120;
                       const outerR = 380;
                       
                       const x1_i = 400 + innerR * Math.cos(radStart);
                       const y1_i = 400 + innerR * Math.sin(radStart);
                       const x2_i = 400 + innerR * Math.cos(radEnd);
                       const y2_i = 400 + innerR * Math.sin(radEnd);
                       const x1_o = 400 + outerR * Math.cos(radStart);
                       const y1_o = 400 + outerR * Math.sin(radStart);
                       const x2_o = 400 + outerR * Math.cos(radEnd);
                       const y2_o = 400 + outerR * Math.sin(radEnd);

                       const isHovered = hoveredItem?.name === item.name;

                       return (
                         <motion.path
                           key={item.name}
                           d={`M ${x1_i} ${y1_i} L ${x1_o} ${y1_o} A ${outerR} ${outerR} 0 0 1 ${x2_o} ${y2_o} L ${x2_i} ${y2_i} A ${innerR} ${innerR} 0 0 0 ${x1_i} ${y1_i}`}
                           fill={isHovered ? item.color : 'rgba(255,255,255,0.03)'}
                           stroke={isHovered ? "white" : "rgba(255,255,255,0.1)"}
                           strokeWidth={isHovered ? "2" : "0.5"}
                           onMouseEnter={() => setHoveredItem(item)}
                           onMouseLeave={() => setHoveredItem(null)}
                           onClick={() => navigate(item.path)}
                           style={{ cursor: 'pointer', transition: 'all 0.3s' }}
                         />
                       );
                     })}

                     {/* Inner category label */}
                     {(() => {
                        const midAngle = startAngle + (sliceAngle / 2);
                        const radMid = (midAngle - 90) * (Math.PI / 180);
                        const x = 400 + 170 * Math.cos(radMid);
                        const y = 400 + 170 * Math.sin(radMid);
                        return (
                          <text x={x} y={y} fill={cat.color} fontSize="8" fontWeight="950" textAnchor="middle" style={{ pointerEvents: 'none', transform: `rotate(${midAngle > 90 && midAngle < 270 ? midAngle + 180 : midAngle}deg)`, transformOrigin: `${x}px ${y}px` }}>
                            {cat.name.toUpperCase()}
                          </text>
                        );
                     })()}
                   </g>
                 );
               })}
            </svg>
          </div>

          <div>
             <AnimatePresence mode="wait">
               {hoveredItem ? (
                 <motion.div key={hoveredItem.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-card" style={{ padding: '3rem', border: `2px solid ${hoveredItem.color}44` }}>
                   <div style={{ color: hoveredItem.color, marginBottom: '1.5rem' }}><Info size={32} /></div>
                   <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem' }}>{hoveredItem.name}</h2>
                   <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>{hoveredItem.desc}</p>
                   <button onClick={() => navigate(hoveredItem.path)} style={{ background: hoveredItem.color, color: 'black', width: '100%', padding: '1.2rem', borderRadius: '15px', fontWeight: 900, border: 'none', cursor: 'pointer' }}>İNCELE VE ÖĞREN</button>
                 </motion.div>
               ) : (
                 <div className="glass-card" style={{ padding: '4rem', textAlign: 'center', opacity: 0.5 }}>
                    <MousePointer2 size={48} style={{ margin: '0 auto 1.5rem' }} />
                    <p>Mimarileri keşfetmek için çarkın üzerine gelin.</p>
                 </div>
               )}
             </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CatalogPage;
