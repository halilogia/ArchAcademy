import { useProgress } from '../../context/ProgressContext';

export interface DisciplineChainItem {
  id: string;
  name: { tr: string; en: string };
  path: string;
  color: string;
  desc: { tr: string; en: string };
  icon: string;
}

export interface DisciplineChainCategory {
  id: string;
  title: { tr: string; en: string };
  color: string;
  items: DisciplineChainItem[];
}

export const DISCIPLINE_CHAIN_DATA: DisciplineChainCategory[] = [
  {
    id: 'dna',
    title: { tr: '1. Mühendislik DNA (Temel Halkalar)', en: '1. Engineering DNA (Foundational Links)' },
    color: '#f43f5e',
    items: [
      { id: 'acronyms', name: { tr: 'Kısaltmalar (Cheat Sheet)', en: 'Acronyms Cheat Sheet' }, path: '/acronyms', color: '#818cf8', icon: 'BookOpen', desc: { tr: 'KISS, DRY, WET, AHA, GRASP ve SOLID kısaltma ilkeleri.', en: 'KISS, DRY, WET, AHA, GRASP and SOLID core acronyms.' } },
      { id: 'solid', name: { tr: 'SOLID Prensipleri', en: 'SOLID Principles' }, path: '/solid', color: '#fb7185', icon: 'ShieldCheck', desc: { tr: 'Değişime direnç göstermeyen esnek nesne yönelimli mimari.', en: '5 golden rules for maintainable object-oriented software.' } },
      { id: 'oop', name: { tr: 'OOP & Rich Domain', en: 'OOP & Rich Domain' }, path: '/oop-fundamentals', color: '#f43f5e', icon: 'Box', desc: { tr: 'Kapsülleme, çok biçimlilik ve Martin Fowler zengin modelleri.', en: 'Encapsulation, polymorphism and rich domain models.' } },
      { id: 'abstraction', name: { tr: 'Soyutlama & AHA', en: 'Abstraction & AHA' }, path: '/abstraction', color: '#fda4af', icon: 'Layers', desc: { tr: 'Tam kararında soyutlama dengesi ve gereksiz karmaşıklıktan kaçınma.', en: 'Pragmatic abstraction balance avoiding premature engineering.' } }
    ]
  },
  {
    id: 'craftsmanship',
    title: { tr: '2. Yazılım Ustalığı (Gelişim Halkaları)', en: '2. Craftsmanship (Growth Links)' },
    color: '#10b981',
    items: [
      { id: 'clean-code', name: { tr: 'Clean Code', en: 'Clean Code' }, path: '/clean-code', color: '#10b981', icon: 'Code2', desc: { tr: 'Okunabilir, ifade gücü yüksek ve sürdürülebilir temiz kod.', en: 'Expressive, readable and maintainable clean code standard.' } },
      { id: 'testing', name: { tr: 'Testing & TDD Masterclass', en: 'Testing & TDD Masterclass' }, path: '/testing', color: '#059669', icon: 'Beaker', desc: { tr: 'Test piramidi, Red-Green-Refactor döngüsü ve AAA kuralı.', en: 'Test pyramid, Red-Green-Refactor and AAA testing rules.' } },
      { id: 'refactoring', name: { tr: 'Refactoring Sanatı', en: 'Art of Refactoring' }, path: '/refactoring', color: '#34d399', icon: 'Scissors', desc: { tr: 'Davranışı bozmadan iç mimariyi temizleme disiplini.', en: 'Improving internal structure without changing external behavior.' } }
    ]
  },
  {
    id: 'strategy',
    title: { tr: '3. Mimari Strateji (Ustalık Halkaları)', en: '3. Arch. Strategy (Mastery Links)' },
    color: '#3b82f6',
    items: [
      { id: 'patterns', name: { tr: 'Design Patterns', en: 'Design Patterns' }, path: '/design-patterns', color: '#3b82f6', icon: 'Zap', desc: { tr: 'Gang of Four (GoF) kanıtlanmış yapısal tasarım kalıpları.', en: 'Battle-tested Gang of Four architectural patterns.' } },
      { id: 'dependency', name: { tr: 'Bağımlılık Yönetimi', en: 'Dependency Management' }, path: '/dependency-management', color: '#60a5fa', icon: 'Network', desc: { tr: 'Bileşenler arası bağımlılık sınırları ve DIP kuralı.', en: 'Component decoupling and dependency inversion principles.' } },
      { id: 'lean', name: { tr: 'Lean & Yalın Mimari', en: 'Lean Architecture' }, path: '/lean-architecture', color: '#93c5fd', icon: 'Target', desc: { tr: 'İsraftan kaçınma ve sürekli değer üretme zihniyeti.', en: 'Eliminating waste and maximizing continuous customer value.' } }
    ]
  },
  {
    id: 'governance',
    title: { tr: '4. Yönetişim & Kalkan (Savunma Halkaları)', en: '4. Governance & Defense (Shield Links)' },
    color: '#a855f7',
    items: [
      { id: 'security', name: { tr: 'Security & Zero Trust', en: 'Security & Zero Trust' }, path: '/security', color: '#a855f7', icon: 'Lock', desc: { tr: 'OWASP Top 10 ve NIST SP 800-207 Sıfır Güven kalkanı.', en: 'OWASP Top 10 and NIST SP 800-207 Zero Trust defense-in-depth.' } },
      { id: 'docs', name: { tr: 'Docs & ADR', en: 'Docs & ADR' }, path: '/docs-annotations', color: '#c084fc', icon: 'FileText', desc: { tr: 'Mimari Karar Kayıtları (ADR) ve C4 hiyerarşik modelleme.', en: 'Architecture Decision Records (ADR) and C4 model visualization.' } },
      { id: 'robustness', name: { tr: 'Robustness & Uptime', en: 'Robustness & Uptime' }, path: '/robustness', color: '#e879f9', icon: 'Activity', desc: { tr: 'Sarsılmaz çalışma, hata toleransı ve dirençlilik.', en: 'Fault tolerance, circuit breakers and resilient uptime.' } }
    ]
  }
];

export const useDisciplineStreak = () => {
  const { progress } = useProgress();
  const completedSteps = progress.completedSteps;

  let totalLinks = 0;
  let completedCount = 0;

  DISCIPLINE_CHAIN_DATA.forEach(cat => {
    cat.items.forEach(item => {
      totalLinks++;
      if (completedSteps.includes(item.path)) {
        completedCount++;
      }
    });
  });

  const streakPercent = totalLinks > 0 ? Math.round((completedCount / totalLinks) * 100) : 0;
  const isChainMaster = completedCount === totalLinks;

  return {
    categories: DISCIPLINE_CHAIN_DATA,
    totalLinks,
    completedCount,
    streakPercent,
    isChainMaster,
    isCompleted: (path: string) => completedSteps.includes(path)
  };
};
