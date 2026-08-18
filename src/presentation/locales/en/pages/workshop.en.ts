import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hammer, Brain, FolderOpen, CheckCircle2, XCircle, Layers, FileCode, Folder, Play, Trophy, Sparkles, Code2, ShieldCheck, Zap, Monitor } from 'lucide-react';

// --- CLEANED GAME CONTENT ---
const masterLevels = [
  // LEVEL 1: SORTER (Basic)
  {
    type: 'sorter',
    question: "User Entity (id, name, email)",
    icon: <ShieldCheck size={24} color="#10b981" />,
    options: [
      { id: 'ui', label: 'Presentation' },
      { id: 'domain', label: 'Domain', correct: true },
      { id: 'infra', label: 'Infrastructure' }
    ],
    feedback: "Correct! Entities are the heart of the Domain."
  },
  // LEVEL 2: FOLDER (Logic Focus)
  {
    type: 'folder',
    file: "UserBadge.tsx", // Clearly a UI component
    folders: [
      { name: "src/domain", correct: false },
      { name: "src/presentation", correct: true },
      { name: "src/infra", correct: false }
    ]
  },
  // LEVEL 3: SORTER (Technical Details)
  {
    type: 'sorter',
    question: "SQL Connection String / API Keys",
    icon: <Layers size={24} color="#f59e0b" />,
    options: [
      { id: 'ui', label: 'Presentation' },
      { id: 'domain', label: 'Domain' },
      { id: 'infra', label: 'Infrastructure', correct: true }
    ],
    feedback: "Great! Technical details are stored in Infrastructure."
  },
  // LEVEL 4: FOLDER (Infrastructure Focus)
  {
    type: 'folder',
    file: "UserController.ts", 
    folders: [
      { name: "src/domain", correct: false },
      { name: "src/presentation", correct: false },
      { name: "src/infrastructure", correct: true }
    ]
  },
  // LEVEL 5: SORTER (Critical Logic)
  {
    type: 'sorter',
    question: "ValidateBusinessRules(user)",
    icon: <Zap size={24} color="#3b82f6" />,
    options: [
      { id: 'ui', label: 'Presentation' },
      { id: 'domain', label: 'Domain', correct: true },
      { id: 'infra', label: 'Infrastructure' }
    ],
    feedback: "Excellent! Business rules must never leak."
  },
  // LEVEL 6: FOLDER (Adapters)
  {
    type: 'folder',
    file: "PostgreSQLAdapter.ts",
    folders: [
      { name: "src/infra", correct: true },
      { name: "src/domain", correct: false },
      { name: "src/presentation", correct: false }
    ]
  }
];

const WorkshopPage = () => {
  const [gameStatus, setGameStatus] = useState<'intro' | 'playing' | 'finished'>('intro');
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ status: 'success' | 'error' | null, msg: string }>({ status: null, msg: '' });

  const currentLevel = masterLevels[currentLevelIndex];

  const handleSuccess = (msg: string = "Great!") => {
    setFeedback({ status: 'success', msg });
    setScore(s => s + 100);
    setTimeout(() => {
      setFeedback({ status: null, msg: '' });
      if (currentLevelIndex < masterLevels.length - 1) {
        setCurrentLevelIndex(p => p + 1);
      } else {
        setGameStatus('finished');
      }
    }, 1200);
  };

  const handleError = (msg: string = "Wrong Layer!") => {
    setFeedback({ status: 'error', msg });
    setScore(s => Math.max(0, s - 20));
    setTimeout(() => setFeedback({ status: null, msg: '' }), 1000);
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: '#020617', color: 'white', overflow: 'hidden' }}>
      <div className="container">
        
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(99, 102, 241, 0.1)', padding: '0.4rem 1rem', borderRadius: '100px', color: '#6366f1', fontWeight: 800, fontSize: '0.75rem', marginBottom: '1rem', border: '1px solid rgba(99, 102, 241, 0.3)' }}
          >
            <Sparkles size={14} /> ARCHITECTURE CHALLENGE
          </motion.div>
          <h1 style={{ fontSize: '3rem', fontWeight: 950, letterSpacing: '-1.5px', margin: 0 }}>
            Architecture <span className="gradient-text">Workshop</span>
          </h1>
          {gameStatus === 'playing' && (
             <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem' }}>
                <div style={{ padding: '0.4rem 1.2rem', borderRadius: '100px', background: 'rgba(236, 72, 153, 0.05)', border: '1px solid rgba(236, 72, 153, 0.2)', color: '#ec4899', fontSize: '0.8rem', fontWeight: 700 }}>
                  LVL: {currentLevelIndex + 1}/{masterLevels.length}
                </div>
                <div style={{ padding: '0.4rem 1.2rem', borderRadius: '100px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', color: '#10b981', fontSize: '0.8rem', fontWeight: 700 }}>
                  SCORE: {score}
                </div>
             </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {/* INTRO SCREEN */}
          {gameStatus === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card" 
              style={{ maxWidth: '650px', margin: '0 auto', textAlign: 'center', padding: '4rem 2rem', borderRadius: '32px', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(2, 6, 23, 0.9) 100%)' }}
            >
               <div style={{ width: '70px', height: '70px', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#6366f1' }}>
                 <Hammer size={32} />
               </div>
               <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '1rem' }}>Build the Layers</h2>
               <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: 1.7, fontSize: '1.05rem' }}>
                 Software architecture is a puzzle. Drag components into the correct layers, manage complexity, and prove you are the project's "Master Architect".
               </p>
                <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center' }}>
                  <button onClick={() => setGameStatus('playing')} style={{ 
                    padding: '1.1rem