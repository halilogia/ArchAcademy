import React from 'react';
import { motion } from 'framer-motion';
import { Users, Radio } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const PubSubComparisonTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div
      key="comparison"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.5fr', gap: '3rem', alignItems: 'center' }}>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.4rem', color: '#94a3b8', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Users /> {isEn ? "Point-to-Point (Traditional Direct RPC)" : "Point-to-Point (Geleneksel)"}
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            {isEn 
              ? "Service A makes rigid point-to-point calls directly to Service B via HTTP or RPC." 
              : "A Servisi, B Servisini doğrudan çağırır (HTTP/RPC)."
            }
          </p>
          <ul style={{ paddingLeft: '1.5rem', color: '#94a3b8', lineHeight: 2 }}>
            <li>❌ <strong>Tight Coupling:</strong> {isEn ? "Senders must know exact network endpoints and formats." : "Birbirlerini bilmek zorundalar."}</li>
            <li>❌ <strong>Fragile:</strong> {isEn ? "If Service B drops, Service A experiences cascading failures." : "B servisi çökerse A da hata alır."}</li>
            <li>❌ <strong>Poor Fanout:</strong> {isEn ? "Broadcasting to 20 downstream consumers requires 20 separate outbound requests." : "Yeni bir servis eklenirse, A'nın kodunu değiştirmek gerekir."}</li>
          </ul>
        </div>

        <div className="glass-card" style={{ borderLeft: '4px solid #f97316' }}>
          <h3 style={{ fontSize: '1.4rem', color: '#f97316', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Radio /> {isEn ? "Publisher / Subscriber Pattern" : "Publisher / Subscriber"}
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            {isEn 
              ? "A Message Broker acts as the intermediary. Publishers emit events once without knowing who consumes them." 
              : "Araya bir Broker (Postacı) girer. A servisi mesajı postacıya verir ve işine bakar."
            }
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ background: 'rgba(249, 115, 22, 0.1)', padding: '1rem', borderRadius: '12px' }}>
              <h4 style={{ color: '#f97316', fontSize: '1rem', marginBottom: '5px' }}>Topic Isolation</h4>
              <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                {isEn 
                  ? "Subscribers only receive messages matching their explicit topic subscriptions." 
                  : "'Sports' kanalına atılan mesajı sadece o kanala abone olanlar alır."
                }
              </p>
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '12px' }}>
              <h4 style={{ color: '#10b981', fontSize: '1rem', marginBottom: '5px' }}>Loose Coupling</h4>
              <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                {isEn 
                  ? "Add 100 new consumers tomorrow without modifying a single line of publisher code." 
                  : "Servisler birbirini tanımaz. Yarın yeni bir servis eklense de kimsenin kodu bozulmaz."
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PubSubComparisonTab;
