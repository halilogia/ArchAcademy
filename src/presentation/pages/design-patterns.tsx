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
import ArchHero from '../components/ArchHero';
import { useNavigate } from 'react-router-dom';

const DesignPatternsPage = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: 'Creational Patterns',
      subtitle: 'Nesne Oluşturma',
      icon: <Puzzle size={40} />,
      color: '#3b82f6',
      desc: 'Nesne oluşturma mekanizmalarını kontrol eden kalıplardır. Karmaşıklığı gizler ve esneklik sağlar.',
      patterns: ['Singleton', 'Factory Method', 'Abstract Factory', 'Builder', 'Prototype']
    },
    {
      title: 'Structural Patterns',
      subtitle: 'Yapısal Düzen',
      icon: <Layers size={40} />,
      color: '#10b981',
      desc: 'Sınıfların ve nesnelerin birleştirilerek daha büyük yapılar oluşturulmasını sağlayan kalıplardır.',
      patterns: ['Adapter', 'Bridge', 'Proxy', 'Facade', 'Composite', 'Decorator']
    },
    {
      title: 'Behavioral Patterns',
      subtitle: 'Davranışsal İletişim',
      icon: <Share2 size={40} />,
      color: '#f59e0b',
      desc: 'Nesneler arasındaki iletişimi, sorumluluk paylaşımını ve algoritmaların yönetimini düzenler.',
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
        description="Tekrar eden yazılım problemlerine getirilen kanıtlanmış, endüstri standardı çözümler. Kodun alfabesi ve ortak dili."
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
          { icon: <Zap />, title: 'Proven Solutions', desc: 'Tekerleği yeniden icat etmeyin; milyarlarca kez test edilmiş yapıları kullanın.' },
          { icon: <IterationCcw />, title: 'Common Language', desc: 'Ekip içinde "Burada bir Factory kullanalım" diyerek saatlerce sürecek tartışmaları saniyeye indirin.' },
          { icon: <Box />, title: 'Refactoring Tool', desc: 'Karmaşık kodları basitleştirmek ve esnek hale getirmek için en etkili silahtır.' }
        ]}
      />

      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800 }}>Kalıp Kategorileri</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Gang of Four (GOF) tarafından belirlenen 3 temel sınıflandırma.</p>
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
                Klasik "Gang of Four" (GoF) kalıplarının modern ve görselleştirilmiş anlatımları için Refactoring.Guru tartışmasız en iyi kaynaktır.
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
