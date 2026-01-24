import React from 'react';
import { motion } from 'framer-motion';
import { Folder, FolderOpen, FileCode, CheckCircle2, Info, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

const UncleBobStructure = () => {
  const structure = [
    {
      name: 'domain',
      icon: <FolderOpen size={18} color="#ef4444" />,
      color: '#ef4444',
      badge: 'ENTITIES',
      desc: 'En iç çekirdek. Bağımsız iş nesneleri ve kuralları.',
      items: [
        { name: 'Customers/', icon: <Folder size={14} /> },
        { name: 'Orders/', icon: <Folder size={14} /> },
        { name: 'Payments/', icon: <Folder size={14} /> }
      ]
    },
    {
      name: 'application',
      icon: <FolderOpen size={18} color="#f59e0b" />,
      color: '#f59e0b',
      badge: 'USE CASES',
      desc: 'Özellik bazlı iş akışları ve CQRS.',
      items: [
        { name: 'Carts/AddItem.ts', icon: <FileCode size={14} /> },
        { name: 'Orders/Submit.ts', icon: <FileCode size={14} /> },
        { name: 'Common/Interfaces/', icon: <Folder size={14} /> }
      ]
    },
    {
      name: 'infrastructure',
      icon: <FolderOpen size={18} color="#3b82f6" />,
      color: '#3b82f6',
      badge: 'ÇIKIŞ (OUTPUT)',
      desc: 'Dış dünya entegrasyonları (Driven).',
      items: [
        { name: 'Persistence/DbImpl.ts', icon: <FileCode size={14} /> },
        { name: 'Services/EmailSvc.ts', icon: <FileCode size={14} /> },
        { name: 'Auth/Identity.ts', icon: <FileCode size={14} /> }
      ]
    },
    {
      name: 'presentation',
      icon: <FolderOpen size={18} color="#8b5cf6" />,
      color: '#8b5cf6',
      badge: 'GİRİŞ (INPUT)',
      desc: 'Kullanıcı etkileşimi (Driving).',
      items: [
        { name: 'Endpoints/Controllers/', icon: <Folder size={14} /> },
        { name: 'Views/Components/', icon: <Folder size={14} /> },
        { name: 'Program.cs / main.ts', icon: <FileCode size={14} /> }
      ]
    }
  ];

  return (
    <section style={{ padding: '100px 0', background: 'rgba(0,0,0,0.2)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="section-title">Giriş/Çıkış Odaklı Klasör Yapısı</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto' }}>
            Modern projelerde <strong>Presentation</strong> giriş kapısı, <strong>Infrastructure</strong> ise dışarıya açılan kapıdır. 
            Bu yapı, bağımlılıkları yönetmeyi ve mülakatlarda mimariyi savunmayı kolaylaştırır.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {structure.map((folder, idx) => (
            <motion.div
              key={folder.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card"
              style={{ 
                padding: '2rem', 
                borderTop: `4px solid ${folder.color}`,
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                {folder.icon}
                <span style={{ fontWeight: 900, fontSize: '1.2rem', color: 'white' }}>{folder.name}/</span>
              </div>
              <div style={{ 
                fontSize: '0.65rem', 
                fontWeight: 900, 
                color: folder.color, 
                background: `${folder.color}15`, 
                padding: '2px 8px', 
                borderRadius: '4px',
                width: 'fit-content',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                {folder.badge === 'GİRİŞ (INPUT)' && <ArrowDownLeft size={10} />}
                {folder.badge === 'ÇIKIŞ (OUTPUT)' && <ArrowUpRight size={10} />}
                {folder.badge}
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
                {folder.desc}
              </p>

              <div style={{ marginTop: 'auto', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '1rem' }}>
                {folder.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '4px 0', fontSize: '0.8rem', opacity: 0.7 }}>
                     {item.icon}
                     <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="glass-card" style={{ marginTop: '4rem', padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
           <div style={{ background: 'rgba(59,130,246,0.1)', padding: '15px', borderRadius: '50%', color: 'var(--primary)' }}>
             <Info size={30} />
           </div>
           <div style={{ textAlign: 'left' }}>
             <h4 style={{ margin: '0 0 0.5rem 0', color: 'white' }}>Neden Bu Klasör İsimleri?</h4>
             <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
               Klasörleri <strong>Girişim (Presentation)</strong> ve <strong>Altyapım (Infrastructure)</strong> olarak ayırmak, 
               "Kod nerede yaşıyor?" sorusuna net cevap verir. Clean Architecture'daki kafa karıştırıcı <i>"Adapters"</i> terimi yerine 
               bu fonksiyonel isimleri kullanmak projeyi daha okunabilir kılar.
             </p>
           </div>
        </div>
      </div>
    </section>
  );
};

export default UncleBobStructure;
