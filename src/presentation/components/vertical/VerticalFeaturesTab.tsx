import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Folder, Box, ShieldCheck, Zap } from 'lucide-react';

export const VerticalFeaturesTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const rules = [
    { 
      t: isEn ? 'Feature-Based Grouping' : 'Özellik Bazlı Gruplama', 
      d: isEn ? 'Group code by business capability (Features), not by technical layers (Controllers/Services).' : 'Kodu teknik katmanlara (Controller/Service) göre değil, iş özelliklerine göre gruplayın.' 
    },
    { 
      t: isEn ? 'Minimal Sharing' : 'Minimum Paylaşım', 
      d: isEn ? 'Avoid sharing code between slices. Duplication is far cheaper than the wrong tight coupling.' : 'Dilimler arasında kod paylaşımından kaçının. Kod tekrarı, sıkı bağımlılıktan (Coupling) daha iyidir.' 
    },
    { 
      t: isEn ? 'Flexible Internal Design' : 'Esnek İç Yapı', 
      d: isEn ? 'One slice can execute raw SQL while another complex slice applies rich DDD aggregates.' : 'Bir dilim basit bir SQL sorgusu kullanırken, diğeri karmaşık bir DDD Aggregate kullanabilir.' 
    }
  ];

  return (
    <motion.div key="features" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 450px) 1fr', gap: '2.5rem', alignItems: 'start' }}>
        {/* Folder Structure Visualization */}
        <div className="glass-card" style={{ background: '#020617', padding: '2rem', border: '1px solid #1e293b' }}>
          <h4 style={{ marginBottom: '1.5rem', color: '#f97316', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800 }}>
            📂 {isEn ? "Feature Slice Project Layout" : "Proje Klasör Yapısı"}
          </h4>
          <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.8 }}>
            <div>src/</div>
            <div style={{ paddingLeft: '20px' }}>Features/</div>
            <div style={{ paddingLeft: '40px', color: '#f97316', fontWeight: 'bold' }}>Siparişler/ (Orders)</div>
            <div style={{ paddingLeft: '60px' }}>📦 SiparişVer.cs (Command)</div>
            <div style={{ paddingLeft: '60px' }}>📦 SiparişDetay.cs (Query)</div>
            <div style={{ paddingLeft: '60px' }}>📦 SiparişRepository.cs</div>
            <div style={{ paddingLeft: '40px', color: '#10b981', fontWeight: 'bold' }}>Ürünler/ (Catalog)</div>
            <div style={{ paddingLeft: '60px' }}>📦 ÜrünListele.cs</div>
            <div style={{ paddingLeft: '60px' }}>📦 ÜrünAra.cs</div>
            <div style={{ paddingLeft: '20px' }}>Infrastructure/</div>
            <div style={{ paddingLeft: '40px' }}>DatabaseContext.cs</div>
          </div>
          <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', fontStyle: 'italic', color: '#64748b', margin: 0 }}>
            {isEn ? "* Each folder is a self-contained autonomous micro-architecture." : "* Her klasör kendi içinde tamamen bağımsız bir minyatür mimaridir."}
          </p>
        </div>

        {/* Core Rules */}
        <div className="glass-card" style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '1.5rem', color: 'white' }}>
            {isEn ? "Vertical Slice Guiding Principles" : "Dikey Dilim Kuralları"}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {rules.map((rule, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', background: '#020617', padding: '1.25rem', borderRadius: '12px', border: '1px solid #1e293b' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(249, 115, 22, 0.2)', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 800, fontSize: '0.85rem' }}>
                  {i+1}
                </div>
                <div>
                  <h4 style={{ color: 'white', marginBottom: '4px', fontWeight: 800, fontSize: '1rem' }}>{rule.t}</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>{rule.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decision Guide: When NOT to use features/ with Concrete Visual Examples */}
      <div className="glass-card" style={{ marginTop: '3rem', padding: '2.5rem', borderTop: '4px solid #ef4444' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 900 }}>
            PRAGMATIC ENGINEERING (YAGNI & KISS)
          </div>
        </div>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          🎯 {isEn ? "Practical Decision Guide: When NOT to use `features/`?" : "Pratik Karar Rehberi: Ne Zaman `features/` Yapmamalısınız?"}
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: '900px' }}>
          {isEn 
            ? "Blindly creating `features/` folders everywhere is a form of architectural waste (Over-Engineering). Compare the concrete scenarios below to pick the right folder strategy." 
            : "Her projeye düşünmeden `features/` açmak gereksiz bir mimari israftır (Over-Engineering). Hangi senaryoda hangi klasör yapısının tercih edilmesi gerektiğini somut örneklerle inceleyin."
          }
        </p>

        {/* 3 Interactive Scenario Cards with Code/Folder Comparisons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* Scenario 1: MVP / Startup */}
          <div style={{ background: '#020617', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.08)', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <span style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.85rem' }}>SENARYO 1</span>
                <h4 style={{ color: 'white', fontSize: '1.2rem', fontWeight: 800, marginTop: '2px' }}>
                  {isEn ? "1-3 Dev Teams & Rapid MVPs / Startups" : "1-3 Kişilik Ekipler & Hızlı MVP / Startup Projeleri"}
                </h4>
              </div>
              <span style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', padding: '4px 10px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700 }}>
                ❌ features/ KULLANMAYIN
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div style={{ background: 'rgba(239, 68, 68, 0.04)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '1.25rem', borderRadius: '12px' }}>
                <div style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px' }}>❌ Hatalı Aşırı Mühendislik (Over-Engineered)</div>
                <pre style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'monospace', lineHeight: 1.6 }}>
{`📁 src/features/
  📁 user-profile/
    📁 api/
      📄 getUser.ts
    📁 ui/
      📄 ProfileAvatar.tsx
      📄 ProfileCard.tsx
    📁 model/
      📄 profileTypes.ts
    📄 index.ts (2 satırlık export)`}
                </pre>
                <div style={{ marginTop: '10px', color: '#ef4444', fontSize: '0.75rem' }}>
                  ⚠️ Sonuç: 1 profil kartı göstermek için 5 dosya, 4 klasör gezersiniz. Bilişsel yük tavan yapar.
                </div>
              </div>

              <div style={{ background: 'rgba(16, 185, 129, 0.04)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '1.25rem', borderRadius: '12px' }}>
                <div style={{ color: '#10b981', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px' }}>✅ Doğru & Yalın Yaklaşım (KISS / Flat)</div>
                <pre style={{ margin: 0, fontSize: '0.8rem', color: '#38bdf8', fontFamily: 'monospace', lineHeight: 1.6 }}>
{`📁 src/
  📁 components/
    📄 ProfileCard.tsx  (UI + types aynı dosyada)
  📁 pages/
    📄 ProfilePage.tsx
  📁 services/
    📄 api.ts           (Tüm endpointler tek yerde)`}
                </pre>
                <div style={{ marginTop: '10px', color: '#10b981', fontSize: '0.75rem' }}>
                  🚀 Sonuç: 2 kat daha hızlı kod yazılır, dosya atlama süresi sıfıra iner.
                </div>
              </div>
            </div>
          </div>

          {/* Scenario 2: Modern Next.js / Full-Stack Co-location */}
          <div style={{ background: '#020617', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.08)', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <span style={{ color: '#f59e0b', fontWeight: 800, fontSize: '0.85rem' }}>SENARYO 2</span>
                <h4 style={{ color: 'white', fontSize: '1.2rem', fontWeight: 800, marginTop: '2px' }}>
                  {isEn ? "Modern Next.js / Remix / Full-Stack Apps" : "Modern Next.js (App Router) & Sayfa İçi Kolokasyon"}
                </h4>
              </div>
              <span style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', padding: '4px 10px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700 }}>
                💡 Page Co-Location KULLANIN
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div style={{ background: 'rgba(245, 158, 11, 0.04)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '1.25rem', borderRadius: '12px' }}>
                <div style={{ color: '#f59e0b', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px' }}>📂 Sayfa Yanı Kolokasyon (Co-location)</div>
                <pre style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'monospace', lineHeight: 1.6 }}>
{`📁 app/
  📁 dashboard/
    📄 page.tsx            (Ana sayfa rotası)
    📄 DashboardStats.tsx  (Sadece bu sayfaya özel UI)
    📄 useDashboardData.ts (Sadece bu sayfanın sorgusu)
  📁 settings/
    📄 page.tsx
    📄 ProfileForm.tsx`}
                </pre>
                <div style={{ marginTop: '10px', color: '#f59e0b', fontSize: '0.75rem' }}>
                  ✨ Kural: Bir bileşen sadece 1 sayfaya aitse, onu global `features/`'a çıkarma; sayfanın yanına koy!
                </div>
              </div>

              <div style={{ background: 'rgba(16, 185, 129, 0.04)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '1.25rem', borderRadius: '12px' }}>
                <div style={{ color: '#10b981', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px' }}>🏆 Neden Bu Kadar Güçlü?</div>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#94a3b8', fontSize: '0.8rem', lineHeight: 1.7 }}>
                  <li><strong style={{ color: 'white' }}>Sayfa silinirse her şey silinir:</strong> Artık ölü kod (Dead Code) temizlemekle uğraşmazsınız.</li>
                  <li><strong style={{ color: 'white' }}>AI Context Dostu:</strong> Cursor veya LLM'e sadece `app/dashboard` klasörünü vermeniz yeterlidir.</li>
                  <li><strong style={{ color: 'white' }}>Sıfır İsim Çakışması:</strong> Farklı sayfalardaki Stats bileşenleri birbirini ezmez.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Scenario 3: When TO use features/ */}
          <div style={{ background: '#020617', borderRadius: '18px', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <span style={{ color: '#10b981', fontWeight: 800, fontSize: '0.85rem' }}>SENARYO 3</span>
                <h4 style={{ color: 'white', fontSize: '1.2rem', fontWeight: 800, marginTop: '2px' }}>
                  {isEn ? "When MUST you use `features/` (Enterprise / Multi-Team)?" : "Ne Zaman Kesinlikle `features/` Kullanmalısınız?"}
                </h4>
              </div>
              <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '4px 10px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700 }}>
                ✅ features/ ŞARTTIR
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.04)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '1.25rem', borderRadius: '12px' }}>
                <div style={{ color: '#10b981', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px' }}>🏢 Kurumsal İşaretler (Signs You Need features/)</div>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#94a3b8', fontSize: '0.8rem', lineHeight: 1.7 }}>
                  <li>Aynı projede **10+ yazılımcı** aynı anda çalışıyorsa (Merge conflict önleme).</li>
                  <li>Sipariş, Ödeme, Stok gibi **20+ bağımsız iş süreci** varsa.</li>
                  <li>Backend'de .NET MediatR / Vertical Slice ile her handler izole ediliyorsa.</li>
                  <li>Farklı ekipler kendi dilimlerinden sorumluysa (Domain Ownership).</li>
                </ul>
              </div>

              <div style={{ background: 'rgba(59, 130, 246, 0.04)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '1.25rem', borderRadius: '12px' }}>
                <div style={{ color: '#3b82f6', fontWeight: 700, fontSize: '0.85rem', marginBottom: '8px' }}>📂 Gerçek Vertical Slice / FSD Düzeni</div>
                <pre style={{ margin: 0, fontSize: '0.8rem', color: '#38bdf8', fontFamily: 'monospace', lineHeight: 1.6 }}>
{`📁 src/Features/
  📁 SiparisYonetimi/ (Ekip A bakar)
    📄 SepeteEkle.cs
    📄 OdemeAl.cs
  📁 StokYonetimi/    (Ekip B bakar)
    📄 StokDus.cs
    📄 FiyatGuncelle.cs`}
                </pre>
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default VerticalFeaturesTab;
