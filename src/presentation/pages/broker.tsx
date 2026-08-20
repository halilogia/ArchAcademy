import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Share2, Zap, ArrowRight, Box, Layers, Inbox, Filter, Server, Mail } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { BrokerComparisonTab } from '../components/broker/BrokerComparisonTab';
import { BrokerSimulationTab } from '../components/broker/BrokerSimulationTab';

const BrokerPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'comparison' | 'simulation'>('comparison');
  const scrollToSection = (id: 'comparison' | 'simulation') => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };


  const heroIllustration = (
    <div style={{ position: 'relative', width: '350px', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Producer Group */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <motion.div whileTap={{ scale: 0.9 }} style={{ padding: '8px', background: 'rgba(234, 179, 8, 0.1)', borderRadius: '8px', border: '1px solid #eab308' }}>
              <Box size={24} color="#eab308" />
          </motion.div>
      </div>

      <ArrowRight style={{ transform: 'rotate(90deg)', margin: '10px 0', opacity: 0.5 }} />

      {/* The Broker (Queue Manager) */}
      <div style={{ 
          width: '280px', 
          height: '100px', 
          background: 'none', 
          border: '2px dashed #eab308', 
          borderRadius: '16px', 
          padding: '10px',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
      }}>
          <div style={{ position: 'absolute', top: 5, left: 10, fontSize: '0.7rem', color: '#eab308', fontWeight: 800 }}>MESSAGE BROKER (Queue)</div>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            {['#ef4444', '#3b82f6', '#10b981'].map((color, idx) => (
              <motion.div
                key={idx}
                animate={{ x: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: idx * 0.3 }}
                style={{ 
                  width: '36px', 
                  height: '36px', 
                  background: color, 
                  borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}
              >
                <Mail size={18} color="white" />
              </motion.div>
            ))}
          </div>
      </div>

      <ArrowRight style={{ transform: 'rotate(90deg)', margin: '10px 0', opacity: 0.5 }} />

      {/* Consumers */}
      <div style={{ display: 'flex', gap: '40px' }}>
          {[
            { id: 1, color: '#ef4444' },
            { id: 2, color: '#3b82f6' },
            { id: 3, color: '#10b981' }
          ].map((c) => (
              <motion.div 
                key={c.id}
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: c.id * 0.4 }}
                style={{ 
                    display: 'flex', flexDirection: 'column', alignItems: 'center'
                }}
              >
                  <Server size={28} color={c.color} />
                  <span style={{ fontSize: '0.6rem', marginTop: '5px', color: '#94a3b8' }}>Worker</span>
              </motion.div>
          ))}
      </div>
    </div>
  );

  return (
    <>
      <SEO
        title={isEn ? "Message Broker Pattern & Queue Architecture | ArchAcademy" : "Broker Mimarisi ve Mesaj Kuyrukları | ArchAcademy"}
        description={isEn 
          ? "Master asynchronous Message Broker architectures: RabbitMQ, Apache Kafka, decoupled publisher-consumer patterns, and backpressure load leveling." 
          : "Asenkron Mesaj Broker mimarileri: RabbitMQ, Apache Kafka, bağımsız yayıncı-tüketici desenleri ve yük dengeleme."
        }
        keywords="broker pattern, message broker, rabbitmq, kafka, async architecture, message queue, backpressure"
        canonicalUrl="/broker"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
        <ArchHero 
          title="Broker Architecture"
          subtitle="Event Bus Pattern"
          description={isEn 
            ? "The nervous system of modern distributed systems. Services publish messages to a central Broker rather than tightly coupling via synchronous calls. Consumers pull and process events asynchronously at their own speed." 
            : "Sistemin sinir ağı. Servisler birbirine bağırmak yerine, mesajlarını bir kutuya (Broker) bırakır. İlgili servis (Consumer) müsait olduğunda o kutudan alır ve işler."
          }
          badge="Asynchronous Messaging"
          color="#eab308"
          illustration={heroIllustration}
          features={[
            { 
              icon: <Inbox />, 
              title: isEn ? 'Load Leveling' : 'Yük Dengeleme (Load Leveling)', 
              desc: isEn ? 'Traffic spikes buffer safely in queues; downstreams never crash under load.' : 'Sistem yoğunlaştığında mesajlar kuyrukta bekler, sunucular çökmez.' 
            },
            { 
              icon: <Share2 />, 
              title: isEn ? 'Decoupling' : 'Gevşek Bağlılık (Decoupling)', 
              desc: isEn ? 'Producers remain completely agnostic of consumer locations, scale, and language.' : 'Üreten servis, tüketen servisin kim olduğunu, nerede olduğunu bilmez.' 
            },
            { 
              icon: <Zap />, 
              title: isEn ? 'Reliability' : 'Güvenilirlik (Reliability)', 
              desc: isEn ? 'Even if workers go offline, messages persist reliably in durable storage.' : 'Alıcı servis kapalı olsa bile mesaj kaybolmaz, kuyrukta bekler.' 
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
              { id: 'comparison', label: isEn ? 'Broker vs Direct' : 'Broker vs Doğrudan Çağrı', icon: <Layers size={18} /> },
              { id: 'simulation', label: isEn ? 'Interactive Queue' : 'İnteraktif Kuyruk Simülasyonu', icon: <Filter size={18} /> }
            ].map((tab) => (
               <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'comparison' | 'simulation')}
                style={{
                  padding: '10px 24px',
                  borderRadius: '18px',
                  border: 'none',
                  background: activeTab === tab.id ? '#eab308' : 'transparent',
                  color: activeTab === tab.id ? 'black' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(234, 179, 8, 0.3)' : 'none'
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
            <BrokerComparisonTab />
          </div>
          <div id="simulation" style={{ scrollMarginTop: "100px" }}>
            <BrokerSimulationTab />
          </div>
        </div>
        </div>

        {/* Origin & Reference Section */}
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
                  {isEn ? "Origin & Definition" : "Köken ve Tanım"}
                </div>
                <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  {isEn 
                    ? "The Broker Pattern was formalized in the seminal 'Pattern-Oriented Software Architecture (POSA Vol 1)' book and serves as the backbone of modern cloud microservices." 
                    : 'Broker Pattern, ilk olarak "Pattern-Oriented Software Architecture (POSA) Vol 1" kitabında tanımlanmıştır. Dağıtık sistemlerin temel taşıdır.'
                  }
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap',
            position: 'sticky',
            top: '80px',
            zIndex: 30 }}>
                   <a 
                     href="https://en.wikipedia.org/wiki/Broker_pattern" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     style={{ 
                       display: 'flex', alignItems: 'center', gap: '8px', 
                       background: 'rgba(234, 179, 8, 0.15)', color: '#fde047', 
                       padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                       border: '1px solid rgba(234, 179, 8, 0.2)', transition: 'all 0.2s'
                     }}
                   >
                      Broker Pattern (Wiki & POSA Ref) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                   </a>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default BrokerPage;
