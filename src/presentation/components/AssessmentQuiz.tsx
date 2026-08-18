import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Trophy, RefreshCw, Zap } from 'lucide-react';
import { useAssessmentQuiz } from '../hooks/useAssessmentQuiz';

const AssessmentQuiz: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const {
    questions,
    currentQIndex,
    currentQ,
    selectedOption,
    isCompleted,
    result,
    handleSelect,
    handleNext,
    handleRestart
  } = useAssessmentQuiz(isEn);

  return (
    <div className="container" style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '80px' }}>
      {!isCompleted ? (
        <motion.div
          key={currentQ.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="glass-card"
          style={{ padding: '3rem', borderTop: '4px solid var(--primary)' }}
        >
          {/* Progress Indicator */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {isEn ? `SCENARIO ${currentQIndex + 1} OF ${questions.length}` : `SENARYO ${currentQIndex + 1} / ${questions.length}`}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: '100px' }}>
              {currentQ.category}
            </span>
          </div>

          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
            {isEn ? currentQ.title.en : currentQ.title.tr}
          </h2>

          <div style={{
            background: 'rgba(59, 130, 246, 0.05)',
            borderLeft: '4px solid var(--primary)',
            padding: '1.5rem',
            borderRadius: '0 16px 16px 0',
            marginBottom: '2.5rem',
            lineHeight: 1.7,
            color: '#cbd5e1',
            fontSize: '1.05rem'
          }}>
            {isEn ? currentQ.scenario.en : currentQ.scenario.tr}
          </div>

          {/* Options List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === opt;
              return (
                <motion.button
                  key={idx}
                  onClick={() => handleSelect(opt)}
                  whileHover={!selectedOption ? { scale: 1.01 } : {}}
                  style={{
                    padding: '1.4rem',
                    borderRadius: '16px',
                    textAlign: 'left',
                    background: isSelected ? 'rgba(59, 130, 246, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                    border: isSelected ? '2px solid var(--primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: isSelected ? 'white' : 'var(--text-secondary)',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: selectedOption ? 'default' : 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: isSelected ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                    color: isSelected ? 'white' : 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    flexShrink: 0
                  }}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span style={{ fontSize: '1rem', lineHeight: 1.5 }}>
                    {isEn ? opt.text.en : opt.text.tr}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Guru Feedback HUD (After Selection) */}
          <AnimatePresence>
            {selectedOption && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: 'rgba(16, 185, 129, 0.08)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  marginBottom: '2rem'
                }}
              >
                <div style={{ color: '#10b981', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Zap size={18} /> {isEn ? "GURU FEEDBACK:" : "GURU GERİ BİLDİRİMİ:"}
                </div>
                <p style={{ color: '#e2e8f0', margin: '0 0 1rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {isEn ? selectedOption.feedback.en : selectedOption.feedback.tr}
                </p>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8', borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '0.75rem' }}>
                  <strong style={{ color: '#60a5fa' }}>{isEn ? "💡 Interview Tip: " : "💡 Mülakat İpucu: "}</strong>
                  {isEn ? selectedOption.interviewTip.en : selectedOption.interviewTip.tr}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Next Button */}
          {selectedOption && (
            <div style={{ textAlign: 'right' }}>
              <button
                onClick={handleNext}
                style={{
                  background: 'var(--primary)',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '14px',
                  fontWeight: 800,
                  fontSize: '1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)'
                }}
              >
                {currentQIndex + 1 < questions.length 
                  ? (isEn ? "Next Scenario →" : "Sonraki Senaryo →") 
                  : (isEn ? "View Evaluation Report 🏆" : "Değerlendirme Raporunu Gör 🏆")
                }
              </button>
            </div>
          )}
        </motion.div>
      ) : (
        /* Completed Report Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card"
          style={{ padding: '3.5rem', textAlign: 'center', borderTop: `5px solid ${result?.color}` }}
        >
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '24px',
            background: `${result?.color}20`,
            color: result?.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
          }}>
            <Trophy size={40} />
          </div>

          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: result?.color, letterSpacing: '2px', textTransform: 'uppercase' }}>
            {result?.badge}
          </span>

          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'white', margin: '0.5rem 0 1.5rem' }}>
            {result?.title}
          </h2>

          <p style={{ color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto 2.5rem', fontSize: '1.1rem', lineHeight: 1.8 }}>
            {result?.desc}
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={handleRestart}
              style={{
                background: 'rgba(255,255,255,0.05)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: '1rem 2rem',
                borderRadius: '14px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <RefreshCw size={18} /> {isEn ? "Restart Simulator" : "Simülasyonu Yeniden Başlat"}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AssessmentQuiz;
