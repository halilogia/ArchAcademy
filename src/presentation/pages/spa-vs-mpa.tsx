import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AppWindow, Files, RefreshCw, Zap, Search, WifiOff } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { SPAMPAComparisonTab } from '../components/spampa/SPAMPAComparisonTab';
import { SPAMPASimulationTab } from '../components/spampa/SPAMPASimulationTab';

const SPAvsMPAPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'simulation' | 'comparison'>('comparison');

  const heroIllustration = (
    <div style={{ position: 'relative', width: '400px', height: '300px', display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'center' }}>
      {/* SPA Representation */}
      <motion.div 
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ width: '140px', height: '180px', background: '#3b82f6', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)' }}
      >
        <AppWindow color="white" size={40} />
        <div style={{ color: 'white', fontWeight: 800, marginTop: '10px' }}>SPA</div>
        <div style={{ fontSize: '0.6rem', color: '#bfdbfe', marginTop: '5px' }}>Fluid Virtual DOM</div>
        
        <motion.div 
          animate={{ opacity: [0, 1, 0], y: [10, 0, -10] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ position: 'absolute', bottom: -20, background: '#60a5fa', padding: '5px 10px', borderRadius: '10px', fontSize: '0.6rem', color: 'white' }}
        >
          JSON Payload
        </motion.div>
      </motion.div>

      {/* VS Badge */}
      <div style={{ fontWeight: 900, fontSize: '1.2rem', color: '#64748b' }}>VS</div>

      {/* MPA Representation */}
      <div style={{ position: 'relative', width: '140px', height: '180px' }}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ 
              y: i === 0 ? [0, -10, 0] : i * 5,
              x: i * 5,
              zIndex: 3 - i
            }}
            transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
            style={{ 
              position: 'absolute', top: 0, left: 0,
              width: '100%', height: '100%', 
              background: i === 0 ? '#10b981' : '#064e3b', 
              borderRadius: '16px', 
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 10px 30px rgba(16, 185, 129, 0.2)'
            }}
          >
            {i === 0 && (
              <>
                <Files color="white" size={40} />
                <div style={{ color: 'white', fontWeight: 800, marginTop: '10px' }}>MPA</div>
                <div style={{ fontSize: '0.6rem', color: '#a7f3d0', marginTop: '5px' }}>Raw HTML Streams</div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <SEO
        title={isEn ? "SPA vs MPA Frontend Architecture Comparison | ArchAcademy" : "SPA vs MPA Frontend Mimari Karşılaştırması | ArchAcademy"}
        description={isEn 
          ? "Compare Single Page Application (SPA) vs Multi Page Application (MPA) architectures, rendering trade-offs, SEO, and user experience." 
          : "Tek Sayfa Uygulamaları (SPA) ve Çok Sayfalı Uygulamalar (MPA) mimari karşılaştırması, render stratejileri ve SEO analizleri."
        }
        keywords="spa vs mpa, single page application, multi page application, client side routing, ssr, web architecture"
        canonicalUrl="/spa-vs-mpa"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
        <ArchHero 
          title="SPA vs MPA"
          subtitle="Web Architecture"
          description={isEn 
            ? "Two fundamental paradigms shaping the modern Web. Single Page Applications (SPA) deliver silky native app-like interactivity, while Multi Page Applications (MPA) excel with classical simplicity and instantaneous SEO indexing." 
            : "Web'in iki yüzü. Tek Sayfa Uygulamaları (SPA), masaüstü uygulama hissi verirken; Çok Sayfalı Uygulamalar (MPA) klasik, SEO dostu ve basit yapı sunar."
          }
          badge="Render Strategy"
          color="#3b82f6"
          illustration={heroIllustration}
          features={[
            { 
              icon: <Zap />, 
              title: isEn ? 'Performance' : 'Performans', 
              desc: isEn ? 'SPA fetches only JSON diffs after boot; MPA fetches and parses full HTML on each navigation.' : 'SPA sadece değişen veriyi yükler. MPA her seferinde tüm HTML/CSS/JS\'i indirir.' 
            },
            { 
              icon: <Search />, 
              title: isEn ? 'SEO Indexing' : 'SEO ve İndeksleme', 
              desc: isEn ? 'MPA is natively indexable by all crawlers without hydration overhead.' : 'MPA doğuştan SEO dostudur. SPA için ekstra ayar (SSR/Prerender) gerekir.' 
            },
            { 
              icon: <WifiOff />, 
              title: isEn ? 'Offline Capabilities' : 'Çevrimdışı Çalışma (PWA)', 
              desc: isEn ? 'SPA caches entire shell architectures offline using Service Workers.' : 'SPA, Service Worker ile internet yokken bile çalışabilir (PWA).' 
            }
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
            backdropFilter: 'blur(10px)'
          }}>
            {[
              { id: 'comparison', label: isEn ? 'Trade-off Battle' : 'Mimari Karşılaştırma', icon: <Files size={18} /> },
              { id: 'simulation', label: isEn ? 'Refresh Simulator' : 'Yükleme Simülasyonu', icon: <RefreshCw size={18} /> }
            ].map((tab) => (
               <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '18px',
                  border: 'none',
                  background: activeTab === tab.id ? '#3b82f6' : 'transparent',
                  color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </ArchHero>

        <div className="container" style={{ marginTop: '2rem' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'comparison' && <SPAMPAComparisonTab key="comparison" />}
            {activeTab === 'simulation' && <SPAMPASimulationTab key="simulation" />}
          </AnimatePresence>
        </div>

        {/* Web Rendering Architecture Reference */}
        <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
          <div className="container" style={{ textAlign: 'center' }}>
             <div style={{ 
               background: 'linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.5) 100%)', 
               padding: '3rem', 
               borderRadius: '24px', 
               border: '1px solid rgba(255,255,255,0.05)',
               maxWidth: '900px',
               margin: '0 auto'
             }}>
                <div style={{ fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', marginBottom: '1rem', textTransform: 'uppercase' }}>
                  {isEn ? "Web Rendering Literature" : "Web Rendering Rehberi"}
                </div>
                <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  {isEn 
                    ? "Deep dive into web rendering models (CSR, SSR, SSG, Islands) published by Google Chrome Devs." 
                    : "Google Chrome Developers ekibinin 'Rendering on the Web' makalesi bu konudaki en net ve kapsamlı rehberdir."
                  }
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                   <a 
                     href="https://web.dev/articles/rendering-on-the-web" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     style={{ 
                       display: 'flex', alignItems: 'center', gap: '8px', 
                       background: 'rgba(59, 130, 246, 0.15)', color: '#93c5fd', 
                       padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                       border: '1px solid rgba(59, 130, 246, 0.2)', transition: 'all 0.2s'
                     }}
                   >
                      Rendering Architecture (web.dev) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                   </a>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default SPAvsMPAPage;
