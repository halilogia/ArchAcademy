import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Box, ArrowRight, Target, Hexagon, Globe } from 'lucide-react';
import ArchHero from './ArchHero';

const Hero = ({ mode = 'clean', children }: { mode?: 'clean' | 'scream' | 'classic' | 'modern', children?: React.ReactNode }) => {
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

  const getContent = () => {
    switch(mode) {
      case 'scream':
        return {
          title: "Screaming",
          description: "Klasör yapısının iş amacını haykırdığı mimari. Frameworkleri bir araç olarak görüp, asıl odak noktasına iş mantığını koyun.",
          badge: "The Voice of Intent",
          features: [
            { icon: <Target />, title: 'Intent Focused', desc: 'Klasörlere baktığınızda projenin ne yaptığı çığlık atmalıdır.' },
            { icon: <ArrowRight />, title: 'Framework Delayed', desc: 'Teknik detayları en sona bırakın, iş mantığını merkeze alın.' },
            { icon: <Globe />, title: 'Visual Clarity', desc: 'Sistemin anatomisi kodun içinde bir harita gibi okunabilir olur.' }
          ]
        };
      case 'classic':
        return {
          title: "Classic",
          description: "Geleneksel katman odaklı (Layer-First) yaklaşım. Kodu teknik sorumluluklara göre bölen, düzenli ama bazen 'sessiz' kalan yapı.",
          badge: "Technical Hierarchy",
          features: [
            { icon: <Box />, title: 'Technical Groups', desc: 'Controllers, Services, Models gibi teknik kategorizasyon.' },
            { icon: <Shield />, title: 'Clear Layers', desc: 'Katmanlar arası net sınırlar ve aşağı yönlü bağımlılık akışı.' },
            { icon: <Target />, title: 'Ordered', desc: 'Her dosyanın teknik olarak ait olduğu yer bellidir.' }
          ]
        };
      case 'modern':
        return {
          title: "Modern",
          description: "Özellik odaklı (Feature-First) ve dikey dilim (Vertical Slice) yaklaşımı. Değişimi hızlandıran, bağımsız modüllerden oluşan yapı.",
          badge: "The Future Flow",
          features: [
            { icon: <Zap />, title: 'Feature Slices', desc: 'Her özellik kendi domain, use case ve api dökümünü içinde taşır.' },
            { icon: <Target />, title: 'Local Domain', desc: 'Global domain yerine dikey dilimlere özgü iş mantığı odağı.' },
            { icon: <ArrowRight />, title: 'Agile Scale', desc: 'Ekiplerin birbirine çarpmadan paralel geliştirme yapabilme gücü.' }
          ]
        };
      default:
        return {
          title: "Clean",
          description: "Bağımsız, test edilebilir ve sürdürülebilir yazılımlar inşa etmek için Uncle Bob un geliştirdiği katmanlı disiplin. Geleceğe yatırım yapın.",
          badge: "The Industry Standard",
          features: [
            { icon: <Shield />, title: 'Testability', desc: 'İş kurallarını UI veya veritabanı olmadan anında test edin.' },
            { icon: <Zap />, title: 'Independence', desc: 'Framework ve kütüphanelere asla köle olmayın, onları kullanın.' },
            { icon: <Box />, title: 'Clean Boundaries', desc: 'Katmanlar arası net sınırlar ile kod karmaşasını engelleyin.' }
          ]
        };
    }
  };

  const content = getContent();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={mode}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.3 }}
      >
        <ArchHero 
          title={content.title}
          subtitle="Architecture"
          description={content.description}
          badge={content.badge}
          color="#3b82f6"
          illustration={illu}
          features={content.features}
        >
          {children}
        </ArchHero>
      </motion.div>
    </AnimatePresence>
  );
};

export default Hero;
