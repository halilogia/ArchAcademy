import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Cloud, 
  Server, 
  GitBranch, 
  Container, 
  ShieldCheck, 
  Globe, 
  Zap, 
  Share2, 
  Lock,
  Hexagon
} from 'lucide-react';

interface ArchItem {
  id: string;
  name: string;
  path: string;
  color: string;
  icon: React.ReactNode;
  desc: string;
  gridArea: string; // CSS Grid Area name
}

const CloudCatalogPage = () => {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState<ArchItem | null>(null);

  const items: ArchItem[] = [
    { id: 'gitops', name: 'GitOps & IaC', path: '/gitops', color: '#f97316', icon: <GitBranch size={32} />, desc: 'Altyapı ve operasyon süreçlerini kod (Git) üzerinden yönetme.', gridArea: 'a' },
    { id: 'container', name: 'Container Arch', path: '/containerization', color: '#06b6d4', icon: <Container size={32} />, desc: 'Docker kutuları ve Kubernetes orkestrasyonu.', gridArea: 'b' },
    { id: 'serverless', name: 'Serverless (FaaS)', path: '/serverless', color: '#f59e0b', icon: <Zap size={32} />, desc: 'Sunucu yönetimi olmadan sadece fonksiyon kodlama.', gridArea: 'c' },
    { id: 'microservices', name: 'Microservices', path: '/microservices', color: '#3b82f6', icon: <Share2 size={32} />, desc: 'Monoliti kırıp bağımsız, küçük ve otonom servislere bölme.', gridArea: 'd' },
    { id: 'cloud-center', name: 'CLOUD & OPS', path: '#', color: '#64748b', icon: <Cloud size={48} />, desc: 'Merkezi Operasyon Üssü', gridArea: 'center' }, // Center Decor
    { id: 'zerotrust', name: 'Zero Trust', path: '/zero-trust', color: '#ef4444', icon: <ShieldCheck size={32} />, desc: 'Ağ içindeki hiçbir cihaza güvenme; her isteği doğrula.', gridArea: 'e' },
    { id: 'soa', name: 'SOA Arch', path: '/soa', color: '#8b5cf6', icon: <Globe size={32} />, desc: 'Kurumsal servis odaklı mimari (Microservices atası).', gridArea: 'f' },
    { id: 'spacebased', name: 'Space-Based', path: '/space-based', color: '#ec4899', icon: <Server size={32} />, desc: 'Ekstrem ölçeklenme için in-memory veri ızgaraları.', gridArea: 'g' },
    { id: 'security', name: 'Security Arch', path: '/security', color: '#10b981', icon: <Lock size={32} />, desc: 'Savunma derinliği ve güvenlik katmanları.', gridArea: 'h' }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: '#0f172a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      
      {/* Background Tech Lines */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
         <svg width="100%" height="100%" opacity="0.1">
            <pattern id="hex-bg" width="60" height="104" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
               <path d="M30 0 L60 17 L60 52 L30 69 L0 52 L0 17 Z" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#hex-bg)" />
         </svg>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
           <h1 className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-2px' }}>Infrastructure Grid</h1>
           <p style={{ color: '#94a3b8', fontSize: '1.2rem' }}>Modern altyapı ve operasyon mimarileri</p>
        </div>

        {/* Honeycomb Grid Layout */}
        <div style={{ 
          display: 'grid',
          gridTemplateAreas: `
            ". a b ."
            "h center c"
            "g f d"
            ". e . ."
          `,
          gap: '20px',
          justifyContent: 'center',
          alignItems: 'center',
          transform: 'scale(0.9)', // Adjust scale to fit
        }}>
           {items.map((item) => (
             <motion.div
               key={item.id}
               style={{ gridArea: item.gridArea, position: 'relative', display: 'flex', justifyContent: 'center' }}
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               whileHover={{ scale: 1.1, zIndex: 20 }}
               transition={{ type: 'spring', stiffness: 200, damping: 15 }}
               onMouseEnter={() => setHoveredItem(item)}
               onMouseLeave={() => setHoveredItem(null)}
               onClick={() => item.id !== 'cloud-center' && navigate(item.path)}
             >
                {/* Hexagon Shape */}
                <div style={{ 
                   width: '180px', 
                   height: '200px', 
                   clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                   background: item.id === 'cloud-center' ? 'rgba(255,255,255,0.05)' : 'rgba(30, 41, 59, 0.8)',
                   backdropFilter: 'blur(10px)',
                   display: 'flex',
                   flexDirection: 'column',
                   alignItems: 'center',
                   justifyContent: 'center',
                   cursor: item.id === 'cloud-center' ? 'default' : 'pointer',
                   border: 'none', // Clip-path handles shape, border tricky
                   position: 'relative'
                }}>
                   {/* Inner Border using pseudo or careful overlay - simpler to use SVG overlay */}
                   <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 100 115" preserveAspectRatio="none">
                      <polygon points="50,1 99,28 99,86 50,114 1,86 1,28" fill="none" stroke={item.color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
                   </svg>

                   <motion.div 
                     style={{ color: item.color, marginBottom: '10px' }}
                     animate={item.id === 'cloud-center' ? { opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] } : {}}
                     transition={{ duration: 3, repeat: Infinity }}
                   >
                      {item.icon}
                   </motion.div>
                   
                   {item.id !== 'cloud-center' && (
                     <span style={{ 
                       color: 'white', 
                       fontWeight: 700, 
                       fontSize: '0.9rem', 
                       textAlign: 'center', 
                       maxWidth: '120px',
                       textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                     }}>
                       {item.name}
                     </span>
                   )}
                </div>

                {/* Hover Glow */}
                <motion.div 
                   style={{ 
                     position: 'absolute', inset: -20, background: item.color, 
                     filter: 'blur(40px)', opacity: 0, zIndex: -1, borderRadius: '50%' 
                   }}
                   whileHover={{ opacity: 0.4 }}
                />

             </motion.div>
           ))}
        </div>

        {/* Info Panel Overlap (Bottom) */}
        <AnimatePresence>
           {hoveredItem && hoveredItem.id !== 'cloud-center' && (
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: 20 }}
               style={{
                  position: 'fixed',
                  bottom: '30px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(15, 23, 42, 0.95)',
                  border: `1px solid ${hoveredItem.color}`,
                  padding: '1.5rem 3rem',
                  borderRadius: '100px',
                  boxShadow: `0 10px 40px rgba(0,0,0,0.5)`,
                  textAlign: 'center',
                  minWidth: '500px',
                  zIndex: 50
               }}
             >
                <h3 style={{ color: hoveredItem.color, margin: 0, fontSize: '1.5rem' }}>{hoveredItem.name}</h3>
                <p style={{ color: '#cbd5e1', margin: '5px 0 0', fontSize: '1rem' }}>{hoveredItem.desc}</p>
             </motion.div>
           )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
};

export default CloudCatalogPage;
