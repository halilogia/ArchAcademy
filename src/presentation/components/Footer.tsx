import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Github, Youtube, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <footer style={{ 
      padding: '80px 0 40px', 
      borderTop: '1px solid var(--glass-border)',
      background: 'var(--bg-dark)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '4rem',
          marginBottom: '4rem'
        }}>
          <div style={{ gridColumn: 'span 2' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 950, marginBottom: '1.5rem', letterSpacing: '-1px' }}>
              ArchAcademy
            </h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', marginBottom: '2rem', lineHeight: 1.6 }}>
              {isEn 
                ? "An engineering notebook and modern architecture archive. A practical, honest guide to mastering software complexity."
                : "Yazılım mimarisi üzerine aldığım kişisel notlar ve modern mühendislik pratikleri arşivi. Karmaşıklığı yönetmek için dürüst ve pratik bir rehber."
              }
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="https://github.com/halilogia/ArchAcademy" target="_blank" rel="noopener noreferrer" style={{ 
                width: '40px', height: '40px', 
                borderRadius: '50%', background: 'rgba(255,255,255,0.03)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid var(--glass-border)',
                color: 'white',
                transition: 'all 0.3s'
              }}>
                <Github size={18} />
              </a>
              <a href="https://www.youtube.com/@Halilogia" target="_blank" rel="noopener noreferrer" style={{ 
                width: '40px', height: '40px', 
                borderRadius: '50%', background: 'rgba(255,255,255,0.03)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid var(--glass-border)',
                color: 'white',
                transition: 'all 0.3s'
              }}>
                <Youtube size={18} />
              </a>
              <a href="https://www.linkedin.com/in/halil-emre-k-32a590211/?locale=tr_TR" target="_blank" rel="noopener noreferrer" style={{ 
                width: '40px', height: '40px', 
                borderRadius: '50%', background: 'rgba(255,255,255,0.03)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid var(--glass-border)',
                color: 'white',
                transition: 'all 0.3s'
              }}>
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1.5rem', fontWeight: 700 }}>
              {isEn ? "Quick Links" : "Hızlı Bağlantılar"}
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', listStyle: 'none', padding: 0 }}>
              <li><Link to="/assessment" style={{ color: 'inherit', textDecoration: 'none' }}>{isEn ? "Architecture Wizard" : "Mimari Sihirbazı"}</Link></li>
              <li><Link to="/solid" style={{ color: 'inherit', textDecoration: 'none' }}>{isEn ? "SOLID Principles" : "SOLID Prensipleri"}</Link></li>
              <li><Link to="/glossary" style={{ color: 'inherit', textDecoration: 'none' }}>{isEn ? "Architect's Glossary" : "Mimari Sözlük"}</Link></li>
              <li><Link to="/workshop" style={{ color: 'inherit', textDecoration: 'none' }}>{isEn ? "Practical Workshop" : "Pratik Atölye"}</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: '1.5rem', fontWeight: 700 }}>
              {isEn ? "External Resources" : "Dış Kaynaklar"}
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', listStyle: 'none', padding: 0 }}>
              <li><a href="http://blog.cleancoder.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Uncle Bob's Blog</a></li>
              <li><a href="https://martinfowler.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Martin Fowler</a></li>
              <li><a href="https://refactoring.guru" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Refactoring Guru</a></li>
              <li><a href="https://microservices.io" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Microservices.io</a></li>
            </ul>
          </div>
        </div>
        
        <div style={{ 
          paddingTop: '40px', 
          borderTop: '1px solid rgba(255,255,255,0.05)', 
          textAlign: 'center',
          color: 'var(--text-secondary)',
          fontSize: '0.85rem',
          opacity: 0.7
        }}>
          {isEn ? "© 2026 ArchAcademy. Built with passion and clean code." : "© 2026 ArchAcademy. Sevgiyle ve temiz kodla inşa edildi."}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
