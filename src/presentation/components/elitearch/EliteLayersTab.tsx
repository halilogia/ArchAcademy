import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Shield, Database } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const EliteLayersTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const layers = [
    {
      label: isEn ? 'PRESENTATION LAYER' : 'SUNUM KATMANI (Presentation)',
      desc: isEn 
        ? 'Pure UI Views combined with ViewModels. Built strictly using Atomic Design component principles.'
        : 'View (Saf JSX) ve ViewModel (UI Logic) birleşimidir. Atomic Design prensipleriyle inşa edilir.',
      color: '#3b82f6',
      icon: <Layout />
    },
    {
      label: isEn ? 'DOMAIN / BUSINESS LOGIC LAYER' : 'İŞ MANTIĞI KATMANI (Domain)',
      desc: isEn 
        ? 'Pure Use Cases, Domain Rules, and Entities. Defines what the application does, totally free of UI or external dependencies.'
        : 'UseCase\'ler, Saf Logic fonksiyonları ve Entity\'ler. Uygulamanın "ne yaptığı" burada tanımlanır. Bağımlılıksızdır.',
      color: '#8b5cf6',
      icon: <Shield />
    },
    {
      label: isEn ? 'INFRASTRUCTURE / DATA LAYER' : 'ALTYAPI KATMANI (Data/Infrastructure)',
      desc: isEn 
        ? 'State stores, HTTP clients, Cache and Adapters. Transforms raw external data into clean Domain models.'
        : 'Zustand Store, API Servisleri ve Mapper\'lar. Dış veri burada ehilleştirilir ve Domain modeline dönüştürülür.',
      color: '#ec4899',
      icon: <Database />
    }
  ];

  return (
    <motion.div key="layers" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {layers.map((layer, i) => (
          <div key={i} style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
            background: 'rgba(30, 41, 59, 0.3)',
            padding: '2rem',
            borderRadius: '24px',
            border: `1px solid ${layer.color}22`,
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ padding: '1.5rem', borderRadius: '16px', background: `${layer.color}11`, color: layer.color }}>
              {layer.icon}
            </div>
            <div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: layer.color, marginBottom: '0.5rem' }}>{layer.label}</h4>
              <p style={{ color: '#94a3b8', lineHeight: 1.6 }}>{layer.desc}</p>
            </div>
            <div style={{ position: 'absolute', right: -20, top: -20, fontSize: '8rem', fontWeight: 900, opacity: 0.03, pointerEvents: 'none' }}>
              {i + 1}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default EliteLayersTab;
