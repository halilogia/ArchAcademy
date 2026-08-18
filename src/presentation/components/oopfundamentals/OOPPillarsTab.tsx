import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Layers, GitFork, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const OOPPillarsTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const pillars = [
    {
      icon: <ShieldCheck size={28} color="#a855f7" />,
      title: isEn ? "1. Encapsulation (Kapsülleme)" : "1. Kapsülleme (Encapsulation)",
      desc: isEn 
        ? "Bundle data and mutating behavior together while hiding internal state. Expose only valid business operations via Tell, Don't Ask." 
        : "Veriyi ve o veriyi değiştiren iş mantığını tek bir nesne içine mühürleyin. Dışarıya sadece 'ne yapacağını söyleyen' güvenli metotlar sunun."
    },
    {
      icon: <Layers size={28} color="#38bdf8" />,
      title: isEn ? "2. Abstraction (Soyutlama)" : "2. Soyutlama (Abstraction)",
      desc: isEn 
        ? "Hide implementation details behind clean, essential interfaces. Clients depend on what an object does, not how it works." 
        : "Karmaşık altyapı detaylarını arayüzlerin (Interface) arkasına gizleyin. İstemciler nesnenin 'nasıl' çalıştığıyla değil 'ne' yaptığıyla ilgilenir."
    },
    {
      icon: <GitFork size={28} color="#f59e0b" />,
      title: isEn ? "3. Inheritance (Kalıtım)" : "3. Kalıtım (Inheritance)",
      desc: isEn 
        ? "Enable code reuse through 'is-a' relationships. Must strictly obey the Liskov Substitution Principle (LSP)." 
        : "'is-a' ilişkisi kurarak ortak özellikleri paylaşın. Alt sınıflar üst sınıfın davranışını asla bozmamalıdır (LSP Kuralı)."
    },
    {
      icon: <Zap size={28} color="#10b981" />,
      title: isEn ? "4. Polymorphism (Çok Biçimlilik)" : "4. Çok Biçimlilik (Polymorphism)",
      desc: isEn 
        ? "Treat different concrete objects uniformly through a common interface. Swap behaviors dynamically at runtime." 
        : "Farklı nesnelerin aynı arayüz üzerinden farklı davranışlar sergileyebilme yeteneğidir. if/else ağaçlarını ortadan kaldırır."
    }
  ];

  return (
    <motion.div key="pillars" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {pillars.map((p, i) => (
          <div key={i} className="glass-card" style={{ padding: '2rem', borderTop: '3px solid #a855f7' }}>
            <div style={{ marginBottom: '1.25rem' }}>{p.icon}</div>
            <h4 style={{ color: 'white', fontWeight: 800, fontSize: '1.15rem', marginBottom: '0.75rem' }}>{p.title}</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default OOPPillarsTab;
