import React from 'react';
import { motion } from 'framer-motion';
import { Box, Wind, Cpu, Palette, Zap, Globe, ShieldCheck, Bot } from 'lucide-react';

const ProjectTechStack = () => {
  const stack = [
    { name: 'TypeScript 5.x & React 18', icon: <Cpu />, desc: 'Tam tip güvenliği, katı sözleşmeler ve modüler komponent tabanlı yapı.', color: '#3178c6' },
    { name: 'Vite 6 Bundler', icon: <Zap />, desc: 'Ultra hızlı HMR (Hot Module Replacement) ve optimize edilmiş rollup bundle yönetimi.', color: '#eab308' },
    { name: 'Swarm Multi-Agent Engine', icon: <Bot />, desc: '8 eşzamanlı işçi ile yerel LLM modelleri üzerinden çalışan otonom çeviri ve analiz motoru.', color: '#8b5cf6' },
    { name: 'i18next Dynamic Localization', icon: <Globe />, desc: 'Sıfır gecikmeli, reaktif ve tam çift dilli (TR/EN) mimari altyapı.', color: '#10b981' },
    { name: 'PWA & Offline Workbox', icon: <ShieldCheck />, desc: 'Service worker önbellekleme ile internet olmadan da çalışan Progressive Web App.', color: '#06b6d4' },
    { name: 'Framer Motion & Glassmorphism', icon: <Wind />, desc: 'GPU hızlandırmalı modern sayfa geçişleri, 3D görselleştirmeler ve derinlik hissi.', color: '#ff0055' },
    { name: 'Zero-Runtime CSS Variables', icon: <Palette />, desc: 'JavaScript çalıştırma maliyeti olmayan, tema uyumlu saf CSS değişkenleri.', color: '#ec4899' },
    { name: 'Lucide Vector Icons', icon: <Box />, desc: 'Modern, hafif ve ağaç sallama (tree-shaking) uyumlu ikon kütüphanesi.', color: '#10b981' }
  ];

  return (
    <section style={{ padding: '100px 0' }}>
      <div className="container">
        <h2 className="section-title">Teknoloji Yığını (Tech Stack)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {stack.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
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
              <h4 style={{ marginBottom: '1rem', color: 'white' }}>{item.name}</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectTechStack;
