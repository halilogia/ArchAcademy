import React from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { Code2, Terminal, Cpu } from 'lucide-react';

const InterpreterPage = () => {
  const illu = (
    <div style={{ position: 'relative', width: '300px', height: '200px', background: 'rgba(0,0,0,0.3)', borderRadius: '20px', padding: '20px', border: '1px solid #db2777', overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
      </div>
      <motion.div style={{ color: '#f472b6', fontFamily: 'monospace', fontSize: '0.9rem' }}>
        {['PARSE language...', 'BUILD expression tree...', 'INTERPRET nodes...', 'EXECUTE logic...'].map((text, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.5, repeat: Infinity, repeatDelay: 2 }}
            style={{ marginBottom: '8px' }}
          >
            <span style={{ color: '#db2777' }}>{'>'}</span> {text}
          </motion.div>
        ))}
      </motion.div>
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} style={{ position: 'absolute', bottom: '20px', right: '20px', opacity: 0.2 }}>
        <Cpu size={60} color="#ec4899" />
      </motion.div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ArchHero 
        title="Interpreter"
        subtitle="Architecture"
        description="Özel bir dili veya komut setini doğrudan yorumlayarak çalıştıran sistemler tasarlayın. Karmaşık kural motorları ve DSL'ler için ideal çözüm."
        badge="Logic Engine"
        color="#db2777"
        illustration={illu}
        features={[
          { icon: <Terminal />, title: 'Esneklik', desc: 'Kod derlemeden çalışma anında davranış değiştirin.' },
          { icon: <Code2 />, title: 'DSL Desteği', desc: 'İş birimine özel diller (Domain Specific Languages) geliştirin.' },
          { icon: <Cpu />, title: 'Genişletilebilirlik', desc: 'Sisteme yeni kurallar ve ifadeler eklemek çok kolaydır.' }
        ]}
      />
    </motion.div>
  );
};

export default InterpreterPage;
