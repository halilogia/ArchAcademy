import React from 'react';
import { motion } from 'framer-motion';
import { Layers, ArrowRightLeft, CheckCircle2, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const VerticalVsHorizontalTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const comparisons = [
    {
      metric: isEn ? "Folder Organization" : "Klasör Organizasyonu",
      vertical: isEn ? "Grouped by Feature (Features/Checkout)" : "İşlev/Özellik Odaklı (Features/Sepetim)",
      horizontal: isEn ? "Grouped by Technical Layer (Controllers, Services, Repos)" : "Teknik Katman Odaklı (Controllers, Services, Repos)",
      winner: 'vertical'
    },
    {
      metric: isEn ? "Feature Change Blast Radius" : "Yeni Özellik Ekleme Maliyeti",
      vertical: isEn ? "Touches only 1 feature directory (Zero cross-impact)" : "Yalnızca 1 klasör değişir (Yan etki sıfır)",
      horizontal: isEn ? "Must edit 4-5 layers simultaneously" : "Aynı anda 4-5 farklı katman dosyası düzenlenir",
      winner: 'vertical'
    },
    {
      metric: isEn ? "AI Context & Token Efficiency" : "AI ve Vibe Coding Uyumu",
      vertical: isEn ? "5/5 ⭐ (AI sees all relevant logic in one folder)" : "5/5 ⭐ (AI tüm kodu tek klasörde görür)",
      horizontal: isEn ? "2/5 ⭐ (AI jumps between 5 layers, high token waste)" : "2/5 ⭐ (AI 5 katman arasında zıplar, token israfı)",
      winner: 'vertical'
    },
    {
      metric: isEn ? "Shared Cross-Cutting Logic" : "Çapraz Katman Kuralları",
      vertical: isEn ? "Handled via MediatR / Pipeline behaviors" : "Pipeline / Middleware ile çözülür",
      horizontal: isEn ? "Native in shared core layer" : "Ortak katmanda doğrudan bulunur",
      winner: 'horizontal'
    }
  ];

  return (
    <motion.div key="compare" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          {isEn ? "Vertical Slice vs Horizontal Layering" : "Dikey Dilim (Vertical) vs Yatay Katmanlı (Horizontal) Mimari"}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '800px' }}>
          {isEn 
            ? "Traditional N-Tier architectures slice systems horizontally by technical concern. Vertical Slice architectures slice vertically by business capability." 
            : "Geleneksel mimariler sistemi teknik rollerine göre yatay böler (Controller/Service/Repo). Dikey Dilim mimarisi ise sistemi iş özelliklerine göre dikine dilimler."
          }
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #334155' }}>
                <th style={{ padding: '12px 16px', color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase' }}>Kriter</th>
                <th style={{ padding: '12px 16px', color: '#f97316', fontSize: '0.85rem', textTransform: 'uppercase' }}>🍕 Vertical Slice</th>
                <th style={{ padding: '12px 16px', color: '#38bdf8', fontSize: '0.85rem', textTransform: 'uppercase' }}>🏢 Horizontal 3-Tier</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((c, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: 'white', fontSize: '0.9rem' }}>{c.metric}</td>
                  <td style={{ padding: '14px 16px', color: '#fed7aa', fontSize: '0.85rem' }}>{c.vertical}</td>
                  <td style={{ padding: '14px 16px', color: '#bae6fd', fontSize: '0.85rem' }}>{c.horizontal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MASTERCLASS: FRONTEND VERTICAL SLICE ARCHITECTURE (STUDIO / CANVAS PATTERN) */}
      <div className="glass-card" style={{ padding: '2.5rem', borderTop: '4px solid #f97316' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(249, 115, 22, 0.15)', color: '#f97316', padding: '6px 14px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800, marginBottom: '1.5rem' }}>
          🎨 FRONTEND PATTERN: CANVAS, EDITOR & STUDIO APPLICATIONS
        </div>

        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          {isEn ? "Frontend Vertical Slice: The Studio & Canvas Architecture Pattern" : "Frontend Dünyasında Vertical Slice: Editör, Studio & Canvas Mimarisi"}
        </h3>
        
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '900px' }}>
          {isEn 
            ? "Why do traditional layered architectures (FSD, Clean) fail in rich UI apps like Figma, WebGL/Canvas editors, and Dashboard studios? By partitioning into `src/core/` and `src/slices/`, you achieve supreme modularity and AI generation velocity." 
            : "Figma benzeri grafik editörleri, Canvas/WebGL harita motorları veya zengin Dashboard araçlarında geleneksel katmanlar (FSD/Clean) hantallaşır. Çekirdek motoru `src/core/` altında izole edip, her aracı `src/slices/` altında bağımsız dikey dilim yapmak frontend'de devrimsel bir hız kazandırır."
          }
        </p>

        {/* 4 Super Powers Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(249, 115, 22, 0.2)' }}>
            <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>🚀 100x Geliştirme Hızı</div>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
              <strong style={{ color: 'white' }}>Zero Context Switching:</strong> Yeni bir fırça veya araç eklemek için sadece kendi dilim klasörünü açarsınız. UI paneli, araç parametreleri ve render mantığı aynı yerdedir.
            </p>
          </div>

          <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
            <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>🤖 Kusursuz AI Locality (5/5 ⭐)</div>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
              <strong style={{ color: 'white' }}>Sıfır Halüsinasyon:</strong> LLM ajanına sadece çekirdek API'yi ve hedef dilimi verirsiniz. AI farklı klasörler arasında kaybolmadan 10 saniyede hatasız çalışır dilim üretir.
            </p>
          </div>

          <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>🗑️ Tak-Çıkar Bağımsızlık</div>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
              <strong style={{ color: 'white' }}>Drop-in Feature Toggle:</strong> Bir özelliği projeden kaldırmak istediğinizde o dilim klasörünü silmeniz yeterlidir. Projede tek bir kırık import (broken reference) bile kalmaz.
            </p>
          </div>

          <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
            <div style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>🔒 Çekirdek Motorun Korunması</div>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
              <strong style={{ color: 'white' }}>Protected Core (`src/core/`):</strong> Canvas render döngüsü, matematiksel hesaplamalar ve koordinat motoru `src/core/` içinde saf kalır; UI fırçalarındaki hatalar motoru çökertemez.
            </p>
          </div>
        </div>

        {/* Concrete Architecture Structure Box */}
        <div style={{ background: '#020617', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '2.5rem' }}>
          <h4 style={{ color: '#f97316', fontWeight: 800, marginBottom: '1rem', fontSize: '1.1rem' }}>
            📂 Frontend Vertical Slice Örnek Proje Ağacı (Studio & Canvas Modeli)
          </h4>
          <pre style={{ margin: 0, fontSize: '0.85rem', color: '#38bdf8', fontFamily: 'monospace', lineHeight: 1.7, overflowX: 'auto' }}>
{`📁 src/
  📁 core/                 --> 🧠 Ortak Çekirdek Motor (Saf Matematik, Render Döngüsü, Viewport)
    📄 viewport-engine.ts  (Canvas / WebGL Çizim Döngüsü)
    📄 math-geometry.ts    (Koordinat Dönüşümleri & Geometri Hesapları)
    📄 noise-generator.ts  (Prosedürel Algoritmalar)
  📁 slices/               --> 🍕 Dikey Dilimler (Her biri tamamen otonom bir araç / fırça)
    📁 terrain-sculptor/   --> (Yükseklik Şekillendirici: Araç Paneli UI + Fırça Matematiği + State)
    📁 texture-painter/    --> (Doku Boyama Aracı: Renk Paleti UI + Shader Mantığı + State)
    📁 asset-stamper/      --> (Nesne/Ağaç Yerleştirici: Varlık Seçici UI + Grid Hesaplayıcı)
    📁 scene-exporter/     --> (Sahne Dışa Aktarma: Modal UI + PNG/JSON/GLTF Export)
  📄 main.ts               --> 🔌 Çekirdek Motoru Başlat ve Dilim Eklentilerini Kaydet (Registry)`}
          </pre>
        </div>

        {/* DISASTER SCENARIOS & CRITICAL EVALUATION */}
        <div style={{ background: 'rgba(239, 68, 68, 0.04)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.25)', marginBottom: '2.5rem' }}>
          <h4 style={{ color: '#ef4444', fontWeight: 800, fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🛑 Hangi Koşullarda Vertical Slice Çok Kötü Bir Karar Olurdu?
          </h4>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
            Hiçbir mimari gümüş kurşun değildir. Bağımsız dilim mantığı aşağıdaki senaryolarda felakete dönüşebilir:
          </p>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '650px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(239, 68, 68, 0.3)', color: '#ef4444', fontSize: '0.85rem' }}>
                  <th style={{ padding: '10px' }}>Proje Türü</th>
                  <th style={{ padding: '10px' }}>Vertical Uygun mu?</th>
                  <th style={{ padding: '10px' }}>Neden Felaket Olur?</th>
                  <th style={{ padding: '10px' }}>Alternatif Mimari</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '0.85rem' }}>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px 10px', color: 'white', fontWeight: 700 }}>Finans / Banka / Muhasebe</td>
                  <td style={{ padding: '12px 10px', color: '#ef4444', fontWeight: 800 }}>🛑 ÇOK KÖTÜ</td>
                  <td style={{ padding: '12px 10px', color: '#94a3b8' }}>Sıfır kod tekrarı (DRY) ve merkezi Domain gereklidir; dilim kopyalaması regülasyon cezası doğurur.</td>
                  <td style={{ padding: '12px 10px', color: '#38bdf8' }}>DDD / Clean Arch</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px 10px', color: 'white', fontWeight: 700 }}>Büyük Tasarım Sistemli Frontend</td>
                  <td style={{ padding: '12px 10px', color: '#ef4444', fontWeight: 800 }}>🛑 ÇOK KÖTÜ</td>
                  <td style={{ padding: '12px 10px', color: '#94a3b8' }}>Her dilimin kendi UI'ını yazması kurumsal tasarım tutarlılığını (Design System) paramparça eder.</td>
                  <td style={{ padding: '12px 10px', color: '#06b6d4' }}>FSD / Atomic Design</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '12px 10px', color: 'white', fontWeight: 700 }}>Eklenti / Plugin Platformu</td>
                  <td style={{ padding: '12px 10px', color: '#ef4444', fontWeight: 800 }}>🛑 ÇOK KÖTÜ</td>
                  <td style={{ padding: '12px 10px', color: '#94a3b8' }}>Dış geliştiricilere sunulacak standart sözleşmeler (Interfaces / Ports) yoktur.</td>
                  <td style={{ padding: '12px 10px', color: '#a855f7' }}>Microkernel / Hexagonal</td>
                </tr>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(16, 185, 129, 0.05)' }}>
                  <td style={{ padding: '12px 10px', color: 'white', fontWeight: 700 }}>SaaS / Web App / CRUD API</td>
                  <td style={{ padding: '12px 10px', color: '#10b981', fontWeight: 800 }}>🚀 MÜKEMMEL</td>
                  <td style={{ padding: '12px 10px', color: '#cbd5e1' }}>Hız, sadelik ve AI ile geliştirme verimliliği zirvededir.</td>
                  <td style={{ padding: '12px 10px', color: '#f97316' }}>Vertical Slice</td>
                </tr>
                <tr style={{ background: 'rgba(16, 185, 129, 0.05)' }}>
                  <td style={{ padding: '12px 10px', color: 'white', fontWeight: 700 }}>Canvas / Harita / Editör / Studio</td>
                  <td style={{ padding: '12px 10px', color: '#10b981', fontWeight: 800 }}>🚀 MÜKEMMEL</td>
                  <td style={{ padding: '12px 10px', color: '#cbd5e1' }}>Core motor + bağımsız araç dilimleri kusursuz çalışır.</td>
                  <td style={{ padding: '12px 10px', color: '#f97316' }}>Vertical Slice</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 5 OPTIMIZATION STRATEGIES */}
        <div style={{ background: '#020617', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '2.5rem' }}>
          <h4 style={{ color: '#10b981', fontWeight: 800, fontSize: '1.2rem', marginBottom: '1.5rem' }}>
            ⚡ Bu Zayıflıkları Vertical Slice İçinde Nasıl Optimize Ederiz? (5 Altın Kural)
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <strong style={{ color: '#10b981' }}>1. 🛡️ Shared Core Domain:</strong>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '6px 0 0', lineHeight: 1.5 }}>
                Kritik faiz, vergi veya geometri algoritmalarını `src/core/` altında tek bir saf fonksiyon yapın. Dilimler kopyalamak yerine bunu çağırsın (Single Source of Truth).
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <strong style={{ color: '#38bdf8' }}>2. 🎨 Shared UI Kit & Tokens:</strong>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '6px 0 0', lineHeight: 1.5 }}>
                Dilimler sıfırdan buton yazmaz; `import &#123; Button, Modal &#125; from '@/shared/ui'` tüketir. Tasarım tutarlılığı garantiye alınır.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <strong style={{ color: '#f59e0b' }}>3. ⚙️ Pipeline Behaviors:</strong>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '6px 0 0', lineHeight: 1.5 }}>
                TenantId filtresi ve GDPR audit logları her dilime tek tek yazılmaz; MediatR/Middleware boru hattı ile otomatik işletilir.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <strong style={{ color: '#a855f7' }}>4. 🗄️ DTO Projections:</strong>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '6px 0 0', lineHeight: 1.5 }}>
                Dilimler `SELECT *` yerine sadece kendi ihtiyacı olan DTO'yu çeker. ORM şema değişimleri derleyici anında yakalanır.
              </p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <strong style={{ color: '#ef4444' }}>5. 🔌 Slice Registry (Plugin SDK):</strong>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '6px 0 0', lineHeight: 1.5 }}>
                Her dilim `IStudioTool` veya `register()` uygular. Çekirdek motor dilimleri dinamik eklenti gibi yükler.
              </p>
            </div>
          </div>
        </div>

        {/* CTA TO MODULAR MONOLITH */}
        <div style={{ 
          background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)', 
          padding: '2rem', 
          borderRadius: '16px', 
          border: '1px solid rgba(56, 189, 248, 0.3)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <div style={{ color: '#38bdf8', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px' }}>
              🏛️ NİHAİ SENTEZ MİMARİSİ
            </div>
            <h4 style={{ color: 'white', fontSize: '1.3rem', fontWeight: 900, margin: 0 }}>
              Pragmatic Modular Architecture (Modular Monolith)
            </h4>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: '6px 0 0' }}>
              Vertical Slice hızı ile Clean Architecture güvenliğini birleştiren ArchAcademy özel sentez mimarisini inceleyin.
            </p>
          </div>

          <a 
            href="/modular-monolith" 
            style={{ 
              background: '#38bdf8', 
              color: '#0f172a', 
              padding: '12px 24px', 
              borderRadius: '12px', 
              textDecoration: 'none', 
              fontWeight: 800,
              fontSize: '0.9rem',
              boxShadow: '0 4px 14px rgba(56, 189, 248, 0.3)'
            }}
          >
            Modüler Monolit Masterclass &rarr;
          </a>
        </div>

      </div>
    </motion.div>
  );
};

export default VerticalVsHorizontalTab;
