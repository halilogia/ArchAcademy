import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { NeuralNode } from '../../types';
import { panel, panelHeader, codeBox, btnDanger, btnMini } from '../../styles/Panels.css';

interface CodePanelProps {
  selectedNode: NeuralNode | null;
  onClose: () => void;
}

export const CodePanel: React.FC<CodePanelProps> = ({ selectedNode, onClose }) => {
  if (!selectedNode) return null;

  return (
    <motion.div 
      initial={{ x: -800, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -800, opacity: 0 }}
      transition={{ type: 'spring', damping: 20, stiffness: 100 }}
      className={panel}
    >
      <div className={panelHeader}>
        <h2>{selectedNode.label}</h2>
        <button onClick={onClose} className={btnDanger}><X size={16} /> CLOSE</button>
      </div>
      <div className="meta-info" style={{ display: 'flex', gap: '15px', color: '#94a3b8', fontSize: '10px', fontWeight: 800, marginBottom: '15px' }}>
        <span>TYPE: {selectedNode.category}</span>
        <span>CRITICALITY: {selectedNode.criticality}</span>
        <span>IN: {selectedNode.inDegree} / OUT: {selectedNode.outDegree}</span>
      </div>
      <pre className={codeBox}>{selectedNode.content}</pre>
    </motion.div>
  );
};
