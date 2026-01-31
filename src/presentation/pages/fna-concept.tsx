import React from 'react';
import { motion } from 'framer-motion';
import { Target, Workflow, Sparkles, Brain, ShieldAlert, Layers, Network, Zap, Cpu, Activity, LayoutTemplate, Eye } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const IntentArchitecturePage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: '#020617', minHeight: '100vh', color: 'white' }}>
      <ArchHero 
        title="Intent"
        subtitle="Architecture (IOA)"
        description="2050 Vizyonu: Yazılımın bir inşaat değil, AI-Organizer tarafından niyetlerle şekillendirilen yaşayan bir organizmaya dönüşümü."
        badge="AI-Organizer Era"
        color="#06b6d4"
        illustration={
          <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* AI-Organizer Core */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 0],
                boxShadow: ['0 0 20px #06b6d433', '0 0 50px #06b6d466', '0 0 20px #06b6d433']
              }}
              transition={{ duration: 8, repeat: Infinity }}
              style={{ position: 'absolute', width: '120px', height: '120px', borderRadius: '30%', border: '4px solid #06b6d4', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(6, 182, 212, 0.1)' }}
            >
               <Brain size={60} color="#06b6d4" />
            </motion.div>

            {/* Pulsing Visual Map Dots */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                   opacity: [0.1, 1, 0.1],
                   scale: [0.5, 1.5, 0.5],
                   x: Math.cos(i * 30 * Math.PI / 180) * 140,
                   y: Math.sin(i * 30 * Math.PI / 180) * 140
                }}
                transition={{ duration: 4, delay: i * 0.3, repeat: Infinity }}
                style={{ position: 'absolute', width: '8px', height: '8px', borderRadius: '50%', background: '#06b6d4' }}
              />
            ))}
            
            {/* Connecting Lines (Simulated Neural Map) */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.2 }}>
               <circle cx="175" cy="175" r="140" fill="none" stroke="#06b6d4" strokeWidth="1" strokeDasharray="5,5" />
               <circle cx="175" cy="175" r="90" fill="none" stroke="#06b6d4" strokeWidth="0.5" />
            </svg>
          </div>
        }
        features={[
          { icon: <LayoutTemplate />, title: 'AI-Organizer', desc: 'Mimari haritayı insan değil, amaca göre AI sentezler.' },
          { icon: <Eye />, title: 'Living Blueprint', desc: 'Durağan döküman yok; her an değişen görsel bir sinir sistemi.' },
          { icon: <Target />, title: 'Teleology-First', desc: 'Sadece hedefe (Intent) odaklanın, yapı kendiliğinden oluşur.' }
        ]}
      />

      <section style={{ padding: '80px 0' }}>
        <div className="container">
          
          {/* Evolution Timeline Card */}
          <div className="glass-card" style={{ padding: '4rem', marginBottom: '6rem', position: 'relative', overflow: 'hidden' }}>
             <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(to right, #06b6d4, transparent)' }} />
             <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '3rem' }}>The Evolution of Intent</h2>
             
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem' }}>
                <div style={{ padding: '1rem' }}>
                   <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#06b6d4', marginBottom: '1rem', letterSpacing: '1px' }}>2010 - 2020 ERA</div>
                   <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Manual Construction</h4>
                   <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>Geliştiriciler her boruyu (Imports, Repos, DTOs) el yordamıyla ve hata payıyla döşedi.</p>
                </div>
                <div style={{ padding: '1rem' }}>
                   <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#06b6d4', marginBottom: '1rem', letterSpacing: '1px' }}>2024 - B0RE (PRESENT)</div>
                   <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Architecture Automation</h4>
                   <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}><strong>Intent Architect</strong> gibi araçlar, insan tasarımı modellere bakarak determinist kodları otonomlaştırdı.</p>
                </div>
                <div style={{ padding: '1rem' }}>
                   <div style={{ fontSize: '0.8rem', fontWeight: 900, color: '#06b6d4', marginBottom: '1rem', letterSpacing: '1px' }}>2050 - GENESIS ERA</div>
                   <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>AI-Organizer (IOA)</h4>
                   <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>Tasarımcı ARADAN ÇIKTI. AI, saf niyetten (Intent) ideal mimari organizasyonu anlık sentezliyor.</p>
                </div>
             </div>
          </div>

          {/* AI-Organizer Workflow */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '5rem', alignItems: 'center', marginBottom: '8rem' }}>
             <div>
                <h2 style={{ fontSize: '2.8rem', fontWeight: 900, marginBottom: '2rem' }}>AI-Organizer Nasıl Çalışır?</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                   <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'start' }}>
                      <Brain color="#06b6d4" size={32} style={{ flexShrink: 0 }} />
                      <div>
                         <h5 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Anlamsal Radar (Semantic Radar)</h5>
                         <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Sistemdeki tüm "yetenekleri" (Skills) ve "parçaları" (Atoms) sürekli tarayarak anlamsal bir kütüphane oluşturur.</p>
                      </div>
                   </div>
                   <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'start' }}>
                      <Zap color="#06b6d4" size={32} style={{ flexShrink: 0 }} />
                      <div>
                         <h5 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Anlık Şema Sentezi (Ad-hoc Schema)</h5>
                         <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Verilen niyet için sabit bir dosya yapısı yerine, o anki en verimli bağlantı şemasını (Neural Map) hesaplar.</p>
                      </div>
                   </div>
                   <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'start' }}>
                      <ShieldAlert color="#06b6d4" size={32} style={{ flexShrink: 0 }} />
                      <div>
                         <h5 style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.5rem' }}>Ontological Proof</h5>
                         <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>Sentezlenen yapının, niyetin (Intent) tüm kısıtlarını (Constraints) karşılayıp karşılamadığını matematiksel olarak ispatlar.</p>
                      </div>
                   </div>
                </div>
             </div>
             
             <div className="glass-card" style={{ padding: '3rem', background: 'rgba(0,0,0,0.5)', textAlign: 'center' }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  style={{ width: '200px', height: '200px', border: '2px solid rgba(6, 182, 212, 0.2)', borderRadius: '50%', margin: '0 auto', position: 'relative' }}
                >
                   <motion.div 
                     animate={{ scale: [1, 1.3, 1] }} 
                     transition={{ duration: 2, repeat: Infinity }}
                     style={{ position: 'absolute', top: '-10px', left: '50%', marginLeft: '-10px', width: '20px', height: '20px', background: '#06b6d4', borderRadius: '50%', boxShadow: '0 0 15px #06b6d4' }} 
                   />
                   <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '0.8rem', opacity: 0.5 }}>
                      SYNTHESIS<br/>CORE
                   </div>
                </motion.div>
                <div style={{ marginTop: '2rem', color: '#06b6d4', fontWeight: 800 }}>Organizing Intent...</div>
             </div>
          </div>

          {/* New Paradox Section */}
          <div className="glass-card" style={{ 
            padding: '5rem', 
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(2, 6, 23, 0.8) 100%)'
          }}>
             <motion.div
               animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
               transition={{ duration: 4, repeat: Infinity }}
               style={{ color: '#06b6d4', marginBottom: '2rem' }}
             >
                <Cpu size={80} style={{ margin: '0 auto' }} />
             </motion.div>
             <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Yazılımın Genesis Anı</h2>
             <p style={{ maxWidth: '900px', margin: '0 auto', fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 2 }}>
                2050'de yazılım "yazılmaz"; yazılım **"arzulanır"**. İnsan, yüksek seviyeli anlamsal niyetini 
                tanımladığı an, **AI-Organizer** evrensel atom kütüphanesini tarar, 
                ideali sentezler ve görsel şemayı (blueprint) anlık olarak karşınıza getirir. 
                Bu süreçte "bug" yoktur, çünkü sistem kendi kendini ispatlamamış hiçbir sentezi hayata geçirmez. 
                Siz sadece arzularsınız, yazılım o arzunun görsel ve fonksiyonel halidir.
             </p>
          </div>
        </div>
      </section>
      <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
           <div style={{ 
             background: 'linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.5) 100%)', 
             padding: '3rem', 
             borderRadius: '24px', 
             border: '1px solid rgba(255,255,255,0.05)',
             maxWidth: '900px',
             margin: '0 auto'
           }}>
              <div style={{ fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', marginBottom: '1rem', textTransform: 'uppercase' }}>
                Future of Engineering
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                Yazılım 2.0, otonom mimari sentezi ve AI destekli tasarım süreçlerinin geleceği hakkında vizyoner kaynakları keşfedin.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://medium.com/@karpathy/software-2-0-a643152654" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(6, 182, 212, 0.15)', color: '#67e8f9', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(6, 182, 212, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    Software 2.0 (Andrej Karpathy) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
                 <a 
                   href="https://intentarchitect.com/" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(255, 255, 255, 0.05)', color: 'white', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.2s'
                   }}
                 >
                    Intent Architect (Modern Automation) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};

export default IntentArchitecturePage;
