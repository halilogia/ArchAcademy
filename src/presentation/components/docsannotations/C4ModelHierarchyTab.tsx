import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Globe, Server, Box, Code } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const C4ModelHierarchyTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const c4Levels = [
    { level: 'Level 1: System Context', color: '#38bdf8', icon: <Globe size={24} color="#38bdf8" />, audience: 'Business Stakeholders & All', desc: isEn ? 'The big picture: Shows users and external systems interacting with our software boundary.' : 'Büyük resim: Kullanıcılar ve dış sistemlerin yazılımımızla olan üst düzey etkileşimi.' },
    { level: 'Level 2: Container', color: '#10b981', icon: <Server size={24} color="#10b981" />, audience: 'Architects & Developers', desc: isEn ? 'Deployable units: Single-page apps, API backend, databases, message queues.' : 'Ayrı ayrı deploy edilebilen birimler: SPA Web uygulaması, API servisi, PostgreSQL, Redis.' },
    { level: 'Level 3: Component', color: '#f59e0b', icon: <Box size={24} color="#f59e0b" />, audience: 'Developers', desc: isEn ? 'Modular groupings within a container: Controllers, Services, Repositories, Security Handlers.' : 'Bir container içindeki modüller: Auth Controller, Payment Service, Order Repository.' },
    { level: 'Level 4: Code', color: '#a855f7', icon: <Code size={24} color="#a855f7" />, audience: 'Engineers', desc: isEn ? 'UML class diagrams and interface contracts (often auto-generated from IDE).' : 'Sınıf diyagramları, arayüzler ve kod seviyesi yapılar (genellikle otomatik üretilir).' }
  ];

  return (
    <motion.div key="c4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          {isEn ? "Simon Brown's C4 Architecture Model" : "Simon Brown'ın C4 Mimari Modeli"}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '800px' }}>
          {isEn 
            ? "Like Google Maps zooming from world view down to street level, the C4 model visualizes software architecture at 4 intuitive hierarchical levels." 
            : "Google Maps gibi dünyadan sokak görünümüne yaklaşma prensibi: Yazılım mimarisini 4 farklı soyutlama seviyesinde (Context -> Container -> Component -> Code) görselleştirir."
          }
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {c4Levels.map((c, i) => (
            <div key={i} style={{ background: '#020617', padding: '1.5rem', borderRadius: '16px', border: '1px solid #1e293b', borderTop: `4px solid ${c.color}` }}>
              <div style={{ marginBottom: '10px' }}>{c.icon}</div>
              <h4 style={{ color: 'white', fontWeight: 800, fontSize: '1.1rem', marginBottom: '4px' }}>{c.level}</h4>
              <div style={{ fontSize: '0.75rem', color: c.color, fontWeight: 700, marginBottom: '8px' }}>Audience: {c.audience}</div>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default C4ModelHierarchyTab;
