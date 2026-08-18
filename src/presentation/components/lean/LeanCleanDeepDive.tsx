import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Layers, Code2, Scale } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const LeanCleanDeepDive: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const stats = [
    { label: isEn ? 'Effort' : 'Efor', val: 30, color: '#f59e0b' },
    { label: isEn ? 'Velocity' : 'Hız', val: 95, color: '#84cc16' },
    { label: isEn ? 'Quality' : 'Kalite', val: 90, color: '#3b82f6' },
    { label: isEn ? 'Boilerplate' : 'Boilerplate', val: 10, color: '#ef4444' }
  ];

  return (
    <section style={{ padding: '120px 0', borderTop: '1px solid var(--glass-border)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(132, 204, 22, 0.1)', color: '#84cc16', padding: '6px 12px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 900, marginBottom: '1.5rem', border: '1px solid rgba(132, 204, 22, 0.2)' }}>
              <Flame size={14} /> {isEn ? "THE NEW GOLD STANDARD" : "YENİ ALTIN STANDART"}
            </div>
            <h2 style={{ fontSize: '3.5rem', fontWeight: 950, color: 'white', marginBottom: '2rem', lineHeight: 1, letterSpacing: '-2px' }}>
              Lean <span className="gradient-text">Clean Architecture</span>
            </h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2.5rem' }}>
              {isEn 
                ? "Traditional Clean Architecture offers disciplined structure; combining it with Lean principles unlocks Pure Development Velocity. Every extra folder, interface, and layer has an ongoing maintenance rent. Pay only for what brings immediate value."
                : "Geleneksel Clean Architecture harika bir disiplindir ancak Lean felsefesiyle birleştiğinde 'Saf Geliştirme Hızı' (Pure Velocity) doğar. Her klasörün, her interface'in ve her satır kodun bir 'kira' bedeli vardır (Maintenance Cost). Sadece ihtiyacınız olanın kirasını ödeyin."
              }
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', flexShrink: 0 }}>
                  <Layers size={24} />
                </div>
                <div>
                  <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>Vertical Slice Over Layered Bloat</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {isEn 
                      ? "Organize features into self-contained Vertical Slices instead of over-fragmented horizontal tiers." 
                      : "Özellikleri yatay katmanlara boğmak yerine, dikey dilimler (Vertical Slices) halinde organize edin. Bağımsızlık hızı getirir."
                    }
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', flexShrink: 0 }}>
                  <Code2 size={24} />
                </div>
                <div>
                  <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>Functional Use Cases</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    {isEn 
                      ? "Write use-cases as pure stateless functions. Cut Dependency Injection ceremony and boilerplate by 80%." 
                      : "UseCase'leri sınıflar yerine saf fonksiyonlar olarak yazın. Dependency Injection karmaşasını %80 azaltın."
                    }
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card" 
            style={{ padding: '3rem', position: 'relative' }}
          >
            <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Scale size={20} color="#84cc16" /> {isEn ? "Pragmatism Scale" : "Pragmatizm Ölçeği"}
            </h3>
            <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', gap: '2rem', padding: '1rem 0', borderBottom: '1px solid var(--glass-border)' }}>
               {stats.map((s, i) => (
                 <div key={i} style={{ flex: 1, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: '1rem' }}>
                    <motion.div 
                      initial={{ height: 0 }}
                      whileInView={{ height: `${s.val}%` }}
                      viewport={{ once: true }}
                      style={{ width: '100%', borderRadius: '8px 8px 0 0', background: `linear-gradient(to top, ${s.color}20, ${s.color}EE)` }} 
                    />
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{s.label}</span>
                 </div>
               ))}
            </div>
            <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center', fontStyle: 'italic' }}>
              {isEn 
                ? '"Lean Architecture is the art of eliminating waste without sacrificing enterprise resilience."' 
                : '"Lean Architecture, kurumsal standartlardan ödün vermeden \'Angarya Kod\'u (Waste) yok eden bir denge sanatıdır."'
              }
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LeanCleanDeepDive;
