import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Search, 
  Sparkles, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  Code2, 
  Database, 
  CheckCircle2, 
  AlertTriangle,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import SEO from '../components/SEO';
import { ACRONYMS_DATA, ACRONYM_CATEGORIES } from '../../infrastructure/AcronymsData';

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles size={18} />,
  Cpu: <Cpu size={18} />,
  Layers: <Layers size={18} />,
  ShieldCheck: <ShieldCheck size={18} />,
  Code2: <Code2 size={18} />,
  Database: <Database size={18} />,
  CheckCircle2: <CheckCircle2 size={18} />,
  AlertTriangle: <AlertTriangle size={18} />
};

const AcronymsPage: React.FC = () => {
  const { i18n } = useTranslation();
  const lang = (i18n.language === 'en' ? 'en' : 'tr') as 'tr' | 'en';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredItems = useMemo(() => {
    return ACRONYMS_DATA.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const name = item.name.toLowerCase();
      const fullName = (item.fullName[lang] || item.fullName.tr).toLowerCase();
      const tagline = (item.tagline[lang] || item.tagline.tr).toLowerCase();
      const description = (item.description[lang] || item.description.tr).toLowerCase();
      const q = searchQuery.toLowerCase();

      const matchesSearch = 
        name.includes(q) ||
        fullName.includes(q) ||
        tagline.includes(q) ||
        description.includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory, lang]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: 'var(--text-primary)', paddingTop: '100px', paddingBottom: '120px' }}>
      <SEO 
        title={lang === 'en' ? "Software & Architecture Acronyms Cheat Sheet | ArchAcademy" : "Yazılım ve Mimari Kısaltmalar Rehberi (Cheat Sheet) | ArchAcademy"}
        description={lang === 'en' ? "Essential software engineering cheat sheet: KISS, DRY, WET, AHA, YAGNI, SOLID, GRASP, ACID, FIRST, STUPID." : "KISS, DRY, WET, AHA, YAGNI, SOLID, GRASP, ACID, FIRST ve STUPID gibi temel yazılım ve mimari prensiplerinin teknik başucu kılavuzu."}
      />

      {/* Hero Section */}
      <div className="container" style={{ maxWidth: '1400px', textAlign: 'center', marginBottom: '3.5rem' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.25)',
            padding: '8px 20px',
            borderRadius: '100px',
            color: '#818cf8',
            fontWeight: 700,
            fontSize: '0.9rem',
            marginBottom: '1.5rem'
          }}
        >
          <BookOpen size={16} /> THE ARCHITECT'S CHEAT SHEET
        </motion.div>

        <motion.h1 
          className="gradient-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: '3.8rem', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.5rem', letterSpacing: '-1.5px' }}
        >
          {lang === 'en' ? (
            <>
              Software & Architecture <br />
              <span style={{ fontSize: '2.8rem', opacity: 0.9 }}>Acronyms & Principles Guide</span>
            </>
          ) : (
            <>
              Yazılım & Mimari <br />
              <span style={{ fontSize: '2.8rem', opacity: 0.9 }}>Kısaltma ve Prensipler Kılavuzu</span>
            </>
          )}
        </motion.h1>

        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
          {lang === 'en' 
            ? `Engineered for daily coding, system design, and technical interviews. Covering ${ACRONYMS_DATA.length}+ industry-standard principles from KISS to GRASP, ACID to FIRST.`
            : `Günlük kodlama, mimari kararlar ve teknik mülakatlar için tasarlanmış; KISS'ten GRASP'e, ACID'den FIRST kurallarına kadar ${ACRONYMS_DATA.length}+ temel prensip.`
          }
        </p>

        {/* Search Bar */}
        <div style={{ maxWidth: '650px', margin: '0 auto', position: 'relative' }}>
          <Search size={20} color="#94a3b8" style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'en' ? "Search acronym or rule (e.g. KISS, DRY, Demeter, ACID, FIRST)..." : "Kısaltma veya prensip ara (örn: KISS, DRY, Demeter, ACID, FIRST)..."}
            style={{
              width: '100%',
              padding: '16px 20px 16px 54px',
              borderRadius: '16px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(15, 23, 42, 0.7)',
              color: 'white',
              fontSize: '1.05rem',
              backdropFilter: 'blur(12px)',
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s'
            }}
          />
        </div>
      </div>

      {/* Categories Filter Pills */}
      <div className="container" style={{ maxWidth: '1400px', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {ACRONYM_CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  borderRadius: '100px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: isSelected ? `1px solid ${cat.color}` : '1px solid rgba(255, 255, 255, 0.08)',
                  background: isSelected ? `${cat.color}22` : 'rgba(255, 255, 255, 0.03)',
                  color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? `0 0 16px ${cat.color}33` : 'none'
                }}
              >
                <span style={{ color: cat.color }}>{iconMap[cat.icon]}</span>
                {cat.title[lang] || cat.title.tr}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Acronyms */}
      <div className="container" style={{ maxWidth: '1400px' }}>
        {filteredItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-secondary)' }}>
            <AlertTriangle size={48} color="#f59e0b" style={{ marginBottom: '1rem' }} />
            <h3>{lang === 'en' ? "No Results Found" : "Sonuç Bulunamadı"}</h3>
            <p>{lang === 'en' ? `No principle matched "${searchQuery}".` : `"${searchQuery}" aramasıyla eşleşen bir prensip bulunamadı.`}</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
            gap: '1.75rem'
          }}>
            <AnimatePresence>
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.02 }}
                  className="glass-card"
                  style={{
                    background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.4) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '20px',
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderTop: `3px solid ${item.badgeColor}`,
                    position: 'relative'
                  }}
                >
                  <div>
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <div style={{
                        background: `${item.badgeColor}18`,
                        color: item.badgeColor,
                        border: `1px solid ${item.badgeColor}33`,
                        padding: '4px 12px',
                        borderRadius: '8px',
                        fontWeight: 800,
                        fontSize: '1.2rem',
                        letterSpacing: '0.5px'
                      }}>
                        {item.name}
                      </div>
                      <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 700, letterSpacing: '1px' }}>
                        {item.category}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.3rem', color: '#f8fafc' }}>
                      {item.fullName[lang] || item.fullName.tr}
                    </h3>
                    
                    <div style={{ fontSize: '0.85rem', color: item.badgeColor, fontWeight: 600, marginBottom: '1rem', fontStyle: 'italic' }}>
                      "{item.tagline[lang] || item.tagline.tr}"
                    </div>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                      {item.description[lang] || item.description.tr}
                    </p>

                    {item.details && (item.details[lang] || item.details.tr) && (
                      <ul style={{ paddingLeft: '1.25rem', marginBottom: '1.25rem', color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6 }}>
                        {(item.details[lang] || item.details.tr).map((detail, dIdx) => (
                          <li key={dIdx} style={{ marginBottom: '4px' }}>{detail}</li>
                        ))}
                      </ul>
                    )}

                    {item.example && (
                      <div style={{
                        background: 'rgba(0, 0, 0, 0.4)',
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        fontFamily: 'monospace',
                        fontSize: '0.8rem',
                        color: '#38bdf8',
                        marginBottom: '1rem',
                        whiteSpace: 'pre-wrap',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                      }}>
                        {item.example}
                      </div>
                    )}
                  </div>

                  {item.relatedPath && (
                    <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <Link
                        to={item.relatedPath}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          color: item.badgeColor,
                          fontSize: '0.85rem',
                          fontWeight: 700,
                          textDecoration: 'none'
                        }}
                      >
                        {lang === 'en' ? 'Deep Dive' : 'Detaylı İncele'} <ArrowRight size={14} />
                      </Link>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Bottom Information Banner */}
      <div className="container" style={{ maxWidth: '1400px', marginTop: '5rem' }}>
        <div className="glass-card" style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(15, 23, 42, 0.6) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.2)',
          padding: '3rem',
          borderRadius: '24px',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>
            {lang === 'en' ? '📜 Principles Are Compasses, Not Dogmas' : '📜 Prensipler Kural Değil, Pusuladır'}
          </h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto 1.5rem', lineHeight: 1.7, fontSize: '1rem' }}>
            {lang === 'en'
              ? '"KISS and YAGNI teach simplicity; DRY and SOLID teach sustainability; while WET and AHA guide you away from premature abstractions. A great senior architect selects the appropriate trade-off without dogmatic adherence."'
              : '"KISS ve YAGNI size sadeliği, DRY ve SOLID sürdürülebilirliği, WET ve AHA ise gereksiz soyutlamalardan kaçınmayı öğretir. İyi bir kıdemli yazılım mimarı, bu prensipler arasında bağnazlık yapmadan projenin ihtiyacına göre doğru tavizi (trade-off) veren kişidir."'
            }
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/compare"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(99, 102, 241, 0.2)',
                color: '#818cf8',
                padding: '12px 24px',
                borderRadius: '12px',
                fontWeight: 700,
                textDecoration: 'none',
                border: '1px solid rgba(99, 102, 241, 0.3)'
              }}
            >
              {lang === 'en' ? 'Return to Master Matrix' : 'Master Matrix\'e Dön'} <ArrowRight size={16} />
            </Link>
            <Link
              to="/discipline-catalog"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '12px',
                fontWeight: 700,
                textDecoration: 'none',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {lang === 'en' ? 'Discipline Catalog' : 'Disiplinler Kataloğu'} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcronymsPage;
