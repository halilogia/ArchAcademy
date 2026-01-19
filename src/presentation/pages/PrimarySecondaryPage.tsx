import React from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { Database, GitMerge, ShieldCheck, Zap } from 'lucide-react';

const PrimarySecondaryPage = () => {
  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Primary */}
      <motion.div
        animate={{ boxShadow: ['0 0 20px #eab30844', '0 0 40px #eab30888', '0 0 20px #eab30844'] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ width: '100px', height: '100px', background: 'var(--glass)', border: '3px solid #eab308', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}
      >
        <Database size={32} color="#eab308" />
        <span style={{ fontSize: '0.6rem', fontWeight: 900, marginTop: '5px' }}>PRIMARY</span>
      </motion.div>

      {/* Secondaries */}
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            left: i === 0 ? '20px' : 'auto',
            right: i === 1 ? '20px' : 'auto',
            width: '70px',
            height: '70px',
            background: 'var(--glass)',
            border: '2px solid #eab30866',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Database size={20} color="#eab308" opacity={0.6} />
          <span style={{ fontSize: '0.4rem', fontWeight: 900, marginTop: '4px' }}>SECONDARY</span>
        </motion.div>
      ))}

      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
        <motion.path d="M 175 150 L 90 150" stroke="#eab308" strokeWidth="2" strokeDasharray="4" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 2 }} />
        <motion.path d="M 175 150 L 260 150" stroke="#eab308" strokeWidth="2" strokeDasharray="4" animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 2, delay: 1 }} />
      </svg>
    </div>
  );

  return (
    <ArchHero 
      title="Primary-Secondary"
      subtitle="Replication Pattern"
      description="Verinin bir ana düğümde (Primary) yazıldığı ve diğer düğümlere (Secondary) kopyalandığı yapı. Veri güvenliği ve okuma performansı için standart."
      badge="Distributed Data"
      color="#eab308"
      illustration={illu}
      features={[
        { icon: <ShieldCheck />, title: 'High Availability', desc: 'Primary çökerse, Secondary lerden biri anında yeni Primary olabilir.' },
        { icon: <Database />, title: 'Read Scalability', desc: 'Okuma yükünü tüm Secondary düğümlere dağıtarak performansı artırın.' },
        { icon: <GitMerge />, title: 'Data Redundancy', desc: 'Verinin birden fazla kopyasını tutarak kayıpların önüne geçin.' }
      ]}
    />
  );
};

export default PrimarySecondaryPage;
