import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Puzzle, 
  Share2, 
  Box, 
  Layers, 
  IterationCcw,
  ArrowRight
} from 'lucide-react';
import ArchHero from '../../../components/ArchHero';
import { useNavigate } from 'react-router-dom';

const DesignPatternsPage = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: 'Creational Patterns',
      subtitle: 'Object Creation',
      icon: <Puzzle size={40} />,
      color: '#3b82f6',
      desc: 'Patterns that control object creation mechanisms. Hide complexity and provide flexibility.',
      patterns: ['Singleton', 'Factory Method', 'Abstract Factory', 'Builder', 'Prototype']
    },
    {
      title: 'Structural Patterns',
      subtitle: 'Structural Arrangement',
      icon: <Layers size={40} />,
      color: '#10b981',
      desc: 'Patterns that combine classes and objects to form larger structures.',
      patterns: ['Adapter', 'Bridge', 'Proxy', 'Facade', 'Composite', 'Decorator']
    },
    {
      title: 'Behavioral Patterns',
      subtitle: 'Behavioral Communication',
      icon: <Share2 size={40} />,
      color: '#f59e0b',
      desc: 'Organize communication between objects, responsibility sharing, and algorithm management.',
      patterns: ['Observer', 'Strategy', 'State', 'Command', 'Mediator', 'Visitor']
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}
    >
      <ArchHero 
        title="Design"
        subtitle="Patterns"
        description="Proven, industry-standard solutions to recurring software problems. The alphabet and common language of code."
        badge="GOF / J2EE Patterns"
        color="#3b82f6"
        illustration={
          <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              style={{ position: 'absolute', width: '100%', height: '100%', border: '1px dashed rgba(59, 130, 246, 0.3)', borderRadius: '50%' }}
            />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {[...Array(9)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                  style={{ width: '25px', height: '25px', background: '#3b82f6', borderRadius: '4px' }}
                />
              ))}
            </div>
          </div>
        }
        features={[
          { icon: <Zap />, title: 'Proven Solutions', desc: "Don't reinvent the wheel; use structures tested billions of times." },
          { icon: <IterationCcw />, title: 'Common Language', desc: "Within the team, say 'Let's use a Factory here' to reduce hours-long discussions to seconds." },
          { icon: <Box />, title: 'Refactoring Tool', desc: 'The most effective weapon to simplify complex code and make it flexible.' }
        ]}
      />

      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800 }}>Pattern Categories</h2>
            <p style={{ color: 'var(--text-secondary)' }}>The 3 fundamental classifications defined by the Gang of Four (GoF).</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {categories.map((cat, i) => (
              <div key={i} className="glass-card" style={{ padding: '3rem', borderTop: `4px solid ${cat.color}`, display: 'flex', flexDirection: 'column' }}>
                <div style={{ color: cat.color, marginBottom: '1.5rem' }}>{cat.icon}</div>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '0.2rem' }}>{cat.title}</h3>
                <span style={{ color: cat.color, fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem', display: 'block' }}>
                  {cat.subtitle}
                </span>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                  {cat.desc}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto' }}>
                  {cat.patterns.map((p, pi) => (
                    <span 
                      key={pi} 
                      onClick={() => navigate(`/glossary?search=${p}`)}
                      style={{ 
                        background: 'rgba(255,255,255,0.05)', 
                        padding: '4px 10px', 
                        borderRadius: '6px', 
                        fontSize: '0.75rem', 
                        color: 'white',
                        cursor: 'pointer',
                        border: '1px solid rgba(255,255,255,0.05)'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = cat.color)}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
           <div style={{ 
             background: 'linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.5) 100%)', 
             padding: '3rem', 
             borderRadius: '24px', 
             border: '1px solid rgba(255,255,255,0.05)',
             maxWidth: '900px',
             margin: '0 auto'
           }}>
              <div style={{ fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', marginBottom: '1rem', textTransform: 'uppercase' }}>
                Modern Catalog
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                For modern and visualized explanations of the classic "Gang of Four" (GoF) patterns, Refactoring.Guru is unquestionably the best resource.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://refactoring.guru/design-patterns/catalog" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(239, 68, 68, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    Interactive Catalog (Refactoring.Guru) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>

    </motion.div>
  );
};

export default DesignPatternsPage;