import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { useProgress } from '../../context/ProgressContext';
import { Triangle, Activity, CheckCircle2, Search } from 'lucide-react';

const CAPTheoremPage = () => {
  const { completeStep } = useProgress();

  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/cap-theorem');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ArchHero 
        title="CAP"
        subtitle="Theorem"
        description="Dağıtık sistemlerin sarsılmaz yasası: Consistency (Tutarlılık), Availability (Erişilebilirlik), Partition Tolerance (Bölünme Toleransı)."
        badge="Distributed Wisdom"
        color="#3b82f6"
        illustration={
          <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <Triangle size={100} color="#3b82f6" />
          </div>
        }
        features={[
          { icon: <CheckCircle2 />, title: "Consistency", desc: "Tüm düğümler aynı anda aynı veriyi görür." },
          { icon: <Activity />, title: "Availability", desc: "Her istek mutlaka bir yanıt alır." },
          { icon: <Search />, title: "Partition Tolerance", desc: "Ağ kopmalarına rağmen sistem çalışmaya devam eder." }
        ]}
      />
    </motion.div>
  );
};

export default CAPTheoremPage;
