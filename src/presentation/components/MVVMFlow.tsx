import React from 'react';
import { motion } from 'framer-motion';
import { 
  Layout, 
  Share2, 
  Database, 
  Zap, 
  Settings, 
  Repeat, 
  ArrowLeftRight,
  MousePointer2,
  Cpu
} from 'lucide-react';

const FlowBox = ({ title, color, children, subTitle, type }: any) => (
  <motion.div 
    whileHover={{ y: -5, scale: 1.02 }}
    style={{
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(12px)',
      border: `1px solid ${color}30`,
      borderRadius: '24px',
      padding: '1.5rem',
      width: '200px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.8rem',
      textAlign: 'center',
      boxShadow: `0 10px 30px ${color}10`,
      position: 'relative'
    }}
  >
    <div style={{ 
      fontSize: '0.7rem', 
      fontWeight: 900, 
      color: color, 
      letterSpacing: '2px',
      textTransform: 'uppercase',
      background: `${color}15`,
      padding: '4px 10px',
      borderRadius: '8px'
    }}>{type}</div>
    <div style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>{title}</div>
    {children}
    {subTitle && <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{subTitle}</div>}
  </motion.div>
);

const Connection = ({ label, color, direction = 'horizontal' }: any) => (
  <div style={{ 
    display: 'flex', 
    flexDirection: direction === 'horizontal' ? 'column' : 'row',
    alignItems: 'center', 
    justifyContent: 'center',
    gap: '10px',
    padding: direction === 'horizontal' ? '0 20px' : '20px 0'
  }}>
    <div style={{ 
      fontSize: '0.65rem', 
      color: color, 
      fontWeight: 900, 
      textTransform: 'uppercase',
      letterSpacing: '1px',
      whiteSpace: 'nowrap'
    }}>{label}</div>
    <div style={{ 
      width: direction === 'horizontal' ? '60px' : '2px', 
      height: direction === 'horizontal' ? '2px' : '60px', 
      background: `linear-gradient(${direction === 'horizontal' ? 'to right' : 'to bottom'}, transparent, ${color}, transparent)`,
      position: 'relative'
    }}>
      <motion.div
        animate={direction === 'horizontal' ? { left: ['0%', '100%'] } : { top: ['0%', '100%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute',
          width: '6px',
          height: '6px',
          background: color,
          borderRadius: '50%',
          boxShadow: `0 0 10px ${color}`,
          left: direction === 'horizontal' ? 0 : -2,
          top: direction === 'horizontal' ? -2 : 0
        }}
      />
    </div>
  </div>
);

const MVVMFlow = () => {
  return (
    <section style={{ padding: '100px 0', background: 'var(--bg-dark)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '1.5rem' }}>
            MVVM Mimari Akışı
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
            Flutter App Architecture rehberine göre modernize edilmiş katmanlı yapı.
          </p>
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          flexDirection: 'column',
          gap: '20px'
        }}>
          {/* UI LAYER */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            background: 'rgba(236, 72, 153, 0.05)', 
            padding: '40px', 
            borderRadius: '40px',
            border: '1px solid rgba(236, 72, 153, 0.1)'
          }}>
            <FlowBox title="View" color="#ec4899" type="UI Layer" subTitle="Widgets & Screens">
              <Layout size={40} color="#ec4899" />
            </FlowBox>
            
            <Connection label="Events / State" color="#ec4899" />
            
            <FlowBox title="ViewModel" color="#ec4899" type="UI Layer" subTitle="UI Logic & State">
              <Cpu size={40} color="#ec4899" />
            </FlowBox>
          </div>

          <Connection label="Transforms" color="#f59e0b" direction="vertical" />

          {/* DOMAIN LAYER (Optional) */}
          <div style={{ 
             display: 'flex', 
             alignItems: 'center', 
             background: 'rgba(245, 158, 11, 0.05)', 
             padding: '30px', 
             borderRadius: '40px',
             border: '1px solid rgba(245, 158, 11, 0.1)',
             opacity: 0.8
          }}>
            <FlowBox title="Use Case" color="#f59e0b" type="Domain Layer" subTitle="Complex Business Logic">
              <Zap size={36} color="#f59e0b" />
            </FlowBox>
          </div>

          <Connection label="Repository Patterns" color="#3b82f6" direction="vertical" />

          {/* DATA LAYER */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            background: 'rgba(59, 130, 246, 0.05)', 
            padding: '40px', 
            borderRadius: '40px',
            border: '1px solid rgba(59, 130, 246, 0.1)'
          }}>
            <FlowBox title="Repository" color="#3b82f6" type="Data Layer" subTitle="Single Source of Truth">
              <Database size={40} color="#3b82f6" />
            </FlowBox>
            
            <Connection label="API / Local" color="#3b82f6" />
            
            <FlowBox title="Service" color="#3b82f6" type="Data Layer" subTitle="External API Wrappers">
              <Settings size={40} color="#3b82f6" />
            </FlowBox>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MVVMFlow;
