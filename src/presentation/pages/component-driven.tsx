import React from 'react';
import { motion } from 'framer-motion';
import { Box, Package, Layers, Library, Layout, Puzzle, MousePointer2, Smartphone } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const ComponentDrivenPage = () => {
  const illustration = (
    <div style={{ position: 'relative', width: '400px', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Background Grid */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(#f43f5e 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      {/* Assembly Area */}
      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          width: '240px',
          height: '180px',
          background: 'rgba(244, 63, 94, 0.05)',
          border: '2px dashed rgba(244, 63, 94, 0.3)',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          padding: '15px',
          gap: '10px',
          zIndex: 5
        }}
      >
        {/* Skeleton UI assembling */}
        <motion.div 
            initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
            style={{ height: '30px', background: 'rgba(244, 63, 94, 0.2)', borderRadius: '8px' }} 
        />
        <div style={{ display: 'flex', gap: '10px', height: '100%' }}>
            <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5, repeat: Infinity, repeatDelay: 2 }}
                style={{ width: '40%', height: '80px', background: 'rgba(244, 63, 94, 0.4)', borderRadius: '8px' }} 
            />
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.8, repeat: Infinity, repeatDelay: 2 }}
                style={{ width: '60%', height: '80px', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.5)', borderRadius: '8px' }} 
            />
        </div>
      </motion.div>

      {/* Flying "Bricks" (Components) */}
      {[
        { icon: <MousePointer2 size={16} />, color: '#f43f5e', delay: 0, x: -140, y: -120 },
        { icon: <Box size={16} />, color: '#fb7185', delay: 0.5, x: 140, y: -100 },
        { icon: <Package size={16} />, color: '#fda4af', delay: 1, x: 120, y: 120 },
        { icon: <Puzzle size={16} />, color: '#f43f5e', delay: 1.5, x: -150, y: 100 }
      ].map((brick, i) => (
        <motion.div
            key={i}
            initial={{ x: brick.x, y: brick.y, opacity: 0 }}
            animate={{ 
                x: [brick.x, 0], 
                y: [brick.y, 0], 
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: brick.delay, ease: "circIn" }}
            style={{
                position: 'absolute',
                padding: '12px',
                background: '#0f172a',
                border: `2px solid ${brick.color}`,
                borderRadius: '12px',
                color: brick.color,
                zIndex: 10,
                boxShadow: `0 0 20px ${brick.color}33`
            }}
        >
            {brick.icon}
        </motion.div>
      ))}

      {/* Methodology Label */}
      <motion.div 
        animate={{ y: [0, 5, 0] }}
        style={{
            position: 'absolute', top: '40px', left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(244, 63, 94, 0.1)', padding: '6px 16px', borderRadius: '100px',
            border: '1px solid rgba(244, 63, 94, 0.3)', fontSize: '0.75rem', fontWeight: 900, color: 'white'
        }}
      >
        BOTTOM-UP ASSEMBLY
      </motion.div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: '#020617', minHeight: '100vh', paddingBottom: '100px' }}>
      <ArchHero 
        title="Component-Driven"
        subtitle="Modern UI Assembly"
        description="Uygulamaları büyük sayfalardan değil, en küçük yapı taşlarından (Atomic components) başlayarak yukarıya doğru inşa etme sanatı. Lego gibi modüler ve sarsılmaz."
        badge="Dev Architecture"
        color="#f43f5e"
        illustration={illustration}
        features={[
          { icon: <Puzzle />, title: 'Atomic Design', desc: 'Bileşenler en küçük parçalara (Atoms) bölünür ve karmaşık yapılara dönüşür.' },
          { icon: <Library />, title: 'Storybook Culture', desc: 'Bileşenler ana uygulamadan bağımsız bir laboratuvarda geliştirilir.' },
          { icon: <Smartphone />, title: 'True Isolation', desc: 'Bir bileşenin hatası sistemin geri kalanını etkilemez, izole test edilebilir.' }
        ]}
      >
        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <div style={{ background: 'rgba(244, 63, 94, 0.1)', padding: '12px 24px', borderRadius: '14px', border: '1px solid rgba(244, 63, 94, 0.2)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Layers size={18} color="#f43f5e" />
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white' }}>Scalable UI Logic</span>
          </div>
        </div>
      </ArchHero>

      <div className="container" style={{ marginTop: '4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="glass-card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', color: '#f43f5e' }}>
              <Layout size={24} /> Neden CDD (Component-Driven Dev)?
            </h3>
            <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
                Büyük projelerde sayfaları yönetmek imkansızdır. CDD ile odağımızı "Sayfa"dan "Bileşen"e kaydırırız. Bu sayede tasarım sistemleri (Design Systems) tutarlı ve sürdürülebilir hale gelir.
            </p>
          </div>
          <div className="glass-card">
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', color: '#f43f5e' }}>
              <Package size={24} /> Paylaşılabilir Kütüphaneler
            </h3>
            <p style={{ color: '#94a3b8', lineHeight: 1.7 }}>
                Doğru kurgulanmış bir bileşen, sadece o projede değil, şirketin tüm projelerinde (NPM paketleri aracılığıyla) tekrar tekrar kullanılabilir.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ComponentDrivenPage;
