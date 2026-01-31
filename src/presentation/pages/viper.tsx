import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { useProgress } from '../../context/ProgressContext';
import { 
  ShieldAlert, 
  Map, 
  Database, 
  Layout, 
  Share2, 
  Cpu, 
  Route as RouterIcon,
  ShieldCheck,
  Zap,
  Box,
  GitCompare,
  ArrowRight
} from 'lucide-react';

const VIPERPage = () => {
  const { completeStep } = useProgress();
    const [activeTab, setActiveTab] = useState<'anatomy' | 'comparison'>('comparison');

  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/viper');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const illu = (
    <div style={{ position: 'relative', width: '380px', height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Presenter (Center) */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ width: '100px', height: '100px', background: 'var(--glass)', border: '2px solid #10b981', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)' }}
      >
        <Share2 size={32} color="#10b981" />
        <span style={{ fontSize: '0.6rem', fontWeight: 900, marginTop: '4px', color: 'white' }}>PRESENTER</span>
      </motion.div>

      {/* View (Left) */}
       <motion.div style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', textAlign: 'center' }}>
           <div style={{ width: '80px', height: '80px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid #3b82f6', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto' }}>
              <Layout size={24} color="#3b82f6" />
           </div>
           <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#93c5fd' }}>VIEW</span>
       </motion.div>

       {/* Interactor (Right) */}
       <motion.div style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', textAlign: 'center' }}>
           <div style={{ width: '80px', height: '80px', background: 'rgba(236, 72, 153, 0.1)', border: '1px solid #ec4899', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto' }}>
              <Cpu size={24} color="#ec4899" />
           </div>
           <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#fca5a5' }}>INTERACTOR</span>
       </motion.div>

       {/* Entity (Far Right - connected to Interactor) */}
       {/* Visual simplification: Just showing Entity floating near Interactor */}
       <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: 'absolute', right: -20, top: '20%', background: '#0f172a', border: '1px solid #f97316', padding: '6px', borderRadius: '8px', zIndex: 5 }}>
          <Database size={14} color="#f97316" />
       </motion.div>

       {/* Router (Bottom) */}
       <motion.div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
           <div style={{ width: '80px', height: '80px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid #f59e0b', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto' }}>
              <RouterIcon size={24} color="#f59e0b" />
           </div>
           <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#fcd34d' }}>ROUTER</span>
       </motion.div>

       {/* Connectors */}
       <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
          <line x1="90" y1="190" x2="140" y2="190" stroke="#10b981" strokeWidth="2" strokeDasharray="4" opacity="0.5" />
          <line x1="240" y1="190" x2="290" y2="190" stroke="#10b981" strokeWidth="2" strokeDasharray="4" opacity="0.5" />
          <line x1="190" y1="240" x2="190" y2="290" stroke="#10b981" strokeWidth="2" strokeDasharray="4" opacity="0.5" />
       </svg>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="VIPER"
        subtitle="Clean iOS Architecture"
        description="Clean Architecture prensiplerinin iOS/Mobile dünyasındaki en katı ve disiplinli uygulaması. Her bileşenin tek bir sorumluluğu vardır (Single Responsibility)."
        badge="Enterprise Standard"
        color="#10b981"
        illustration={illu}
        features={[
          { icon: <ShieldCheck />, title: "Isolation", desc: "Her harf (V-I-P-E-R) ayrı bir dosyadır. Bağımlılıklar interface ile yönetilir." },
          { icon: <Zap />, title: "Testability", desc: "Interactor içinde saf iş mantığı olduğu için UI olmadan %100 test edilebilir." },
          { icon: <Map />, title: "Routing", desc: "Navigasyon mantığı (Router/Wireframe) ekrandan tamamen koparılmıştır." }
        ]}
      >
        <div style={{ 
          marginTop: '2rem',
          padding: '6px', 
          background: 'rgba(15, 23, 42, 0.4)', 
          borderRadius: '24px', 
          border: '1px solid rgba(255,255,255,0.05)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          backdropFilter: 'blur(10px)'
        }}>
          {[
            { id: 'comparison', label: 'VIPER vs MVVM', icon: <GitCompare size={18} /> },
            { id: 'anatomy', label: 'Anatomy', icon: <Box size={18} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 24px',
                borderRadius: '18px',
                border: 'none',
                background: activeTab === tab.id ? '#10b981' : 'transparent',
                color: activeTab === tab.id ? '#020617' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </ArchHero>

      <div className="container" style={{ marginTop: '2rem' }}>
         <AnimatePresence mode="wait">
          {activeTab === 'comparison' && (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h2 className="section-title text-center" style={{ marginBottom: '3rem' }}>
                Boilerplate Savaşları: <span className="gradient-text" style={{ backgroundImage: 'linear-gradient(to right, #10b981, #3b82f6)' }}>VIPER vs MVVM</span>
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'stretch' }}>
                
                {/* VIPER CARD */}
                <div className="glass-card" style={{ borderTop: '4px solid #10b981', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.1 }}>
                       <ShieldAlert size={150} color="#10b981" />
                    </div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.5rem', color: '#10b981' }}>VIPER</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Extreme Separation</p>
                  
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <li style={{ display: 'flex', gap: '12px' }}>
                      <Box size={20} color="#10b981" />
                      <div>
                        <strong style={{ color: 'white' }}>5 Katman:</strong> View, Interactor, Presenter, Entity, Router. Her şey parçalanmıştır.
                      </div>
                    </li>
                    <li style={{ display: 'flex', gap: '12px' }}>
                      <ArrowRight size={20} color="#10b981" />
                      <div>
                        <strong style={{ color: 'white' }}>Tek Yönlü Akış:</strong> View &rarr; Presenter &rarr; Interactor &rarr; Presenter &rarr; View. Döngüsel bağımlılık yasaktır.
                      </div>
                    </li>
                    <li style={{ display: 'flex', gap: '12px' }}>
                       <Zap size={20} color="#10b981" />
                      <div>
                        <strong style={{ color: 'white' }}>Kod Üretimi:</strong> O kadar çok dosya gerekir ki (Module), genellikle kod üreten araçlar (Generators) kullanılır.
                      </div>
                    </li>
                  </ul>
                </div>

                {/* VS Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: '#0f172a', border: '1px solid var(--glass-border)', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.2rem', color: 'white', zIndex: 10 }}>VS</div>
                </div>

                {/* MVVM CARD */}
                <div className="glass-card" style={{ borderTop: '4px solid #3b82f6', position: 'relative', overflow: 'hidden' }}>
                   <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.1 }}>
                      <Layout size={150} color="#3b82f6" />
                   </div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.5rem', color: '#3b82f6' }}>MVVM</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Practical & Reactive</p>
                  
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <li style={{ display: 'flex', gap: '12px' }}>
                      <Box size={20} color="#3b82f6" />
                      <div>
                        <strong style={{ color: 'white' }}>3 Katman:</strong> Model, View, ViewModel. Daha az dosya, daha hızlı başlangıç.
                      </div>
                    </li>
                    <li style={{ display: 'flex', gap: '12px' }}>
                      <Zap size={20} color="#3b82f6" />
                      <div>
                        <strong style={{ color: 'white' }}>Binding:</strong> Data Binding sayesinde kod yazmadan UI güncelleme şansı.
                      </div>
                    </li>
                    <li style={{ display: 'flex', gap: '12px' }}>
                      <Share2 size={20} color="#3b82f6" />
                      <div>
                        <strong style={{ color: 'white' }}>Esneklik:</strong> Logic bazen ViewModel'de bazen Model'de olabilir, kurallar VIPER kadar katı değildir.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div style={{ marginTop: '4rem', background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
                 <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                    VIPER, <span style={{ color: 'white', fontWeight: 700 }}>Uber</span> ve <span style={{ color: 'white', fontWeight: 700 }}>SoundCloud</span> gibi devasa ekiplerin çalıştığı projelerde çakışmaları (merge conflicts) önlemek için harikadır. Ancak tek kişilik projeler için tam bir zaman kaybı (Overkill) olabilir.
                 </p>
              </div>

              {/* GOOGLE PERSPECTIVE */}
              <div style={{ marginTop: '4rem', borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '4rem' }}>
                <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '2rem', textAlign: 'center' }}>
                  Google Neden <span className="gradient-text" style={{ backgroundImage: 'linear-gradient(to right, #3b82f6, #60a5fa)' }}>MVVM'i Öneriyor?</span>
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                   <div className="glass-card" style={{ background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                      <h4 style={{ color: '#60a5fa', marginBottom: '1rem', fontWeight: 800, fontSize: '1.1rem' }}>1. Modern Framework Yapısı</h4>
                      <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>
                        Android (Jetpack Compose) ve Flutter, doğaları gereği "Reactive" yapıdadır. View, State'i dinler ve kendini günceller. Bu akışa en uygun desen MVVM'dir. VIPER'daki "Presenter &rarr; View" emir komuta zinciri, bu modern "State Driven" yapıya ters düşer.
                      </p>
                   </div>
                   
                   <div className="glass-card" style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                      <h4 style={{ color: '#10b981', marginBottom: '1rem', fontWeight: 800, fontSize: '1.1rem' }}>2. ViewModel'in Gücü</h4>
                      <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>
                        Google'ın <code>ViewModel</code> sınıfı, konfigürasyon değişikliklerini (ekran döndürme vb.) otomatik yönetir (Lifecycle Aware). VIPER'da Presenter'ın yaşam döngüsünü elle yönetmek (State Restoration) tam bir kabustur.
                      </p>
                   </div>

                   <div className="glass-card" style={{ background: 'rgba(249, 115, 22, 0.05)', border: '1px solid rgba(249, 115, 22, 0.2)' }}>
                      <h4 style={{ color: '#fb923c', marginBottom: '1rem', fontWeight: 800, fontSize: '1.1rem' }}>3. Öğrenme Maliyeti</h4>
                      <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>
                        Yeni bir geliştiricinin VIPER ile yazılmış bir projeye adapte olması aylar alabilirken, MVVM evrensel ve anlaşılırdır. Google, ekosistemin büyümesi için daha erişilebilir olan MVVM'i standart olarak sunar.
                      </p>
                   </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'anatomy' && (
            <motion.div
              key="anatomy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div className="glass-card">
                       <h3 style={{ marginBottom: '1rem', color: '#93c5fd', display: 'flex', alignItems: 'center', gap: '10px' }}>
                           <Layout /> View
                       </h3>
                       <p style={{ color: 'var(--text-secondary)' }}>
                           Presenter ne derse onu yapar. Logic içermez. Android'de Activity/Fragment, iOS'ta UIViewController'dır.
                       </p>
                    </div>
                    
                    <div className="glass-card">
                       <h3 style={{ marginBottom: '1rem', color: '#fca5a5', display: 'flex', alignItems: 'center', gap: '10px' }}>
                           <Cpu /> Interactor
                       </h3>
                       <p style={{ color: 'var(--text-secondary)' }}>
                           Uygulamanın beyni. API'den veri çeker, hesaplama yapar. UI'dan haberi yoktur. Sadece Entity'leri bilir.
                       </p>
                    </div>

                    <div className="glass-card" style={{ gridRow: 'span 2', borderLeft: '4px solid #10b981' }}>
                       <h3 style={{ marginBottom: '1rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '10px' }}>
                           <Share2 /> Presenter
                       </h3>
                       <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                           Orkestra Şefi. View'dan event alır, Interactor'a iş yaptırır, sonuç gelince Router'a "git" veya View'a "göster" der.
                       </p>
                       <div style={{ fontSize: '0.9rem', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px' }}>
                           Asla <code>UIKit</code> veya <code>android.*</code> import etmemelidir! Saf Java/Kotlin/Swift olmalıdır.
                       </div>
                    </div>

                    <div className="glass-card">
                       <h3 style={{ marginBottom: '1rem', color: '#fcd34d', display: 'flex', alignItems: 'center', gap: '10px' }}>
                           <RouterIcon /> Router (Wireframe)
                       </h3>
                       <p style={{ color: 'var(--text-secondary)' }}>
                           Ekranlar (Module) arası geçişi sağlar. Dependency Injection burada yapılır. "Hangi ekran açılacak ve verisi ne olacak?" sorusunun cevabıdır.
                       </p>
                    </div>

                    <div className="glass-card">
                       <h3 style={{ marginBottom: '1rem', color: '#fdba74', display: 'flex', alignItems: 'center', gap: '10px' }}>
                           <Database /> Entity
                       </h3>
                       <p style={{ color: 'var(--text-secondary)' }}>
                           Saf veri modeli (POJO / Struct). İş mantığı barındırmaz. (Örn: `User`, `Product`)
                       </p>
                    </div>
                </div>
            </motion.div>
          )}
         </AnimatePresence>
      </div>
      <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
           <div style={{ 
             background: 'linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.5) 100%)', 
             padding: '3rem', 
             borderRadius: '24px', 
             border: '1px solid rgba(255,255,255,0.05)',
             maxWidth: '900px',
             margin: '0 auto'
           }}>
              <div style={{ fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', marginBottom: '1rem', textTransform: 'uppercase' }}>
                Clean Mobile Architecture
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                VIPER deseninin kökenleri, Interactor-Presenter etkileşimi ve modüler mobil uygulama geliştirme pratikleri hakkında detaylı bilgi edinin.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://www.objc.io/issues/13-architecture/viper/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(16, 185, 129, 0.15)', color: '#6ee7b7', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(16, 185, 129, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    Architecting iOS Apps with VIPER (objc.io) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};

export default VIPERPage;
