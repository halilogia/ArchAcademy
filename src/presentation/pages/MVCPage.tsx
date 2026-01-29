import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { 
  Layout, 
  Database, 
  Settings, 
  ArrowRightLeft, 
  CheckCircle2, 
  XCircle, 
  GitCompare,
  Monitor,
  Code2,
  RefreshCw,
  Zap,
  Box,
  Brain
} from 'lucide-react';

const MVCPage = () => {
  const [activeTab, setActiveTab] = useState<'concepts' | 'comparison'>('comparison');

  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* View */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: '130px', height: '85px', background: 'var(--glass)', border: '2px solid #ec4899', borderRadius: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 3, boxShadow: '0 10px 30px rgba(236, 72, 153, 0.2)' }}
      >
        <Layout size={28} color="#ec4899" />
        <span style={{ fontSize: '0.75rem', fontWeight: 900, marginTop: '6px', color: 'white' }}>VIEW</span>
      </motion.div>

      {/* Dynamic Connector Down */}
      <div style={{ height: '40px', width: '2px', background: 'rgba(236, 72, 153, 0.2)', position: 'relative' }}>
        <motion.div 
          animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          style={{ position: 'absolute', width: '6px', height: '6px', background: '#ec4899', borderRadius: '50%', left: '-2px', filter: 'blur(1px)' }}
        />
      </div>

      {/* Controller / ViewModel */}
      <motion.div
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: '140px', height: '90px', background: 'var(--glass)', border: '2px solid #ec4899', borderRadius: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 3, boxShadow: '0 0 40px rgba(236, 72, 153, 0.15)' }}
      >
        <Settings size={28} color="#ec4899" className="rotate-slow" />
        <span style={{ fontSize: '0.75rem', fontWeight: 900, marginTop: '6px', color: 'white' }}>CONTROLLER</span>
      </motion.div>

      {/* Dynamic Connector Up & Down */}
      <div style={{ height: '40px', width: '2px', background: 'rgba(236, 72, 153, 0.2)', position: 'relative' }}>
        <motion.div 
          animate={{ bottom: ['0%', '100%'], opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.75 }}
          style={{ position: 'absolute', width: '6px', height: '6px', background: '#ec4899', borderRadius: '50%', left: '-2px', filter: 'blur(1px)' }}
        />
      </div>

      {/* Model */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: '130px', height: '85px', background: 'var(--glass)', border: '2px solid #ec4899', borderRadius: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 3, boxShadow: '0 -10px 30px rgba(236, 72, 153, 0.2)' }}
      >
        <Database size={28} color="#ec4899" />
        <span style={{ fontSize: '0.75rem', fontWeight: 900, marginTop: '6px', color: 'white' }}>MODEL</span>
      </motion.div>
      <style>{`
        .rotate-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="MVC"
        subtitle="Classic Pattern"
        description="Software dünyasının en köklü mimari deseni. Model, View ve Controller üçlüsüyle sorumlulukları ayıran, MVVM ve diğer modern UI desenlerinin atası."
        badge="Architectural Pattern"
        color="#ec4899"
        illustration={illu}
        features={[
            { icon: <Layout />, title: 'View', desc: 'Kullanıcının gördüğü arayüz katmanı.' },
            { icon: <Brain />, title: 'Controller', desc: 'İş akışını yöneten, Model ve View arasındaki trafiği düzenleyen beyin.' },
            { icon: <Database />, title: 'Model', desc: 'Veri ve iş kurallarının (Business Logic) yaşadığı en saf katman.' }
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
            { id: 'comparison', label: 'MVC vs MVVM', icon: <GitCompare size={18} /> },
            { id: 'concepts', label: 'Core Concepts', icon: <Box size={18} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 24px',
                borderRadius: '18px',
                border: 'none',
                background: activeTab === tab.id ? '#ec4899' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(236, 72, 153, 0.3)' : 'none'
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
                Büyük Karşılaştırma: <span className="gradient-text">MVC vs MVVM</span>
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'stretch' }}>
                
                {/* MVC CARD */}
                <div className="glass-card" style={{ borderTop: '4px solid #f43f5e', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.1 }}>
                    <Settings size={150} color="#f43f5e" />
                  </div>
                  <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.5rem', color: '#f43f5e' }}>MVC</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Model - View - Controller</p>
                  
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <li style={{ display: 'flex', gap: '12px' }}>
                      <ArrowRightLeft size={20} color="#f43f5e" />
                      <div>
                        <strong style={{ color: 'white' }}>İletişim:</strong> Controller, View'u günceller. View, Controller'ı tetikler. Genelde "One-to-One" ilişki vardır.
                      </div>
                    </li>
                    <li style={{ display: 'flex', gap: '12px' }}>
                      <Monitor size={20} color="#f43f5e" />
                      <div>
                        <strong style={{ color: 'white' }}>View Bağımlılığı:</strong> Controller genellikle View'dan haberdardır veya doğrudan referans tutar (Strict Coupling).
                      </div>
                    </li>
                    <li style={{ display: 'flex', gap: '12px' }}>
                      <Code2 size={20} color="#f43f5e" />
                      <div>
                        <strong style={{ color: 'white' }}>Kullanım Alanı:</strong> Server-side frameworks (Spring MVC, Django), basit masaüstü uygulamaları.
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
                        <strong style={{ color: 'white' }}>Binding (Bağlama):</strong> ViewModel değişir, View otomatik güncellenir (Data Binding).
                      </div>
                    </li>
                    <li style={{ display: 'flex', gap: '12px' }}>
                      <CheckCircle2 size={20} color="#10b981" />
                      <div>
                        <strong style={{ color: 'white' }}>Test Edilebilirlik:</strong> ViewModel, View'u bilmez! Bu yüzden UI olmadan tamamen test edilebilir (Loose Coupling).
                      </div>
                    </li>
                    <li style={{ display: 'flex', gap: '12px' }}>
                      <Code2 size={20} color="#10b981" />
                      <div>
                        <strong style={{ color: 'white' }}>Kullanım Alanı:</strong> Modern Frontend (React, Vue, Flutter), WPF, Xamarin gibi zengin arayüzler.
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div style={{ marginTop: '4rem', background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', textAlign: 'center' }}>Tarihsel Gelişim Özeti</h3>
                <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                    <div style={{ textAlign: 'center', maxWidth: '300px' }}>
                        <div style={{ fontSize: '3rem', fontWeight: 900, color: '#64748b', marginBottom: '0.5rem' }}>1979</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white' }}>MVC Doğdu</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Trygve Reenskaug tarafından Smalltalk için geliştirildi.</div>
                    </div>
                     <ArrowRightLeft size={32} color="#64748b" />
                    <div style={{ textAlign: 'center', maxWidth: '300px' }}>
                        <div style={{ fontSize: '3rem', fontWeight: 900, color: '#f59e0b', marginBottom: '0.5rem' }}>1996</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white' }}>MVP Evrimi</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Taligent tarafından C++ ve Java dünyasına pencereli sistemler için uyarlandı.</div>
                    </div>
                     <ArrowRightLeft size={32} color="#64748b" />
                    <div style={{ textAlign: 'center', maxWidth: '300px' }}>
                        <div style={{ fontSize: '3rem', fontWeight: 900, color: '#10b981', marginBottom: '0.5rem' }}>2005</div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white' }}>MVVM Devrimi</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Microsoft (John Gossman) tarafından WPF ve "Binding" teknolojisiyle duyuruldu.</div>
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
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem', color: '#ec4899', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Database size={24} /> Model
                    </h3>
                    <p style={{ lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                        Uygulamanın verisini ve iş kurallarını temsil eder. Veritabanı sorguları, veri doğrulama ve hesaplamalar buradadır.
                        <br/><br/>
                        <span style={{ color: 'white', fontWeight: 600 }}>Örnek:</span> `User` sınıfı, `Product` veritabanı tablosu.
                    </p>
                </div>
                <div className="glass-card">
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem', color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Layout size={24} /> View
                    </h3>
                    <p style={{ lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                        Verinin kullanıcıya nasıl gösterileceğinden sorumludur. Model'i görselleştirir.
                        <br/><br/>
                        <span style={{ color: 'white', fontWeight: 600 }}>Örnek:</span> HTML sayfası, React Component, User Profile Screen.
                    </p>
                </div>
                <div className="glass-card">
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Settings size={24} /> Controller
                    </h3>
                    <p style={{ lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                        Kullanıcı girdisini (Input) alır, yorumlar ve Model'i günceller. Ardından hangi View'un gösterileceğine karar verir.
                        <br/><br/>
                        <span style={{ color: 'white', fontWeight: 600 }}>Örnek:</span> Bir form gönderildiğinde `SaveUser` fonksiyonunu çağıran backend endpoint.
                    </p>
                </div>
              </div>

              <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--bg-dark)', borderRadius: '24px' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>Neden MVC Hala Önemli?</h3>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                          <CheckCircle2 color="#10b981" size={20} style={{ marginTop: '2px' }} />
                          <div>
                              <strong style={{ color: 'white' }}>Basitlik:</strong> Veri akışını anlamak kolaydır. İstek gelir &rarr; Controller işler &rarr; Model güncellenir &rarr; View döner.
                          </div>
                      </li>
                      <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                          <CheckCircle2 color="#10b981" size={20} style={{ marginTop: '2px' }} />
                          <div>
                              <strong style={{ color: 'white' }}>SEO Dostu:</strong> Server-Side Rendering (SSR) yapan MVC frameworkleri, arama motorları için tamamlanmış HTML sunar.
                          </div>
                      </li>
                       <li style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                          <CheckCircle2 color="#10b981" size={20} style={{ marginTop: '2px' }} />
                          <div>
                              <strong style={{ color: 'white' }}>Yaygınlık:</strong> Ruby on Rails, Django, Laravel, ASP.NET MVC gibi devasa frameworklerin temelidir.
                          </div>
                      </li>
                  </ul>
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
                Historical Context
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                MVC, MVP ve MVVM'in tarihsel gelişimini ve aralarındaki ince farkları Martin Fowler'ın efsanevi "GUI Architectures" makalesinden okuyabilirsiniz.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://martinfowler.com/eaaDev/uiArchs.html" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(236, 72, 153, 0.15)', color: '#fbcfe8', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(236, 72, 153, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    GUI Architectures (Martin Fowler) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};

export default MVCPage;
