import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Cpu, Share2, Route as RouterIcon, Database } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const VIPERAnatomyTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div
      key="anatomy"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div className="glass-card">
          <h3 style={{ marginBottom: '1rem', color: '#93c5fd', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Layout /> View
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            {isEn 
              ? "Dumb UI renderer. Listens strictly to Presenter instructions and transmits user events upward. Zero domain logic." 
              : "Presenter ne derse onu yapar. Logic içermez. Android'de Activity/Fragment, iOS'ta UIViewController'dır."
            }
          </p>
        </div>
        
        <div className="glass-card">
          <h3 style={{ marginBottom: '1rem', color: '#fca5a5', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Cpu /> Interactor
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            {isEn 
              ? "The business engine. Executes use cases, fetches repositories, transforms entities. Completely agnostic of any UI or presentation framework." 
              : "Uygulamanın beyni. API'den veri çeker, hesaplama yapar. UI'dan haberi yoktur. Sadece Entity'leri bilir."
            }
          </p>
        </div>

        <div className="glass-card" style={{ gridRow: 'span 2', borderLeft: '4px solid #10b981' }}>
          <h3 style={{ marginBottom: '1rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Share2 /> Presenter
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            {isEn 
              ? "The Module Orchestrator. Intercepts view actions, delegates tasks to the Interactor, formats responses, and directs navigation to the Router." 
              : "Orkestra Şefi. View'dan event alır, Interactor'a iş yaptırır, sonuç gelince Router'a 'git' veya View'a 'göster' der."
            }
          </p>
          <div style={{ fontSize: '0.9rem', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px' }}>
            {isEn ? "Must never import " : "Asla "}<code>UIKit</code> {isEn ? "or " : "veya "}<code>android.*</code> {isEn ? "! Kept 100% pure platform-agnostic code." : "import etmemelidir! Saf Kotlin/Swift kalmalıdır."}
          </div>
        </div>

        <div className="glass-card">
          <h3 style={{ marginBottom: '1rem', color: '#fcd34d', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <RouterIcon /> Router (Wireframe)
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            {isEn 
              ? "Coordinates inter-module navigation transitions and serves as the dependency injection factory assembling the module's 5 layers." 
              : "Ekranlar (Module) arası geçişi sağlar. Dependency Injection burada yapılır. 'Hangi ekran açılacak ve verisi ne olacak?' sorusunun cevabıdır."
            }
          </p>
        </div>

        <div className="glass-card">
          <h3 style={{ marginBottom: '1rem', color: '#fdba74', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Database /> Entity
          </h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            {isEn 
              ? "Plain data models (Structs, POJOs) containing state attributes. Zero business logic or behavioral mutations." 
              : "Saf veri modeli (POJO / Struct). İş mantığı barındırmaz. (Örn: User, Product)"
            }
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default VIPERAnatomyTab;
