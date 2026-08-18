import React from 'react';
import { VisualNode, Connection } from './SynthesisCanvas';

export interface SynthesisInspectorProps {
  nodes: VisualNode[];
  connections: Connection[];
  onExit: () => void;
}

export const SynthesisInspector: React.FC<SynthesisInspectorProps> = ({
  nodes,
  connections,
  onExit
}) => {
  return (
    <div style={{ width: '320px', background: '#050507', borderLeft: '1px solid rgba(255,255,255,0.05)', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem', boxSizing: 'border-box' }}>
      <div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 950, marginBottom: '0.5rem' }}>Architecture Monitor</h3>
        <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>Real-time dependency analysis</p>
      </div>

      <div style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '20px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 900, marginBottom: '1rem', color: '#3b82f6' }}>NEURAL LOGS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {connections.map(c => {
              const from = nodes.find(n => n.id === c.fromId);
              const to = nodes.find(n => n.id === c.toId);
              return (
                <div key={c.id} style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', borderLeft: '2px solid #3b82f6', paddingLeft: '10px' }}>
                  <b>{from?.name}</b> is feeding into <b>{to?.name}</b>
                </div>
              );
            })}
            {connections.length === 0 && <div style={{ fontSize: '0.8rem', opacity: 0.3 }}>No neural links detected...</div>}
          </div>
        </div>
      </div>

      <button 
        onClick={onExit}
        style={{ padding: '1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', borderRadius: '14px', cursor: 'pointer', fontWeight: 800 }}
      >
        DESELECT EXTENSION
      </button>
    </div>
  );
};

export default SynthesisInspector;
