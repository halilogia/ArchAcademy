import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Cloud, 
  Server, 
  GitBranch, 
  Container, 
  ShieldCheck, 
  Globe, 
  Zap, 
  Share2
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
        tr: 'Altyapı ve operasyon süreçlerini deklaratif kod (Git) üzerinden yönetme.',
        en: 'Managing infrastructure and operational pipelines declaratively via Git as the single source of truth.'
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
        tr: 'Docker konteyner izolasyonu ve Kubernetes cluster orkestrasyonu.',
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
        tr: 'Sunucu yönetimi olmadan olay güdümlü fonksiyon kodlama (AWS Lambda).',
        en: 'Event-driven compute and on-demand function execution without server management.'
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
        en: 'Decomposing monoliths into loosely-coupled, independently deployable autonomous services.'
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
        tr: 'Ağ içindeki hiçbir varlığa güvenme; her isteği sürekli doğrula.',
        en: 'Never trust, always verify: Micro-segmentation and continuous authentication across all perimeters.'
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
        tr: 'Kurumsal servis odaklı mimari (Enterprise Service Bus temelli).',
        en: 'Service-Oriented Architecture for enterprise integration using Enterprise Service Buses.'
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
        tr: 'Ekstrem ölçeklenme için in-memory dağıtık RAM veri ızgaraları.',
        en: 'In-memory distributed shared spaces for ultra-high concurrency and extreme scalability.'
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
        tr: 'Farklı frontend (Mobil, Web) istemcileri için optimize edilmiş özel API katmanı.',
        en: 'Backend for Frontend: Tailored API gateways designed specifically for distinct client interfaces.'
      }, 
      gridArea: 'i' 
    }
  ];

  return (
    <>
      <SEO 
        title={isEn ? "Cloud & Infrastructure Architectures Grid | ArchAcademy" : "Bulut & Altyapı Mimarileri Kataloğu | ArchAcademy"}
        description={isEn 
          ? "Interactive infrastructure grid: Microservices, Serverless, GitOps, Containerization, Zero Trust, and Space-Based." 
          : "Bulut ve altyapı mimarileri interaktif ızgara: Mikroservisler, Serverless, GitOps, Konteynerizasyon ve Sıfır Güven."
        }
        keywords="cloud architecture, microservices, serverless, gitops, zero trust, kubernetes, bff pattern"
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
               {isEn ? "Infrastructure Grid" : "Altyapı Kataloğu"}
             </h1>
             <p style={{ color: '#94a3b8', fontSize: '1.2rem' }}>
               {isEn ? "Modern cloud, distributed systems, and operational architectures" : "Modern bulut, dağıtık sistemler ve operasyon mimarileri"}
             </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem'
          }}>
            {items.map((item) => (
              <motion.div
                key={item.id}
                onClick={() => navigate(item.path)}
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="glass-card"
                style={{
                  cursor: 'pointer',
                  borderTop: `4px solid ${item.color}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  padding: '2rem'
                }}
              >
                <div style={{ color: item.color }}>{item.icon}</div>
                <h3 style={{ margin: 0, color: 'white', fontSize: '1.3rem' }}>{item.name}</h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {isEn ? item.desc.en : item.desc.tr}
                </p>
                <span style={{ marginTop: 'auto', fontSize: '0.8rem', color: item.color, fontWeight: 700 }}>
                  {isEn ? "Explore Architecture →" : "Mimariyi İncele →"}
                </span>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.div>
    </>
  );
};

export default CloudCatalogPage;
