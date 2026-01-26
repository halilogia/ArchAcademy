import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { useProgress } from '../../context/ProgressContext';
import { Database, ShieldCheck, Zap, Activity } from 'lucide-react';

const ACIDPage = () => {
  const { completeStep } = useProgress();

  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/acid');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ArchHero 
        title="ACID"
        subtitle="Principles"
        description="Veritabanı güvenliğinin ve veri bütünlüğünün 4 ana şartı. Atomiklik, Tutarlılık, İzolasyon ve Dayanıklılık."
        badge="Data Integrity"
        color="#6366f1"
        illustration={
          <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <Database size={100} color="#6366f1" />
          </div>
        }
        features={[
          { icon: <Zap />, title: "Atomicity", desc: "Ya hep ya hiç; işlem ya tamamlanır ya hiç yapılmaz." },
          { icon: <Activity />, title: "Consistency", desc: "Veri her zaman geçerli kurallara uygun kalır." },
          { icon: <ShieldCheck />, title: "Isolation", desc: "İşlemler birbirine karışmaz." },
          { icon: <Database />, title: "Durability", desc: "Sistem kapansa bile veriler kaybolmaz." }
        ]}
      />
    </motion.div>
  );
};

export default ACIDPage;
