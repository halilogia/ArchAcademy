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
        description="'The art of managing complexity.' Hides low-level details (Database, API, Hardware), allowing clean, understandable high-level business logic."
        badge="Interface Segregation"
        color="#a855f7"
        illustration={illu}
        features={[
          { icon: <Layers />, title: 'Layering', desc: 'Divide the application into layers. UI layer should not know SQL query.' },
          { icon: <GitPullRequest />, title: 'Decoupling', desc: 'Components should depend on interfaces, not each other.'