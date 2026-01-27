import React from 'react';
import { motion } from 'framer-motion';
import { 
  GitBranch, 
  ArrowRight, 
  Zap, 
  Database, 
  Layout, 
  Settings,
  Construction,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

const RefactoringGuide = () => {
  const spaghettiToMVVM = [
    {
      step: 1,
      title: "Mantığı Widget'tan Söküp Alın",
      desc: "Widget içindeki tüm `setState` ve `_islemYap()` fonksiyonlarını bulun. Bunları Widget'ın dışına, yeni açacağınız bir ViewModel sınıfına taşıyın.",
      icon: <Layout color="#ec4899" />
    },
    {
      step: 2,
      title: "ViewModel & State Bağlantısı",
      desc: "ViewModel içinde bir `Success`, `Loading`, `Error` state yapısı kurun. Flutter'da ChangeNotifier veya StateNotifier kullanarak UI'ı bu state'e abone edin.",
      icon: <Settings color="#ec4899" />
    },
    {
      step: 3,
      title: "Repo Soyutlaması",
      desc: "ViewModel içindeki direkt API/Firebase çağrılarını silin. Bunları bir 'Repository' sınıfına taşıyın. ViewModel artık sadece Repo'yu çağırır, API detayını bilmez.",
      icon: <Database color="#3b82f6" />
    }
  ];

  const hybridMigration = [
    {
      title: "Data & Domain'i Ortaklaştırın",
      desc: "Her feature klasöründeki ayrı ayrı modelleri ve repoları merkezi `lib/data` ve `lib/domain` klasörlerine taşıyın. Single Source of Truth sağlayın.",
      icon: <GitBranch color="#3b82f6" />
    },
    {
      title: "UI'ı Dikey (Vertical) Bölün",
      desc: "Arayüz kodlarını `lib/ui/features/<feature_name>` altına taşıyın. Her sayfanın kendi ViewModel'i o klasörün içinde, o sayfaya özel kalmalı.",
      icon: <Layout color="#10b981" />
    }
  ];

  return (
    <section style={{ padding: '100px 0', background: 'rgba(0,0,0,0.2)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '100px', color: '#ec4899', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1.5rem' }}>
             <Construction size={16} /> REFACTORING ROADMAP
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Spagetti Koddan <span className="gradient-text">Mimariye Geçiş</span></h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
            Mevcut projenizi bozmadan, adım adım MVVM ve Hibrit yapıya nasıl dönüştürebilirsiniz? İşte güvenli geçiş yolu.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
          {/* PATH 1: SPAGHETTI -> MVVM */}
          <div className="glass-card" style={{ borderTop: '4px solid #ec4899' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2rem' }}>
                <AlertTriangle color="#f59e0b" size={24} />
                <h3 style={{ fontSize: '1.5rem' }}>Spagetti → MVVM</h3>
             </div>
             
             <div style={{ position: 'relative', paddingLeft: '20px' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', background: 'linear-gradient(to bottom, #ec4899, transparent)' }} />
                {spaghettiToMVVM.map((s, i) => (
                  <div key={i} style={{ marginBottom: '2.5rem', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '-26px', top: '0', background: '#ec4899', width: '12px', height: '12px', borderRadius: '50%', border: '4px solid var(--bg-dark)' }} />
                    <div style={{ display: 'flex', gap: '15px' }}>
                       <div style={{ background: 'rgba(236, 72, 153, 0.1)', padding: '10px', borderRadius: '12px', height: 'fit-content' }}>
                          {s.icon}
                       </div>
                       <div>
                          <h4 style={{ fontWeight: 800, marginBottom: '8px', fontSize: '1.1rem' }}>Adım {s.step}: {s.title}</h4>
                          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.desc}</p>
                       </div>
                    </div>
                  </div>
                ))}
             </div>
             <div style={{ padding: '1.5rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.1)', marginTop: '1rem', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <CheckCircle2 color="#10b981" size={20} />
                <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 600 }}>Sonuç: UI tamamen 'aptallaşır', tüm mantık test edilebilir sınıflara taşınır.</span>
             </div>
          </div>

          {/* PATH 2: LAYERED -> HYBRID */}
          <div className="glass-card" style={{ borderTop: '4px solid #3b82f6' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '2rem' }}>
                <GitBranch color="#3b82f6" size={24} />
                <h3 style={{ fontSize: '1.5rem' }}>Layered/Feature → Hibrit</h3>
             </div>

             <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {hybridMigration.map((h, i) => (
                   <div key={i} className="glass-card" style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem' }}>
                      <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                         <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '10px', borderRadius: '12px' }}>
                            {h.icon}
                         </div>
                         <div>
                            <h4 style={{ fontWeight: 800, marginBottom: '8px' }}>{h.title}</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{h.desc}</p>
                         </div>
                      </div>
                   </div>
                ))}

                <div style={{ padding: '2rem', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)', borderRadius: '20px', textAlign: 'center' }}>
                   <Zap color="#f59e0b" style={{ marginBottom: '1rem' }} />
                   <h4 style={{ marginBottom: '10px' }}>Altın Kural (The Rule)</h4>
                   <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                     "Feature'lar ortak katmanı görür, ortak katman feature'ları tanımaz." Bu kuralı uyguladığınız an Hibrit yapıya geçtiniz demektir.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RefactoringGuide;
