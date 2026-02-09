import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  RefreshCw,
  ChevronRight,
  Info,
  Target,
  Zap,
  Gauge,
  Users,
  Clock,
  Shield,
  HardDrive,
  Layers,
  Brain
} from 'lucide-react';

// CLEAN ARCHITECTURE: Data & Logic separated from UI
import { WIZARD_QUESTIONS, ARCHITECTURES } from '../../infrastructure/ArchitectureData';
import { calculateScores, getSortedResults, calculateConfidence, Answers } from '../../domain/usecases/ArchitectureCalculator';

// Presentation Utils - Restore original icon mapping
const getIcon = (id: string, optionIndex?: number) => {
  const icons: Record<string, any> = {
    domain: [<Target />, <Zap />, <Gauge />, <Zap />],
    team: [<Users />, <Users />, <Users />],
    dependency: [<Shield />, <HardDrive />],
    consistency: [<Shield />, <Zap />],
    boilerplate: [<Layers />, <Zap />],
    ai: [<Brain />, <Sparkles />, <Users />],
    priority: [<Zap />, <Clock />, <Target />]
  };

  const questionIcons = icons[id];
  if (Array.isArray(questionIcons) && optionIndex !== undefined) {
    return React.cloneElement(questionIcons[optionIndex] || <Layers />, { size: 24 });
  }

  // Range questions icons (static for the question)
  const defaults: Record<string, any> = {
    flexibility: <Zap size={24} />,
    horizon: <Clock size={24} />,
  };
  return defaults[id] || <Layers size={24} />;
};

const ArchitectureWizard: React.FC = () => {
  const [step, setStep] = useState(0);
  const [rangeValue, setRangeValue] = useState(5);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResult, setShowResult] = useState(false);

  const handleChoice = (optionIndex: number) => {
    const nextAnswers = { ...answers, [WIZARD_QUESTIONS[step].id]: optionIndex };
    setAnswers(nextAnswers);
    advance(nextAnswers);
  };

  const handleRange = () => {
    const nextAnswers = { ...answers, [WIZARD_QUESTIONS[step].id]: rangeValue };
    setAnswers(nextAnswers);
    advance(nextAnswers);
  };

  const advance = (currentAnswers: Answers) => {
    if (step < WIZARD_QUESTIONS.length - 1) {
      setStep(step + 1);
      setRangeValue(5);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setShowResult(false);
  };

  if (showResult) {
    const scores = calculateScores(answers, WIZARD_QUESTIONS);
    const sorted = getSortedResults(scores);
    const winnerKey = sorted[0].key;
    const runnersUp = sorted.slice(1, 3);
    const result = ARCHITECTURES[winnerKey] || ARCHITECTURES.clean;
    const totalScore = sorted.reduce((a, b) => a + (b.score > 0 ? b.score : 0), 0);
    const confidence = calculateConfidence(sorted);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card"
        style={{ padding: '4rem', textAlign: 'center', maxWidth: '900px', margin: '0 auto', border: `2px solid ${result.color}40`, background: `${result.color}05` }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '10px 20px',
            borderRadius: '100px',
            fontSize: '0.8rem',
            fontWeight: 800,
            color: result.color,
            border: `1px solid ${result.color}40`,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <Sparkles size={14} /> GÜVEN SKORU: %{confidence}
          </div>
        </div>

        <h2 style={{ fontSize: '1rem', color: result.color, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>{result.tag}</h2>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', letterSpacing: '-1px' }}>{result.title}</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem' }}>{result.desc}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '4rem' }}>
          {result.pros.map((pro, i) => (
            <div key={i} className="glass-card" style={{ padding: '1rem', fontSize: '0.85rem', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}>
              {pro}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)', marginBottom: '4rem' }}>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Alternatif Rotalar & Eşleşme Oranları</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {runnersUp.map((runner) => {
              const r = ARCHITECTURES[runner.key];
              if (!r) return null;
              const matchScore = totalScore > 0 ? Math.round((runner.score / totalScore) * 100) : 0;
              return (
                <div key={runner.key} className="glass-card" style={{ textAlign: 'left', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.02)' }}>
                  <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: `${r.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: r.color, fontWeight: 800, fontSize: '0.8rem', border: `1px solid ${r.color}30` }}>
                    %{matchScore}
                  </div>
                  <div>
                    <div style={{ fontSize: '1rem', fontWeight: 700 }}>{r.title}</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>Eşleşme Oranı</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button onClick={reset} style={{ background: result.color, color: 'white', padding: '1.25rem 3rem', borderRadius: '20px', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '1rem', cursor: 'pointer', fontWeight: 800, fontSize: '1.1rem', boxShadow: `0 10px 30px ${result.color}40` }}>
          <RefreshCw size={20} /> Yeniden Analiz Et
        </button>
      </motion.div>
    );
  }

  const currentQuestion = WIZARD_QUESTIONS[step];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Architect's Compass</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Trade-off analizine dayalı derin mimari tespiti.</p>
      </div>

      <div className="glass-card" style={{ padding: '4rem', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem', textAlign: 'center', lineHeight: 1.3 }}>{currentQuestion.title}</h3>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '3.5rem', maxWidth: '600px', margin: '0 auto 3.5rem', lineHeight: 1.6 }}>{currentQuestion.desc}</p>

            {currentQuestion.type === 'choice' && currentQuestion.options ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
                {currentQuestion.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleChoice(i)}
                    className="glass-card"
                    style={{ padding: '2.5rem 2rem', textAlign: 'left', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--glass-border)', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '1.5rem', transition: 'all 0.3s', color: 'white' }}
                  >
                    <div style={{ color: 'var(--primary)', background: 'rgba(59,130,246,0.1)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {getIcon(currentQuestion.id, i)}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                      <span style={{ fontSize: '1.25rem', fontWeight: 600 }}>{opt.text}</span>
                      <ChevronRight size={20} style={{ opacity: 0.3 }} />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div style={{ padding: '2rem 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '1rem' }}>
                  <span>{currentQuestion.leftLabel}</span>
                  <span style={{ color: 'var(--primary)', fontSize: '2.5rem', fontWeight: 800 }}>{rangeValue}</span>
                  <span>{currentQuestion.rightLabel}</span>
                </div>
                <div style={{ position: 'relative', height: '60px', display: 'flex', alignItems: 'center' }}>
                  <input type="range" min="1" max="10" step="1" value={rangeValue} onChange={(e) => setRangeValue(parseInt(e.target.value))} style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--primary)' }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem', justifyContent: 'center' }}>
                  <Info size={14} /> Tercihinizi belirleyin ve butona basın.
                </div>
                <button onClick={handleRange} className="glass-card" style={{ marginTop: '3rem', width: '100%', padding: '1.5rem', background: 'var(--primary)', color: 'white', fontWeight: 800, fontSize: '1.1rem', border: 'none', cursor: 'pointer', boxShadow: '0 10px 30px var(--primary-glow)' }}>
                  Bu Değerle Devam Et
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div style={{ marginTop: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, opacity: 0.4, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            <span>Derinlik Analizi</span>
            <span>{step + 1} / {WIZARD_QUESTIONS.length}</span>
          </div>
          <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
            <motion.div animate={{ width: `${((step + 1) / WIZARD_QUESTIONS.length) * 100}%` }} style={{ height: '100%', background: 'var(--primary)' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureWizard;
