import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const AbstractionTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const [coffeeStatus, setCoffeeStatus] = useState<'idle' | 'grinding' | 'brewing' | 'ready'>('idle');

  const makeCoffee = () => {
    if (coffeeStatus !== 'idle') return;
    setCoffeeStatus('grinding');
    setTimeout(() => setCoffeeStatus('brewing'), 1000);
    setTimeout(() => setCoffeeStatus('ready'), 2500);
    setTimeout(() => setCoffeeStatus('idle'), 4000);
  };

  return (
    <motion.div 
      key="abstraction" 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -10 }} 
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}
    >
      <div>
        <h3 style={{ fontSize: '1.8rem', color: '#f43f5e', marginBottom: '1rem' }}>
          {isEn ? "The Iceberg" : "Buzdağının Görünmeyen Kısmı"}
        </h3>
        <p style={{ color: '#cbd5e1', lineHeight: 1.6 }}>
          {isEn 
            ? "Exposing what an object does (its public contract/interface) while encapsulating how it executes internally. When driving a car, you press the gas pedal without needing to know engine piston firing orders."
            : "Kullanıcıya sadece 'ne yapabileceğini' gösterip, 'nasıl yaptığını' gizlemektir. Araba sürerken motorun ateşleme sırasını bilmenize gerek yoktur, sadece gaza basarsınız."
          }
        </p>
      </div>
      
      <div className="glass-card">
        <h4 style={{ color: 'white', marginBottom: '20px' }}>Espresso Machine Interface</h4>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '30px' }}>
          {/* The Interface */}
          <div style={{ textAlign: 'center' }}>
            <button 
              onClick={makeCoffee}
              disabled={coffeeStatus !== 'idle'}
              style={{ 
                width: '80px', 
                height: '80px', 
                borderRadius: '50%', 
                border: '4px solid #f43f5e', 
                background: coffeeStatus === 'idle' ? 'transparent' : '#f43f5e',
                color: coffeeStatus === 'idle' ? '#f43f5e' : 'white',
                cursor: coffeeStatus === 'idle' ? 'pointer' : 'default', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontWeight: 'bold',
                transition: 'all 0.3s'
              }}
            >
              {isEn ? "BREW" : "KAHVE YAP"}
            </button>
            <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#f43f5e', fontWeight: 700 }}>
              {isEn ? "Simple Interface" : "Basit Arayüz"}
            </div>
          </div>

          <ArrowRight size={24} color="#94a3b8" />

          {/* The Implementation */}
          <div style={{ padding: '20px', background: '#1e293b', borderRadius: '12px', minWidth: '180px' }}>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '10px', fontWeight: 700 }}>
              {isEn ? "Internal Complexity:" : "İç Karmaşıklık (Gizli):"}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: coffeeStatus === 'grinding' ? '#fbbf24' : '#475569' }}>
                <Activity size={14} /> {isEn ? "Grinding Beans" : "Çekirdekleri Öğütüyor"}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: coffeeStatus === 'brewing' ? '#fbbf24' : '#475569' }}>
                <Activity size={14} /> {isEn ? "Pressurizing Water" : "Basınçlı Sıcak Su"}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: coffeeStatus === 'ready' ? '#10b981' : '#475569' }}>
                <CheckCircle2 size={14} /> {isEn ? "Pouring Coffee" : "Bardağa Dolduruluyor"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AbstractionTab;
