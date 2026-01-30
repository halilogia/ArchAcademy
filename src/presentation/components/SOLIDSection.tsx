import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileCode, Shield, Check, X, Info } from 'lucide-react';

const SOLIDSection = () => {
  const principles = {
    S: {
      name: 'Single Responsibility',
      full: 'Tek Sorumluluk Prensibi',
      desc: 'Bir sınıfın veya modülün tek bir değişme nedeni olmalıdır. Yani tek bir işi yapmalıdır.',
      bad: `class User {
  save() { /* DB kayıt */ }
  sendEmail() { /* Email at */ }
  logError() { /* Log yaz */ }
}`,
      good: `class UserRepository {
  save(user) { /* DB kayıt */ }
}
class EmailService {
  send(user) { /* Email at */ }
}`,
      why: 'Kodun bir kısmını değiştirdiğinizde alakasız yerlerin bozulmasını (side effect) engeller.'
    },
    O: {
      name: 'Open/Closed',
      full: 'Açık/Kapalı Prensibi',
      desc: 'Yazılım birimleri genişletilmeye açık, ancak değiştirilmeye kapalı olmalıdır.',
      bad: `function getArea(shape) {
  if (shape.type === 'circle') 
    return Math.PI * shape.r * shape.r;
  if (shape.type === 'square') 
    return shape.w * shape.w;
}`,
      good: `interface Shape { getArea(): number; }

class Circle implements Shape {
  getArea() { return Math.PI * this.r * this.r; }
}
class Square implements Shape {
  getArea() { return this.w * this.w; }
}`,
      why: 'Yeni bir özellik eklerken mevcut çalışan kodu modifiye etme riskini ortadan kaldırır.'
    },
    L: {
      name: 'Liskov Substitution',
      full: 'Liskov Yerine Geçme Prensibi',
      desc: 'Alt sınıflar, türetildikleri üst sınıfların yerine kullanılabilmelidir ve davranışlarını bozmamalıdır.',
      bad: `class Bird { fly() { ... } }
class Penguin extends Bird {
  fly() { throw new Error("Uçamam!"); }
} // HATA: Penguin, Bird'ün davranışını bozdu.`,
      good: `class Bird { /* ortak özellikler */ }
class FlyingBird extends Bird { fly() { ... } }
class Penguin extends Bird { swim() { ... } }`,
      why: 'Polimorfizmin güvenli çalışmasını ve kalıtım hiyerarşisinin tutarlı olmasını sağlar.'
    },
    I: {
      name: 'Interface Segregation',
      full: 'Arayüz Ayrımı Prensibi',
      desc: 'Kullanıcılar, kullanmadıkları metotları barındıran geniş arayüzlere zorlanmamalıdır.',
      bad: `interface Worker {
  work(): void;
  eat(): void;
}
class Robot implements Worker {
  work() { ... }
  eat() { /* Hata: Robot yemek yemez! */ }
}`,
      good: `interface Workable { work(): void; }
interface Eatable { eat(): void; }

class Human implements Workable, Eatable { ... }
class Robot implements Workable { ... }`,
      why: 'Sınıfları ihtiyaç duymadıkları bağımlılıklardan (fat interfaces) kurtarır.'
    },
    D: {
      name: 'Dependency Inversion',
      full: 'Bağımlılıkların Tersine Çevrilmesi',
      desc: 'Yüksek seviyeli modüller, düşük seviyeli modüllere bağımlı olmamalıdır. Her ikisi de soyutlamalara bağımlı olmalıdır.',
      bad: `class OrderService {
  // Somut bir sınıfa (SqlDb) göbekten bağlı
  constructor() { this.db = new SqlDb(); }
}`,
      good: `class OrderService {
  // Soyutlamaya (IDatabase) bağlı
  constructor(database: IDatabase) { 
    this.db = database; 
  }
}`,
      why: 'Clean Architecture\'ın temelidir; uygulamayı veritabanı veya framework değişimlerine karşı korur.'
    }
  };

  type PrincipleKey = keyof typeof principles;
  const [activeTab, setActiveTab] = useState<PrincipleKey>('S');

  return (
    <section style={{ padding: '100px 0' }}>
      <div className="container">
        {/* Navigation Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '4rem'
        }}>
          {(Object.keys(principles) as PrincipleKey[]).map(p => (
            <button
              key={p}
              onClick={() => setActiveTab(p)}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                background: activeTab === p ? '#6366f1' : 'var(--glass)',
                color: activeTab === p ? 'white' : 'var(--text-secondary)',
                fontSize: '1.5rem',
                fontWeight: 800,
                border: '1px solid var(--glass-border)',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
            >
              {p}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '3rem' }}
          >
            {/* Info Side */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ background: '#6366f1', padding: '12px', borderRadius: '12px', color: 'white' }}>
                  <Shield size={32} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: '#6366f1', fontWeight: 700, textTransform: 'uppercase' }}>{principles[activeTab].name}</h4>
                  <h2 style={{ fontSize: '1.75rem' }}>{principles[activeTab].full}</h2>
                </div>
              </div>

              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                {principles[activeTab].desc}
              </p>

              <div style={{ background: 'rgba(99, 102, 241, 0.05)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                   <Info size={24} color="#6366f1" style={{ flexShrink: 0 }} />
                   <div>
                      <h5 style={{ color: '#6366f1', marginBottom: '0.5rem' }}>Neden Önemli?</h5>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{principles[activeTab].why}</p>
                   </div>
                </div>
              </div>
            </div>

            {/* Code Side */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
               <div className="glass-card" style={{ padding: 0, overflow: 'hidden', background: '#0a0a0f', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                  <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444' }}>
                    <X size={16} /> <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>BAD PRACTICE</span>
                  </div>
                  <pre style={{ padding: '1.5rem', fontSize: '0.9rem', color: '#e2e8f0' }}>
                    <code>{principles[activeTab].bad}</code>
                  </pre>
               </div>

               <div className="glass-card" style={{ padding: 0, overflow: 'hidden', background: '#0a0a0f', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                  <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981' }}>
                    <Check size={16} /> <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>GOOD PRACTICE</span>
                  </div>
                  <pre style={{ padding: '1.5rem', fontSize: '0.9rem', color: '#e2e8f0' }}>
                    <code>{principles[activeTab].good}</code>
                  </pre>
               </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SOLIDSection;
