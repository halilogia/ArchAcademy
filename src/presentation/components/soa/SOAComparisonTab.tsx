import React from 'react';
import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const SOAComparisonTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const diffItems = [
    { 
      title: isEn ? 'Granularity' : 'Granülarite', 
      desc: isEn 
        ? 'SOA services are coarse-grained enterprise business capabilities; microservices are single-purpose fine-grained boundaries.' 
        : 'SOA servisleri büyüktür (Coarse-grained), Mikroservisler küçüktür (Fine-grained).' 
    },
    { 
      title: isEn ? 'Data Sharing' : 'Veri Paylaşımı', 
      desc: isEn 
        ? 'SOA typically shares centralized database clusters; microservices mandate database-per-service isolation.' 
        : 'SOA\'da veritabanı genelde ortaktır. Mikroservislerde her servisin kendi DB\'si vardır.' 
    },
    { 
      title: isEn ? 'Protocols & Transports' : 'İletişim', 
      desc: isEn 
        ? 'SOA relies on heavy enterprise protocols (WSDL, SOAP, XML, ESB); microservices favor lightweight HTTP/JSON or gRPC.' 
        : 'SOA ağır protokoller (SOAP/XML) kullanır. Mikroservisler hafif (JSON/REST) kullanır.' 
    }
  ];

  return (
    <motion.div
      key="comparison"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px) 1fr', gap: '4rem', alignItems: 'center' }}>
        <div className="glass-card" style={{ borderLeft: '4px solid #fbcfe8' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px', color: '#fbcfe8' }}>
            <Share2 /> {isEn ? "SOA (Enterprise Foundation)" : "SOA (Enterprise)"}
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            {isEn 
              ? '"Smart Pipes, Dumb Endpoints". Business translation, security policies, and protocol conversions live inside the central Enterprise Service Bus (ESB).' 
              : '"Akıllı Borular, Aptal Uçlar" (Smart Pipe, Dumb Endpoint). Tüm zeka ve dönüşüm mantığı merkezi ESB katmanındadır.'
            }
          </p>
          <div style={{ background: 'rgba(251, 207, 232, 0.1)', padding: '1rem', borderRadius: '12px' }}>
            <h4 style={{ color: '#fbcfe8', fontSize: '0.9rem', marginBottom: '5px' }}>{isEn ? "Primary Use Cases" : "Kullanım Alanı"}</h4>
            <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>
              {isEn 
                ? "Banking networks, telecom legacy integrations, insurance ERPs combining Mainframe, Java, and modern web applications." 
                : "Bankalar, Sigorta Şirketleri, Eski ve Yeni sistemin iç içe geçtiği yapılar."
              }
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h4 style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
            {isEn ? "How Does SOA Differ from Microservices?" : "Mikroservislerden Farkı Nedir?"}
          </h4>
          {diffItems.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbcfe8', fontWeight: 800 }}>
                {i+1}
              </div>
              <div>
                <strong style={{ color: 'white' }}>{item.title}:</strong> <span style={{ color: 'var(--text-secondary)' }}>{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SOAComparisonTab;
