import React from 'react';
import { motion } from 'framer-motion';
import { Box, Layers, Sparkles, LayoutGrid } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const ComponentAtomicDesignTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const hierarchy = [
    { name: '1. Atoms (Atomlar)', items: 'Button, Input, Badge, Icon', color: '#38bdf8', desc: isEn ? 'Foundational irreducible building blocks.' : 'Daha küçük parçalara bölünemeyen temel yapı taşları.' },
    { name: '2. Molecules (Moleküller)', items: 'SearchBar (Input + Button), UserAvatarBadge', color: '#10b981', desc: isEn ? 'Simple combinations of atoms doing one unit job.' : 'Bir araya gelen atomların oluşturduğu tek amaçlı minik gruplar.' },
    { name: '3. Organisms (Organizmalar)', items: 'Navbar, ProductCardGrid, HeroHeader', color: '#f59e0b', desc: isEn ? 'Complex UI sections forming distinct interfaces.' : 'Moleküller ve atomların birleşimiyle oluşan zengin arayüz bölümleri.' },
    { name: '4. Templates (Şablonlar)', items: 'DashboardLayout, AuthModalContainer', color: '#a855f7', desc: isEn ? 'Wireframe layouts dictating structural flow.' : 'Sayfa yerleşimini ve veri akışını belirleyen iskelet yapılar.' }
  ];

  return (
    <motion.div key="atomic" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          {isEn ? "Component-Driven Development & Atomic Design" : "Bileşen Odaklı Geliştirme (CDD) ve Atomic Design"}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '800px' }}>
          {isEn 
            ? "Brad Frost's Atomic Design methodology constructs robust user interfaces from the bottom up. Independent, testable UI components assembled like Lego bricks." 
            : "Brad Frost'un Atomic Design felsefesi: Arayüzleri en küçük parçalardan (Atomlar) başlatıp en büyük sayfalara doğru Lego gibi adım adım inşa etme metodolojisidir."
          }
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {hierarchy.map((h, i) => (
            <div key={i} style={{ background: '#020617', padding: '1.5rem', borderRadius: '16px', borderTop: `4px solid ${h.color}`, border: '1px solid #1e293b' }}>
              <h4 style={{ color: h.color, fontWeight: 800, fontSize: '1.1rem', marginBottom: '6px' }}>{h.name}</h4>
              <div style={{ fontSize: '0.8rem', color: '#cbd5e1', fontFamily: 'monospace', marginBottom: '10px' }}>{h.items}</div>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ComponentAtomicDesignTab;
