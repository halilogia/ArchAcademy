import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Hexagon, Zap, Compass, Sparkles, Layers, Box, Cpu, Network } from 'lucide-react';

interface ArchItem {
  name: string;
  path: string;
  color: string;
  desc: string;
}

interface ArchCategory {
  id: string;
  name: string;
  color: string;
  items: ArchItem[];
}

const CatalogPage = () => {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState<ArchItem | null>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.02) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const categories: ArchCategory[] = [
    {
      id: 'domain-centric',
      name: 'Domain-Centric',
      color: '#a855f7',
      items: [
        { name: 'Clean Architecture', path: '/clean-arch', color: '#a855f7', desc: 'Uncle Bob\'s layers of independence.' },
        { name: 'Onion Architecture', path: '/onion', color: '#c084fc', desc: 'Structure with dependencies pointing inward.' },
        { name: 'DDD Architecture', path: '/ddd', color: '#d8b4fe', desc: 'Design focusing business logic on language and Bounded Context.' },
        { name: 'Hexagonal', path: '/hexagonal', color: '#a855f7', desc: 'Ports & Adapters abstraction model.' }
      ]
    },
    {
      id: 'layered-modern',
      name: 'Layered & Modern',
      color: '#3b82f6',
      items: [
        { name: 'Vertical Slice', path: '/vertical', color: '#3b82f6', desc: 'Modern startup-focused feature-based design.' },
        { name: 'n-Tier (Horizontal)', path: '/horizontal', color: '#60a5fa', desc: 'Classic responsibility-based layering.' },
        { name: 'FSD (Frontend)', path: '/fsd', color: '#93c5fd', desc: 'Layered structure for large-scale React/Next projects.' }
      ]
    },
    {
      id: 'distributed-messaging',
      name: 'Distributed & Messaging',
      color: '#ec4899',
      items: [
        { name: 'Broker (Kafka)', path: '/broker', color: '#ec4899', desc: 'Central message distribution system.' },
        { name: 'Pub-Sub', path: '/pub-sub', color: '#fda4af', desc: 'Publisher and subscriber model.' },
        { name: 'P2P Network', path: '/p2p', color: '#be185d', desc: 'Decentralized peer-to-peer communication.' },
        { name: 'Client-Server', path: '/client-server', color: '#db2777', desc: 'Classic client-server architecture.' },
        { name: 'EDA (Event-Driven)', path: '/eda', color: '#f472b6', desc: 'Event-driven asynchronous structure.' }
      ]
    },
    {
      id: 'structural-patterns',
      name: 'Structural Patterns',
      color: '#8b5cf6',
      items: [
        { name: 'Microkernel', path: '/microkernel', color: '#8b5cf6', desc: 'Plugin-based core system.' },
        { name: 'Plug-in Arch', path: '/plugin', color: '#a78bfa', desc: 'Dynamic module add-in architecture.' },
        { name: 'Pipe-Filter', path: '/pipe-filter', color: '#c4b5fd', desc: 'Data flow discipline through filters.' },
        { name: 'ECS (Game Dev)', path: '/ecs', color: '#8b5cf6', desc: 'High-performance data-oriented design.' },
        { name: 'Interpreter', path: '/interpreter', color: '#a78bfa', desc: 'Command interpretation and rule processing.' },
        { name: 'Primary-Secondary', path: '/primary-secondary', color: '#7c3aed', desc: 'Replication and backup strategy.' }
      ]
    },
    {
      id: 'code-patterns',
      name: 'Code Patterns (Logic)',
      color: '#10b981',
      items: [
        { name: 'MVC', path: '/mvc', color: '#10b981', desc: 'Model-View-Controller pattern.' },
        { name: 'MVP', path: '/mvp', color: '#34d399', desc: 'Model-View-Presenter interaction.' },
        { name: 'MVVM', path: '/mvvm', color: '#6ee7b7', desc: 'Model-View-ViewModel reactive structure.' },
        { name: 'MVVM-C', path: '/mvvm-c', color: '#059669', desc: 'Navigation control with Coordinator pattern.' },
        { name: 'VIPER', path: '/viper', color: '#047857', desc: 'High isolation based on Router and Interactor.' },
        { name: 'MVI', path: '/mvi', color: '#34d399', desc: 'Model-View-Intent. Unidirectional flow.' },
        { name: 'Orchestration', path: '/orchestration', color: '#065f46', desc: 'Central workflow management (Saga).' },
        { name: 'Choreography', path: '/choreography', color: '#10b981', desc: 'Distributed and autonomous collaboration.' }
      ]
    },
    {
      id: 'evolutionary',
      name: 'Evolutionary',
      color: '#6366f1',
      items: [
        { name: 'Evolutionary Arch', path: '/evolution', color: '#6366f1', desc: 'Flexible structures that evolve over time.' },
        { name: 'Object-Oriented', path: '/object-oriented', color: '#818cf8', desc: 'Class-based modular design.' },
        { name: 'Future Arch', path: '/fna-concept', color: '#4338ca', desc: 'Intent-Based and future architectures.' }
      ]
    },
    {
      id: 'elite-standard',
      name: 'Elite Standard',
      color: '#fbbf24',
      items: [
        { name: 'Elite Architecture', path: '/elite-architecture', color: '#fbbf24', desc: 'Modernized ultra-fidelity constitution inspired by Flutter guide.' }
      ]
    }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: '#020617', minHeight: '100vh', paddingTop: '100px', overflowX: 'hidden' }}>
      <div className="container" style={{ maxWidth: '1600px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(59, 130, 246, 0.1)', padding: '0.5rem 1.2rem', borderRadius: '100px', color: '#3b82f6', fontWeight: 800, fontSize: '0.8rem', marginBottom: '1rem', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
            <Layers size={16} /> CORE SYSTEM ARCHITECTURE
          </motion.div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 950, letterSpacing: '-2px', margin: 0, color: 'white' }}>
            System <span className="gradient-text">Architecture</span> Catalog
          </h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(700px, 1.4fr) 1fr', gap: '2rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', height: '900px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 1000 1000" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <defs>
                <filter id="color-glow-ultra" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="25" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <motion.g animate={{ rotate: rotation }} style={{ transformOrigin: '500px 500px' }}>
                <circle cx={500} cy={500} r={120} fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth={1} strokeDasharray="5,5" />
              </motion.g>

              <g>
                <motion.circle
                  cx={500} cy={500} r={90}
                  fill="#0f172a"
                  stroke="#3b82f6"
                  strokeWidth={2