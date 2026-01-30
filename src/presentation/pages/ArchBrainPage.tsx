import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Network, Share2, Activity, Database, Layout, Shield, Cpu, Zap } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const ArchBrainPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: '#020617', minHeight: '100vh', overflow: 'hidden' }}>
      <ArchHero 
        title="ArchBrain v3.0" 
        subtitle="Living Neural Map"
        description="Projenin gerçek zamanlı 3D tomografisi. Her bir dosya bir nöron, her bir import bir sinaps."
        badge="Real-time Analysis"
        color="#8b5cf6"
        illustration={
             <div style={{ position: 'relative', width: '100%', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1000px' }}>
                <div style={{ position: 'absolute', inset: 0, borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(139, 92, 246, 0.3)', boxShadow: '0 0 50px rgba(139, 92, 246, 0.1)' }}>
                    <iframe 
                        src="/arch-brain-report.html" 
                        style={{ width: '100%', height: '100%', border: 'none' }}
                        title="ArchBrain 3D Graph"
                    />
                </div>
                {/* Fallback/Overlay Decorations - Hizalamayı düzelttim */}
                <div style={{ position: 'absolute', bottom: '10px', right: '20px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', pointerEvents: 'none', zIndex: 10 }}>
                    Neural Nodes Active
                </div>
             </div>
        }
        features={[
          { icon: <Brain />, title: 'Full Codebase Scan', desc: '160+ dosya ve 150+ bağlantı analiz edildi ve haritalandı.' },
          { icon: <Share2 />, title: 'Force-Directed Graph', desc: 'Fizik tabanlı simülasyon ile modüllerin doğal gruplaşmasını izleyin.' },
          { icon: <Activity />, title: 'Interactivity', desc: 'Nöronlara tıklayarak odaklanın, zoom yapın ve kodun derinliklerine inin.' }
        ]}
      />
    </motion.div>
  );
};

export default ArchBrainPage;
