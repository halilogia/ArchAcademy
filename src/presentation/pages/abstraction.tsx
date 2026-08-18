import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Layers, Box, GitPullRequest, CreditCard, Banknote, Bitcoin, ShoppingCart } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { AbstractionConceptTab } from '../components/abstraction/AbstractionConceptTab';
import { AbstractionPaymentSimulationTab } from '../components/abstraction/AbstractionPaymentSimulationTab';

const AbstractionPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'concept' | 'simulation'>('concept');

  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
       {/* High Level Interface */}
       <motion.div 
         animate={{ y: [0, -5, 0] }}
         transition={{ duration: 3, repeat: Infinity }}
         style={{ width: '200px', padding: '15px', background: '#a855f7', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 10px 30px rgba(168, 85, 247, 0.4)', zIndex: 10 }}
       >
           <Box color="white" size={24} />
           <span style={{ color: 'white', fontWeight: 800 }}>IPaymentService</span>
       </motion.div>
       
       {/* Separator / API Boundary */}
       <div style={{ width: '2px', height: '60px', background: 'rgba(255,255,255,0.2)', margin: '10px 0' }} />
       
       {/* Low Level Implementations */}
       <div style={{ display: 'flex', gap: '20px' }}>
           {[
               { icon: <CreditCard size={18} />, color: '#3b82f6', label: 'Stripe' },
               { icon: <Banknote size={18} />, color: '#eab308', label: 'PayPal' },
               { icon: <Bitcoin size={18} />, color: '#f97316', label: 'Crypto' }
           ].map((item, i) => (
               <motion.div
                key={i}
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                style={{ width: '70px', height: '70px', background: 'var(--glass)', border: `1px solid ${item.color}`, borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
               >
                   <div style={{ color: item.color, marginBottom: '5px' }}>{item.icon}</div>
                   <div style={{ fontSize: '0.6rem', color: '#cbd5e1' }}>{item.label}</div>
               </motion.div>
           ))}
       </div>
    </div>
  );

  return (
    <>
      <SEO
        title={isEn ? "Software Abstraction & Decoupling | ArchAcademy" : "Yazılımda Soyutlama ve Katmanlaşma | ArchAcademy"}
        description={isEn 
          ? "Master the art of managing complexity through clean software abstraction, Interface Segregation, and runtime decoupling." 
          : "Yazılımda soyutlama, arayüz ayrımı ve katmanlar arası bağımlılıkları yönetme sanatı rehberi."
        }
        keywords="abstraction, interface segregation, decoupling, black box theory, payment gateway adapter"
        canonicalUrl="/abstraction"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}
      >
        <ArchHero 
          title={isEn ? "Abstraction" : "Soyutlama"}
          subtitle={isEn ? "in Architecture" : "ve Katmanlaşma"}
          description={isEn 
            ? "The art of mastering complexity. Hide low-level database, hardware, and external API details behind clean polymorphic interface contracts." 
            : "'Karmaşıklığı yönetme sanatıdır.' Alt seviye detayları (Veritabanı, API, Donanım) gizleyerek, üst seviyede temiz ve anlaşılır bir iş mantığı kurmanızı sağlar."
          }
          badge="Interface Segregation"
          color="#a855f7"
          illustration={illu}
          features={[
            { icon: <Layers />, title: isEn ? 'Layering' : 'Katmanlaşma', desc: isEn ? 'Partition concerns. UI should never directly know raw SQL or network sockets.' : 'Uygulamayı katmanlara bölün. UI katmanı, SQL sorgusunu bilmemeli.' },
            { icon: <GitPullRequest />, title: isEn ? 'Decoupling' : 'Bağımsızlık', desc: isEn ? 'Components depend purely on abstractions (Interfaces), never on concrete classes.' : 'Bileşenler birbirine değil, arayüzlere (Interface) bağımlı olmalıdır.' },
            { icon: <Box />, title: isEn ? 'Pluggability' : 'Değiştirilebilirlik', desc: isEn ? 'Swapping storage engines or payment providers doesn\'t break core business logic.' : 'Soyutlama sayesinde veritabanını değiştirmek kodunuzu bozmaz.' }
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
            backdropFilter: 'blur(10px)',
            flexWrap: 'wrap'
          }}>
            {[
              { id: 'concept', label: isEn ? 'Layers Concept' : 'Soyutlama Teorisi', icon: <Layers size={18} /> },
              { id: 'simulation', label: isEn ? 'Payment Demo' : 'Ödeme Simülasyonu', icon: <ShoppingCart size={18} /> }
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
            {activeTab === 'concept' && <AbstractionConceptTab key="concept" />}
            {activeTab === 'simulation' && <AbstractionPaymentSimulationTab key="simulation" />}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
};

export default AbstractionPage;
