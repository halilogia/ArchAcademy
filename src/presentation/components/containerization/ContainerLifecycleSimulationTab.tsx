import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw, CheckCircle2, Layers, Cpu, Server, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const ContainerLifecycleSimulationTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  const [buildMode, setBuildMode] = useState<'naive' | 'multistage'>('naive');

  return (
    <motion.div key="simulation" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <div className="glass-card" style={{ padding: '2.5rem' }}>
        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>
          {isEn ? "Interactive Multi-Stage Image Optimizer Lab" : "İnteraktif Dockerfile Multi-Stage Optimizasyon Laboratuvarı"}
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
          {isEn 
            ? "Toggle between standard naive build and multi-stage build to see the dramatic reduction in image size and CVE vulnerabilities." 
            : "Tek aşamalı düz derleme ile multi-stage build arasındaki imaj boyutu ve güvenlik farkını canlı olarak test edin."
          }
        </p>

        {/* Toggle */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button
            onClick={() => setBuildMode('naive')}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              border: buildMode === 'naive' ? '2px solid #ef4444' : '1px solid #1e293b',
              background: buildMode === 'naive' ? 'rgba(239, 68, 68, 0.15)' : '#020617',
              color: buildMode === 'naive' ? '#f87171' : '#94a3b8',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            ❌ Naive Single-Stage (1.2 GB)
          </button>
          <button
            onClick={() => setBuildMode('multistage')}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              border: buildMode === 'multistage' ? '2px solid #22c55e' : '1px solid #1e293b',
              background: buildMode === 'multistage' ? 'rgba(34, 197, 94, 0.15)' : '#020617',
              color: buildMode === 'multistage' ? '#4ade80' : '#94a3b8',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            ✅ Multi-Stage Distroless (42 MB)
          </button>
        </div>

        {/* Results Visualizer */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '8px', fontWeight: 600 }}>Dockerfile Source</div>
            <pre style={{ background: '#020617', padding: '1.25rem', borderRadius: '12px', border: '1px solid #1e293b', color: buildMode === 'naive' ? '#f87171' : '#4ade80', fontFamily: 'monospace', fontSize: '0.8rem', minHeight: '160px' }}>
              {buildMode === 'naive' ? 
`FROM node:20
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]` : 
`# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Runtime Distroless
FROM gcr.io/distroless/nodejs20-debian12
WORKDIR /app
COPY --from=builder /app/dist ./dist
USER nonroot
CMD ["dist/server.js"]`}
            </pre>
          </div>

          <div style={{ background: '#020617', padding: '1.5rem', borderRadius: '16px', border: `1px solid ${buildMode === 'naive' ? '#ef4444' : '#22c55e'}44`, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>Build Metrics Analysis</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid #1e293b', paddingBottom: '8px' }}>
              <span style={{ color: '#94a3b8' }}>Final Image Size:</span>
              <span style={{ fontWeight: 800, color: buildMode === 'naive' ? '#ef4444' : '#22c55e' }}>
                {buildMode === 'naive' ? '1,240 MB' : '42 MB (-96.6%)'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid #1e293b', paddingBottom: '8px' }}>
              <span style={{ color: '#94a3b8' }}>CVE Vulnerabilities:</span>
              <span style={{ fontWeight: 800, color: buildMode === 'naive' ? '#ef4444' : '#22c55e' }}>
                {buildMode === 'naive' ? '48 Detected (Critical)' : '0 Detected (Clean)'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#94a3b8' }}>Container User:</span>
              <span style={{ fontWeight: 800, color: buildMode === 'naive' ? '#ef4444' : '#22c55e' }}>
                {buildMode === 'naive' ? 'root (Insecure)' : 'nonroot:nonroot (Secure)'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContainerLifecycleSimulationTab;
