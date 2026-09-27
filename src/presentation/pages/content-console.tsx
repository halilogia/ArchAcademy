import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  ClipboardCopy,
  Database,
  FileJson,
  RefreshCw,
  ShieldCheck
} from 'lucide-react';
import SEO from '../components/SEO';
import ArchHero from '../components/ArchHero';
import { CmsCollectionName, CmsEnvelope } from '../../domain/entities/CmsEntry';
import { CollectionReport, summarizeCollection } from '../../domain/usecases/CollectionValidator';
import { cmsContentRepository } from '../../infrastructure/cms/CmsContentRepository';
import { useProgress } from '../context/ProgressContext';

const CONSOLE_COLLECTIONS: CmsCollectionName[] = [
  'search-index',
  'acronyms',
  'acronym-categories',
  'glossary',
  'comparison-matrix',
  'comparison-matrix-cards',
  'architecture-questions',
  'architectures'
];

type ConsoleState = 'loading' | 'ready' | 'error';

interface LoadedCollection {
  envelope: CmsEnvelope<unknown>;
  report: CollectionReport;
}

const ContentConsolePage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const { completeStep } = useProgress();
  const [state, setState] = useState<ConsoleState>('loading');
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<CmsCollectionName>('search-index');
  const [collections, setCollections] = useState<Partial<Record<CmsCollectionName, LoadedCollection>>>({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => completeStep('/content-console'), 2000);
    return () => clearTimeout(timer);
  }, [completeStep]);

  const resolveAll = useCallback(async () => {
    const loaded: Partial<Record<CmsCollectionName, LoadedCollection>> = {};

    const results = await Promise.allSettled(
      CONSOLE_COLLECTIONS.map(async (name) => ({
        name,
        envelope: await cmsContentRepository.getCollection<unknown>(name)
      }))
    );

    const failures: string[] = [];
    results.forEach((result) => {
      if (result.status === 'rejected') {
        failures.push(result.reason instanceof Error ? result.reason.message : String(result.reason));
        return;
      }
      loaded[result.value.name] = {
        envelope: result.value.envelope,
        report: summarizeCollection(result.value.name, result.value.envelope)
      };
    });

    return { loaded, failure: Object.keys(loaded).length === 0 ? failures[0] ?? 'no collections resolved' : null };
  }, []);

  const apply = useCallback((result: { loaded: Partial<Record<CmsCollectionName, LoadedCollection>>; failure: string | null }) => {
    setCollections(result.loaded);
    if (result.failure) {
      setError(result.failure);
      setState('error');
      return;
    }
    setError(null);
    setState('ready');
  }, []);

  const refresh = useCallback(() => {
    setState('loading');
    resolveAll().then(apply);
  }, [apply, resolveAll]);

  useEffect(() => {
    let cancelled = false;
    resolveAll()
      .then((result) => {
        if (!cancelled) apply(result);
      })
      .catch((cause: unknown) => {
        if (cancelled) return;
        setError(cause instanceof Error ? cause.message : String(cause));
        setState('error');
      });
    return () => {
      cancelled = true;
    };
  }, [apply, resolveAll]);

  const active = collections[selected];

  const preview = useMemo(
    () => (active ? JSON.stringify(active.envelope, null, 2) : ''),
    [active]
  );

  const totals = useMemo(() => {
    const reports = Object.values(collections).map((entry) => entry?.report).filter(Boolean) as CollectionReport[];
    return {
      collections: reports.length,
      items: reports.reduce((sum, report) => sum + report.itemCount, 0),
      errors: reports.reduce((sum, report) => sum + report.errorCount, 0),
      warnings: reports.reduce((sum, report) => sum + report.warningCount, 0)
    };
  }, [collections]);

  const copyJson = async () => {
    try {
      await navigator.clipboard.writeText(preview);
    } catch {
      const area = window.document.createElement('textarea');
      area.value = preview;
      window.document.body.appendChild(area);
      area.select();
      window.document.execCommand('copy');
      area.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SEO
        title={isEn ? 'Content Console | ArchAcademy' : 'İçerik Konsolu | ArchAcademy'}
        description={isEn
          ? 'Inspect every CMS collection the portal serves, validate it against its schema and export the exact JSON a CMS should publish.'
          : "Portalun sunduğu her CMS koleksiyonunu inceleyin, şemasına göre doğrulayın ve bir CMS'in yayımlaması gereken JSON çıktısını alın."}
        keywords="content console, cms, collection schema, content validation, json export"
        canonicalUrl="/content-console"
      />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
        <ArchHero
          title="Content"
          subtitle={isEn ? 'Console' : 'Konsolu'}
          description={isEn
            ? 'Every lesson, acronym, glossary entry and matrix row the portal renders travels through a ContentRepository collection. This console lists what is actually being served, validates each collection against its registered schema, and hands you the exact JSON payload a headless CMS needs to publish.'
            : "Portalin gösterdiği her ders, kısaltma, sözlük kaydı ve matris satırı bir ContentRepository koleksiyonundan geçer. Bu konsol gerçekte neyin sunulduğunu listeler, her koleksiyonu kayıtlı şemasına göre doğrular ve bir headless CMS'in yayımlaması gereken JSON çıktısını verir."}
          badge={isEn ? 'Operations' : 'Operasyon'}
          color="#22d3ee"
          illustration={
            <div style={{ position: 'relative', width: '230px', height: '200px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'search-index', w: '100%', c: '#3b82f6' },
                { label: 'glossary', w: '86%', c: '#10b981' },
                { label: 'acronyms', w: '72%', c: '#a855f7' },
                { label: 'comparison-matrix', w: '58%', c: '#f59e0b' }
              ].map((row) => (
                <div
                  key={row.label}
                  style={{
                    width: row.w,
                    padding: '8px 14px',
                    borderRadius: '10px',
                    background: 'rgba(2,6,23,0.9)',
                    border: `1px solid ${row.c}`,
                    color: '#e2e8f0',
                    fontSize: '0.72rem',
                    fontFamily: 'monospace',
                    fontWeight: 700
                  }}
                >
                  {row.label}.json
                </div>
              ))}
            </div>
          }
          features={[
            {
              icon: <Database size={20} />,
              title: isEn ? 'Live collections' : 'Canlı koleksiyonlar',
              desc: isEn
                ? 'Reads through the same repository the app uses, so you see the resolved payload rather than the source modules.'
                : 'Uygulamanın kullandığı depoyu okur; kaynak modüller yerine çözümlenmiş gerçek yükü görürsünüz.'
            },
            {
              icon: <ShieldCheck size={20} />,
              title: isEn ? 'Schema validation' : 'Şema doğrulama',
              desc: isEn
                ? 'Required keys, unique identifiers and localized fields are checked per collection, with errors and warnings separated.'
                : 'Zorunlu alanlar, benzersiz kimlikler ve yerelleştirilmiş alanlar koleksiyon başına denetlenir.'
            },
            {
              icon: <FileJson size={20} />,
              title: isEn ? 'Publishable payload' : 'Yayımlanabilir yük',
              desc: isEn
                ? 'Copy the exact JSON envelope a CMS must serve at GET /collections/{name}.'
                : 'Bir CMS\'in GET /collections/{name} üzerinde sunması gereken JSON zarfını kopyalayın.'
            }
          ]}
        />

        <div className="container" style={{ marginTop: '2rem', paddingBottom: '6rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { label: isEn ? 'Collections' : 'Koleksiyon', value: totals.collections, color: '#38bdf8' },
              { label: isEn ? 'Items' : 'Kayıt', value: totals.items, color: '#a855f7' },
              { label: isEn ? 'Errors' : 'Hata', value: totals.errors, color: totals.errors > 0 ? '#ef4444' : '#10b981' },
              { label: isEn ? 'Warnings' : 'Uyarı', value: totals.warnings, color: totals.warnings > 0 ? '#f59e0b' : '#10b981' }
            ].map((stat) => (
              <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '1.6rem', fontWeight: 900, color: stat.color, lineHeight: 1 }}>{stat.value}</span>
                <span style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: '#64748b' }}>
                  {stat.label}
                </span>
              </div>
            ))}
            <div style={{ flex: 1 }} />
            <span style={{ fontSize: '0.7rem', color: '#64748b', fontFamily: 'monospace' }}>
              {isEn ? 'source' : 'kaynak'}: {cmsContentRepository.remoteEnabled ? 'remote CMS' : 'bundled seed'}
            </span>
            <button
              type="button"
              onClick={refresh}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '9px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(255,255,255,0.05)',
                color: '#cbd5e1',
                fontWeight: 700,
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={14} /> {isEn ? 'Refresh' : 'Yenile'}
            </button>
          </div>

          {state === 'error' && (
            <div className="glass-card" style={{ padding: '1.5rem', borderColor: 'rgba(239,68,68,0.35)' }}>
              <span style={{ color: '#f87171', fontWeight: 700, fontSize: '0.85rem' }}>
                {isEn ? 'No collection could be resolved.' : 'Hiçbir koleksiyon çözümlenemedi.'} {error}
              </span>
            </div>
          )}

          {state === 'loading' && (
            <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: '#64748b', fontSize: '0.85rem' }}>
              {isEn ? 'Resolving collections…' : 'Koleksiyonlar çözümleniyor…'}
            </div>
          )}

          {state === 'ready' && (
            <>
              <div className="glass-card" style={{ padding: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {CONSOLE_COLLECTIONS.map((name) => {
                  const entry = collections[name];
                  const isActive = name === selected;
                  const tone = !entry
                    ? '#475569'
                    : entry.report.errorCount > 0
                      ? '#ef4444'
                      : entry.report.warningCount > 0
                        ? '#f59e0b'
                        : '#10b981';
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setSelected(name)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '7px',
                        padding: '8px 14px',
                        borderRadius: '10px',
                        border: `1px solid ${isActive ? tone : 'rgba(255,255,255,0.08)'}`,
                        background: isActive ? `${tone}18` : 'rgba(255,255,255,0.03)',
                        color: isActive ? '#f1f5f9' : '#94a3b8',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        fontFamily: 'monospace',
                        cursor: entry ? 'pointer' : 'not-allowed'
                      }}
                    >
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: tone }} />
                      {name}
                      {entry && <span style={{ opacity: 0.6, fontWeight: 500 }}>{entry.report.itemCount}</span>}
                    </button>
                  );
                })}
              </div>

              {active && (
                <div className="glass-card" style={{ padding: '1.5rem', borderTop: `2px solid ${active.report.errorCount > 0 ? '#ef4444' : active.report.warningCount > 0 ? '#f59e0b' : '#10b981'}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: 'white', fontFamily: 'monospace' }}>
                        {active.report.name}
                      </h3>
                      <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
                        v{active.report.version} · {active.report.itemCount} {isEn ? 'items' : 'kayıt'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={copyJson}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 16px',
                        borderRadius: '9px',
                        background: copied ? '#10b981' : 'rgba(56,189,248,0.15)',
                        border: `1px solid ${copied ? '#10b981' : 'rgba(56,189,248,0.35)'}`,
                        color: copied ? '#022c22' : '#7dd3fc',
                        fontWeight: 700,
                        fontSize: '0.78rem',
                        cursor: 'pointer'
                      }}
                    >
                      {copied ? <CheckCircle2 size={14} /> : <ClipboardCopy size={14} />}
                      {copied ? (isEn ? 'Copied' : 'Kopyalandı') : isEn ? 'Copy JSON' : 'JSON kopyala'}
                    </button>
                  </div>

                  {active.report.issues.length === 0 ? (
                    <p style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0, color: '#10b981', fontSize: '0.85rem', fontWeight: 600 }}>
                      <CheckCircle2 size={16} /> {isEn ? 'Schema validation passed.' : 'Şema doğrulaması başarılı.'}
                    </p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      {active.report.issues.slice(0, 40).map((issue, index) => (
                        <div
                          key={`${issue.path}-${index}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.6rem',
                            padding: '0.45rem 0.7rem',
                            borderRadius: '8px',
                            background: issue.level === 'error' ? 'rgba(239,68,68,0.07)' : 'rgba(245,158,11,0.07)',
                            fontSize: '0.75rem'
                          }}
                        >
                          {issue.level === 'error' ? (
                            <AlertOctagon size={13} color="#ef4444" />
                          ) : (
                            <AlertTriangle size={13} color="#f59e0b" />
                          )}
                          <span style={{ color: '#94a3b8', fontFamily: 'monospace', minWidth: '190px' }}>{issue.path}</span>
                          <span style={{ color: issue.level === 'error' ? '#fca5a5' : '#fcd34d' }}>{issue.message}</span>
                        </div>
                      ))}
                      {active.report.issues.length > 40 && (
                        <span style={{ color: '#64748b', fontSize: '0.7rem' }}>
                          +{active.report.issues.length - 40} {isEn ? 'more' : 'daha fazla'}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span style={{ color: '#94a3b8', fontSize: '0.68rem', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
                    {`GET /collections/${selected}`}
                  </span>
                  <span style={{ color: '#475569', fontSize: '0.68rem' }}>
                    {(preview.length / 1024).toFixed(1)} KB
                  </span>
                </div>
                <pre
                  style={{
                    margin: 0,
                    maxHeight: '420px',
                    overflow: 'auto',
                    background: '#020617',
                    border: '1px solid #1e293b',
                    borderRadius: '12px',
                    padding: '1rem',
                    color: '#a5f3fc',
                    fontFamily: 'monospace',
                    fontSize: '0.7rem',
                    lineHeight: 1.6
                  }}
                >
                  {preview}
                </pre>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default ContentConsolePage;
