import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { useProgress } from '../../context/ProgressContext';
import { Box, Layers, Share2, ShieldCheck } from 'lucide-react';

const OOPFundamentalsPage = () => {
  const { completeStep } = useProgress();

  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/oop-fundamentals');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ArchHero 
        title="OOP"
        subtitle="Fundamentals"
        description="Nesne Yönelimli Programlama'nın (Object-Oriented Programming) 4 temel direği. Yazılım dünyasının yapı taşları."
        badge="Core Wisdom"
        color="#06b6d4"
        illustration={
          <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <Box size={100} color="#06b6d4" />
          </div>
        }
        features={[
          { icon: <Box />, title: "Encapsulation", desc: "Veri ve fonksiyonları bir arada tutma, dış dünyadan gizleme." },
          { icon: <Layers />, title: "Abstraction", desc: "Sadece gerekli olanı gösterme, karmaşıklığı gizleme." },
          { icon: <Share2 />, title: "Inheritance", desc: "Mevcut sınıflardan yeni sınıflar türetme." },
          { icon: <ShieldCheck />, title: "Polymorphism", desc: "Aynı metodun farklı nesnelerde farklı davranabilmesi." }
        ]}
      />
    </motion.div>
  );
};

export default OOPFundamentalsPage;
