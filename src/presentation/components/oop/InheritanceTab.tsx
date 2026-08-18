import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const InheritanceTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const [parentColor, setParentColor] = useState('#f43f5e');

  return (
    <motion.div 
      key="inheritance" 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -10 }} 
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}
    >
      <div>
        <h3 style={{ fontSize: '1.8rem', color: '#f43f5e', marginBottom: '1rem' }}>
          {isEn ? "Family Tree" : "Soy Ağacı (Kalıtım)"}
        </h3>
        <p style={{ color: '#cbd5e1', lineHeight: 1.6 }}>
          {isEn 
            ? "Creating a Parent base class with shared attributes and behaviors, allowing Child classes to inherit common characteristics without duplicate code."
            : "Bir 'Parent' sınıf oluşturup, ortak özellikleri orada tanımlayıp, 'Child' sınıfların bu özellikleri miras almasını (Inherit) sağlamaktır."
          }
        </p>
        <p style={{ color: '#cbd5e1', lineHeight: 1.6, marginTop: '10px' }}>
          {isEn 
            ? "Change the parent color and watch the inherited properties propagate dynamically:" 
            : "Renk ayarını değiştirin, mirasın nasıl aktarıldığını görün:"
          }
        </p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
          {['#f43f5e', '#3b82f6', '#10b981', '#eab308'].map(c => (
            <div 
              key={c} 
              onClick={() => setParentColor(c)}
              style={{ width: '30px', height: '30px', borderRadius: '50%', background: c, cursor: 'pointer', border: parentColor === c ? '2px solid white' : 'none' }} 
            />
          ))}
        </div>
      </div>
      
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Parent */}
        <motion.div 
          animate={{ backgroundColor: parentColor }}
          style={{ padding: '15px 30px', borderRadius: '12px', border: '2px solid white', color: '#fff', fontWeight: 'bold' }}
        >
          GrandParent
        </motion.div>

        <div style={{ height: '30px', width: '2px', background: 'rgba(255,255,255,0.2)' }} />
        
        {/* Children */}
        <div style={{ display: 'flex', gap: '30px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.div 
              animate={{ backgroundColor: parentColor }}
              style={{ width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.8 }}
            >
              Child A
            </motion.div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.div 
              animate={{ backgroundColor: parentColor }}
              style={{ width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.8 }}
            >
              Child B
            </motion.div>
            <span style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '5px' }}>
              {isEn ? "(Reshaped)" : "(Özelleştirilmiş)"}
            </span>
          </div>
        </div>
        <div style={{ marginTop: '20px', fontSize: '0.8rem', color: '#94a3b8' }}>
          {isEn 
            ? "Child classes automatically inherited the Parent backgroundColor state." 
            : "Child sınıflar, Parent rengini (Prop) miras aldı."
          }
        </div>
      </div>
    </motion.div>
  );
};

export default InheritanceTab;
