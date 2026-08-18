import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Navigation, Box, Cpu, Map, Route, Share2, Milestone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const MVVMCComparisonTab: React.FC = () => {
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
        {isEn ? "The Missing Piece: " : "Eksik Parça: "}
        <span className="gradient-text" style={{ backgroundImage: 'linear-gradient(to right, #3b82f6, #60a5fa)' }}>
          {isEn ? "Navigation Routing" : "Navigasyon"}
        </span>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'stretch' }}>
        {/* Standard MVVM CARD */}
        <div className="glass-card" style={{ borderTop: '4px solid #94a3b8', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.1 }}>
            <Layout size={150} color="#94a3b8" />
          </div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.5rem', color: '#94a3b8' }}>Standard MVVM</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            {isEn ? "Navigation = Spaghetti Tight Coupling" : "Navigasyon = Spagetti Bağımlılık"}
          </p>
          
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <li style={{ display: 'flex', gap: '12px' }}>
              <Navigation size={20} color="#94a3b8" />
              <div>
                <strong style={{ color: 'white' }}>{isEn ? "Logic in View:" : "View'da Logic:"}</strong> {isEn ? "Push/modal code lives directly in View components, forcing views to import destination modules." : "'Butona basınca B sayfasına git' kodu genellikle View içinde yazılır. View diğer sayfayı import etmek zorunda kalır."}
              </div>
            </li>
            <li style={{ display: 'flex', gap: '12px' }}>
              <Box size={20} color="#94a3b8" />
              <div>
                <strong style={{ color: 'white' }}>{isEn ? "Tight Coupling:" : "Sıkı Bağımlılık:"}</strong> {isEn ? "Login screen must know the Home screen, making independent reuse impossible." : "Login ekranı Home ekranını bilmek zorundadır. Bu, ekranları tek başına kullanmayı imkansız kılar."}
              </div>
            </li>
            <li style={{ display: 'flex', gap: '12px' }}>
              <Cpu size={20} color="#94a3b8" />
              <div>
                <strong style={{ color: 'white' }}>{isEn ? "ViewModel Polluted with Routers:" : "ViewModel Router'ı Bilir:"}</strong> {isEn ? "If logic moves to VM, navigation frameworks must be mocked in unit tests." : "Eğer logic VM'de ise, VM içine Router servisi inject edilmelidir."}
              </div>
            </li>
          </ul>
        </div>

        {/* VS Badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#0f172a', border: '1px solid var(--glass-border)', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.2rem', color: 'white', zIndex: 10 }}>VS</div>
        </div>

        {/* MVVM-C CARD */}
        <div className="glass-card" style={{ borderTop: '4px solid #3b82f6', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.1 }}>
            <Map size={150} color="#3b82f6" />
          </div>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.5rem', color: '#3b82f6' }}>MVVM-C</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            {isEn ? "+ Dedicated Coordinator Pattern" : "+ Coordinator Katmanı"}
          </p>
          
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <li style={{ display: 'flex', gap: '12px' }}>
              <Route size={20} color="#3b82f6" />
              <div>
                <strong style={{ color: 'white' }}>{isEn ? "Centralized Flow:" : "Merkezi Akış:"}</strong> {isEn ? "Neither View nor ViewModel knows what screen follows next. The Coordinator commands transitions." : "'Login başarılı olunca nereye gidilecek?' bilgisini ne View ne de ViewModel bilir. Coordinator bilir."}
              </div>
            </li>
            <li style={{ display: 'flex', gap: '12px' }}>
              <Share2 size={20} color="#3b82f6" />
              <div>
                <strong style={{ color: 'white' }}>{isEn ? "Total Reuse:" : "Yeniden Kullanım:"}</strong> {isEn ? "Embed the same Login form into Onboarding, Settings, or Checkout flows effortlessly." : "Login ekranını 'Ayarlar' içinde de, 'Sepet' içinde de kullanabilirsin. Çünkü nereye gideceğine Coordinator karar verir."}
              </div>
            </li>
            <li style={{ display: 'flex', gap: '12px' }}>
              <Box size={20} color="#3b82f6" />
              <div>
                <strong style={{ color: 'white' }}>{isEn ? "Seamless Deep Linking:" : "Deep Linking:"}</strong> {isEn ? "Reconstruct hierarchical multi-step navigation states from deep URLs." : "Uygulamanın herhangi bir yerine dışarıdan (URL ile) gitmek çok kolaylaşır."}
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <div style={{ marginTop: '4rem', background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--glass-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', justifyContent: 'center' }}>
          <Milestone color="#3b82f6" size={28} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>
            {isEn ? "The Principle of the Coordinator" : "Coordinator'ın Gücü"}
          </h3>
        </div>
        <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2rem auto', color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          {isEn 
            ? '"When a screen completes its job, that screen should not decide which screen opens next. That decision belongs to a higher authority (The Coordinator)." — Soroush Khanlou' 
            : '"Bir ekranın işi bittiğinde, sıradaki ekranın ne olacağına o ekran karar vermemelidir. Bu karar daha üst bir otoriteye (Coordinator) aittir." — Soroush Khanlou (The Coordinator Pattern Creator)'
          }
        </p>
      </div>

      {/* GOOGLE PERSPECTIVE */}
      <div style={{ marginTop: '4rem', borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '4rem' }}>
        <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '2rem', textAlign: 'center' }}>
          {isEn ? "Why Modern Frameworks Often Skip It: " : "Peki Google & Modern Frameworkler Neden "}
          <span className="gradient-text" style={{ backgroundImage: 'linear-gradient(to right, #ef4444, #f59e0b)' }}>
            {isEn ? "The Trade-offs" : "Önermiyor?"}
          </span>
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="glass-card" style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <h4 style={{ color: '#ef4444', marginBottom: '1rem', fontWeight: 800, fontSize: '1.1rem' }}>
              1. Declarative vs Imperative
            </h4>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>
              {isEn 
                ? "Flutter, React, and SwiftUI are declarative frameworks where UI is a function of state. Coordinators were born for imperative UIKit/iOS view controllers. State-driven routers fit declarative UI more naturally." 
                : "Flutter, React ve SwiftUI 'Declarative' (Bildirimsel) yapıdadır. UI state'in bir sonucudur. Coordinator ise iOS/UIKit gibi 'Imperative' (Emirsel) dünyalar için doğmuştur."
              }
            </p>
          </div>
          
          <div className="glass-card" style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
            <h4 style={{ color: '#f59e0b', marginBottom: '1rem', fontWeight: 800, fontSize: '1.1rem' }}>
              2. Modern Routers are Sufficient
            </h4>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>
              {isEn 
                ? "Modern tools like go_router or React Router already centralize routing and deep linking with minimal boilerplate without full coordinator delegates." 
                : "go_router, auto_route veya React Router gibi modern çözümler zaten navigasyonu merkezileştirir ve Deep Linking sorununu çözer."
              }
            </p>
          </div>

          <div className="glass-card" style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <h4 style={{ color: '#10b981', marginBottom: '1rem', fontWeight: 800, fontSize: '1.1rem' }}>
              3. The KISS Principle
            </h4>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)' }}>
              {isEn 
                ? "Unless building multi-modular apps with hundreds of independent engineers (Uber, Spotify), full Coordinator trees introduce unnecessary indirection." 
                : "Google, Spotify/Uber gibi yüzlerce modülden oluşan devasa bir uygulamanız yoksa, Coordinator'ın 'Over-Engineering' olduğunu savunur. Basit tutun."
              }
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MVVMCComparisonTab;
