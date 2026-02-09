import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Library,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Command,
  Milestone,
  Monitor,
  Database,
  Cloud,
  Scale,
  Target
} from 'lucide-react';
import HomeHero from '../components/HomeHero';

const FeatureCard = ({ title, icon, desc, path, color, label }: any) => (
  <Link to={path} style={{ textDecoration: 'none', color: 'inherit' }}>
    <motion.div
      whileHover={{ y: -12, scale: 1.02 }}
      className="glass-card"
      style={{
        height: '100%',
        padding: '2.5rem',
        border: '1px solid var(--glass-border)',
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(135deg, rgba(255,255,255,0.02) 0%, ${color}05 100%)`
      }}
    >
      <div style={{
        position: 'absolute',
        top: '1.5rem',
        right: '1.5rem',
        background: `${color}20`,
        color: color,
        padding: '4px 12px',
        borderRadius: '100px',
        fontSize: '0.7rem',
        fontWeight: 800,
        letterSpacing: '1px'
      }}>
        {label}
      </div>
      <div style={{
        width: '56px',
        height: '56px',
        background: `${color}15`,
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: color,
        marginBottom: '1.5rem'
      }}>
        {React.cloneElement(icon, { size: 28 })}
      </div>
      <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.8rem', color: 'white' }}>{title}</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.9rem' }}>{desc}</p>

      <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '8px', color: color, fontWeight: 700, fontSize: '0.8rem' }}>
        Keşfet <ArrowUpRight size={16} />
      </div>
    </motion.div>
  </Link>
);

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)' }}
    >
      <HomeHero />

      {/* --- THE MASTERPIECE SECTION (LEAN CLEAN) --- */}
      <section style={{ padding: '80px 0 40px', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card"
            style={{
              background: 'linear-gradient(135deg, rgba(132, 204, 22, 0.1) 0%, rgba(15, 23, 42, 0.9) 100%)',
              padding: '4rem',
              borderRadius: '60px',
              border: '2px solid rgba(132, 204, 22, 0.2)',
              display: 'grid',
              gridTemplateColumns: 'minmax(300px, 1.2fr) 1fr',
              gap: '4rem',
              alignItems: 'center',
              boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 0 50px rgba(132, 204, 22, 0.05)'
            }}
          >
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(132, 204, 22, 0.15)',
                color: '#84cc16',
                padding: '8px 16px',
                borderRadius: '100px',
                fontSize: '0.75rem',
                fontWeight: 900,
                marginBottom: '1.5rem',
                letterSpacing: '1px'
              }}>
                <Sparkles size={14} /> USER CHOICE: THE MASTERPIECE
              </div>
              <h2 style={{ fontSize: '4.5rem', fontWeight: 950, color: 'white', marginBottom: '1.5rem', lineHeight: 1, letterSpacing: '-3px' }}>
                Lean Clean <br />
                <span style={{ color: '#84cc16' }}>Architecture</span>
              </h2>
              <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '3rem', maxWidth: '600px' }}>
                Gereksiz katmanlardan ve dosya kalabalığından arındırılmış, pragmatik ve yüksek performanslı bir mimari yaklaşım.
              </p>
              <Link to="/lean-architecture" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(132, 204, 22, 0.2)' }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '1.5rem 3rem',
                    background: '#84cc16',
                    color: '#0f172a',
                    border: 'none',
                    borderRadius: '24px',
                    fontWeight: 950,
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.3s'
                  }}
                >
                  BAŞYAPITI KEŞFET <ArrowUpRight size={24} />
                </motion.button>
              </Link>
            </div>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: '350px',
                height: '350px',
                borderRadius: '50px',
                background: 'rgba(132, 204, 22, 0.03)',
                border: '1px solid rgba(132, 204, 22, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  style={{ position: 'absolute', inset: '30px', border: '2px dashed rgba(132, 204, 22, 0.15)', borderRadius: '50%' }}
                />
                <Target size={150} color="#84cc16" strokeWidth={1} style={{ opacity: 0.8 }} />
                <div style={{ position: 'absolute', top: '-10px', right: '-10px', background: '#84cc16', color: '#0f172a', padding: '12px 24px', borderRadius: '100px', fontWeight: 950, fontSize: '0.8rem', boxShadow: '0 10px 30px rgba(132, 204, 22, 0.3)' }}>
                  %100 PRAGMATİK
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- CORE ECOSYSTEM SECTION --- */}
      <section style={{ padding: '80px 0', position: 'relative' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-2px' }}>
                Mimari Hub
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '1.5rem auto' }}>
                Yazılımın 5 farklı boyutunu keşfedin. Her biri kendi derinliğine sahip, birbirine bağlı evrenler.
              </p>
            </motion.div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            <FeatureCard
              title="Code Org. & Patterns"
              icon={<Library />}
              desc="Microservices, DDD, Clean Arch ve MVC gibi kod organizasyon desenleri."
              path="/catalog"
              color="#3b82f6"
              label="CORE"
            />
            <FeatureCard
              title="Visual Architecture"
              icon={<Monitor />}
              desc="Design Systems, Atomic Design, Micro-Frontends ve görsel inşa teknikleri."
              path="/ui-catalog"
              color="#0ea5e9"
              label="VISUAL"
            />
            <FeatureCard
              title="Data & AI"
              icon={<Database />}
              desc="Big Data, RAG, AI Ajanları ve yoğun veri işleme modelleri."
              path="/data-ai-catalog"
              color="#8b5cf6"
              label="INTELLIGENCE"
            />
            <FeatureCard
              title="Cloud & DevOps"
              icon={<Cloud />}
              desc="Kubernetes, GitOps, Serverless ve ölçeklenebilir altyapı mimarileri."
              path="/cloud-catalog"
              color="#f97316"
              label="INFRA"
            />
            <FeatureCard
              title="Disiplin Matrisi"
              icon={<Scale />}
              desc="SOLID, TDD, Clean Code gibi yazılım mühendisliği prensipleri."
              path="/discipline-catalog"
              color="#10b981"
              label="PRINCIPLES"
            />
          </div>
        </div>
      </section>

      {/* --- QUICK STATS SECTION --- */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.01)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
            {[
              { val: '70+', lab: 'Mimari Konu' },
              { val: '5', lab: 'Ana Evren' },
              { val: '100%', lab: 'Open Source' },
              { val: '∞', lab: 'Öğrenme Potansiyeli' }
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', fontWeight: 950, color: 'white', marginBottom: '0.5rem' }}>{s.val}</div>
                <div style={{ color: 'var(--primary)', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px' }}>{s.lab}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS / ROADMAP TEASER --- */}
      <section style={{ padding: '120px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--primary)', fontWeight: 800, marginBottom: '1.5rem' }}>
                <Milestone size={24} /> YOL HARİTASI
              </div>
              <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '2rem', lineHeight: 1.1 }}>
                Stajyerlikten <br /> <span className="gradient-text">Baş Mimarlığa.</span>
              </h2>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '3rem' }}>
                Yazılım dünyasında kaybolmayın. ArchAcademy, karmaşık konuları adım adım parçalara ayırır.
                Her modül, bir sonrakinin temelini atar ve gerçek dünya projelerinde uygulamanız için sizi hazırlar.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <CheckCircle2 color="#10b981" style={{ flexShrink: 0 }} />
                  <div style={{ fontSize: '0.9rem', color: 'white', fontWeight: 600 }}>Pratik Uygulamalı Kod Örnekleri</div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <CheckCircle2 color="#10b981" style={{ flexShrink: 0 }} />
                  <div style={{ fontSize: '0.9rem', color: 'white', fontWeight: 600 }}>Sektör Standartı Metodolojiler</div>
                </div>
              </div>
              <Link to="/roadmap" style={{ textDecoration: 'none' }}>
                <button style={{ marginTop: '4rem', padding: '1.25rem 3rem', borderRadius: '100px', background: 'white', color: 'black', fontWeight: 900, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  YOL HARİTASINI İNCELE <Sparkles size={18} />
                </button>
              </Link>
            </motion.div>

            <div className="glass-card" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, right: 0, padding: '1rem', color: 'rgba(255,255,255,0.05)' }}>
                <Command size={120} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { step: 1, text: 'Temel prensipleri (SOLID, DRY) kavra.', color: '#3b82f6' },
                  { step: 2, text: 'Monolit mimariden Vertical Slice\'a geç.', color: '#10b981' },
                  { step: 3, text: 'Domain merkezli sistemler (Clean, DDD) kur.', color: '#f59e0b' },
                  { step: 4, text: 'Dağıtık ve Olay-Güdümlü yapıları ölçeklendir.', color: '#8b5cf6' }
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--glass-border)' }}
                  >
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 900 }}>{s.step}</div>
                    <div style={{ fontWeight: 600, color: 'white' }}>{s.text}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ACADEMY CTA --- */}
      <section style={{ padding: '100px 0 160px' }}>
        <div className="container">
          <div className="glass-card" style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
            padding: '6rem',
            textAlign: 'center',
            borderRadius: '60px',
            border: '2px solid rgba(59, 130, 246, 0.2)'
          }}>
            <h2 style={{ fontSize: '4.5rem', marginBottom: '1.5rem', fontWeight: 950, letterSpacing: '-3px', lineHeight: 1 }}>Better Code, <br /> Better Future.</h2>
            <p style={{ maxWidth: '800px', margin: '0 auto 4rem', color: 'var(--text-secondary)', fontSize: '1.3rem', lineHeight: 1.8 }}>
              Bu portal, topluluk tarafından geliştirilen açık kaynaklı bir eğitim projesidir.
              Mimari becerilerinizi sürekli geliştirecek içerikler ve güncellemeler ekliyoruz.
            </p>
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
              <a href="https://github.com/halilogia/ArchAcademy" target="_blank" rel="noopener noreferrer" style={{ padding: '1.25rem 3rem', background: 'white', color: 'black', borderRadius: '24px', fontWeight: 900, textDecoration: 'none', transition: 'all 0.3s', boxShadow: '0 10px 40px rgba(255,255,255,0.1)' }}>GitHub Arşivini Gez</a>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;
