import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Layers, ArrowRightLeft, Sparkles, BookOpen, FolderTree } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { VerticalFeaturesTab } from '../components/vertical/VerticalFeaturesTab';
import { VerticalVsHorizontalTab } from '../components/vertical/VerticalVsHorizontalTab';
import { VerticalAIVibeTab } from '../components/vertical/VerticalAIVibeTab';

const VerticalSlicePage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'features' | 'compare' | 'vibecoding'>('features');

  return (
    <>
      <SEO
        title={isEn ? "Vertical Slice Architecture vs Horizontal Layering | ArchAcademy" : "Dikey Dilim (Vertical Slice) vs Yatay Katmanlı Mimari | ArchAcademy"}
        description={isEn 
          ? "Master Vertical Slice Architecture, feature folder layouts, horizontal layering comparison, and AI-native Vibe Coding advantages." 
          : "Dikey Dilim (Vertical Slice) mimarisi, özellik bazlı klasör yapısı, yatay katman karşılaştırması ve AI-Native Vibe Coding rehberi."
        }
        keywords="vertical slice architecture, horizontal layering, feature folders, jimmy bogard, vibe coding, mediatr, clean architecture"
        canonicalUrl="/vertical"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
        <ArchHero 
          title="Vertical Slice"
          subtitle={isEn ? "Feature Architecture" : "Özellik Bazlı Mimari"}
          description={isEn 
            ? "Eliminate artificial technical boundaries. Slice your system vertically by business features, maximizing cohesion and AI copilot velocity." 
            : "Yapay teknik katmanlara son. Sistemi teknik roller yerine iş özelliklerine (Features) göre dikey dilimleyerek yüksek uyum ve sıfır yan etki sağlayan modern mimari."
          }
          badge="Modern Architecture"
          color="#f97316"
          illustration={
            <div style={{ display: 'flex', gap: '10px', height: '180px', alignItems: 'center' }}>
              {[
                { name: 'Order', color: '#f97316' },
                { name: 'User', color: '#38bdf8' },
                { name: 'Catalog', color: '#10b981' }
              ].map((slice, i) => (
                <motion.div 
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ width: '60px', height: '150px', background: 'rgba(255,255,255,0.03)', border: `2px solid ${slice.color}`, borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}
                >
                  <span style={{ fontSize: '0.65rem', color: slice.color, fontWeight: 900 }}>{slice.name}</span>
                  <div style={{ width: '80%', height: '4px', background: slice.color, borderRadius: '2px' }} />
                  <div style={{ width: '80%', height: '4px', background: slice.color, borderRadius: '2px', opacity: 0.7 }} />
                  <div style={{ width: '80%', height: '4px', background: slice.color, borderRadius: '2px', opacity: 0.4 }} />
                  <span style={{ fontSize: '0.6rem', color: '#64748b' }}>Slice</span>
                </motion.div>
              ))}
            </div>
          }
          features={[
            { icon: <FolderTree />, title: isEn ? 'Feature Slicing' : 'Özellik Dilimleme', desc: isEn ? 'Everything related to a feature lives in one single folder.' : 'Bir özellikle ilgili tüm UI, Query ve Command tek klasörde yaşar.' },
            { icon: <ArrowRightLeft />, title: isEn ? 'Zero Side Effects' : 'Sıfır Yan Etki', desc: isEn ? 'Modifying one feature never accidentally breaks another slice.' : 'Bir özellikteki değişiklik diğer hiçbir özelliği bozamaz.' },
            { icon: <Sparkles />, title: isEn ? 'AI-Native (5/5 ⭐)' : 'AI & Vibe Coding', desc: isEn ? 'Unbeatable context locality for AI copilots and non-programmers.' : 'AI modelleri için en yüksek doğruluk ve en düşük token maliyeti.' }
          ]}
        >
          <div style={{ 
            marginTop: '2rem',
            padding: '6px', 
            background: 'rgba(15, 23, 42, 0.4)', 
            borderRadius: '24px', 
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            backdropFilter: 'blur(10px)',
            flexWrap: 'wrap'
          }}>
            {[
              { id: 'features', label: isEn ? 'Feature Folder Layout' : 'Klasör & Kurallar', icon: <FolderTree size={18} /> },
              { id: 'compare', label: isEn ? 'Vertical vs Horizontal' : 'Dikey vs Yatay Katmanlar', icon: <ArrowRightLeft size={18} /> },
              { id: 'vibecoding', label: isEn ? 'AI & Vibe Coding' : 'AI-Native Avantajı', icon: <Sparkles size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '18px',
                  border: 'none',
                  background: activeTab === tab.id ? '#f97316' : 'transparent',
                  color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(249, 115, 22, 0.3)' : 'none'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </ArchHero>

        <div className="container" style={{ marginTop: '2rem' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'features' && <VerticalFeaturesTab key="features" />}
            {activeTab === 'compare' && <VerticalVsHorizontalTab key="compare" />}
            {activeTab === 'vibecoding' && <VerticalAIVibeTab key="vibecoding" />}
          </AnimatePresence>
        </div>

        <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
          <div className="container" style={{ textAlign: 'center' }}>
             <div style={{ 
               background: 'linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.5) 100%)', 
               padding: '2.5rem', 
               borderRadius: '24px', 
               border: '1px solid rgba(255,255,255,0.05)',
               maxWidth: '900px',
               margin: '0 auto'
             }}>
                <div style={{ fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 800, color: '#f97316', marginBottom: '0.75rem', textTransform: 'uppercase' }}>
                  Architecture Origin & Manifesto
                </div>
                <p style={{ color: '#94a3b8', marginBottom: '1.5rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
                  {isEn 
                    ? "Read Jimmy Bogard's foundational essay on why Vertical Slice Architecture outperforms traditional horizontal layering." 
                    : "Minimalist CQRS ve Vertical Slice mimarisinin öncüsü Jimmy Bogard'ın (MediatR yaratıcısı) orijinal makalesini inceleyin."
                  }
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                   <a 
                     href="https://jimmybogard.com/vertical-slice-architecture/" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     style={{ 
                       display: 'flex', alignItems: 'center', gap: '8px', 
                       background: 'rgba(249, 115, 22, 0.15)', color: '#fdba74', 
                       padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 700,
                       border: '1px solid rgba(249, 115, 22, 0.3)', transition: 'all 0.2s'
                     }}
                   >
                      <BookOpen size={18} /> {isEn ? "Read Jimmy Bogard's Article" : "Jimmy Bogard'ın Makalesini Oku"}
                   </a>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default VerticalSlicePage;
