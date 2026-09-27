import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Undo2,
  Redo2,
  Trash2,
  Save,
  FolderOpen,
  MousePointerClick,
  Workflow
} from 'lucide-react';
import SEO from '../components/SEO';
import ArchHero from '../components/ArchHero';
import { SandboxPalette } from '../components/sandbox/SandboxPalette';
import { SandboxCanvas } from '../components/sandbox/SandboxCanvas';
import { SandboxInspector } from '../components/sandbox/SandboxInspector';
import { TopologyIssueList } from '../components/sandbox/TopologyIssueList';
import { AdrGeneratorPanel } from '../components/adr/AdrGeneratorPanel';
import { useProgress } from '../context/ProgressContext';
import { sandboxCatalog, useSandboxStore } from '../../infrastructure/stores/sandboxStore';
import { analyzeTopology } from '../../domain/usecases/TopologyAnalyzer';
import { SandboxDesign } from '../../domain/entities/Sandbox';

type SandboxTab = 'canvas' | 'adr';

const SandboxPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const { completeStep, saveDesign, progress, status } = useProgress();
  const [tab, setTab] = useState<SandboxTab>('canvas');
  const [savedFlash, setSavedFlash] = useState(false);

  const nodes = useSandboxStore((state) => state.nodes);
  const edges = useSandboxStore((state) => state.edges);
  const name = useSandboxStore((state) => state.name);
  const past = useSandboxStore((state) => state.past);
  const future = useSandboxStore((state) => state.future);
  const setName = useSandboxStore((state) => state.setName);
  const clear = useSandboxStore((state) => state.clear);
  const undo = useSandboxStore((state) => state.undo);
  const redo = useSandboxStore((state) => state.redo);
  const load = useSandboxStore((state) => state.load);
  const snapshot = useSandboxStore((state) => state.snapshot);

  const design = useMemo<SandboxDesign>(() => ({ id: '', name, nodes, edges, updatedAt: '' }), [edges, name, nodes]);
  const issues = useMemo(() => analyzeTopology({ nodes, edges }), [edges, nodes]);

  useEffect(() => {
    const timer = setTimeout(() => completeStep('/sandbox'), 2000);
    return () => clearTimeout(timer);
  }, [completeStep]);

  const persist = useCallback(() => {
    const draft = snapshot();
    saveDesign(draft);
    completeStep('/sandbox');
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2200);
  }, [completeStep, saveDesign, snapshot]);

  const savedDesigns = progress.designs;

  const loadDesign = (target: SandboxDesign) => {
    load(target);
    setTab('canvas');
  };

  const toolbarButton = (
    icon: React.ReactNode,
    label: string,
    onClick: () => void,
    disabled = false
  ) => (
    <button
      key={label}
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '32px',
        height: '32px',
        borderRadius: '9px',
        border: '1px solid rgba(255,255,255,0.1)',
        background: disabled ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)',
        color: disabled ? '#475569' : '#cbd5e1',
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
    >
      {icon}
    </button>
  );

  return (
    <>
      <SEO
        title={isEn ? 'System Design Sandbox & ADR Generator | ArchAcademy' : 'Sistem Tasarım Sandbox ve ADR Üreticisi | ArchAcademy'}
        description={isEn
          ? 'Drag and drop load balancers, message queues, databases and cache layers onto a topology canvas, review the risks and export a MADR decision record.'
          : 'Yük dengeleyici, mesaj kuyruğu, veritabanı ve cache katmanlarını sürükleyip bırakarak topoloji tuvaline yerleştirin, riskleri inceleyin ve MADR karar kaydı üretin.'}
        keywords="system design sandbox, drag and drop architecture, adr generator, madr, topology canvas, load balancer, message queue, cache layer"
        canonicalUrl="/sandbox"
      />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
        <ArchHero
          title="System Design"
          subtitle={isEn ? 'Sandbox' : 'Sandbox'}
          description={isEn
            ? 'Compose a production topology by dragging components onto the canvas. The reviewer flags single points of failure, exposed databases and unconsumed queues, and the ADR generator turns your canvas into a versioned decision record.'
            : 'Bileşenleri tuvale sürükleyerek üretim topolojisi kurun. Denetçi tek hata noktalarını, açıkta kalan veritabanlarını ve tüketilmeyen kuyrukları işaretler; ADR üreticisi ise tuvalinizi sürümlenmiş bir karar kaydına dönüştürür.'}
          badge={isEn ? 'Phase 2 · Interactive' : 'Faz 2 · İnteraktif'}
          color="#3b82f6"
          illustration={
            <div style={{ position: 'relative', width: '260px', height: '220px' }}>
              {[
                { label: 'Client', x: 10, y: 10, color: '#38bdf8' },
                { label: 'LB', x: 96, y: 74, color: '#6366f1' },
                { label: 'Service', x: 150, y: 10, color: '#3b82f6' },
                { label: 'Cache', x: 182, y: 120, color: '#84cc16' },
                { label: 'DB', x: 92, y: 158, color: '#10b981' }
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    position: 'absolute',
                    left: item.x,
                    top: item.y,
                    padding: '6px 12px',
                    borderRadius: '10px',
                    background: 'rgba(2,6,23,0.9)',
                    border: `1px solid ${item.color}`,
                    color: '#e2e8f0',
                    fontSize: '0.7rem',
                    fontWeight: 700
                  }}
                >
                  {item.label}
                </div>
              ))}
              <svg width="260" height="220" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                <line x1="78" y1="28" x2="96" y2="88" stroke="rgba(148,163,184,0.5)" strokeWidth="1.5" />
                <line x1="140" y1="88" x2="150" y2="28" stroke="rgba(148,163,184,0.5)" strokeWidth="1.5" />
                <line x1="132" y1="100" x2="182" y2="134" stroke="rgba(148,163,184,0.5)" strokeWidth="1.5" />
                <line x1="116" y1="104" x2="112" y2="158" stroke="rgba(148,163,184,0.5)" strokeWidth="1.5" />
              </svg>
            </div>
          }
          features={[
            {
              icon: <MousePointerClick size={20} />,
              title: isEn ? 'Drag & Drop Topology' : 'Sürükle Bırak Topoloji',
              desc: isEn
                ? '13 infrastructure components across four tiers. Click a card or drag it onto the canvas.'
                : 'Dört katmana dağılmış 13 altyapı bileşeni. Kartı tıklayın ya da tuvale sürükleyin.'
            },
            {
              icon: <Workflow size={20} />,
              title: isEn ? 'Instant Risk Review' : 'Anlık Risk Denetimi',
              desc: isEn
                ? 'SPOF, exposed databases, unconsumed queues and request cycles are flagged as you build.'
                : 'Tek hata noktaları, açık veritabanları, tüketilmeyen kuyruklar ve döngüler anında işaretlenir.'
            },
            {
              icon: <Save size={20} />,
              title: isEn ? 'MADR Export' : 'MADR Dışa Aktarım',
              desc: isEn
                ? 'The canvas becomes a MADR 3.0 markdown record with Mermaid diagram, inventory and open risks.'
                : 'Tuvel; Mermaid diyagramı, envanter ve açık risklerle MADR 3.0 markdown kaydına dönüşür.'
            }
          ]}
        >
          <div
            style={{
              display: 'inline-flex',
              padding: '6px',
              background: 'rgba(15,23,42,0.6)',
              borderRadius: '24px',
              border: '1px solid rgba(255,255,255,0.06)',
              gap: '4px',
              backdropFilter: 'blur(10px)'
            }}
          >
            {[
              { id: 'canvas' as const, label: isEn ? 'Topology Canvas' : 'Topoloji Tuvali' },
              { id: 'adr' as const, label: isEn ? 'ADR Generator' : 'ADR Üreticisi' }
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '18px',
                  border: 'none',
                  background: tab === item.id ? '#3b82f6' : 'transparent',
                  color: tab === item.id ? 'white' : 'rgba(255,255,255,0.55)',
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  transition: 'all 0.3s ease'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </ArchHero>

        <div className="container" style={{ marginTop: '2rem', paddingBottom: '6rem' }}>
          <div
            className="glass-card"
            style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}
          >
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              aria-label={isEn ? 'Design name' : 'Tasarım adı'}
              style={{
                flex: 1,
                minWidth: '220px',
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '1.05rem',
                fontWeight: 800,
                outline: 'none'
              }}
            />
            <span style={{ fontSize: '0.7rem', color: '#64748b', fontFamily: 'monospace' }}>
              {nodes.length} {isEn ? 'nodes' : 'düğüm'} · {edges.length} {isEn ? 'edges' : 'bağlantı'}
            </span>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {toolbarButton(<Undo2 size={15} />, isEn ? 'Undo' : 'Geri al', undo, past.length === 0)}
              {toolbarButton(<Redo2 size={15} />, isEn ? 'Redo' : 'İleri al', redo, future.length === 0)}
              {toolbarButton(<Trash2 size={15} />, isEn ? 'Clear canvas' : 'Tuvali temizle', clear)}
              <button
                type="button"
                onClick={persist}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '9px',
                  border: 'none',
                  background: savedFlash ? '#10b981' : '#3b82f6',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                <Save size={14} />
                {savedFlash ? (isEn ? 'Saved' : 'Kaydedildi') : isEn ? 'Save design' : 'Tasarımı kaydet'}
              </button>
            </div>
            <span style={{ fontSize: '0.65rem', color: status === 'synced' ? '#10b981' : '#64748b' }}>
              {status === 'synced'
                ? isEn
                  ? 'cloud synced'
                  : 'bulut senkron'
                : status === 'offline'
                  ? isEn
                    ? 'offline queue'
                    : 'çevrimdışı kuyruk'
                  : status === 'error'
                    ? isEn
                      ? 'sync error'
                      : 'senkron hatası'
                    : isEn
                      ? 'syncing'
                      : 'senkronlanıyor'}
            </span>
          </div>

          {tab === 'canvas' ? (
            <>
              <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <SandboxPalette catalog={sandboxCatalog} isEn={isEn} />
                <div style={{ flex: 1, minWidth: '420px' }}>
                  <SandboxCanvas isEn={isEn} />
                  <p style={{ color: '#64748b', fontSize: '0.7rem', margin: '0.6rem 0 0' }}>
                    {isEn
                      ? 'Drag a card onto the canvas or click it to add to the center. Double-click a node then click another node to connect them. Click a protocol label to remove a connection.'
                      : 'Bir kartı tuvale sürükleyin ya da merkeze eklemek için tıklayın. Bağlantı kurmak için bir bileşene çift tıklayıp ardından hedef bileşene tıklayın. Bağlantıyı kaldırmak için protokol etiketine tıklayın.'}
                  </p>
                </div>
                <SandboxInspector isEn={isEn} />
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <TopologyIssueList issues={issues} isEn={isEn} />
              </div>

              {savedDesigns.length > 0 && (
                <div className="glass-card" style={{ padding: '1.25rem', marginTop: '1.5rem' }}>
                  <span style={{ display: 'block', color: '#94a3b8', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '0.6rem' }}>
                    {isEn ? 'Synced designs' : 'Senkronlanan tasarımlar'}
                  </span>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {savedDesigns.map((entry) => (
                      <button
                        key={entry.id}
                        type="button"
                        onClick={() => loadDesign(entry)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '7px 13px',
                          borderRadius: '10px',
                          border: '1px solid rgba(59,130,246,0.3)',
                          background: 'rgba(59,130,246,0.08)',
                          color: '#bfdbfe',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        <FolderOpen size={13} />
                        {entry.name} · {entry.nodes.length}/{entry.edges.length}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <AdrGeneratorPanel design={design} issues={issues} isEn={isEn} onSave={() => persist()} />
          )}
        </div>
      </motion.div>
    </>
  );
};

export default SandboxPage;
