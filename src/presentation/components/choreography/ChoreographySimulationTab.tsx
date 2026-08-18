import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Layers, CreditCard, Truck, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface ServiceNode {
  id: string;
  label: string;
  icon: React.ReactNode;
  status: 'idle' | 'working' | 'done' | 'failed';
  log: string | null;
}

export const ChoreographySimulationTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const [processState, setProcessState] = useState<'idle' | 'running' | 'completed'>('idle');
  const [services, setServices] = useState<ServiceNode[]>([
    { id: 'order', label: 'Order Svc', icon: <Box size={20} />, status: 'idle', log: null },
    { id: 'stock', label: 'Inventory Svc', icon: <Layers size={20} />, status: 'idle', log: null },
    { id: 'payment', label: 'Payment Svc', icon: <CreditCard size={20} />, status: 'idle', log: null },
    { id: 'delivery', label: 'Delivery Svc', icon: <Truck size={20} />, status: 'idle', log: null }
  ]);

  const updateService = (id: string, status: 'idle' | 'working' | 'done' | 'failed', log: string) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, status, log } : s));
  };

  const resetServices = () => {
    setServices(prev => prev.map(s => ({ ...s, status: 'idle', log: null })));
  };

  const triggerService = (id: string) => {
    updateService(id, 'working', isEn ? 'Processing Event...' : 'Olay İşleniyor...');
    setTimeout(() => {
      if (id === 'stock') {
        updateService(id, 'done', 'Event: StockReserved');
        triggerService('payment');
      } else if (id === 'payment') {
        updateService(id, 'done', 'Event: PaymentCaptured');
        triggerService('delivery');
      } else if (id === 'delivery') {
        updateService(id, 'done', 'Event: Shipped');
        setProcessState('completed');
      }
    }, 1500);
  };

  const runSimulation = () => {
    if (processState === 'running') return;
    setProcessState('running');
    resetServices();

    updateService('order', 'working', isEn ? 'Creating Order...' : 'Sipariş Oluşturuluyor...');
    setTimeout(() => {
      updateService('order', 'done', 'Event: OrderPlaced');
      triggerService('stock');
    }, 1500);
  };

  return (
    <motion.div
      key="simulation"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <button 
          onClick={runSimulation}
          disabled={processState === 'running'}
          className="btn-bounce"
          style={{ 
            padding: '15px 40px', 
            fontSize: '1.2rem', 
            fontWeight: 800, 
            borderRadius: '12px', 
            border: 'none', 
            background: processState === 'running' ? '#334155' : '#ec4899', 
            color: 'white', 
            cursor: processState === 'running' ? 'default' : 'pointer',
            boxShadow: processState === 'running' ? 'none' : '0 10px 30px rgba(236, 72, 153, 0.4)',
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '10px'
          }}
        >
          {processState === 'running' 
            ? (isEn ? 'Processing Workflow...' : 'İş Akışı Yürütülüyor...') 
            : (isEn ? 'Start New Order Saga' : 'Yeni Sipariş Sagası Başlat')
          }
        </button>
      </div>

      <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', overflowX: 'auto', padding: '20px 0' }}>
        {/* Connecting Line */}
        <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '4px', background: '#1e293b', zIndex: 0 }} />
        <motion.div 
          style={{ position: 'absolute', top: '50%', left: 0, height: '4px', background: '#ec4899', zIndex: 0, boxShadow: '0 0 10px #ec4899' }} 
          initial={{ width: '0%' }}
          animate={{ 
            width: processState === 'idle' ? '0%' : 
                   processState === 'completed' ? '100%' : 
                   services[3].status === 'working' ? '85%' :
                   services[2].status === 'working' ? '60%' :
                   services[1].status === 'working' ? '35%' : '10%'
          }}
        />

        {services.map((svc, index) => (
          <div key={svc.id} style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.div
              animate={{ 
                scale: svc.status === 'working' ? 1.2 : 1,
                borderColor: svc.status === 'done' ? '#10b981' : svc.status === 'working' ? '#ec4899' : '#334155',
                backgroundColor: svc.status === 'done' ? '#064e3b' : '#0f172a'
              }}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '24px',
                border: '3px solid #334155',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                position: 'relative'
              }}
            >
              {svc.status === 'done' ? (
                <CheckCircle2 color="#10b981" size={32} />
              ) : (
                <div style={{ color: svc.status === 'working' ? '#ec4899' : '#64748b' }}>{svc.icon}</div>
              )}
              
              {/* Event Bubble Emission */}
              <AnimatePresence>
                {svc.status === 'done' && index < services.length - 1 && (
                  <motion.div
                    initial={{ left: '50%', opacity: 1, scale: 0 }}
                    animate={{ left: '250%', opacity: 0, scale: 1.5 }}
                    transition={{ duration: 1 }}
                    style={{ position: 'absolute', top: '30%', width: '20px', height: '20px', background: '#ec4899', borderRadius: '50%', zIndex: -1 }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
            
            <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '5px' }}>{svc.label}</div>
            <div style={{ 
              minHeight: '20px', 
              fontSize: '0.75rem', 
              color: svc.status === 'working' ? '#eab308' : svc.status === 'done' ? '#10b981' : '#64748b',
              fontWeight: 700 
            }}>
              {svc.log || (isEn ? 'Waiting...' : 'Bekliyor...')}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ChoreographySimulationTab;
