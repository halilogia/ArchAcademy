import React from 'react';
import { motion } from 'framer-motion';
import { Hexagon, Zap, ArrowRight, Share2, Database, Globe } from 'lucide-react';
import ArchHero from './ArchHero';

const HexagonalHero = () => {
  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        animate={{ 
          rotate: [15, 20, 15],
          scale: [1, 1.02, 1]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: '280px',
          height: '280px',
          background: 'var(--glass)',
          borderRadius: '40px',
          border: '2px solid #10b981',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 20px 60px rgba(16, 185, 129, 0.15)'
        }}
      >
        <Hexagon size={160} color="#10b981" fill="#10b98122" />
      </motion.div>
      
      {/* Adapters Animation */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={{ 
            x: [0, (i < 2 ? -40 : 40), 0],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{ repeat: Infinity, duration: 3, delay: i * 0.7 }}
          style={{
            position: 'absolute',
            padding: '12px',
            background: 'var(--glass)',
            border: '1px solid #10b98144',
            borderRadius: '12px',
            top: `${25 * i}%`,
            left: i < 2 ? '-60px' : 'auto',
            right: i >= 2 ? '-60px' : 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {i === 0 && <Database size={20} color="#10b981" />}
          {i === 1 && <Globe size={20} color="#10b981" />}
          {i === 2 && <Zap size={20} color="#10b981" />}
          {i === 3 && <Share2 size={20} color="#10b981" />}
        </motion.div>
      ))}
    </div>
  );

  return (
    <ArchHero 
      title="Hexagonal"
      subtitle="Architecture"
      description="Alistair Cockburn'un Ports and Adapters deseni. Uygulama merkezinizi dış dünyadan (DB, UI, API) tamamen soyutlayarak kristal netliğinde bir mantık kurun."
      badge="Ports & Adapters"
      color="#10b981"
      illustration={illu}
      features={[
        { icon: <Zap />, title: 'Plug & Play', desc: 'Dış servisleri (DB, SMS vb.) kodu bozmadan kolayca değiştirin.' },
        { icon: <ArrowRight />, title: 'Testability', desc: 'Domain mantığını harici bağımlılıklar olmadan anında test edin.' },
        { icon: <Hexagon />, title: 'Isolation', desc: 'İş kurallarını teknik detayların (frameworks) gürültüsünden koruyun.' }
      ]}
    />
  );
};

export default HexagonalHero;
