import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Globe,
  Network,
  Shield,
  Server,
  Boxes,
  Zap,
  Radio,
  Cpu,
  Database,
  HardDrive,
  Search,
  Layers
} from 'lucide-react';
import { SandboxCatalogEntry, SandboxNodeLayer } from '../../../domain/entities/Sandbox';
import { SANDBOX_DRAG_TYPE, useSandboxStore } from '../../../infrastructure/stores/sandboxStore';

const LAYER_META: Record<SandboxNodeLayer, { label: { tr: string; en: string }; icon: React.ReactNode; color: string }> = {
  edge: { label: { tr: 'Uç Katman', en: 'Edge Tier' }, icon: <Globe size={12} />, color: '#38bdf8' },
  application: { label: { tr: 'Uygulama Katmanı', en: 'Application Tier' }, icon: <Server size={12} />, color: '#3b82f6' },
  integration: { label: { tr: 'Entegrasyon', en: 'Integration' }, icon: <Network size={12} />, color: '#f59e0b' },
  data: { label: { tr: 'Veri Katmanı', en: 'Data Tier' }, icon: <Database size={12} />, color: '#10b981' }
};

const ICONS: Record<string, React.ReactNode> = {
  client: <Globe size={15} />,
  cdn: <Network size={15} />,
  loadBalancer: <Shield size={15} />,
  gateway: <Shield size={15} />,
  service: <Server size={15} />,
  container: <Boxes size={15} />,
  function: <Zap size={15} />,
  queue: <Radio size={15} />,
  worker: <Cpu size={15} />,
  db: <Database size={15} />,
  cache: <HardDrive size={15} />,
  objectStore: <HardDrive size={15} />,
  search: <Search size={15} />
};

export interface SandboxPaletteProps {
  catalog: SandboxCatalogEntry[];
  isEn: boolean;
}

export const SandboxPalette: React.FC<SandboxPaletteProps> = ({ catalog, isEn }) => {
  const addNodeAtCenter = useSandboxStore((state) => state.addNodeAtCenter);
  const [draggingKind, setDraggingKind] = useState<string | null>(null);

  const layers: SandboxNodeLayer[] = ['edge', 'application', 'integration', 'data'];

  return (
    <aside
      className="custom-scrollbar"
      style={{
        width: '236px',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        overflowY: 'auto',
        maxHeight: '640px',
        paddingRight: '4px'
      }}
      aria-label={isEn ? 'Component palette' : 'Bileşen paleti'}
    >
      {layers.map((layer) => {
        const entries = catalog.filter((entry) => entry.layer === layer);
        if (entries.length === 0) return null;
        return (
          <div key={layer} className="glass-card" style={{ padding: '1rem', borderTop: `2px solid ${LAYER_META[layer].color}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: LAYER_META[layer].color, fontSize: '0.68rem', fontWeight: 800, letterSpacing: '1.2px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              {LAYER_META[layer].icon}
              {isEn ? LAYER_META[layer].label.en : LAYER_META[layer].label.tr}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {entries.map((entry) => (
                <motion.button
                  key={entry.kind}
                  type="button"
                  draggable
                  onDragStart={(event) => {
                    const nativeEvent = event as unknown as React.DragEvent;
                    nativeEvent.dataTransfer?.setData(SANDBOX_DRAG_TYPE, entry.kind);
                    if (nativeEvent.dataTransfer) nativeEvent.dataTransfer.effectAllowed = 'copy';
                    setDraggingKind(entry.kind);
                  }}
                  onDragEnd={() => setDraggingKind(null)}
                  onClick={() => addNodeAtCenter(entry.kind)}
                  whileHover={{ scale: 1.02 }}
                  title={isEn ? entry.role.en : entry.role.tr}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.55rem 0.7rem',
                    borderRadius: '10px',
                    cursor: 'grab',
                    textAlign: 'left',
                    background: draggingKind === entry.kind ? `${entry.color}22` : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${draggingKind === entry.kind ? `${entry.color}66` : 'rgba(255,255,255,0.06)'}`,
                    color: '#cbd5e1',
                    fontSize: '0.78rem',
                    fontWeight: 600
                  }}
                >
                  <span style={{ color: entry.color, display: 'flex', flexShrink: 0 }}>
                    {ICONS[entry.kind] ?? <Layers size={15} />}
                  </span>
                  <span style={{ lineHeight: 1.25 }}>{isEn ? entry.name.en : entry.name.tr}</span>
                </motion.button>
              ))}
            </div>
          </div>
        );
      })}
    </aside>
  );
};
