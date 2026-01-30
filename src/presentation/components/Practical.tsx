import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileCode, Play, Terminal, ArrowRight } from 'lucide-react';
import { SimulationUseCase } from '../../domain/usecases/SimulationUseCase';

const Practical = () => {
  const codeExamples = {
    entities: {
      file: 'domain/entities/User.js',
      code: `class User {
  constructor(id, name, birthDate) {
    this.id = id;
    this.name = name;
    this.birthDate = birthDate;
    
    // İş Kuralı: 18 Yaş Sınırı
    if (this.calculateAge() < 18) {
      throw new Error('Kullanıcı reşit olmalıdır!');
    }
  }
  
  calculateAge() {
    // Yaş hesaplama mantığı burada...
    return 20; // Örnek değer
  }
}`,
      desc: 'Anayasa: En saf iş kuralı (18 yaş sınırı). Hiçbir kütüphaneye veya veritabanına dokunmaz.'
    },
    usecases: {
      file: 'application/use_cases/RegisterUser.js',
      code: `// Interface (Arayüz) tanımı burada sayılır
class RegisterUser {
  constructor(userRepository) {
    this.userRepository = userRepository; // IUserRepository tipinde
  }

  async execute(userData) {
    // 1. Yeni entity oluştur (kurallar burada tetiklenir)
    const user = new User(null, userData.name, userData.birthDate);
    
    // 2. Arayüz üzerinden kaydet (Hangi DB olduğu umurunda değil!)
    return await this.userRepository.save(user);
  }
}`,
      desc: 'Orkestra Şefi: İş akışını yönetir. Sadece Repository arayüzünü (Port) bilir.'
    },
    adapters: {
      file: 'interfaces/presenters/UserPresenter.js',
      code: `class UserPresenter {
  // Ham veriyi UI'ın (React) seveceği hale getirir
  formatForDisplay(user) {
    return {
      fullName: user.name.toUpperCase(),
      memberSince: new Date().getFullYear()
    };
  }
}`,
      desc: 'Tercüman: Sistemden çıkan veriyi UI/Ekran için formatlar.'
    },
    infrastructure: {
      file: 'infrastructure/db/SqlUserRepository.js',
      code: `// Repository Interface'ini implemente eder (gerçekleştirir)
class SqlUserRepository {
  async save(user) {
    // Gerçek teknoloji detayları burada:
    const sql = "INSERT INTO users ...";
    return await db.query(sql, [user.name]);
  }
}`,
      desc: 'Detay: Veritabanı, API veya dosya sistemi gibi dış dünya araçları.'
    }
  };

  type LayerKey = keyof typeof codeExamples;
  const [activeLayer, setActiveLayer] = useState<LayerKey>('entities');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(-1);

  const simulationSteps: { layer: LayerKey; text: string }[] = [
    { layer: 'adapters', text: 'HTTP İsteği Geldi (POST /register)' },
    { layer: 'usecases', text: 'RegisterUser Use Case Tetiklendi' },
    { layer: 'entities', text: 'User Nesnesi Oluşturuldu ve Doğrulandı' },
    { layer: 'infrastructure', text: 'Veritabanına Kayıt Edildi' },
    { layer: 'adapters', text: 'İşlem Başarılı Yanıtı Döndü' }
  ];

  const runSimulation = () => {
    setIsSimulating(true);
    const useCase = new SimulationUseCase(({ stepIndex, activeLayer: newLayer, isFinished }) => {
      if (isFinished) {
        setIsSimulating(false);
        setSimStep(-1);
      } else {
        setSimStep(stepIndex);
        setActiveLayer(newLayer as LayerKey);
      }
    });
    useCase.start();
  };

  return (
    <section id="practical" style={{ padding: '100px 0', background: 'rgba(2,6,23,0.5)' }}>
      <div className="container">
        <h2 className="section-title">Uygulamalı Örnek: Kullanıcı Kaydı</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.5fr',
          gap: '3rem',
          minHeight: '600px'
        }}>
          {/* Simulation & Controls */}
          <div>
            <div className="glass-card" style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Terminal size={20} color="var(--primary)" /> Simulasyon
                </h3>
                <button 
                  onClick={runSimulation}
                  disabled={isSimulating}
                  style={{
                    background: isSimulating ? 'rgba(255,255,255,0.05)' : '#3b82f6',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontWeight: 600,
                    cursor: isSimulating ? 'default' : 'pointer',
                    border: 'none'
                  }}
                >
                  <Play size={16} /> Çalıştır
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {simulationSteps.map((step, i) => (
                  <div key={i} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem',
                    opacity: simStep === i ? 1 : 0.4,
                    transform: simStep === i ? 'translateX(10px)' : 'none',
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: simStep === i ? '#3b82f6' : 'rgba(255,255,255,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.8rem',
                      fontWeight: 700
                    }}>
                      {i + 1}
                    </div>
                    <span style={{ fontSize: '0.9rem' }}>{step.text}</span>
                    {simStep === i && <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity }} style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6' }} />}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card">
              <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Katmanı İncele</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {(Object.keys(codeExamples) as LayerKey[]).map(key => (
                  <button
                    key={key}
                    onClick={() => setActiveLayer(key)}
                    style={{
                      background: activeLayer === key ? '#3b82f6' : 'rgba(255,255,255,0.05)',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      textTransform: 'capitalize',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {key}
                  </button>
                ))}
              </div>
              <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {codeExamples[activeLayer].desc}
              </p>
            </div>
          </div>

          {/* Code Viewer */}
          <div style={{ position: 'relative' }}>
            <div className="glass-card" style={{ 
              height: '100%', 
              padding: 0, 
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              background: '#0a0a0f',
              border: '1px solid var(--glass-border)'
            }}>
              <div style={{ 
                background: 'rgba(255,255,255,0.02)', 
                padding: '1rem 1.5rem', 
                borderBottom: '1px solid var(--glass-border)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <FileCode size={18} color="#3b82f6" />
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {codeExamples[activeLayer].file}
                </span>
              </div>
              
              <div style={{ 
                padding: '1.5rem', 
                flex: 1, 
                fontFamily: 'monospace',
                fontSize: '0.95rem',
                lineHeight: 1.7,
                color: '#e2e8f0',
                overflowY: 'auto'
              }}>
                <AnimatePresence mode="wait">
                  <motion.pre
                    key={activeLayer}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <code>{codeExamples[activeLayer].code}</code>
                  </motion.pre>
                </AnimatePresence>
              </div>

              {/* Dependency Hint */}
              <div style={{ 
                padding: '1rem 1.5rem', 
                background: 'rgba(59, 130, 246, 0.05)', 
                borderTop: '1px solid var(--glass-border)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.8rem',
                color: '#3b82f6'
              }}>
                <ArrowRight size={14} /> 
                {activeLayer === 'entities' ? 'Hiçbir dış katmana bağımlılığı yok.' : 
                 activeLayer === 'usecases' ? 'Sadece Entities katmanına bağımlı.' :
                 activeLayer === 'adapters' ? 'Use Cases katmanını çağırır.' :
                 'En dış katman, iç interface\'leri implemente eder.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Practical;
