import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import MVVMFlow from '../components/MVVMFlow';
import WhyLayered from '../components/WhyLayered';
import FlutterBestPractices from '../components/FlutterBestPractices';
import { 
  Layout, 
  Share2, 
  Database, 
  Zap, 
  ShieldCheck, 
  Box, 
  Server, 
  Terminal, 
  Code2,
  CheckCircle2,
  XCircle,
  ArrowLeftRight,
  Cpu
} from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

const MVVMPage = () => {
  const { completeStep } = useProgress();

  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/mvvm');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Animated Background Ring */}
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

        {/* Nodes */}
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

          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ color: '#ec4899' }}
          >
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

          <motion.div
             animate={{ scale: [1, 1.1, 1] }}
             transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
             style={{ color: '#ec4899' }}
          >
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ArchHero 
        title="MVVM"
        subtitle="Architecture"
        description="Model-View-ViewModel. UI mantığını iş mantığından tamamen koparan, veri bağlama (Data Binding) ve reaktif programlama odaklı modern bir mimari desen."
        badge="Reactive & Decoupled"
        color="#ec4899"
        illustration={illu}
        features={[
          { icon: <Zap />, title: "Data Binding", desc: "ViewModel'deki state değiştiğinde View (UI) anında ve otomatik olarak güncellenir." },
          { icon: <CheckCircle2 />, title: "Testability", desc: "ViewModel, UI framework'ünden bağımsız olduğu için saf logic testleri kolaylaşır." },
          { icon: <Share2 />, title: "Decoupling", desc: "View ve Model birbirini asla tanımaz; aradaki köprü ViewModel'dir." }
        ]}
      />

      <MVVMFlow />
      <WhyLayered />
      <FlutterBestPractices />

      <section style={{ padding: '80px 0', background: 'var(--bg-dark)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
            {/* UI Layer Details */}
            <div className="glass-card">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: '#ec4899' }}>
                <Layout size={24} /> UI Katmanı
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', gap: '10px' }}>
                  <Code2 size={18} color="#ec4899" style={{ flexShrink: 0 }} />
                  <div>
                    <strong>View (Widgets):</strong> Sadece görseli tanımlar. İş mantığı barındırmaz. Flutter'da bunlar Stateless veya Stateful widget'lardır.
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '10px' }}>
                  <Terminal size={18} color="#ec4899" style={{ flexShrink: 0 }} />
                  <div>
                    <strong>ViewModel:</strong> Veriyi UI State'e dönüştürür. Repositories'den gelen veriyi View'un anlayacağı formata sokar.
                  </div>
                </li>
              </ul>
            </div>

            {/* Data Layer Details */}
            <div className="glass-card">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: '#3b82f6' }}>
                <Database size={24} /> Veri Katmanı
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', gap: '10px' }}>
                  <Box size={18} color="#3b82f6" style={{ flexShrink: 0 }} />
                  <div>
                    <strong>Repositories:</strong> Tekil gerçeklik kaynağıdır (Single Source of Truth). Caching, error handling ve retry mantığı burada yaşar.
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '10px' }}>
                  <Server size={18} color="#3b82f6" style={{ flexShrink: 0 }} />
                  <div>
                    <strong>Services:</strong> En alt katmandır. API endpoint'lerini veya yerel dosyaları wrap eder. Hiçbir state tutmazlar.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Trade-off Analysis */}
          <div style={{ marginTop: '6rem' }}>
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem' }}>Trade-off Analizi</h2>
            <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead style={{ background: 'rgba(236, 72, 153, 0.1)' }}>
                  <tr>
                    <th style={{ padding: '1.5rem', color: '#ec4899', fontSize: '1.1rem' }}>Avantajlar (Pros)</th>
                    <th style={{ padding: '1.5rem', color: '#f59e0b', fontSize: '1.1rem' }}>Dezavantajlar (Cons)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '1.5rem', borderRight: '1px solid var(--glass-border)', verticalAlign: 'top' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', gap: '10px' }}><CheckCircle2 size={18} color="#10b981" /> Bağımsız Test Edilebilirlik</div>
                        <div style={{ display: 'flex', gap: '10px' }}><CheckCircle2 size={18} color="#10b981" /> UI ve İş Mantığı Ayrımı</div>
                        <div style={{ display: 'flex', gap: '10px' }}><CheckCircle2 size={18} color="#10b981" /> Reaktif ve Dinamik UI Yapısı</div>
                      </div>
                    </td>
                    <td style={{ padding: '1.5rem', verticalAlign: 'top' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', gap: '10px' }}><XCircle size={18} color="#ef4444" /> Küçük Projeler İçin Overkill</div>
                        <div style={{ display: 'flex', gap: '10px' }}><XCircle size={18} color="#ef4444" /> Boilerplate (Fazla Dosya) Sayısı</div>
                        <div style={{ display: 'flex', gap: '10px' }}><XCircle size={18} color="#ef4444" /> Öğrenme Eğrisi (Reactive Paradigm)</div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default MVVMPage;
