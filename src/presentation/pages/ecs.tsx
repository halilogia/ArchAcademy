import React from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { Cpu, Box, Zap, Layers, Play, Database, FastForward, Activity, Code2, AlertTriangle, Lightbulb } from 'lucide-react';

const ECSPage = () => {
  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Entities Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            style={{ 
                width: '50px', 
                height: '50px', 
                background: 'rgba(16, 185, 129, 0.05)', 
                border: '1px solid rgba(16, 185, 129, 0.2)', 
                borderRadius: '12px', 
                position: 'relative' 
            }}
          >
            {/* Component bits rotating inside */}
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                style={{ position: 'absolute', top: '10px', left: '10px', width: '8px', height: '8px', background: '#3b82f6', borderRadius: '2px' }} 
            />
            <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                style={{ position: 'absolute', bottom: '10px', right: '10px', width: '8px', height: '8px', background: '#f43f5e', borderRadius: '2px' }} 
            />
          </motion.div>
        ))}
      </div>
      
      {/* System "Scanner" Line */}
      <motion.div
        animate={{ x: [-180, 180], opacity: [0, 1, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ 
            position: 'absolute', 
            top: '10%', 
            bottom: '10%', 
            width: '2px', 
            background: 'linear-gradient(to bottom, transparent, #10b981, transparent)', 
            filter: 'drop-shadow(0 0 15px #10b981)',
            zIndex: 2
        }}
      />
      
      <div style={{ position: 'absolute', bottom: '-20px', color: '#10b981', fontWeight: 900, fontSize: '0.65rem', display: 'flex', gap: '20px', opacity: 0.6, letterSpacing: '2px' }}>
        <span style={{ color: '#3b82f6' }}>ENTITY</span>
        <span style={{ color: '#f43f5e' }}>COMPONENT</span>
        <span style={{ color: '#10b981' }}>SYSTEM</span>
      </div>
    </div>
  );

  return (
    <div style={{ background: 'var(--bg-dark)', minHeight: '100vh', paddingBottom: '100px' }}>
      <ArchHero 
        title="ECS"
        subtitle="Game Architecture"
        description="Entity Component System. Nesne yönelimli (OOP) hantallığını yıkan, veri odaklı (Data-Oriented) bir devrim. Binlerce dinamik nesneyi CPU Cache dostu bir yapıyla saniyeler içinde işleyin."
        badge="Performance King"
        color="#10b981"
        illustration={illu}
        features={[
          { icon: <Cpu />, title: 'L1/L2 Cache Hit', desc: 'Veriyi RAM\'de ardışık dizerek CPU gecikmesini (latency) minimize eder.' },
          { icon: <FastForward />, title: 'Massively Parallel', desc: 'Sistemler birbirinden bağımsız olduğu için Multi-threading için mükemmeldir.' },
          { icon: <Layers />, title: 'Composition over Inheritance', desc: 'Kalıtım hiyerarşisi yerine esnek bileşen birleşimi sunar.' }
        ]}
      />

      {/* --- DEEP DIVE SECTION --- */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '10rem' }}>
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
            >
                <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '2rem' }}>Üç Silahşörler: <span style={{ color: '#10b981' }}>E, C ve S</span></h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {[
                        { title: 'Entity (ID)', text: 'Kendi başına hiçbir veri veya kod içermeyen bir "Kimlik"tir. Sadece hangi bileşenlerin ona bağlı olduğunu belirten bir kaptır.', color: '#10b981' },
                        { title: 'Component (Data)', text: 'Sadece ham veri içerir (Pozisyon, Enerji vb.). Hiçbir "logic" barındırmaz. Bir C yapısı (Struct) gibi düşünülebilir.', color: '#3b82f6' },
                        { title: 'System (Logic)', text: 'Belli bileşenlere sahip tüm "Entity"leri filtreler ve her karede (frame) mantığı (hareket, çarpışma vb.) işletir.', color: '#f43f5e' }
                    ].map((item, idx) => (
                        <div key={idx} style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', borderLeft: `4px solid ${item.color}` }}>
                            <h4 style={{ color: item.color, fontWeight: 900, marginBottom: '0.5rem' }}>{item.title}</h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{item.text}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ padding: '2rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '30px', border: '1px solid rgba(16, 185, 129, 0.2)', textAlign: 'center' }}>
                    <Activity size={40} color="#10b981" style={{ marginBottom: '1rem' }} />
                    <div style={{ fontSize: '2rem', fontWeight: 900 }}>100k+</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Aktif Entity (60 FPS)</div>
                </div>
                <div style={{ padding: '2rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '30px', border: '1px solid rgba(59, 130, 246, 0.2)', textAlign: 'center' }}>
                    <Database size={40} color="#3b82f6" style={{ marginBottom: '1rem' }} />
                    <div style={{ fontSize: '2rem', fontWeight: 900 }}>%90</div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>Cache Efficiency</div>
                </div>
                <div style={{ gridColumn: 'span 2', padding: '2rem', background: 'rgba(244, 63, 94, 0.05)', borderRadius: '30px', border: '1px solid rgba(244, 63, 94, 0.1)' }}>
                    <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                        "OOP'de veri belleğe dağılır, ECS'de ise bir ordu gibi yan yana dizilir."
                    </p>
                </div>
            </div>
          </div>

          {/* --- CODE SECTION --- */}
          <div style={{ marginBottom: '10rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>Pratik <span style={{ color: '#10b981' }}>Uygulama</span></h2>
                <p style={{ color: 'var(--text-secondary)' }}>Basit bir Hareket Sistemi (Movement System) nasıl görünür?</p>
            </div>
            
            <div className="glass-card" style={{ padding: '0', overflow: 'hidden', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', gap: '8px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
                    <span style={{ marginLeft: '1rem', fontSize: '0.75rem', opacity: 0.4, fontWeight: 700 }}>MovementSystem.cs</span>
                </div>
                <pre style={{ margin: 0, padding: '2rem', color: '#a5b4fc', fontSize: '0.9rem', lineHeight: 1.7, background: '#0a0f1d' }}>
                    <code>{`// 1. Component (Sadece Veri)
public struct Position : IComponentData { public float3 Value; }
public struct Velocity : IComponentData { public float3 Value; }

// 2. System (Sadece Mantık)
public partial struct MovementSystem : ISystem {
    [BurstCompile] // CPU optimizasyonu
    public void OnUpdate(ref SystemState state) {
        float deltaTime = SystemAPI.Time.DeltaTime;

        // "Position" ve "Velocity"si olan tüm Entity'leri işle
        foreach (var (pos, vel) in SystemAPI.Query<RefRW<Position>, RefRO<Velocity>>()) {
            pos.ValueRW.Value += vel.ValueRO.Value * deltaTime;
        }
    }
}`}</code>
                </pre>
            </div>
          </div>

          {/* --- GURU TIPS --- */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
             <div className="glass-card" style={{ padding: '3rem', borderLeft: '4px solid #f59e0b' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', color: '#f59e0b' }}>
                    <Lightbulb size={28} />
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Guru Tip: Data-Locality</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    ECS kullanırken yapıları (struct) mümkün olduğunca küçük tutun. CPU bir seferde 64 baytlık (Cache Line) veri çeker. 
                    Veriyi bu sınıra göre optimize ederseniz, CPU'nuz RAM'e gitmek zorunda kalmadan yıldırım hızında çalışır.
                </p>
             </div>
             
             <div className="glass-card" style={{ padding: '3rem', borderLeft: '4px solid #3b82f6' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', color: '#3b82f6' }}>
                    <AlertTriangle size={28} />
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Ne Zaman Kullanmalı?</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    Eğer projenizde 100'den az aktif nesne varsa, ECS büyük bir "over-engineering" olabilir. ECS, devasa mermi cehennemleri (Bullet Hell), 
                    yoğun fizik simülasyonları veya MMO arka uçları için gerçek gücünü gösterir.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* --- CTA --- */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
            <div className="glass-card" style={{ textAlign: 'center', padding: '5rem', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)' }}>
                <h2 style={{ fontSize: '3rem', fontWeight: 950, marginBottom: '1.5rem' }}>Veri Odaklı <span className="gradient-text">Gelecek</span>.</h2>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 3rem' }}>
                    OOP nesnelerle düşünmemizi söyler, ECS ise verinin nasıl aktığıyla ilgilenir. Architecture Catalog'a dönerek diğer sistemleri incele.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button onClick={() => window.history.back()} style={{ padding: '1rem 3rem', borderRadius: '100px', background: 'white', color: 'black', border: 'none', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Play size={18} fill="black" /> KATALOĞA DÖN
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

export default ECSPage;
