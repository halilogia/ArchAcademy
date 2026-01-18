import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Book, Bookmark, Info, Hash } from 'lucide-react';

const GlossaryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('All');

  const terms = [
    {
      term: 'Separation of Concerns (SoC)',
      definition: 'Yazılımın farklı teknik veya iş mantığı katmanlarına bölünmesi prensibidir. Her parçanın kendine ait net bir sorumluluğu olmalıdır.',
      category: 'Foundation',
      guruTip: 'Clean Architecture\'ın temel taşıdır. Değişim maliyetini düşürür.'
    },
    {
      term: 'Coupling (Bağımlılık)',
      definition: 'İki modülün birbirine ne kadar sıkı bağlı olduğunun ölçüsüdür. Mimari hedef her zaman "Loose Coupling" (Gevşek Bağlılık) olmalıdır.',
      category: 'Quality',
      guruTip: 'Bir modülü değiştirdiğinde diğeri de değişmek zorundaysa, Coupling yüksektir.'
    },
    {
      term: 'Cohesion (Bağlılık)',
      definition: 'Bir modülün içindeki elemanların birbirine ne kadar ait olduğunu ifade eder. Hedef "High Cohesion"dır; yani bir modül tek bir amaç için kenetlenmelidir.',
      category: 'Quality',
      guruTip: 'High Cohesion, Low Coupling! Mimarinin kutsal kasesi budur.'
    },
    {
      term: 'Abstraction (Soyutlama)',
      definition: 'Gereksiz detayların gizlenip, sadece önemli özelliklerin sunulmasıdır. Interface\'ler ve Abstract sınıflar en yaygın araçlarıdır.',
      category: 'OOP',
      guruTip: 'Detaylara değil, arayüzlere (interface) bağımlı kalın!'
    },
    {
      term: 'Inversion of Control (IoC)',
      definition: 'Programın akış kontrolünün bir framework veya container\'a devredilmesidir. "Sen beni çağırma, ben seni çağırırım" (Hollywood Prensibi).',
      category: 'SOLID',
      guruTip: 'Dependency Injection, IoC\'yi uygulamanın bir yoludur.'
    },
    {
      term: 'Polyglot Persistence',
      definition: 'Bir sistemde verinin ihtiyacına göre birden fazla veritabanı türünün (örn: SQL + Redis + Neo4j) bir arada kullanılmasıdır.',
      category: 'Modern',
      guruTip: 'EDA ve Microservices dünyasında sıkça karşımıza çıkar.'
    },
    {
      term: 'YAGNI (You Ain\'t Gonna Need It)',
      definition: '"Buna zaten ihtiyacınız olmayacak" prensibi. Gelecekte ihtiyaç olabilir diye şimdiden karmaşık özellikler eklememeyi öğütler.',
      category: 'Principle',
      guruTip: 'Aşırı mühendislikten (Over-engineering) kaçının.'
    },
    {
      term: 'KISS (Keep It Simple, Stupid)',
      definition: 'Sistemlerin mümkün olduğunca basit tutulması gerektiğini savunan tasarım prensibidir.',
      category: 'Principle',
      guruTip: 'Basitlik, en üstün gelişmişliktir.'
    },
    {
      term: 'Bounded Context',
      definition: 'DDD\'de bir terimin veya modelin geçerli olduğu merkezi sınır. Aynı kelime farklı contextlerde farklı anlamlara gelebilir.',
      category: 'DDD',
      guruTip: 'Müşteri kelimesi Satış için "Borçlu", Kargo için "Alıcı" anlamına gelir.'
    }
  ];

  const filteredTerms = terms.filter(t => {
    const matchesSearch = t.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         t.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLetter = selectedLetter === 'All' || t.term.startsWith(selectedLetter);
    return matchesSearch && matchesLetter;
  });

  const alphabet = ['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ paddingTop: '120px', minHeight: '100vh', background: 'var(--bg-dark)' }}
    >
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="gradient-text" 
            style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1.5rem' }}
          >
            Architect's Glossary
          </motion.h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Mimaride kullanılan karmaşık terimleri, mülakatlarda seni devleştirecek 
            şekilde basitleştirdik. Kavramlara hakim ol, sistemleri yönet.
          </p>
        </div>

        {/* Search & Filter */}
        <div style={{ marginBottom: '3rem' }}>
          <div className="glass-card" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '1rem', 
            padding: '1rem 2rem',
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '24px',
            marginBottom: '2rem'
          }}>
            <Search size={20} color="var(--primary)" />
            <input 
              type="text"
              placeholder="Terimlerde ara... (örn: Coupling)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '1.1rem',
                outline: 'none',
                width: '100%'
              }}
            />
          </div>

          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '0.5rem', 
            justifyContent: 'center',
            padding: '10px'
          }}>
            {alphabet.map(letter => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: selectedLetter === letter ? 'var(--primary)' : 'var(--glass)',
                  color: selectedLetter === letter ? 'white' : 'var(--text-secondary)',
                  border: '1px solid var(--glass-border)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Terms Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
          gap: '2rem',
          paddingBottom: '100px'
        }}>
          <AnimatePresence>
            {filteredTerms.map((item, i) => (
              <motion.div
                key={item.term}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="glass-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                  borderTop: '4px solid var(--primary)',
                  position: 'relative'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  opacity: 0.1
                }}>
                  <Hash size={40} />
                </div>

                <div>
                   <span style={{ 
                     fontSize: '0.65rem', 
                     background: 'rgba(59, 130, 246, 0.1)', 
                     color: 'var(--primary)', 
                     padding: '4px 8px', 
                     borderRadius: '6px',
                     fontWeight: 700,
                     textTransform: 'uppercase',
                     letterSpacing: '1px'
                   }}>
                     {item.category}
                   </span>
                   <h3 style={{ fontSize: '1.5rem', marginTop: '0.75rem', color: 'white' }}>{item.term}</h3>
                </div>

                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                  {item.definition}
                </p>

                <div style={{ 
                  marginTop: 'auto',
                  background: 'rgba(59, 130, 246, 0.03)',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '1px dashed rgba(59, 130, 246, 0.2)',
                  display: 'flex',
                  gap: '0.75rem',
                  alignItems: 'flex-start'
                }}>
                   <Info size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
                   <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 500 }}>
                      <strong style={{ opacity: 0.7 }}>GURU TIP:</strong> {item.guruTip}
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredTerms.length === 0 && (
          <div style={{ textAlign: 'center', padding: '5rem', opacity: 0.5 }}>
             <Book size={48} style={{ marginBottom: '1rem' }} />
             <p>Aradığınız terim henüz sözlüğümüzde yok.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default GlossaryPage;
