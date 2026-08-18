import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Wind, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ArchHero from '../ArchHero';
import ProjectDesignSystem from '../ProjectDesignSystem';

export interface ProjectDesignTabProps {
  tabSwitcher: React.ReactNode;
}

export const ProjectDesignTab: React.FC<ProjectDesignTabProps> = ({ tabSwitcher }) => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div 
      key="design" 
      initial={{ opacity: 0, x: 20 }} 
      animate={{ opacity: 1, x: 0 }} 
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <ArchHero 
        title="Visual"
        subtitle="Design System"
        description={isEn 
          ? "Discover ArchAcademy's aesthetic language and design tokens. Here you will find the architectural guide to Visual Craftsmanship." 
          : "ArchAcademy'nin estetik dilini ve kullanıcı deneyimi standartlarını keşfedin. Burada sadece kod değil, 'Görsel Ustalık' (Visual Craftsmanship) rehberini bulacaksınız."
        }
        badge="UI/UX Architecture"
        color="#a855f7"
        illustration={
          <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  rotate: [0, 10, 0],
                  scale: [1, 1.05, 1],
                  y: [0, -10, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                style={{
                  position: 'absolute',
                  width: '120px',
                  height: '160px',
                  background: i === 0 ? '#a855f7' : i === 1 ? '#3b82f6' : '#10b981',
                  borderRadius: '20px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  left: 60 + (i * 40),
                  top: 40 + (i * 20),
                  zIndex: 3 - i,
                  border: '4px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '15px'
                }}
              >
                <div style={{ fontSize: '0.6rem', fontWeight: 900, color: 'white', opacity: 0.8 }}>
                  {i === 0 ? '#A855F7' : i === 1 ? '#3B82F6' : '#10B981'}
                </div>
              </motion.div>
            ))}

            <motion.div
              animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ position: 'absolute', right: '20px', top: '40px', width: '100px', height: '40px', background: 'var(--glass)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', zIndex: 10, display: 'flex', alignItems: 'center', padding: '0 10px', gap: '8px' }}
            >
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#a855f7' }} />
              <div style={{ width: '50px', height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px' }} />
            </motion.div>

            <motion.div
              animate={{ x: [0, -20, 0], y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              style={{ position: 'absolute', left: '20px', bottom: '60px', width: '80px', height: '80px', background: 'var(--glass)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <Palette size={40} color="#a855f7" />
            </motion.div>

            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(168, 85, 247, 0.2) 1px, transparent 1px)', backgroundSize: '20px 20px', zIndex: -1 }} />
          </div>
        }
        features={[
          { icon: <Palette />, title: isEn ? 'Aura Palette' : 'Aura Paleti', desc: isEn ? 'Atmospheric Gradients & Neon Highlights.' : 'Atmospheric Gradients & Neon Highlights ile derinlik hissi.' },
          { icon: <Wind />, title: isEn ? 'Fluid Motion' : 'Akıcı Animasyonlar', desc: isEn ? '60FPS Ease-in-out smooth micro-interactions.' : '60FPS Ease-in-out pürüzsüz geçişler ve mikro etkileşimler.' },
          { icon: <Sparkles />, title: isEn ? 'Atomic UI Tokens' : 'Atomik UI Tokenları', desc: isEn ? 'Glassmorphism-based composable modular cards.' : 'Glassmorphism temelli, modüler ve yeniden kullanılabilir kart mantığı.' }
        ]}
        hideAction
      >
        {tabSwitcher}
      </ArchHero>

      <ProjectDesignSystem />
    </motion.div>
  );
};

export default ProjectDesignTab;
