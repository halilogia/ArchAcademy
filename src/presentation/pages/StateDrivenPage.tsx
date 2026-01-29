import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, Activity, Zap, Database } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const StateDrivenPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
      <ArchHero 
        title="State-Driven"
        subtitle="UI"
        description="Arayüzün (UI), uygulamanın anlık durumunun (State) saf bir yansıması olduğu modern reaktif paradigma. UI = f(State)."
        badge="Reactive Paradigm"
        color="#22c55e"
        illustration={
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ padding: '20px', background: '#22c55e22', borderRadius: '50%', border: '2px solid #22c55e' }}>DATA</div>
            <motion.div animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity }}><Zap /></motion.div>
            <div style={{ padding: '20px', background: '#fff', color: '#000', borderRadius: '12px' }}>UI</div>
          </div>
        }
        features={[
          { icon: <Database />, title: 'Single Source', desc: 'Gerçek, DOM\'da değil State\'te saklanır.' },
          { icon: <RefreshCcw />, title: 'Reactivity', desc: 'Veri değiştiğinde arayüz otomatik olarak yeniden çizilir.' },
          { icon: <Activity />, title: 'Predictability', desc: 'Aynı veri her zaman aynı görüntüyü oluşturur.' }
        ]}
      />
    </motion.div>
  );
};
export default StateDrivenPage;
