import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const PolymorphismTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const shapes = ['circle', 'square', 'triangle'];
  const [polyAction, setPolyAction] = useState(false);

  const triggerPolymorphism = () => {
    setPolyAction(true);
    setTimeout(() => setPolyAction(false), 1000);
  };

  return (
    <motion.div 
      key="polymorphism" 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -10 }} 
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}
    >
      <div>
        <h3 style={{ fontSize: '1.8rem', color: '#f43f5e', marginBottom: '1rem' }}>
          {isEn ? "Many Forms" : "Çok Biçimlilik (Many Forms)"}
        </h3>
        <p style={{ color: '#cbd5e1', lineHeight: 1.6 }}>
          {isEn 
            ? "Different objects responding to the identical command (interface contract) in their own unique, polymorphic implementations." 
            : "Farklı nesnelerin aynı 'komuta' (Interface Method) kendi yapılarına uygun, farklı şekillerde yanıt vermesidir."
          }
        </p>
        <p style={{ color: '#cbd5e1', lineHeight: 1.6, marginTop: '20px' }}>
          {isEn ? "Single Interface Method: " : "Tekil Komut: "}
          <span style={{ color: '#f43f5e', fontWeight: 'bold' }}>.action()</span>
        </p>
        <button 
          onClick={triggerPolymorphism}
          style={{ marginTop: '10px', padding: '10px 20px', background: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
        >
          <Play size={16} color="black" /> {isEn ? "Call .action() on ALL" : "Tümünde .action() Çalıştır"}
        </button>
      </div>
      
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
        {shapes.map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>
            <div style={{ width: '80px', color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>Shape {i+1} ({s})</div>
            <motion.div
              animate={polyAction ? {
                x: [0, 50, 0],
                rotate: s === 'square' ? [0, 180, 0] : 0,
                scale: s === 'circle' ? [1, 1.5, 1] : 1
              } : {}}
              style={{ 
                width: '40px', 
                height: '40px', 
                background: '#f43f5e',
                borderRadius: s === 'circle' ? '50%' : (s === 'square' ? '4px' : '0px'),
                clipPath: s === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'
              }}
            />
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              {polyAction 
                ? (s === 'circle' ? (isEn ? 'Rolling...' : 'Yuvarlanıyor...') : (s === 'square' ? (isEn ? 'Rotating...' : 'Dönüyor...') : (isEn ? 'Sliding...' : 'Kayıyor...'))) 
                : (isEn ? 'Idle' : 'Beklemede')
              }
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default PolymorphismTab;
