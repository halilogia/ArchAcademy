import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Database } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const ECSPrinciplesDeepDive: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const principles = [
    { 
      title: isEn ? 'Entity (Identity)' : 'Entity (Kimlik)', 
      text: isEn 
        ? 'A lightweight ID with zero inherent data or behaviour. Serves purely as a conceptual bucket indexing attached components.' 
        : 'Kendi başına hiçbir veri veya kod içermeyen bir "Kimlik"tir. Sadece hangi bileşenlerin ona bağlı olduğunu belirten bir kaptır.', 
      color: '#10b981' 
    },
    { 
      title: isEn ? 'Component (Pure Data)' : 'Component (Ham Veri)', 
      text: isEn 
        ? 'Flat memory structs containing state variables (Position, Health, Mesh). Zero methods or execution logic.' 
        : 'Sadece ham veri içerir (Pozisyon, Enerji vb.). Hiçbir "logic" barındırmaz. Bir C yapısı (Struct) gibi düşünülebilir.', 
      color: '#3b82f6' 
    },
    { 
      title: isEn ? 'System (Logic Engine)' : 'System (İş Mantığı)', 
      text: isEn 
        ? 'Stateless loop processors that query matching entity Archetypes and transform arrays in parallel every tick.' 
        : 'Belli bileşenlere sahip tüm "Entity"leri filtreler ve her karede (frame) mantığı (hareket, çarpışma vb.) işletir.', 
      color: '#f43f5e' 
    }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '10rem' }}>
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '2rem' }}>
          {isEn ? "The Core Trinity: " : "Üç Silahşörler: "}<span style={{ color: '#10b981' }}>E, C & S</span>
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {principles.map((item, idx) => (
            <div key={idx} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', borderLeft: `4px solid ${item.color}` }}>
              <h4 style={{ color: item.color, fontWeight: 900, marginBottom: '0.5rem' }}>{item.title}</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </motion.div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div style={{ padding: '2rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '30px', border: '1px solid rgba(16, 185, 129, 0.2)', textAlign: 'center' }}>
          <Activity size={40} color="#10b981" style={{ marginBottom: '1rem' }} />
          <div style={{ fontSize: '2rem', fontWeight: 900 }}>100k+</div>
          <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{isEn ? "Active Entities (60 FPS)" : "Aktif Entity (60 FPS)"}</div>
        </div>
        <div style={{ padding: '2rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '30px', border: '1px solid rgba(59, 130, 246, 0.2)', textAlign: 'center' }}>
          <Database size={40} color="#3b82f6" style={{ marginBottom: '1rem' }} />
          <div style={{ fontSize: '2rem', fontWeight: 900 }}>%90+</div>
          <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{isEn ? "L1/L2 Cache Hit Rate" : "Cache Efficiency"}</div>
        </div>
        <div style={{ gridColumn: 'span 2', padding: '2rem', background: 'rgba(244, 63, 94, 0.05)', borderRadius: '30px', border: '1px solid rgba(244, 63, 94, 0.1)' }}>
          <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
            {isEn 
              ? '"In OOP, data is scattered across heap pointers. In ECS, contiguous memory arrays marching like a disciplined army."' 
              : '"OOP\'de veri belleğe dağılır, ECS\'de ise bir ordu gibi yan yana dizilir."'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default ECSPrinciplesDeepDive;
