import React from 'react';
import { motion } from 'framer-motion';
import { Book, Library, GraduationCap, Star, Bookmark, ExternalLink } from 'lucide-react';

const bookData = [
  {
    category: 'General Advice',
    icon: <Star size={20} />,
    color: '#3b82f6',
    books: [
      { 
        title: 'The Pragmatic Programmer', 
        author: 'A. Hunt & D. Thomas', 
        isbn: '9780135957059',
        desc: 'Yazılım geliştirme sanatının temelleri.'
      },
      { 
        title: 'Code Complete 2', 
        author: 'Steve McConnell', 
        isbn: '9780735619678',
        desc: 'İyi kod inşa etmenin kutsal kitabı.'
      }
    ]
  },
  {
    category: 'Coding Cleanliness',
    icon: <Bookmark size={20} />,
    color: '#10b981',
    books: [
      { 
        title: 'Clean Code', 
        author: 'Robert C. Martin', 
        isbn: '9780132350884',
        desc: 'Okunabilir ve sürdürülebilir kod sanatı.'
      },
      { 
        title: 'Refactoring', 
        author: 'Martin Fowler', 
        isbn: '9780134757599',
        desc: 'Mevcut kodu güvenle iyileştirme.'
      }
    ]
  },
  {
    category: 'Software Architecture',
    icon: <Library size={20} />,
    color: '#a855f7',
    books: [
      { 
        title: 'Designing Data-Intensive Apps', 
        author: 'Martin Kleppmann', 
        isbn: '9781449373322',
        desc: 'Dağıtık sistemlerin ve verinin kalbi.'
      },
      { 
        title: 'System Design Interview', 
        author: 'Alex Xu', 
        isbn: '9798664653403',
        desc: 'Büyük ölçekli sistem tasarlama rehberi.'
      }
    ]
  },
  {
    category: 'Design & Patterns',
    icon: <GraduationCap size={20} />,
    color: '#f59e0b',
    books: [
      { 
        title: 'Design Patterns (GoF)', 
        author: 'Gamma, Helm, Johnson, Vlissides', 
        isbn: '9780201633610',
        desc: 'Klasik nesne yönelimli çözüm desenleri.'
      },
      { 
        title: 'Domain-Driven Design', 
        author: 'Eric Evans', 
        isbn: '9780321125217',
        desc: 'İş mantığını mimariyle bütünleştirme.'
      }
    ]
  },
  {
    category: 'Algorithms & Data',
    icon: <Book size={20} />,
    color: '#ec4899',
    books: [
      { 
        title: 'Intro to Algorithms (CLRS)', 
        author: 'Cormen, Leiserson, Rivest, Stein', 
        isbn: '9780262033848',
        desc: 'Algoritmaların akademik zirvesi.'
      },
      { 
        title: 'Cracking the Coding Interview', 
        author: 'Gayle Laakmann McDowell', 
        isbn: '9780984782857',
        desc: 'Teknik mülakatlara hazırlık klasiği.'
      }
    ]
  }
];

const BookshelfPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)', minHeight: '100vh', paddingTop: '100px', paddingBottom: '100px' }}
    >
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.75rem', 
              background: 'rgba(59, 130, 246, 0.1)', 
              padding: '0.6rem 1.5rem', 
              borderRadius: '100px', 
              color: 'var(--primary)', 
              fontWeight: 800, 
              fontSize: '0.9rem', 
              marginBottom: '1.5rem',
              border: '1px solid rgba(59, 130, 246, 0.2)'
            }}
          >
            <Library size={18} /> THE ARCHITECT'S READING LIST
          </motion.div>
          <h1 className="gradient-text" style={{ fontSize: '4rem', fontWeight: 950, letterSpacing: '-2px' }}>
            Bilgelik <span style={{ color: 'white' }}>Kütüphanesi</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '700px', margin: '1rem auto' }}>
            Sadece kod yazan bir mühendis değil, vizyon sahibi bir mimar olmak için okunması gereken 10 temel kaynak.
          </p>
        </div>

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '6rem' }}>
          
          {bookData.map((cat, catIdx) => (
            <div key={catIdx} style={{ position: 'relative' }}>
              {/* Vertical Connecting Line */}
              {catIdx < bookData.length - 1 && (
                <div style={{ 
                  position: 'absolute', 
                  left: '25px', 
                  top: '50px', 
                  bottom: '-6rem', 
                  width: '2px', 
                  background: `linear-gradient(to bottom, ${cat.color}, ${bookData[catIdx+1].color})`,
                  opacity: 0.1,
                  zIndex: 0
                }} />
              )}

              {/* Category Header */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '1.5rem', 
                marginBottom: '2.5rem',
                position: 'relative',
                zIndex: 2
              }}>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '12px', 
                  background: cat.color, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: `0 10px 25px ${cat.color}44`,
                  color: 'white'
                }}>
                  {cat.icon}
                </div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'white' }}>{cat.category}</h2>
                <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${cat.color}40, transparent)` }} />
              </div>

              {/* Books Grid */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', 
                gap: '2rem',
                paddingLeft: '60px'
              }}>
                {cat.books.map((book, bookIdx) => (
                  <motion.div
                    key={bookIdx}
                    whileHover={{ y: -10 }}
                    className="glass-card"
                    style={{ 
                      padding: '1.5rem', 
                      display: 'flex', 
                      gap: '1.5rem', 
                      alignItems: 'center',
                      borderLeft: `4px solid ${cat.color}`,
                      position: 'relative',
                      zIndex: 1
                    }}
                  >
                    {/* Fake 3D Book Cover Container */}
                    <div style={{ 
                      flexShrink: 0, 
                      width: '110px', 
                      height: '160px', 
                      borderRadius: '4px',
                      position: 'relative',
                      boxShadow: '10px 10px 30px rgba(0,0,0,0.5)',
                      transform: 'perspective(1000px) rotateY(-15deg)',
                      background: '#1a1a1a',
                      border: '1px solid rgba(255,255,255,0.1)',
                      overflow: 'hidden'
                    }}>
                      <img 
                        src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`} 
                        alt={book.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      {/* Fallback Graphic UI (Visible if image fails or before it loads) */}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: `linear-gradient(135deg, ${cat.color}33 0%, #1a1a1a 100%)`,
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '12px',
                        zIndex: -1
                      }}>
                        <div style={{ fontSize: '0.6rem', fontWeight: 900, color: cat.color, textTransform: 'uppercase', marginBottom: '8px' }}>ArchAcademy</div>
                        <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'white', lineHeight: 1.2 }}>{book.title}</div>
                        <div style={{ marginTop: 'auto', fontSize: '0.55rem', opacity: 0.5 }}>{book.author}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white', lineHeight: 1.2 }}>{book.title}</h3>
                      <p style={{ fontSize: '0.8rem', color: cat.color, fontWeight: 700 }}>{book.author}</p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{book.desc}</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{ 
                          marginTop: '0.5rem',
                          alignSelf: 'flex-start',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          background: 'rgba(255,255,255,0.05)',
                          color: 'var(--text-secondary)',
                          border: '1px solid var(--glass-border)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        İncele <ExternalLink size={12} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

        </div>

        {/* Call to action */}
        <div style={{ marginTop: '8rem', textAlign: 'center' }}>
          <div className="glass-card" style={{ 
            display: 'inline-block', 
            padding: '3rem 5rem', 
            borderRadius: '40px',
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)'
          }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1.5rem' }}>Okumak, İnşa Etmektir.</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
              En iyi mimarlar, kendilerinden önceki ustaların tecrübelerini kodlarına katanlardır. Bu kitaplar sadece bilgi değil, vizyon kazandırır.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--primary)' }}>10</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.5, textTransform: 'uppercase' }}>Temel Kitap</div>
                </div>
                <div style={{ width: '1px', background: 'rgba(255,255,255,0.1)' }} />
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 900, color: '#10b981' }}>5</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.5, textTransform: 'uppercase' }}>Ana Disiplin</div>
                </div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default BookshelfPage;
