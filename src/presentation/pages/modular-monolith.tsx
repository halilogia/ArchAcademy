import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Box, Layers, ShieldCheck, Zap, Sparkles, FolderTree, Cpu, RefreshCw, BookOpen } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';

export const ModularMonolithPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'architecture' | 'optimizations' | 'synthesis'>('architecture');

  const scrollToSection = (id: 'architecture' | 'optimizations' | 'synthesis') => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <SEO
        title={isEn ? "Pragmatic Modular Architecture & Modular Monolith | ArchAcademy" : "Pragmatik Modüler Mimari & Modüler Monolit (Hybrid VSA/FSD) | ArchAcademy"}
        description={isEn 
          ? "Master Pragmatic Modular Architecture (Hybrid Feature-Sliced VSA). The golden equilibrium between Vertical Slice velocity and Clean Architecture domain safety." 
          : "ArchAcademy özel sentezi: Pragmatik Modüler Mimari (Hybrid Feature-Sliced VSA). Vertical Slice hızı ile Clean Architecture güvenliğini birleştiren modern standart."
        }
        keywords="modular monolith, pragmatic modular architecture, hybrid feature sliced vsa, modern feature driven, vertical slice optimization"
        canonicalUrl="/modular-monolith"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
        <ArchHero 
          title="Modular Monolith"
          subtitle={isEn ? "Pragmatic Modular Architecture (Hybrid VSA / FSD)" : "Pragmatik Modüler Mimari (Hybrid VSA / FSD)"}
          description={isEn 
            ? "The definitive modern software architecture. Synthesizes Vertical Slice development velocity (5/5 AI Locality) with Clean Architecture core protection and FSD design system discipline." 
            : "Modern yazılım mühendisliğinin ulaştığı altın denge. Vertical Slice'ın tek klasörde bitirme hızını (5/5 AI Locality), Clean Architecture'ın çekirdek domain güvenliği ve FSD'nin kurumsal tasarım disipliniyle birleştirir."
          }
          badge="ArchAcademy Signature Pattern"
          color="#38bdf8"
          illustration={
            <div style={{ position: 'relative', width: '220px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                style={{ width: '180px', height: '180px', borderRadius: '40px', border: '2px dashed rgba(56, 189, 248, 0.4)', position: 'absolute' }}
              />
              <div style={{ width: '100px', height: '100px', background: '#020617', border: '3px solid #38bdf8', borderRadius: '26px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(56, 189, 248, 0.3)' }}>
                <Box size={40} color="#38bdf8" />
                <span style={{ fontSize: '0.65rem', fontWeight: 900, color: 'white', marginTop: '4px' }}>PMA / VSA</span>
              </div>
            </div>
          }
          features={[
            { icon: <Zap />, title: isEn ? 'Max AI Locality' : '5/5 AI Locality', desc: isEn ? 'Features are developed within autonomous self-contained slices.' : 'Özellikler tek klasör içinde AI ile sıfır zıplamayla yazılır.' },
            { icon: <ShieldCheck />, title: isEn ? 'Protected Core' : 'Korunan Çekirdek (Core)', desc: isEn ? 'Financial rules and heavy math are isolated in pure core modules.' : 'Finansal kurallar ve motor mantığı src/core/ içinde saf kalır.' },
            { icon: <Layers />, title: isEn ? 'Universal Design' : 'Tasarım Sistemi Uyumlu', desc: isEn ? 'Consumes standard shared/ui components across all slices.' : 'Tüm dilimler tek tip src/shared/ui tasarım kitini tüketir.' }
          ]}
        >
          <div style={{ 
            marginTop: '2rem',
            padding: '6px', 
            background: 'rgba(15, 23, 42, 0.4)', 
            borderRadius: '24px', 
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            backdropFilter: 'blur(10px)',
            flexWrap: 'wrap',
            position: 'sticky',
            top: '80px',
            zIndex: 30
          }}>
            {[
              { id: 'architecture', label: isEn ? 'Core Architecture Blueprint' : 'Mimari Şablon & Yapı', icon: <Box size={18} /> },
              { id: 'optimizations', label: isEn ? '5 Vertical Optimizations' : '5 Altın Optimizasyon', icon: <ShieldCheck size={18} /> },
              { id: 'synthesis', label: isEn ? 'Genetic Lineage & Synthesis' : 'Mimari Gen Haritası', icon: <RefreshCw size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id as any)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '18px',
                  border: 'none',
                  background: activeTab === tab.id ? '#38bdf8' : 'transparent',
                  color: activeTab === tab.id ? '#0f172a' : 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(56, 189, 248, 0.3)' : 'none'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </ArchHero>

        <div className="container" style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          
          {/* ARCHITECTURE BLUEPRINT SECTION */}
          <div id="architecture" style={{ scrollMarginTop: '100px' }}>
            <div className="glass-card" style={{ padding: '3rem', borderTop: '4px solid #38bdf8' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '6px 14px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800, marginBottom: '1.5rem' }}>
                ARCHACADEMY MASTER BLUEPRINT
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
                {isEn ? "The Pragmatic Modular Architecture (PMA) Blueprint" : "Pragmatik Modüler Mimari (PMA) Şablonu"}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '850px' }}>
                {isEn 
                  ? "A 4-pillar unified architecture engineered to eliminate over-engineering while preserving enterprise safety and extreme AI context locality." 
                  : "Aşırı mühendisliği (Over-Engineering) çöpe atan; aynı zamanda kurumsal güvenlik, tasarım tutarlılığı ve 5/5 AI Locality sağlayan 4 ayaklı hibrit mimari."
                }
              </p>

              <div style={{ background: '#020617', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <pre style={{ margin: 0, fontSize: '0.85rem', color: '#38bdf8', fontFamily: 'monospace', lineHeight: 1.7, overflowX: 'auto' }}>
{`📁 src/
│
├── 📁 core/                 --> 🧠 1. MOTOR & KRİTİK KURALLAR (Pure Logic / Math / Domain)
│   ├── 📄 engine.ts         (Canvas/WebGL veya Ana Hesaplama Motoru)
│   ├── 📄 tax-calculator.ts (Hata kabul etmeyen saf iş kuralları - Single Source of Truth)
│   └── 📄 types.ts          (Global domain modelleri)
│
├── 📁 shared/               --> 🎨 2. ORTAK TASARIM SİSTEMİ (Design System / UI Kit)
│   ├── 📁 ui/               (Button, Input, Modal, Dropdown - Tek tip kurumsal UI)
│   └── 📁 utils/            (Formatters, Helpers)
│
├── 📁 pipelines/            --> 🛡️ 3. ÇAPRAZ DENETLEYİCİLER (Cross-Cutting Middleware)
│   ├── 📄 auth-guard.ts     (Yetkilendirme kalkanı)
│   └── 📄 tenant-filter.ts  (Multi-tenant veri izolasyonu)
│
├── 📁 features/ (veya slices/) --> 🍕 4. DİKEY DİLİMLER (VSA Mantığında Otonom Modüller)
│   │
│   ├── 📁 order-checkout/   --> [Dilim 1]
│   │   ├── 📄 CheckoutCard.tsx  (UI)
│   │   ├── 📄 useCheckout.ts    (State / API)
│   │   └── 📄 index.ts          (Public API Export)
│   │
│   ├── 📁 terrain-sculptor/ --> [Dilim 2]
│   │   ├── 📄 SculptorPanel.tsx (UI)
│   │   ├── 📄 brushMath.ts      (Fırça mantığı)
│   │   └── 📄 index.ts          (IStudioTool Registry)
│   │
│   └── 📁 invoice-generator/--> [Dilim 3]
│       ├── 📄 InvoiceView.tsx
│       └── 📄 index.ts
│
└── 📄 main.ts               --> 🔌 Sistemin Giriş Noktası (Features Registry & Init)`}
                </pre>
              </div>
            </div>
          </div>

          {/* 5 OPTIMIZATIONS SECTION */}
          <div id="optimizations" style={{ scrollMarginTop: '100px' }}>
            <div className="glass-card" style={{ padding: '3rem', borderTop: '4px solid #10b981' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>
                {isEn ? "The 5 Golden Optimizations of Pragmatic Architecture" : "Vertical Slice'ı Kusursuzlaştıran 5 Altın Optimizasyon"}
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <div style={{ color: '#10b981', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>1. 🛡️ Shared Core Domain</div>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                    Kritik faiz, vergi ve matematiksel algoritmalar src/core/ içinde saf fonksiyon olarak yaşar. Dilimler kopyalamak yerine bunu çağırır.
                  </p>
                </div>

                <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                  <div style={{ color: '#38bdf8', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>2. 🎨 Shared UI Kit & Tokens</div>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                    Dilimler sıfırdan buton yazmaz; src/shared/ui/ bileşenlerini tüketir. Tasarım tutarlılığı %100 garanti altına alınır.
                  </p>
                </div>

                <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                  <div style={{ color: '#f59e0b', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>3. ⚙️ Pipeline Behaviors</div>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                    TenantId izolasyonu ve GDPR audit logları her dilime tek tek yazılmaz; MediatR/Middleware pipeline ile otomatik işletilir.
                  </p>
                </div>

                <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
                  <div style={{ color: '#a855f7', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>4. 🗄️ DTO Projections</div>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                    Dilimler SELECT * yerine sadece kendi ihtiyacı olan DTO alanını sorgular. ORM kolon değişiklikleri derleme anında yakalanır.
                  </p>
                </div>

                <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  <div style={{ color: '#ef4444', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>5. 🔌 Slice Registry (Plugin SDK)</div>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                    Her dilim standart bir arayüz (IStudioTool / register()) uygular. Çekirdek motor dilimleri dinamik eklenti gibi yükler.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* GENETIC LINEAGE & SYNTHESIS */}
          <div id="synthesis" style={{ scrollMarginTop: '100px' }}>
            <div className="glass-card" style={{ padding: '3rem', borderTop: '4px solid #a855f7' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>
                {isEn ? "Genetic Lineage: What Did We Inherit?" : "Mimari Gen Haritası: Hangi Mimariden Neyi Devraldık?"}
              </h3>

              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      <th style={{ padding: '1rem', width: '30%' }}>Kaynak Mimari</th>
                      <th style={{ padding: '1rem', width: '35%' }}>Devralınan Süper Güç</th>
                      <th style={{ padding: '1rem', width: '35%' }}>Çöpe Atılan İsraf (Waste)</th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: '0.9rem' }}>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '1rem', color: '#f97316', fontWeight: 800 }}>🍕 Vertical Slice (VSA)</td>
                      <td style={{ padding: '1rem', color: 'white' }}>Tek klasörde bitirme hızı & 5/5 AI Locality</td>
                      <td style={{ padding: '1rem', color: '#94a3b8' }}>Kontrolsüz kopya kod ve UI stil kaosları</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '1rem', color: '#06b6d4', fontWeight: 800 }}>🎨 FSD (Feature-Sliced Design)</td>
                      <td style={{ padding: '1rem', color: 'white' }}>Kurumsal Shared UI Kit & index.ts Public API</td>
                      <td style={{ padding: '1rem', color: '#94a3b8' }}>Her dilim içi 4 alt klasör eziyeti (Over-segmenting)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '1rem', color: '#38bdf8', fontWeight: 800 }}>🏛️ Clean Architecture</td>
                      <td style={{ padding: '1rem', color: 'white' }}>Saf iş kurallarının ve motorun src/core/ ile korunması</td>
                      <td style={{ padding: '1rem', color: '#94a3b8' }}>1 basit özellik için 7 katman ve 20 interface açma zorunluluğu</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '1rem', color: '#a855f7', fontWeight: 800 }}>🛡️ Hexagonal / CQRS</td>
                      <td style={{ padding: '1rem', color: 'white' }}>Merkezi güvenlik ve yetki boru hatları (Pipelines)</td>
                      <td style={{ padding: '1rem', color: '#94a3b8' }}>Aşırı karmaşık Event Bus ve asenkron senkronizasyon yükü</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

        <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
          <div className="container" style={{ textAlign: 'center' }}>
             <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', background: 'rgba(56, 189, 248, 0.1)', padding: '1rem 2rem', borderRadius: '12px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
                <BookOpen size={24} color="#38bdf8" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.8rem', color: '#38bdf8', textTransform: 'uppercase' }}>
                    ArchAcademy Engineering Standard
                  </div>
                  <div style={{ color: 'white', fontWeight: 600 }}>Pragmatic Modular Architecture: Zero Waste, Extreme Velocity & Bulletproof Core</div>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default ModularMonolithPage;
