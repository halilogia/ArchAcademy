import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Layers, ShieldCheck, Zap, Sliders, CheckCircle2, Box } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { AbstractionConceptTab } from '../components/abstraction/AbstractionConceptTab';
import { AbstractionLevelsTab } from '../components/abstraction/AbstractionLevelsTab';
import { AbstractionPaymentSimulationTab } from '../components/abstraction/AbstractionPaymentSimulationTab';

const AbstractionPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'concept' | 'levels' | 'simulation'>('concept');

  return (
    <>
      <SEO
        title={isEn ? "Abstraction & Pragmatic API Design | ArchAcademy" : "Soyutlama ve Pragmatik API Tasarımı | ArchAcademy"}
        description={isEn 
          ? "Master software abstraction layers, polymorphism, the Sweet Spot of abstraction, and AHA (Avoid Hasty Abstraction) principles." 
          : "Yazılımda soyutlama katmanları, polimorfizm, ideal soyutlama dengesi ve AHA (Acele Soyutlamadan Kaçın) rehberi."
        }
        keywords="abstraction, polymorphism, api design, aha principle, yagni, clean code, interfaces"
        canonicalUrl="/abstraction"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
        <ArchHero 
          title="Abstraction"
          subtitle={isEn ? "API Design & Polymorphism" : "API Tasarımı & Polimorfizm"}
          description={isEn 
            ? "The art of hiding implementation complexity behind clean contracts. Balancing loose coupling with simplicity." 
            : "Karmaşık altyapı detaylarını temiz bir arayüz (Interface) arkasına gizleme sanatı. Aşırı mühendisliğe kaçmadan ideal soyutlama dengesi kurma rehberi."
          }
          badge="Core Principles"
          color="#38bdf8"
          illustration={
            <div style={{ position: 'relative', width: '220px', height: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ width: '160px', height: '160px', borderRadius: '50%', border: '2px dashed #38bdf8', position: 'absolute' }}
              />
              <div style={{ width: '90px', height: '90px', background: '#020617', border: '3px solid #38bdf8', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(56, 189, 248, 0.3)' }}>
                <Layers size={36} color="#38bdf8" />
                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'white', marginTop: '4px' }}>INTERFACE</span>
              </div>
            </div>
          }
          features={[
            { icon: <Layers />, title: isEn ? 'Polymorphism' : 'Polimorfizm', desc: isEn ? 'Swap concrete implementations at runtime seamlessly.' : 'Çalışma zamanında implementasyonları tek satırla değiştirin.' },
            { icon: <ShieldCheck />, title: isEn ? 'AHA Principle' : 'AHA Kuralı', desc: isEn ? 'Avoid Hasty Abstraction. Prefer duplication over the wrong abstraction.' : 'Acele soyutlamadan kaçının. Yanlış soyutlama kod tekrarından daha kötüdür.' },
            { icon: <Zap />, title: isEn ? 'Loose Coupling' : 'Düşük Bağımlılık', desc: isEn ? 'Isolate infrastructure libraries from your core business entities.' : 'İş mantığını dış veritabanı veya ödeme kütüphanelerinden izole edin.' }
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
              { id: 'concept', label: isEn ? 'Concept & Layers' : 'Soyutlama Kavramı', icon: <Layers size={18} /> },
              { id: 'levels', label: isEn ? 'Abstraction Levels & AHA' : 'Seviyeler & AHA Kuralı', icon: <Sliders size={18} /> },
              { id: 'simulation', label: isEn ? 'Payment Gateway Demo' : 'Ödeme Simülasyonu', icon: <Zap size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '18px',
                  border: 'none',
                  background: activeTab === tab.id ? '#38bdf8' : 'transparent',
                  color: activeTab === tab.id ? '#020617' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
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

        <div className="container" style={{ marginTop: '2rem' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'concept' && <AbstractionConceptTab key="concept" />}
            {activeTab === 'levels' && <AbstractionLevelsTab key="levels" />}
            {activeTab === 'simulation' && <AbstractionPaymentSimulationTab key="simulation" />}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
};

export default AbstractionPage;
