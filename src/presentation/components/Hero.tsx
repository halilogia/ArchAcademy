import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Box, ArrowRight, Target, Hexagon } from 'lucide-react';
import ArchHero from './ArchHero';

const Hero = () => {
  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Concentric rings for Clean Arch */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={{ 
            rotate: i % 2 === 0 ? 360 : -360,
          }}
          transition={{ duration: 15 + (i * 5), repeat: Infinity, ease: "linear" }}
          style={{
            position: 'absolute',
            width: `${320 - (i * 70)}px`,
            height: `${320 - (i * 70)}px`,
            borderRadius: '50%',
            border: `2px ${i === 0 ? 'solid' : 'dashed'} rgba(59, 130, 246, ${0.8 - i * 0.2})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {i === 3 && (
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <Hexagon size={50} color="#3b82f6" fill="#3b82f622" />
            </motion.div>
          )}
        </motion.div>
      ))}
      <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)', zIndex: -1 }} />
    </div>
  );

  return (
    <ArchHero 
      title="Clean"
      subtitle="Architecture"
      description="Bağımsız, test edilebilir ve sürdürülebilir yazılımlar inşa etmek için Uncle Bob un geliştirdiği katmanlı disiplin. Geleceğe yatırım yapın."
      badge="The Industry Standard"
      color="#3b82f6"
      illustration={illu}
      features={[
        { icon: <Shield />, title: 'Testability', desc: 'İş kurallarını UI veya veritabanı olmadan anında test edin.' },
        { icon: <Zap />, title: 'Independence', desc: 'Framework ve kütüphanelere asla köle olmayın, onları kullanın.' },
        { icon: <Box />, title: 'Clean Boundaries', desc: 'Katmanlar arası net sınırlar ile kod karmaşasını engelleyin.' }
      ]}
    />
  );
};

export default Hero;
