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
import HomeHero from '../../../components/HomeHero';
import SEO from '../../../components/SEO';

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
        Explore <ArrowUpRight size={16} />
      </div>
    </motion.div>
  </Link>
);

const HomePage = () => {
  return (
    <>
      <SEO
        title="Home"
        description="ArchAcademy - A comprehensive platform for software architecture education. Gain in-depth knowledge of Clean Architecture, DDD, Microservices, Event-Driven, and many other architectural patterns."
        keywords="software architecture, clean architecture, ddd, microservices, event-driven, hexagonal architecture, software education, architectural patterns"
        canonicalUrl="/"
      />
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
                A pragmatic, high-performance architectural approach stripped of needless layers and file clutter.
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
                  DISCOVER THE MASTERPIECE <ArrowUpRight size={24} />
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
                  100% PRAGMATIC
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
                Architecture Hub
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '1.5rem auto' }}>
                Discover 5 different dimensions of software. Each one its own depth, interconnected universes.
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
              desc="Code organization patterns such as Microservices, DDD, Clean Architecture, and MVC."