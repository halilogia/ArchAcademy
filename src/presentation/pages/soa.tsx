import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Layers, Share2, Settings, Box, Database, Server, ArrowRightLeft, ShieldCheck, Globe, Activity, Workflow } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { SOAComparisonTab } from '../components/soa/SOAComparisonTab';
import { SOASimulationTab } from '../components/soa/SOASimulationTab';
import { useESBSimulation } from '../components/soa/useESBSimulation';

const SOAPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'simulation' | 'comparison'>('comparison');
  const scrollToSection = (id: 'simulation' | 'comparison') => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

    
  const simulation = useESBSimulation(isEn);

  const heroIllustration = (
    <div style={{ position: 'relative', width: '380px', height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* Enterprise Service Bus (The Core) */}
      <motion.div
        animate={{ 
          boxShadow: simulation.busActive 
            ? ['0 0 30px #a855f7', '0 0 60px #a855f7', '0 0 30px #a855f7'] 
            : '0 0 20px rgba(168, 85, 247, 0.2)' 
        }}
        transition={{ duration: 1, repeat: simulation.busActive ? Infinity : 0 }}
        style={{ width: '320px', height: '80px', background: 'var(--glass)', border: '2px solid #a855f7', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 25px', zIndex: 10, backdropFilter: 'blur(10px)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Workflow size={28} color="#a855f7" />
          <div>
            <div style={{ fontWeight: 900, fontSize: '0.9rem', color: '#fff' }}>Enterprise Service Bus</div>
            <div style={{ fontSize: '0.65rem', color: '#a855f7' }}>Smart Hub / Protocol Mediator</div>
          </div>
        </div>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: simulation.busActive ? '#22c55e' : '#64748b', boxShadow: simulation.busActive ? '0 0 10px #22c55e' : 'none' }} />
      </motion.div>

      {/* Connected Heterogeneous Systems */}
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '40px' }}>
        <div style={{ textAlign: 'center' }}>
          <motion.div 
            animate={{ scale: simulation.modernWeb === 'processing' ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 0.5, repeat: simulation.modernWeb === 'processing' ? Infinity : 0 }}
            style={{ width: '70px', height: '65px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid #3b82f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}
          >
            <Globe size={24} color="#3b82f6" />
          </motion.div>
          <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Web (JSON)</span>
        </div>

        <div style={{ textAlign: 'center' }}>
          <motion.div 
            animate={{ scale: simulation.legacyCRM === 'processing' ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 0.5, repeat: simulation.legacyCRM === 'processing' ? Infinity : 0 }}
            style={{ width: '70px', height: '65px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid #f59e0b', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}
          >
            <Database size={24} color="#f59e0b" />
          </motion.div>
          <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>CRM (SOAP)</span>
        </div>

        <div style={{ textAlign: 'center' }}>
          <motion.div 
            animate={{ scale: simulation.sapSystem === 'processing' ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 0.5, repeat: simulation.sapSystem === 'processing' ? Infinity : 0 }}
            style={{ width: '70px', height: '65px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}
          >
            <Server size={24} color="#10b981" />
          </motion.div>
          <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>SAP ERP</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <SEO
        title={isEn ? "SOA - Service Oriented Architecture & ESB | ArchAcademy" : "SOA - Servis Odaklı Mimari ve ESB | ArchAcademy"}
        description={isEn 
          ? "Master Service-Oriented Architecture (SOA), Enterprise Service Bus (ESB), protocol transformation, and enterprise integration." 
          : "Servis Odaklı Mimari (SOA), Kurumsal Veri Yolu (ESB), XML/SOAP/JSON dönüşümleri ve kurumsal entegrasyon rehberi."
        }
        keywords="soa, service-oriented architecture, esb, enterprise service bus, wsdl, soap, xml, enterprise integration"
        canonicalUrl="/soa"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
        <ArchHero 
          title="SOA"
          subtitle={isEn ? "Service-Oriented Architecture" : "Servis Odaklı Mimari"}
          description={isEn 
            ? "Enterprise integration paradigm orchestrated through an intelligent Enterprise Service Bus (ESB) enabling heterogeneous systems to communicate." 
            : "Kurumsal yazılımların atası. Farklı teknolojilerle yazılmış (Java, COBOL, SAP, .NET) devasa sistemlerin merkezi bir Veri Yolu (ESB) üzerinden haberleştiği mimari."
          }
          badge="Enterprise Integration"
          color="#a855f7"
          illustration={heroIllustration}
          features={[
            { icon: <Workflow />, title: 'Smart ESB', desc: isEn ? 'Central bus mediates message routing, protocol translation, and aggregation.' : 'Mesaj dönüştürme (XML <-> JSON), yönlendirme ve güvenlik merkezi ESB\'de çözülür.' },
            { icon: <Globe />, title: 'Loose Coupling', desc: isEn ? 'Services are decoupled through strict formal contracts (WSDL / SOAP).' : 'Sistemler birbirini doğrudan tanımaz; sadece ESB sözleşmelerine güvenir.' },
            { icon: <Layers />, title: 'Reusability', desc: isEn ? 'Enterprise services like Payment or Auth are defined once and reused everywhere.' : 'Bir kere yazılan Kurumsal Servis (örn: Fatura Kesme) tüm şirket departmanlarınca paylaşılır.' }
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
              { id: 'comparison', label: isEn ? 'Blueprint & Microservices Comparison' : 'Mimari Analiz & Karşılaştırma', icon: <Server size={18} /> },
              { id: 'simulation', label: isEn ? 'Live ESB Bus Simulator' : 'ESB Veri Yolu Simülasyonu', icon: <Workflow size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id as any)}
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
          <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
          <div id="comparison" style={{ scrollMarginTop: "100px" }}>
            <SOAComparisonTab />
          </div>
        </div>
        </div>
      </motion.div>
    </>
  );
};

export default SOAPage;
