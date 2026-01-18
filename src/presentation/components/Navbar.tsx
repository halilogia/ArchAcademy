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
  Palette 
} from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const architectures = [
    { name: 'Clean Architecture (Uncle Bob)', path: '/clean-arch', color: 'var(--primary)' },
    { name: 'Vertical Slice (Jimmy Bogard)', path: '/vertical', color: '#f97316' },
    { name: 'Hexagonal (A. Cockburn)', path: '/hexagonal', color: '#10b981' },
    { name: 'Onion (J. Palermo)', path: '/onion', color: '#f43f5e' },
    { name: 'Horizontal (N-Tier)', path: '/horizontal', color: '#3b82f6' },
    { name: 'Event-Driven (EDA)', path: '/eda', color: '#a855f7' },
    { name: 'Monolith vs Microservices', path: '/system', color: '#f43f5e' },
  ];

  const disciplines = [
    { name: 'SOLID Principles', path: '/solid', color: '#6366f1' },
    { name: 'DDD (Methodology)', path: '/ddd', color: '#a78bfa' },
    { name: 'CQRS (Pattern)', path: '/cqrs', color: '#eab308' },
    { name: 'FSD (Frontend Style)', path: '/fsd', color: '#06b6d4' },
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
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          
          {/* CATALOG DROPDOWN */}
          <div 
            onMouseEnter={() => setOpenDropdown('curriculum')} 
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
              Katalog <ChevronDown size={14} />
            </button>
            {openDropdown === 'curriculum' && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '450px',
                background: 'rgba(10, 15, 30, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--glass-border)',
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1.5rem'
              }}>
                <div>
                  <h5 style={{ fontSize: '0.7rem', color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '1px' }}>Mimariler</h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {architectures.map(item => (
                      <Link key={item.path} to={item.path} style={{ fontSize: '0.8rem', color: 'white', opacity: 0.7, textDecoration: 'none', padding: '0.4rem 0', transition: 'all 0.2s' }}>
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 style={{ fontSize: '0.7rem', color: '#a78bfa', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '1px' }}>Disiplinler</h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {disciplines.map(item => (
                      <Link key={item.path} to={item.path} style={{ fontSize: '0.8rem', color: 'white', opacity: 0.7, textDecoration: 'none', padding: '0.4rem 0', transition: 'all 0.2s' }}>
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
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
                <Link to="/compare" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem', borderRadius: '10px', textDecoration: 'none', color: 'white', background: 'rgba(255,255,255,0.03)' }}>
                  <div style={{ color: 'var(--primary)' }}><Zap size={18} /></div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Master Matrix</div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.5 }}>Mimari Karşılaştırma</div>
                  </div>
                </Link>
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
                <Link to="/project-arch" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1rem', borderRadius: '8px', textDecoration: 'none', color: 'white' }}>
                  <Code2 size={16} style={{ color: '#10b981' }} />
                  <span style={{ fontSize: '0.85rem' }}>Project Architecture</span>
                </Link>

              </div>
            )}
          </div>

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
            <Sparkles size={14} /> Wizard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
