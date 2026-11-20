import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Boxes, GitBranch, Layers3, Network, Waypoints } from 'lucide-react';
import SEO from '../components/SEO';
import { FanOutScene } from '../components/diagrams/templates/FanOutScene';
import { SequenceScene } from '../components/diagrams/templates/SequenceScene';
import { LayerStackScene } from '../components/diagrams/templates/LayerStackScene';
import { PipelineScene } from '../components/diagrams/templates/PipelineScene';
import { StateMachineScene } from '../components/diagrams/templates/StateMachineScene';

type LabTab = 'fanout' | 'sequence' | 'layers' | 'pipeline' | 'states';

const TABS: { id: LabTab; icon: React.ReactNode; en: string; tr: string }[] = [
  { id: 'fanout', icon: <Network size={16} />, en: 'Fan-out topology', tr: 'Yelpaze topoloji' },
  { id: 'sequence', icon: <GitBranch size={16} />, en: 'Sequence', tr: 'Sıra diyagramı' },
  { id: 'layers', icon: <Layers3 size={16} />, en: 'Layer stack', tr: 'Katman yığını' },
  { id: 'pipeline', icon: <Waypoints size={16} />, en: 'Pipeline', tr: 'Borç hattı' },
  { id: 'states', icon: <Boxes size={16} />, en: 'State machine', tr: 'Durum makinesi' },
];

/**
 * Development gallery for the animated diagram system. Every article scene is
 * an instance of one of these five templates.
 */
const DiagramLabPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const locale = isEn ? 'en' : 'tr';
  const [tab, setTab] = useState<LabTab>('fanout');

  return (
    <>
      <SEO
        title={isEn ? 'Diagram Lab | ArchAcademy' : 'Diyagram Laboratuvarı | ArchAcademy'}
        description={
          isEn
            ? 'Five reusable animated scene templates for architecture lessons.'
            : 'Mimari dersleri için beş yeniden kullanılabilir animasyonlu sahne şablonu.'
        }
        keywords="architecture diagrams, animated diagrams, scene templates, archacademy"
        canonicalUrl="/diagram-lab"
      />

      <div className="container" style={{ padding: '3rem 0 6rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div
            style={{
              fontSize: '0.75rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontWeight: 800,
              color: 'var(--text-secondary)',
              marginBottom: 8,
            }}
          >
            {isEn ? 'Diagram system' : 'Diyagram sistemi'}
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 900, margin: 0, color: 'var(--text-primary)' }}>
            {isEn ? 'Template gallery' : 'Şablon galerisi'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 720, marginTop: 10, lineHeight: 1.6 }}>
            {isEn
              ? 'One scene contract, one player, five archetypes. Pick the shape that matches the lesson, pass data, and the animation is free.'
              : 'Tek sahne sözleşmesi, tek oynatıcı, beş arketip. Derse uyan şekli seç, veriyi geç; animasyon hazır.'}
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: '1.5rem' }}>
          {TABS.map((item) => {
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '9px 16px',
                  borderRadius: 10,
                  border: `1px solid ${active ? 'rgba(59, 130, 246, 0.55)' : 'rgba(255,255,255,0.1)'}`,
                  background: active ? 'rgba(59, 130, 246, 0.16)' : 'transparent',
                  color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer',
                }}
              >
                {item.icon}
                {isEn ? item.en : item.tr}
              </button>
            );
          })}
        </div>

        {tab === 'fanout' && (
          <FanOutScene
            locale={locale}
            title={isEn ? 'Load balancing' : 'Yük dengeleme'}
            subtitle={
              isEn
                ? 'One front door, three servers, one failure.'
                : 'Tek giriş kapısı, üç sunucu, bir arıza.'
            }
            hub={{ label: 'Load Balancer', sublabel: 'L7 · health checks' }}
            workers={[
              { id: 'server-a', label: 'Server A', sublabel: '10.0.0.11' },
              { id: 'server-b', label: 'Server B', sublabel: '10.0.0.12' },
              { id: 'server-c', label: 'Server C', sublabel: '10.0.0.13' },
            ]}
            client={{ label: 'Clients', count: '200,000 users', sublabel: 'HTTP traffic' }}
            strategyLabel="round robin"
          />
        )}

        {tab === 'sequence' && (
          <SequenceScene
            locale={locale}
            title={isEn ? 'Bank transfer under ACID' : 'ACID altında banka transferi'}
            subtitle={isEn ? 'Every arrow is one durable message.' : 'Her ok kalıcı bir mesajdır.'}
            participants={[
              { id: 'client', label: 'Client', icon: 'globe', tone: 'green' },
              { id: 'api', label: 'Transfer API', icon: 'server', tone: 'blue' },
              { id: 'db', label: 'Accounts DB', icon: 'database', tone: 'amber' },
              { id: 'wal', label: 'Write-ahead log', icon: 'file', tone: 'violet' },
            ]}
            intro={{
              title: isEn ? 'Request lifecycle' : 'İstek yaşam döngüsü',
              body: isEn
                ? 'Time flows downwards. Nothing is committed until the log entry is durable.'
                : 'Zaman aşağı akar. Log kaydı diske inmeden hiçbir şey commit edilmez.',
              tag: isEn ? 'Overview' : 'Genel bakış',
            }}
            messages={[
              {
                from: 'client',
                to: 'api',
                label: 'POST /transfer',
                note: isEn ? 'The client sends intent, never balances.' : 'İstemci niyet gönderir, bakiye değil.',
              },
              { from: 'api', to: 'db', label: 'BEGIN' },
              {
                from: 'db',
                to: 'wal',
                label: 'append debit',
                tone: 'violet',
                note: isEn ? 'Debit is written to the log before the page changes.' : 'Borç satırı değişmeden önce loga yazılır.',
              },
              { from: 'db', to: 'wal', label: 'append credit', tone: 'violet' },
              {
                from: 'api',
                to: 'client',
                label: '201 Created',
                tone: 'green',
                dashed: true,
                note: isEn ? 'Only after fsync does the API report success.' : 'Ancak fsync tamamlanınca API başarı döner.',
              },
            ]}
            metrics={[
              { id: 'tx', label: 'Isolation', value: 'SERIALIZABLE', tone: 'blue' },
              { id: 'loss', label: 'Data loss', value: '0', tone: 'green' },
            ]}
          />
        )}

        {tab === 'layers' && (
          <LayerStackScene
            locale={locale}
            title={isEn ? 'Clean architecture layers' : 'Clean architecture katmanları'}
            subtitle={isEn ? 'Dependencies point inwards, always.' : 'Bağımlılıklar her zaman içe bakar.'}
            layers={[
              { id: 'ui', label: 'UI / Delivery', sublabel: 'React, controllers, presenters', tone: 'blue', icon: 'globe' },
              { id: 'app', label: 'Application use cases', sublabel: 'Orchestration, transactions', tone: 'green', icon: 'zap' },
              { id: 'domain', label: 'Domain entities', sublabel: 'Invariants, no framework', tone: 'amber', icon: 'box' },
              { id: 'ports', label: 'Ports', sublabel: 'Interfaces owned by the core', tone: 'violet', icon: 'lock' },
              { id: 'infra', label: 'Infrastructure', sublabel: 'DB, HTTP, queues', tone: 'slate', icon: 'database' },
            ]}
            steps={[
              {
                title: isEn ? 'The centre owns the rules' : 'Merkez kuralları sahiplenir',
                body: isEn
                  ? 'Entities know nothing about React, SQL or HTTP. They only enforce invariants.'
                  : 'Entity katmanı React, SQL veya HTTP bilmez. Yalnızca değişmezleri korur.',
                tag: isEn ? 'Core' : 'Çekirdek',
                activeLayer: 'domain',
              },
              {
                title: isEn ? 'Use cases orchestrate' : 'Use case katmanı düzenler',
                body: isEn
                  ? 'A use case loads entities, applies one business intention and saves the result.'
                  : 'Bir use case entityleri yükler, tek bir iş niyetini uygular ve sonucu kaydeder.',
                tag: isEn ? 'Application' : 'Uygulama',
                activeLayer: 'app',
              },
              {
                title: isEn ? 'Adapters are replaceable' : 'Adaptörler değiştirilebilir',
                body: isEn
                  ? 'The database adapter implements a port. Swapping Postgres for an in-memory store touches no business rule.'
                  : 'Veritabanı adaptörü bir portu uygular. Postgres yerine bellek içi store koymak iş kuralına dokunmaz.',
                tag: isEn ? 'Boundary' : 'Sınır',
                activeLayer: 'infra',
              },
              {
                title: isEn ? 'The arrow never reverses' : 'Ok asla ters dönmez',
                body: isEn
                  ? 'If the domain imports the UI, the architecture is already broken.'
                  : 'Domain UI’ı import ediyorsa mimari çoktan bozulmuştur.',
                tag: isEn ? 'Rule' : 'Kural',
                activeLayer: 'ui',
              },
            ]}
          />
        )}

        {tab === 'pipeline' && (
          <PipelineScene
            locale={locale}
            title={isEn ? 'Event sourcing write path' : 'Event sourcing yazma yolu'}
            subtitle={isEn ? 'Append, project, read. No update in place.' : 'Ekle, yansıt, oku. Yerinde güncelleme yok.'}
            stages={[
              { id: 'cmd', label: 'Command', icon: 'zap', tone: 'blue' },
              { id: 'validate', label: 'Validate', icon: 'shield', tone: 'amber' },
              { id: 'store', label: 'Event store', icon: 'database', tone: 'violet' },
              { id: 'project', label: 'Projector', icon: 'cpu', tone: 'green' },
              { id: 'read', label: 'Read model', icon: 'layers', tone: 'slate' },
            ]}
            steps={[
              {
                title: isEn ? 'Accept the command' : 'Komutu kabul et',
                body: isEn ? 'A command expresses intent. It can be rejected.' : 'Komut bir niyet taşır. Reddedilebilir.',
                activeStage: 0,
                tag: isEn ? 'Write' : 'Yazma',
              },
              {
                title: isEn ? 'Validate invariants' : 'Değişmezleri doğrula',
                body: isEn ? 'The aggregate checks current state before emitting anything.' : 'Aggregate bir şey yaymadan önce mevcut durumu kontrol eder.',
                activeStage: 1,
              },
              {
                title: isEn ? 'Append, never update' : 'Ekle, asla güncelleme',
                body: isEn ? 'The event is immutable. The log is the source of truth.' : 'Olay değiştirilemez. Log tek gerçek kaynaktır.',
                activeStage: 2,
              },
              {
                title: isEn ? 'Project asynchronously' : 'Asenkron yansıt',
                body: isEn ? 'Projectors can lag, replay and rebuild without touching the log.' : 'Yansıtıcılar geride kalabilir, replay edebilir; loga dokunmaz.',
                activeStage: 3,
              },
              {
                title: isEn ? 'Read from a projection' : 'Projeksiyondan oku',
                body: isEn ? 'Queries hit a denormalised read model, not the event store.' : 'Sorgular event store’a değil, denormalize okuma modeline gider.',
                activeStage: 4,
              },
            ]}
            branch={{ from: 'validate', to: 'cmd', label: isEn ? 'reject' : 'reddet', tone: 'red' }}
            metrics={[
              { id: 'append', label: 'Append latency', value: '6 ms', tone: 'green' },
              { id: 'lag', label: 'Projection lag', value: '120 ms', tone: 'amber' },
            ]}
          />
        )}

        {tab === 'states' && (
          <StateMachineScene
            locale={locale}
            title={isEn ? 'Connection lifecycle' : 'Bağlantı yaşam döngüsü'}
            subtitle={isEn ? 'Every state has an exit. Every exit has a timeout.' : 'Her durumun bir çıkışı, her çıkışın bir zaman aşımı vardır.'}
            states={[
              { id: 'idle', label: 'Idle', icon: 'zap', tone: 'slate' },
              { id: 'connecting', label: 'Connecting', icon: 'router', tone: 'blue' },
              { id: 'open', label: 'Open', icon: 'network', tone: 'green' },
              { id: 'draining', label: 'Draining', icon: 'layers', tone: 'amber' },
              { id: 'closed', label: 'Closed', icon: 'lock', tone: 'red' },
            ]}
            transitions={[
              { from: 'idle', to: 'connecting', label: 'connect', tone: 'blue' },
              { from: 'connecting', to: 'open', label: 'handshake', tone: 'green' },
              { from: 'connecting', to: 'closed', label: 'timeout', tone: 'red', dashed: true },
              { from: 'open', to: 'draining', label: 'shutdown', tone: 'amber' },
              { from: 'draining', to: 'closed', label: 'flush', tone: 'red' },
              { from: 'closed', to: 'idle', label: 'reset', tone: 'slate' },
            ]}
            steps={[
              {
                title: isEn ? 'Connect' : 'Bağlan',
                body: isEn ? 'The client opens a socket and waits for a handshake.' : 'İstemci soket açar ve el sıkışmayı bekler.',
                activeState: 'idle',
                nextState: 'connecting',
                tag: isEn ? 'Start' : 'Başlangıç',
              },
              {
                title: isEn ? 'Handshake succeeds' : 'El sıkışma başarılı',
                body: isEn ? 'Only now is the connection usable for traffic.' : 'Ancak şimdi bağlantı trafiğe açıktır.',
                activeState: 'connecting',
                nextState: 'open',
              },
              {
                title: isEn ? 'Drain before close' : 'Kapatmadan önce boşalt',
                body: isEn ? 'Stop accepting new work, finish in-flight requests.' : 'Yeni iş kabul etmeyi bırak, uçuştaki istekleri bitir.',
                activeState: 'open',
                nextState: 'draining',
              },
              {
                title: isEn ? 'Flush and close' : 'Boşalt ve kapat',
                body: isEn ? 'Buffers are flushed. A close without draining loses work.' : 'Tamponlar boşaltılır. Boşaltmadan kapatmak iş kaybettirir.',
                activeState: 'draining',
                nextState: 'closed',
              },
            ]}
          />
        )}
      </div>
    </>
  );
};

export default DiagramLabPage;
