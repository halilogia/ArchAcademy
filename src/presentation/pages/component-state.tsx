import React from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { 
  Share2, 
  Cpu, 
  Layers, 
  Zap, 
  Database, 
  Activity, 
  Box, 
  Code2, 
  AlertTriangle, 
  Lightbulb,
  ArrowDown,
  RefreshCcw,
  Network
} from 'lucide-react';

const ComponentStatePage = () => {
  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Central State Sphere */}
      <motion.div
        animate={{ 
          boxShadow: ['0 0 20px rgba(99, 102, 241, 0.2)', '0 0 60px rgba(99, 102, 241, 0.4)', '0 0 20px rgba(99, 102, 241, 0.2)']
        }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ 
          width: '120px', 
          height: '120px', 
          background: 'radial-gradient(circle at 30% 30%, #6366f1 0%, #4338ca 100%)', 
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2
        }}
      >
        <Database color="white" size={40} />
      </motion.div>

      {/* Orbiting Components */}
      {[0, 120, 240].map((degree, i) => (
        <motion.div
          key={i}
          animate={{ rotate: 360 }}
          transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'linear' }}
          style={{ 
            position: 'absolute', 
            width: '100%', 
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{ 
            transform: `rotate(${degree}deg) translateY(-140px)`,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '12px',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)'
          }}>
            <Box size={24} color="#6366f1" />
          </div>
        </motion.div>
      ))}

      {/* Connection Lines (Pulsing) */}
      <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
        <motion.circle
          cx="50%" cy="50%" r="80"
          stroke="rgba(99, 102, 241, 0.2)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5 5"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </svg>
    </div>
  );

  return (
    <div style={{ background: 'var(--bg-dark)', minHeight: '100vh', paddingBottom: '100px' }}>
      <ArchHero 
        title="Component State"
        subtitle="State Management"
        description="Bileşen tabanlı mimarilerde verinin yaşam döngüsünü yönetmek. Yerel sarmalamadan (Encapsulation) global dağıtıma, karmaşık arayüzlerin sinir sistemini inşa edin."
        badge="Data Flow Mastery"
        color="#6366f1"
        illustration={illu}
        features={[
          { icon: <RefreshCcw />, title: 'Unidirectional Flow', desc: 'Verinin tek yönde akışı sayesinde tahmin edilebilir ve hatasız durum yönetimi.' },
          { icon: <Layers />, title: 'Lifting State Up', desc: 'Kardeş bileşenler arası paylaşım için veriyi ortak ataya taşıma stratejisi.' },
          { icon: <Network />, title: 'Prop Drilling Mitigation', desc: 'Context API ve Global Store yapılarıyla derin hiyerarşilerde veri iletimi.' }
        ]}
      />

      {/* --- PHILLOSOPHY SECTION --- */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '10rem' }}>
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
            >
                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '2rem' }}>Durumun <span style={{ color: '#6366f1' }}>Taksonomisi</span></h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {[
                        { title: 'Local (Ephemeral) State', text: 'Sadece tek bir bileşeni ilgilendiren durumlar (Örn: Bir inputun değeri, modal açık mı?). UI hiyerarşisinde izole kalmalıdır.', color: '#6366f1' },
                        { title: 'Global (App) State', text: 'Tüm uygulamayı veya geniş bir bölümü ilgilendiren veriler (Örn: Kullanıcı oturumu, tema, alışveriş sepeti).', color: '#10b981' },
                        { title: 'Server State', text: 'Dış kaynaktan gelen ve senkronize edilmesi gereken veri. Caching, loading ve error state yönetimi kritiktir.', color: '#f59e0b' }
                    ].map((item, idx) => (
                        <div key={idx} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', borderLeft: `4px solid ${item.color}` }}>
                            <h4 style={{ color: item.color, fontWeight: 900, marginBottom: '0.5rem' }}>{item.title}</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{item.text}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
            
            <div style={{ background: 'rgba(99, 102, 241, 0.05)', padding: '3rem', borderRadius: '40px', border: '1px solid rgba(99, 102, 241, 0.1)' }}>
                <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>State Sharing <span style={{ opacity: 0.5 }}>Patterns</span></h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ textAlign: 'center', padding: '1rem', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '15px' }}>
                        <div style={{ fontWeight: 800 }}>Component A (State)</div>
                        <ArrowDown size={20} style={{ margin: '10px auto', opacity: 0.3 }} />
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            <div style={{ padding: '8px 15px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '0.8rem' }}>Child B</div>
                            <div style={{ padding: '8px 15px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '0.8rem' }}>Child C</div>
                        </div>
                        <div style={{ marginTop: '15px', fontSize: '0.75rem', color: '#6366f1' }}>Prop Drilling / Context API</div>
                    </div>
                    
                    <div style={{ textAlign: 'center', padding: '1.5rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '20px' }}>
                        <Database size={24} style={{ marginBottom: '10px' }} />
                        <div style={{ fontWeight: 800 }}>External Store (Zustand/Redux)</div>
                        <div style={{ marginTop: '10px', fontSize: '0.75rem', opacity: 0.6 }}>Bileşenlerden bağımsız, merkezi tekil gerçeklik kaynağı.</div>
                    </div>
                </div>
            </div>
          </div>

          {/* --- COMPARISON TABLE --- */}
          <div style={{ marginBottom: '10rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, textAlign: 'center', marginBottom: '4rem' }}>Ekoller: <span style={{ color: '#6366f1' }}>Redux vs. Context</span></h2>
            <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-secondary)' }}>
                    <thead>
                        <tr style={{ background: 'rgba(99, 102, 241, 0.1)' }}>
                            <th style={{ padding: '1.5rem', textAlign: 'left' }}>Özellik</th>
                            <th style={{ padding: '1.5rem', textAlign: 'left', color: '#6366f1' }}>Centralized (Redux/Zustand)</th>
                            <th style={{ padding: '1.5rem', textAlign: 'left', color: '#10b981' }}>Localized (Context API)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <td style={{ padding: '1.5rem', fontWeight: 700 }}>Mantık</td>
                            <td style={{ padding: '1.5rem' }}>Unidirectional, Action-Reducer bazlı.</td>
                            <td style={{ padding: '1.5rem' }}>İç içe geçmiş bağımlılık yönetimi.</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <td style={{ padding: '1.5rem', fontWeight: 700 }}>Performans</td>
                            <td style={{ padding: '1.5rem' }}>Seçici render (Selectors) ile mükemmel.</td>
                            <td style={{ padding: '1.5rem' }}>Consumer'ların tamamı render olur.</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <td style={{ padding: '1.5rem', fontWeight: 700 }}>Debug</td>
                            <td style={{ padding: '1.5rem' }}>Time-travel debugging mümkündür.</td>
                            <td style={{ padding: '1.5rem' }}>İzlenmesi daha zordur.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>

          {/* --- GURU TIPS --- */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
             <div className="glass-card" style={{ padding: '3rem', borderLeft: '4px solid #f59e0b' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', color: '#f59e0b' }}>
                    <Lightbulb size={28} />
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Guru Tip: Don't Sync State</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    Durumu manuel olarak senkronize etmeye çalışmayın (Derived State). Eğer bir veri, 
                    başka bir veriden hesaplanabiliyorsa (Örn: bir listenin uzunluğu), onu yeni bir state olarak tutmayın. 
                    Bunu render anında hesaplayın (useMemo).
                </p>
             </div>
             
             <div className="glass-card" style={{ padding: '3rem', borderLeft: '4px solid #6366f1' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', color: '#6366f1' }}>
                    <AlertTriangle size={28} />
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Avoid Over-Contexting</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    Context API her durumu saklamak için bir "çöp sepeti" değildir. Her Context değişimi, 
                    o contexti dinleyen her bileşeni re-render eder. Global state'i gerçekten küresel olan 
                    veriler (Tema, Kullanıcı) için saklayın.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
            <div className="glass-card" style={{ textAlign: 'center', padding: '5rem', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)' }}>
                <h2 style={{ fontSize: '3rem', fontWeight: 950, marginBottom: '1.5rem' }}>Sinir Sistemini <span className="gradient-text">Kurun</span>.</h2>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 3rem' }}>
                    Bileşenler arası veri trafiği, uygulamanızın ölçeklenebilirliğini belirleyen en kritik faktördür.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button onClick={() => window.history.back()} style={{ padding: '1rem 3rem', borderRadius: '100px', background: 'white', color: 'black', border: 'none', fontWeight: 900, cursor: 'pointer' }}>
                        GERİ DÖN
                    </button>
                    <button style={{ padding: '1rem 3rem', borderRadius: '100px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--glass-border)', fontWeight: 900, cursor: 'pointer' }}>
                        DÖKÜMANTASYON <Code2 size={18} style={{ marginLeft: '10px' }} />
                    </button>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default ComponentStatePage;
