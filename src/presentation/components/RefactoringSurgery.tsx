import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Scissors, Sparkles, AlertTriangle, CheckCircle2, ArrowRight, Code2 } from 'lucide-react';

interface Scenario {
  id: number;
  title: { tr: string; en: string };
  problem: { tr: string; en: string };
  category: string;
  dirtyCode: string;
  cleanCode: string;
  explanation: { tr: string; en: string };
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: { tr: "1. The God Function (Her Şeyi Yapan)", en: "1. The God Function (Anti-Pattern)" },
    problem: { 
      tr: "Tek bir fonksiyonda; doğrulama, veritabanı kaydı, e-posta gönderimi ve loglama yapılıyor. Kodun okunması ve test edilmesi imkansız.",
      en: "A single monolithic function handles validation, direct SQL queries, SMTP email dispatch, and file logging. Zero testability and extreme fragility."
    },
    category: "SOLID Violations (SRP)",
    dirtyCode: `function createUser(user) {
  // 1. Validation
  if (!user.email.includes('@')) {
    throw new Error('Invalid email');
  }
  
  // 2. Database (Direct SQL)
  db.query('INSERT INTO users...', user);
  
  // 3. Email Dispatch
  smtp.send('Welcome!', user.email);
  
  // 4. File Logging
  fs.writeFileSync('log.txt', 'User created');
}`,
    cleanCode: `// Repository (Data Access Only)
class UserRepository {
  async save(user) { ... }
}

// Service (Workflow Orchestration)
class UserService {
  constructor(userRepo, mailer, logger) {
    this.userRepo = userRepo;
    this.mailer = mailer;
    this.logger = logger;
  }

  async create(user) {
    validateUser(user);
    await this.userRepo.save(user);
    await this.mailer.sendWelcome(user.email);
    this.logger.info('User created');
  }
}`,
    explanation: {
      tr: "Single Responsibility Principle (SRP) uygulandı. İş mantığı, veri erişimi ve bildirimler farklı sınıflara bölündü.",
      en: "Applied Single Responsibility Principle (SRP). Business logic, persistence, and external notifications are cleanly decoupled."
    }
  },
  {
    id: 2,
    title: { tr: "2. Spagetti İf-Else (Arrow Code)", en: "2. Nested Conditional Arrow Anti-Pattern" },
    problem: {
      tr: "Kod sağa doğru bir ok gibi kayıyor. Okumak ve hata ayıklamak için sürekli zihinsel takip gerekiyor.",
      en: "Deep nested conditionals drifting rightward like an arrow. Causes high cognitive complexity and edge-case bugs."
    },
    category: "Code Hygiene",
    dirtyCode: `function getPayAmount() {
  let result;
  if (isDead) {
    result = deadAmount();
  } else {
    if (isSeparated) {
      result = separatedAmount();
    } else {
      if (isRetired) {
        result = retiredAmount();
      } else {
        result = normalAmount();
      }
    }
  }
  return result;
}`,
    cleanCode: `// Guard Clauses (Early Return)
function getPayAmount() {
  if (isDead) return deadAmount();
  if (isSeparated) return separatedAmount();
  if (isRetired) return retiredAmount();
  
  return normalAmount();
}`,
    explanation: {
      tr: "Guard Clauses (Erken Dönüş) tekniğiyle iç içe if/else blokları temizlendi. Kod düz bir şerit gibi okunabilir hale geldi.",
      en: "Refactored with Guard Clauses (Early Returns). Eliminates nested indentation and makes the happy path linear."
    }
  },
  {
    id: 3,
    title: { tr: "3. Primitive Obsession (İlkel Tip Saplantısı)", en: "3. Primitive Obsession (Value Object Pattern)" },
    problem: {
      tr: "Tüm değerler ilkel tiplerle (string, number) tutuluyor. Para birimleri ve negatif değer kontrolleri her yerde kopyalanıyor.",
      en: "Financial amounts and currencies stored as raw numbers and strings, scattering domain validation across the codebase."
    },
    category: "Domain Modeling",
    dirtyCode: `function processOrder(price: number, currency: string) {
  if (price < 0) throw new Error('Invalid price');
  // Currency mismatch risks...
  return price * 1.18;
}`,
    cleanCode: `// Value Object Pattern
class Money {
  constructor(public readonly amount: number, public readonly currency: string) {
    if (amount < 0) throw new Error('Invalid price');
  }

  addTax(rate: number): Money {
    return new Money(this.amount * (1 + rate), this.currency);
  }
}`,
    explanation: {
      tr: "Value Object (Değer Nesnesi) deseni uygulandı. Kurallar tek bir yerde kapsullendi ve nesne değişmez (immutable) kılındı.",
      en: "Applied Value Object pattern. Business invariants are encapsulated once, making the domain entity immutable and safe."
    }
  }
];

const RefactoringSurgery: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeScenarioId, setActiveScenarioId] = useState(1);
  const [isOperated, setIsOperated] = useState(false);

  const scenario = scenarios.find(s => s.id === activeScenarioId) || scenarios[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Scenario Selector */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {scenarios.map(s => (
          <button
            key={s.id}
            onClick={() => {
              setActiveScenarioId(s.id);
              setIsOperated(false);
            }}
            style={{
              padding: '12px 24px',
              borderRadius: '16px',
              background: activeScenarioId === s.id ? 'var(--primary)' : 'rgba(255,255,255,0.03)',
              color: activeScenarioId === s.id ? 'white' : 'var(--text-secondary)',
              border: '1px solid var(--glass-border)',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {isEn ? s.title.en : s.title.tr}
          </button>
        ))}
      </div>

      {/* Code Operating Theater */}
      <div className="glass-card" style={{ padding: '3rem', borderTop: '4px solid #ef4444' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {scenario.category}
            </span>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginTop: '4px' }}>
              {isEn ? scenario.title.en : scenario.title.tr}
            </h2>
          </div>
          <button
            onClick={() => setIsOperated(prev => !prev)}
            style={{
              background: isOperated ? '#10b981' : '#ef4444',
              color: 'white',
              border: 'none',
              padding: '12px 28px',
              borderRadius: '14px',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: isOperated ? '0 10px 25px rgba(16, 185, 129, 0.4)' : '0 10px 25px rgba(239, 68, 68, 0.4)',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
          >
            <Scissors size={18} />
            {isOperated 
              ? (isEn ? "Undo Surgery (View Legacy)" : "Ameliyatı Geri Al (Eski Kod)") 
              : (isEn ? "Perform Code Surgery ⚡" : "Kodu Ameliyat Et ⚡")
            }
          </button>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
          {isEn ? scenario.problem.en : scenario.problem.tr}
        </p>

        {/* Code Block Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isOperated ? 'clean' : 'dirty'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              background: '#0a0f1d',
              borderRadius: '18px',
              border: `1px solid ${isOperated ? '#10b98144' : '#ef444444'}`,
              overflow: 'hidden'
            }}
          >
            <div style={{
              padding: '12px 20px',
              background: isOperated ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontWeight: 800, fontSize: '0.85rem', color: isOperated ? '#10b981' : '#ef4444', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {isOperated ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                {isOperated 
                  ? (isEn ? "CLEAN ARCHITECTURE / REFACTORED CODE" : "TEMİZ MİMARİ / AMELİYAT EDİLMİŞ KOD") 
                  : (isEn ? "DIRTY / SMELLY LEGACY CODE" : "KİRLİ / TEKNİK BORÇLU ESKİ KOD")
                }
              </span>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'monospace' }}>TypeScript</span>
            </div>

            <pre style={{ padding: '1.5rem', margin: 0, color: '#e2e8f0', fontSize: '0.9rem', lineHeight: 1.7, overflowX: 'auto', fontFamily: 'monospace' }}>
              <code>{isOperated ? scenario.cleanCode : scenario.dirtyCode}</code>
            </pre>
          </motion.div>
        </AnimatePresence>

        {/* Explanation HUD */}
        {isOperated && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              marginTop: '2rem',
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '16px',
              padding: '1.5rem'
            }}
          >
            <div style={{ color: '#10b981', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} /> {isEn ? "SURGERY RATIONALE:" : "AMELİYAT GEREKÇESİ:"}
            </div>
            <p style={{ color: '#cbd5e1', margin: 0, fontSize: '0.95rem', lineHeight: 1.6 }}>
              {isEn ? scenario.explanation.en : scenario.explanation.tr}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RefactoringSurgery;
