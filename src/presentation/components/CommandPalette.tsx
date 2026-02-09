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
import { GLOSSARY_TERMS } from '../../infrastructure/GlossaryData';

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
    // --- MAIN CATALOGS ---
    { id: 'catalog', title: 'System Architecture Catalog', description: 'Core system patterns (Clean, DDD, Microservices)', type: 'page', path: '/catalog', icon: <Library size={18} /> },
    { id: 'ui-catalog', title: 'UI Architecture Catalog', description: 'Frontend patterns (MVI, MVVM, Micro-Frontends)', type: 'page', path: '/ui-catalog', icon: <Layout size={18} /> },
    { id: 'data-catalog', title: 'Data & AI Catalog', description: 'Big Data, RAG, Kappa Architecture', type: 'page', path: '/data-ai-catalog', icon: <Database size={18} /> },
    { id: 'cloud-catalog', title: 'Infrastructure Catalog', description: 'Cloud, DevOps, GitOps, Zero Trust', type: 'page', path: '/cloud-catalog', icon: <Globe size={18} /> },
    { id: 'discipline-catalog', title: 'Discipline Catalog', description: 'Engineering principles, SOLID, Craftsmanship', type: 'page', path: '/discipline-catalog', icon: <Target size={18} /> },

    // --- SYSTEM & BACKEND ---
    { id: 'clean-arch', title: 'Clean Architecture', description: 'The GURU pattern by Uncle Bob', type: 'page', path: '/clean-arch', icon: <Box size={18} /> },
    { id: 'onion', title: 'Onion Architecture', description: 'Dependency inversion core', type: 'page', path: '/onion', icon: <Layers size={18} /> },
    { id: 'hexagonal', title: 'Hexagonal (Ports & Adapters)', description: 'Testable and isolated', type: 'page', path: '/hexagonal', icon: <Box size={18} /> },
    { id: 'ddd', title: 'Domain-Driven Design (DDD)', description: 'Managing complex domain logic', type: 'page', path: '/ddd', icon: <Database size={18} /> },
    { id: 'microservices', title: 'Microservices', description: 'Monolith to Microservices journey', type: 'page', path: '/microservices', icon: <Share2 size={18} /> },
    { id: 'soa', title: 'SOA', description: 'Service Oriented Architecture', type: 'page', path: '/soa', icon: <Globe size={18} /> },
    { id: 'serverless', title: 'Serverless', description: 'FaaS and cloud-native', type: 'page', path: '/serverless', icon: <Globe size={18} /> },
    { id: 'eda', title: 'Event-Driven Architecture', description: 'Asynchronous messaging', type: 'page', path: '/eda', icon: <Zap size={18} /> },
    { id: 'vertical', title: 'Vertical Slice', description: 'Feature-first architecture', type: 'page', path: '/vertical', icon: <Zap size={18} /> },
    { id: 'horizontal', title: 'N-Tier (Horizontal)', description: 'Classic layered architecture', type: 'page', path: '/horizontal', icon: <Layers size={18} /> },
    { id: 'microkernel', title: 'Microkernel', description: 'Plugin-based architecture', type: 'page', path: '/microkernel', icon: <Cpu size={18} /> },
    { id: 'plugin', title: 'Plug-in Architecture', description: 'Extendable core system', type: 'page', path: '/plugin', icon: <Cpu size={18} /> },
    { id: 'pipe-filter', title: 'Pipe & Filter', description: 'Data transformation pipelines', type: 'page', path: '/pipe-filter', icon: <ArrowRight size={18} /> },
    { id: 'ecs', title: 'ECS', description: 'Entity Component System (Game Dev)', type: 'page', path: '/ecs', icon: <Cpu size={18} /> },
    { id: 'interpreter', title: 'Interpreter Pattern', description: 'Language and rule engines', type: 'page', path: '/interpreter', icon: <Terminal size={18} /> },
    { id: 'evolution', title: 'Evolutionary Arch', description: 'Guided incremental change', type: 'page', path: '/evolution', icon: <GitBranch size={18} /> },
    { id: 'oop', title: 'OOP Fundamentals', description: 'Object-Oriented Programming', type: 'page', path: '/object-oriented', icon: <Box size={18} /> },

    // --- UI & FRONTEND ---
    { id: 'mvc', title: 'MVC', description: 'Model-View-Controller', type: 'page', path: '/mvc', icon: <Layout size={18} /> },
    { id: 'mvp', title: 'MVP', description: 'Model-View-Presenter', type: 'page', path: '/mvp', icon: <Layout size={18} /> },
    { id: 'mvvm', title: 'MVVM', description: 'Model-View-ViewModel', type: 'page', path: '/mvvm', icon: <Layout size={18} /> },
    { id: 'viper', title: 'VIPER', description: 'iOS Clean Architecture', type: 'page', path: '/viper', icon: <Smartphone size={18} /> },
    { id: 'mvi', title: 'MVI Architecture', description: 'Model-View-Intent (Unidirectional)', type: 'page', path: '/mvi', icon: <Layout size={18} /> },
    { id: 'micro-frontends', title: 'Micro-Frontends', description: 'Splitting UI into independent apps', type: 'page', path: '/micro-frontends', icon: <Grid size={18} /> },
    { id: 'atomic', title: 'Atomic Design', description: 'UI component hierarchy', type: 'page', path: '/atomic-design', icon: <Palette size={18} /> },
    { id: 'sdui', title: 'Server-Driven UI', description: 'UI logic from backend', type: 'page', path: '/server-driven-ui', icon: <Server size={18} /> },
    { id: 'islands', title: 'Islands Architecture', description: 'Partial hydration (Astro)', type: 'page', path: '/islands-arch', icon: <Layout size={18} /> },
    { id: 'tokens', title: 'Design Tokens', description: 'Design system constants', type: 'page', path: '/design-tokens', icon: <Palette size={18} /> },
    { id: 'state-driven', title: 'State-Driven UI', description: 'UI as a function of state', type: 'page', path: '/state-driven', icon: <Database size={18} /> },
    { id: 'component', title: 'Component-Driven', description: 'Building bottom-up', type: 'page', path: '/component-driven', icon: <Box size={18} /> },
    { id: 'composite', title: 'Composite UI', description: 'Aggregating UI parts', type: 'page', path: '/composite-ui', icon: <Layout size={18} /> },
    { id: 'spa-mpa', title: 'SPA vs MPA', description: 'Single vs Multi Page Apps', type: 'page', path: '/spa-vs-mpa', icon: <Globe size={18} /> },

    // --- DATA & AI ---
    { id: 'rag', title: 'RAG Architecture', description: 'Retrieval-Augmented Generation', type: 'page', path: '/rag-arch', icon: <BrainCircuit size={18} /> },
    { id: 'agentic', title: 'Agentic AI', description: 'Autonomous AI Agents', type: 'page', path: '/agentic-ai', icon: <Bot size={18} /> },
    { id: 'cqrs', title: 'CQRS', description: 'Command Query Responsibility Segregation', type: 'page', path: '/cqrs', icon: <Database size={18} /> },
    { id: 'event-sourcing', title: 'Event Sourcing', description: 'Immutable state history', type: 'page', path: '/event-sourcing', icon: <Database size={18} /> },
    { id: 'cap', title: 'CAP Theorem', description: 'Trade-offs in distributed systems', type: 'page', path: '/cap-theorem', icon: <Scale size={18} /> },
    { id: 'acid', title: 'ACID Transactions', description: 'Atomicity, Consistency, Isolation, Durability', type: 'page', path: '/acid', icon: <Database size={18} /> },
    { id: 'big-data', title: 'Big Data / Lambda', description: 'Batch and Stream processing', type: 'page', path: '/big-data', icon: <Database size={18} /> },
    { id: 'kappa', title: 'Kappa Architecture', description: 'Everything is a stream', type: 'page', path: '/kappa', icon: <Activity size={18} /> },
    { id: 'llmops', title: 'LLMOps', description: 'DevOps for LLMs', type: 'page', path: '/llm-ops', icon: <Bot size={18} /> },

    // --- CLOUD & INFRA ---
    { id: 'gitops', title: 'GitOps', description: 'Git as single source of truth', type: 'page', path: '/gitops', icon: <GitBranch size={18} /> },
    { id: 'zero-trust', title: 'Zero Trust', description: 'Never trust, always verify', type: 'page', path: '/zero-trust', icon: <ShieldCheck size={18} /> },
    { id: 'container', title: 'Containerization', description: 'Docker & Kubernetes', type: 'page', path: '/containerization', icon: <Box size={18} /> },
    { id: 'bff', title: 'BFF Pattern', description: 'Backend for Frontend', type: 'page', path: '/bff', icon: <Share2 size={18} /> },
    { id: 'space-based', title: 'Space-Based', description: 'In-memory data grid', type: 'page', path: '/space-based', icon: <Server size={18} /> },

    // --- PRINCIPLES & DISCIPLINES ---
    { id: 'clean-code', title: 'Clean Code', description: 'Naming, functions and formatting', type: 'page', path: '/clean-code', icon: <Code2 size={18} /> },
    { id: 'solid', title: 'SOLID Principles', description: 'The 5 foundations of clean code', type: 'page', path: '/solid', icon: <Box size={18} /> },
    { id: 'tdd', title: 'TDD', description: 'Test Driven Development', type: 'page', path: '/tdd', icon: <Code2 size={18} /> },
    { id: 'design-patterns', title: 'Design Patterns', description: 'GoF and modern patterns', type: 'page', path: '/design-patterns', icon: <Zap size={18} /> },
    { id: 'dependency', title: 'Dependency Management', description: 'Coupling control', type: 'page', path: '/dependency-management', icon: <Network size={18} /> },
    { id: 'moderate', title: 'Moderate Abstraction', description: 'Avoiding over-engineering', type: 'page', path: '/moderate-abstraction', icon: <Layers size={18} /> },
    { id: 'robustness', title: 'Robustness & Reliability', description: 'Circuit Breaker, Chaos Eng.', type: 'page', path: '/robustness', icon: <Activity size={18} /> },
    { id: 'anti-patterns', title: 'Anti-Patterns', description: 'Common architectural mistakes', type: 'page', path: '/anti-patterns', icon: <AlertTriangle size={18} /> },
    { id: 'testing', title: 'Easy to Test', description: 'Testability architecture', type: 'page', path: '/testing', icon: <CheckCircle2 size={18} /> },
    { id: 'docs', title: 'Docs & Annotations', description: 'ADR and Documentation', type: 'page', path: '/docs-annotations', icon: <BookOpen size={18} /> },
    { id: 'lean', title: 'Lean Clean Architecture', description: 'User Favorite: Pragmatic, fast and waste-free development structure.', type: 'page', path: '/lean-architecture', icon: <Target size={18} />, category: 'MASTERPIECE' },
    { id: 'security', title: 'Security Assurance', description: 'Governance & Safety', type: 'page', path: '/security', icon: <ShieldCheck size={18} /> },
    { id: 'abstraction', title: 'Separation of Concerns', description: 'Core Abstraction', type: 'page', path: '/abstraction', icon: <Layers size={18} /> },
  ];

  // Glossary/Tools Removed
  const allItems = [...pages];

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
        if (item.category === 'MASTERPIECE') score += 50;

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
