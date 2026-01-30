import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { 
  Layers, 
  Share2, 
  Settings, 
  Box, 
  Database, 
  Server, 
  ArrowRightLeft, 
  ShieldCheck, 
  Globe, 
  FileJson,
  Activity,
  Workflow
} from 'lucide-react';

const SOAPage = () => {
    const [activeTab, setActiveTab] = useState<'simulation' | 'comparison'>('comparison');
    
    // ESB Simulation State
    const [busActive, setBusActive] = useState(false);
    const [messageLog, setMessageLog] = useState<string[]>([]);
    
    // Legacy Systems (Simulated)
    const [legacyCRM, setLegacyCRM] = useState<'idle' | 'processing'>('idle');
    const [modernWeb, setModernWeb] = useState<'idle' | 'processing'>('idle');
    const [sapSystem, setSapSystem] = useState<'idle' | 'processing'>('idle');

    const triggerESB = () => {
        if (busActive) return;
        setBusActive(true);
        setMessageLog([]);

        // 1. Web Request
        setModernWeb('processing');
        log('Web App: SOAP Request Sent (XML)');

        setTimeout(() => {
            log('ESB: Transforming JSON <-> XML');
            
            // 2. ESB Routing
            setTimeout(() => {
                log('ESB: Routing to SAP & CRM');
                setLegacyCRM('processing');
                setSapSystem('processing');
                
                // 3. Response
                setTimeout(() => {
                    setLegacyCRM('idle');
                    setSapSystem('idle');
                    log('Systems: Data Updated');
                    
                    setTimeout(() => {
                        log('ESB: Aggregating Responses');
                        setModernWeb('idle');
                        setBusActive(false);
                    }, 1000);
                }, 1500);
            }, 1000);
        }, 1000);
    };

    const log = (msg: string) => {
        setMessageLog(prev => [...prev, `${new Date().toLocaleTimeString().split(' ')[0]} - ${msg}`]);
    };

    const illu = (
        <div style={{ position: 'relative', width: '350px', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}>
             {/* Top Service */}
             <motion.div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                 <Globe size={24} color="#fbcfe8" />
                 <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>WEB PORTAL</span>
             </motion.div>

             {/* ESB Pipeline */}
             <div style={{ position: 'relative', width: '280px', height: '140px', background: 'rgba(251, 207, 232, 0.05)', border: '2px solid #fbcfe8', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                 <div style={{ position: 'absolute', top: 5, fontSize: '0.65rem', color: '#fbcfe8', fontWeight: 900, letterSpacing: '2px' }}>ENTERPRISE SERVICE BUS</div>
                 
                 <motion.div 
                    animate={{ x: busActive ? [-100, 100] : 0, opacity: busActive ? 1 : 0 }}
                    transition={{ repeat: busActive ? Infinity : 0, duration: 1.5, ease: "linear" }}
                    style={{ width: '40px', height: '40px', background: '#ec4899', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                 >
                     <p style={{ margin: 0, fontSize: '0.6rem', color: 'white', fontWeight: 800 }}>XML</p>
                 </motion.div>

                 {/* Internal Logic Icons */}
                 <div style={{ position: 'absolute', bottom: 10, display: 'flex', gap: '20px', opacity: 0.5 }}>
                     <ArrowRightLeft size={16} color="#fbcfe8" />
                     <ShieldCheck size={16} color="#fbcfe8" />
                     <Activity size={16} color="#fbcfe8" />
                 </div>
             </div>

             {/* Bottom Services */}
             <div style={{ marginTop: '20px', display: 'flex', gap: '40px' }}>
                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                     <Server size={24} color="#fbcfe8" />
                     <span style={{ fontSize: '0.6rem', marginTop: '5px' }}>LEGACY CRM</span>
                 </div>
                 <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                     <Database size={24} color="#fbcfe8" />
                     <span style={{ fontSize: '0.6rem', marginTop: '5px' }}>MAINFRAME</span>
                 </div>
             </div>

             {/* Connecting Lines */}
             <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1 }}>
                 <line x1="175" y1="30" x2="175" y2="50" stroke="#fbcfe8" strokeWidth="2" strokeDasharray="4 4" />
                 <line x1="175" y1="190" x2="140" y2="210" stroke="#fbcfe8" strokeWidth="2" strokeDasharray="4 4" />
                 <line x1="175" y1="190" x2="210" y2="210" stroke="#fbcfe8" strokeWidth="2" strokeDasharray="4 4" />
             </svg>
        </div>
    );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="SOA"
        subtitle="Service Oriented Architecture"
        description="Kurumsal kaosun düzenleyicisi. Farklı dillerde konuşan (Java, .NET, Cobol) yüzlerce sistemi tek bir dil (ESB) ile anlaştırır."
        badge="Enterprise Standard"
        color="#fbcfe8"
        illustration={illu}
        features={[
          { icon: <Layers />, title: 'Interoperability', desc: 'Eski Mainframe sistemler ile modern Web API\'leri aynı çatı altında çalıştırır.' },
          { icon: <Share2 />, title: 'ESB (The Bus)', desc: 'Tüm trafik merkezi bir otobüsten (Bus) geçer. Dönüşüm ve güvenlik burada yapılır.' },
          { icon: <Settings />, title: 'Reusability', desc: 'Bir servis (örn: MüşteriDoğrula) tüm şirket tarafından tekrar tekrar kullanılır.' }
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
            { id: 'comparison', label: 'Microservices vs SOA', icon: <Box size={18} /> },
            { id: 'simulation', label: 'ESB Integration Demo', icon: <Workflow size={18} /> }
          ].map((tab) => (
             <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 24px',
                borderRadius: '18px',
                border: 'none',
                background: activeTab === tab.id ? '#fbcfe8' : 'transparent',
                color: activeTab === tab.id ? 'black' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(251, 207, 232, 0.3)' : 'none'
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
                     <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '4rem', alignItems: 'center' }}>
                         
                         <div className="glass-card" style={{ borderLeft: '4px solid #fbcfe8' }}>
                             <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#fbcfe8' }}>
                                 <Share2 /> SOA (Enterprise)
                             </h3>
                             <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                 "Akıllı Borular, Aptal Uçlar" (Smart Pipe, Dumb Endpoint). Tüm zeka ve dönüşüm mantığı merkezi ESB katmanındadır.
                             </p>
                             <div style={{ background: 'rgba(251, 207, 232, 0.1)', padding: '1rem', borderRadius: '12px' }}>
                                 <h4 style={{ color: '#fbcfe8', fontSize: '0.9rem', marginBottom: '5px' }}>Kullanım Alanı</h4>
                                 <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>Bankalar, Sigorta Şirketleri, Eski ve Yeni sistemin iç içe geçtiği yapılar.</p>
                             </div>
                         </div>

                         <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                             <h4 style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Mikroservislerden Farkı Nedir?</h4>
                             {[
                                 { title: 'Granülarite', desc: 'SOA servisleri büyüktür (Coarse-grained), Mikroservisler küçüktür (Fine-grained).' },
                                 { title: 'Veri Paylaşımı', desc: 'SOA\'da veritabanı genelde ortaktır. Mikroservislerde her servisin kendi DB\'si vardır.' },
                                 { title: 'İletişim', desc: 'SOA ağır protokoller (SOAP/XML) kullanır. Mikroservisler hafif (JSON/REST) kullanır.' }
                             ].map((item, i) => (
                                 <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                     <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbcfe8', fontWeight: 800 }}>{i+1}</div>
                                     <div>
                                         <strong style={{ color: 'white' }}>{item.title}:</strong> <span style={{ color: 'var(--text-secondary)' }}>{item.desc}</span>
                                     </div>
                                 </div>
                             ))}
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
                          <button 
                            onClick={triggerESB}
                            disabled={busActive}
                            className="btn-bounce"
                            style={{ 
                                padding: '15px 40px', 
                                fontSize: '1.1rem', 
                                fontWeight: 800, 
                                borderRadius: '12px', 
                                border: 'none', 
                                background: busActive ? '#334155' : '#fbcfe8', 
                                color: busActive ? '#64748b' : 'black',
                                cursor: busActive ? 'default' : 'pointer',
                                boxShadow: busActive ? 'none' : '0 10px 30px rgba(251, 207, 232, 0.4)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                        >
                            <FileJson size={20} /> {busActive ? 'ESB Processing...' : 'Send Modern JSON Request'}
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '2rem', alignItems: 'center' }}>
                         
                         {/* Modern Client */}
                         <div className="glass-card" style={{ opacity: busActive && modernWeb === 'processing' ? 1 : 0.5, border: modernWeb === 'processing' ? '2px solid #fbcfe8' : '1px solid transparent' }}>
                             <h4 style={{ color: '#fbcfe8', marginBottom: '10px' }}>Modern Web App</h4>
                             <div style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: '#94a3b8' }}>
                                 POST /api/customer<br/>
                                 Content-Type: application/json
                             </div>
                         </div>

                         {/* The ESB */}
                         <div style={{ 
                             height: '250px', 
                             background: 'rgba(0,0,0,0.3)', 
                             borderRadius: '24px', 
                             border: '2px dashed #fbcfe8',
                             position: 'relative',
                             display: 'flex',
                             flexDirection: 'column',
                             padding: '20px'
                         }}>
                             <div style={{ position: 'absolute', top: -15, left: '50%', transform: 'translateX(-50%)', background: '#020617', padding: '0 10px', color: '#fbcfe8', fontWeight: 900 }}>ENTERPRISE SERVICE BUS</div>
                             
                            <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                                {messageLog.map((log, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ marginBottom: '5px', color: '#e2e8f0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        <span style={{ color: '#fbcfe8' }}>&gt;</span> {log}
                                    </motion.div>
                                ))}
                            </div>

                             {busActive && (
                                 <motion.div 
                                    style={{ height: '4px', background: '#fbcfe8', borderRadius: '2px', marginTop: '10px' }}
                                    initial={{ width: '0%' }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 4 }}
                                 />
                             )}
                         </div>

                         {/* Legacy Backends */}
                         <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                             <div className="glass-card" style={{ opacity: legacyCRM === 'processing' ? 1 : 0.5, border: legacyCRM === 'processing' ? '2px solid #ef4444' : '1px solid transparent' }}>
                                 <h4 style={{ color: '#ef4444', marginBottom: '5px' }}>Legacy CRM</h4>
                                 <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Expects: SOAP/XML</div>
                             </div>
                             <div className="glass-card" style={{ opacity: sapSystem === 'processing' ? 1 : 0.5, border: sapSystem === 'processing' ? '2px solid #3b82f6' : '1px solid transparent' }}>
                                 <h4 style={{ color: '#3b82f6', marginBottom: '5px' }}>SAP System</h4>
                                 <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Expects: Proprietary</div>
                             </div>
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
                Industry Standard
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                SOA, The Open Group tarafından standartlaştırılmıştır. Kurumsal mimari standartlarını ve "SOA Source Book"u buradan inceleyebilirsiniz.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://www.opengroup.org/soa-source-book-intro" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(251, 207, 232, 0.15)', color: '#fbcfe8', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(251, 207, 232, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    The Open Group SOA Source Book <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};

export default SOAPage;
