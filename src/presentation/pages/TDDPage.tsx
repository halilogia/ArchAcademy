import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { useProgress } from '../../context/ProgressContext';
import { Bug, Cpu, TestTube, CheckCircle2, Zap } from 'lucide-react';

const TDDPage = () => {
  const { completeStep } = useProgress();

  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/tdd');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ArchHero 
        title="TDD"
        subtitle="Metodolojisi"
        description="Test-Driven Development (Test Odaklı Geliştirme). Yazılımı geliştirmeden önce testini yazma disiplini. Red-Green-Refactor döngüsünün gücü."
        badge="Quality First"
        color="#10b981"
        illustration={
          <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              style={{ position: 'absolute', width: '250px', height: '250px', border: '2px dashed #10b98133', borderRadius: '50%' }}
            />
            <div className="glass-card" style={{ padding: '2rem', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)' }}>
               <TestTube size={60} color="#10b981" />
            </div>
          </div>
        }
        features={[
          { icon: <Bug />, title: "Sıfır Bug Hedefi", desc: "Hatalar daha oluşmadan testlerle engellenir." },
          { icon: <Cpu />, title: "Temiz Tasarım", desc: "Test yazmak sizi daha modüler kod yazmaya zorlar." },
          { icon: <CheckCircle2 />, title: "Güvenli Refactoring", desc: "Testleriniz varken kodda değişiklik yapmak korkutucu değildir." }
        ]}
      />

      <section className="section-padding">
        <div className="container">
          <div className="glass-card" style={{ padding: '4rem', textAlign: 'center' }}>
            <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Red - Green - Refactor</h2>
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
               <div style={{ flex: 1, minWidth: '250px', padding: '2rem', borderRadius: '24px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  <h3 style={{ color: '#ef4444' }}>🔴 RED</h3>
                  <p>Henüz yazmadığınız özelliğin testini yazın ve hata almasını (fail) izleyin.</p>
               </div>
               <div style={{ flex: 1, minWidth: '250px', padding: '2rem', borderRadius: '24px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <h3 style={{ color: '#10b981' }}>🟢 GREEN</h3>
                  <p>Testi geçecek kadar (minimum) kodu yazın.</p>
               </div>
               <div style={{ flex: 1, minWidth: '250px', padding: '2rem', borderRadius: '24px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                  <h3 style={{ color: '#3b82f6' }}>🔵 REFACTOR</h3>
                  <p>Kodu temizleyin, standartlara uydurun; testler hala yeşil mi kontrol edin.</p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default TDDPage;
