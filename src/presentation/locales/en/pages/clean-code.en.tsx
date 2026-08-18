import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import ArchHero from '../../../components/ArchHero';
import { 
  Sparkles, 
  Code2, 
  Scissors, 
  CheckCircle2, 
  XCircle, 
  Divide, 
  Search, 
  Zap,
  AlignLeft,
  Type,
  AlertTriangle
} from 'lucide-react';

const CleanCodePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bad' | 'good'>('bad');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', color: 'var(--text-primary)' }}>
      
      <ArchHero 
        title="Clean Code"
        subtitle="Art of Craftsmanship"
        description="If you don't want to open your code 6 months later and say 'Which idiot wrote this?', Clean Code is not optional, it is a requirement. Clean code is not a destination; it is a continuous journey."
        badge="Software Craftsmanship"
        color="#10b981"
        illustration={
          <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              style={{ position: 'absolute', width: '280px', height: '280px', border: '2px dashed #10b98122', borderRadius: '50%' }}
            />
             <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: -360 }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              style={{ position: 'absolute', width: '200px', height: '200px', border: '1px solid #10b98144', borderRadius: '30%' }}
            />
            <div className="glass-card" style={{ padding: '2.5rem', borderRadius: '32px', background: 'rgba(16, 185, 129, 0.1)', position: 'relative', zIndex: 2 }}>
               <motion.div
                 animate={{ y: [0, -10, 0] }}
                 transition={{ repeat: Infinity, duration: 3 }}
               >
                 <Code2 size={80} color="#10b981" />
               </motion.div>
               <motion.div
                 animate={{ scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
                 transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                 style={{ position: 'absolute', top: '10px', right: '10px' }}
               >
                 <Sparkles size={24} color="#10b981" />
               </motion.div>
            </div>
          </div>
        }
        features={[
          { icon: <CheckCircle2 />, title: "Self-Documenting", desc: "Code documenting itself." },
          { icon: <Zap />, title: "Boy-Scout Rule", desc: "Leave it cleaner than you found it." },
          { icon: <AlignLeft />, title: "Standardization", desc: "Common language and rules within team." }
        ]}
      />

      {/* --- PRACTICAL BLOG CONTENT --- */}
      <section style={{ padding: '40px 0 100px' }}>
        <div className="container">
          
          {/* 1. THE BOY SCOUT RULE */}
          <div style={{ marginBottom: '6rem' }}>
             <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <CheckCircle2 color="#10b981" /> Boy Scout Rule
             </h2>
             <div className="glass-card" style={{ padding: '2.5rem', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#e2e8f0', marginBottom: '1.5rem' }}>
                   My favorite Robert C. Martin rule is simple: <b>"Leave the campground cleaner than you found it."</b>
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                   You open a file and you'll fix just one <code>bug</code>. A badly named variable catches your eye.
                   Don't say "Oh, who's going to bother now, tests will break." Fix it. Fix it right then. If every developer cleaned the file they touched a little,
                   technical debt would not exist. No need for big refactoring weeks.
                   Small touches prevent big chaos.
                </p>
             </div>
          </div>

          {/* 2. NAMING CONVENTIONS */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr