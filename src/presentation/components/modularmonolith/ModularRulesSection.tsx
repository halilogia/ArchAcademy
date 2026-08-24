import React from 'react';
import { useTranslation } from 'react-i18next';
import { Share2, TestTube } from 'lucide-react';

export const ModularRulesSection: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <div className="glass-card" style={{ padding: '3rem', borderTop: '4px solid #f59e0b' }}>
      <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
        {isEn ? "Dependency Rules (Architectural Invariants)" : "Bağımlılık Kuralları (Architectural Invariants)"}
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '850px' }}>
        {isEn 
          ? "A folder layout is not enough for AI. The real contract is: who may import whom? These invariants are what you hand to an AI before any coding task."
          : "AI'ya klasör yapısı vermek yetmez. Asıl sözleşme: kim kimi import edebilir? AI'ya her görevden önce verilmesi gereken kurallar bunlardır."
        }
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ background: 'rgba(16, 185, 129, 0.04)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '1.5rem', borderRadius: '14px' }}>
          <div style={{ color: '#10b981', fontWeight: 800, fontSize: '1rem', marginBottom: '1rem' }}>✅ {isEn ? 'Allowed' : 'İzinli'}</div>
          <pre style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'monospace', lineHeight: 1.8 }}>
{`features  ──► core        (dilimler domain
                            kurallarını çağırır)
features  ──► shared      (dilimler UI kitini
                            tüketir)
features  ──► pipelines   (dilimler auth/tenant
                            denetiminden geçer)
plugins   ──► core/shared (eklentiler aynı
                            kurallara tabi)`}
          </pre>
        </div>

        <div style={{ background: 'rgba(239, 68, 68, 0.04)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '1.5rem', borderRadius: '14px' }}>
          <div style={{ color: '#ef4444', fontWeight: 800, fontSize: '1rem', marginBottom: '1rem' }}>❌ {isEn ? 'Forbidden' : 'Yasak'}</div>
          <pre style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'monospace', lineHeight: 1.8 }}>
{`core      ──► hiçbir şey  (core asla features/
                            shared/pipelines'e
                            bağımlı olamaz — yalnızca
                            saf kütüphaneler)
shared    ──► core        (shared uygulamanın
                            anlamını bilmez)
shared    ──► feature     (asla)
feature A ──► feature B/internal-file
                            ❌ implementation'a
                            bağımlılık yasak
feature A ──► feature B/index.ts
                            ⚠️ yalnızca açık
                            public contract`}
          </pre>
        </div>
      </div>

      {/* FEATURE DEPENDENCY PRINCIPLE */}
      <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(56, 189, 248, 0.2)', marginBottom: '2.5rem' }}>
        <div style={{ color: '#38bdf8', fontWeight: 800, fontSize: '1rem', marginBottom: '0.75rem' }}>
          {isEn ? "The Feature Dependency Principle" : "Feature Bağımlılık Prensibi"}
        </div>
        <p style={{ color: '#e2e8f0', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
          {isEn 
            ? "Features can never depend on each other's implementation details. Cross-feature dependency is only allowed via a defined public contract (index.ts), composition root, shared state, or event boundary."
            : "Feature'lar birbirlerinin implementation detaylarına bağımlı olamaz. Cross-feature bağımlılık yalnızca tanımlı public contract (index.ts), composition root, shared state veya event boundary üzerinden kurulabilir."}
        </p>
      </div>

      {/* CROSS-FEATURE COMMUNICATION */}
      <h4 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Share2 size={22} color="#f59e0b" /> {isEn ? "Cross-Feature Communication: 'Forbidden' Is Not Enough" : "Cross-Feature İletişim: 'Yasak' Yetmez, Mekanizma Gerek"}
      </h4>
      <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '850px' }}>
        {isEn 
          ? "If features cannot import each other, how do they share data? These are not equal alternatives — apply them in this priority order."
          : "Feature'lar birbirini import edemiyorsa veriyi nasıl paylaşır? Bunlar eşit alternatifler değil — bu öncelik sırasıyla uygulanır."}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
          <div style={{ color: '#f59e0b', fontWeight: 800, fontSize: '1rem', marginBottom: '0.5rem' }}>1️⃣ 🔌 {isEn ? 'Composition Root (main.ts)' : 'Composition Root (main.ts)'}</div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
            {isEn 
              ? 'Simple data flow: main.ts wires feature A into feature B. No direct import, no global state — just constructor/function injection at bootstrap.'
              : 'Basit veri akışı: main.ts, feature A\'yı feature B\'ye bağlar. Doğrudan import yok, global state yok — sadece bootstrap\'ta enjeksiyon.'}
          </p>
        </div>
        <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
          <div style={{ color: '#f59e0b', fontWeight: 800, fontSize: '1rem', marginBottom: '0.5rem' }}>2️⃣ 📦 {isEn ? 'Shared Store (zustand)' : 'Ortak Store (zustand)'}</div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
            {isEn 
              ? 'When genuinely shared state exists. Global state lives at the composition root; only shared contracts enter it.'
              : 'Gerçekten ortak state varsa. Global state composition root\'ta yaşar; store\'a yalnızca iş sözleşmeleri girer.'}
          </p>
        </div>
        <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
          <div style={{ color: '#f59e0b', fontWeight: 800, fontSize: '1rem', marginBottom: '0.5rem' }}>3️⃣ 📡 {isEn ? 'Event / Pub-Sub' : 'Event / Pub-Sub'}</div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
            {isEn 
              ? 'Only when loose coupling is truly needed: "InventoryChanged" → battle + UI + analytics listen. Never the default.'
              : 'Yalnızca gevşek bağlılık gerçekten gerekiyorsa: "InventoryChanged" → battle + UI + analytics dinler. Varsayılan asla değil.'}
          </p>
        </div>
        <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
          <div style={{ color: '#f59e0b', fontWeight: 800, fontSize: '1rem', marginBottom: '0.5rem' }}>4️⃣ 📄 {isEn ? 'Contracts — Boundary, Not Mechanism' : 'Contracts — Mekanizma Değil, Sınır'}</div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
            {isEn 
              ? 'Contracts define the boundaries of the three mechanisms above — they are not a fourth communication channel.'
              : 'Contracts, yukarıdaki üç mekanizmanın sınırlarını tanımlar — dördüncü bir iletişim kanalı değildir.'}
          </p>
        </div>
      </div>

      {/* TEST BOUNDARY */}
      <h4 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <TestTube size={22} color="#f59e0b" /> {isEn ? "Test Boundary: Pure Core → Easy Tests" : "Test Sınırı: Core Saf → Test Kolay"}
      </h4>
      <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '850px' }}>
        {isEn 
          ? "Because core/ has zero external dependencies, its tests are dependency-free too. Tests are co-located next to the code they verify."
          : "core/ sıfır dış bağımlılığa sahip olduğu için testleri de bağımlılıksızdır. Testler, doğruladıkları kodun yanına yazılır."
        }
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
          <div style={{ color: '#10b981', fontWeight: 800, fontSize: '1rem', marginBottom: '0.75rem' }}>🧠 core/ → {isEn ? 'Unit Tests' : 'Unit Test'}</div>
          <pre style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'monospace', lineHeight: 1.7 }}>
{`core/combat/
  damage.ts
  damage.test.ts   ✅ saf fonksiyon
                     milisaniyede koşar
                     (mock yok)`}
          </pre>
        </div>
        <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
          <div style={{ color: '#38bdf8', fontWeight: 800, fontSize: '1rem', marginBottom: '0.75rem' }}>🍕 features/ → {isEn ? 'Hook & Component Tests' : 'Hook & Component Test'}</div>
          <pre style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8', fontFamily: 'monospace', lineHeight: 1.7 }}>
{`features/battle/
  BattleScreen.tsx
  useBattle.ts
  useBattle.test.ts ✅ slice içinde
                       co-locate`}
          </pre>
        </div>
        <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
          <div style={{ color: '#a855f7', fontWeight: 800, fontSize: '1rem', marginBottom: '0.75rem' }}>⚖️ {isEn ? 'The Payoff' : 'Mimarinin Ödülü'}</div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
            {isEn 
              ? 'Core business logic requires no external runtime dependencies, so its tests run fast and deterministic with minimal mocks. The advantage is not "no imports" — it is "no runtime dependencies".'
              : 'Core iş mantığı dış runtime bağımlılığı gerektirmediği için testleri hızlı, deterministik ve düşük mock ihtiyacıyla çalışır. Avantaj "import yok" değil — "runtime bağımlılığı yok".'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModularRulesSection;
