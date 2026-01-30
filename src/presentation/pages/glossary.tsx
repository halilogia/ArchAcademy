import { GLOSSARY_TERMS } from "../../infrastructure/data/GlossaryData";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  HelpCircle, 
  BookOpen, 
  Zap, 
  Shield, 
  Cpu, 
  Terminal, 
  Globe, 
  Database,
  ArrowUp,
  Book,
  Bookmark,
  Hash,
  Info
} from 'lucide-react';

import { useLocation } from 'react-router-dom';

const GlossaryPage = () => {
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
      const matchesSearch = t.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           t.definition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLetter = selectedLetter === 'All' || t.term.startsWith(selectedLetter);
      return matchesSearch && matchesLetter;
    });
  }, [searchTerm, selectedLetter]);

  const alphabet = React.useMemo(() => ['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')], []);
  
  const visibleTerms = filteredTerms.slice(0, displayCount);

  return (
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
            Architect's Glossary
          </motion.h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Mimaride kullanılan karmaşık terimleri, mülakatlarda seni devleştirecek 
            şekilde basitleştirdik. Kavramlara hakim ol, sistemleri yönet.
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
              placeholder="Terimlerde ara... (örn: Coupling)"
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
          {visibleTerms.map((item, i) => (
            <motion.div
              key={item.term}
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
                   {item.category}
                 </span>
                 <h3 style={{ fontSize: '1.5rem', marginTop: '0.75rem', color: 'white' }}>{item.term}</h3>
              </div>

              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                {item.definition}
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
                    <strong style={{ opacity: 0.7 }}>GURU TIP:</strong> {item.guruTip}
                 </div>
              </div>
            </motion.div>
          ))}
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
              Daha Fazla Göster ({filteredTerms.length - displayCount} kalan)
            </button>
          </div>
        )}

        {filteredTerms.length === 0 && (
          <div style={{ textAlign: 'center', padding: '5rem', opacity: 0.5 }}>
             <Book size={48} style={{ marginBottom: '1rem' }} />
             <p>Aradığınız terim henüz sözlüğümüzde yok.</p>
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
  );
};

export default GlossaryPage;
