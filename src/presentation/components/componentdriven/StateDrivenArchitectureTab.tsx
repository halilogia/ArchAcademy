import React from 'react';
import { motion } from 'framer-motion';
import { Activity, GitMerge, RotateCw, CheckCircle2, AlertOctagon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const StateDrivenArchitectureTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const fsmSteps = [
    { state: 'IDLE', color: '#64748b', desc: isEn ? 'Initial state waiting for user interaction.' : 'Kullanıcı etkileşimi bekleyen ilk durum.' },
    { state: 'LOADING', color: '#38bdf8', desc: isEn ? 'Async fetch initiated. Spinner displayed, buttons disabled.' : 'Asenkron istek atıldı. Buton kilitli, yükleniyor açık.' },
    { state: 'SUCCESS', color: '#22c55e', desc: isEn ? 'Data received & valid. UI rendered with zero intermediate bugs.' : 'Veri başarıyla geldi. UI eksiksiz render edildi.' },
    { state: 'ERROR', color: '#ef4444', desc: isEn ? 'Handled error boundary state with retry mechanism.' : 'Hata yakalandı, kullanıcıya tekrar dene butonu sunuldu.' }
  ];

  return (
    <motion.div key="reactive" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          {isEn ? "State-Driven UI & Finite State Machines (FSM)" : "Durum Odaklı (State-Driven) UI ve Sonlu Durum Makineleri"}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '800px' }}>
          {isEn 
            ? "UI is a pure mathematical function of State: `UI = f(State)`. By modeling states with explicit FSMs, impossible states (e.g. `isLoading && isError`) are structurally eliminated." 
            : "Modern arayüzler durumun saf bir matematiksel fonksiyonudur: `UI = f(State)`. Durumları Sonlu Durum Makineleri (FSM) ile modellemek, 'aynı anda hem loading hem error' gibi imkansız durum bug'larını kökten yok eder."
          }
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {fsmSteps.map((s, i) => (
            <div key={i} style={{ background: '#020617', padding: '1.25rem', borderRadius: '14px', borderLeft: `4px solid ${s.color}`, border: '1px solid #1e293b' }}>
              <div style={{ fontWeight: 800, color: s.color, fontSize: '1rem', marginBottom: '4px' }}>{s.state}</div>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default StateDrivenArchitectureTab;
