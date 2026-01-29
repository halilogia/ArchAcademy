import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Layers, 
  ChevronDown, 
  Zap, 
  Target, 
  Scissors, 
  BookOpen, 
  Cpu, 
  Sparkles, 
  Code2, 
  Map, 
  Palette,
  GitBranch,
  Search,
  Command,
  Library
} from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const architectures = [
    { name: 'Clean Architecture', path: '/clean-arch', color: 'var(--primary)' },
    { name: 'Onion Architecture', path: '/onion', color: '#f43f5e' },
    { name: 'Hexagonal (Ports)', path: '/hexagonal', color: '#10b981' },
    { name: 'Vertical Slice', path: '/vertical', color: '#f97316' },
    { name: 'n-Tier (Horizontal)', path: '/horizontal', color: '#3b82f6' },
    { name: 'FSD (Frontend)', path: '/fsd', color: '#06b6d4' },
    { name: 'Event-Driven (EDA)', path: '/eda', color: '#a855f7' },
    { name: 'Microservices vs Monolith', path: '/system', color: '#f43f5e' },
    { name: 'Microkernel (Plug-in)', path: '/microkernel', color: '#3b82f6' },
    { name: 'Serverless (FaaS)', path: '/serverless', color: '#ec4899' },
    { name: 'Space-Based Arch', path: '/space-based', color: '#eab308' },
    { name: 'Peer-to-Peer (P2P)', path: '/p2p', color: '#10b981' },
    { name: 'SOA (Service Oriented)', path: '/soa', color: '#3b82f6' },
    { name: 'Event Sourcing', path: '/event-sourcing', color: '#6366f1' },
    { name: 'Broker (Kafka Style)', path: '/broker', color: '#fda4af' },
    { name: 'Orchestration', path: '/orchestration', color: '#8b5cf6' },
    { name: 'Choreography', path: '/choreography', color: '#7c3aed' },
    { name: 'Big Data (Lambda/Kappa)', path: '/big-data', color: '#06b6d4' },
    { name: 'Pipe-Filter (Pipeline)', path: '/pipe-filter', color: '#8b5cf6' },
    { name: 'Interpreter Logic', path: '/interpreter', color: '#6366f1' },
    { name: 'MVC / MVP / MVVM', path: '/mvc', color: '#10b981' },
    { name: 'ECS (System Design)', path: '/ecs', color: '#059669' },
    { name: 'Evolutionary Arch', path: '/evolution', color: '#ec4899' },
    { name: 'Object-Oriented Arch', path: '/object-oriented', color: '#3b82f6' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      zIndex: 1000,
      background: 'rgba(2, 6, 23, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--glass-border)'
    }}>
      <div className="container" style={{
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            background: 'var(--primary)',
            padding: '8px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px var(--primary-glow)'
          }}>
            <Layers size={22} color="white" />
          </div>
          <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
            Arch<span style={{ color: 'var(--primary)' }}>Academy</span>
          </span>
        </Link>
        
        {/* Main Navigation */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          
          {/* CATALOGS DROPDOWN */}
          <div 
            onMouseEnter={() => setOpenDropdown('catalogs')} 
            onMouseLeave={() => setOpenDropdown(null)}
            style={{ position: 'relative' }}
          >
            <button style={{ 
              background: 'rgba(59, 130, 246, 0.1)', 
              color: '#60a5fa', 
              fontSize: '0.85rem', 
              fontWeight: 800, 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.4rem',
              padding: '0.5rem 1rem',
              borderRadius: '100px',
              transition: 'all 0.2s',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              cursor: 'pointer'
            }}>
              Kataloglar <ChevronDown size={14} />
            </button>
            {openDropdown === 'catalogs' && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '0',
                width: '260px',
                background: 'rgba(10, 15, 30, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--glass-border)',
                borderRadius: '16px',
                padding: '0.8rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem'
              }}>
                <Link to="/catalog" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.6rem 0.8rem', borderRadius: '8px', textDecoration: 'none', color: 'white', transition: 'background 0.2s' }}>
                  <div style={{ padding: '6px', background: '#3b82f620', borderRadius: '8px', color: '#3b82f6' }}><Library size={16} /></div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Sistem Mimarisi</div>
                </Link>
                <Link to="/ui-catalog" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.6rem 0.8rem', borderRadius: '8px', textDecoration: 'none', color: 'white', transition: 'background 0.2s' }}>
                  <div style={{ padding: '6px', background: '#0ea5e920', borderRadius: '8px', color: '#0ea5e9' }}><Layers size={16} /></div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>UI Mimarisi</div>
                </Link>
                <Link to="/data-ai-catalog" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.6rem 0.8rem', borderRadius: '8px', textDecoration: 'none', color: 'white', transition: 'background 0.2s' }}>
                  <div style={{ padding: '6px', background: '#8b5cf620', borderRadius: '8px', color: '#8b5cf6' }}><Sparkles size={16} /></div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Data & AI</div>
                </Link>
                <Link to="/cloud-catalog" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.6rem 0.8rem', borderRadius: '8px', textDecoration: 'none', color: 'white', transition: 'background 0.2s' }}>
                  <div style={{ padding: '6px', background: '#f9731620', borderRadius: '8px', color: '#f97316' }}><Cpu size={16} /></div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Cloud & DevOps</div>
                </Link>
                <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '0.4rem 0' }} />
                <Link to="/discipline-catalog" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.6rem 0.8rem', borderRadius: '8px', textDecoration: 'none', color: 'white', transition: 'background 0.2s' }}>
                  <div style={{ padding: '6px', background: '#10b98120', borderRadius: '8px', color: '#10b981' }}><BookOpen size={16} /></div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>Disiplin Matrisi</div>
                </Link>
              </div>
            )}
          </div>

          
          {/* LABS DROPDOWN */}
          <div 
            onMouseEnter={() => setOpenDropdown('labs')} 
            onMouseLeave={() => setOpenDropdown(null)}
            style={{ position: 'relative' }}
          >
            <button style={{ 
              background: 'transparent', 
              color: 'white', 
              fontSize: '0.85rem', 
              fontWeight: 700, 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.4rem',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              transition: 'all 0.2s',
              border: 'none',
              cursor: 'pointer'
            }}>
              Atölye <ChevronDown size={14} />
            </button>
            {openDropdown === 'labs' && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '280px',
                background: 'rgba(10, 15, 30, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--glass-border)',
                borderRadius: '16px',
                padding: '1rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <Link to="/assessment" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem', borderRadius: '10px', textDecoration: 'none', color: 'white' }}>
                  <div style={{ color: '#f59e0b' }}><Target size={18} /></div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Architect Challenge</div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.5 }}>Bilgi Testi</div>
                  </div>
                </Link>
                <Link to="/refactoring" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem', borderRadius: '10px', textDecoration: 'none', color: 'white' }}>
                  <div style={{ color: '#ef4444' }}><Scissors size={18} /></div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Code Surgery</div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.5 }}>Refactoring Atölyesi</div>
                  </div>
                </Link>
                <Link to="/roadmap" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem', borderRadius: '10px', textDecoration: 'none', color: 'white' }}>
                  <div style={{ color: '#3b82f6' }}><Map size={18} /></div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Architect Roadmap</div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.5 }}>Kariyer Yol Haritası</div>
                  </div>
                </Link>
                <Link to="/workshop" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem', borderRadius: '10px', textDecoration: 'none', color: 'white' }}>
                  <div style={{ color: '#ec4899' }}><Layers size={18} /></div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Architecture Workshop</div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.5 }}>İnteraktif Atölye</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* DOCS DROPDOWN */}
          <div 
            onMouseEnter={() => setOpenDropdown('docs')} 
            onMouseLeave={() => setOpenDropdown(null)}
            style={{ position: 'relative' }}
          >
            <button style={{ 
              background: 'transparent', 
              color: 'white', 
              fontSize: '0.85rem', 
              fontWeight: 700, 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.4rem',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              transition: 'all 0.2s',
              border: 'none',
              cursor: 'pointer'
            }}>
              Referans <ChevronDown size={14} />
            </button>
            {openDropdown === 'docs' && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                width: '240px',
                background: 'rgba(10, 15, 30, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--glass-border)',
                borderRadius: '16px',
                padding: '1rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem'
              }}>
                <Link to="/glossary" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem', borderRadius: '8px', textDecoration: 'none', color: 'white' }}>
                  <BookOpen size={16} style={{ color: 'var(--primary)' }} />
                  <span style={{ fontSize: '0.85rem' }}>Terimler Sözlüğü</span>
                </Link>
                <Link to="/library" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem', borderRadius: '8px', textDecoration: 'none', color: 'white' }}>
                  <Library size={16} style={{ color: '#f59e0b' }} />
                  <span style={{ fontSize: '0.85rem' }}>Usta Kitaplığı</span>
                </Link>
                <Link to="/project-arch" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem', borderRadius: '8px', textDecoration: 'none', color: 'white' }}>
                  <Code2 size={16} style={{ color: '#10b981' }} />
                  <span style={{ fontSize: '0.85rem' }}>Project Architecture</span>
                </Link>

              </div>
            )}
          </div>

          {/* SEARCH BUTTON */}
          <button 
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }))}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--glass-border)',
              borderRadius: '10px',
              padding: '0.4rem 0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              color: 'var(--text-secondary)',
              marginLeft: '0.5rem'
            }}
          >
            <Search size={14} />
            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Ara...</span>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              background: 'rgba(255,255,255,0.08)',
              padding: '2px 5px',
              borderRadius: '4px',
              fontSize: '0.6rem'
            }}>
              <Command size={10} /><span>K</span>
            </div>
          </button>

        </div>

        {/* Global Action / Progress Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ height: '24px', width: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
          <Link to="/compare" style={{
            background: 'var(--primary)',
            color: 'white',
            padding: '0.6rem 1.2rem',
            borderRadius: '100px',
            fontWeight: 800,
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            boxShadow: '0 6px 20px var(--primary-glow)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.3s'
          }}>
            <Sparkles size={14} /> Matrix
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
