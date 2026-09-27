import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Box, Check, X, ArrowRight, Zap, Target } from 'lucide-react';

const FeatureVsLayerDetail = ({ forcedMode }: { forcedMode?: 'layer' | 'feature' }) => {
  const activeMode = forcedMode || 'layer';

  const comparisonData = {
    layer: {
      title: 'Layer-First Architecture',
      subtitle: 'Teknik Katman Odaklı (Sessiz)',
      color: '#94a3b8',
      structure: [
        'src/',
        '  ├── domain/ (Entities)',
        '  ├── application/ (Use Cases)',
        '  ├── infrastructure/ (Persistence)',
        '  └── web/ (Controllers)'
      ],
      pros: ['Sorumluluklar teknik olarak net ayrılır', 'Bağımlılık kuralı kolay izlenir', 'Küçük projelerde başlangıç hızı yüksektir'],
      cons: ['Özellik eklemek tüm katmanları gezmeyi gerektirir', 'Proje büyüdükçe "Mega Katmanlar" oluşur', 'Domain mantığı teknik dosyalarda kaybolur'],
      verdict: 'Küçük projeler veya "mimarinin alfabesini öğrenen" ekipler için uygundur.'
    },
    feature: {
      title: 'Feature-First Architecture',
      subtitle: 'Özellik Odaklı (Çığlık Atan)',
      color: '#3b82f6',
      structure: [
        'src/',
        '  ├── features/',
        '  │   ├── orders/ (Domain + App + API)',
        '  │   ├── products/ (Domain + App + API)',
        '  │   └── shipping/ (Domain + App + API)',
        '  └── shared/ (Common Utils)'
      ],
      pros: ['Yüksek modülerlik: Bir özelliği silmek/eklemek çok kolaydır', 'Bilişsel yük düşüktür: Her şey bir aradadır', 'Vertical Slice (Dikey Dilim) mantığına uygundur'],
      cons: ['Bileşenler arası veri paylaşımı daha dikkatli planlanmalıdır', 'Klasör hiyerarşisi ilk başta karmaşık gelebilir', 'Shared (ortak) kod yönetimi kritiktir'],
      verdict: 'Büyük ölçekli, sürdürülebilir ve "Yaşayan" sistemler için en Senior tercihtir.'
    }
  };

  const current = comparisonData[activeMode];

  return (
    <section style={{ padding: '100px 0', background: 'rgba(255,255,255,0.01)', borderTop: '1px solid var(--glass-border)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="section-title">Organizasyon Stratejisi</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
            Clean Architecture bir kuraldır, ama o kuralları klasörlere nasıl dizeceğiniz bir stratejidir. 
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 1fr) 1.2fr', gap: '3rem', alignItems: 'start' }}>
          {/* File Structure Preview */}
          <div className="glass-card" style={{ padding: '2.5rem', borderLeft: `4px solid ${current.color}`, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', color: current.color }}>
              <Box size={24} />
              <h3 style={{ margin: 0 }}>Folder Anatomy</h3>
            </div>
            <pre style={{ 
              background: 'rgba(0,0,0,0.4)', 
              padding: '1.5rem', 
              borderRadius: '15px', 
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              border: '1px solid rgba(255,255,255,0.03)',
              overflowX: 'auto',
              whiteSpace: 'pre'
            }}>
              {current.structure.join('\n')}
            </pre>
            <div style={{ marginTop: '2rem', padding: '1.5rem', background: `${current.color}11`, borderRadius: '12px', border: `1px solid ${current.color}33` }}>
              <p style={{ margin: 0, fontSize: '0.9rem', color: current.color, fontWeight: 600 }}>
                {activeMode === 'layer' ? '🔍 Teknik olarak organize edilmiş.' : '📢 İş amacını haykıran organizasyon.'}
              </p>
            </div>
          </div>

          {/* Details Side */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMode}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ marginBottom: '2.5rem' }}>
                  <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{current.title}</h2>
                  <p style={{ color: current.color, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>{current.subtitle}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
                  <div>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10b981', marginBottom: '1rem' }}>
                      <Check size={18} /> Avantajlar
                    </h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      {current.pros.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', marginBottom: '1rem' }}>
                      <X size={18} /> Dezavantajlar
                    </h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      {current.cons.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                  </div>
                </div>

                <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03), transparent)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <h4 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Zap size={18} color="var(--primary)" /> Mimarın Kararı
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: 0, lineHeight: 1.6 }}>{current.verdict}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureVsLayerDetail;
