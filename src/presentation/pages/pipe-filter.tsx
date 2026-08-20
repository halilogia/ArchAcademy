import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Filter, Activity, GitCommit, Binary, Play } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { PipeFilterConceptTab } from '../components/pipefilter/PipeFilterConceptTab';
import { PipeFilterSimulationTab, DataPacket } from '../components/pipefilter/PipeFilterSimulationTab';

const PipeFilterPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'simulation' | 'concept'>('concept');
  const scrollToSection = (id: 'simulation' | 'concept') => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const [pipelineActive, setPipelineActive] = useState(false);
  const [processedPackets, setProcessedPackets] = useState<DataPacket[]>([]);

  const runPipeline = () => {
    if (pipelineActive) return;
    setPipelineActive(true);
    setProcessedPackets([]);

    const text = "hello world";
    const steps = [
      { content: text, stage: 'raw' as const },
      { content: text.toUpperCase(), stage: 'parsed' as const },
      { content: text.toUpperCase() + " [VALID]", stage: 'validated' as const },
      { content: btoa(text.toUpperCase() + " [VALID]").substring(0, 10) + "...", stage: 'encrypted' as const }
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        setProcessedPackets(prev => [...prev, { id: index, ...step }]);
        if (index === steps.length - 1) setPipelineActive(false);
      }, (index + 1) * 1200);
    });
  };

  const heroIllustration = (
    <div style={{ position: 'relative', width: '350px', height: '300px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* The Main Pipe */}
      <div style={{ position: 'absolute', left: '50px', top: '50px', bottom: '50px', width: '10px', background: '#334155', borderRadius: '5px' }} />

      {/* Filters Attached to Pipe */}
      {[0, 1, 2].map(i => (
        <div key={i} style={{ 
          position: 'absolute', 
          top: 80 + (i * 70), 
          left: 30, 
          display: 'flex', 
          alignItems: 'center', 
          gap: '15px' 
        }}>
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: pipelineActive ? [1, 1.1, 1] : 1 }}
            transition={{ delay: i * 1.2, duration: 0.5 }}
            style={{ 
              width: '50px', height: '50px', 
              background: i === 0 ? '#ec4899' : (i === 1 ? '#d946ef' : '#a855f7'), 
              borderRadius: '12px', 
              border: '2px solid rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 10,
              boxShadow: '0 0 20px rgba(0,0,0,0.5)'
            }}
          >
            <Filter color="white" size={20} />
          </motion.div>
          
          <div style={{ 
            background: 'rgba(255,255,255,0.05)', 
            padding: '5px 10px', 
            borderRadius: '6px', 
            fontSize: '0.7rem', 
            color: '#cbd5e1',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            {i === 0 ? 'ToUpperCase()' : (i === 1 ? 'CheckFormat()' : 'Encrypt()')}
          </div>
        </div>
      ))}

      {/* Moving Data Drops */}
      {pipelineActive && (
        <motion.div 
          animate={{ top: [50, 260], opacity: [1, 0] }}
          transition={{ duration: 4, ease: 'linear' }}
          style={{ position: 'absolute', left: '48px', width: '14px', height: '14px', background: '#fff', borderRadius: '50%', zIndex: 20 }}
        />
      )}
    </div>
  );

  return (
    <>
      <SEO
        title={isEn ? "Pipes & Filters Architecture Pattern | ArchAcademy" : "Boru ve Filtre (Pipe & Filter) Mimarisi | ArchAcademy"}
        description={isEn 
          ? "Master Pipes and Filters architecture, streaming data transformation, parallel pipelines, and Unix composability." 
          : "Boru ve Filtre (Pipe & Filter) mimarisi, veri akış dönüşümü, paralel pipeline işleme ve Unix felsefesi rehberi."
        }
        keywords="pipes and filters architecture, enterprise integration patterns, gregor hohpe, data streams, unix pipes"
        canonicalUrl="/pipe-filter"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
        <ArchHero 
          title="Pipe & Filter"
          subtitle="Architecture"
          description={isEn 
            ? "Unix philosophy incarnate: 'Do one thing, and do it exceptionally well'. Stream raw payloads through isolated, composable transformation filters that pass outputs to downstream pipes." 
            : "Unix'in felsefesi: 'Bir şeyi yap, ama onu çok iyi yap'. Veriyi alın, küçük ve bağımsız filtrelerden geçirin, dönüştürün ve bir sonrakine iletin."
          }
          badge="Streaming Logic"
          color="#ec4899"
          illustration={heroIllustration}
          features={[
            { 
              icon: <Filter />, 
              title: isEn ? 'Decoupling' : 'Tam Bağımsızlık (Decoupled)', 
              desc: isEn ? 'Filters operate in complete isolation as long as input/output interfaces match.' : 'Filtreler birbirinden habersizdir. Çıktı formatı, bir sonrakinin girdisi olduğu sürece sorun yok.' 
            },
            { 
              icon: <GitCommit />, 
              title: isEn ? 'Reusability' : 'Yüksek Yeniden Kullanılabilirlik', 
              desc: isEn ? 'The same filter component can be plugged into 10 different production pipelines unchanged.' : 'Aynı filtreyi 10 farklı projede, hiç değiştirmeden kullanabilirsiniz.' 
            },
            { 
              icon: <Activity />, 
              title: isEn ? 'Parallel Streaming' : 'Paralel Akış & Pipeline', 
              desc: isEn ? 'Filters can run concurrently across distributed cluster nodes.' : 'Filtreler farklı makinelerde çalışabilir, veri borulardan (pipes) akar.' 
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
              { id: 'concept', label: isEn ? 'Logic & Concepts' : 'Kavramlar', icon: <Binary size={18} /> },
              { id: 'simulation', label: isEn ? 'Live Pipeline Demo' : 'Filtre Simülasyonu', icon: <Play size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id as any)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '18px',
                  border: 'none',
                  background: activeTab === tab.id ? '#ec4899' : 'transparent',
                  color: activeTab === tab.id ? 'black' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(236, 72, 153, 0.3)' : 'none'
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
            <PipeFilterConceptTab />
          </div>
        </div>
        </div>

        {/* Enterprise Integration Patterns Reference */}
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
                  {isEn ? "Enterprise Integration Standard" : "Kurumsal Entegrasyon Deseni"}
                </div>
                <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  {isEn 
                    ? "Pipes and Filters is foundational in Enterprise Integration Patterns (Gregor Hohpe) for streaming ETL and event processing." 
                    : "Pipe and Filter mimarisi, Enterprise Integration Patterns (Gregor Hohpe) kitabında detaylıca işlenen temel bir entegrasyon modelidir."
                  }
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap',
            position: 'sticky',
            top: '80px',
            zIndex: 30 }}>
                   <a 
                     href="https://www.enterpriseintegrationpatterns.com/patterns/messaging/PipesAndFilters.html" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     style={{ 
                       display: 'flex', alignItems: 'center', gap: '8px', 
                       background: 'rgba(236, 72, 153, 0.15)', color: '#fbcfe8', 
                       padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                       border: '1px solid rgba(236, 72, 153, 0.2)', transition: 'all 0.2s'
                     }}
                   >
                      EIP: Pipes and Filters (Gregor Hohpe) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                   </a>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default PipeFilterPage;
