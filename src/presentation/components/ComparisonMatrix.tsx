import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, X, Star, Zap, Gauge, Code2, Users, Sparkles } from 'lucide-react';

const ComparisonMatrix = () => {
  const navigate = useNavigate();
  const data = [
    {
      name: 'Clean Architecture',
      size: 'Large',
      speed: 2,
      learning: 5,
      maint: 5,
      test: 5,
      ai: 5,
      color: 'var(--primary)',
      bestFor: 'Complex Enterprise Systems',
      path: '/clean-arch'
    },
    {
      name: 'Vertical Slice',
      size: 'Small to Medium',
      speed: 5,
      learning: 2,
      maint: 4,
      test: 4,
      ai: 4,
      color: '#f97316',
      bestFor: 'Rapid Feature Development',
      path: '/vertical'
    },
    {
      name: 'DDD (Methodology)',
      size: 'Large',
      speed: 1,
      learning: 5,
      maint: 5,
      test: 4,
      ai: 5,
      color: '#a78bfa',
      bestFor: 'Domain-Heavy Business Logic',
      path: '/ddd'
    },
    {
      name: 'CQRS (Pattern)',
      size: 'Medium to Large',
      speed: 2,
      learning: 4,
      maint: 4,
      test: 5,
      ai: 4,
      color: '#eab308',
      bestFor: 'High-Read/Write Systems',
      path: '/cqrs'
    },
    {
      name: 'SOLID Principles',
      size: 'Any',
      speed: 3,
      learning: 3,
      maint: 5,
      test: 5,
      ai: 5,
      color: '#6366f1',
      bestFor: 'Fundamental Code Quality',
      path: '/solid'
    },
    {
      name: 'Hexagonal',
      size: 'Medium to Large',
      speed: 3,
      learning: 4,
      maint: 5,
      test: 5,
      ai: 4,
      color: '#10b981',
      bestFor: 'Tech-Agnostic Apps',
      path: '/hexagonal'
    },
    {
      name: 'Onion Architecture',
      size: 'Medium to Large',
      speed: 3,
      learning: 4,
      maint: 5,
      test: 5,
      ai: 5,
      color: '#f43f5e',
      bestFor: 'Domain-Centric Apps',
      path: '/onion'
    },
    {
      name: 'FSD (Frontend)',
      size: 'Medium to Large',
      speed: 3,
      learning: 4,
      maint: 4,
      test: 3,
      ai: 4,
      color: '#06b6d4',
      bestFor: 'Complex React/Next Projects',
      path: '/fsd'
    },
    {
      name: 'Event-Driven (EDA)',
      size: 'Huge',
      speed: 2,
      learning: 5,
      maint: 4,
      test: 3,
      ai: 3,
      color: '#a855f7',
      bestFor: 'Distributed Microservices',
      path: '/eda'
    },
    {
      name: 'Microkernel',
      size: 'Small to Medium',
      speed: 4,
      learning: 3,
      maint: 4,
      test: 4,
      ai: 3,
      color: '#3b82f6',
      bestFor: 'Plug-in Based Apps (IDE, OS)',
      path: '/microkernel'
    },
    {
      name: 'Serverless (FaaS)',
      size: 'Small to Large',
      speed: 5,
      learning: 2,
      maint: 3,
      test: 2,
      ai: 4,
      color: '#ec4899',
      bestFor: 'Event-Triggered Business Logic',
      path: '/serverless'
    },
    {
      name: 'Event Sourcing',
      size: 'Medium to Large',
      speed: 1,
      learning: 5,
      maint: 4,
      test: 5,
      ai: 5,
      color: '#6366f1',
      bestFor: 'Audit-Heavy Financial Apps',
      path: '/event-sourcing'
    },
    {
      name: 'Space-Based',
      size: 'Huge',
      speed: 2,
      learning: 5,
      maint: 3,
      test: 2,
      ai: 2,
      color: '#eab308',
      bestFor: 'Ultra-High Concurrency Apps',
      path: '/space-based'
    },
    {
      name: 'Peer-to-Peer (P2P)',
      size: 'Variable',
      speed: 3,
      learning: 5,
      maint: 2,
      test: 2,
      ai: 2,
      color: '#10b981',
      bestFor: 'Decentralized Networks',
      path: '/p2p'
    },
    {
      name: 'SOA',
      size: 'Large',
      speed: 2,
      learning: 4,
      maint: 3,
      test: 3,
      ai: 3,
      color: '#3b82f6',
      bestFor: 'Legacy Integration & Enterprise',
      path: '/soa'
    },
    {
      name: 'n-Tier (Horizontal)',
      size: 'Any',
      speed: 4,
      learning: 1,
      maint: 2,
      test: 3,
      ai: 2,
      color: '#3b82f6',
      bestFor: 'Classic Layered Apps',
      path: '/horizontal'
    },
    {
      name: 'Broker (Kafka Style)',
      size: 'Huge',
      speed: 2,
      learning: 4,
      maint: 4,
      test: 3,
      ai: 3,
      color: '#fda4af',
      bestFor: 'Cross-Service Messaging',
      path: '/broker'
    },
    {
      name: 'Publish-Subscribe',
      size: 'Medium to Large',
      speed: 4,
      learning: 2,
      maint: 4,
      test: 3,
      ai: 3,
      color: '#fb923c',
      bestFor: 'Decoupled Notifications',
      path: '/pub-sub'
    },
    {
      name: 'Pipe-Filter',
      size: 'Medium',
      speed: 3,
      learning: 2,
      maint: 4,
      test: 5,
      ai: 4,
      color: '#8b5cf6',
      bestFor: 'Data Processing Pipelines',
      path: '/pipe-filter'
    },
    {
      name: 'MVC / MVP / MVVM',
      size: 'Small to Medium',
      speed: 5,
      learning: 2,
      maint: 3,
      test: 3,
      ai: 4,
      color: '#ec4899',
      bestFor: 'UI-Heavy Applications',
      path: '/mvc-mvvm'
    },
    {
      name: 'ECS (Game Dev)',
      size: 'Any',
      speed: 1,
      learning: 5,
      maint: 4,
      test: 4,
      ai: 3,
      color: '#10b981',
      bestFor: 'Extreme Performance Systems',
      path: '/ecs'
    },
    {
      name: 'Big Data (Lambda)',
      size: 'Huge',
      speed: 1,
      learning: 5,
      maint: 3,
      test: 2,
      ai: 3,
      color: '#06b6d4',
      bestFor: 'Petabyte Scale Analytics',
      path: '/big-data'
    },
    {
      name: 'Choreography',
      size: 'Huge',
      speed: 3,
      learning: 5,
      maint: 4,
      test: 2,
      ai: 2,
      color: '#f472b6',
      bestFor: 'Ultra-Decoupled Services',
      path: '/choreography'
    },
    {
      name: 'Orchestration',
      size: 'Large',
      speed: 4,
      learning: 3,
      maint: 3,
      test: 4,
      ai: 3,
      color: '#8b5cf6',
      bestFor: 'Complex Workflows & Sagas',
      path: '/orchestration'
    },
    {
      name: 'Interpreter',
      size: 'Small',
      speed: 2,
      learning: 4,
      maint: 5,
      test: 5,
      ai: 5,
      color: '#06b6d4',
      bestFor: 'Custom Logic & Rule Engines',
      path: '/interpreter'
    },
    {
      name: 'Primary-Secondary',
      size: 'Medium',
      speed: 4,
      learning: 2,
      maint: 3,
      test: 4,
      ai: 2,
      color: '#a78bfa',
      bestFor: 'Database High Availability',
      path: '/primary-secondary'
    },
    {
      name: 'Monolith',
      size: 'Small to Medium',
      speed: 5,
      learning: 1,
      maint: 3,
      test: 3,
      ai: 2,
      color: '#f43f5e',
      bestFor: 'Small Teams & MVPs',
      path: '/system'
    }
  ];

  const renderStars = (count) => {
    return (
      <div style={{ display: 'flex', gap: '2px' }}>
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={14} 
            fill={i < count ? "currentColor" : "transparent"} 
            color={i < count ? "inherit" : "rgba(255,255,255,0.1)"} 
          />
        ))}
      </div>
    );
  };

  return (
    <section style={{ padding: '100px 0' }}>
      <div className="container">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <h2 className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: 800 }}>THE MASTER MATRIX</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '1.5rem auto' }}>
            Mimari stiller, disiplinler ve prensiplerin stratejik kıyaslaması. 
            Doğru projeye doğru araçla başlayın.
          </p>
        </motion.div>

        <div style={{ width: '100%', overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: '0 10px',
            minWidth: '1000px'
          }}>
            <thead>
              <tr style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                <th style={{ textAlign: 'left', padding: '1rem 2rem' }}>Arch / Style / Pattern</th>
                <th style={{ textAlign: 'center', padding: '1rem' }}><Users size={18} style={{ margin: '0 auto 5px' }} /> Boyut</th>
                <th style={{ textAlign: 'center', padding: '1rem' }}><Zap size={18} style={{ margin: '0 auto 5px' }} /> Hız</th>
                <th style={{ textAlign: 'center', padding: '1rem' }}><Gauge size={18} style={{ margin: '0 auto 5px' }} /> Öğrenme</th>
                <th style={{ textAlign: 'center', padding: '1rem' }}><Check size={18} style={{ margin: '0 auto 5px' }} /> Bakım</th>
                <th style={{ textAlign: 'center', padding: '1rem' }}><Code2 size={18} style={{ margin: '0 auto 5px' }} /> Test</th>
                <th style={{ textAlign: 'center', padding: '1rem' }}><Sparkles size={18} style={{ margin: '0 auto 5px' }} /> AI Context</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.01, background: 'rgba(255,255,255,0.05)' }}
                  onClick={() => navigate(row.path)}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  style={{
                    background: 'var(--glass)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    cursor: 'pointer'
                  }}
                >
                  <td style={{ 
                    padding: '1.25rem 2rem', 
                    borderRadius: '16px 0 0 16px',
                    borderLeft: `4px solid ${row.color}`
                  }}>
                    <div style={{ fontWeight: 700, marginBottom: '4px' }}>{row.name}</div>
                    <div style={{ fontSize: '0.7rem', color: row.color, fontWeight: 600 }}>BEST FOR: {row.bestFor}</div>
                  </td>
                  <td style={{ textAlign: 'center', padding: '1.25rem', fontSize: '0.8rem' }}>{row.size}</td>
                  <td style={{ textAlign: 'center', padding: '1.25rem', color: '#f59e0b' }}>{renderStars(row.speed)}</td>
                  <td style={{ textAlign: 'center', padding: '1.25rem', color: '#3b82f6' }}>{renderStars(row.learning)}</td>
                  <td style={{ textAlign: 'center', padding: '1.25rem', color: '#10b981' }}>{renderStars(row.maint)}</td>
                  <td style={{ textAlign: 'center', padding: '1.25rem', color: '#a855f7' }}>{renderStars(row.test)}</td>
                  <td style={{ textAlign: 'center', padding: '1.25rem', borderRadius: '0 16px 16px 0', color: '#6366f1' }}>{renderStars(row.ai)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '5rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          <div className="glass-card" style={{ textAlign: 'center' }}>
            <h4 style={{ marginBottom: '1rem', color: '#f59e0b' }}>Yüksek Hız (Speed)</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Vertical Slice ve Monolith, hızlı MVP çıkarmak için en idealidir.</p>
          </div>
          <div className="glass-card" style={{ textAlign: 'center' }}>
            <h4 style={{ marginBottom: '1rem', color: '#10b981' }}>Yüksek Bakım (Long Term)</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Clean, SOLID ve Onion, yıllarca yaşayacak büyük projelerin sigortasıdır.</p>
          </div>
          <div className="glass-card" style={{ textAlign: 'center' }}>
            <h4 style={{ marginBottom: '1rem', color: '#6366f1' }}>AI Destekli Geliştirme</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Yüksek "AI Context" puanlı mimariler, Cursor/ChatGPT gibi araçlarla mükemmel uyum sağlar.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonMatrix;
