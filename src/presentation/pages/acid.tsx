import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Database, ShieldCheck, Zap, Lock, HardDrive, RefreshCcw, CheckCircle } from 'lucide-react';
import ArchHero from '../components/ArchHero';
import SEO from '../components/SEO';
import { useProgress } from '../context/ProgressContext';
import { ACIDConceptTab } from '../components/acid/ACIDConceptTab';
import { ACIDSimulationTab } from '../components/acid/ACIDSimulationTab';
import { useAcidSimulation } from '../components/acid/useAcidSimulation';
import { SequenceScene } from '../components/diagrams/templates/SequenceScene';

const ACIDPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const { completeStep } = useProgress();
  const [activeTab, setActiveTab] = useState<string>('concept');
  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  
  const simulation = useAcidSimulation();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      completeStep('/acid');
    }, 2000);
    return () => clearTimeout(timer);
  }, [completeStep]);

  const heroIllustration = (
    <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Safe Box Metaphor */}
      <motion.div 
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ width: '220px', height: '260px', borderRadius: '30px', background: '#020617', border: '4px solid #facc15', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 50px rgba(250, 204, 21, 0.2)' }}
      >
        <div style={{ width: '180px', height: '140px', border: '1px solid rgba(250, 204, 21, 0.3)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px', overflow: 'hidden' }}>
          <motion.div
            key={simulation.step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: 'center' }}
          >
            {simulation.step === 0 && <span style={{fontSize: '3rem', fontWeight: 900, color: 'white'}}>SAFE</span>}
            {simulation.step === 1 && <span style={{fontSize: '1.5rem', fontWeight: 900, color: '#f87171'}}>- $100</span>}
            {simulation.step === 3 && <span style={{fontSize: '1.5rem', fontWeight: 900, color: '#4ade80'}}>+ $100</span>}
            {simulation.step === 4 && <CheckCircle size={50} color="#facc15" />}
          </motion.div>
        </div>
        
        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#facc15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Database size={20} color="black" />
          </div>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Lock size={20} color="white" />
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <>
      <SEO
        title={isEn ? "ACID Principles in Relational Databases | ArchAcademy" : "İlişkisel Veritabanlarında ACID Prensipleri | ArchAcademy"}
        description={isEn 
          ? "Master database transaction guarantees: Atomicity, Consistency, Isolation, and Durability." 
          : "Veritabanı işlem garantileri: Atomiklik, Tutarlılık, İzolasyon ve Dayanıklılık rehberi."
        }
        keywords="acid, database transactions, atomicity, consistency, isolation, durability, wal"
        canonicalUrl="/acid"
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
        <ArchHero 
          title="ACID"
          subtitle={isEn ? "Transaction Engine" : "İşlem Garantileri"}
          description={isEn 
            ? "Relational database transaction invariants ensuring mathematical correctness and zero data corruption even under hardware failure." 
            : "İlişkisel veritabanlarının 'Hep ya da Hiç' kuralı. Finansal ve kritik verilerin elektrik kesilse bile asla bozulmamasını sağlayan 4 temel kural."
          }
          badge="Database Engine"
          color="#facc15"
          illustration={heroIllustration}
          features={[
            { icon: <Zap />, title: 'Atomicity', desc: isEn ? 'All or nothing execution. If one step fails, the entire transaction is rolled back.' : 'Hep ya da hiç. Bir adım bile hata verirse, tüm işlem geri alınır (Rollback).' },
            { icon: <ShieldCheck />, title: 'Consistency', desc: isEn ? 'Data transitions exclusively between valid invariant states.' : 'Kurallar delinemez. Toplam bakiye işlemden önce ve sonra daima aynıdır.' },
            { icon: <Lock />, title: 'Isolation', desc: isEn ? 'Concurrent threads never see uncommitted intermediate states.' : 'Aynı anda çalışan binlerce işlem birbirinin verisini kirletemez.' },
            { icon: <HardDrive />, title: 'Durability', desc: isEn ? 'Committed transactions are written to Write-Ahead Log (WAL) and disk.' : 'Onaylanan (Commit) veri, sunucu kapansa bile diskten asla silinmez.' }
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
            backdropFilter: 'blur(10px)'
          }}>
            {[
              { id: 'concept', label: isEn ? 'ACID Matrix' : 'Prensipler', icon: <Database size={18} /> },
              { id: 'simulation', label: isEn ? 'Bank Transfer Demo' : 'Banka Simülasyonu', icon: <RefreshCcw size={18} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '18px',
                  border: 'none',
                  background: activeTab === tab.id ? '#facc15' : 'transparent',
                  color: activeTab === tab.id ? 'black' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  boxShadow: activeTab === tab.id ? '0 4px 12px rgba(250, 204, 21, 0.3)' : 'none'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </ArchHero>

        <div className="container" style={{ marginTop: '2rem' }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
          <div id="concept" style={{ scrollMarginTop: "100px" }}>
            <ACIDConceptTab />
          </div>
          <div id="simulation" style={{ scrollMarginTop: "100px" }}>
            <SequenceScene
              locale={isEn ? 'en' : 'tr'}
              title={isEn ? 'A transfer that must not half-happen' : 'Yarım kalmaması gereken transfer'}
              subtitle={
                isEn
                  ? 'Debit written, credit never lands. The log decides what survives.'
                  : 'Borç yazıldı, alacak hiç gelmedi. Neyin kalacağına log karar verir.'
              }
              participants={[
                { id: 'client', label: isEn ? 'Client' : 'İstemci', icon: 'globe', tone: 'green' },
                { id: 'api', label: isEn ? 'Transfer API' : 'Transfer API', icon: 'server', tone: 'blue' },
                { id: 'db', label: isEn ? 'Accounts' : 'Hesaplar', icon: 'database', tone: 'amber' },
                { id: 'wal', label: isEn ? 'WAL' : 'WAL', icon: 'file', tone: 'violet' },
              ]}
              intro={{
                title: isEn ? 'All or nothing' : 'Hep ya da hiç',
                body: isEn
                  ? 'A committed transaction survives a crash. An uncommitted one leaves no trace.'
                  : 'Commit edilmiş işlem çökmeden sağ çıkar. Commit edilmemiş işlem iz bırakmaz.',
                tag: isEn ? 'Contract' : 'Sözleşme',
              }}
              messages={[
                {
                  from: 'client',
                  to: 'api',
                  label: 'POST /transfer',
                  note: isEn ? 'The client asks for a state change, not a sequence of steps.' : 'İstemci adım adım işlem değil, sonuç ister.',
                },
                {
                  from: 'api',
                  to: 'db',
                  label: 'BEGIN',
                  tone: 'amber',
                  note: isEn ? 'The transaction opens. Nothing is visible to other readers yet.' : 'İşlem açılır. Henüz diğer okuyuculara görünmez.',
                },
                {
                  from: 'db',
                  to: 'wal',
                  label: 'debit A · fsync',
                  tone: 'violet',
                  note: isEn ? 'The debit is durable first. A crash here can still roll back.' : 'Önce borç kalıcı olur. Burada çökmek hâlâ geri alınabilir.',
                },
                {
                  from: 'db',
                  to: 'wal',
                  label: 'credit B · crash',
                  tone: 'red',
                  dashed: true,
                  note: isEn ? 'The process dies mid-transaction. B was never credited.' : 'Süreç işlemin ortasında ölür. B hesabına hiç geçmedi.',
                },
                {
                  from: 'db',
                  to: 'wal',
                  label: 'ROLLBACK',
                  tone: 'red',
                  note: isEn ? 'Recovery replays the log and erases the uncommitted debit.' : 'Kurtarma logu tekrar oynatır ve commit edilmemiş borcu siler.',
                },
                {
                  from: 'api',
                  to: 'client',
                  label: '500 · unchanged',
                  tone: 'red',
                  dashed: true,
                  note: isEn ? 'The client sees failure, and both balances are exactly as before.' : 'İstemci hata görür; iki bakiye de önceki hâlindedir.',
                },
              ]}
              metrics={[
                { id: 'atomicity', label: 'Atomicity', value: isEn ? 'guaranteed' : 'garanti', tone: 'green' },
                { id: 'drift', label: isEn ? 'Balance drift' : 'Bakiye sapması', value: '0', tone: 'green' },
              ]}
            />
          </div>
        </div>
        </div>
      </motion.div>
    </>
  );
};

export default ACIDPage;
