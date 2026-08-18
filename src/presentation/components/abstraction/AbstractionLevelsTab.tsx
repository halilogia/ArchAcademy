import React from 'react';
import { motion } from 'framer-motion';
import { Layers, AlertTriangle, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const AbstractionLevelsTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const levels = [
    {
      title: isEn ? "1. Under-Abstraction (Yetersiz)" : "1. Yetersiz Soyutlama (Under-Abstraction)",
      badge: isEn ? "High Coupling" : "Sıkı Bağımlılık & Spagetti",
      color: '#ef4444',
      codeSnippet: `// ❌ UI içinde doğrudan veritabanı sorgusu & ham SQL
export const UserList = () => {
  const fetchUsers = () => {
    db.query("SELECT * FROM users WHERE active = 1");
  };
};`,
      desc: isEn 
        ? "Raw coupling to infrastructure, hardcoded SQL, or external APIs directly within UI components. Impossible to unit test or swap implementations." 
        : "Altyapı (SQL, HTTP API) doğrudan sunum katmanına gömülüdür. Mock edilemez, test edilemez ve teknoloji değiştirilemez."
    },
    {
      title: isEn ? "2. Over-Abstraction (Aşırı Soyutlama)" : "2. Aşırı Soyutlama (Over-Engineering)",
      badge: isEn ? "YAGNI Violation" : "YAGNI İhlali & Fazlalık",
      color: '#f59e0b',
      codeSnippet: `// ❌ Tek bir basit iş için 5 soyut katman
interface IAbstractUserFactoryProviderManager {}
class ConcreteUserFactoryProviderManagerAdapter implements IAbstractUserFactoryProviderManager {}`,
      desc: isEn 
        ? "Creating factories for factories and interfaces with only 1 implementation that will never change. Paralyzes codebase cognitive load." 
        : "'Gelecekte lazım olur' düşüncesiyle her şeye 5 katman arayüz ve fabrika yazma hastalığı. Kodun okunabilirliğini ve hızını felç eder."
    },
    {
      title: isEn ? "3. Pragmatic / Moderate Abstraction (İdeal Denge)" : "3. Dengeli Soyutlama (The Sweet Spot)",
      badge: isEn ? "AHA & Clean" : "AHA & DRY Dengesi",
      color: '#10b981',
      codeSnippet: `// ✅ İhtiyaç doğduğunda izole edilen Port & Domain Modeli
export interface IUserRepository {
  findById(id: string): Promise<User | null>;
}
// Sadece 1 net arayüz ve odaklı implementasyon`,
      desc: isEn 
        ? "Apply AHA (Avoid Hasty Abstraction): Wait for duplication (WET) before abstracting. Abstract only along domain boundaries and volatility points." 
        : "AHA Prensibi: Acele soyutlamadan kaçının. Kod netleşene kadar bekleyin. Yalnızca değişen dış bağımlılıkları arayüz arkasına gizleyin."
    }
  ];

  return (
    <motion.div key="levels" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          {isEn ? "The Spectrum of Software Abstraction" : "Doğru Soyutlama Seviyesi Spektrumu"}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '800px' }}>
          {isEn 
            ? "Mastering abstraction means knowing NOT just how to create interfaces, but when NOT to create them. Finding the balance between rigidity and over-engineering." 
            : "İyi bir mimar, sadece arayüz (interface) açmayı değil, nerede arayüz açmaması gerektiğini bilendir. Yetersiz soyutlama kodunuzu kilitler, aşırı soyutlama ise boğar."
          }
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {levels.map((l, i) => (
            <div key={i} style={{ background: '#020617', padding: '1.75rem', borderRadius: '16px', border: `1px solid ${l.color}33`, borderTop: `4px solid ${l.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h4 style={{ color: 'white', fontWeight: 800, fontSize: '1.1rem' }}>{l.title}</h4>
                <span style={{ fontSize: '0.75rem', fontWeight: 900, background: `${l.color}22`, color: l.color, padding: '3px 8px', borderRadius: '6px' }}>
                  {l.badge}
                </span>
              </div>
              <pre style={{ background: '#090d16', padding: '1rem', borderRadius: '8px', border: '1px solid #1e293b', color: '#f8fafc', fontFamily: 'monospace', fontSize: '0.8rem', marginBottom: '1rem', overflowX: 'auto' }}>
                {l.codeSnippet}
              </pre>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>{l.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AbstractionLevelsTab;
