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
    
            {/* Step 2: Interpreter Core