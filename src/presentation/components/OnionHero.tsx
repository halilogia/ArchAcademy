import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Circle, Layers, Globe, Database } from 'lucide-react';
import ArchHero from './ArchHero';

const OnionHero = () => {
  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: i % 2 === 0 ? [0, 5, 0] : [0, -5, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            delay: i * 0.5,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            width: `${300 - (i * 70)}px`,
            height: `${300 - (i * 70)}px`,
            borderRadius: '50%',
            border: `2px solid ${i === 3 ? '#60a5fa' : '#60a5fa33'}`,
            background: i === 3 ? '#60a5fa22' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: i === 3 ? '0 0 40px rgba(96, 165, 250, 0.2)' : 'none'
          }}
        >
          {i === 3 && <Circle size={40} color="#60a5fa" fill="#60a5fa33" />}
        </motion.div>
      ))}
    </div>
  );

  return (
    <ArchHero 
      title="Onion"
      subtitle="Architecture"
      description="Bağımlılıkların her zaman merkeze doğru aktığı, domain modelini koruyan katmanlı yapı. Yazılımınızın kalbi (Domain) dış dünyadan izole kalsın."
      badge="Domain Centric"
      color="#60a5fa"
      illustration={illu}
      features={[
        { icon: <Layers />, title: 'Inward Dependency', desc: 'Dış katmanlar iç katmanlara bağlıdır, asla tersi olmaz.' },
        { icon: <Globe />, title: 'UI Independence', desc: 'Arayüz değişimlerinden çekirdek mantık etkilenmez.' },
        { icon: <Database />, title: 'Infrastructure', desc: 'Veritabanı veya dış servisler en dış katmanda kalır.' }
      ]}
    />
  );
};

export default OnionHero;
