import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Cpu, Layers, FastForward, Play, Code2 } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { ECSPrinciplesDeepDive } from '../components/ecs/ECSPrinciplesDeepDive';
import { ECSCodeExample } from '../components/ecs/ECSCodeExample';
import { ECSStructureAndComparison } from '../components/ecs/ECSStructureAndComparison';

const ECSPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const heroIllustration = (
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Entities Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            style={{ 
              width: '50px', 
              height: '50px', 
              background: 'rgba(16, 185, 129, 0.05)', 
              border: '1px solid rgba(16, 185, 129, 0.2)', 
              borderRadius: '12px', 
              position: 'relative' 
            }}
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              style={{ position: 'absolute', top: '10px', left: '10px', width: '8px', height: '8px', background: '#3b82f6', borderRadius: '2px' }} 
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{ position: 'absolute', bottom: '10px', right: '10px', width: '8px', height: '8px', background: '#f43f5e', borderRadius: '2px' }} 
            />
          </motion.div>
        ))}
      </div>
      
      {/* System Scanner Line */}
      <motion.div
        animate={{ x: [-180, 180], opacity: [0, 1, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ 
          position: 'absolute', 
          top: '10%', 
          bottom: '10%', 
          width: '2px', 
          background: 'linear-gradient(to bottom, transparent, #10b981, transparent)', 
          filter: 'drop-shadow(0 0 15px #10b981)',
          zIndex: 2
        }}
      />
      
      <div style={{ position: 'absolute', bottom: '-20px', color: '#10b981', fontWeight: 900, fontSize: '0.65rem', display: 'flex', gap: '20px', opacity: 0.6, letterSpacing: '2px' }}>
        <span style={{ color: '#3b82f6' }}>ENTITY</span>
        <span style={{ color: '#f43f5e' }}>COMPONENT</span>
        <span style={{ color: '#10b981' }}>SYSTEM</span>
      </div>
    </div>
  );

  return (
    <>
      <SEO
        title={isEn ? "Entity Component System (ECS) Architecture | ArchAcademy" : "Entity Component System (ECS) Oyun ve Performans Mimarisi | ArchAcademy"}
        description={isEn 
          ? "Master Entity Component System (ECS) architecture, Data-Oriented Design (DOD), CPU cache locality, Unity DOTS, and parallel execution." 
          : "Entity Component System (ECS) mimarisi, Veri Odaklı Tasarım (Data-Oriented Design), CPU önbellek optimizasyonu ve Unity DOTS rehberi."
        }
        keywords="entity component system, ecs architecture, data oriented design, unity dots, burst compiler, game architecture"
        canonicalUrl="/ecs"
      />
      <div style={{ background: 'var(--bg-dark)', minHeight: '100vh', paddingBottom: '100px' }}>
        <ArchHero 
          title="ECS"
          subtitle="Game Architecture"
          description={isEn 
            ? "Entity Component System. A data-oriented revolution overthrowing classical OOP memory bloat. Process hundreds of thousands of dynamic game entities at blistering 60+ FPS via pure CPU cache-friendly layouts." 
            : "Entity Component System. Nesne yönelimli (OOP) hantallığını yıkan, veri odaklı (Data-Oriented) bir devrim. Binlerce dinamik nesneyi CPU Cache dostu bir yapıyla saniyeler içinde işleyin."
          }
          badge="Performance King"
          color="#10b981"
          illustration={heroIllustration}
          features={[
            { 
              icon: <Cpu />, 
              title: isEn ? 'L1/L2 Cache Hit' : 'Önbellek Verimi (Cache Hit)', 
              desc: isEn ? 'Sequential RAM contiguous layouts minimize CPU memory pipeline latency.' : 'Veriyi RAM\'de ardışık dizerek CPU gecikmesini (latency) minimize eder.' 
            },
            { 
              icon: <FastForward />, 
              title: isEn ? 'Massively Parallel' : 'Muazzam Paralellik', 
              desc: isEn ? 'Decoupled stateless systems run across multi-threaded workers with zero contention.' : 'Sistemler birbirinden bağımsız olduğu için Multi-threading için mükemmeldir.' 
            },
            { 
              icon: <Layers />, 
              title: isEn ? 'Composition over Inheritance' : 'Bileşim Önceliği', 
              desc: isEn ? 'Assemble behaviors dynamically without deep, brittle OOP class inheritance trees.' : 'Kalıtım hiyerarşisi yerine esnek bileşen birleşimi sunar.' 
            }
          ]}
        />

        {/* Deep Dive Section */}
        <section style={{ padding: '80px 0' }}>
          <div className="container">
            <ECSPrinciplesDeepDive />
            <ECSCodeExample />
          </div>
        </section>

        {/* Structure & Comparison Section */}
        <ECSStructureAndComparison />

        {/* CTA & Catalog Return */}
        <section style={{ padding: '100px 0' }}>
          <div className="container">
            <div className="glass-card" style={{ textAlign: 'center', padding: '5rem', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)' }}>
              <h2 style={{ fontSize: '3rem', fontWeight: 950, marginBottom: '1.5rem' }}>
                {isEn ? "Data-Oriented " : "Veri Odaklı "}<span className="gradient-text">{isEn ? "Future" : "Gelecek"}</span>.
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 3rem' }}>
                {isEn 
                  ? "While OOP focuses on what objects are, ECS focuses on how raw bytes stream across silicon hardware." 
                  : "OOP nesnelerle düşünmemizi söyler, ECS ise verinin nasıl aktığıyla ilgilenir. Architecture Catalog'a dönerek diğer sistemleri incele."
                }
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button onClick={() => window.history.back()} style={{ padding: '1rem 3rem', borderRadius: '100px', background: 'white', color: 'black', border: 'none', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Play size={18} fill="black" /> {isEn ? "RETURN TO CATALOG" : "KATALOĞA DÖN"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Engineering Reference */}
        <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
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
                {isEn ? "Performance Engineering Reference" : "Performans Mühendisliği"}
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                {isEn 
                  ? "Explore the official Unity DOTS and Entities documentation for industrial game production." 
                  : "Entity Component System (ECS) mimarisi ve veri odaklı tasarımın (Data-Oriented Design) oyun motorlarındaki derinliğini keşfedin."
                }
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a 
                  href="https://docs.unity3d.com/Packages/com.unity.entities@1.0/manual/index.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '8px', 
                    background: 'rgba(16, 185, 129, 0.15)', color: '#6ee7b7', 
                    padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                    border: '1px solid rgba(16, 185, 129, 0.2)', transition: 'all 0.2s'
                  }}
                >
                  Unity DOTS Entities Manual <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ECSPage;
