interface Architecture {
  title: string;
  tag: string;
  desc: string;
  color: string;
  pros: string[];
}

export type Weights = Record<string, number>;

export interface Option {
  text: string;
  weights: Weights;
  constraints?: Record<string, number>;
}

export interface Question {
  id: string;
  title: string;
  type: 'choice' | 'range';
  desc: string;
  options?: Option[];
  leftLabel?: string;
  rightLabel?: string;
  weights?: {
    low: Weights;
    high: Weights;
  };
}

export const ARCHITECTURES: Record<string, Architecture> = {
  clean: {
    title: 'Clean Architecture',
    tag: 'THE GURU',
    desc: 'Kod kalitesini her şeyin üzerinde tutan, katı disiplinli sistemlerin mimarisi. Değişim maliyetini minimize eder ama başlangıçta efor ister.',
    color: 'var(--primary)',
    pros: ['Maksimum Test Edilebilirlik', 'Database Bağımsızlığı', 'Net Sorumluluk Ayrımı']
  },
  vertical: {
    title: 'Vertical Slice',
    tag: 'THE SPRINTER',
    desc: 'AI-Native (Vibe Coding) ve modern startup\'lar için ideal. Her özelliği kendi dikey diliminde tutup diğerlerinden tamamen izole eder.',
    color: '#f97316',
    pros: ['Aşırı Hızlı Geliştirme', 'Düşük Karmaşıklık', 'AI Dostu Yapı']
  },
  eda: {
    title: 'Event-Driven Arch (EDA)',
    tag: 'THE SCALE MASTER',
    desc: 'Büyük ölçekli, asenkron ve dağıtık sistemlerin kalbi. Mikroservisler arası iletişimi ve yüksek trafiği yönetmek için en iyisi.',
    color: '#a855f7',
    pros: ['Yüksek Ölçeklenebilirlik', 'Gevşek Bağlılık (Loose Coupling)', 'Yüksek Esneklik']
  },
  monolith: {
    title: 'Pragmatic Monolith',
    tag: 'THE SWIFT',
    desc: 'Karmaşıklıktan kaçınan, her şeyi tek bir pakette toplayan sağlam bir temel. Solo ve küçük ekipler için mermi gibi hızlı sonuç verir.',
    color: '#3b82f6',
    pros: ['Kolay Debugging', 'Hızlı Deployment', 'Düşük Altyapı Maliyeti']
  },
  hexagonal: {
    title: 'Hexagonal (Ports & Adapters)',
    tag: 'THE ADAPTER',
    desc: 'Uygulamayı dış dünyadan (DB, UI, API) tamamen izole eden, test edilebilirliği zirveye taşıyan esnek bir yapı.',
    color: '#10b981',
    pros: ['Kolay Teknoloji Değişimi', 'Yüksek Test Kapsamı', 'Side-Effect İzolasyonu']
  }
};


export const WIZARD_QUESTIONS: Question[] = [
  {
    id: 'domain',
    title: 'Hangi alanda geliştirme yapıyorsun?',
    type: 'choice',
    desc: 'Projenin faaliyet alanı, performans ve güvenlik ihtiyaçlarını belirleyen en temel kriterdir.',
    options: [
      { text: 'Finans, Bankacılık, Sigorta', weights: { clean: 5, onion: 4, ddd: 3 } },
      { text: 'E-Ticaret / Yüksek Trafik', weights: { eda: 5, cqrs: 4, hexagonal: 2 } },
      { text: 'Oyun (Game Dev)', weights: { eda: 2, monolith: 3 }, constraints: { clean: -10 } },
      { text: 'Standart Web / Mobil (Startup)', weights: { vertical: 5, monolith: 3 } }
    ]
  },
  {
    id: 'flexibility',
    title: 'Esneklik (0) vs Kurallara Bağlılık (10)',
    type: 'range',
    desc: 'Kurallara bağlılık (Disiplin) hata payını düşürür ama geliştirme hızını yavaşlatabilir. Esneklik ise hız kazandırır.',
    leftLabel: 'Tam Esneklik',
    rightLabel: 'Kesin Disiplin',
    weights: {
      low: { vertical: 5, monolith: 4 },
      high: { clean: 6, onion: 5, hexagonal: 5 }
    }
  },
  {
    id: 'team',
    title: 'Ekibinin büyüklüğü ne kadar?',
    type: 'choice',
    desc: 'Ekip büyüdükçe, kodun bölümleri arasındaki sınırların (Isolation) daha net olması gerekir.',
    options: [
      { text: 'Yalnız Kurt (Solo Dev)', weights: { monolith: 5, vertical: 3 } },
      { text: 'Küçük Çete (2-8 Kişi)', weights: { vertical: 5, clean: 1 } },
      { text: 'Büyük Ordu (10+ Kişi / Çoklu Ekip)', weights: { clean: 3, hexagonal: 3, eda: 5 } }
    ]
  },
  {
    id: 'horizon',
    title: 'Proje Ömrü: MVP (0) vs 10+ Yıl (10)',
    type: 'range',
    desc: 'Hızlıca piyasaya sürülecek bir MVP mi yapıyorsunuz (0), yoksa yıllarca bakımı yapılacak dev bir sistem mi (10)?',
    leftLabel: 'Hızlı/Kullan-At',
    rightLabel: 'Ömürlük Sistem',
    weights: {
      low: { monolith: 5, vertical: 3 },
      high: { clean: 7, onion: 4 }
    }
  },
  {
    id: 'dependency',
    title: 'Bağımlılık Akışı (Dependency Flow) nasıl olmalı?',
    type: 'choice',
    desc: 'Bağımlılık Akışı, kodun bir bölümünü değiştirdiğinizde diğer bölümlerin bundan ne kadar etkilendiğini yönetir.',
    options: [
      { text: 'İş mantığı veritabanından tamamen bağımsız olmalı', weights: { clean: 5, hexagonal: 5, onion: 5 } },
      { text: 'Hız için direkt DB modelleriyle konuşabilirim', weights: { monolith: 5, vertical: 4 } }
    ]
  },
  {
    id: 'consistency',
    title: 'Veri Tutarlılığı (Consistency) önceliğin nedir?',
    type: 'choice',
    desc: 'Verilerin tüm sistemlerde aynı anda güncel olması mı, yoksa sistemin hızı için gecikmeli güncelleme mi?',
    options: [
      { text: 'Veri saniyesinde %100 güncel olmalı (ACID)', weights: { clean: 4, monolith: 4, onion: 4 } },
      { text: 'Asenkron / Eventual Consistency yeterli', weights: { eda: 5, cqrs: 4 } }
    ]
  },
  {
    id: 'boilerplate',
    title: 'Setup / Boilerplate toleransınız nedir?',
    type: 'choice',
    desc: 'Boilerplate, bir işe başlamadan önce yazmanız gereken "zorunlu kalıp" kodlardır. Clean Arch gibi yapılar çok fazla kalıp kod ister.',
    options: [
      { text: 'Disiplin iyidir, 5 dosyaya yazmaya razıyım', weights: { clean: 5, hexagonal: 4, onion: 4 } },
      { text: 'Vaktim yok, bir dosyada işimi bitirmeliyim', weights: { vertical: 5, monolith: 4 }, constraints: { clean: -15 } }
    ]
  },
  {
    id: 'ai',
    title: 'AI / Vibe Coding ile aran nasıl?',
    type: 'choice',
    desc: 'Vibe Coding, AI yardımuyla sadece "ne istediğinizi" söyleyerek hızlıca kod üretmektir. Bazı mimariler AI\'nın daha az hata yapmasını sağlar.',
    options: [
      { text: 'Geleceği AI ile kuruyorum (High AI Usage)', weights: { vertical: 5, clean: -2 } },
      { text: 'Ara sıra yardım alırım (Casual AI)', weights: { clean: 2, vertical: 2 } },
      { text: 'Gelenekselciyim, AI sevmem (Manual Coding)', weights: { clean: 5, hexagonal: 4 } }
    ]
  },
  {
    id: 'priority',
    title: 'Şu anki stratejik önceliğin hangisi?',
    type: 'choice',
    desc: 'Şu an projeniz için en kritik olan başarı kriteri nedir?',
    options: [
      { text: 'Yıldırım hızında teslimat (TTM)', weights: { vertical: 5, monolith: 4 }, constraints: { clean: -10 } },
      { text: 'Yıllarca sürecek bakım (Maintenance)', weights: { clean: 5, onion: 5, hexagonal: 5 } },
      { text: 'Gereksiz karmaşıklıktan kaçınma (KISS)', weights: { monolith: 5, vertical: 3 } }
    ]
  }
];
