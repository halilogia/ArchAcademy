import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Activity, Layout, Database, Cpu, Network, Brain, Share2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ArchHero from '../ArchHero';

export interface ProjectBrainTabProps {
  tabSwitcher: React.ReactNode;
}

export const ProjectBrainTab: React.FC<ProjectBrainTabProps> = ({ tabSwitcher }) => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const nodes = [
    { id: 'Domain', type: 'core', root: true, icon: <Shield size={20} />, color: '#ef4444', desc: isEn ? 'Enterprise rules & Entities' : 'İş kuralları ve varlıklar (Entities)' },
    { id: 'UseCases', type: 'core', parent: 'Domain', icon: <Activity size={20} />, color: '#f59e0b', desc: isEn ? 'Application logic & orchestrators' : 'Uygulama mantığı ve senaryolar' },
    { id: 'Presentation', type: 'adapter', icon: <Layout size={20} />, color: '#3b82f6', desc: isEn ? 'UI components & Pages' : 'UI bileşenleri ve sayfalar' },
    { id: 'Infrastructure', type: 'adapter', icon: <Database size={20} />, color: '#10b981', desc: isEn ? 'External APIs, Repositories & DB' : 'Dış servisler, API ve Veritabanı' },
    { id: 'Components', type: 'sub', parent: 'Presentation', icon: <Cpu size={16} />, color: '#60a5fa', desc: isEn ? 'Atomic reusable components' : 'Yeniden kullanılabilir atomik parçalar' },
    { id: 'Data', type: 'sub', parent: 'Infrastructure', icon: <Network size={16} />, color: '#34d399', desc: isEn ? 'Raw data & DTO models' : 'Ham veri ve modeller' }
  ];

  return (
    <motion.div key="brain" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
      <ArchHero 
        title="ArchBrain" 
        subtitle="Neural Map"
        description={isEn 
          ? "Explore real-time project dependencies and neural graph connections in 3D perspective space. Monitor architectural vitality live." 
          : "Projenin tüm bağımlılıklarını ve sinir ağlarını 3D uzayda keşfedin. Mimarinin kalbini anlık olarak izleyin."
        }
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
          { icon: <Brain />, title: isEn ? 'Real-time Scanner' : 'Canlı Tarayıcı', desc: isEn ? 'Scans file system and compiles real-time dependency graph.' : 'Tüm dosya sistemini tarayıp anlık bağımlılık grafiği çıkarır.' },
          { icon: <Share2 />, title: isEn ? 'Dependency Tracer' : 'Bağımlılık İzleyici', desc: isEn ? 'Highlights interconnected domain channels on click.' : 'Bir dosyayı seçince ona bağlı olan tüm damarları renklendirir.' },
          { icon: <Activity />, title: isEn ? 'Health Score' : 'Mimari Sağlık Skoru', desc: isEn ? 'Evaluates coupling, complexity, and coupling risks.' : 'Mimarideki potansiyel riskleri ve karmaşıklığı analiz eder.' }
        ]}
      >
        {tabSwitcher}
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
    </motion.div>
  );
};

export default ProjectBrainTab;
