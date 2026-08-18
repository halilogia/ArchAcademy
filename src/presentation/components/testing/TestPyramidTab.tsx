import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Layers, Globe, ShieldAlert, Cpu } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const TestPyramidTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const layers = [
    {
      level: 'E2E (End-to-End)',
      pct: '10%',
      color: '#ef4444',
      speed: isEn ? 'Slow (Minutes)' : 'Yavaş (Dakikalar)',
      cost: isEn ? 'High ($$$)' : 'Çok Yüksek ($$$)',
      focus: isEn ? 'User Journeys, Browser automation (Playwright/Cypress)' : 'Kullanıcı Akışları, Tarayıcı otomasyonu (Playwright/Cypress)',
      icon: <Globe size={24} color="#ef4444" />
    },
    {
      level: 'Integration (Entegrasyon)',
      pct: '20%',
      color: '#f59e0b',
      speed: isEn ? 'Medium (Seconds)' : 'Orta (Saniyeler)',
      cost: isEn ? 'Medium ($$)' : 'Orta ($$)',
      focus: isEn ? 'Database queries, API contracts, Message broker bridges' : 'Veritabanı sorguları, API sözleşmeleri, Mesaj kuyrukları',
      icon: <Layers size={24} color="#f59e0b" />
    },
    {
      level: 'Unit (Birim Testler)',
      pct: '70%',
      color: '#22c55e',
      speed: isEn ? 'Blazing Fast (Milliseconds)' : 'Çok Hızlı (Milisaniyeler)',
      cost: isEn ? 'Low ($)' : 'Çok Düşük ($)',
      focus: isEn ? 'Pure functions, Domain logic, Entity invariant assertions' : 'Saf fonksiyonlar, Domain iş mantığı, Varlık kuralları',
      icon: <Cpu size={24} color="#22c55e" />
    }
  ];

  return (
    <motion.div key="pyramid" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          {isEn ? "The Practical Test Pyramid" : "Pratik Test Piramidi Mimarisi"}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '800px' }}>
          {isEn 
            ? "Mike Cohn's classic Test Pyramid dictates a broad base of lightning-fast unit tests, complemented by targeted integration tests, and a lean apex of end-to-end user tests." 
            : "Mike Cohn'un klasik Test Piramidi: Hızlı geri bildirim için tabanda binlerce milisaniyelik Birim Test, ortada gerçek veritabanı entegrasyon testleri ve tepede en kritik kullanıcı akışlarını doğrulayan E2E testler yer alır."
          }
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {layers.map((l, i) => (
            <div 
              key={i} 
              style={{ 
                background: '#020617', 
                borderRadius: '16px', 
                padding: '1.5rem', 
                borderLeft: `4px solid ${l.color}`,
                border: '1px solid #1e293b',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                gap: '1.5rem',
                alignItems: 'center'
              }}
            >
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '12px' }}>
                {l.icon}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <h4 style={{ color: 'white', fontWeight: 800, fontSize: '1.1rem' }}>{l.level}</h4>
                  <span style={{ fontSize: '0.75rem', fontWeight: 900, background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '6px', color: l.color }}>
                    {l.pct} Hacim
                  </span>
                </div>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>{l.focus}</p>
              </div>
              <div style={{ textAlign: 'right', fontSize: '0.85rem' }}>
                <div style={{ color: '#cbd5e1', fontWeight: 600 }}>⚡ {l.speed}</div>
                <div style={{ color: '#64748b', marginTop: '4px' }}>Maliyet: {l.cost}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TestPyramidTab;
