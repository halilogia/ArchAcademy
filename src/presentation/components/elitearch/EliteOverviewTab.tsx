import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const EliteOverviewTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '2.5rem', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: '#3b82f6' }}>
            {isEn ? "Core Philosophy" : "Felsefe"}
          </h3>
          <p style={{ lineHeight: 1.8, color: '#94a3b8' }}>
            {isEn 
              ? "This architecture ensures that applications remain scalable, strictly testable, and deeply maintainable throughout their lifespan. Dependencies point strictly inwards: UI knows the Model, but Model is 100% decoupled from UI."
              : "Bu mimari, uygulamanın yaşam döngüsü boyunca sürdürülebilir, test edilebilir ve her şeyden önemlisi 'ölçeklenebilir' kalmasını sağlar. Bağımlılıklar her zaman içe doğrudur: UI, Model'den haberdardır ancak Model, UI'dan tamamen bağımsızdır."
            }
          </p>
        </div>

        <div style={{ background: 'rgba(30, 41, 59, 0.5)', padding: '2.5rem', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: '#2dd4bf' }}>
            {isEn ? "Architectural Scope" : "Kapsam"}
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: '#94a3b8' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Zap size={18} color="#2dd4bf" /> {isEn ? "React / Next.js Ecosystem Integration" : "React / React Native Entegrasyonu"}
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Zap size={18} color="#2dd4bf" /> {isEn ? "Zustand & Redux Global State Decoupling" : "Zustand Global State Yönetimi"}
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Zap size={18} color="#2dd4bf" /> {isEn ? "Atomic Design Token Hierarchy" : "Atomic Design UI Hiyerarşisi"}
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default EliteOverviewTab;
