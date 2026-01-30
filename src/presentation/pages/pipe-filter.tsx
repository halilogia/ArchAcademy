import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { 
  Filter, 
  ArrowRight, 
  Activity, 
  GitCommit, 
  Binary, 
  FileText, 
  CheckCircle,
  Play,
  Layers
} from 'lucide-react';

interface DataPacket {
    id: number;
    content: string;
    stage: 'raw' | 'parsed' | 'validated' | 'encrypted';
}

const PipeFilterPage = () => {
    const [activeTab, setActiveTab] = useState<'simulation' | 'concept'>('concept');
    const [pipelineActive, setPipelineActive] = useState(false);
    const [processedPackets, setProcessedPackets] = useState<DataPacket[]>([]);
    
    // Stages of the pipeline
    const stages = [
        { id: 'raw', label: 'Raw Input', color: '#94a3b8', icon: <FileText size={16} /> },
        { id: 'parser', label: 'Filter: UpperCase', color: '#ec4899', icon: <Binary size={16} /> },
        { id: 'validator', label: 'Filter: Validator', color: '#d946ef', icon: <CheckCircle size={16} /> },
        { id: 'encryptor', label: 'Filter: Encrypt', color: '#a855f7', icon: <Layers size={16} /> }
    ];

    const runPipeline = () => {
        if (pipelineActive) return;
        setPipelineActive(true);
        setProcessedPackets([]);

        let text = "hello world";
        const steps = [
             { content: text, stage: 'raw' as const },
             { content: text.toUpperCase(), stage: 'parsed' as const }, // UPPERCASE
             { content: text.toUpperCase() + " [VALID]", stage: 'validated' as const }, // VALIDATE
             { content: btoa(text.toUpperCase() + " [VALID]").substring(0, 10) + "...", stage: 'encrypted' as const } // ENCRYPT (Mock)
        ];

        steps.forEach((step, index) => {
            setTimeout(() => {
                setProcessedPackets(prev => [...prev, { id: index, ...step }]);
                if (index === steps.length - 1) setPipelineActive(false);
            }, (index + 1) * 1200);
        });
    };

    const illu = (
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="Pipe & Filter"
        subtitle="Architecture"
        description="Unix'in felsefesi: 'Bir şeyi yap, ama onu çok iyi yap'. Veriyi alın, küçük ve bağımsız filtrelerden geçirin, dönüştürün ve bir sonrakine iletin."
        badge="Streaming Logic"
        color="#ec4899"
        illustration={illu}
        features={[
          { icon: <Filter />, title: 'Decoupling', desc: 'Filtreler birbirinden habersizdir. Çıktı formatı, bir sonrakinin girdisi olduğu sürece sorun yok.' },
          { icon: <GitCommit />, title: 'Reusability', desc: 'Aynı "LowerCase" filtresini 10 farklı projede, hiç değiştirmeden kullanabilirsiniz.' },
          { icon: <Activity />, title: 'Parallel Processing', desc: 'Filtreler farklı makinelerde çalışabilir, veri borulardan (pipes) akar.' }
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
            { id: 'concept', label: 'Logic', icon: <Binary size={18} /> },
            { id: 'simulation', label: 'Execute Pipe', icon: <Play size={18} /> }
          ].map((tab) => (
             <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
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
          <AnimatePresence mode="wait">
             {activeTab === 'concept' && (
                 <motion.div
                    key="concept"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div className="glass-card" style={{ borderTop: '4px solid #ec4899' }}>
                            <h3 style={{ color: '#ec4899', marginBottom: '1rem' }}>Mutfak Robotu Analojisi</h3>
                            <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
                                Bir fabrikada domatesin ketçaba dönüşmesini düşünün:
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                                <li style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                                    <div style={{ width: '20px', height: '20px', background: '#334155', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>1</div>
                                    <span>Yıkama (Filter A)</span>
                                </li>
                                <li style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                                    <div style={{ width: '20px', height: '20px', background: '#334155', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>2</div>
                                    <span>Soyma (Filter B)</span>
                                </li>
                                <li style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                                    <div style={{ width: '20px', height: '20px', background: '#334155', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>3</div>
                                    <span>Ezme (Filter C)</span>
                                </li>
                            </ul>
                            <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '10px' }}>
                                "Yıkama" makinesi, "Ezme" makinesinin nasıl çalıştığını bilmez. Sadece temiz domates verir. Aradaki bant ise "Pipe"tır.
                            </p>
                        </div>

                         <div className="glass-card">
                             <h4 style={{ marginBottom: '1rem', color: '#fff' }}>Unix Command Line</h4>
                             <div style={{ fontFamily: 'monospace', background: '#020617', padding: '15px', borderRadius: '8px', color: '#10b981' }}>
                                 <span style={{ color: '#ec4899' }}>cat</span> users.txt | <span style={{ color: '#d946ef' }}>grep</span> "admin" | <span style={{ color: '#a855f7' }}>sort</span> | <span style={{ color: '#3b82f6' }}>uniq</span>
                             </div>
                             <p style={{ marginTop: '15px', fontSize: '0.9rem', color: '#cbd5e1' }}>
                                 Bu mimarinin en ünlü örneği Unix/Linux terminalidir. Her komut bir filtredir ve "|" işareti bir borudur (Pipe).
                             </p>
                         </div>
                    </div>
                </motion.div>
             )}
             
             {activeTab === 'simulation' && (
                 <motion.div
                    key="simulation"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
                     <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                         <button 
                            onClick={runPipeline} 
                            disabled={pipelineActive}
                            className="btn-bounce"
                            style={{ 
                                padding: '15px 40px', 
                                background: pipelineActive ? '#334155' : '#ec4899', 
                                border: 'none', 
                                borderRadius: '12px', 
                                color: 'white', 
                                fontSize: '1rem', 
                                fontWeight: 800,
                                cursor: pipelineActive ? 'default' : 'pointer'
                            }}
                        >
                            {pipelineActive ? 'Processing Pipeline...' : 'Start Transformation Pipe'}
                        </button>
                     </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {/* Initial Input */}
                        <div style={{ padding: '10px', background: '#334155', borderRadius: '8px', alignSelf: 'center', opacity: 0.5 }}>
                            Input: "hello world"
                        </div>

                        {/* Pipe Visualization */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                            {stages.slice(1).map((stage, i) => {
                                const packet = processedPackets[i+1]; // +1 because 0 is input
                                const isActive = pipelineActive && !packet; // Simplified active logic
                                
                                return (
                                    <React.Fragment key={stage.id}>
                                         <motion.div 
                                            animate={{ 
                                                scale: packet ? 1.05 : 1,
                                                borderColor: packet ? stage.color : 'transparent'
                                            }}
                                            className="glass-card" 
                                            style={{ 
                                                width: '200px', 
                                                display: 'flex', 
                                                flexDirection: 'column', 
                                                alignItems: 'center', 
                                                padding: '20px',
                                                border: '1px solid rgba(255,255,255,0.1)'
                                            }}
                                        >
                                            <div style={{ marginBottom: '10px', color: stage.color }}>{stage.icon}</div>
                                            <h4 style={{ margin: 0, color: 'white', fontSize: '0.9rem' }}>{stage.label}</h4>
                                            
                                            <div style={{ marginTop: '15px', width: '100%', minHeight: '40px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', color: packet ? '#fff' : '#475569', overflow: 'hidden', wordBreak: 'break-all', padding: '5px' }}>
                                                {packet ? packet.content : 'Waiting...'}
                                            </div>
                                        </motion.div>
                                        
                                        {i < stages.length - 2 && (
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <motion.div 
                                                    animate={{ width: ['20px', '40px', '20px'] }}
                                                    transition={{ repeat: Infinity, duration: 2 }}
                                                    style={{ height: '4px', background: stage.color, borderRadius: '2px' }} 
                                                />
                                                <ArrowRight color="#475569" size={20} />
                                            </div>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </div>

                </motion.div>
             )}
          </AnimatePresence>
      </div>

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
                Enterprise Pattern
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                Pipe and Filter mimarisi, Enterprise Integration Patterns (Gregor Hohpe) kitabında detaylıca işlenen temel bir entegrasyon modelidir.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
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
                    EIP: Pipes and Filters <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};

export default PipeFilterPage;
