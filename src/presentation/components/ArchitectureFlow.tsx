import React from 'react';
import { motion } from 'framer-motion';
import { MousePointer2, Cpu, Database, Server, Zap, ShieldCheck, Link, Settings } from 'lucide-react';

const FlowBox = ({ title, color, children, subTitle, isInterface = false }: any) => (
  <div style={{
    background: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(10px)',
    border: isInterface ? `2px dashed ${color}60` : `1px solid ${color}20`,
    borderRadius: '20px',
    padding: '1.2rem',
    width: '180px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.6rem',
    textAlign: 'center',
    boxShadow: `0 10px 30px ${color}05`,
    position: 'relative'
  }}>
    <div style={{ 
      fontSize: '0.75rem', 
      fontWeight: 900, 
      color: color, 
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
      opacity: 0.9
    }}>{title}</div>
    {children}
    {subTitle && <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', opacity: 0.6, lineHeight: 1.3 }}>{subTitle}</div>}
    {isInterface && (
      <div style={{
        position: 'absolute',
        top: '-10px',
        right: '10px',
        background: color,
        color: '#000',
        fontSize: '0.55rem',
        fontWeight: 900,
        padding: '2px 6px',
        borderRadius: '4px',
        textTransform: 'uppercase'
      }}>Protocol / Interface</div>
    )}
  </div>
);

const AnimatedLine = ({ direction = 'right', color = '#fff', label, bidirectional = true, duration = 3, offset = 0 }: any) => (
  <div style={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center',
    position: 'relative',
    height: direction === 'right' ? 'auto' : '65px',
    width: direction === 'right' ? '120px' : 'auto',
  }}>
    <div style={{ 
      fontSize: '0.6rem', 
      color: color, 
      fontWeight: 800, 
      textTransform: 'uppercase',
      letterSpacing: '1.5px',
      marginBottom: direction === 'right' ? '6px' : 0,
      position: direction === 'right' ? 'relative' : 'absolute',
      top: direction === 'right' ? 0 : '50%',
      left: direction === 'right' ? 0 : '18px',
      transform: direction === 'right' ? 'none' : 'translateY(-50%)',
      whiteSpace: 'nowrap',
      textShadow: `0 0 10px ${color}60`,
      zIndex: 2
    }}>
      {label}
    </div>
    
    <div style={{ 
      width: direction === 'right' ? '100%' : '1px', 
      height: direction === 'right' ? '1px' : '100%', 
      background: `linear-gradient(${direction === 'right' ? 'to right' : 'to bottom'}, transparent, ${color}30, transparent)`,
      position: 'relative'
    }}>
      <motion.div
        animate={direction === 'right' ? { left: ['0%', '100%'] } : { top: ['0%', '100%'] }}
        transition={{ duration: duration, repeat: Infinity, ease: "linear", delay: offset }}
        style={{
          position: 'absolute',
          width: direction === 'right' ? '10px' : '4px',
          height: direction === 'right' ? '4px' : '10px',
          borderRadius: '10px',
          background: color,
          boxShadow: `0 0 15px ${color}`,
          left: direction === 'right' ? 0 : -1.5,
          top: direction === 'right' ? -1.5 : 0
        }}
      />
      {bidirectional && (
        <motion.div
          animate={direction === 'right' ? { left: ['100%', '0%'] } : { top: ['100%', '0%'] }}
          transition={{ duration: duration, repeat: Infinity, ease: "linear", delay: offset + (duration / 2) }}
          style={{
            position: 'absolute',
            width: direction === 'right' ? '10px' : '4px',
            height: direction === 'right' ? '4px' : '10px',
            borderRadius: '10px',
            background: '#fff',
            boxShadow: '0 0 15px #fff',
            left: direction === 'right' ? 0 : -1.5,
            top: direction === 'right' ? -1.5 : 0,
            opacity: 0.6
          }}
        />
      )}
    </div>
  </div>
);

const ArchitectureFlow = () => {
  return (
    <section id="live-flow" style={{ padding: '120px 0', borderTop: '1px solid rgba(255,255,255,0.03)', background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.02) 0%, transparent 70%)' }}>
      <div className="container" style={{ maxWidth: '1400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 className="section-title">Kusursuz Veri Döngüsü</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '850px', margin: '0 auto', fontSize: '1rem', lineHeight: 1.6 }}>
            Repository katmanının <strong>Arayüz (Interface)</strong> ve <strong>Uygulama (Implementation)</strong> olarak 
            nasıl ayrıldığını ve bağımlılığın nasıl merkeze döndüğünü canlı olarak inceleyin.
          </p>
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '1.5rem',
          flexWrap: 'nowrap'
        }}>
          
          {/* 1. PRESENTATION BLOCK */}
          <div style={{ 
            padding: '2.5rem', 
            borderRadius: '30px', 
            background: 'rgba(139, 92, 246, 0.02)',
            border: '1px solid rgba(139, 92, 246, 0.05)',
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '1.2rem' 
          }}>
             <div style={{ color: '#8b5cf6', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '3px', opacity: 0.5 }}>PRESENTATION</div>
             <FlowBox title="User Interface" color="#8b5cf6" subTitle="Bileşenler & Sayfalar">
                <MousePointer2 size={32} color="#8b5cf6" />
             </FlowBox>
             <AnimatedLine direction="down" color="#8b5cf6" label="Input" duration={3.2} offset={0.5} />
             <FlowBox title="Presenter" color="#8b5cf6" subTitle="UI State & Mapping">
                <Cpu size={32} color="#8b5cf6" />
             </FlowBox>
          </div>

          <AnimatedLine direction="right" color="#8b5cf6" label="Request" duration={2.8} offset={0} />

          {/* 2. CORE (DOMAIN + APPLICATION) BLOCK */}
          <div style={{ 
            padding: '2.5rem', 
            borderRadius: '40px', 
            background: 'rgba(16, 185, 129, 0.03)',
            border: '2px solid rgba(16, 185, 129, 0.1)',
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '1.2rem',
            boxShadow: '0 0 50px rgba(16, 185, 129, 0.05)'
          }}>
             <div style={{ color: '#10b981', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '3px', opacity: 0.8, background: 'rgba(16, 185, 129, 0.1)', padding: '4px 12px', borderRadius: '10px' }}>CORE (Domain / Application)</div>
             <FlowBox title="Use Cases" color="#10b981" subTitle="İş Akışlarını Yönetir">
                <Zap size={32} color="#10b981" fill="#10b981" />
             </FlowBox>
             <AnimatedLine direction="down" color="#10b981" label="Invoke" duration={2.2} offset={1.2} />
             <FlowBox title="Repository Port" color="#fbbf24" subTitle="Tanım / Arayüz (Interface)" isInterface={true}>
                <Link size={32} color="#fbbf24" />
             </FlowBox>
             <AnimatedLine direction="down" color="#fbbf24" label="Map To" duration={2.5} offset={1.5} />
             <FlowBox title="Entities" color="#10b981" subTitle="Saf İş Kuralları">
                <ShieldCheck size={32} color="#10b981" />
             </FlowBox>
          </div>

          <AnimatedLine direction="right" color="#fbbf24" label="Implementation" duration={3.5} offset={0.8} />

          {/* 3. INFRASTRUCTURE BLOCK */}
          <div style={{ 
            padding: '2.5rem', 
            borderRadius: '30px', 
            background: 'rgba(59, 130, 246, 0.02)',
            border: '1px solid rgba(59, 130, 246, 0.05)',
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            gap: '1.2rem' 
          }}>
             <div style={{ color: '#3b82f6', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '3px', opacity: 0.5 }}>INFRASTRUCTURE</div>
             <FlowBox title="Repository Impl" color="#3b82f6" subTitle="Veritabanı Mantığı (Class)">
                <Settings size={32} color="#3b82f6" />
             </FlowBox>
             <AnimatedLine direction="down" color="#3b82f6" label="Query" duration={2.6} offset={2.0} />
             <FlowBox title="Data Source" color="#3b82f6" subTitle="SQL / API / NoSQL">
                <Database size={32} color="#3b82f6" />
             </FlowBox>
          </div>

        </div>

        {/* Legend / Tip */}
        <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'center' }}>
           <div style={{ 
              padding: '2.5rem', 
              maxWidth: '900px', 
              textAlign: 'center',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              background: 'rgba(255,255,255,0.01)',
              borderRadius: '32px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '1.5rem' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>
                    <motion.div 
                      animate={{ filter: ['hue-rotate(0deg)', 'hue-rotate(360deg)'] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      style={{ width: '40px', height: '6px', borderRadius: '10px', background: 'linear-gradient(to right, #8b5cf6, #10b981)', boxShadow: '0 0 10px rgba(139, 92, 246, 0.3)' }} 
                    /> 
                    İstek (Request)
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', color: '#fff', fontWeight: 600 }}>
                    <div style={{ width: '40px', height: '6px', background: '#fff', borderRadius: '10px', boxShadow: '0 0 10px rgba(255, 255, 255, 0.4)' }} /> 
                    Yanıt (Response)
                 </div>
              </div>
              <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                Mimarinin kalbi Domain'dir. Işıklar, katmanlar arasındaki çift yönlü veri alışverişini ve sistemin canlı döngüsünü temsil eder. 🏛️✨
              </p>
           </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureFlow;
