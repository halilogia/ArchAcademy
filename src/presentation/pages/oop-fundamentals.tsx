import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { useProgress } from '../../context/ProgressContext';
import { 
  Box, 
  Layers, 
  Share2, 
  ShieldCheck, 
  Lock, 
  Eye, 
  EyeOff,
  Play,
  Activity,
  GitBranch,
  Copy,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

const OOPFundamentalsPage = () => {
  const { completeStep } = useProgress();
  const [activeTab, setActiveTab] = useState<'encapsulation' | 'abstraction' | 'inheritance' | 'polymorphism'>('encapsulation');

  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/oop-fundamentals');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Encapsulation State
  const [balance, setBalance] = useState(1000);
  const [isPrivateVisible, setIsPrivateVisible] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addToLog = (msg: string) => setLogs(prev => [msg, ...prev].slice(0, 5));

  const deposit = (amount: number) => {
      if(amount > 0) {
          setBalance(prev => prev + amount);
          addToLog(`Deposit: +${amount} (Success)`);
      }
  }

  // Abstraction State
  const [coffeeStatus, setCoffeeStatus] = useState<'idle' | 'grinding' | 'brewing' | 'ready'>('idle');

  const makeCoffee = () => {
      if(coffeeStatus !== 'idle') return;
      setCoffeeStatus('grinding');
      setTimeout(() => setCoffeeStatus('brewing'), 1000);
      setTimeout(() => setCoffeeStatus('ready'), 2500);
      setTimeout(() => setCoffeeStatus('idle'), 4000);
  }

  // Inheritance State
  const [parentColor, setParentColor] = useState('#f43f5e'); // Rose
  
  // Polymorphism State
  const [shapes] = useState(['circle', 'square', 'triangle']);
  const [polyAction, setPolyAction] = useState(false);

  const triggerPolymorphism = () => {
      setPolyAction(true);
      setTimeout(() => setPolyAction(false), 1000);
  }

  // --- Illustration ---
  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
       
       {/* Orbit Ring */}
       <motion.div 
         animate={{ rotate: 360 }}
         transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
         style={{ width: '260px', height: '260px', border: '2px dashed #f43f5e', borderRadius: '50%', position: 'absolute', opacity: 0.2 }}
       />

       {/* Center Object */}
       <div style={{ width: '100px', height: '100px', background: 'linear-gradient(135deg, #f43f5e, #be123c)', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(244, 63, 94, 0.4)', zIndex: 10, position: 'relative', border: '2px solid rgba(255,255,255,0.2)' }}>
           <Box size={40} color="white" />
           <div style={{color: 'white', fontWeight: 900, fontSize: '0.8rem', marginTop: '5px'}}>OBJECT</div>
       </div>

       {/* Satellites */}
       {/* Top: Abstraction */}
       <motion.div animate={{ y: [-10, 0, -10] }} transition={{ duration: 4, repeat: Infinity }} style={{ position: 'absolute', top: 20 }}>
            <div style={{ padding: '8px 16px', background: '#020617', border: '1px solid #f43f5e', borderRadius: '20px', display: 'flex', gap: '8px', alignItems: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.5)', zIndex: 20 }}>
                <Layers size={16} color="#f43f5e" /> <span style={{fontSize: '0.7rem', color: 'white', fontWeight: 700}}>Abstraction</span>
            </div>
       </motion.div>

       {/* Bottom: Inheritance */}
       <motion.div animate={{ y: [10, 0, 10] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }} style={{ position: 'absolute', bottom: 20 }}>
            <div style={{ padding: '8px 16px', background: '#020617', border: '1px solid #f43f5e', borderRadius: '20px', display: 'flex', gap: '8px', alignItems: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.5)', zIndex: 20 }}>
                <Share2 size={16} color="#f43f5e" /> <span style={{fontSize: '0.7rem', color: 'white', fontWeight: 700}}>Inheritance</span>
            </div>
       </motion.div>

       {/* Left: Encapsulation */}
       <motion.div animate={{ x: [-10, 0, -10] }} transition={{ duration: 4, repeat: Infinity, delay: 2 }} style={{ position: 'absolute', left: 0 }}>
            <div style={{ padding: '8px 16px', background: '#020617', border: '1px solid #f43f5e', borderRadius: '20px', display: 'flex', gap: '8px', alignItems: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.5)', zIndex: 20 }}>
                 <ShieldCheck size={16} color="#f43f5e" /> <span style={{fontSize: '0.7rem', color: 'white', fontWeight: 700}}>Encapsulation</span>
            </div>
       </motion.div>

       {/* Right: Polymorphism */}
       <motion.div animate={{ x: [10, 0, 10] }} transition={{ duration: 4, repeat: Infinity, delay: 3 }} style={{ position: 'absolute', right: 0 }}>
            <div style={{ padding: '8px 16px', background: '#020617', border: '1px solid #f43f5e', borderRadius: '20px', display: 'flex', gap: '8px', alignItems: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.5)', zIndex: 20 }}>
                <Copy size={16} color="#f43f5e" /> <span style={{fontSize: '0.7rem', color: 'white', fontWeight: 700}}>Polymorphism</span>
            </div>
       </motion.div>

    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="OOP"
        subtitle="Fundamentals"
        description="Spagetti koddan kurtulun. Yazılımı gerçek dünya nesneleri gibi modelleyerek yönetilebilir, güvenli ve tekrar kullanılabilir hale getirin."
        badge="Core Wisdom"
        color="#f43f5e"
        illustration={illu}
        features={[
          { icon: <ShieldCheck />, title: "Encapsulation", desc: "Hassas veriyi koru, dışarıya kontrollü erişim ver." },
          { icon: <Layers />, title: "Abstraction", desc: "Arka plandaki karmaşıklığı gizle, sadece arayüzü sun." },
          { icon: <Share2 />, title: "Inheritance", desc: "Kod tekrarını önle, ortak özellikleri miras al." },
          { icon: <GitBranch />, title: "Polymorphism", desc: "Farklı nesnelerin aynı komuta farklı tepki vermesini sağla." }
        ]}
      >
        <div style={{ 
          marginTop: '2rem',
          padding: '6px', 
          background: 'rgba(15, 23, 42, 0.4)', 
          borderRadius: '24px', 
          border: '1px solid rgba(255,255,255,0.05)',
          display: 'inline-flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '4px',
          backdropFilter: 'blur(10px)'
        }}>
          {[
            { id: 'encapsulation', label: 'Encapsulation', icon: <Lock size={16} /> },
            { id: 'abstraction', label: 'Abstraction', icon: <Layers size={16} /> },
            { id: 'inheritance', label: 'Inheritance', icon: <Share2 size={16} /> },
            { id: 'polymorphism', label: 'Polymorphism', icon: <Activity size={16} /> }
          ].map((tab) => (
             <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '8px 20px',
                borderRadius: '18px',
                border: 'none',
                background: activeTab === tab.id ? '#f43f5e' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.85rem',
                transition: 'all 0.3s ease',
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </ArchHero>

      <div className="container" style={{ marginTop: '2rem' }}>
          <AnimatePresence mode="wait">
              {/* --- ENCAPSULATION --- */}
              {activeTab === 'encapsulation' && (
                  <motion.div key="encapsulation" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                      <div>
                          <h3 style={{fontSize: '1.8rem', color: '#f43f5e', marginBottom: '1rem'}}>Safe & Sound</h3>
                          <p style={{color: '#cbd5e1', lineHeight: 1.6}}>
                              Bir sınıfın iç veri yapısını (field) dış dünyadan gizlemek (private) ve bu verilere erişimi metodlar (getter/setter) aracılığıyla kontrol etmektir.
                          </p>
                          <div style={{marginTop: '20px', padding: '15px', background: '#1e293b', borderRadius: '12px', borderLeft: '4px solid #f43f5e' }}>
                              <h4 style={{color: 'white', margin: '0 0 10px 0'}}>Analoji: Banka Hesabı</h4>
                              <p style={{fontSize: '0.9rem', color: '#94a3b8'}}>
                                  Banka hesabındaki paranızı doğrudan değiştiremezsiniz (myMoney = 1000000 yapamazsınız). Sadece `deposit()` veya `withdraw()` işlemi yapabilirsiniz. Banka bu işlemleri kontrol eder.
                              </p>
                          </div>
                      </div>
                      
                      <div className="glass-card" style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                              <h4 style={{margin: 0, color: 'white'}}>BankAccount Simulator</h4>
                              <div 
                                onClick={() => setIsPrivateVisible(!isPrivateVisible)}
                                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: '#f43f5e' }}>
                                  {isPrivateVisible ? <EyeOff size={14}/> : <Eye size={14}/>} {isPrivateVisible ? 'Hide Private' : 'Peek Private'}
                              </div>
                          </div>

                          <div style={{ padding: '20px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', fontFamily: 'monospace', position: 'relative' }}>
                                {isPrivateVisible && (
                                    <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '0.7rem', color: '#ef4444' }}>
                                        ACCESSING PRIVATE MEMORY!
                                    </div>
                                )}
                                <div style={{ color: '#94a3b8' }}>class UserAccount {'{'}</div>
                                <div style={{ marginLeft: '20px', color: '#ef4444' }}>
                                    private double balance = {isPrivateVisible ? <span style={{background: '#ef4444', color: 'white', padding: '0 4px', borderRadius: '4px'}}>{balance}</span> : '******'};
                                </div>
                                <div style={{ marginLeft: '20px', color: '#10b981' }}>
                                    public void deposit(amount) {'{ ... }'}
                                </div>
                                <div style={{ color: '#94a3b8' }}>{'}'}</div>
                          </div>

                          <div style={{ display: 'flex', gap: '10px' }}>
                              <button className="btn-bounce" onClick={() => deposit(100)} style={{background: '#10b981', flex: 1, border: 'none', padding: '10px', borderRadius: '8px', color: 'white', fontWeight: 'bold'}}>Deposit $100</button>
                              <button className="btn-bounce" onClick={() => addToLog('Direct Access Denied!')} style={{background: '#ef4444', flex: 1, border: 'none', padding: '10px', borderRadius: '8px', color: 'white', fontWeight: 'bold'}}>Hack Balance</button>
                          </div>

                          <div style={{ height: '100px', overflowY: 'auto', background: '#020617', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', color: '#cbd5e1' }}>
                              {logs.map((l, i) => <div key={i}>&gt; {l}</div>)}
                          </div>
                      </div>
                  </motion.div>
              )}

              {/* --- ABSTRACTION --- */}
              {activeTab === 'abstraction' && (
                   <motion.div key="abstraction" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                       <div>
                           <h3 style={{fontSize: '1.8rem', color: '#f43f5e', marginBottom: '1rem'}}>The Iceberg</h3>
                           <p style={{color: '#cbd5e1', lineHeight: 1.6}}>
                               Kullanıcıya sadece "ne yapabileceğini" gösterip, "nasıl yaptığını" gizlemektir. Araba sürerken motorun ateşleme sırasını bilmenize gerek yoktur, sadece gaza basarsınız.
                           </p>
                       </div>
                       
                       <div className="glass-card">
                            <h4 style={{ color: 'white', marginBottom: '20px' }}>Espresso Machine Interface</h4>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '30px' }}>
                                {/* The "Interface" */}
                                <div style={{ textAlign: 'center' }}>
                                    <button 
                                        onClick={makeCoffee}
                                        disabled={coffeeStatus !== 'idle'}
                                        style={{ 
                                            width: '80px', height: '80px', borderRadius: '50%', border: '4px solid #f43f5e', 
                                            background: coffeeStatus === 'idle' ? 'transparent' : '#f43f5e',
                                            color: coffeeStatus === 'idle' ? '#f43f5e' : 'white',
                                            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                                        }}
                                    >
                                        BREW
                                    </button>
                                    <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#f43f5e' }}>Simple Interface</div>
                                </div>

                                <ArrowRight size={24} color="#94a3b8" />

                                {/* The "Implementation" */}
                                <div style={{ padding: '20px', background: '#1e293b', borderRadius: '12px', minWidth: '180px' }}>
                                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '10px' }}>Internal Complexity:</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '0.8rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: coffeeStatus === 'grinding' ? '#fbbf24' : '#475569' }}>
                                            <Activity size={12} /> Grinding Beans
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: coffeeStatus === 'brewing' ? '#fbbf24' : '#475569' }}>
                                            <Activity size={12} /> Pressurizing Water
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: coffeeStatus === 'ready' ? '#10b981' : '#475569' }}>
                                            <CheckCircle2 size={12} /> Pouring Coffee
                                        </div>
                                    </div>
                                </div>
                            </div>
                       </div>
                   </motion.div>
              )}

              {/* --- INHERITANCE --- */}
              {activeTab === 'inheritance' && (
                  <motion.div key="inheritance" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                       <div>
                           <h3 style={{fontSize: '1.8rem', color: '#f43f5e', marginBottom: '1rem'}}>Family Tree</h3>
                           <p style={{color: '#cbd5e1', lineHeight: 1.6}}>
                               Bir "Parent" sınıf oluşturup, ortak özellikleri orada tanımlayıp, "Child" sınıfların bu özellikleri miras almasını (Inherit) sağlamaktır.
                           </p>
                           <p style={{color: '#cbd5e1', lineHeight: 1.6, marginTop: '10px'}}>
                               Renk ayarını değiştirin, mirasın nasıl aktarıldığını görün:
                           </p>
                           <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                               {['#f43f5e', '#3b82f6', '#10b981', '#eab308'].map(c => (
                                   <div 
                                    key={c} 
                                    onClick={() => setParentColor(c)}
                                    style={{ width: '30px', height: '30px', borderRadius: '50%', background: c, cursor: 'pointer', border: parentColor === c ? '2px solid white' : 'none' }} 
                                   />
                               ))}
                           </div>
                       </div>
                       
                       <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            {/* Parent */}
                            <motion.div 
                                animate={{ backgroundColor: parentColor }}
                                style={{ padding: '15px 30px', borderRadius: '12px', border: '2px solid white', color: '#fff', fontWeight: 'bold' }}
                            >
                                GrandParent
                            </motion.div>

                            <div style={{ height: '30px', width: '2px', background: 'rgba(255,255,255,0.2)' }} />
                            
                            {/* Children */}
                            <div style={{ display: 'flex', gap: '30px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <motion.div 
                                        animate={{ backgroundColor: parentColor }}
                                        style={{ width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.8 }}
                                    >
                                        Child A
                                    </motion.div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <motion.div 
                                        animate={{ backgroundColor: parentColor }}
                                        style={{ width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.8 }}
                                    >
                                        Child B
                                    </motion.div>
                                    <span style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '5px' }}>(Reshaped)</span>
                                </div>
                            </div>
                            <div style={{ marginTop: '20px', fontSize: '0.8rem', color: '#94a3b8' }}>Child sınıflar, Parent rengini (Prop) miras aldı.</div>
                       </div>
                   </motion.div>
              )}

               {/* --- POLYMORPHISM --- */}
               {activeTab === 'polymorphism' && (
                   <motion.div key="polymorphism" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                       <div>
                           <h3 style={{fontSize: '1.8rem', color: '#f43f5e', marginBottom: '1rem'}}>Many Forms</h3>
                           <p style={{color: '#cbd5e1', lineHeight: 1.6}}>
                               Farklı nesnelerin aynı "komuta" (Interface Method) kendi yapılarına uygun, farklı şekillerde yanıt vermesidir.
                           </p>
                           <p style={{color: '#cbd5e1', lineHeight: 1.6, marginTop: '20px'}}>
                               Komut Tek: <span style={{ color: '#f43f5e', fontWeight: 'bold' }}>.action()</span>
                           </p>
                           <button 
                            onClick={triggerPolymorphism}
                            style={{ marginTop: '10px', padding: '10px 20px', background: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
                           >
                               <Play size={16} color="black" /> Call .action() on ALL
                           </button>
                       </div>
                       
                       <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
                            {shapes.map((s, i) => (
                                <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>
                                    <div style={{ width: '80px', color: '#fff', fontSize: '0.9rem' }}>Shape {i+1} ({s})</div>
                                    <motion.div
                                        animate={polyAction ? {
                                            x: [0, 50, 0],
                                            rotate: s === 'square' ? [0, 180, 0] : 0,
                                            scale: s === 'circle' ? [1, 1.5, 1] : 1
                                        } : {}}
                                        style={{ 
                                            width: '40px', height: '40px', 
                                            background: '#f43f5e',
                                            borderRadius: s === 'circle' ? '50%' : (s === 'square' ? '4px' : '0px'),
                                            clipPath: s === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'
                                        }}
                                    />
                                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                                        {polyAction ? (s === 'circle' ? 'Rolling...' : (s === 'square' ? 'Rotating...' : 'Sliding...')) : 'Idle'}
                                    </div>
                                </div>
                            ))}
                       </div>
                   </motion.div>
              )}
          </AnimatePresence>
      </div>



      <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
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
                The Creator
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                "Object-Oriented Programming" terimini icat eden Alan Kay'in, biyolojiden esinlenerek geliştirdiği orijinal vizyonunu keşfedin.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="http://userpage.fu-berlin.de/~ram/pub/pub_jf47ht81Ht/doc_kay_oop_en" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(244, 63, 94, 0.15)', color: '#fda4af', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(244, 63, 94, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    Alan Kay on OOP <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};

export default OOPFundamentalsPage;
