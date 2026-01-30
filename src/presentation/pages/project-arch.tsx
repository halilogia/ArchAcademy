import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Palette, Sparkles, Wind, Brain, Activity, Layout, Shield, Cpu, Share2, Network, Database } from 'lucide-react';
import ProjectHero from '../components/ProjectHero';
import ProjectStructure from '../components/ProjectStructure';
import ProjectDependency from '../components/ProjectDependency';
import ProjectTechStack from '../components/ProjectTechStack';
import ProjectDecisionRecords from '../components/ProjectDecisionRecords';
import ProjectDesignSystem from '../components/ProjectDesignSystem';
import ArchHero from '../components/ArchHero';
import { useLocation } from 'react-router-dom';

const ArchBrainContent = ({ TabSwitcher }: { TabSwitcher: React.FC }) => {
  const nodes = [
    { id: 'Domain', type: 'core', root: true, icon: <Shield size={20} />, color: '#ef4444', desc: 'İş kuralları ve varlıklar (Entities)' },
    { id: 'UseCases', type: 'core', parent: 'Domain', icon: <Activity size={20} />, color: '#f59e0b', desc: 'Uygulama mantığı ve senaryolar' },
    { id: 'Presentation', type: 'adapter', icon: <Layout size={20} />, color: '#3b82f6', desc: 'UI bileşenleri ve sayfalar' },
    { id: 'Infrastructure', type: 'adapter', icon: <Database size={20} />, color: '#10b981', desc: 'Dış servisler, API ve Veritabanı' },
    { id: 'Components', type: 'sub', parent: 'Presentation', icon: <Cpu size={16} />, color: '#60a5fa', desc: 'Yeniden kullanılabilir atomik parçalar' },
    { id: 'Data', type: 'sub', parent: 'Infrastructure', icon: <Network size={16} />, color: '#34d399', desc: 'Ham veri ve modeller' }
  ];

  return (
    <>
      <ArchHero 
        title="ArchBrain" 
        subtitle="Neural Map"
        description="Projenin tüm bağımlılıklarını ve sinir ağlarını 3D uzayda keşfedin. Mimarinin kalbini anlık olarak izleyin."
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
                      boxShadow: `0 0 20px ${node.color}33`,
                      backdropFilter: 'blur(10px)',
                      zIndex: 10
                    }}
                   >
                      {node.icon}
                   </motion.div>
                 ))}
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
          { icon: <Activity />, title: 'Health Score', desc: 'Mimarideki potansiyel riskleri ve karmaşıklığı analiz eder.' }
        ]}
      >
        <TabSwitcher />
      </ArchHero>

      <section style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)' }}>
        <div className="container">
           <div className="glass-card" style={{ height: '700px', background: '#000', borderRadius: '30px', position: 'relative', overflow: 'hidden' }}>
              <iframe 
                src="/arch-brain-report.html" 
                style={{ width: '100%', height: '100%', border: 'none', background: '#020617' }} 
                title="ArchBrain neural report"
              />
           </div>
        </div>
      </section>
    </>
  );
};

const ProjectPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab === 'design') return 'design';
    if (tab === 'brain') return 'brain';
    return 'architecture';
  });

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab === 'design') setActiveTab('design');
    else if (tab === 'brain') setActiveTab('brain');
    else setActiveTab('architecture');
  }, [location.search]);

  const TabSwitcher = () => (
    <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.05)', padding: '6px', borderRadius: '16px', border: '1px solid var(--glass-border)', marginBottom: '2rem', gap: '8px' }}>
        <button
          onClick={() => setActiveTab('architecture')}
          style={{
            padding: '12px 30px',
            borderRadius: '12px',
            background: activeTab === 'architecture' ? 'var(--primary)' : 'transparent',
            color: activeTab === 'architecture' ? 'white' : 'var(--text-secondary)',
            border: 'none',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.3s',
            display: 'flex', alignItems: 'center', gap: '8px'
          }}
        >
          <Layers size={18} /> Project Architecture
        </button>
        <button
          onClick={() => setActiveTab('brain')}
          style={{
            padding: '12px 30px',
            borderRadius: '12px',
            background: activeTab === 'brain' ? '#06b6d4' : 'transparent',
            color: activeTab === 'brain' ? 'white' : 'var(--text-secondary)',
            border: 'none',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.3s',
            display: 'flex', alignItems: 'center', gap: '8px'
          }}
        >
          <Brain size={18} /> Neural Map
        </button>
        <button
          onClick={() => setActiveTab('design')}
          style={{
            padding: '12px 30px',
            borderRadius: '12px',
            background: activeTab === 'design' ? '#a855f7' : 'transparent',
            color: activeTab === 'design' ? 'white' : 'var(--text-secondary)',
            border: 'none',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'all 0.3s',
            display: 'flex', alignItems: 'center', gap: '8px'
          }}
        >
          <Palette size={18} /> Design System
        </button>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}
    >
      <div style={{ minHeight: '800px' }}>
        <AnimatePresence mode="wait">
          {activeTab === 'architecture' ? (
            <motion.div 
              key="arch" 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectHero>
                <TabSwitcher />
              </ProjectHero>
              
              <ProjectDecisionRecords />
              <ProjectDependency />
              <ProjectStructure />
              
              {/* Architect's Harmony Section */}
              <section style={{ padding: '100px 0', borderTop: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)' }}>
                <div className="container">
                  <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h2 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800 }}>Architect's Harmony</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Tek bir mimari, sarsılmaz bir disiplin ve modern bir uygulama yaklaşımı.</p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '3rem' }}>
                    <div className="glass-card" style={{ padding: '3rem' }}>
                        <h3 style={{ color: 'var(--primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ padding: '8px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '10px' }}>01</div>
                          Clean Architecture (Strateji)
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                          Projenin ana iskeletidir. Domain, Use Case ve Infrastructure katmanlarını birbirinden ayırarak 
                          yazılımın teknolojiye (React, API vb.) değil, "İş Mantığına" (Eğitim Portalı kuralları) köle olmasını sağlar.
                        </p>
                    </div>

                    <div className="glass-card" style={{ padding: '3rem' }}>
                        <h3 style={{ color: '#f59e0b', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ padding: '8px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '10px' }}>02</div>
                          SOLID / SRP (Taktik)
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                          Kodun hücre seviyesindeki disiplinidir. Her dosya (Bileşen) sadece tek bir işten sorumludur. 
                          Bu sayede bir özelliği değiştirdiğimizde diğerleri domino taşı gibi devrilmez.
                        </p>
                    </div>

                    <div className="glass-card" style={{ padding: '3rem' }}>
                        <h3 style={{ color: '#10b981', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ padding: '8px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '10px' }}>03</div>
                          Component-Based (Uygulama)
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                          React dünyasının sunduğu muazzam bir güçtür. Clean Architecture'ın o katı kurallarını, 
                          esnek Lego parçalarına (Components) dönüştürerek ekrana yansıtmamızı sağlar.
                        </p>
                    </div>

                    <div className="glass-card" style={{ padding: '3rem' }}>
                        <h3 style={{ color: '#a855f7', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ padding: '8px', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '10px' }}>04</div>
                          The Master Synergy
                        </h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                          Sonuç olarak; bu projede bu üçü arasında bir hiyerarşi vardır. 
                          <strong> Mimari</strong> (Clean) yol haritasıdır, <strong>Disiplin</strong> (SOLID) kurallar dizisidir, 
                          <strong> Tasarım</strong> (Component) ise bu kuralların görsel halidir.
                        </p>
                    </div>
                  </div>
                </div>
              </section>

              <ProjectTechStack />

              {/* Architect's Conclusion Section */}
              <section style={{ padding: '100px 0', textAlign: 'center' }}>
                <div className="container">
                  <div className="glass-card" style={{ 
                    background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(37, 99, 235, 0.1) 100%)',
                    padding: '5rem'
                  }}>
                    <h2 style={{ marginBottom: '1.5rem', fontSize: '2.5rem' }}>Architect's Conclusion</h2>
                    <p style={{ maxWidth: '850px', margin: '0 auto', color: 'var(--text-secondary)', lineHeight: 2, fontSize: '1.1rem' }}>
                      Bu portal, yazılım mimarisinin sadece bir "teori" değil, yaşayan, nefes alan ve her satırında 
                      disiplin barındıran bir "sanat" olduğunun kanıtıdır. 
                      <strong>ArchAcademy</strong>, kendi mimari kurallarını bizzat kendi bünyesinde uygulayarak 
                      sektöre örnek bir referans teşkil etmek üzere tasarlanmıştır.
                    </p>
                  </div>
                </div>
              </section>
            </motion.div>
          ) : activeTab === 'brain' ? (
            <motion.div key="brain" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
               <ArchBrainContent TabSwitcher={TabSwitcher} />
            </motion.div>
          ) : (
            <motion.div 
              key="design" 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }} 
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ArchHero 
                title="Visual"
                subtitle="Design System"
                description="ArchAcademy'nin estetik dilini ve kullanıcı deneyimi standartlarını keşfedin. Burada sadece kod değil, 'Görsel Ustalık' (Visual Craftsmanship) rehberini bulacaksınız."
                badge="UI/UX Architecture"
                color="#a855f7"
                illustration={
                  <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          rotate: [0, 10, 0],
                          scale: [1, 1.05, 1],
                          y: [0, -10, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                        style={{
                          position: 'absolute',
                          width: '120px',
                          height: '160px',
                          background: i === 0 ? '#a855f7' : i === 1 ? '#3b82f6' : '#10b981',
                          borderRadius: '20px',
                          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                          left: 60 + (i * 40),
                          top: 40 + (i * 20),
                          zIndex: 3 - i,
                          border: '4px solid rgba(255,255,255,0.1)',
                          display: 'flex',
                          alignItems: 'flex-end',
                          padding: '15px'
                        }}
                      >
                        <div style={{ fontSize: '0.6rem', fontWeight: 900, color: 'white', opacity: 0.8 }}>
                          {i === 0 ? '#A855F7' : i === 1 ? '#3B82F6' : '#10B981'}
                        </div>
                      </motion.div>
                    ))}

                    <motion.div
                      animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
                      transition={{ duration: 5, repeat: Infinity }}
                      style={{ position: 'absolute', right: '20px', top: '40px', width: '100px', height: '40px', background: 'var(--glass)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.2)', zIndex: 10, display: 'flex', alignItems: 'center', padding: '0 10px', gap: '8px' }}
                    >
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#a855f7' }} />
                      <div style={{ width: '50px', height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px' }} />
                    </motion.div>

                    <motion.div
                      animate={{ x: [0, -20, 0], y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                      style={{ position: 'absolute', left: '20px', bottom: '60px', width: '80px', height: '80px', background: 'var(--glass)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.2)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <Palette size={40} color="#a855f7" />
                    </motion.div>

                    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(168, 85, 247, 0.2) 1px, transparent 1px)', backgroundSize: '20px 20px', zIndex: -1 }} />
                  </div>
                }
                features={[
                  { icon: <Palette />, title: 'Aura Palette', desc: 'Atmospheric Gradients & Neon Highlights ile derinlik hissi.' },
                  { icon: <Wind />, title: 'Fluid Motion', desc: '60FPS Ease-in-out pürüzsüz geçişler ve mikro etkileşimler.' },
                  { icon: <Sparkles />, title: 'Atomic UI', desc: 'Glassmorphism temelli, modüler ve yeniden kullanılabilir kart mantığı.' }
                ]}
                hideAction
              >
                <TabSwitcher />
              </ArchHero>

              <ProjectDesignSystem />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ProjectPage;
