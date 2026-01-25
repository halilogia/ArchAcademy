import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Network, Share2, Activity, Database, Layout, Shield, Cpu, Zap } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const ArchBrainPage = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Simulated project graph data based on our actual architecture
  const nodes = [
    { id: 'Domain', type: 'core', root: true, icon: <Shield size={20} />, color: '#ef4444', desc: 'İş kuralları ve varlıklar (Entities)' },
    { id: 'UseCases', type: 'core', parent: 'Domain', icon: <Activity size={20} />, color: '#f59e0b', desc: 'Uygulama mantığı ve senaryolar' },
    { id: 'Presentation', type: 'adapter', icon: <Layout size={20} />, color: '#3b82f6', desc: 'UI bileşenleri ve sayfalar' },
    { id: 'Infrastructure', type: 'adapter', icon: <Database size={20} />, color: '#10b981', desc: 'Dış servisler, API ve Veritabanı' },
    { id: 'Components', type: 'sub', parent: 'Presentation', icon: <Cpu size={16} />, color: '#60a5fa', desc: 'Yeniden kullanılabilir atomik parçalar' },
    { id: 'Data', type: 'sub', parent: 'Infrastructure', icon: <Network size={16} />, color: '#34d399', desc: 'Ham veri ve modeller' }
  ];

  const connections = [
    { from: 'Presentation', to: 'UseCases', type: 'dependency' },
    { from: 'UseCases', to: 'Domain', type: 'dependency' },
    { from: 'Infrastructure', to: 'Domain', type: 'dependency' },
    { from: 'Components', to: 'Presentation', type: 'structure' },
    { from: 'Data', to: 'Infrastructure', type: 'structure' }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: '#020617', minHeight: '100vh', overflow: 'hidden' }}>
      <ArchHero 
        title="ArchBrain" 
        subtitle="3D Neural Map"
        description="Projenin tüm bağımlılıklarını ve sinir ağlarını 3D uzayda keşfedin. Import ların izini sürün, mimarinin kalbini görün."
        badge="Autonomous Visualization"
        color="#06b6d4"
        illustration={
           <div style={{ position: 'relative', width: '350px', height: '350px', perspective: '1000px' }}>
              <motion.div
                animate={{ rotateY: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}
              >
                 {nodes.map((node, i) => (
                   <motion.div
                    key={node.id}
                    whileHover={{ scale: 1.2, z: 50 }}
                    onClick={() => setSelectedNode(node.id)}
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) rotateY(${i * 60}deg) translateZ(150px)`,
                      width: '60px',
                      height: '60px',
                      borderRadius: '15px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: `2px solid ${node.color}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: node.color,
                      cursor: 'pointer',
                      boxShadow: `0 0 20px ${node.color}33`,
                      backdropFilter: 'blur(10px)',
                      zIndex: 10
                    }}
                   >
                      {node.icon}
                   </motion.div>
                 ))}
                 
                 {/* Connection Lines simulation */}
                 <div style={{ position: 'absolute', inset: 0, opacity: 0.2 }}>
                    <svg width="100%" height="100%" viewBox="0 0 350 350">
                       <circle cx="175" cy="175" r="150" fill="none" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" strokeDasharray="5,5" />
                    </svg>
                 </div>
              </motion.div>
           </div>
        }
        features={[
          { icon: <Brain />, title: 'Real-time Scanner', desc: 'Tüm dosya sistemini tarayıp anlık bağımlılık grafiği çıkarır.' },
          { icon: <Share2 />, title: 'Dependency Tracer', desc: 'Bir dosyayı seçince ona bağlı olan tüm damarları renklendirir.' },
          { icon: <Activity />, title: 'Health Score', desc: 'Mimarideki "Circular Dependency" veya "God Object"leri tespit eder.' }
        ]}
      />

      <section style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>
             {/* Interaction View */}
             <div className="glass-card" style={{ height: '600px', background: '#000', borderRadius: '30px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', gap: '10px' }}>
                   <div style={{ padding: '8px 15px', background: 'rgba(6, 182, 212, 0.1)', borderRadius: '10px', fontSize: '0.8rem', color: '#06b6d4', border: '1px solid #06b6d4' }}>Neural Pulse: Active</div>
                   <div style={{ padding: '8px 15px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '10px', fontSize: '0.8rem', color: 'white' }}>Nodes: 55</div>
                </div>
                
                {/* 3D Simulation Web */}
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} style={{ position: 'relative', width: '400px', height: '400px' }}>
                      {nodes.map((n, i) => (
                        <motion.div
                          key={n.id}
                          className="node"
                          style={{
                            position: 'absolute',
                            left: `${200 + 150 * Math.cos(i * (2 * Math.PI / nodes.length))}px`,
                            top: `${200 + 150 * Math.sin(i * (2 * Math.PI / nodes.length))}px`,
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: selectedNode === n.id ? n.color : 'rgba(255,255,255,0.1)',
                            border: `2px solid ${n.color}`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: selectedNode === n.id ? '#000' : n.color,
                            cursor: 'pointer'
                          }}
                          onClick={() => setSelectedNode(n.id)}
                        >
                          {n.icon}
                        </motion.div>
                      ))}
                   </motion.div>
                </div>
             </div>

             {/* Insight Panel */}
             <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <AnimatePresence mode="wait">
                   {selectedNode ? (
                     <motion.div key={selectedNode} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-card" style={{ padding: '2.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                           <div style={{ color: nodes.find(n => n.id === selectedNode)?.color }}>{nodes.find(n => n.id === selectedNode)?.icon}</div>
                           <h2 style={{ margin: 0 }}>{selectedNode}</h2>
                        </div>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{nodes.find(n => n.id === selectedNode)?.desc}</p>
                        
                        <div style={{ marginTop: '2rem' }}>
                           <h4 style={{ marginBottom: '1rem' }}>Erişilen Sinir Uçları (Dependencies)</h4>
                           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                              {connections.filter(c => c.from === selectedNode).map((c, i) => (
                                <span key={i} style={{ padding: '5px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', fontSize: '0.8rem' }}>→ {c.to}</span>
                              ))}
                              {connections.filter(c => c.from === selectedNode).length === 0 && <span style={{ opacity: 0.5 }}>Dış bağımlılık yok (Pure Core).</span>}
                           </div>
                        </div>
                     </motion.div>
                   ) : (
                     <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', opacity: 0.5 }}>
                        <Brain size={60} style={{ marginBottom: '1.5rem', margin: '0 auto' }} />
                        <p>Bir sinir ucu (node) seçerek projenin o katmanındaki derin bağları keşfedin.</p>
                     </div>
                   )}
                </AnimatePresence>

                <div className="glass-card" style={{ padding: '2rem', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
                   <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}><Zap color="#06b6d4" /> Proje Sağlığı</h3>
                   <div style={{ background: 'rgba(255,255,255,0.05)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: '92%', height: '100%', background: '#10b981' }} />
                   </div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.8rem', fontSize: '0.8rem', opacity: 0.7 }}>
                      <span>Clean Score: 92%</span>
                      <span>Violation: 0</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ArchBrainPage;
