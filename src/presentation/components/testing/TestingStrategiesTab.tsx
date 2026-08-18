import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Shield, Box, Zap, FileCode, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const TestingStrategiesTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const principles = [
    {
      acronym: 'AAA',
      name: isEn ? 'Arrange - Act - Assert' : 'Arrange - Act - Assert Standardı',
      desc: isEn 
        ? 'Arrange: Setup test objects. Act: Execute the target method. Assert: Verify expected invariants.' 
        : 'Hazırla (Arrange), Çalıştır (Act), Doğrula (Assert). Tüm test fonksiyonlarının evrensel yazım standardı.'
    },
    {
      acronym: 'FIRST',
      name: isEn ? 'FIRST Principles' : 'FIRST Test Prensipleri',
      desc: isEn 
        ? 'Fast (Milliseconds), Independent (No shared state), Repeatable, Self-validating (Pass/Fail), Timely (Written with code).' 
        : 'Hızlı (Fast), Bağımsız (Independent), Tekrarlanabilir (Repeatable), Kendi Doğrulayan (Self-validating), Zamanında (Timely).'
    },
    {
      acronym: 'Right-BICEP',
      name: isEn ? 'Right-BICEP Checklist' : 'Right-BICEP Sınır Kontrolü',
      desc: isEn 
        ? 'Right results, Boundary conditions, Inverse checks, Cross-validation, Error forcing, Performance bounds.' 
        : 'Sonuçlar Doğru mu? Sınırlar (0, null, max), Ters ilişkiler, Çapraz doğrulama, Hata simülasyonu, Performans.'
    },
    {
      acronym: 'Test Doubles',
      name: isEn ? 'Mocks vs Stubs vs Fakes' : 'Mock, Stub ve Fake Ayrımı',
      desc: isEn 
        ? 'Dummy (Parametre doldurucu), Stub (Sabit veri dönen), Spy (Çağrı kaydeden), Mock (Beklenti doğrulayan), Fake (Basit bellek içi implementasyon).' 
        : 'Dış bağımlılıkları (Veritabanı, Ödeme API) izole etmek için kullanılan sahte nesne hiyerarşisi.'
    }
  ];

  return (
    <motion.div key="strategies" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {principles.map((p, i) => (
          <div key={i} className="glass-card" style={{ padding: '2rem', borderTop: '3px solid #6366f1' }}>
            <div style={{ display: 'inline-block', background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', fontWeight: 900, padding: '4px 10px', borderRadius: '8px', fontSize: '0.8rem', marginBottom: '1rem' }}>
              {p.acronym}
            </div>
            <h4 style={{ color: 'white', fontWeight: 800, fontSize: '1.15rem', marginBottom: '0.75rem' }}>{p.name}</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default TestingStrategiesTab;
