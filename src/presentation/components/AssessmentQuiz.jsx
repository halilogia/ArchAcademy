import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Trophy, Target, ArrowRight, RefreshCw, Star, Zap, Layout, Code2, Users } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

const questions = [
  {
    id: 1,
    title: "Startup Rüyası",
    scenario: "Bir startup için 2 hafta içinde MVP çıkarman gerekiyor. Ekip 3 kişi ve bütçe kısıtlı. Hangi mimari yaklaşımla başlarsın?",
    options: [
      { text: "Detailed Clean Architecture & DDD", score: { type: 'Classic', value: 5 }, feedback: "Harika ama çok yavaş kalabilirsin!" },
      { text: "Monolith & Vertical Slice", score: { type: 'Pragmatic', value: 10 }, feedback: "Mantıklı! Hız şu an her şeydir." },
      { text: "Microservices with EDA", score: { type: 'OverKiller', value: 10 }, feedback: "Dikkat! Altyapı maliyeti seni bitirebilir." }
    ]
  },
  {
    id: 2,
    title: "Bankacılık Devrimi",
    scenario: "Dev bir banka için para transferi modülü yazıyorsun. Veri tutarlılığı kritik ve iş kuralları çok karmaşık. Kalbin nerede atar?",
    options: [
      { text: "N-Tier (Standard Layered)", score: { type: 'Legacy', value: 5 }, feedback: "Güvenli ama spagetti riski yüksek." },
      { text: "Domain-Driven Design (DDD)", score: { type: 'Architect', value: 10 }, feedback: "Kesinlikle! Karmaşıklığı yönetmenin tek yolu." },
      { text: "Simple CRUD with Active Record", score: { type: 'Junior', value: 2 }, feedback: "Riskli! İş kuralları kaybolup gidebilir." }
    ]
  },
  {
    id: 3,
    title: "Teknoloji Bağımsızlığı",
    scenario: "Müşterin 'Bugün MongoDB kullanıyoruz ama yarın PostgreSQL'e geçebiliriz' diyor. Kodunu buna nasıl hazırlarsın?",
    options: [
      { text: "Hexagonal (Ports & Adapters)", score: { type: 'Architect', value: 10 }, feedback: "Tam isabet! Dış dünyayı birer eklentiye çevirirsin." },
      { text: "Direct Database Calls in UI", score: { type: 'Chaos', value: 0 }, feedback: "Felaket senaryosu! Bağımlılık içinde boğulursun." },
      { text: "Repository Pattern with Interface", score: { type: 'Specialist', value: 7 }, feedback: "Güzel bir başlangıç, doğru yoldasın." }
    ]
  },
  {
    id: 1,
    id: 4,
    title: "Milyonluk Trafik",
    scenario: "Amazon benzeri bir sistemde anlık milyonlarca sipariş geliyor. Sistemlerin birbiriyle 'gecikmesiz' ama 'bağımsız' konuşması lazım.",
    options: [
      { text: "Synchronous REST API calls", score: { type: 'Bottleneck', value: 3 }, feedback: "Zincirleme çöküş (Cascading Failure) yaşayabilirsin." },
      { text: "Event-Driven Architecture (EDA)", score: { type: 'Architect', value: 10 }, feedback: "Ustalık işi! Asenkron güç seninle." },
      { text: "Shared Database for all services", score: { type: 'Legacy', value: 2 }, feedback: "Veritabanı en büyük darboğazın olur." }
    ]
  },
  {
    id: 5,
    title: "AI ile Çalışmak",
    scenario: "Cursor veya ChatGPT gibi bir AI asistanı ile en verimli şekilde çalışmak istiyorsun. Hangi yapı AI'nın daha az hata yapmasını sağlar?",
    options: [
      { text: "Büyük God-Object dosyalar", score: { type: 'Legacy', value: 0 }, feedback: "AI burada halüsinasyon görür." },
      { text: "Clean Arch (Small, pure logic files)", score: { type: 'Modernist', value: 10 }, feedback: "AI'nın en sevdiği yemek! Net bağlam, sıfır hata." },
      { text: "Spagetti Code with lots of comments", score: { type: 'Hopeful', value: 3 }, feedback: "Yorumlar yardımcı olur ama yapı her şeydir." }
    ]
  }
];

const AssessmentQuiz = () => {
  const { updateQuizResult } = useProgress();
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (showResult) {
      const rank = getRank();
      updateQuizResult(score, rank.title);
    }
  }, [showResult]);

  const handleAnswer = (option) => {
    setScore(prev => prev + option.score.value);
    setAnswers([...answers, option]);
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setScore(0);
    setShowResult(false);
    setAnswers([]);
  };

  const getRank = () => {
    if (score >= 45) return { title: "System Architect Wizard", desc: "Sen bir efsanesin! Karmaşıklık senin önünde eğiliyor.", color: "#8b5cf6" };
    if (score >= 30) return { title: "Clean Code Guardian", desc: "Prensiplere sadıksın, sürdürülebilir sistemler kuruyorsun.", color: "var(--primary)" };
    return { title: "Architecture Apprentice", desc: "Temellerin iyi ama daha çok portal gezmen lazım!", color: "#f59e0b" };
  };

  if (showResult) {
    const rank = getRank();
    return (
      <div className="container" style={{ padding: '100px 0' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card"
          style={{ textAlign: 'center', padding: '5rem', border: `2px solid ${rank.color}40`, background: `${rank.color}05` }}
        >
          <Trophy size={80} color={rank.color} style={{ marginBottom: '2rem' }} />
          <h2 style={{ fontSize: '1.5rem', color: rank.color, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1rem' }}>Test Tamamlandı!</h2>
          <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>{rank.title}</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 3rem' }}>
            {rank.desc}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '4rem' }}>
             <div className="glass-card">
                <div style={{ fontSize: '2rem', fontWeight: 800, color: rank.color }}>%{Math.round((score/50)*100)}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>BAŞARI ORANI</div>
             </div>
             <div className="glass-card">
                <div style={{ fontSize: '2rem', fontWeight: 800, color: rank.color }}>{score}/50</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>TOPLAM PUAN</div>
             </div>
             <div className="glass-card">
                <div style={{ fontSize: '2rem', fontWeight: 800, color: rank.color }}>{questions.length}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>SENARYO ÇÖZÜLDÜ</div>
             </div>
          </div>

          <button 
            onClick={resetQuiz}
            style={{
              background: rank.color,
              color: 'white',
              padding: '1.25rem 3rem',
              borderRadius: '20px',
              fontWeight: 700,
              fontSize: '1.1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              margin: '0 auto'
            }}
          >
            <RefreshCw size={20} /> Yeniden Dene
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '100px 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        {/* Left Side: Question Context */}
        <motion.div
           key={currentStep}
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
             <div style={{ 
               width: '50px', 
               height: '50px', 
               background: 'rgba(59, 130, 246, 0.1)', 
               borderRadius: '16px', 
               display: 'flex', 
               alignItems: 'center', 
               justifyContent: 'center',
               color: 'var(--primary)',
               fontWeight: 800
             }}>
               {currentStep + 1}
             </div>
             <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Architecture Challenge</span>
          </div>

          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'white' }}>{questions[currentStep].title}</h2>
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.03)', 
            padding: '2.5rem', 
            borderRadius: '32px', 
            border: '1px solid var(--glass-border)',
            lineHeight: 1.8,
            fontSize: '1.25rem',
            color: '#e2e8f0'
          }}>
            <Target size={24} color="var(--primary)" style={{ marginBottom: '1rem' }} />
            {questions[currentStep].scenario}
          </div>
        </motion.div>

        {/* Right Side: Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
              {questions[currentStep].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  className="glass-card"
                  style={{
                    padding: '2rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--glass-border)',
                    transition: 'all 0.3s',
                    position: 'relative',
                    overflow: 'hidden',
                    color: 'white'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--glass-border)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'white' }}>{opt.text}</span>
                     <ArrowRight size={20} style={{ opacity: 0.5, color: 'white' }} />
                  </div>
                </button>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Progress Bar */}
          <div style={{ marginTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', opacity: 0.5, marginBottom: '0.5rem' }}>
               <span>İlerleme</span>
               <span>{currentStep + 1} / {questions.length}</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
              <motion.div 
                animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                style={{ height: '100%', background: 'var(--primary)' }} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentQuiz;
