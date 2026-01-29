import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { 
  Smartphone, 
  Monitor, 
  Server, 
  ArrowRight, 
  ArrowDown,
  Layers,
  Split,
  Database,
  Globe,
  Shuffle
} from 'lucide-react';

const BFFPage = () => {
    const [activeTab, setActiveTab] = useState<'simulation' | 'comparison'>('comparison');
    
    // Simulation State
    const [requestType, setRequestType] = useState<'mobile' | 'web' | null>(null);
    const [response, setResponse] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const fetchData = (type: 'mobile' | 'web') => {
        if (loading) return;
        setRequestType(type);
        setLoading(true);
        setResponse(null);

        // Simulate Network Delay & Processing
        setTimeout(() => {
            if (type === 'mobile') {
                setResponse({
                    screen: "Home",
                    data: { title: "Welcome", unread: 5 }, // Minified Data
                    size: "2KB"
                });
            } else {
                setResponse({
                    page: "Dashboard",
                    user: { name: "John Doe", role: "Admin", lastLogin: "Today" },
                    analytics: { visits: 1200, bounce: "20%" },
                    news: ["Update 1", "Update 2"],
                    size: "45KB" // Heavy Data
                });
            }
            setLoading(false);
        }, 1500);
    };

    const illu = (
        <div style={{ position: 'relative', width: '400px', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            {/* Clients Layer */}
            <div style={{ display: 'flex', gap: '80px', marginBottom: '20px' }}>
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ textAlign: 'center' }}>
                    <div style={{ width: '50px', height: '50px', background: '#3b82f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }}>
                        <Smartphone color="white" size={24} />
                    </div>
                </motion.div>
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} style={{ textAlign: 'center' }}>
                    <div style={{ width: '50px', height: '50px', background: '#eab308', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(234, 179, 8, 0.4)' }}>
                        <Monitor color="white" size={24} />
                    </div>
                </motion.div>
            </div>

            {/* BFF Layer */}
            <div style={{ display: 'flex', gap: '40px', marginBottom: '20px' }}>
                <div style={{ width: '2px', height: '40px', background: 'rgba(255,255,255,0.2)' }}></div>
                <div style={{ width: '2px', height: '40px', background: 'rgba(255,255,255,0.2)' }}></div>
            </div>

            <div style={{ display: 'flex', gap: '40px', marginBottom: '20px' }}>
                <div style={{ padding: '8px 12px', border: '1px solid #3b82f6', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', fontSize: '0.7rem', fontWeight: 800 }}>
                    Mobile BFF
                </div>
                <div style={{ padding: '8px 12px', border: '1px solid #eab308', borderRadius: '8px', background: 'rgba(234, 179, 8, 0.1)', color: '#eab308', fontSize: '0.7rem', fontWeight: 800 }}>
                    Web BFF
                </div>
            </div>

            {/* General API / Microservices */}
            <div style={{ width: '80%', height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '20px' }}></div>

            <div style={{ display: 'flex', gap: '10px' }}>
                {[1,2,3].map(i => (
                    <div key={i} style={{ width: '60px', height: '40px', background: '#334155', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Server size={16} color="#94a3b8" />
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '10px', fontSize: '0.7rem', color: '#64748b' }}>Downstream Services</div>

            {/* Animated Data Packets */}
            <motion.div
                animate={{ top: [60, 180], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                style={{ position: 'absolute', top: 60, left: 110, width: '6px', height: '6px', borderRadius: '50%', background: '#3b82f6' }}
            />
             <motion.div
                animate={{ top: [60, 180], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.5 }}
                style={{ position: 'absolute', top: 60, left: 240, width: '6px', height: '6px', borderRadius: '50%', background: '#eab308' }}
            />

        </div>
    );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="Backend for Frontend"
        subtitle="Pattern"
        description="Tek beden herkese uymaz. Mobil cihazın, web tarayıcısının ve akıllı saatin ihtiyaçları farklıdır. Her arayüz (Frontend) için ona özel hazırlanmış bir sunucu katmanı (BFF) oluşturun."
        badge="API Composition"
        color="#3b82f6"
        illustration={illu}
        features={[
          { icon: <Smartphone />, title: 'Optimized Payloads', desc: 'Mobil için gereksiz verileri kırpın, sadece ekranın ihtiyacı olanı gönderin.' },
          { icon: <Shuffle />, title: 'Aggregation', desc: 'Frontend tek bir istek atar, BFF arkadaki 10 servisle konuşup sonucu birleştirir.' },
          { icon: <Split />, title: 'Decoupling', desc: 'Backend değişse bile, BFF aradaki farkı absorbe eder, Frontend bozulmaz.' }
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
            { id: 'comparison', label: 'One-Size-Fits-All vs BFF', icon: <Layers size={18} /> },
            { id: 'simulation', label: 'Response Shaper', icon: <Database size={18} /> }
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
                    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.5fr', gap: '3rem', alignItems: 'center' }}>
                         
                         <div className="glass-card" style={{ borderLeft: '4px solid #ef4444' }}>
                             <h3 style={{ fontSize: '1.4rem', color: '#ef4444', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                 <Globe /> General Purpose API
                             </h3>
                             <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                 Tüm clientlar (Mobil, Web, Saat) aynı devasa API'yi kullanır.
                             </p>
                             <ul style={{ paddingLeft: '1.5rem', color: '#94a3b8', lineHeight: 2 }}>
                                 <li>❌ <strong>Over-fetching:</strong> Mobil uygulama sadece "Ad" bilgisini ister ama API tüm kullanıcı geçmişini (50KB) döner.</li>
                                 <li>❌ <strong>Chatty Network:</strong> Bir ekranı çizmek için Client 5 farklı servise istek atmak zorunda kalır.</li>
                                 <li>❌ <strong>Tight Coupling:</strong> API değişirse tüm clientlar patlar.</li>
                             </ul>
                         </div>

                         <div className="glass-card" style={{ borderLeft: '4px solid #3b82f6' }}>
                             <h3 style={{ fontSize: '1.4rem', color: '#3b82f6', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                 <Split /> Backend For Frontend
                             </h3>
                             <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                 Her arayüzün kendine ait, özel bir API katmanı vardır.
                             </p>
                             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                 <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '12px' }}>
                                     <h4 style={{ color: '#3b82f6', fontSize: '1rem', marginBottom: '5px' }}>Mobile BFF</h4>
                                     <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>Az veri, tek request, hızlı açılış.</p>
                                 </div>
                                 <div style={{ background: 'rgba(234, 179, 8, 0.1)', padding: '1rem', borderRadius: '12px' }}>
                                     <h4 style={{ color: '#eab308', fontSize: '1rem', marginBottom: '5px' }}>Web BFF</h4>
                                     <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>Detaylı veri, zengin içerik, admin yetkileri.</p>
                                 </div>
                             </div>
                         </div>

                    </div>
                </motion.div>
            )}

            {activeTab === 'simulation' && (
                <motion.div
                   key="simulation"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
               >
                   <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                       <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                           Aşağıdaki clientlardan birinden istek gönderin ve BFF'in yanıtı nasıl <strong>şekillendirdiğini</strong> (Response Shaping) görün.
                       </p>
                       <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>
                           
                           {/* Mobile Client Button */}
                           <button 
                               onClick={() => fetchData('mobile')}
                               disabled={loading}
                               className="btn-bounce"
                               style={{ 
                                   background: requestType === 'mobile' ? '#3b82f6' : 'rgba(59, 130, 246, 0.1)', 
                                   border: '2px solid #3b82f6',
                                   borderRadius: '20px',
                                   padding: '20px',
                                   cursor: 'pointer',
                                   color: requestType === 'mobile' ? 'white' : '#3b82f6',
                                   width: '150px',
                                   opacity: loading && requestType !== 'mobile' ? 0.3 : 1
                               }}
                           >
                               <Smartphone size={40} style={{ marginBottom: '10px' }} />
                               <div style={{ fontWeight: 800 }}>MOBILE APP</div>
                           </button>

                           {/* Web Client Button */}
                           <button 
                               onClick={() => fetchData('web')}
                               disabled={loading}
                               className="btn-bounce"
                               style={{ 
                                   background: requestType === 'web' ? '#eab308' : 'rgba(234, 179, 8, 0.1)', 
                                   border: '2px solid #eab308',
                                   borderRadius: '20px',
                                   padding: '20px',
                                   cursor: 'pointer',
                                   color: requestType === 'web' ? 'black' : '#eab308',
                                   width: '150px',
                                   opacity: loading && requestType !== 'web' ? 0.3 : 1
                               }}
                           >
                               <Monitor size={40} style={{ marginBottom: '10px' }} />
                               <div style={{ fontWeight: 800 }}>WEB DASHBOARD</div>
                           </button>

                       </div>
                   </div>

                   {/* The Result Container */}
                   <AnimatePresence mode="wait">
                       {loading && (
                            <motion.div 
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                style={{ textAlign: 'center', margin: '3rem 0', color: '#94a3b8' }}
                            >
                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} style={{ display: 'inline-block' }}>
                                    <Shuffle size={30} />
                                </motion.div>
                                <div style={{ marginTop: '10px' }}>
                                    {requestType === 'mobile' ? 'Mobile BFF aggregating data...' : 'Web BFF checking permissions...'}
                                </div>
                            </motion.div>
                       )}

                       {response && !loading && (
                           <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass-card"
                                style={{ 
                                    maxWidth: '600px', 
                                    margin: '0 auto', 
                                    borderTop: `4px solid ${requestType === 'mobile' ? '#3b82f6' : '#eab308'}`,
                                    background: '#020617'
                                }}
                           >
                               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                                   <div style={{ fontWeight: 800, color: 'white' }}>JSON Response Payload</div>
                                   <div style={{ 
                                       background: requestType === 'mobile' ? '#10b981' : '#f43f5e', 
                                       color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 800 
                                   }}>
                                       SIZE: {response.size}
                                   </div>
                               </div>
                               <pre style={{ color: '#cbd5e1', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.5 }}>
                                   {JSON.stringify(response, null, 2)}
                               </pre>
                               <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic', textAlign: 'center' }}>
                                   {requestType === 'mobile' ? 
                                     "Mobile BFF sadece tek bir basit obje döndü. Resim yok, detay yok." : 
                                     "Web BFF, admin paneli için tüm detayları ve analitik verilerini döndü."}
                               </div>
                           </motion.div>
                       )}
                   </AnimatePresence>

               </motion.div>
            )}
        </AnimatePresence>
      </div>

       {/* Reference Section */}
      <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
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
                Definitive Resource
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                BFF kavramı, Sam Newman tarafından "Building Microservices" kitabında ve makalelerinde detaylandırılmıştır.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://samnewman.io/patterns/architectural/bff/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(59, 130, 246, 0.15)', color: '#93c5fd', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(59, 130, 246, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    Sam Newman's BFF Pattern <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>

    </motion.div>
  );
};

export default BFFPage;
