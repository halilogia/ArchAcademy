import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileCode, Layers, Link as LinkIcon } from 'lucide-react';

const HexagonalPractical = () => {
  const [activeTab, setActiveTab] = useState('port');

  const codeExamples = {
    port: {
      title: 'Port (Interface)',
      file: 'domain/ports/UserRepository.js',
      code: `// Bu bir Port'tur. Uygulama sadece bunu tanır.
export interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: string): Promise<User>;
}`,
      desc: 'Uygulamanın dış dünyadan (DB) ne beklediğini tanımlayan sözleşme.'
    },
    domain: {
      title: 'Domain Service',
      file: 'domain/services/UserService.js',
      code: `class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository; // Interface'e bağımlı!
  }

  async register(userData) {
    const user = new User(userData);
    return await this.userRepository.save(user);
  }
}`,
      desc: 'Portları kullanarak iş kurallarını işleten merkez.'
    },
    adapter: {
      title: 'Adapter (Implementation)',
      file: 'infrastructure/adapters/SqlUserRepository.js',
      code: `// Bu bir Adapter'dır. Portu implemente eder.
class SqlUserRepository implements UserRepository {
  async save(user) {
    return await db('users').insert(user);
  }
  
  async findById(id) {
    return await db('users').where({ id }).first();
  }
}`,
      desc: 'Portun arkasındaki gerçek teknoloji (SQL, NoSQL, In-Memory vb).'
    }
  };

  return (
    <section style={{ padding: '100px 0' }}>
      <div className="container">
        <h2 className="section-title">Uygulama: Gerçek Kod Yapısı</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {Object.entries(codeExamples).map(([key, data]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className="glass-card"
                style={{
                  textAlign: 'left',
                  borderLeft: activeTab === key ? '4px solid #10b981' : '4px solid transparent',
                  background: activeTab === key ? 'rgba(16, 185, 129, 0.1)' : 'var(--glass)'
                }}
              >
                <h4 style={{ color: activeTab === key ? '#10b981' : 'white' }}>{data.title}</h4>
                <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '0.5rem' }}>{data.file}</p>
              </button>
            ))}
            
            <div className="glass-card" style={{ marginTop: '2rem', background: 'rgba(59, 130, 246, 0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <LinkIcon size={18} color="#3b82f6" />
                <h4 style={{ fontSize: '0.9rem' }}>Değiştirilebilirlik</h4>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Veritabanını MySQL'den MongoDB'ye geçirmek isterseniz, sadece yeni bir **Adapter** yazarsınız. 
                **Domain Service** ve **Port** kodlarına dokunmanıza gerek kalmaz.
              </p>
            </div>
          </div>

          <div className="glass-card" style={{ padding: 0, overflow: 'hidden', background: '#0a0a0f' }}>
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <FileCode size={18} color="#10b981" />
              <span style={{ fontSize: '0.85rem' }}>{codeExamples[activeTab].file}</span>
            </div>
            <div style={{ padding: '2rem' }}>
              <AnimatePresence mode="wait">
                <motion.pre
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{ color: '#e2e8f0', fontSize: '0.95rem', lineHeight: 1.6 }}
                >
                  <code>{codeExamples[activeTab].code}</code>
                </motion.pre>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HexagonalPractical;
