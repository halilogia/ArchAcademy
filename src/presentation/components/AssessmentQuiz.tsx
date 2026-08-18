import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Shield, Trophy, Target, ArrowRight, RefreshCw, Star, Zap, MessageSquare, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';

interface QuizOption {
  text: { tr: string; en: string };
  score: { type: 'Architect' | 'Specialist' | 'OverKiller' | 'Junior'; value: number };
  feedback: { tr: string; en: string };
  interviewTip: { tr: string; en: string };
}

interface Question {
  id: number;
  title: { tr: string; en: string };
  category: string;
  scenario: { tr: string; en: string };
  options: QuizOption[];
}

const interviewQuestions: Question[] = [
  {
    id: 1,
    title: { tr: "Sistem Tasarımı: Ölçeklenebilirlik", en: "System Design: Scalability" },
    category: "System Design",
    scenario: {
      tr: "Uygulamanız bir anda 10 kat trafik aldı ve veritabanı 'connection pool' hataları vermeye başladı. Yatay ölçekleme yapmadan önce mimari düzeyde ilk hamleniz ne olurdu?",
      en: "Your app suddenly received 10x peak traffic and the database is throwing 'connection pool exhausted' errors. Before horizontally scaling, what is your immediate architectural move?"
    },
    options: [
      { 
        text: { tr: "Database önüne Redis Cache katmanı eklemek", en: "Add an in-memory Redis Cache layer in front of the database" }, 
        score: { type: 'Architect', value: 10 }, 
        feedback: { tr: "Guru: 'Mükemmel! Veritabanı yükünü okumalarda azaltmak her zaman ilk savunma hattıdır.'", en: "Guru: 'Excellent! Offloading read pressure from the database is always the primary line of defense.'" },
        interviewTip: { tr: "Mülakatta her zaman 'en ucuz, en hızlı ve en etkili' çözümle başlayın.", en: "In interviews, always propose the highest-impact, most cost-effective solution first." }
      },
      { 
        text: { tr: "Tüm sorguları optimize edip index atmak", en: "Optimize queries and add composite database indexes" }, 
        score: { type: 'Specialist', value: 6 }, 
        feedback: { tr: "Guru: 'Doğru bir adım ama milyonluk trafikte bazen index bile yetmeyebilir.'", en: "Guru: 'Good step, but under massive concurrency, indexes alone won't prevent pool exhaustion.'" },
        interviewTip: { tr: "Indexleme iyidir ama tek başına bir mimari ölçekleme stratejisi değildir.", en: "Indexing is table-stakes hygiene, not a standalone scaling architecture." }
      },
      { 
        text: { tr: "Veritabanını doğrudan microservices'lere bölmek", en: "Immediately partition the database into distributed microservices" }, 
        score: { type: 'OverKiller', value: 3 }, 
        feedback: { tr: "Guru: 'Yangın varken ev taşınmaz! Microservices uzun vadeli bir evrimdir.'", en: "Guru: 'Never remodel the house during a fire! Microservices is a strategic evolution, not an emergency fix.'" },
        interviewTip: { tr: "Acil üretim anlarında devasa yapısal değişiklikler risklidir.", en: "Avoid proposing massive distributed refactors during active production incidents." }
      }
    ]
  },
  {
    id: 2,
    title: { tr: "Domain Modelleme & Sorumluluk", en: "Domain Modeling & Responsibilities" },
    category: "DDD / Domain",
    scenario: {
      tr: "Bankacılık sisteminde 'Para Transferi' işlemini modelliyorsunuz. Çift taraflı hesap hareketini ve bakiye doğrulama mantığını nereye yazarsınız?",
      en: "You are modeling a 'Fund Transfer' feature in a banking core. Where do you place the cross-account transaction & validation logic?"
    },
    options: [
      { 
        text: { tr: "Domain Service (Saf İş Mantığı Katmanı)", en: "Domain Service (Pure Domain Logic Layer)" }, 
        score: { type: 'Architect', value: 10 }, 
        feedback: { tr: "Guru: 'DDD kusursuzluğu! Birden fazla entity'i (hesapları) koordine eden saf mantık Domain Service'e aittir.'", en: "Guru: 'Flawless DDD! Pure business logic that spans multiple aggregates belongs in a Domain Service.'" },
        interviewTip: { tr: "Entity'ler sadece kendi iç durumundan (kendi bakiyesinden) sorumlu olmalıdır.", en: "Entities should only guard their own internal invariants." }
      },
      { 
        text: { tr: "Application Service (Orkestrasyon)", en: "Application Service (UseCase Orchestration)" }, 
        score: { type: 'Specialist', value: 7 }, 
        feedback: { tr: "Guru: 'Kötü değil; ancak karmaşık para transferi iş kuralları için Domain Service daha izoledir.'", en: "Guru: 'Acceptable for orchestration, but critical domain invariants belong in the Domain layer.'" },
        interviewTip: { tr: "Application service akışı yönetir, iş kurallarını değil.", en: "Application services orchestrate workflows, not core business invariants." }
      },
      { 
        text: { tr: "Controller / Web Katmanı", en: "Controller / Web API Layer" }, 
        score: { type: 'Junior', value: 1 }, 
        feedback: { tr: "Guru: 'Fat Controller anti-pattern'i! İş mantığı asla sunum katmanına sızmamalıdır.'", en: "Guru: 'Fat Controller anti-pattern! Business logic must never leak into transport layers.'" },
        interviewTip: { tr: "Katmanlar arası mantık sızıntısı (leakage) mülakatlarda büyük eksi puandır.", en: "Cross-layer domain leakage is an immediate red flag in senior interviews." }
      }
    ]
  },
  {
    id: 3,
    title: { tr: "Bağımlılık Yönetimi (SOLID)", en: "Dependency Management (SOLID)" },
    category: "Architecture Principles",
    scenario: {
      tr: "Projenizde ödeme sağlayıcısı olarak Stripe kullanıyorsunuz. Yarın PayPal'a geçmek isterseniz kodun %99'unu değiştirmeden korumak için ne yapmalısınız?",
      en: "Your system uses Stripe for payments. To switch to PayPal tomorrow by modifying less than 1% of your code, how should you architect this?"
    },
    options: [
      { 
        text: { tr: "Interface (Abstraction) ve Adapter Pattern kullanmak", en: "Introduce an IPaymentGateway Interface and Adapter Pattern" }, 
        score: { type: 'Architect', value: 10 }, 
        feedback: { tr: "Guru: 'İşte bu! Dependency Inversion ve Hexagonal mimariyi tam kalbinden yakaladınız.'", en: "Guru: 'Spot on! Pure Dependency Inversion and Hexagonal Ports & Adapters in action.'" },
        interviewTip: { tr: "Üçüncü parti kütüphaneleri her zaman bir arayüz (Port) arkasına gizleyin.", en: "Always wrap third-party SDKs behind domain-owned abstraction interfaces." }
      },
      { 
        text: { tr: "Her ödeme yapılan yerde if/else ile sağlayıcı kontrolü yapmak", en: "Use if/else provider checks directly in business logic" }, 
        score: { type: 'Junior', value: 2 }, 
        feedback: { tr: "Guru: 'Open/Closed prensibi ihlali! Her yeni ödeme yönteminde tüm kodu bozarsınız.'", en: "Guru: 'Violates Open/Closed! Adding a provider will require modifying core business logic.'" },
        interviewTip: { tr: "Dinamik davranışlar için if/else yerine Polimorfizm veya Strateji deseni kullanın.", en: "Favor Polymorphic Strategy patterns over sprawling conditional branches." }
      },
      { 
        text: { tr: "Ödeme işlemlerini ayrı bir mikroservise taşımak", en: "Extract payment processing into a standalone dedicated microservice" }, 
        score: { type: 'Specialist', value: 6 }, 
        feedback: { tr: "Guru: 'Faydalı bir dağıtık adım ancak o servisin içinde de hala Adapter katmanı gerekecektir.'", en: "Guru: 'Helpful operational isolation, but inside that service, you still need an abstraction adapter.'" },
        interviewTip: { tr: "Mimari temizlik sadece servis sınırlarında değil, kod düzeyinde de başlar.", en: "Clean architecture applies at the code boundary level as well as the service boundary." }
      }
    ]
  }
];

const AssessmentQuiz: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const { completeStep } = useProgress();
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<QuizOption | null>(null);
  const [answers, setAnswers] = useState<{ questionId: number; option: QuizOption }[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = interviewQuestions[currentQIndex];

  const handleSelect = (opt: QuizOption) => {
    if (selectedOption) return; // Prevent changing after selection
    setSelectedOption(opt);
  };

  const handleNext = () => {
    if (!selectedOption) return;
    const newAnswers = [...answers, { questionId: currentQ.id, option: selectedOption }];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentQIndex + 1 < interviewQuestions.length) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
      completeStep('/assessment');
    }
  };

  const handleRestart = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setAnswers([]);
    setIsCompleted(false);
  };

  // Calculate Profile
  const calculateResult = () => {
    const scores = { Architect: 0, Specialist: 0, OverKiller: 0, Junior: 0 };
    answers.forEach(a => {
      scores[a.option.score.type] += a.option.score.value;
    });

    let topType = 'Architect';
    let maxScore = -1;
    (Object.keys(scores) as (keyof typeof scores)[]).forEach(k => {
      if (scores[k] > maxScore) {
        maxScore = scores[k];
        topType = k;
      }
    });

    const profiles = {
      Architect: {
        title: isEn ? "Staff / Principal Software Architect" : "Kıdemli Sistem Mimarı (Principal Architect)",
        badge: isEn ? "SENIOR / PRINCIPAL LEVEL" : "SENIOR / PRINCIPAL SEVİYESİ",
        color: "#10b981",
        desc: isEn 
          ? "You balance pragmatism with clean design. You avoid premature optimization, favor loose coupling, and prioritize business velocity and fault tolerance."
          : "Pragmatizm ile temiz mimariyi kusursuz dengeliyorsun. Gereksiz over-engineering yapmıyor, gevşek bağımlılık ve sistem dayanıklılığını ön planda tutuyorsun."
      },
      Specialist: {
        title: isEn ? "Senior Engineering Specialist" : "Kıdemli Mühendis (Senior Specialist)",
        badge: isEn ? "SENIOR LEVEL" : "SENIOR SEVİYESİ",
        color: "#3b82f6",
        desc: isEn 
          ? "Deep technical competence and clean execution. Sharpen your high-level distributed trade-offs to reach Principal mastery."
          : "Teknik bilgin çok derin ve çözümlerin sağlam. Büyük resim ve dağıtık sistem trade-off dengelerine biraz daha odaklanarak Principal seviyesine ulaşabilirsin."
      },
      OverKiller: {
        title: isEn ? "Complex System Enthusiast" : "Over-Engineering Tutkunu",
        badge: isEn ? "OPTIMIZATION ALERT" : "OPTIMİZASYON UYARISI",
        color: "#f59e0b",
        desc: isEn 
          ? "You have strong distributed knowledge, but tend to reach for microservices and complex machinery before exhausting simpler, cheaper architectural solutions."
          : "Güçlü bir vizyonun var ancak bazen basit bir soruna devasa mikroservisler ve karmaşık dağıtık sistemlerle yaklaşma eğilimindesin. 'KISS' prensibini hatırla!"
      },
      Junior: {
        title: isEn ? "Aspiring Software Engineer" : "Gelişmekte Olan Yazılımcı",
        badge: isEn ? "ACADEMY TRAINEE" : "AKADEMİ ÇIRAK SEVİYESİ",
        color: "#ec4899",
        desc: isEn 
          ? "Great potential! Dive deeper into SOLID, Layered Abstractions, and Separation of Concerns on ArchAcademy to elevate your architectural mindset."
          : "Harika bir öğrenme azmin var! ArchAcademy'deki SOLID, Clean Architecture ve Katmanlı Soyutlama modüllerini tamamlayarak mimari reflekslerini güçlendir."
      }
    };

    return profiles[topType as keyof typeof profiles] || profiles.Architect;
  };

  const result = isCompleted ? calculateResult() : null;

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
              {isEn ? `SCENARIO ${currentQIndex + 1} OF ${interviewQuestions.length}` : `SENARYO ${currentQIndex + 1} / ${interviewQuestions.length}`}
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
                {currentQIndex + 1 < interviewQuestions.length 
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
