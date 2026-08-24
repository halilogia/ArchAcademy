import React from 'react';
import { useTranslation } from 'react-i18next';

export const ModularOptimizationsSection: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <div className="glass-card" style={{ padding: '3rem', borderTop: '4px solid #10b981' }}>
      <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>
        {isEn ? "The 5 Golden Optimizations of Pragmatic Architecture" : "Vertical Slice'ı Kusursuzlaştıran 5 Altın Optimizasyon"}
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
          <div style={{ color: '#10b981', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>1. 🛡️ {isEn ? 'Protected Core Domain' : 'Korunan Core Domain'}</div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
            {isEn 
              ? 'Critical tax, finance and math algorithms live as pure functions in src/core/. Zero application/framework/runtime dependency — pure utility libraries (decimal.js, date-fns) are allowed. Slices call core instead of copying.'
              : 'Kritik faiz, vergi ve matematiksel algoritmalar src/core/ içinde saf fonksiyon olarak yaşar. Sıfır uygulama/framework/runtime bağımlılığı — saf yardımcı kütüphaneler (decimal.js, date-fns) serbest. Dilimler core\'u çağırır, kopyalamaz.'}
          </p>
        </div>

        <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
          <div style={{ color: '#38bdf8', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>2. 🎨 {isEn ? 'Shared UI Kit & Tokens' : 'Shared UI Kit & Tokens'}</div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
            {isEn 
              ? 'Slices never write buttons from scratch; they consume src/shared/ui/ components. Design consistency is guaranteed by construction.'
              : 'Dilimler sıfırdan buton yazmaz; src/shared/ui/ bileşenlerini tüketir. Tasarım tutarlılığı yapı gereği garanti altına alınır.'}
          </p>
        </div>

        <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
          <div style={{ color: '#f59e0b', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>3. ⚙️ {isEn ? 'Pipeline Behaviors' : 'Pipeline Behaviors'}</div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
            {isEn 
              ? 'Tenant isolation and GDPR audit logs are not written per slice; a middleware pipeline runs them automatically. pipelines/ suffices for small projects — grow it into infrastructure/ islands.'
              : 'TenantId izolasyonu ve GDPR audit logları her dilime tek tek yazılmaz; middleware pipeline ile otomatik işletilir. Küçük projede pipelines/ yeterli, büyüdükçe infrastructure/ adacıklarına ayrılır.'}
          </p>
        </div>

        <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
          <div style={{ color: '#a855f7', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>4. 🗄️ {isEn ? 'DTO Projections (When Needed)' : 'DTO Projections (Gerektiğinde)'}</div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
            {isEn 
              ? 'When a boundary or performance requires it, slices query only the fields they need. The rule is "projection when needed", not "DTO everywhere".'
              : 'Sınır veya performans gerektirdiğinde dilimler yalnızca ihtiyaç duydukları alanları çeker. Kural: "her yerde DTO" değil, "gerektiğinde projection".'}
          </p>
        </div>

        <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
          <div style={{ color: '#ef4444', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>5. 🔌 {isEn ? 'Feature ≠ Plugin' : 'Feature ≠ Plugin'}</div>
          <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
            {isEn 
              ? 'Regular features are wired by static imports. Only real plug-ins (terrain-sculptor, map-editor) live in plugins/ and implement a register() contract.'
              : 'Normal feature statik import ile bağlanır. Yalnızca gerçek eklentiler (terrain-sculptor, map-editor) plugins/ içinde yaşar ve register() arayüzü uygular.'}
          </p>
        </div>
      </div>

      {/* WHEN NOT TO USE PMA */}
      <div style={{ background: 'rgba(239, 68, 68, 0.03)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '2rem', borderRadius: '16px' }}>
        <h4 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '0.5rem' }}>
          🎯 {isEn ? "When NOT to Use PMA?" : "Ne Zaman PMA Kullanılmaz?"}
        </h4>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '850px' }}>
          {isEn 
            ? "Headcount alone is not the criterion — a 4-person team can build a complex game engine while a 15-person team can build a simple CRUD SaaS. Decide on these signals instead:"
            : "Tek başına ekip büyüklüğü kriter değildir — 4 kişilik ekip karmaşık oyun motoru, 15 kişilik ekip basit CRUD SaaS yapabilir. Bu sinyallere göre karar verin:"}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div style={{ background: '#020617', borderRadius: '14px', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ color: '#ef4444', fontWeight: 800, fontSize: '0.85rem' }}>{isEn ? 'DON\'T' : 'KULLANMAYIN'}</span>
              <span style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', padding: '4px 10px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700 }}>❌ {isEn ? 'Düşük Sinyaller' : 'Düşük Sinyaller'}</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#94a3b8', fontSize: '0.85rem', lineHeight: 2 }}>
              <li>{isEn ? 'Düşük domain karmaşıklığı (CRUD ağırlıklı)' : 'Low domain complexity (CRUD-heavy)'}</li>
              <li>{isEn ? 'Az sayıda bağımsız feature' : 'Few independent features'}</li>
              <li>{isEn ? 'Kısa ömürlü / prototype proje' : 'Short-lived / prototype project'}</li>
              <li>{isEn ? 'Tek kişi seri geliştirme' : 'Solo sequential development'}</li>
              <li>{isEn ? 'Bileşen tek sayfaya aitse → co-locate, features/\'a çıkarma' : 'Component belongs to one page → co-locate, do not promote to features/'}</li>
            </ul>
          </div>
          <div style={{ background: '#020617', borderRadius: '14px', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ color: '#10b981', fontWeight: 800, fontSize: '0.85rem' }}>{isEn ? 'DO' : 'KULLANIN'}</span>
              <span style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '4px 10px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700 }}>✅ {isEn ? 'Yüksek Sinyaller' : 'Yüksek Sinyaller'}</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: '1.2rem', color: '#94a3b8', fontSize: '0.85rem', lineHeight: 2 }}>
              <li>{isEn ? 'Yüksek domain karmaşıklığı (oyun motoru, finans)' : 'High domain complexity (game engine, finance)'}</li>
              <li>{isEn ? 'Çok sayıda bağımsız feature' : 'Many independent features'}</li>
              <li>{isEn ? 'Uzun ömürlü proje + paralel geliştirme' : 'Long-lived project + parallel development'}</li>
              <li>{isEn ? 'Belirgin domain sınırları' : 'Clear domain boundaries'}</li>
              <li>{isEn ? 'AI-assisted development (locality avantajı)' : 'AI-assisted development (locality advantage)'}</li>
            </ul>
          </div>
        </div>
        <p style={{ marginTop: '1.5rem', marginBottom: 0, fontSize: '0.8rem', color: '#64748b', fontStyle: 'italic', lineHeight: 1.6 }}>
          {isEn 
            ? "Note: ArchAcademy's own src/ uses a lean Clean structure (domain/presentation/infrastructure) because it is a small educational app. PMA is the target standard this document recommends — this is the migration path once the growth threshold is crossed."
            : "Not: ArchAcademy'nin kendi src/'si küçük bir eğitim uygulaması olduğu için yalın Lean Clean yapı (domain/presentation/infrastructure) kullanır. PMA bu dokümanın önerdiği hedef standarttır — büyüme eşiği aşıldığında geçiş planı budur."}
        </p>
      </div>
    </div>
  );
};

export default ModularOptimizationsSection;
