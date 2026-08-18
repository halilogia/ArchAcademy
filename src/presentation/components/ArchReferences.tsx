import { Link } from 'react-router-dom';
import { ExternalLink, BookOpen } from 'lucide-react';

const ArchReferences = () => {
  return (
    <div style={{ 
      marginTop: '5rem', 
      padding: '2rem', 
      borderRadius: '24px', 
      background: 'linear-gradient(90deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.4) 100%)',
      border: '1px dashed rgba(255,255,255,0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      marginBottom: '2rem'
    }}>
      <div style={{ color: '#64748b', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '2px' }}>Reference & Case Study</div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '650px' }}>
        Bu mimari yaklaşımlar ve rehberler; Google mühendislik vaka çalışmalarından ve endüstri standardı prensiplerden (KISS, DRY, SOLID, GRASP) ilham almıştır.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/acronyms" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#818cf8', fontWeight: 700, textDecoration: 'none', padding: '0.8rem 1.5rem', background: 'rgba(99, 102, 241, 0.15)', borderRadius: '12px', border: '1px solid rgba(99, 102, 241, 0.3)', transition: 'all 0.2s' }}>
          <BookOpen size={16} /> Kısaltmalar & Prensipler Kılavuzu (Cheat Sheet)
        </Link>
        <a href="https://docs.flutter.dev/app-architecture/case-study" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#3b82f6', fontWeight: 700, textDecoration: 'none', padding: '0.8rem 1.5rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', transition: 'all 0.2s' }}>
          Google Architecture Case Study <ExternalLink size={16} />
        </a>
        <a href="https://developer.android.com/topic/architecture?hl=tr" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#3ddc84', fontWeight: 700, textDecoration: 'none', padding: '0.8rem 1.5rem', background: 'rgba(61, 220, 132, 0.1)', borderRadius: '12px', transition: 'all 0.2s' }}>
          Android Architecture Guide <ExternalLink size={16} />
        </a>
      </div>
    </div>
  );
};

export default ArchReferences;
