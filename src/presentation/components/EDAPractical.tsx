import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code, MessageSquare, Bell } from 'lucide-react';

const EDAPractical = () => {
  const practicalContent = {
    publish: {
      title: 'Event Publishing',
      desc: 'Bir işlem tamamlandığında dünyaya duyuru yapılır.',
      code: `// Sipariş Servisi (Publisher)
async function createOrder(data) {
  const order = await db.orders.save(data);
  
  // Olayı yayınla
  eventBus.publish("order.created", {
    orderId: order.id,
    amount: order.total,
    customerEmail: order.email
  });
  
  return order;
}`
    },
    consume: {
      title: 'Event Consuming',
      desc: 'İlgili olay gerçekleştiğinde başka bir servis devreye girer.',
      code: `// E-posta Servisi (Consumer)
eventBus.subscribe("order.created", async (event) => {
  // Sipariş oluştuğu an müşteriye mail at
  await emailService.send(
    event.customerEmail, 
    "Siparişiniz Alındı!"
  );
  console.log("Mail gönderildi!");
});`
    }
  };

  type ContentKey = keyof typeof practicalContent;
  const [activeTab, setActiveTab] = useState<ContentKey>('publish');

  return (
    <section style={{ padding: '100px 0' }}>
      <div className="container">
        <h2 className="section-title">Kod ile EDA</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
             {(Object.keys(practicalContent) as ContentKey[]).map((key) => {
               const item = practicalContent[key];
               return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className="glass-card"
                  style={{
                    textAlign: 'left',
                    borderLeft: activeTab === key ? '4px solid #a855f7' : '4px solid transparent',
                    background: activeTab === key ? 'rgba(168, 85, 247, 0.1)' : 'var(--glass)',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    {key === 'publish' ? <Bell size={18} color="#a855f7" /> : <MessageSquare size={18} color="#a855f7" />}
                    <h4 style={{ color: activeTab === key ? '#a855f7' : 'white' }}>{item.title}</h4>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{item.desc}</p>
                </button>
               );
             })}
             
             <div className="glass-card" style={{ marginTop: '2rem', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <Terminal size={18} color="#a855f7" />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Ölçeklenebilirlik</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Aynı olayı (order.created) 10 farklı servis (Stok, Kargo, Analitik, vb.) aynı anda dinleyebilir. 
                  Sipariş servisine dokunmadan yeni özellikler ekleyebilirsiniz!
                </p>
             </div>
          </div>

          <div className="glass-card" style={{ padding: 0, overflow: 'hidden', background: '#0a0a0f' }}>
            <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Code size={18} color="#a855f7" />
              <span style={{ fontSize: '0.85rem' }}>Uygulama Örneği</span>
            </div>
            <div style={{ padding: '2rem' }}>
              <AnimatePresence mode="wait">
                <motion.pre
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  style={{ color: '#e2e8f0', fontSize: '1rem', lineHeight: 1.6 }}
                >
                  <code>{practicalContent[activeTab].code}</code>
                </motion.pre>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EDAPractical;
