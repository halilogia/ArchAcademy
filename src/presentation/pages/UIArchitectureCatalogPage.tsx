import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  monitor, 
  Layout, 
  MousePointerClick, 
  Palette, 
  Component, 
  Server, 
  Split, 
  Zap, 
  Layers, 
  Box, 
  RefreshCcw 
} from 'lucide-react'; // Simulating imports, actual icons below

import { 
  Monitor, 
  LayoutTemplate, 
  Pointer, 
  PaintBucket, 
  Puzzle, 
  Server as ServerIcon, 
  GitMerge, 
  Activity, 
  Cpu
} from 'lucide-react';

interface UIArchItem {
  id: string;
  name: string;
  path: string;
  color: string;
  icon: React.ReactNode;
  desc: string;
}

const UIArchitectureCatalogPage = () => {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState<UIArchItem | null>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.05) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const items: UIArchItem[] = [
    { id: 'atomic', name: 'Atomic Design', path: '/atomic-design', color: '#f97316', icon: <Box size={24} />, desc: 'Arayüzü atomlardan sayfalara hiyerarşik inşa etme.' },
    { id: 'sdui', name: 'Server-Driven UI', path: '/server-driven-ui', color: '#818cf8', icon: <ServerIcon size={24} />, desc: 'Ekran tasarımını backend JSON yanıtlarıyla yönetme.' },
    { id: 'islands', name: 'Islands Arch', path: '/islands-arch', color: '#0ea5e9', icon: <LayoutTemplate size={24} />, desc: 'Statik HTML içinde interaktif adacıklar.' },
    { id: 'tokens', name: 'Design Tokens', path: '/design-tokens', color: '#fb923c', icon: <PaintBucket size={24} />, desc: 'Renk, font ve boşlukların merkezi yönetimi.' },
    { id: 'micro', name: 'Micro-Frontends', path: '/micro-frontends', color: '#ec4899', icon: <GitMerge size={24} />, desc: 'Frontend uygulamasını bağımsız parçalara bölme.' },
    { id: 'state', name: 'State-Driven UI', path: '/state-driven', color: '#22c55e', icon: <RefreshCcw size={24} />, desc: 'UI = f(State). Reaktif arayüz paradigması.' },
    { id: 'cdd', name: 'Component-Driven', path: '/component-driven', color: '#f43f5e', icon: <Puzzle size={24} />, desc: 'Sayfalardan değil, bileşenlerden başlama (CDD).' },
    { id: 'composite', name: 'Composite UI', path: '/composite-ui', color: '#8b5cf6', icon: <Layers size={24} />, desc: 'Farklı modüllerin runtime anında birleşmesi.' }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: '#0f172a', minHeight: '100vh', paddingTop: '100px', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', height: 'calc(100vh - 120px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Central Hub */}
        <div style={{ position: 'absolute', zIndex: 10, textAlign: 'center' }}>
          <motion.div 
            animate={{ boxShadow: ['0 0 20px #6366f1', '0 0 50px #6366f1', '0 0 20px #6366f1'] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ width: '130px', height: '130px', borderRadius: '50%', background: '#1e1b4b', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '4px solid #6366f1' }}
          >
             <Monitor size={40} color="#818cf8" />
             <div style={{ color: 'white', fontWeight: 900, fontSize: '1rem', marginTop: '8px' }}>UI ARCH</div>
             <div style={{ color: '#818cf8', fontSize: '0.7rem' }}>CATALOG</div>
          </motion.div>
        </div>

        {/* Orbiting Items */}
        <motion.div 
          animate={{ rotate: rotation }} 
          style={{ width: '500px', height: '500px', position: 'absolute', borderRadius: '50%', border: '1px dashed rgba(255,255,255,0.1)' }}
        >
          {items.map((item, index) => {
            const angle = (360 / items.length) * index;
            const rad = angle * (Math.PI / 180);
            const radius = 250;
            const x = radius * Math.cos(rad) + 250 - 35; // Center offset (Half of container - Half of item)
            const y = radius * Math.sin(rad) + 250 - 35;

            const isHovered = hoveredItem?.id === item.id;

            return (
              <motion.div
                key={item.id}
                style={{ 
                   position: 'absolute', top: 0, left: 0, 
                   x, y,
                   width: '70px', height: '70px', borderRadius: '50%',
                   background: '#1e293b',
                   border: `2px solid ${item.color}`,
                   display: 'flex', alignItems: 'center', justifyContent: 'center',
                   cursor: 'pointer',
                   boxShadow: isHovered ? `0 0 30px ${item.color}` : `0 0 10px ${item.color}44`,
                   zIndex: 20
                }}
                whileHover={{ scale: 1.2 }}
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => navigate(item.path)}
              >
                  <motion.div
                     animate={{ rotate: -rotation }} // Counter rotate to keep icon upright
                     style={{ color: item.color }}
                  >
                     {React.cloneElement(item.icon as React.ReactElement, { size: 20 })}
                  </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Details Panel */}
        <AnimatePresence>
          {hoveredItem && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              style={{
                position: 'absolute',
                bottom: '5%',
                background: 'rgba(15, 23, 42, 0.95)',
                backdropFilter: 'blur(16px)',
                border: `1px solid ${hoveredItem.color}`,
                padding: '2rem',
                borderRadius: '24px',
                textAlign: 'center',
                maxWidth: '600px',
                width: '90%',
                zIndex: 30,
                boxShadow: `0 20px 50px -10px rgba(0,0,0,0.5)`
              }}
            >
               <h2 style={{ color: hoveredItem.color, margin: 0, fontSize: '2rem', fontWeight: 800 }}>{hoveredItem.name}</h2>
               <p style={{ color: '#cbd5e1', marginTop: '10px', fontSize: '1.1rem', lineHeight: 1.6 }}>{hoveredItem.desc}</p>
            </motion.div>
          )}
        </AnimatePresence>
        
      </div>
    </motion.div>
  );
};

export default UIArchitectureCatalogPage;
