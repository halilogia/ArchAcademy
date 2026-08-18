import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const InterpreterSimulationTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

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
        } else if (cmd === 'DISCOUNT') {
          if (currentVars['price']) {
            const amount = parseFloat(parts[1]);
            currentVars['price'] -= amount;
            logs.push(`> Executing: ${line} -> New Price = ${currentVars['price']}`);
          } else {
            logs.push(`> Error: 'price' not defined`);
          }
        } else if (cmd === 'TAX') {
          if (currentVars['price']) {
            const rate = parseFloat(parts[1]);
            const taxAmount = currentVars['price'] * (rate / 100);
            currentVars['price'] += taxAmount;
            logs.push(`> Executing: ${line} -> Added Tax (${rate}%) = ${currentVars['price'].toFixed(2)}`);
          }
        } else if (cmd === 'PRINT') {
          const varName = parts[1] || 'price';
          logs.push(`> OUTPUT: ${currentVars[varName] ? currentVars[varName].toFixed(2) : 'Undefined'}`);
        }
        
        setVariables({ ...currentVars });
        setOutput([...logs]);
        
        if (i === lines.length - 1) setIsRunning(false);
      }, delay);
    });
  };

  return (
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
              style={{ 
                padding: '8px 20px', 
                background: isRunning ? '#334155' : '#db2777', 
                border: 'none', 
                borderRadius: '6px', 
                color: 'white', 
                fontWeight: 'bold', 
                cursor: isRunning ? 'default' : 'pointer' 
              }}
            >
              {isRunning ? (isEn ? 'Interpreting...' : 'Yorumlanıyor...') : (isEn ? 'Run Code' : 'Çalıştır')}
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
            <div style={{ fontSize: '0.8rem', color: '#db2777', fontWeight: 700 }}>Active Variables: {Object.keys(variables).length}</div>
          </div>
          
          <div style={{ flex: 1, background: '#020617', borderRadius: '8px', padding: '15px', fontFamily: 'monospace', fontSize: '0.9rem', color: '#10b981', overflowY: 'auto', maxHeight: '200px' }}>
            {output.length === 0 ? (
              <span style={{ color: '#475569' }}>// {isEn ? "Waiting for execution..." : "Çalıştırma bekleniyor..."}</span>
            ) : (
              output.map((line, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                  {line}
                </motion.div>
              ))
            )}
          </div>

          <div style={{ marginTop: '20px' }}>
            <h5 style={{ color: '#94a3b8', marginBottom: '10px' }}>Memory State</h5>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {Object.entries(variables).map(([key, val]) => (
                <div key={key} style={{ padding: '8px 15px', background: 'rgba(219, 39, 119, 0.2)', borderRadius: '6px', border: '1px solid #db2777', color: 'white', fontSize: '0.9rem' }}>
                  {key}: <strong>{val.toFixed(2)}</strong>
                </div>
              ))}
              {Object.keys(variables).length === 0 && <span style={{ fontSize: '0.8rem', color: '#475569' }}>{isEn ? "Empty" : "Boş"}</span>}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InterpreterSimulationTab;
