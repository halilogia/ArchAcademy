import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { useProgress } from '../../context/ProgressContext';
import { 
  Map, 
  Share2, 
  Box, 
  Layout, 
  ArrowRightLeft, 
  GitCompare, 
  Cpu,
  Route,
  Navigation,
  Milestone,
  Network
} from 'lucide-react';

const MVVMCPage = () => {
    const { completeStep } = useProgress();
    const [activeTab, setActiveTab] = useState<'concepts' | 'comparison'>('comparison');

  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/mvvm-c');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Coordinator (Top Hub) */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: '160px', height: '80px', background: 'var(--glass)', border: '2px solid #3b82f6', borderRadius: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, boxShadow: '0 10px 40px rgba(59, 130, 246, 0.25)', marginBottom: '3rem' }}
      >
        <Map size={32} color="#3b82f6" />
        <span style={{ fontSize: '0.75rem', fontWeight: 900, marginTop: '6px', color: 'white', letterSpacing: '1px' }}>COORDINATOR</span>
      </motion.div>

      {/* Connection Lines */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '200px', height: '100px', pointerEvents: 'none' }}>
         <svg width="100%" height="100%" viewBox="0 0 200 100" style={{ overflow: 'visible' }}>
             <path d="M 100 0 L 30 100" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6,4" opacity="0.5" fill="none" />
             <path d="M 100 0 L 170 100" stroke="#3b82f6" strokeWidth="2" strokeDasharray="6,4" opacity="0.5" fill="none" />
         </svg>
      </div>

       <div style={{ display: 'flex', gap: '2rem' }}>
          {/* Module A */}
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
            style={{ width: '110px', height: '110px', background: 'var(--glass)', border: '1px solid #3b82f6', borderRadius: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.8 }}
          >
             <Layout size={24} color="#60a5fa" style={{ marginBottom: '8px' }} />
             <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#93c5fd' }}>VIEW</div>
             <div style={{ width: '20px', height: '2px', background: 'rgba(255,255,255,0.2)', margin: '6px 0' }} />
             <Cpu size={20} color="#60a5fa" />
             <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#93c5fd' }}>VM</div>
          </motion.div>

           {/* Module B */}
           <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            style={{ width: '110px', height: '110px', background: 'var(--glass)', border: '1px solid #3b82f6', borderRadius: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.8 }}
          >
             <Layout size={24} color="#60a5fa" style={{ marginBottom: '8px' }} />
             <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#93c5fd' }}>VIEW</div>
             <div style={{ width: '20px', height: '2px', background: 'rgba(255,255,255,0.2)', margin: '6px 0' }} />
             <Cpu size={20} color="#60a5fa" />
             <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#93c5fd' }}>VM</div>
          </motion.div>
       </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="MVVM-C"
        subtitle="Coordinator Pattern"
        description="Klasik MVVM'in en büyük eksikliği olan 'Navigasyon kimin sorumluluğu?' sorusunu çözen, ekran geçişlerini ve akış mantığını Coordinator adı verilen özel sınıflara devreden mimari."
        badge="Scalable & Navigation"
        color="#3b82f6"
        illustration={illu}
        features={[
            { icon: <Route />, title: "Coordinator", desc: "Tüm navigasyon mantığı (push, pop, modal) burada yaşar." },
            { icon: <Layout />, title: "View Freedom", desc: "View nereye gideceğini bilmez, sadece 'bitti' der." },
            { icon: <Share2 />, title: "Reusable VM", desc: "ViewModel router bağımlılığı olmadığı için saf logic kalır ve her yerde kullanılabilir." }
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
            { id: 'comparison', label: 'MVVM vs MVVM-C', icon: <GitCompare size={18} /> },
            { id: 'concepts', label: 'Coordinator Logic', icon: <Network size={18} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 24px',
                borderRadius: '18px',
                border: 'none',
                background: activeTab === tab.id ? '#3b82f6' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
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
                Eksik Parça: <span className="gradient-text" style={{ backgroundImage: 'linear-gradient(to right, #3b82f6, #60a5fa)' }}>Navigasyon</span>
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'stretch' }}>
                
                {/* Standard MVVM CARD */}
                <div className="glass-card" style={{ borderTop: '4px solid #94a3b8', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.1 }}>
                       <Layout size={150} color="#94a3b8" />
                    </div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.5rem', color: '#94a3b8' }}>Standard MVVM</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Navigasyon = Spagetti</p>
                  
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <li style={{ display: 'flex', gap: '12px' }}>
                      <Navigation size={20} color="#94a3b8" />
                      <div>
                        <strong style={{ color: 'white' }}>View'da Logic:</strong> "Butona basınca B sayfasına git" kodu genellikle View içinde yazılır. View diğer sayfayı import etmek zorunda kalır.
                      </div>
                    </li>
                    <li style={{ display: 'flex', gap: '12px' }}>
                      <Box size={20} color="#94a3b8" />
                      <div>
                        <strong style={{ color: 'white' }}>Sıkı Bağımlılık:</strong> Login ekranı Home ekranını bilmek zorundadır. Bu, ekranları tek başına kullanmayı imkansız kılar.
                      </div>
                    </li>
                    <li style={{ display: 'flex', gap: '12px' }}>
                       <Cpu size={20} color="#94a3b8" />
                      <div>
                        <strong style={{ color: 'white' }}>ViewModel Router'ı Bilir:</strong> Eğer logic VM'de ise, VM içine Router servisi inject edilmelidir.
                      </div>
                    </li>
                  </ul>
                </div>

                {/* VS Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: '#0f172a', border: '1px solid var(--glass-border)', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.2rem', color: 'white', zIndex: 10 }}>VS</div>
                </div>

                {/* MVVM-C CARD */}
                <div className="glass-card" style={{ borderTop: '4px solid #3b82f6', position: 'relative', overflow: 'hidden' }}>
                   <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.1 }}>
                      <Map size={150} color="#3b82f6" />
                   </div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.5rem', color: '#3b82f6' }}>MVVM-C</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>+ Coordinator</p>
                  
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <li style={{ display: 'flex', gap: '12px' }}>
                      <Route size={20} color="#3b82f6" />
                      <div>
                        <strong style={{ color: 'white' }}>Merkezi Akış:</strong> "Login başarılı olunca nereye gidilecek?" bilgisini ne View ne de ViewModel bilir. Coordinator bilir.
                      </div>
                    </li>
                    <li style={{ display: 'flex', gap: '12px' }}>
                      <Share2 size={20} color="#3b82f6" />
                      <div>
                        <strong style={{ color: 'white' }}>Reuse (Yeniden Kullanım):</strong> Login ekranını "Ayarlar" içinde de, "Sepet" içinde de kullanabilirsin. Çünkü nereye gideceğine Coordinator karar verir.
                      </div>
                    </li>
                    <li style={{ display: 'flex', gap: '12px' }}>
                      <Box size={20} color="#3b82f6" />
                      <div>
                        <strong style={{ color: 'white' }}>Deep Linking:</strong> Uygulamanın herhangi bir yerine dışarıdan (URL ile) gitmek çok kolaylaşır.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
             <div style={{ marginTop: '4rem', background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', justifyContent: 'center' }}>
                    <Milestone color="#3b82f6" size={28} />
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Coordinator'ın Gücü</h3>
                 </div>
                 <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2rem auto', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                    "Bir ekranın işi bittiğinde, sıradaki ekranın ne olacağına o ekran karar vermemelidir. Bu karar daha üst bir otoriteye (Coordinator) aittir." — Soroush Khanlou (The Coordinator Pattern Creator)
                 </p>
              </div>

              {/* GOOGLE PERSPECTIVE */}
              <div style={{ marginTop: '4rem', borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '4rem' }}>
                <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '2rem', textAlign: 'center' }}>
                  Peki Google Neden <span className="gradient-text" style={{ backgroundImage: 'linear-gradient(to right, #ef4444, #f59e0b)' }}>Önermiyor?</span>
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                   <div className="glass-card" style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                      <h4 style={{ color: '#ef4444', marginBottom: '1rem', fontWeight: 800, fontSize: '1.1rem' }}>1. Declarative vs Imperative</h4>
                      <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>
                        Flutter, React ve SwiftUI "Declarative" (Bildirimsel) yapıdadır. UI state'in bir sonucudur. Coordinator ise iOS/UIKit gibi "Imperative" (Emirsel) dünyalar için doğmuştur. Modern frameworklerde navigasyon state driven olduğu için Coordinator bazen doğal akışa ters gelebilir.
                      </p>
                   </div>
                   
                   <div className="glass-card" style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                      <h4 style={{ color: '#f59e0b', marginBottom: '1rem', fontWeight: 800, fontSize: '1.1rem' }}>2. Modern Router'lar Yeterli</h4>
                      <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>
                        <code>go_router</code>, <code>auto_route</code> veya <code>React Router</code> gibi modern çözümler zaten navigasyonu merkezileştirir ve Deep Linking sorununu çözer. Coordinator ekstra boilerplate (kod kalabalığı) yaratabilir.
                      </p>
                   </div>

                   <div className="glass-card" style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                      <h4 style={{ color: '#10b981', marginBottom: '1rem', fontWeight: 800, fontSize: '1.1rem' }}>3. KISS Prensibi</h4>
                      <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>
                        Google, Spotify/Uber gibi yüzlerce modülden oluşan devasa bir uygulamanız yoksa, Coordinator'ın "Over-Engineering" (Aşırı Mühendislik) olduğunu savunur. Basit tutun.
                      </p>
                   </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'concepts' && (
             <motion.div
             key="concepts"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
           >
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
               <div className="glass-card">
                   <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem', color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '10px' }}>
                       <Map size={24} /> AppCoordinator
                   </h3>
                   <p style={{ lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                       Uygulamanın ana giriş noktasıdır (Root). Uygulama açıldığında kullanıcının oturum açıp açmadığını kontrol eder ve ya `AuthCoordinator`'a ya da `MainCoordinator`'a yönlendirir.
                   </p>
               </div>
               <div className="glass-card">
                   <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '10px' }}>
                       <Layout size={24} /> View Delegate
                   </h3>
                   <p style={{ lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                       View (veya ViewModel), Coordinator ile bir "Delegate" veya "Closure" (Callback) aracılığıyla konuşur.
                       <br/><br/>
                       <code style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px' }}>viewModel.onLoginSuccess = &#123; coordinator.goToHome() &#125;</code>
                   </p>
               </div>
               <div className="glass-card">
                   <h3 style={{ fontSize: '1.4rem', fontWeight: 1000, marginBottom: '1rem', color: '#93c5fd', display: 'flex', alignItems: 'center', gap: '10px' }}>
                       <Box size={24} /> Dependency Injection
                   </h3>
                   <p style={{ lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                       Coordinator'lar aynı zamanda birer "Factory" gibi çalışır. Gidilecek yeni ekranın ViewModel'ini ve servislerini oluşturup ekrana enjekte ederler.
                   </p>
               </div>
             </div>

             <div className="glass-card" style={{ marginTop: '3rem', borderLeft: '4px solid #3b82f6' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem', color: 'white' }}>Örnek Senaryo: Satın Alma Akışı</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ background: '#3b82f6', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 800 }}>1</span>
                        <span style={{ color: 'var(--text-secondary)' }}>Kullanıcı "Sepeti Onayla" butonuna basar.</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                         <span style={{ background: '#3b82f6', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 800 }}>2</span>
                        <span style={{ color: 'var(--text-secondary)' }}>CheckoutViewModel bir event fırlatır: <code>onProceedToPayment()</code></span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                         <span style={{ background: '#3b82f6', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 800 }}>3</span>
                        <span style={{ color: 'var(--text-secondary)' }}><code>CartCoordinator</code> bu eventi dinler ve `PaymentCoordinator`'ı başlatır.</span>
                    </div>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                         <span style={{ background: '#3b82f6', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 800 }}>4</span>
                        <span style={{ color: 'var(--text-secondary)' }}>Eğer ödeme başarılı olursa, <code>PaymentCoordinator</code> işini bitirir ve <code>CartCoordinator</code> kullanıcıyı "Sipariş Başarılı" ekranına yönlendirir.</span>
                    </div>
                </div>
             </div>
           </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MVVMCPage;
