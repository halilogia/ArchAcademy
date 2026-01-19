import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors, Sparkles, AlertTriangle, CheckCircle2, ArrowRight, Code2, Bot, Ghost } from 'lucide-react';

const scenarios = [
  {
    id: 1,
    title: "1. The God Function (Her Şeyi Yapan)",
    problem: "Tek bir fonksiyonda; doğrulama, veritabanı kaydı, e-posta gönderimi ve loglama yapılıyor. Kodun okunması ve test edilmesi imkansız.",
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
    explanation: "Single Responsibility Principle (SRP) uygulandı. İş mantığı, veri erişimi ve bildirimler farklı sınıflara bölündü."
  },
  {
    id: 2,
    title: "2. Spagetti İf-Else (Arrow Code)",
    problem: "Kod sağa doğru bir ok gibi kayıyor. Okumak için sürekli zihinsel takip gerekiyor.",
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
    explanation: "Erken Return (Guard Clause) tekniğiyle iç içe if bloklarını yok ettik. Kod artık dümdüz okunuyor."
  },
  {
    id: 3,
    title: "3. İlkel Takıntısı (Primitive Obsession)",
    problem: "Para birimi, tarih veya adres gibi kompleks yapıları hala raw (ilkel) string/number olarak tutmak hata payını artırır.",
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
    explanation: "Veriyi 'Value Object' (Değer Nesnesi) içine hapsettik. Artık hatalı para birimi oluşturulamaz bile."
  },
  {
    id: 4,
    title: "4. Parametre Çorbası",
    problem: "Bir fonksiyon 3'ten fazla parametre alıyorsa, orada bir sorun var demektir. Parametrelerin sırası karışabilir.",
    category: "Signature Refactor",
    dirtyCode: `function createMenu(title, body, buttonText, cancellable, theme, onClick) {
  // Hangisi hangisiydi?
  // createMenu("Başlık", "İçerik", true, "Mavi", ...) 
  // HATA: true cancellable mı yoksa buttonText mi?
}`,
    cleanCode: `function createMenu({ title, body, options }) {
  // Parametreleri bir Obje içinde grupla
  // options: { buttonText, cancellable, theme, onClick }
}

// Kullanımı:
createMenu({
  title: "Başlık",
  options: { cancellable: true, theme: "blue" }
});`,
    explanation: "`options` objesi kullanarak parametre sırası ezberleme derdinden kurtulduk. Kod okunaklı ve genişletilebilir oldu."
  },
  {
    id: 5,
    title: "5. Bağımlılık (Dependency) Spagettisi",
    problem: "Servisler birbirini 'new' anahtar kelimesiyle oluşturuyor. Bu durum sınıfları birbirine sıkı sıkıya bağlar (Tight Coupling).",
    category: "Coupling",
    dirtyCode: `class PaymentService {
  process() {
    // KÖTÜ: Sınıfın içinde new'lemek
    const logger = new MyLogger();
    const db = new PostgresDB();
    
    logger.info('Processing...');
    db.savePayment();
  }
}`,
    cleanCode: `class PaymentService {
  // İYİ: Dependency Injection (Constructor Injection)
  constructor(logger, db) {
    this.logger = logger;
    this.db = db;
  }

  process() {
    this.logger.info('Processing...');
    this.db.savePayment();
  }
}`,
    explanation: "Bağımlılıkları dışarıdan (Constructor) aldık. Böylece test yazarken gerçek DB yerine sahte (Mock) DB verebiliriz."
  },
  {
    id: 6,
    title: "6. Framework Tuzağı (Architecture)",
    problem: "React Bileşeni (UI) iş mantığı, API çağrısı ve Veritabanı işlemleriyle kirlenmiş. React değişirse her şey çöpe gider.",
    category: "Architectural Surgery",
    dirtyCode: `// BadReactComponent.jsx
const LoginButton = () => {
  const handleLogin = async () => {
    // 1. Validasyon UI içinde!
    if(!email.includes('@')) return alert('Hata');
    
    // 2. İş Mantığı UI içinde!
    const user = await axios.post('/api/login', { email });
    
    // 3. Veri Saklama UI içinde!
    localStorage.setItem('token', user.token);
    window.location.href = '/dashboard';
  };
  return <button onClick={handleLogin}>Giriş</button>;
}`,
    cleanCode: `// 1. UI (Sadece Görüntü)
const LoginButton = ({ loginUseCase }) => {
  // React sadece tetikleyici
  return <button onClick={() => loginUseCase.execute(email)}>Giriş</button>;
}

// 2. Domain (Saf Mantık)
class LoginUseCase {
  async execute(email) {
    if(!isValid(email)) throw new InvalidEmailError();
    const user = await this.authRepo.login(email);
    this.storage.save(user.token);
  }
}`,
    explanation: "React sadece bir aptal UI bileşenine dönüştü. Tüm 'Login' mantığı dışarıdaki (Framework-less) UseCase sınıfına taşındı."
  },
  {
    id: 7,
    title: "7. Bonus: Switch Case Cehennemi",
    problem: "Yeni bir tip eklendiğinde sürekli dev switch bloklarını güncellemek zorunda kalıyorsunuz.",
    category: "Open/Closed Principle",
    dirtyCode: `function getDiscount(userType) {
  switch(userType) {
    case 'VIP': return 0.2;
    case 'Premium': return 0.1;
    // ... 100 satır daha ...
    case 'Standard': return 0.05;
  }
}`,
    cleanCode: `const DISCOUNTS = {
  VIP: 0.2,
  Premium: 0.1,
  Standard: 0.05
};

function getDiscount(userType) {
  return DISCOUNTS[userType] || 0;
}`,
    explanation: "Switch bloğunu bir 'Lookup Object' (Sözlük) yapısına çevirdik. Artık yeni tip eklemek için koda dokunmaya gerek yok, objeye eklemek yeterli."
  }
];

const RefactoringSurgery = () => {
  const [activeScenario, setActiveScenario] = useState(0);
  const [isSurgeryDone, setIsSurgeryDone] = useState(false);

  const resetSurgery = () => {
    setIsSurgeryDone(false);
  };

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
                <h2 style={{ fontSize: '2rem', color: 'white' }}>{s.title}</h2>
             </div>
          </div>

          <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem', borderLeft: '4px solid #ef4444' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', marginBottom: '1rem', fontWeight: 700 }}>
                <AlertTriangle size={18} /> PATOLOJİK BULGU
             </div>
             <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.problem}</p>
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
                    <Sparkles size={18} /> CERRAHİ SONUÇ
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            onClick={nextScenario}
            style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: 700, cursor: 'pointer' }}
          >
            Sonraki Vaka <ArrowRight size={18} />
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
                    {isSurgeryDone ? 'CLEAN_CODE.JS' : 'DIRTY_CODE.JS'}
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
                  onMouseEnter={(e) => {
                    if(!isSurgeryDone) {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.filter = 'brightness(1.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.filter = 'brightness(1)';
                  }}
                 >
                   {isSurgeryDone ? (
                     <><CheckCircle2 size={24} /> Operasyon Tamamlandı (Geri Dön)</>
                   ) : (
                     <><Scissors size={24} /> Cerrahi Müdahaleyi Başlat</>
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
