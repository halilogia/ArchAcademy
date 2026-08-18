import React from 'react';
import { motion } from 'framer-motion';
import ArchHero from '../../../components/ArchHero';
import { Cpu, Box, Zap, Layers, Play, Database, FastForward, Activity, Code2, AlertTriangle, Lightbulb } from 'lucide-react';

const ECSPage = () => {
  const illu = (
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Entities Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            style={{ 
                width: '50px', 
                height: '50px', 
                background: 'rgba(16, 185, 129, 0.05)', 
                border: '1px solid rgba(16, 185, 129, 0.2)', 
                borderRadius: '12px', 
                position: 'relative' 
            }}
          >
            {/* Component bits rotating inside */}
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                style={{ position: 'absolute', top: '10px', left: '10px', width: '8px', height: '8px', background: '#3b82f6', borderRadius: '2px' }} 
            />
            <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                style={{ position: 'absolute', bottom: '10px', right: '10px', width: '8px', height: '8px', background: '#f43f5e', borderRadius: '2px' }} 
            />
          </motion.div>
        ))}
      </div>
      
      {/* System "Scanner" Line */}
      <motion.div
        animate={{ x: [-180, 180], opacity: [0, 1, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ 
            position