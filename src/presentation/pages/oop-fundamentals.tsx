import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Box, Layers, ShieldCheck, Zap, GitFork, Activity, BookOpen } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { OOPPillarsTab } from '../components/oopfundamentals/OOPPillarsTab';
import { CompositionOverInheritanceTab } from '../components/oopfundamentals/CompositionOverInheritanceTab';
import { AnemicVsRichDomainTab } from '../components/oopfundamentals/AnemicVsRichDomainTab';
import { OOPPolymorphismSimulationTab } from '../components/oopfundamentals/OOPPolymorphismSimulationTab';

const OOPFundamentalsPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'pillars' | 'composition' | 'domainmodels' | 'simulation'>('pillars');

  return (
    <>
      <SEO
        title={isEn ? "Object-Oriented Design & Architecture Masterclass | ArchAcademy" : "Nesne Yönelimli Tasarım ve Mimari Masterclass | ArchAcademy"}
        description={isEn 
          ? "Master OOP principles: Encapsulation, Polymorphism, Composition over Inheritance, and Rich Domain Models." 
          : "Nesne Yönelimli Programlama (OOP) 4 temel direği, Bileşim Kalıtımdan Üstündür kuralı ve Zengin Domain Modelleri rehberi."
        }
        keywords="oop, object oriented programming, encapsulation, polymorphism, composition over inheritance, rich domain model, tell dont ask"
        canonicalUrl="/oop-fundamentals"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
        <ArchHero 
          title="OOP Design"
          subtitle={isEn ? "Object-Oriented Architecture" : "Nesne Yönelimli Mimari"}
          description={isEn 
            ? "The foundation of enterprise software modeling. Encapsulation, polymorphism, composition over inheritance, and Rich Domain Models." 
            : "Kurumsal yazılım mimarisinin temeltaşı. Kapsülleme, çok biçimlilik, bileşim kalıtımdan üstündür ilkesi ve Martin Fowler Zengin Domain Modelleri."
          }
          badge="Core Paradigms"
          color="#a855f7"
          illustration={
            <div style={{ position: 'relative', width: '220px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                style={{ width: '170px', height: '170px', borderRadius: '24px', border: '2px solid rgba(168, 85, 247, 0.4)', position: 'absolute' }}
              />
              <div style={{ width: '90px', height: '90px', background: '#020617', border: '3px solid #a855f7', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(168, 85, 247, 0.3)' }}>
                <Box size={36} color="#a855f7" />
                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'white', marginTop: '4px' }}>OBJECT</span>
              </div>
            </div>
          }
          features={[
            { icon: <ShieldCheck />, title: isEn ? 'Encapsulation' : 'Kapsülleme', desc: isEn ? 'Protect invariants within entities, avoiding anemic data bags.' : 'İş kurallarını nesnenin içine mühürleyin, dışarıya sadece komut verin (TDA).' },
            { icon: <GitFork />, title: isEn ? 'Composition' : 'Bileşim İlkesi', desc: isEn ? 'Favor composition over inheritance to prevent fragile base classes.' : 'Kalıtım yerine bileşim kullanarak kırılgan sınıf hiyerarşilerini önleyin.' },
            { icon: <Zap />, title: isEn ? 'Polymorphism' : 'Çok Biçimlilik', desc: isEn ? 'Eliminate complex if/else trees through polymorphic strategy contracts.' : 'Karmaşık if/else bloklarını polimorfik strateji nesneleriyle yok edin.' }
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
              { id: 'pillars', label: isEn ? '4 Pillars of OOP' : 'OOP 4 Temel Direği', icon: <Box size={18} /> },
              { id: 'composition', label: isEn ? 'Composition over Inheritance' : 'Bileşim vs Kalıtım', icon: <GitFork size={18} /> },
              { id: 'domainmodels', label: isEn ? 'Anemic vs Rich Domain' : 'Anemik vs Zengin Model', icon: <Layers size={18} /> },
              { id: 'simulation', label: isEn ? 'Polymorphism Lab' : 'Polimorfizm Laboratuvarı', icon: <Activity size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '18px',
                  border: 'none',
                  background: activeTab === tab.id ? '#a855f7' : 'transparent',
                  color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(168, 85, 247, 0.3)' : 'none'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </ArchHero>

        <div className="container" style={{ marginTop: '2rem' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'pillars' && <OOPPillarsTab key="pillars" />}
            {activeTab === 'composition' && <CompositionOverInheritanceTab key="composition" />}
            {activeTab === 'domainmodels' && <AnemicVsRichDomainTab key="domainmodels" />}
            {activeTab === 'simulation' && <OOPPolymorphismSimulationTab key="simulation" />}
          </AnimatePresence>
        </div>

        <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
          <div className="container" style={{ textAlign: 'center' }}>
             <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', background: 'rgba(168, 85, 247, 0.1)', padding: '1rem 2rem', borderRadius: '12px', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
                <BookOpen size={24} color="#a855f7" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.8rem', color: '#c084fc', textTransform: 'uppercase' }}>
                    {isEn ? "Foundational OOP Literature" : "Temel Kaynaklar"}
                  </div>
                  <div style={{ color: 'white', fontWeight: 600 }}>Design Patterns: Elements of Reusable Object-Oriented Software (GoF) & Domain-Driven Design (Eric Evans)</div>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default OOPFundamentalsPage;
