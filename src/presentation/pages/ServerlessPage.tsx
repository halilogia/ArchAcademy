import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Cloud, DollarSign, Activity, Clock, Server, ThermometerSnowflake, Gauge } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const ServerlessPage = () => {
    const [activeTab, setActiveTab] = useState<'simulation' | 'comparison'>('comparison');
    const [requests, setRequests] = useState<number[]>([]);
    const [instances, setInstances] = useState<number>(0);
    const [coldStarts, setColdStarts] = useState<number>(0);
    const [cost, setCost] = useState<number>(0);

    const triggerRequest = () => {
        const id = Date.now();
        setRequests(prev => [...prev.slice(-19), id]);
        
        // Simulation logic
        // If instances < needed, spin up new one (Cold Start)
        // Simple logic: 1 instance can handle 1 request "at a time" in this viz
        // Instances degrade after lack of use (not simulated here for simplicity, just accumulation)
        
        // Randomly simulate cold start if we rapidly spike or just to show effect
        const isColdStart = Math.random() > 0.7 || instances === 0;
        if (isColdStart) {
            setColdStarts(prev => prev + 1);
            setInstances(prev => prev + 1);
        }
        
        setCost(prev => prev + 0.0002); // Mock cost per request
    };

    const illu = (
    <div style={{ position: 'relative', width: '380px', height: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Cloud Provider */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ zIndex: 5 }}
      >
        <Cloud size={180} color="#a855f7" strokeWidth={1} fill="rgba(168, 85, 247, 0.1)" />
      </motion.div>

      {/* Function Instances */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
         {[0, 1, 2, 3].map((i) => (
             <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.2, 0.5],
                    x: [0, (i % 2 === 0 ? 60 : -60) * (Math.ceil((i+1)/2))],
                    y: [0, (i < 2 ? -60 : 60)]
                }}
                transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: i * 0.8,
                    ease: "easeInOut"
                }}
                style={{ 
                    position: 'absolute', 
                    background: '#a855f7', 
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '8px',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    boxShadow: '0 0 20px #a855f7'
                }}
             >
                 <span style={{ fontSize: '10px', fontWeight: 900, color: 'white' }}>FN</span>
             </motion.div>
         ))}
      </div>
      
      {/* Zap Icons */}
      <div style={{ position: 'absolute', bottom: 20 }}>
         <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 0.5 }}>
            <Zap size={32} color="#facc15" fill="#facc15" />
         </motion.div>
      </div>

    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="Serverless"
        subtitle="Functions as a Service"
        description="Sunucu yönetimi yok. Kodunuzu yükleyin, sadece çalıştığı süre (milisaniye) kadar ödeyin. Trafik 0 ise fatura $0."
        badge="Event-Driven"
        color="#a855f7"
        illustration={illu}
        features={[
          { icon: <DollarSign />, title: 'Pay-per-use', desc: 'Sadece kodunuz çalıştığı milisaniyeler için ödeme yapın.' },
          { icon: <Activity />, title: 'Auto Scaling', desc: 'İstek sayısı sıfırdan milyonlara çıksa da bulut bunu otomatik yönetir.' },
          { icon: <Clock />, title: 'Zero Ops', desc: 'İşletim sistemi, güvenlik yamaları veya sunucu bakımıyla uğraşmayın.' }
        ]}
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
            { id: 'comparison', label: 'Serverless vs Traditional', icon: <Server size={18} /> },
            { id: 'simulation', label: 'Scaling Simulator', icon: <Gauge size={18} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 24px',
                borderRadius: '18px',
                border: 'none',
                background: activeTab === tab.id ? '#a855f7' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(168, 85, 247, 0.3)' : 'none'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </ArchHero>

      <div className="container" style={{ marginTop: '2rem' }}>
        <AnimatePresence mode="wait">
             {activeTab === 'comparison' && (
                <motion.div
                    key="comparison"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                        <div className="glass-card">
                             <h3 style={{ fontSize: '1.4rem', color: '#94a3b8', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                 <Server /> Traditional (EC2/VPS)
                             </h3>
                             <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                7/24 çalışan bir sunucu kiralarsınız. Kullanmasanız da kirasını ödersiniz.
                             </p>
                             <ul style={{ paddingLeft: '1.5rem', color: '#94a3b8', lineHeight: 1.8 }}>
                                <li>💸 <strong>Boşa Harcama:</strong> Gece 3'te kimse girmese de sunucu parası ödersiniz.</li>
                                <li>🔧 <strong>Bakım Yükü:</strong> OS güncellemeleri, güvenlik yamaları size aittir.</li>
                                <li>🐌 <strong>Yavaş Ölçeklenme:</strong> Trafik artınca yeni sunucu açmak dakikalar sürer.</li>
                             </ul>
                        </div>
                        
                        <div className="glass-card" style={{ borderTop: '4px solid #a855f7' }}>
                             <h3 style={{ fontSize: '1.4rem', color: '#a855f7', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                 <Zap /> Serverless (Lambda)
                             </h3>
                             <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                Sunucu yoktur. Sadece fonksiyonlar vardır. İstek gelince uyanır, işini yapar ve ölür.
                             </p>
                             <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                <li style={{ color: '#10b981' }}>✅ <strong>Tasarruf:</strong> Kimse girmezse fatura $0.</li>
                                <li style={{ color: '#10b981' }}>✅ <strong>Sıfır Bakım:</strong> Altyapı yönetimi tamamen AWS/Google'dadır.</li>
                                <li style={{ color: '#f59e0b' }}>⚠️ <strong>Cold Start:</strong> Fonksiyon uzun süre çalışmazsa, ilk istekte uyanması 1-2 saniye sürebilir.</li>
                             </ul>
                        </div>
                    </div>
                </motion.div>
             )}

             {activeTab === 'simulation' && (
                 <motion.div
                    key="simulation"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                         <button 
                            onClick={triggerRequest}
                            className="btn-bounce"
                            style={{ 
                                padding: '15px 40px', 
                                fontSize: '1.2rem', 
                                fontWeight: 800, 
                                borderRadius: '12px', 
                                border: 'none', 
                                background: '#a855f7', 
                                color: 'white',
                                cursor: 'pointer',
                                boxShadow: '0 10px 30px rgba(168, 85, 247, 0.4)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                        >
                            <Zap size={24} fill="white" /> İstek Gönder (HTTP Request)
                        </button>
                        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
                            Hızlıca tıklayarak ani trafik artışını (Spike) simüle edin.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                         {/* Metrics Panel */}
                         <div className="glass-card">
                             <h3 style={{ marginBottom: '1.5rem' }}>Canlı Metrikler</h3>
                             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                 <div style={{ background: 'rgba(168, 85, 247, 0.1)', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
                                     <div style={{ fontSize: '2rem', fontWeight: 900, color: '#a855f7' }}>{instances}</div>
                                     <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Active Instances</div>
                                 </div>
                                 <div style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
                                     <div style={{ fontSize: '2rem', fontWeight: 900, color: '#ef4444' }}>{coldStarts}</div>
                                     <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Cold Starts</div>
                                 </div>
                                 <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '12px', textAlign: 'center', gridColumn: 'span 2' }}>
                                     <div style={{ fontSize: '2rem', fontWeight: 900, color: '#10b981' }}>${cost.toFixed(4)}</div>
                                     <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Total Cost (Estimated)</div>
                                 </div>
                             </div>
                         </div>

                         {/* Explanation Panel */}
                         <div className="glass-card" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                            <h3 style={{ marginBottom: '1rem', color: '#a855f7' }}>Sistem Tepkisi</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                                Eğer butona <strong>aralıklı olarak</strong> (yavaşça) basarsanız, sistem muhtemelen aynı instance'ı (konteynerı) tekrar kullanır ("Warm Start").
                            </p>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
                                Eğer butona <strong>çok hızlı</strong> basarsanız, mevcut instance yetişemez ve bulut sağlayıcısı anında yeni instancelar başlatır. İlk açılışta gecikme olabilir ("Cold Start").
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(59, 130, 246, 0.1)', padding: '10px', borderRadius: '8px' }}>
                                <ThermometerSnowflake size={20} color="#3b82f6" />
                                <span style={{ fontSize: '0.8rem', color: '#93c5fd' }}>Cold Start: Fonksiyonun ilk kez RAM'e yüklenme süresi.</span>
                            </div>
                         </div>
                    </div>
                 </motion.div>
             )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ServerlessPage;
