import { useState } from 'react';

export function useESBSimulation(isEn: boolean) {
  const [busActive, setBusActive] = useState(false);
  const [messageLog, setMessageLog] = useState<string[]>([]);
  const [legacyCRM, setLegacyCRM] = useState<'idle' | 'processing'>('idle');
  const [modernWeb, setModernWeb] = useState<'idle' | 'processing'>('idle');
  const [sapSystem, setSapSystem] = useState<'idle' | 'processing'>('idle');

  const log = (msg: string) => {
    setMessageLog(prev => [...prev, `${new Date().toLocaleTimeString().split(' ')[0]} - ${msg}`]);
  };

  const triggerESB = () => {
    if (busActive) return;
    setBusActive(true);
    setMessageLog([]);

    // 1. Web Request
    setModernWeb('processing');
    log(isEn ? 'Web App: SOAP Request Dispatched (XML Payload)' : 'Web App: SOAP Request Sent (XML)');

    setTimeout(() => {
      log(isEn ? 'ESB: Transforming JSON <-> XML' : 'ESB: Transforming JSON <-> XML');
      
      // 2. ESB Routing
      setTimeout(() => {
        log(isEn ? 'ESB: Routing to SAP & Legacy CRM' : 'ESB: Routing to SAP & CRM');
        setLegacyCRM('processing');
        setSapSystem('processing');
        
        // 3. Response
        setTimeout(() => {
          setLegacyCRM('idle');
          setSapSystem('idle');
          log(isEn ? 'Backend Systems: Data Successfully Mutated' : 'Systems: Data Updated');
          
          setTimeout(() => {
            log(isEn ? 'ESB: Aggregating & Formatting Responses' : 'ESB: Aggregating Responses');
            setModernWeb('idle');
            setBusActive(false);
          }, 1000);
        }, 1500);
      }, 1000);
    }, 1000);
  };

  return {
    busActive,
    messageLog,
    legacyCRM,
    modernWeb,
    sapSystem,
    triggerESB
  };
}
