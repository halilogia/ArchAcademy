import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { useProgress } from '../../context/ProgressContext';
import { 
  Skull, 
  Trash2, 
  ZapOff, 
  AlertOctagon, 
  Construction,
  Bomb,
  Flame,
  Bug
} from 'lucide-react';

const AntiPatternsPage = () => {
  const { completeStep } = useProgress();

  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/anti-patterns');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const antiPatterns = [
    {
      title: "The Big Ball of Mud",
      icon: <Trash2 size={24} />,
      color: "#64748b",
      desc: "Hiçbir belirgin mimarisi, kuralı veya sınırı olmayan kaos yapısı. Kodlar birbirine o kadar girmiştir ki, bir uca dokunursanız öbür uç patlar.",
      symptoms: ["Takip edilemeyen veri akışı", "Binlerce satırlık dosyalar", "Bir bug düzeltilirken iki yenisinin çıkması"]
    },
    {
      title: "God Object",
      icon: <Bomb size={24} />,
      color: "#ef4444",
      desc: "Uygulamanın tüm sorumluluğunu üstlenen, her şeyi bilen ve her şeye dokunan devasa sınıflar. Single Responsibility prensibinin baş düşmanı.",
      symptoms: ["Aşırı kalabalık sınıflar", "Her yerden bu nesneye erişim", "Test edilemezlik zirvesi"]
    },
    {
      title: "Lasagna Architecture",
      icon: <Construction size={24} />,
      color: "#f59e0b",
      desc: "O kadar çok soyutlama katmanı vardır ki, basit bir veri akışını izlemek için 10 farklı dosyayı gezmek zorunda kalırsınız.",
      symptoms: ["Anlamsız katman fazlalığı", "Düşük geliştirme hızı", "Her katmanın birbirine bağımlı olması"]
    },
    {
      title: "Stovepipe System",
      icon: <AlertOctagon size={24} />,
      color: "#8b5cf6",
      desc: "Birbirinden tamamen kopuk, kendi dilleri olan ve asla haberleşemeyen servisler topluluğu. 'Integration Hell' garantilidir.",
      symptoms: ["Tekrarlanan kod blokları", "Format uyumsuzlukları", "Merkezi yönetim eksikliği"]
    }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ArchHero 
        title="Hall of Shame"
        subtitle="Anti-Patterns Galerisi"
        description="Mimaride neyi yapacağın kadar, neyi YAPMAMAN gerektiğini de bilmelisin. En yaygın mimari tuzakları ve kod facilarını keşfet."
        badge="Architecture Warnings"
        color="#ef4444"
        illustration={
          <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ repeat: Infinity, duration: 4 }}
              style={{ padding: '2.5rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '32px', border: '2px solid #ef444433' }}
            >
               <Skull size={90} color="#ef4444" />
            </motion.div>
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ repeat: Infinity, duration: 3, delay: 1 }}
              style={{ position: 'absolute', top: '20px', left: '20px' }}
            >
               <ZapOff size={32} color="#ef4444" />
            </motion.div>
             <motion.div
              animate={{ 
                scale: [0, 1.2, 0],
                opacity: [0, 1, 0]
              }}
              transition={{ repeat: Infinity, duration: 5, delay: 2 }}
              style={{ position: 'absolute', bottom: '40px', right: '40px' }}
            >
               <Bomb size={32} color="#f59e0b" />
            </motion.div>
          </div>
        }
        features={[
          { icon: <Flame />, title: "Risk Analizi", desc: "Hangi pattern ne zaman projeyi yakar?" },
          { icon: <Bug />, title: "Tedavi", desc: "Anti-pattern'den kurtulma stratejileri." },
          { icon: <AlertOctagon />, title: "Erken Teşhis", desc: "Kod kokularını (Code Smells) tanıma." }
        ]}
      />

      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2.5rem' }}>
            {antiPatterns.map((p, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="glass-card" 
                style={{ padding: '2.5rem', borderLeft: `6px solid ${p.color}` }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', color: p.color }}>
                   {p.icon}
                   <h3 style={{ margin: 0, fontSize: '1.8rem', color: 'white' }}>{p.title}</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2rem', fontSize: '1.1rem' }}>{p.desc}</p>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1.5rem', borderRadius: '16px' }}>
                   <div style={{ fontSize: '0.8rem', fontWeight: 900, marginBottom: '1rem', color: p.color, textTransform: 'uppercase', letterSpacing: '1px' }}>Belirtiler (Symptoms)</div>
                   <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                      {p.symptoms.map((s, si) => (
                        <li key={si} style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', display: 'flex', gap: '10px' }}>
                           <span style={{ color: p.color }}>•</span> {s}
                        </li>
                      ))}
                   </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
           <div style={{ 
             background: 'linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.5) 100%)', 
             padding: '3rem', 
             borderRadius: '24px', 
             border: '1px solid rgba(255,255,255,0.05)',
             maxWidth: '900px',
             margin: '0 auto'
           }}>
              <div style={{ fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', marginBottom: '1rem', textTransform: 'uppercase' }}>
                Refactoring Guide
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                AntiPattern'lerin tanımı ve bunlardan kurtulma yöntemleri hakkında en kapsamlı kaynak William Brown'un kitabıdır.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://sourcemaking.com/antipatterns" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(239, 68, 68, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    AntiPatterns Catalog (SourceMaking) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AntiPatternsPage;
