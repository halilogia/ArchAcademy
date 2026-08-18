import React from 'react';
import { motion } from 'framer-motion';
import { Map, Layout, Box } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const MVVMCConceptsTab: React.FC = () => {
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
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem', color: '#3b82f6', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Map size={24} /> AppCoordinator
          </h3>
          <p style={{ lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            {isEn 
              ? "The top-level Root Coordinator. Upon boot, inspects session authentication state and routes users into either AuthCoordinator or MainTabCoordinator." 
              : "Uygulamanın ana giriş noktasıdır (Root). Uygulama açıldığında kullanıcının oturum açıp açmadığını kontrol eder ve ya AuthCoordinator'a ya da MainCoordinator'a yönlendirir."
            }
          </p>
        </div>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem', color: '#60a5fa', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Layout size={24} /> View Delegate / Callback
          </h3>
          <p style={{ lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            {isEn 
              ? "Views and ViewModels talk upward to Coordinators exclusively through lightweight delegates or closures, preserving zero downstream awareness:" 
              : "View (veya ViewModel), Coordinator ile bir 'Delegate' veya 'Closure' (Callback) aracılığıyla konuşur:"
            }
            <br/><br/>
            <code style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '4px 8px', borderRadius: '4px' }}>viewModel.onLoginSuccess = &#123; coordinator.goToHome() &#125;</code>
          </p>
        </div>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem', color: '#93c5fd', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Box size={24} /> Dependency Injection & Factory
          </h3>
          <p style={{ lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            {isEn 
              ? "Coordinators serve as screen factories, instantiating the target View, configuring its ViewModel, injecting API clients, and pushing to the view stack." 
              : "Coordinator'lar aynı zamanda birer 'Factory' gibi çalışır. Gidilecek yeni ekranın ViewModel'ini ve servislerini oluşturup ekrana enjekte ederler."
            }
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ marginTop: '3rem', borderLeft: '4px solid #3b82f6' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem', color: 'white' }}>
          {isEn ? "Example Scenario: E-Commerce Purchase Flow" : "Örnek Senaryo: Satın Alma Akışı"}
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ background: '#3b82f6', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 800 }}>1</span>
            <span style={{ color: 'var(--text-secondary)' }}>
              {isEn ? 'User clicks "Checkout" inside the shopping cart screen.' : 'Kullanıcı "Sepeti Onayla" butonuna basar.'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ background: '#3b82f6', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 800 }}>2</span>
            <span style={{ color: 'var(--text-secondary)' }}>
              {isEn ? 'CheckoutViewModel fires a callback: ' : 'CheckoutViewModel bir event fırlatır: '}<code>onProceedToPayment()</code>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ background: '#3b82f6', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 800 }}>3</span>
            <span style={{ color: 'var(--text-secondary)' }}>
              {isEn ? 'CartCoordinator intercepts the callback and launches a child PaymentCoordinator.' : 'CartCoordinator bu eventi dinler ve PaymentCoordinator\'ı başlatır.'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ background: '#3b82f6', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 800 }}>4</span>
            <span style={{ color: 'var(--text-secondary)' }}>
              {isEn 
                ? 'Upon payment authorization, PaymentCoordinator completes and CartCoordinator routes user to OrderSuccess.' 
                : 'Ödeme başarılı olduğunda PaymentCoordinator sonlanır ve CartCoordinator kullanıcıyı "Sipariş Başarılı" ekranına yönlendirir.'
              }
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MVVMCConceptsTab;
