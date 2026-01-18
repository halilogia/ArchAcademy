import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Layout, Target, Zap, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../context/ProgressContext';

const HomeRoadmap = () => {
  const navigate = useNavigate();
  const { progress } = useProgress();

  const steps = [
    {
      title: 'Temel Prensipler',
      desc: 'SOLID Prensipleri ile temiz kodun temellerini atın.',
      icon: <Shield size={24} />,
      color: '#6366f1',
      path: '/solid'
    },
    {
      title: 'Mimari Stiller',
      desc: 'Clean, Hexagonal ve Onion ile sistem iskeletini kurun.',
      icon: <Layout size={24} />,
      color: 'var(--primary)',
      path: '/clean-arch'
    },
    {
      title: 'Yüksek Disiplin',
      desc: 'DDD ve CQRS ile karmaşıklığı ustalıkla yönetin.',
      icon: <Target size={24} />,
      color: '#a78bfa',
      path: '/ddd'
    },
    {
      title: 'Master Seviye',
      desc: 'EDA ve Master Matrix ile kararlarınızı stratejikleştirin.',
      icon: <Zap size={24} />,
      color: '#a855f7',
      path: '/compare'
    }
  ];

  return (
    <section style={{ padding: '100px 0' }}>
      <div className="container">
        <h2 className="section-title">Eğitim Yolculuğun</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2rem',
          position: 'relative'
        }}>
          {/* Connector Line */}
          <div style={{
            position: 'absolute',
            top: '40px',
            left: '10%',
            right: '10%',
            height: '2px',
            background: 'linear-gradient(to right, #6366f1, var(--primary), #a78bfa, #a855f7)',
            zIndex: 0,
            opacity: 0.2
          }} />

          {steps.map((step, i) => {
            const isCompleted = progress.completedSteps.includes(step.path);
            
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{ position: 'relative', zIndex: 1, textAlign: 'center', cursor: 'pointer' }}
                onClick={() => navigate(step.path)}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: isCompleted ? `${step.color}20` : 'var(--surface)',
                  border: `2px solid ${isCompleted ? step.color : step.color + '50'}`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem',
                  color: step.color,
                  boxShadow: isCompleted ? `0 0 30px ${step.color}40` : `0 0 20px ${step.color}20`,
                  position: 'relative'
                }}>
                  {isCompleted && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      style={{
                        position: 'absolute',
                        top: -5,
                        right: -5,
                        background: 'var(--bg-dark)',
                        borderRadius: '50%',
                        color: '#10b981'
                      }}
                    >
                      <CheckCircle2 size={24} fill="currentColor" color="var(--bg-dark)" />
                    </motion.div>
                  )}
                  {step.icon}
                </div>
                <h4 style={{ marginBottom: '1rem', color: isCompleted ? 'white' : 'var(--text-secondary)' }}>
                  {step.title}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                  {step.desc}
                </p>
                <div style={{ 
                  color: step.color, 
                  fontSize: '0.8rem', 
                  fontWeight: 700, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.25rem' 
                }}>
                  {isCompleted ? 'Tekrar İncele' : 'Eğitime Başla'} <ChevronRight size={14} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeRoadmap;

