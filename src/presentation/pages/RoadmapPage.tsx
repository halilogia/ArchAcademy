import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ship, GraduationCap, ArrowRight, Sparkles, Trophy, Users, BookOpen } from 'lucide-react';
import ArchitectRoadmap from '../components/ArchitectRoadmap';
import ProductionFlow from '../components/ProductionFlow';

const RoadmapPage = () => {
  const [activeTab, setActiveTab] = useState<'career' | 'production'>('career');

  const TabSwitcher = () => (
    <div style={{ 
      display: 'inline-flex', 
      background: 'rgba(15, 23, 42, 0.6)', 
      padding: '8px', 
      borderRadius: '24px', 
      border: '1px solid rgba(255,255,255,0.05)',
      marginBottom: '1rem',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      position: 'relative',
      zIndex: 10
    }}>
        <button
          onClick={() => setActiveTab('career')}
          style={{
            padding: '14px 28px',
            borderRadius: '18px',
            background: activeTab === 'career' ? 'var(--primary)' : 'transparent',
            color: activeTab === 'career' ? 'white' : 'var(--text-secondary)',
            border: 'none',
            fontWeight: 800,
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            display: 'flex', alignItems: 'center', gap: '10px',
            fontSize: '0.95rem',
            boxShadow: activeTab === 'career' ? '0 10px 20px rgba(59, 130, 246, 0.3)' : 'none'
          }}
        >
          <GraduationCap size={20} /> Mimari Müfredat
        </button>
        <button
          onClick={() => setActiveTab('production')}
          style={{
            padding: '14px 28px',
            borderRadius: '18px',
            background: activeTab === 'production' ? '#f43f5e' : 'transparent',
            color: activeTab === 'production' ? 'white' : 'var(--text-secondary)',
            border: 'none',
            fontWeight: 800,
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            display: 'flex', alignItems: 'center', gap: '10px',
            fontSize: '0.95rem',
            boxShadow: activeTab === 'production' ? '0 10px 20px rgba(244, 63, 94, 0.3)' : 'none'
          }}
        >
          <Ship size={20} /> Yazılım Döngüsü
        </button>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)', minHeight: '100vh', paddingTop: '100px', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background Glows */}
      <div style={{ position: 'absolute', top: 0, left: '20%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, right: '10%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(244, 63, 94, 0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" style={{ textAlign: 'center', marginBottom: '4rem', position: 'relative' }}>
        <AnimatePresence mode="wait">
          {activeTab === 'career' ? (
            <motion.div
              key="career-head"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                padding: '8px 16px', 
                background: 'rgba(59, 130, 246, 0.1)', 
                borderRadius: '100px', 
                color: 'var(--primary)', 
                fontSize: '0.8rem', 
                fontWeight: 800, 
                marginBottom: '1.5rem',
                border: '1px solid rgba(59, 130, 246, 0.2)'
              }}>
                 <GraduationCap size={14} /> ARCHITECT CURRICULUM
              </div>
              <h1 className="gradient-text" style={{ fontSize: '4.5rem', fontWeight: 950, marginBottom: '1.5rem', letterSpacing: '-2px', lineHeight: 1 }}>
                Mimari <br/>Müfredat
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.3rem', maxWidth: '800px', margin: '0 auto 3rem', lineHeight: 1.6, fontWeight: 500 }}>
                Yazılım mimarisi disiplinlerini en temelden en ileri seviyeye, yapılandırılmış bir müfredat eşliğinde keşfedin. 
                <span style={{ color: 'var(--primary)', fontWeight: 700 }}> Senior Architect</span> olma yolculuğu burada başlar. SOLID, Design Patterns ve Clean Architecture temellerine hakim olun.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="production-head"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                padding: '8px 16px', 
                background: 'rgba(244, 63, 94, 0.1)', 
                borderRadius: '100px', 
                color: '#f43f5e', 
                fontSize: '0.8rem', 
                fontWeight: 800, 
                marginBottom: '1.5rem',
                border: '1px solid rgba(244, 63, 94, 0.2)'
              }}>
                 <Ship size={14} /> CONTINUOUS DEPLOYMENT
              </div>
              <h1 className="gradient-text" style={{ 
                fontSize: '4.5rem', 
                fontWeight: 950, 
                marginBottom: '1.5rem', 
                letterSpacing: '-2px',
                lineHeight: 1,
                background: 'linear-gradient(to right, #f43f5e, #fb7185)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Path to <br/>Production
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.3rem', maxWidth: '800px', margin: '0 auto 3rem', lineHeight: 1.6, fontWeight: 500 }}>
                Fikir aşamasından son kullanıcıya kadar uzanan kodun yolculuğu. <br/>
                Konteynırlardan Kubernetes orkestrasyonuna, <span style={{ color: '#f43f5e', fontWeight: 700 }}>DevOps + Architect</span> sinerjisini keşfedin. Otomasyonun gücünü hissedin.
              </p>

            </motion.div>
          )}
        </AnimatePresence>

        <TabSwitcher />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <AnimatePresence mode="wait">
          {activeTab === 'career' ? (
            <motion.div
              key="career-content"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <ArchitectRoadmap hideHeader={true} />
            </motion.div>
          ) : (
            <motion.div
              key="production-content"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <ProductionFlow hideHeader={true} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Final Section: Call to Action or Info */}
      <section style={{ padding: '100px 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="container">
              <div className="glass-card" style={{ 
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(15, 23, 42, 0.6) 100%)',
                  padding: '4rem',
                  borderRadius: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '4rem',
                  flexWrap: 'wrap',
                  border: '1px solid rgba(255,255,255,0.05)'
              }}>
                  <div style={{ flex: 1, minWidth: '300px' }}>
                      <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Nereden Başlamalıyım?</h2>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                          Yazılım mimarisi bir gecede öğrenilmez. Her katmanı, her tasarımı projenizde deneyimleyerek sindirmelisiniz. 
                          ArchAcademy size bu yolda rehberlik eder ama asıl farkı siz kod yazarken yaratacaksınız.
                      </p>
                      <button style={{ 
                        background: 'var(--primary)', 
                        color: 'white', 
                        padding: '1.25rem 2.5rem', 
                        borderRadius: '20px', 
                        border: 'none', 
                        fontWeight: 800,
                        cursor: 'pointer',
                        boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        transition: 'transform 0.2s'
                      }}>
                        Öğrenme Grubuna Katıl <Users size={20} />
                      </button>
                  </div>
                  <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', minWidth: '300px' }}>
                      {[
                          { title: '70+ Ders', sub: 'Küratörlü İçerik', icon: <BookOpen size={20} color="var(--primary)" /> },
                          { title: '20+ Diyagram', sub: 'Görsel Anlatım', icon: <Sparkles size={20} color="var(--primary)" /> },
                          { title: 'Real World', sub: 'Case Studyler', icon: <Trophy size={20} color="var(--primary)" /> },
                          { title: 'Community', sub: 'Dev Destek', icon: <Users size={20} color="var(--primary)" /> }
                      ].map((stat, i) => (
                          <div key={i} className="glass-card" style={{ padding: '2rem 1.5rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.03)' }}>
                              <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>{stat.icon}</div>
                              <div style={{ fontSize: '1.8rem', fontWeight: 950, color: 'white', marginBottom: '4px' }}>{stat.title}</div>
                              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.sub}</div>
                          </div>
                      ))}
                  </div>
              </div>
          </div>
      </section>
    </motion.div>
  );
};

export default RoadmapPage;

