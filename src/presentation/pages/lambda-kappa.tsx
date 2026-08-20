import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Database, Zap, GitMerge, Server } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { LambdaKappaOverviewTab } from '../components/lambdakappa/LambdaKappaOverviewTab';
import { LambdaServingSimTab } from '../components/lambdakappa/LambdaServingSimTab';
import { KappaReplaySimTab } from '../components/lambdakappa/KappaReplaySimTab';

export interface DataParticle {
  id: number;
  type: 'hot' | 'cold';
  x: number;
  y: number;
}

const LambdaKappaPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'overview' | 'lambda-sim' | 'kappa-sim'>('overview');
  const scrollToSection = (id: 'overview' | 'lambda-sim' | 'kappa-sim') => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const [particles, setParticles] = useState<DataParticle[]>([]);

  useEffect(() => {
    if (activeTab === 'overview') {
      const interval = setInterval(() => {
        if (Math.random() > 0.6) {
          const id = Date.now();
          const type = Math.random() > 0.5 ? 'hot' : 'cold';
          setParticles(prev => [...prev, { id, type, x: 0, y: 0 }]);
          setTimeout(() => setParticles(prev => prev.filter(p => p.id !== id)), 2500);
        }
      }, 600);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  const heroIllustration = (
    <div style={{ position: 'relative', width: '350px', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 20 }}>
        <div style={{ background: '#0f172a', padding: '5px', borderRadius: '8px', border: '1px solid #06b6d4' }}>
          <Server color="#06b6d4" size={24} />
        </div>
        <span style={{ fontSize: '0.7rem', color: '#06b6d4', fontWeight: 800, marginTop: '4px' }}>SOURCE</span>
      </div>

      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        {/* Batch Path (Top Curve) */}
        <path d="M 50 150 C 100 150, 100 50, 200 50 L 300 120" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
        {/* Speed Path (Bottom Curve) */}
        <path d="M 50 150 C 100 150, 100 250, 200 250 L 300 180" fill="none" stroke="#ec4899" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
      </svg>

      {/* Moving Particles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{ duration: 2, ease: 'linear' }}
          style={{
            position: 'absolute', 
            width: '10px', 
            height: '10px', 
            borderRadius: '50%', 
            background: p.type === 'hot' ? '#ec4899' : '#06b6d4',
            boxShadow: `0 0 10px ${p.type === 'hot' ? '#ec4899' : '#06b6d4'}`,
            offsetPath: p.type === 'hot' ? 'path("M 50 150 C 100 150, 100 250, 200 250 L 300 180")' : 'path("M 50 150 C 100 150, 100 50, 200 50 L 300 120")',
            zIndex: 10
          }}
        />
      ))}
    </div>
  );

  return (
    <>
      <SEO
        title={isEn ? "Lambda vs Kappa Big Data Architectures | ArchAcademy" : "Lambda ve Kappa Büyük Veri Mimarileri | ArchAcademy"}
        description={isEn 
          ? "Master Big Data processing architectures: Lambda (Batch + Speed + Serving) vs Kappa (Stream-Only Replay) with interactive simulations." 
          : "Büyük Veri işleme mimarileri: Lambda (Batch ve Speed katmanları) ve Kappa (Saf Stream ve Kafka Replay) karşılaştırmalı simülatörü."
        }
        keywords="lambda architecture, kappa architecture, big data, nathan marz, jay kreps, flink, spark, kafka replay"
        canonicalUrl="/lambda-kappa"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <ArchHero 
          title="Lambda & Kappa"
          subtitle="Big Data Architectures"
          description={isEn 
            ? "Two powerhouse strategies engineered to tame massive data oceans. The fault-tolerant precision of Batch, or the real-time velocity of Stream? Or unifying both?" 
            : "Devasa veri okyanuslarını işlemek için geliştirilen iki dev strateji. 'Batch' güvenliği mi, 'Stream' hızı mı? Yoksa ikisi birden mi?"
          }
          badge="Processing Patterns"
          color="#06b6d4"
          illustration={heroIllustration}
          features={[
            { 
              icon: <Database />, 
              title: isEn ? 'Batch Processing' : 'Toplu İşleme (Batch)', 
              desc: isEn ? 'High-throughput immutable batch processing across historical datasets (Hadoop/Spark).' : 'Veriyi biriktirip gece yarısı toplu işleme (Hadoop/Spark).' 
            },
            { 
              icon: <Zap />, 
              title: isEn ? 'Stream Processing' : 'Akış İşleme (Stream)', 
              desc: isEn ? 'Low-latency in-flight event transformations (Apache Kafka / Apache Flink).' : 'Veriyi oluştuğu an havada yakalayıp işleme (Kafka/Flink).' 
            },
            { 
              icon: <GitMerge />, 
              title: isEn ? 'Hybrid Architectures' : 'Hibrit Mimariler', 
              desc: isEn ? 'Synthesizing batch accuracy and real-time responsiveness.' : 'Lambda ve Kappa ile iki dünyanın en iyisini birleştirme.' 
            }
          ]}
        >
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap',
            position: 'sticky',
            top: '80px',
            zIndex: 30 }}>
            {[
              { id: 'overview', label: isEn ? 'Overview' : 'Genel Bakış', color: '#06b6d4' },
              { id: 'lambda-sim', label: isEn ? 'Lambda Serving Sim' : 'Lambda Simülasyonu', color: '#6366f1' },
              { id: 'kappa-sim', label: isEn ? 'Kappa Replay Sim' : 'Kappa Simülasyonu', color: '#06b6d4' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => scrollToSection(tab.id as any)}
                style={{ 
                  padding: '0.8rem 1.5rem', 
                  borderRadius: '12px', 
                  background: activeTab === tab.id ? tab.color : 'rgba(255,255,255,0.05)', 
                  color: 'white', 
                  border: 'none', 
                  cursor: 'pointer', 
                  fontWeight: 700, 
                  transition: 'all 0.3s' 
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </ArchHero>

        <div className="container" style={{ marginTop: '3rem', paddingBottom: '5rem' }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
          <div id="overview" style={{ scrollMarginTop: "100px" }}>
            <LambdaKappaOverviewTab />
          </div>
          <div id="lambda-sim" style={{ scrollMarginTop: "100px" }}>
            <LambdaServingSimTab />
          </div>
          <div id="kappa-sim" style={{ scrollMarginTop: "100px" }}>
            <KappaReplaySimTab />
          </div>
        </div>
        </div>

        {/* Big Data Literature Section */}
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
                {isEn ? "Big Data Literature" : "Büyük Veri Literatürü"}
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                {isEn 
                  ? "Explore the original papers by Nathan Marz (creator of Lambda Architecture) and Jay Kreps (Kafka & Kappa Architecture)." 
                  : "Lambda mimarisinin yaratıcısı Nathan Marz ve Kappa mimarisini popülerleştiren Jay Kreps'in temel yazılarını inceleyin."
                }
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap',
            position: 'sticky',
            top: '80px',
            zIndex: 30 }}>
                <a 
                  href="https://nathanmarz.com/blog/how-to-beat-the-cap-theorem.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '8px', 
                    background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', 
                    padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                    border: '1px solid rgba(99, 102, 241, 0.2)', transition: 'all 0.2s'
                  }}
                >
                  Lambda Architecture (Nathan Marz) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
                <a 
                  href="https://www.oreilly.com/radar/questioning-the-lambda-architecture/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '8px', 
                    background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee', 
                    padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                    border: '1px solid rgba(6, 182, 212, 0.2)', transition: 'all 0.2s'
                  }}
                >
                  Kappa Architecture (Jay Kreps) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default LambdaKappaPage;
