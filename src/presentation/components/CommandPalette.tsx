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
  Scale
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
    // Core
    { id: 'home', title: 'Home', description: 'Go to start page', type: 'page', path: '/', icon: <Layout size={18} /> },
    { id: 'catalog', title: 'Architecture Catalog', description: 'Visual library of all architectures', type: 'page', path: '/catalog', icon: <Library size={18} /> },
    { id: 'compare', title: 'Comparison Matrix', description: 'Trade-off analysis system', type: 'page', path: '/compare', icon: <Table2 size={18} /> },
    { id: 'wizard', title: 'Architecture Wizard', description: 'Find your perfect architecture', type: 'page', path: '/assessment', icon: <Sparkles size={18} /> },
    { id: 'roadmap', title: 'Roadmap', description: 'Path to Senior Architect', type: 'page', path: '/roadmap', icon: <ArrowRight size={18} /> },
    { id: 'glossary', title: 'Glossary', description: 'Architectural terms and definitions', type: 'page', path: '/glossary', icon: <Book size={18} /> },
    { id: 'bookshelf', title: 'Bookshelf', description: 'Curated reading list', type: 'page', path: '/bookshelf', icon: <Book size={18} /> },

    // Design & Principles
    { id: 'clean-code', title: 'Clean Code', description: 'Naming, functions and formatting', type: 'page', path: '/clean-code', icon: <Code2 size={18} /> },
    { id: 'solid', title: 'SOLID Principles', description: 'The 5 foundations of clean code', type: 'page', path: '/solid', icon: <Box size={18} /> },
    { id: 'discipline', title: 'Discipline Catalog', description: 'The 12 commandments of architecture', type: 'page', path: '/discipline-catalog', icon: <Target size={18} /> },
    { id: 'anti-patterns', title: 'Anti-Patterns', description: 'Common architectural mistakes', type: 'page', path: '/anti-patterns', icon: <AlertTriangle size={18} /> },
    { id: 'design-patterns', title: 'Design Patterns', description: 'GoF and modern patterns', type: 'page', path: '/design-patterns', icon: <Zap size={18} /> },
    
    // Layered Architectures
    { id: 'clean-arch', title: 'Clean Architecture', description: 'The GURU pattern by Uncle Bob', type: 'page', path: '/clean-arch', icon: <Box size={18} /> },
    { id: 'onion', title: 'Onion Architecture', description: 'Dependency inversion core', type: 'page', path: '/onion', icon: <Layers size={18} /> },
    { id: 'hexagonal', title: 'Hexagonal (Ports & Adapters)', description: 'Testable and isolated', type: 'page', path: '/hexagonal', icon: <Box size={18} /> },
    { id: 'n-tier', title: 'N-Tier (Horizontal)', description: 'Classic layered architecture', type: 'page', path: '/horizontal', icon: <Layers size={18} /> },

    // Domain & Business
    { id: 'ddd', title: 'Domain-Driven Design (DDD)', description: 'Managing complex domain logic', type: 'page', path: '/ddd', icon: <Database size={18} /> },
    { id: 'vertical', title: 'Vertical Slice', description: 'Feature-first architecture', type: 'page', path: '/vertical', icon: <Zap size={18} /> },
    { id: 'soa', title: 'SOA', description: 'Service Oriented Architecture', type: 'page', path: '/soa', icon: <Globe size={18} /> },
    { id: 'microkernel', title: 'Microkernel', description: 'Plugin-based architecture', type: 'page', path: '/microkernel', icon: <Cpu size={18} /> },

    // Scalability & Distributed
    { id: 'eda', title: 'Event-Driven Architecture', description: 'Asynchronous messaging', type: 'page', path: '/eda', icon: <Zap size={18} /> },
    { id: 'cqrs', title: 'CQRS', description: 'Command Query Responsibility Segregation', type: 'page', path: '/cqrs', icon: <Database size={18} /> },
    { id: 'event-sourcing', title: 'Event Sourcing', description: 'Immutable state history', type: 'page', path: '/event-sourcing', icon: <Database size={18} /> },
    { id: 'serverless', title: 'Serverless', description: 'FaaS and cloud-native', type: 'page', path: '/serverless', icon: <Globe size={18} /> },
    { id: 'space-based', title: 'Space-Based', description: 'In-memory grid computing', type: 'page', path: '/space-based', icon: <Cpu size={18} /> },
    { id: 'big-data', title: 'Big Data (Lambda/Kappa)', description: 'High volume data processing', type: 'page', path: '/big-data', icon: <Database size={18} /> },
    { id: 'p2p', title: 'Peer-to-Peer', description: 'Decentralized networks', type: 'page', path: '/p2p', icon: <Globe size={18} /> },
    
    // Patterns & Messaging
    { id: 'broker', title: 'Broker Pattern', description: 'Message bus coordination', type: 'page', path: '/broker', icon: <Zap size={18} /> },
    { id: 'pub-sub', title: 'Publish-Subscribe', description: 'Decoupled communication', type: 'page', path: '/pub-sub', icon: <Zap size={18} /> },
    { id: 'pipe-filter', title: 'Pipe & Filter', description: 'Data transformation pipelines', type: 'page', path: '/pipe-filter', icon: <ArrowRight size={18} /> },
    { id: 'choreography', title: 'Choreography', description: 'Decentralized service coordination', type: 'page', path: '/choreography', icon: <Zap size={18} /> },
    { id: 'orchestration', title: 'Orchestration', description: 'Centralized workflow management', type: 'page', path: '/orchestration', icon: <Box size={18} /> },

    // Frontend & UI
    { id: 'mvc', title: 'MVC', description: 'Model-View-Controller', type: 'page', path: '/mvc', icon: <Layout size={18} /> },
    { id: 'mvp', title: 'MVP', description: 'Model-View-Presenter', type: 'page', path: '/mvp', icon: <Layout size={18} /> },
    { id: 'mvvm', title: 'MVVM', description: 'Model-View-ViewModel', type: 'page', path: '/mvvm', icon: <Layout size={18} /> },
    { id: 'viper', title: 'VIPER', description: 'iOS Clean Architecture', type: 'page', path: '/viper', icon: <Smartphone size={18} /> },
    { id: 'fsd', title: 'Feature-Sliced Design', description: 'Modern frontend architecture', type: 'page', path: '/fsd', icon: <Layout size={18} /> },
    { id: 'atomic', title: 'Atomic Design', description: 'UI component hierarchy', type: 'page', path: '/atomic-design', icon: <Palette size={18} /> },
    
    // Database & Quality
    { id: 'acid', title: 'ACID Transactions', description: 'Atomicity, Consistency, Isolation, Durability', type: 'page', path: '/acid', icon: <Database size={18} /> },
    { id: 'cap', title: 'CAP Theorem', description: 'Trade-offs in distributed systems', type: 'page', path: '/cap-theorem', icon: <Scale size={18} /> },
    { id: 'security', title: 'Security Architecture', description: 'Design harness and safety', type: 'page', path: '/security', icon: <Shield size={18} /> },
    { id: 'testing', title: 'Testing Strategy', description: 'TDD and Test Pyramid', type: 'page', path: '/testing', icon: <CheckCircle2 size={18} /> },
    { id: 'tdd', title: 'TDD', description: 'Test Driven Development', type: 'page', path: '/tdd', icon: <Code2 size={18} /> },
    
    // Misc
    { id: 'interpreter', title: 'Interpreter Pattern', description: 'Language and rule engines', type: 'page', path: '/interpreter', icon: <Terminal size={18} /> },
    { id: 'ecs', title: 'ECS', description: 'Entity Component System (Game Dev)', type: 'page', path: '/ecs', icon: <Cpu size={18} /> },
    { id: 'workshop', title: 'Workshop', description: 'Interactive architecture labs', type: 'page', path: '/workshop', icon: <FlaskConical size={18} /> },
    { id: 'synthesis', title: 'Synthesis Lab', description: 'Mix and match architectures', type: 'page', path: '/synthesis', icon: <FlaskConical size={18} /> },
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
