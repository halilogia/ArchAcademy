import { 
  Trash2, 
  Sparkles, 
  Clock, 
  Zap, 
  Users, 
  CheckSquare, 
  Minimize2,
  LucideIcon
} from 'lucide-react';

export interface LeanPrinciple {
  id: string;
  title: string;
  icon: LucideIcon;
  color: string;
  desc: { tr: string; en: string };
  aiAdvice: { tr: string; en: string };
}

export const LEAN_PRINCIPLES: LeanPrinciple[] = [
  {
    id: 'eliminate-waste',
    title: '1. Eliminate Waste',
    icon: Trash2,
    color: '#ef4444',
    desc: {
      tr: 'Yazılımda "değer üretmeyen" her şey israftır. Müşterinin kullanmayacağı ekstra özellikler (Gold Plating), tamamlanmamış işler, gereksiz evrak işleri ve beklemeler hemen elenmelidir.',
      en: 'Anything that does not add business value is waste (Muda). Eliminate unused gold-plated features, stalled work-in-progress, redundant bureaucracy, and idle waiting.'
    },
    aiAdvice: {
      tr: "Yazdığınız kodun %20'si işin %80'ini yapar. Geri kalan %80 'olsa iyi olur' kısmıdır. O kısmı acımadan silin.",
      en: "20% of your code delivers 80% of actual business value. Relentlessly delete the speculative 80% fluff."
    }
  },
  {
    id: 'amplify-learning',
    title: '2. Create Knowledge',
    icon: Sparkles,
    color: '#f59e0b',
    desc: {
      tr: 'Yazılım geliştirme bir üretim süreci değil, bir öğrenme sürecidir. En iyi mimari, kodu yazanların domaini en iyi öğrendiği anda ortaya çıkar. Dokümantasyon değil, çalışan kod ve testler bilgiyi taşır.',
      en: 'Software engineering is a continuous learning process. The best architectures emerge when developers deeply understand the core domain through fast iteration and automated tests.'
    },
    aiAdvice: {
      tr: "Bu prensibi uyguladığınızda kod satır sayınız azalacak ama sistemin 'Değer Yoğunluğu' (Value Density) katlanacaktır.",
      en: "Applying continuous learning shrinks codebase size while exponentially multiplying domain value density."
    }
  },
  {
    id: 'decide-late',
    title: '3. Defer Commitment',
    icon: Clock,
    color: '#3b82f6',
    desc: {
      tr: 'Mimari kararları (örn: NoSQL vs SQL) mümkün olan "son sorumlu ana" kadar erteleyin. Erken verilen kararlar varsayımlara dayanır; geç verilen kararlar ise gerçeklere.',
      en: 'Defer architectural decisions to the last responsible moment. Early decisions rely on speculative assumptions; delayed decisions rely on empirical facts.'
    },
    aiAdvice: {
      tr: "Veritabanı şemasını projenin başında değil, use-case'lerinizi tam anladığınızda tasarlayın. Erken kararlar zincirdir.",
      en: "Lock database schemas after use-cases stabilize, not before. Premature commitments are architectural chains."
    }
  },
  {
    id: 'deliver-fast',
    title: '4. Deliver Fast',
    icon: Zap,
    color: '#eab308',
    desc: {
      tr: 'Hız, belirsizliği yok eder. Müşteriye ne kadar hızlı çıktı verirseniz, o kadar hızlı geri bildirim alırsınız. Büyük "Big Bang" sürümler yerine küçük ve sık sürümler esastır.',
      en: 'Velocity eliminates uncertainty. Short feedback loops via continuous delivery maximize learning and eliminate risk.'
    },
    aiAdvice: {
      tr: "Büyük 'Big Bang' sürümler yerine küçük ve sık sürümler esastır. Hızlı geri bildirim her şeyi çözer.",
      en: "Frequent incremental releases beat massive waterfall deliveries every single time."
    }
  },
  {
    id: 'empower-team',
    title: '5. Respect People',
    icon: Users,
    color: '#a855f7',
    desc: {
      tr: 'Kararları yukarıdaki mimarlar değil, işi yapan uzmanlar vermelidir. Takıma güvenin ve onlara inisiyatif verin. Motivasyonu yüksek bir ekip, en iyi süreçten daha değerlidir.',
      en: 'Empower practitioners rather than top-down ivory-tower architects. Autonomy and trust outperform rigid hierarchies.'
    },
    aiAdvice: {
      tr: "En iyi mimari kararlar kodun içinde yaşayan mühendisler tarafından verilir.",
      en: "Autonomous teams on the ground always make sharper tactical architecture decisions."
    }
  },
  {
    id: 'build-integrity',
    title: '6. Build Integrity In',
    icon: CheckSquare,
    color: '#10b981',
    desc: {
      tr: 'Kalite sonradan test edilerek eklenemez; en baştan koda inşa edilmelidir. TDD, Refactoring ve Continuous Integration, sistemin bütünlüğünü (integrity) sağlayan temel araçlardır.',
      en: 'Quality cannot be inspected into software after the fact; it must be built-in from day one via TDD and continuous refactoring.'
    },
    aiAdvice: {
      tr: "Bütünlük (Integrity), test edilebilir kod ve sağlam mimari sınırlardan geçer.",
      en: "Architectural integrity is proven through automated suites and clear bounded contexts."
    }
  },
  {
    id: 'whole-view',
    title: '7. Optimize the Whole',
    icon: Minimize2,
    color: '#ec4899',
    desc: {
      tr: 'Sadece veritabanını hızlandırmak yetmez; tüm isteğin (request) yaşam döngüsüne bakın. Parçaları optimize etmek (sub-optimization) genellikle bütünün performansını düşürür.',
      en: 'Optimize the end-to-end customer value stream rather than isolated micro-components (sub-optimization).'
    },
    aiAdvice: {
      tr: "Tüm istek zincirini optimize edin, tek bir modüldeki mikro optimizasyonlara saplanmayın.",
      en: "Always measure end-to-end latency across the entire value stream."
    }
  }
];
