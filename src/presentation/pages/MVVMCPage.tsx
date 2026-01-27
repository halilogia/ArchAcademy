import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { useProgress } from '../../context/ProgressContext';
import { Map, Share2, Box, Layout, ArrowRightLeft } from 'lucide-react';

const MVVMCPage = () => {
  const { completeStep } = useProgress();

  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/mvvm-c');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ArchHero 
        title="MVVM-C"
        subtitle="Coordinator Pattern"
        description="MVVM'i Coordinator deseniyle birleştirerek navigasyon mantığını tamamen View ve ViewModel dışına çıkaran modern yaklaşım."
        badge="Scalable UI Arch"
        color="#3b82f6"
        illustration={
          <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              style={{ padding: '2rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '24px', border: '2px solid #3b82f633' }}
            >
               <Map size={80} color="#3b82f6" />
            </motion.div>
            <motion.div 
               animate={{ x: [-50, 50, -50] }}
               transition={{ repeat: Infinity, duration: 2 }}
               style={{ position: 'absolute', top: '50px' }}
            >
               <ArrowRightLeft size={30} color="#3b82f6" opacity={0.5} />
            </motion.div>
          </div>
        }
        features={[
          { icon: <Layout />, title: "View Freedom", desc: "View sadece ekranı çizer, nereye gideceğini bilmez." },
          { icon: <Share2 />, title: "Reusable VM", desc: "ViewModel navigasyondan arındığı için başka yerlerde kullanılabilir." },
          { icon: <Box />, title: "Flow Control", desc: "Tüm uygulama akışı merkezi Coordinator'lardan yönetilir." }
        ]}
      />
    </motion.div>
  );
};

export default MVVMCPage;
