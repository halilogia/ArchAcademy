import { useState } from 'react';

export type ThreatType = 'SQL_INJECTION' | 'XSS_PAYLOAD' | 'UNAUTHORIZED_LATERAL_MOVE' | 'MAN_IN_THE_MIDDLE';

export interface ThreatSimulationResult {
  id: string;
  threat: ThreatType;
  blockedBy: string;
  mitigation: string;
  status: 'BLOCKED' | 'BREACHED';
  timestamp: string;
}

export function useSecuritySimulation() {
  const [zeroTrustActive, setZeroTrustActive] = useState(true);
  const [mTLSActive, setMTLSActive] = useState(true);
  const [wafActive, setWafActive] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);
  const [logs, setLogs] = useState<ThreatSimulationResult[]>([]);

  const launchAttack = (threat: ThreatType) => {
    setIsSimulating(true);

    setTimeout(() => {
      let blocked = false;
      let blockedBy = '';
      let mitigation = '';

      if (threat === 'SQL_INJECTION' && wafActive) {
        blocked = true;
        blockedBy = 'WAF & Parameterized Queries';
        mitigation = 'SQL meta-characters stripped. Prepared statement invariant preserved.';
      } else if (threat === 'MAN_IN_THE_MIDDLE' && mTLSActive) {
        blocked = true;
        blockedBy = 'Mutual TLS (mTLS) Encryption';
        mitigation = 'Cryptographic handshake failed for unauthenticated cert.';
      } else if (threat === 'UNAUTHORIZED_LATERAL_MOVE' && zeroTrustActive) {
        blocked = true;
        blockedBy = 'Zero Trust Micro-Segmentation (NIST SP 800-207)';
        mitigation = 'Lateral movement denied. Service account lacks least-privilege token.';
      } else if (threat === 'XSS_PAYLOAD' && wafActive) {
        blocked = true;
        blockedBy = 'Content Security Policy (CSP) & HTML Sanitizer';
        mitigation = 'Unsafe inline script tags purged via strict DOMPurify pipeline.';
      } else {
        blocked = false;
        blockedBy = 'NONE (Defense Layer Disabled!)';
        mitigation = 'Vulnerability exploited. Data exfiltration or lateral breach occurred.';
      }

      const newLog: ThreatSimulationResult = {
        id: Math.random().toString(36).substring(2, 7).toUpperCase(),
        threat,
        blockedBy,
        mitigation,
        status: blocked ? 'BLOCKED' : 'BREACHED',
        timestamp: new Date().toLocaleTimeString().split(' ')[0]
      };

      setLogs(prev => [newLog, ...prev].slice(0, 5));
      setIsSimulating(false);
    }, 500);
  };

  return {
    zeroTrustActive,
    setZeroTrustActive,
    mTLSActive,
    setMTLSActive,
    wafActive,
    setWafActive,
    isSimulating,
    logs,
    launchAttack
  };
}
