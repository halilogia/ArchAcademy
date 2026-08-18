import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Smartphone, Monitor, Server, Shuffle, Split, Layers, Database } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { BFFComparisonTab } from '../components/bff/BFFComparisonTab';
import { BFFSimulationTab } from '../components/bff/BFFSimulationTab';

const BFFPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'simulation' | 'comparison'>('comparison');

  const heroIllustration = (
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

      {/* BFF Connectors */}
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

      {/* Downstream Line */}
      <div style={{ width: '80%', height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '20px' }}></div>

      <div style={{ display: 'flex', gap: '10px' }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ width: '60px', height: '40px', background: '#334155', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Server size={16} color="#94a3b8" />
          </div>
        ))}
      </div>
      <div style={{ marginTop: '10px', fontSize: '0.7rem', color: '#64748b' }}>Downstream Microservices</div>

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
    <>
      <SEO
        title={isEn ? "Backend for Frontend (BFF) Architectural Pattern | ArchAcademy" : "Backend for Frontend (BFF) Mimari Deseni | ArchAcademy"}
        description={isEn 
          ? "Master the Backend for Frontend (BFF) pattern, response shaping, mobile-web isolation, and microservices aggregation." 
          : "Backend for Frontend (BFF) mimari deseni, yanıt şekillendirme, mobil-web API ayrıştırması ve mikroservis agregasyonu."
        }
        keywords="backend for frontend, bff pattern, sam newman, api composition, response shaping, microservices"
        canonicalUrl="/bff"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
        <ArchHero 
          title="Backend for Frontend"
          subtitle="Pattern"
          description={isEn 
            ? "One size does not fit all. Mobile phones, web browsers, and wearables have vastly different bandwidth and display needs. Build specialized server layers dedicated to each client interface." 
            : "Tek beden herkese uymaz. Mobil cihazın, web tarayıcısının ve akıllı saatin ihtiyaçları farklıdır. Her arayüz (Frontend) için ona özel hazırlanmış bir sunucu katmanı (BFF) oluşturun."
          }
          badge="API Composition"
          color="#3b82f6"
          illustration={heroIllustration}
          features={[
            { 
              icon: <Smartphone />, 
              title: isEn ? 'Optimized Payloads' : 'Optimize Veri (Payload)', 
              desc: isEn ? 'Trim redundant fields on cellular networks, delivering only what the viewport renders.' : 'Mobil için gereksiz verileri kırpın, sadece ekranın ihtiyacı olanı gönderin.' 
            },
            { 
              icon: <Shuffle />, 
              title: isEn ? 'Aggregation' : 'Birleştirme (Aggregation)', 
              desc: isEn ? 'Frontend fires 1 request; the BFF orchestrates 10 downstream microservices concurrently.' : 'Frontend tek bir istek atar, BFF arkadaki 10 servisle konuşup sonucu birleştirir.' 
            },
            { 
              icon: <Split />, 
              title: isEn ? 'Decoupling' : 'Yalıtım (Decoupling)', 
              desc: isEn ? 'Downstream schema mutations are absorbed by the BFF without breaking legacy native app releases.' : 'Backend değişse bile, BFF aradaki farkı absorbe eder, Frontend bozulmaz.' 
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
              { id: 'comparison', label: isEn ? 'One-Size-Fits-All vs BFF' : 'General Purpose API vs BFF', icon: <Layers size={18} /> },
              { id: 'simulation', label: isEn ? 'Response Shaper' : 'Yanıt Şekillendirme Demosu', icon: <Database size={18} /> }
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
            {activeTab === 'comparison' && <BFFComparisonTab key="comparison" />}
            {activeTab === 'simulation' && <BFFSimulationTab key="simulation" />}
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
                  {isEn ? "Definitive Resource" : "Temel Kaynak"}
                </div>
                <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  {isEn 
                    ? "The BFF pattern was pioneered and formally detailed by Sam Newman in Building Microservices." 
                    : "BFF kavramı, Sam Newman tarafından 'Building Microservices' kitabında ve makalelerinde detaylandırılmıştır."
                  }
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
    </>
  );
};

export default BFFPage;
