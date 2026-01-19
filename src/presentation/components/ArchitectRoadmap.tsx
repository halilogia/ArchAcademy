import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Layout, 
  Target, 
  Zap, 
  CheckCircle2, 
  Lock, 
  Cpu, 
  Globe, 
  Database, 
  Box, 
  Award,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';

const roadmapData = [
  {
    level: "Seviye 1: The Craftsman",
    title: "Temeller ve Yazılım Pratikleri",
    color: "#6366f1",
    tasks: [
      { id: 'solid', title: 'SOLID Prensipleri', desc: 'Esnek kodun temel taşları.', icon: <Shield size={18} />, path: '/solid' },
      { id: 'patterns', title: 'Design Patterns', desc: 'Tekrar eden sorunlara standart çözümler.', icon: <Box size={18} />, path: '/glossary' },
      { id: 'clean-code', title: 'Clean Code', desc: 'Okunabilir ve sürdürülebilir kod sanatı.', icon: <Sparkles size={18} />, path: '/clean-code' }
    ]
  },
  {
    level: "Seviye 2: The Architect",
    title: "Mimari Stiller ve Katmanlı Yapılar",
    color: '#3b82f6',
    tasks: [
      { id: 'clean-arch', title: 'Clean Architecture', desc: 'Bağımsızlık ve test edilebilirlik.', icon: <Layout size={18} />, path: '/clean-arch' },
      { id: 'hexagonal', title: 'Hexagonal Architecture', desc: 'Portlar ve adaptörler ile izolasyon.', icon: <Database size={18} />, path: '/hexagonal' },
      { id: 'ddd', title: 'Domain Driven Design', desc: 'Karmaşık iş mantığı yönetimi.', icon: <Target size={18} />, path: '/ddd' }
    ]
  },
  {
    level: "Seviye 3: The Cloud Specialist",
    title: "Dağıtık Sistemler ve Modern Mimari",
    color: '#a855f7',
    tasks: [
      { id: 'eda', title: 'Event Driven Architecture', desc: 'Olay bazlı asenkron iletişim.', icon: <Zap size={18} />, path: '/eda' },
      { id: 'microservices', title: 'Microservices vs Monolith', desc: 'Ölçeklenebilirlik stratejileri.', icon: <Cpu size={18} />, path: '/system' },
      { id: 'cqrs', title: 'CQRS & Event Sourcing', desc: 'Okuma ve yazma işlemlerinin ayrımı.', icon: <Globe size={18} />, path: '/cqrs' }
    ]
  },
  {
    level: "Seviye 4: The Visionary",
    title: "Stratejik Karar Verme ve Liderlik",
    color: '#f59e0b',
    tasks: [
      { id: 'matrix', title: 'Master Matrix', desc: 'Mimari seçim matrisi oluşturma.', icon: <Award size={18} />, path: '/compare' },
      { id: 'surgery', title: 'Code Surgery', desc: 'Legacy sistemlerin modernizasyonu.', icon: <Cpu size={18} />, path: '/refactoring' },
      { id: 'strategy', title: 'Team Topologies', desc: 'Organizasyonel mimari yönetimi.', icon: <Shield size={18} />, path: '/system' }
    ]
  }
];

const ArchitectRoadmap = () => {
  const navigate = useNavigate();
  const { progress } = useProgress();

  return (
    <div style={{ padding: '60px 0', position: 'relative' }}>
      {/* Background Decorative Element */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '2px',
        height: '100%',
        background: 'linear-gradient(to bottom, transparent, rgba(99, 102, 241, 0.2), rgba(245, 158, 11, 0.2), transparent)',
        zIndex: 0
      }} />

      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
           <h1 className="gradient-text" style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1rem' }}>Architect's Journey</h1>
           <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
              Yazılım dünyasında bir usta (Architect) olma yolunda adım adım ilerle. 
              Hangi seviyedesin, seni neler bekliyor?
           </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
           {roadmapData.map((level, lIndex) => (
             <motion.div 
              key={lIndex}
              initial={{ opacity: 0, x: lIndex % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{ position: 'relative', zIndex: 1 }}
             >
                {/* Level Title */}
                <div style={{ 
                  display: 'flex', 
                  flexDirection: lIndex % 2 === 0 ? 'row' : 'row-reverse',
                  alignItems: 'center',
                  gap: '2rem',
                  marginBottom: '3rem'
                }}>
                   <div style={{ 
                     background: level.color, 
                     color: 'white', 
                     padding: '0.5rem 1.5rem', 
                     borderRadius: '100px',
                     fontSize: '0.8rem',
                     fontWeight: 900,
                     textTransform: 'uppercase',
                     boxShadow: `0 10px 30px ${level.color}40`
                   }}>
                     {level.level}
                   </div>
                   <h2 style={{ fontSize: '1.8rem', margin: 0 }}>{level.title}</h2>
                   <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
                </div>

                {/* Task Grid */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(3, 1fr)', 
                  gap: '2rem' 
                }}>
                   {level.tasks.map((task, tIndex) => {
                     const isCompleted = progress?.completedSteps?.includes(task.path);
                     const isLocked = lIndex > 1 && !isCompleted; // Simple dummy logic for locking

                     return (
                       <motion.div
                         key={tIndex}
                         whileHover={{ scale: 1.03, y: -5 }}
                         onClick={() => navigate(task.path)}
                         className="glass-card"
                         style={{
                           padding: '2rem',
                           border: isCompleted ? `1px solid ${level.color}50` : '1px solid var(--glass-border)',
                           background: isCompleted ? `${level.color}05` : 'rgba(255,255,255,0.02)',
                           cursor: 'pointer',
                           position: 'relative',
                           opacity: isLocked ? 0.6 : 1,
                           filter: isLocked ? 'grayscale(0.5)' : 'none'
                         }}
                       >
                          <div style={{ 
                            width: '45px', 
                            height: '45px', 
                            borderRadius: '12px', 
                            background: isCompleted ? level.color : 'rgba(255,255,255,0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: isCompleted ? 'white' : 'var(--text-secondary)',
                            marginBottom: '1.5rem',
                            transition: 'all 0.3s'
                          }}>
                             {isLocked ? <Lock size={20} /> : task.icon}
                          </div>

                          <h4 style={{ marginBottom: '0.5rem', color: isCompleted ? level.color : 'white' }}>{task.title}</h4>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.5rem' }}>{task.desc}</p>
                          
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                             <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', opacity: 0.5 }}>
                               {isCompleted ? 'Tamamlandı' : isLocked ? 'Kilitli' : 'Başla'}
                             </span>
                             {isCompleted ? (
                               <CheckCircle2 size={18} color="#10b981" />
                             ) : (
                               <ChevronRight size={16} color={level.color} />
                             )}
                          </div>

                          {isCompleted && (
                            <motion.div 
                              layoutId={`sparkle-${task.id}`}
                              style={{ position: 'absolute', top: '1rem', right: '1rem' }}
                            >
                               <Sparkles size={16} color={level.color} />
                            </motion.div>
                          )}
                       </motion.div>
                     );
                   })}
                </div>
             </motion.div>
           ))}
        </div>

        {/* Motivational Footer */}
        <div style={{ textAlign: 'center', marginTop: '8rem' }}>
           <div className="glass-card" style={{ 
             display: 'inline-flex', 
             alignItems: 'center', 
             gap: '1rem', 
             padding: '1.5rem 3rem',
             borderRadius: '100px',
             background: 'linear-gradient(90deg, #6366f105, #f59e0b10)'
           }}>
              <Award size={32} color="#f59e0b" />
              <div style={{ textAlign: 'left' }}>
                 <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>Sürekli Gelişim Disiplini</div>
                 <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.6 }}>Mimari bir varış noktası değil, bitmeyen bir yolculuktur.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectRoadmap;
