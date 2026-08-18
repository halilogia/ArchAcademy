import React from 'react';
import { motion } from 'framer-motion';
import { Database, ShieldCheck, AlertOctagon, CheckCircle2, Box } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const AnemicVsRichDomainTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div key="domainmodels" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          {isEn ? "Anemic Domain Model vs Rich Domain Model" : "Anemik (Kansız) Model vs Zengin (Rich) Domain Modeli"}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '800px' }}>
          {isEn 
            ? "Martin Fowler identified Anemic Domain Models as a classic anti-pattern: Objects that are merely bags of getters and setters with zero business logic, violating object-oriented encapsulation." 
            : "Martin Fowler'ın tanımladığı Anemik Domain Modeli bir anti-pattern'dir: Sadece getter ve setter barındıran, hiçbir iş kuralı içermeyen düz veri torbaları nesne yönelimli felsefeye (Tell, Don't Ask) aykırıdır."
          }
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          {/* Anemic */}
          <div style={{ background: '#020617', padding: '1.75rem', borderRadius: '16px', border: '1px solid rgba(239, 68, 68, 0.3)', borderTop: '4px solid #ef4444' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ color: '#ef4444', fontWeight: 800, fontSize: '1.1rem' }}>
                {isEn ? "❌ Anemic Model (Data Bag)" : "❌ Anemik Model (Veri Çantası)"}
              </h4>
              <span style={{ fontSize: '0.75rem', fontWeight: 900, background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', padding: '3px 8px', borderRadius: '6px' }}>
                Anti-Pattern
              </span>
            </div>
            <pre style={{ background: '#090d16', padding: '1rem', borderRadius: '8px', border: '1px solid #1e293b', color: '#f87171', fontFamily: 'monospace', fontSize: '0.8rem', marginBottom: '1rem', overflowX: 'auto' }}>
{`// Nesne sadece veri taşır, kural koruyamaz
class Order {
  public id: string;
  public total: number;
  public status: string;
  // Dışarıdan herkes 'status = "COMPLETED"' yapabilir!
}`}
            </pre>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
              {isEn ? "Business logic leaks into service classes, breaking Tell-Don't-Ask and Encapsulation." : "İş kuralları servis katmanlarına saçılır, nesnenin kendi tutarlılığı bozulur."}
            </p>
          </div>

          {/* Rich Domain */}
          <div style={{ background: '#020617', padding: '1.75rem', borderRadius: '16px', border: '1px solid rgba(34, 197, 94, 0.3)', borderTop: '4px solid #22c55e' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ color: '#22c55e', fontWeight: 800, fontSize: '1.1rem' }}>
                {isEn ? "✅ Rich Domain Model (Self-Guarding)" : "✅ Zengin Domain Modeli (DDD Varlığı)"}
              </h4>
              <span style={{ fontSize: '0.75rem', fontWeight: 900, background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '3px 8px', borderRadius: '6px' }}>
                Encapsulated & DDD
              </span>
            </div>
            <pre style={{ background: '#090d16', padding: '1rem', borderRadius: '8px', border: '1px solid #1e293b', color: '#4ade80', fontFamily: 'monospace', fontSize: '0.8rem', marginBottom: '1rem', overflowX: 'auto' }}>
{`class Order {
  private status: OrderStatus = 'PENDING';

  public completePayment(paymentId: string) {
    if (this.status !== 'PENDING') {
      throw new DomainException("Already paid!");
    }
    this.status = 'PAID';
    this.addDomainEvent(new OrderPaidEvent(this.id));
  }
}`}
            </pre>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
              {isEn ? "Data and behavior are co-located. Business invariants are strictly protected." : "Veri ve davranış aynı yerdedir. İş kuralları (invariants) dışarıya kapalıdır."}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AnemicVsRichDomainTab;
