import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Zap, Scissors, ShieldCheck, Layers, Sparkles, Trash2, Clock, GitMerge, Users, Minimize2, CheckSquare } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const LeanArchitecturePage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const principles = [
    {
      id: 'eliminate-waste',
      title: '1. Eliminate Waste',
      icon: Trash2,
      color: '#ef4444',
      desc: 'Yazılımda "değer üretmeyen" her şey israftır. Müşterinin kullanmayacağı ekstra özellikler (Gold Plating), tamamlanmamış işler, gereksiz evrak işleri ve beklemeler hemen elenmelidir.'
    },
    {
      id: 'amplify-learning',
      title: '2. Create Knowledge',
      icon: Sparkles,
      color: '#f59e0b',
      desc: 'Yazılım geliştirme bir üretim süreci değil, bir öğrenme sürecidir. En iyi mimari, kodu yazanların domaini en iyi öğrendiği anda ortaya çıkar. Dokümantasyon değil, çalışan kod ve testler bilgiyi taşır.'
    },
    {
      id: 'decide-late',
      title: '3. Defer Commitment',
      icon: Clock,
      color: '#3b82f6',
      desc: 'Mimari kararları (örn: NoSQL vs SQL) mümkün olan "son sorumlu ana" kadar erteleyin. Erken verilen kararlar varsayımlara dayanır; geç verilen kararlar ise gerçeklere.'
    },
    {
      id: 'deliver-fast',
      title: '4. Deliver Fast',
      icon: Zap,
      color: '#eab308',
      desc: 'Hız, belirsizliği yok eder. Müşteriye ne kadar hızlı çıktı verirseniz, o kadar hızlı geri bildirim alırsınız. Büyük "Big Bang" sürümler yerine küçük ve sık sürümler esastır.'
    },
    {
      id: 'empower-team',
      title: '5. Respect People',
      icon: Users,
      color: '#a855f7',
      desc: 'Kararları yukarıdaki mimarlar değil, işi yapan uzmanlar vermelidir. Takıma güvenin ve onlara inisiyatif verin. Motivasyonu yüksek bir ekip, en iyi süreçten daha değerlidir.'
    },
    {
      id: 'build-integrity',
      title: '6. Build Integrity In',
      icon: CheckSquare,
      color: '#10b981',
      desc: 'Kalite sonradan test edilerek eklenemez; en baştan koda inşa edilmelidir. TDD, Refactoring ve Continuous Integration, sistemin bütünlüğünü (integrity) sağlayan temel araçlardır.'
    },
    {
      id: 'whole-view',
      title: '7. Optimize the Whole',
      icon: Minimize2,
      color: '#ec4899',
      desc: 'Sadece veritabanını hızlandırmak yetmez; tüm isteğin (request) yaşam döngüsüne bakın. Parçaları optimize etmek (sub-optimization) genellikle bütünün performansını düşürür.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}
    >
      <ArchHero 
        title="Lean"
        subtitle="Architecture"
        description="Toyota Üretim Sistemi'nden (TPS) yazılıma uyarlanan bu felsefe, 'İsrafı Yok Etme' (Waste Elimination) üzerine kuruludur. Az kod, çok değer."
        badge="Mary & Tom Poppendieck"
        color="#84cc16"
        illustration={
          <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Spinning Rings representing Iterative Cycles */}
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                transition={{ duration: 15 + i * 5, repeat: Infinity, ease: 'linear' }}
                style={{ 
                  position: 'absolute', 
                  width: `${100 + i * 60}px`, 
                  height: `${100 + i * 60}px`, 
                  border: '1px dashed rgba(132, 204, 22, 0.3)', 
                  borderRadius: '50%',
                  borderTopColor: '#84cc16'
                }}
              />
            ))}
            
            {/* Central Core */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ 
                width: '80px', height: '80px', 
                background: '#84cc16', 
                borderRadius: '50%', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 50px rgba(132, 204, 22, 0.4)'
              }}
            >
              <Target size={40} color="#0f172a" strokeWidth={3} />
            </motion.div>

            {/* Flying Particles (Waste being removed) */}
            {[1, 2, 3, 4].map(i => (
               <motion.div
                 key={`p-${i}`}
                 animate={{ 
                    x: [0, (Math.random() - 0.5) * 300], 
                    y: [0, (Math.random() - 0.5) * 300], 
                    opacity: [1, 0] 
                 }}
                 transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                 style={{ position: 'absolute', width: '8px', height: '8px', background: '#ec4899', borderRadius: '2px' }}
               />
            ))}
          </div>
        }
        features={[
          { icon: <Trash2 />, title: 'Muda (Waste)', desc: 'Ekstra özellik, bekleyen kod, hatalar ve gereksiz işlemler (motion) birer israftır.' },
          { icon: <Scissors />, title: 'Tailoring', desc: 'Süreci projeye uydurun. Her proje için devasa mimariler kurmak zorunda değilsiniz.' },
          { icon: <GitMerge />, title: 'Just-in-Time', desc: 'Kararları ihtiyacınız olduğu anda verin; aylar öncesinden değil.' }
        ]}
      />

      {/* 7 Principles Interactive Section */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800 }}>7 Yalın Prensip</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Başarılı modern sistemlerin genetik kodu.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '3rem', minHeight: '500px' }}>
            {/* Menu */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {principles.map((p, idx) => (
                <motion.div
                  key={p.id}
                  onClick={() => setActiveTab(idx)}
                  whileHover={{ x: 10 }}
                  style={{ 
                    padding: '1.2rem', 
                    background: activeTab === idx ? 'rgba(132, 204, 22, 0.1)' : 'rgba(255,255,255,0.02)', 
                    borderLeft: `4px solid ${activeTab === idx ? p.color : 'transparent'}`,
                    borderRadius: '0 12px 12px 0',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    transition: 'all 0.3s'
                  }}
                >
                  <div style={{ color: activeTab === idx ? p.color : 'rgba(255,255,255,0.4)' }}>
                    {React.createElement(p.icon, { size: 24 })}
                  </div>
                  <span style={{ 
                    fontWeight: activeTab === idx ? 700 : 500, 
                    color: activeTab === idx ? 'white' : 'rgba(255,255,255,0.6)' 
                  }}>
                    {p.title}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Content Display */}
            <div style={{ position: 'relative' }}>
              <AnimatePresence mode="wait">
                 <motion.div
                   key={activeTab}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   className="glass-card"
                   style={{ 
                     height: '100%', 
                     padding: '4rem', 
                     borderTop: `6px solid ${principles[activeTab].color}`,
                     display: 'flex',
                     flexDirection: 'column',
                     justifyContent: 'center'
                   }}
                 >
                    <div style={{ 
                      width: '80px', height: '80px', 
                      background: `${principles[activeTab].color}22`, 
                      borderRadius: '20px', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: principles[activeTab].color,
                      marginBottom: '2rem'
                    }}>
                      {React.createElement(principles[activeTab].icon, { size: 40 })}
                    </div>
                    
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'white' }}>{principles[activeTab].title}</h2>
                    <p style={{ fontSize: '1.3rem', lineHeight: 1.8, color: '#cbd5e1' }}>
                      {principles[activeTab].desc}
                    </p>

                    <div style={{ marginTop: '3rem', padding: '1.5rem', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', borderLeft: '4px solid #64748b' }}>
                       <h4 style={{ color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>ANTIGRAVITY ÖNERİSİ</h4>
                       <p style={{ color: 'white', fontStyle: 'italic' }}>
                         "{principles[activeTab].id === 'eliminate-waste' ? 'Yazdığınız kodun %20\'si işin %80\'ini yapar. Geri kalan %80 "olsa iyi olur" kısmıdır. O kısmı silin.' : 
                           principles[activeTab].id === 'decide-late' ? 'Veritabanı şemasını (Schema) projenin başında değil, işi anladığınız ortasında tasarlayın.' :
                           'Bu prensibi uyguladığınızda kod satır sayınız azalacak ama sistemin değeri artacaktır.'}"
                       </p>
                    </div>
                 </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section style={{ padding: '80px 0', background: 'rgba(132, 204, 22, 0.03)' }}>
        <div className="container">
           <div className="glass-card" style={{ padding: '4rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
                 <div>
                    <h3 style={{ color: '#ef4444', marginBottom: '1.5rem', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Trash2 /> Geleneksel (Waste)
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: '#94a3b8' }}>
                       <li style={{ display: 'flex', gap: '10px' }}>❌ Detaylı ön planlama (Big Upfront Design)</li>
                       <li style={{ display: 'flex', gap: '10px' }}>❌ Onlarca sayfa analiz dokümanı</li>
                       <li style={{ display: 'flex', gap: '10px' }}>❌ "Belki lazım olur" özellikleri</li>
                       <li style={{ display: 'flex', gap: '10px' }}>❌ Takım liderinin tek başına karar vermesi</li>
                    </ul>
                 </div>
                 <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '4rem' }}>
                    <h3 style={{ color: '#84cc16', marginBottom: '1.5rem', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                       <CheckSquare /> Yalın (Lean)
                    </h3>
                     <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: '#e2e8f0' }}>
                       <li style={{ display: 'flex', gap: '10px' }}>✅ Çıktı odaklı geliştirme (MVP)</li>
                       <li style={{ display: 'flex', gap: '10px' }}>✅ Çalışan kod en iyi dokümandır</li>
                       <li style={{ display: 'flex', gap: '10px' }}>✅ Tam zamanında (JIT) kararlar</li>
                       <li style={{ display: 'flex', gap: '10px' }}>✅ Otonom ve yetkili takımlar</li>
                    </ul>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};

export default LeanArchitecturePage;
