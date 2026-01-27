import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { useProgress } from '../../context/ProgressContext';
import { 
  ShieldAlert, 
  Map, 
  Database, 
  Layout, 
  Share2, 
  Cpu, 
  Route as RouterIcon,
  ShieldCheck,
  Zap
} from 'lucide-react';

const VIPERPage = () => {
  const { completeStep } = useProgress();

  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/viper');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <ArchHero 
        title="VIPER"
        subtitle="Modülerlik Zirvesi"
        description="View, Interactor, Presenter, Entity, Router. Her sorumluluğun atomik parçalara bölündüğü, yüksek test edilebilirlik odaklı mimari."
        badge="Enterprise Mobile Architecture"
        color="#10b981"
        illustration={
          <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* VIPER Pentagram/Circle Animation */}
            {[0, 72, 144, 216, 288].map((angle, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ delay: i * 0.2, duration: 1 }}
                style={{
                  position: 'absolute',
                  transform: `rotate(${angle}deg) translateY(-100px)`,
                  background: 'rgba(16, 185, 129, 0.15)',
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px solid #10b98133'
                }}
              >
                {i === 0 && <Layout size={24} color="#10b981" />}
                {i === 1 && <Cpu size={24} color="#10b981" />}
                {i === 2 && <Share2 size={24} color="#10b981" />}
                {i === 3 && <Database size={24} color="#10b981" />}
                {i === 4 && <RouterIcon size={24} color="#10b981" />}
              </motion.div>
            ))}
            <div className="glass-card" style={{ padding: '2rem', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)' }}>
               <ShieldAlert size={60} color="#10b981" />
            </div>
          </div>
        }
        features={[
          { icon: <ShieldCheck />, title: "Single Responsibility", desc: "Her parça sadece tek bir iş yapar." },
          { icon: <Zap />, title: "Testable", desc: "Bileşenler birbirinden bağımsız test edilebilir." },
          { icon: <Map />, title: "Router Logic", desc: "Navigasyon mantığı tamamen izoledir." }
        ]}
      />

      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="glass-card" style={{ padding: '2.5rem' }}>
               <h3 style={{ marginBottom: '1.2rem', color: '#10b981' }}>V - View</h3>
               <p style={{ color: 'var(--text-secondary)' }}>Kullanıcı etkileşimini alır ve ekranı çizer. Sadece Presenter'dan gelen veriyi gösterir.</p>
            </div>
            <div className="glass-card" style={{ padding: '2.5rem' }}>
               <h3 style={{ marginBottom: '1.2rem', color: '#10b981' }}>I - Interactor</h3>
               <p style={{ color: 'var(--text-secondary)' }}>İş mantığını (Business Logic) içerir. Veritabanı veya API çağrılarını burası yönetir.</p>
            </div>
            <div className="glass-card" style={{ padding: '2.5rem' }}>
               <h3 style={{ marginBottom: '1.2rem', color: '#10b981' }}>P - Presenter</h3>
               <p style={{ color: 'var(--text-secondary)' }}>Orta kademe yönetici. View'den gelen emirleri Interactor'a iletir, Interactor'dan gelen veriyi View'e hazırlar.</p>
            </div>
            <div className="glass-card" style={{ padding: '2.5rem' }}>
               <h3 style={{ marginBottom: '1.2rem', color: '#10b981' }}>E - Entity</h3>
               <p style={{ color: 'var(--text-secondary)' }}>Sadece veri modelleridir. İş yapmazlar, sadece veriyi taşırlar.</p>
            </div>
            <div className="glass-card" style={{ padding: '2.5rem' }}>
               <h3 style={{ marginBottom: '1.2rem', color: '#10b981' }}>R - Router</h3>
               <p style={{ color: 'var(--text-secondary)' }}>Ekranlar arası geçiş mantığını yöneten "Trafik Polisi".</p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default VIPERPage;
