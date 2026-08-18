import { GLOSSARY_TERMS } from "../../infrastructure/GlossaryData";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Search,
  BookOpen,
  Hash,
  Info,
  Book,
  ArrowUp
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';

const GlossaryPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('All');
  const [displayCount, setDisplayCount] = useState(100);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search');
    if (search) {
      setSearchTerm(decodeURIComponent(search));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.search]);

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(100);
  }, [searchTerm, selectedLetter]);

  const filteredTerms = React.useMemo(() => {
    return GLOSSARY_TERMS.filter(t => {
      const termStr = (isEn && t.term_en) ? t.term_en : t.term;
      const defStr = (isEn && t.definition_en) ? t.definition_en : t.definition;
      
      const matchesSearch = termStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        defStr.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLetter = selectedLetter === 'All' || termStr.toUpperCase().startsWith(selectedLetter);
      return matchesSearch && matchesLetter;
    });
  }, [searchTerm, selectedLetter, isEn]);

  const alphabet = React.useMemo(() => ['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')], []);
  const visibleTerms = filteredTerms.slice(0, displayCount);

  return (
    <>
      <SEO
        title={isEn ? "Architect's Glossary | ArchAcademy" : "Terimler Sözlüğü | ArchAcademy"}
        description={isEn 
          ? "Comprehensive software architecture and system design glossary. Master core terms from Clean Architecture to Agentic AI."
          : "Yazılım mimarisi ve sistem tasarımı terimleri sözlüğü. Clean Architecture'dan Agentic AI'a tüm kavramlar."
        }
        keywords="glossary, software architecture, clean architecture, system design, acronyms, dictionary"
        canonicalUrl="/glossary"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ paddingTop: '120px', minHeight: '100vh', background: 'var(--bg-dark)' }}
      >
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <motion.h1
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="gradient-text"
              style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1.5rem' }}
            >
              {isEn ? "Architect's Glossary" : "Terimler Sözlüğü"}
            </motion.h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              {isEn
                ? "Demystify complex architectural patterns and interview terminology. Master core concepts and design resilient systems."
                : "Mimaride kullanılan karmaşık terimleri, mülakatlarda seni devleştirecek şekilde basitleştirdik. Kavramlara hakim ol, sistemleri yönet."
              }
            </p>
          </div>

          {/* Search & Filter */}
          <div style={{ marginBottom: '3rem' }}>
            <div className="glass-card" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1rem 2rem',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '24px',
              marginBottom: '2rem'
            }}>
              <Search size={20} color="var(--primary)" />
              <input
                type="text"
                placeholder={isEn ? "Search architectural terms... (e.g. Coupling, RAG, Zero Trust)" : "Terimlerde ara... (örn: Coupling, RAG, Zero Trust)"}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  fontSize: '1.1rem',
                  outline: 'none',
                  width: '100%'
                }}
              />
            </div>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              justifyContent: 'center',
              padding: '10px'
            }}>
              {alphabet.map(letter => (
                <button
                  key={letter}
                  onClick={() => setSelectedLetter(letter)}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: selectedLetter === letter ? 'var(--primary)' : 'var(--glass)',
                    color: selectedLetter === letter ? 'white' : 'var(--text-secondary)',
                    border: '1px solid var(--glass-border)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          {/* Terms Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2rem',
            paddingBottom: '2rem'
          }}>
            {visibleTerms.map((item, i) => {
              const termTitle = (isEn && item.term_en) ? item.term_en : item.term;
              const termDef = (isEn && item.definition_en) ? item.definition_en : item.definition;
              const termCategory = (isEn && item.category_en) ? item.category_en : item.category;
              const guruTip = (isEn && item.guruTip_en) ? item.guruTip_en : item.guruTip;

              return (
                <motion.div
                  key={item.id || item.term}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: Math.min(i * 0.01, 0.3) }}
                  className="glass-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    borderTop: '4px solid var(--primary)',
                    position: 'relative'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: '1.5rem',
                    right: '1.5rem',
                    opacity: 0.1
                  }}>
                    <Hash size={40} />
                  </div>

                  <div>
                    <span style={{
                      fontSize: '0.65rem',
                      background: 'rgba(59, 130, 246, 0.1)',
                      color: 'var(--primary)',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      {termCategory}
                    </span>
                    <h3 style={{ fontSize: '1.5rem', marginTop: '0.75rem', color: 'white' }}>{termTitle}</h3>
                  </div>

                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                    {termDef}
                  </p>

                  <div style={{
                    marginTop: 'auto',
                    background: 'rgba(59, 130, 246, 0.03)',
                    padding: '1rem',
                    borderRadius: '12px',
                    border: '1px dashed rgba(59, 130, 246, 0.2)',
                    display: 'flex',
                    gap: '0.75rem',
                    alignItems: 'flex-start'
                  }}>
                    <Info size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
                    <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 500 }}>
                      <strong style={{ opacity: 0.7 }}>GURU TIP:</strong> {guruTip}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Load More Section */}
          {filteredTerms.length > displayCount && (
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <button
                onClick={() => setDisplayCount(prev => prev + 100)}
                style={{
                  background: 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2.5rem',
                  borderRadius: '15px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
                  fontSize: '1rem'
                }}
              >
                {isEn 
                  ? `Load More (${filteredTerms.length - displayCount} remaining)`
                  : `Daha Fazla Göster (${filteredTerms.length - displayCount} kalan)`
                }
              </button>
            </div>
          )}

          {filteredTerms.length === 0 && (
            <div style={{ textAlign: 'center', padding: '5rem', opacity: 0.5 }}>
              <Book size={48} style={{ marginBottom: '1rem' }} />
              <p>{isEn ? "No architectural terms found matching your query." : "Aradığınız terim henüz sözlüğümüzde yok."}</p>
            </div>
          )}
        </div>
        {/* Back to Top Button */}
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'var(--primary)',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
            zIndex: 1000
          }}
        >
          <ArrowUp size={24} />
        </motion.button>
      </motion.div>
    </>
  );
};

export default GlossaryPage;
