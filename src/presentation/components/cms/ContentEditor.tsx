import React, { useMemo, useState } from 'react';
import { AlertOctagon, AlertTriangle, CheckCircle2, Loader2, Pencil, RotateCcw, Save } from 'lucide-react';
import { CmsCollectionName, CmsEnvelope } from '../../../domain/entities/CmsEntry';
import { EditableField, describeItem } from '../../../domain/usecases/CollectionValidator';
import { ValidationIssue } from '../../../shared/collectionSchema.mjs';
import { ContentWriteResult, putCollection, resetCollection } from '../../../infrastructure/cms/CmsContentWriter';

export interface ContentEditorProps {
  name: CmsCollectionName;
  envelope: CmsEnvelope<unknown>;
  endpoint: string;
  token: string;
  isEn: boolean;
  onSaved: (envelope: CmsEnvelope<unknown>) => void;
  onReset: () => void;
}

const fieldInputStyle: React.CSSProperties = {
  width: '100%',
  padding: '7px 10px',
  borderRadius: '8px',
  background: '#020617',
  border: '1px solid #1e293b',
  color: 'white',
  fontSize: '0.78rem',
  fontFamily: 'monospace',
  boxSizing: 'border-box'
};

const serialize = (field: EditableField, raw: string): unknown => {
  if (field.kind === 'string-list') {
    return raw
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  }
  if (field.kind === 'number') {
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  if (field.kind === 'boolean') return raw === 'true';
  if (field.kind === 'json') {
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  }
  return raw;
};

const deserialize = (field: EditableField): string => {
  if (field.kind === 'string-list' && Array.isArray(field.value)) return field.value.join('\n');
  if (field.kind === 'json') return JSON.stringify(field.value, null, 2);
  return String(field.value ?? '');
};

export const ContentEditor: React.FC<ContentEditorProps> = ({
  name,
  envelope,
  endpoint,
  token,
  isEn,
  onSaved,
  onReset
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState<Record<string, string> | null>(null);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState<ContentWriteResult | null>(null);

  const fields = useMemo(
    () => (selectedIndex === null ? [] : describeItem(envelope.items[selectedIndex])),
    [envelope.items, selectedIndex]
  );

  const startEditing = (index: number) => {
    const item = envelope.items[index];
    if (typeof item !== 'object' || item === null) return;
    const record = item as Record<string, unknown>;
    const next: Record<string, string> = {};
    describeItem(item).forEach((field) => {
      next[field.key] = deserialize(field);
    });
    void record;
    setSelectedIndex(index);
    setDraft(next);
    setResult(null);
  };

  const cancel = () => {
    setSelectedIndex(null);
    setDraft(null);
    setResult(null);
  };

  const save = async () => {
    if (selectedIndex === null || !draft) return;
    setSaving(true);
    setResult(null);

    const item = envelope.items[selectedIndex];
    const updated = { ...(item as Record<string, unknown>) } as Record<string, unknown>;
    describeItem(item).forEach((field) => {
      if (draft[field.key] === undefined) return;
      updated[field.key] = serialize(field, draft[field.key]);
    });

    const nextEnvelope: CmsEnvelope<unknown> = {
      collection: name,
      version: envelope.version,
      updatedAt: envelope.updatedAt,
      items: envelope.items.map((entry, index) => (index === selectedIndex ? updated : entry))
    };

    const writeResult = await putCollection(endpoint, token, name, nextEnvelope);
    setResult(writeResult);
    setSaving(false);
    if (writeResult.ok && writeResult.envelope) {
      onSaved(writeResult.envelope);
      setSelectedIndex(null);
      setDraft(null);
    }
  };

  const restore = async () => {
    setSaving(true);
    const ok = await resetCollection(endpoint, token, name);
    setSaving(false);
    if (ok) {
      cancel();
      onReset();
    }
  };

  return (
    <div className="glass-card" style={{ padding: '1.5rem', borderTop: '2px solid #f59e0b' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Pencil size={16} color="#f59e0b" />
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: 'white' }}>
            {isEn ? 'Author items' : 'Kayıt düzenle'}
          </h3>
        </div>
        <button
          type="button"
          onClick={() => void restore()}
          disabled={saving}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 14px',
            borderRadius: '9px',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.04)',
            color: '#94a3b8',
            fontWeight: 700,
            fontSize: '0.75rem',
            cursor: saving ? 'wait' : 'pointer'
          }}
        >
          <RotateCcw size={13} /> {isEn ? 'Reset to seed' : 'Seed’e dön'}
        </button>
      </div>

      {result && (
        <div
          role="status"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.5rem',
            padding: '0.6rem 0.8rem',
            borderRadius: '10px',
            marginBottom: '1rem',
            background: result.ok ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)',
            border: `1px solid ${result.ok ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`
          }}
        >
          {result.ok ? <CheckCircle2 size={14} color="#10b981" /> : <AlertOctagon size={14} color="#ef4444" />}
          <span style={{ color: result.ok ? '#6ee7b7' : '#fca5a5', fontSize: '0.75rem' }}>
            {result.ok
              ? isEn ? 'Saved to the CMS.' : 'CMS’e kaydedildi.'
              : `${isEn ? 'Write rejected' : 'Yazma reddedildi'} (${result.status || 'network'}): ${result.errors
                  .map((issue: ValidationIssue) => `${issue.path}: ${issue.message}`)
                  .join('; ')}`}
          </span>
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 260px) minmax(0, 1fr)',
          gap: '1.25rem',
          minHeight: '220px'
        }}
      >
        <div
          className="custom-scrollbar"
          style={{ maxHeight: '420px', overflowY: 'auto', border: '1px solid #1e293b', borderRadius: '12px', padding: '0.5rem' }}
        >
          {envelope.items.map((item, index) => {
            const record = (item ?? {}) as Record<string, unknown>;
            const label = String(record.id ?? record.key ?? record.name ?? record.term ?? `#${index}`);
            const isActive = index === selectedIndex;
            return (
              <button
                key={`${label}-${index}`}
                type="button"
                onClick={() => startEditing(index)}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '7px 10px',
                  marginBottom: '3px',
                  borderRadius: '8px',
                  border: `1px solid ${isActive ? 'rgba(245,158,11,0.5)' : 'transparent'}`,
                  background: isActive ? 'rgba(245,158,11,0.1)' : 'transparent',
                  color: isActive ? '#fde68a' : '#94a3b8',
                  fontSize: '0.72rem',
                  fontFamily: 'monospace',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div>
          {!draft ? (
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.8rem' }}>
              {isEn
                ? 'Pick an item on the left to edit it. String lists accept one entry per line.'
                : 'Soldan bir kayıt seçin. Metin listeleri her satıra bir girdi kabul eder.'}
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {fields.map((field) => (
                <div key={field.key}>
                  <span style={{ display: 'block', color: '#94a3b8', fontSize: '0.6rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '3px' }}>
                    {field.key} · {field.kind}
                  </span>
                  {field.kind === 'boolean' ? (
                    <select
                      style={fieldInputStyle}
                      value={draft[field.key] ?? 'false'}
                      onChange={(event) => setDraft({ ...draft, [field.key]: event.target.value })}
                    >
                      <option value="true">true</option>
                      <option value="false">false</option>
                    </select>
                  ) : (
                    <textarea
                      rows={field.kind === 'json' || field.kind === 'string-list' ? Math.min(8, (draft[field.key] ?? '').split('\n').length + 1) : 1}
                      style={{ ...fieldInputStyle, resize: 'vertical', lineHeight: 1.5 }}
                      value={draft[field.key] ?? ''}
                      onChange={(event) => setDraft({ ...draft, [field.key]: event.target.value })}
                    />
                  )}
                </div>
              ))}

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                <button
                  type="button"
                  onClick={() => void save()}
                  disabled={saving}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '9px',
                    border: 'none',
                    background: saving ? '#475569' : '#f59e0b',
                    color: saving ? '#94a3b8' : '#022c22',
                    fontWeight: 800,
                    fontSize: '0.78rem',
                    cursor: saving ? 'wait' : 'pointer'
                  }}
                >
                  {saving ? <Loader2 size={13} /> : <Save size={13} />}
                  {saving ? (isEn ? 'Saving…' : 'Kaydediliyor…') : isEn ? 'Save to CMS' : 'CMS’e kaydet'}
                </button>
                <button
                  type="button"
                  onClick={cancel}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '9px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'transparent',
                    color: '#94a3b8',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    cursor: 'pointer'
                  }}
                >
                  {isEn ? 'Cancel' : 'Vazgeç'}
                </button>
              </div>

              {result && result.warnings.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.5rem' }}>
                  {result.warnings.slice(0, 8).map((issue: ValidationIssue, index: number) => (
                    <span key={`${issue.path}-${index}`} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fcd34d', fontSize: '0.7rem' }}>
                      <AlertTriangle size={12} /> {issue.path}: {issue.message}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentEditor;
