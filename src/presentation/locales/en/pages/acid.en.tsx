import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../../../components/ArchHero';
import { useProgress } from '../../../context/ProgressContext';
import { 
  Database, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Save, 
  XCircle, 
  CheckCircle,
  RefreshCcw,
  Lock,
  HardDrive
} from 'lucide-react';

const ACIDPage = () => {
  const { completeStep } = useProgress();
  const [activeTab, setActiveTab] = useState<'simulation' | 'concept'>('concept');
  
  // Simulation State: Bank Transfer
  const [accountA, setAccountA] = useState(1000);
  const [accountB, setAccountB] = useState(1000);
  const [step, setStep] = useState(0); // 0: Idle, 1: Debit A, 2: Error/Success Check, 3: Credit B, 4: Commit
  const [errorMode, setErrorMode] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/acid');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const addLog = (msg: string) => setLogs(prev => [...prev, msg]);

  const runTransaction = () => {
      if(step !== 0) return;
      setLogs([]);
      addLog("BEGIN TRANSACTION");
      
      // Step 1: Debit A
      setStep(1);
      setTimeout(() => {
          setAccountA(prev => prev - 100);
          addLog("UPDATE Accounts SET balance -= 100 WHERE id='A'");
          
          // Step 2: Simulate Failure Point
          setTimeout(() => {
             if (errorMode) {
                 // Simulate Failure (Power Cut etc)
                 addLog("ERROR: System Crash! (Simulated)");
                 addLog("ROLLBACK initiated...");
                 setTimeout(() => {
                     setAccountA(prev => prev + 100); // Rollback
                     addLog("Changes reverted. Account A restored.");
                     setStep(0);
                 }, 1500);
             } else {
                 // Continue
                 setStep(3);
                 setTimeout(() => {
                     setAccountB(prev => prev + 100);
                     addLog("UPDATE Accounts SET balance += 100 WHERE id='B'");
                     
                     setStep(4);
                     setTimeout(() => {
                         addLog("COMMIT (Data saved to disk)");
                         setStep(0);
                     }, 1000);
                 }, 1000);
             }
          }, 1000);

      }, 1000);
  };

  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
       {/* Safe Box Metaphor */}
       <motion.div 
         animate={{ scale: [1, 1.05, 1] }}
         transition={{ duration: 4, repeat: Infinity }}
         style={{ width: '220px', height: '260px', borderRadius: '30px', background: '#020617', border: '4px solid #facc15', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 50px rgba(250, 204, 21, 0.2)' }}
       >
           <div style={{ width: '180px', height: '140px', border: '1px solid rgba(250, 204, 21, 0.3)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', overflow: 'hidden' }}>
               <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ textAlign: 'center' }}
               >
                   {step === 0 && <span style={{fontSize: '3rem', fontWeight: 900, color: 'white'}}>SAFE</span>}
                   {step === 1 && <span style={{fontSize: '1.5rem', fontWeight: 900, color: '#f87171'}}>- $100</span>}
                   {step === 3 && <span style={{fontSize: '1.5rem', fontWeight: 900, color: '#4ade80'}}>+ $100</span>}
                   {step === 4 && <CheckCircle size={50} color="#facc15" />}
               </motion.div>
           </div>
           
           <div style={{ display: 'flex', gap: '15px' }}>
               <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#facc15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <Database size={20} color="black" />
               </div>
               <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <Lock size={20} color="white" />
               </div>
           </div>
       </motion.div>
       
       {/* Floating Badges */}
       <motion.div animate={{ rotate: -15, y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} style={{ position: 'absolute', top: 20, right: 0, background: '#facc15', padding: '5px 15px', borderRadius: '20px', color: 'black', fontWeight: 'bold', fontSize: '0.8rem' }}>Atomic</motion.div>
       <motion.div animate={{ rotate: 15, y: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} style={{ position: 'absolute', bottom: 40, left: 10, background: '#facc15', padding: '5px 15px', borderRadius: '20px', color: 'black', fontWeight: 'bold', fontSize: '0.8rem' }}>Durable</motion.div>

    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ paddingBottom: '100px' }}>
      <ArchHero 
        title="ACID"
        subtitle="Principles"
        description="Database integrity is not left to chance. A set of rules that ensures your money doesn't vanish even if the power cuts during a transfer."
        badge="Data Safety"
        color="#facc15"
        illustration={illu