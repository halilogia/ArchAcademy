import React from 'react';
import { motion } from 'framer-motion';
import { Server, Share2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const P2PComparisonTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div
      key="comparison"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '3rem', alignItems: 'center' }}>
        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1.5rem', background: 'rgba(239, 68, 68, 0.1)', borderBottom: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#ef4444' }}>
              <Server /> {isEn ? "Client-Server (Centralized)" : "Client-Server (Merkezi)"}
            </h3>
          </div>
          <div style={{ padding: '1.5rem' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              {isEn 
                ? "All client nodes connect to a single central server. Files and data are distributed exclusively from this central source." 
                : "Tüm kullanıcılar tek bir merkezi sunucuya bağlanır. Dosya veya veri bu merkezden dağıtılır."
              }
            </p>
            <ul style={{ paddingLeft: '1.5rem', color: '#94a3b8', lineHeight: 2 }}>
              <li>❌ <strong>Single Point of Failure:</strong> {isEn ? "If the server crashes, all clients disconnect." : "Sunucu çökerse herkes kesilir."}</li>
              <li>❌ <strong>Bandwidth Cost:</strong> {isEn ? "All upload traffic exhausts central infrastructure, driving high costs." : "Tüm trafik sunucudan çıkar, maliyetlidir."}</li>
              <li>❌ <strong>Censorship:</strong> {isEn ? "Shutting down the central node kills the whole service." : "Merkezi kapatmak sistemi durdurur."}</li>
            </ul>
          </div>
        </div>

        <div className="glass-card" style={{ padding: 0, overflow: 'hidden', border: '2px solid rgba(16, 185, 129, 0.3)' }}>
          <div style={{ padding: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', borderBottom: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981' }}>
              <Share2 /> {isEn ? "P2P Network (Decentralized Mesh)" : "P2P Network (Dağıtık)"}
            </h3>
          </div>
          <div style={{ padding: '1.5rem' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              {isEn 
                ? "Every node (Peer) interconnects directly. Each downloader simultaneously uploads chunks to others (Seeding)." 
                : "Her kullanıcı (Peer) birbirine bağlıdır. Dosyayı indiren kişi, aynı zamanda diğerlerine gönderir (Seeding)."
              }
            </p>
            <ul style={{ paddingLeft: '1.5rem', color: '#94a3b8', lineHeight: 2 }}>
              <li style={{ color: '#ec4899' }}>✅ <strong>Robustness:</strong> {isEn ? "Even if 10 nodes drop offline, the swarm survives." : "10 düğüm çökse bile sistem kalanlarla devam eder."}</li>
              <li style={{ color: '#eab308' }}>✅ <strong>Viral Scalability:</strong> {isEn ? "More users add network bandwidth instead of overwhelming it." : "Kullanıcı arttıkça sistem yavaşlamaz, hızlanır."}</li>
              <li style={{ color: '#3b82f6' }}>✅ <strong>Unstoppable:</strong> {isEn ? "No single master kill-switch exists." : "Ağı kapatacak tek bir şalter yoktur."}</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default P2PComparisonTab;
