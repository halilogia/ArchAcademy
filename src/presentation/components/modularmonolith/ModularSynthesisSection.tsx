import React from 'react';
import { useTranslation } from 'react-i18next';

export const ModularSynthesisSection: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <div className="glass-card" style={{ padding: '3rem', borderTop: '4px solid #a855f7' }}>
      <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>
        {isEn ? "Genetic Lineage: What Did We Inherit?" : "Mimari Gen Haritası: Hangi Mimariden Neyi Devraldık?"}
      </h3>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              <th style={{ padding: '1rem', width: '30%' }}>{isEn ? 'Source Architecture' : 'Kaynak Mimari'}</th>
              <th style={{ padding: '1rem', width: '35%' }}>{isEn ? 'Inherited Superpower' : 'Devralınan Süper Güç'}</th>
              <th style={{ padding: '1rem', width: '35%' }}>{isEn ? 'Discarded Waste' : 'Çöpe Atılan İsraf (Waste)'}</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: '0.9rem' }}>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '1rem', color: '#f97316', fontWeight: 800 }}>🍕 {isEn ? 'Vertical Slice (VSA)' : 'Vertical Slice (VSA)'}</td>
              <td style={{ padding: '1rem', color: 'white' }}>{isEn ? 'Single-folder completion speed & 5/5 AI Locality' : 'Tek klasörde bitirme hızı & 5/5 AI Locality'}</td>
              <td style={{ padding: '1rem', color: '#94a3b8' }}>{isEn ? 'Uncontrolled duplicated code & UI style chaos' : 'Kontrolsüz kopya kod ve UI stil kaosları'}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '1rem', color: '#06b6d4', fontWeight: 800 }}>🎨 {isEn ? 'FSD (Feature-Sliced Design)' : 'FSD (Feature-Sliced Design)'}</td>
              <td style={{ padding: '1rem', color: 'white' }}>{isEn ? 'Enterprise Shared UI Kit & index.ts Public API' : 'Kurumsal Shared UI Kit & index.ts Public API'}</td>
              <td style={{ padding: '1rem', color: '#94a3b8' }}>{isEn ? '4-subfolder burden inside every slice (Over-segmenting)' : 'Her dilim içi 4 alt klasör eziyeti (Over-segmenting)'}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <td style={{ padding: '1rem', color: '#38bdf8', fontWeight: 800 }}>🏛️ {isEn ? 'Clean Architecture' : 'Clean Architecture'}</td>
              <td style={{ padding: '1rem', color: 'white' }}>{isEn ? 'Pure business rules & engine protected in src/core/' : 'Saf iş kurallarının ve motorun src/core/ ile korunması'}</td>
              <td style={{ padding: '1rem', color: '#94a3b8' }}>{isEn ? '7 layers & 20 interfaces for one simple feature' : '1 basit özellik için 7 katman ve 20 interface açma zorunluluğu'}</td>
            </tr>
            <tr>
              <td style={{ padding: '1rem', color: '#a855f7', fontWeight: 800 }}>🛡️ {isEn ? 'Hexagonal / CQRS' : 'Hexagonal / CQRS'}</td>
              <td style={{ padding: '1rem', color: 'white' }}>{isEn ? 'Centralized security & authorization pipelines' : 'Merkezi güvenlik ve yetki boru hatları (Pipelines)'}</td>
              <td style={{ padding: '1rem', color: '#94a3b8' }}>{isEn ? 'Over-complex Event Bus & async sync overhead' : 'Aşırı karmaşık Event Bus ve asenkron senkronizasyon yükü'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModularSynthesisSection;
