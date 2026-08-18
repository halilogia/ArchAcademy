import React from 'react';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const AbstractionConceptTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div key="concept" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '1.8rem', color: '#a855f7', marginBottom: '1.5rem', fontWeight: 800 }}>
            {isEn ? 'The "Black Box" Theory' : 'Kara Kutu Teorisi (The "Black Box" Theory)'}
          </h3>
          <p style={{ lineHeight: '1.7', color: '#cbd5e1', marginBottom: '1.5rem' }}>
            {isEn 
              ? "When driving a car, you don't need to know the thermodynamic combustion timing of each cylinder. You only interact with the steering wheel, pedals, and gears (The Interface)."
              : "Araba kullanırken motorun içindeki pistonların nasıl hareket ettiğini bilmek zorunda değilsiniz. Sadece direksiyon, gaz ve fren (Arayüz/Interface) ile ilgilenirsiniz."
            }
          </p>
          <p style={{ lineHeight: '1.7', color: '#cbd5e1' }}>
            {isEn ? "Software architecture applies the exact same invariant:" : "Yazılımda da böyledir:"}
            <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: '#ef4444' }}>{isEn ? "Leaky Abstraction: " : "Kötü Soyutlama: "}</strong> 
                <code>connectToMySQL_v5_Driver()</code> {isEn ? " (Switching database breaks client code)" : " çağırmak. (Database değişirse kod patlar)"}
              </li>
              <li>
                <strong style={{ color: '#10b981' }}>{isEn ? "Pristine Abstraction: " : "İyi Soyutlama: "}</strong> 
                <code>database.save()</code> {isEn ? " (Underlying persistence engine is an implementation detail)" : " çağırmak. (Arkada ne olduğu önemsiz)"}
              </li>
            </ul>
          </p>
        </div>

        <div className="glass-card" style={{ border: '1px solid #a855f7', background: 'rgba(168, 85, 247, 0.05)', padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>
            <Code color="white" />
            <h4 style={{ margin: 0, color: 'white', fontWeight: 700 }}>
              {isEn ? "Interface Decoupling Example" : "Kod Örneği (TypeScript Interface)"}
            </h4>
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#e2e8f0', lineHeight: 1.6 }}>
            <div style={{ color: '#94a3b8' }}>// 1. Abstraction (Pure Contract)</div>
            <div style={{ color: '#a855f7' }}>interface DataSource {'{'}</div>
            <div style={{ paddingLeft: '20px', color: '#60a5fa' }}>connect(): Promise&lt;void&gt;;</div>
            <div style={{ paddingLeft: '20px', color: '#60a5fa' }}>save(record: Entity): Promise&lt;void&gt;;</div>
            <div style={{ color: '#a855f7' }}>{'}'}</div>
            <br />
            <div style={{ color: '#94a3b8' }}>// 2. Client / Consumer Layer (Zero coupling to concrete engine)</div>
            <div>
              const db: <span style={{ color: '#a855f7' }}>DataSource</span> = config.isDev ? 
              new <span style={{ color: '#eab308' }}>MockDb()</span> : 
              new <span style={{ color: '#3b82f6' }}>PostgresDb()</span>;
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AbstractionConceptTab;
