import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Target, Trash2, Scissors, GitMerge } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { LeanCleanDeepDive } from '../components/lean/LeanCleanDeepDive';
import { LeanPrinciplesViewer } from '../components/lean/LeanPrinciplesViewer';
import { LeanCodeComparison } from '../components/lean/LeanCodeComparison';
import { LeanMaturityModel } from '../components/lean/LeanMaturityModel';

const LeanArchitecturePage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const heroIllustration = (
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Spinning Rings representing Iterative Cycles */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 15 + i * 5, repeat: Infinity, ease: 'linear' }}
          style={{ 
            position: 'absolute', 
            width: `${100 + i * 60}px`, 
            height: `${100 + i * 60}px`, 
            border: '1px dashed rgba(132, 204, 22, 0.3)', 
            borderRadius: '50%',
            borderTopColor: '#84cc16'
          }}
        />
      ))}
      
      {/* Central Core */}
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ 
          width: '80px', height: '80px', 
          background: '#84cc16', 
          borderRadius: '50%', 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 50px rgba(132, 204, 22, 0.4)'
        }}
      >
        <Target size={40} color="#0f172a" strokeWidth={3} />
      </motion.div>

      {/* Flying Particles (Waste being removed) */}
      {[1, 2, 3, 4].map(i => (
         <motion.div
           key={`p-${i}`}
           animate={{ 
              x: [0, (Math.random() - 0.5) * 400], 
              y: [0, (Math.random() - 0.5) * 400], 
              opacity: [1, 0],
              scale: [1, 0]
           }}
           transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
           style={{ position: 'absolute', width: '8px', height: '8px', background: '#ef4444', borderRadius: '2px' }}
         />
      ))}
    </div>
  );

  return (
    <>
      <SEO
        title={isEn ? "Lean Architecture & Waste Elimination | ArchAcademy" : "Yalın Mimari ve İsrafı Yok Etme | ArchAcademy"}
        description={isEn 
          ? "Master Lean Software Development principles: eliminate waste, amplify learning, defer decisions, and optimize the value stream." 
          : "Yalın yazılım geliştirme prensipleri: israfı yok etme, öğrenmeyi hızlandırma, kararları erteleme ve değer akışı optimizasyonu."
        }
        keywords="lean architecture, waste elimination, muda, mary poppendieck, agile architecture, value stream"
        canonicalUrl="/lean-architecture"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ background: 'var(--bg-dark)', minHeight: '100vh', overflowX: 'hidden' }}
      >
        <ArchHero 
          title="Lean"
          subtitle="Architecture"
          description={isEn 
            ? "Adapted from the Toyota Production System (TPS) for software engineering. Built on ruthless Waste Elimination: Less Code, Exponential Value."
            : "Toyota Üretim Sistemi'nden (TPS) yazılıma uyarlanan bu felsefe, 'İsrafı Yok Etme' (Waste Elimination) üzerine kuruludur. Az kod, çok değer."
          }
          badge="Mary & Tom Poppendieck"
          color="#84cc16"
          illustration={heroIllustration}
          features={[
            { 
              icon: <Trash2 />, 
              title: isEn ? 'Muda (Waste)' : 'Muda (İsraf)', 
              desc: isEn ? 'Unused features, stalled code, bugs, and unnecessary motion are pure waste.' : 'Ekstra özellik, bekleyen kod, hatalar ve gereksiz işlemler (motion) birer israftır.' 
            },
            { 
              icon: <Scissors />, 
              title: isEn ? 'Tailoring' : 'Terzilik (Tailoring)', 
              desc: isEn ? 'Tailor architecture to actual problem scale rather than building speculative monoliths.' : 'Süreci projeye uydurun. Her proje için devasa mimariler kurmak zorunda değilsiniz.' 
            },
            { 
              icon: <GitMerge />, 
              title: isEn ? 'Just-in-Time' : 'Tam Zamanında (JIT)', 
              desc: isEn ? 'Commit to tactical architecture at the last responsible moment.' : 'Kararları ihtiyacınız olduğu anda verin; aylar öncesinden değil.' 
            }
          ]}
        />

        <LeanCleanDeepDive />
        <LeanPrinciplesViewer />
        <LeanCodeComparison />
        <LeanMaturityModel />
      </motion.div>
    </>
  );
};

export default LeanArchitecturePage;
