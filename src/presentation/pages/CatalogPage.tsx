import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Hexagon, Zap, MousePointer2 } from 'lucide-react';

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
      setRotation(prev => (prev + 0.08) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const categories: ArchCategory[] = [
    {
      id: 'layered',
      name: 'Layered & Clean',
      color: '#3b82f6',
      items: [
        { name: 'Clean Architecture', path: '/clean-arch', color: '#3b82f6', desc: 'Uncle Bob un sürdürülebilir kurumsal mimarisi.' },
        { name: 'Onion Architecture', path: '/onion', color: '#60a5fa', desc: 'Domain modelini merkeze alan katmanlı yapı.' },
        { name: 'Horizontal (n-tier)', path: '/horizontal', color: '#2563eb', desc: 'Klasik sorumluluk bazlı katmanlandırma.' }
      ]
    },
    {
      id: 'modular',
      name: 'Modular Styles',
      color: '#10b981',
      items: [
        { name: 'Microkernel', path: '/microkernel', color: '#10b981', desc: 'Eklenti tabanlı çekirdek sistemi tasarımı.' },
        { name: 'Evolutionary', path: '/evolution', color: '#34d399', desc: 'Zamanla evrilebilen esnek yapılar.' },
        { name: 'Object-Oriented', path: '/object-oriented', color: '#059669', desc: 'Nesne tabanlı modüler tasarım disiplini.' }
      ]
    },
    {
      id: 'service',
      name: 'Service Web',
      color: '#f43f5e',
      items: [
        { name: 'Microservices', path: '/system', color: '#f43f5e', desc: 'Dağıtık ve bağımsız servisler ekosistemi.' },
        { name: 'SOA Architecture', path: '/soa', color: '#fb7185', desc: 'Kurumsal servis haberleşme stratejileri.' },
        { name: 'Serverless', path: '/serverless', color: '#fda4af', desc: 'Altyapı yönetimi gerektirmeyen yapı.' }
      ]
    },
    {
      id: 'dist',
      name: 'Distributed Systems',
      color: '#eab308',
      items: [
        { name: 'Space-Based', path: '/space-based', color: '#eab308', desc: 'In-memory veri hızı ve performans.' },
        { name: 'Peer-to-Peer', path: '/p2p', color: '#facc15', desc: 'Düğümler arası doğrudan iletişim.' },
        { name: 'Broker Styles', path: '/broker', color: '#ca8a04', desc: 'Mesaj tabanlı aracı sistemler.' }
      ]
    },
    {
      id: 'event',
      name: 'Event-Driven Patterns',
      color: '#f97316',
      items: [
        { name: 'Event-Driven (EDA)', path: '/eda', color: '#f97316', desc: 'Olay yayıncıları ve dinleyicileri arası akış.' },
        { name: 'Orchestration', path: '/orchestration', color: '#fb923c', desc: 'Merkezi servis akışı yönetimi.' },
        { name: 'Choreography', path: '/choreography', color: '#ea580c', desc: 'Merkeziyetsiz olay senkronizasyonu.' }
      ]
    },
    {
      id: 'interaction',
      name: 'Interaction Styles',
      color: '#ec4899',
      items: [
        { name: 'MVC / MVVM', path: '/mvc-mvvm', color: '#ec4899', desc: 'Arayüz ve veri ayrımı tasarım desenleri.' },
        { name: 'Pipe-Filter', path: '/pipe-filter', color: '#f472b6', desc: 'Verinin süzgeçlerden geçerek işlendiği akış.' },
        { name: 'Interpreter Logic', path: '/interpreter', color: '#db2777', desc: 'Komutların doğrudan yorumlandığı mimariler.' }
      ]
    },
    {
      id: 'logic',
      name: 'Domain & Logic',
      color: '#8b5cf6',
      items: [
        { name: 'Hexagonal', path: '/hexagonal', color: '#8b5cf6', desc: 'Ports & Adapters soyutlama modeli.' },
        { name: 'Vertical Slice', path: '/vertical', color: '#a78bfa', desc: 'Özellik bazlı dikey dilimleme disiplini.' }
      ]
    },
    {
      id: 'data',
      name: 'Data Architectures',
      color: '#6366f1',
      items: [
        { name: 'Event Sourcing', path: '/event-sourcing', color: '#6366f1', desc: 'Veriyi olaylar dizisi olarak saklama.' },
        { name: 'Big Data (Lambda)', path: '/big-data', color: '#818cf8', desc: 'Lambda ve Kappa veri işleme stratejileri.' }
      ]
    }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh', paddingTop: '100px', overflowX: 'hidden' }}>
      <div className="container" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '35%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)', opacity: 0.2, zIndex: 0 }} />
        
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 950, margin: '1rem 0', letterSpacing: '-px' }}>Mimari <span className="gradient-text">Katalog</span></h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '750px', margin: '0 auto', lineHeight: 1.6 }}>Hızlı erişim için pusulayı kullanın. Disiplinler üst bar menüsündedir.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(600px, 1.3fr) 400px', gap: '3rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', height: '800px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
             <svg viewBox="0 0 800 800" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
               <defs>
                 {categories.map(cat => (
                   <linearGradient key={`vibrant-grad-${cat.id}`} id={`vibrant-grad-${cat.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                     <stop offset="0%" stopColor={cat.color} stopOpacity="0.7" />
                     <stop offset="50%" stopColor={cat.color} stopOpacity="0.4" />
                     <stop offset="100%" stopColor={cat.color} stopOpacity="0.2" />
                   </linearGradient>
                 ))}
                 <filter id="glow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="5" result="blur" /><feComposite in="SourceGraphic" in2="blur" operator="over" /></filter>
               </defs>

               <motion.g animate={{ rotate: rotation }} style={{ transformOrigin: '400px 400px' }}>
                 <circle cx="400" cy="400" r="115" fill="rgba(10, 15, 30, 0.95)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                 <circle cx="400" cy="400" r="100" fill="transparent" stroke="var(--primary)" strokeWidth="3" strokeDasharray="15,10" opacity="0.7" />
               </motion.g>

               <foreignObject x="320" y="375" width="160" height="50">
                <div style={{ color: 'white', textAlign: 'center', fontSize: '1rem', fontWeight: 950, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', letterSpacing: '3px', textShadow: '0 0 15px var(--primary)' }}>ARCHITECT</div>
              </foreignObject>

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
                       const innerR = 130; const outerR = 375;
                       const x1_i = 400 + innerR * Math.cos(radStart); const y1_i = 400 + innerR * Math.sin(radStart);
                       const x2_i = 400 + innerR * Math.cos(radEnd);   const y2_i = 400 + innerR * Math.sin(radEnd);
                       const x1_o = 400 + outerR * Math.cos(radStart); const y1_o = 400 + outerR * Math.sin(radStart);
                       const x2_o = 400 + outerR * Math.cos(radEnd);   const y2_o = 400 + outerR * Math.sin(radEnd);
                       const isHovered = hoveredItem?.name === item.name;
                       return (
                         <motion.path key={item.name} d={`M ${x1_i} ${y1_i} L ${x1_o} ${y1_o} A ${outerR} ${outerR} 0 0 1 ${x2_o} ${y2_o} L ${x2_i} ${y2_i} A ${innerR} ${innerR} 0 0 0 ${x1_i} ${y1_i}`} fill={isHovered ? item.color : `url(#vibrant-grad-${cat.id})`} stroke={isHovered ? "white" : "rgba(255,255,255,0.1)"} strokeWidth={isHovered ? "3" : "1"} animate={{ scale: isHovered ? 1.05 : 1, filter: isHovered ? 'url(#glow)' : 'none' }} style={{ cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} onMouseEnter={() => setHoveredItem(item)} onMouseLeave={() => setHoveredItem(null)} onClick={() => navigate(item.path)} />
                       );
                     })}
                     {(() => {
                        const midAngle = startAngle + (sliceAngle / 2); const radMid = (midAngle - 90) * (Math.PI / 180);
                        const x = 400 + 265 * Math.cos(radMid); const y = 400 + 265 * Math.sin(radMid);
                        return ( <text x={x} y={y} fill="#fff" fontSize="10" fontWeight="950" textAnchor="middle" style={{ pointerEvents: 'none', textShadow: '0 2px 10px rgba(0,0,0,0.9)', transform: `rotate(${midAngle > 90 && midAngle < 270 ? midAngle + 180 : midAngle}deg)`, transformOrigin: `${x}px ${y}px` }}> {cat.name.toUpperCase()} </text> );
                     })()}
                   </g>
                 );
               })}
             </svg>
          </div>

          <div style={{ position: 'sticky', top: '150px' }}>
            <AnimatePresence mode="wait">
              {hoveredItem ? (
                <motion.div key={hoveredItem.name} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass-card" style={{ padding: '3rem', borderRadius: '40px', border: `2px solid ${hoveredItem.color}66`, background: `linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, ${hoveredItem.color}22 100%)`, boxShadow: `0 30px 80px rgba(0,0,0,0.6), 0 0 60px ${hoveredItem.color}33` }}>
                  <Hexagon size={32} color={hoveredItem.color} style={{ marginBottom: '1.5rem' }} />
                  <h2 style={{ fontSize: '2.8rem', fontWeight: 950, margin: '0 0 1rem', color: 'white' }}>{hoveredItem.name}</h2>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.25rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>{hoveredItem.desc}</p>
                  <button onClick={() => navigate(hoveredItem.path)} style={{ background: hoveredItem.color, color: 'black', width: '100%', padding: '1.2rem', borderRadius: '20px', fontWeight: 950, border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}>Eğitime Bağlan <Zap size={20} /></button>
                </motion.div>
              ) : (
                <div className="glass-card" style={{ padding: '4rem', textAlign: 'center', borderRadius: '40px', background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)' }}>
                   <MousePointer2 size={60} color="var(--primary)" style={{ margin: '0 auto 2rem', opacity: 0.5 }} />
                   <h3 style={{ fontSize: '1.6rem', fontWeight: 800 }}>Müfredat Matrisi</h3>
                   <p style={{ marginTop: '1rem', opacity: 0.6 }}>Sistemi keşfetmek için dilimlerin üzerine gelin.</p>
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
