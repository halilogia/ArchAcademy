import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Trophy, Target, ArrowRight, RefreshCw, Star, Zap, MessageSquare, Code2, Users, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

const interviewQuestions = [
  {
    id: 1,
    title: "Sistem Tasarımı: Ölçeklenebilirlik",
    category: "System Design",
    scenario: "Uygulaman bir anda 10 kat trafik aldı ve veritabanı 'connection pool' hataları vermeye başladı. Horizontal scaling (yatay ölçekleme) yapmadan önce mimari düzeyde ilk hamlen ne olurdu?",
    options: [
      { 
        text: "Database önüne Redis Cache katmanı eklemek", 
        score: { type: 'Architect', value: 10 }, 
        feedback: "Guru: 'Mükemmel! Veritabanı yükünü azaltmak her zaman ilk savunma hattıdır.'",
        interviewTip: "Mülakatta her zaman 'en ucuz ve en hızlı' çözümle başlayın."
      },
      { 
        text: "Tüm sorguları optimize edip index atmak", 
        score: { type: 'Specialist', value: 6 }, 
        feedback: "Guru: 'Doğru bir adım ama milyonluk trafikte bazen index bile yetmeyebilir.'",
        interviewTip: "Indexleme iyidir ama tek başına bir mimari strateji değildir."
      },
      { 
        text: "Veritabanını microservices'lere bölmek", 
        score: { type: 'OverKiller', value: 3 }, 
        feedback: "Guru: 'Yangın varken ev taşımaya çalışılmaz. Microservices uzun vadeli bir çözümdür.'",
        interviewTip: "Acil durumlarda yapısal (structural) değişiklikler risklidir."
      }
    ]
  },
  {
    id: 2,
    title: "Domain Modelleme Kapışması",
    category: "DDD / Domain",
    scenario: "Bankacılık sisteminde 'Para Transferi' işlemini modelliyorsun. 'Transaction' mantığını nereye yazarsın?",
    options: [
      { 
        text: "Domain Service (Pure Logic Layer)", 
        score: { type: 'Architect', value: 10 }, 
        feedback: "Guru: 'DDD pürüzsüzlüğü! Birden fazla entity'i (hesaplar) yöneten mantık servise aittir.'",
        interviewTip: "Entity'ler sadece kendi iç durumlarından sorumlu olmalıdır."
      },
      { 
        text: "Controller / Web Layer", 
        score: { type: 'Junior', value: 1 }, 
        feedback: "Guru: 'Fat Controller problemi! İş mantığı asla sunum katmanında olmamalı.'",
        interviewTip: "Katmanlar arası sızıntı (leakage) mülakatlarda büyük eksi puandır."
      },
      { 
        text: "Application Service (Orchestration)", 
        score: { type: 'Specialist', value: 7 }, 
        feedback: "Guru: 'Kötü değil ancak karmaşık iş kuralları için Domain Service daha güvenlidir.'",
        interviewTip: "Application service akışı yönetir, iş kuralını değil."
      }
    ]
  },
  {
    id: 3,
    title: "Bağımlılık Yönetimi (SOLID)",
    scenario: "Projenizde ödeme sistemi olarak Stripe kullanıyorsunuz. Yarın öbür gün PayPal'a geçmek isterseniz kodunuzun sadece %1'ini değiştirmek için ne yapmalısınız?",
    options: [
      { 
        text: "Interface (Abstraction) ve Adapter kullanmak", 
        score: { type: 'Architect', value: 10 }, 
        feedback: "Guru: 'İşte bu! Dependency Inversion prensibini tam kalbinden vurdun.'",
        interviewTip: "Third-party kütüphaneleri her zaman bir arayüz arkasına gizleyin."
      },
      { 
        text: "Ödeme fonksiyonlarını ayrı bir klasöre koymak", 
        score: { type: 'Junior', value: 3 }, 
        feedback: "Guru: 'Klasörleme sadece düzen sağlar, bağımlılığı (coupling) çözmez.'",
        interviewTip: "Fiziksel ayrım ile mantıksal ayrımı karıştırmayın."
      },
      { 
        text: "Switch-case ile ödeme tipini kontrol etmek", 
        score: { type: 'Legacy', value: 2 }, 
        feedback: "Guru: 'Open-Closed prensibine aykırı! Her yeni ödeme yöntemi için kodu açıp bozman gerekir.'",
        interviewTip: "If-else kalabalığı mimari bir borçtur (Technical Debt)."
      }
    ]
  },
  {
    id: 4,
    title: "Modern Frontend Mimari",
    category: "React / FSD",
    scenario: "Büyük bir dashboard projesinde 'UserCard' bileşeni 20 farklı API isteğiyle besleniyor. Bu kargaşayı nasıl yönetirsin?",
    options: [
      { 
        text: "Feature-Sliced Design (FSD) katmanları ile", 
        score: { type: 'Modernist', value: 10 }, 
        feedback: "Guru: 'Modern frontend ustalığı. Sorumlulukları bölmek spagettiyi engeller.'",
        interviewTip: "Frontend'de sadece bileşen değil, mimari de mülakat konusudur."
      },
      { 
        text: "Tüm datayı Context API'da toplamak", 
        score: { type: 'Junior', value: 4 }, 
        feedback: "Guru: 'Global State cehennemi! Gereksiz re-render'lar ile performansı öldürürsün.'",
        interviewTip: "State'i mümkün olduğunca kullanıldığı yere yakın tutun (Colocation)."
      },
      { 
        text: "Custom Hook'lar ile mantığı ayırmak", 
        score: { type: 'Specialist', value: 8 }, 
        feedback: "Guru: 'Güzel hamle. Mantık temizlenir ama component hiyerarşisi hala karmaşık kalabilir.'",
        interviewTip: "Hook'lar birer araçtır, mimari birer yapıdır."
      }
    ]
  }
];

const AssessmentQuiz = () => {
  const { updateQuizResult } = useProgress();
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [isAnswering, setIsAnswering] = useState(true);

  useEffect(() => {
    if (showResult) {
      const rank = getRank();
      updateQuizResult(score, rank.title);
    }
  }, [showResult]);

  const handleNext = () => {
    if (currentStep < interviewQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
      setIsAnswering(true);
    } else {
      setShowResult(true);
    }
  };

  const selectOption = (option: any) => {
    if (!isAnswering) return;
    setScore(prev => prev + option.score.value);
    setSelectedOption(option);
    setIsAnswering(false);
  };

  const getRank = () => {
    if (score >= 35) return { title: "Lead Solutions Architect", desc: "Mülakatçıyı terlettin! Mimari vizyonun en üst seviyede.", color: "#8b5cf6", icon: <Trophy size={60} /> };
    if (score >= 20) return { title: "Senior Software Engineer", desc: "Güçlü bir temel. Trade-off'ları iyi biliyorsun.", color: "var(--primary)", icon: <Shield size={60} /> };
    return { title: "Mid-Level Specialist", desc: "Teknik bilgin iyi ama büyük resmi görmekte biraz daha pratik lazım.", color: "#f59e0b", icon: <Target size={60} /> };
  };

  if (showResult) {
    const rank = getRank();
    return (
      <div className="container" style={{ padding: '40px 0 100px' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card"
          style={{ textAlign: 'center', padding: '5rem', border: `2px solid ${rank.color}40`, background: `${rank.color}05`, borderRadius: '40px' }}
        >
          <div style={{ color: rank.color, marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>{rank.icon}</div>
          <h2 style={{ fontSize: '1.2rem', color: rank.color, textTransform: 'uppercase', letterSpacing: '4px', marginBottom: '1rem', fontWeight: 900 }}>Mülakat Sonucu</h2>
          <h1 style={{ fontSize: '4.5rem', marginBottom: '1.5rem', fontWeight: 950, letterSpacing: '-2px' }}>{rank.title}</h1>
          <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 4rem', lineHeight: 1.6 }}>
            {rank.desc}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '4rem' }}>
             <div className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 950, color: rank.color }}>%{Math.round((score/40)*100)}</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, opacity: 0.5, letterSpacing: '1px' }}>TOTAL ACCURACY</div>
             </div>
             <div className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 950, color: rank.color }}>{score}/40</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, opacity: 0.5, letterSpacing: '1px' }}>RAW SCORE</div>
             </div>
             <div className="glass-card" style={{ padding: '2rem' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 950, color: rank.color }}>FAANG+</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, opacity: 0.5, letterSpacing: '1px' }}>MATCH LEVEL</div>
             </div>
          </div>

          <button 
            onClick={() => window.location.reload()}
            style={{ background: rank.color, color: 'white', padding: '1.5rem 4rem', borderRadius: '24px', fontWeight: 900, fontSize: '1.2rem', border: 'none', cursor: 'pointer', boxShadow: `0 20px 40px ${rank.color}44`, display: 'inline-flex', alignItems: 'center', gap: '1rem' }}
          >
            <RefreshCw size={24} /> SİMÜLASYONU SIFIRLA
          </button>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = interviewQuestions[currentStep];

  return (
    <div className="container" style={{ padding: '40px 0 100px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '4rem' }}>
        
        {/* Left Side: Examiner View */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
             <div style={{ width: '60px', height: '60px', background: 'var(--primary)', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 950, fontSize: '1.5rem', boxShadow: '0 10px 20px rgba(59, 130, 246, 0.3)' }}>
               {currentStep + 1}
             </div>
             <div>
                <div style={{ color: 'var(--primary)', fontWeight: 900, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '4px' }}>{currentQuestion.category || 'Architecture'}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.6, fontWeight: 700 }}>Question {currentStep + 1} of {interviewQuestions.length}</div>
             </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
               key={currentStep}
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
            >
              <h2 style={{ fontSize: '2.8rem', fontWeight: 900, marginBottom: '2rem', color: 'white', letterSpacing: '-1px' }}>{currentQuestion.title}</h2>
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '3rem', borderRadius: '40px', border: '1px solid var(--glass-border)', position: 'relative', minHeight: '300px' }}>
                <div style={{ position: 'absolute', top: '-15px', left: '30px', background: 'var(--bg-dark)', padding: '6px 18px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--glass-border)', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>
                   <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }} />
                   <span style={{ fontSize: '0.75rem', fontWeight: 900, letterSpacing: '1px' }}>MÜLAKATÇI (GURU)</span>
                </div>
                <p style={{ fontSize: '1.4rem', lineHeight: 1.8, color: '#f8fafc', fontWeight: 500 }}>
                  "{currentQuestion.scenario}"
                </p>
                
                {selectedOption && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginTop: '2.5rem', padding: '2rem', borderRadius: '24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                  >
                    <div style={{ color: 'var(--primary)', fontWeight: 900, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Zap size={18} /> FEEDBACK
                    </div>
                    <p style={{ fontSize: '1.1rem', fontStyle: 'italic', opacity: 0.9, lineHeight: 1.6 }}>{selectedOption.feedback}</p>
                    <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'start', gap: '12px', background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '15px', color: '#10b981' }}>
                       <AlertCircle size={20} style={{ flexShrink: 0 }} />
                       <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>PRO TIP: {selectedOption.interviewTip}</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Side: Options View */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {currentQuestion.options.map((opt, i) => {
              const isSelected = selectedOption === opt;
              return (
                <motion.button
                  key={i}
                  disabled={!isAnswering}
                  whileHover={isAnswering ? { scale: 1.02, x: 10 } : {}}
                  onClick={() => selectOption(opt)}
                  className="glass-card"
                  style={{
                    padding: '2.5rem',
                    textAlign: 'left',
                    cursor: isAnswering ? 'pointer' : 'default',
                    background: isSelected ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                    borderColor: isSelected ? 'var(--primary)' : 'var(--glass-border)',
                    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    position: 'relative',
                    opacity: !isAnswering && !isSelected ? 0.4 : 1
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
                     <span style={{ fontSize: '1.2rem', fontWeight: 800, color: isSelected ? 'white' : '#94a3b8', transition: 'color 0.3s' }}>{opt.text}</span>
                     {isSelected ? (
                       <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(59, 130, 246, 0.5)' }}>
                         <CheckCircle2 size={18} color="white" />
                       </div>
                     ) : (
                       <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)', transition: 'border-color 0.3s' }} />
                     )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {!isAnswering && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleNext}
              style={{
                marginTop: '3rem',
                background: 'white',
                color: 'black',
                padding: '1.5rem',
                borderRadius: '24px',
                fontWeight: 900,
                fontSize: '1.1rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                boxShadow: '0 20px 40px rgba(255,255,255,0.1)'
              }}
            >
              SONRAKİ SORUYA GEÇ <ArrowRight size={20} />
            </motion.button>
          )}

          {/* Linear Progress */}
          <div style={{ marginTop: '4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 900, opacity: 0.4, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
               <span>Interview Status</span>
               <span>{currentStep + 1} / {interviewQuestions.length}</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
              <motion.div 
                animate={{ width: `${((currentStep + 1) / interviewQuestions.length) * 100}%` }}
                style={{ height: '100%', background: 'linear-gradient(to right, var(--primary), #818cf8)' }} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentQuiz;
