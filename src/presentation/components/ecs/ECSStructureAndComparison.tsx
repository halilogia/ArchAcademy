import React from 'react';
import { motion } from 'framer-motion';
import { Box, Activity } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const ECSStructureAndComparison: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <section style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
          {/* Folder Structure */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Box color="#10b981" /> {isEn ? "Authoritative Structure (Unity DOTS)" : "Authoritative Structure (Unity DOTS)"}
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              {isEn 
                ? "In standard industrial ECS architectures, codebases decouple into Authoring (Editor tools & bakers) and Runtime (pure SIMD structs & systems)." 
                : "Modern ECS projelerinde yapı, geleneksel OOP'den farklı olarak 'Authoring' (Editör) ve 'Runtime' (Çalışma Zamanı) olarak ikiye ayrılır."
              }
            </p>
            <div className="glass-card" style={{ padding: '2rem', background: 'rgba(0,0,0,0.2)' }}>
              <pre style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.8 }}>
                {`Assets/
├── Scripts/
│   ├── Components/     # Pure Data (IComponentData)
│   │   ├── MovementComponent.cs
│   │   └── HealthComponent.cs
│   ├── Systems/        # Logic (ISystem / SystemBase)
│   │   ├── MovementSystem.cs
│   │   └── CollisionSystem.cs
│   ├── Aspects/        # Data Grouping (Optional)
│   │   └── PlayerAspect.cs
│   └── Authoring/      # Editor UI & Conversion
│       ├── MovementAuthoring.cs
│       └── Bakers/      # Authoring -> Entity logic
│           └── MovementBaker.cs
└── Prefabs/            # Entity Templates`}
              </pre>
            </div>
          </motion.div>

          {/* ECS vs MVVM */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Activity color="#3b82f6" /> ECS vs MVVM
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '1.5rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '16px', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                <h4 style={{ color: '#10b981', marginBottom: '0.5rem' }}>
                  {isEn ? "ECS: Data-Oriented (Raw Throughput)" : "ECS: Veri Odaklı (Performance)"}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {isEn 
                    ? "Engineered for processing millions of uniform entities (bullets, particles, units) maximizing hardware CPU cache utilization." 
                    : "Binlerce benzer nesnenin (mermiler, askerler) aynı anda işlenmesi gereken durumlar için idealdir. CPU Cache kullanımını maksimize eder."
                  }
                </p>
              </div>
              <div style={{ padding: '1.5rem', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '16px', border: '1px solid rgba(59, 130, 246, 0.1)' }}>
                <h4 style={{ color: '#3b82f6', marginBottom: '0.5rem' }}>
                  {isEn ? "MVVM: UI-Oriented (Reactivity & Binding)" : "MVVM: UI Odaklı (Flexibility)"}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {isEn 
                    ? "Engineered for rich user interfaces, asynchronous state binding, and enterprise forms with high testability." 
                    : "Karmaşık kullanıcı arayüzleri, formlar ve veri bağlama (Data Binding) gerektiren iş uygulamaları için standarttır."
                  }
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Comparison Table */}
        <div style={{ marginTop: '4rem', padding: '2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '24px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                <th style={{ textAlign: 'left', padding: '1rem' }}>{isEn ? "Feature" : "Özellik"}</th>
                <th style={{ textAlign: 'left', padding: '1rem', color: '#10b981' }}>ECS</th>
                <th style={{ textAlign: 'left', padding: '1rem', color: '#3b82f6' }}>MVVM</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '1rem', fontWeight: 700 }}>{isEn ? "Primary Focus" : "Ana Odak"}</td>
                <td style={{ padding: '1rem' }}>{isEn ? "Raw Throughput & Data Streams" : "Ham Performans & Veri Akışı"}</td>
                <td style={{ padding: '1rem' }}>{isEn ? "UI State Management & Testability" : "UI Durum Yönetimi & Test Edilebilirlik"}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '1rem', fontWeight: 700 }}>{isEn ? "Memory Layout" : "Bellek Yapısı"}</td>
                <td style={{ padding: '1rem' }}>{isEn ? "Contiguous (Cache-Friendly Array)" : "Ardışık (Cache-Friendly Layout)"}</td>
                <td style={{ padding: '1rem' }}>{isEn ? "Scattered (Heap Object Graph)" : "Dağınık (Heap-Based Objects)"}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '1rem', fontWeight: 700 }}>{isEn ? "Sweet Spot" : "Kullanım Alanı"}</td>
                <td style={{ padding: '1rem' }}>{isEn ? "Game Engines, Physics, Swarms" : "Oyun Motorları, Simülasyonlar"}</td>
                <td style={{ padding: '1rem' }}>{isEn ? "Enterprise Applications, Mobile/Web UI" : "Kurumsal Uygulamalar, Mobil/Web UI"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ECSStructureAndComparison;
