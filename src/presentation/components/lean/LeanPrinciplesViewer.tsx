import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LEAN_PRINCIPLES } from '../../../data/leanPrinciplesData';

export const LeanPrinciplesViewer: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState(0);

  const currentPrinciple = LEAN_PRINCIPLES[activeTab];

  return (
    <section style={{ padding: '120px 0', background: 'rgba(0,0,0,0.2)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: 950, letterSpacing: '-2px' }}>
            {isEn ? "7 Principles of Lean Software" : "7 Yalın Mimari Prensibi"}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
            {isEn 
              ? "The genetic code and waste-elimination blueprint for high-velocity software systems." 
              : "Başarılı modern sistemlerin genetik kodu ve israfsız üretim stratejisi."
            }
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(350px, 1fr) 2fr', gap: '4rem', minHeight: '600px' }}>
          {/* Menu */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {LEAN_PRINCIPLES.map((p, idx) => (
              <motion.div
                key={p.id}
                onClick={() => setActiveTab(idx)}
                whileHover={{ x: 10, background: 'rgba(255,255,255,0.05)' }}
                style={{ 
                  padding: '1.5rem', 
                  background: activeTab === idx ? 'rgba(132, 204, 22, 0.1)' : 'rgba(255,255,255,0.02)', 
                  borderLeft: `4px solid ${activeTab === idx ? p.color : 'transparent'}`,
                  borderRadius: '0 20px 20px 0',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.2rem',
                  transition: 'all 0.4s'
                }}
              >
                <div style={{ 
                  width: '40px', height: '40px', 
                  borderRadius: '12px', 
                  background: activeTab === idx ? p.color : 'rgba(255,255,255,0.05)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: activeTab === idx ? '#0f172a' : 'rgba(255,255,255,0.4)',
                  transition: 'all 0.3s'
                }}>
                  {React.createElement(p.icon, { size: 20 })}
                </div>
                <span style={{ 
                  fontWeight: activeTab === idx ? 800 : 500, 
                  fontSize: '1.1rem',
                  color: activeTab === idx ? 'white' : 'rgba(255,255,255,0.5)' 
                }}>
                  {p.title}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Content Display */}
          <div style={{ position: 'relative' }}>
            <AnimatePresence mode="wait">
               <motion.div
                 key={activeTab}
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 className="glass-card"
                 style={{ 
                   height: '100%', 
                   padding: '5rem', 
                   borderTop: `8px solid ${currentPrinciple.color}`,
                   display: 'flex',
                   flexDirection: 'column',
                   justifyContent: 'center',
                   background: `linear-gradient(135deg, rgba(255,255,255,0.02) 0%, ${currentPrinciple.color}08 100%)`
                 }}
               >
                  <div style={{ 
                    width: '100px', height: '100px', 
                    background: `${currentPrinciple.color}15`, 
                    borderRadius: '30px', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: currentPrinciple.color,
                    marginBottom: '3rem',
                    boxShadow: `0 20px 40px ${currentPrinciple.color}10`
                  }}>
                    {React.createElement(currentPrinciple.icon, { size: 48 })}
                  </div>
                  
                  <h2 style={{ fontSize: '3rem', fontWeight: 950, marginBottom: '2rem', color: 'white', letterSpacing: '-1.5px' }}>
                    {currentPrinciple.title}
                  </h2>
                  <p style={{ fontSize: '1.4rem', lineHeight: 1.7, color: '#cbd5e1', marginBottom: '4rem' }}>
                    {isEn ? currentPrinciple.desc.en : currentPrinciple.desc.tr}
                  </p>

                  <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.4)', borderRadius: '24px', borderLeft: `5px solid ${currentPrinciple.color}`, position: 'relative', overflow: 'hidden' }}>
                     <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.05 }}>
                        {React.createElement(currentPrinciple.icon, { size: 150 })}
                     </div>
                     <h4 style={{ color: currentPrinciple.color, marginBottom: '1rem', fontSize: '1rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                       <Brain size={20} /> {isEn ? "GEMINI ARCHITECT ADVICE" : "GEMINI AI ÖNERİSİ"}
                     </h4>
                     <p style={{ color: 'white', fontSize: '1.1rem', lineHeight: 1.6, fontStyle: 'italic', opacity: 0.9 }}>
                       "{isEn ? currentPrinciple.aiAdvice.en : currentPrinciple.aiAdvice.tr}"
                     </p>
                  </div>
               </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeanPrinciplesViewer;
