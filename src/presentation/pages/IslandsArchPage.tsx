import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Anchor, Layers, Smartphone, Layout, ShoppingBag } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const IslandsArchPage = () => {
  const [activeIsland, setActiveIsland] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}
    >
      <ArchHero 
        title="Islands"
        subtitle="Architecture"
        description="Okyanus kadar geniş statik HTML içeriğinin ortasında yüzen, etkileşimli küçük JavaScript adaları. Maksimum performans için minimum JS."
        badge="Frontend Performance"
        color="#0ea5e9"
        illustration={
          <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div // Ocean
              animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              style={{ 
                position: 'absolute', width: '100%', height: '100%', borderRadius: '20px', 
                background: 'linear-gradient(45deg, #0f172a 25%, #1e293b 25%, #1e293b 50%, #0f172a 50%, #0f172a 75%, #1e293b 75%, #1e293b 100%)',
                backgroundSize: '40px 40px',
                opacity: 0.5
              }}
            />
            
            {/* Static Content (Water) */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px', zIndex: 1 }}>
               {[1,2,3,4].map(i => (
                 <div key={i} style={{ height: '10px', width: `${60 + Math.random() * 40}%`, background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} />
               ))}
            </div>

            {/* Islands */}
            <motion.div 
               animate={{ y: [0, -5, 0] }}
               transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
               style={{ 
                 position: 'absolute', top: '20%', right: '20%', width: '60px', height: '60px', 
                 background: '#0ea5e9', borderRadius: '12px', zIndex: 10,
                 boxShadow: '0 0 20px #0ea5e966', display: 'flex', alignItems: 'center', justifyContent: 'center',
                 color: 'white', fontWeight: 'bold'
               }}
            >
              JS
            </motion.div>

            <motion.div 
               animate={{ y: [0, -8, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               style={{ 
                 position: 'absolute', bottom: '30%', left: '20%', width: '50px', height: '50px', 
                 background: '#38bdf8', borderRadius: '10px', zIndex: 10,
                 boxShadow: '0 0 15px #38bdf866', display: 'flex', alignItems: 'center', justifyContent: 'center',
                 color: 'white', fontWeight: 'bold', fontSize: '10px'
               }}
            >
              Int
            </motion.div>
          </div>
        }
        features={[
          { icon: <Zap />, title: 'Zero JS by Default', desc: 'Sayfanın %90\'ı statik HTML olarak gelir, sadece gereken yere JS yüklenir.' },
          { icon: <Anchor />, title: 'Partial Hydration', desc: 'Tüm sayfayı "canlandırmak" yerine sadece interaktif adaları canlandırır.' },
          { icon: <Layers />, title: 'Component Driven', desc: 'Framework bağımsız (React, Vue, Svelte) bileşenleri aynı sayfada kullanabilirsiniz.' }
        ]}
      />

      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800 }}>Statik Okyanusta Canlı Adalar</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Kullanıcı neyi görüyorsa sadece onun maliyetini öder.</p>
          </div>

          <div style={{ 
            display: 'grid', gridTemplateColumns: '1fr 300px', gap: '3rem', 
            background: '#0f172a', border: '1px solid #1e293b', borderRadius: '24px', padding: '2rem',
            position: 'relative', overflow: 'hidden'
          }}>
            {/* Mock Website Layout */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               {/* Header Island */}
               <motion.div 
                 onHoverStart={() => setActiveIsland('header')}
                 onHoverEnd={() => setActiveIsland(null)}
                 style={{ 
                   padding: '1.5rem', borderRadius: '12px', border: '2px dashed #334155',
                   background: activeIsland === 'header' ? 'rgba(14, 165, 233, 0.1)' : 'transparent',
                   borderColor: activeIsland === 'header' ? '#0ea5e9' : '#334155',
                   transition: 'all 0.3s'
                 }}
               >
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ width: '100px', height: '12px', background: '#334155', borderRadius: '4px' }} />
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                       <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Static Link</span>
                       <div style={{ padding: '6px 12px', background: '#0ea5e9', borderRadius: '6px', fontSize: '0.8rem', color: 'white', display: 'flex', gap: '6px' }}>
                          <ShoppingBag size={14} /> Cart (Interaktif Ada)
                       </div>
                    </div>
                 </div>
               </motion.div>

               {/* Banner Static */}
               <div style={{ height: '200px', background: '#1e293b', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ color: '#475569' }}>Statik HTML Banner (0kb JS)</span>
               </div>

               {/* Product Grid */}
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                  {[1,2,3].map(i => (
                    <div key={i} style={{ padding: '1rem', background: '#1e293b', borderRadius: '12px' }}>
                       <div style={{ height: '100px', background: '#334155', borderRadius: '8px', marginBottom: '10px' }} />
                       <div style={{ height: '10px', width: '60%', background: '#475569', borderRadius: '4px', marginBottom: '15px' }} />
                       
                       <motion.div 
                         onHoverStart={() => setActiveIsland(`btn-${i}`)}
                         onHoverEnd={() => setActiveIsland(null)}
                         style={{ 
                            padding: '8px', textAlign: 'center', borderRadius: '8px',
                            background: activeIsland === `btn-${i}` ? 'rgba(14, 165, 233, 0.2)' : '#334155',
                            border: activeIsland === `btn-${i}` ? '1px solid #0ea5e9' : '1px solid transparent',
                            color: activeIsland === `btn-${i}` ? '#0ea5e9' : '#94a3b8',
                            fontSize: '0.8rem', cursor: 'pointer'
                         }}
                       >
                         Add to Cart (Ada)
                       </motion.div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Info Panel */}
            <div style={{ borderLeft: '1px solid #334155', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
               <AnimatePresence mode="wait">
                 {activeIsland ? (
                   <motion.div
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: 20 }}
                     key="interactive"
                   > 
                     <div style={{ padding: '1rem', background: '#0ea5e9', borderRadius: '12px', display: 'inline-block', marginBottom: '1rem' }}>
                       <Smartphone size={24} color="white" />
                     </div>
                     <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>İnteraktif Ada</h3>
                     <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>
                       Bu bölüm tarayıcıda "Hydrate" edilir. Yani JavaScript sadece bu küçük parça için yüklenir ve çalışır.
                     </p>
                     <div style={{ marginTop: '1rem', padding: '0.8rem', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '8px', color: '#0ea5e9', fontSize: '0.8rem' }}>
                        JS Bundle: ~5kb
                     </div>
                   </motion.div>
                 ) : (
                   <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     key="static"
                   >
                     <div style={{ padding: '1rem', background: '#334155', borderRadius: '12px', display: 'inline-block', marginBottom: '1rem' }}>
                       <Layout size={24} color="#94a3b8" />
                     </div>
                     <h3 style={{ color: '#cbd5e1', marginBottom: '0.5rem' }}>Statik Okyanus</h3>
                     <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>
                       Sayfanın geri kalanı tamamen saf HTML/CSS\'tir. JavaScript indirilmez, ayrıştırılmaz ve yürütülmez.
                     </p>
                     <div style={{ marginTop: '1rem', padding: '0.8rem', background: '#1e293b', borderRadius: '8px', color: '#64748b', fontSize: '0.8rem' }}>
                        JS Bundle: 0kb
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default IslandsArchPage;
