import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, AlertOctagon, Info, ShieldCheck } from 'lucide-react';
import { IssueSeverity, TopologyIssue, topologyScore } from '../../../domain/usecases/TopologyAnalyzer';

export interface TopologyIssueListProps {
  issues: TopologyIssue[];
  isEn: boolean;
}

const SEVERITY_META: Record<IssueSeverity, { color: string; icon: React.ReactNode; label: { tr: string; en: string } }> = {
  critical: { color: '#ef4444', icon: <AlertOctagon size={14} />, label: { tr: 'Kritik', en: 'Critical' } },
  warning: { color: '#f59e0b', icon: <AlertTriangle size={14} />, label: { tr: 'Uyarı', en: 'Warning' } },
  info: { color: '#38bdf8', icon: <Info size={14} />, label: { tr: 'Bilgi', en: 'Info' } }
};

export const TopologyIssueList: React.FC<TopologyIssueListProps> = ({ issues, isEn }) => {
  const score = topologyScore(issues);
  const criticals = issues.filter((issue) => issue.severity === 'critical').length;
  const warnings = issues.filter((issue) => issue.severity === 'warning').length;

  return (
    <div className="glass-card" style={{ padding: '1.5rem', borderTop: `3px solid ${score >= 80 ? '#10b981' : score >= 55 ? '#f59e0b' : '#ef4444'}` }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <ShieldCheck size={18} color={score >= 80 ? '#10b981' : score >= 55 ? '#f59e0b' : '#ef4444'} />
          <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'white' }}>
            {isEn ? 'Topology Review' : 'Topoloji Denetimi'}
          </h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: criticals > 0 ? '#f87171' : '#64748b' }}>
            {criticals} {isEn ? 'critical' : 'kritik'}
          </span>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: warnings > 0 ? '#fbbf24' : '#64748b' }}>
            {warnings} {isEn ? 'warning' : 'uyarı'}
          </span>
          <span style={{ fontSize: '1.4rem', fontWeight: 900, color: score >= 80 ? '#10b981' : score >= 55 ? '#f59e0b' : '#ef4444' }}>
            {score}
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>/100</span>
          </span>
        </div>
      </div>

      {issues.length === 0 ? (
        <p style={{ margin: 0, color: '#10b981', fontSize: '0.85rem', fontWeight: 600 }}>
          {isEn ? 'No architectural findings. The topology is clean.' : 'Mimari bulgu yok. Topoloji temiz.'}
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {issues.map((issue, index) => {
            const meta = SEVERITY_META[issue.severity];
            return (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.04 }}
                style={{
                  display: 'flex',
                  gap: '0.65rem',
                  padding: '0.75rem 0.85rem',
                  borderRadius: '12px',
                  background: `${meta.color}0f`,
                  border: `1px solid ${meta.color}33`
                }}
              >
                <span style={{ color: meta.color, display: 'flex', marginTop: '2px', flexShrink: 0 }}>{meta.icon}</span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '3px' }}>
                    <span style={{ color: 'white', fontSize: '0.82rem', fontWeight: 700 }}>
                      {isEn ? issue.title.en : issue.title.tr}
                    </span>
                    <span style={{ fontSize: '0.55rem', fontWeight: 800, letterSpacing: '0.6px', textTransform: 'uppercase', color: meta.color }}>
                      {isEn ? meta.label.en : meta.label.tr}
                    </span>
                  </div>
                  <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.78rem', lineHeight: 1.55 }}>
                    {isEn ? issue.detail.en : issue.detail.tr}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};
