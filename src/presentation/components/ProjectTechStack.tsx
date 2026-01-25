import React from 'react';
import { motion } from 'framer-motion';
import { Box, Wind, Cpu, Palette, Zap } from 'lucide-react';

const ProjectTechStack = () => {
  const stack = [
    { name: 'Vite & React', icon: <Cpu />, desc: 'Ultra hızlı derleme ve komponent tabanlı yapı.', color: '#61dafb' },
    { name: 'Zero-Runtime CSS', icon: <Zap />, desc: 'CSS Variables ile performanslı ve koda yük getirmeyen stil yönetimi.', color: '#06b6d4' },
    { name: 'Framer Motion', icon: <Wind />, desc: 'Premium ve akıcı sayfa geçişleri/animasyonlar.', color: '#ff0055' },
    { name: 'Lucide Icons', icon: <Box />, desc: 'Modern ve anlamlı vektörel ikon seti.', color: '#10b981' },
    { name: 'Glassmorphism', icon: <Palette />, desc: 'Saydam katmanlar ve modern UI estetiği.', color: '#a855f7' }
  ];

  return (
    <section style={{ padding: '100px 0' }}>
      <div className="container">
        <h2 className="section-title">Teknoloji Yığını (Tech Stack)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {stack.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card"
              style={{ textAlign: 'center', padding: '3rem' }}
            >
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: `${item.color}20`, 
                borderRadius: '16px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: item.color,
                margin: '0 auto 1.5rem'
              }}>
                {React.cloneElement(item.icon, { size: 30 })}
              </div>
              <h4 style={{ marginBottom: '1rem' }}>{item.name}</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectTechStack;
