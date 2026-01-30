import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Code2, ShieldCheck } from 'lucide-react';

interface ProjectHeroProps {
  children?: ReactNode;
}

const ProjectHero: React.FC<ProjectHeroProps> = ({ children }) => {
  return (
    <section style={{
      padding: '120px 0 60px',
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(circle at top left, rgba(16, 185, 129, 0.1), transparent)'
    }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(16, 185, 129, 0.1)',
            padding: '8px 16px',
            borderRadius: '100px',
            color: '#10b981',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '2rem',
            border: '1px solid rgba(16, 185, 129, 0.2)'
          }}>
            <ShieldCheck size={14} /> Living Documentation
          </div>

          <h1 className="gradient-text" style={{
            fontSize: '4.5rem',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            letterSpacing: '-2px'
          }}>
            Project <br /> Architecture
          </h1>
          
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.25rem',
            maxWidth: '600px',
            marginBottom: '3rem',
            lineHeight: 1.7
          }}>
            Bu portal, içinde anlattığı prensiplerle inşa edildi. <strong>Clean Architecture</strong>, 
            <strong>SOLID</strong> ve <strong>Bileşen Temelli Tasarım</strong> uyumunu gerçek kodlar üzerinden inceleyin.
          </p>

          {children}

        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
        >
          <div style={{
            width: '350px',
            padding: '2rem',
            background: 'var(--glass)',
            borderRadius: '32px',
            border: '1px solid var(--glass-border)',
            boxShadow: '0 0 40px rgba(16, 185, 129, 0.2)'
          }}>
             <Code2 size={48} color="#10b981" style={{ marginBottom: '1.5rem' }} />
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ height: '8px', width: '100%', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }} />
                <div style={{ height: '8px', width: '80%', background: '#10b981', borderRadius: '4px' }} />
                <div style={{ height: '8px', width: '60%', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }} />
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectHero;
