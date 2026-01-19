import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Layers, Database, Globe, Box, ShieldCheck, Zap } from 'lucide-react';
import ArchHero from './ArchHero';

const HorizontalHero = () => {
  const illu = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: i * 0.2, duration: 0.6 }}
          style={{
            width: '280px',
            height: '65px',
            background: i === 1 ? '#3b82f6' : 'var(--glass)',
            border: `2px solid ${i === 1 ? '#3b82f6' : '#3b82f644'}`,
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 25px',
            boxShadow: i === 1 ? '0 20px 50px rgba(59, 130, 246, 0.3)' : 'none'
          }}
        >
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: i === 1 ? 'white' : '#3b82f6', marginRight: '20px' }} />
          <span style={{ fontSize: '0.85rem', fontWeight: i === 1 ? 900 : 700, letterSpacing: '2px', color: i === 1 ? 'white' : 'inherit' }}>
            LAYER 0{i + 1}
          </span>
          {i === 1 && <motion.div animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} style={{ marginLeft: 'auto' }}><Zap size={18} color="white" /></motion.div>}
        </motion.div>
      ))}
    </div>
  );

  return (
    <ArchHero 
      title="Horizontal"
      subtitle="Architecture (n-Tier)"
      description="Yazılım dünyasının temeli: N-Tier Katmanlı Yapı. Kodu teknik sorumluluklara göre yatay tabakalara bölen, en yaygın ve standart yaklaşım."
      badge="Classic Enterprise"
      color="#3b82f6"
      illustration={illu}
      features={[
        { icon: <Layers />, title: 'Structured', desc: 'Net katman sınırları ile sorumlulukların mükemmel ayrımı.' },
        { icon: <ShieldCheck />, title: 'Standardized', desc: 'Geliştirme ekipleri için öğrenmesi ve uygulaması en kolay model.' },
        { icon: <Database />, title: 'Layered Security', desc: 'Veritabanına erişimin sadece belirli katmanlar üzerinden kısıtlanması.' }
      ]}
    />
  );
};

export default HorizontalHero;
