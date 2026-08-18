import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Layout, UserCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const MVPConceptsTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div
      key="concepts"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Activity size={24} /> Model
          </h3>
          <p style={{ lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            {isEn 
              ? "Encapsulates application data structures, repository calls, and business logic. Responds strictly to Presenter queries." 
              : "Tıpkı MVC ve MVVM'deki gibi, veriyi ve veriye erişim kurallarını barındırır. Presenter veriyi buradan ister."
            }
            <br/><br/>
            <span style={{ color: 'white', fontWeight: 600 }}>{isEn ? "Example: " : "Örnek: "}</span><code>UserRepository</code>, <code>PaymentGatewayService</code>.
          </p>
        </div>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Layout size={24} /> View (Passive / Humble)
          </h3>
          <p style={{ lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            {isEn 
              ? "Intentionally kept dumb. Makes zero decisions and executes zero business rules. Strictly displays what the Presenter dictates." 
              : "Kasıtlı olarak 'aptallaştırılmıştır'. Karar vermez, mantık yürütmez. Sadece Presenter'ın 'Göster' dediğini gösterir, 'Gizle' dediğini gizler."
            }
            <br/><br/>
            <span style={{ color: 'white', fontWeight: 600 }}>{isEn ? "Philosophy: " : "Slogan: "}</span>"Humble Object Pattern"
          </p>
        </div>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem', color: '#f472b6', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <UserCheck size={24} /> Presenter
          </h3>
          <p style={{ lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            {isEn 
              ? "The Orchestrator bridge. Intercepts view actions (clicks), requests model data, formats domain models for presentation, and drives the passive view." 
              : "Orkestra şefi. View ve Model arasındaki köprüdür. View'dan olayları dinler (onClick gibi), Model'den veriyi alır, formatlar ve tekrar View'a geri gönderir."
            }
            <br/><br/>
            <span style={{ color: 'white', fontWeight: 600 }}>{isEn ? "Crucial Detail: " : "Farkı: "}</span>
            {isEn 
              ? "Commands View exclusively through an abstract interface, decoupling presentation logic from UI SDKs." 
              : "View'u bir 'Interface' üzerinden yönettiği için View implementation'ından bağımsızdır."
            }
          </p>
        </div>
      </div>

      <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--bg-dark)', borderRadius: '24px' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>
          {isEn ? "The Golden Law of MVP" : "MVP'nin Altın Kuralı"}
        </h3>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.2)' }}>
          <p style={{ fontSize: '1.1rem', color: '#e2e8f0', fontStyle: 'italic', textAlign: 'center' }}>
            {isEn 
              ? '"The View never talks to the Model. The Model never talks to the View. All communication must flow strictly through the Presenter."' 
              : '"View asla Model ile konuşmaz. Model asla View ile konuşmaz. Her şey Presenter üzerinden akmak zorundadır."'
            }
          </p>
        </div>
        <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <div style={{ padding: '0.5rem 1rem', background: 'rgba(52, 211, 153, 0.1)', borderRadius: '100px', color: '#34d399', fontSize: '0.9rem', fontWeight: 700 }}>Strict Separation</div>
          <div style={{ padding: '0.5rem 1rem', background: 'rgba(52, 211, 153, 0.1)', borderRadius: '100px', color: '#34d399', fontSize: '0.9rem', fontWeight: 700 }}>Interface-Driven</div>
        </div>
      </div>
    </motion.div>
  );
};

export default MVPConceptsTab;
