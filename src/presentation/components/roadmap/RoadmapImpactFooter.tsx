import React from 'react';
import { Trophy, Users, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const RoadmapImpactFooter: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <section style={{ 
      padding: '80px 0', 
      background: 'rgba(15, 23, 42, 0.4)', 
      borderTop: '1px solid rgba(255,255,255,0.05)',
      position: 'relative'
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', textAlign: 'center' }}>
          <div>
            <div style={{ color: 'var(--primary)', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
              <Trophy size={32} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              {isEn ? "Principal Standard" : "Principal Seviyesi"}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {isEn 
                ? "Directly mapped to Staff and Principal engineer expectations at global tier-1 tech firms." 
                : "Global teknoloji devlerinin Staff ve Principal seviyesindeki mimar beklentileriyle birebir uyumlu."
              }
            </p>
          </div>

          <div>
            <div style={{ color: '#10b981', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
              <Users size={32} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              {isEn ? "Community Driven" : "Topluluk ve Mentorluk"}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {isEn 
                ? "Continuous real-world peer discussions, trade-off reviews, and case study updates." 
                : "Sürekli güncellenen pratikler, trade-off tartışmaları ve vaka analizleriyle zenginleştirilmiş içerik."
              }
            </p>
          </div>

          <div>
            <div style={{ color: '#ec4899', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
              <BookOpen size={32} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              {isEn ? "Hands-On Dissection" : "Uygulamalı Teori"}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {isEn 
                ? "Every pattern is paired with an interactive sandbox, clean surgery breakdown, and live diagram." 
                : "Sadece teorik anlatım değil; canlı simülasyonlar, kod ameliyatları ve interaktif şemalar."
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapImpactFooter;
