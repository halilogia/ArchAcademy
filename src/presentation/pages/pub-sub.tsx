import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Radio, Zap, Target, Share2, MessageSquare } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { PubSubComparisonTab } from '../components/pubsub/PubSubComparisonTab';
import { PubSubSimulationTab, Topic } from '../components/pubsub/PubSubSimulationTab';

const PubSubPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'simulation' | 'comparison'>('comparison');

  const heroIllustration = (
    <div style={{ position: 'relative', width: '380px', height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* Broker Hub */}
      <motion.div
        style={{ 
          width: '100px', 
          height: '100px', 
          borderRadius: '50%', 
          background: 'var(--glass)', 
          border: '4px solid #f97316', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          zIndex: 10,
          boxShadow: '0 0 20px rgba(249, 115, 22, 0.2)'
        }}
      >
        <Radio size={40} color="#f97316" />
        <span style={{ fontSize: '0.6rem', fontWeight: 900, marginTop: '5px' }}>BROKER</span>
      </motion.div>

      {/* Topics Orbit */}
      <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
        {[0, 1, 2].map((i) => {
          const angle = (i * 120 * Math.PI) / 180;
          const x = 50 + 40 * Math.cos(angle);
          const y = 50 + 40 * Math.sin(angle);
          return (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div style={{ width: '40px', height: '40px', background: '#334155', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Target size={20} color={i === 0 ? '#10b981' : i === 1 ? '#3b82f6' : '#ec4899'} />
              </div>
              <span style={{ fontSize: '0.7rem', marginTop: '5px', opacity: 0.7 }}>Topic {i+1}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <SEO
        title={isEn ? "Publish-Subscribe (Pub/Sub) Messaging Pattern | ArchAcademy" : "Publish-Subscribe (Pub/Sub) Mesajlaşma Deseni | ArchAcademy"}
        description={isEn 
          ? "Master Publisher-Subscriber architecture, topic-based broadcasting, message brokers, and decoupled event distribution." 
          : "Publish-Subscribe (Pub/Sub) mimarisi, konu bazlı mesaj yayınlama, event broker ve gevşek bağlı sistemler."
        }
        keywords="pub sub, publish subscribe, event distribution, message broker, topic isolation, broadcasting"
        canonicalUrl="/pub-sub"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
        <ArchHero 
          title="Pub/Sub"
          subtitle="Messaging Pattern"
          description={isEn 
            ? "Publishers do not know who listens; subscribers do not know who sends. Complete architectural decoupling facilitated by a central Topic Broker." 
            : "Yayıncılar (Publishers) kimin dinlediğini bilmez, Dinleyiciler (Subscribers) kimin gönderdiğini bilmez. Aradaki 'Broker' sayesinde tam bağımsız iletişim."
          }
          badge="Event Distribution"
          color="#f97316"
          illustration={heroIllustration}
          features={[
            { 
              icon: <Radio />, 
              title: isEn ? 'Broadcasting' : 'Geniş Yayın (Broadcasting)', 
              desc: isEn ? 'Deliver a single domain event concurrently to thousands of independent listeners.' : 'Tek bir olayı aynı anda binlerce dinleyiciye ulaştırın.' 
            },
            { 
              icon: <Target />, 
              title: isEn ? 'Topic Isolation' : 'Kanal İzolasyonu (Topic)', 
              desc: isEn ? 'Subscribers receive messages filtered exclusively by their active topics.' : 'Alıcılar sadece ilgilendikleri konu başlıklarına (topics) abone olurlar.' 
            },
            { 
              icon: <Zap />, 
              title: isEn ? 'Decoupling' : 'Gevşek Bağlılık (Decoupling)', 
              desc: isEn ? 'Producers and consumers scale, deploy, and evolve in complete isolation.' : 'Sistemin parçaları birbirinden tamamen habersizdir, sadece mesajlaşırlar.' 
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
              { id: 'comparison', label: isEn ? 'Point-to-Point vs Pub/Sub' : 'Point-to-Point vs Pub/Sub', icon: <Share2 size={18} /> },
              { id: 'simulation', label: isEn ? 'Message Broker Demo' : 'Mesaj Yayınlama Simülasyonu', icon: <MessageSquare size={18} /> }
            ].map((tab) => (
               <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '18px',
                  border: 'none',
                  background: activeTab === tab.id ? '#f97316' : 'transparent',
                  color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(249, 115, 22, 0.3)' : 'none'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </ArchHero>

        <div className="container" style={{ marginTop: '2rem' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'comparison' && <PubSubComparisonTab key="comparison" />}
            {activeTab === 'simulation' && <PubSubSimulationTab key="simulation" />}
          </AnimatePresence>
        </div>

        {/* Technical Deep Dive Section */}
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
                  {isEn ? "Cloud Architecture Reference" : "Teknik Derin Bakış"}
                </div>
                <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  {isEn 
                    ? "Explore real-world enterprise Pub/Sub implementations with Google Cloud Pub/Sub, AWS SNS/SQS, and Apache Kafka." 
                    : "Publish-Subscribe modelinin (Pub/Sub) modern bulut mimarilerindeki yeri ve kullanım senaryoları hakkında teknik detaylara ulaşın."
                  }
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                   <a 
                     href="https://aws.amazon.com/pub-sub-messaging/" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     style={{ 
                       display: 'flex', alignItems: 'center', gap: '8px', 
                       background: 'rgba(249, 115, 22, 0.15)', color: '#fdba74', 
                       padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                       border: '1px solid rgba(249, 115, 22, 0.2)', transition: 'all 0.2s'
                     }}
                   >
                      What is Pub/Sub Messaging? (AWS) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                   </a>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default PubSubPage;
