import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Droplets, Type, Layout, Sparkles, BoxSelect } from 'lucide-react';

const ProjectDesignSystem = ({ children }: { children?: React.ReactNode }) => {
  const principles = [
    {
      title: "Glassmorphism & Depth",
      icon: <Palette color="#a855f7" />,
      desc: "Derinlik hissi için 'backdrop-filter: blur' ve ince kenar çizgileri (0.5px border) kullanıldı. Bu, içeriğin bir cam panel üzerindeymiş gibi görünmesini sağlar.",
      details: "CSS: background: rgba(255, 255, 255, 0.03)"
    },
    {
      title: "Atmospheric Lighting",
      icon: <Droplets color="#3b82f6" />,
      desc: "Sayfalarda sabit renkler yerine 'Radial Gradient' ışık kaynakları kullanıldı. Bu, karanlık modda göze hoş gelen, fütüristik bir derinlik katar.",
      details: "Gradient: radial-gradient(circle, var(--primary-20), transparent)"
    },
    {
      title: "Modern Typography",
      icon: <Type color="#10b981" />,
      desc: "Okunabilirliği artırmak için sistem fontları yerine 'Inter' veya 'Outfit' gibi geometrik sans-serif fontlar, geniş satır aralıkları (1.6) ile harmanlandı.",
      details: "Line Height: 1.6-1.8 | Letter Spacing: -0.02em"
    },
    {
      title: "Micro-Animations",
      icon: <Sparkles color="#f59e0b" />,
      desc: "Kullanıcı her etkileşiminde bir cevap almalı. Framer Motion ile butonlarda 'scale' ve sayfa geçişlerinde 'fade-in' efektleri standartlaştırıldı.",
      details: "Lib: Framer Motion | Transition: Ease-in-out"
    }
  ];

  const codePatterns = [
    {
      title: "CSS Variables (Design Tokens)",
      code: `:root {
  --primary: #6366f1;
  --glass-bg: rgba(255,255,255,0.03);
  --glass-border: rgba(255,255,255,0.08);
}`,
      desc: "Renkler ve ölçüler tek bir merkezden yönetilir. Tema ve marka değişimi saniyeler sürer."
    },
    {
      title: "Reusable Glass Components",
      code: `<div className="glass-card">
  {children}
</div>`,
      desc: "Tüm kutular aynı görsel dilde konuşur. Tutarlılık, profesyonel tasarımın anahtarıdır."
    }
  ];

  return (
    <section style={{ padding: '100px 0', background: 'rgba(2, 6, 23, 0.2)' }}>
      <div className="container">
        {children && <div style={{ textAlign: 'center' }}>{children}</div>}
        <div style={{ textAlign: 'center', marginBottom: '5rem', marginTop: children ? '3rem' : '0' }}>
           <h2 className="section-title">Design System & UI Architecture</h2>
           <p style={{ color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto' }}>
              Kaliteli bir proje sadece temiz çalışmaz, aynı zamanda kusursuz görünür. 
              Bu portalda uyguladığımız görsel mimariyi adım adım inceleyin.
           </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem', marginBottom: '4rem' }}>
           {principles.map((p, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="glass-card"
               style={{ padding: '2.5rem', display: 'flex', gap: '1.5rem' }}
             >
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '12px', 
                  background: 'rgba(255,255,255,0.05)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                   {p.icon}
                </div>
                <div>
                   <h4 style={{ marginBottom: '0.75rem' }}>{p.title}</h4>
                   <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>{p.desc}</p>
                   <code style={{ fontSize: '0.75rem', color: 'var(--primary)', background: 'rgba(99, 102, 241, 0.1)', padding: '4px 8px', borderRadius: '4px' }}>
                      {p.details}
                   </code>
                </div>
             </motion.div>
           ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }}>
           <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ background: '#1a1f2e', padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between' }}>
                 <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 800 }}>DESIGN_SYSTEM.CSS</span>
                 <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }}></div>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                 </div>
              </div>
              <pre style={{ padding: '2rem', margin: 0, fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                 <code>{codePatterns[0].code}</code>
              </pre>
           </div>
           
           <div>
              <h3 style={{ marginBottom: '1.5rem' }}>Kodlanabilir Estetik</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
                 Tasarım tesadüf değildir. CSS Variables kullanarak sistemi ölçeklenebilir kıldık. 
                 Yarın markanın rengini değiştirmek istersek, sadece tek bir değişkeni güncellememiz yeterli. 
                 Buna **"Design-Driven Implementation"** diyoruz.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--primary)', fontWeight: 700 }}>
                 <BoxSelect size={20} /> Atomik Tasarım Yapısı
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDesignSystem;
