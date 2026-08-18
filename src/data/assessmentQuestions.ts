export interface QuizOption {
  text: { tr: string; en: string };
  score: { type: 'Architect' | 'Specialist' | 'OverKiller' | 'Junior'; value: number };
  feedback: { tr: string; en: string };
  interviewTip: { tr: string; en: string };
}

export interface Question {
  id: number;
  title: { tr: string; en: string };
  category: string;
  scenario: { tr: string; en: string };
  options: QuizOption[];
}

export interface ArchetypeProfile {
  title: string;
  badge: string;
  color: string;
  desc: string;
}

export const interviewQuestions: Question[] = [
  {
    id: 1,
    title: { tr: "Sistem Tasarımı: Ölçeklenebilirlik", en: "System Design: Scalability" },
    category: "System Design",
    scenario: {
      tr: "Uygulamanız bir anda 10 kat trafik aldı ve veritabanı 'connection pool' hataları vermeye başladı. Yatay ölçekleme yapmadan önce mimari düzeyde ilk hamleniz ne olurdu?",
      en: "Your app suddenly received 10x peak traffic and the database is throwing 'connection pool exhausted' errors. Before horizontally scaling, what is your immediate architectural move?"
    },
    options: [
      { 
        text: { tr: "Database önüne Redis Cache katmanı eklemek", en: "Add an in-memory Redis Cache layer in front of the database" }, 
        score: { type: 'Architect', value: 10 }, 
        feedback: { tr: "Guru: 'Mükemmel! Veritabanı yükünü okumalarda azaltmak her zaman ilk savunma hattıdır.'", en: "Guru: 'Excellent! Offloading read pressure from the database is always the primary line of defense.'" },
        interviewTip: { tr: "Mülakatta her zaman 'en ucuz, en hızlı ve en etkili' çözümle başlayın.", en: "In interviews, always propose the highest-impact, most cost-effective solution first." }
      },
      { 
        text: { tr: "Tüm sorguları optimize edip index atmak", en: "Optimize queries and add composite database indexes" }, 
        score: { type: 'Specialist', value: 6 }, 
        feedback: { tr: "Guru: 'Doğru bir adım ama milyonluk trafikte bazen index bile yetmeyebilir.'", en: "Guru: 'Good step, but under massive concurrency, indexes alone won't prevent pool exhaustion.'" },
        interviewTip: { tr: "Indexleme iyidir ama tek başına bir mimari ölçekleme stratejisi değildir.", en: "Indexing is table-stakes hygiene, not a standalone scaling architecture." }
      },
      { 
        text: { tr: "Veritabanını doğrudan microservices'lere bölmek", en: "Immediately partition the database into distributed microservices" }, 
        score: { type: 'OverKiller', value: 3 }, 
        feedback: { tr: "Guru: 'Yangın varken ev taşınmaz! Microservices uzun vadeli bir evrimdir.'", en: "Guru: 'Never remodel the house during a fire! Microservices is a strategic evolution, not an emergency fix.'" },
        interviewTip: { tr: "Acil üretim anlarında devasa yapısal değişiklikler risklidir.", en: "Avoid proposing massive distributed refactors during active production incidents." }
      }
    ]
  },
  {
    id: 2,
    title: { tr: "Domain Modelleme & Sorumluluk", en: "Domain Modeling & Responsibilities" },
    category: "DDD / Domain",
    scenario: {
      tr: "Bankacılık sisteminde 'Para Transferi' işlemini modelliyorsunuz. Çift taraflı hesap hareketini ve bakiye doğrulama mantığını nereye yazarsınız?",
      en: "You are modeling a 'Fund Transfer' feature in a banking core. Where do you place the cross-account transaction & validation logic?"
    },
    options: [
      { 
        text: { tr: "Domain Service (Saf İş Mantığı Katmanı)", en: "Domain Service (Pure Domain Logic Layer)" }, 
        score: { type: 'Architect', value: 10 }, 
        feedback: { tr: "Guru: 'DDD kusursuzluğu! Birden fazla entity'i (hesapları) koordine eden saf mantık Domain Service'e aittir.'", en: "Guru: 'Flawless DDD! Pure business logic that spans multiple aggregates belongs in a Domain Service.'" },
        interviewTip: { tr: "Entity'ler sadece kendi iç durumundan (kendi bakiyesinden) sorumlu olmalıdır.", en: "Entities should only guard their own internal invariants." }
      },
      { 
        text: { tr: "Application Service (Orkestrasyon)", en: "Application Service (UseCase Orchestration)" }, 
        score: { type: 'Specialist', value: 7 }, 
        feedback: { tr: "Guru: 'Kötü değil; ancak karmaşık para transferi iş kuralları için Domain Service daha izoledir.'", en: "Guru: 'Acceptable for orchestration, but critical domain invariants belong in the Domain layer.'" },
        interviewTip: { tr: "Application service akışı yönetir, iş kurallarını değil.", en: "Application services orchestrate workflows, not core business invariants." }
      },
      { 
        text: { tr: "Controller / Web Katmanı", en: "Controller / Web API Layer" }, 
        score: { type: 'Junior', value: 1 }, 
        feedback: { tr: "Guru: 'Fat Controller anti-pattern'i! İş mantığı asla sunum katmanına sızmamalıdır.'", en: "Guru: 'Fat Controller anti-pattern! Business logic must never leak into transport layers.'" },
        interviewTip: { tr: "Katmanlar arası mantık sızıntısı (leakage) mülakatlarda büyük eksi puandır.", en: "Cross-layer domain leakage is an immediate red flag in senior interviews." }
      }
    ]
  },
  {
    id: 3,
    title: { tr: "Bağımlılık Yönetimi (SOLID)", en: "Dependency Management (SOLID)" },
    category: "Architecture Principles",
    scenario: {
      tr: "Projenizde ödeme sağlayıcısı olarak Stripe kullanıyorsunuz. Yarın PayPal'a geçmek isterseniz kodun %99'unu değiştirmeden korumak için ne yapmalısınız?",
      en: "Your system uses Stripe for payments. To switch to PayPal tomorrow by modifying less than 1% of your code, how should you architect this?"
    },
    options: [
      { 
        text: { tr: "Interface (Abstraction) ve Adapter Pattern kullanmak", en: "Introduce an IPaymentGateway Interface and Adapter Pattern" }, 
        score: { type: 'Architect', value: 10 }, 
        feedback: { tr: "Guru: 'İşte bu! Dependency Inversion ve Hexagonal mimariyi tam kalbinden yakaladınız.'", en: "Guru: 'Spot on! Pure Dependency Inversion and Hexagonal Ports & Adapters in action.'" },
        interviewTip: { tr: "Üçüncü parti kütüphaneleri her zaman bir arayüz (Port) arkasına gizleyin.", en: "Always wrap third-party SDKs behind domain-owned abstraction interfaces." }
      },
      { 
        text: { tr: "Her ödeme yapılan yerde if/else ile sağlayıcı kontrolü yapmak", en: "Use if/else provider checks directly in business logic" }, 
        score: { type: 'Junior', value: 2 }, 
        feedback: { tr: "Guru: 'Open/Closed prensibi ihlali! Her yeni ödeme yönteminde tüm kodu bozarsınız.'", en: "Guru: 'Violates Open/Closed! Adding a provider will require modifying core business logic.'" },
        interviewTip: { tr: "Dinamik davranışlar için if/else yerine Polimorfizm veya Strateji deseni kullanın.", en: "Favor Polymorphic Strategy patterns over sprawling conditional branches." }
      },
      { 
        text: { tr: "Ödeme işlemlerini ayrı bir mikroservise taşımak", en: "Extract payment processing into a standalone dedicated microservice" }, 
        score: { type: 'Specialist', value: 6 }, 
        feedback: { tr: "Guru: 'Faydalı bir dağıtık adım ancak o servisin içinde de hala Adapter katmanı gerekecektir.'", en: "Guru: 'Helpful operational isolation, but inside that service, you still need an abstraction adapter.'" },
        interviewTip: { tr: "Mimari temizlik sadece servis sınırlarında değil, kod düzeyinde de başlar.", en: "Clean architecture applies at the code boundary level as well as the service boundary." }
      }
    ]
  }
];

export const getArchetypeProfiles = (isEn: boolean): Record<'Architect' | 'Specialist' | 'OverKiller' | 'Junior', ArchetypeProfile> => ({
  Architect: {
    title: isEn ? "Staff / Principal Software Architect" : "Kıdemli Sistem Mimarı (Principal Architect)",
    badge: isEn ? "SENIOR / PRINCIPAL LEVEL" : "SENIOR / PRINCIPAL SEVİYESİ",
    color: "#10b981",
    desc: isEn 
      ? "You balance pragmatism with clean design. You avoid premature optimization, favor loose coupling, and prioritize business velocity and fault tolerance."
      : "Pragmatizm ile temiz mimariyi kusursuz dengeliyorsun. Gereksiz over-engineering yapmıyor, gevşek bağımlılık ve sistem dayanıklılığını ön planda tutuyorsun."
  },
  Specialist: {
    title: isEn ? "Senior Engineering Specialist" : "Kıdemli Mühendis (Senior Specialist)",
    badge: isEn ? "SENIOR LEVEL" : "SENIOR SEVİYESİ",
    color: "#3b82f6",
    desc: isEn 
      ? "Deep technical competence and clean execution. Sharpen your high-level distributed trade-offs to reach Principal mastery."
      : "Teknik bilgin çok derin ve çözümlerin sağlam. Büyük resim ve dağıtık sistem trade-off dengelerine biraz daha odaklanarak Principal seviyesine ulaşabilirsin."
  },
  OverKiller: {
    title: isEn ? "Complex System Enthusiast" : "Over-Engineering Tutkunu",
    badge: isEn ? "OPTIMIZATION ALERT" : "OPTIMİZASYON UYARISI",
    color: "#f59e0b",
    desc: isEn 
      ? "You have strong distributed knowledge, but tend to reach for microservices and complex machinery before exhausting simpler, cheaper architectural solutions."
      : "Güçlü bir vizyonun var ancak bazen basit bir soruna devasa mikroservisler ve karmaşık dağıtık sistemlerle yaklaşma eğilimindesin. 'KISS' prensibini hatırla!"
  },
  Junior: {
    title: isEn ? "Aspiring Software Engineer" : "Gelişmekte Olan Yazılımcı",
    badge: isEn ? "ACADEMY TRAINEE" : "AKADEMİ ÇIRAK SEVİYESİ",
    color: "#ec4899",
    desc: isEn 
      ? "Great potential! Dive deeper into SOLID, Layered Abstractions, and Separation of Concerns on ArchAcademy to elevate your architectural mindset."
      : "Harika bir öğrenme azmin var! ArchAcademy'deki SOLID, Clean Architecture ve Katmanlı Soyutlama modüllerini tamamlayarak mimari reflekslerini güçlendir."
  }
});
