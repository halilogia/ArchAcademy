import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Layers, Share2, Settings, Box, Database, Server, ArrowRightLeft, ShieldCheck, Globe, Activity, Workflow } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { SOAComparisonTab } from '../components/soa/SOAComparisonTab';
import { SOASimulationTab } from '../components/soa/SOASimulationTab';

const SOAPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'simulation' | 'comparison'>('comparison');
    
  // ESB Simulation State
  const [busActive, setBusActive] = useState(false);
  const [messageLog, setMessageLog] = useState<string[]>([]);
  
  // Legacy Systems (Simulated)
  const [legacyCRM, setLegacyCRM] = useState<'idle' | 'processing'>('idle');
  const [modernWeb, setModernWeb] = useState<'idle' | 'processing'>('idle');
  const [sapSystem, setSapSystem] = useState<'idle' | 'processing'>('idle');

  const log = (msg: string) => {
    setMessageLog(prev => [...prev, `${new Date().toLocaleTimeString().split(' ')[0]} - ${msg}`]);
  };

  const triggerESB = () => {
    if (busActive) return;
    setBusActive(true);
    setMessageLog([]);

    // 1. Web Request
    setModernWeb('processing');
    log(isEn ? 'Web App: SOAP Request Dispatched (XML Payload)' : 'Web App: SOAP Request Sent (XML)');

    setTimeout(() => {
      log(isEn ? 'ESB: Transforming JSON <-> XML' : 'ESB: Transforming JSON <-> XML');
      
      // 2. ESB Routing
      setTimeout(() => {
        log(isEn ? 'ESB: Routing to SAP & Legacy CRM' : 'ESB: Routing to SAP & CRM');
        setLegacyCRM('processing');
        setSapSystem('processing');
        
        // 3. Response
        setTimeout(() => {
          setLegacyCRM('idle');
          setSapSystem('idle');
          log(isEn ? 'Backend Systems: Data Successfully Mutated' : 'Systems: Data Updated');
          
          setTimeout(() => {
            log(isEn ? 'ESB: Aggregating & Formatting Responses' : 'ESB: Aggregating Responses');
            setModernWeb('idle');
            setBusActive(false);
          }, 1000);
        }, 1500);
      }, 1000);
    }, 1000);
  };

  const heroIllustration = (
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
    <>
      <SEO
        title={isEn ? "Service-Oriented Architecture (SOA) & ESB Pattern | ArchAcademy" : "Servis Odaklı Mimari (SOA) ve ESB | ArchAcademy"}
        description={isEn 
          ? "Master Service-Oriented Architecture (SOA), Enterprise Service Bus (ESB) integration, protocol transformations, and legacy interoperability." 
          : "Servis Odaklı Mimari (SOA), Enterprise Service Bus (ESB), protokol dönüşümleri ve kurumsal entegrasyon rehberi."
        }
        keywords="service oriented architecture, soa vs microservices, enterprise service bus, esb, wsdl soap xml, open group soa"
        canonicalUrl="/soa"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
        <ArchHero 
          title="SOA"
          subtitle="Service Oriented Architecture"
          description={isEn 
            ? "The great unifier of enterprise IT ecosystems. Connects disparate polyglot systems (Java, .NET, COBOL, SAP) via a centralized, smart Enterprise Service Bus (ESB)." 
            : "Kurumsal kaosun düzenleyicisi. Farklı dillerde konuşan (Java, .NET, Cobol) yüzlerce sistemi tek bir dil (ESB) ile anlaştırır."
          }
          badge="Enterprise Standard"
          color="#fbcfe8"
          illustration={heroIllustration}
          features={[
            { 
              icon: <Layers />, 
              title: isEn ? 'Interoperability' : 'Birlikte Çalışabilirlik (Interoperability)', 
              desc: isEn ? 'Integrates legacy mainframes with modern cloud REST APIs seamlessly.' : 'Eski Mainframe sistemler ile modern Web API\'leri aynı çatı altında çalıştırır.' 
            },
            { 
              icon: <Share2 />, 
              title: isEn ? 'ESB (The Bus)' : 'Merkezi ESB Veriyolu', 
              desc: isEn ? 'All traffic traverses a smart bus handling routing, transformation, and security.' : 'Tüm trafik merkezi bir otobüsten (Bus) geçer. Dönüşüm ve güvenlik burada yapılır.' 
            },
            { 
              icon: <Settings />, 
              title: isEn ? 'Reusability' : 'Geniş Çaplı Yeniden Kullanım', 
              desc: isEn ? 'Coarse-grained business services are shared enterprise-wide without duplication.' : 'Bir servis (örn: MüşteriDoğrula) tüm şirket tarafından tekrar tekrar kullanılır.' 
            }
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
              { id: 'comparison', label: isEn ? 'Microservices vs SOA' : 'Microservices vs SOA', icon: <Box size={18} /> },
              { id: 'simulation', label: isEn ? 'ESB Integration Demo' : 'ESB Entegrasyon Simülasyonu', icon: <Workflow size={18} /> }
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
            {activeTab === 'comparison' && <SOAComparisonTab key="comparison" />}
            {activeTab === 'simulation' && (
              <SOASimulationTab 
                key="simulation"
                busActive={busActive}
                messageLog={messageLog}
                modernWeb={modernWeb}
                legacyCRM={legacyCRM}
                sapSystem={sapSystem}
                onTriggerESB={triggerESB}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Industry Standard Reference */}
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
                  {isEn ? "Industry Standard Reference" : "Endüstri Standardı"}
                </div>
                <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  {isEn 
                    ? "SOA is formally codified by The Open Group. Review enterprise standards in the official SOA Source Book." 
                    : "SOA, The Open Group tarafından standartlaştırılmıştır. Kurumsal mimari standartlarını ve 'SOA Source Book'u buradan inceleyebilirsiniz."
                  }
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
    </>
  );
};

export default SOAPage;
