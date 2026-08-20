import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Database, Cpu, Layers, RefreshCcw, Activity } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { SpaceBasedComparisonTab } from '../components/spacebased/SpaceBasedComparisonTab';
import { SpaceBasedSimulationTab, PartitionNode } from '../components/spacebased/SpaceBasedSimulationTab';

const SpaceBasedPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'simulation' | 'comparison'>('comparison');
  const scrollToSection = (id: 'simulation' | 'comparison') => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const [partitions, setPartitions] = useState<PartitionNode[]>([
    { id: 1, load: 0, range: 'A-M', color: '#eab308' },
    { id: 2, load: 0, range: 'N-Z', color: '#f59e0b' }
  ]);
  const [dbLoad, setDbLoad] = useState(0);

  const handleLoad = () => {
    setPartitions(prev => prev.map(p => ({
      ...p,
      load: Math.min(100, p.load + Math.floor(Math.random() * 20))
    })));

    setDbLoad(prev => Math.min(100, prev + 5)); 
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPartitions(prev => prev.map(p => ({ ...p, load: Math.max(0, p.load - 10) })));
      setDbLoad(prev => Math.max(0, prev - 5));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const heroIllustration = (
    <div style={{ position: 'relative', width: '350px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Background Grid */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.1, backgroundImage: 'linear-gradient(#eab308 1px, transparent 1px), linear-gradient(90deg, #eab308 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      {/* Processing Units (Nodes) */}
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 1.5, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            left: i === 0 ? '40px' : 'auto',
            right: i === 1 ? '40px' : 'auto',
            width: '100px',
            height: '120px',
            background: 'var(--glass)',
            border: '2px solid #eab308',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10px',
            boxShadow: '0 10px 40px rgba(234, 179, 8, 0.2)'
          }}
        >
          <div style={{ fontSize: '0.6rem', color: '#eab308', marginBottom: '5px', fontWeight: 800 }}>PU - {i+1}</div>
          
          {/* Logic Layer */}
          <div style={{ width: '80%', height: '30px', background: 'rgba(234, 179, 8, 0.2)', borderRadius: '6px', marginBottom: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Cpu size={14} color="#fde047" />
          </div>
          
          {/* RAM Grid */}
          <div style={{ width: '80%', height: '50px', border: '1px dashed #eab308', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Database size={20} color="#eab308" />
          </div>
        </motion.div>
      ))}

      {/* Async DB Sync Line */}
      <div style={{ position: 'absolute', bottom: '20px', width: '200px', height: '2px', background: 'linear-gradient(90deg, transparent, #eab308, transparent)', opacity: 0.5 }} />
      <div style={{ position: 'absolute', bottom: '-20px', fontSize: '0.7rem', color: '#71717a' }}>Async Persistency</div>
    </div>
  );

  return (
    <>
      <SEO
        title={isEn ? "Space-Based Architecture (SBA) | ArchAcademy" : "Space-Based (Alan Odaklı) Mimari | ArchAcademy"}
        description={isEn 
          ? "Master Space-Based Architecture (SBA), in-memory data grids (IMDG), Processing Units (PU), and write-behind persistence." 
          : "Space-Based (Alan Odaklı) mimari, bellek içi veri ızgaraları (IMDG), Processing Unit ve asenkron kalıcılık rehberi."
        }
        keywords="space based architecture, in memory data grid, gigaspaces, processing unit, write behind, tuple space"
        canonicalUrl="/space-based"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
        <ArchHero 
          title="Space-Based"
          subtitle="Architecture"
          description={isEn 
            ? "Eliminates the central database bottleneck. Application business logic and active state co-locate inside distributed RAM Processing Units (PU) with asynchronous write-behind persistence." 
            : "Veritabanı darboğazını yok etmek için tasarlanmıştır. Uygulama ve Veri aynı yerde (RAM) yaşar. 'Tuple Space' mantığıyla yüz binlerce işlemi milisaniyeler içinde işler."
          }
          badge="High Performance Profile"
          color="#eab308"
          illustration={heroIllustration}
          features={[
            { 
              icon: <Cpu />, 
              title: 'Processing Unit (PU)', 
              desc: isEn ? 'Business logic and in-memory data co-locate in unified scale units.' : 'İş mantığı (Logic) ve Veri (Data), tek bir birim olarak beraber ölçeklenir.' 
            },
            { 
              icon: <Database />, 
              title: isEn ? 'In-Memory Data Grid' : 'Bellek İçi Izgara (In-Memory Grid)', 
              desc: isEn ? 'Primary operational state lives inside memory clusters, bypassing disk I/O.' : 'Veriler diskte değil, yüzlerce sunucunun RAM\'inde tutulur.' 
            },
            { 
              icon: <RefreshCcw />, 
              title: isEn ? 'Asynchronous Write-Behind' : 'Asenkron Diske Yazma (Write-Behind)', 
              desc: isEn ? 'Database synchronization is performed in the background without blocking client requests.' : 'Veritabanına yazma işlemi asenkron yapılır, kullanıcıyı bekletmez.' 
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
              { id: 'comparison', label: isEn ? 'DB-Centric vs Space-Based' : 'DB Centric vs Space', icon: <Layers size={18} /> },
              { id: 'simulation', label: isEn ? 'Load Grid Simulator' : 'Yük Dağıtım Simülasyonu', icon: <Activity size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id as any)}
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
            <SpaceBasedComparisonTab />
          </div>
        </div>
        </div>

        {/* Technical Foundation Reference */}
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
                  {isEn ? "Technical Foundation & Tuple Space" : "Teknik Temeller"}
                </div>
                <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  {isEn 
                    ? "Space-Based Architecture stems from David Gelernter's Linda Tuple Space theory and is enterprise-engineered by GigaSpaces." 
                    : "Space-Based Architecture kavramı, özellikle GigaSpaces ve 'Tuple Space' teorisi üzerine kuruludur. Detaylı teknik döküman için inceleyin."
                  }
                </p>
                
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap',
            position: 'sticky',
            top: '80px',
            zIndex: 30 }}>
                   <a 
                     href="https://www.gigaspaces.com/" 
                     target="_blank" 
                     rel="noopener noreferrer"
                     style={{ 
                       display: 'flex', alignItems: 'center', gap: '8px', 
                       background: 'rgba(234, 179, 8, 0.15)', color: '#fde047', 
                       padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                       border: '1px solid rgba(234, 179, 8, 0.2)', transition: 'all 0.2s'
                     }}
                   >
                      GigaSpaces Technology & SBA Docs <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                   </a>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default SpaceBasedPage;
