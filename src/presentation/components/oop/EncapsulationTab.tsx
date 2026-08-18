import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const EncapsulationTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const [balance, setBalance] = useState(1000);
  const [isPrivateVisible, setIsPrivateVisible] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addToLog = (msg: string) => setLogs(prev => [msg, ...prev].slice(0, 5));

  const deposit = (amount: number) => {
    if (amount > 0) {
      setBalance(prev => prev + amount);
      addToLog(`Deposit: +${amount} (Success)`);
    }
  };

  return (
    <motion.div
      key="encapsulation"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}
    >
      <div>
        <h3 style={{ fontSize: '1.8rem', color: '#f43f5e', marginBottom: '1rem' }}>
          {isEn ? "Safe & Sound" : "Güvenli ve Kontrollü"}
        </h3>
        <p style={{ color: '#cbd5e1', lineHeight: 1.6 }}>
          {isEn 
            ? "Hiding internal object state (private fields) from the outside world, controlling all mutations strictly through public methods (getters/setters/commands)."
            : "Bir sınıfın iç veri yapısını (field) dış dünyadan gizlemek (private) ve bu verilere erişimi metodlar (getter/setter) aracılığıyla kontrol etmektir."
          }
        </p>
        <div style={{ marginTop: '20px', padding: '15px', background: '#1e293b', borderRadius: '12px', borderLeft: '4px solid #f43f5e' }}>
          <h4 style={{ color: 'white', margin: '0 0 10px 0' }}>
            {isEn ? "Analogy: Bank Account" : "Analoji: Banka Hesabı"}
          </h4>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
            {isEn 
              ? "You cannot directly alter your account balance (myMoney = 1000000). You can only invoke deposit() or withdraw(), allowing the bank to enforce balance integrity."
              : "Banka hesabındaki paranızı doğrudan değiştiremezsiniz (myMoney = 1000000 yapamazsınız). Sadece `deposit()` veya `withdraw()` işlemi yapabilirsiniz. Banka bu işlemleri kontrol eder."
            }
          </p>
        </div>
      </div>
      
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <h4 style={{ margin: 0, color: 'white' }}>BankAccount Simulator</h4>
          <div 
            onClick={() => setIsPrivateVisible(!isPrivateVisible)}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: '#f43f5e' }}
          >
            {isPrivateVisible ? <EyeOff size={14}/> : <Eye size={14}/>} {isPrivateVisible ? (isEn ? 'Hide Private' : 'Gizle') : (isEn ? 'Peek Private' : 'İçeri Bak')}
          </div>
        </div>

        <div style={{ padding: '20px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px', fontFamily: 'monospace', position: 'relative' }}>
          {isPrivateVisible && (
            <div style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '0.7rem', color: '#ef4444' }}>
              ACCESSING PRIVATE MEMORY!
            </div>
          )}
          <div style={{ color: '#94a3b8' }}>class UserAccount {'{'}</div>
          <div style={{ marginLeft: '20px', color: '#ef4444' }}>
            private double balance = {isPrivateVisible ? <span style={{ background: '#ef4444', color: 'white', padding: '0 4px', borderRadius: '4px' }}>{balance}</span> : '******'};
          </div>
          <div style={{ marginLeft: '20px', color: '#10b981' }}>
            public void deposit(amount) {'{ ... }'}
          </div>
          <div style={{ color: '#94a3b8' }}>{'}'}</div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="btn-bounce" 
            onClick={() => deposit(100)} 
            style={{ background: '#10b981', flex: 1, border: 'none', padding: '10px', borderRadius: '8px', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {isEn ? "Deposit $100" : "Yatır: $100"}
          </button>
          <button 
            className="btn-bounce" 
            onClick={() => addToLog(isEn ? 'Direct Access Denied!' : 'Doğrudan Erişim Reddedildi!')} 
            style={{ background: '#ef4444', flex: 1, border: 'none', padding: '10px', borderRadius: '8px', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {isEn ? "Hack Balance" : "Doğrudan Değiştir (Hack)"}
          </button>
        </div>

        <div style={{ height: '100px', overflowY: 'auto', background: '#020617', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', color: '#cbd5e1' }}>
          {logs.map((l, i) => <div key={i}>&gt; {l}</div>)}
        </div>
      </div>
    </motion.div>
  );
};

export default EncapsulationTab;
