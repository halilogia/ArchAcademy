import React from 'react';
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
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" style={{ 
                  width: '40px', height: '40px', 
                  borderRadius: '50%', background: 'var(--glass)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '1px solid var(--glass-border)'
                }}>
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '1.5rem' }}>Kaynaklar</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <li><a href="#">Uncle Bob'un Blogu</a></li>
              <li><a href="#">Solid Prensipleri</a></li>
              <li><a href="#">Design Patterns</a></li>
              <li><a href="#">Case Studies</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: '1.5rem' }}>Topluluk</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <li><a href="#">Discord Sunucusu</a></li>
              <li><a href="#">LinkedIn Grubu</a></li>
              <li><a href="#">Etkinlikler</a></li>
              <li><a href="#">Bülten</a></li>
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
