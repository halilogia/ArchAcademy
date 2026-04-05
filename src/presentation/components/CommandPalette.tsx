import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Fuse from 'fuse.js';
import {
  Search,
  Terminal,
  Book,
  Box,
  Zap,
  Maximize2,
  Command,
  ArrowRight,
  Sparkles,
  Layout,
  Cpu,
  Globe,
  Database,
  Target,
  Palette,
  Library,
  Table2,
  Shield,
  Layers,
  FlaskConical,
  Smartphone,
  CheckCircle2,
  Code2,
  AlertTriangle,
  Scale,
  BrainCircuit,
  Bot,
  GitBranch,
  ShieldCheck,
  Activity,
  Network,
  Grid,
  Share2,
  Server,
  BookOpen
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SEARCH_INDEX, SearchIndexItem } from '../data/searchIndex';

interface SearchItem {
  id: string;
  title: string;
  description: string;
  type: 'page' | 'glossary' | 'action';
  path?: string;
  icon: React.ReactNode;
  category?: string;
  score?: number;
}

// Icon mapping for search results
const iconMap: Record<string, React.ReactNode> = {
  'Catalog': <Library size={18} />,
  'System': <Box size={18} />,
  'UI': <Layout size={18} />,
  'Data & AI': <Database size={18} />,
  'Cloud': <Globe size={18} />,
  'Principles': <Target size={18} />,
  'Communication': <Share2 size={18} />,
  'Workshop': <Zap size={18} />,
  'Reference': <BookOpen size={18} />,
  'Main': <Sparkles size={18} />
};

// Fuse.js options for fuzzy search
const fuseOptions = {
  keys: [
    { name: 'title', weight: 0.5 },
    { name: 'description', weight: 0.2 },
    { name: 'keywords', weight: 0.2 },
    { name: 'content', weight: 0.1 }
  ],
  threshold: 0.3,
  includeScore: true,
  includeMatches: true,
  minMatchCharLength: 2,
  shouldSort: true
};

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize Fuse.js with search index
  const fuse = useMemo(() => new Fuse(SEARCH_INDEX, fuseOptions), []);

  // Convert search index to SearchItem format
  const allItems: SearchItem[] = useMemo(() => SEARCH_INDEX.map(item => ({
    id: item.id,
    title: item.title,
    description: item.description,
    type: 'page' as const,
    path: item.path,
    icon: iconMap[item.category] || <Book size={18} />,
    category: item.category === 'Principles' && item.id === 'lean' ? 'MASTERPIECE' : item.category
  })), []);

  // Fuse.js powered search
  const filteredItems = useMemo(() => {
    if (!query.trim()) return allItems.slice(0, 10);

    const results = fuse.search(query);
    
    return results
      .map(result => {
        const item = result.item as SearchIndexItem;
        const score = Math.round((1 - (result.score ?? 0)) * 100);
        return {
          id: item.id,
          title: item.title,
          description: item.description,
          type: 'page' as const,
          path: item.path,
          icon: iconMap[item.category] || <Book size={18} />,
          category: item.category === 'Principles' && item.id === 'lean' ? 'MASTERPIECE' : item.category,
          score
        };
      })
      .filter(item => item.score > 20)
      .slice(0, 10);
  }, [query, fuse, allItems]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setIsOpen(prev => !prev);
    }

    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setSelectedIndex(0);
      setQuery('');
    }
  }, [isOpen]);

  const selectItem = (item: SearchItem) => {
    if (item.path) {
      navigate(item.path);
      setIsOpen(false);
    }
  };

  const onNavKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter') {
      selectItem(filteredItems[selectedIndex]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: '15vh',
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)'
        }} onClick={() => setIsOpen(false)}>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '650px',
              background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              overflow: 'hidden'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '1.25rem',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              gap: '1rem'
            }}>
              <Search size={20} className="text-primary" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search anything... (Cmd/Ctrl + K)"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={onNavKeyDown}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  fontSize: '1.1rem',
                  outline: 'none',
                  width: '100%'
                }}
              />
              <div style={{
                fontSize: '0.7rem',
                background: 'rgba(255,255,255,0.05)',
                padding: '4px 8px',
                borderRadius: '6px',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Command size={10} /> <span>K</span>
              </div>
            </div>

            <div
              className="custom-scrollbar"
              style={{
                maxHeight: '400px',
                overflowY: 'auto',
                overflowX: 'hidden',
                padding: '0.5rem',
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <div
                    key={item.id}
                    onClick={() => selectItem(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.85rem 1rem',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      background: selectedIndex === index ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                      transition: 'all 0.2s',
                      border: selectedIndex === index ? '1px solid rgba(59, 130, 246, 0.2)' : '1px solid transparent',
                      width: '100%',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: selectedIndex === index ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: selectedIndex === index ? 'white' : 'var(--text-secondary)',
                      flexShrink: 0
                    }}>
                      {item.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'white', fontWeight: 600, fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</span>
                        {item.category && (
                          <span style={{
                            fontSize: '0.6rem',
                            background: 'rgba(255,255,255,0.05)',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            color: 'var(--text-secondary)',
                            flexShrink: 0
                          }}>
                            {item.category}
                          </span>
                        )}
                      </div>
                      <div style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-secondary)',
                        marginTop: '2px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        opacity: 0.7
                      }}>
                        {item.description}
                      </div>
                    </div>
                    {selectedIndex === index && (
                      <motion.div initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                        <Maximize2 size={16} color="var(--primary)" />
                      </motion.div>
                    )}
                  </div>
                ))
              ) : (
                <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  <Search size={40} style={{ opacity: 0.1, marginBottom: '1rem' }} />
                  <p>No results found for "{query}"</p>
                </div>
              )}
            </div>

            <div style={{
              padding: '0.75rem 1.25rem',
              background: 'rgba(0,0,0,0.2)',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              gap: '1.5rem',
              fontSize: '0.7rem',
              color: 'var(--text-secondary)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 4px', borderRadius: '4px' }}>↑↓</span>
                <span>Navigate</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 4px', borderRadius: '4px' }}>Enter</span>
                <span>Select</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ background: 'rgba(255,255,255,0.05)', padding: '2px 4px', borderRadius: '4px' }}>Esc</span>
                <span>Close</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
