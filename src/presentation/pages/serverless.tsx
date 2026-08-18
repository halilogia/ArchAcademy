import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Zap, Cloud, DollarSign, Activity, Clock, Server, Gauge } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { ServerlessComparisonTab } from '../components/serverless/ServerlessComparisonTab';
import { ServerlessSimulationTab } from '../components/serverless/ServerlessSimulationTab';

const ServerlessPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'simulation' | 'comparison'>('comparison');
  const [instances, setInstances] = useState<number>(0);
  const [coldStarts, setColdStarts] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);

  const triggerRequest = () => {
    const isColdStart = Math.random() > 0.7 || instances === 0;
    if (isColdStart) {
      setColdStarts(prev => prev + 1);
      setInstances(prev => prev + 1);
    }
    setCost(prev => prev + 0.0002);
  };

  const heroIllustration = (
    <div style={{ position: 'relative', width: '380px', height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* Cloud Provider */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ zIndex: 5 }}
      >
        <Cloud size={180} color="#a855f7" strokeWidth={1} fill="rgba(168, 85, 247, 0.1)" />
      </motion.div>

      {/* Function Instances */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0.5],
              x: [0, (i % 2 === 0 ? 60 : -60) * (Math.ceil((i+1)/2))],
              y: [0, (i < 2 ? -60 : 60)]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              delay: i * 0.8,
              ease: "easeInOut"
            }}
            style={{ 
              position: 'absolute', 
              background: '#a855f7', 
              width: '40px', 
              height: '40px', 
              borderRadius: '8px',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 0 20px #a855f7'
            }}
          >
            <span style={{ fontSize: '10px', fontWeight: 900, color: 'white' }}>FN</span>
          </motion.div>
        ))}
      </div>
      
      {/* Zap Icons */}
      <div style={{ position: 'absolute', bottom: 20 }}>
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 0.5 }}>
          <Zap size={32} color="#facc15" fill="#facc15" />
        </motion.div>
      </div>
    </div>
  );

  return (
    <>
      <SEO
        title={isEn ? "Serverless (FaaS) Architecture | ArchAcademy" : "Sunucusuz (Serverless) Mimari | ArchAcademy"}
        description={isEn 
          ? "Master Serverless Functions-as-a-Service (FaaS), autoscaling, zero-ops infrastructure, and cold start management." 
          : "Sunucusuz (Serverless / FaaS) mimari, AWS Lambda, anlık otomatik ölçeklenme ve maliyet avantajları rehberi."
        }
        keywords="serverless architecture, faas, aws lambda, cold start, auto scaling, cloud native, pay per use"
        canonicalUrl="/serverless"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
        <ArchHero 
          title="Serverless"
          subtitle="Functions as a Service"
          description={isEn 
            ? "Eliminate server management. Deploy stateless function handlers executed purely on demand. Pay strictly per millisecond of compute. Zero traffic equals $0.00 billing." 
            : "Sunucu yönetimi yok. Kodunuzu yükleyin, sadece çalıştığı süre (milisaniye) kadar ödeyin. Trafik 0 ise fatura $0."
          }
          badge="Event-Driven"
          color="#a855f7"
          illustration={heroIllustration}
          features={[
            { 
              icon: <DollarSign />, 
              title: isEn ? 'Pay-Per-Use' : 'Kullandığın Kadar Öde', 
              desc: isEn ? 'Strict sub-second execution billing without idle server waste.' : 'Sadece kodunuz çalıştığı milisaniyeler için ödeme yapın.' 
            },
            { 
              icon: <Activity />, 
              title: isEn ? 'Automatic Scaling' : 'Otomatik Yatay Ölçeklenme', 
              desc: isEn ? 'Scales transparently from 0 to 100k requests/sec without provisioned capacity.' : 'İstek sayısı sıfırdan milyonlara çıksa da bulut bunu otomatik yönetir.' 
            },
            { 
              icon: <Clock />, 
              title: isEn ? 'Zero Infrastructure Ops' : 'Sıfır Sunucu Bakımı (Zero Ops)', 
              desc: isEn ? 'No OS maintenance, vulnerability patching, or cluster provisioning.' : 'İşletim sistemi, güvenlik yamaları veya sunucu bakımıyla uğraşmayın.' 
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
              { id: 'comparison', label: isEn ? 'Serverless vs Traditional' : 'Serverless vs Traditional', icon: <Server size={18} /> },
              { id: 'simulation', label: isEn ? 'Scaling & Cold Start Sim' : 'Ölçeklenme Simülatörü', icon: <Gauge size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '18px',
                  border: 'none',
                  background: activeTab === tab.id ? '#a855f7' : 'transparent',
                  color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(168, 85, 247, 0.3)' : 'none'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </ArchHero>

        <div className="container" style={{ marginTop: '2rem' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'comparison' && <ServerlessComparisonTab key="comparison" />}
            {activeTab === 'simulation' && (
              <ServerlessSimulationTab 
                key="simulation"
                instances={instances}
                coldStarts={coldStarts}
                cost={cost}
                onTriggerRequest={triggerRequest}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Cloud Native Standards Reference */}
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
                  {isEn ? "Cloud Native Standards" : "Cloud Native Tanımları"}
                </div>
                <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  {isEn 
                    ? "Serverless paradigms and FaaS landscape specifications are governed by the Cloud Native Computing Foundation (CNCF)." 
                    : "Serverless teknolojilerinin endüstri standartları ve tanımları Cloud Native Computing Foundation (CNCF) tarafından belirlenmiştir."
                  }
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                   <a 
                     href="https://github.com/cncf/wg-serverless/tree/master/whitepapers/serverless-overview" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     style={{ 
                       display: 'flex', alignItems: 'center', gap: '8px', 
                       background: 'rgba(168, 85, 247, 0.15)', color: '#d8b4fe', 
                       padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                       border: '1px solid rgba(168, 85, 247, 0.2)', transition: 'all 0.2s'
                     }}
                   >
                      CNCF Serverless Whitepaper <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                   </a>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default ServerlessPage;
