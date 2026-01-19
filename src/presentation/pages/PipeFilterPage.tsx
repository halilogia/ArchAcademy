import React from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { Filter, ArrowRight, Activity } from 'lucide-react';

const PipeFilterPage = () => {
  const illu = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
      {[0, 1, 2].map((i) => (
        <React.Fragment key={i}>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.3 }}
            style={{
              width: '200px',
              height: '60px',
              background: 'var(--glass)',
              border: '1px solid #db2777',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              boxShadow: '0 10px 30px rgba(219, 39, 119, 0.1)'
            }}
          >
            <Filter size={20} color="#ec4899" />
            <span style={{ fontWeight: 700, fontSize: '0.8rem' }}>FILTER {i + 1}</span>
          </motion.div>
          {i < 2 && (
            <motion.div
              animate={{ height: [40, 60, 40] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{ width: '4px', background: 'linear-gradient(to bottom, #ec4899, #db2777)', borderRadius: '2px' }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ArchHero 
        title="Pipe & Filter"
        subtitle="Architecture"
        description="Veriyi bir dizi bağımsız işlem biriminden (filter) geçirerek dönüştürün. Veri akış hatları (pipelines) için en doğal ve esnek yapı."
        badge="Data Processing"
        color="#ec4899"
        illustration={illu}
        features={[
          { icon: <Filter />, title: 'Bağımsızlık', desc: 'Her filtre kendi işini yapar, diğerlerini tanımaz.' },
          { icon: <ArrowRight />, title: 'Yeniden Kullanım', desc: 'Filtreleri farklı boru hatlarında tekrar birleştirin.' },
          { icon: <Activity />, title: 'Paralellik', desc: 'Veriyi aynı anda farklı filtrelerde işleyerek performans kazanın.' }
        ]}
      />
    </motion.div>
  );
};

export default PipeFilterPage;
