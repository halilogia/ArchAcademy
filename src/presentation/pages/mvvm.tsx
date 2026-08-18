import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Layout,
  Database,
  Zap,
  Share2,
  CheckCircle2,
  ArrowLeftRight,
  Cpu,
  Layers,
  Compass,
  Smartphone
} from 'lucide-react';
import ArchHero from '../components/ArchHero';
import { useProgress } from '../context/ProgressContext';
import { MVVMPrinciplesTab } from '../components/mvvm/MVVMPrinciplesTab';
import { MVVMHybridTab } from '../components/mvvm/MVVMHybridTab';
import { MVVMNiaTab } from '../components/mvvm/MVVMNiaTab';

const MVVMPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const { completeStep } = useProgress();
  const [activeTab, setActiveTab] = useState<'principles' | 'hybrid' | 'nia'>('principles');

  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/mvvm');
    }, 2000);
    return () => clearTimeout(timer);
  }, [completeStep]);

  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        style={{
          position: 'absolute',
          width: '280px',
          height: '280px',
          border: '2px dashed rgba(236, 72, 153, 0.2)',
          borderRadius: '50%'
        }}
      />
      <div style={{ position: 'relative', display: 'flex', gap: '20px', alignItems: 'center' }}>
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="glass-card"
          style={{ padding: '1.5rem', textAlign: 'center', borderTop: '4px solid #ec4899' }}
        >
          <Layout size={32} color="#ec4899" />
          <div style={{ fontSize: '0.7rem', fontWeight: 900, marginTop: '8px', color: '#ec4899' }}>VIEW</div>
        </motion.div>
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={{ color: '#ec4899' }}>
          <ArrowLeftRight size={24} />
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-card"
          style={{ padding: '1.5rem', textAlign: 'center', background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)', border: 'none' }}
        >
          <Cpu size={32} color="white" />
          <div style={{ fontSize: '0.7rem', fontWeight: 900, marginTop: '8px', color: 'white' }}>VIEW-MODEL</div>
        </motion.div>
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} style={{ color: '#ec4899' }}>
          <ArrowLeftRight size={24} />
        </motion.div>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="glass-card"
          style={{ padding: '1.5rem', textAlign: 'center', borderTop: '4px solid #3b82f6' }}
        >
          <Database size={32} color="#3b82f6" />
          <div style={{ fontSize: '0.7rem', fontWeight: 900, marginTop: '8px', color: '#3b82f6' }}>MODEL</div>
        </motion.div>
      </div>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ArchHero
        title="MVVM"
        subtitle="Architecture"
        description={isEn 
          ? "Model-View-ViewModel. A reactive presentation architecture that completely decouples UI from business logic via two-way data binding."
          : "Model-View-ViewModel. UI mantığını iş mantığından tamamen koparan, veri bağlama (Data Binding) ve reaktif programlama odaklı modern bir mimari desen."
        }
        badge="Reactive & Decoupled"
        color="#ec4899"
        illustration={illu}
        features={activeTab === 'principles' ? [
          { 
            icon: <Zap />, 
            title: isEn ? "Data Binding" : "Veri Bağlama", 
            desc: isEn ? "When state changes in ViewModel, the View automatically re-renders." : "ViewModel'deki state değiştiğinde View (UI) anında ve otomatik olarak güncellenir." 
          },
          { 
            icon: <CheckCircle2 />, 
            title: isEn ? "Testability" : "Test Edilebilirlik", 
            desc: isEn ? "Decoupled from UI frameworks, enabling fast unit testing of pure presentation logic." : "ViewModel, UI framework'ünden bağımsız olduğu için saf logic testleri kolaylaşır." 
          },
          { 
            icon: <Share2 />, 
            title: isEn ? "Decoupling" : "Gevşek Bağlılık", 
            desc: isEn ? "View and Model are fully isolated; ViewModel acts as the mediation bridge." : "View ve Model birbirini asla tanımaz; aradaki köprü ViewModel'dir." 
          }
        ] : []}
      >
        <div style={{
          marginTop: '2rem',
          padding: '6px',
          background: 'rgba(15, 23, 42, 0.4)',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.05)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          backdropFilter: 'blur(10px)'
        }}>
          {[
            { id: 'principles', label: isEn ? 'Principles' : 'Prensipler', icon: <Layers size={18} /> },
            { id: 'hybrid', label: isEn ? 'Hybrid Approach' : 'Hibrit Yaklaşım', icon: <Compass size={18} /> },
            { id: 'nia', label: 'Now in Android', icon: <Smartphone size={18} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'principles' | 'hybrid' | 'nia')}
              style={{
                padding: '10px 24px',
                borderRadius: '18px',
                border: 'none',
                background: activeTab === tab.id ? '#ec4899' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(236, 72, 153, 0.3)' : 'none'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </ArchHero>

      <AnimatePresence mode="wait">
        {activeTab === 'principles' && <MVVMPrinciplesTab key="principles" />}
        {activeTab === 'hybrid' && <MVVMHybridTab key="hybrid" />}
        {activeTab === 'nia' && <MVVMNiaTab key="nia" />}
      </AnimatePresence>
    </motion.div>
  );
};

export default MVVMPage;
