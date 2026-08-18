import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, ArrowRightLeft, Zap, FileCode, Palette, Globe, Bot } from 'lucide-react';

const ProjectDecisionRecords = () => {
  const decisions = [
    {
      title: "JavaScript -> TypeScript 5 Migration",
      icon: <FileCode color="#3178c6" />,
      status: "Completed",
      why: "Başlangıçta prototipleme için JS seçildi ancak mimari 88 sayfaya büyüdükçe katı tip güvenliği zorunluluk haline geldi.",
      impact: "Tüm proje %100 TypeScript (.tsx/.ts) yapısına kavuştu. Katmanlar arası sözleşmeler artık Tip Güvenliği altında."
    },
    {
      title: "Decoupled Data & Multi-Language SoC",
      icon: <Globe color="#10b981" />,
      status: "Implemented",
      why: "Bileşenler içine gömülü devasa metin blokları kod okunabilirliğini düşürüyordu. Veri setleri (ComparisonMatrixData, AcronymsData, locales/en) sunum katmanından tamamen ayrıştırıldı.",
      impact: "Bileşen boyutları %70 azaldı ve tüm akademi sıfır gecikmeli dinamik çift dilli (TR/EN) altyapıya kavuştu."
    },
    {
      title: "Autonomous Swarm Multi-Agent Engine",
      icon: <Bot color="#8b5cf6" />,
      status: "Standardized",
      why: "88 sayfalık teknik mimari içeriğini manuel çevirmek haftalar alacaktı. Yerel 9Router modelleriyle çalışan 8 worker'lı asenkron bir orkestratör kuruldu.",
      impact: "Tüm sayfalar 6.5 dakikada, $0 maliyetle ve katı teknik terim kurallarıyla (Bounded Context, Aggregate vb.) eksiksiz üretildi."
    },
    {
      title: "Context API over Redux/Zustand",
      icon: <Zap color="#f59e0b" />,
      status: "Stable",
      why: "Projenin state karmaşıklığı (Progress, i18n, Theme) için ek harici kütüphane bağımlılığı yaratmak yerine React'in native gücü tercih edildi.",
      impact: "Daha az 'Boilerplate' ve daha hafif bir bundle size."
    },
    {
      title: "Vanilla CSS over CSS-in-JS",
      icon: <Palette color="#ec4899" />,
      status: "Stable",
      why: "Runtime performansını (JS parse maliyetini) sıfıra indirmek ve stil katmanını frameworklerden bağımsız kılmak için saf CSS + CSS Variables kullanıldı.",
      impact: "Sıfır JS runtime maliyeti ve %100 taşınabilir bir tasarım sistemi."
    },
    {
      title: "Lazy Loading & Fault Isolation",
      icon: <Cpu color="#06b6d4" />,
      status: "Implemented",
      why: "Tek bir sayfanın yüklenme hatası tüm uygulamanın çökmesine neden olmamalıydı. 'Lazy Loading' ve 'Error Boundaries' uygulandı.",
      impact: "Sistem, bir parça bozulsa bile çalışmaya devam eder (Bulkhead Pattern)."
    }
  ];

  return (
    <section style={{ padding: '100px 0', background: 'rgba(2, 6, 23, 0.4)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
           <h2 className="section-title">The Architect's Log (ADR)</h2>
           <p style={{ color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto' }}>
              Projeyi %100 anlamak için sadece kodları değil, o kodların neden ve nasıl yazıldığını (Architecture Decision Records) bilmelisiniz.
           </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
           {decisions.map((d, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.08 }}
               className="glass-card"
               style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', borderTop: '4px solid var(--primary)' }}
             >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         {d.icon}
                      </div>
                      <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'white' }}>{d.title}</h4>
                   </div>
                   <span style={{ 
                     fontSize: '0.7rem', 
                     fontWeight: 800, 
                     padding: '4px 10px', 
                     borderRadius: '100px', 
                     background: d.status === 'Completed' || d.status === 'Implemented' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                     color: d.status === 'Completed' || d.status === 'Implemented' ? '#10b981' : '#3b82f6',
                     border: `1px solid ${d.status === 'Completed' || d.status === 'Implemented' ? '#10b98133' : '#3b82f633'}`
                   }}>
                      {d.status}
                   </span>
                </div>

                <div>
                   <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                      Neden Karar Verildi? (Context)
                   </div>
                   <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                      {d.why}
                   </p>
                </div>

                <div style={{ marginTop: 'auto', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                   <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#94a3b8', marginBottom: '0.3rem', textTransform: 'uppercase' }}>
                      Mimari Etki (Impact)
                   </div>
                   <div style={{ color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.5 }}>
                      {d.impact}
                   </div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectDecisionRecords;
