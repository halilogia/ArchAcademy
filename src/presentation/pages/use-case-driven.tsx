import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Target, Workflow, Layers, BookOpen, ShieldCheck } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';

export const UseCaseDrivenPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [activeTab, setActiveTab] = useState<'bce' | 'workflow' | 'comparison'>('bce');

  const scrollToSection = (id: 'bce' | 'workflow' | 'comparison') => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <SEO
        title={isEn ? "Use-Case Driven Architecture & BCE Pattern | ArchAcademy" : "Kullanım Senaryosu Odaklı Mimari (Use-Case Driven) & BCE | ArchAcademy"}
        description={isEn 
          ? "Master Ivar Jacobson's Use-Case Driven Architecture, Boundary-Control-Entity (BCE) patterns, Screaming Architecture, and Interactors." 
          : "Ivar Jacobson'ın Use-Case Driven mimarisi, Sınır-Denetleyici-Varlık (BCE) deseni, Interactor ve Kullanıcı Senaryosu iş akışları rehberi."
        }
        keywords="use case driven architecture, bce pattern, ivar jacobson, boundary control entity, interactor, screaming architecture, clean architecture use cases"
        canonicalUrl="/use-case-driven"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
        <ArchHero 
          title="Use-Case Driven"
          subtitle={isEn ? "Boundary-Control-Entity (BCE) Architecture" : "Kullanım Senaryosu & BCE Mimarisi"}
          description={isEn 
            ? "Pioneered by Ivar Jacobson (1992) and foundational to Clean Architecture. Organize systems around user intents and business scenarios rather than technical database tables." 
            : "Ivar Jacobson (1992) tarafından geliştirilen ve Clean Architecture'ın kalbini oluşturan felsefe. Sistemi veritabanı CRUD tablolarına göre değil, kullanıcının iş hedeflerine ve senaryolarına göre organize edin."
          }
          badge="Foundational Architecture"
          color="#f59e0b"
          illustration={
            <div style={{ position: 'relative', width: '200px', height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                style={{ width: '160px', height: '160px', borderRadius: '30px', border: '2px dashed rgba(245, 158, 11, 0.4)', position: 'absolute' }}
              />
              <div style={{ width: '90px', height: '90px', background: '#020617', border: '3px solid #f59e0b', borderRadius: '22px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(245, 158, 11, 0.3)' }}>
                <Target size={36} color="#f59e0b" />
                <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'white', marginTop: '4px' }}>BCE</span>
              </div>
            </div>
          }
          features={[
            { icon: <Workflow />, title: isEn ? 'Scenario-First' : 'Senaryo Odaklı', desc: isEn ? 'Each Use Case represents an atomic, testable business goal.' : 'Her Use Case, kullanıcının tek bir amacını yürüten atomik bir iş akışıdır.' },
            { icon: <Layers />, title: isEn ? 'BCE Triad' : 'BCE Üçlüsü', desc: isEn ? 'Boundary (UI/API), Control (Workflow Interactor), Entity (Domain Rules).' : 'Boundary (Giriş/Çıkış), Control (Senaryo Orkestratörü), Entity (Saf Kurallar).' },
            { icon: <ShieldCheck />, title: isEn ? 'Database Isolation' : 'Veritabanı Bağımsızlığı', desc: isEn ? 'Use Cases do not leak SQL or ORM entities into core business logic.' : 'İş akışları veritabanı tablolarına değil, saf domain modellerine dayanır.' }
          ]}
        >
          <div style={{ 
            marginTop: '2rem',
            padding: '6px', 
            background: 'rgba(15, 23, 42, 0.4)', 
            borderRadius: '24px', 
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            backdropFilter: 'blur(10px)',
            flexWrap: 'wrap',
            position: 'sticky',
            top: '80px',
            zIndex: 30
          }}>
            {[
              { id: 'bce', label: isEn ? 'BCE Architecture Model' : 'BCE Deseni ve Yapısı', icon: <Layers size={18} /> },
              { id: 'workflow', label: isEn ? 'Use Case Execution Flow' : 'Senaryo İcra Döngüsü', icon: <Workflow size={18} /> },
              { id: 'comparison', label: isEn ? 'CRUD vs Use-Case Driven' : 'CRUD vs Use-Case Karşılaştırması', icon: <Target size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id as any)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '18px',
                  border: 'none',
                  background: activeTab === tab.id ? '#f59e0b' : 'transparent',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(245, 158, 11, 0.3)' : 'none'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </ArchHero>

        <div className="container" style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          
          {/* BCE PATTERN SECTION */}
          <div id="bce" style={{ scrollMarginTop: '100px' }}>
            <div className="glass-card" style={{ padding: '3rem', borderTop: '4px solid #f59e0b' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', padding: '6px 14px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 800, marginBottom: '1.5rem' }}>
                IVAR JACOBSON (1992)
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
                {isEn ? "The BCE Triad: Boundary, Control, Entity" : "BCE Üçlüsü: Boundary (Sınır), Control (Denetleyici), Entity (Varlık)"}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '850px' }}>
                {isEn 
                  ? "In Use-Case Driven Architecture, responsibilities are strictly divided into three distinct roles. This separation directly inspired Uncle Bob's Clean Architecture layer concentricity." 
                  : "Use-Case Driven mimaride sorumluluklar 3 katı role ayrılır. Bu ayrım doğrudan Robert C. Martin'in Clean Architecture ve Screaming Architecture katmanlarının temelini atmıştır."
                }
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                <div style={{ background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)', padding: '2rem', borderRadius: '16px' }}>
                  <div style={{ color: '#3b82f6', fontWeight: 900, fontSize: '1.2rem', marginBottom: '0.5rem' }}>1. Boundary (Sınır)</div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {isEn 
                      ? "Interacts with external actors (HTTP REST Controller, GraphQL, CLI, Web UI). Translates requests and delegates to Controls." 
                      : "Dış dünya aktörleriyle (HTTP REST Controller, GraphQL, CLI, Web Formu) konuşur. İstekleri doğrular ve Control nesnesine devreder."
                    }
                  </p>
                </div>

                <div style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '2rem', borderRadius: '16px' }}>
                  <div style={{ color: '#f59e0b', fontWeight: 900, fontSize: '1.2rem', marginBottom: '0.5rem' }}>2. Control (Interactor / Use Case)</div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {isEn 
                      ? "The brain of the scenario. Orchestrates business rules, transactions, and repositories to fulfill the user's specific intent." 
                      : "Senaryonun beyni ve orkestratörüdür. Kullanıcının tek bir hedefini gerçekleştirmek için domain kurallarını ve repository'leri koordine eder."
                    }
                  </p>
                </div>

                <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '2rem', borderRadius: '16px' }}>
                  <div style={{ color: '#10b981', fontWeight: 900, fontSize: '1.2rem', marginBottom: '0.5rem' }}>3. Entity (Kurumsal Varlık)</div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                    {isEn 
                      ? "Pure enterprise business objects and invariant validations, independent of any UI or DB frameworks." 
                      : "Kurumsal iş kurallarını ve değişmez doğrulamaları tutan saf domain nesneleridir. UI veya ORM bağımlılığı barındırmaz."
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* WORKFLOW SECTION */}
          <div id="workflow" style={{ scrollMarginTop: '100px' }}>
            <div className="glass-card" style={{ padding: '3rem' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>
                {isEn ? "Single Responsibility Use Case Pattern" : "Tek Sorumluluklu Use Case Deseni (1 Dosya = 1 Görev)"}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
                {isEn 
                  ? "Instead of a bloated 2000-line UserService, each business intent is an isolated class with an execute() method:" 
                  : "2000 satırlık devasa bir UserService yerine, her iş akışı kendi execute() metoduna sahip bağımsız bir sınıf olur:"
                }
              </p>

              <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', overflowX: 'auto' }}>
                <pre style={{ color: '#38bdf8', fontSize: '0.9rem', fontFamily: 'monospace', margin: 0 }}>
{`// 📁 src/application/usecases/CheckoutShoppingCartUseCase.ts
export class CheckoutShoppingCartUseCase {
  constructor(
    private cartRepo: CartRepositoryPort,
    private paymentGateway: PaymentGatewayPort,
    private orderRepo: OrderRepositoryPort,
    private eventBus: EventPublisherPort
  ) {}

  async execute(command: CheckoutCommand): Promise<OrderResult> {
    const cart = await this.cartRepo.getById(command.cartId);
    cart.validateCheckoutReadiness();

    const payment = await this.paymentGateway.charge(cart.calculateTotal());
    const order = Order.createFromCart(cart, payment.transactionId);

    await this.orderRepo.save(order);
    await this.eventBus.publish(new OrderCompletedEvent(order.id));

    return { orderId: order.id, status: 'SUCCESS' };
  }
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* COMPARISON SECTION */}
          <div id="comparison" style={{ scrollMarginTop: '100px' }}>
            <div className="glass-card" style={{ padding: '3rem', borderTop: '4px solid #10b981' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1.5rem' }}>
                {isEn ? "Traditional CRUD Service vs Use-Case Driven Architecture" : "Geleneksel CRUD Servisleri vs Use-Case Odaklı Mimari"}
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2rem' }}>
                <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '2rem', borderRadius: '16px' }}>
                  <h4 style={{ color: '#ef4444', fontWeight: 800, marginBottom: '1rem' }}>❌ Geleneksel Anemik CRUD</h4>
                  <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8, paddingLeft: '1.2rem' }}>
                    <li>Veritabanı tabloları mimariyi dikte eder.</li>
                    <li>Şişkin UserService sınıfları (20+ metot bir arada).</li>
                    <li>Bir metottaki değişiklik alakasız yerleri bozar.</li>
                    <li>Sistemin ne yaptığı klasörlere bakınca anlaşılmaz (Sessiz Mimari).</li>
                  </ul>
                </div>

                <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '2rem', borderRadius: '16px' }}>
                  <h4 style={{ color: '#10b981', fontWeight: 800, marginBottom: '1rem' }}>✅ Use-Case Driven (BCE)</h4>
                  <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8, paddingLeft: '1.2rem' }}>
                    <li>Kullanıcının iş akışı (Intent) mimariyi dikte eder.</li>
                    <li>Her use case bağımsız ve tek sorumlulukludur (SRP).</li>
                    <li>Birim testleri %100 izole ve sahte bağımlılıklarla (Mock) hızlıdır.</li>
                    <li>Klasör isimleri doğrudan sistemin özelliklerini haykırır (Screaming Architecture).</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>

        <section style={{ padding: '4rem 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4rem' }}>
          <div className="container" style={{ textAlign: 'center' }}>
             <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1rem', background: 'rgba(245, 158, 11, 0.1)', padding: '1rem 2rem', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                <BookOpen size={24} color="#f59e0b" />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.8rem', color: '#fbbf24', textTransform: 'uppercase' }}>
                    {isEn ? "Foundational Literature" : "Temel Eser"}
                  </div>
                  <div style={{ color: 'white', fontWeight: 600 }}>Object-Oriented Software Engineering: A Use Case Driven Approach (Ivar Jacobson, 1992)</div>
                </div>
             </div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default UseCaseDrivenPage;
