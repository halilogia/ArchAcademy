import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Binary, CheckCircle, Layers } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface DataPacket {
  id: number;
  content: string;
  stage: 'raw' | 'parsed' | 'validated' | 'encrypted';
}

export interface PipeFilterSimulationTabProps {
  pipelineActive: boolean;
  processedPackets: DataPacket[];
  onRunPipeline: () => void;
}

export const PipeFilterSimulationTab: React.FC<PipeFilterSimulationTabProps> = ({
  pipelineActive,
  processedPackets,
  onRunPipeline
}) => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const stages = [
    { id: 'raw', label: isEn ? 'Raw Input' : 'Raw Input', color: '#94a3b8', icon: <FileText size={16} /> },
    { id: 'parser', label: isEn ? 'Filter: UpperCase' : 'Filter: UpperCase', color: '#ec4899', icon: <Binary size={16} /> },
    { id: 'validator', label: isEn ? 'Filter: Validator' : 'Filter: Validator', color: '#d946ef', icon: <CheckCircle size={16} /> },
    { id: 'encryptor', label: isEn ? 'Filter: Encrypt' : 'Filter: Encrypt', color: '#a855f7', icon: <Layers size={16} /> }
  ];

  return (
    <motion.div
      key="simulation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <button 
          onClick={onRunPipeline} 
          disabled={pipelineActive}
          className="btn-bounce"
          style={{ 
            padding: '15px 40px', 
            background: pipelineActive ? '#334155' : '#ec4899', 
            border: 'none', 
            borderRadius: '12px', 
            color: 'white', 
            fontSize: '1rem', 
            fontWeight: 800,
            cursor: pipelineActive ? 'default' : 'pointer'
          }}
        >
          {pipelineActive ? (isEn ? 'Processing Data Pipeline...' : 'Processing Pipeline...') : (isEn ? 'Start Transformation Pipe' : 'Start Transformation Pipe')}
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Initial Input */}
        <div style={{ padding: '10px', background: '#334155', borderRadius: '8px', alignSelf: 'center', opacity: 0.5 }}>
          {isEn ? 'Input Stream: "hello world"' : 'Input: "hello world"'}
        </div>

        {/* Pipe Visualization */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {stages.slice(1).map((stage, i) => {
            const packet = processedPackets[i+1];
            
            return (
              <React.Fragment key={stage.id}>
                <motion.div 
                  animate={{ 
                    scale: packet ? 1.05 : 1,
                    borderColor: packet ? stage.color : 'transparent'
                  }}
                  className="glass-card" 
                  style={{ 
                    width: '200px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    padding: '20px',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  <div style={{ marginBottom: '10px', color: stage.color }}>{stage.icon}</div>
                  <h4 style={{ margin: 0, color: 'white', fontSize: '0.9rem' }}>{stage.label}</h4>
                  
                  <div style={{ marginTop: '15px', width: '100%', minHeight: '40px', background: 'rgba(0,0,0,0.3)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', color: packet ? '#fff' : '#475569', overflow: 'hidden', wordBreak: 'break-all', padding: '5px' }}>
                    {packet ? packet.content : (isEn ? 'Waiting for pipe...' : 'Waiting...')}
                  </div>
                </motion.div>
                
                {i < stages.length - 2 && (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <motion.div 
                      animate={{ width: ['20px', '40px', '20px'] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      style={{ height: '4px', background: stage.color, borderRadius: '2px' }} 
                    />
                    <ArrowRight color="#475569" size={20} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default PipeFilterSimulationTab;
