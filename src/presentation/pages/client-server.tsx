import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { 
  Server, 
  Smartphone, 
  Database, 
  Globe, 
  ArrowLeftRight, 
  ShieldCheck, 
  Activity, 
  Layers,
  Monitor,
  Wifi
} from 'lucide-react';

const ClientServerPage = () => {
  const [activeTab, setActiveTab] = useState<'simulation' | 'comparison'>('comparison');
  const [requestStatus, setRequestStatus] = useState<'IDLE' | 'SENDING' | 'PROCESSING' | 'RECEIVING'>('IDLE');
  const [serverLoad, setServerLoad] = useState(0);

  const simulateRequest = () => {
    if (requestStatus !== 'IDLE') return;

    setRequestStatus('SENDING');
    
    // Server load spikes
    setTimeout(() => {
        setServerLoad(prev => Math.min(100, prev + 20));
        setRequestStatus('PROCESSING');
    }, 1000);

    // Response returns
    setTimeout(() => {
        setServerLoad(prev => Math.max(0, prev - 20));
        setRequestStatus('RECEIVING');
    }, 2500);

    // Idle
    setTimeout(() => {
        setRequestStatus('IDLE');
    }, 3500);
  };

  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Client Device */}
      <motion.div
        animate={{ x: requestStatus === 'SENDING' ? 10 : 0 }}
        style={{ 
            position: 'absolute', 
            left: 20, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            zIndex: 10
        }}
      >
          <div style={{ width: '60px', height: '100px', background: '#334155', borderRadius: '12px', border: '2px solid #94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Smartphone size={32} color="white" />
          </div>
          <span style={{ fontSize: '0.8rem', marginTop: '10px', fontWeight: 700 }}>CLIENT</span>
      </motion.div>

      {/* Server */}
      <motion.div
        animate={{ scale: requestStatus === 'PROCESSING' ? 1.1 : 1 }}
        style={{ 
            position: 'absolute', 
            right: 20, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            zIndex: 10
        }}
      >
          <div style={{ width: '80px', height: '120px', background: '#0f172a', borderRadius: '4px', border: '2px solid #3b82f6', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px', paddingTop: '10px', boxShadow: requestStatus === 'PROCESSING' ? '0 0 30px #3b82f6' : 'none' }}>
              <div style={{ width: '60px', height: '6px', background: '#3b82f6', borderRadius: '2px' }} />
              <div style={{ width: '60px', height: '6px', background: '#3b82f6', borderRadius: '2px' }} />
              <div style={{ width: '60px', height: '6px', background: '#3b82f6', borderRadius: '2px' }} />
              <div style={{ marginTop: 'auto', marginBottom: '10px' }}>
                  <Server size={24} color="#3b82f6" />
              </div>
          </div>
          <span style={{ fontSize: '0.8rem', marginTop: '10px', fontWeight: 700 }}>SERVER</span>
      </motion.div>

      {/* Connection Line */}
      <svg style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'visible' }}>
          <line x1="80" y1="150" x2="270" y2="150" stroke="#475569" strokeWidth="2" strokeDasharray="5,5" />
          
          {/* Request Packet */}
          {requestStatus === 'SENDING' && (
              <motion.circle 
                cx="80" cy="150" r="6" fill="#10b981"
                animate={{ cx: 270 }}
                transition={{ duration: 1, ease: "linear" }}
              />
          )}

          {/* Response Packet */}
          {requestStatus === 'RECEIVING' && (
               <motion.circle 
                cx="270" cy="150" r="6" fill="#3b82f6"
                animate={{ cx: 80 }}
                transition={{ duration: 1, ease: "linear" }}
              />
          )}
      </svg>
      
      {/* Cloud Icon in middle */}
      <div style={{ position: 'absolute', background: '#020617', padding: '10px' }}>
          <Globe size={32} color="#64748b" />
      </div>

    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="Client - Server"
        subtitle="Foundational Architecture"
        description="Web'in atası ve omurgası. Bir taraf ister (Request), diğer taraf hizmet eder (Response). Modern web'in en temel yapı taşı."
        badge="Request / Response"
        color="#3b82f6"
        illustration={illu}
        features={[
          { icon: <Monitor />, title: 'Centralized Control', desc: 'Veri ve iş mantığı sunucuda güvenle saklanır, istemci sadece görüntüler.' },
          { icon: <ArrowLeftRight />, title: 'Request Driven', desc: 'İletişim her zaman istemcinin talebiyle başlar, sunucu pasiftir.' },
          { icon: <ShieldCheck />, title: 'Security', desc: 'Hassas işlemler sunucu tarafında yapılarak istemci manipülasyonu engellenir.' }
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
            { id: 'comparison', label: 'Architecture Analysis', icon: <Layers size={18} /> },
            { id: 'simulation', label: 'HTTP Simulator', icon: <Activity size={18} /> }
          ].map((tab) => (
             <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 24px',
                borderRadius: '18px',
                border: 'none',
                background: activeTab === tab.id ? '#3b82f6' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(59, 130, 246, 0.3)' : 'none'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </ArchHero>

      <div className="container" style={{ marginTop: '2rem' }}>
        <AnimatePresence mode="wait">
             {activeTab === 'comparison' && (
                <motion.div
                    key="comparison"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                         <div className="glass-card">
                             <h3 style={{ fontSize: '1.4rem', color: '#3b82f6', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                 <Monitor /> Thin Client (İnce İstemci)
                             </h3>
                             <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                 İstemci (Browser/App) sadece arayüzü gösterir. Tüm hesaplamalar sunucuda yapılır.
                             </p>
                             <ul style={{ paddingLeft: '1.5rem', color: '#94a3b8', lineHeight: 2 }}>
                                 <li>✅ <strong>Güvenlik:</strong> Kod sunucuda gizlidir.</li>
                                 <li>✅ <strong>Yönetim:</strong> Güncelleme sadece sunucuya yapılır.</li>
                                 <li>❌ <strong>Gecikme:</strong> Her işlem için ağa gidip gelmek gerekir.</li>
                             </ul>
                         </div>

                         <div className="glass-card">
                             <h3 style={{ fontSize: '1.4rem', color: '#10b981', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                 <Smartphone /> Thick Client (Kalın İstemci)
                             </h3>
                             <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                 Hesaplamaların çoğu istemcide (React/Mobile App) yapılır. Sunucu sadece veri (JSON) sağlar.
                             </p>
                             <ul style={{ paddingLeft: '1.5rem', color: '#94a3b8', lineHeight: 2 }}>
                                 <li>✅ <strong>Hız:</strong> Arayüz tepkileri anlıktır (SPA).</li>
                                 <li>✅ <strong>Offline:</strong> İnternet olmadan da kısmen çalışabilir.</li>
                                 <li>❌ <strong>Güvenlik Riski:</strong> Hassas logic istemcide olmamalıdır.</li>
                             </ul>
                         </div>
                     </div>
                </motion.div>
             )}

             {activeTab === 'simulation' && (
                 <motion.div
                    key="simulation"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                         <button 
                            onClick={simulateRequest}
                            disabled={requestStatus !== 'IDLE'}
                            className="btn-bounce"
                            style={{ 
                                padding: '15px 40px', 
                                fontSize: '1.2rem', 
                                fontWeight: 800, 
                                borderRadius: '12px', 
                                border: 'none', 
                                background: requestStatus === 'IDLE' ? '#3b82f6' : '#1e293b', 
                                color: requestStatus === 'IDLE' ? 'white' : '#64748b',
                                cursor: requestStatus === 'IDLE' ? 'pointer' : 'default',
                                boxShadow: requestStatus === 'IDLE' ? '0 10px 30px rgba(59, 130, 246, 0.4)' : 'none',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                transition: 'all 0.3s'
                            }}
                        >
                            <Wifi size={24} /> {requestStatus === 'IDLE' ? 'HTTP Request Gönder' : requestStatus}
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '1rem', alignItems: 'center' }}>
                         
                         {/* Client Logs */}
                         <div className="glass-card" style={{ height: '300px', fontSize: '0.8rem', fontFamily: 'monospace', overflowY: 'auto' }}>
                             <div style={{ color: '#94a3b8', borderBottom: '1px solid #334155', paddingBottom: '5px', marginBottom: '10px' }}>CLIENT CONSOLE</div>
                             {requestStatus !== 'IDLE' && (
                                 <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ color: '#10b981' }}>
                                     &gt; GET /api/data HTTP/1.1<br/>
                                     &gt; Host: my-server.com<br/>
                                     &gt; User-Agent: Mozilla/5.0...
                                 </motion.div>
                             )}
                             {requestStatus === 'RECEIVING' && (
                                 <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} style={{ color: '#3b82f6', marginTop: '10px' }}>
                                     &lt; HTTP/1.1 200 OK<br/>
                                     &lt; Content-Type: application/json<br/>
                                     &lt; &#123; "status": "success" &#125;
                                 </motion.div>
                             )}
                         </div>

                         {/* Server Monitor */}
                         <div className="glass-card" style={{ height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: serverLoad > 50 ? '2px solid #ef4444' : '2px solid #3b82f6' }}>
                             <Server size={60} color={serverLoad > 50 ? '#ef4444' : '#3b82f6'} style={{ marginBottom: '1rem' }} />
                             <h3 style={{ marginBottom: '1rem' }}>Backend Server</h3>
                             
                             <div style={{ width: '80%', background: '#1e293b', borderRadius: '8px', padding: '10px' }}>
                                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px', fontSize: '0.8rem' }}>
                                     <span>CPU Load</span>
                                     <span>{serverLoad}%</span>
                                 </div>
                                 <div style={{ width: '100%', height: '8px', background: '#0f172a', borderRadius: '4px', overflow: 'hidden' }}>
                                     <motion.div 
                                        animate={{ width: `${serverLoad}%` }}
                                        style={{ height: '100%', background: serverLoad > 50 ? '#ef4444' : '#3b82f6' }}
                                     />
                                 </div>
                             </div>

                             <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: requestStatus === 'PROCESSING' ? '#eab308' : '#64748b' }}>
                                 {requestStatus === 'PROCESSING' ? 'Processing Query...' : 'Waiting for connection...'}
                             </div>
                         </div>

                         {/* DB Logs */}
                         <div className="glass-card" style={{ height: '300px', fontSize: '0.8rem', fontFamily: 'monospace', overflowY: 'auto', opacity: 0.6 }}>
                              <div style={{ color: '#94a3b8', borderBottom: '1px solid #334155', paddingBottom: '5px', marginBottom: '10px' }}>DB LOGS</div>
                              {requestStatus === 'PROCESSING' && (
                                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#eab308' }}>
                                     [SQL] SELECT * FROM users WHERE active = 1;<br/>
                                     ... 15ms execution time
                                 </motion.div>
                             )}
                         </div>

                    </div>
                 </motion.div>
             )}
        </AnimatePresence>
      </div>
      <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
           <div style={{ 
             background: 'linear-gradient(180deg, rgba(15, 23, 42, 0) 0%, rgba(15, 23, 42, 0.5) 100%)', 
             padding: '3rem', 
             borderRadius: '24px', 
             border: '1px solid rgba(255,255,255,0.05)',
             maxWidth: '900px',
             margin: '0 auto'
           }}>
              <div style={{ fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', marginBottom: '1rem', textTransform: 'uppercase' }}>
                Fundamentals of Web
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                İstemci-Sunucu mimarisinin temelleri, HTTP protokolü ve internetin çalışma prensipleri hakkında detaylı bilgi edinin.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Client-Server_overview" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(59, 130, 246, 0.15)', color: '#93c5fd', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(59, 130, 246, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    Client-Server Overview (MDN) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ClientServerPage;
