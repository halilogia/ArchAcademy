import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Layout, 
  Target, 
  Zap, 
  CheckCircle2, 
  Globe, 
  Cpu, 
  Box, 
  Award,
  ChevronRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useProgress } from '../context/ProgressContext';

interface RoadmapTask {
  id: string;
  title: string;
  desc: { tr: string; en: string };
  icon: React.ReactNode;
  path: string;
}

interface RoadmapLevel {
  level: { tr: string; en: string };
  title: { tr: string; en: string };
  color: string;
  tasks: RoadmapTask[];
}

const roadmapData: RoadmapLevel[] = [
  {
    level: { tr: "Seviye 1: The Craftsman", en: "Level 1: The Craftsman" },
    title: { tr: "Temeller ve Yazılım Pratikleri", en: "Foundations & Code Craftsmanship" },
    color: "#6366f1",
    tasks: [
      { id: 'solid', title: 'SOLID Principles', desc: { tr: 'Değişime açık, esnek kodun temel taşları.', en: 'Core cornerstones of maintainable code.' }, icon: <Shield size={18} />, path: '/solid' },
      { id: 'clean-code', title: 'Clean Code', desc: { tr: 'Okunabilir, test edilebilir ve sürdürülebilir kod sanatı.', en: 'The art of readable, expressive, and testable code.' }, icon: <Sparkles size={18} />, path: '/clean-code' },
      { id: 'patterns', title: 'Design Patterns', desc: { tr: 'Tekrar eden yapısal sorunlara GOF şablonları.', en: 'Proven GOF solutions for recurring structural challenges.' }, icon: <Box size={18} />, path: '/glossary' }
    ]
  },
  {
    level: { tr: "Seviye 2: The Architect", en: "Level 2: The Architect" },
    title: { tr: "Modern Mimari Stiller", en: "Modern Architectural Styles" },
    color: '#3b82f6',
    tasks: [
      { id: 'vertical', title: 'Vertical Slice', desc: { tr: 'Hızlı, otonom ve özellik bazlı tasarım.', en: 'High-cohesion feature-first domain slices.' }, icon: <Zap size={18} />, path: '/vertical' },
      { id: 'clean-arch', title: 'Clean Architecture', desc: { tr: 'Bağımsızlık ve katmanlı soyutlama.', en: 'Layers of independence and testable use cases.' }, icon: <Layout size={18} />, path: '/clean-arch' },
      { id: 'ddd', title: 'Domain-Driven Design', desc: { tr: 'Karmaşık iş kurallarını Bounded Context ile modelleme.', en: 'Strategic modeling and bounded context isolation.' }, icon: <Target size={18} />, path: '/ddd' }
    ]
  },
  {
    level: { tr: "Seviye 3: The System Builder", en: "Level 3: The System Builder" },
    title: { tr: "Frontend ve Dağıtık Yapılar", en: "Frontend & Distributed Systems" },
    color: '#a855f7',
    tasks: [
      { id: 'fsd', title: 'Feature-Sliced Design', desc: { tr: 'Büyük ölçekli modern frontend organizasyonu.', en: 'Scalable frontend module hierarchy.' }, icon: <Layers size={18} />, path: '/fsd' },
      { id: 'eda', title: 'Event-Driven Architecture', desc: { tr: 'Olay bazlı asenkron haberleşme.', en: 'Asynchronous event emission and consumption.' }, icon: <Zap size={18} />, path: '/eda' },
      { id: 'microservices', title: 'Microservices & Systems', desc: 'Dağıtık servis stratejileri ve dayanıklılık.', desc: { tr: 'Dağıtık servis stratejileri ve dayanıklılık.', en: 'Decoupled services, observability, and resilience.' }, icon: <Cpu size={18} />, path: '/microservices' }
    ]
  },
  {
    level: { tr: "Seviye 4: The Visionary", en: "Level 4: The Visionary" },
    title: { tr: "Stratejik Liderlik & Modernizasyon", en: "Strategic Leadership & Modernization" },
    color: '#f59e0b',
    tasks: [
      { id: 'matrix', title: 'Master Matrix', desc: { tr: 'Stratejik mimari seçim ve kıyaslama yöntemleri.', en: 'Multi-criteria architectural evaluation & tradeoffs.' }, icon: <Award size={18} />, path: '/compare' },
      { id: 'evolution', title: 'Evolutionary Architecture', desc: { tr: 'Değişime ve yüke ayak uyduran sistemler.', en: 'Building systems that embrace guided, incremental change.' }, icon: <Globe size={18} />, path: '/evolution' },
      { id: 'surgery', title: 'Code Surgery', desc: { tr: 'Legacy sistem refactoring ve modernizasyon sanatı.', en: 'Transforming legacy code into clean modern patterns.' }, icon: <Cpu size={18} />, path: '/refactoring' }
    ]
  }
];

const ArchitectRoadmap: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const navigate = useNavigate();
  const { progress } = useProgress();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', maxWidth: '1000px', margin: '0 auto' }}>
      {roadmapData.map((level, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="glass-card"
          style={{ padding: '2.5rem', borderTop: `4px solid ${level.color}`, position: 'relative' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: level.color, letterSpacing: '2px', textTransform: 'uppercase' }}>
                {isEn ? level.level.en : level.level.tr}
              </span>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginTop: '4px' }}>
                {isEn ? level.title.en : level.title.tr}
              </h2>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '6px 14px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.05)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {level.tasks.length} {isEn ? "Modules" : "Modül"}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {level.tasks.map((task) => {
              const isCompleted = progress[task.path];
              return (
                <motion.div
                  key={task.id}
                  onClick={() => navigate(task.path)}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    padding: '1.5rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '1rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: `${level.color}15`,
                      color: level.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {task.icon}
                    </div>
                    {isCompleted && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#10b981', fontSize: '0.75rem', fontWeight: 800 }}>
                        <CheckCircle2 size={16} /> {isEn ? "COMPLETED" : "TAMAMLANDI"}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'white', marginBottom: '4px' }}>{task.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                      {isEn ? task.desc.en : task.desc.tr}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: level.color, fontSize: '0.85rem', fontWeight: 700 }}>
                    {isEn ? "Start Module" : "Modülü Başlat"} <ChevronRight size={16} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ArchitectRoadmap;
