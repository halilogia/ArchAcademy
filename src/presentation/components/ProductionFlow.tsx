import React from 'react';
import { motion } from 'framer-motion';
import { 
  ClipboardList, 
  Code2, 
  Settings, 
  TestTube2, 
  Ship, 
  MonitorDot, 
  ChevronRight,
  Target,
  GitBranch,
  ShieldCheck,
  Rocket
} from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "PLAN",
    subtitle: "Strategy & Stories",
    icon: <ClipboardList size={24} />,
    color: "#f59e0b",
    items: ["Product Backlog", "Jira / Linear", "User Stories"],
    desc: "Her şey bir fikirle başlar. Product Owner iş gereksinimlerini belirler ve yazılımcılar için 'Stories' oluşturulur."
  },
  {
    id: 2,
    title: "DEVELOP",
    subtitle: "The Vibe Coding",
    icon: <Code2 size={24} />,
    color: "#3b82f6",
    items: ["Git Branching", "AI Assisted Coding", "PR Creation"],
    desc: "Yazılımcılar kodu yazar, Cursor gibi araçlarla mimariyi inşa eder ve ekip incelemesi için PR açar."
  },
  {
    id: 3,
    title: "BUILD & CI",
    subtitle: "Automation Engine",
    icon: <Settings size={24} />,
    color: "#6366f1",
    items: ["GitHub Actions", "Unit Tests", "Docker Build"],
    desc: "Kod otomasyon hattına girer. Build alınır, testler koşulur ve Docker imajları paketlenerek depolanır."
  },
  {
    id: 4,
    title: "TEST & QA",
    subtitle: "Quality Shield",
    icon: <TestTube2 size={24} />,
    color: "#10b981",
    items: ["QA Environment", "UAT Testing", "Regression"],
    desc: "Kod sırasıyla test ortamlarına dağıtılır. Manuel ve otomatik kontrollerden geçerek onay alır."
  },
  {
    id: 5,
    title: "PRODUCTION",
    subtitle: "The Final Release",
    icon: <Ship size={24} />,
    color: "#f43f5e",
    items: ["Kubernetes", "Canary Release", "Global Launch"],
    desc: "Kod canlıya çıkar. Canary veya Blue-Green stratejileriyle risk minimize edilerek son kullanıcıya ulaşır."
  },
  {
    id: 6,
    title: "MONITOR",
    subtitle: "Observe & Alert",
    icon: <MonitorDot size={24} />,
    color: "#a855f7",
    items: ["Prometheus", "Sentry Errors", "Analytics"],
    desc: "Sistem sürekli izlenir. Alarm ve loglar ile hatalar anında tespit edilir ve döngü yeniden başlar."
  }
];

const ProductionFlow = ({ hideHeader }: { hideHeader?: boolean }) => {
  return (
    <div style={{ padding: hideHeader ? '0 0 60px 0' : '60px 0', position: 'relative' }}>
      <div className="container">
        {!hideHeader && (
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 900 }}>Path to Production</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '1rem auto' }}>
              Kodun fikir aşamasından son kullanıcıya kadar uzanan modern yolculuğu.
            </p>
          </div>
        )}

        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
          {/* Vertical Connecting Line */}
          <div style={{
            position: 'absolute',
            left: '40px',
            top: '0',
            bottom: '0',
            width: '2px',
            background: 'linear-gradient(to bottom, #f59e0b, #a855f7)',
            opacity: 0.1
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{ display: 'flex', gap: '2.5rem' }}
              >
                {/* Step Circle & Icon */}
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '20px',
                    background: 'var(--glass)',
                    border: `1px solid ${step.color}30`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: step.color,
                    boxShadow: `0 10px 30px ${step.color}15`,
                  }}>
                    {step.icon}
                  </div>
                  {index < steps.length - 1 && (
                    <div style={{
                      position: 'absolute',
                      top: '80px',
                      left: '50%',
                      width: '2px',
                      height: '3rem',
                      background: `linear-gradient(to bottom, ${step.color}40, ${steps[index+1].color}40)`
                    }} />
                  )}
                </div>

                {/* Content Card */}
                <div className="glass-card" style={{ 
                  flex: 1, 
                  padding: '1.5rem 2rem', 
                  display: 'flex', 
                  flexDirection: 'column',
                  borderLeft: `4px solid ${step.color}`,
                  textAlign: 'left'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 900, color: step.color, textTransform: 'uppercase' }}>Step 0{step.id}</span>
                      <h3 style={{ fontSize: '1.5rem', margin: '0.2rem 0' }}>{step.title}</h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{step.subtitle}</p>
                    </div>
                    <div style={{ 
                      padding: '8px', 
                      background: 'rgba(255,255,255,0.03)', 
                      borderRadius: '10px',
                      color: step.color
                    }}>
                      <ChevronRight size={18} />
                    </div>
                  </div>
                  
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                    {step.desc}
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: 'auto' }}>
                    {step.items.map((item, i) => (
                      <div key={i} style={{ 
                        fontSize: '0.75rem', 
                        background: 'rgba(255,255,255,0.05)', 
                        padding: '4px 12px', 
                        borderRadius: '100px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: step.color }} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Success Banner */}
        <div style={{ marginTop: '6rem', textAlign: 'center' }}>
          <div className="glass-card" style={{ 
            display: 'inline-flex', 
            padding: '2rem 4rem', 
            alignItems: 'center', 
            gap: '2rem',
            background: 'linear-gradient(90deg, #10b98105, #3b82f610)'
          }}>
            <Rocket size={40} color="#10b981" />
            <div style={{ textAlign: 'left' }}>
              <h4 style={{ margin: 0, fontSize: '1.2rem' }}>Continuous Delivery Excellence</h4>
              <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.6 }}>Bu süreç, sadece kodu değil, değeri de güvenle "ship" etmemizi sağlar.</p>
            </div>
            <ShieldCheck size={40} color="#3b82f6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionFlow;
