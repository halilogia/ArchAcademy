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
    feedback: "Doğru! Varlıklar (Entities) Domain'in kalbidir."
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
    feedback: "Harika! Teknik detaylar Infrastructure'da saklanır."
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
    feedback: "Mükemmel! İş kuralları asla sızmamalıdır."
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

  const handleSuccess = (msg: string = "Harika!") => {
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

  const handleError = (msg: string = "Hatalı Katman!") => {
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
            Mimari <span className="gradient-text">Atölyesi</span>
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
               <h2 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '1rem' }}>Katmanları İnşa Et</h2>
               <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: 1.7, fontSize: '1.05rem' }}>
                 Yazılım mimarisi bir puzzle'dır. Bileşenleri doğru katmanlara sürükleyin, karmaşıklığı yönetin ve projenin "Usta Mimarı" olduğunuzu kanıtlayın.
               </p>
               <button onClick={() => setGameStatus('playing')} style={{ 
                 padding: '1.2rem 3.5rem', background: '#6366f1', color: 'white', border: 'none', borderRadius: '14px', 
                 fontSize: '1.1rem', fontWeight: 900, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.8rem',
                 boxShadow: '0 15px 30px rgba(99, 102, 241, 0.25)', transition: 'transform 0.2s'
               }}
               onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
               onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
               >
                 <Play size={22} fill="white" /> BAŞLA
               </button>
            </motion.div>
          )}

          {/* GAMEPLAY AREA */}
          {gameStatus === 'playing' && (
            <motion.div 
              key="game"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card" 
              style={{ maxWidth: '850px', margin: '0 auto', minHeight: '550px', padding: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', borderRadius: '32px' }}
            >
               
               {/* TYPE 1: SORTER */}
               {currentLevel.type === 'sorter' && (
                 <div style={{ textAlign: 'center', width: '100%' }}>
                    <motion.div 
                      key={currentLevelIndex}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ background: 'rgba(255,255,255,0.02)', padding: '2rem', borderRadius: '20px', margin: '0 auto 3.5rem', display: 'inline-flex', alignItems: 'center', gap: '1.2rem', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                       <div style={{ color: '#10b981' }}>{currentLevel.icon}</div>
                       <span style={{ fontWeight: 800, fontSize: '1.6rem', letterSpacing: '-0.5px' }}>{currentLevel.question}</span>
                    </motion.div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem', width: '100%' }}>
                       {currentLevel.options && currentLevel.options.map((opt: any) => (
                         <button key={opt.id} onClick={() => opt.correct ? handleSuccess(currentLevel.feedback) : handleError()} 
                           style={{ padding: '1.8rem 1rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)', color: '#94a3b8', cursor: 'pointer', fontSize: '1rem', fontWeight: 800, transition: 'all 0.3s' }}
                           onMouseEnter={(e) => {
                             e.currentTarget.style.borderColor = '#6366f1';
                             e.currentTarget.style.color = 'white';
                             e.currentTarget.style.background = 'rgba(99, 102, 241, 0.05)';
                           }}
                           onMouseLeave={(e) => {
                             e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                             e.currentTarget.style.color = '#94a3b8';
                             e.currentTarget.style.background = 'rgba(255,255,255,0.01)';
                           }}
                         >
                           {opt.label}
                         </button>
                       ))}
                    </div>
                 </div>
               )}

               {/* TYPE 3: FOLDER (DRAG DROP) */}
               {currentLevel.type === 'folder' && (
                  <div style={{ textAlign: 'center', width: '100%', position: 'relative' }}>
                     <h3 style={{ marginBottom: '0.8rem', fontSize: '1.6rem', fontWeight: 900 }}>Dosyayı Sınıflandır</h3>
                     <p style={{ color: '#64748b', marginBottom: '3.5rem', fontSize: '0.95rem' }}>Bileşeni ilgili mimari katman klasörüne sürükleyin.</p>
                     
                     <div style={{ height: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '3.5rem' }}>
                        <motion.div
                           key={currentLevelIndex}
                           drag
                           dragSnapToOrigin={true}
                           dragConstraints={{ left: -300, right: 300, top: -100, bottom: 100 }}
                           dragElastic={0.2}
                           whileDrag={{ scale: 1.1, cursor: 'grabbing', filter: 'drop-shadow(0 0 15px rgba(99, 102, 241, 0.3))' }}
                           onDragEnd={(e, info) => {
                              const x = info.offset.x;
                              const y = info.offset.y;
                              if (y > 40) { 
                                 let chosenIndex = -1;
                                 if (x < -130) chosenIndex = 0;
                                 else if (x > 130) chosenIndex = 2;
                                 else chosenIndex = 1;
                                 
                                 if(chosenIndex !== -1 && currentLevel.folders && currentLevel.folders[chosenIndex]) {
                                    if(currentLevel.folders[chosenIndex].correct) handleSuccess("Doğru Yerleşim!");
                                    else handleError();
                                 }
                              }
                           }}
                           style={{ 
                             background: 'rgba(99, 102, 241, 0.08)', padding: '1.2rem 2.2rem', borderRadius: '18px', border: '2px solid #6366f1', 
                             display: 'inline-flex', alignItems: 'center', gap: '0.8rem', cursor: 'grab', 
                             position: 'relative', zIndex: 10, backdropFilter: 'blur(10px)'
                           }}
                        >
                           <FileCode size={24} color="#6366f1" />
                           <span style={{ fontWeight: 900, fontSize: '1.1rem', color: 'white' }}>{currentLevel.file}</span>
                        </motion.div>
                     </div>

                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                        {currentLevel.folders && currentLevel.folders.map((f: any, i: number) => (
                           <div key={i} style={{ border: '2px dashed rgba(255,255,255,0.08)', borderRadius: '20px', padding: '2.5rem 1rem', background: 'rgba(255,255,255,0.01)' }}>
                              <Folder size={32} color="#334155" style={{ marginBottom: '0.8rem' }} />
                              <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#475569', fontWeight: 700 }}>{f.name}</div>
                           </div>
                        ))}
                     </div>
                  </div>
               )}

               {/* REFINED FEEDBACK OVERLAY */}
               <AnimatePresence>
                  {feedback.status && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8, x: '-50%', y: '-40%' }} 
                      animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }} 
                      exit={{ opacity: 0, scale: 0.8, x: '-50%', y: '-60%' }}
                      style={{ 
                        position: 'fixed', top: '50%', left: '50%',
                        padding: '3rem 4rem', borderRadius: '30px', zIndex: 9999,
                        background: feedback.status === 'success' ? 'rgba(5, 150, 105, 0.98)' : 'rgba(220, 38, 38, 0.98)',
                        color: 'white', fontWeight: 900, fontSize: '2rem', boxShadow: '0 40px 100px rgba(0,0,0,0.7)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', backdropFilter: 'blur(15px)',
                        minWidth: '400px', border: '1px solid rgba(255,255,255,0.2)'
                      }}
                    >
                      {feedback.status === 'success' ? <CheckCircle2 size={60} /> : <XCircle size={60} />}
                      <span>{feedback.msg}</span>
                    </motion.div>
                  )}
               </AnimatePresence>

            </motion.div>
          )}

          {/* FINISHED SCREEN */}
          {gameStatus === 'finished' && (
            <motion.div 
              key="finished"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card" 
              style={{ maxWidth: '650px', margin: '0 auto', textAlign: 'center', padding: '4rem 2rem', borderRadius: '32px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(2, 6, 23, 0.9) 100%)' }}
            >
               <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <Trophy size={80} color="#fbbf24" style={{ marginBottom: '1.5rem', filter: 'drop-shadow(0 0 25px rgba(251, 191, 36, 0.5))' }} />
               </motion.div>
               <h2 style={{ fontSize: '3rem', fontWeight: 950, marginBottom: '0.8rem', letterSpacing: '-1.5px' }}>Usta Mimar!</h2>
               <p style={{ fontSize: '1.3rem', marginBottom: '3.5rem', color: '#10b981', fontWeight: 800 }}>Puanın: {score}</p>
               <button onClick={() => { setGameStatus('intro'); setCurrentLevelIndex(0); setScore(0); }} style={{ 
                 padding: '1.1rem 3rem', background: '#6366f1', color: 'white', border: 'none', borderRadius: '14px', 
                 fontWeight: 900, cursor: 'pointer', fontSize: '1rem'
               }}>
                 TEKRAR DENE
               </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default WorkshopPage;
