import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hammer, Brain, FolderOpen, CheckCircle2, XCircle, ArrowRight, Layers, ArrowLeftRight, FileCode, Folder, Play, Trophy } from 'lucide-react';

// --- UNIFIED GAME CONTENT ---
// We mix all types of challenges into a single progression path
const masterLevels = [
  // LEVEL 1: SORTER (Basic)
  {
    type: 'sorter',
    question: "User Entity (id, name, email)",
    icon: <Brain size={24} color="#ec4899" />,
    options: [
      { id: 'ui', label: 'Presentation' },
      { id: 'domain', label: 'Domain', correct: true },
      { id: 'infra', label: 'Infrastructure' }
    ],
    feedback: "Doğru! Varlıklar (Entities) Domain'in kalbidir."
  },
  // LEVEL 2: DEPENDENCY (Concept)
  {
    type: 'dependency',
    description: "Veritabanı mı Domain'i bilmeli, yoksa Domain mi Veritabanını?",
    left: "Domain (Use Case)",
    right: "Infrastructure (Database)",
    correctDirection: "left", // Domain <--- Infra
    codeSnippet: `// DOMAIN (Patron)
interface IUserRepository {
  save(user: User): void;
}

// INFRASTRUCTURE (Çalışan)
// Infra, Domain'i 'import' eder ve kurallarına uyar.
import { IUserRepository } from '../domain';

class SqlRepo implements IUserRepository {
  save(user) { db.query(...) }
}`
  },
  // LEVEL 3: FOLDER (Drag & Drop)
  {
    type: 'folder',
    file: "UserController.ts",
    folders: [
      { name: "src/domain", correct: false },
      { name: "src/presentation", correct: true },
      { name: "src/data", correct: false }
    ]
  },
  // LEVEL 4: SORTER
  {
    type: 'sorter',
    question: "SQL Connection String",
    icon: <Layers size={24} color="#f59e0b" />,
    options: [
      { id: 'ui', label: 'Presentation' },
      { id: 'domain', label: 'Domain' },
      { id: 'infra', label: 'Infrastructure', correct: true }
    ],
    feedback: "Harika! Teknik detaylar Infrastructure'da saklanır."
  },
  // LEVEL 5: DEPENDENCY
  {
    type: 'dependency',
    description: "UI katmanı ile İş Kuralları (Domain) arasındaki ilişki nasıldır?",
    left: "Presentation (UI)",
    right: "Domain (Entity)",
    correctDirection: "right", // UI ---> Domain
    codeSnippet: `// PRESENTATION (UI)
import { CreateUserUseCase } from '../domain';

// UI, Domain'i kullanır (Bilmek zorundadır).
const handleSubmit = () => {
  const useCase = new CreateUserUseCase();
  useCase.execute(inputs);
}`
  },
  // LEVEL 6: FOLDER
  {
    type: 'folder',
    file: "MailSenderService.ts",
    folders: [
      { name: "src/infra", correct: true },
      { name: "src/domain", correct: false },
      { name: "src/app", correct: false }
    ]
  }
];

const WorkshopPage = () => {
  const [gameStatus, setGameStatus] = useState<'intro' | 'playing' | 'finished'>('intro');
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ status: 'success' | 'error' | null, msg: string }>({ status: null, msg: '' });
  const [showHint, setShowHint] = useState(false);

  const currentLevel = masterLevels[currentLevelIndex];

  const handleSuccess = (msg: string = "Harika!") => {
    setFeedback({ status: 'success', msg });
    setScore(s => s + 100);
    setTimeout(() => {
      setFeedback({ status: null, msg: '' });
      setShowHint(false); // Reset hint
      if (currentLevelIndex < masterLevels.length - 1) {
        setCurrentLevelIndex(p => p + 1);
      } else {
        setGameStatus('finished');
      }
    }, 1500);
  };

  const handleError = (msg: string = "Yanlış! Tekrar dene.") => {
    setFeedback({ status: 'error', msg });
    setScore(s => Math.max(0, s - 20));
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-dark)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800 }}>Mimari Atölyesi</h1>
          {gameStatus === 'playing' && (
             <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1rem', fontWeight: 700 }}>
                <span style={{ color: '#ec4899' }}>Level {currentLevelIndex + 1}/{masterLevels.length}</span>
                <span style={{ color: '#10b981' }}>Score: {score}</span>
             </div>
          )}
        </div>

        {/* INTRO SCREEN */}
        {gameStatus === 'intro' && (
          <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '4rem' }}>
             <Hammer size={60} color="#ec4899" style={{ marginBottom: '1.5rem' }} />
             <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Hazır mısın?</h2>
             <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: 1.6 }}>
               Karışık bir mimari sınavı seni bekliyor. <br/>
               Katmanları ayır, okları düzelt ve dosyaları yerleştir.
             </p>
             <button onClick={() => setGameStatus('playing')} style={{ 
               padding: '1.2rem 3rem', background: 'var(--primary)', color: 'white', border: 'none', borderRadius: '100px', 
               fontSize: '1.2rem', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.8rem',
               boxShadow: '0 10px 30px var(--primary-glow)'
             }}>
               <Play size={24} fill="white" /> Başla
             </button>
          </div>
        )}

        {/* FINISHED SCREEN */}
        {gameStatus === 'finished' && (
          <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '4rem' }}>
             <Trophy size={80} color="#fbbf24" style={{ marginBottom: '1.5rem', filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.5))' }} />
             <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '0.5rem' }}>TEBRİKLER!</h2>
             <p style={{ fontSize: '1.5rem', marginBottom: '3rem' }}>Skorun: <span style={{ color: '#10b981' }}>{score}</span></p>
             <button onClick={() => { setGameStatus('intro'); setCurrentLevelIndex(0); setScore(0); }} style={{ 
               padding: '1rem 2rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', borderRadius: '12px', 
               fontWeight: 700, cursor: 'pointer'
             }}>
               Tekrar Oyna
             </button>
          </div>
        )}

        {/* GAMEPLAY AREA */}
        {gameStatus === 'playing' && (
          <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto', minHeight: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
             
             {/* TYPE 1: SORTER */}
             {currentLevel.type === 'sorter' && (
               <div style={{ textAlign: 'center', width: '100%' }}>
                  <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '16px', margin: '0 auto 3rem', display: 'inline-flex', alignItems: 'center', gap: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                     {currentLevel.icon}
                     <span style={{ fontWeight: 700, fontSize: '1.3rem' }}>{currentLevel.question}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
                     {currentLevel.options && currentLevel.options.map((opt: any) => (
                       <button key={opt.id} onClick={() => opt.correct ? handleSuccess(currentLevel.feedback) : handleError()} 
                         style={{ padding: '1.5rem', borderRadius: '12px', border: '2px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', color: 'white', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 600, transition: 'all 0.2s' }}
                         onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                         onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                       >
                         {opt.label}
                       </button>
                     ))}
                  </div>
               </div>
             )}

             {/* TYPE 2: DEPENDENCY */}
             {currentLevel.type === 'dependency' && (
                <div style={{ textAlign: 'center', width: '100%' }}>
                   <h3 style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Bağımlılık Yönü Ne Taraf?</h3>
                   <p style={{ marginBottom: '3rem', opacity: 0.7, fontSize: '1.1rem' }}>{currentLevel.description}</p>
                   
                   <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', marginBottom: '3rem' }}>
                      <div style={{ padding: '1.5rem', background: '#0f172a', borderRadius: '12px', border: '1px solid #334155' }}>
                        {currentLevel.left}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                         <button onClick={() => currentLevel.correctDirection === 'left' ? handleSuccess("Doğru Yön!") : handleError("Yanlış Yön!")} 
                           style={{ padding: '0.8rem 1.5rem', background: '#3b82f6', border: 'none', borderRadius: '8px', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
                            <ArrowRight size={20} style={{ transform: 'rotate(180deg)' }} /> SOLA (&lt;)
                         </button>
                         <button onClick={() => currentLevel.correctDirection === 'right' ? handleSuccess("Doğru Yön!") : handleError("Yanlış Yön!")} 
                           style={{ padding: '0.8rem 1.5rem', background: '#3b82f6', border: 'none', borderRadius: '8px', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
                            SAĞA (&gt;) <ArrowRight size={20} />
                         </button>
                      </div>

                      <div style={{ padding: '1.5rem', background: '#0f172a', borderRadius: '12px', border: '1px solid #334155' }}>
                        {currentLevel.right}
                      </div>
                   </div>

                   {/* HINT BUTTON & CONTENT */}
                   {currentLevel.codeSnippet && (
                     <div style={{ marginTop: '2rem' }}>
                        <button 
                          onClick={() => setShowHint(!showHint)}
                          style={{ background: 'transparent', border: '1px solid var(--text-secondary)', color: 'var(--text-secondary)', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem' }}
                        >
                          {showHint ? 'Kodu Gizle' : 'Bu Nasıl Çalışıyor? (Kodu Gör)'}
                        </button>
                        
                        <AnimatePresence>
                          {showHint && (
                            <motion.div 
                              initial={{ opacity: 0, height: 0 }} 
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              style={{ overflow: 'hidden', textAlign: 'left', marginTop: '1rem' }}
                            >
                               <div style={{ background: '#0f172a', padding: '1.5rem', borderRadius: '12px', border: '1px solid #334155', fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.6, whiteSpace: 'pre-wrap', color: '#e2e8f0' }}>
                                  {currentLevel.codeSnippet}
                               </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                     </div>
                   )}
                </div>
             )}

             {/* TYPE 3: FOLDER (DRAG DROP) */}
             {currentLevel.type === 'folder' && (
                <div style={{ textAlign: 'center', width: '100%', position: 'relative' }}>
                   <h3 style={{ marginBottom: '0.5rem' }}>Bu dosyayı nereye koyarsın?</h3>
                   <div style={{ color: '#f59e0b', fontFamily: 'monospace', fontSize: '1.5rem', fontWeight: 700, marginBottom: '3rem' }}>{currentLevel.file}</div>
                   
                   {/* Draggable */}
                   <div style={{ height: '120px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '3rem', zIndex: 10 }}>
                      <motion.div
                         key={currentLevelIndex}
                         drag
                         dragSnapToOrigin={true}
                         dragConstraints={{ left: -300, right: 300, top: -100, bottom: 200 }}
                         dragElastic={0.2}
                         whileDrag={{ scale: 1.1, cursor: 'grabbing' }}
                         onDragEnd={(e, info) => {
                            const x = info.offset.x;
                            const y = info.offset.y;
                            if (y > 50) { 
                               let chosenIndex = -1;
                               if (x < -150) chosenIndex = 0;
                               else if (x > 150) chosenIndex = 2;
                               else chosenIndex = 1;
                               
                               if(chosenIndex !== -1 && currentLevel.folders && currentLevel.folders[chosenIndex]) {
                                  if(currentLevel.folders[chosenIndex].correct) handleSuccess("Dosya yerleşti.");
                                  else handleError("Yanlış klasör.");
                               }
                            }
                         }}
                         style={{ 
                           background: '#1e293b', padding: '1rem 2rem', borderRadius: '12px', border: '2px solid #f59e0b', 
                           display: 'inline-flex', alignItems: 'center', gap: '0.8rem', cursor: 'grab', boxShadow: '0 10px 30px rgba(245, 158, 11, 0.3)',
                           position: 'relative', zIndex: 20
                         }}
                      >
                         <FileCode size={24} color="#f59e0b" />
                         <span style={{ fontWeight: 700 }}>{currentLevel.file}</span>
                      </motion.div>
                   </div>

                   {/* Drop Zones */}
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
                      {currentLevel.folders && currentLevel.folders.map((f: any, i: number) => (
                         <div key={i} style={{ border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '12px', padding: '2rem 1rem', background: 'rgba(255,255,255,0.02)' }}>
                            <Folder size={32} color="#64748b" style={{ marginBottom: '0.5rem' }} />
                            <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#94a3b8' }}>{f.name}</div>
                         </div>
                      ))}
                   </div>
                   <div style={{ position: 'absolute', bottom: '-20px', width: '100%', opacity: 0.3, fontSize: '0.8rem' }}>(Sürükle ve Bırak)</div>
                </div>
             )}

             {/* FEEDBACK OVERLAY */}
             <AnimatePresence>
                {feedback.status && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    style={{ 
                      position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                      padding: '2rem 3rem', borderRadius: '20px', zIndex: 50,
                      background: feedback.status === 'success' ? 'rgba(16, 185, 129, 0.95)' : 'rgba(239, 68, 68, 0.95)',
                      color: 'white', fontWeight: 800, fontSize: '1.5rem', boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', backdropFilter: 'blur(10px)'
                    }}
                  >
                    {feedback.status === 'success' ? <CheckCircle2 size={40} /> : <XCircle size={40} />}
                    {feedback.msg}
                  </motion.div>
                )}
             </AnimatePresence>

          </div>
        )}

      </div>
    </div>
  );
};

export default WorkshopPage;
