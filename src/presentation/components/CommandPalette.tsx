import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Palette
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GLOSSARY_TERMS } from '../../infrastructure/data/GlossaryData';

interface SearchItem {
  id: string;
  title: string;
  description: string;
  type: 'page' | 'glossary' | 'action';
  path?: string;
  icon: React.ReactNode;
  category?: string;
}

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const pages: SearchItem[] = [
    { id: 'home', title: 'Home', description: 'Go to start page', type: 'page', path: '/', icon: <Layout size={18} /> },
    { id: 'glossary', title: 'Glossary', description: 'Architectural terms and definitions', type: 'page', path: '/glossary', icon: <Book size={18} /> },
    { id: 'wizard', title: 'Architecture Wizard', description: 'Find your perfect architecture', type: 'page', path: '/assessment', icon: <Sparkles size={18} /> },
    { id: 'surgery', title: 'Refactoring Surgery', description: 'Clean code workshop', type: 'page', path: '/refactoring', icon: <Cpu size={18} /> },
    { id: 'roadmap', title: 'Roadmap', description: 'Learn your way to Senior Architect', type: 'page', path: '/roadmap', icon: <ArrowRight size={18} /> },
    { id: 'clean-arch', title: 'Clean Architecture', description: 'The GURU pattern by Uncle Bob', type: 'page', path: '/clean-arch', icon: <Box size={18} /> },
    { id: 'vertical', title: 'Vertical Slice', description: 'Modern startup architecture', type: 'page', path: '/vertical', icon: <Zap size={18} /> },
    { id: 'onion', title: 'Onion Architecture', description: 'Dependency inversion at its best', type: 'page', path: '/onion', icon: <Box size={18} /> },
    { id: 'hexagonal', title: 'Hexagonal Architecture', description: 'Ports and Adapters pattern', type: 'page', path: '/hexagonal', icon: <Box size={18} /> },
    { id: 'solid', title: 'SOLID Principles', description: 'The 5 foundations of clean code', type: 'page', path: '/solid', icon: <Box size={18} /> },
    { id: 'ddd', title: 'Domain-Driven Design', description: 'Managing complex domain logic', type: 'page', path: '/ddd', icon: <Database size={18} /> },
    { id: 'eda', title: 'Event-Driven Architecture', description: 'Building reactive systems', type: 'page', path: '/eda', icon: <Zap size={18} /> },
    { id: 'cqrs', title: 'CQRS & Event Sourcing', description: 'Separating reads from writes', type: 'page', path: '/cqrs', icon: <Database size={18} /> },
    { id: 'system', title: 'System Design', description: 'Monolith vs Microservices', type: 'page', path: '/system', icon: <Cpu size={18} /> },
    { id: 'microkernel', title: 'Microkernel Architecture', description: 'Plug-in based system design', type: 'page', path: '/microkernel', icon: <Box size={18} /> },
    { id: 'serverless', title: 'Serverless (FaaS)', description: 'Event-driven scaling without servers', type: 'page', path: '/serverless', icon: <Zap size={18} /> },
    { id: 'p2p', title: 'Peer-to-Peer', description: 'Decentralized network architecture', type: 'page', path: '/p2p', icon: <Globe size={18} /> },
    { id: 'soa', title: 'SOA (Service Oriented)', description: 'Enterprise service bus and governance', type: 'page', path: '/soa', icon: <Box size={18} /> },
    { id: 'evolutionary', title: 'Evolutionary Architecture', description: 'Support guided, incremental change', type: 'page', path: '/evolution', icon: <Sparkles size={18} /> },
    { id: 'big-data', title: 'Big Data Stack', description: 'Lambda and Kappa architectures', type: 'page', path: '/big-data', icon: <Database size={18} /> },
    { id: 'ecs', title: 'ECS (Game Dev)', description: 'Entity Component System for performance', type: 'page', path: '/ecs', icon: <Cpu size={18} /> },
    { id: 'pipe-filter', title: 'Pipe & Filter', description: 'Data processing pipelines', type: 'page', path: '/pipe-filter', icon: <ArrowRight size={18} /> },
    { id: 'space-based', title: 'Space-Based Arch', description: 'High-concurrency in-memory systems', type: 'page', path: '/space-based', icon: <Database size={18} /> },
    { id: 'interpreter', title: 'Interpreter Pattern', description: 'Rule engines and DSL design', type: 'page', path: '/interpreter', icon: <Terminal size={18} /> },
    { id: 'choreography', title: 'Choreography', description: 'Decentralized service coordination', type: 'page', path: '/choreography', icon: <Zap size={18} /> },
    { id: 'orchestration', title: 'Orchestration', description: 'Centralized workflow management', type: 'page', path: '/orchestration', icon: <Box size={18} /> },
    { id: 'clean-code', title: 'Clean Code', description: 'Software craftsmanship and naming standards', type: 'page', path: '/clean-code', icon: <Box size={18} /> },
    { id: 'lean-philosophy', title: 'Lean Philosophy (YAGNI)', description: 'Eliminate waste and deliver fast', type: 'page', path: '/lean-architecture', icon: <Target size={18} /> },
    { id: 'atomic-design', title: 'Atomic Design', description: 'Hierarchical UI architecture from Atoms to Pages', type: 'page', path: '/atomic-design', icon: <Sparkles size={18} /> },
    { id: 'design-patterns', title: 'Design Patterns', description: 'Proven solutions (GOF) for software design', type: 'page', path: '/design-patterns', icon: <Zap size={18} /> },
    { id: 'design-tokens', title: 'Design Tokens', description: 'Architectural visual atoms and SSOT styling', type: 'page', path: '/design-tokens', icon: <Palette size={18} /> },
    { id: 'discipline-catalog', title: 'Discipline Catalog', description: 'The 12 commandments of architecture', type: 'page', path: '/discipline-catalog', icon: <Target size={18} /> },
    { id: 'design-system', title: 'Design System', description: 'ArchAcademy visual principles and project design', type: 'page', path: '/project-arch?tab=design', icon: <Palette size={18} /> },
    { id: 'docs', title: 'Docs & Annotations', description: 'Architecture Decision Records (ADR) and more', type: 'page', path: '/docs-annotations', icon: <Book size={18} /> },
  ];

  const glossaryItems: SearchItem[] = GLOSSARY_TERMS.map(term => ({
    id: `glossary-${term.term}`,
    title: term.term,
    description: term.definition,
    type: 'glossary',
    path: `/glossary?search=${encodeURIComponent(term.term)}`,
    icon: <Terminal size={18} />,
    category: term.category
  }));

  const allItems = [...pages, ...glossaryItems];

  const filteredItems = query 
    ? allItems
        .map(item => {
          const title = item.title.toLowerCase();
          const desc = item.description.toLowerCase();
          const q = query.toLowerCase();
          let score = 0;

          if (title === q) score += 100;
          else if (title.startsWith(q)) score += 80;
          else if (title.includes(q)) score += 60;
          else if (desc.includes(q)) score += 20;

          // Boost pages over glossary if matches are similar
          if (item.type === 'page') score += 10;

          return { ...item, score };
        })
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8)
    : pages;

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

            <div style={{ maxHeight: '400px', overflowY: 'auto', padding: '0.5rem' }}>
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
                      padding: '1rem',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      background: selectedIndex === index ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                      transition: 'all 0.2s',
                      border: selectedIndex === index ? '1px solid rgba(59, 130, 246, 0.2)' : '1px solid transparent'
                    }}
                  >
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: selectedIndex === index ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: selectedIndex === index ? 'white' : 'var(--text-secondary)'
                    }}>
                      {item.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'white', fontWeight: 600 }}>{item.title}</span>
                        {item.category && (
                          <span style={{ 
                            fontSize: '0.6rem', 
                            background: 'rgba(255,255,255,0.05)', 
                            padding: '2px 6px', 
                            borderRadius: '4px',
                            color: 'var(--text-secondary)'
                          }}>
                            {item.category}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {item.description.length > 80 ? item.description.substring(0, 80) + '...' : item.description}
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
