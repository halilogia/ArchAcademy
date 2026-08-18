import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Combine, AlertTriangle, CheckCircle2, GitFork } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const CompositionOverInheritanceTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div key="composition" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          {isEn ? "Favor Composition Over Inheritance" : "Bileşim Kalıtımdan Üstündür (Composition Over Inheritance)"}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '800px' }}>
          {isEn 
            ? "Inheritance creates rigid 'is-a' relationships that break encapsulation (Fragile Base Class problem). Composition builds flexible 'has-a' behaviors via swappable interfaces." 
            : "Kalıtım ('is-a' ilişkisi), üst sınıfta yapılan bir değişikliğin tüm alt sınıfları bozduğu Kırılgan Temel Sınıf (Fragile Base Class) problemine yol açar. Bileşim ('has-a' ilişkisi) ise yetenekleri küçük arayüzler olarak nesneye enjekte eder."
          }
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Inheritance Pitfall */}
          <div style={{ background: '#020617', padding: '1.75rem', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.3)', borderTop: '4px solid #ef4444' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ color: '#ef4444', fontWeight: 800, fontSize: '1.1rem' }}>
                {isEn ? "❌ Deep Inheritance Tree (Rigid)" : "❌ Derin Kalıtım Ağacı (Kırılgan)"}
              </h4>
              <span style={{ fontSize: '0.75rem', fontWeight: 900, background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', padding: '3px 8px', borderRadius: '6px' }}>
                Coupled
              </span>
            </div>
            <pre style={{ background: '#090d16', padding: '1rem', borderRadius: '8px', border: '1px solid #1e293b', color: '#f87171', fontFamily: 'monospace', fontSize: '0.8rem', marginBottom: '1rem', overflowX: 'auto' }}>
{`class Animal { walk() {} }
class Bird extends Animal { fly() {} }
class Penguin extends Bird {
  fly() {
    // 💥 Penguen uçamaz! LSP ihlali ve tasarım patlaması!
    throw new Error("Cannot fly!");
  }
}`}
            </pre>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
              {isEn ? "Subclasses inherit unwanted methods, violating Liskov Substitution Principle." : "Alt sınıflar kullanmadıkları davranışları zorla miras alır, kod patlar."}
            </p>
          </div>

          {/* Composition Solution */}
          <div style={{ background: '#020617', padding: '1.75rem', borderRadius: '16px', border: '1px solid rgba(34, 197, 94, 0.3)', borderTop: '4px solid #22c55e' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ color: '#22c55e', fontWeight: 800, fontSize: '1.1rem' }}>
                {isEn ? "✅ Composition / Strategy (Flexible)" : "✅ Bileşim ve Yetenek Enjeksiyonu"}
              </h4>
              <span style={{ fontSize: '0.75rem', fontWeight: 900, background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '3px 8px', borderRadius: '6px' }}>
                Flexible & Clean
              </span>
            </div>
            <pre style={{ background: '#090d16', padding: '1rem', borderRadius: '8px', border: '1px solid #1e293b', color: '#4ade80', fontFamily: 'monospace', fontSize: '0.8rem', marginBottom: '1rem', overflowX: 'auto' }}>
{`interface IFlyBehavior { fly(): void; }
interface ISwimBehavior { swim(): void; }

class Bird {
  constructor(
    private flyBehavior: IFlyBehavior,
    private swimBehavior: ISwimBehavior
  ) {}
  performFly() { this.flyBehavior.fly(); }
}`}
            </pre>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
              {isEn ? "Behaviors are encapsulated in strategies and injected without inheritance rigidity." : "Davranışlar bağımsız stratejiler olarak nesneye verilir; sıfır yan etki."}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CompositionOverInheritanceTab;
