import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Inbox } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const BrokerComparisonTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div
      key="comparison"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.5fr', gap: '3rem', alignItems: 'center' }}>
        <div className="glass-card" style={{ borderLeft: '4px solid #ef4444' }}>
          <h3 style={{ fontSize: '1.4rem', color: '#ef4444', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ArrowRight /> {isEn ? "Direct Request (REST/RPC Synchronous)" : "Direct Request (REST/RPC)"}
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            {isEn 
              ? "The Order Service makes a blocking synchronous call to the Email Service: 'Send this confirmation email now!'." 
              : "Sipariş servisi, E-posta servisine 'Maili gönder!' diye bağırır (Senkron)."
            }
          </p>
          <ul style={{ paddingLeft: '1.5rem', color: '#94a3b8', lineHeight: 2 }}>
            <li>❌ <strong>Temporal Coupling:</strong> {isEn ? "If the email provider is sluggish, the customer's checkout is blocked." : "E-posta servisi o an meşgulse sipariş de bekler."}</li>
            <li>❌ <strong>Fragility:</strong> {isEn ? "If the mail worker crashes, the entire checkout transaction fails." : "Mail servisi çökerse sipariş işlemi de hata verir."}</li>
            <li>❌ <strong>No Buffer:</strong> {isEn ? "Black Friday traffic spikes trigger cascading 504 timeouts." : "Ani yük artışında sistem kilitlenir."}</li>
          </ul>
        </div>

        <div className="glass-card" style={{ borderLeft: '4px solid #eab308' }}>
          <h3 style={{ fontSize: '1.4rem', color: '#eab308', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Inbox /> {isEn ? "Broker Pattern (Asynchronous Queue)" : "Broker Pattern (Async)"}
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            {isEn 
              ? "The Order Service drops an 'OrderPlaced' event into the Message Broker and immediately returns 200 OK." 
              : "Sipariş servisi 'Mail gönderilecek' notunu Broker'a bırakır ve işine döner."
            }
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: 'rgba(234, 179, 8, 0.1)', padding: '1rem', borderRadius: '12px' }}>
              <h4 style={{ color: '#eab308', fontSize: '1rem', marginBottom: '5px' }}>Fire & Forget</h4>
              <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                {isEn 
                  ? "Publishers do not wait for downstream processing, providing instant UI responsiveness." 
                  : "Gönderici cevabı beklemez. Sistem çok daha hızlı (Responsive) hale gelir."
                }
              </p>
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '12px' }}>
              <h4 style={{ color: '#10b981', fontSize: '1rem', marginBottom: '5px' }}>Throttling & Backpressure</h4>
              <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                {isEn 
                  ? "Even with 50,000 requests/sec, workers pull batches at their optimal throughput rate." 
                  : "Binlerce sipariş gelse de işçiler (consumers) kendi hızında (tane tane) işler."
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BrokerComparisonTab;
