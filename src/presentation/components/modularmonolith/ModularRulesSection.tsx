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
{`core      ──► hiçbir şey  (sıfır dış bağımlılık
                            → test edilebilirlik)
shared    ──► core        (shared uygulamanın
                            anlamını bilmez)
shared    ──► feature     (asla)
feature A ──► feature B   (doğrudan import
                            yasak)`}
          </pre>
        </div>
      </div>

      {/* CROSS-FEATURE COMMUNICATION */}
      <h4 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Share2 size={22} color="#f59e0b" /> {isEn ? "Cross-Feature Communication: 'Forbidden' Is Not Enough" : "Cross-Feature İletişim: 'Yasak' Yetmez, Mekanizma Gerek"}
      </h4>
      <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '850px' }}>
        {isEn 
          ? "If features cannot import each other, how do they share data? Three sanctioned mechanisms below."
          : "Feature'lar birbirini import edemiyorsa veriyi nasıl paylaşır? İşte üç resmi mekanizma."
        }
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
          <div style={{ color: '#f59e0b', fontWeight: 800, fontSize: '1rem', marginBottom: '0.5rem' }}>📦 {isEn ? 'Shared Store (zustand)' : 'Ortak Store (zustand)'}</div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
            {isEn 
              ? 'Global state lives at the composition root. Features keep their own state locally; only shared contracts enter the global store.'
              : 'Global state composition root\'ta yaşar. Feature\'lar kendi state\'ini kendi klasöründe tutar; global store\'a yalnızca iş sözleşmeleri girer.'}
          </p>
        </div>
        <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
          <div style={{ color: '#f59e0b', fontWeight: 800, fontSize: '1rem', marginBottom: '0.5rem' }}>📡 {isEn ? 'Event / Pub-Sub' : 'Event / Pub-Sub'}</div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
            {isEn 
              ? '"Inventory changed" → "battle screen listens". Features communicate via events without importing each other.'
              : '"Envanter değişti" → "savaş ekranı dinler". Feature\'lar birbirini import etmeden olaylarla haberleşir.'}
          </p>
        </div>
        <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
          <div style={{ color: '#f59e0b', fontWeight: 800, fontSize: '1rem', marginBottom: '0.5rem' }}>📄 {isEn ? 'shared/contracts' : 'shared/contracts'}</div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
            {isEn 
              ? 'Inter-feature data shapes live in one place; both slices import it — not each other.'
              : 'Feature\'lar arası veri şekli tek yerde tanımlanır; iki dilim de onu import eder, birbirini değil.'}
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
              ? 'If core cannot import anything, its tests do not need to either. No mocks, no setup, no framework — pure assertion speed.'
              : 'Core bir şey import edemiyorsa, testlerinin de bir şey import etmesi gerekmez. Mock yok, setup yok, framework yok — saf assert hızı.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModularRulesSection;
