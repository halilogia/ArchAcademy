import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  Brain, 
  Cpu, 
  Network, 
  ShieldCheck, 
  Activity, 
  Search,
  Zap,
  Layers,
  Share2,
  Lock,
  Cloud
} from 'lucide-react';
import ArchHero from '../components/ArchHero';

interface ArchItem {
  id: string;
  name: string;
  desc: string;
  icon: React.ElementType;
  color: string;
  category: 'Modern' | 'Legacy' | 'Hybrid';
}

const items: ArchItem[] = [
  { id: 'rag', name: 'RAG Architecture', desc: 'LLM\'leri harici veri kaynaklarıyla zenginleştiren modern AI mimarisi.', icon: Brain, color: '#8b5cf6', category: 'Modern' },
  { id: 'vector', name: 'Vector DBs', desc: 'Yüksek boyutlu verileri (Embeddings) verimli saklama ve arama.', icon: Database, color: '#3b82f6', category: 'Modern' },
  { id: 'agents', name: 'Agentic AI', desc: 'Otonom karar verebilen ve araç kullanan yapay zeka ajanları.', icon: Cpu, color: '#ef4444', category: 'Modern' },
  { id: 'semantic', name: 'Semantic Layers', desc: 'Ham veriyi iş mantığına dönüştüren semantik katmanlar.', icon: Layers, color: '#10b981', category: 'Hybrid' },
  { id: 'mesh', name: 'Data Mesh', desc: 'Veri sahipliğini ekiplere dağıtan desentralize mimari.', icon: Network, color: '#f59e0b', category: 'Modern' },
  { id: 'governance', name: 'AI Governance', desc: 'AI sistemlerinin güvenliği, şeffaflığı ve uyumluluğu.', icon: ShieldCheck, color: '#ec4899', category: 'Hybrid' },
];

const DataAICatalogPage: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const hoveredItem = items.find(item => item.id === hoveredId);

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: 'white' }}>
      <ArchHero 
        title="AI & Data" 
        subtitle="Catalog" 
        description="Geleceğin dünyasını inşa eden akıllı sistemler ve veri yapıları."
        badge="Modern Intelligence"
        color="#8b5cf6"
        illustration={
          <div style={{ position: 'relative', width: '300px', height: '300px' }}>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
              style={{ position: 'absolute', inset: 0, border: '2px dashed #8b5cf633', borderRadius: '50%' }}
            />
            <div style={{ position: 'absolute', inset: '40px', background: 'radial-gradient(circle, #8b5cf622 0%, transparent 70%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Brain size={100} color="#8b5cf6" />
            </div>
          </div>
        }
        features={[
          { icon: <Zap />, title: 'Inference Flow', desc: 'Veriden sonuca giden en hızlı yol.' },
          { icon: <Share2 />, title: 'Distributed Logic', desc: 'Ölçeklenebilir veri ağları.' },
          { icon: <Lock />, title: 'Secure AI', desc: 'Gizlilik odaklı modelleme.' }
        ]}
      />

      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {items.map(item => (
              <motion.div 
                key={item.id}
                onHoverStart={() => setHoveredId(item.id)}
                onHoverEnd={() => setHoveredId(null)}
                whileHover={{ scale: 1.02 }}
                className="glass-card"
                style={{ 
                  padding: '2rem', 
                  cursor: 'pointer',
                  borderTop: hoveredId === item.id ? `4px solid ${item.color}` : '4px solid transparent',
                  transition: 'border-color 0.3s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <div style={{ padding: '0.8rem', background: `${item.color}15`, borderRadius: '12px', color: item.color }}>
                       {React.createElement(item.icon, { size: 24 })}
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>{item.category}</span>
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{item.name}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {hoveredItem && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            style={{ 
              position: 'fixed', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
              width: '90%', maxWidth: '800px', background: 'rgba(15, 23, 42, 0.95)',
              padding: '2rem', borderRadius: '24px', border: `1px solid ${hoveredItem.color}33`,
              backdropFilter: 'blur(10px)', zIndex: 1000, boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}
          >
             <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <div style={{ padding: '1.5rem', background: `${hoveredItem.color}15`, borderRadius: '20px', color: hoveredItem.color }}>
                   {React.createElement(hoveredItem.icon, { size: 48 })}
                </div>
                <div>
                   <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{hoveredItem.name}</h2>
                   <p style={{ color: '#cbd5e1', fontSize: '1.1rem', margin: 0 }}>{hoveredItem.desc}</p>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DataAICatalogPage;
