import React from 'react';
import { Lightbulb, AlertTriangle, FastForward } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const ECSCodeExample: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <div style={{ marginBottom: '10rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 900 }}>
          {isEn ? "Practical " : "Pratik "}<span style={{ color: '#10b981' }}>{isEn ? "Implementation" : "Uygulama"}</span>
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          {isEn 
            ? "What does a high-performance Unity DOTS Movement System look like?" 
            : "Basit bir Hareket Sistemi (Movement System) nasıl görünür?"
          }
        </p>
      </div>
      
      <div className="glass-card" style={{ padding: '0', overflow: 'hidden', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px 20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
          <span style={{ marginLeft: '1rem', fontSize: '0.75rem', opacity: 0.4, fontWeight: 700 }}>MovementSystem.cs</span>
        </div>
        <pre style={{ margin: 0, padding: '2rem', color: '#a5b4fc', fontSize: '0.9rem', lineHeight: 1.7, background: '#0a0f1d' }}>
          <code>{`// 1. Components (Pure Struct Data)
public struct Position : IComponentData { public float3 Value; }
public struct Velocity : IComponentData { public float3 Value; }

// 2. System (SIMD Parallel Execution)
public partial struct MovementSystem : ISystem {
    [BurstCompile] // Compile directly to vector machine code
    public void OnUpdate(ref SystemState state) {
        float deltaTime = SystemAPI.Time.DeltaTime;

        // Query all Entities possessing both Position and Velocity
        foreach (var (pos, vel) in SystemAPI.Query<RefRW<Position>, RefRO<Velocity>>()) {
            pos.ValueRW.Value += vel.ValueRO.Value * deltaTime;
        }
    }
}`}</code>
        </pre>
      </div>

      {/* GURU TIPS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '4rem' }}>
        <div className="glass-card" style={{ padding: '3rem', borderLeft: '4px solid #f59e0b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', color: '#f59e0b' }}>
            <Lightbulb size={28} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900 }}>{isEn ? "Guru Tip: Data-Locality" : "Guru Tip: Data-Locality"}</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            {isEn 
              ? "Keep component structs compact. CPU cache lines load 64 bytes at a time. Packing sequential data structures prevents cache evictions, speeding throughput by orders of magnitude." 
              : "ECS kullanırken yapıları (struct) mümkün olduğunca küçük tutun. CPU bir seferde 64 baytlık (Cache Line) veri çeker. Veriyi bu sınıra göre optimize ederseniz, CPU'nuz RAM'e gitmek zorunda kalmadan yıldırım hızında çalışır."
            }
          </p>
        </div>
        
        <div className="glass-card" style={{ padding: '3rem', borderLeft: '4px solid #3b82f6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', color: '#3b82f6' }}>
            <AlertTriangle size={28} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900 }}>{isEn ? "When to Avoid ECS" : "Ne Zaman Kullanmalı?"}</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            {isEn 
              ? "If your app manages fewer than 500 active objects, ECS is premature over-engineering. ECS shines for bullet hells, particle swarm physics, MMO game worlds, and high-frequency real-time simulations." 
              : "Eğer projenizde 100'den az aktif nesne varsa, ECS büyük bir over-engineering olabilir. ECS, devasa mermi cehennemleri (Bullet Hell), yoğun fizik simülasyonları veya MMO oyun dünyaları için gerçek gücünü gösterir."
            }
          </p>
        </div>

        <div className="glass-card" style={{ padding: '3rem', borderLeft: '4px solid #10b981', gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', color: '#10b981' }}>
            <FastForward size={28} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900 }}>{isEn ? "Modern Concept: The Baking Process" : "Modern Kavram: The Baking Process"}</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            {isEn 
              ? "In modern engines like Unity DOTS, 'Baking' converts rich editor hierarchies (GameObjects, scene graphs) into optimized, runtime-ready flat entity archetype buffers during compilation." 
              : "Unity DOTS gibi sistemlerde Baking, editördeki (GameObject) hiyerarşiyi, çalışma zamanındaki optimize edilmiş Entity yapılarına dönüştürme işlemidir. Bu sayede geliştirici dostu bir arayüzle tasarım yaparken, çalışma anında saf ECS performansından ödün vermezsiniz."
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default ECSCodeExample;
