import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, Code, Terminal } from 'lucide-react';

const HorizontalPractical = () => {
  const layers = {
    controller: {
      title: 'Presentation (Controllers)',
      desc: 'Dış istekleri karşılar ve ilgili servislere yönlendirir.',
      code: `// Controllers/ProductController.cs (Enterprise Style)

[HttpGet]
public async Task<IActionResult> Get(int id) {
    // Sadece servisteki metodu çağırır
    var product = await _productService.GetById(id);
    return Ok(product);
}`
    },
    service: {
      title: 'Business (Services)',
      desc: 'İş kurallarının, hesaplamaların tek merkezi.',
      code: `// Services/ProductService.cs

public async Task<ProductDto> GetById(int id) {
    var product = await _repository.Get(id);
    // İş kuralı: İndirimli fiyatı hesapla
    product.FinalPrice = product.Price * (1 - product.Discount);
    return _mapper.Map<ProductDto>(product);
}`
    },
    repository: {
      title: 'Data Access (Repositories)',
      desc: 'Veritabanına erişim için kullanılan soyutlama katmanı.',
      code: `// Repositories/ProductRepository.cs

public async Task<Product> Get(int id) {
    // DbContext üzerinden veriyi çeker
    return await _context.Products.FindAsync(id);
}`
    }
  };

  type LayerKey = keyof typeof layers;
  const [activeTab, setActiveTab] = useState<LayerKey>('controller');

  return (
    <section style={{ padding: '100px 0' }}>
      <div className="container">
        <h2 className="section-title">Geleneksel Klasör Yapısı</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="glass-card" style={{ marginBottom: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '1rem' }}>
                <Terminal size={18} color="#3b82f6" /> Yatay Organizasyon
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Bu yapıda kodlar "ne iş yaptıklarına" göre değil, "ne olduklarına" göre gruplanır. 
                Örneğin tüm kontrolcüler tek bir klasörde toplanır.
              </p>
            </div>

            {(Object.keys(layers) as LayerKey[]).map((key) => {
              const value = layers[key];
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className="glass-card"
                  style={{
                    textAlign: 'left',
                    borderLeft: activeTab === key ? '4px solid #3b82f6' : '4px solid transparent',
                    background: activeTab === key ? 'rgba(59, 130, 246, 0.1)' : 'var(--glass)',
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Folder color="#3b82f6" size={20} />
                    <span style={{ fontWeight: 600, color: 'white' }}>{value.title}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="glass-card" style={{ padding: 0, overflow: 'hidden', background: '#0a0a0f' }}>
            <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Code size={18} color="#3b82f6" />
              <span style={{ fontSize: '0.85rem' }}>Katman İçi Kod Örneği</span>
            </div>
            <div style={{ padding: '2rem' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <p style={{ color: '#3b82f6', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{layers[activeTab].desc}</p>
                  <pre style={{ color: '#e2e8f0', fontSize: '0.95rem', lineHeight: 1.6 }}><code>{layers[activeTab].code}</code></pre>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalPractical;
