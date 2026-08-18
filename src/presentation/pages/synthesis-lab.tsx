import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { SynthesisSidebar } from '../components/synthesislab/SynthesisSidebar';
import { SynthesisCanvas, VisualNode, Connection } from '../components/synthesislab/SynthesisCanvas';
import { SynthesisInspector } from '../components/synthesislab/SynthesisInspector';
import { SynthesisResultModal } from '../components/synthesislab/SynthesisResultModal';

const SynthesisLabPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const [nodes, setNodes] = useState<VisualNode[]>([
    { id: '1', type: 'Entity', name: 'User', code: 'export class User {\n  id: string;\n  email: string;\n}', x: 450, y: 200, health: 98 },
    { id: '2', type: 'Repository', name: 'UserRepository', code: 'interface IUserRepository {\n  save(user: User): void;\n}', x: 750, y: 350, health: 100 }
  ]);
  const [connections, setConnections] = useState<Connection[]>([
    { id: 'c1', fromId: '1', toId: '2' }
  ]);
  
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesizedCode, setSynthesizedCode] = useState<string | null>(null);
  const [pendingConnection, setPendingConnection] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<'explorer' | 'search' | 'git'>('explorer');

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (pendingConnection && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({ 
          x: e.clientX - rect.left, 
          y: e.clientY - rect.top 
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [pendingConnection]);

  const onDropFile = useCallback((e: React.DragEvent, type: VisualNode['type'], name: string, code: string) => {
    e.preventDefault();
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - 110;
    const y = e.clientY - rect.top - 60;

    const newNode: VisualNode = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      name,
      code,
      x,
      y,
      health: 100
    };
    setNodes(prev => [...prev, newNode]);
  }, []);

  const updateNodePosition = (id: string, x: number, y: number) => {
    setNodes(prev => prev.map(n => n.id === id ? { ...n, x, y } : n));
  };

  const handleConnect = (nodeId: string, portType: 'source' | 'target') => {
    if (portType === 'source') {
      setPendingConnection(nodeId);
    } else if (portType === 'target' && pendingConnection && pendingConnection !== nodeId) {
      const newConn: Connection = {
        id: `c-${Math.random()}`,
        fromId: pendingConnection,
        toId: nodeId
      };
      setConnections(prev => [...prev, newConn]);
      setPendingConnection(null);
    }
  };

  const handleSynthesize = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setSynthesizedCode(`// [NEURAL ARCHITECTURE MAP SYNTHESIZED]\n// Total Nodes: ${nodes.length}\n// Active Synapses: ${connections.length}\n\n${nodes.map(n => `// Node: ${n.name} (${n.type})\n// Connection Logic Generated...`).join('\n')}`);
      setIsSynthesizing(false);
    }, 1500);
  };

  return (
    <>
      <SEO
        title={isEn ? "Neural Architecture Synthesis Lab | ArchAcademy" : "Mimari Sentez Laboratuvarı | ArchAcademy"}
        description={isEn 
          ? "Interactive visual neural architecture synthesis IDE. Connect domain entities, repositories, and services on an intelligent canvas." 
          : "Görsel mimari sentez laboratuvarı ve interaktif yazılım mimarisi tuvali."
        }
        keywords="architecture synthesis, neural map, visual software architecture, dependency graph, domain modeling"
        canonicalUrl="/synthesis-lab"
      />
      <div style={{ background: '#0a0a0f', height: '100vh', width: '100vw', display: 'flex', overflow: 'hidden', position: 'fixed', inset: 0, zIndex: 1000, fontFamily: '"Outfit", sans-serif', boxSizing: 'border-box' }}>
        <SynthesisSidebar 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        <SynthesisCanvas 
          containerRef={containerRef}
          nodes={nodes}
          connections={connections}
          pendingConnection={pendingConnection}
          mousePos={mousePos}
          onDropFile={onDropFile}
          onUpdateNodePosition={updateNodePosition}
          onDeleteNode={(id) => setNodes(nodes.filter(n => n.id !== id))}
          onConnect={handleConnect}
          onSynthesize={handleSynthesize}
        />

        <SynthesisInspector 
          nodes={nodes}
          connections={connections}
          onExit={() => window.location.href = '/workshop'}
        />

        <SynthesisResultModal 
          synthesizedCode={synthesizedCode}
          onDismiss={() => setSynthesizedCode(null)}
        />
      </div>
    </>
  );
};

export default SynthesisLabPage;
