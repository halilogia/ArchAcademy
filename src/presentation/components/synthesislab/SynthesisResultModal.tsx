import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

export interface SynthesisResultModalProps {
  synthesizedCode: string | null;
  onDismiss: () => void;
}

export const SynthesisResultModal: React.FC<SynthesisResultModalProps> = ({
  synthesizedCode,
  onDismiss
}) => {
  return (
    <AnimatePresence>
      {synthesizedCode && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(30px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <div style={{ width: '800px', background: '#0a0a0f', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.1)', padding: '3rem' }}>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '2rem' }}>
              <div style={{ background: '#3b82f6', padding: '1rem', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50px', height: '50px' }}><Zap color="white" /></div>
              <div>
                <h2 style={{ fontSize: '2rem', fontWeight: 950 }}>Synthesis Complete</h2>
                <p style={{ opacity: 0.4 }}>Architecture artifacts mapped to file system</p>
              </div>
            </div>
            <pre style={{ background: '#050507', padding: '2rem', borderRadius: '20px', color: '#06b6d4', maxHeight: '400px', overflow: 'auto', border: '1px solid rgba(255,255,255,0.05)' }}>
              {synthesizedCode}
            </pre>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '15px' }}>
              <button onClick={onDismiss} style={{ flex: 1, padding: '1.2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '18px', border: 'none', color: 'white', fontWeight: 900 }}>Dismiss</button>
              <button style={{ flex: 2, padding: '1.2rem', background: '#3b82f6', borderRadius: '18px', border: 'none', color: 'white', fontWeight: 900 }}>Deploy Synthetic Blueprint</button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SynthesisResultModal;
