import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Sparkles, AlertTriangle, CheckCircle2, ArrowRight, Code2, Bot, Ghost } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const scenarios = [
  {
    id: 1,
    title: { tr: "1. The God Function (Her Şeyi Yapan)", en: "1. The God Function (Monolithic Action)" },
    problem: { 
      tr: "Tek bir fonksiyonda; doğrulama, veritabanı kaydı, e-posta gönderimi ve loglama yapılıyor. Kodun okunması ve test edilmesi imkansız.",
      en: "A single function handles validation, direct SQL, email dispatch, and file logging. Zero testability and extreme fragility."
    },
    category: "SOLID Violations (SRP)",
    dirtyCode: `function createUser(user) {
  // 1. Validasyon
  if (!user.email.includes('@')) {
    throw new Error('Invalid email');
  }
  
  // 2. Database (Doğrudan SQL)
  db.query('INSERT INTO users...', user);
  
  // 3. Email Gönderimi
  smtp.send('Welcome!', user.email);
  
  // 4. Dosyaya Loglama
  fs.writeFileSync('log.txt', 'User created');
}`,
    cleanCode: `// Repository (Sadece DB işleri)
class UserRepository {
  async save(user) { ... }
}

// Service (Sadece İş Akışı)
class UserService {
  constructor(userRepo, mailer) {
    this.userRepo = userRepo;
    this.mailer = mailer;
  }

  async create(user) {
    validateUser(user); // Helper
    await this.userRepo.save(user);
    await this.mailer.sendWelcome(user.email);
  }
}`,
    explanation: {
      tr: "Single Responsibility Principle (SRP) uygulandı. İş mantığı, veri erişimi ve bildirimler farklı sınıflara bölündü.",
      en: "Single Responsibility Principle (SRP) applied. Business logic, persistence, and external notifications are cleanly decoupled."
    }
  },
  {
    id: 2,
    title: { tr: "2. Spagetti İf-Else (Arrow Code)", en: "2. Nested Conditional Arrow Anti-Pattern" },
    problem: {
      tr: "Kod sağa doğru bir ok gibi kayıyor. Okumak için sürekli zihinsel takip gerekiyor.",
      en: "Deep nested conditionals drifting rightward like an arrow. Causes high cognitive complexity and edge-case bugs."
    },
    category: "Code Hygiene",
    dirtyCode: `function getPayAmount() {
  let result;
  if (isDead){
    result = deadAmount();
  } else {
    if (isSeparated){
      result = separatedAmount();
    } else {
      if (isRetired){
        result = retiredAmount();
      } else {
        result = normalPayAmount();
      }
    }
  }
  return result;
}`,
    cleanCode: `function getPayAmount() {
  // Guard Clauses (Erken Dönüş)
  if (isDead) return deadAmount();
  if (isSeparated) return separatedAmount();
  if (isRetired) return retiredAmount();
  
  // Happy Path (En sona kalan)
  return normalPayAmount();
}`,
    explanation: {
      tr: "Erken Return (Guard Clause) tekniğiyle iç içe if bloklarını yok ettik. Kod artık dümdüz okunuyor.",
      en: "Eliminated nested if-else ladders using Guard Clauses (Early Return). The happy path reads linearly."
    }
  },
  {
    id: 3,
    title: { tr: "3. İlkel Takıntısı (Primitive Obsession)", en: "3. Primitive Obsession (Value Object Pattern)" },
    problem: {
      tr: "Para birimi, tarih veya adres gibi kompleks yapıları hala raw (ilkel) string/number olarak tutmak hata payını artırır.",
      en: "Storing domain concepts like money, currency, or dates as raw strings and numbers leads to duplicated validations and bugs."
    },
    category: "Domain Modeling",
    dirtyCode: `function processPayment(amount, currency) {
  if (amount < 0) throw new Error();
  if (currency !== 'USD' && currency !== 'EUR') throw new Error();
  // ...
}`,
    cleanCode: `class Money {
  constructor(amount, currency) {
    if (amount < 0) throw new Error();
    this.amount = amount;
    this.currency = currency;
  }
}

function processPayment(money) {
  // Sadece Money objesini kabul et
  // Validasyon zaten Money içinde yapıldı
}`,
    explanation: {
      tr: "Veriyi 'Value Object' haline getirerek her fonksiyonda tekrar eden kontrolleri ortadan kaldırdık.",
      en: "Wrapped raw data into an immutable Value Object, eliminating repetitive validation guards across use-cases."
    }
  },
  {
    id: 4,
    title: { tr: "4. Parametre Çorbası (Long Parameter List)", en: "4. Long Parameter List Anti-Pattern" },
    problem: {
      tr: "Bir fonksiyona 7-8 tane parametre geçmek parametrelerin sırasının karışmasına yol açar.",
      en: "Passing 7-8 parameters into a single function leads to accidental argument transpositions and rigid signatures."
    },
    category: "Clean Code",
    dirtyCode: `function searchUsers(name, age, city, sortBy, sortOrder, limit, offset) {
  // Parametre sırası karışabilir
}`,
    cleanCode: `// Parameter Object (DTO)
interface SearchOptions {
  name?: string;
  age?: number;
  city?: string;
  pagination?: { limit: number; offset: number };
}

function searchUsers(options: SearchOptions) {
  // Temiz, güvenli ve genişletilebilir
}`,
    explanation: {
      tr: "Parametreleri bir DTO / Object altında toplayarak hem sırayı önemsiz kıldık hem de yeni filtreler eklemeyi kolaylaştırdık.",
      en: "Encapsulated arguments inside a parameter DTO, enabling optional fields and order-independent calling."
    }
  },
  {
    id: 5,
    title: { tr: "5. Bağımlılık Spagettisi (Tight Coupling)", en: "5. Tight Coupling Anti-Pattern" },
    problem: {
      tr: "Bir sınıf başka bir somut sınıfa (concrete class) doğrudan new ile bağlanırsa o sınıfı mocklamak veya değiştirmek imkansızlaşır.",
      en: "Instantiating concrete classes with 'new' directly inside business services prevents mocking and breaks testability."
    },
    category: "SOLID (DIP)",
    dirtyCode: `class OrderService {
  private emailService = new SmtpEmailService();
  // SmtpEmailService'e göbekten bağlı
}`,
    cleanCode: `class OrderService {
  // Dependency Injection (Interface)
  constructor(private emailService: IEmailService) {}
}`,
    explanation: {
      tr: "Dependency Inversion uygulandı. Somut sınıfa değil 'IEmailService' arayüzüne bağımlı olundu. Artık testlerde mock servis verilebilir.",
      en: "Applied Dependency Inversion. OrderService now depends on an IEmailService abstraction injected via constructor."
    }
  },
  {
    id: 6,
    title: { tr: "6. Framework Tuzağı (Architecture Leak)", en: "6. Framework Entity Leakage" },
    problem: {
      tr: "ORM veya Web framework modellerini (örn: TypeORM / Entity Framework entity'leri) doğrudan UI veya API response olarak dönmek.",
      en: "Leaking raw database ORM entities directly into API responses or UI view layers."
    },
    category: "Clean Architecture",
    dirtyCode: `// Controller
async function getUser(req, res) {
  const user = await UserOrmEntity.findOne(req.id);
  return res.json(user); // PasswordHash dışarı sızabilir!
}`,
    cleanCode: `// Mapper Pattern
async function getUser(req, res) {
  const user = await this.userService.getUser(req.id);
  const userDto = UserMapper.toResponseDto(user);
  return res.json(userDto);
}`,
    explanation: {
      tr: "DTO (Data Transfer Object) ve Mapper kullanarak veritabanı şemasını dış dünyadan gizledik.",
      en: "Used DTOs and Mappers to decouple internal database schemas from outward-facing API contracts."
    }
  },
  {
    id: 7,
    title: { tr: "7. Switch Case Cehennemi (Polymorphism)", en: "7. Switch-Case Hell (Replace with Polymorphism)" },
    problem: {
      tr: "Her yeni tip eklendiğinde tüm dosyalardaki switch/case bloklarını bulup değiştirmek zorunda kalmak (OCP ihlali).",
      en: "Adding new behavior requires modifying switch-case blocks across multiple files, violating Open/Closed."
    },
    category: "Refactoring Patterns",
    dirtyCode: `function calculateDiscount(userType, amount) {
  switch(userType) {
    case 'GOLD': return amount * 0.2;
    case 'SILVER': return amount * 0.1;
    default: return 0;
  }
}`,
    cleanCode: `// Strategy / Polymorphism
interface DiscountStrategy {
  calculate(amount: number): number;
}
class GoldDiscount implements DiscountStrategy {
  calculate(amount: number) { return amount * 0.2; }
}`,
    explanation: {
      tr: "Switch blokları yerine Strategy Pattern kullanarak sistemi 'Gelişime açık, değişime kapalı' (Open-Closed) hale getirdik.",
      en: "Replaced branching switch statements with polymorphic Strategy patterns honoring the Open/Closed Principle."
    }
  }
];

const RefactoringSurgery: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const [activeScenario, setActiveScenario] = useState(0);
  const [isSurgeryDone, setIsSurgeryDone] = useState(false);

  const nextScenario = () => {
    setActiveScenario((prev) => (prev + 1) % scenarios.length);
    setIsSurgeryDone(false);
  };

  const s = scenarios[activeScenario];

  return (
    <div className="container" style={{ padding: '60px 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem' }}>
        
        {/* Left Info Panel */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
             <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '12px', borderRadius: '16px', color: '#ef4444' }}>
                <Scissors size={24} />
             </div>
             <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase' }}>{s.category}</span>
                <h2 style={{ fontSize: '2rem', color: 'white' }}>{isEn ? s.title.en : s.title.tr}</h2>
             </div>
          </div>

          <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem', borderLeft: '4px solid #ef4444' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', marginBottom: '1rem', fontWeight: 700 }}>
                <AlertTriangle size={18} /> {isEn ? "PATHOLOGICAL FINDING" : "PATOLOJİK BULGU"}
             </div>
             <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{isEn ? s.problem.en : s.problem.tr}</p>
          </div>

          <AnimatePresence mode="wait">
            {isSurgeryDone && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card" 
                style={{ padding: '2rem', borderLeft: '4px solid var(--primary)', background: 'rgba(59, 130, 246, 0.05)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '1rem', fontWeight: 700 }}>
                    <Sparkles size={18} /> {isEn ? "SURGERY RESULT" : "CERRAHİ SONUÇ"}
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{isEn ? s.explanation.en : s.explanation.tr}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            onClick={nextScenario}
            style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}
          >
            {isEn ? "Next Case" : "Sonraki Vaka"} ({activeScenario + 1} / {scenarios.length}) <ArrowRight size={18} />
          </button>
        </div>

        {/* Right Code Panel */}
        <div style={{ position: 'relative' }}>
           <div className="glass-card" style={{ 
             padding: '0', 
             overflow: 'hidden', 
             minHeight: '650px', 
             display: 'flex',
             flexDirection: 'column',
             background: '#0a0f1e', 
             border: '1px solid var(--glass-border)',
             boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
           }}>
              {/* Editor Header */}
              <div style={{ background: '#1a1f2e', padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                 <div style={{ display: 'flex', gap: '0.6rem' }}>
                    <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#ff5f56' }}></div>
                    <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                    <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#27c93f' }}></div>
                 </div>
                 <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 700, letterSpacing: '1.5px', opacity: 0.8 }}>
                    {isSurgeryDone ? 'CLEAN_CODE.TS' : 'DIRTY_CODE.JS'}
                 </div>
                 <div style={{ color: 'var(--text-secondary)', opacity: 0.5 }}><Code2 size={18} /></div>
              </div>

              {/* Code Content */}
              <div style={{ padding: '3rem 2.5rem', flex: 1, minHeight: '350px', position: 'relative' }}>
                <AnimatePresence mode="wait">
                  {!isSurgeryDone ? (
                    <motion.pre
                      key={`dirty-${activeScenario}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      style={{ margin: 0, color: '#e2e8f0', fontFamily: 'monospace', fontSize: '1rem', lineHeight: 1.7, overflowX: 'auto' }}
                    >
                      <code>{s.dirtyCode}</code>
                      <Ghost size={60} style={{ opacity: 0.05, position: 'absolute', bottom: '1rem', right: '1rem' }} />
                    </motion.pre>
                  ) : (
                    <motion.pre
                      key={`clean-${activeScenario}`}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      style={{ margin: 0, color: '#60a5fa', fontFamily: 'monospace', fontSize: '1rem', lineHeight: 1.7, overflowX: 'auto' }}
                    >
                      <code>{s.cleanCode}</code>
                      <Bot size={60} style={{ opacity: 0.1, position: 'absolute', bottom: '1rem', right: '1rem', color: '#60a5fa' }} />
                    </motion.pre>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Button - Pushed Down */}
              <div style={{ padding: '3rem', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.3)' }}>
                 <button 
                  onClick={() => setIsSurgeryDone(!isSurgeryDone)}
                  className="surgery-btn"
                  style={{
                    width: '100%',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    border: 'none',
                    background: isSurgeryDone ? 'rgba(39, 201, 63, 0.15)' : 'var(--primary)',
                    color: isSurgeryDone ? '#4ade80' : 'white',
                    fontWeight: 900,
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1.2rem',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    boxShadow: isSurgeryDone ? 'none' : '0 10px 40px var(--primary-glow)'
                  }}
                 >
                   {isSurgeryDone ? (
                     <><CheckCircle2 size={24} /> {isEn ? "Operation Complete (Revert)" : "Operasyon Tamamlandı (Geri Dön)"}</>
                   ) : (
                     <><Scissors size={24} /> {isEn ? "Initiate Code Surgery ⚡" : "Cerrahi Müdahaleyi Başlat ⚡"}</>
                   )}
                 </button>
              </div>
           </div>

           {/* Backdrop Glow */}
           <div style={{ 
             position: 'absolute', 
             top: '50%', 
             left: '50%', 
             transform: 'translate(-50%, -50%)', 
             width: '100%', 
             height: '100%', 
             background: isSurgeryDone ? 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, transparent 70%)',
             zIndex: -1,
             transition: 'all 0.5s'
           }}></div>
        </div>
      </div>
    </div>
  );
};

export default RefactoringSurgery;
