import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Code2, Terminal, Cpu, ArrowRight, BookOpen, Play, Layers } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { InterpreterConceptTab } from '../components/interpreter/InterpreterConceptTab';
import { InterpreterSimulationTab } from '../components/interpreter/InterpreterSimulationTab';

const InterpreterPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'concept' | 'simulation'>('concept');
  const scrollToSection = (id: 'concept' | 'simulation') => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };


  const heroIllustration = (
    <div style={{ 
      background: 'rgba(15, 23, 42, 0.6)', 
      padding: '2.5rem', 
      borderRadius: '32px', 
      border: '1px solid rgba(219, 39, 119, 0.3)',
      boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 20px rgba(219, 39, 119, 0.1)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Glow */}
      <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(219, 39, 119, 0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
        {/* Step 1: High Level */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#db2777', marginBottom: '0.75rem' }}>
            <Code2 size={32} />
          </div>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'white', textTransform: 'uppercase' }}>DSL Code</div>
        </motion.div>

        <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ArrowRight color="#db2777" opacity={0.5} />
        </motion.div>

        {/* Step 2: Interpreter Core */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{ 
            width: '120px', 
            height: '100px', 
            borderRadius: '24px', 
            background: 'linear-gradient(135deg, #db2777 0%, #9d174d 100%)', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: 'white', 
            marginBottom: '0.75rem',
            boxShadow: '0 10px 30px rgba(219, 39, 119, 0.4)'
          }}>
            <Terminal size={32} style={{ marginBottom: '4px' }} />
            <span style={{ fontSize: '0.7rem', fontWeight: 900 }}>INTERPRETER</span>
          </div>
          <div style={{ fontSize: '0.6rem', color: '#f472b6', fontWeight: 700 }}>Parse & Execute</div>
        </motion.div>

        <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}>
          <ArrowRight color="#db2777" opacity={0.5} />
        </motion.div>

        {/* Step 3: Action */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ textAlign: 'center' }}
        >
          <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#db2777', marginBottom: '0.75rem' }}>
            <Cpu size={32} />
          </div>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'white', textTransform: 'uppercase' }}>Result</div>
        </motion.div>
      </div>

      {/* Code Stream Animation */}
      <div style={{ marginTop: '2rem', fontFamily: 'monospace', fontSize: '0.7rem', color: '#f472b6', opacity: 0.6, width: '100%', textAlign: 'center' }}>
        <motion.div
           animate={{ opacity: [0.3, 1, 0.3] }}
           transition={{ duration: 2, repeat: Infinity }}
        >
           Execution: Line by Line...
        </motion.div>
      </div>
    </div>
  );

  return (
    <>
      <SEO
        title={isEn ? "Interpreter Architecture & Custom DSL Engines | ArchAcademy" : "Interpreter Deseni ve Kural Motorları | ArchAcademy"}
        description={isEn 
          ? "Master Interpreter Pattern architectures, Domain-Specific Languages (DSL), Abstract Syntax Trees (AST), and dynamic rule engines." 
          : "Interpreter mimari deseni, Özel Alan Dilleri (DSL), Soyut Sözdizimi Ağacı (AST) ve dinamik iş kuralı motorları."
        }
        keywords="interpreter pattern, dsl, domain specific language, ast, abstract syntax tree, rule engine"
        canonicalUrl="/interpreter"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
        <ArchHero 
          title="Interpreter"
          subtitle="Architecture"
          description={isEn 
            ? "A dynamic execution architecture where human-readable syntax is parsed and evaluated line-by-line without compiling. Powering custom Rule Engines, SQL evaluators, and calculation workflows." 
            : "Kodun derlenmesine (Compile) gerek kalmadan, satır satır okunup çalıştırıldığı esnek mimari. Kural motorları (Rule Engines) ve SQL motorları bu prensiple çalışır."
          }
          badge="Logic Engine"
          color="#db2777"
          illustration={heroIllustration}
          features={[
            { 
              icon: <Terminal />, 
              title: isEn ? 'Dynamic Behavior' : 'Dinamik Davranış (Dynamic)', 
              desc: isEn ? 'Mutate business rules live in production without redeploying binaries.' : 'Uygulamayı durdurmadan iş mantığını (Business Logic) değiştirin.' 
            },
            { 
              icon: <Code2 />, 
              title: isEn ? 'Custom DSL' : 'Özel Dil (Custom DSL)', 
              desc: isEn ? 'Tailor expressive domain-specific languages designed specifically for business users.' : 'Sadece sizin işinize özel, basitleştirilmiş bir dil (DSL) yaratabilirsiniz.' 
            },
            { 
              icon: <Layers />, 
              title: isEn ? 'Sandboxing' : 'Güvenli İzolasyon (Sandboxing)', 
              desc: isEn ? 'Execute untrusted user-submitted logic within controlled security boundaries.' : 'Kullanıcının yazdığı kodu güvenli bir ortamda çalıştırabilirsiniz.' 
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
              { id: 'concept', label: isEn ? 'Concept & Real World' : 'Konsept ve Örnekler', icon: <BookOpen size={18} /> },
              { id: 'simulation', label: isEn ? 'Run DSL Engine' : 'DSL Kod Çalıştır', icon: <Play size={18} /> }
            ].map((tab) => (
               <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id as any)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '18px',
                  border: 'none',
                  background: activeTab === tab.id ? '#db2777' : 'transparent',
                  color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(219, 39, 119, 0.3)' : 'none'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </ArchHero>

        <div className="container" style={{ marginTop: '2rem' }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
          <div id="concept" style={{ scrollMarginTop: "100px" }}>
            <InterpreterConceptTab />
          </div>
          <div id="simulation" style={{ scrollMarginTop: "100px" }}>
            <InterpreterSimulationTab />
          </div>
        </div>
        </div>

        {/* Design Patterns Reference */}
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
                  {isEn ? "Design Patterns Reference" : "Tasarım Desenleri Referansı"}
                </div>
                <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  {isEn 
                    ? "Deep dive into the classical GoF Interpreter Pattern, grammar representations, and Abstract Syntax Trees (AST)." 
                    : "Interpreter Pattern'ın nesne yönelimli dünyadaki yeri, AST (Abstract Syntax Tree) yapısı ve kullanım durumları üzerine derinlemesine bilgi edinin."
                  }
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap',
            position: 'sticky',
            top: '80px',
            zIndex: 30 }}>
                   <a 
                     href="https://refactoring.guru/design-patterns/interpreter" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     style={{ 
                       display: 'flex', alignItems: 'center', gap: '8px', 
                       background: 'rgba(219, 39, 119, 0.15)', color: '#f472b6', 
                       padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                       border: '1px solid rgba(219, 39, 119, 0.2)', transition: 'all 0.2s'
                     }}
                   >
                      Interpreter Pattern Guide (Refactoring.Guru) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                   </a>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default InterpreterPage;
