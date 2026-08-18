import React from 'react';
import { motion } from 'framer-motion';
import { Database, Sliders, Server, Globe, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const ComponentStateManagementTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const stateTypes = [
    {
      title: isEn ? "1. Local UI State" : "1. Yerel Bileşen Durumu (Local State)",
      tools: "useState, useReducer",
      desc: isEn ? "Component-scoped ephemeral data (e.g. dropdown open, input focus, modal toggle)." : "Sadece o bileşeni ilgilendiren geçici durumlar (Modal açık mı, input değeri, sekme seçimi)."
    },
    {
      title: isEn ? "2. Global Client State" : "2. Paylaşılan İstemci Durumu (Global State)",
      tools: "Zustand, Redux Toolkit",
      desc: isEn ? "Cross-component app data (e.g. current user session, shopping cart items, theme toggle)." : "Birden fazla sayfa veya bileşenin ihtiyaç duyduğu veriler (Kullanıcı oturumu, tema, sepet)."
    },
    {
      title: isEn ? "3. Server Cache State" : "3. Sunucu Önbellek Durumu (Server Cache)",
      tools: "TanStack Query (React Query), SWR",
      desc: isEn ? "Asynchronous remote data cache with automatic revalidation, deduplication, and garbage collection." : "Sunucudan gelen uzak verilerin önbelleklenmesi, otomatik arka plan güncellemesi ve senkronizasyonu."
    },
    {
      title: isEn ? "4. URL / Router State" : "4. URL ve Rota Durumu (URL State)",
      tools: "useSearchParams, useParams",
      desc: isEn ? "Bookmarkable and shareable browser state (e.g. active tab, search filters, pagination page)." : "Kullanıcının linki kopyalayıp başkasına attığında aynı ekranı görmesini sağlayan URL parametreleri."
    }
  ];

  return (
    <motion.div key="statemachine" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          {isEn ? "The 4 Essential UI State Categories" : "Modern Arayüz Durum (State) Kategorizasyonu"}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '800px' }}>
          {isEn 
            ? "Never dump everything into a global Redux store. Choose the correct state boundary for optimal performance and zero unnecessary re-renders." 
            : "Her state'i global store'a koymak bir anti-pattern'dir. Doğru durumu doğru katmanda (Local, Global, Server, URL) tutmak gereksiz render'ları önler."
          }
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {stateTypes.map((s, i) => (
            <div key={i} style={{ background: '#020617', padding: '1.5rem', borderRadius: '16px', border: '1px solid #1e293b' }}>
              <h4 style={{ color: 'white', fontWeight: 800, fontSize: '1.1rem', marginBottom: '4px' }}>{s.title}</h4>
              <span style={{ fontSize: '0.75rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '2px 8px', borderRadius: '6px', fontWeight: 700, display: 'inline-block', marginBottom: '10px' }}>
                {s.tools}
              </span>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ComponentStateManagementTab;
