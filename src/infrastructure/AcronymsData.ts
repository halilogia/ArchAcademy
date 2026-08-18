export interface AcronymItem {
  id: string;
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  category: 'core' | 'solid' | 'grasp' | 'function' | 'data' | 'testing' | 'antipattern';
  badgeColor: string;
  details?: string[];
  example?: string;
  relatedPath?: string;
}

export interface AcronymCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  desc: string;
}

export const ACRONYM_CATEGORIES: AcronymCategory[] = [
  { id: 'all', title: 'Tümü', icon: 'Sparkles', color: '#6366f1', desc: 'Tüm mühendislik kısaltmaları ve prensipleri' },
  { id: 'core', title: 'Temel Kodlama & Bellek', icon: 'Cpu', color: '#f59e0b', desc: 'KISS, DRY, WET, AHA, YAGNI, RAII vb.' },
  { id: 'solid', title: 'SOLID Prensipleri', icon: 'Layers', color: '#3b82f6', desc: 'SRP, OCP, LSP, ISP, DIP' },
  { id: 'grasp', title: 'GRASP Sorumluluk Kuralları', icon: 'ShieldCheck', color: '#10b981', desc: 'High Cohesion, Low Coupling, Creator vb.' },
  { id: 'function', title: 'Fonksiyon & Nesne Kuralları', icon: 'Code2', color: '#a855f7', desc: 'SoC, POLA, CQS, SLAP, LoD, TDA' },
  { id: 'data', title: 'Veri & Veritabanı', icon: 'Database', color: '#ec4899', desc: 'ACID, BASE, CAP, CQRS' },
  { id: 'testing', title: 'Test & Kod Kalitesi', icon: 'CheckCircle2', color: '#06b6d4', desc: 'CUPID, FIRST, AAA, Right-BICEP, CORRECT' },
  { id: 'antipattern', title: 'Anti-Patternler', icon: 'AlertTriangle', color: '#ef4444', desc: 'STUPID ve kaçınılması gereken kötü kodlar' }
];

export const ACRONYMS_DATA: AcronymItem[] = [
  // 1. Core Coding Principles
  {
    id: 'kiss',
    name: 'KISS',
    fullName: 'Keep It Simple, Stupid',
    tagline: 'Basit Tut, Aptal / Olabildiğince Sade Tut',
    description: 'Kodu her zaman olabildiğince basit ve anlaşılır tut. Gereksiz karmaşıklıktan ve aşırı mühendislikten (over-engineering) kaçın.',
    category: 'core',
    badgeColor: '#f59e0b',
    details: [
      'Gereksiz katmanlar ve premature soyutlamalar yerine doğrudan çalışan en yalın kodu tercih et.',
      'Bir kodu okuyan junior bir geliştirici bile ana mantığı ilk bakışta anlayabilmelidir.'
    ],
    example: '// KÖTÜ: 3 satırlık iş için Factory + Adapter yazmak\n// İYİ: Doğrudan saf ve anlaşılır bir fonksiyon yazmak'
  },
  {
    id: 'dry',
    name: 'DRY',
    fullName: "Don't Repeat Yourself",
    tagline: 'Kendini Tekrar Etme',
    description: 'Aynı mantığı veya bilgiyi kod tabanında yalnızca tek bir yerde, benzersiz ve kesin olarak ifade et.',
    category: 'core',
    badgeColor: '#f59e0b',
    details: [
      'Bir iş kuralı değiştiğinde sadece tek bir yerin güncellenmesini garanti eder.',
      'Aşırı katı uygulanırsa erken soyutlama tuzağına (Hasty Abstraction) düşülebilir.'
    ]
  },
  {
    id: 'oaoo',
    name: 'OAOO',
    fullName: 'Once and Only Once',
    tagline: 'Bir Kez ve Yalnızca Bir Kez',
    description: 'DRY prensibinin en temel kuralıdır. Bir kural, veri yapısı veya algoritma kod içinde bir kez ve yalnızca bir kez yazılmalıdır.',
    category: 'core',
    badgeColor: '#f59e0b'
  },
  {
    id: 'aha',
    name: 'AHA',
    fullName: 'Avoid Hasty Abstraction',
    tagline: 'Acele Soyutlamadan Kaçın',
    description: "DRY prensibinin panzehiridir. Kodun ne yapacağı tamamen netleşmeden ortak fonksiyona bağlamak esnekliği öldürür. İhtiyaç netleşene kadar biraz kod tekrarı (WET) kabul edilebilirdir.",
    category: 'core',
    badgeColor: '#f59e0b',
    details: [
      'Yanlış bir soyutlama, kod tekrarından kat kat daha pahalıya mal olur.',
      'Ortak patern en az 3 farklı yerde somutlaşana kadar soyutlama yapma.'
    ]
  },
  {
    id: 'wet',
    name: 'WET',
    fullName: 'Write Everything Twice / We Enjoy Typing',
    tagline: 'Her Şeyi İki Kez Yaz',
    description: "DRY'ın istisnasıdır. Kodun ne yapacağı tamamen netleşene kadar aynı kodu iki kez yazmak kabul edilebilir; ancak 3. kez tekrar ettiğinde refactor edilir (Rule of Three).",
    category: 'core',
    badgeColor: '#f59e0b'
  },
  {
    id: 'yagni',
    name: 'YAGNI',
    fullName: "You Ain't Gonna Need It",
    tagline: 'Buna İhtiyacın Olmayacak',
    description: '"Gelecekte lazım olur" düşüncesiyle bugünden kullanılmayan kod, parametre veya özellik ekleme. Yalnızca gerçekten ihtiyaç duyduğun an yaz.',
    category: 'core',
    badgeColor: '#f59e0b'
  },
  {
    id: 'bduf',
    name: 'BDUF',
    fullName: 'Big Design Up Front',
    tagline: 'Baştan Kapsamlı Tasarım',
    description: 'Kod yazmaya başlamadan önce, projenin mimarisini ve detaylarını baştan kapsamlı bir şekilde planlama yaklaşımıdır. Şehir planlaması gibi, temeli ve kritik mimariyi en baştan doğru kurarak sonradan çıkacak büyük maliyetli hataları engellemeyi hedefler.',
    category: 'core',
    badgeColor: '#f59e0b'
  },
  {
    id: 'raii',
    name: 'RAII',
    fullName: 'Resource Acquisition Is Initialization',
    tagline: 'Kaynak Edinimi Başlatmadır',
    description: 'Bellek, dosya veya veritabanı bağlantısı gibi kaynakların yaşam döngüsünü nesnenin yaşam döngüsüne (kurucu/yıkıcı metotlara) bağlama ilkesidir. Nesne kapsama alanından (scope) çıktığında kaynak otomatik serbest bırakılır (C++, Rust, C# using, Java try-with-resources).',
    category: 'core',
    badgeColor: '#f59e0b'
  },

  // 2. SOLID
  {
    id: 'srp',
    name: 'SRP (S)',
    fullName: 'Single Responsibility Principle',
    tagline: 'Tek Sorumluluk Prensibi',
    description: 'Bir sınıfın veya modülün değiştirmek için yalnızca tek bir nedeni (tek bir aktör/sorumluluğu) olmalıdır.',
    category: 'solid',
    badgeColor: '#3b82f6',
    relatedPath: '/solid'
  },
  {
    id: 'ocp',
    name: 'OCP (O)',
    fullName: 'Open/Closed Principle',
    tagline: 'Açık / Kapalı Prensibi',
    description: 'Yazılım varlıkları (sınıflar, modüller) gelişime açık, ancak var olan kaynak kodun değişimine kapalı olmalıdır. Yeni özellikler miras veya arayüzler ile eklenmelidir.',
    category: 'solid',
    badgeColor: '#3b82f6',
    relatedPath: '/solid'
  },
  {
    id: 'lsp',
    name: 'LSP (L)',
    fullName: 'Liskov Substitution Principle',
    tagline: 'Liskov Yerine Geçme Prensibi',
    description: 'Alt sınıflar, türedikleri üst sınıfların yerine nesne davranışı ve beklentileri bozulmadan kullanılabilmelidir.',
    category: 'solid',
    badgeColor: '#3b82f6',
    relatedPath: '/solid'
  },
  {
    id: 'isp',
    name: 'ISP (I)',
    fullName: 'Interface Segregation Principle',
    tagline: 'Arayüz Ayrımı Prensibi',
    description: 'İstemcilere kullanmadıkları metotları barındıran devasa şişkin arayüzler zorla dayatılmamalı; amaca özel küçük arayüzler oluşturulmalıdır.',
    category: 'solid',
    badgeColor: '#3b82f6',
    relatedPath: '/solid'
  },
  {
    id: 'dip',
    name: 'DIP (D)',
    fullName: 'Dependency Inversion Principle',
    tagline: 'Bağımlılıkların Tersine Çevrilmesi',
    description: 'Üst seviye iş modülleri alt seviye altyapı sınıflarına doğrudan bağımlı olmamalı; her ikisi de soyutlamalara (interface/abstract) bağımlı olmalıdır.',
    category: 'solid',
    badgeColor: '#3b82f6',
    relatedPath: '/solid'
  },

  // 3. GRASP
  {
    id: 'info-expert',
    name: 'Information Expert',
    fullName: 'Bilgi Uzmanı',
    tagline: 'İş, Verinin Olduğu Yerde Yapılır',
    description: 'Bir sorumluluk, o işi yerine getirmek için gereken bilgiye en çok sahip olan sınıfa verilmelidir.',
    category: 'grasp',
    badgeColor: '#10b981'
  },
  {
    id: 'creator',
    name: 'Creator',
    fullName: 'Yaratıcı Prensibi',
    tagline: 'Nesneyi Sahibi Yaratsın',
    description: 'B nesnesini yaratma sorumluluğu; B nesnelerini içeren, kaydeden veya yoğun kullanan A sınıfına verilmelidir.',
    category: 'grasp',
    badgeColor: '#10b981'
  },
  {
    id: 'controller',
    name: 'Controller',
    fullName: 'Denetleyici',
    tagline: 'Sistem İsteklerinin İlk Karşılayıcısı',
    description: 'Kullanıcı veya dış sistemden gelen istekleri karşılayıp işi domain modeline ve servis katmanına delege eden ilk sınıftır.',
    category: 'grasp',
    badgeColor: '#10b981'
  },
  {
    id: 'low-coupling',
    name: 'Low Coupling',
    fullName: 'Düşük Bağımlılık',
    tagline: 'Gevşek Bağlılık, Yüksek Esneklik',
    description: 'Sınıflar arasındaki bağımlılık derecesi olabildiğince düşük tutulmalıdır. Bir sınıftaki değişiklik diğerlerini etkilememelidir.',
    category: 'grasp',
    badgeColor: '#10b981'
  },
  {
    id: 'high-cohesion',
    name: 'High Cohesion',
    fullName: 'Yüksek Uyum / Odak',
    tagline: 'Tek Bir İşe Sıkı Sıkıya Odaklan',
    description: 'Bir sınıf veya modülün içindeki metot ve sorumluluklar birbirine sıkı sıkıya bağlı ve tek bir amaca odaklı olmalıdır.',
    category: 'grasp',
    badgeColor: '#10b981'
  },
  {
    id: 'polymorphism',
    name: 'Polymorphism',
    fullName: 'Çok Biçimlilik',
    tagline: 'if/else Yerine Dinamik Davranış',
    description: 'Türe veya duruma göre değişen davranışlar if/else veya switch-case blokları yerine çok biçimlilik (polymorphic interfaces) ile yönetilmelidir.',
    category: 'grasp',
    badgeColor: '#10b981'
  },
  {
    id: 'pure-fabrication',
    name: 'Pure Fabrication',
    fullName: 'Yapay Sınıf Tasarımı',
    tagline: 'Temiz Mimari İçin Teknik Sınıflar',
    description: 'Gerçek iş alanında (Domain) olmasa bile, Low Coupling ve High Cohesion sağlamak için üretilen teknik sınıflardır (Logger, DbHelper, MailService).',
    category: 'grasp',
    badgeColor: '#10b981'
  },
  {
    id: 'indirection',
    name: 'Indirection',
    fullName: 'Dolaylılık / Araya Katman Koyma',
    tagline: 'Bağımlılığı Kırmak İçin Aracı Nesne',
    description: 'İki sınıf arasındaki doğrudan sıkı bağı kırmak için araya aracı bir nesne veya interface konulmasıdır (Adapter, Mediator vb.).',
    category: 'grasp',
    badgeColor: '#10b981'
  },
  {
    id: 'protected-variations',
    name: 'Protected Variations',
    fullName: 'Korunan Değişimler',
    tagline: 'Değişkenliği Arayüz Arkasına Gizle',
    description: 'Gelecekte değişmesi veya kararsız olması muhtemel yapıların arayüzler (interface/abstraction) arkasına gizlenerek kodun geri kalanının korunmasıdır.',
    category: 'grasp',
    badgeColor: '#10b981'
  },

  // 4. Function & Object Level
  {
    id: 'soc',
    name: 'SoC',
    fullName: 'Separation of Concerns',
    tagline: 'İlgilerin Ayrılması',
    description: 'Kod bloklarını birbiriyle örtüşmeyen farklı alanlara bölmektir. İş mantığı, veri erişimi ve UI kodları asla birbirine karışmamalıdır.',
    category: 'function',
    badgeColor: '#a855f7'
  },
  {
    id: 'pola',
    name: 'POLA',
    fullName: 'Principle of Least Astonishment',
    tagline: 'En Az Şaşırma İlkesi',
    description: 'Yazdığın fonksiyon veya sınıf, onu çağıran diğer yazılımcıyı şaşırtmamalıdır. calculateTotal() adındaki fonksiyon sadece hesaplama yapmalı; arkada gizlice veritabanı güncellememelidir.',
    category: 'function',
    badgeColor: '#a855f7'
  },
  {
    id: 'cqs',
    name: 'CQS',
    fullName: 'Command-Query Separation',
    tagline: 'Komut ve Sorgu Ayrımı',
    description: 'Bir metot ya bir sistem durumunu değiştirmelidir (Command - void) ya da geriye veri dönmelidir (Query - pure). İkisini aynı anda yapmamalıdır.',
    category: 'function',
    badgeColor: '#a855f7'
  },
  {
    id: 'slap',
    name: 'SLAP',
    fullName: 'Single Level of Abstraction Principle',
    tagline: 'Tek Soyutlama Seviyesi',
    description: 'Bir fonksiyon içindeki tüm satırlar aynı soyutlama seviyesinde olmalıdır. Üst düzey iş akışını yöneten bir fonksiyonun içinde en alt seviye regex veya string parsing doğrudan yer almamalıdır.',
    category: 'function',
    badgeColor: '#a855f7'
  },
  {
    id: 'lod',
    name: 'LoD',
    fullName: 'Law of Demeter',
    tagline: 'Demeter Yasası (Yabancılarla Konuşma)',
    description: 'Bir nesne sadece kendi doğrudan bağımlılıklarıyla konuşmalıdır. kullanici.getProfil().getAdres().getSehir() şeklinde zincirleme derin erişim anti-pattern\'dir.',
    category: 'function',
    badgeColor: '#a855f7'
  },
  {
    id: 'tda',
    name: 'TDA',
    fullName: 'Tell, Don\'t Ask',
    tagline: 'Sorup Durma, Komut Ver',
    description: 'Bir nesneden sürekli verilerini isteyip dışarıda işlem yapmak yerine, o nesneye ne yapması gerektiğini söyleyen zengin metotlar (Rich Domain Model) yazılmalıdır.',
    category: 'function',
    badgeColor: '#a855f7'
  },
  {
    id: 'gigo',
    name: 'GIGO',
    fullName: 'Garbage In, Garbage Out',
    tagline: 'Çöp Girerse Çöp Çıkar',
    description: 'Fonksiyona verilen girdi hatalıysa üretilen sonuç da çöptür. Fonksiyonların başında mutlaka parametre doğrulama (guard clause / validation) yapılmalıdır.',
    category: 'function',
    badgeColor: '#a855f7'
  },

  // 5. Database & Distributed
  {
    id: 'acid',
    name: 'ACID',
    fullName: 'Atomicity, Consistency, Isolation, Durability',
    tagline: 'İlişkisel Veritabanı İşlem Garantileri',
    description: 'A: Bütünlük (Hep ya da hiç), C: Tutarlılık, I: Eşzamanlı Yalıtım, D: Kalıcılık.',
    category: 'data',
    badgeColor: '#ec4899',
    relatedPath: '/acid'
  },
  {
    id: 'base',
    name: 'BASE',
    fullName: 'Basically Available, Soft State, Eventual Consistency',
    tagline: 'NoSQL ve Dağıtık Sistem Mantığı',
    description: 'B: Sistem her an yanıt verir, A: Durum zamanla değişebilir, S: Nihai tutarlılık (Eventual consistency) sağlanır.',
    category: 'data',
    badgeColor: '#ec4899'
  },
  {
    id: 'cap',
    name: 'CAP',
    fullName: 'Consistency, Availability, Partition Tolerance',
    tagline: 'Dağıtık Sistem Sınırları Teoremi',
    description: 'Dağıtık bir veritabanı sistemi aynı anda en fazla 2 özelliği (CP veya AP) tam olarak sağlayabilir.',
    category: 'data',
    badgeColor: '#ec4899',
    relatedPath: '/cap-theorem'
  },
  {
    id: 'cqrs',
    name: 'CQRS',
    fullName: 'Command Query Responsibility Segregation',
    tagline: 'Komut ve Sorgu Sorumluluk Ayrımı',
    description: 'Okuma (Query) ve Yazma (Command) veri modellerini ve veritabanı kanallarını birbirinden tamamen ayırma mimarisidir.',
    category: 'data',
    badgeColor: '#ec4899',
    relatedPath: '/cqrs'
  },

  // 6. Testing & Quality
  {
    id: 'cupid',
    name: 'CUPID',
    fullName: 'Composable, Unix, Predictable, Idiomatic, Domain-based',
    tagline: 'Modern Kod Kalitesi Özellikleri (Dan North)',
    description: 'C: Kolay birleştirilebilir, U: Tek bir işi iyi yapan Unix felsefesi, P: Öngörülebilir, I: Dile özgü standartlara uygun, D: İş alanına odaklı.',
    category: 'testing',
    badgeColor: '#06b6d4'
  },
  {
    id: 'first',
    name: 'FIRST',
    fullName: 'Fast, Independent, Repeatable, Self-Validating, Timely',
    tagline: 'Birim Test Yazım İlkeleri',
    description: 'F: Saniyelik hız, I: Bağımsız çalışma, R: Her ortamda aynı sonuç, S: Kendi sonucunu doğrulayan (Pass/Fail), T: Kod yazılırken zamanında yazılan.',
    category: 'testing',
    badgeColor: '#06b6d4',
    relatedPath: '/tdd'
  },
  {
    id: 'aaa',
    name: 'AAA',
    fullName: 'Arrange, Act, Assert',
    tagline: 'Birim Test Yapısı Şablonu',
    description: 'Arrange: Test hazırlığı yapılır. Act: Test edilecek metot çağrılır. Assert: Çıktı beklenen değerle kıyaslanır.',
    category: 'testing',
    badgeColor: '#06b6d4',
    relatedPath: '/tdd'
  },
  {
    id: 'right-bicep',
    name: 'Right-BICEP',
    fullName: 'Birim Test Kontrol Listesi',
    tagline: 'Testin Kapsam Gücü Kontrolü',
    description: 'Right: Sonuç doğru mu? B: Sınır şartları (Boundary), I: Ters ilişkiler (Inverse), C: Çapraz kontrol (Cross-check), E: Hata şartları (Error), P: Performans.',
    category: 'testing',
    badgeColor: '#06b6d4'
  },
  {
    id: 'correct',
    name: 'CORRECT',
    fullName: 'Test Sınır Şartları Kılavuzu',
    tagline: 'Edge Case ve Boundary Kontrolleri',
    description: 'Conformance: Format uyumu, Ordering: Sıralama, Range: Değer aralığı, Reference: Dış referanslar, Existence: Varlık/Yokluk, Cardinality: Eleman sayısı, Time: Zaman faktörü.',
    category: 'testing',
    badgeColor: '#06b6d4'
  },

  // 7. Anti-Patterns
  {
    id: 'stupid',
    name: 'STUPID',
    fullName: 'Singleton, Tight Coupling, Untestability, Premature Optimization, Indescriptive Naming, Duplication',
    tagline: 'Kaçınılması Gereken Kötü Tasarım Anti-Patternleri',
    description: 'S: Kontrolsüz Singleton, T: Sıkı bağımlılık, U: Test edilemeyen kod, P: Erken optimizasyon, I: Anlamsız isimlendirme, D: Kod tekrarı.',
    category: 'antipattern',
    badgeColor: '#ef4444',
    relatedPath: '/anti-patterns'
  }
];
