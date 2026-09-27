import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Box, Layers, ShieldCheck, Zap, GitBranch, RefreshCw, BookOpen } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { ModularBlueprintSection } from '../components/modularmonolith/ModularBlueprintSection';
import { ModularRulesSection } from '../components/modularmonolith/ModularRulesSection';
import { ModularOptimizationsSection } from '../components/modularmonolith/ModularOptimizationsSection';
import { ModularSynthesisSection } from '../components/modularmonolith/ModularSynthesisSection';

type SectionId = 'architecture' | 'rules' | 'optimizations' | 'synthesis';

export const ModularMonolithPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<string>('architecture');

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <SEO
        title={isEn ? "Pragmatic Modular Architecture & Modular Monolith | ArchAcademy" : "Pragmatik Modüler Mimari & Modüler Monolit (Hybrid VSA/FSD) | ArchAcademy"}
        description={isEn 
          ? "Master Pragmatic Modular Architecture (Hybrid Feature-Sliced VSA). Dependency rules, protected core, feature vs plugin separation and AI-native locality."
          : "ArchAcademy özel sentezi: Pragmatik Modüler Mimari (Hybrid Feature-Sliced VSA). Bağımlılık kuralları, korunan çekirdek, feature-plugin ayrımı ve AI-native locality."
        }
        keywords="modular monolith, pragmatic modular architecture, dependency rules, protected core, feature vs plugin, hybrid feature sliced vsa, vertical slice optimization"
        canonicalUrl="/modular-monolith"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
        <ArchHero 
          title="Modular Monolith"
          subtitle={isEn ? "Pragmatic Modular Architecture (Hybrid VSA / FSD)" : "Pragmatik Modüler Mimari (Hybrid VSA / FSD)"}
          description={isEn 
            ? "The definitive modern software architecture. Synthesizes Vertical Slice development velocity (5/5 AI Locality) with Clean Architecture core protection and FSD design system discipline."
            : "Modern yazılım mühendisliğinin ulaştığı altın denge. Vertical Slice'ın tek klasörde bitirme hızını (5/5 AI Locality), Clean Architecture'ın çekirdek domain güvenliği ve FSD'nin kurumsal tasarım disipliniyle birleştirir."
          }
          badge="ArchAcademy Signature Pattern"
          color="#38bdf8"
          illustration={
            <div style={{ position: 'relative', width: '220px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                style={{ width: '180px', height: '180px', borderRadius: '40px', border: '2px dashed rgba(56, 189, 248, 0.4)', position: 'absolute' }}
              />
              <div style={{ width: '100px', height: '100px', background: '#020617', border: '3px solid #38bdf8', borderRadius: '26px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(56, 189, 248, 0.3)' }}>
                <Box size={40} color="#38bdf8" />
                <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'white', marginTop: '4px' }}>PMA / VSA</span>
              </div>
            </div>
          }
          features={[
            { icon: <Zap />, title: isEn ? 'Max AI Locality' : '5/5 AI Locality', desc: isEn ? 'Features are developed within autonomous self-contained slices.' : 'Özellikler tek klasör içinde AI ile sıfır zıplamayla yazılır.' },
            { icon: <ShieldCheck />, title: isEn ? 'Protected Core' : 'Korunan Çekirdek (Core)', desc: isEn ? 'Financial rules and heavy math are isolated in pure core modules.' : 'Finansal kurallar ve motor mantığı src/core/ içinde saf kalır.' },
            { icon: <Layers />, title: isEn ? 'Universal Design' : 'Tasarım Sistemi Uyumlu', desc: isEn ? 'Consumes standard shared/ui components across all slices.' : 'Tüm dilimler tek tip src/shared/ui tasarım kitini tüketir.' }
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
            flexWrap: 'wrap',
            position: 'sticky',
            top: '80px',
            zIndex: 30
          }}>
            {[
              { id: 'architecture' as SectionId, label: isEn ? 'Core Architecture Blueprint' : 'Mimari Şablon & Yapı', icon: <Box size={18} />, color: '#38bdf8' },
              { id: 'rules' as SectionId, label: isEn ? 'Dependency & Test Rules' : 'Bağımlılık & Test Kuralları', icon: <GitBranch size={18} />, color: '#f59e0b' },
              { id: 'optimizations' as SectionId, label: isEn ? '5 Golden Optimizations' : '5 Altın Optimizasyon', icon: <ShieldCheck size={18} />, color: '#10b981' },
              { id: 'synthesis' as SectionId, label: isEn ? 'Genetic Lineage & Synthesis' : 'Mimari Gen Haritası', icon: <RefreshCw size={18} />, color: '#a855f7' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '18px',
                  border: 'none',
                  background: activeTab === tab.id ? tab.color : 'transparent',
                  color: activeTab === tab.id ? '#0f172a' : 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(56, 189, 248, 0.3)' : 'none'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </ArchHero>

        <div className="container" style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          <div id="architecture" style={{ scrollMarginTop: '100px' }}>
            <ModularBlueprintSection />
          </div>

          <div id="rules" style={{ scrollMarginTop: '100px' }}>
            <ModularRulesSection />
          </div>

          <div id="optimizations" style={{ scrollMarginTop: '100px' }}>
            <ModularOptimizationsSection />
          </div>

          <div id="synthesis" style={{ scrollMarginTop: '100px' }}>
            <ModularSynthesisSection />
          </div>
        </div>

        <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
          <div className="container" style={{ textAlign: 'center' }}>
             <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', background: 'rgba(56, 189, 248, 0.1)', padding: '1rem 2rem', borderRadius: '12px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                <BookOpen size={24} color="#38bdf8" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.8rem', color: '#38bdf8', textTransform: 'uppercase' }}>
                    ArchAcademy Engineering Standard
                  </div>
                  <div style={{ color: 'white', fontWeight: 600 }}>{isEn ? "Pragmatic Modular Architecture: Zero Waste, Extreme Velocity & Protected Core" : "Pragmatik Modüler Mimari: Zero Waste, Extreme Velocity & Protected Core"}</div>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default ModularMonolithPage;
