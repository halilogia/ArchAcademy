import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { 
  Layout, 
  UserCheck, 
  Activity, 
  ArrowRightLeft, 
  CheckCircle2, 
  XCircle, 
  GitCompare, 
  Box, 
  Database,
  Monitor,
  Mic2,
  Settings,
  Zap,
  RefreshCw,
} from 'lucide-react';

const MVPPage = () => {
    const [activeTab, setActiveTab] = useState<'concepts' | 'comparison'>('comparison');

  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* View (Pasif) */}
      <motion.div
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ width: '120px', height: '75px', background: 'var(--glass)', border: '1px solid #34d399', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 0.8 }}
      >
        <Layout size={24} color="#34d399" />
        <span style={{ fontSize: '0.65rem', fontWeight: 800, marginTop: '4px', color: 'white' }}>PASSIVE VIEW</span>
      </motion.div>

      {/* Dynamic Connector */}
      <div style={{ height: '40px', width: '2px', background: 'rgba(52, 211, 153, 0.2)', position: 'relative' }}>
        <motion.div 
          animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          style={{ position: 'absolute', width: '6px', height: '6px', background: '#34d399', borderRadius: '50%', left: '-2px' }}
        />
        <motion.div 
          animate={{ top: ['100%', '0%'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.6 }}
          style={{ position: 'absolute', width: '6px', height: '6px', background: '#34d399', borderRadius: '50%', left: '-2px' }}
        />
      </div>

      {/* Presenter (Hub) */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ width: '150px', height: '100px', background: 'var(--glass)', border: '3px solid #34d399', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, boxShadow: '0 0 40px rgba(52, 211, 153, 0.3)' }}
      >
        <UserCheck size={32} color="#34d399" />
        <span style={{ fontSize: '0.8rem', fontWeight: 950, marginTop: '6px', color: 'white' }}>PRESENTER</span>
      </motion.div>

      {/* Dynamic Connector */}
      <div style={{ height: '40px', width: '2px', background: 'rgba(52, 211, 153, 0.2)', position: 'relative' }}>
        <motion.div 
          animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          style={{ position: 'absolute', width: '6px', height: '6px', background: '#34d399', borderRadius: '50%', left: '-2px' }}
        />
        <motion.div 
          animate={{ top: ['100%', '0%'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 0.6 }}
          style={{ position: 'absolute', width: '6px', height: '6px', background: '#34d399', borderRadius: '50%', left: '-2px' }}
        />
      </div>

      {/* Model */}
      <div style={{ width: '120px', height: '75px', background: 'var(--glass)', border: '1px solid #34d399', borderRadius: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Activity size={24} color="#34d399" />
        <span style={{ fontSize: '0.65rem', fontWeight: 800, marginTop: '4px', color: 'white' }}>MODEL</span>
      </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
      title="MVP"
      subtitle="Strict Separation"
      description="View ve Model arasındaki tüm iletişimi Presenter üzerinden yürüterek arayüzü tamamen pasif (Passive View) hale getiren, test edilebilirliği maksimize eden mimari."
      badge="Interaction Pattern"
      color="#34d399"
      illustration={illu}
      features={[
        { icon: <UserCheck />, title: 'Presenter', desc: 'Arayüzün yöneticisi. Viewdan olayları alır, Modeli günceller, Viewa ne yapacağını söyler.' },
        { icon: <Layout />, title: 'Passive View', desc: 'Kendi başına karar veremeyen aptal (dumb) arayüz katmanı.' },
        { icon: <Activity />, title: 'Testability', desc: 'UI framework bağımlılığı olmadan %100 Unit Test imkanı.' }
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
            { id: 'comparison', label: 'MVP vs MVVM', icon: <GitCompare size={18} /> },
            { id: 'concepts', label: 'Core Concepts', icon: <Box size={18} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 24px',
                borderRadius: '18px',
                border: 'none',
                background: activeTab === tab.id ? '#34d399' : 'transparent',
                color: activeTab === tab.id ? '#020617' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(52, 211, 153, 0.3)' : 'none'
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
                Kardeşlerin Savaşı: <span className="gradient-text" style={{ backgroundImage: 'linear-gradient(to right, #34d399, #10b981)' }}>MVP vs MVVM</span>
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'stretch' }}>
                
                {/* MVP CARD */}
                <div className="glass-card" style={{ borderTop: '4px solid #34d399', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.1 }}>
                    <Mic2 size={150} color="#34d399" />
                  </div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.5rem', color: '#34d399' }}>MVP</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Model - View - Presenter</p>
                  
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <li style={{ display: 'flex', gap: '12px' }}>
                      <ArrowRightLeft size={20} color="#34d399" />
                      <div>
                        <strong style={{ color: 'white' }}>İletişim:</strong> Presenter, View'un metotlarını (Interface) doğrudan çağırır. <br/><span style={{fontSize: '0.85rem', opacity: 0.7}}><code>view.showLoading()</code></span>
                      </div>
                    </li>
                    <li style={{ display: 'flex', gap: '12px' }}>
                      <Monitor size={20} color="#34d399" />
                      <div>
                        <strong style={{ color: 'white' }}>One-to-One:</strong> Genelde her View için (Activity/Fragment) bir Presenter vardır. Sıkı bir bağdır.
                      </div>
                    </li>
                    <li style={{ display: 'flex', gap: '12px' }}>
                      <Box size={20} color="#34d399" />
                      <div>
                        <strong style={{ color: 'white' }}>State:</strong> View kendi state'ini tutmaz, Presenter ne derse o olur.
                      </div>
                    </li>
                  </ul>
                </div>

                {/* VS Badge */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ background: '#0f172a', border: '1px solid var(--glass-border)', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.2rem', color: 'white', zIndex: 10 }}>VS</div>
                </div>

                {/* MVVM CARD */}
                <div className="glass-card" style={{ borderTop: '4px solid #10b981', position: 'relative', overflow: 'hidden' }}>
                   <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.1 }}>
                    <RefreshCw size={150} color="#10b981" />
                  </div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.5rem', color: '#10b981' }}>MVVM</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Model - View - ViewModel</p>
                  
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <li style={{ display: 'flex', gap: '12px' }}>
                      <Zap size={20} color="#10b981" />
                      <div>
                        <strong style={{ color: 'white' }}>Binding:</strong> ViewModel, View'a emir vermez. State yayınlar (Publish). View bu state'i dinler (Subscribe).
                      </div>
                    </li>
                    <li style={{ display: 'flex', gap: '12px' }}>
                      <CheckCircle2 size={20} color="#10b981" />
                      <div>
                        <strong style={{ color: 'white' }}>One-to-Many:</strong> Bir ViewModel birden fazla View tarafından dinlenebilir.
                      </div>
                    </li>
                    <li style={{ display: 'flex', gap: '12px' }}>
                      <Settings size={20} color="#10b981" />
                      <div>
                        <strong style={{ color: 'white' }}>Boilerplate:</strong> MVP'ye göre Interface (Sözleşme) yazma yükü daha azdır ama Binding setup'ı gerekebilir.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div style={{ marginTop: '4rem', background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', textAlign: 'center' }}>Özet: Hangisini Seçmeli?</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ background: 'rgba(52, 211, 153, 0.1)', padding: '10px', borderRadius: '8px', height: 'fit-content' }}><Mic2 color="#34d399" /></div>
                        <div>
                            <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>MVP Seç eğer...</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                Framework "Data Binding" desteklemiyorsa (eski Android, WinForms) veya çok net, manuel kontrol istiyorsan. "Sihir" (Magic Code) sevmiyorsan.
                            </p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                         <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '10px', borderRadius: '8px', height: 'fit-content' }}><RefreshCw color="#10b981" /></div>
                        <div>
                            <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>MVVM Seç eğer...</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                React, Vue, Flutter, Compose, SwiftUI gibi "Declarative" veya "Binding" destekli modern platformlarda geliştirme yapıyorsan.
                            </p>
                        </div>
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
                   <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '10px' }}>
                       <Activity size={24} /> Model
                   </h3>
                   <p style={{ lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                       Tıpkı MVC ve MVVM'deki gibi, veriyi ve veriye erişim kurallarını barındırır. Presenter veriyi buradan ister.
                       <br/><br/>
                       <span style={{ color: 'white', fontWeight: 600 }}>Örnek:</span> `UserRepository`, `PaymentService`.
                   </p>
               </div>
               <div className="glass-card">
                   <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '10px' }}>
                       <Layout size={24} /> View (Passive)
                   </h3>
                   <p style={{ lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                       Kasıtlı olarak "aptallaştırılmıştır". Karar vermez, mantık yürütmez. Sadece Presenter'ın "Göster" dediğini gösterir, "Gizle" dediğini gizler.
                       <br/><br/>
                       <span style={{ color: 'white', fontWeight: 600 }}>Slogan:</span> "Humble View" (Mütevazı Görünüm)
                   </p>
               </div>
               <div className="glass-card">
                   <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem', color: '#f472b6', display: 'flex', alignItems: 'center', gap: '10px' }}>
                       <UserCheck size={24} /> Presenter
                   </h3>
                   <p style={{ lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                       Orkestra şefi. View ve Model arasındaki köprüdür. View'dan olayları dinler (onClick gibi), Model'den veriyi alır, formatlar ve tekrar View'a geri gönderir.
                       <br/><br/>
                       <span style={{ color: 'white', fontWeight: 600 }}>Farkı:</span> View'u bir "Interface" üzerinden yönettiği için View implementation'ından bağımsızdır.
                   </p>
               </div>
             </div>

             <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--bg-dark)', borderRadius: '24px' }}>
                 <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>MVP'nin Altın Kuralı</h3>
                 <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.2)' }}>
                    <p style={{ fontSize: '1.1rem', color: '#e2e8f0', fontStyle: 'italic', textAlign: 'center' }}>
                        "View asla Model ile konuşmaz. Model asla View ile konuşmaz. Her şey Presenter üzerinden akmak zorundadır."
                    </p>
                 </div>
                 <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                    <div style={{ padding: '0.5rem 1rem', background: 'rgba(52, 211, 153, 0.1)', borderRadius: '100px', color: '#34d399', fontSize: '0.9rem', fontWeight: 700 }}>Strict Separation</div>
                    <div style={{ padding: '0.5rem 1rem', background: 'rgba(52, 211, 153, 0.1)', borderRadius: '100px', color: '#34d399', fontSize: '0.9rem', fontWeight: 700 }}>Interface-Driven</div>
                 </div>
             </div>
           </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MVPPage;
