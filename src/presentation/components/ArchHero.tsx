import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Box, Zap, Globe, Database, Cpu } from 'lucide-react';

interface ArchHeroProps {
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  color: string;
  illustration: React.ReactNode;
  features: { icon: React.ReactNode; title: string; desc: string }[];
}

const ArchHero: React.FC<ArchHeroProps> = ({ title, subtitle, description, badge, color, illustration, features }) => {
  return (
    <section style={{ padding: '120px 0 80px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', background: `radial-gradient(circle at 20% 30%, ${color}11, transparent 70%)`, zIndex: -1 }} />
      
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'center' }}>
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: `${color}15`, padding: '8px 16px', borderRadius: '100px', color: color, fontSize: '0.85rem', fontWeight: 600, marginBottom: '2rem', border: `1px solid ${color}33` }}>
            {badge}
          </div>
          <h1 className="gradient-text" style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-2px' }}>
            {title} <br /> <span style={{ fontSize: '3rem', opacity: 0.8 }}>{subtitle}</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', marginBottom: '3rem', lineHeight: 1.7 }}>
            {description}
          </p>
          <button style={{ background: color, color: 'white', padding: '1rem 2rem', borderRadius: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none', cursor: 'pointer', boxShadow: `0 8px 24px ${color}44` }}>
            Mevzuyu Çöz <ChevronRight size={20} />
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          {illustration}
        </motion.div>
      </div>

      <div className="container" style={{ marginTop: '6rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card" style={{ borderTop: `4px solid ${color}` }}>
              <div style={{ color: color, marginBottom: '1rem' }}>{f.icon}</div>
              <h3 style={{ marginBottom: '0.5rem' }}>{f.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchHero;
