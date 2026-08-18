import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Bot, Zap, FolderSearch } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const VerticalAIVibeTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const advantages = [
    {
      icon: <FolderSearch size={24} color="#f97316" />,
      title: isEn ? "1. Minimum File Navigation" : "1. Minimum Klasör Gezintisi",
      desc: isEn 
        ? "Feed the AI only the single `Features/Cart` directory. Eliminates token waste and context hallucination." 
        : "AI modeline sadece `Features/Sepetim` klasörünü vermeniz yeterlidir. Context token israfı ve halüsinasyon riski sıfıra iner."
    },
    {
      icon: <Sparkles size={24} color="#38bdf8" />,
      title: isEn ? "2. High GitHub Adoption" : "2. Modern Ekosistem Standardı",
      desc: isEn 
        ? "Fastest growing architecture in Next.js App Router, React Feature Folders, and modern .NET MediatR workflows." 
        : "Modern Next.js, React ve .NET dünyasında en çok yıldız alan ve benimsenen çağdaş mimari stili haline gelmiştir."
    },
    {
      icon: <Bot size={24} color="#a855f7" />,
      title: isEn ? "3. Natural for Non-Programmers" : "3. Vibe Coding & Kolay Anlaşılırlık",
      desc: isEn 
        ? "Organized directly by user actions (CreateOrder, CancelOrder) rather than abstract Ports/Adapters/Aggregates." 
        : "Soyut katmanlara (Port, Adapter, Aggregate) boğulmadan doğrudan işlev adlarıyla organize edildiği için vibe coding için mükemmeldir."
    }
  ];

  return (
    <motion.div key="vibecoding" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(249, 115, 22, 0.2)', color: '#f97316', padding: '6px 16px', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 800, marginBottom: '1.5rem' }}>
          🤖 AI-NATIVE & VIBE CODING ŞAMPİYONU (5/5 ⭐)
        </div>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          {isEn ? "Why Vertical Slice is #1 for AI Copilots" : "Neden AI ve Vibe-Coding İçin 1 Numara?"}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '800px' }}>
          {isEn 
            ? "Traditional layered architectures require AI agents to jump across 5 different folders just to add one database field. Vertical Slice co-locates UI, queries, and mutation logic." 
            : "Geleneksel katmanlı mimarilerde tek bir alanı değiştirmek için AI'ın 5 farklı klasör arasında zıplaması gerekirken, Vertical Slice mimarisinde tüm iş mantığı, veri sorgusu ve arayüz aynı dilimde yer alır."
          }
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {advantages.map((adv, i) => (
            <div key={i} style={{ background: '#020617', padding: '1.5rem', borderRadius: '16px', border: '1px solid #1e293b' }}>
              <div style={{ marginBottom: '1rem' }}>{adv.icon}</div>
              <h4 style={{ color: 'white', fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>{adv.title}</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{adv.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default VerticalAIVibeTab;
