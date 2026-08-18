import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Box, 
  Layers, 
  Share2, 
  ShieldCheck, 
  Lock, 
  Activity, 
  GitBranch, 
  Copy 
} from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { useProgress } from '../context/ProgressContext';
import { EncapsulationTab } from '../components/oop/EncapsulationTab';
import { AbstractionTab } from '../components/oop/AbstractionTab';
import { InheritanceTab } from '../components/oop/InheritanceTab';
import { PolymorphismTab } from '../components/oop/PolymorphismTab';

const OOPFundamentalsPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const { completeStep } = useProgress();
  const [activeTab, setActiveTab] = useState<'encapsulation' | 'abstraction' | 'inheritance' | 'polymorphism'>('encapsulation');

  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/oop-fundamentals');
    }, 2000);
    return () => clearTimeout(timer);
  }, [completeStep]);

  // Orbit Hero Illustration
  const heroIllustration = (
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
       {/* Orbit Ring */}
       <motion.div 
         animate={{ rotate: 360 }}
         transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
         style={{ width: '260px', height: '260px', border: '2px dashed #f43f5e', borderRadius: '50%', position: 'absolute', opacity: 0.2 }}
       />

       {/* Center Object */}
       <div style={{ width: '100px', height: '100px', background: 'linear-gradient(135deg, #f43f5e, #be123c)', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(244, 63, 94, 0.4)', zIndex: 10, position: 'relative', border: '2px solid rgba(255,255,255,0.2)' }}>
           <Box size={40} color="white" />
           <div style={{ color: 'white', fontWeight: 900, fontSize: '0.8rem', marginTop: '5px' }}>OBJECT</div>
       </div>

       {/* Top: Abstraction */}
       <motion.div animate={{ y: [-10, 0, -10] }} transition={{ duration: 4, repeat: Infinity }} style={{ position: 'absolute', top: 20 }}>
            <div style={{ padding: '8px 16px', background: '#020617', border: '1px solid #f43f5e', borderRadius: '20px', display: 'flex', gap: '8px', alignItems: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.5)', zIndex: 20 }}>
                <Layers size={16} color="#f43f5e" /> <span style={{ fontSize: '0.7rem', color: 'white', fontWeight: 700 }}>Abstraction</span>
            </div>
       </motion.div>

       {/* Bottom: Inheritance */}
       <motion.div animate={{ y: [10, 0, 10] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} style={{ position: 'absolute', bottom: 20 }}>
            <div style={{ padding: '8px 16px', background: '#020617', border: '1px solid #f43f5e', borderRadius: '20px', display: 'flex', gap: '8px', alignItems: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.5)', zIndex: 20 }}>
                <Share2 size={16} color="#f43f5e" /> <span style={{ fontSize: '0.7rem', color: 'white', fontWeight: 700 }}>Inheritance</span>
            </div>
       </motion.div>

       {/* Left: Encapsulation */}
       <motion.div animate={{ x: [-10, 0, -10] }} transition={{ duration: 4, repeat: Infinity, delay: 2 }} style={{ position: 'absolute', left: 0 }}>
            <div style={{ padding: '8px 16px', background: '#020617', border: '1px solid #f43f5e', borderRadius: '20px', display: 'flex', gap: '8px', alignItems: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.5)', zIndex: 20 }}>
                 <ShieldCheck size={16} color="#f43f5e" /> <span style={{ fontSize: '0.7rem', color: 'white', fontWeight: 700 }}>Encapsulation</span>
            </div>
       </motion.div>

       {/* Right: Polymorphism */}
       <motion.div animate={{ x: [10, 0, 10] }} transition={{ duration: 4, repeat: Infinity, delay: 3 }} style={{ position: 'absolute', right: 0 }}>
            <div style={{ padding: '8px 16px', background: '#020617', border: '1px solid #f43f5e', borderRadius: '20px', display: 'flex', gap: '8px', alignItems: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.5)', zIndex: 20 }}>
                <Copy size={16} color="#f43f5e" /> <span style={{ fontSize: '0.7rem', color: 'white', fontWeight: 700 }}>Polymorphism</span>
            </div>
       </motion.div>
    </div>
  );

  return (
    <>
      <SEO
        title={isEn ? "OOP Fundamentals & 4 Core Pillars | ArchAcademy" : "Nesne Yönelimli Programlama (OOP) Temelleri | ArchAcademy"}
        description={isEn 
          ? "Master Object-Oriented Programming (OOP) core pillars: Encapsulation, Abstraction, Inheritance, and Polymorphism with interactive simulators." 
          : "Nesne Yönelimli Programlama (OOP) 4 temel direği: Kapsülleme, Soyutlama, Kalıtım ve Çok Biçimlilik interaktif simülasyonları."
        }
        keywords="oop, object oriented programming, encapsulation, abstraction, inheritance, polymorphism, alan kay"
        canonicalUrl="/oop-fundamentals"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
        <ArchHero 
          title="OOP"
          subtitle="Fundamentals"
          description={isEn 
            ? "Escape spaghetti code. Model software after real-world domain objects for maintainable, secure, and reusable systems." 
            : "Spagetti koddan kurtulun. Yazılımı gerçek dünya nesneleri gibi modelleyerek yönetilebilir, güvenli ve tekrar kullanılabilir hale getirin."
          }
          badge="Core Wisdom"
          color="#f43f5e"
          illustration={heroIllustration}
          features={[
            { 
              icon: <ShieldCheck />, 
              title: isEn ? "Encapsulation" : "Kapsülleme (Encapsulation)", 
              desc: isEn ? "Protect internal state, restrict mutation to explicit public APIs." : "Hassas veriyi koru, dışarıya kontrollü erişim ver." 
            },
            { 
              icon: <Layers />, 
              title: isEn ? "Abstraction" : "Soyutlama (Abstraction)", 
              desc: isEn ? "Hide internal execution complexity behind clean contracts." : "Arka plandaki karmaşıklığı gizle, sadece arayüzü sun." 
            },
            { 
              icon: <Share2 />, 
              title: isEn ? "Inheritance" : "Kalıtım (Inheritance)", 
              desc: isEn ? "Eliminate code duplication by inheriting common attributes." : "Kod tekrarını önle, ortak özellikleri miras al." 
            },
            { 
              icon: <GitBranch />, 
              title: isEn ? "Polymorphism" : "Çok Biçimlilik (Polymorphism)", 
              desc: isEn ? "Enable diverse objects to respond uniquely to a shared command." : "Farklı nesnelerin aynı komuta farklı tepki vermesini sağla." 
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
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '4px',
            backdropFilter: 'blur(10px)'
          }}>
            {[
              { id: 'encapsulation', label: 'Encapsulation', icon: <Lock size={16} /> },
              { id: 'abstraction', label: 'Abstraction', icon: <Layers size={16} /> },
              { id: 'inheritance', label: 'Inheritance', icon: <Share2 size={16} /> },
              { id: 'polymorphism', label: 'Polymorphism', icon: <Activity size={16} /> }
            ].map((tab) => (
               <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'encapsulation' | 'abstraction' | 'inheritance' | 'polymorphism')}
                style={{
                  padding: '8px 20px',
                  borderRadius: '18px',
                  border: 'none',
                  background: activeTab === tab.id ? '#f43f5e' : 'transparent',
                  color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  transition: 'all 0.3s ease',
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </ArchHero>

        <div className="container" style={{ marginTop: '2rem' }}>
          <AnimatePresence mode="wait">
            {activeTab === 'encapsulation' && <EncapsulationTab key="encapsulation" />}
            {activeTab === 'abstraction' && <AbstractionTab key="abstraction" />}
            {activeTab === 'inheritance' && <InheritanceTab key="inheritance" />}
            {activeTab === 'polymorphism' && <PolymorphismTab key="polymorphism" />}
          </AnimatePresence>
        </div>

        {/* Alan Kay Creator Section */}
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
                  {isEn ? "The Creator" : "OOP'nin Yaratıcısı"}
                </div>
                <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  {isEn 
                    ? 'Explore Alan Kay\'s original biological perspective on Object-Oriented Programming and dynamic message passing.' 
                    : '"Object-Oriented Programming" terimini icat eden Alan Kay\'in, biyolojiden esinlenerek geliştirdiği orijinal vizyonunu keşfedin.'
                  }
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                   <a 
                     href="http://userpage.fu-berlin.de/~ram/pub/pub_jf47ht81Ht/doc_kay_oop_en" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     style={{ 
                       display: 'flex', alignItems: 'center', gap: '8px', 
                       background: 'rgba(244, 63, 94, 0.15)', color: '#fda4af', 
                       padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                       border: '1px solid rgba(244, 63, 94, 0.2)', transition: 'all 0.2s'
                     }}
                   >
                      Alan Kay on OOP <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                   </a>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default OOPFundamentalsPage;
