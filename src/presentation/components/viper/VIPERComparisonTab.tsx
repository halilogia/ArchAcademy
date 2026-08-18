import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Layout, Box, ArrowRight, Zap, Share2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const VIPERComparisonTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div
      key="comparison"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2 className="section-title text-center" style={{ marginBottom: '3rem' }}>
        {isEn ? "The Boilerplate Wars: " : "Boilerplate Savaşları: "}
        <span className="gradient-text" style={{ backgroundImage: 'linear-gradient(to right, #10b981, #3b82f6)' }}>
          VIPER vs MVVM
        </span>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'stretch' }}>
        {/* VIPER CARD */}
        <div className="glass-card" style={{ borderTop: '4px solid #10b981', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.1 }}>
            <ShieldAlert size={150} color="#10b981" />
          </div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.5rem', color: '#10b981' }}>VIPER</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Extreme Separation of Concerns</p>
          
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <li style={{ display: 'flex', gap: '12px' }}>
              <Box size={20} color="#10b981" />
              <div>
                <strong style={{ color: 'white' }}>{isEn ? "5 Rigid Layers:" : "5 Katman:"}</strong> {isEn ? "View, Interactor, Presenter, Entity, Router. Every layer is governed by explicit protocol contracts." : "View, Interactor, Presenter, Entity, Router. Her şey parçalanmıştır."}
              </div>
            </li>
            <li style={{ display: 'flex', gap: '12px' }}>
              <ArrowRight size={20} color="#10b981" />
              <div>
                <strong style={{ color: 'white' }}>{isEn ? "Strict Unidirectional Flow:" : "Tek Yönlü Akış:"}</strong> {isEn ? "View → Presenter → Interactor → Presenter → View. Circular references and cross-layer leaks are prohibited." : "View → Presenter → Interactor → Presenter → View. Döngüsel bağımlılık yasaktır."}
              </div>
            </li>
            <li style={{ display: 'flex', gap: '12px' }}>
              <Zap size={20} color="#10b981" />
              <div>
                <strong style={{ color: 'white' }}>{isEn ? "Code Generation Needed:" : "Kod Üretimi:"}</strong> {isEn ? "Creating 6+ boilerplate files per screen typically demands Xcode/CLI code generators." : "O kadar çok dosya gerekir ki (Module), genellikle kod üreten araçlar (Generators) kullanılır."}
              </div>
            </li>
          </ul>
        </div>

        {/* VS Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#0f172a', border: '1px solid var(--glass-border)', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.2rem', color: 'white', zIndex: 10 }}>VS</div>
        </div>

        {/* MVVM CARD */}
        <div className="glass-card" style={{ borderTop: '4px solid #3b82f6', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.1 }}>
            <Layout size={150} color="#3b82f6" />
          </div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.5rem', color: '#3b82f6' }}>MVVM</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Practical & Reactive</p>
          
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <li style={{ display: 'flex', gap: '12px' }}>
              <Box size={20} color="#3b82f6" />
              <div>
                <strong style={{ color: 'white' }}>{isEn ? "3 Practical Layers:" : "3 Katman:"}</strong> {isEn ? "Model, View, ViewModel. Minimal boilerplate and swift feature turnaround." : "Model, View, ViewModel. Daha az dosya, daha hızlı başlangıç."}
              </div>
            </li>
            <li style={{ display: 'flex', gap: '12px' }}>
              <Zap size={20} color="#3b82f6" />
              <div>
                <strong style={{ color: 'white' }}>{isEn ? "Data Binding:" : "Binding:"}</strong> {isEn ? "Declarative state observers automatically re-render view trees without presenter callbacks." : "Data Binding sayesinde kod yazmadan UI güncelleme şansı."}
              </div>
            </li>
            <li style={{ display: 'flex', gap: '12px' }}>
              <Share2 size={20} color="#3b82f6" />
              <div>
                <strong style={{ color: 'white' }}>{isEn ? "Developer Ergonomics:" : "Esneklik:"}</strong> {isEn ? "Flexible boundary allocation, significantly lower learning curve for incoming engineers." : "Logic bazen ViewModel'de bazen Model'de olabilir, kurallar VIPER kadar katı değildir."}
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <div style={{ marginTop: '4rem', background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
        <p style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
          {isEn 
            ? "VIPER excels at hyper-scale iOS engineering organizations (e.g. Uber, SoundCloud) to eliminate Git merge conflicts across 100+ mobile developers. For small to medium apps, it is often catastrophic over-engineering." 
            : "VIPER, Uber ve SoundCloud gibi devasa ekiplerin çalıştığı projelerde çakışmaları (merge conflicts) önlemek için harikadır. Ancak küçük ekipli projeler için tam bir zaman kaybı (Overkill) olabilir."
          }
        </p>
      </div>

      {/* GOOGLE PERSPECTIVE */}
      <div style={{ marginTop: '4rem', borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '4rem' }}>
        <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '2rem', textAlign: 'center' }}>
          {isEn ? "Why Modern Frameworks Standardize on " : "Google & Modern Ekosistem Neden "}
          <span className="gradient-text" style={{ backgroundImage: 'linear-gradient(to right, #3b82f6, #60a5fa)' }}>
            {isEn ? "MVVM?" : "MVVM'i Öneriyor?"}
          </span>
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="glass-card" style={{ background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
            <h4 style={{ color: '#60a5fa', marginBottom: '1rem', fontWeight: 800, fontSize: '1.1rem' }}>
              1. Reactive State Frameworks
            </h4>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>
              {isEn 
                ? "Jetpack Compose, SwiftUI, and Flutter are fundamentally reactive. The UI automatically renders as a function of Observable State. VIPER's imperative 'Presenter instructs View' commands conflict with state-driven rendering." 
                : "Android (Jetpack Compose) ve Flutter, doğaları gereği 'Reactive' yapıdadır. View, State'i dinler ve kendini günceller. VIPER'daki emir-komuta zinciri bu modern yapıya ters düşer."
              }
            </p>
          </div>
          
          <div className="glass-card" style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <h4 style={{ color: '#10b981', marginBottom: '1rem', fontWeight: 800, fontSize: '1.1rem' }}>
              2. Lifecycle-Aware ViewModel
            </h4>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>
              {isEn 
                ? "Android's Architecture ViewModel automatically survives configuration changes (device rotation, process reclamation). Managing Presenter lifecycle manually in VIPER is notoriously bug-prone." 
                : "Google'ın ViewModel sınıfı, konfigürasyon değişikliklerini (ekran döndürme vb.) otomatik yönetir. VIPER'da Presenter'ın yaşam döngüsünü elle yönetmek oldukça zordur."
              }
            </p>
          </div>

          <div className="glass-card" style={{ background: 'rgba(249, 115, 22, 0.05)', border: '1px solid rgba(249, 115, 22, 0.2)' }}>
            <h4 style={{ color: '#fb923c', marginBottom: '1rem', fontWeight: 800, fontSize: '1.1rem' }}>
              3. Onboarding & Velocity
            </h4>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>
              {isEn 
                ? "Onboarding junior and mid-level developers into a massive VIPER protocol web takes months. MVVM is universally intuitive across all mobile technologies." 
                : "Yeni bir geliştiricinin VIPER ile yazılmış bir projeye adapte olması aylar alabilirken, MVVM evrensel ve anlaşılırdır."
              }
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VIPERComparisonTab;
