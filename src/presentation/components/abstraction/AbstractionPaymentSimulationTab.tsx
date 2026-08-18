import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Banknote, Bitcoin, ShoppingCart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const AbstractionPaymentSimulationTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const [selectedProvider, setSelectedProvider] = useState<'stripe' | 'paypal' | 'crypto'>('stripe');
  const [log, setLog] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const processPayment = () => {
    setIsProcessing(true);
    setLog([]);
    
    setTimeout(() => {
      let processingLog = [];
      if (selectedProvider === 'stripe') {
        processingLog.push("Connecting to Stripe API v2...");
        processingLog.push("Validating Card Token...");
        processingLog.push("Charge: $99.00 (Standard Settlement)");
      } else if (selectedProvider === 'paypal') {
        processingLog.push("Redirecting to PayPal Gateway...");
        processingLog.push("OAuth 2.0 Bearer Exchange...");
        processingLog.push("Capture Transaction: $99.00");
      } else {
        processingLog.push("Connecting to Blockchain Node (RPC)...");
        processingLog.push("Signing Transaction Hash...");
        processingLog.push("Waiting for 3 Network Confirmations...");
      }
      setLog(processingLog);
      setIsProcessing(false);
    }, 1500);
  };

  const providers = [
    { id: 'stripe', label: 'Stripe Adapter', icon: <CreditCard size={16} />, color: '#3b82f6' },
    { id: 'paypal', label: 'PayPal Adapter', icon: <Banknote size={16} />, color: '#eab308' },
    { id: 'crypto', label: 'Blockchain Adapter', icon: <Bitcoin size={16} />, color: '#f97316' }
  ];

  return (
    <motion.div key="simulation" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="glass-card" style={{ padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h3 style={{ color: '#a855f7', fontSize: '1.8rem', fontWeight: 800 }}>
            {isEn ? "Payment Gateway Adapter Simulator" : "Ödeme Ağ Geçidi Simülatörü"}
          </h3>
          <p style={{ color: '#94a3b8' }}>
            {isEn 
              ? "The Client UI component only knows the 'IPaymentService.charge()' abstraction contract. It is totally agnostic of whether Stripe, PayPal, or Crypto handles the wire."
              : "Kullanıcı (Client), sadece 'Ödeme Yap' butonunu bilir. Arkada hangi servisin çalıştığını bilmez (Abstraction)."
            }
          </p>
        </div>

        <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', alignItems: 'start', flexWrap: 'wrap' }}>
          {/* 1. Configuration Select */}
          <div style={{ width: '260px' }}>
            <h4 style={{ color: 'white', marginBottom: '15px', fontWeight: 700 }}>
              {isEn ? "1. Select Concrete Adapter" : "1. Somut Adaptör Seçin"}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {providers.map((p) => (
                <div 
                  key={p.id}
                  onClick={() => setSelectedProvider(p.id as any)}
                  style={{ 
                    padding: '12px', 
                    borderRadius: '8px', 
                    background: selectedProvider === p.id ? 'rgba(255,255,255,0.1)' : 'transparent', 
                    border: `1px solid ${selectedProvider === p.id ? p.color : 'rgba(255,255,255,0.1)'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: 'white',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ color: p.color }}>{p.icon}</div>
                  <div style={{ fontWeight: selectedProvider === p.id ? 700 : 400 }}>{p.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Client Checkout UI */}
          <div style={{ width: '300px', background: '#0f172a', padding: '20px', borderRadius: '16px', border: '1px solid #334155' }}>
            <h4 style={{ color: 'white', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{isEn ? "Client App" : "İstemci Arayüzü"}</span>
              <ShoppingCart size={18} color="#a855f7" />
            </h4>
            <div style={{ marginBottom: '20px', padding: '10px', background: '#1e293b', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', fontSize: '0.9rem' }}>
                <span>{isEn ? "Enterprise License" : "Premium Lisans"}</span>
                <span>$99.00</span>
              </div>
              <div style={{ marginTop: '10px', height: '1px', background: '#334155' }} />
              <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: 'white' }}>
                <span>{isEn ? "Total Amount" : "Toplam Tutar"}</span>
                <span>$99.00</span>
              </div>
            </div>

            <button 
              onClick={processPayment}
              disabled={isProcessing}
              style={{ 
                width: '100%', 
                padding: '12px', 
                background: '#a855f7', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px', 
                fontWeight: 'bold', 
                cursor: isProcessing ? 'default' : 'pointer',
                opacity: isProcessing ? 0.7 : 1,
                transition: 'all 0.2s'
              }}
            >
              {isProcessing 
                ? (isEn ? 'Processing via Contract...' : 'Sözleşme Üzerinden İşleniyor...') 
                : (isEn ? 'Pay Now (IPaymentService)' : 'Ödeme Yap (IPaymentService)')
              }
            </button>
            
            <div style={{ marginTop: '20px', fontSize: '0.75rem', color: '#64748b', textAlign: 'center' }}>
              {isEn ? "Calling: " : "Tetiklenen Kod: "}
              <code style={{ color: '#a855f7' }}>paymentService.charge(99)</code>
            </div>
          </div>

          {/* 3. Output Log */}
          <div style={{ width: '280px', background: '#020617', borderRadius: '12px', border: '1px solid #1e293b', padding: '15px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '10px' }}>
              {isEn ? "Console Logs (Runtime)" : "Sistem Logları (Konsol)"}
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#10b981', minHeight: '150px' }}>
              {log.map((l, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ marginBottom: '5px' }}>
                  &gt; {l}
                </motion.div>
              ))}
              {log.length === 0 && !isProcessing && (
                <span style={{ color: '#475569' }}>
                  {isEn ? "// Waiting for transaction trigger..." : "// İşlem bekleniyor..."}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AbstractionPaymentSimulationTab;
