import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, GraduationCap, Ship } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface RoadmapHeroProps {
  activeTab: 'career' | 'production';
  onTabChange: (tab: 'career' | 'production') => void;
}

export const RoadmapHero: React.FC<RoadmapHeroProps> = ({
  activeTab,
  onTabChange
}) => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <section style={{ 
      padding: '140px 0 60px', 
      position: 'relative', 
      overflow: 'hidden',
      background: 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 70%)'
    }}>
      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '8px', 
            padding: '8px 20px', 
            borderRadius: '100px', 
            background: 'rgba(99, 102, 241, 0.1)', 
            color: 'var(--primary)', 
            fontSize: '0.85rem', 
            fontWeight: 800, 
            border: '1px solid rgba(99, 102, 241, 0.2)',
            marginBottom: '1.5rem',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            <Sparkles size={16} /> {isEn ? "BATTLE-TESTED CAREER COMPASS" : "DENEYİMLENMİŞ KARİYER PUSULASI"}
          </span>
          
          <h1 className="gradient-text" style={{ fontSize: '4.5rem', fontWeight: 950, marginBottom: '1.5rem', letterSpacing: '-2px' }}>
            Architect's <br />
            <span style={{ opacity: 0.85 }}>Odyssey</span>
          </h1>
          
          <p style={{ color: 'var(--text-secondary)', maxWidth: '750px', margin: '0 auto 2.5rem', fontSize: '1.25rem', lineHeight: 1.8 }}>
            {isEn 
              ? "A living architectural blueprint guiding you from writing maintainable code to orchestrating mission-critical enterprise systems."
              : "Kod yazmaktan sistem kurmaya, mimari kararları savunmaktan kurumsal ölçeğe uzanan yaşayan mühendislik yol haritası."
            }
          </p>

          {/* Tab Switcher */}
          <div style={{ 
            display: 'inline-flex', 
            background: 'rgba(15, 23, 42, 0.6)', 
            padding: '8px', 
            borderRadius: '24px', 
            border: '1px solid rgba(255,255,255,0.05)',
            marginBottom: '1rem',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            position: 'relative',
            zIndex: 10,
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => onTabChange('career')}
              style={{
                padding: '14px 28px',
                borderRadius: '18px',
                background: activeTab === 'career' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'career' ? 'white' : 'var(--text-secondary)',
                border: 'none',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                display: 'flex', alignItems: 'center', gap: '10px',
                fontSize: '0.95rem',
                boxShadow: activeTab === 'career' ? '0 10px 20px rgba(59, 130, 246, 0.3)' : 'none'
              }}
            >
              <GraduationCap size={20} /> {isEn ? "Architect Curriculum" : "Mimari Müfredat"}
            </button>
            <button
              onClick={() => onTabChange('production')}
              style={{
                padding: '14px 28px',
                borderRadius: '18px',
                background: activeTab === 'production' ? '#f43f5e' : 'transparent',
                color: activeTab === 'production' ? 'white' : 'var(--text-secondary)',
                border: 'none',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                display: 'flex', alignItems: 'center', gap: '10px',
                fontSize: '0.95rem',
                boxShadow: activeTab === 'production' ? '0 10px 20px rgba(244, 63, 94, 0.3)' : 'none'
              }}
            >
              <Ship size={20} /> {isEn ? "Production Flow" : "Üretim Hattı (Production)"}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RoadmapHero;
