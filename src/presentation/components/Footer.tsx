import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ 
      padding: '80px 0 40px', 
      borderTop: '1px solid var(--glass-border)',
      background: 'var(--bg-dark)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '4rem',
          marginBottom: '4rem'
        }}>
          <div style={{ gridColumn: 'span 2' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
              CleanArch Academy
            </h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', marginBottom: '2rem' }}>
              En iyi mühendislik pratiklerini öğrenin ve projelerinizde uygulayın. 
              Sürdürülebilir mimariler ile geleceği inşa edin.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="https://github.com/halilogia/ArchAcademy" target="_blank" rel="noopener noreferrer" style={{ 
                width: '40px', height: '40px', 
                borderRadius: '50%', background: 'var(--glass)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid var(--glass-border)',
                color: 'white'
              }}>
                <Github size={20} />
              </a>
              <a href="https://twitter.com/archacademy" target="_blank" rel="noopener noreferrer" style={{ 
                width: '40px', height: '40px', 
                borderRadius: '50%', background: 'var(--glass)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid var(--glass-border)',
                color: 'white'
              }}>
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com/company/archacademy" target="_blank" rel="noopener noreferrer" style={{ 
                width: '40px', height: '40px', 
                borderRadius: '50%', background: 'var(--glass)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '1px solid var(--glass-border)',
                color: 'white'
              }}>
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1.5rem' }}>Kaynaklar</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', listStyle: 'none', padding: 0 }}>
              <li><a href="http://blog.cleancoder.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Uncle Bob'un Blogu</a></li>
              <li><Link to="/solid" style={{ color: 'inherit', textDecoration: 'none' }}>Solid Prensipleri</Link></li>
              <li><Link to="/glossary" style={{ color: 'inherit', textDecoration: 'none' }}>Design Patterns</Link></li>
              <li><Link to="/refactoring" style={{ color: 'inherit', textDecoration: 'none' }}>Case Studies</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: '1.5rem' }}>Topluluk</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', listStyle: 'none', padding: 0 }}>
              <li><a href="https://discord.gg/archacademy" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Discord Sunucusu</a></li>
              <li><a href="https://linkedin.com/company/archacademy" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn Grubu</a></li>
              <li><Link to="/workshop" style={{ color: 'inherit', textDecoration: 'none' }}>Atölye Çalışmaları</Link></li>
              <li><a href="https://archacademy.substack.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Bülten</a></li>
            </ul>
          </div>
        </div>
        
        <div style={{ 
          paddingTop: '40px', 
          borderTop: '1px solid var(--glass-border)', 
          textAlign: 'center',
          color: 'var(--text-secondary)',
          fontSize: '0.85rem'
        }}>
          © 2026 CleanArch Academy. Tüm hakları saklıdır. Antigravity tarafından tasarlandı.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
