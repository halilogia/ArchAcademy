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
        title={lang === 'en' ? "Software & Architecture Acronyms Cheat Sheet | ArchAcademy" : "Software & Architecture Acronyms Cheat Sheet | ArchAcademy"}
        description={lang === 'en' ? "Essential software engineering cheat sheet: KISS, DRY, WET, AHA, YAGNI, SOLID, GRASP, ACID, FIRST, STUPID." : "Essential technical quick-reference guide to core software and architecture principles such as KISS, DRY, WET, AHA, YAGNI, SOLID, GRASP, ACID, FIRST, and STUPID."}
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
              Software & Architecture <br />
              <span style={{ fontSize: '2.8rem', opacity: 0.9 }}>Acronyms & Principles Guide</span>
            </>
          )}
        </motion.h1>

        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
          {lang === 'en' 
            ? `Engineered for daily coding, system design, and technical interviews. Covering ${ACRONYMS_DATA.length}+ industry-standard principles from KISS to GRASP, ACID to FIRST.`
            : `Designed for daily coding, architectural decisions, and technical interviews; covering ${ACRONYMS_DATA.length}+ core principles from KISS to GRASP, ACID to FIRST.`
          }
        </p>

        {/* Search Bar */}
        <div style={{ maxWidth: '650px', margin: '0 auto', position: 'relative' }}>
          <Search size={20} color="#94a3b8" style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'en' ? "Search acronym or rule (e.g. KISS, DRY, Demeter, ACID, FIRST)..." : "Search acronym or rule (e.g. KISS, DRY, Demeter, ACID, FIRST)..."}
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
                  fontSize: '0.9rem