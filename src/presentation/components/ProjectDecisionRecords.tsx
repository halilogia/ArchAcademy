import React from 'react';
import { motion } from 'framer-motion';
import { Book, Cpu, ShieldAlert, ArrowRightLeft, Zap, FileCode, Palette } from 'lucide-react';

const ProjectDecisionRecords = () => {
  const decisions = [
    {
      title: "JavaScript -> TypeScript Migration",
      icon: <FileCode color="#3178c6" />,
      status: "Completed",
      why: "Başlangıçta hızlı prototipleme için JS seçildi ancak mimari büyüdükçe tip güvenliği zorunluluk haline geldi. Hibrit bir geçiş süreci yerine tam 'Migration' yapıldı.",
      impact: "Tüm proje %100 TypeScript (.tsx) yapısına kavuştu. Katmanlar arası sözleşmeler artık Tip Güvenliği altında."
    },
    {
      title: "Context API over Redux/Zustand",
      icon: <Zap color="#f59e0b" />,
      status: "Stable",
      why: "Projenin state karmaşıklığı (Progress, Wizard) orta seviyede olduğu için ek kütüphane bağımlılığını azaltmak ve React'in native gücünü kullanmak tercih edildi.",
      impact: "Daha az 'Boilerplate' ve daha hafif bir bundle size."
    },
    {
      title: "Vanilla CSS over CSS-in-JS",
      icon: <Palette color="#ec4899" />,
      status: "Stable",
      why: "Runtime performansını (JS parse maliyetini) düşürmek ve stil katmanını React Framework'ünden bağımsız kılmak için saf CSS + CSS Variables kullanıldı.",
      impact: "Sıfır JS runtime maliyeti ve %100 taşınabilir bir tasarım sistemi."
    },
    {
      title: "Manual Data Mapping",
      icon: <ArrowRightLeft color="#10b981" />,
      status: "Standardized",
      why: "Infrastructure'dan gelen ham verinin UI'ı kirletmemesi için Domain katmanında 'Calculators' ve 'Mappers' kullanıldı.",
      impact: "UI sadece ihtiyacı olan veriyi bilerek tamamen 'Agnostic' kaldı."
    },
    {
      title: "Lazy Loading & Fault Isolation",
      icon: <Cpu color="#8b5cf6" />,
      status: "Implemented",
      why: "Tek bir sayfanın (modülün) yüklenme hatası tüm uygulamanın çökmesine neden olmamalıydı. 'Lazy Loading' ve 'Error Boundaries' uygulandı.",
      impact: "Sistem, bir parça bozulsa bile çalışmaya devam eder (Bulkhead Pattern)."
    }
  ];

  return (
    <section style={{ padding: '100px 0', background: 'rgba(2, 6, 23, 0.4)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
           <h2 className="section-title">The Architect's Log</h2>
           <p style={{ color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto' }}>
              Projeyi %100 anlamak için sadece kodları değil, o kodların neden yazıldığını (Decision Records) bilmelisin.
           </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
           {decisions.map((d, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="glass-card"
               style={{ padding: '2.5rem' }}
             >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                   {d.icon}
                   <span style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', opacity: 0.5 }}>{d.status}</span>
                </div>
                <h4 style={{ marginBottom: '1rem' }}>{d.title}</h4>
                <div style={{ marginBottom: '1.5rem', opacity: 0.8 }}>
                   <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 800, marginBottom: '0.5rem' }}>NEDEN?</div>
                   <p style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>{d.why}</p>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
                   <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 800, marginBottom: '0.5rem' }}>ETKİSİ</div>
                   <p style={{ fontSize: '0.8rem', margin: 0, opacity: 0.7 }}>{d.impact}</p>
                </div>
             </motion.div>
           ))}
        </div>

        {/* Technical Warning */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          style={{ 
            marginTop: '4rem', 
            padding: '2rem', 
            borderRadius: '24px', 
            background: 'rgba(239, 68, 68, 0.05)', 
            border: '1px solid rgba(239, 68, 68, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '2rem'
          }}
        >
           <div style={{ background: '#ef4444', color: 'white', padding: '1rem', borderRadius: '16px' }}>
              <ShieldAlert size={32} />
           </div>
           <div>
              <h5 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>Mimari Uyarı (Architecture Violation Alert)</h5>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Eğer bir gün bir Use Case içinde direkt 'useState' veya 'window.location' görürseniz, dökümantasyonu 
                yırtıp atabilirsiniz. Bu projede her katman kendi sınırları içerisinde kalmak zorundadır.
              </p>
           </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectDecisionRecords;
