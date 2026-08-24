import React from 'react';
import { useTranslation } from 'react-i18next';
import { Gamepad2 } from 'lucide-react';

export const ModularBlueprintSection: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <div className="glass-card" style={{ padding: '3rem', borderTop: '4px solid #38bdf8' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '6px 14px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800, marginBottom: '1.5rem' }}>
        ARCHACADEMY MASTER BLUEPRINT
      </div>
      <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
        {isEn ? "The Pragmatic Modular Architecture (PMA) Blueprint" : "Pragmatik Modüler Mimari (PMA) Şablonu"}
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '850px' }}>
        {isEn 
          ? "A 4-pillar unified architecture engineered to eliminate over-engineering while preserving enterprise safety and extreme AI context locality. The secret is not the folders — it is the dependency rules."
          : "Aşırı mühendisliği (Over-Engineering) çöpe atan; aynı zamanda kurumsal güvenlik, tasarım tutarlılığı ve 5/5 AI Locality sağlayan 4 ayaklı hibrit mimari. Sırrı klasörlerde değil, bağımlılık kurallarındadır."
        }
      </p>

      <div style={{ background: '#020617', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
        <pre style={{ margin: 0, fontSize: '0.85rem', color: '#38bdf8', fontFamily: 'monospace', lineHeight: 1.7, overflowX: 'auto' }}>
{`📁 src/
│
├── 📁 core/                 --> 🧠 1. MOTOR & KRİTİK KURALLAR (Pure Logic — Sıfır Dış Bağımlılık)
│   ├── 📁 engine/           (Canvas/WebGL veya Ana Hesaplama Motoru)
│   ├── 📁 domain/           (tax-calculator.ts — saf iş kuralları, Single Source of Truth)
│   └── 📁 math/             (vector.ts, interpolation.ts — herkesin kullandığı saf matematik)
│
├── 📁 shared/               --> 🎨 2. ORTAK TASARIM SİSTEMİ (Uygulamanın Anlamını Bilmez)
│   ├── 📁 ui/               (Button, Input, Modal, Dropdown — tek tip kurumsal UI)
│   ├── 📁 utils/            (formatNumber, debounce, clamp — framework-agnostic)
│   └── 📁 contracts/        (Feature'lar arası tip sözleşmeleri)
│
├── 📁 pipelines/            --> 🛡️ 3. ÇAPRAZ DENETLEYİCİLER (Cross-Cutting Middleware)
│   ├── 📄 auth-guard.ts     (Yetkilendirme kalkanı)
│   └── 📄 tenant-filter.ts  (Multi-tenant veri izolasyonu)
│   (Not: proje büyüdükçe infrastructure/{auth,middleware,logging}/ adacıklarına evrilir)
│
├── 📁 features/             --> 🍕 4. DİKEY DİLİMLER (VSA Mantığında Otonom Modüller)
│   ├── 📁 order-checkout/   --> [Dilim 1] — CheckoutCard.tsx, useCheckout.ts, index.ts
│   └── 📁 invoice-generator/--> [Dilim 2] — InvoiceView.tsx, index.ts
│
├── 📁 plugins/              --> 🔌 5. GERÇEK EKLENTİLER (Yalnızca gerektiğinde)
│   └── 📁 terrain-sculptor/ --> SculptorPanel.tsx, brushMath.ts, index.ts (IStudioTool / register())
│
└── 📄 main.ts               --> 🔌 Composition Root (Feature'ları ve plugin'leri bağlar)`}
        </pre>
      </div>
      <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: '#64748b', fontStyle: 'italic', marginBottom: '2.5rem' }}>
        {isEn 
          ? "> index.ts = Public API: deep imports into a feature (e.g. features/order-checkout/useCheckout) are forbidden. Only index.ts is exposed."
          : "> index.ts = Public API: feature içine derin import (örn. features/order-checkout/useCheckout) yasak. Dışarıya yalnızca index.ts açılır."
        }
      </p>

      {/* GOLDEN RULE MANIFESTO */}
      <h4 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>
        {isEn ? "The Golden Rule: Responsibility Manifesto" : "Altın Kural: Sorumluluk Manifestosu"}
      </h4>
      <p style={{ color: '#38bdf8', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
        {isEn 
          ? "Features own behavior. Core owns truth. Shared owns presentation primitives. Infrastructure owns external concerns."
          : "Features davranışı sahiplenir. Core gerçeği sahiplenir. Shared sunum ilkellerini sahiplenir. Infrastructure dış kaygıları sahiplenir."
        }
      </p>
      <div style={{ overflowX: 'auto', marginBottom: '2.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: '#020617', borderRadius: '12px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              <th style={{ padding: '1rem', width: '30%' }}>{isEn ? 'Layer' : 'Katman'}</th>
              <th style={{ padding: '1rem', width: '70%' }}>{isEn ? 'Responsibility' : 'Sorumluluk'}</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: '0.9rem' }}>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '1rem', color: '#f97316', fontWeight: 800 }}>features/</td>
              <td style={{ padding: '1rem', color: 'white' }}>{isEn ? 'User-facing features & use-cases' : 'Kullanıcıya dönük özellik ve use-case'}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '1rem', color: '#38bdf8', fontWeight: 800 }}>core/</td>
              <td style={{ padding: '1rem', color: 'white' }}>{isEn ? 'Immutable domain rules, algorithms, engine (pure)' : 'Değişmez domain kuralları, algoritmalar, motor (saf)'}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '1rem', color: '#06b6d4', fontWeight: 800 }}>shared/</td>
              <td style={{ padding: '1rem', color: 'white' }}>{isEn ? 'Generic UI & framework-agnostic helpers' : 'Genel UI ve framework-agnostic yardımcılar'}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '1rem', color: '#10b981', fontWeight: 800 }}>pipelines/</td>
              <td style={{ padding: '1rem', color: 'white' }}>{isEn ? 'External concerns: auth, persistence, telemetry' : 'Dış dünya: auth, persistence, telemetry'}</td>
            </tr>
            <tr>
              <td style={{ padding: '1rem', color: '#a855f7', fontWeight: 800 }}>main.ts</td>
              <td style={{ padding: '1rem', color: 'white' }}>{isEn ? 'Composition root / bootstrap' : 'Composition root / bootstrap'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* GAME VARIANT */}
      <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '2rem', borderRadius: '16px' }}>
        <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#10b981', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Gamepad2 size={22} /> {isEn ? "Game Variant (TypeScript / React)" : "Oyun Varyantı (TypeScript / React)"}
        </h4>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '850px' }}>
          {isEn 
            ? "The same rules applied to game development: mechanics live in core/, screens live in features/. They never import each other — battle calls combat."
            : "Aynı kuralların oyun geliştirmeye uygulanmış hali: mekanik core/'da, ekranlar features/'da yaşar. İkisi asla birbirini import etmez — battle, combat'ı çağırır."
          }
        </p>
        <pre style={{ margin: 0, fontSize: '0.85rem', color: '#10b981', fontFamily: 'monospace', lineHeight: 1.7, overflowX: 'auto', background: '#020617', padding: '1.5rem', borderRadius: '12px' }}>
{`📁 src/ (Oyun Varyantı)
│
├── 📁 core/            --> 🧠 MEKANİK (UI'den bağımsız, saf)
│   ├── 📁 engine/      (render loop, ECS)
│   ├── 📁 math/        (vector, interpolation)
│   ├── 📁 combat/      (calculateDamage, resolveAttack)
│   └── 📁 world/       (terrainHeight, findPath)
│
├── 📁 shared/          --> 🎨 TASARIM SİSTEMİ
│   ├── 📁 ui/          (HUD, menü bileşenleri)
│   └── 📁 assets/      (sprite, ses)
│
├── 📁 features/        --> 🍕 EKRANLAR & AKIŞLAR
│   ├── 📁 inventory/   (InventoryPanel, useInventory)
│   ├── 📁 battle/      (BattleScreen, BattleHUD, useBattle)
│   └── 📁 settlement/  (SettlementPanel)
│
├── 📁 infrastructure/  --> 🌍 DIŞ DÜNYA
│   ├── 📁 save/        (localStorage / IndexedDB)
│   ├── 📁 audio/       (ses motoru)
│   └── 📁 networking/  (multiplayer)
│
└── 📄 main.ts          (Composition Root)`}
        </pre>
        <p style={{ marginTop: '1rem', marginBottom: 0, color: '#10b981', fontWeight: 700, fontSize: '0.9rem' }}>
          {isEn ? "Game mechanics ≠ game screens." : "Oyun mekaniği ≠ oyun ekranı."}
        </p>
      </div>
    </div>
  );
};

export default ModularBlueprintSection;
