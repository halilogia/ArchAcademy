import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Activity, Gauge, RefreshCw, TriangleAlert } from 'lucide-react';
import SEO from '../components/SEO';
import ArchHero from '../components/ArchHero';
import beacon, {
  RuntimeSummary,
  startPerformanceBeacon,
  summarizeRuntime
} from '../../infrastructure/performance/performanceBeacon';
import { describeBeaconSupport } from '../../infrastructure/performance/beaconSupport';

const HERO_ROWS = [
  { label: 'LCP-ish', w: '92%', c: '#10b981' },
  { label: 'long tasks', w: '74%', c: '#f59e0b' },
  { label: 'route cost', w: '58%', c: '#38bdf8' },
  { label: 'heap', w: '40%', c: '#a855f7' }
];

const startedAt = Date.now();

const formatMs = (value: number | null, isEn: boolean): string =>
  value === null ? (isEn ? 'not recorded' : 'kaydedilmedi') : `${value} ms`;

const Metric: React.FC<{ label: string; value: string; tone?: 'good' | 'warn' | 'bad' }> = ({
  label,
  value,
  tone = 'good'
}) => (
  <div
    style={{
      padding: '0.9rem 1rem',
      borderRadius: '14px',
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.07)'
    }}
  >
    <div
      style={{
        fontSize: '1.35rem',
        fontWeight: 900,
        lineHeight: 1.1,
        color: tone === 'good' ? '#34d399' : tone === 'warn' ? '#fbbf24' : '#f87171'
      }}
    >
      {value}
    </div>
    <div
      style={{
        fontSize: '0.62rem',
        fontWeight: 800,
        letterSpacing: '0.8px',
        textTransform: 'uppercase',
        color: '#64748b',
        marginTop: '5px'
      }}
    >
      {label}
    </div>
  </div>
);

const DiagnosticsPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const [uptimeSeconds, setUptimeSeconds] = useState(0);
  const [summary, setSummary] = useState<RuntimeSummary | null>(() => summarizeRuntime(beacon.snapshot()));
  const [support] = useState(() => describeBeaconSupport());

  useEffect(() => {
    startPerformanceBeacon();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setUptimeSeconds(Math.round((Date.now() - startedAt) / 1000)), 1000);
    return () => clearInterval(timer);
  }, []);

  const refresh = () => setSummary(summarizeRuntime(beacon.snapshot()));

  const longTaskTone = (value: number | null) => (value === null ? 'good' : value > 200 ? 'bad' : value > 100 ? 'warn' : 'good');
  const transitionTone = (value: number | null) => (value === null ? 'good' : value > 500 ? 'bad' : value > 200 ? 'warn' : 'good');

  return (
    <>
      <SEO
        title={isEn ? 'Runtime Diagnostics | ArchAcademy' : 'Çalışma Zamanı Tanılaması | ArchAcademy'}
        description={isEn
          ? 'Measure what the bundle numbers cannot show: long tasks, route transition cost, navigation timing and heap use, measured in the browser while you use the portal.'
          : 'Bundle sayılarının gösteremediklerini ölçün: uzun görevler, route geçiş maliyeti, navigasyon zamanlaması ve heap kullanımı, portalı kullanırken tarayıcıda ölçülür.'}
        keywords="web vitals, long tasks, runtime performance, route transitions, diagnostics"
        canonicalUrl="/diagnostics"
      />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
        <ArchHero
          title="Runtime"
          subtitle={isEn ? 'Diagnostics' : 'Tanılama'}
          description={isEn
            ? 'Bundle size is only half the story. A route can ship a small chunk and still block the main thread for a third of a second. This page records long tasks, route transition cost, navigation timing and heap use in your own browser, so performance claims come from measurement rather than from a build log.'
            : 'Bundle boyutu hikâyenin yarısı. Küçük bir chunk gönderen bir route yine de ana iş parçacığını üçte bir saniye bloke edebilir. Bu sayfa uzun görevleri, route geçiş maliyetini, navigasyon zamanlamasını ve heap kullanımını kendi tarayıcınızda kaydeder; böylece performans iddiaları build logundan değil ölçümden gelir.'}
          badge={isEn ? 'Measured, not guessed' : 'Tahmin değil, ölçüm'}
          color="#10b981"
          illustration={
            <div style={{ position: 'relative', width: '220px', height: '190px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {HERO_ROWS.map((row) => (
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
                  {row.label}
                </div>
              ))}
            </div>
          }
          features={[
            {
              icon: <Activity size={20} />,
              title: isEn ? 'Long tasks' : 'Uzun görevler',
              desc: isEn
                ? 'Anything over 50ms that blocked the main thread, with the worst offender highlighted.'
                : 'Ana iş parçacığını 50ms üzerinde bloke eden her şey, en kötüsü vurgulanarak.'
            },
            {
              icon: <Gauge size={20} />,
              title: isEn ? 'Route transitions' : 'Route geçişleri',
              desc: isEn
                ? 'How long each lazily loaded route took to become interactive, at p50 and p95.'
                : "Her tembel yüklenen route'un etkileşime hazır olma süresi, p50 ve p95."
            },
            {
              icon: <TriangleAlert size={20} />,
              title: isEn ? 'Honest about limits' : 'Sınırları dürüstçe söyler',
              desc: isEn
                ? 'A capability the browser does not expose is reported as not recorded, never as a good number.'
                : 'Tarayıcının sunmadığı bir yetenek "kaydedilmedi" olarak raporlanır, iyi bir sayı olarak değil.'
            }
          ]}
        />

        <div className="container" style={{ marginTop: '2rem', paddingBottom: '6rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Activity size={16} color="#10b981" />
              <span style={{ color: 'white', fontSize: '0.95rem', fontWeight: 800 }}>
                {isEn ? 'This browser, this session' : 'Bu tarayıcı, bu oturum'}
              </span>
            </div>
            <button
              type="button"
              onClick={refresh}
              style={{
                display: 'inline-flex',
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
              <RefreshCw size={14} /> {isEn ? 'Re-measure' : 'Yeniden ölç'}
            </button>
          </div>

          {!summary ? (
            <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
              {isEn ? 'Collecting…' : 'Toplanıyor…'}
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1rem' }}>
                <Metric label={isEn ? 'Long tasks' : 'Uzun görev'} value={String(summary.longTaskCount)} tone={summary.longTaskCount > 0 && summary.longTaskP95Ms !== null && summary.longTaskP95Ms > 200 ? 'bad' : 'good'} />
                <Metric label={isEn ? 'Worst long task' : 'En kötü görev'} value={formatMs(summary.worstLongTaskMs, isEn)} tone={longTaskTone(summary.worstLongTaskMs)} />
                <Metric label={isEn ? 'Route p50' : 'Route p50'} value={formatMs(summary.transitionP50Ms, isEn)} tone={transitionTone(summary.transitionP50Ms)} />
                <Metric label={isEn ? 'Route p95' : 'Route p95'} value={formatMs(summary.transitionP95Ms, isEn)} tone={transitionTone(summary.transitionP95Ms)} />
                <Metric label={isEn ? 'Routes seen' : 'Görülen route'} value={String(summary.transitionCount)} />
                <Metric label={isEn ? 'Resources' : 'Kaynak'} value={String(summary.resourceCount)} />
                <Metric
                  label="DOMContentLoaded"
                  value={formatMs(summary.navigation?.domContentLoadedMs ?? null, isEn)}
                  tone={(summary.navigation?.domContentLoadedMs ?? 0) > 2000 ? 'warn' : 'good'}
                />
                <Metric label={isEn ? 'JS heap' : 'JS heap'} value={summary.memoryUsedJsHeapMb === null ? (isEn ? 'not exposed' : 'sunulmuyor') : `${summary.memoryUsedJsHeapMb} MB`} />
              </div>

              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ margin: '0 0 0.75rem', fontSize: '1rem', fontWeight: 800, color: 'white' }}>
                  {isEn ? 'Browser support' : 'Tarayıcı desteği'}
                </h3>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                  {[
                    { label: 'LongTaskObserver', ok: support.longTaskObserver },
                    { label: 'NavigationTiming', ok: support.navigationTiming },
                    { label: 'JSHeapSize', ok: support.memory }
                  ].map((entry) => (
                    <span key={entry.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: entry.ok ? '#6ee7b7' : '#fcd34d' }}>
                      {entry.ok ? '●' : '○'} {entry.label}
                    </span>
                  ))}
                </div>
                <p style={{ margin: '0.9rem 0 0', color: '#64748b', fontSize: '0.75rem', lineHeight: 1.6 }}>
                  {isEn
                    ? `Metrics are sampled live in this browser and are not uploaded. Session uptime: ${uptimeSeconds}s. Navigate between a few routes, then re-measure to see transition cost change.`
                    : `Metrikler bu tarayıcıda canlı örneklenir ve yüklenmez. Oturum süresi: ${uptimeSeconds}s. Birkaç route arasında gezinip yeniden ölçerek geçiş maliyetinin değiştiğini görün.`}
                </p>
              </div>

              {summary.transitionCount > 0 && (
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                  <h3 style={{ margin: '0 0 0.75rem', fontSize: '1rem', fontWeight: 800, color: 'white' }}>
                    {isEn ? 'Route transitions' : 'Route geçişleri'}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {summary.navigation && (
                      <span style={{ fontSize: '0.72rem', color: '#64748b', fontFamily: 'monospace' }}>
                        load event: {summary.navigation.loadEventMs ?? 'not recorded'} ms · transferred: {summary.navigation.transferSizeBytes} B
                      </span>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default DiagnosticsPage;
