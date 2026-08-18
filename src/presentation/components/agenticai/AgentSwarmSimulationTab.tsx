import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, CheckCircle2, Bot, Terminal, Shield, Zap, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const AgentSwarmSimulationTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const [activeStep, setActiveStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const swarmSteps = [
    { role: 'Supervisor (Planner)', agent: '🤖 Orchestrator Agent', action: 'Görevi analiz etti ve 3 alt göreve parçaladı.', status: 'COMPLETED' },
    { role: 'Code Generator', agent: '👨‍💻 Coder Agent', action: 'TypeScript API endpoint\'ini ve veri modellerini yazdı.', status: 'COMPLETED' },
    { role: 'Security Auditor', agent: '🛡️ Security Agent', action: 'Kodu AST ve SAST ile taradı: 0 CVE tespit edildi.', status: 'COMPLETED' },
    { role: 'Test Engineer', agent: '🧪 QA Agent', action: 'Birim testleri çalıştırdı: 12/12 Passed (%100 Coverage).', status: 'COMPLETED' }
  ];

  const startSwarm = () => {
    setIsRunning(true);
    setActiveStep(1);
    const interval = setInterval(() => {
      setActiveStep(prev => {
        if (prev >= swarmSteps.length) {
          clearInterval(interval);
          setIsRunning(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const resetSwarm = () => {
    setActiveStep(0);
    setIsRunning(false);
  };

  return (
    <motion.div key="simulation" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="glass-card" style={{ padding: '2.5rem' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          {isEn ? "Live Multi-Agent Swarm Execution Simulator" : "Canlı Çoklu Ajan Sürü (Multi-Agent Swarm) Dağıtım Simülasyonu"}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
          {isEn 
            ? "Watch specialized autonomous agents collaborate in real time to plan, generate, audit, and test software code." 
            : "Farklı uzmanlıklardaki otonom ajanların bir yazılım görevini planlama, kodlama, güvenlik denetimi ve test adımlarıyla nasıl çözdüğünü izleyin."
          }
        </p>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button
            onClick={startSwarm}
            disabled={isRunning || activeStep > 0}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              border: 'none',
              background: '#ec4899',
              color: 'white',
              fontWeight: 800,
              cursor: isRunning || activeStep > 0 ? 'default' : 'pointer',
              opacity: isRunning || activeStep > 0 ? 0.6 : 1
            }}
          >
            ▶ {isEn ? 'Dispatch Autonomous Swarm' : 'Ajan Sürüsünü Başlat'}
          </button>
          <button
            onClick={resetSwarm}
            style={{
              padding: '12px 20px',
              borderRadius: '12px',
              border: '1px solid #334155',
              background: '#0f172a',
              color: '#cbd5e1',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <RotateCcw size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} /> {isEn ? 'Reset' : 'Sıfırla'}
          </button>
        </div>

        {/* Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {swarmSteps.map((step, i) => {
            const isFinished = activeStep > i;
            const isCurrent = activeStep === i + 1;

            return (
              <div
                key={i}
                style={{
                  background: '#020617',
                  padding: '1.25rem',
                  borderRadius: '14px',
                  border: `1px solid ${isFinished ? '#10b98166' : isCurrent ? '#ec4899' : '#1e293b'}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  opacity: activeStep > 0 && !isFinished && !isCurrent ? 0.4 : 1
                }}
              >
                <div>
                  <div style={{ fontSize: '0.8rem', color: isFinished ? '#34d399' : '#ec4899', fontWeight: 800 }}>
                    {step.role}
                  </div>
                  <div style={{ color: 'white', fontWeight: 700, fontSize: '1rem', marginTop: '2px' }}>
                    {step.agent}
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '4px' }}>
                    {step.action}
                  </div>
                </div>

                <div>
                  {isFinished && <CheckCircle2 size={24} color="#34d399" />}
                  {isCurrent && <Sparkles size={24} color="#ec4899" className="animate-spin" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default AgentSwarmSimulationTab;
