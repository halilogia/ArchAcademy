import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, File, ArrowRight, Layout, ShieldCheck, AlertTriangle, CheckCircle2, Layers } from 'lucide-react';

interface FileNodeProps {
  node: {
    name: string;
    type: string;
    children?: any[];
  };
  depth?: number;
}

const FileNode: React.FC<FileNodeProps> = ({ node, depth = 0 }) => {
  return (
    <div style={{ marginLeft: depth * 20, marginBottom: '4px' }}>
       <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: node.type === 'folder' ? 'var(--primary)' : 'var(--text-secondary)' }}>
          {node.type === 'folder' ? <FolderOpen size={16} /> : <File size={14} />}
          <span style={{ fontSize: '0.9rem', fontFamily: 'monospace' }}>{node.name}</span>
       </div>
       {node.children && (
         <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', marginLeft: '7px' }}>
            {node.children.map((child, i) => <FileNode key={i} node={child} depth={depth + 1} />)}
         </div>
       )}
    </div>
  );
};

const folderScenarios = [
  {
    id: 1,
    title: "Root Kirliliği (Spaghetti Root)",
    problem: "Tüm dosyalar kök dizine veya tek bir 'src' klasörüne yığılmış. Nereden başlayacağını bulmak imkansız.",
    category: "Structure Chaos",
    dirtyTree: [
      { name: "src", type: "folder", children: [
        { name: "auth_controller.js", type: "file" },
        { name: "user_model.js", type: "file" },
        { name: "db_config.js", type: "file" },
        { name: "utils.js", type: "file" },
        { name: "payment_service.js", type: "file" },
        { name: "send_mail.js", type: "file" },
        { name: "styles.css", type: "file" },
        { name: "App.js", type: "file" },
        { name: "helpers.js", type: "file" },
      ]}
    ],
    cleanTree: [
      { name: "src", type: "folder", children: [
        { name: "domain", type: "folder", children: [
          { name: "entities", type: "folder", children: [
             { name: "User.js", type: "file" }
          ]},
          { name: "repositories", type: "folder", children: [
             { name: "IUserRepository.js", type: "file" }
          ]}
        ]},
        { name: "application", type: "folder", children: [
           { name: "use-cases", type: "folder", children: [
              { name: "LoginUser.js", type: "file" }
           ]}
        ]},
        { name: "infrastructure", type: "folder", children: [
           { name: "database", type: "folder", children: [
              { name: "MongoConnection.js", type: "file" }
           ]},
           { name: "services", type: "folder", children: [
              { name: "SmtpMailer.js", type: "file" }
           ]}
        ]},
        { name: "presentation", type: "folder", children: [
           { name: "controllers", type: "folder", children: [
              { name: "AuthController.js", type: "file" }
           ]}
        ]}
      ]}
    ],
    explanation: "Dosyalar sorumluluklarına göre (Domain, Application, Infrastructure, Presentation) katmanlara ayrıldı. Artık neyin nerede olduğu belli."
  },
  {
    id: 2,
    title: "Feature Envy (Dağınık Özellikler)",
    problem: "Bir özellikle (örn: Sipariş) ilgili kodlar proje geneline saçılmış. Bir şeyi değiştirmek için 5 klasör gezmek gerekiyor.",
    category: "Cohesion Issues",
    dirtyTree: [
      { name: "src", type: "folder", children: [
        { name: "controllers", type: "folder", children: [
           { name: "OrderController.js", type: "file" },
           { name: "UserController.js", type: "file" }
        ]},
        { name: "models", type: "folder", children: [
           { name: "Order.js", type: "file" },
           { name: "User.js", type: "file" }
        ]},
        { name: "services", type: "folder", children: [
           { name: "OrderService.js", type: "file" }
        ]},
        { name: "utils", type: "folder", children: [
           { name: "OrderValidator.js", type: "file" }
        ]}
      ]}
    ],
    cleanTree: [
      { name: "src", type: "folder", children: [
        { name: "features", type: "folder", children: [
          { name: "orders", type: "folder", children: [
             { name: "OrderController.js", type: "file" },
             { name: "Order.js", type: "file" },
             { name: "OrderService.js", type: "file" },
             { name: "OrderValidator.js", type: "file" }
          ]},
          { name: "users", type: "folder", children: [
             { name: "UserController.js", type: "file" },
             { name: "User.js", type: "file" }
          ]}
        ]},
        { name: "shared", type: "folder", children: [
           { name: "database", type: "file" }
        ]}
      ]}
    ],
    explanation: "Vertical Slice / Feature Folder yapısına geçildi. 'Sipariş' ile ilgili her şey tek bir klasörde toplandı."
  }
];

const FolderSurgery = () => {
  const [activeScenario, setActiveScenario] = useState(0);
  const [isSurgeryDone, setIsSurgeryDone] = useState(false);

  const nextScenario = () => {
    setActiveScenario((prev) => (prev + 1) % folderScenarios.length);
    setIsSurgeryDone(false);
  };

  const s = folderScenarios[activeScenario];

  return (
    <div className="container" style={{ padding: '60px 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem' }}>
        
        {/* Left Info Panel */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
             <div style={{ background: 'rgba(236, 72, 153, 0.1)', padding: '12px', borderRadius: '16px', color: '#ec4899' }}>
                <Layout size={24} />
             </div>
             <div>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ec4899', textTransform: 'uppercase' }}>{s.category}</span>
                <h2 style={{ fontSize: '2rem', color: 'white' }}>{s.title}</h2>
             </div>
          </div>

          <div className="glass-card" style={{ padding: '2rem', marginBottom: '2rem', borderLeft: '4px solid #ec4899' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ec4899', marginBottom: '1rem', fontWeight: 700 }}>
                <AlertTriangle size={18} /> YAPISAL SORUN
             </div>
             <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.problem}</p>
          </div>

          <AnimatePresence mode="wait">
            {isSurgeryDone && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card" 
                style={{ padding: '2rem', borderLeft: '4px solid var(--primary)', background: 'rgba(59, 130, 246, 0.05)' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '1rem', fontWeight: 700 }}>
                    <ShieldCheck size={18} /> MİMARİ DÜZEN
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{s.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            onClick={nextScenario}
            style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'transparent', border: 'none', color: '#ec4899', fontWeight: 700, cursor: 'pointer' }}
          >
            Sonraki Yapı <ArrowRight size={18} />
          </button>
        </div>

        {/* Right Tree Panel */}
        <div style={{ position: 'relative' }}>
           <div className="glass-card" style={{ 
             padding: '0', 
             overflow: 'hidden', 
             minHeight: '600px', 
             display: 'flex',
             flexDirection: 'column',
             background: '#0f172a', 
             border: '1px solid var(--glass-border)',
             boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
           }}>
              {/* Header */}
              <div style={{ background: '#1e293b', padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                 <div style={{ display: 'flex', gap: '0.6rem' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
                 </div>
                 <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 700, letterSpacing: '1.5px', opacity: 0.8 }}>
                    {isSurgeryDone ? 'CLEAN_STRUCTURE' : 'MESSY_ROOT'}
                 </div>
                 <div style={{ color: 'var(--text-secondary)', opacity: 0.5 }}><Layers size={18} /></div>
              </div>

              {/* Tree Content */}
              <div style={{ padding: '3rem', flex: 1, minHeight: '350px', position: 'relative', overflowY: 'auto' }}>
                <AnimatePresence mode="wait">
                  {!isSurgeryDone ? (
                    <motion.div
                      key={`dirty-${activeScenario}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      {s.dirtyTree.map((node, i) => <FileNode key={i} node={node} />)}
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`clean-${activeScenario}`}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      {s.cleanTree.map((node, i) => <FileNode key={i} node={node} />)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Button */}
              <div style={{ padding: '3rem', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.3)' }}>
                 <button 
                  onClick={() => setIsSurgeryDone(!isSurgeryDone)}
                  className="surgery-btn"
                  style={{
                    width: '100%',
                    padding: '1.5rem',
                    borderRadius: '16px',
                    border: 'none',
                    background: isSurgeryDone ? 'rgba(39, 201, 63, 0.15)' : '#ec4899',
                    color: isSurgeryDone ? '#4ade80' : 'white',
                    fontWeight: 900,
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1.2rem',
                    transition: 'all 0.4s',
                    boxShadow: isSurgeryDone ? 'none' : '0 10px 40px rgba(236, 72, 153, 0.3)'
                  }}
                 >
                   {isSurgeryDone ? (
                     <><CheckCircle2 size={24} /> Yapılandırma Başarılı (Geri Al)</>
                   ) : (
                     <><Layout size={24} /> Klasörleri Düzenle</>
                   )}
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default FolderSurgery;
