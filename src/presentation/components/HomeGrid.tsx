import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Layers, Box, Cpu, Share2, Zap, Layout } from 'lucide-react';

const HomeGrid = () => {
  const items = [
    { title: 'Clean Architecture', icon: <Layers />, path: '/clean-arch', color: 'var(--primary)', desc: 'Katmanlı ve bağımsız yapı.' },
    { title: 'Vertical Slice', icon: <Layout />, path: '/vertical', color: '#f97316', desc: 'Özellik odaklı dikey dilimler.' },
    { title: 'Hexagonal', icon: <Box />, path: '/hexagonal', color: '#10b981', desc: 'Ports & Adapters prensibi.' },
    { title: 'Onion Architecture', icon: <Cpu />, path: '/onion', color: '#f43f5e', desc: 'Domain-centric concentric layers.' },
    { title: 'Event-Driven', icon: <Share2 />, path: '/eda', color: '#a855f7', desc: 'Asenkron olay akışları.' },
    { title: 'SOLID Principles', icon: <Zap />, path: '/solid', color: '#6366f1', desc: 'Temel tasarım prensipleri.' }
  ];

  return (
    <section style={{ padding: '100px 0', background: 'rgba(2, 6, 23, 0.5)' }}>
      <div className="container">
        <h2 className="section-title">Mimari Kütüphanesi</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {items.map((item, i) => (
            <Link key={i} to={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
              <motion.div
                whileHover={{ y: -10, borderColor: item.color }}
                className="glass-card"
                style={{
                  height: '100%',
                  padding: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                  border: '1px solid var(--glass-border)',
                  transition: 'border-color 0.3s'
                }}
              >
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: `${item.color}20`,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: item.color
                }}>
                  {React.cloneElement(item.icon, { size: 28 })}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item.desc}</p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeGrid;
