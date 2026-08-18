import React from 'react';
import { motion } from 'framer-motion';
import { FileText, MessageSquare, History, ListCheck, BookOpen, Quote } from 'lucide-react';
import ArchHero from '../../../components/ArchHero';

const DocumentationPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}
    >
      <ArchHero 
        title="Docs"
        subtitle="Annotations"
        description="Document not only 'what' the code does, but why (Why) it is done this way. Immortalize your decisions."
        badge="Living Documentation"
        color="#3b82f6"
        illustration={
          <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '2.5rem', borderRadius: '20px', border: '2px solid #3b82f6' }}
            >
              <FileText size={100} color="#3b82f6" />
            </motion.div>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              style={{ position: 'absolute', top: 20, right: 20, color: '#f59e0b' }}
            >
              <Quote size={40} />
            </motion.div>
          </div>
        }
        features={[
          { icon: <History />, title: 'ADR (Decision Records)', desc: 'Why did we choose this architecture? Document the conditions and consequences at the moment of decision.' },
          { icon: <MessageSquare />, title: 'Intentional Comments', desc: 'Explain not the code\'s logic, but its intent and complex decisions.' },
          { icon: <ListCheck />, title: 'Living Specs', desc: 'Documentation discipline that lives with the code and always stays current.' }
        ]}
      />

      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 className="gradient-text" style={{ fontSize: '3rem', fontWeight: 800 }}>Documentation is Responsibility</h2>
            <p style={{ color: 'var(--text-secondary)' }}>3 main document types that make the architecture understandable.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            <div className="glass-card" style={{ padding: '3rem' }}>
              <div style={{ color: '#3b82f6', marginBottom: '1.5rem' }}><BookOpen size={40} /></div>
              <h3 style={{ marginBottom: '1rem' }}>ADR Record</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                Architecture Decision Records. Describes the context in which you made a decision, the alternatives, and why you chose path 'X'.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '3rem' }}>
              <div style={{ color: '#3b82f6', marginBottom: '1.5rem' }}><FileText size={40} /></div>
              <h3 style={{ marginBottom: '1rem' }}>C4 Model Diagrams</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                A standard diagramming discipline that visualizes the system at different levels of depth (Context, Container, Component, Code).
              </p>
            </div>

            <div className="glass-card" style={{ padding: '3rem' }}>
              <div style={{ color: '#3b82f6', marginBottom: '1.5rem' }}><Quote size={40} /></div>
              <h3 style={{ marginBottom: '1rem' }}>Readme.md Hero</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                The project's front door. The bird's-eye view of the architecture and everything a new developer needs to know should be here.
              </p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default DocumentationPage;