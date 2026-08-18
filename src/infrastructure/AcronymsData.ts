export interface LocalizedString {
  tr: string;
  en: string;
}

export interface AcronymItem {
  id: string;
  name: string;
  fullName: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  category: 'core' | 'solid' | 'grasp' | 'function' | 'data' | 'testing' | 'antipattern';
  badgeColor: string;
  details?: { tr: string[]; en: string[] };
  example?: string;
  relatedPath?: string;
}

export interface AcronymCategory {
  id: string;
  title: LocalizedString;
  icon: string;
  color: string;
  desc: LocalizedString;
}

export const ACRONYM_CATEGORIES: AcronymCategory[] = [
  { 
    id: 'all', 
    title: { tr: 'Tümü', en: 'All' }, 
    icon: 'Sparkles', 
    color: '#6366f1', 
    desc: { tr: 'Tüm mühendislik kısaltmaları ve prensipleri', en: 'All software engineering acronyms & principles' } 
  },
  { 
    id: 'core', 
    title: { tr: 'Temel Kodlama & Bellek', en: 'Core Coding & Memory' }, 
    icon: 'Cpu', 
    color: '#f59e0b', 
    desc: { tr: 'KISS, DRY, WET, AHA, YAGNI, RAII vb.', en: 'KISS, DRY, WET, AHA, YAGNI, RAII, etc.' } 
  },
  { 
    id: 'solid', 
    title: { tr: 'SOLID Prensipleri', en: 'SOLID Principles' }, 
    icon: 'Layers', 
    color: '#3b82f6', 
    desc: { tr: 'SRP, OCP, LSP, ISP, DIP', en: 'SRP, OCP, LSP, ISP, DIP' } 
  },
  { 
    id: 'grasp', 
    title: { tr: 'GRASP Sorumluluk Kuralları', en: 'GRASP Responsibility Patterns' }, 
    icon: 'ShieldCheck', 
    color: '#10b981', 
    desc: { tr: 'High Cohesion, Low Coupling, Creator vb.', en: 'High Cohesion, Low Coupling, Creator, etc.' } 
  },
  { 
    id: 'function', 
    title: { tr: 'Fonksiyon & Nesne Kuralları', en: 'Function & Object Rules' }, 
    icon: 'Code2', 
    color: '#a855f7', 
    desc: { tr: 'SoC, POLA, CQS, SLAP, LoD, TDA', en: 'SoC, POLA, CQS, SLAP, LoD, TDA' } 
  },
  { 
    id: 'data', 
    title: { tr: 'Veri & Veritabanı', en: 'Data & Databases' }, 
    icon: 'Database', 
    color: '#ec4899', 
    desc: { tr: 'ACID, BASE, CAP, CQRS', en: 'ACID, BASE, CAP, CQRS' } 
  },
  { 
    id: 'testing', 
    title: { tr: 'Test & Kod Kalitesi', en: 'Testing & Code Quality' }, 
    icon: 'CheckCircle2', 
    color: '#06b6d4', 
    desc: { tr: 'CUPID, FIRST, AAA, Right-BICEP, CORRECT', en: 'CUPID, FIRST, AAA, Right-BICEP, CORRECT' } 
  },
  { 
    id: 'antipattern', 
    title: { tr: 'Anti-Patternler', en: 'Anti-Patterns' }, 
    icon: 'AlertTriangle', 
    color: '#ef4444', 
    desc: { tr: 'STUPID ve kaçınılması gereken kötü kodlar', en: 'STUPID and bad code patterns to avoid' } 
  }
];

export const ACRONYMS_DATA: AcronymItem[] = [
  // 1. Core Coding Principles
  {
    id: 'kiss',
    name: 'KISS',
    fullName: { tr: 'Keep It Simple, Stupid', en: 'Keep It Simple, Stupid' },
    tagline: { tr: 'Basit Tut, Aptal / Olabildiğince Sade Tut', en: 'Keep it as simple and clear as possible' },
    description: { 
      tr: 'Kodu her zaman olabildiğince basit ve anlaşılır tut. Gereksiz karmaşıklıktan ve aşırı mühendislikten (over-engineering) kaçın.',
      en: 'Keep the code as simple and straightforward as possible. Avoid unnecessary complexity and over-engineering.'
    },
    category: 'core',
    badgeColor: '#f59e0b',
    details: {
      tr: [
        'Gereksiz katmanlar ve premature soyutlamalar yerine doğrudan çalışan en yalın kodu tercih et.',
        'Bir kodu okuyan junior bir geliştirici bile ana mantığı ilk bakışta anlayabilmelidir.'
      ],
      en: [
        'Prefer the simplest working solution over unnecessary layers and premature abstractions.',
        'Even a junior developer reading the code should grasp the core intent on first glance.'
      ]
    },
    example: '// KÖTÜ: 3 satırlık iş için Factory + Adapter yazmak\n// İYİ: Doğrudan saf ve anlaşılır bir fonksiyon yazmak'
  },
  {
    id: 'dry',
    name: 'DRY',
    fullName: { tr: "Don't Repeat Yourself", en: "Don't Repeat Yourself" },
    tagline: { tr: 'Kendini Tekrar Etme', en: 'Single source of truth in the codebase' },
    description: {
      tr: 'Aynı mantığı veya bilgiyi kod tabanında yalnızca tek bir yerde, benzersiz ve kesin olarak ifade et.',
      en: 'Every piece of knowledge or logic must have a single, unambiguous, authoritative representation within a system.'
    },
    category: 'core',
    badgeColor: '#f59e0b',
    details: {
      tr: [
        'Bir iş kuralı değiştiğinde sadece tek bir yerin güncellenmesini garanti eder.',
        'Aşırı katı uygulanırsa erken soyutlama tuzağına (Hasty Abstraction) düşülebilir.'
      ],
      en: [
        'Ensures business rules only need updating in one central place when requirements change.',
        'Strict over-application can lead to premature/hasty abstraction traps.'
      ]
    }
  },
  {
    id: 'oaoo',
    name: 'OAOO',
    fullName: { tr: 'Once and Only Once', en: 'Once and Only Once' },
    tagline: { tr: 'Bir Kez ve Yalnızca Bir Kez', en: 'State rules and algorithms once and only once' },
    description: {
      tr: 'DRY prensibinin en temel kuralıdır. Bir kural, veri yapısı veya algoritma kod içinde bir kez ve yalnızca bir kez yazılmalıdır.',
      en: 'Core foundation of DRY. An algorithm, pattern, or data structure should be declared once and only once.'
    },
    category: 'core',
    badgeColor: '#f59e0b'
  },
  {
    id: 'aha',
    name: 'AHA',
    fullName: { tr: 'Avoid Hasty Abstraction', en: 'Avoid Hasty Abstraction' },
    tagline: { tr: 'Acele Soyutlamadan Kaçın', en: 'Prefer duplication over the wrong abstraction' },
    description: {
      tr: "DRY prensibinin panzehiridir. Kodun ne yapacağı tamamen netleşmeden ortak fonksiyona bağlamak esnekliği öldürür. İhtiyaç netleşene kadar biraz kod tekrarı (WET) kabul edilebilirdir.",
      en: "Antidote to premature DRY. Binding code to a shared helper before requirements fully stabilize hurts agility. Temporary duplication (WET) is acceptable until patterns are crystal clear."
    },
    category: 'core',
    badgeColor: '#f59e0b',
    details: {
      tr: [
        'Yanlış bir soyutlama, kod tekrarından kat kat daha pahalıya mal olur.',
        'Ortak patern en az 3 farklı yerde somutlaşana kadar soyutlama yapma (Rule of Three).'
      ],
      en: [
        'A wrong abstraction is vastly more expensive than temporary code duplication.',
        'Wait until the pattern appears at least 3 distinct times before abstracting (Rule of Three).'
      ]
    }
  },
  {
    id: 'wet',
    name: 'WET',
    fullName: { tr: 'Write Everything Twice', en: 'Write Everything Twice / We Enjoy Typing' },
    tagline: { tr: 'Her Şeyi İki Kez Yaz', en: 'Acceptable duplication before the 3rd repetition' },
    description: {
      tr: "DRY'ın istisnasıdır. Kodun ne yapacağı tamamen netleşene kadar aynı kodu iki kez yazmak kabul edilebilir; ancak 3. kez tekrar ettiğinde refactor edilir.",
      en: "The pragmatic counterpart to DRY. Writing similar code twice is fine; refactor into a shared abstraction on the 3rd repetition."
    },
    category: 'core',
    badgeColor: '#f59e0b'
  },
  {
    id: 'yagni',
    name: 'YAGNI',
    fullName: { tr: "You Ain't Gonna Need It", en: "You Ain't Gonna Need It" },
    tagline: { tr: 'Buna İhtiyacın Olmayacak', en: 'Implement things only when you actually need them' },
    description: {
      tr: '"Gelecekte lazım olur" düşüncesiyle bugünden kullanılmayan kod, parametre veya özellik ekleme. Yalnızca gerçekten ihtiyaç duyduğun an yaz.',
      en: 'Do not build features, parameters, or abstractions based on speculative future needs. Build only what is required today.'
    },
    category: 'core',
    badgeColor: '#f59e0b'
  },
  {
    id: 'bduf',
    name: 'BDUF',
    fullName: { tr: 'Big Design Up Front', en: 'Big Design Up Front' },
    tagline: { tr: 'Baştan Kapsamlı Tasarım', en: 'Comprehensive architectural planning before coding' },
    description: {
      tr: 'Kod yazmaya başlamadan önce, projenin mimarisini ve detaylarını baştan kapsamlı bir şekilde planlama yaklaşımıdır.',
      en: 'Architectural approach of planning comprehensive system foundations and blueprints before initiating implementation to prevent costly structural mistakes.'
    },
    category: 'core',
    badgeColor: '#f59e0b'
  },
  {
    id: 'raii',
    name: 'RAII',
    fullName: { tr: 'Resource Acquisition Is Initialization', en: 'Resource Acquisition Is Initialization' },
    tagline: { tr: 'Kaynak Edinimi Başlatmadır', en: 'Bind resource lifetime to object scope' },
    description: {
      tr: 'Bellek, dosya veya veritabanı bağlantısı gibi kaynakların yaşam döngüsünü nesnenin yaşam döngüsüne bağlama ilkesidir (C++, Rust, C# using, Java try-with-resources).',
      en: 'Resource lifecycle (memory, file handles, DB connections) is strictly bound to object lifetime/scope and released automatically upon destruction.'
    },
    category: 'core',
    badgeColor: '#f59e0b'
  },

  // 2. SOLID
  {
    id: 'srp',
    name: 'SRP (S)',
    fullName: { tr: 'Single Responsibility Principle', en: 'Single Responsibility Principle' },
    tagline: { tr: 'Tek Sorumluluk Prensibi', en: 'A class should have one, and only one, reason to change' },
    description: {
      tr: 'Bir sınıfın veya modülün değiştirmek için yalnızca tek bir nedeni (tek bir aktör/sorumluluğu) olmalıdır.',
      en: 'A module or class should be responsible to one, and only one, actor or business responsibility.'
    },
    category: 'solid',
    badgeColor: '#3b82f6',
    relatedPath: '/solid'
  },
  {
    id: 'ocp',
    name: 'OCP (O)',
    fullName: { tr: 'Open/Closed Principle', en: 'Open/Closed Principle' },
    tagline: { tr: 'Açık / Kapalı Prensibi', en: 'Open for extension, closed for modification' },
    description: {
      tr: 'Yazılım varlıkları (sınıflar, modüller) gelişime açık, ancak var olan kaynak kodun değişimine kapalı olmalıdır.',
      en: 'Software entities should be open for extension without modifying their existing tested source code.'
    },
    category: 'solid',
    badgeColor: '#3b82f6',
    relatedPath: '/solid'
  },
  {
    id: 'lsp',
    name: 'LSP (L)',
    fullName: { tr: 'Liskov Substitution Principle', en: 'Liskov Substitution Principle' },
    tagline: { tr: 'Liskov Yerine Geçme Prensibi', en: 'Subtypes must be substitutable for their base types' },
    description: {
      tr: 'Alt sınıflar, türedikleri üst sınıfların yerine nesne davranışı ve beklentileri bozulmadan kullanılabilmelidir.',
      en: 'Objects of a superclass should be replaceable with objects of its subclasses without breaking application behavior.'
    },
    category: 'solid',
    badgeColor: '#3b82f6',
    relatedPath: '/solid'
  },
  {
    id: 'isp',
    name: 'ISP (I)',
    fullName: { tr: 'Interface Segregation Principle', en: 'Interface Segregation Principle' },
    tagline: { tr: 'Arayüz Ayrımı Prensibi', en: 'No client should be forced to depend on methods it does not use' },
    description: {
      tr: 'İstemcilere kullanmadıkları metotları barındıran devasa şişkin arayüzler zorla dayatılmamalı; amaca özel küçük arayüzler oluşturulmalıdır.',
      en: 'Clients should not be forced to depend upon interfaces that they do not use. Split fat interfaces into fine-grained ones.'
    },
    category: 'solid',
    badgeColor: '#3b82f6',
    relatedPath: '/solid'
  },
  {
    id: 'dip',
    name: 'DIP (D)',
    fullName: { tr: 'Dependency Inversion Principle', en: 'Dependency Inversion Principle' },
    tagline: { tr: 'Bağımlılıkların Tersine Çevrilmesi', en: 'Depend upon abstractions, not concretions' },
    description: {
      tr: 'Üst seviye iş modülleri alt seviye altyapı sınıflarına doğrudan bağımlı olmamalı; her ikisi de soyutlamalara bağımlı olmalıdır.',
      en: 'High-level business modules should not import anything from low-level infrastructure modules. Both should depend on abstractions.'
    },
    category: 'solid',
    badgeColor: '#3b82f6',
    relatedPath: '/solid'
  },

  // 3. GRASP
  {
    id: 'info-expert',
    name: 'Information Expert',
    fullName: { tr: 'Bilgi Uzmanı', en: 'Information Expert' },
    tagline: { tr: 'İş, Verinin Olduğu Yerde Yapılır', en: 'Assign responsibility to the class that has the required information' },
    description: {
      tr: 'Bir sorumluluk, o işi yerine getirmek için gereken bilgiye en çok sahip olan sınıfa verilmelidir.',
      en: 'Assign responsibilities to the object that has the necessary information to fulfill that responsibility.'
    },
    category: 'grasp',
    badgeColor: '#10b981'
  },
  {
    id: 'creator',
    name: 'Creator',
    fullName: { tr: 'Yaratıcı Prensibi', en: 'Creator' },
    tagline: { tr: 'Nesneyi Sahibi Yaratsın', en: 'Assign responsibility of creating object B to class A that aggregates B' },
    description: {
      tr: 'B nesnesini yaratma sorumluluğu; B nesnelerini içeren, kaydeden veya yoğun kullanan A sınıfına verilmelidir.',
      en: 'Class A should create instance B if A contains, aggregates, records, or closely uses B.'
    },
    category: 'grasp',
    badgeColor: '#10b981'
  },
  {
    id: 'controller',
    name: 'Controller',
    fullName: { tr: 'Denetleyici', en: 'Controller' },
    tagline: { tr: 'Sistem İsteklerinin İlk Karşılayıcısı', en: 'First object beyond UI that handles system events' },
    description: {
      tr: 'Kullanıcı veya dış sistemden gelen istekleri karşılayıp işi domain modeline ve servis katmanına delege eden ilk sınıftır.',
      en: 'Non-UI object responsible for receiving and coordinating a system operation.'
    },
    category: 'grasp',
    badgeColor: '#10b981'
  },
  {
    id: 'low-coupling',
    name: 'Low Coupling',
    fullName: { tr: 'Düşük Bağımlılık', en: 'Low Coupling' },
    tagline: { tr: 'Gevşek Bağlılık, Yüksek Esneklik', en: 'Minimize dependencies between classes' },
    description: {
      tr: 'Sınıflar arasındaki bağımlılık derecesi olabildiğince düşük tutulmalıdır. Bir sınıftaki değişiklik diğerlerini etkilememelidir.',
      en: 'Maintain low dependency between components to increase reuse and ease maintenance.'
    },
    category: 'grasp',
    badgeColor: '#10b981'
  },
  {
    id: 'high-cohesion',
    name: 'High Cohesion',
    fullName: { tr: 'Yüksek Uyum / Odak', en: 'High Cohesion' },
    tagline: { tr: 'Tek Bir İşe Sıkı Sıkıya Odaklan', en: 'Keep responsibilities closely related and focused' },
    description: {
      tr: 'Bir sınıf veya modülün içindeki metot ve sorumluluklar birbirine sıkı sıkıya bağlı ve tek bir amaca odaklı olmalıdır.',
      en: 'Keep classes focused, understandable, and manageable with closely related responsibilities.'
    },
    category: 'grasp',
    badgeColor: '#10b981'
  },
  {
    id: 'polymorphism',
    name: 'Polymorphism',
    fullName: { tr: 'Çok Biçimlilik', en: 'Polymorphism' },
    tagline: { tr: 'if/else Yerine Dinamik Davranış', en: 'Handle varying behaviors using polymorphic operations' },
    description: {
      tr: 'Türe veya duruma göre değişen davranışlar if/else veya switch-case blokları yerine çok biçimlilik ile yönetilmelidir.',
      en: 'Assign responsibility for varying behavior based on type to polymorphic abstractions rather than conditional logic.'
    },
    category: 'grasp',
    badgeColor: '#10b981'
  },
  {
    id: 'pure-fabrication',
    name: 'Pure Fabrication',
    fullName: { tr: 'Yapay Sınıf Tasarımı', en: 'Pure Fabrication' },
    tagline: { tr: 'Temiz Mimari İçin Teknik Sınıflar', en: 'Create artificial technical classes to maintain high cohesion' },
    description: {
      tr: 'Gerçek iş alanında olmasa bile, Low Coupling ve High Cohesion sağlamak için üretilen teknik sınıflardır (Logger, DbHelper).',
      en: 'A class that does not represent a real domain concept, created to achieve low coupling and high cohesion (e.g. Repository, Logger).'
    },
    category: 'grasp',
    badgeColor: '#10b981'
  },
  {
    id: 'indirection',
    name: 'Indirection',
    fullName: { tr: 'Dolaylılık / Araya Katman Koyma', en: 'Indirection' },
    tagline: { tr: 'Bağımlılığı Kırmak İçin Aracı Nesne', en: 'Assign responsibility to intermediate object to decouple components' },
    description: {
      tr: 'İki sınıf arasındaki doğrudan sıkı bağı kırmak için araya aracı bir nesne veya interface konulmasıdır (Adapter, Mediator vb.).',
      en: 'Introduce an intermediary object to serve as the mediator between two components to decouple them.'
    },
    category: 'grasp',
    badgeColor: '#10b981'
  },
  {
    id: 'protected-variations',
    name: 'Protected Variations',
    fullName: { tr: 'Korunan Değişimler', en: 'Protected Variations' },
    tagline: { tr: 'Değişkenliği Arayüz Arkasına Gizle', en: 'Wrap points of instability behind stable interfaces' },
    description: {
      tr: 'Gelecekte değişmesi muhtemel yapıların arayüzler arkasına gizlenerek kodun geri kalanının korunmasıdır.',
      en: 'Identify points of likely variation or instability and assign responsibilities to create a stable interface around them.'
    },
    category: 'grasp',
    badgeColor: '#10b981'
  },

  // 4. Function & Object Level
  {
    id: 'soc',
    name: 'SoC',
    fullName: { tr: 'Separation of Concerns', en: 'Separation of Concerns' },
    tagline: { tr: 'İlgilerin Ayrılması', en: 'Divide software into distinct, non-overlapping sections' },
    description: {
      tr: 'Kod bloklarını birbiriyle örtüşmeyen farklı alanlara bölmektir. İş mantığı, veri erişimi ve UI kodları asla birbirine karışmamalıdır.',
      en: 'Separate distinct concerns so that each section addresses a separate concern (Business logic, UI, Persistence).'
    },
    category: 'function',
    badgeColor: '#a855f7'
  },
  {
    id: 'pola',
    name: 'POLA',
    fullName: { tr: 'Principle of Least Astonishment', en: 'Principle of Least Astonishment' },
    tagline: { tr: 'En Az Şaşırma İlkesi', en: 'Code should behave in a way that least surprises the user or developer' },
    description: {
      tr: 'Yazdığın fonksiyon veya sınıf, onu çağıran diğer yazılımcıyı şaşırtmamalıdır. calculateTotal() sadece hesaplamalı, gizlice DB güncellememelidir.',
      en: 'A component or function name should behave in the way that least astonishes other developers calling it.'
    },
    category: 'function',
    badgeColor: '#a855f7'
  },
  {
    id: 'cqs',
    name: 'CQS',
    fullName: { tr: 'Command-Query Separation', en: 'Command-Query Separation' },
    tagline: { tr: 'Komut ve Sorgu Ayrımı', en: 'Methods should either return data or mutate state, never both' },
    description: {
      tr: 'Bir metot ya bir sistem durumunu değiştirmelidir (Command) ya da geriye veri dönmelidir (Query). İkisini aynı anda yapmamalıdır.',
      en: 'Every method should either be a command that performs an action, or a query that returns data to the caller, but not both.'
    },
    category: 'function',
    badgeColor: '#a855f7'
  },
  {
    id: 'slap',
    name: 'SLAP',
    fullName: { tr: 'Single Level of Abstraction Principle', en: 'Single Level of Abstraction Principle' },
    tagline: { tr: 'Tek Soyutlama Seviyesi', en: 'Keep all statements in a function at the same level of abstraction' },
    description: {
      tr: 'Bir fonksiyon içindeki tüm satırlar aynı soyutlama seviyesinde olmalıdır. Üst düzey iş akışı içinde alt seviye string parsing olmamalıdır.',
      en: 'All statements inside a function should be at the same level of abstraction to maintain supreme readability.'
    },
    category: 'function',
    badgeColor: '#a855f7'
  },
  {
    id: 'lod',
    name: 'LoD',
    fullName: { tr: 'Law of Demeter', en: 'Law of Demeter (Principle of Least Knowledge)' },
    tagline: { tr: 'Demeter Yasası (Yabancılarla Konuşma)', en: 'Only talk to your immediate friends' },
    description: {
      tr: 'Bir nesne sadece kendi doğrudan bağımlılıklarıyla konuşmalıdır. user.getProfile().getAddress().getCity() zinciri anti-pattern\'dir.',
      en: 'An object should only communicate with its direct dependencies. Avoid method chaining like a.getB().getC().doSomething().'
    },
    category: 'function',
    badgeColor: '#a855f7'
  },
  {
    id: 'tda',
    name: 'TDA',
    fullName: { tr: "Tell, Don't Ask", en: "Tell, Don't Ask" },
    tagline: { tr: 'Sorup Durma, Komut Ver', en: 'Tell objects what to do rather than asking for their state' },
    description: {
      tr: 'Bir nesneden sürekli verilerini isteyip dışarıda işlem yapmak yerine, o nesneye ne yapması gerektiğini söyleyen metotlar yazılmalıdır.',
      en: 'Bundle data with operations. Tell objects what to do rather than repeatedly asking for data and manipulating it externally.'
    },
    category: 'function',
    badgeColor: '#a855f7'
  },
  {
    id: 'gigo',
    name: 'GIGO',
    fullName: { tr: 'Garbage In, Garbage Out', en: 'Garbage In, Garbage Out' },
    tagline: { tr: 'Çöp Girerse Çöp Çıkar', en: 'Validate function arguments at the boundary' },
    description: {
      tr: 'Fonksiyona verilen girdi hatalıysa üretilen sonuç da çöptür. Fonksiyonların başında guard clause / validation yapılmalıdır.',
      en: 'Flawed input produces flawed output. Apply strict validation and guard clauses at entry points.'
    },
    category: 'function',
    badgeColor: '#a855f7'
  },

  // 5. Database & Distributed
  {
    id: 'acid',
    name: 'ACID',
    fullName: { tr: 'Atomicity, Consistency, Isolation, Durability', en: 'Atomicity, Consistency, Isolation, Durability' },
    tagline: { tr: 'İlişkisel Veritabanı İşlem Garantileri', en: 'Relational Database Transaction Guarantees' },
    description: {
      tr: 'A: Bütünlük (Hep ya da hiç), C: Tutarlılık, I: Eşzamanlı Yalıtım, D: Kalıcılık.',
      en: 'Set of properties that guarantee database transactions are processed reliably (All-or-nothing, Valid state, Isolation, Durability).'
    },
    category: 'data',
    badgeColor: '#ec4899',
    relatedPath: '/acid'
  },
  {
    id: 'base',
    name: 'BASE',
    fullName: { tr: 'Basically Available, Soft State, Eventual Consistency', en: 'Basically Available, Soft State, Eventual Consistency' },
    tagline: { tr: 'NoSQL ve Dağıtık Sistem Mantığı', en: 'Distributed NoSQL Consistency Model' },
    description: {
      tr: 'B: Sistem her an yanıt verir, A: Durum zamanla değişebilir, S: Nihai tutarlılık sağlanır.',
      en: 'Basically Available, Soft state, Eventual consistency - prioritizing availability and partition tolerance over immediate strict consistency.'
    },
    category: 'data',
    badgeColor: '#ec4899'
  },
  {
    id: 'cap',
    name: 'CAP',
    fullName: { tr: 'Consistency, Availability, Partition Tolerance', en: 'Consistency, Availability, Partition Tolerance' },
    tagline: { tr: 'Dağıtık Sistem Sınırları Teoremi', en: 'Brewer\'s Distributed System Theorem' },
    description: {
      tr: 'Dağıtık bir veritabanı sistemi aynı anda en fazla 2 özelliği (CP veya AP) tam olarak sağlayabilir.',
      en: 'A distributed data store can simultaneously provide at most two out of three guarantees: Consistency, Availability, and Partition Tolerance.'
    },
    category: 'data',
    badgeColor: '#ec4899',
    relatedPath: '/cap-theorem'
  },
  {
    id: 'cqrs',
    name: 'CQRS',
    fullName: { tr: 'Command Query Responsibility Segregation', en: 'Command Query Responsibility Segregation' },
    tagline: { tr: 'Komut ve Sorgu Sorumluluk Ayrımı', en: 'Segregate read and write data models' },
    description: {
      tr: 'Okuma (Query) ve Yazma (Command) veri modellerini ve veritabanı kanallarını birbirinden tamamen ayırma mimarisidir.',
      en: 'Architectural pattern that separates read and update operations for a data store to maximize scalability and performance.'
    },
    category: 'data',
    badgeColor: '#ec4899',
    relatedPath: '/cqrs'
  },

  // 6. Testing & Quality
  {
    id: 'cupid',
    name: 'CUPID',
    fullName: { tr: 'Composable, Unix, Predictable, Idiomatic, Domain-based', en: 'Composable, Unix, Predictable, Idiomatic, Domain-based' },
    tagline: { tr: 'Modern Kod Kalitesi Özellikleri (Dan North)', en: 'Properties of Joyful Code' },
    description: {
      tr: 'C: Kolay birleştirilebilir, U: Tek bir işi iyi yapan Unix felsefesi, P: Öngörülebilir, I: Dile özgü standartlara uygun, D: İş alanına odaklı.',
      en: 'Modern code quality framework focusing on composability, Unix philosophy, predictability, idiomatic style, and domain-centered design.'
    },
    category: 'testing',
    badgeColor: '#06b6d4'
  },
  {
    id: 'first',
    name: 'FIRST',
    fullName: { tr: 'Fast, Independent, Repeatable, Self-Validating, Timely', en: 'Fast, Independent, Repeatable, Self-Validating, Timely' },
    tagline: { tr: 'Birim Test Yazım İlkeleri', en: 'Five Essential Rules for Clean Unit Tests' },
    description: {
      tr: 'F: Saniyelik hız, I: Bağımsız çalışma, R: Her ortamda aynı sonuç, S: Kendi sonucunu doğrulayan (Pass/Fail), T: Kod yazılırken zamanında yazılan.',
      en: 'Clean unit tests must run fast, be independent of other tests, be repeatable across any environment, self-validate pass/fail, and be written in a timely manner.'
    },
    category: 'testing',
    badgeColor: '#06b6d4',
    relatedPath: '/tdd'
  },
  {
    id: 'aaa',
    name: 'AAA',
    fullName: { tr: 'Arrange, Act, Assert', en: 'Arrange, Act, Assert' },
    tagline: { tr: 'Birim Test Yapısı Şablonu', en: 'Standard 3-Step Unit Test Pattern' },
    description: {
      tr: 'Arrange: Test hazırlığı yapılır. Act: Test edilecek metot çağrılır. Assert: Çıktı beklenen değerle kıyaslanır.',
      en: 'Arrange preconditions and inputs, Act on the object under test, and Assert that the expected outcomes occurred.'
    },
    category: 'testing',
    badgeColor: '#06b6d4',
    relatedPath: '/tdd'
  },
  {
    id: 'right-bicep',
    name: 'Right-BICEP',
    fullName: { tr: 'Birim Test Kontrol Listesi', en: 'Unit Test Coverage Checklist' },
    tagline: { tr: 'Testin Kapsam Gücü Kontrolü', en: 'What to test checklist' },
    description: {
      tr: 'Right: Sonuç doğru mu? B: Sınır şartları (Boundary), I: Ters ilişkiler (Inverse), C: Çapraz kontrol (Cross-check), E: Hata şartları (Error), P: Performans.',
      en: 'Are results Right? Boundary conditions, Inverse relationships, Cross-checking, Error conditions, and Performance characteristics.'
    },
    category: 'testing',
    badgeColor: '#06b6d4'
  },
  {
    id: 'correct',
    name: 'CORRECT',
    fullName: { tr: 'Test Sınır Şartları Kılavuzu', en: 'Boundary & Edge Cases Guide' },
    tagline: { tr: 'Edge Case ve Boundary Kontrolleri', en: 'Conformance, Ordering, Range, Reference, Existence, Cardinality, Time' },
    description: {
      tr: 'Conformance: Format uyumu, Ordering: Sıralama, Range: Değer aralığı, Reference: Dış referanslar, Existence: Varlık/Yokluk, Cardinality: Eleman sayısı, Time: Zaman faktörü.',
      en: 'Mnemonics for testing boundary conditions: Conformance, Ordering, Range, Reference, Existence, Cardinality, Time.'
    },
    category: 'testing',
    badgeColor: '#06b6d4'
  },

  // 7. Anti-Patterns
  {
    id: 'stupid',
    name: 'STUPID',
    fullName: { tr: 'Singleton, Tight Coupling, Untestability, Premature Optimization, Indescriptive Naming, Duplication', en: 'Singleton, Tight Coupling, Untestability, Premature Optimization, Indescriptive Naming, Duplication' },
    tagline: { tr: 'Kaçınılması Gereken Kötü Tasarım Anti-Patternleri', en: 'Six Code Smells to Avoid' },
    description: {
      tr: 'S: Kontrolsüz Singleton, T: Sıkı bağımlılık, U: Test edilemeyen kod, P: Erken optimizasyon, I: Anlamsız isimlendirme, D: Kod tekrarı.',
      en: 'Classic anti-patterns: Overused Singletons, Tight Coupling, Untestable code, Premature optimization, Indescriptive naming, and Duplication.'
    },
    category: 'antipattern',
    badgeColor: '#ef4444',
    relatedPath: '/anti-patterns'
  }
];
