import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, MousePointer2 } from 'lucide-react';
import { SANDBOX_KIND_INDEX, SandboxEdge } from '../../../domain/entities/Sandbox';
import { useSandboxStore } from '../../../infrastructure/stores/sandboxStore';

export interface SandboxInspectorProps {
  isEn: boolean;
}

const fieldStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 10px',
  borderRadius: '8px',
  background: '#020617',
  border: '1px solid #1e293b',
  color: 'white',
  fontSize: '0.8rem',
  fontWeight: 600,
  boxSizing: 'border-box'
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  color: '#94a3b8',
  fontSize: '0.68rem',
  fontWeight: 800,
  textTransform: 'uppercase',
  letterSpacing: '0.8px',
  marginBottom: '4px'
};

export const SandboxInspector: React.FC<SandboxInspectorProps> = ({ isEn }) => {
  const nodes = useSandboxStore((state) => state.nodes);
  const edges = useSandboxStore((state) => state.edges);
  const selectedNodeId = useSandboxStore((state) => state.selectedNodeId);
  const updateNode = useSandboxStore((state) => state.updateNode);
  const removeNode = useSandboxStore((state) => state.removeNode);
  const removeEdge = useSandboxStore((state) => state.removeEdge);

  const selected = nodes.find((node) => node.id === selectedNodeId) ?? null;
  const entry = selected ? SANDBOX_KIND_INDEX[selected.kind] : null;

  return (
    <aside
      className="custom-scrollbar"
      style={{
        width: '268px',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        overflowY: 'auto',
        maxHeight: '640px',
        paddingRight: '4px'
      }}
      aria-label={isEn ? 'Component inspector' : 'Bileşen denetçisi'}
    >
      <div className="glass-card" style={{ padding: '1rem', borderTop: `2px solid ${entry?.color ?? '#334155'}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: entry?.color ?? '#64748b', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
          <MousePointer2 size={12} />
          {isEn ? 'Inspector' : 'Denetçi'}
        </div>

        <AnimatePresence mode="wait">
          {!selected && (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.6, margin: 0 }}
            >
              {isEn
                ? 'Select a node on the canvas to edit its name, replica count and technology.'
                : 'Adını, kopya sayısını ve teknolojiyi düzenlemek için tuvalden bir bileşen seçin.'}
            </motion.p>
          )}

          {selected && entry && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
            >
              <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {isEn ? entry.role.en : entry.role.tr}
              </p>

              <div>
                <label style={labelStyle} htmlFor="sandbox-node-label">
                  {isEn ? 'Name' : 'Ad'}
                </label>
                <input
                  id="sandbox-node-label"
                  style={fieldStyle}
                  value={selected.label}
                  onChange={(event) => updateNode(selected.id, { label: event.target.value })}
                />
              </div>

              <div>
                <label style={labelStyle} htmlFor="sandbox-node-replicas">
                  {isEn ? 'Replicas' : 'Kopya Sayısı'}
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    id="sandbox-node-replicas"
                    type="range"
                    min={1}
                    max={9}
                    value={selected.replicas}
                    onChange={(event) => updateNode(selected.id, { replicas: Number(event.target.value) })}
                    style={{ flex: 1, accentColor: entry.color }}
                  />
                  <span style={{ color: entry.color, fontWeight: 800, fontSize: '0.9rem', minWidth: '22px', textAlign: 'right' }}>
                    x{selected.replicas}
                  </span>
                </div>
              </div>

              <div>
                <label style={labelStyle} htmlFor="sandbox-node-technology">
                  {isEn ? 'Technology' : 'Teknoloji'}
                </label>
                <input
                  id="sandbox-node-technology"
                  style={fieldStyle}
                  value={selected.technology}
                  onChange={(event) => updateNode(selected.id, { technology: event.target.value })}
                />
              </div>

              <div>
                <span style={labelStyle}>{isEn ? 'Layer' : 'Katman'}</span>
                <span style={{ fontSize: '0.78rem', color: '#cbd5e1', fontWeight: 700 }}>{entry.layer}</span>
              </div>

              <button
                type="button"
                onClick={() => removeNode(selected.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: '1px solid rgba(239,68,68,0.35)',
                  background: 'rgba(239,68,68,0.08)',
                  color: '#f87171',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <Trash2 size={13} /> {isEn ? 'Remove component' : 'Bileşeni kaldır'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="glass-card" style={{ padding: '1rem' }}>
        <span style={{ display: 'block', color: '#94a3b8', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '0.6rem' }}>
          {isEn ? `Connections (${edges.length})` : `Bağlantılar (${edges.length})`}
        </span>
        {edges.length === 0 ? (
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.75rem' }}>
            {isEn ? 'No connections yet.' : 'Henüz bağlantı yok.'}
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {edges.map((edge: SandboxEdge) => {
              const from = nodes.find((node) => node.id === edge.from);
              const to = nodes.find((node) => node.id === edge.to);
              if (!from || !to) return null;
              return (
                <div
                  key={edge.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                    padding: '6px 8px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.03)',
                    fontSize: '0.7rem',
                    color: '#cbd5e1'
                  }}
                >
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {from.label} → {to.label}
                    <span style={{ color: '#64748b', fontFamily: 'monospace', marginLeft: '4px' }}>{edge.protocol}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => removeEdge(edge.id)}
                    aria-label={isEn ? 'Remove connection' : 'Bağlantıyı kaldır'}
                    style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', display: 'flex', padding: 0 }}
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
};
