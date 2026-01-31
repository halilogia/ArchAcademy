import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { 
  Code2, 
  Terminal, 
  Cpu, 
  ArrowRight, 
  Zap, 
  Play, 
  BookOpen, 
  Layers
} from 'lucide-react';

const InterpreterPage = () => {
    const [activeTab, setActiveTab] = useState<'simulation' | 'concept'>('concept');
    const [code, setCode] = useState<string>('SET price 100\nDISCOUNT 20\nTAX 18\nPRINT total');
    const [output, setOutput] = useState<string[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [variables, setVariables] = useState<Record<string, number>>({});

    const runInterpreter = () => {
        setIsRunning(true);
        setOutput([]);
        setVariables({});

        const lines = code.split('\n');
        let currentVars: Record<string, number> = {};
        let logs: string[] = [];

        // Mock delay for visualization
        let delay = 0;
        lines.forEach((line, i) => {
            delay += 800;
            setTimeout(() => {
                const parts = line.trim().split(' ');
                const cmd = parts[0].toUpperCase();

                if (cmd === 'SET') {
                    const varName = parts[1];
                    const val = parseFloat(parts[2]);
                    currentVars[varName] = val;
                    logs.push(`> Executing: ${line} -> ${varName} = ${val}`);
                } 
                else if (cmd === 'DISCOUNT') {
                    // Applies discount to 'price' implicitly for demo
                    if (currentVars['price']) {
                        const amount = parseFloat(parts[1]);
                        currentVars['price'] -= amount;
                        logs.push(`> Executing: ${line} -> New Price = ${currentVars['price']}`);
                    } else {
                        logs.push(`> Error: 'price' not defined`);
                    }
                }
                else if (cmd === 'TAX') {
                    if (currentVars['price']) {
                        const rate = parseFloat(parts[1]);
                        const taxAmount = currentVars['price'] * (rate / 100);
                        currentVars['price'] += taxAmount;
                        logs.push(`> Executing: ${line} -> Added Tax (${rate}%) = ${currentVars['price'].toFixed(2)}`);
                    }
                }
                else if (cmd === 'PRINT') {
                   // Just prints whatever variable is asked, or price by default
                   const varName = parts[1] || 'price';
                   logs.push(`> OUTPUT: ${currentVars[varName] ? currentVars[varName].toFixed(2) : 'Undefined'}`);
                }
                
                setVariables({...currentVars});
                setOutput([...logs]);
                
                if (i === lines.length - 1) setIsRunning(false);

            }, delay);
        });
    };

    const illu = (
        <div style={{ 
          background: 'rgba(15, 23, 42, 0.6)', 
          padding: '2.5rem', 
          borderRadius: '32px', 
          border: '1px solid rgba(219, 39, 119, 0.3)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5), inset 0 0 20px rgba(219, 39, 119, 0.1)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Decorative Glow */}
          <div style={{ position: 'absolute', top: '-50px', left: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(219, 39, 119, 0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
    
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
            {/* Step 1: High Level */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#db2777', marginBottom: '0.75rem' }}>
                <Code2 size={32} />
              </div>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'white', textTransform: 'uppercase' }}>DSL Code</div>
            </motion.div>
    
            <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
              <ArrowRight color="#db2777" opacity={0.5} />
            </motion.div>
    
            {/* Step 2: Interpreter Core */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ 
                width: '120px', 
                height: '100px', 
                borderRadius: '24px', 
                background: 'linear-gradient(135deg, #db2777 0%, #9d174d 100%)', 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center', 
                color: 'white', 
                marginBottom: '0.75rem',
                boxShadow: '0 10px 30px rgba(219, 39, 119, 0.4)'
              }}>
                <Terminal size={32} style={{ marginBottom: '4px' }} />
                <span style={{ fontSize: '0.7rem', fontWeight: 900 }}>INTERPRETER</span>
              </div>
              <div style={{ fontSize: '0.6rem', color: '#f472b6', fontWeight: 700 }}>Parse & Execute</div>
            </motion.div>
    
            <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}>
              <ArrowRight color="#db2777" opacity={0.5} />
            </motion.div>
    
            {/* Step 3: Action */}
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#db2777', marginBottom: '0.75rem' }}>
                <Cpu size={32} />
              </div>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'white', textTransform: 'uppercase' }}>Result</div>
            </motion.div>
          </div>
    
          {/* Code Stream Animation */}
          <div style={{ marginTop: '2rem', fontFamily: 'monospace', fontSize: '0.7rem', color: '#f472b6', opacity: 0.6, width: '100%', textAlign: 'center' }}>
            <motion.div
               animate={{ opacity: [0.3, 1, 0.3] }}
               transition={{ duration: 2, repeat: Infinity }}
            >
               Execution: Line by Line...
            </motion.div>
          </div>
        </div>
      );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="Interpreter"
        subtitle="Architecture"
        description="Kodun derlenmesine (Compile) gerek kalmadan, satır satır okunup çalıştırıldığı esnek mimari. Kural motorları (Rule Engines) ve SQL motorları bu prensiple çalışır."
        badge="Logic Engine"
        color="#db2777"
        illustration={illu}
        features={[
          { icon: <Terminal />, title: 'Dynamic Behavior', desc: 'Uygulamayı durdurmadan iş mantığını (Business Logic) değiştirin.' },
          { icon: <Code2 />, title: 'Custom DSL', desc: 'Sadece sizin işinize özel, basitleştirilmiş bir dil (DSL) yaratabilirsiniz.' },
          { icon: <Layers />, title: 'Sandboxing', desc: 'Kullanıcının yazdığı kodu güvenli bir ortamda çalıştırabilirsiniz.' }
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
            { id: 'concept', label: 'Concept', icon: <BookOpen size={18} /> },
            { id: 'simulation', label: 'Run Engine', icon: <Play size={18} /> }
          ].map((tab) => (
             <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '10px 24px',
                borderRadius: '18px',
                border: 'none',
                background: activeTab === tab.id ? '#db2777' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(219, 39, 119, 0.3)' : 'none'
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
                 <motion.div
                    key="concept"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div>
                            <h3 style={{ color: '#db2777', fontSize: '1.8rem', marginBottom: '1.5rem' }}>"Program içinde Program"</h3>
                            <p style={{ lineHeight: '1.7', color: '#cbd5e1', marginBottom: '20px' }}>
                                Bir e-ticaret siteniz olduğunu düşünün. "Sepette 1000 TL üzeri alana %10 indirim" kuralını Java/C# kodunun içine gömerseniz (Hardcode), kuralı değiştirmek için yazılımcıya ihtiyaç duyarsınız ve uygulamayı tekrar deploy etmeniz gerekir.
                            </p>
                            <p style={{ lineHeight: '1.7', color: '#cbd5e1' }}>
                                Interpreter deseninde ise bu kural bir metin dosyasında saklanır: <br/>
                                 <code style={{ color: '#db2777' }}>IF CartTotal &gt; 1000 THEN ApplyDiscount(10)</code>
                            </p>
                            <p style={{ lineHeight: '1.7', color: '#cbd5e1' }}>
                                Uygulamanız bu metni okur, yorumlar ve çalıştırır. Böylece pazarlama ekibi bile kuralları değiştirebilir.
                            </p>
                        </div>
                        <div className="glass-card" style={{ border: '1px solid #db2777', background: 'rgba(219, 39, 119, 0.05)' }}>
                            <h4 style={{ color: 'white', marginBottom: '20px' }}>Gerçek Hayat Örnekleri</h4>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ marginBottom: '15px', display: 'flex', gap: '15px' }}>
                                    <div style={{ minWidth: '40px', height: '40px', background: '#334155', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>SQL</div>
                                    <div>
                                        <strong style={{ color: '#fff' }}>Database Engines</strong>
                                        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>SQL bir metindir. Veritabanı motoru bunu yorumlar ve veriyi getirir.</div>
                                    </div>
                                </li>
                                <li style={{ marginBottom: '15px', display: 'flex', gap: '15px' }}>
                                    <div style={{ minWidth: '40px', height: '40px', background: '#334155', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>RegEx</div>
                                    <div>
                                        <strong style={{ color: '#fff' }}>Regular Expressions</strong>
                                        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Karmaşık metin arama kurallarını tek bir satırla tanımlamanızı sağlar.</div>
                                    </div>
                                </li>
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
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                        {/* Editor */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                                <h4 style={{ margin: 0, color: 'white' }}>Rule Editor (DSL)</h4>
                                <button 
                                    onClick={runInterpreter}
                                    disabled={isRunning}
                                    style={{ padding: '8px 20px', background: isRunning ? '#334155' : '#db2777', border: 'none', borderRadius: '6px', color: 'white', fontWeight: 'bold', cursor: isRunning ? 'default' : 'pointer' }}
                                >
                                    {isRunning ? 'Interpreting...' : 'Run Code'}
                                </button>
                            </div>
                            <textarea 
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                style={{ 
                                    width: '100%', 
                                    height: '300px', 
                                    background: '#0f172a', 
                                    border: '1px solid #334155', 
                                    borderRadius: '12px', 
                                    padding: '20px', 
                                    color: '#e2e8f0', 
                                    fontFamily: 'monospace', 
                                    fontSize: '1rem',
                                    resize: 'none',
                                    outline: 'none'
                                }}
                            />
                            <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '10px' }}>
                                Available Commands: <span style={{ color: '#db2777' }}>SET [var] [val]</span>, <span style={{ color: '#db2777' }}>DISCOUNT [amount]</span>, <span style={{ color: '#db2777' }}>TAX [rate]</span>, <span style={{ color: '#db2777' }}>PRINT [var]</span>
                            </div>
                        </div>

                        {/* Execution Context */}
                        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
                             <div style={{ paddingBottom: '15px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
                                 <h4 style={{ margin: 0, color: '#fff' }}>Execution Log</h4>
                                 <div style={{ fontSize: '0.8rem', color: '#db2777' }}>Active Variables: {Object.keys(variables).length}</div>
                             </div>
                             
                             <div style={{ flex: 1, background: '#020617', borderRadius: '8px', padding: '15px', fontFamily: 'monospace', fontSize: '0.9rem', color: '#10b981', overflowY: 'auto', maxHeight: '200px' }}>
                                 {output.length === 0 ? <span style={{ color: '#475569' }}>// Waiting for execution...</span> : output.map((line, i) => (
                                     <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                                         {line}
                                     </motion.div>
                                 ))}
                             </div>

                             <div style={{ marginTop: '20px' }}>
                                 <h5 style={{ color: '#94a3b8', marginBottom: '10px' }}>Memory State</h5>
                                 <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                     {Object.entries(variables).map(([key, val]) => (
                                         <div key={key} style={{ padding: '8px 15px', background: 'rgba(219, 39, 119, 0.2)', borderRadius: '6px', border: '1px solid #db2777', color: 'white', fontSize: '0.9rem' }}>
                                             {key}: <strong>{val.toFixed(2)}</strong>
                                         </div>
                                     ))}
                                     {Object.keys(variables).length === 0 && <span style={{ fontSize: '0.8rem', color: '#475569' }}>Empty</span>}
                                 </div>
                             </div>
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
                Design Patterns
              </div>
              <p style={{ color: '#94a3b8', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.6 }}>
                Interpreter Pattern'ın nesne yönelimli dünyadaki yeri, AST (Abstract Syntax Tree) yapısı ve kullanım durumları üzerine derinlemesine bilgi edinin.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                 <a 
                   href="https://refactoring.guru/design-patterns/interpreter" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   style={{ 
                     display: 'flex', alignItems: 'center', gap: '8px', 
                     background: 'rgba(219, 39, 119, 0.15)', color: '#f472b6', 
                     padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 600,
                     border: '1px solid rgba(219, 39, 119, 0.2)', transition: 'all 0.2s'
                   }}
                 >
                    Interpreter Pattern Guide (Refactoring.Guru) <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                 </a>
              </div>
           </div>
        </div>
      </section>
    </motion.div>
  );
};

export default InterpreterPage;
