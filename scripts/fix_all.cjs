const fs = require('fs');

// 1. Home.tsx
const p_home = 'src/presentation/pages/home.tsx';
let c_home = fs.readFileSync(p_home, 'utf8');

const vibeSection = `
      {/* --- THE VIBE-CODING SPOTLIGHT SECTION (VSA & FSD) --- */}
      <section style={{ padding: '0 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card"
            style={{
              background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(15, 23, 42, 0.9) 100%)',
              padding: '4rem',
              borderRadius: '60px',
              border: '2px solid rgba(249, 115, 22, 0.25)',
              display: 'grid',
              gridTemplateColumns: 'minmax(300px, 1.2fr) 1fr',
              gap: '4rem',
              alignItems: 'center',
              boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 0 50px rgba(249, 115, 22, 0.05)'
            }}
          >
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(249, 115, 22, 0.15)',
                color: '#f97316',
                padding: '8px 16px',
                borderRadius: '100px',
                gontSize: '0.75rem',
                fontWeight: 900,
                marginBottom: '1.5rem',
                letterSpacing: '1px'
              }}>
                <Sparkles size={14} /> {isEn ? '2026 VIBE-CODING SPOTLIGHT' : 'YENI NESIL VIBE-CODING GOZDESI'}
              </div>
              <h2 style={{ fontSize: '4.5rem', fontWeight: 950, color: 'w(ite', marginBottom: '1.5rem', lineHeight: 1, letterSpacing: '-3px' }}>
                Vertical Slice <br />
                <span style={{ color: '#f97316' }}>&amp; FSD Architecture</span>
              </h2>
              <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '3rem', maxWidth: '600px' }}>
                {isEn 
                  ? 'Zero context loss for AI agents. Isolate features into autonomous vertical slices and rule out butterfly-effect bugs during vibe-coding sessions.'
                  : 'Yapay Zeka ve Vibe-Coding için sıfır bağlam kaybñ. Özellikleri bağımsız dikey dilimlere hapsedin, kelebek etkisi hatalarını tamamen yok edin.'
                }
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/vertical" style={{ textDecoration: 'none' }}>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(249, 115, 22, 0.2)' }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '1.25rem 2.5rem',
                      background: '#f97316',
                      color: 'white',
                      border: 'none',
                      borderRadius: '20px',
                      fontWeight: 900,
                      fontSize: '1.05rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    {isEn ? 'Vertical Slice (VSA)' : 'Dikey Dilim (VSA)'} <ArrowUpRight size={20} />
                  </motion.button>
                </Link>
                <Link to="/fsd" style={{ textDecoration: 'none' }}>
                  <motion.button
                    whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '1.25rem 2.5rem',
                      background: 'rgba(255,255,255,0.05)',
                      color: 'white',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '20px',
                      fontWeight: 800,
                      fontSize: '1.05rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    {isEn ? 'Feature-Sliced (FSD)' : 'Feature-Sliced (FSD)'} <ArrowUpRight size={20} />
                  </motion.button>
                </Link>
              </div>
            </div>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: '350px',
                height: '350px',
                borderRadius: '50px',
                background: 'rgba(249, 115, 22, 0.03)',
                border: '1px solid rgba(249, 115, 22, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute',
                    width: '280px',
                    height: '280px',
                    borderRadius: '40px',
                    border: '2px dashed rgba(249, 115, 22, 0.3)'
                  }}
                />
                <div style={{
                  width: '130px',
                  height: '130px',
                  background: '#090d16',
                  borderRadius: '32px',
                  border: '3px solid #f97316',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 40px rgba(249, 115, 22, 0.3)'
                }}>
                  <Target size={52} color="#f97316" />
                  <span style={{ fontSize: '0.75rem', fontWeight: 900, color: 'white', marginTop: '6px' }}>VSA-FSD</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
`;

if (!c_home.includes('THE VIBE-CODING SPOTLIGHT SECTION')) {
  c_home = c_home.replace('</section>\n\n      {/* --- DIMENSIONAL ARCHITECTURE CATALOGS --- */}', '</section>\n' + vibeSection + '\n\n      {/* --- DIMENSIONAL ARCHITECTURE CATALOGS --- */}');
  fs.writeFileSync(p_home, c_home, 'utf8');
  console.log('Home.tsx updated with Vibe-Coding Section!');
}

// 2. ArchitectRoadmap.tsx
const p_roadmap = 'src/presentation/components/ArchitectRoadmap.tsx';
let c_roadmap = fs.readFileSync(p_roadmap, 'utf8');
c_roadmap = c_roadmap.replace("desc: 'DağıtĲk servis stratejileri ve dayanıklılık.', desc: ", "desc: ");
c_roadmap = c_roadmap.replace('const isCompleted = progress[task.path];', 'const isCompleted = progress.completedSteps.includes(task.path);');
fs.writeFileSync(p_roadmap, c_roadmap, 'utf8');
console.log('ArchitectRoadmap.tsx updated!');

// 3. useDisciplineStreak.ts
const p_streak = 'src/presentation/components/disciplinechain/useDisciplineStreak.ts';
let c_streak = fs.readFileSync(p_streak, 'utf8');
c_streak = c_streak.replace('const { completedSteps } = useProgress();', 'const { progress } = useProgress();\n  const completedSteps = progress.completedSteps;');
fs.writeFileSync(p_streak, c_streak, 'utf8');
console.log('useDisciplineStreak.ts updated!');

// 4. CleanArchClassicLayerTab & ModernFeatureTab
const p_clTab = 'src/presentation/components/cleanarch/CleanArchClassicLayerTab.tsx';
let c_clTab = fs.readFileSync(p_clTab, 'utf8');
c_clTab = c_clTab.replace('defaultTab="layer"', 'forcedMode="layer"');
fs.writeFileSync(p_clTab, c_clTab, 'utf8');

const p_mfTab = 'src/presentation/components/cleanarch/CleanArchModernFeatureTab.tsx';
let c_mfTab = fs.readFileSync(p_mfTab, 'utf8');
c_mfTab = c_mfTab.replace('defaultTab="feature"', 'forcedMode="feature"');
fs.writeFileSync(p_mfTab, c_mfTab, 'utf8');
console.log('CleanArch tabs updated!');

// 5. hexagonal.tsx & onion.tsx
const p_hex = 'src/presentation/pages/hexagonal.tsx';
let c_hex = fs.readFileSync(p_hex, 'utf8');
c_hex = c_hex.replace('  if (isEn) {\n    return <HexagonalEN />;\n  }\n', '');
fs.writeFileSync(p_hex, c_hex, 'utf8');

const p_onion = 'src/presentation/pages/onion.tsx';
let c_onion = fs.readFileSync(p_onion, 'utf8');
c_onion = c_onion.replace('  if (isEn) {\n    return <OnionEN />;\n  }\n', '');
fs.writeFileSync(p_onion, c_onion, 'utf8');
console.log('Hexagonal & Onion pages updated!');

// 6. acid.tsx, cap-theorem.tsx, primary-secondary.tsx, soa.tsx
const p_acid = 'src/presentation/pages/acid.tsx';
let c_acid = fs.readFileSync(p_acid, 'utf8');
c_acid = c_acid.replace('setErrorMode={simulation.setErrorMode}', 'onErrorModeChange={simulation.setErrorMode}')
                 .replace('runTransaction={simulation.runTransaction}', 'onRunTransaction={simulation.runTransaction}');
fs.writeFileSync(p_acid, c_acid, 'utf8');

const p_cap = 'src/presentation/pages/cap-theorem.tsx';
let c_cap = fs.readFileSync(p_cap, 'utf8');
c_cap = c_cap.replace('setActiveMode={simulation.setActiveMode}', 'onSetMode={simulation.setActiveMode}')
               .replace('setIsPartitioned={simulation.setIsPartitioned}', 'onTogglePartition={() => simulation.setIsPartitioned(!simulation.isPartitioned)}')
               .replace('handleWrite={simulation.handleWrite}', 'onWrite={simulation.handleWrite}');
fs.writeFileSync(p_cap, c_cap, 'utf8');

const p_ps = 'src/presentation/pages/primary-secondary.tsx';
let c_ps = fs.readFileSync(p_ps, 'utf8');
c_ps = c_ps.replace('writeData={simulation.writeData}', 'onWriteData={simulation.writeData}');
fs.writeFileSync(p_ps, c_ps, 'utf8');

const path = require('path');
const pagesDir = path.resolve('src/presentation/pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));
let count = 0;
for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('activeTab ===') && content.includes('<AnimatePresence') && (content.includes('ArchHero') || content.includes('Hero'))) {
    if (content.includes('scrollToSection')) continue;
    const tabMatch = content.match(/const\s+\[activeTab,\s*setActiveTab\]\s*=\s*useState<([^>]+)>\(([^)]+)\);/);
    if (!tabMatch) continue;
    const tabType = tabMatch[1];
    const scrollFunc = '  const scrollToSection = (id: ' + tabType + ') => {\n    setActiveTab(id);\n    const element = document.getElementById(id);\n    if (element) {\n      element.scrollIntoView({ behavior: "smooth", block: "start" });\n    }\n  };\n';
    content = content.replace(tabMatch[0], tabMatch[0] + '\n' + scrollFunc);
    content = content.replace(/onClick=\{\(\)\s*=>\s*setActiveTab\(tab\.id\s+as\s+any\)\}/g, 'onClick={() => scrollToSection(tab.id as any)}');
    content = content.replace(/onClick=\{\(\)\s*=>\s*setActiveTab\(tab\.id\)\}/g, 'onClick={() => scrollToSection(tab.id as any)}');
    content = content.replace(/flexWrap:\s*['"]wrap['"]/g, "flexWrap: 'wrap',\n            position: 'sticky',\n            top: '80px',\n            zIndex: 30");
    const animMatch = content.match(/<AnimatePresence[^>]*>([\s\S]*?)<\/AnimatePresence>/);
    if (animMatch) {
      const inner = animMatch[1];
      const branchRegex = /\{activeTab\s*===\s*['"]([^'"]+)['"]\s*&&\s*<([^/>]+)(?:\s+key=['"][^'"]+['"])?\s*\/>\}/g;
      let branchMatch;
      let newSections = [];
      while ((branchMatch = branchRegex.exec(inner)) !== null) {
        const tabId = branchMatch[1];
        const compTag = branchMatch[2].replace(/\s*key=['"][^'"]+['"]/, '').trim();
        newSections.push('          <div id="' + tabId + '" style={{ scrollMarginTop: "100px" }}>\n            <' + compTag + ' />\n          </div>');
      }
      if (newSections.length > 0) {
        const replacement = '<div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>\n' + newSections.join('\n') + '\n        </div>';
        content = content.replace(animMatch[0], replacement);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Converted to sequential scroll:', file, '(' + newSections.length + ' sections)');
        count++;
      }
    }
  }
}
// 5. Update Matrix Data
const p_matrix_data = 'src/infrastructure/ComparisonMatrixData.ts';
let c_matrix_data = fs.readFileSync(p_matrix_data, 'utf8');
c_matrix_data = c_matrix_data.replace(/\s*githubPopularity:\s*number;\n?/, '\n');
c_matrix_data = c_matrix_data.replace(/\{\s*id:\s*['"]github['"][\s\S]*?borderColor:\s*['"]rgba\(234,\s*179,\s*8,\s*0\.3\)['"]\s*\},?\s*/, '');
c_matrix_data = c_matrix_data.replace(/\s*githubPopularity:\s*\d+,?\n?/g, '\n');

const useCaseMatrixRow = `  {
    name: 'Use-Case Driven (BCE)',
    size: { tr: 'Orta/Büyük', en: 'Medium/Large' },
    sizeValue: 3,
    speed: 3,
    kiss: 3,
    dry: 4,
    maintAndTest: 5,
    flex: 4,
    aiLocality: 4,
    color: '#f59e0b',
    bestFor: { tr: 'İş Akışı ve Senaryo Yoğun Sistemler (BCE Modeli)', en: 'Workflow & Scenario-Dense Systems (BCE Model)' },
    path: '/clean-arch'
  },\n`;

if (!c_matrix_data.includes("Use-Case Driven (BCE)")) {
  c_matrix_data = c_matrix_data.replace("export const MATRIX_DATA: MatrixRowItem[] = [\n", "export const MATRIX_DATA: MatrixRowItem[] = [\n" + useCaseMatrixRow);
}
// 9. Create Dedicated Modular Monolith (Pragmatic Modular Architecture) Page
const modularMonolithPageContent = `import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Box, Layers, ShieldCheck, Zap, Sparkles, FolderTree, Cpu, RefreshCw, BookOpen } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';

export const ModularMonolithPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'architecture' | 'optimizations' | 'synthesis'>('architecture');

  const scrollToSection = (id: 'architecture' | 'optimizations' | 'synthesis') => {
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
          ? "Master Pragmatic Modular Architecture (Hybrid Feature-Sliced VSA). The golden equilibrium between Vertical Slice velocity and Clean Architecture domain safety." 
          : "ArchAcademy özel sentezi: Pragmatik Modüler Mimari (Hybrid Feature-Sliced VSA). Vertical Slice hızı ile Clean Architecture güvenliğini birleştiren modern standart."
        }
        keywords="modular monolith, pragmatic modular architecture, hybrid feature sliced vsa, modern feature driven, vertical slice optimization"
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
              { id: 'architecture', label: isEn ? 'Core Architecture Blueprint' : 'Mimari Şablon & Yapı', icon: <Box size={18} /> },
              { id: 'optimizations', label: isEn ? '5 Vertical Optimizations' : '5 Altın Optimizasyon', icon: <ShieldCheck size={18} /> },
              { id: 'synthesis', label: isEn ? 'Genetic Lineage & Synthesis' : 'Mimari Gen Haritası', icon: <RefreshCw size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id as any)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '18px',
                  border: 'none',
                  background: activeTab === tab.id ? '#38bdf8' : 'transparent',
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
          
          {/* ARCHITECTURE BLUEPRINT SECTION */}
          <div id="architecture" style={{ scrollMarginTop: '100px' }}>
            <div className="glass-card" style={{ padding: '3rem', borderTop: '4px solid #38bdf8' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '6px 14px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800, marginBottom: '1.5rem' }}>
                ARCHACADEMY MASTER BLUEPRINT
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
                {isEn ? "The Pragmatic Modular Architecture (PMA) Blueprint" : "Pragmatik Modüler Mimari (PMA) Şablonu"}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '850px' }}>
                {isEn 
                  ? "A 4-pillar unified architecture engineered to eliminate over-engineering while preserving enterprise safety and extreme AI context locality." 
                  : "Aşırı mühendisliği (Over-Engineering) çöpe atan; aynı zamanda kurumsal güvenlik, tasarım tutarlılığı ve 5/5 AI Locality sağlayan 4 ayaklı hibrit mimari."
                }
              </p>

              <div style={{ background: '#020617', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <pre style={{ margin: 0, fontSize: '0.85rem', color: '#38bdf8', fontFamily: 'monospace', lineHeight: 1.7, overflowX: 'auto' }}>
{\`📁 src/
│
├── 📁 core/                 --> 🧠 1. MOTOR & KRİTİK KURALLAR (Pure Logic / Math / Domain)
│   ├── 📄 engine.ts         (Canvas/WebGL veya Ana Hesaplama Motoru)
│   ├── 📄 tax-calculator.ts (Hata kabul etmeyen saf iş kuralları - Single Source of Truth)
│   └── 📄 types.ts          (Global domain modelleri)
│
├── 📁 shared/               --> 🎨 2. ORTAK TASARIM SİSTEMİ (Design System / UI Kit)
│   ├── 📁 ui/               (Button, Input, Modal, Dropdown - Tek tip kurumsal UI)
│   └── 📁 utils/            (Formatters, Helpers)
│
├── 📁 pipelines/            --> 🛡️ 3. ÇAPRAZ DENETLEYİCİLER (Cross-Cutting Middleware)
│   ├── 📄 auth-guard.ts     (Yetkilendirme kalkanı)
│   └── 📄 tenant-filter.ts  (Multi-tenant veri izolasyonu)
│
├── 📁 features/ (veya slices/) --> 🍕 4. DİKEY DİLİMLER (VSA Mantığında Otonom Modüller)
│   │
│   ├── 📁 order-checkout/   --> [Dilim 1]
│   │   ├── 📄 CheckoutCard.tsx  (UI)
│   │   ├── 📄 useCheckout.ts    (State / API)
│   │   └── 📄 index.ts          (Public API Export)
│   │
│   ├── 📁 terrain-sculptor/ --> [Dilim 2]
│   │   ├── 📄 SculptorPanel.tsx (UI)
│   │   ├── 📄 brushMath.ts      (Fırça mantığı)
│   │   └── 📄 index.ts          (IStudioTool Registry)
│   │
│   └── 📁 invoice-generator/--> [Dilim 3]
│       ├── 📄 InvoiceView.tsx
│       └── 📄 index.ts
│
└── 📄 main.ts               --> 🔌 Sistemin Giriş Noktası (Features Registry & Init)\`}
                </pre>
              </div>
            </div>
          </div>

          {/* 5 OPTIMIZATIONS SECTION */}
          <div id="optimizations" style={{ scrollMarginTop: '100px' }}>
            <div className="glass-card" style={{ padding: '3rem', borderTop: '4px solid #10b981' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>
                {isEn ? "The 5 Golden Optimizations of Pragmatic Architecture" : "Vertical Slice'ı Kusursuzlaştıran 5 Altın Optimizasyon"}
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <div style={{ color: '#10b981', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>1. 🛡️ Shared Core Domain</div>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                    Kritik faiz, vergi ve matematiksel algoritmalar src/core/ içinde saf fonksiyon olarak yaşar. Dilimler kopyalamak yerine bunu çağırır.
                  </p>
                </div>

                <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                  <div style={{ color: '#38bdf8', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>2. 🎨 Shared UI Kit & Tokens</div>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                    Dilimler sıfırdan buton yazmaz; src/shared/ui/ bileşenlerini tüketir. Tasarım tutarlılığı %100 garanti altına alınır.
                  </p>
                </div>

                <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                  <div style={{ color: '#f59e0b', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>3. ⚙️ Pipeline Behaviors</div>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                    TenantId izolasyonu ve GDPR audit logları her dilime tek tek yazılmaz; MediatR/Middleware pipeline ile otomatik işletilir.
                  </p>
                </div>

                <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
                  <div style={{ color: '#a855f7', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>4. 🗄️ DTO Projections</div>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                    Dilimler SELECT * yerine sadece kendi ihtiyacı olan DTO alanını sorgular. ORM kolon değişiklikleri derleme anında yakalanır.
                  </p>
                </div>

                <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  <div style={{ color: '#ef4444', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>5. 🔌 Slice Registry (Plugin SDK)</div>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                    Her dilim standart bir arayüz (IStudioTool / register()) uygular. Çekirdek motor dilimleri dinamik eklenti gibi yükler.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* GENETIC LINEAGE & SYNTHESIS */}
          <div id="synthesis" style={{ scrollMarginTop: '100px' }}>
            <div className="glass-card" style={{ padding: '3rem', borderTop: '4px solid #a855f7' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>
                {isEn ? "Genetic Lineage: What Did We Inherit?" : "Mimari Gen Haritası: Hangi Mimariden Neyi Devraldık?"}
              </h3>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      <th style={{ padding: '1rem', width: '30%' }}>Kaynak Mimari</th>
                      <th style={{ padding: '1rem', width: '35%' }}>Devralınan Süper Güç</th>
                      <th style={{ padding: '1rem', width: '35%' }}>Çöpe Atılan İsraf (Waste)</th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: '0.9rem' }}>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '1rem', color: '#f97316', fontWeight: 800 }}>🍕 Vertical Slice (VSA)</td>
                      <td style={{ padding: '1rem', color: 'white' }}>Tek klasörde bitirme hızı & 5/5 AI Locality</td>
                      <td style={{ padding: '1rem', color: '#94a3b8' }}>Kontrolsüz kopya kod ve UI stil kaosları</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '1rem', color: '#06b6d4', fontWeight: 800 }}>🎨 FSD (Feature-Sliced Design)</td>
                      <td style={{ padding: '1rem', color: 'white' }}>Kurumsal Shared UI Kit & index.ts Public API</td>
                      <td style={{ padding: '1rem', color: '#94a3b8' }}>Her dilim içi 4 alt klasör eziyeti (Over-segmenting)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '1rem', color: '#38bdf8', fontWeight: 800 }}>🏛️ Clean Architecture</td>
                      <td style={{ padding: '1rem', color: 'white' }}>Saf iş kurallarının ve motorun src/core/ ile korunması</td>
                      <td style={{ padding: '1rem', color: '#94a3b8' }}>1 basit özellik için 7 katman ve 20 interface açma zorunluluğu</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', color: '#a855f7', fontWeight: 800 }}>🛡️ Hexagonal / CQRS</td>
                      <td style={{ padding: '1rem', color: 'white' }}>Merkezi güvenlik ve yetki boru hatları (Pipelines)</td>
                      <td style={{ padding: '1rem', color: '#94a3b8' }}>Aşırı karmaşık Event Bus ve asenkron senkronizasyon yükü</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
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
                  <div style={{ color: 'white', fontWeight: 600 }}>Pragmatic Modular Architecture: Zero Waste, Extreme Velocity & Bulletproof Core</div>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default ModularMonolithPage;
`;

fs.writeFileSync('src/presentation/pages/modular-monolith.tsx', modularMonolithPageContent, 'utf8');

// 10. Update AppRouter.tsx for modular-monolith
const p_router2 = 'src/presentation/navigation/AppRouter.tsx';
let c_router2 = fs.readFileSync(p_router2, 'utf8');
if (!c_router2.includes('modular-monolith')) {
  c_router2 = c_router2.replace("const VerticalSlicePage = lazy(() => import('../pages/vertical'));", "const VerticalSlicePage = lazy(() => import('../pages/vertical'));\nconst ModularMonolithPage = lazy(() => import('../pages/modular-monolith'));");
  c_router2 = c_router2.replace('<Route path="/vertical" element={<VerticalSlicePage />} />', '<Route path="/vertical" element={<VerticalSlicePage />} />\n          <Route path="/modular-monolith" element={<ModularMonolithPage />} />');
  fs.writeFileSync(p_router2, c_router2, 'utf8');
}

// 11. Update Catalog for modular-monolith
const p_cat2 = 'src/presentation/pages/catalog.tsx';
let c_cat2 = fs.readFileSync(p_cat2, 'utf8');
if (!c_cat2.includes('modular-monolith')) {
  c_cat2 = c_cat2.replace("{ name: 'Vertical Slice', path: '/vertical' }", "{ name: 'Vertical Slice', path: '/vertical' },\n    { name: 'Modular Monolith (PMA)', path: '/modular-monolith' }");
  fs.writeFileSync(p_cat2, c_cat2, 'utf8');
}

// 12. Update Search Index for modular-monolith
const p_sidx2 = 'src/presentation/data/searchIndex.ts';
let c_sidx2 = fs.readFileSync(p_sidx2, 'utf8');
if (!c_sidx2.includes('modular-monolith')) {
  const sidxEntry = `  {
    id: 'modular-monolith',
    title: 'Modular Monolith (Pragmatic Modular Architecture)',
    description: 'Hybrid Feature-Sliced VSA with Zero Waste & Protected Core',
    path: '/modular-monolith',
    keywords: ['modular monolith', 'pragmatic modular architecture', 'hybrid vsa', 'fsd 3.0', 'feature driven', 'core slices']
  },\n`;
  c_sidx2 = c_sidx2.replace('export const SEARCH_INDEX: SearchItem[] = [\n', 'export const SEARCH_INDEX: SearchItem[] = [\n' + sidxEntry);
  fs.writeFileSync(p_sidx2, c_sidx2, 'utf8');
}

// 13. Update Matrix Data for modular-monolith
const p_mat2 = 'src/infrastructure/ComparisonMatrixData.ts';
let c_mat2 = fs.readFileSync(p_mat2, 'utf8');
if (!c_mat2.includes('Modular Monolith (PMA)')) {
  const matRow = `  {
    name: 'Modular Monolith (PMA)',
    size: { tr: 'Her boyuta uygun', en: 'All Scales' },
    sizeValue: 2.5,
    speed: 5,
    kiss: 4,
    dry: 4,
    maintAndTest: 5,
    flex: 5,
    aiLocality: 5,
    color: '#38bdf8',
    bestFor: { tr: 'Hızlı & Güvenli Kurumsal Ürünler (Hybrid VSA/FSD)', en: 'High Velocity Enterprise Products (Hybrid VSA/FSD)' },
    path: '/modular-monolith'
  },\n`;
  c_mat2 = c_mat2.replace('export const MATRIX_DATA: MatrixRowItem[] = [\n', 'export const MATRIX_DATA: MatrixRowItem[] = [\n' + matRow);
  fs.writeFileSync(p_mat2, c_mat2, 'utf8');
}

console.log('Modular Monolith page, routes, catalog, search index, and matrix successfully updated!');
const useCasePageContent = `import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Target, Workflow, Layers, BookOpen, ShieldCheck } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';

export const UseCaseDrivenPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'bce' | 'workflow' | 'comparison'>('bce');

  const scrollToSection = (id: 'bce' | 'workflow' | 'comparison') => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <SEO
        title={isEn ? "Use-Case Driven Architecture & BCE Pattern | ArchAcademy" : "Kullanım Senaryosu Odaklı Mimari (Use-Case Driven) & BCE | ArchAcademy"}
        description={isEn 
          ? "Master Ivar Jacobson's Use-Case Driven Architecture, Boundary-Control-Entity (BCE) patterns, Screaming Architecture, and Interactors." 
          : "Ivar Jacobson'ın Use-Case Driven mimarisi, Sınır-Denetleyici-Varlık (BCE) deseni, Interactor ve Kullanıcı Senaryosu iş akışları rehberi."
        }
        keywords="use case driven architecture, bce pattern, ivar jacobson, boundary control entity, interactor, screaming architecture, clean architecture use cases"
        canonicalUrl="/use-case-driven"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
        <ArchHero 
          title="Use-Case Driven"
          subtitle={isEn ? "Boundary-Control-Entity (BCE) Architecture" : "Kullanım Senaryosu & BCE Mimarisi"}
          description={isEn 
            ? "Pioneered by Ivar Jacobson (1992) and foundational to Clean Architecture. Organize systems around user intents and business scenarios rather than technical database tables." 
            : "Ivar Jacobson (1992) tarafından geliştirilen ve Clean Architecture'ın kalbini oluşturan felsefe. Sistemi veritabanı CRUD tablolarına göre değil, kullanıcının iş hedeflerine ve senaryolarına göre organize edin."
          }
          badge="Foundational Architecture"
          color="#f59e0b"
          illustration={
            <div style={{ position: 'relative', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                style={{ width: '160px', height: '160px', borderRadius: '30px', border: '2px dashed rgba(245, 158, 11, 0.4)', position: 'absolute' }}
              />
              <div style={{ width: '90px', height: '90px', background: '#020617', border: '3px solid #f59e0b', borderRadius: '22px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(245, 158, 11, 0.3)' }}>
                <Target size={36} color="#f59e0b" />
                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'white', marginTop: '4px' }}>BCE</span>
              </div>
            </div>
          }
          features={[
            { icon: <Workflow />, title: isEn ? 'Scenario-First' : 'Senaryo Odaklı', desc: isEn ? 'Each Use Case represents an atomic, testable business goal.' : 'Her Use Case, kullanıcının tek bir amacını yürüten atomik bir iş akışıdır.' },
            { icon: <Layers />, title: isEn ? 'BCE Triad' : 'BCE Üçlüsü', desc: isEn ? 'Boundary (UI/API), Control (Workflow Interactor), Entity (Domain Rules).' : 'Boundary (Giriş/Çıkış), Control (Senaryo Orkestratörü), Entity (Saf Kurallar).' },
            { icon: <ShieldCheck />, title: isEn ? 'Database Isolation' : 'Veritabanı Bağımsızlığı', desc: isEn ? 'Use Cases do not leak SQL or ORM entities into core business logic.' : 'İş akışları veritabanı tablolarına değil, saf domain modellerine dayanır.' }
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
              { id: 'bce', label: isEn ? 'BCE Architecture Model' : 'BCE Deseni ve Yapısı', icon: <Layers size={18} /> },
              { id: 'workflow', label: isEn ? 'Use Case Execution Flow' : 'Senaryo İcra Döngüsü', icon: <Workflow size={18} /> },
              { id: 'comparison', label: isEn ? 'CRUD vs Use-Case Driven' : 'CRUD vs Use-Case Karşılaştırması', icon: <Target size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id as any)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '18px',
                  border: 'none',
                  background: activeTab === tab.id ? '#f59e0b' : 'transparent',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(245, 158, 11, 0.3)' : 'none'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </ArchHero>

        <div className="container" style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          
          {/* BCE PATTERN SECTION */}
          <div id="bce" style={{ scrollMarginTop: '100px' }}>
            <div className="glass-card" style={{ padding: '3rem', borderTop: '4px solid #f59e0b' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', padding: '6px 14px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800, marginBottom: '1.5rem' }}>
                IVAR JACOBSON (1992)
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
                {isEn ? "The BCE Triad: Boundary, Control, Entity" : "BCE Üçlüsü: Boundary (Sınır), Control (Denetleyici), Entity (Varlık)"}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '850px' }}>
                {isEn 
                  ? "In Use-Case Driven Architecture, responsibilities are strictly divided into three distinct roles. This separation directly inspired Uncle Bob's Clean Architecture layer concentricity." 
                  : "Use-Case Driven mimaride sorumluluklar 3 katı role ayrılır. Bu ayrım doğrudan Robert C. Martin'in Clean Architecture ve Screaming Architecture katmanlarının temelini atmıştır."
                }
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                <div style={{ background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '2rem', borderRadius: '16px' }}>
                  <div style={{ color: '#3b82f6', fontWeight: 900, fontSize: '1.2rem', marginBottom: '0.5rem' }}>1. Boundary (Sınır)</div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {isEn 
                      ? "Interacts with external actors (HTTP REST Controller, GraphQL, CLI, Web UI). Translates requests and delegates to Controls." 
                      : "Dış dünya aktörleriyle (HTTP REST Controller, GraphQL, CLI, Web Formu) konuşur. İstekleri doğrular ve Control nesnesine devreder."
                    }
                  </p>
                </div>

                <div style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '2rem', borderRadius: '16px' }}>
                  <div style={{ color: '#f59e0b', fontWeight: 900, fontSize: '1.2rem', marginBottom: '0.5rem' }}>2. Control (Interactor / Use Case)</div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {isEn 
                      ? "The brain of the scenario. Orchestrates business rules, transactions, and repositories to fulfill the user's specific intent." 
                      : "Senaryonun beyni ve orkestratörüdür. Kullanıcının tek bir hedefini gerçekleştirmek için domain kurallarını ve repository'leri koordine eder."
                    }
                  </p>
                </div>

                <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '2rem', borderRadius: '16px' }}>
                  <div style={{ color: '#10b981', fontWeight: 900, fontSize: '1.2rem', marginBottom: '0.5rem' }}>3. Entity (Kurumsal Varlık)</div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {isEn 
                      ? "Pure enterprise business objects and invariant validations, independent of any UI or DB frameworks." 
                      : "Kurumsal iş kurallarını ve değişmez doğrulamaları tutan saf domain nesneleridir. UI veya ORM bağımlılığı barındırmaz."
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* WORKFLOW SECTION */}
          <div id="workflow" style={{ scrollMarginTop: '100px' }}>
            <div className="glass-card" style={{ padding: '3rem' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>
                {isEn ? "Single Responsibility Use Case Pattern" : "Tek Sorumluluklu Use Case Deseni (1 Dosya = 1 Görev)"}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                {isEn 
                  ? "Instead of a bloated 2000-line UserService, each business intent is an isolated class with an execute() method:" 
                  : "2000 satırlık devasa bir UserService yerine, her iş akışı kendi execute() metoduna sahip bağımsız bir sınıf olur:"
                }
              </p>

              <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', overflowX: 'auto' }}>
                <pre style={{ color: '#38bdf8', fontSize: '0.9rem', fontFamily: 'monospace', margin: 0 }}>
{\`// 📁 src/application/usecases/CheckoutShoppingCartUseCase.ts
export class CheckoutShoppingCartUseCase {
  constructor(
    private cartRepo: CartRepositoryPort,
    private paymentGateway: PaymentGatewayPort,
    private orderRepo: OrderRepositoryPort,
    private eventBus: EventPublisherPort
  ) {}

  async execute(command: CheckoutCommand): Promise<OrderResult> {
    const cart = await this.cartRepo.getById(command.cartId);
    cart.validateCheckoutReadiness();

    const payment = await this.paymentGateway.charge(cart.calculateTotal());
    const order = Order.createFromCart(cart, payment.transactionId);

    await this.orderRepo.save(order);
    await this.eventBus.publish(new OrderCompletedEvent(order.id));

    return { orderId: order.id, status: 'SUCCESS' };
  }
}\`}
                </pre>
              </div>
            </div>
          </div>

          {/* COMPARISON SECTION */}
          <div id="comparison" style={{ scrollMarginTop: '100px' }}>
            <div className="glass-card" style={{ padding: '3rem', borderTop: '4px solid #10b981' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>
                {isEn ? "Traditional CRUD Service vs Use-Case Driven Architecture" : "Geleneksel CRUD Servisleri vs Use-Case Odaklı Mimari"}
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
                <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '2rem', borderRadius: '16px' }}>
                  <h4 style={{ color: '#ef4444', fontWeight: 800, marginBottom: '1rem' }}>❌ Geleneksel Anemik CRUD</h4>
                  <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8, paddingLeft: '1.2rem' }}>
                    <li>Veritabanı tabloları mimariyi dikte eder.</li>
                    <li>Şişkin UserService sınıfları (20+ metot bir arada).</li>
                    <li>Bir metottaki değişiklik alakasız yerleri bozar.</li>
                    <li>Sistemin ne yaptığı klasörlere bakınca anlaşılmaz (Sessiz Mimari).</li>
                  </ul>
                </div>

                <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '2rem', borderRadius: '16px' }}>
                  <h4 style={{ color: '#10b981', fontWeight: 800, marginBottom: '1rem' }}>✅ Use-Case Driven (BCE)</h4>
                  <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8, paddingLeft: '1.2rem' }}>
                    <li>Kullanıcının iş akışı (Intent) mimariyi dikte eder.</li>
                    <li>Her use case bağımsız ve tek sorumlulukludur (SRP).</li>
                    <li>Birim testleri %100 izole ve sahte bağımlılıklarla (Mock) hızlıdır.</li>
                    <li>Klasör isimleri doğrudan sistemin özelliklerini haykırır (Screaming Architecture).</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>

        <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
          <div className="container" style={{ textAlign: 'center' }}>
             <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', background: 'rgba(245, 158, 11, 0.1)', padding: '1rem 2rem', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                <BookOpen size={24} color="#f59e0b" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.8rem', color: '#fbbf24', textTransform: 'uppercase' }}>
                    {isEn ? "Foundational Literature" : "Temel Eser"}
                  </div>
                  <div style={{ color: 'white', fontWeight: 600 }}>Object-Oriented Software Engineering: A Use Case Driven Approach (Ivar Jacobson, 1992)</div>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default UseCaseDrivenPage;
`;

fs.writeFileSync('src/presentation/pages/use-case-driven.tsx', useCasePageContent, 'utf8');

// 7. Update AppRouter.tsx to include /use-case-driven
const p_router = 'src/presentation/navigation/AppRouter.tsx';
let c_router = fs.readFileSync(p_router, 'utf8');
if (!c_router.includes('use-case-driven')) {
  c_router = c_router.replace("const CleanArchPage = lazy(() => import('../pages/clean-arch'));", "const CleanArchPage = lazy(() => import('../pages/clean-arch'));\nconst UseCaseDrivenPage = lazy(() => import('../pages/use-case-driven'));");
  c_router = c_router.replace('<Route path="/clean-arch" element={<CleanArchPage />} />', '<Route path="/clean-arch" element={<CleanArchPage />} />\n          <Route path="/use-case-driven" element={<UseCaseDrivenPage />} />');
  fs.writeFileSync(p_router, c_router, 'utf8');
}

// 8. Update catalog, search, and matrix paths to point to /use-case-driven
const p_cat = 'src/presentation/pages/catalog.tsx';
let c_cat = fs.readFileSync(p_cat, 'utf8');
c_cat = c_cat.replace("{ name: 'Use-Case Driven (BCE)', path: '/clean-arch'", "{ name: 'Use-Case Driven (BCE)', path: '/use-case-driven'");
fs.writeFileSync(p_cat, c_cat, 'utf8');

const p_sidx = 'src/presentation/data/searchIndex.ts';
let c_sidx = fs.readFileSync(p_sidx, 'utf8');
c_sidx = c_sidx.replace("id: 'use-case-driven',\n    title: 'Use-Case Driven Architecture (BCE)',\n    description: 'Ivar Jacobson BCE Pattern & Scenario-First Interactors',\n    path: '/clean-arch'", "id: 'use-case-driven',\n    title: 'Use-Case Driven Architecture (BCE)',\n    description: 'Ivar Jacobson BCE Pattern & Scenario-First Interactors',\n    path: '/use-case-driven'");
fs.writeFileSync(p_sidx, c_sidx, 'utf8');

const p_mat = 'src/infrastructure/ComparisonMatrixData.ts';
let c_mat = fs.readFileSync(p_mat, 'utf8');
c_mat = c_mat.replace("name: 'Use-Case Driven (BCE)',\n    size: { tr: 'Orta/Büyük', en: 'Medium/Large' },\n    sizeValue: 3,\n    speed: 3,\n    kiss: 3,\n    dry: 4,\n    maintAndTest: 5,\n    flex: 4,\n    aiLocality: 4,\n    color: '#f59e0b',\n    bestFor: { tr: 'İş Akışı ve Senaryo Yoğun Sistemler (BCE Modeli)', en: 'Workflow & Scenario-Dense Systems (BCE Model)' },\n    path: '/clean-arch'", "name: 'Use-Case Driven (BCE)',\n    size: { tr: 'Orta/Büyük', en: 'Medium/Large' },\n    sizeValue: 3,\n    speed: 3,\n    kiss: 3,\n    dry: 4,\n    maintAndTest: 5,\n    flex: 4,\n    aiLocality: 4,\n    color: '#f59e0b',\n    bestFor: { tr: 'İş Akışı ve Senaryo Yoğun Sistemler (BCE Modeli)', en: 'Workflow & Scenario-Dense Systems (BCE Model)' },\n    path: '/use-case-driven'");
fs.writeFileSync(p_mat, c_mat, 'utf8');

console.log('UseCaseDriven dedicated page and all routes created and linked!');

