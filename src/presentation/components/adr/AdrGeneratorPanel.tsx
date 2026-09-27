import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Download, FileText, Sparkles, Wand2 } from 'lucide-react';
import { SandboxDesign } from '../../../domain/entities/Sandbox';
import {
  AdrInput,
  AdrStatus,
  buildAdrMarkdown,
  buildAutoContext,
  buildAutoDecision,
  buildAutoRisks
} from '../../../domain/usecases/AdrGenerator';
import { TopologyIssue } from '../../../domain/usecases/TopologyAnalyzer';

export interface AdrGeneratorPanelProps {
  design: SandboxDesign;
  issues: TopologyIssue[];
  isEn: boolean;
  onSave?: (markdown: string) => void;
}

const STATUS_OPTIONS: AdrStatus[] = ['proposed', 'accepted', 'deprecated', 'superseded'];

const fieldStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 10px',
  borderRadius: '8px',
  background: '#020617',
  border: '1px solid #1e293b',
  color: 'white',
  fontSize: '0.8rem',
  fontFamily: 'inherit',
  boxSizing: 'border-box'
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  color: '#94a3b8',
  fontSize: '0.65rem',
  fontWeight: 800,
  textTransform: 'uppercase',
  letterSpacing: '0.8px',
  marginBottom: '4px'
};

const linesToList = (value: string): string[] =>
  value
    .split('\n')
    .map((line) => line.replace(/^[-*]\s*/, '').trim())
    .filter((line) => line.length > 0);

const ListField: React.FC<{
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  rows?: number;
  onChange: (value: string) => void;
}> = ({ id, label, value, placeholder, rows = 3, onChange }) => (
  <div>
    <label style={labelStyle} htmlFor={id}>
      {label}
    </label>
    <textarea
      id={id}
      rows={rows}
      style={{ ...fieldStyle, resize: 'vertical', lineHeight: 1.55 }}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  </div>
);

export const AdrGeneratorPanel: React.FC<AdrGeneratorPanelProps> = ({
  design,
  issues,
  isEn,
  onSave
}) => {
  const [id, setId] = useState('0001');
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<AdrStatus>('proposed');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [deciders, setDeciders] = useState('');
  const [context, setContext] = useState('');
  const [drivers, setDrivers] = useState('');
  const [decision, setDecision] = useState('');
  const [options, setOptions] = useState('');
  const [positives, setPositives] = useState('');
  const [negatives, setNegatives] = useState('');
  const [supersededBy, setSupersededBy] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (title.trim().length > 0) return;
    setTitle(`${design.name || (isEn ? 'Untitled System' : 'İsimsiz Sistem')} Architecture`);
  }, [design.name, isEn, title]);

  useEffect(() => {
    if (context.trim().length > 0) return;
    setContext(buildAutoContext(design));
  }, [context, design]);

  useEffect(() => {
    if (decision.trim().length > 0) return;
    setDecision(buildAutoDecision(design));
  }, [decision, design]);

  useEffect(() => {
    if (negatives.trim().length > 0) return;
    const risks = buildAutoRisks(issues, isEn);
    if (risks.length > 0) setNegatives(risks.join('\n'));
  }, [isEn, issues, negatives]);

  const markdown = useMemo<AdrInput>(
    () => ({
      id,
      title,
      status,
      date,
      deciders,
      context,
      decisionDrivers: linesToList(drivers),
      decision,
      consideredOptions: linesToList(options),
      consequencesPositive: linesToList(positives),
      consequencesNegative: linesToList(negatives),
      supersededBy,
      design,
      issues
    }),
    [
      context,
      date,
      deciders,
      decision,
      design,
      drivers,
      id,
      issues,
      negatives,
      options,
      positives,
      status,
      supersededBy,
      title
    ]
  );

  const adrDocument = useMemo(() => buildAdrMarkdown(markdown), [markdown]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(adrDocument);
    } catch {
      const area = window.document.createElement('textarea');
      area.value = adrDocument;
      window.document.body.appendChild(area);
      area.select();
      window.document.execCommand('copy');
      area.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const download = () => {
    const blob = new Blob([adrDocument], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = window.document.createElement('a');
    const slug = (title || 'adr').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    anchor.href = url;
    anchor.download = `${id}-${slug || 'adr'}.md`;
    anchor.click();
    URL.revokeObjectURL(url);
    onSave?.(adrDocument);
  };

  return (
    <div className="glass-card" style={{ padding: '2rem', borderTop: '3px solid #a855f7' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
        <FileText size={20} color="#a855f7" />
        <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800, color: 'white' }}>
          {isEn ? 'MADR Decision Record Generator' : 'MADR Karar Kaydı Üreticisi'}
        </h3>
      </div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, margin: '0 0 1.5rem' }}>
        {isEn
          ? 'Context, decision and risks are generated from the current sandbox topology, then exported as a MADR markdown document for your repository.'
          : 'Bağlam, karar ve riskler mevcut sandbox topolojisinden üretilir ve deponuz için MADR markdown dokümanı olarak dışa aktarılır.'}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: '0.75rem' }}>
            <div>
              <label style={labelStyle} htmlFor="adr-id">
                {isEn ? 'No.' : 'No'}
              </label>
              <input id="adr-id" style={fieldStyle} value={id} onChange={(event) => setId(event.target.value)} />
            </div>
            <div>
              <label style={labelStyle} htmlFor="adr-title">
                {isEn ? 'Title' : 'Başlık'}
              </label>
              <input id="adr-title" style={fieldStyle} value={title} onChange={(event) => setTitle(event.target.value)} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={labelStyle} htmlFor="adr-status">
                {isEn ? 'Status' : 'Durum'}
              </label>
              <select
                id="adr-status"
                style={fieldStyle}
                value={status}
                onChange={(event) => setStatus(event.target.value as AdrStatus)}
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle} htmlFor="adr-date">
                {isEn ? 'Date' : 'Tarih'}
              </label>
              <input id="adr-date" type="date" style={fieldStyle} value={date} onChange={(event) => setDate(event.target.value)} />
            </div>
          </div>

          <div>
            <label style={labelStyle} htmlFor="adr-deciders">
              {isEn ? 'Deciders' : 'Karar Vericiler'}
            </label>
            <input
              id="adr-deciders"
              style={fieldStyle}
              value={deciders}
              placeholder={isEn ? 'Architecture Team, Platform Guild' : 'Mimari Ekibi, Platform Ekibi'}
              onChange={(event) => setDeciders(event.target.value)}
            />
          </div>

          <ListField
            id="adr-context"
            label={isEn ? 'Context' : 'Bağlam'}
            value={context}
            rows={4}
            placeholder={isEn ? 'What forces are at play?' : 'Hangi etkiler devrede?'}
            onChange={setContext}
          />

          <ListField
            id="adr-drivers"
            label={isEn ? 'Decision Drivers (one per line)' : 'Karar Etkenleri (her satıra bir tane)'}
            value={drivers}
            placeholder={isEn ? 'p99 latency budget\nno data loss on writes' : 'p99 gecikme bütçesi\nyazma kaybı olmamalı'}
            onChange={setDrivers}
          />

          <ListField
            id="adr-options"
            label={isEn ? 'Considered Options (one per line)' : 'Değerlendirilen Seçenekler (her satıra bir tane)'}
            value={options}
            placeholder={isEn ? 'Modular monolith\nEvent-driven microservices' : 'Modüler monolit\nOlay tabanlı mikroservisler'}
            onChange={setOptions}
          />

          <ListField
            id="adr-decision"
            label={isEn ? 'Decision' : 'Karar'}
            value={decision}
            rows={5}
            onChange={setDecision}
          />

          <ListField
            id="adr-positive"
            label={isEn ? 'Positive Consequences' : 'Olumlu Sonuçlar'}
            value={positives}
            placeholder={isEn ? 'Horizontal scaling without coordination' : 'Koordinasyon gerektirmeyen yatay ölçekleme'}
            onChange={setPositives}
          />

          <ListField
            id="adr-negative"
            label={isEn ? 'Negative Consequences / Risks' : 'Olumsuz Sonuçlar / Riskler'}
            value={negatives}
            rows={4}
            onChange={setNegatives}
          />

          <div>
            <label style={labelStyle} htmlFor="adr-supersedes">
              {isEn ? 'Supersedes (optional)' : 'Geçersiz Kıldığı Karar (opsiyonel)'}
            </label>
            <input
              id="adr-supersedes"
              style={fieldStyle}
              value={supersededBy}
              placeholder="0003"
              onChange={(event) => setSupersededBy(event.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => {
                setContext(buildAutoContext(design));
                setDecision(buildAutoDecision(design));
                setNegatives(buildAutoRisks(issues, isEn).join('\n'));
                setTitle(`${design.name || (isEn ? 'Untitled System' : 'İsimsiz Sistem')} Architecture`);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 16px',
                borderRadius: '10px',
                background: 'rgba(168,85,247,0.15)',
                border: '1px solid rgba(168,85,247,0.35)',
                color: '#d8b4fe',
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              <Wand2 size={14} /> {isEn ? 'Regenerate from topology' : 'Topolojiden yeniden üret'}
            </button>

            <button
              type="button"
              onClick={copy}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 16px',
                borderRadius: '10px',
                background: copied ? '#10b981' : 'rgba(56,189,248,0.15)',
                border: `1px solid ${copied ? '#10b981' : 'rgba(56,189,248,0.35)'}`,
                color: copied ? '#022c22' : '#7dd3fc',
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? (isEn ? 'Copied' : 'Kopyalandı') : isEn ? 'Copy markdown' : 'Markdown kopyala'}
            </button>

            <button
              type="button"
              onClick={download}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '9px 16px',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              <Download size={14} /> {isEn ? 'Download .md' : '.md indir'}
            </button>

            {onSave && (
              <button
                type="button"
                onClick={() => onSave(adrDocument)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 16px',
                  borderRadius: '10px',
                  background: 'rgba(16,185,129,0.15)',
                  border: '1px solid rgba(16,185,129,0.35)',
                  color: '#6ee7b7',
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                <Sparkles size={14} /> {isEn ? 'Save to cloud' : 'Buluta kaydet'}
              </button>
            )}
          </div>

          <pre
            style={{
              margin: 0,
              flex: 1,
              minHeight: '520px',
              maxHeight: '620px',
              overflow: 'auto',
              background: '#020617',
              border: '1px solid #1e293b',
              borderRadius: '12px',
              padding: '1rem',
              color: '#a5f3fc',
              fontFamily: 'monospace',
              fontSize: '0.72rem',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}
            data-testid="adr-markdown-preview"
          >
            {adrDocument}
          </pre>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ margin: 0, fontSize: '0.68rem', color: '#64748b', textAlign: 'right' }}
          >
            {adrDocument.split('\n').length} {isEn ? 'lines' : 'satır'} · MADR 3.0.0
          </motion.p>
        </div>
      </div>
    </div>
  );
};
