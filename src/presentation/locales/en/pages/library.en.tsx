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
        desc: 'Foundations of the art of software development.'
      },
      { 
        title: 'Code Complete 2', 
        author: 'Steve McConnell', 
        isbn: '9780735619678',
        desc: 'The bible of building good code.'
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
        desc: 'The art of readable and maintainable code.'
      },
      { 
        title: 'Refactoring', 
        author: 'Martin Fowler', 
        isbn: '9780134757599',
        desc: 'Improving existing code safely.'
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
        desc: 'The heart of distributed systems and data.'
      },
      { 
        title: 'System Design Interview', 
        author: 'Alex Xu', 
        isbn: '9798664653403',
        desc: 'A guide to designing large-scale systems.'
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
        desc: 'Classic object-oriented solution patterns.'
      },
      { 
        title: 'Domain-Driven Design', 
        author: 'Eric Evans', 
        isbn: '9780321125217',
        desc: 'Integrating business logic with architecture.'
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
        desc: 'The academic pinnacle of algorithms.'
      },
      { 
        title: 'Cracking the Coding Interview', 
        author: 'Gayle Laakmann McDowell', 
        isbn: '9780984782857',
        desc: 'A classic for technical interview preparation.'
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
            Wisdom <span style={{ color: 'white' }}>Library</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '700px', margin: '1rem auto' }}>
            10 essential resources to read to become not just an engineer who writes code, but a visionary architect.
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
                        flexDirection: '