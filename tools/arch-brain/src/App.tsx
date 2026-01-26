import React, { useState, useEffect, useRef, useMemo } from 'react';
// @ts-ignore
import ForceGraph3D from '3d-force-graph';
// @ts-ignore
import { forceRadial } from 'd3-force';
import { AnimatePresence } from 'framer-motion';
import './styles/globals.css';
import { NeuralNode, colorMap } from './types';
import { neuralEngine } from './styles/App.css';
import { panel, panelHeader, codeBox, btnDanger, btnMini } from './styles/Panels.css';
import { vars } from './styles/theme.css';

// Components
import { Header } from './components/layout/Header';
import { Sidebar } from './components/panels/Sidebar';
import { CodePanel } from './components/panels/CodePanel';
import { DocsPanel, SettingsPanel } from './components/panels/OverlayPanels';

const App: React.FC = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [selectedNode, setSelectedNode] = useState<NeuralNode | null>(null);
  const [hoverNode, setHoverNode] = useState<NeuralNode | null>(null);
  const [isSidebarMinimized, setSidebarMinimized] = useState(localStorage.getItem('arch_sidebarMinimized') === 'true');
  const [activePanel, setActivePanel] = useState<'none' | 'docs' | 'settings'>('none');
  const [logs, setLogs] = useState<string[]>(['> Neural Systems Initiated...']);
  const [serverStatus, setServerStatus] = useState({ uptime: 0, watcher: '...', mcp: '...' });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<NeuralNode[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  
  // State for dynamic colors
  const [activeColorMap, setActiveColorMap] = useState<Record<string, string>>({ ...colorMap });

  const containerRef = useRef<HTMLDivElement>(null);
  const graphRef = useRef<any>(null);

  // Persistence
  const [nodeSize, setNodeSize] = useState(Number(localStorage.getItem('arch_nodeSize')) || 8);
  const [linkDist, setLinkDist] = useState(Number(localStorage.getItem('arch_linkDist')) || 200);
  const [linkThickness, setLinkThickness] = useState(Number(localStorage.getItem('arch_linkThickness')) || 2);
  
  const [inboundColor, setInboundColor] = useState(localStorage.getItem('arch_inboundColor') || '#d946ef');
  const [outboundColor, setOutboundColor] = useState(localStorage.getItem('arch_outboundColor') || '#22d3ee');

  // Derived Highlight Data
  const highlightedLinks = useMemo(() => {
    if (!graphData.links || (!hoverNode && !selectedNode)) return new Set();
    const activeId = selectedNode?.id || hoverNode?.id;
    return new Set(graphData.links.filter((l: any) => {
        const sourceId = l.source?.id || l.source;
        const targetId = l.target?.id || l.target;
        return sourceId === activeId || targetId === activeId;
    }));
  }, [hoverNode, selectedNode, graphData]);

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-50), `> [${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleRestart = async () => {
    console.log("SENTINEL: Triggering Server Restart...");
    addLog("Neural Reboot Sequence Engaged...");
    try {
      const res = await fetch('/api/restart', { method: 'POST' });
      if (res.ok) addLog("Restart Signal Latched.");
    } catch (e) {
      addLog("⚠️ Restart Signal Sent. Waiting for re-sync...");
    }
  };

  const fetchStatus = async () => {
    try {
      const res = await fetch('/api/status');
      const data = await res.json();
      setServerStatus(data);
    } catch (e) { }
  };

  const [connectionError, setConnectionError] = useState(false);

  // ... (inside fetchStatus or fetchScan)
  const fetchScan = async () => {
    try {
      const res = await fetch('/api/scan');
      if (!res.ok) throw new Error(res.statusText);
      const rawData = await res.json();
      setConnectionError(false);
      
      const data = {
        nodes: rawData.nodes || [],
        links: rawData.edges || rawData.links || []
      };

      setGraphData(data);
      if (graphRef.current) {
        // Safety check to prevent d3 crash on empty/bad data
        const safeNodes = data.nodes.map((n: any) => ({ ...n }));
        const safeLinks = data.links.map((l: any) => ({ ...l }));
        graphRef.current.graphData({ nodes: safeNodes, links: safeLinks });
      }
      
      if (data.nodes.length > 0) {
         addLog(`Sync Successful: ${data.nodes.length} nodes synthesized.`);
      }
      if (data.links.some((l: any) => l.violation)) {
         addLog("⚠️ ARCHITECTURE BREACH: Domain rules compromised!");
      }
    } catch (e) {
      setConnectionError(true);
      addLog("Core Offline. Check server connection.");
    }
  };

  // Sync simulation settings
  useEffect(() => {
    if (graphRef.current && graphData.nodes.length > 0 && !isPaused) {
       try {
         graphRef.current.d3ReheatSimulation();
       } catch (e) { }
    }
  }, [nodeSize, linkDist, activeColorMap, graphData, linkThickness, isPaused]);

  // ... (rendering)


  const handleToggleWatcher = async () => {
    try {
      const res = await fetch('/api/toggle-watcher', { method: 'POST' });
      const data = await res.json();
      addLog(`Watcher Shift: ${data.status}`);
    } catch(e) {}
  };

  const handleToggleMCP = async () => {
    try {
      const res = await fetch('/api/toggle-mcp', { method: 'POST' });
      const data = await res.json();
      addLog(`MCP Status: ${data.status}`);
    } catch(e) {}
  };

  const handleManualScan = () => {
    fetchScan();
    addLog("Tactical Sync Initiated.");
  };

  const zoomToNode = (targetNode: NeuralNode) => {
    if (!graphRef.current) return;
    
    // Lookup the actual node object in the graph's internal data to get current coordinates
    const graphNodes = graphRef.current.graphData().nodes;
    const activeNode = graphNodes.find((n: any) => n.id === targetNode.id);

    if (!activeNode || !activeNode.x) {
        addLog(`Target ${targetNode.label} not visible in nebula.`);
        return;
    }

    const distance = 120;
    const distRatio = 1 + distance/Math.hypot(activeNode.x, activeNode.y || 0, activeNode.z || 0);
    graphRef.current.cameraPosition(
        { x: activeNode.x * distRatio, y: (activeNode.y || 0) * distRatio, z: (activeNode.z || 0) * distRatio },
        activeNode,
        2000
    );
    setSearchQuery('');
    setSearchResults([]);
    addLog(`Target Acquired: ${activeNode.label}`);
    setSelectedNode(activeNode);
  };

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    if (!q) {
      setSearchResults([]);
      return;
    }
    // Search in the state data
    const matches = graphData.nodes.filter((n: any) => 
        n.label.toLowerCase().includes(q.toLowerCase())
    ).slice(0, 5);
    setSearchResults(matches);
  };

  // Robust Graph Initialization with Cleanup Safety
  useEffect(() => {
    let isMounted = true;
    let graphInstance: any = null;

    const initGraph = async () => {
        if (!containerRef.current) return;
        
        // Small delay to ensure DOM is stable
        await new Promise(r => setTimeout(r, 100));
        if (!isMounted) return;

        // @ts-ignore
        graphInstance = ForceGraph3D()(containerRef.current)
          .backgroundColor('#020617')
          .nodeColor((node: any) => node.isOrphan ? '#475569' : (activeColorMap[node.category] || '#ffffff'))
          .nodeVal((node: any) => 6 + (node.criticality || 0) * 1)
          .nodeRelSize(nodeSize)
          .nodeLabel((node: any) => `
            <div class="node-hover-card">
                <div class="glow-bar" style="background: ${node.isOrphan ? '#475569' : (activeColorMap[node.category] || '#ffffff')}"></div>
                <strong>${node.label} ${node.isOrphan ? '💀' : ''}</strong>
                <span>${node.category}</span>
                <div class="stats" style="display: flex; gap: 8px; justify-content: center; margin-top: 4px;">
                    <span style="color:#4ade80">↘ In: ${node.inDegree}</span>
                    <span style="color:#f472b6">↗ Out: ${node.outDegree}</span>
                </div>
                ${node.isOrphan ? '<div style="color:#ef4444; font-size:9px; margin-top:5px; font-weight:900">⚠️ ORPHAN (DEAD CODE)</div>' : ''}
            </div>
          `)
          .onNodeClick((node: any) => setSelectedNode(node))
          .onNodeHover((node: any) => setHoverNode(node))
          .linkColor((link: any) => {
              const activeId = selectedNode?.id || hoverNode?.id;
              if (link.violation) return '#ef4444';
              
              if (activeId) {
                  const sourceId = link.source?.id || link.source;
                  const targetId = link.target?.id || link.target;
                  if (sourceId === activeId) return outboundColor; // DYNAMIC OUTBOUND
                  if (targetId === activeId) return inboundColor; // DYNAMIC INBOUND
                  return 'rgba(71, 85, 105, 0.05)'; // Ghost everything else
              }
              return '#334155'; // Calm default
          })
          .linkOpacity((link: any) => {
             const activeId = selectedNode?.id || hoverNode?.id;
             if (!activeId) return 0.2;
             return highlightedLinks.has(link) ? 1 : 0.05; // High contrast isolation
          })
          .linkWidth((link: any) => {
              const activeId = selectedNode?.id || hoverNode?.id;
              if (activeId && (link.source?.id || link.source) === activeId) return linkThickness * 2; // Thicker Outbound
              return linkThickness;
          })
          .linkCurvature(0.2)
          .linkDirectionalArrowLength((link: any) => highlightedLinks.has(link) ? 6 : 0)
          .linkDirectionalArrowRelPos(1)
          .linkDirectionalParticles((link: any) => {
              if (highlightedLinks.has(link)) return 15;
              return link.violation ? 4 : 0;
          })
          .linkDirectionalParticleSpeed((link: any) => {
              const activeId = selectedNode?.id || hoverNode?.id;
              const sourceId = link.source?.id || link.source;
              // OUTBOUND: Fast, energetic flow
              if (activeId && sourceId === activeId) return 0.06; 
              // INBOUND: Steady, heavy flow
              return 0.01;
          })
          .linkDirectionalParticleWidth((link: any) => highlightedLinks.has(link) ? 4 : 2)
          .width(window.innerWidth)
          .height(window.innerHeight);

        const handleResize = () => {
          if (graphInstance) {
            graphInstance.width(window.innerWidth);
            graphInstance.height(window.innerHeight);
          }
        };
        window.addEventListener('resize', handleResize);


        // ORGANIC NEBULA MODE (No forced hierarchy)
        // Allow nodes to find their natural place based on connections
        graphInstance.d3Force('charge').strength(-300); 
        graphInstance.d3Force('link').distance(200).strength(0.8);
        
        // Removed Radial Force as requested
        graphInstance.d3Force('radial', null);

        graphInstance.d3AlphaDecay(0.04); // Fast decay to settle quickly
        graphInstance.d3VelocityDecay(0.4);
        
        // AUTO-FREEZE MECHANISM
        // After 100 ticks (frames), the engine stops calculating physics.
        // It enters "Frozen State".
        graphInstance.cooldownTicks(100);

        graphInstance
          .onNodeDrag((node: any) => {
            // Unfreeze individually on drag
            node.fx = node.x;
            node.fy = node.y;
            node.fz = node.z;
          })
          .onNodeDragEnd((node: any) => {
             node.fx = node.x;
             node.fy = node.y;
             node.fz = node.z;
          });
          
        // Explicitly Prevent Interaction Wake-up
        graphInstance.onNodeHover((node: any) => {
            setHoverNode(node);
            // DO NOT WAKE UP ENGINE
        });
          
        if (isMounted) {
            graphRef.current = graphInstance;
            
            // ENSURE LINK COLORS ARE APPLIED
            graphInstance.linkColor((link: any) => {
              if (link.violation) return '#ef4444'; 
              
              const activeId = selectedNode?.id || hoverNode?.id;
              if (activeId) {
                  const sourceId = link.source?.id || link.source;
                  const targetId = link.target?.id || link.target;
                  if (sourceId === activeId) return outboundColor; 
                  if (targetId === activeId) return inboundColor; 
                  return 'rgba(71, 85, 105, 0.05)';
              }
              
              const srcCat = link.source?.category;
              const tgtCat = link.target?.category;
              if (srcCat === 'Domain' && tgtCat === 'Domain') return '#fde047';
              if (tgtCat === 'Domain') return '#22d3ee';
              if (srcCat === 'Presentation') return '#6366f1';
              if (srcCat === 'Infrastructure') return '#4ade80';
              
              return '#334155';
          });
            
            fetchScan(); 
        }
    };

    initGraph();

    const statusInterval = setInterval(() => {
        if (isMounted) fetchStatus();
    }, 3000);

    let socket: WebSocket | null = null;
    const connectWS = () => {
        socket = new WebSocket(`ws://${window.location.host}/ws`);
        socket.onmessage = (e) => {
          try {
            const data = JSON.parse(e.data);
            if (data.type === 'COMMAND' || data.action) {
                 const action = data.action || 'UNKNOWN';
                 fetchScan();
                 addLog(`MCP Uplink: Executing ${action}...`);
            }
            if (data.type === 'LOG' && data.message) {
                 addLog(data.message);
            }
          } catch(err) {}
        };
        socket.onclose = () => {
            if (isMounted) setTimeout(connectWS, 3000); // Reconnect logic
        };
    };
    
    connectWS();

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedNode(null);
        setActivePanel('none');
        setSearchResults([]);
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
        isMounted = false;
        // @ts-ignore
        if (socket && typeof socket.close === 'function') {
            try { socket.close(); } catch {}
        }
        if (graphRef.current) {
            try {
                graphRef.current.pauseAnimation();
                graphRef.current._destructor();
                graphRef.current = null;
            } catch(e) {}
        }
        clearInterval(statusInterval);
        window.removeEventListener('keydown', handleEsc);
    }
  }, []);

  // Sync visual settings & Colors
  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.nodeRelSize(nodeSize);
      graphRef.current.d3Force('link').distance(linkDist);
      graphRef.current.linkWidth((link: any) => (link.violation || highlightedLinks.has(link)) ? linkThickness * 2 : linkThickness);
      graphRef.current.nodeColor((node: any) => node.isOrphan ? '#475569' : (activeColorMap[node.category] || '#ffffff'));
      
      // FORCE LINK COLOR RE-EVALUATION (Gradient Flow Logic)
      graphRef.current.linkColor((link: any) => {
          // 1. VIOLATION (Top Priority - Solid Red)
          if (link.violation) return '#ef4444'; 
          
          // 2. INTERACTION (Focus Mode - Solid Highlighting)
          const activeId = selectedNode ? selectedNode.id : hoverNode?.id;
          if (activeId) {
              const sourceId = link.source?.id || link.source;
              const targetId = link.target?.id || link.target;
              
              if (sourceId === activeId) return outboundColor; 
              if (targetId === activeId) return inboundColor; 
              
              return 'rgba(71, 85, 105, 0.05)';
          }
          
          // 3. IDLE (Neutral Gray)
          // User requested to revert to simple gray when not interacting.
          return '#334155';
      });

      // REMOVED d3ReheatSimulation() to prevent movement on hover.
      // The graph will update visuals (colors) without restarting physics.
      
      localStorage.setItem('arch_nodeSize', nodeSize.toString());
      localStorage.setItem('arch_linkDist', linkDist.toString());
      localStorage.setItem('arch_linkThickness', linkThickness.toString());
      localStorage.setItem('arch_inboundColor', inboundColor);
      localStorage.setItem('arch_outboundColor', outboundColor);
      localStorage.setItem('arch_sidebarMinimized', isSidebarMinimized.toString());
    }
  }, [nodeSize, linkDist, activeColorMap, linkThickness, inboundColor, outboundColor, selectedNode, hoverNode]);

  // Separate effect for sidebar persistence only
  useEffect(() => {
    localStorage.setItem('arch_sidebarMinimized', isSidebarMinimized.toString());
  }, [isSidebarMinimized]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden', background: '#020617' }}>
      {connectionError && (
          <div style={{
              position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
              background: 'rgba(2,6,23,0.95)', zIndex: 9999, display: 'flex', 
              flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              color: '#ef4444', fontFamily: 'monospace'
          }}>
              <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>⚠️ SERVER DISCONNECTED</h1>
              <p>Sentinel Core cannot reach the Neural Backend.</p>
              <p style={{ color: '#94a3b8', marginBottom: '30px' }}>Ensure `node backend/server.js` is running on port 5050.</p>
              <button 
                  onClick={fetchScan} 
                  style={{ 
                      padding: '12px 24px', background: '#3b82f6', border: 'none', 
                      borderRadius: '8px', color: 'white', cursor: 'pointer', fontWeight: 'bold' 
                  }}
              >
                  RETRY LINK
              </button>
          </div>
      )}

      <Header 
         onOpenDocs={() => setActivePanel('docs')}
         onOpenSettings={() => setActivePanel('settings')}
         onScan={fetchScan}
         searchQuery={searchQuery}
         onSearch={handleSearch}
         searchResults={searchResults}
         onResultClick={zoomToNode}
      />

      <div ref={containerRef} id="3d-graph" style={{ width: '100%', height: '100%' }} />

      <Sidebar 
         isMinimized={isSidebarMinimized}
         onToggle={() => setSidebarMinimized(!isSidebarMinimized)}
         logs={logs}
         serverStatus={serverStatus}
         onToggleWatcher={handleToggleWatcher}
         onToggleMCP={handleToggleMCP}
         onManualScan={handleManualScan}
         onResetView={() => graphRef.current?.zoomToFit(1000)}
         onRestartServer={handleRestart}
      />

      <AnimatePresence>
        {selectedNode && <CodePanel selectedNode={selectedNode} onClose={() => setSelectedNode(null)} />}
        
        {activePanel === 'docs' && <DocsPanel onClose={() => setActivePanel('none')} />}
        
        {activePanel === 'settings' && (
          <SettingsPanel 
             onClose={() => setActivePanel('none')}
          nodeSize={nodeSize}
          setNodeSize={setNodeSize}
          linkDist={linkDist}
          setLinkDist={setLinkDist}
          linkThickness={linkThickness}
          setLinkThickness={setLinkThickness}
          colorMap={activeColorMap}
          setColorMap={setActiveColorMap}
          inboundColor={inboundColor}
          setInboundColor={setInboundColor}
          outboundColor={outboundColor}
          setOutboundColor={setOutboundColor}
        />
        )}
      </AnimatePresence>
    </div>
  );


};

export default App;
