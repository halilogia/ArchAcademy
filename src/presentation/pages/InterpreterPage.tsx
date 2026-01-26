import React from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { Code2, Terminal, Cpu, ArrowRight, Zap } from 'lucide-react';

const InterpreterPage = () => {
  const diagram = (
    <div style={{ 
      background: 'rgba(15, 23, 42, 0.6)', 
      padding: '2.5rem', 
      borderRadius: '32px', 
      border: '1px solid rgba(219, 39, 119, 0.3)',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 20px rgba(219, 39, 119, 0.1)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Glow */}
      <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(219, 39, 119, 0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
        {/* Step 1: High Level */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#db2777', marginBottom: '0.75rem' }}>
            <Code2 size={32} />
          </div>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'white', textTransform: 'uppercase' }}>High-Level</div>
        </motion.div>

        <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ArrowRight color="#db2777" opacity={0.5} />
        </motion.div>

        {/* Step 2: Interpreter Core */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{ 
            width: '120px', 
            height: '100px', 
            borderRadius: '24px', 
            background: 'linear-gradient(135deg, #db2777 0%, #9d174d 100%)', 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center', 
            color: 'white', 
            marginBottom: '0.75rem',
            boxShadow: '0 10px 30px rgba(219, 39, 119, 0.4)'
          }}>
            <Terminal size={32} style={{ marginBottom: '4px' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 900 }}>INTERPRETER</span>
          </div>
          <div style={{ fontSize: '0.6rem', color: '#f472b6', fontWeight: 700 }}>Logic Engine</div>
        </motion.div>

        <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}>
          <ArrowRight color="#db2777" opacity={0.5} />
        </motion.div>

        {/* Step 3: Machine Language */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#db2777', marginBottom: '0.75rem' }}>
            <Cpu size={32} />
          </div>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'white', textTransform: 'uppercase' }}>Machine Lang</div>
        </motion.div>
      </div>

      {/* Code Stream Animation */}
      <div style={{ marginTop: '2rem', fontFamily: 'monospace', fontSize: '0.7rem', color: '#f472b6', opacity: 0.6 }}>
        <motion.div
           animate={{ x: [0, 20, 0], opacity: [0.3, 0.6, 0.3] }}
           transition={{ duration: 3, repeat: Infinity }}
        >
          01010011 01011001 01010011 01010100 01000101 01001101
        </motion.div>
      </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ArchHero 
        title="Interpreter"
        subtitle="Architecture"
        description="Özel bir dili veya komut setini doğrudan yorumlayarak çalıştıran sistemler tasarlayın. Karmaşık kural motorları, SQL parser'lar ve DSL'ler (Domain Specific Languages) için ideal çözüm."
        badge="Logic Engine"
        color="#db2777"
        illustration={diagram}
        features={[
          { icon: <Terminal />, title: 'Esneklik', desc: 'Kod derlemeden çalışma anında davranış değiştirin.' },
          { icon: <Code2 />, title: 'DSL Desteği', desc: 'İş birimine özel diller (Domain Specific Languages) geliştirin.' },
          { icon: <Cpu />, title: 'Genişletilebilirlik', desc: 'Sisteme yeni kurallar ve ifadeler eklemek çok kolaydır.' },
          { icon: <Zap />, title: 'Hızlı Iterasyon', desc: 'Derleme (Compilation) beklemeden anlık sonuçlar alın.' }
        ]}
      />

      <section style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Neden Interpreter?</h2>
          <div style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p>
              Interpreter mimarisi, kodun doğrudan bir "sanal makine" veya "yorumlayıcı" tarafından okunup icra edildiği bir yapıdır. 
              Resimde gördüğün gibi; <strong>High-Level</strong> (İnsan tarafından okunabilir) kodları alır ve onları adım adım 
              <strong>Machine Language</strong> (CPU'nun anlayacağı) seviyesine indirger.
            </p>
            <p>
              Modern web dünyasında, özellikle <strong>A/B testleri</strong>, <strong>Kural Motorları (Price Engines)</strong> 
              veya <strong>Dinamik Form Mantıkları</strong> kurgularken bu mimariden sıkça yararlanırız.
            </p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default InterpreterPage;
