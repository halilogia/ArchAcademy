import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  GitBranch, 
  Container, 
  ShieldCheck, 
  Globe, 
  Zap, 
  Share2,
  Server
} from 'lucide-react';
import SEO from '../components/SEO';

interface ArchItem {
  id: string;
  name: string;
  path: string;
  color: string;
  icon: React.ReactNode;
  desc: { tr: string; en: string };
  gridArea: string;
}

const CloudCatalogPage: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const [hoveredItem, setHoveredItem] = useState<ArchItem | null>(null);

  const items: ArchItem[] = [
    { 
      id: 'gitops', 
      name: 'GitOps & IaC', 
      path: '/gitops', 
      color: '#f97316', 
      icon: <GitBranch size={32} />, 
      desc: {
        tr: 'Altyapı ve operasyon süreçlerini kod (Git) üzerinden yönetme.',
        en: 'Managing infrastructure and operational pipelines declaratively via Git as single source of truth.'
      }, 
      gridArea: 'a' 
    },
    { 
      id: 'container', 
      name: 'Container Arch', 
      path: '/containerization', 
      color: '#06b6d4', 
      icon: <Container size={32} />, 
      desc: {
        tr: 'Docker kutuları ve Kubernetes orkestrasyonu.',
        en: 'Docker containerization isolation and Kubernetes cluster orchestration.'
      }, 
      gridArea: 'b' 
    },
    { 
      id: 'serverless', 
      name: 'Serverless (FaaS)', 
      path: '/serverless', 
      color: '#f59e0b', 
      icon: <Zap size={32} />, 
      desc: {
        tr: 'Sunucu yönetimi olmadan sadece fonksiyon kodlama.',
        en: 'Serverless compute execution with zero server management.'
      }, 
      gridArea: 'c' 
    },
    { 
      id: 'microservices', 
      name: 'Microservices', 
      path: '/microservices', 
      color: '#3b82f6', 
      icon: <Share2 size={32} />, 
      desc: {
        tr: 'Monoliti kırıp bağımsız, küçük ve otonom servislere bölme.',
        en: 'Decomposing monoliths into decoupled, autonomous microservices.'
      }, 
      gridArea: 'd' 
    },
    { 
      id: 'zerotrust', 
      name: 'Zero Trust', 
      path: '/zero-trust', 
      color: '#ef4444', 
      icon: <ShieldCheck size={32} />, 
      desc: {
        tr: 'Ağ içindeki hiçbir cihaza güvenme; her isteği doğrula.',
        en: 'Never trust, always verify: Zero Trust network architecture.'
      }, 
      gridArea: 'e' 
    },
    { 
      id: 'soa', 
      name: 'SOA Arch', 
      path: '/soa', 
      color: '#8b5cf6', 
      icon: <Globe size={32} />, 
      desc: {
        tr: 'Kurumsal servis odaklı mimari (Microservices atası).',
        en: 'Enterprise service-oriented architecture with ESB integration.'
      }, 
      gridArea: 'f' 
    },
    { 
      id: 'spacebased', 
      name: 'Space-Based', 
      path: '/space-based', 
      color: '#ec4899', 
      icon: <Server size={32} />, 
      desc: {
        tr: 'Ekstrem ölçeklenme için in-memory veri ızgaraları.',
        en: 'In-memory data grids built for extreme transactional scaling.'
      }, 
      gridArea: 'g' 
    },
    { 
      id: 'bff', 
      name: 'BFF Pattern', 
      path: '/bff', 
      color: '#3b82f6', 
      icon: <Share2 size={32} />, 
      desc: {
        tr: 'Frontend ekiplerinin yönettiği özel backend katmanı.',
        en: 'Backend-for-Frontend tailored API layer for client apps.'
      }, 
      gridArea: 'i' 
    }
  ];

  return (
    <>
      <SEO
        title={isEn ? "Cloud & DevOps Infrastructure Grid | ArchAcademy" : "Bulut & DevOps Altyapı Izgarası | ArchAcademy"}
        description={isEn 
          ? "Interactive honeycomb grid for cloud, containerization, and DevOps architectures." 
          : "Modern bulut, konteyner ve DevOps mimarileri için interaktif petek ızgara."
        }
        keywords="cloud architecture, devops, gitops, containerization, kubernetes, zero trust"
        canonicalUrl="/cloud-catalog"
      />
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
             <h1 className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-2px' }}>
               {isEn ? "Infrastructure Grid" : "Altyapı Izgarası"}
             </h1>
             <p style={{ color: '#94a3b8', fontSize: '1.2rem' }}>
               {isEn ? "Modern cloud, distributed systems, and DevOps architectures" : "Modern altyapı ve operasyon mimarileri"}
             </p>
          </div>

          <div style={{ 
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
             {items.map((item) => {
               const isHovered = hoveredItem?.id === item.id;
               return (
                 <motion.div
                   key={item.id}
                   style={{ 
                     position: 'relative', 
                     display: 'flex', 
                     justifyContent: 'center', 
                     margin: '10px',
                     zIndex: isHovered ? 30 : 1
                   }}
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: isHovered ? 1.12 : 1 }}
                   transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                   onMouseEnter={() => setHoveredItem(item)}
                   onMouseLeave={() => setHoveredItem(null)}
                   onClick={() => navigate(item.path)}
                 >
                    {/* Hexagon Shape */}
                    <div style={{ 
                       width: '180px', 
                       height: '200px', 
                       clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                       background: isHovered 
                         ? 'rgba(30, 41, 59, 0.95)' 
                         : 'rgba(30, 41, 59, 0.75)',
                       backdropFilter: 'blur(10px)',
                       display: 'flex',
                       flexDirection: 'column',
                       alignItems: 'center',
                       justifyContent: 'center',
                       cursor: 'pointer',
                       position: 'relative',
                       transition: 'background 0.2s ease, filter 0.2s ease',
                       filter: isHovered ? `drop-shadow(0 0 10px ${item.color}40)` : 'none'
                    }}>
                       {/* Inner Border using SVG overlay */}
                       <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 100 115" preserveAspectRatio="none">
                          <polygon 
                            points="50,1 99,28 99,86 50,114 1,86 1,28" 
                            fill="none" 
                            stroke={item.color} 
                            strokeWidth={isHovered ? "2.5" : "1.5"} 
                            vectorEffect="non-scaling-stroke" 
                            style={{ transition: 'stroke-width 0.2s ease' }}
                          />
                       </svg>

                       <motion.div 
                         style={{ color: item.color, marginBottom: '10px' }}
                         animate={isHovered ? { scale: 1.1, y: -2 } : { scale: 1, y: 0 }}
                         transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                       >
                          {item.icon}
                       </motion.div>
                       
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
                    </div>

                    {/* Soft & Subtle Hover Glow */}
                    <motion.div 
                       style={{ 
                         position: 'absolute', 
                         inset: -12, 
                         background: item.color, 
                         filter: 'blur(30px)', 
                         zIndex: -1, 
                         borderRadius: '50%',
                         pointerEvents: 'none' 
                       }}
                       animate={{ 
                         opacity: isHovered ? 0.22 : 0, 
                         scale: isHovered ? 1.15 : 0.7 
                       }}
                       transition={{ duration: 0.25, ease: 'easeOut' }}
                    />

                 </motion.div>
               );
             })}
          </div>

          {/* Info Panel Overlap (Bottom Floating Pill) */}
          <AnimatePresence>
             {hoveredItem && (
               <div style={{ position: 'fixed', left: 0, right: 0, bottom: '30px', zIndex: 9999, pointerEvents: 'none', display: 'flex', justifyContent: 'center' }}>
                   <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: 20 }}
                     transition={{ duration: 0.2 }}
                     style={{
                         background: 'rgba(15, 23, 42, 0.95)',
                         border: `1px solid ${hoveredItem.color}`,
                         padding: '1.25rem 2.5rem',
                         borderRadius: '100px',
                         boxShadow: `0 10px 40px rgba(0,0,0,0.6), 0 0 25px ${hoveredItem.color}33`,
                         textAlign: 'center',
                         minWidth: '450px',
                         maxWidth: '90vw',
                         pointerEvents: 'none',
                         backdropFilter: 'blur(12px)'
                     }}
                   >
                       <h3 style={{ color: hoveredItem.color, margin: 0, fontSize: '1.4rem', fontWeight: 800 }}>{hoveredItem.name}</h3>
                       <p style={{ color: '#cbd5e1', margin: '6px 0 0', fontSize: '0.95rem' }}>
                         {isEn ? hoveredItem.desc.en : hoveredItem.desc.tr}
                       </p>
                   </motion.div>
               </div>
             )}
          </AnimatePresence>

        </div>
      </motion.div>
    </>
  );
};

export default CloudCatalogPage;
