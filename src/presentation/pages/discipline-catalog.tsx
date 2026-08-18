import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Target, 
  BookOpen, 
  Lock, 
  Activity, 
  Beaker, 
  Layers, 
  Code2, 
  Scissors, 
  Network,
  Box,
  CheckCircle2,
  ShieldAlert,
  Anchor
} from 'lucide-react';
import SEO from '../components/SEO';

interface DisciplineItem {
  name: string;
  path: string;
  color: string;
  desc: { tr: string; en: string };
  icon: React.ReactNode;
}

interface DisciplineCategory {
  id: string;
  name: { tr: string; en: string };
  color: string;
  items: DisciplineItem[];
}

const DisciplineCatalogPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState<DisciplineItem | null>(null);

  const categories: DisciplineCategory[] = [
    {
      id: 'engineering-dna',
      name: { tr: 'Mühendislik DNA', en: 'Engineering DNA' },
      color: '#f43f5e',
      items: [
        { name: isEn ? 'Acronyms Guide' : 'Kısaltmalar (Cheat Sheet)', path: '/acronyms', color: '#818cf8', icon: <BookOpen size={24} />, desc: { tr: 'KISS, DRY, WET, AHA, GRASP, SOLID ve temel kodlama kısaltmaları.', en: 'KISS, DRY, WET, AHA, GRASP, SOLID, and essential architectural cheat sheet.' } },
        { name: 'OOP Fundamentals', path: '/oop-fundamentals', color: '#f43f5e', icon: <Box size={24} />, desc: { tr: 'Abstraction, Encapsulation, Inheritance ve Polymorphism.', en: 'Core object-oriented pillars: Abstraction, Encapsulation, Inheritance, Polymorphism.' } },
        { name: 'SOLID Principles', path: '/solid', color: '#fb7185', icon: <ShieldCheck size={24} />, desc: { tr: 'Değişime direnç göstermeyen, esnek kodun 5 ana kuralı.', en: '5 golden rules for maintainable, testable, and change-resilient software design.' } },
        { name: 'Separation of Concerns', path: '/abstraction', color: '#fda4af', icon: <Scissors size={24} />, desc: { tr: 'Sorumlulukların mantıksal ve fiziksel olarak ayrıştırılması.', en: 'Decoupling distinct business and architectural responsibilities.' } }
      ]
    },
    {
      id: 'craftsmanship',
      name: { tr: 'Yazılım Ustalığı', en: 'Craftsmanship' },
      color: '#10b981',
      items: [
        { name: 'Clean Code', path: '/clean-code', color: '#10b981', icon: <Code2 size={24} />, desc: { tr: 'Temiz, okunabilir ve sürdürülebilir kod yazma sanatı.', en: 'Self-documenting, expressive, and easily readable codebase craftsmanship.' } },
        { name: 'TDD Methodology', path: '/tdd', color: '#059669', icon: <CheckCircle2 size={24} />, desc: { tr: 'Geliştirme sürecini testlerle yönetme disiplini (Red-Green-Refactor).', en: 'Test-driven development cycle driven by rapid Red-Green-Refactor iterations.' } },
        { name: 'Easy to Test', path: '/testing', color: '#047857', icon: <Beaker size={24} />, desc: { tr: 'Mimariyi düşük bağımlılık ve yüksek test edilebilirlik odasına taşıma.', en: 'Architecting components with loose coupling for painless unit and integration testing.' } }
      ]
    },
    {
      id: 'arch-strategy',
      name: { tr: 'Mimari Strateji', en: 'Arch. Strategy' },
      color: '#3b82f6',
      items: [
        { name: 'Design Patterns', path: '/design-patterns', color: '#3b82f6', icon: <Zap size={24} />, desc: { tr: 'Tekrar eden yapısal sorunlara kanıtlanmış çözümler (GOF).', en: 'Proven Gang of Four structural and behavioral patterns for recurring problems.' } },
        { name: 'Dependency Management', path: '/dependency-management', color: '#60a5fa', icon: <Network size={24} />, desc: { tr: 'Bileşenler arası bağımlılıkların reaktif ve esnek yönetimi.', en: 'Principles for governing component couplings and dependency inversion flows.' } },
        { name: 'Moderate Abstraction', path: '/moderate-abstraction', color: '#93c5fd', icon: <Layers size={24} />, desc: { tr: 'Ne çok derin ne çok sığ; tam kararında soyutlama dengesi.', en: 'Finding the pragmatic balance between over-engineering and premature abstraction.' } }
      ]
    },
    {
      id: 'governance',
      name: { tr: 'Yönetişim & Güvenlik', en: 'Governance & Quality' },
      color: '#a855f7',
      items: [
        { name: 'Security Assurance', path: '/security', color: '#a855f7', icon: <Lock size={24} />, desc: { tr: 'Mimari seviyede güvenlik katmanları ve kalkan önlemleri.', en: 'Architectural security layers, defense-in-depth, and zero-trust guidelines.' } },
        { name: 'Docs & Annotations', path: '/docs-annotations', color: '#c084fc', icon: <BookOpen size={24} />, desc: { tr: 'Kararların nedenlerini (ADR) dökümante etme kültürü.', en: 'Architecture Decision Records (ADR) and living documentation practices.' } },
        { name: 'Lean Philosophy', path: '/lean-architecture', color: '#d8b4fe', icon: <Target size={24} />, desc: { tr: 'İsraftan kaçınma ve sürekli değer üretme zihin yapısı.', en: 'Lean principles: Eliminating waste, maximizing flow, and delivering continuous value.' } },
        { name: 'Robustness & Reliability', path: '/robustness', color: '#fde047', icon: <Activity size={24} />, desc: { tr: 'Hatalara karşı toleranslı ve sarsılmaz çalışma prensibi.', en: 'Fault-tolerant, self-healing, and resilient distributed system engineering.' } }
      ]
    },
    {
      id: 'anti-patterns',
      name: { tr: 'Anti-Patterns & Deney', en: 'Anti-Patterns & Synthesis' },
      color: '#475569',
      items: [
        { name: isEn ? 'Architecture Hall of Shame' : 'Anti-Patterns Galerisi', path: '/anti-patterns', color: '#475569', icon: <ShieldAlert size={24} />, desc: { tr: 'Kaçınılması gereken tehlikeli mimari tuzaklar ve anti-pattern galerisi.', en: 'Dangerous structural anti-patterns, spaghetti code, and architectural pitfalls to avoid.' } },
        { name: 'Synthesis Lab', path: '/synthesis-lab', color: '#94a3b8', icon: <Anchor size={24} />, desc: { tr: 'Mimari sentez ve hibrit deney laboratuvarı.', en: 'Architectural playground for synthesizing custom hybrid pattern blueprints.' } }
      ]
    }
  ];

  return (
    <>
      <SEO
        title={isEn ? "Architectural Disciplines & Standards Matrix | ArchAcademy" : "Mimari Disiplinler & Standartlar Matrisi | ArchAcademy"}
        description={isEn 
          ? "Master core engineering disciplines: SOLID, Clean Code, TDD, Design Patterns, Security, and Architecture Governance." 
          : "Yazılım mühendisliği disiplinleri: SOLID, Clean Code, TDD, Tasarım Desenleri, Güvenlik ve Mimari Yönetişim."
        }
        keywords="architecture disciplines, solid, clean code, tdd, design patterns, security architecture, software engineering"
        canonicalUrl="/discipline-catalog"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: '#020617', minHeight: '100vh', paddingTop: '100px', overflowX: 'hidden' }}>
        <div className="container" style={{ maxWidth: '1600px' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(168, 85, 247, 0.1)', padding: '0.5rem 1.2rem', borderRadius: '100px', color: '#a855f7', fontWeight: 800, fontSize: '0.8rem', marginBottom: '1rem', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
              <Sparkles size={16} /> {isEn ? "ARCHITECTURAL DISCIPLINES" : "MİMARİ DİSİPLİNLER"}
            </motion.div>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 950, letterSpacing: '-2px', margin: 0, color: 'white' }}>
              {isEn ? "Architectural" : "Mimari"} <span className="gradient-text">{isEn ? "Disciplines Matrix" : "Disiplinler Matrisi"}</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              {isEn ? "Master engineering craftsmanship, clean code pillars, and strategic architectural governance." : "Yazılım ustalığı, temiz kod temelleri ve stratejik mimari yönetişim standartları."}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', paddingBottom: '100px' }}>
            {categories.map((cat) => (
              <div key={cat.id} className="glass-card" style={{ borderTop: `4px solid ${cat.color}`, padding: '2rem' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: cat.color }}></span>
                  {isEn ? cat.name.en : cat.name.tr}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {cat.items.map((item) => (
                    <motion.div
                      key={item.path}
                      onClick={() => navigate(item.path)}
                      whileHover={{ x: 6 }}
                      style={{
                        padding: '1.2rem',
                        background: 'rgba(255, 255, 255, 0.02)',
                        borderRadius: '16px',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ color: item.color }}>{item.icon}</div>
                        <strong style={{ color: 'white', fontSize: '1.05rem' }}>{item.name}</strong>
                      </div>
                      <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                        {isEn ? item.desc.en : item.desc.tr}
                      </p>
                      <div style={{ marginTop: '4px', fontSize: '0.8rem', color: item.color, fontWeight: 700 }}>
                        {isEn ? "Explore Discipline →" : "Disiplini İncele →"}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </motion.div>
    </>
  );
};

export default DisciplineCatalogPage;
