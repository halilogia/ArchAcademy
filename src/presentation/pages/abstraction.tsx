import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { 
  Layers, 
  Box, 
  Cpu, 
  HardDrive, 
  Network, 
  GitPullRequest,
  CreditCard,
  Bitcoin,
  Banknote,
  ShoppingCart,
  Code
} from 'lucide-react';

const AbstractionPage = () => {
  const [activeTab, setActiveTab] = useState<'simulation' | 'concept'>('concept');
  const [selectedProvider, setSelectedProvider] = useState<'stripe' | 'paypal' | 'crypto'>('stripe');
  const [log, setLog] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const processPayment = () => {
      setIsProcessing(true);
      setLog([]);
      
      // The Abstraction: processPayment(amount)
      // The Implementation: varies based on provider
      
      setTimeout(() => {
          let processingLog = [];
          if(selectedProvider === 'stripe') {
              processingLog.push("Connecting to Stripe API v2...");
              processingLog.push("Validating Card Token...");
              processingLog.push("Charge: $99.00 (Standard)");
          } else if(selectedProvider === 'paypal') {
              processingLog.push("Redirecting to PayPal...");
              processingLog.push("OAuth Token Exchange...");
              processingLog.push("Capture Transaction...");
          } else {
              processingLog.push("Connecting to Blockchain Node...");
              processingLog.push("Signing Transaction...");
              processingLog.push("Waiting for 3 Confirmations...");
          }
          setLog(processingLog);
          setIsProcessing(false);
      }, 1500);
  };

  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
       {/* High Level Interface */}
       <motion.div 
         animate={{ y: [0, -5, 0] }}
         transition={{ duration: 3, repeat: Infinity }}
         style={{ width: '200px', padding: '15px', background: '#a855f7', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 10px 30px rgba(168, 85, 247, 0.4)', zIndex: 10 }}
       >
           <Box color="white" size={24} />
           <span style={{ color: 'white', fontWeight: 800 }}>IPaymentService</span>
       </motion.div>
       
       {/* Separator / API Boundary */}
       <div style={{ width: '2px', height: '60px', background: 'rgba(255,255,255,0.2)', margin: '10px 0' }} />
       
       {/* Low Level Implementations */}
       <div style={{ display: 'flex', gap: '20px' }}>
           {[
               { icon: <CreditCard size={18} />, color: '#3b82f6', label: 'Stripe' }, // Blue
               { icon: <Banknote size={18} />, color: '#eab308', label: 'PayPal' }, // Yellow
               { icon: <Bitcoin size={18} />, color: '#f97316', label: 'Crypto' } // Orange
           ].map((item, i) => (
               <motion.div
                key={i}
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                style={{ width: '70px', height: '70px', background: 'var(--glass)', border: `1px solid ${item.color}`, borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
               >
                   <div style={{ color: item.color, marginBottom: '5px' }}>{item.icon}</div>
                   <div style={{ fontSize: '0.6rem', color: '#cbd5e1' }}>{item.label}</div>
               </motion.div>
           ))}
       </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}
    >
      <ArchHero 
        title="Abstraction"
        subtitle="in Architecture"
        description="'Karmaşıklığı yönetme sanatıdır.' Alt seviye detayları (Veritabanı, API, Donanım) gizleyerek, üst seviyede temiz ve anlaşılır bir iş mantığı kurmanızı sağlar."
        badge="Interface Segregation"
        color="#a855f7"
        illustration={illu}
        features={[
          { icon: <Layers />, title: 'Layering', desc: 'Uygulamayı katmanlara bölün. UI katmanı, SQL sorgusunu bilmemeli.' },
          { icon: <GitPullRequest />, title: 'Decoupling', desc: 'Bileşenler birbirine değil, arayüzlere (Interface) bağımlı olmalıdır.' },
          { icon: <Box />, title: 'Pluggability', desc: 'Soyutlama sayesinde veritabanını (MySQL -> Postgres) değiştirmek kodunuzu bozmaz.' }
        ]}
      >
           <div style={{ 
              marginTop: '2rem',
              padding: '6px', 
              background: 'rgba(15, 23, 42, 0.4)', 
              borderRadius: '24px', 
              border: '1px solid rgba(255,255,255,0.05)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              backdropFilter: 'blur(10px)'
            }}>
              {[
                { id: 'concept', label: 'Layers Concept', icon: <Layers size={18} /> },
                { id: 'simulation', label: 'Payment Demo', icon: <ShoppingCart size={18} /> }
              ].map((tab) => (
                 <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '18px',
                    border: 'none',
                    background: activeTab === tab.id ? '#a855f7' : 'transparent',
                    color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.5)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    transition: 'all 0.3s ease',
                    boxShadow: activeTab === tab.id ? '0 4px 12px rgba(168, 85, 247, 0.3)' : 'none'
                  }}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
      </ArchHero>

      <div className="container" style={{ marginTop: '2rem' }}>
          <AnimatePresence mode="wait">
             {activeTab === 'concept' && (
                  <motion.div key="concept" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
                          <div>
                              <h3 style={{ fontSize: '1.8rem', color: '#a855f7', marginBottom: '1.5rem' }}>The "Black Box" Theory</h3>
                              <p style={{ lineHeight: '1.7', color: '#cbd5e1', marginBottom: '1.5rem' }}>
                                  Araba kullanırken motorun içindeki pistonların nasıl hareket ettiğini bilmek zorunda değilsiniz. Sadece direksiyon, gaz ve fren (Arayüz/Interface) ile ilgilenirsiniz.
                              </p>
                              <p style={{ lineHeight: '1.7', color: '#cbd5e1' }}>
                                  Yazılımda da böyledir:
                                  <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                                      <li><strong>Kötü Soyutlama:</strong> `connectToMySQL_v5_Driver()` çağırmak. (Database değişirse kod patlar)</li>
                                      <li><strong>İyi Soyutlama:</strong> `database.save()` çağırmak. (Arkada ne olduğu önemsiz)</li>
                                  </ul>
                              </p>
                          </div>
                           <div className="glass-card" style={{ border: '1px solid #a855f7', background: 'rgba(168, 85, 247, 0.05)' }}>
                               <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>
                                   <Code color="white" />
                                   <h4 style={{ margin: 0, color: 'white' }}>Code Example</h4>
                               </div>
                               <div style={{ fontFamily: 'monospace', fontSize: '0.9rem', color: '#e2e8f0' }}>
                                   <div style={{ color: '#94a3b8' }}>// Abstraction (Interface)</div>
                                   <div style={{ color: '#a855f7' }}>interface DataSource {'{'}</div>
                                   <div style={{ paddingLeft: '20px' }}>function connect();</div>
                                   <div style={{ color: '#a855f7' }}>{'}'}</div>
                                   <br />
                                   <div style={{ color: '#94a3b8' }}>// Client Code</div>
                                   <div>
                                       const db: <span style={{ color: '#a855f7' }}>DataSource</span> = config.isDev ? 
                                       new <span style={{ color: '#eab308' }}>MockDb()</span> : 
                                       new <span style={{ color: '#3b82f6' }}>PostgresDb()</span>;
                                   </div>
                               </div>
                           </div>
                      </div>
                  </motion.div>
             )}

             {activeTab === 'simulation' && (
                  <motion.div key="simulation" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                      <div className="glass-card" style={{ padding: '2rem' }}>
                          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                              <h3 style={{ color: '#a855f7' }}>Payment Gateway Simulator</h3>
                              <p style={{ color: '#94a3b8' }}>Kullanıcı (Client), sadece "Ödeme Yap" butonunu bilir. Arkada hangi servisin çalıştığını bilmez (Abstraction).</p>
                          </div>

                          <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', alignItems: 'start' }}>
                              
                              {/* Configuration / Implementation Select */}
                              <div style={{ width: '250px' }}>
                                  <h4 style={{ color: 'white', marginBottom: '15px' }}>1. Select Implementation</h4>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                      {[
                                          { id: 'stripe', label: 'Stripe Adapter', icon: <CreditCard size={16} />, color: '#3b82f6' },
                                          { id: 'paypal', label: 'PayPal Adapter', icon: <Banknote size={16} />, color: '#eab308' },
                                          { id: 'crypto', label: 'Blockchain Adapter', icon: <Bitcoin size={16} />, color: '#f97316' }
                                      ].map((p) => (
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
                                                color: 'white'
                                            }}
                                          >
                                              <div style={{ color: p.color }}>{p.icon}</div>
                                              <div>{p.label}</div>
                                          </div>
                                      ))}
                                  </div>
                              </div>

                              {/* The Interface / Client */}
                              <div style={{ width: '300px', background: '#0f172a', padding: '20px', borderRadius: '16px', border: '1px solid #334155' }}>
                                   <h4 style={{ color: 'white', marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
                                       Client App <ShoppingCart size={18} color="#a855f7" />
                                   </h4>
                                   <div style={{ marginBottom: '20px', padding: '10px', background: '#1e293b', borderRadius: '8px' }}>
                                       <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1', fontSize: '0.9rem' }}>
                                           <span>Premium Plan</span>
                                           <span>$99.00</span>
                                       </div>
                                       <div style={{ marginTop: '10px', height: '1px', background: '#334155' }} />
                                       <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: 'white' }}>
                                           <span>Total</span>
                                           <span>$99.00</span>
                                       </div>
                                   </div>

                                   <button 
                                    onClick={processPayment}
                                    disabled={isProcessing}
                                    className="btn-bounce"
                                    style={{ 
                                        width: '100%', 
                                        padding: '12px', 
                                        background: '#a855f7', 
                                        color: 'white', 
                                        border: 'none', 
                                        borderRadius: '8px', 
                                        fontWeight: 'bold', 
                                        cursor: isProcessing ? 'default' : 'pointer',
                                        opacity: isProcessing ? 0.7 : 1
                                    }}
                                   >
                                       {isProcessing ? 'Processing via Interface...' : 'Pay Now (IPayment)'}
                                   </button>
                                   
                                   <div style={{ marginTop: '20px', fontSize: '0.75rem', color: '#64748b', textAlign: 'center' }}>
                                       Calling: <code style={{ color: '#a855f7' }}>paymentService.charge(99)</code>
                                   </div>
                              </div>

                              {/* Console Output */}
                              <div style={{ width: '250px', background: '#020617', borderRadius: '12px', border: '1px solid #1e293b', padding: '15px' }}>
                                  <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#94a3b8', marginBottom: '10px' }}>System Logs (Console)</div>
                                  <div style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: '#10b981', minHeight: '150px' }}>
                                      {log.map((l, i) => (
                                          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ marginBottom: '5px' }}>
                                              &gt; {l}
                                          </motion.div>
                                      ))}
                                      {log.length === 0 && !isProcessing && <span style={{ color: '#475569' }}>// Waiting for transaction...</span>}
                                  </div>
                              </div>

                          </div>
                      </div>
                  </motion.div>
             )}
          </AnimatePresence>
      </div>

    </motion.div>
  );
};

export default AbstractionPage;
