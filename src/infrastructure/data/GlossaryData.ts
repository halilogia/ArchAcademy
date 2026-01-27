export interface GlossaryTerm {
  id: number;
  term: string;
  definition: string;
  category: string;
  guruTip: string;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
    {
      id: 1,
      term: 'Separation of Concerns (SoC)',
      definition: 'Yazılımın farklı teknik veya iş mantığı katmanlarına bölünmesi prensibidir. Her parçanın kendine ait net bir sorumluluğu olmalıdır.',
      category: 'Foundation',
      guruTip: 'Clean Architecture\'ın temel taşıdır. Değişim maliyetini düşürür.'
    },
    {
      id: 2,
      term: 'Coupling (Bağımlılık)',
      definition: 'İki modülün birbirine ne kadar sıkı bağlı olduğunun ölçüsüdür. Mimari hedef her zaman "Loose Coupling" (Gevşek Bağlılık) olmalıdır.',
      category: 'Quality',
      guruTip: 'Bir modülü değiştirdiğinde diğeri de değişmek zorundaysa, Coupling yüksektir.'
    },
    {
      id: 3,
      term: 'Cohesion (Bağlılık)',
      definition: 'Bir modülün içindeki elemanların birbirine ne kadar ait olduğunu ifade eder. Hedef "High Cohesion"dır; yani bir modül tek bir amaç için kenetlenmelidir.',
      category: 'Quality',
      guruTip: 'High Cohesion, Low Coupling! Mimarinin kutsal kasesi budur.'
    },
    {
      id: 4,
      term: 'Atomic Design',
      definition: 'Arayüz bileşenlerini Atoms, Molecules, Organisms, Templates ve Pages şeklinde 5 hiyerarşik seviyeye ayıran görsel mimari metodolojisidir.',
      category: 'UI Architecture',
      guruTip: 'Frontend projelerini birer sayfa yığını olarak değil, birer bileşen ekosistemi olarak görmenizi sağlar.'
    },
    {
      id: 5,
      term: 'Design Tokens',
      definition: 'Renk, boşluk, font ve gölge gibi görsel tasarım kararlarının, her platformda (web, mobil, tasarım aracı) ortak kullanılabilen merkezi değişkenler (JSON/CSS) olarak yönetilmesidir.',
      category: 'UI Architecture',
      guruTip: 'Tasarım DNA\'sını kod haline getirir; marka değişimini saniyelik bir işe dönüştürür.'
    },
    {
      id: 6,
      term: 'Zero-Runtime CSS-in-JS',
      definition: 'Stillerin JavaScript içinde dinamik olarak yazıldığı ancak build (derleme) anında saf CSS dosyalarına dönüştürüldüğü modern stil yönetimi yaklaşımıdır.',
      category: 'UI Architecture',
      guruTip: 'JavaScript konforunu (Type-safety) alıp, Tailwind hızıyla (CSS performansıyla) çalıştırmanın en Senior yoludur.'
    },
    {
      id: 7,
      term: 'BEM (Block Element Modifier)',
      definition: 'CSS sınıflarını "Blok__Eleman--Durum" yapısıyla isimlendiren, global stil çakışmalarını önleyen hiyerarşik bir isimlendirme mimarisidir.',
      category: 'UI Architecture',
      guruTip: 'CSS\'in çorba olmasını engeller; her görsel parçanın bir "adresi" ve "kimliği" olur.'
    },
    {
      id: 8,
      term: 'Headless UI',
      definition: 'Bir bileşenin görsel tasarımını (CSS) içermeyen, sadece erişilebilirlik, klavye kontrolleri ve etkileşim mantığını (logic) sunan kütüphanelerdir.',
      category: 'UI Architecture',
      guruTip: 'Görsel stil (marka) değişse bile o karmaşık tıklama/seçme mantığının asla bozulmamasını sağlar.'
    },
    {
      id: 9,
      term: 'Abstraction (Soyutlama)',
      definition: 'Gereksiz detayların gizlenip, sadece önemli özelliklerin sunulmasıdır. Interface\'ler ve Abstract sınıflar en yaygın araçlarıdır.',
      category: 'OOP',
      guruTip: 'Detaylara değil, arayüzlere (interface) bağımlı kalın!'
    },
    {
      id: 10,
      term: 'Inversion of Control (IoC)',
      definition: 'Programın akış kontrolünün bir framework veya container\'a devredilmesidir. "Sen beni çağırma, ben seni çağırırım" (Hollywood Prensibi).',
      category: 'SOLID',
      guruTip: 'Dependency Injection, IoC\'yi uygulamanın bir yoludur.'
    },
    {
      id: 11,
      term: 'Polyglot Persistence',
      definition: 'Bir sistemde verinin ihtiyacına göre birden fazla veritabanı türünün (örn: SQL + Redis + Neo4j) bir arada kullanılmasıdır.',
      category: 'Modern',
      guruTip: 'EDA ve Microservices dünyasında sıkça karşımıza çıkar.'
    },
    {
      id: 12,
      term: 'YAGNI (You Ain\'t Gonna Need It)',
      definition: '"Buna zaten ihtiyacınız olmayacak" prensibi. Gelecekte ihtiyaç olabilir diye şimdiden karmaşık özellikler eklememeyi öğütler.',
      category: 'Principle',
      guruTip: 'Aşırı mühendislikten (Over-engineering) kaçının.'
    },
    {
      id: 13,
      term: 'KISS (Keep It Simple, Stupid)',
      definition: 'Sistemlerin mümkün olduğunca basit tutulması gerektiğini savunan tasarım prensibidir.',
      category: 'Principle',
      guruTip: 'Basitlik, en üstün gelişmişliktir.'
    },
    {
      id: 14,
      term: 'Bounded Context',
      definition: 'DDD\'de bir terimin veya modelin geçerli olduğu merkezi sınır. Aynı kelime farklı contextlerde farklı anlamlara gelebilir.',
      category: 'DDD',
      guruTip: 'Müşteri kelimesi Satış için "Borçlu", Kargo için "Alıcı" anlamına gelir.'
    },
    {
      id: 15,
      term: 'Entity (Varlık)',
      definition: 'Kimliği (ID) olan ve zaman içinde değişebilen nesnelerdir. Özellikleri değişse bile o hala aynı varlıktır (Örn: Kullanıcı, Sipariş).',
      category: 'DDD',
      guruTip: 'Entity\'ler veritabanı satırı değildir; iş kuralı taşıyan canlı nesnelerdir.'
    },
    {
      id: 16,
      term: 'Value Object (Değer Nesnesi)',
      definition: 'Kimliği olmayan, sadece değerleriyle tanımlanan nesnelerdir (Örn: Para Birimi, RGB Renk, Koordinat). Değişmez (Immutable) olmalıdırlar.',
      category: 'DDD',
      guruTip: 'Value Object\'leri eşitlemek için referansa değil, değerlerine bakılır (x.equals(y)).'
    },
    {
      id: 17,
      term: 'Hook (React Hook)',
      definition: 'Fonksiyonel bileşenlerde State ve Lifecycle özelliklerini kullanmanızı sağlayan özel fonksiyonlardır. Mantığı (logic) izole edip paylaşmanızı sağlar.',
      category: 'Implementation',
      guruTip: 'UI kodunu (JSX) kirletmeden mantığı "useSomething" şeklinde dışarı atın. (Bknz: useLocalStorage)'
    },
    {
      id: 18,
      term: 'Dependency Inversion (DIP)',
      definition: 'Üst seviye modüllerin alt seviye modüllere değil, her ikisinin de soyutlamalara (interface) bağımlı olmasıdır. Bağımlılıkların yönünü tersine çevirir.',
      category: 'SOLID',
      guruTip: 'Kodunuz somut sınıflara (class) değil, sözleşmelere (interface) güvenmelidir.'
    },
    {
      id: 19,
      term: 'DTO (Data Transfer Object)',
      definition: 'Verinin katmanlar arasında taşınması için kullanılan, içinde hiçbir iş mantığı barındırmayan basit veri taşıma nesnelerdir.',
      category: 'Implementation',
      guruTip: 'Domain modellerinizi asla doğrudan dış dünyaya açmayın; DTO kullanarak veriyi filtreleyin.'
    },
    {
      id: 20,
      term: 'Repository Pattern',
      definition: 'Veri kaynağına (DB, API) erişimi merkezi hale getiren ve domain katmanına verileri sanki hafızadaymış gibi sunan desendir.',
      category: 'Pattern',
      guruTip: 'Domain katmanı SQL veya MongoDB bilmez; sadece Repository\'nin sunduğu interface\'i tanır.'
    },
    {
      id: 21,
      term: 'Ubiquitous Language (Ortak Dil)',
      definition: 'Yazılımcılar ve iş birimi (domain experts) arasında kurulan, hem koda hem de günlük konuşmaya yansıyan ortak dildir.',
      category: 'DDD',
      guruTip: 'Eğer iş birimi "Sipariş" diyorsa, kodda "Order" yazmalı; "RequestRecord" gibi teknik terimlerden kaçınılmalıdır.'
    },
    {
      id: 22,
      term: 'Clean Architecture',
      definition: 'Bağımlılıkların içe doğru aktığı, iş kurallarının (Entities/Use Cases) framework ve veritabanlarından tamamen soyutlandığı katmanlı mimaridir.',
      category: 'Foundation',
      guruTip: 'Nihai amaç; sistemin ömrünü uzatmak ve değişim maliyetini minimuma indirmektir.'
    },
    {
      id: 23,
      term: 'Hexagonal Architecture',
      definition: 'Uygulamanın merkezini (Business Logic) dış etkenlerden Portlar ve Adaptörler aracılığıyla soyutlayan mimari yaklaşımıdır.',
      category: 'Foundation',
      guruTip: 'Clean Architecture\'ın atası sayılır. "Dış dünya bir adaptördür" felsefesini savunur.'
    },
    {
      id: 24,
      term: 'Eventual Consistency (Nihai Tutarlılık)',
      definition: 'Dağıtık sistemlerde verinin tüm kopyalarının anında değil, belirli bir süre sonra aynı değere ulaştığı tutarlılık modelidir.',
      category: 'Modern',
      guruTip: 'Özellikle Mikroservis ve Event-Driven dünyasında "anlık" tutarlılık yerine bu model tercih edilir.'
    },
    {
      id: 25,
      term: 'Anti-Pattern',
      definition: 'Bir soruna çözüm gibi görünen ancak uzun vadede teknik borç ve bakım zorluğu yaratan hatalı tasarım kalıplarıdır.',
      category: 'Quality',
      guruTip: 'Neyin iyi olduğunu bilmek kadar, neyin kötü (Anti-pattern) olduğunu bilmek de sizi kıdemli yapar.'
    },
    {
      id: 26,
      term: 'DRY (Don\'t Repeat Yourself)',
      definition: 'Bilginin veya mantığın sistem içinde tek bir, net ve yetkili temsili olması gerektiğini savunan prensiptir. Gereksiz tekrarlardan kaçınmayı öğütler.',
      category: 'Principle',
      guruTip: 'Sadece kod kopyalamak değil, aynı iş mantığını farklı yerlerde farklı şekillerde yazmak da DRY kuralını bozar.'
    },
    {
      id: 27,
      term: 'Side Effect (Yan Etki)',
      definition: 'Bir işlemin, kendi kapsamı dışındaki bir durumu (state) değiştirmesi veya dış dünya ile etkileşime girmesidir (Örn: DB yazma, Global değişken değiştirme).',
      category: 'Implementation',
      guruTip: 'Mümkün olduğunca "Pure" (Saf) fonksiyonlar yazın; yan etkileri ise net bir şekilde izole edin.'
    },
    {
      id: 28,
      term: 'Observability (Gözlemlenebilirlik)',
      definition: 'Sistemin iç durumunun; ürettiği log, metrik ve trace verileri üzerinden ne kadar iyi anlaşılabildiğinin ölçüsüdür.',
      category: 'Modern',
      guruTip: 'Sadece "sistem çalışıyor mu?" değil, "neden yavaşladı?" sorusuna da cevap verebilmektir.'
    },
    {
      id: 29,
      term: 'Circuit Breaker (Devre Kesici)',
      definition: 'Bir servisteki hatanın tüm sistemi zincirleme şekilde çökertmesini engellemek için, başarısız istekleri algılayıp bağlantıyı geçici olarak kesen desendir.',
      category: 'Pattern',
      guruTip: 'Hatalı bir servisi sürekli zorlamak yerine, ona iyileşmesi için zaman verin.'
    },
    {
      id: 30,
      term: 'CQRS (Command Query Segregation)',
      definition: 'Sistemin okuma (Query) ve yazma (Command) işlemlerini birbirinden ayıran mimari desendir. Performans için farklı veri modelleri kullanılabilir.',
      category: 'Modern',
      guruTip: 'Okuma yükünün yazma yükünden çok fazla olduğu büyük ölçekli sistemlerde hayat kurtarır.'
    },
    {
      id: 31,
      term: 'Event Sourcing',
      definition: 'Sistemin anlık durumunu saklamak yerine, bu duruma yol açan tüm olayları (events) sırasıyla kaydeden yöntemdir.',
      category: 'Modern',
      guruTip: 'Banka hesap hareketleri gibidir; bakiyeyi değil, tüm işlemleri saklar ve gerektiğinde bakiyeyi yeniden hesaplar.'
    },
    {
      id: 32,
      term: 'Micro-frontends',
      definition: 'Bir frontend uygulamasının, farklı ekiplerce bağımsız geliştirilebilen daha küçük web uygulamalarına bölünmesi yaklaşımıdır.',
      category: 'Modern',
      guruTip: 'Büyük ekiplerin birbirini beklemeden, farklı teknolojilerle bile aynı sitede çalışmasını sağlar.'
    },
    {
      id: 33,
      term: 'Composition over Inheritance',
      definition: 'Nesneler arası hiyerarşi kurmak (Kalıtım) yerine, nesneleri farklı yeteneklere sahip parçaların birleşimiyle oluşturmayı savunan prensiptir.',
      category: 'OOP',
      guruTip: '"X bir Y\'dir" (Inheritance) yerine "X bir Y\'ye sahiptir" (Composition) ilişkisi kurun; kod çok daha esnek olur.'
    },
    {
      id: 34,
      term: 'Idempotency (Eşgüçlülük)',
      definition: 'Bir işlemin aynı verilerle birden fazla kez tetiklenmesine rağmen sonucun değişmemesi özelliğidir.',
      category: 'Implementation',
      guruTip: 'Özellikle ödeme sistemlerinde bir "retry" (tekrar deneme) durumunda kullanıcıdan iki kez para çekilmemesi için hayati önem taşır.'
    },
    {
      id: 35,
      term: 'Stateless (Durumsuz)',
      definition: 'Bir servisin her isteği birbirinden bağımsız işlemesi ve kullanıcı verisini kendi hafızasında saklamamasıdır.',
      category: 'Modern',
      guruTip: 'Stateless yapılar yatayda ölçeklenmek için idealdir; çünkü her istek herhangi bir sunucuya gidebilir.'
    },
    {
      id: 36,
      term: 'Pure Function (Saf Fonksiyon)',
      definition: 'Aynı girdi için her zaman aynı çıktıyı üreten ve dış dünyada hiçbir yan etki (side effect) oluşturmayan fonksiyonlardır.',
      category: 'Implementation',
      guruTip: 'Test edilmesi en kolay kod parçalarıdır; öngörülebilir kodun temel taşıdır.'
    },
    {
      id: 37,
      term: 'Scalability (Ölçeklenebilirlik)',
      definition: 'Bir sistemin artan yük karşısında kaynak eklenerek (RAM, CPU veya Sunucu) performansını koruyabilme yeteneğidir.',
      category: 'Quality',
      guruTip: 'Bulut sistemlerde hedef her zaman yatay ölçeklenmedir (Horizontal Scaling); yani sisteme yeni makineler eklemek.'
    },
    {
      id: 38,
      term: 'ACID Prensipleri',
      definition: 'Veritabanı işlemlerinin güvenilirliğini sağlayan 4 temel özelliktir: Atomicity (Atomiklik), Consistency (Tutarlılık), Isolation (İzolasyon), Durability (Dayanıklılık).',
      category: 'Foundation',
      guruTip: 'SQL veritabanlarının sunduğu en büyük güven garantisidir.'
    },
    {
      id: 39,
      term: 'CAP Teoremi',
      definition: 'Dağıtık sistemlerde Tutarlılık (C), Erişilebilirlik (A) ve Bölünme Toleransı (P) özelliklerinden aynı anda sadece ikisinin tam olarak sağlanabileceğini savunan teoridir.',
      category: 'Modern',
      guruTip: 'Veritabanı seçerken hangi özellikten vazgeçeceğinize bu teoreme bakarak karar verirsiniz.'
    },
    {
      id: 40,
      term: 'Technical Debt (Teknik Borç)',
      definition: 'Bir özelliği hızlıca teslim etmek için seçilen kalitesiz kodun, gelecekte yaratacağı ekstra geliştirme maliyeti ve zorluğudur.',
      category: 'Quality',
      guruTip: 'Küçük borçlar yönetilebilir ama temizlenmeyen borçlar zamanla tüm projeyi iflasa (çalışamaz hale) sürükler.'
    },
    {
      id: 41,
      term: 'Refactoring',
      definition: 'Yazılımın dış davranışını değiştirmeden, sadece kod kalitesini ve okunabilirliğini artırmak için yapılan iç yapı iyileştirmesidir.',
      category: 'Implementation',
      guruTip: 'Refactoring yaparken asla yeni özellik eklemeyin; sadece mevcut kodu daha "temiz" hale getirin.'
    },
    {
      id: 42,
      term: 'Fail Fast (Hızlı Hata Verme)',
      definition: 'Bir hata oluştuğunda işlemin anında durdurulup hatanın raporlanması prensibidir. Hatanın sistemin diğer kısımlarına gizlice yayılmasını engeller.',
      category: 'Principle',
      guruTip: 'Girdileri fonksiyonun en başında (Validation) kontrol edin; beklenen bir şey eksikse hemen hata fırlatın.'
    },
    {
      id: 43,
      term: 'Graceful Degradation (Kademeli Azalma)',
      definition: 'Sistemin bir parçası çöktüğünde tüm sistemin durması yerine, kritik olmayan özelliklerin kapatılarak ana işlevlerin çalışmaya devam etmesidir.',
      category: 'Quality',
      guruTip: 'Öneri servisi çöktüğünde tüm site kapanmasın; sadece öneri listesi gizlensin ama kullanıcı alışverişe devam edebilsin.'
    },
    {
      id: 44,
      term: 'Immutable Data (Değişmez Veri)',
      definition: 'Oluşturulduktan sonra içeriği değiştirilemeyen veri yapılarıdır. Değişiklik için yeni bir kopya oluşturulur.',
      category: 'Principle',
      guruTip: 'Değişmez veriler "yan etkileri" (side effects) yok eder ve kodun öngörülebilirliğini artırır.'
    },
    {
      id: 45,
      term: 'Functional Programming',
      definition: 'Yazılımın matematiksel fonksiyonlar ve değişmez veriler üzerine kurulu olduğu programlama paradigmasıdır.',
      category: 'Principle',
      guruTip: 'Map, Filter, Reduce gibi araçlarla karmaşık döngüleri (loops) ve değişken durumları (state) hayatınızdan çıkarın.'
    },
    {
      id: 46,
      term: 'SSOT (Single Source of Truth)',
      definition: 'Bir veri parçasının sistem genelinde tek bir yetkili ve doğru kaynağının olması prensibidir. Veri tutarsızlıklarını önler.',
      category: 'Principle',
      guruTip: 'Bir veri hem DB\'de hem cache\'de farklı hallerdeyse SSOT bozulmuştur; her zaman ana kaynağı baz alın.'
    },
    {
      id: 47,
      term: 'Software Entropy (Yazılım Entropisi)',
      definition: 'Uygulama kodunun zamanla karmaşıklaşması ve düzenini kaybetmesi durumudur. Bakım yapılmayan sistemlerde entropi kaçınılmazdır.',
      category: 'Quality',
      guruTip: 'Entropiyi durduramazsınız ama sürekli Refactoring ile etkisini minimize edebilirsiniz.'
    },
    {
      id: 48,
      term: 'Last Responsible Moment',
      definition: 'Önemli mimari kararları, o kararın verilmemesinin sistemi bozacağı "en son ana" kadar erteleme prensibidir.',
      category: 'Principle',
      guruTip: 'Bilginin en az olduğu başlangıç aşamasında değil, en çok olduğu son aşamada karar vererek hata payını düşürün.'
    },
    {
      id: 49,
      term: 'Law of Demeter (Demeter Yasası)',
      definition: '"En az bilgi prensibi"dir. Bir nesnenin, sadece kendine yakın (kendi parçası olan) nesnelerle konuşması gerektiğini savunur.',
      category: 'OOP',
      guruTip: '`a.getB().getC().execute()` gibi zincirleme çağrılar yapıyorsanız, A nesnesi C hakkında çok fazla şey biliyor demektir.'
    },
    {
      id: 50,
      term: 'Big O Notation (Zaman Karmaşıklığı)',
      definition: 'Veri boyutu arttıkça algoritmanın çalışma süresinin veya bellek kullanımının nasıl ölçeklendiğini ifade eden ölçüdür.',
      category: 'Foundation',
      guruTip: 'Mimaride sadece kodun doğruluğu değil, o işlemin mülakatlarda sorulan O(n) veya O(log n) karmaşıklığı sistemin geleceğini belirler.'
    },
    {
      id: 51,
      term: 'Rate Limiting (Hız Sınırlandırma)',
      definition: 'Bir servise belirli bir zaman diliminde yapılabilecek maksimum istek sayısının kısıtlanmasıdır. Sistemi aşırı yükten korur.',
      category: 'Modern',
      guruTip: 'API\'nizi hem kötü niyetli saldırılara hem de hatalı sonsuz döngü (infinite loop) isteklerine karşı korumanın en etkili yoludur.'
    },
    {
      id: 52,
      term: 'Dead Letter Queue (DLQ)',
      definition: 'İşlenemeyen, hatalı veya süresi dolmuş mesajların sistemde kaybolmaması için toplandığı özel bir "hatalı mesaj" kuyruğudur.',
      category: 'Pattern',
      guruTip: 'Mesaj kuyruğu sistemlerinde hatayı "pas geçmek" yerine DLQ\'ya atarak daha sonra manuel inceleyebilir ve veri kaybını önlersiniz.'
    },
    {
      id: 53,
      term: 'Bulkhead Pattern (Gemi Bölmesi)',
      definition: 'Sistem bileşenlerini birbirinden izole ederek, bir bölümdeki çökmenin tüm sistemi etkilemesini engelleyen dayanıklılık desenidir.',
      category: 'Pattern',
      guruTip: 'Gemi bölmeleri gibi; bir sunucu havuzu çöktüğünde diğerleri "bağımsız kaynaklara" sahip oldukları için çalışmaya devam eder.'
    },
    {
      id: 54,
      term: 'Microservices (Mikroservisler)',
      definition: 'Uygulamanın bağımsız olarak geliştirilebilen ve dağıtılabilen, hafif protokollerle (HTTP, RabbitMQ vb.) haberleşen küçük parçalara bölünmesidir.',
      category: 'Modern',
      guruTip: 'Mikroservisler sadece teknolojik bir tercih değil, aynı zamanda büyük ekipleri birbirinden bağımsızlaştırarak ölçekleme yöntemidir.'
    },
    {
      id: 55,
      term: 'Monolithic Architecture (Monolitik Mimari)',
      definition: 'Uygulamanın tüm bileşenlerinin tek bir birim olarak derlendiği ve dağıtıldığı klasik mimari yapıdır.',
      category: 'Foundation',
      guruTip: 'Küçük ve orta ölçekli projelerde monolitik yapı her zaman daha hızlı, ucuz ve yönetilebilir bir çözümdür.'
    },
    {
      id: 56,
      term: 'Strangler Fig Pattern (Sarmaşık Deseni)',
      definition: 'Eski (Legacy) bir sistemi tek seferde değiştirmek yerine, özelliklerini parça parça yeni mikroservislere taşıyarak zamanla eskiyi etkisiz hale getirme yöntemidir.',
      category: 'Pattern',
      guruTip: 'Eskiyi yıkıp atmak yerine, çevresini yeni servislerle sararak yavaşça dönüştürün.'
    },
    {
      id: 57,
      term: 'Anti-Corruption Layer (ACL)',
      definition: 'Farklı sistemler arasındaki terminoloji ve model farklarını çeviren, eski sistemin "kirli" modellerinin yeni sistemi etkilemesini engelleyen koruyucu katmandır.',
      category: 'DDD',
      guruTip: 'Eski bir veritabanını veya servisi yeni Clean Architecture projenize bağlarken araya mutlaka bir ACL (adaptör) koyun.'
    },
    {
      id: 58,
      term: 'Cache Aside Pattern',
      definition: 'Uygulamanın veriyi önce cache\'de aradığı, bulamazsa ana kaynaktan (DB) okuyup cache\'e yazdığı en yaygın önbellekleme yöntemidir.',
      category: 'Pattern',
      guruTip: 'DB üzerindeki okuma yükünü ve cevap süresini (latency) dramatik şekilde düşürür.'
    },
    {
      id: 59,
      term: 'Blue-Green Deployment',
      definition: 'Sistemin iki aynı ortamda çalıştığı, trafiğin tek seferde eski sürümden (Blue) yenisine (Green) aktarıldığı risksiz dağıtım yöntemidir.',
      category: 'Modern',
      guruTip: 'Hata durumunda trafiği saniyeler içinde eski sürüme geri çekebilirsiniz (Instant Rollback).'
    },
    {
      id: 60,
      term: 'Canary Deployment (Kanarya Dağıtımı)',
      definition: 'Yeni bir sürümün önce küçük bir kullanıcı grubuna açılıp, hata görülmezse kademeli olarak herkese yayılması stratejisidir.',
      category: 'Modern',
      guruTip: 'Kömür madenindeki kanaryalar gibi; eğer küçük grup hata almıyorsa sistem güvenlidir.'
    },
    {
      id: 61,
      term: 'TDD (Test-Driven Development)',
      definition: 'Kod yazılmadan önce testin yazıldığı, testi geçecek kadar kodun eklendiği ve ardından refactoring yapıldığı disiplinli yazılım sürecidir.',
      category: 'Implementation',
      guruTip: 'TDD sadece test yazmak değil, kodun tasarımını en baştan "Clean" yapma sanatıdır.'
    },
    {
      id: 62,
      term: 'Dependency Injection (DI)',
      definition: 'Bir nesnenin ihtiyaç duyduğu diğer nesneleri kendi içinde oluşturmak yerine, dışarıdan (genelde constructor üzerinden) alması yöntemidir.',
      category: 'Implementation',
      guruTip: 'DIP (Dependency Inversion) prensibini uygulamanın en yaygın tekniğidir; test edilebilirliği artırır.'
    },
    {
      id: 63,
      term: 'Lazy Loading (Tembel Yükleme)',
      definition: 'Bir kaynağın (modül, resim, data), sadece ona gerçekten ihtiyaç duyulduğu (erişildiği) anda yüklenmesi stratejisidir.',
      category: 'Pattern',
      guruTip: 'Uygulamanın ilk açılış süresini hızlandırmak için kritik olmayan kısımları sonraya bırakın.'
    },
    {
      id: 64,
      term: 'Impedance Mismatch',
      definition: 'Nesne tabanlı modeller (OOP) ile ilişkisel veritabanı modelleri (SQL) arasındaki yapısal ve anlamsal uyumsuzluktur.',
      category: 'Foundation',
      guruTip: 'ORM araçları bu uyumsuzluğu çözmeye çalışır; ancak karmaşık sorgularda performansı düşürebilirler.'
    },
    {
      id: 65,
      term: 'Convention over Configuration',
      definition: 'Yazılımcıların her şeyi tek tek konfigüre etmek yerine, framework\'ün belirlediği standart isimlendirme ve yapı kurallarına uyarak kod yazmasıdır.',
      category: 'Principle',
      guruTip: 'Ruby on Rails veya Spring gibi yapılarda sık görülür; "Kurala uy, ayar yapma" felsefesidir.'
    },
    {
      id: 66,
      term: 'Feature Toggles (Feature Flags)',
      definition: 'Yeni bir kodun canlıya alınması ile o özelliğin kullanıcılara açılmasını birbirinden ayıran şartlı komutlardır.',
      category: 'Modern',
      guruTip: 'Henüz bitmemiş özellikleri kodun içinde kapalı tutarak güvenle canlıya çıkabilir ve istediğiniz an saniyeler içinde açabilirsiniz.'
    },
    {
      id: 67,
      term: 'Infrastructure as Code (IaC)',
      definition: 'Sunucu, ağ ve veritabanı gibi altyapı bileşenlerinin manuel değil, kod dosyaları üzerinden yönetilmesi ve kurulması yöntemidir.',
      category: 'Modern',
      guruTip: 'Altyapınızı da uygulama kodunuz gibi versiyonlayabilir, test edebilir ve her seferinde aynı sonucu (Idempotency) alabilirsiniz.'
    },
    {
      id: 68,
      term: 'Serverless (Sunucusuz Mimari)',
      definition: 'Sunucu yönetimiyle ilgilenilmediği, kodun sadece ihtiyaç anında (event-driven) çalıştığı ve otomatik ölçeklenen bulut modelidir.',
      category: 'Modern',
      guruTip: 'Sunucu fiziksel olarak vardır; ancak yönetimi tamamen bulut sağlayıcının (AWS, Azure vb.) sorumluluğundadır.'
    },
    {
      id: 69,
      term: 'Race Condition (Yarış Durumu)',
      definition: 'Aynı veriye birden fazla işlemin aynı anda erişip değiştirmeye çalışması sonucu oluşan ve işlemin sonucunu belirsizleştiren hatadır.',
      category: 'Quality',
      guruTip: 'Aynı banka hesabından aynı saniyede farklı yerlerden para çekilmeye çalışılması klasik bir yarış durumu örneğidir.'
    },
    {
      id: 70,
      term: 'Orchestration (Orkestrasyon)',
      definition: 'Mikroservisler arası iş akışının, merkezi bir "orkestra şefi" (bir ana servis) tarafından yönetilmesidir.',
      category: 'Modern',
      guruTip: 'İş akışını tek bir yerden kontrol edip izlemek kolaydır; ancak merkezi servis sistemin darboğazı olabilir.'
    },
    {
      id: 71,
      term: 'Choreography (Koreografi)',
      definition: 'Mikroservislerin merkezi bir şef olmadan, birbirlerinin olaylarını (events) dinleyerek kendi kararlarını vermesidir.',
      category: 'Modern',
      guruTip: 'Servisler daha bağımsızdır; ancak hatayı takip etmek ve akışı görselleştirmek orkestrasyona göre daha zordur.'
    },
    {
      id: 72,
      term: 'Saga Pattern',
      definition: 'Birden fazla servisi kapsayan bir işlemde hata oluştuğunda, önceki başarılı adımları geri almak için "telafi edici" (compensating) işlemler sunan desendir.',
      category: 'Pattern',
      guruTip: 'Mikroservislerde klasik DB transaction\'lar (yaptım/yapmadım) yerine Saga (yapabiliyorsan yap, olmazsa geri al) kullanılır.'
    },
    {
      id: 73,
      term: 'Service Discovery (Servis Keşfi)',
      definition: 'Servislerin birbirlerinin adreslerini ve portlarını dinamik olarak bulmasını sağlayan mekanizmadır.',
      category: 'Modern',
      guruTip: 'Bulut ortamında sunucular sürekli açılıp kapandığı için Service Discovery olmadan servislerin birbirini bulması imkansızdır.'
    },
    {
      id: 74,
      term: 'Sidecar Pattern',
      definition: 'Bir ana servisin yanına, ona destekleyici özellikler (loglama, güvenlik, proxy) eklemek için kurulan yardımcı servistir.',
      category: 'Pattern',
      guruTip: 'Uygulama kodunuzu kirletmeden servisler arası iletişimi (Service Mesh gibi) yönetmenin en temiz yoludur.'
    },
    {
      id: 75,
      term: 'Domain Event',
      definition: 'İş akışı (Business) açısından önemli olan ve geçmişte gerçekleşmiş bir olayı temsil eden nesnedir (Örn: SiparişTamamlandı).',
      category: 'DDD',
      guruTip: 'Event isimleri her zaman geçmiş zaman (Past Tense) olmalıdır; "Ordered", "PaymentFailed" gibi.'
    },
    {
      id: 76,
      term: 'In-Memory Database',
      definition: 'Veriyi disk yerine doğrudan RAM üzerinde tutan ve çok düşük cevap süresine sahip veritabanlarıdır (Örn: Redis).',
      category: 'Modern',
      guruTip: 'Yüksek trafikli sistemlerde cache (önbellek) veya geçici veri saklama için vazgeçilmezdir.'
    },
    {
      id: 77,
      term: 'Shared Kernel',
      definition: 'İki veya daha fazla Bounded Context (veya ekip) arasında paylaşılan, üzerindeki değişikliklerin ortak karar gerektirdiği kod parçasıdır.',
      category: 'DDD',
      guruTip: 'Ekipler arasında bağımlılık yarattığı için mümkün olduğunca dar (minimal) tutulmalıdır.'
    },
    {
      id: 78,
      term: 'Load Balancer (Yük Dengeleyici)',
      definition: 'Gelen ağ trafiğini birden fazla sunucuya dağıtarak sistemin aşırı yüklenmesini önleyen ve erişilebilirliği artıran yapıdır.',
      category: 'Modern',
      guruTip: 'Sunuculardan biri çökerse, trafiği saniyeler içinde sağlıklı sunuculara yönlendirerek sistemin ayakta kalmasını sağlar.'
    },
    {
      id: 79,
      term: 'Data Lake (Veri Gölü)',
      definition: 'Ham verinin orijinal formatında, filtrelenmeden ve yapılandırılmadan saklandığı devasa veri depolama alanıdır.',
      category: 'Modern',
      guruTip: 'Henüz ne amaçla kullanılacağı belli olmayan "büyük verinin" posasını çıkarmadan saklandığı yerdir.'
    },
    {
      id: 80,
      term: 'Data Warehouse (Veri Ambarı)',
      definition: 'Farklı kaynaklardan gelen verilerin temizlenip iş kararları (Business Intelligence) için yapılandırılmış şekilde saklandığı depodur.',
      category: 'Modern',
      guruTip: 'Veri gölü hamdır; veri ambarı ise işlenmiş, filtrelenmiş ve analize hazır sistemdir.'
    },
    {
      id: 81,
      term: 'SPOF (Single Point of Failure)',
      definition: 'Sistemin bir parçası çöktüğünde tüm sistemin çalışamaz hale geldiği "tek hata noktaları"dır.',
      category: 'Quality',
      guruTip: 'Yüksek erişilebilirlik (HA) için mimarinizdeki her SPOF\'u tespit edip yedeklemeli (redundancy) ve izole etmelisiniz.'
    },
    {
      id: 82,
      term: 'Micro-kernel Architecture',
      definition: 'Sistemin temel bir çekirdek (core) ve bu çekirdeğe eklenen eklentiler (plug-ins) üzerine kurulu olduğu mimari yapıdır.',
      category: 'Pattern',
      guruTip: 'VS Code gibi araçlar en iyi örneğidir; ana uygulama değişmez ama eklentilerle sonsuza kadar genişletilebilir.'
    },
    {
      id: 83,
      term: 'Big Ball of Mud (Çamur Yığını)',
      definition: 'Belirgin bir mimari yapısı olmayan, bileşenlerin birbirine sıkı sıkıya geçtiği ve kontrol edilemez hale geldiği sistem durumudur.',
      category: 'Quality',
      guruTip: 'Mimarisi olmayan veya disiplini elden bırakan her proje eninde sonunda "Çamur Yığınına" dönüşür.'
    },
    {
      id: 84,
      term: 'Leaky Abstraction (Sızdıran Soyutlama)',
      definition: 'Bir soyutlamanın (interface), saklaması gereken karmaşık detayları dışarı sızdırması durumudur.',
      category: 'Principle',
      guruTip: 'Her soyutlama bir yere kadar detayları saklar; ancak soyutlama üzerinden detaya müdahale etmeniz gerekiyorsa "sızdırma" var demektir.'
    },
    {
      id: 85,
      term: 'Anemic Domain Model (Anemik Model)',
      definition: 'Domain nesnelerinin sadece veri (property) taşıdığı, iş mantığının (business logic) ise dış servislerde toplandığı anti-pattern yapıdır.',
      category: 'DDD',
      guruTip: 'Zengin (Rich) Domain Model\'in zıttıdır; nesne yönelimli programlama yerine prosedürel programlamaya yol açar.'
    },
    {
      id: 86,
      term: 'Nanoservices (Nano-servisler)',
      definition: 'Servislerin yönetilemeyecek kadar küçük parçalara bölünmesi durumudur. Gereksiz ağ trafiği ve karmaşıklığa yol açan bir anti-pattern kabul edilir.',
      category: 'Modern',
      guruTip: 'Servislerin birbiriyle haberleşme maliyeti, yaptıkları işten daha fazlaysa muhtemelen "Nano-servis" batağına düşmüşsünüzdür.'
    },
    {
      id: 87,
      term: 'Two-Phase Commit (2PC)',
      definition: 'Dağıtık bir işlemde (Transaction) tüm katılımcıların değişikliği onaylamasını garanti eden "Hazırlık" ve "Onay" aşamalarından oluşan protokoldür.',
      category: 'Modern',
      guruTip: 'Merkezi bir şefe ihtiyaç duyar ve sistemi yavaşlatabilir; mikroservislerde yerini Saga Pattern\'e bırakmıştır.'
    },
    {
      id: 88,
      term: 'Message-Driven Architecture',
      definition: 'Servislerin birbirlerine hafif mesajlar (payload) göndererek haberleştiği mimaridir. Event-Driven\'dan farkı; mesajın genellikle bir alıcısı ve amacının olmasıdır.',
      category: 'Modern',
      guruTip: 'Event-Driven "bir şey oldu" der; Message-Driven ise "şunu yap" (command) der.'
    },
    {
      id: 89,
      term: 'Polymorphism (Çok Biçimlilik)',
      definition: 'Aynı arayüze (interface) sahip farklı nesnelerin, aynı işleme (metot) farklı şekillerde cevap verebilme kabiliyetidir.',
      category: 'OOP',
      guruTip: 'Karmaşık if-else veya switch bloklarından kurtulmanın ve kodu esnek tutmanın en temel yoludur.'
    },
    {
      id: 90,
      term: 'Database Sharding (Veritabanı Parçalama)',
      definition: 'Devasa bir veritabanının, performans için daha küçük ve yönetilebilir parçalara (shards) bölünerek farklı sunucularda saklanmasıdır.',
      category: 'Modern',
      guruTip: 'Milyarlarca satırlık veriyi tek sunucuda tutmak yerine, kullanıcı ID\'sine göre farklı sunuculara dağıtarak yükü bölersiniz.'
    },
    {
      id: 91,
      term: 'Read Replicas (Okuma Kopyaları)',
      definition: 'Ana veritabanının sadece okuma yetkisine sahip kopyalarıdır. Okuma yükünü ana sunucudan (Master) alarak sistemi hızlandırır.',
      category: 'Modern',
      guruTip: 'Yazma işlemleri Master sunucuya, yoğun raporlama ve listeleme işlemleri ise kopyalara (Replica) yönlendirilir.'
    },
    {
      id: 92,
      term: 'Service Mesh',
      definition: 'Mikroservisler arası iletişimi, güvenliği ve gözlemlenebilirliği yöneten, uygulama kodundan bağımsız bir altyapı katmanıdır (Örn: Istio).',
      category: 'Modern',
      guruTip: 'Servislerin birbirini nasıl bulacağı ve güvenli konuşacağı işini uygulama kodundan alıp altyapıya devreder.'
    },
    {
      id: 93,
      term: 'Circular Dependency (Döngüsel Bağımlılık)',
      definition: 'İki veya daha fazla modülün doğrudan veya dolaylı olarak birbirine bağımlı olması durumudur. Mimari bir hatadır.',
      category: 'Quality',
      guruTip: 'A, B\'ye; B de A\'ya muhtaçsa bu projeyi derlemek ve test etmek imkansızlaşır; bağımlılığı interface kullanarak kırmalısınız.'
    },
    {
      id: 94,
      term: 'SRP (Single Responsibility Principle)',
      definition: 'Bir sınıfın veya modülün değişmesi için sadece tek bir nedeni olması gerektiğini savunan prensiptir. Her parça sadece tek bir işe odaklanmalıdır.',
      category: 'SOLID',
      guruTip: 'Eğer bir sınıf hem DB\'ye veri yazıyor hem de rapor formatlıyorsa, SRP\'yi ihlal ediyordur.'
    },
    {
      id: 95,
      term: 'OCP (Open-Closed Principle)',
      definition: 'Yazılım varlıklarının (sınıf, modül) gelişime açık, ancak değişime kapalı olması gerektiğini savunan prensiptir.',
      category: 'SOLID',
      guruTip: 'Yeni bir özellik eklemek için mevcut kodu değiştirmek yerine, bir interface üzerinden yeni bir implementasyon eklemelisiniz.'
    },
    {
      id: 96,
      term: 'LSP (Liskov Substitution Principle)',
      definition: 'Alt sınıfların, türetildikleri üst sınıfın yerine hiçbir davranış bozukluğu yaratmadan kullanılabileceği prensibidir.',
      category: 'SOLID',
      guruTip: 'Bir metodun alt sınıfta "geçersiz (empty)" veya "hata fırlatan" şekilde ezilmesi (override), LSP\'nin bozulduğuna işarettir.'
    },
    {
      id: 97,
      term: 'ISP (Interface Segregation Principle)',
      definition: 'İstemcilerin kullanmadıkları metotları barındıran büyük arayüzlere zorlanmaması, bunun yerine daha küçük ve spesifik arayüzler kurulmasıdır.',
      category: 'SOLID',
      guruTip: 'Dev bir "ICrud" yerine "IRead" ve "IWrite" gibi parçalı interface\'ler yapmak ISP\'yi destekler.'
    },
    {
      id: 98,
      term: 'Continuous Integration (CI)',
      definition: 'Yazılımcıların kod değişikliklerini sık sık ana branşa gönderdiği ve her gönderimin otomatik testlerle doğrulandığı süreçtir.',
      category: 'Modern',
      guruTip: 'Hataları erkenden bulmayı sağlar ve "benim bilgisayarımda çalışıyordu" sorununu ortadan kaldırır.'
    },
    {
      id: 99,
      term: 'Continuous Deployment (CD)',
      definition: 'Testlerden başarıyla geçen her kodun, insan müdahalesi olmadan otomatik olarak canlı ortama (production) alınması sürecidir.',
      category: 'Modern',
      guruTip: 'Eğer canlıya çıkmak için hala birinin butona basması gerekiyorsa, buna Continuous Delivery denir; tamamen otomatikse Deployment\'tır.'
    },
    {
      id: 100,
      term: 'Dark Launching',
      definition: 'Yeni bir özelliğin tüm kodunun canlıya alınması ancak kullanıcıya gösterilmeden arka planda (yük testi vb. için) çalıştırılması yöntemidir.',
      category: 'Modern',
      guruTip: 'Sistemi gerçek trafik altında test etmenize ve riskleri saniyeler içinde fark etmenize olanak tanır.'
    },
    {
      id: 101,
      term: 'SLA (Service Level Agreement)',
      definition: 'Bir servisin sunduğu hizmet kalitesinin (uptime, performans vb.) teknik ve hukuki olarak taahhüt edildiği belgedir.',
      category: 'Quality',
      guruTip: 'Eğer mimariniz %99.9 uptime (SLA) garantisi veriyorsa, sistemin yıllık toplam kapalı kalma hakkı sadece 8 saattir.'
    },
    {
      id: 102,
      term: 'Failover (Hata Toleransı)',
      definition: 'Bir sistem veya sunucu çöktüğünde, trafiğin kesintisiz bir şekilde otomatik olarak yedek (standby) sisteme aktarılması sürecidir.',
      category: 'Modern',
      guruTip: 'Yüksek erişilebilirlik (HA) için kritik bir adımdır; kullanıcı genellikle sunucunun değiştiğini bile hissetmez.'
    },
    {
      id: 103,
      term: 'Disaster Recovery (DR)',
      definition: 'Deprem, yangın gibi büyük felaketlerden sonra, sistemin farklı bir coğrafi bölgede yeniden ayağa kaldırılmasını kapsayan kurtarma planıdır.',
      category: 'Modern',
      guruTip: 'Yedeklerin aynı veri merkezinde olması felaket durumunda yetersizdir; coğrafi yedeklilik (Geo-Redundancy) şarttır.'
    },
    {
      id: 104,
      term: 'Multi-tenancy',
      definition: 'Tek bir yazılım örneğinin, verileri birbirinden tamamen izole şekilde birden fazla farklı müşteriye hizmet verebilmesi mimarisidir.',
      category: 'Modern',
      guruTip: 'SaaS (Software as a Service) uygulamalarının temelidir; operasyonel maliyeti ciddi oranda düşürür.'
    },
    {
      id: 105,
      term: 'Salami Slicing (Salam Dilimleme)',
      definition: 'Büyük ve karmaşık bir problemi veya sistemi, yönetilebilir en küçük ve anlamlı parçalara ayırarak adım adım çözme stratejisidir.',
      category: 'Principle',
      guruTip: 'Monolitik bir yapıyı mikroservislere bölerken "her şeyi aynı anda" değil, dilimleyerek (slice by slice) ilerlemelisiniz.'
    },
    {
      id: 106,
      term: 'Retry Pattern',
      definition: 'Başarısız olan bir işlemi, hatanın geçici olduğunu varsayarak belirli aralıklarla otomatik olarak yeniden deneme yöntemidir.',
      category: 'Pattern',
      guruTip: 'Sistemi yormamak için her deneme arasına giderek artan bir bekleme süresi (Exponential Backoff) koymalısınız.'
    },
    {
      id: 107,
      term: 'Fallback Pattern',
      definition: 'Bir servis tamamen çöktüğünde kullanıcıya hata göstermek yerine, önceden belirlenmiş varsayılan bir işlemi veya yedek veriyi dönme yöntemidir.',
      category: 'Pattern',
      guruTip: 'Anlık fiyat bilgisi gelmiyorsa son kaydedilen fiyatı göstermek veya "Hizmet verilemiyor" yerine statik bir sayfa sunmak bir fallback\'tir.'
    },
    {
      id: 108,
      term: 'Message Queue (Mesaj Kuyruğu)',
      definition: 'Sistemler arası asenkron iletişimi sağlayan, mesajları sıraya alan ve alıcı servis hazır olana kadar saklayan aracılardır (Örn: RabbitMQ, Kafka).',
      category: 'Modern',
      guruTip: 'Servislerin birbiriyle doğrudan (senkron) bağlı olmasını engelleyerek bağımlılıkları koparır (Decoupling).'
    },
    {
      id: 109,
      term: 'Self-Healing (Kendi Kendini İyileştirme)',
      definition: 'Sistemin bir hatayı insan müdahalesi olmadan otomatik algılayıp servisi yeniden başlatma veya kaynakları düzenleme yoluyla sağlığına kavuşması yeteneğidir.',
      category: 'Modern',
      guruTip: 'Bulut sistemlerde çöken bir sunucunun yerine otomatik olarak yenisinin açılması en yaygın self-healing örneğidir.'
    },
    {
      id: 110,
      term: 'Distributed Monolith (Dağıtık Monolit)',
      definition: 'Servislerin mikroservis gibi ayrı olduğu ama aslında birbirlerine sıkı (coupled) bağlı olduğu, birindeki hatanın tüm sistemi kilitlediği mimari hatadır.',
      category: 'Modern',
      guruTip: 'Mikroservislerin esnekliğine sahip değildir ama mikroservislerin tüm ağ karmaşıklığına ve gecikmesine sahiptir.'
    },
    {
      id: 111,
      term: 'Context Mapping',
      definition: 'Farklı Bounded Context\'ler (ekipler/servisler) arasındaki hem teknik hem de organizasyonel ilişkileri tanımlayan stratejik haritalama yöntemidir.',
      category: 'DDD',
      guruTip: 'Ekipler arasındaki güç dengesini (Upstream/Downstream) ve veri akışını anlamak için kullanılır.'
    },
    {
      id: 112,
      term: 'Domain-Driven Design (DDD)',
      definition: 'Yazılımın merkezine teknik detayları değil, üzerinde çalışılan iş dünyasını (domain) ve bu dünyanın mantığını koyan tasarım yaklaşımıdır.',
      category: 'DDD',
      guruTip: 'DDD sadece kod yazmak değil; iş birimiyle ortak dil kurma ve karmaşık problemleri küçük sınırlara (Bounded Context) bölme sanatıdır.'
    },
    {
      id: 113,
      term: 'Server-Side Rendering (SSR)',
      definition: 'Web sayfasının HTML içeriğinin tarayıcıya gitmeden önce sunucu tarafında oluşturulması yöntemidir. SEO ve ilk açılış hızı için önemlidir.',
      category: 'Foundation',
      guruTip: 'Kullanıcının boş bir beyaz sayfa yerine hazır içeriği anında görmesini sağlar; e-ticaret gibi yerlerde hayati önem taşır.'
    },
    {
      id: 114,
      term: 'Client-Side Rendering (CSR)',
      definition: 'Web sayfasının içeriğinin tarayıcıya boş bir şablon olarak gönderilip, tüm tasarımın tarayıcıdaki JavaScript ile oluşturulmasıdır.',
      category: 'Foundation',
      guruTip: 'Zengin kullanıcı deneyimi (SPA) sağlar; ancak ilk açılış hızı ve SEO için SSR kadar başarılı değildir.'
    },
    {
      id: 115,
      term: 'Static Site Generation (SSG)',
      definition: 'Web sayfalarının inşa anında (build time) bir kez oluşturulup statik dosyalar olarak saklanmasıdır. En hızlı yükleme yöntemidir.',
      category: 'Foundation',
      guruTip: 'Blog, dökümantasyon gibi sık değişmeyen içerikler için rakipsizdir; her istekte sunucu yorulmaz.'
    },
    {
      id: 116,
      term: 'Hydration (Hidrasyon)',
      definition: 'Sunucudan gelen statik HTML\'in üzerine JavaScript yüklenerek sayfanın interaktif (dinamik) hale getirilmesi sürecidir.',
      category: 'Implementation',
      guruTip: 'SSR/SSG sonrası sayfanın "canlanma" anıdır; bu esnada sayfa görünür ama çok kısa bir an tıklanamaz olabilir.'
    },
    {
      id: 117,
      term: 'Edge Computing',
      definition: 'İşlemlerin merkezi bir sunucu yerine, kullanıcıya en yakın coğrafi noktadaki (Edge sunucular) sunucularda yapılmasıdır.',
      category: 'Modern',
      guruTip: 'Dünyanın öbür ucundaki kullanıcıya bile saniyeler içinde değil, milisaniyeler içinde cevap vermenizi sağlar.'
    },
    {
      id: 118,
      term: 'FaaS (Function as a Service)',
      definition: 'Yazılımın sunucu yönetimi olmadan, bağımsız fonksiyonlar (Örn: AWS Lambda) halinde buluta yüklendiği ve sadece çalıştığı sürece ödeme yapılan modeldir.',
      category: 'Modern',
      guruTip: 'Sürekli çalışan bir sunucu maliyetinden kurtulup, sadece iş yapıldığında (request bazlı) maliyet oluşturur.'
    },
    {
      id: 119,
      term: 'Cloud Native (Bulut Yerlisi)',
      definition: 'Uygulamaların bulut ortamının sunduğu esneklik, ölçeklenebilirlik ve konteyner avantajlarını kullanacak şekilde baştan tasarlanmasıdır.',
      category: 'Modern',
      guruTip: 'Sadece eski bir uygulamayı buluta taşımak değildir; mimariyi bulutun dinamik yapısına (mikroservis, CI/CD) göre kurmaktır.'
    },
    {
      id: 120,
      term: 'Distributed Tracing',
      definition: 'Bir isteğin (request) mikroservisler arasında dolaşırken izlediği yolu ve her durakta harcadığı süreyi takip etme yöntemidir.',
      category: 'Modern',
      guruTip: 'Onlarca servisten geçen bir işlemin tam olarak nerede yavaşladığını veya nerede hata aldığını bulmanın tek yoludur.'
    },
    {
      id: 121,
      term: 'SLO (Service Level Objective)',
      definition: 'Bir servisin performansı için mühendislik ekipleri tarafından belirlenen ölçülebilir teknik hedeflerdir (Örn: Cevap süresi < 100ms).',
      category: 'Quality',
      guruTip: 'SLA hukuki bir taahhüttür; SLO ise ekibin mimari kararlarını yönlendiren teknik bir pusuladır.'
    },
    {
      id: 122,
      term: 'Database Indexing',
      definition: 'Veritabanındaki arama işlemlerini hızlandırmak için oluşturulan (kitap fihristi gibi çalışan) veri yapılarıdır.',
      category: 'Foundation',
      guruTip: 'Doğru indeksleme okuma performansını uçurur; ancak gereksiz indeksler yazma (Insert/Update) hızını yavaşlatır.'
    },
    {
      id: 123,
      term: 'Query Optimization',
      definition: 'Sorguların en az kaynak tüketerek ve en kısa sürede sonuç verecek şekilde iyileştirilmesi sürecidir.',
      category: 'Implementation',
      guruTip: 'Sadece ihtiyacınız olan kolonları çekerek (Select * yerine) veritabanı ve ağ yükünü azaltın.'
    },
    {
      id: 124,
      term: 'Deadlock (Ölümcül Kilitlenme)',
      definition: 'İki işlemin birbirinin elindeki kaynağı bırakmasını sonsuza kadar beklemesi sonucu oluşan kilitlenme durumudur.',
      category: 'Quality',
      guruTip: 'İşlemlerin kaynakları her zaman aynı sırayla talep etmesini sağlayarak deadlock riskini minimize edebilirsiniz.'
    },
    {
      id: 125,
      term: 'Normalization (Normalizasyon)',
      definition: 'Veri tekrarını önlemek ve tutarlılığı sağlamak için veritabanı tablolarını belirli kurallara göre organize etme sürecidir.',
      category: 'Foundation',
      guruTip: 'Veri bütünlüğü için kritiktir; ancak bazen performans için kasten normalizasyonun dışına çıkılabilir (Denormalizasyon).'
    },
    {
      id: 126,
      term: 'REST (REpresentational State Transfer)',
      definition: 'HTTP protokolünü kullanarak kaynak tabanlı haberleşme sağlayan, durumsuz (stateless) ve yaygın web servis standartıdır.',
      category: 'Foundation',
      guruTip: 'GET, POST, PUT gibi standart HTTP metotlarını kullanarak evrensel bir iletişim dili oluşturur.'
    },
    {
      id: 127,
      term: 'GraphQL',
      definition: 'İstemcinin tam olarak hangi verilere ihtiyacı olduğunu tanımlayabildiği, esnek ve güçlü bir API sorgu dilidir.',
      category: 'Modern',
      guruTip: 'Gereksiz veri alışverişini (over-fetching) önleyerek mobil uygulamalarda ve karmaşık frontend yapılarında performans sağlar.'
    },
    {
      id: 128,
      term: 'gRPC',
      definition: 'Google tarafından geliştirilen, binary formatta (Protocol Buffers) yüksek performanslı ve düşük gecikmeli haberleşme sağlayan protokoldür.',
      category: 'Modern',
      guruTip: 'Özellikle mikroservislerin birbirleriyle çok hızlı ve az kaynak tüketerek konuşması gereken iç ağlarda tercih edilir.'
    },
    {
      id: 129,
      term: 'WebSockets',
      definition: 'Browser ve sunucu arasında sürekli açık kalan bir bağlantı üzerinden çift yönlü ve anlık veri iletimi sağlayan teknolojidir.',
      category: 'Modern',
      guruTip: 'Borsa ekranları, canlı sohbet veya oyun gibi "gerçek zamanlı" veri akışı gerektiren yerlerde rakipsizdir.'
    },
    {
      id: 130,
      term: 'Semantic Versioning (SemVer)',
      definition: 'Yazılım sürümlerini MAJOR.MINOR.PATCH formatında (Örn: 2.1.4) yönetme kuralıdır. Geriye dönük uyumluluk bozulursa MAJOR versiyon artar.',
      category: 'Principle',
      guruTip: 'Sürüm numaralarını kodunuzdaki değişimin kullanıcı üzerindeki etkisine göre artırmalısınız.'
    },
    {
      id: 131,
      term: 'Authentication vs Authorization',
      definition: 'Authentication "Sen kimsin?" (Kimlik Doğrulama), Authorization ise "Senin bu sistemde neye yetkin var?" (Yetkilendirme) sorusuna cevap verir.',
      category: 'Quality',
      guruTip: 'Sisteme giriş yapabilmek (Authn), her veriyi silebilmek (Authz) anlamına gelmez.'
    },
    {
      id: 132,
      term: 'JWT (JSON Web Token)',
      definition: 'Taraflar arasında güvenli veri taşımayı sağlayan, imzalanmış ve kompakt bir JSON formatıdır. Genellikle durumsuz (stateless) oturum takibi için kullanılır.',
      category: 'Modern',
      guruTip: 'Token içeriği şifreli değildir, sadece imzalıdır; yani içeriği herkes görebilir ama kimse imzanız olmadan değiştiremez.'
    },
    {
      id: 133,
      term: 'OAuth 2.0',
      definition: 'Kullanıcı şifresini paylaşmadan, bir uygulamaya sınırlı yetki (Örn: Google ile Giriş) verilmesini sağlayan yetkilendirme standardıdır.',
      category: 'Modern',
      guruTip: 'Kullanıcının tüm verilerine değil, sadece "profil görme" gibi sınırlandırılmış alanlara (Scope) erişim izni vermenizi sağlar.'
    },
    {
      id: 134,
      term: 'SQL (İlişkisel Veritabanı)',
      definition: 'Verinin birbirine bağlı tablolar şeklinde saklandığı, katı bir şemaya (schema) sahip ve ACID garantisi sunan sistemlerdir.',
      category: 'Foundation',
      guruTip: 'Finansal işlemler gibi veri tutarlılığının (Consistency) hayati olduğu yerlerde ilk tercihiniz olmalıdır.'
    },
    {
      id: 135,
      term: 'NoSQL (İlişkisel Olmayan Veritabanı)',
      definition: 'Sabit bir şema gerektirmeyen, yatayda kolayca ölçeklenebilen ve farklı veri modelleri (Doküman, Key-Value) kullanan sistemlerdir.',
      category: 'Modern',
      guruTip: 'Dinamik veri yapıları ve devasa trafik altında yüksek performans ile ölçeklenebilirlik için idealdir.'
    },
    {
      id: 136,
      term: 'BASE Prensipleri',
      definition: 'NoSQL sistemlerin felsefesidir: Basically Available (Temel Erişilebilirlik), Soft State (Esnek Durum), Eventual Consistency (Nihai Tutarlılık).',
      category: 'Modern',
      guruTip: 'Anlık tutarlılık (Consistency) yerine sistemin her an erişilebilir (Availability) olmasına odaklanan yapıların temelidir.'
    },
    {
      id: 137,
      term: 'ORM (Object-Relational Mapping)',
      definition: 'Veritabanındaki tabloları kod tarafındaki nesnelere otomatik olarak haritalayan araçlardır (Örn: TypeORM, Hibernate).',
      category: 'Implementation',
      guruTip: 'Kod yazmayı hızlandırır ama arkada ürettiği karmaşık SQL sorguları bazen performansı düşürebilir; "N+1 sorgu" hatasına dikkat edilmelidir.'
    },
    {
      id: 138,
      term: 'N+1 Query Problem',
      definition: 'Bir veri listesini çekerken, listedeki her bir öğenin ilişkili detayı için veritabanına ayrı ayrı sorgu atılması sonucu oluşan performans hatasıdır.',
      category: 'Implementation',
      guruTip: '100 öğe için 101 sorgu atmak yerine, "Join" veya "Eager Loading" kullanarak tüm veriyi tek bir sorguda getirin.'
    },
    {
      id: 139,
      term: 'Cyclomatic Complexity',
      definition: 'Bir kod parçasındaki karar noktalarının (if-else, döngüler) sayısına dayalı sayısal bir karmaşıklık ölçüsüdür.',
      category: 'Quality',
      guruTip: 'Bu sayı ne kadar yüksekse kodun test edilmesi o kadar zordur; karmaşıklığı azaltmak için kodu küçük fonksiyonlara bölün.'
    },
    {
      id: 140,
      term: 'Loose Coupling (Gevşek Bağlılık)',
      definition: 'Modüllerin birbirlerinin iç yapısına dair minimum bilgiye sahip olması ve genellikle arayüzler (interface) üzerinden haberleşmesidir.',
      category: 'Quality',
      guruTip: 'Esnek bir mimarinin anahtarıdır; bir parçayı değiştirdiğinizde diğer parçaların etkilenmemesini sağlar.'
    },
    {
      id: 141,
      term: 'Tight Coupling (Sıkı Bağlılık)',
      definition: 'Modüllerin birbirine aşırı bağımlı olması, birindeki küçük bir değişikliğin diğer tüm birimleri bozma riski taşıması durumudur.',
      category: 'Quality',
      guruTip: 'Sıkı bağlı sistemlerin bakımı çok zordur; bağımlılıkları Dependency Injection kullanarak gevşetmelisiniz.'
    },
    {
      id: 142,
      term: 'Cognitive Load (Bilişsel Yük)',
      definition: 'Bir yazılımcının kodun nasıl çalıştığını anlaması için zihninde tutması gereken bilgi miktarıdır.',
      category: 'Quality',
      guruTip: 'Bilişsel yükü düşük tutmak için kodu mümkün olduğunca tahmin edilebilir ve basit (KISS) yazın.'
    },
    {
      id: 143,
      term: 'Bus Factor (Otobüs Faktörü)',
      definition: 'Projedeki kritik bilgilerin kaç kişide olduğunu ölçen risk göstergesidir (Örn: "Otobüs çarparsa" proje ne olur?).',
      category: 'Quality',
      guruTip: 'Bus Factor ne kadar yüksekse (bilgi ne kadar çok kişiyle paylaşılmışsa) proje o kadar güvendedir.'
    },
    {
      id: 144,
      term: 'Gold Plating (Altın Kaplama)',
      definition: 'Müşterinin talep etmediği, sisteme değer katmayan ama yazılımcının "daha iyi olur" diyerek eklediği gereksiz özelliklerdir.',
      category: 'Principle',
      guruTip: 'Gereksiz detaylar sadece zaman kaybı değil, aynı zamanda gelecekte bakım maliyeti yaratacak bir teknik borçtur.'
    },
    {
      id: 145,
      term: 'Premature Optimization',
      definition: 'Henüz sistemin hangi kısmı yavaş belli değilken, performans için kodu karmaşıklaştırma hatasıdır.',
      category: 'Principle',
      guruTip: 'Önce doğru çalıştırın, sonra darboğazları (bottleneck) ölçün ve sadece o noktaları optimize edin.'
    },
    {
      id: 146,
      term: 'Chaos Engineering',
      definition: 'Sistemin beklenmedik hatalara (sunucu çökmesi, ağ kopması vb.) karşı ne kadar dayanıklı olduğunu ölçmek için canlı sisteme kasıtlı olarak hatalar verme disiplinidir.',
      category: 'Modern',
      guruTip: 'Hataları gerçek bir kriz anında değil, kontrollü bir ortamda görüp önlem almanızı sağlar (Örn: Netflix Chaos Monkey).'
    },
    {
      id: 147,
      term: 'SLI (Service Level Indicator)',
      definition: 'Bir servisin durumunu anlık olarak gösteren spesifik bir metriktir (Örn: Hata oranı, gecikme süresi).',
      category: 'Quality',
      guruTip: 'SLA hukuki sözdür, SLO teknik hedeftir, SLI ise o anki gerçek durumun ölçümüdür.'
    },
    {
      id: 148,
      term: 'Rubber Duck Debugging',
      definition: 'Bir hatayı çözmek için kodu cansız bir varlığa (örneğin lastik bir ördeğe) satır satır sesli anlatma yöntemidir.',
      category: 'Implementation',
      guruTip: 'Anlatırken beyniniz kodu farklı bir perspektifle görür ve hatayı genellikle kimse size cevap vermeden kendiniz bulursunuz.'
    },
    {
      id: 149,
      term: 'Pair Programming (Eşli Programlama)',
      definition: 'İki yazılımcının tek bir bilgisayarda, birinin kod yazdığı (driver) diğerinin ise yönlendirdiği (navigator) çalışma yöntemidir.',
      category: 'Principle',
      guruTip: 'Bilgi paylaşımını artırır, kod kalitesini yükseltir ve Otobüs Faktörü (Bus Factor) riskini azaltır.'
    },
    {
      id: 150,
      term: 'Code Coverage (Kod Kapsamı)',
      definition: 'Yazılan otomatik testlerin, kaynak kodun yüzde kaçını çalıştırdığını gösteren metriktir.',
      category: 'Quality',
      guruTip: '%100 kapsam her zaman kusursuz kod demek değildir; asıl hedef kritik iş mantığının (logic) doğru test edilmesidir.'
    },
    {
      id: 151,
      term: 'Legacy Code (Miras Kod)',
      definition: 'Testi olmayan, dökümantasyonu eksik veya teknolojisi eskimiş olmasına rağmen canlıda çalışan ve değiştirilmesi riskli koddur.',
      category: 'Quality',
      guruTip: 'Legacy koddan korkmayın; onu testlerle sararak (Strangler Pattern gibi) güvenli bir şekilde modernleştirin.'
    },
    {
      id: 152,
      term: 'Technical Excellence',
      definition: 'Sadece "çalışan" kod değil; temiz, esnek ve sürdürülebilir kod yazma disiplini ve tutkusudur.',
      category: 'Principle',
      guruTip: 'Kod kalitesine verilen önem, uzun vadede geliştirme hızını ve sistemin ömrünü artıran en büyük yatırımdır.'
    },
    {
      id: 153,
      term: 'NIH Syndrome (Biz Yapmadık Sendromu)',
      definition: 'Hazır ve kaliteli bir kütüphaneyi/aracı kullanmak yerine, "en iyisini biz yaparız" diyerek her şeyi sıfırdan yazma eğilimidir.',
      category: 'Quality',
      guruTip: 'Tekerleği yeniden icat etmek yerine işinize (Domain) odaklanın; standart çözümleri kullanmak ayıp değildir.'
    },
    {
      id: 154,
      term: 'Boy Scout Rule (İzci Kuralı)',
      definition: '"Kodu bulduğundan daha temiz bırak" prensibidir. Her dokunduğunuz dosyada ufak bir iyileştirme yapmayı hedefler.',
      category: 'Principle',
      guruTip: 'Büyük refactoringler için vaktiniz olmasa bile, bir değişken adını düzeltmek veya gereksiz bir boşluğu silmek bu kurala uymaktır.'
    },
    {
      id: 155,
      term: 'Feature Creep (Kapsam Kayması)',
      definition: 'Projenin başlangıçtaki net hedeflerinden sapıp sürekli yeni ve bazen gereksiz özelliklerle karmaşıklaşması durumudur.',
      category: 'Principle',
      guruTip: 'Odağınızı kaybetmemek için MVP (Minimum Viable Product) sınırlarına sadık kalın ve gereksiz özelliklerden kaçının.'
    },
    {
      id: 156,
      term: 'Over-engineering (Aşırı Mühendislik)',
      definition: 'Basit bir probleme gereğinden fazla karmaşık, çok esnek ama bakımı ve anlaması zor çözümler üretme hatasıdır.',
      category: 'Quality',
      guruTip: 'Gelecekte ihtiyaç duyabileceğiniz her ihtimali şimdiden kodlamayın; basitliğin (KISS) gücüne güvenin.'
    },
    {
      id: 157,
      term: 'Smoke Test (Duman Testi)',
      definition: 'Yeni bir kodun veya sürümün en temel işlevlerinin (Örn: Giriş yapma, sayfanın açılması) çalışıp çalışmadığını kontrol eden hızlı testlerdir.',
      category: 'Quality',
      guruTip: 'Ayrıntılı testlere geçmeden önce sistemin "yanıp yanmadığını" (çöküp çökmediğini) anlamak için yapılan ilk ve en kritik kontroldür.'
    },
    {
      id: 158,
      term: 'State Management (Durum Yönetimi)',
      definition: 'Uygulamanın verilerinin zaman içindeki değişimini kontrol eden ve bu verilerin farklı bileşenler arasında senkronize kalmasını sağlayan mekanizmadır.',
      category: 'Implementation',
      guruTip: 'Her veriyi global state (Redux vb.) içine atmayın; sadece paylaşılan ve kalıcı olması gereken verileri orada tutun.'
    },
    {
      id: 159,
      term: 'CORS (Cross-Origin Resource Sharing)',
      definition: 'Tarayıcının, bir web sitesinin kendi domaini dışındaki bir API\'ye erişmesini güvenlik nedeniyle kısıtlayan ve sunucudan izin bekleyen mekanizmadır.',
      category: 'Modern',
      guruTip: 'Eğer tarayıcıda "CORS Error" alıyorsanız, sorun genellikle sunucu tarafındaki yetkilendirme ayarlarındadır.'
    },
    {
      id: 160,
      term: 'XSS (Cross-Site Scripting)',
      definition: 'Kötü niyetli kişilerin web sayfasına zararlı scriptler enjekte ederek diğer kullanıcıların verilerini çalmaya çalıştığı güvenlik açığıdır.',
      category: 'Quality',
      guruTip: 'Kullanıcıdan gelen hiçbir veriyi filtrelemeden (XSS koruması yapmadan) doğrudan ekranda göstermeyin.'
    },
    {
      id: 161,
      term: 'Sanitization (Temizleme)',
      definition: 'Kullanıcıdan gelen verilerin zararlı kodlardan (örn: <script> etiketleri) arındırılarak güvenli hale getirilmesi sürecidir.',
      category: 'Quality',
      guruTip: 'XSS gibi saldırıları önlemenin en temel ve ilk savunma hattıdır.'
    },
    {
      id: 162,
      term: 'CSRF (Cross-Site Request Forgery)',
      definition: 'Kullanıcının haberi olmadan, onun oturum açmış olduğu bir siteye adına sahte istek gönderilmesi saldırısıdır.',
      category: 'Quality',
      guruTip: 'Her istek için benzersiz bir "CSRF Token" kullanarak bu tür sahte işlemlerin yapılmasını kolayca engelleyebilirsiniz.'
    },
    {
      id: 163,
      term: 'SQL Injection',
      definition: 'Kullanıcı girdileri üzerinden veritabanı sorgusuna zararlı kod enjekte edilerek yetkisiz veri erişimi sağlanması saldırısıdır.',
      category: 'Quality',
      guruTip: 'Girdileri asla SQL sorgusuna doğrudan birleştirmeyin; "Parameterized Queries" veya ORM araçlarını kullanın.'
    },
    {
      id: 164,
      term: 'DoS / DDoS (Denial of Service)',
      definition: 'Bir sistemi aşırı trafik yüküne boğarak gerçek kullanıcıların erişememesine neden olan saldırı türüdür.',
      category: 'Quality',
      guruTip: 'Rate limiting, CDN kullanımı ve trafik analizi gibi yöntemlerle bu saldırıların etkisi azaltılabilir.'
    },
    {
      id: 165,
      term: 'Brute Force (Kaba Kuvvet Saldırısı)',
      definition: 'Bir şifreyi veya anahtarı kırmak için tüm olası kombinasyonların tek tek denendiği saldırı yöntemidir.',
      category: 'Quality',
      guruTip: 'Belirli bir deneme sayısından sonra hesabı geçici olarak kilitlemek veya "Captcha" kullanmak en iyi savunmadır.'
    },
    {
      id: 166,
      term: 'Hashing (Özetleme)',
      definition: 'Bir verinin geri döndürülemez şekilde benzersiz ve sabit uzunlukta bir karaktere dönüştürülmesi işlemidir.',
      category: 'Quality',
      guruTip: 'Kullanıcı şifrelerini asla veritabanında olduğu gibi (plain-text) saklamayın; her zaman güçlü bir algoritma ile hashleyerek saklayın.'
    },
    {
      id: 167,
      term: 'Salting (Tuzlama)',
      definition: 'Şifre hashlenmeden önce sonuna eklenen rastgele karakterlerdir. Aynı şifreyi kullananların hashlerinin farklı olmasını sağlar.',
      category: 'Quality',
      guruTip: 'Rainbow Table (gökkuşağı tablosu) saldırılarıyla şifrelerin kırılmasını engellemek için hayati öneme sahiptir.'
    },
    {
      id: 168,
      term: 'Encryption vs Hashing',
      definition: 'Encryption çift yönlüdür (şifre çözülebilir); Hashing ise tek yönlüdür (geri döndürülemez).',
      category: 'Quality',
      guruTip: 'Şifreler hashlenir (çünkü geri okunmasına gerek yoktur), mesajlar ise encrypt edilir (çünkü alıcının okuması gerekir).'
    },
    {
      id: 169,
      term: 'Principle of Least Privilege',
      definition: 'Bir kullanıcıya veya sisteme, sadece yapması gereken iş için gereken minimum yetkinin verilmesi prensibidir.',
      category: 'Principle',
      guruTip: 'Saldırı yüzeyini küçültmek için herkesi "admin" yapmak yerine, sadece ihtiyacı olan rolleri tanımlayın.'
    },
    {
      id: 170,
      term: 'Zero Trust Architecture',
      definition: '"Asla güvenme, her zaman doğrula" prensibine dayanan; ağın içindeki hiçbir kullanıcıyı veya cihazı varsayılan olarak güvenilir kabul etmeyen güvenlik modelidir.',
      category: 'Modern',
      guruTip: 'Sadece ağın içinde olmak yetmez; her işlemde kimlik ve yetki kontrolü (Identity) tekrar yapılmalıdır.'
    },
    {
      id: 171,
      term: 'Defense in Depth',
      definition: 'Bir güvenlik katmanı delinse bile diğerinin saldırıyı durdurması için birden fazla farklı savunma mekanizmasının (firewall, şifreleme vb.) iç içe kullanılmasıdır.',
      category: 'Principle',
      guruTip: 'Güvenliği sadece dış bir "duvara" emanet etmeyin; her katmanda (Cloud, Network, Data) ayrı bir savunma hattı kurun.'
    },
    {
      id: 172,
      term: 'Attack Surface (Saldırı Yüzeyi)',
      definition: 'Bir sistemin hackerlar tarafından hedef alınabilecek tüm açık noktalarının (API\'ler, formlar, portlar) toplamıdır.',
      category: 'Quality',
      guruTip: 'Mimari hedefiniz saldırı yüzeyini küçültmek olmalıdır; kullanmadığınız servisleri ve dışa açık portları mutlaka kapatın.'
    },
    {
      id: 173,
      term: 'Incident Response',
      definition: 'Bir güvenlik ihlali veya sistem çöküşü anında uygulanacak tespit, durdurma ve kurtarma aşamalarından oluşan planlı müdahale sürecidir.',
      category: 'Modern',
      guruTip: 'Kriz anında ne yapacağınızı o an düşünmeyin; önceden simüle edilmiş ve dökümante edilmiş bir müdahale planınız olsun.'
    },
    {
      id: 174,
      term: 'Principle of Least Astonishment (POLA)',
      definition: 'Bir sistemin veya kod parçasının, kullanıcı veya diğer yazılımcıların beklentilerine en uygun, "sürpriz" içermeyen şekilde davranması prensibidir.',
      category: 'Principle',
      guruTip: 'Eğer "calculateTotal()" metodu arka planda veritabanını da güncelliyorsa bu kuralı ağır şekilde ihlal ediyorsunuz demektir.'
    },
    {
      id: 175,
      term: 'Code Rot (Kod Çürümesi)',
      definition: 'Yazılımın değişen çevre koşulları, güncellenmeyen kütüphaneler ve yapılmayan bakımlar nedeniyle zamanla "eskimesi" ve hata vermeye başlamasıdır.',
      category: 'Quality',
      guruTip: 'Kod değişmese bile dünya değişir; bu yüzden kodun yaşayan bir organizma gibi sürekli beslenmesi ve güncellenmesi gerekir.'
    },
    {
      id: 176,
      term: 'Vendor Lock-in (Bağımlılık)',
      definition: 'Belirli bir teknolojiye veya bulut sağlayıcıya (Örn: AWS) o kadar sıkı bağlanılmasıdır ki, başka bir platforma geçmenin maliyetinin imkansız hale gelmesidir.',
      category: 'Modern',
      guruTip: 'Mimaride soyutlama katmanları (Adapter Pattern) kullanarak bu bağımlılığı minimuma indirebilirsiniz.'
    },
    {
      id: 177,
      term: 'Hall of Shame (Utanç Duvarı)',
      definition: 'Kötü yazılmış kodların veya büyük mimari hataların ekip üyelerine ibret olması amacıyla sergilendiği listelerdir.',
      category: 'Principle',
      guruTip: 'Birini suçlamak için değil; aynı hataların bir daha tekrarlanmaması için öğretici bir araç olarak kullanılmalıdır.'
    },
    {
      id: 178,
      term: 'God Object (Tanrı Nesnesi)',
      definition: 'Sistemdeki her şeyi bilen, her işi yapmaya çalışan ve SRP prensibini ağır şekilde ihlal eden devasa sınıflardır.',
      category: 'Quality',
      guruTip: 'Eğer bir sınıfı anlatırken "X yapar, Y\'yi kontrol eder, Z\'yi de saklar" diyorsanız o bir God Object\'tir; acilen parçalanmalıdır.'
    },
    {
      id: 179,
      term: 'Spaghetti Code (Spagetti Kod)',
      definition: 'Modüller arası bağımlılıkların birbirine girdiği, kod akışının karmaşık ve takip edilemez olduğu kontrolsüz yapılardır.',
      category: 'Quality',
      guruTip: 'Clean Architecture\'ın tam zıttıdır; bir ucu çekildiğinde tüm yapının bozulduğu kırılgan bir sistemdir.'
    },
    {
      id: 180,
      term: 'Memoization (Ezberleme)',
      definition: 'Bir fonksiyonun sonucunun, aynı girdiler için tekrar hesaplanmak yerine hafızadan (cache) getirilmesi yöntemidir.',
      category: 'Implementation',
      guruTip: 'Ağır hesaplama gerektiren işlemlerde performansı artırmak için kullanılır; React\'teki "useMemo" buna en büyük örnektir.'
    },
    {
      id: 181,
      term: 'Encapsulation (Kapsülleme)',
      definition: 'Verilerin ve metotların tek bir birim içinde toplanması ve dış dünyadan gizlenerek (private/protected) sadece kontrollü bir arayüzle erişilmesidir.',
      category: 'OOP',
      guruTip: 'Nesnenin iç durumunu korur ve rastgele müdahaleleri engelleyerek hataları minimize eder.'
    },
    {
      id: 182,
      term: 'Information Hiding',
      definition: 'Bir modülün teknik detaylarını gizleyerek, dış dünyaya sadece neler yapabileceğini (arayüzünü) sunması prensibidir.',
      category: 'Principle',
      guruTip: 'İçerideki çalışma mantığını saklamak; bu mantık değişse bile o modülü kullanan diğer yerlerin etkilenmemesini sağlar.'
    },
    {
      id: 183,
      term: 'Magic Numbers (Sihirli Rakamlar)',
      definition: 'Kodun içinde hiçbir açıklama olmaksızın kullanılan ve anlamı belli olmayan sabit sayılardır.',
      category: 'Quality',
      guruTip: 'Kodunuzda "if (status === 3)" yazmak yerine "if (status === STATUS_COMPLETED)" şeklinde isimlendirilmiş bir sabit kullanın.'
    },
    {
      id: 184,
      term: 'Hard-coding',
      definition: 'Dinamik olması veya dışarıdan gelmesi gereken verilerin (şifreler, URL\'ler) doğrudan kodun içine yazılması hatasıdır.',
      category: 'Quality',
      guruTip: 'API anahtarlarını veya DB adreslerini kodun içine gömmeyin; Çevre Değişkenleri (.env) kullanarak güvenliği ve esnekliği sağlayın.'
    },
    {
      id: 185,
      term: 'Naming Conventions',
      definition: 'Değişken, fonksiyon ve sınıf adlarının belirli bir standartta (Örn: camelCase, PascalCase) yazılması kuralıdır.',
      category: 'Principle',
      guruTip: 'Hangi kuralı seçtiğinizden çok, o kurala tüm ekip ve proje boyunca sadık kalmanız kritiktir.'
    },
    {
      id: 186,
      term: 'Code Commenting',
      definition: 'Kodun mantığını açıklayan metinlerdir. Clean Code felsefesine göre kodun "ne" yaptığını değil, "neden" yapıldığını açıklamalıdır.',
      category: 'Principle',
      guruTip: 'Eğer kodunuz o kadar karmaşıksa ki yorum yazmak zorunda kalıyorsanız, önce kodu basitleştirmeyi (Refactoring) deneyin.'
    },
    {
      id: 187,
      term: 'Git Flow',
      definition: 'Ekiplerin Git üzerinden uyumlu çalışması için kullanılan; Feature, Develop ve Master gibi dallardan (branch) oluşan stratejidir.',
      category: 'Implementation',
      guruTip: 'Büyük projelerde sürüm yönetimini (Release Management) hatasız ve düzenli yapmanızı sağlar.'
    },
    {
      id: 188,
      term: 'Code Review (Kod İncelemesi)',
      definition: 'Yazılan kodun ana branşa eklenmeden önce ekipteki diğer yazılımcılar tarafından kontrol edilmesidir.',
      category: 'Principle',
      guruTip: 'Sadece hata bulma süreci değil, aynı zamanda ekipler arası bilgi paylaşımı ve standartların korunması seansıdır.'
    },
    {
      id: 189,
      term: 'Merge Conflict (Birleştirme Çatışması)',
      definition: 'İki geliştiricinin aynı dosyanın aynı satırında değişiklik yapması sonucu Git\'in otomatik birleştirme yapamadığı ve manuel çözüm gerektiren durumdur.',
      category: 'Implementation',
      guruTip: 'Küçük ve sık kod gönderimi (CI) yaparak çatışma riskini ve boyutunu minimumda tutabilirsiniz.'
    },
    {
      id: 190,
      term: 'Unit Testing (Birim Testi)',
      definition: 'Kodun en küçük birimlerinin (genelde fonksiyonlar) diğer parçalardan izole edilerek doğru çalışıp çalışmadığının kontrol edilmesidir.',
      category: 'Quality',
      guruTip: 'Hızlı çalışmalı ve sadece tek bir mantık noktasını ölçmelidir; hatanın yerini saniyeler içinde bulmanızı sağlar.'
    },
    {
      id: 191,
      term: 'Integration Testing (Entegrasyon Testi)',
      definition: 'Farklı modüllerin veya servislerin (Örn: Service + Database) bir araya geldiğinde uyumlu çalışıp çalışmadığını ölçen test türüdür.',
      category: 'Quality',
      guruTip: 'Birim testlerin kaçırdığı, modüller arası iletişim ve veri akışı hatalarını yakalamak için kritiktir.'
    },
    {
      id: 192,
      term: 'End-to-End (E2E) Testing',
      definition: 'Uygulamanın en başından sonuna kadar, gerçek bir kullanıcı gibi (Örn: Tarayıcı simülasyonu ile) tüm akışının test edilmesidir.',
      category: 'Quality',
      guruTip: 'Yazımı ve çalışması maliyetlidir; bu yüzden sadece en kritik ana kullanıcı yolları (Happy Paths) için tercih edilmelidir.'
    },
    {
      id: 193,
      term: 'Mocking (Simülasyon)',
      definition: 'Bir nesnenin veya servisin davranışlarını taklit eden sahte nesneler oluşturmadır. Testlerde dış bağımlılıkları (API, DB) soyutlamak için kullanılır.',
      category: 'Implementation',
      guruTip: 'Gerçek veritabanına bağlanmak yerine, "varmış gibi" davranan bir Mock nesnesi kullanarak birim testlerinizi hızlandırabilirsiniz.'
    },
    {
      id: 194,
      term: 'Stubbing',
      definition: 'Bir test sırasında belirli bir fonksiyon çağrısına, mantık yürütmeden her zaman önceden belirlenmiş sabit bir cevabı dönme yöntemidir.',
      category: 'Implementation',
      guruTip: 'Mock nesneleri etkileşimi (çağrıldı mı?) kontrol ederken, Stub nesneleri sadece test için veri sağlar.'
    },
    {
      id: 195,
      term: 'Regression Testing (Gerileme Testi)',
      definition: 'Yapılan her değişiklikten sonra, sistemin mevcut çalışan kısımlarının bozulup bozulmadığını kontrol etmek için yapılan test sürecidir.',
      category: 'Quality',
      guruTip: 'Otomatik test setleri bu süreçteki en büyük dostunuzdur; her yeni sürümde tüm seti çalıştırarak sürprizleri önleyin.'
    },
    {
      id: 196,
      term: 'Mutation Testing (Mutasyon Testi)',
      definition: 'Koda kasıtlı olarak küçük hatalar enjekte ederek, mevcut testlerin bu hataları yakalayıp yakalayamadığını (test kalitesini) ölçen yöntemdir.',
      category: 'Quality',
      guruTip: 'Eğer koddaki kritik bir mantık değiştiği halde testleriniz hala geçiyorsa (fail etmiyorsa), testleriniz yetersizdir.'
    },
    {
      id: 197,
      term: 'BDD (Behavior-Driven Development)',
      definition: 'Yazılımın teknik detaylarından çok kullanıcı davranışlarına ve iş senaryolarına odaklanan geliştirme yöntemidir (Örn: Given-When-Then formatı).',
      category: 'Principle',
      guruTip: 'Teknik olmayan kişilerin (Analist, Müşteri) bile anlayabileceği bir dille test senaryoları yazılmasını sağlar.'
    },
    {
      id: 198,
      term: 'ATDD (Acceptance Test-Driven Development)',
      definition: 'Geliştirme başlamadan önce iş birimiyle birlikte kabul kriterlerinin belirlenmesi ve testlerin bu kriterlere göre yazılması sürecidir.',
      category: 'Principle',
      guruTip: 'Geliştirici, testçi ve müşteri arasındaki iletişim kopukluğunu gidererek "doğru şeyin" yapıldığından emin olunmasını sağlar.'
    },
    {
      id: 199,
      term: 'MVP (Minimum Viable Product)',
      definition: 'Bir ürünün kullanıcıdan geri bildirim alabilmek için gerekli olan, temel değer önerisini sunan en yalın ve işlevsel halidir.',
      category: 'Principle',
      guruTip: 'Mükemmeliyetçilik tuzağına düşmeden, en az eforla en çok öğrenmeyi sağlamayı ve riski azaltmayı hedefler.'
    },
    {
      id: 200,
      term: 'Agile Manifesto (Çevik Bildirge)',
      definition: 'Süreçlerden ziyade insanlara, dökümantasyondan ziyade çalışan yazılıma odaklanan 4 temel değerden oluşan yazılım geliştirme felsefesidir.',
      category: 'Foundation',
      guruTip: 'Değişime cevap verebilmek, sıkı bir plana sadık kalmaktan daha değerlidir mimarisidir.'
    },
    {
      id: 201,
      term: 'Scrum',
      definition: 'Belirli sürelerdeki döngülerle (Sprint) çalışan, şeffaflık ve denetleme üzerine kurulu en popüler Agile çerçevesidir.',
      category: 'Foundation',
      guruTip: 'Scrum bir kural kitabı değil, ekibe kendi işini en verimli şekilde yönetmesi için alan açan bir iskelettir.'
    },
    {
      id: 202,
      term: 'Kanban',
      definition: 'İş akışını görselleştirmeye (Kanban Board) ve devam eden iş miktarını (WIP) kısıtlamaya dayanan süreç yönetim yöntemidir.',
      category: 'Foundation',
      guruTip: 'Scrum\'ın aksine sabit döngüler yoktur; işler sürekli akar ve Just-in-Time (tam zamanında) üretim mantığıyla çalışır.'
    },
    {
      id: 203,
      term: 'Extreme Programming (XP)',
      definition: 'Yazılım kalitesini artırmak için TDD, Pair Programming ve CI gibi teknik pratikleri en üst seviyede uygulayan metodolojidir.',
      category: 'Principle',
      guruTip: 'Teknik mükemmeliyete ve mühendislik disiplinine en çok odaklanan çevik geliştirme yöntemidir.'
    },
    {
      id: 204,
      term: 'WIP Limit (Work In Progress Limit)',
      definition: 'Aynı anda üzerinde çalışılan iş miktarını kısıtlama kuralıdır. Ekibin odağını korumasını ve tıkanıklıkları görmesini sağlar.',
      category: 'Quality',
      guruTip: '"Stop starting, start finishing!" (Başlamayı bırak, bitirmeye odaklan!) felsefesinin en büyük uygulama aracıdır.'
    },
    {
      id: 205,
      term: 'Singleton Pattern',
      definition: 'Bir sınıftan uygulama boyunca sadece bir nesne üretilmesini ve buna her yerden erişilebilmesini garanti eden tasarım desenidir.',
      category: 'Pattern',
      guruTip: 'Veritabanı bağlantısı gibi tekil kaynakların yönetiminde kullanılır; ancak yanlış kullanımı bağımlılıkları (coupling) artırabilir.'
    },
    {
      id: 206,
      term: 'Factory Pattern (Fabrika Deseni)',
      definition: 'Nesne üretme işlemini soyutlayarak, nesnenin tam olarak nasıl ve hangi tipte üretileceğine fabrikasının karar verdiği desendir.',
      category: 'Pattern',
      guruTip: 'Kod genelinde "new" anahtar kelimesi kullanımını azaltarak nesne üretim mantığını merkezi bir yere toplar.'
    },
    {
      id: 207,
      term: 'Strategy Pattern (Strateji Deseni)',
      definition: 'Bir işin farklı yöntemlerle yapılabileceği durumlarda, hangi yöntemin (stratejinin) kullanılacağının çalışma anında seçilmesini sağlar.',
      category: 'Pattern',
      guruTip: 'Karmaşık if-else veya switch bloklarından kurtulup, farklı davranışları (Örn: Ödeme yöntemleri) ayrı sınıflara bölmenize olanak tanır.'
    },
    {
      id: 208,
      term: 'Observer Pattern (Gözlemci Deseni)',
      definition: 'Bir nesnede (Subject) oluşan değişikliğin, onu takip eden tüm nesnelere (Observers) otomatik bildirilmesini sağlayan desendir.',
      category: 'Pattern',
      guruTip: 'Frontend dünyasındaki "Event" sistemlerinin ve "State" güncellemelerinin temelindeki ana mantıktır.'
    },
    {
      id: 209,
      term: 'Adapter Pattern (Adaptör Deseni)',
      definition: 'Birbirinden farklı arayüzlere sahip iki yapının, birbirleriyle uyumlu çalışmasını sağlayan dönüştürücü desendir.',
      category: 'Pattern',
      guruTip: 'Dış kütüphaneleri sisteme doğrudan bağlamak yerine bir Adapter üzerinden bağlayarak bağımlılıkları (vendor lock-in) minimize edebilirsiniz.'
    },
    {
      id: 210,
      term: 'Decorator Pattern',
      definition: 'Bir nesneye, mevcut kodunu değiştirmeden dinamik olarak yeni sorumluluklar veya davranışlar eklenmesini sağlayan desendir.',
      category: 'Pattern',
      guruTip: 'Miras (Inheritance) yerine kompozisyon kullanarak nesne yeteneklerini genişletmenin en esnek ve Clean Code dostu yoludur.'
    },
    {
      id: 211,
      term: 'Facade Pattern (Ön Yüz Deseni)',
      definition: 'Karmaşık bir alt sistemi veya kütüphane grubunu, istemciye çok daha basit ve sadeleştirilmiş bir arayüz üzerinden sunan desendir.',
      category: 'Pattern',
      guruTip: 'Alt sistemin tüm karmaşıklığını bir perdenin arkasına saklayarak istemciye temiz ve kullanımı kolay tek bir giriş noktası sağlar.'
    },
    {
      id: 212,
      term: 'Proxy Pattern (Vekil Deseni)',
      definition: 'Bir nesneye erişimi kontrol etmek veya ek işlevsellik (loglama, güvenlik, cache) eklemek için asıl nesnenin yerine geçen desendir.',
      category: 'Pattern',
      guruTip: 'Nesneye ulaşmadan önce yetki kontrolü yapmak veya ağır objelerin yükleme (lazy loading) operasyonlarını yönetmek için idealdir.'
    },
    {
      id: 213,
      term: 'State Pattern (Durum Deseni)',
      definition: 'Bir nesnenin iç durumu değiştiğinde davranışının da değişmesini sağlayan desendir. Nesne, sanki sınıfını değiştirmiş gibi davranır.',
      category: 'Pattern',
      guruTip: 'Karmaşık ve iç içe geçmiş if-else veya switch-case (durum kontrolü) bloklarından kurtulmak için en iyi çözümdür.'
    },
    {
      id: 214,
      term: 'Command Pattern (Komut Deseni)',
      definition: 'Bir isteği, o isteğe dair tüm bilgileri barındıran bağımsız bir nesneye dönüştüren desendir.',
      category: 'Pattern',
      guruTip: 'İstekleri kuyruğa sokmak, loglamak ve en önemlisi Undo/Redo (Geri Al/Yinele) özelliklerini sisteme eklemek için kullanılır.'
    },
    {
      id: 215,
      term: 'Template Method Pattern',
      definition: 'Bir algoritmanın iskeletini bir metot içinde tanımlayan, ancak bazı adımların alt sınıflar tarafından doldurulmasına (override) izin veren desendir.',
      category: 'Pattern',
      guruTip: 'Algoritmanın temel yapısını koruyup, sadece belirli adımların alt sınıflarda özelleştirilmesini sağlayarak kod tekrarını önler.'
    },
    {
      id: 216,
      term: 'Chain of Responsibility',
      definition: 'Bir isteğin bir dizi işleyici (handler) tarafından sırayla kontrol edilmesini ve uygun olanın işlemi gerçekleştirmesini sağlayan desendir.',
      category: 'Pattern',
      guruTip: 'Bir isteğin birden fazla kontrolden (Örn: Loglama -> Kimlik Doğrulama -> Yetki Kontrolü) geçmesi gereken durumlarda harika bir çözümdür.'
    },
    {
      id: 217,
      term: 'Mediator Pattern (Arabulucu Deseni)',
      definition: 'Nesnelerin birbirleriyle doğrudan haberleşmek yerine, tek bir arabulucu nesne üzerinden iletişim kurmasını sağlayarak bağımlılıkları azaltan desendir.',
      category: 'Pattern',
      guruTip: 'Onlarca bileşenin birbirini tanıması yerine hepsinin sadece merkezi bir Mediator ile konuşması, sistemi çok daha modüler ve yönetilebilir yapar.'
    },
    {
      id: 218,
      term: 'Memento Pattern (Hatıra Deseni)',
      definition: 'Bir nesnenin o anki durumunu (state) kaydeden ve ihtiyaç duyulduğunda o duruma geri dönülmesini (restore/rollback) sağlayan desendir.',
      category: 'Pattern',
      guruTip: 'Nesnenin iç yapısını (encapsulation) bozmadan, hata anında veya kullanıcı istediğinde eski kararlı haline dönmek için kullanılır.'
    },
    {
      id: 219,
      term: 'Iterator Pattern (Yineleyici Desen)',
      definition: 'Bir nesne grubunun (liste, ağaç vb.) iç yapısını bilmeden, elemanları üzerinde standart bir şekilde sırayla gezilmesini sağlayan desendir.',
      category: 'Pattern',
      guruTip: 'Veri yapınız ne kadar karmaşık olursa olsun, kullanıcıya sadece "siradakiEleman()" gibi basit bir fonksiyon sunarak karmaşıklığı gizler.'
    },
    {
      id: 220,
      term: 'Visitor Pattern (Ziyaretçi Deseni)',
      definition: 'Mevcut nesne sınıflarını değiştirmeden, bu nesneler üzerinde çalışacak yeni fonksiyonlar veya operasyonlar eklenmesini sağlayan desendir.',
      category: 'Pattern',
      guruTip: 'İş mantığını (Logic) veri yapısından (Data Structure) ayırmak istediğinizde en güçlü ve esnek çözümdür.'
    },
    {
      id: 221,
      term: 'Composite Pattern (Bileşik Desen)',
      definition: 'Nesneleri ağaç yapısı şeklinde gruplayarak, tekil bir nesne ile nesne gruplarının aynı arayüz üzerinden (tek bir tipmiş gibi) yönetilmesini sağlayan desendir.',
      category: 'Pattern',
      guruTip: 'Klasör ve dosya yapısı en iyi örneğidir; her ikisi de "Listele" komutuna kendi hiyerarşisine göre cevap verebilir.'
    },
    {
      id: 222,
      term: 'Bridge Pattern (Köprü Deseni)',
      definition: 'Bir yapının soyutlamasını (abstraction) ve uygulamasını (implementation) birbirinden ayırarak her ikisinin bağımsız gelişmesine olanak tanıyan desendir.',
      category: 'Pattern',
      guruTip: 'Sınıf patlamasını (class explosion) önler; örneğin farklı şekiller ve farklı renkler varsa, her renk-şekil kombinasyonu için ayrı sınıf yazmak yerine Bridge ile ikisini bağlarsınız.'
    },
    {
      id: 223,
      term: 'Flyweight Pattern (Sinek Sıklet Deseni)',
      definition: 'Çok sayıda benzer nesne üretildiğinde, ortak özellikleri paylaşarak bellek (RAM) kullanımını minimize eden desendir.',
      category: 'Pattern',
      guruTip: 'Binlerce benzer nesnenin (Örn: Bir oyundaki mermiler) değişmeyen özelliklerini tek bir merkezde tutup bellek canavarı olmalarını engeller.'
    },
    {
      id: 224,
      term: 'Interpreter Pattern (Yorumlayıcı Desen)',
      definition: 'Belirli bir dildeki cümlelerin nasıl değerlendirileceğini tanımlayan ve bu dili yorumlayan bir gramer yapısı kuran desendir.',
      category: 'Pattern',
      guruTip: 'Kendi küçük sorgu dilinizi veya kural motorunuzu (rule engine) yazmanız gerektiğinde başvuracağınız temel yapıdır.'
    },
    {
      id: 225,
      term: 'EDA (Event-Driven Architecture)',
      definition: 'Sistemin akışının "olaylar" üzerinden ilerlediği, servislerin doğrudan birbirini çağırmak yerine olaylar fırlatıp dinlediği mimari stildir.',
      category: 'Modern',
      guruTip: 'Servislerin birbirini hiç tanımadan (loosely coupled) çalışmasını sağlayan en güçlü modern mimari yaklaşımların başında gelir.'
    },
    {
      id: 226,
      term: 'AOP (Aspect-Oriented Programming)',
      definition: 'Loglama, güvenlik veya performans ölçümü gibi sistem genelindeki ortak sorumlulukların, asıl iş mantığından ayrıştırılarak yönetilmesidir.',
      category: 'Principle',
      guruTip: 'Her metodun başına log yazmak yerine, AOP ile bu işi merkezi bir yerden tüm metotlara "enjekte" edebilirsiniz.'
    },
    {
      id: 227,
      term: 'Materialized View',
      definition: 'Karmaşık veritabanı sorgularının sonuçlarının fiziksel bir tablo olarak saklanması ve periyodik olarak güncellenmesi yöntemidir.',
      category: 'Modern',
      guruTip: 'Milyonlarca satırı "Join" yapmak yerine, hazır hesaplanmış sonucu tek bir tablodan anında okuyarak raporlama hızını zirveye taşır.'
    },
    {
      id: 228,
      term: 'Shadow IT',
      definition: 'Şirket BT departmanının bilgisi ve onayı dışında kullanılan yazılımlar, cihazlar veya bulut servisleridir.',
      category: 'Quality',
      guruTip: 'Güvenlik ve veri kontrolü açısından büyük bir risktir; mimari ekip bu tür ihtiyaçları görüp güvenli alternatifler sunmalıdır.'
    },
    {
      id: 229,
      term: 'Immutable Infrastructure',
      definition: 'Sunucuların veya konteynerların kurulduktan sonra asla elle değiştirilmemesi, bir güncelleme gerektiğinde yenisinin kurulup eskisinin yok edilmesi prensibidir.',
      category: 'Modern',
      guruTip: 'Sunucuları "evcil hayvan" (Pet) gibi tek tek tamir etmek yerine, "sürü" (Cattle) gibi görüp yenisiyle değiştirmek sistem stabilitesini zirveye taşır.'
    },
    {
      id: 230,
      term: 'Rolling Update',
      definition: 'Yeni bir yazılım sürümünü tüm sunuculara aynı anda değil, sunucuları teker teker (sırayla) güncelleyerek yayına alma yöntemidir.',
      category: 'Modern',
      guruTip: 'Sistemi kapatmadan (zero downtime) yeni sürüme geçmenizi sağlar; bir sunucu hata verirse diğerlerine geçmeden güncelleme durdurulabilir.'
    },
    {
      id: 231,
      term: 'Chaos Monkey',
      definition: 'Rastgele sunucuları kapatarak veya ağ gecikmeleri yaratarak sistemin bu hatalara ne kadar hazırlıklı olduğunu test eden araçtır.',
      category: 'Modern',
      guruTip: 'Chaos Engineering disiplininin en meşhur aracıdır; gerçek bir hata oluşmadan önce sistemdeki zayıf noktaları bulmanızı sağlar.'
    },
    {
      id: 232,
      term: 'Auto-scaling (Otomatik Ölçeklendirme)',
      definition: 'Sistem yükü (CPU, Trafik vb.) arttığında otomatik olarak yeni kaynakların açılması, yük azaldığında ise kapatılması sürecidir.',
      category: 'Modern',
      guruTip: 'Hem maliyet avantajı sağlar hem de beklenmedik trafik patlamalarında sistemin çökmesini engeller.'
    },
    {
      id: 233,
      term: 'Log Aggregation (Log Birleştirme)',
      definition: 'Dağıtık bir sistemdeki farklı servislerden gelen tüm log kayıtlarının tek bir merkezde (Örn: ELK Stack) toplanması ve analiz edilmesi sürecidir.',
      category: 'Modern',
      guruTip: 'Hata anında 100 farklı sunucuda gezmek yerine, tüm trafiği tek bir ekranda görüp analiz etmenizi sağlar.'
    },
    {
      id: 234,
      term: 'Distributed Logging',
      definition: 'Mikroservisler arası işlemlerde, bir isteğin geçtiği tüm servislerdeki kayıtların ortak bir "Correlation ID" ile işaretlenerek takip edilmesidir.',
      category: 'Modern',
      guruTip: 'Bir işlemin 5 farklı serviste nasıl bir yol izlediğini ve nerede koptuğunu saniyeler içinde bulmanızı sağlar.'
    },
    {
      id: 235,
      term: 'Hollywood Principle',
      definition: '"Bizi arama, biz seni ararız" (Don\'t call us, we\'ll call you) felsefesidir. IoC\'nin en basit tanımıdır; sistemin sizi tetiklemesini anlatır.',
      category: 'Principle',
      guruTip: 'Framework mimarilerinin temelidir; siz butona tıklanınca ne olacağını yazarsınız ama butonu sistem tetikler.'
    },
    {
      id: 236,
      term: 'Aggregate (DDD)',
      definition: 'Birbirleriyle sıkı ilişkisi olan nesnelerin (Örn: Sipariş ve Sipariş Kalemleri) tek bir bütün olarak ele alınması ve tutarlılığının ana nesne (Root) üzerinden sağlanmasıdır.',
      category: 'DDD',
      guruTip: 'Dış dünyadaki bir nesne, alt öğelere doğrudan dokunamaz; tüm iletişim ve tutarlılık Aggregate Root üzerinden yönetilir.'
    },
    {
      id: 237,
      term: 'Specification Pattern',
      definition: 'Karmaşık iş kurallarının (Business Rules) nesnelerden ayrıştırılarak bağımsız ve tekrar kullanılabilir sınıflar halinde yazılması yöntemidir.',
      category: 'DDD',
      guruTip: 'Kodunuzdaki devasa "if" bloklarını temizlemenizi ve kuralları "user.isEligible(Specification)" şeklinde okunaklı hale getirmenizi sağlar.'
    },
    {
      id: 238,
      term: 'Rich Domain Model',
      definition: 'Domain nesnelerinin sadece veri (property) değil, o veriye ait tüm davranışları ve iş mantığını da kendi içinde barındırdığı tasarım şeklidir.',
      category: 'DDD',
      guruTip: 'Nesne yönelimli tasarımın gerçek gücüdür; nesneler "benim şu verimi al" demez, "şu işi yap" der.'
    },
    {
      id: 239,
      term: 'Strategic vs Tactical DDD',
      definition: 'Stratejik DDD işin büyük resmine (Context, Mapping) odaklanırken; Taktiksel DDD kod seviyesindeki detaylara (Entity, Value Object) odaklanır.',
      category: 'DDD',
      guruTip: 'Başarılı bir mimari için önce stratejik sınırları (Bounded Context) çizmek, sonra taktiksel araçlarla kodlamak gerekir.'
    },
    {
      id: 240,
      term: 'Abstract Factory Pattern',
      definition: 'Birbirleriyle ilişkili nesne ailelerini, somut sınıflarını belirtmeden üretmenizi sağlayan tasarım desenidir.',
      category: 'Pattern',
      guruTip: 'Factory tek bir nesne üretirken; Abstract Factory birbiriyle uyumlu koca bir nesne setini (Örn: Bir temaya ait tüm buton, input ve menü elemanlarını) üretir.'
    },
    {
      id: 241,
      term: 'Builder Pattern',
      definition: 'Karmaşık bir nesnenin oluşturulma adımlarını kontrol eden ve nesneyi adım adım inşa etmenizi sağlayan desendir.',
      category: 'Pattern',
      guruTip: 'Onlarca parametresi olan karmaşık bir constructor yazmak yerine, net ve adım adım (Örn: .setName().setAge().build()) nesne üretmenizi sağlar.'
    },
    {
      id: 242,
      term: 'Prototype Pattern (Prototip Deseni)',
      definition: 'Maliyeti yüksek olan nesneleri sıfırdan oluşturmak yerine, mevcut bir nesnenin kopyalanarak (cloning) üretilmesini sağlayan desendir.',
      category: 'Pattern',
      guruTip: 'Nesne üretim yükünü azaltarak performansı artırır; özellikle benzer özelliklere sahip çok sayıda nesne ihtiyacında kullanılır.'
    },
    {
      id: 243,
      term: 'Object Pool (Nesne Havuzu)',
      definition: 'Sürekli üretilip yok edilmesi maliyetli olan nesnelerin bir havuzda saklanarak tekrar tekrar kullanılmasını sağlayan yapıdır.',
      category: 'Pattern',
      guruTip: 'Veritabanı bağlantıları (Connection Pool) veya oyun motorlarındaki mermi/karakter üretimleri bu yöntemle yönetilir.'
    },
    {
      id: 244,
      term: 'SOA (Service-Oriented Architecture)',
      definition: 'Servislerin bir ağ üzerinden iletişim kurarak birbirine hizmet sunduğu mimari stildir; mikroservislerin temelini atan disiplindir.',
      category: 'Foundation',
      guruTip: 'Servisler genellikle ağırdır ve merkezi bir mesaj veri yolu (ESB) üzerinden haberleşir; karmaşık kurumsal sistemler için uygundur.'
    },
    {
      id: 245,
      term: 'Layered Architecture (Katmanlı Mimari)',
      definition: 'Uygulamanın Sunum, İş Mantığı ve Veri gibi yatay katmanlara ayrıldığı en yaygın ve klasik mimari yapıdır.',
      category: 'Foundation',
      guruTip: 'Her katman sadece altındaki katmanı tanır; öğrenmesi ve uygulanması kolay olduğu için birçok projenin başlangıç noktasıdır.'
    },
    {
      id: 246,
      term: 'Pipeline Architecture (Boru Hattı)',
      definition: 'Verinin bir dizi işlem adımından sırayla geçtiği ve her adımda (Pipe) dönüştürüldüğü mimari stildir.',
      category: 'Pattern',
      guruTip: 'Veri işleme, görselleştirme veya CI/CD süreçleri gibi sıralı adımların kritik olduğu yerlerde esneklik sağlar.'
    },
    {
      id: 247,
      term: 'API Gateway',
      definition: 'İstemciler ile servisler arasında tek giriş noktası olarak görev yapan, yönlendirme, güvenlik ve trafik yönetimi yapan yapıdır.',
      category: 'Modern',
      guruTip: 'İstemcinin 50 farklı servisi tek tek tanıması yerine, tek bir kapıyla konuşmasını sağlayarak karmaşıklığı maskeler.'
    },
    {
      id: 248,
      term: 'BFF (Backends for Frontends)',
      definition: 'Farklı istemci tipleri (Mobil, Web vb.) için özelleştirilmiş, her cihazın ihtiyacına göre veriyi optimize eden ara servis katmanıdır.',
      category: 'Modern',
      guruTip: 'Mobil uygulamanın daha az veri tüketen, web uygulamasının ise daha detaylı veri dönen farklı kapılara sahip olmasını sağlayarak performansı artırır.'
    },
    {
      id: 249,
      term: 'Database per Service',
      definition: 'Mikroservis mimarisinde her servisin kendi veritabanına sahip olması ve diğer servislerin bu verilere doğrudan erişememesi prensibidir.',
      category: 'Modern',
      guruTip: 'Servisler arası bağımsızlığı (loose coupling) garanti eder ancak servisler arası veri tutarlılığı yönetimini (Saga gibi) zorunlu kılar.'
    },
    {
      id: 250,
      term: 'CQS (Command Query Segregation)',
      definition: 'Bir metodun ya bir durumu değiştirmesi (Komut) ya da bir değer dönmesi (Sorgu) gerektiğini, ikisini aynı anda yapmaması gerektiğini savunan kuraldır.',
      category: 'Principle',
      guruTip: 'Yan etkisiz (pure) sorgular yazmanıza yardımcı olur; bir veriyi okurken yanlışlıkla değiştirme riskini ortadan kaldırır.'
    },
    {
      id: 251,
      term: 'Error Budget (Hata Bütçesi)',
      definition: 'Bir servisin SLO hedefleri dahilinde, bir dönem içerisinde ne kadar "hata yapma" veya "kapalı kalma" hakkı olduğunu tanımlayan kavramdır.',
      category: 'Quality',
      guruTip: 'Bütçeniz varsa yeni özellikler ekleyebilirsiniz; eğer bütçe tükendiyse projenin tek odağı sistemin stabilitesini düzeltmek olmalıdır.'
    },
    {
      id: 252,
      term: 'Trunk-Based Development',
      definition: 'Geliştiricilerin uzun ömürlü "feature branch"ler yerine, tüm değişiklikleri doğrudan ve sık sık ana dala (master/trunk) gönderdiği geliştirme yöntemidir.',
      category: 'Principle',
      guruTip: 'CI/CD süreçlerini en verimli hale getiren yöntemdir; ancak çok güçlü bir otomatik test seti gerektirir.'
    },
    {
      id: 253,
      term: 'Deployment vs Release',
      definition: 'Deployment kodun sunucuya taşınmasıdır (Teknik); Release ise bir özelliğin kullanıcıya açılmasıdır (İş Kararı).',
      category: 'Modern',
      guruTip: 'Kodu sessizce deploy edip (Dark Launching), günler sonra bir Feature Toggle ile kullanıcıya açarak (Release) riski yönetebilirsiniz.'
    },
    {
      id: 254,
      term: 'Resilience (Dayanıklılık)',
      definition: 'Bir sistemin hata anında tamamen çökmek yerine, hataları tolere ederek kısıtlı da olsa hizmet vermeye devam edebilme yeteneğidir.',
      category: 'Quality',
      guruTip: 'Mükemmel bir sistem hata yapmayan değil, hata yaptığında kullanıcıyı mağdur etmeden iyileşebilen (Graceful Degradation) sistemdir.'
    },
    {
      id: 255,
      term: 'Containerization (Konteynerleştirme)',
      definition: 'Uygulamanın çalışması için gereken tüm bileşenlerin tek bir paket (Örn: Docker) haline getirilerek her ortamda aynı şekilde çalışmasını sağlayan teknolojidir.',
      category: 'Modern',
      guruTip: 'Sunucu bağımlılığını yok ederek "benim bilgisayarımda çalışıyordu" sorununa kökten çözüm sunar.'
    },
    {
      id: 256,
      term: 'Kubernetes (K8s)',
      definition: 'Konteynerize edilmiş uygulamaların dağıtımını, ölçeklendirilmesini ve yönetimini otomatikleştiren açık kaynaklı bir orkestrasyon platformudur.',
      category: 'Modern',
      guruTip: 'Onlarca sunucuyu tek bir dev bilgisayar gibi yönetmenizi ve sunucu çökmelerinde sistemin ayakta kalmasını sağlar.'
    },
    {
      id: 257,
      term: 'Health Checks (Sağlık Kontrolleri)',
      definition: 'Uygulamanın çalışıp çalışmadığını (Liveness) ve istek kabul etmeye hazır olup olmadığını (Readiness) periyodik olarak kontrol eden mekanizmadır.',
      category: 'Modern',
      guruTip: 'Sistemin kendi kendini iyileştirmesi (Self-healing) için Kubernetes gibi orkestrasyon araçlarına nabız bilgisi sağlar.'
    },
    {
      id: 258,
      term: 'Inbound vs Outbound Traffic',
      definition: 'Sisteme veya servise dışarıdan gelen trafik (Inbound) ve sistemden dışarıya, başka servislere giden trafiktir (Outbound).',
      category: 'Modern',
      guruTip: 'Güvenlik duvarı (Firewall) kuralları yazarken her iki yönü de ayrı ayrı kısıtlamak "Sıfır Güven" mimarisi için kritiktir.'
    },
    {
      id: 259,
      term: 'Throttling',
      definition: 'Bir kullanıcının veya servisin kaynak kullanımını, limitleri aştığında sistemi korumak amacıyla kasıtlı olarak yavaşlatma işlemidir.',
      category: 'Quality',
      guruTip: 'Sistemin tamamen çökmesini engellemek için aşırı yükte servis kalitesini geçici olarak düşürme (degradation) stratejisidir.'
    },
    {
      id: 260,
      term: 'Horizontal Scaling (Yatay Ölçeklendirme)',
      definition: 'Artan trafiği karşılamak için sisteme mevcut sunucuların yanına yeni sunucular ekleme yöntemidir.',
      category: 'Modern',
      guruTip: 'Bulut dünyasının en büyük avantajıdır; sistemi tek bir dev sunucu yerine yüzlerce küçük sunucuya bölerek sonsuz ölçeklenmesini sağlar.'
    },
    {
      id: 261,
      term: 'Vertical Scaling (Dikey Ölçeklendirme)',
      definition: 'Trafiği karşılamak için mevcut tek bir sunucunun donanım kaynaklarını (CPU, RAM) yükseltme yöntemidir.',
      category: 'Foundation',
      guruTip: 'Donanım limitleri nedeniyle bir noktadan sonra çıkmaza girer ve sistemin tamamen durmasını (SPOF) gerektirebilir; modern sistemlerde yatay ölçekleme tercih edilir.'
    },
    {
      id: 262,
      term: 'Shared-nothing Architecture',
      definition: 'Sistemdeki her birimin (node) kendi kaynaklarına sahip olduğu ve merkezi bir kaynağı (disk, bellek vb.) paylaşmadığı mimari yapıdır.',
      category: 'Modern',
      guruTip: 'Birimler birbirini beklemediği ve kaynak kilitlenmesi (lock) yaşanmadığı için en yüksek ölçeklenme kapasitesine sahip mimaridir.'
    },
    {
      id: 263,
      term: 'MTTR (Mean Time To Recovery)',
      definition: 'Bir sistem arızalandıktan sonra tekrar kararlı ve çalışır hale gelene kadar geçen ortalama süredir.',
      category: 'Quality',
      guruTip: 'Sistemin ne kadar hızlı "iyileştiğini" ölçer; yüksek erişilebilirlik için MTTR süresini saniyeler mertebesine indirmek hedeflenir.'
    },
    {
      id: 264,
      term: 'MTBF (Mean Time Between Failures)',
      definition: 'Bir sistemdeki iki arıza (çöküş) arasında geçen ortalama süredir. Sistemin ne kadar istikrarlı olduğunu ölçer.',
      category: 'Quality',
      guruTip: 'MTBF süresini uzatmak demek, hataların daha seyrek gerçekleşmesi demektir; bu da sistem güvenilirliğinin arttığını gösterir.'
    },
    {
      id: 265,
      term: 'Availability (9s - Dokuzlar)',
      definition: 'Sistemin ayakta kalma süresini ifade eden %99.9, %99.99 gibi yüzdelerdir. "9" sayısı arttıkça sistemin durma süresi azalır.',
      category: 'Quality',
      guruTip: '%99.999 (Beş Dokuz) uptime garantisi demek, sistemin tüm yıl boyunca toplamda sadece 5 dakika kapalı kalabilmesi demektir.'
    },
    {
      id: 266,
      term: 'Burstable Resource',
      definition: 'Bulut sistemlerde bir servisin, normal kullanım limitinin üzerine kısa bir süreliğine (pik anlarda) ekstra kaynak kullanabilme yeteneğidir.',
      category: 'Modern',
      guruTip: 'Sürekli en yüksek donanım ücretini ödemek yerine, sadece trafik patlaması anlarında ekstra güç kullanarak maliyet tasarrufu sağlar.'
    },
    {
      id: 267,
      term: 'SLR (Service Level Requirement)',
      definition: 'Müşterinin veya iş biriminin bir servisten beklediği performans, erişilebilirlik ve kalite gereksinimleridir.',
      category: 'Quality',
      guruTip: 'SLA hukuki bir sözleşmedir; SLR ise o sözleşme hazırlanmadan önceki "istekler ve beklentiler" listesidir.'
    },
    {
      id: 268,
      term: 'Object-Oriented Programming (OOP)',
      definition: 'Yazılımın nesneler üzerinden kurgulandığı; Encapsulation, Inheritance, Polymorphism ve Abstraction prensiplerini kullanan paradigmadır.',
      category: 'Foundation',
      guruTip: 'Clean Architecture\'ın temel dayanağıdır; gerçek dünya problemlerini kod üzerinde nesneler yardımıyla modellemenizi sağlar.'
    },
    {
      id: 269,
      term: 'Declarative vs Imperative Programming',
      definition: 'Imperative "nasıl" yapılacağına (adım adım komutlar), Declarative ise "ne" yapılacağına (sonuç odaklı tanım) odaklanır.',
      category: 'Principle',
      guruTip: 'SQL ve React declarative\'dir; örneğin React\'e "ekranı şöyle çiz (ne)" dersiniz, o arka planda "nasıl" çizileceğini yönetir.'
    },
    {
      id: 270,
      term: 'Stateful Architecture',
      definition: 'Sunucunun veya servisin, istemciyle olan geçmiş etkileşimlerini (Örn: Oturum bilgisi) kendi belleğinde sakladığı mimari yapıdır.',
      category: 'Foundation',
      guruTip: 'Ölçeklenmesi zordur; çünkü istemci her seferinde bilgisinin saklandığı o tek sunucuya gitmek zorundadır (Sticky Session).'
    },
    {
      id: 271,
      term: 'Stateless Architecture',
      definition: 'Her isteğin (request) kendi başına bağımsız olduğu ve sunucunun geçmişe dair hiçbir bilgi saklamadığı mimari yapıdır.',
      category: 'Foundation',
      guruTip: 'Yatay ölçekleme (Horizontal Scaling) için mükemmeldir; bir isteği sistemdeki herhangi bir sunucu aynı şekilde karşılayabilir.'
    },
    {
      id: 272,
      term: 'HATEOAS',
      definition: 'REST mimarisinin bir parçası olan; API yanıtında, o kaynakla ilgili bir sonraki adımda yapılabilecek işlemlerin (linklerin) de sunulması prensibidir.',
      category: 'Foundation',
      guruTip: 'API\'nin kendi kendini belgelemesini (self-documenting) sağlar; istemci bir sonraki adımda hangi adrese gideceğini yanıtın içinden öğrenir.'
    },
    {
      id: 273,
      term: 'Middleware (Ara Katman)',
      definition: 'Bir HTTP isteği hedefine ulaşmadan önce veya yanıt dönmeden önce araya girerek belirli işleri (Loglama, Yetki vb.) yapan yazılım parçalarıdır.',
      category: 'Implementation',
      guruTip: 'Ortak sorumlulukları her yere yazmak yerine, merkezi bir Middleware zincirinde çözerek kod tekrarını (DRY) önler.'
    },
    {
      id: 274,
      term: 'Caching Strategies (Önbellekleme)',
      definition: 'Sık kullanılan verilerin nerede ve nasıl saklanacağını (Cache-Aside, Write-Through vb.) belirleyen performans stratejileridir.',
      category: 'Implementation',
      guruTip: 'Performansı muazzam artırır; ancak en büyük zorluğu "Cache Invalidation" yani hangi veri ne zaman eskidiği için silinmeli sorusuna yanıt vermektir.'
    },
    {
      id: 275,
      term: 'Denormalization (Denormalizasyon)',
      definition: 'Okuma performansını artırmak amacıyla, veritabanı tablolarında bilinçli olarak veri tekrarı (redundancy) yapılması işlemidir.',
      category: 'Foundation',
      guruTip: 'Normalizasyon veri bütünlüğünü korur; Denormalizasyon ise okuma hızını zirveye taşır. İkisi arasındaki dengeyi sistemin yüküne göre kurmalısınız.'
    },
    {
      id: 276,
      term: 'Monorepo',
      definition: 'Tüm projelerin, mikroservislerin ve ortak kütüphanelerin tek bir merkezi Git deposu (repository) içinde tutulması yöntemidir.',
      category: 'Implementation',
      guruTip: 'Paylaşılan kodların yönetimini ve bağımlılıkların güncellenmesini çok kolaylaştırır; ancak repo boyutu büyüdükçe CI/CD süreçleri karmaşıklaşabilir.'
    },
    {
      id: 277,
      term: 'Polyrepo (Multi-repo)',
      definition: 'Her projenin veya servisin kendine ait bağımsız bir Git deposuna sahip olmasıdır.',
      category: 'Implementation',
      guruTip: 'Servislerin tamamen bağımsız (independent) kalmasını ve kendi hızlarında gelişmesini sağlar; ancak ortak kütüphane güncellemeleri koordinasyon gerektirir.'
    },
    {
      id: 278,
      term: 'Innersourcing',
      definition: 'Şirket içindeki kapalı kodların, açık kaynak (open source) felsefesiyle tüm çalışanların erişimine ve katkısına (contribute) açılması prensibidir.',
      category: 'Principle',
      guruTip: 'Ekipler arasındaki siloları yakar ve bilgi paylaşımını artırarak şirketin teknik çevikliğini geliştirir.'
    },
    {
      id: 279,
      term: 'Greenfield Project',
      definition: 'Mevcut bir sistemin kısıtlamaları veya eski kod (legacy) mirası olmadan, tamamen sıfırdan başlanan yeni projelerdir.',
      category: 'Foundation',
      guruTip: 'Mimari kararların en özgürce alındığı aşamadır; en büyük hedef bu yeni projeyi geleceğin "yönetilebilir" sistemi haline getirmektir.'
    },
    {
      id: 280,
      term: 'Brownfield Project',
      definition: 'Mevcut bir sistemin kısıtlamaları ve eski kod mirası (legacy) üzerine inşa edilen veya modernize edilen projelerdir.',
      category: 'Foundation',
      guruTip: 'İş hayatının %90\'ı Brownfield\'dır; eski sistemi yakıp yıkmak yerine onu yavaşça ve güvenle dönüştürme (Örn: Strangler Pattern) sanatıdır.'
    },
    {
      id: 281,
      term: 'MLP (Minimum Lovable Product)',
      definition: 'MVP\'nin bir adım ötesidir. Ürünün sadece işlevsel olmasını değil, kullanıcının ilk andan itibaren sevmesini sağlayan en yalın halidir.',
      category: 'Principle',
      guruTip: 'Sadece teknik özelliklere değil, kullanıcı deneyimine (UX) ve tasarıma da odaklanarak kullanıcıyla duygusal bir bağ kurmayı hedefler.'
    },
    {
      id: 282,
      term: 'Golden Path (Altın Yol)',
      definition: 'Bir şirkette yazılım geliştirme ve yayınlama süreçlerinin en sorunsuz, en iyi desteklenen ve standart kabul edilen "en doğru" yöntemidir.',
      category: 'Modern',
      guruTip: 'Geliştiricilerin işini kolaylaştıran hazır şablonlar ve araçlar sunarak, hatalı seçim riskini azaltır ve organizasyonel hızı artırır.'
    },
    {
      id: 283,
      term: 'T-Shaped Employee',
      definition: 'Bir konuda çok derin uzmanlığa (T\'nin dikey çizgisi) sahip, ancak diğer disiplinlerde de bilgi sahibi (T\'nin yatay çizgisi) olan uzmandır.',
      category: 'Principle',
      guruTip: 'İyi bir mimar, kodlamada derinleşirken; bulut, güvenlik ve iş analizi gibi alanlarda da geniş bilgiye sahip olan bir "T-Tipi" profesyonel olmalıdır.'
    },
    {
      id: 284,
      term: 'Primitive Obsession (İlkel Takıntısı)',
      definition: 'E-mail, Para Birimi, Telefon gibi özel domain kavramlarını temsil etmek için kendi tiplerimizi oluşturmak yerine sürekli standart tipleri (string, int) kullanma hatasıdır.',
      category: 'Quality',
      guruTip: 'Bir string\'i "Email" sınıfı içine sarmallarsanız, email doğrulama mantığını tek bir merkezde toplayabilir ve kodun okunabilirliğini artırırsınız.'
    },
    {
      id: 285,
      term: 'WET (Write Everything Twice)',
      definition: 'DRY prensibinin zıttıdır; kodun birden fazla yere kopyalanması durumudur. "We Enjoy Typing" olarak da bilinir.',
      category: 'Quality',
      guruTip: 'Bazen erken soyutlamadan kaçınmak için kodu iki kez yazmak (WET) kabul edilebilir; ancak üçüncü kopyada mutlaka soyutlama (DRY) yapılmalıdır.'
    },
    {
      id: 286,
      term: 'Amdahl\'s Law',
      definition: 'Bir sistemin sadece bir parçasını hızlandırmanın, genel performans üzerindeki etkisinin o parçanın kullanım oranıyla sınırlı olduğunu söyleyen yasadır.',
      category: 'Principle',
      guruTip: 'Uygulamanın zamanının sadece %5\'ini alan bir kısmı ne kadar hızlandırırsanız hızlandırın, toplam performansı asla %5\'ten fazla artıramazsınız; gerçek darboğazlara (bottleneck) odaklanın.'
    },
    {
      id: 287,
      term: 'Brooks\'s Law (Brooks Yasası)',
      definition: '"Gecikmiş bir yazılım projesine daha fazla insan gücü eklemek, projeyi daha da geciktirir" felsefesidir.',
      category: 'Principle',
      guruTip: 'Yeni gelenlerin eğitimi ve artan iletişim karmaşıklığı hızı düşürür; işi yetiştirmek için insan eklemek yerine kapsamı (scope) küçültmek daha etkilidir.'
    },
    {
      id: 288,
      term: 'Conway\'s Law (Conway Yasası)',
      definition: 'Sistemleri tasarlayan organizasyonların, o organizasyonun iletişim yapısının kopyası olan bir mimari üreteceğini savunan yasadır.',
      category: 'Principle',
      guruTip: 'Eğer bir şirket 3 ayrı takım halinde çalışıyorsa, ortaya çıkan yazılım büyük ihtimalle 3 ana modülden oluşacaktır; mimari ekip yapısını takip eder.'
    },
    {
      id: 289,
      term: 'Linus\'s Law (Linus Yasası)',
      definition: '"Gözlemleyen göz sayısı arttıkça, tüm hatalar sığlaşır" (kolayca bulunur) prensibidir; açık kaynak felsefesinin temelidir.',
      category: 'Principle',
      guruTip: 'Kod incelemeleri ve topluluk katkıları bu yasadan beslenir; daha fazla göz, daha güvenli ve kaliteli yazılım demektir.'
    },
    {
      id: 290,
      term: 'Gresham\'s Law (Yazılımda)',
      definition: '"Kötü para iyi parayı kovar" yasasının koda uyarlanmış halidir: Projedeki kirli kod, zamanla temiz kod yazmayı imkansız hale getirir ve kaliteyi yok eder.',
      category: 'Quality',
      guruTip: 'Teknik borcun birikmesine izin verirseniz, kaliteli geliştiriciler o projeden uzaklaşır ve geriye sadece "kötü kod" kalır.'
    },
    {
      id: 291,
      term: 'Broken Window Theory (Kırık Pencere)',
      definition: '"Eğer bir binada bir pencere kırılır ve düzeltilmezse, yakında tüm pencereler kırılır" felsefesinin koda uyarlanmasıdır.',
      category: 'Principle',
      guruTip: 'Projedeki küçük bir kötü kodu veya hatayı "nasılsa çalışıyor" diyerek düzeltmezseniz, zamanla tüm ekibin kod kalitesi algısı bozulur ve projenin her yeri kirlenir.'
    },
    {
      id: 292,
      term: 'Rule of Three (Üç Kuralı)',
      definition: 'Bir kod parçasını soyutlamadan (refactor) önce, o kodun gerçekten kendini üç kez tekrar etmesini bekleme kuralıdır.',
      category: 'Principle',
      guruTip: 'Erken soyutlama (premature abstraction) tuzağına düşmemenizi sağlar; iki kez yazılan kod tesadüf olabilir ama üç kez yazılan kod mutlaka ortak bir yapıyı hak eder.'
    },
    {
      id: 293,
      term: 'Inertia (Atalet)',
      definition: 'Büyük yazılım sistemlerinin boyut ve karmaşıklık arttıkça değişime karşı gösterdiği dirençtir.',
      category: 'Quality',
      guruTip: 'Bağımlılıklar (coupling) ne kadar fazlaysa sistem o kadar hantal kalır; mimarın görevi sistemi her zaman değişebilir ve esnek tutmaktır.'
    },
    {
      id: 294,
      term: 'Bike-shedding (Önemsizlik Yasası)',
      definition: 'Önemli mimari konular dururken, herkesin fikir sahibi olabileceği çok basit ve önemsiz detaylara (Örn: Değişken adı, buton rengi) aşırı vakit harcanmasıdır.',
      category: 'Principle',
      guruTip: 'Mimari toplantılarda büyük darboğazlar yerine küçük detaylara takılıyorsanız odağınızı kaybetmişsiniz demektir; önceliklerinizi iyi belirleyin.'
    },
    {
      id: 295,
      term: 'Mob Programming',
      definition: 'Tüm ekibin (geliştiriciler, tasarımcılar vb.) aynı anda, aynı bilgisayarda ve aynı problem üzerinde çalışması yöntemidir.',
      category: 'Principle',
      guruTip: 'Pair Programming\'in tüm ekibe yayılmış halidir; bilgi paylaşımını maksimize eder ve ekipler arası siloları tamamen yok eder.'
    },
    {
      id: 296,
      term: 'Test Double (Test Dublörü)',
      definition: 'Test sırasında gerçek bir nesnenin yerini alan sahte yapıların (Mock, Stub, Fake vb.) genel adıdır.',
      category: 'Implementation',
      guruTip: 'Sinemadaki dublörler gibi; test aşamasında yavaş, maliyetli veya tehlikeli (Örn: Gerçek ödeme sistemi) olan asıl yapılar yerine kullanılırlar.'
    },
    {
      id: 297,
      term: 'Spy (Test Dublörü)',
      definition: 'Bir fonksiyonun nasıl çağrıldığını (kaç kez, hangi parametrelerle) gizlice kaydeden ve gözlemleyen test dublörüdür.',
      category: 'Implementation',
      guruTip: 'Çağrılan fonksiyonun gerçekten tetiklenip tetiklenmediğini ve gelen verinin doğruluğunu kontrol etmek için idealdir.'
    },
    {
      id: 298,
      term: 'Fake (Test Dublörü)',
      definition: 'Gerçek nesnenin çalışan ama basitleştirilmiş bir versiyonudur (Örn: Gerçek veritabanı yerine bellekte çalışan In-memory DB).',
      category: 'Implementation',
      guruTip: 'İş mantığı barındırır ancak prodüksiyon ortamı için uygun değildir; testlerin hızını ve güvenilirliğini artırmak için kullanılır.'
    },
    {
      id: 299,
      term: 'Dummy (Test Dublörü)',
      definition: 'Test sırasında sadece bir metodun çalışması için parametre olarak verilen ancak içeriği hiç kullanılmayan en basit sahte nesnedir.',
      category: 'Implementation',
      guruTip: 'Bir fonksiyon 5 tane girdi istiyorsa ama siz sadece ilkini test ediyorsanız, geri kalan 4 yere boş "Dummy" nesneler koyabilirsiniz.'
    },
    {
      id: 300,
      term: 'Unit of Work',
      definition: 'Bir iş işlemi (transaction) boyunca veritabanında yapılan tüm değişiklikleri takip eden ve sonunda hepsini tek seferde topluca kaydeden desendir.',
      category: 'Pattern',
      guruTip: 'Sistemin veri bütünlüğünü korur; örneğin 3 tabloya kayıt atılırken biri hata verirse tüm işlemi geri alarak (rollback) tutarsızlığı önler.'
    },
    {
      id: 301,
      term: 'Data Mapper Pattern',
      definition: 'Nesne dünyası (OOP) ile veritabanı şeması arasına girerek, her iki tarafın birbirinin yapısından tamamen habersiz kalmasını sağlayan katmandır.',
      category: 'Pattern',
      guruTip: 'Nesne kendi kendini kaydetmeyi bilmez; bu görev Mapper\'a aittir. Bu sayede domain nesneleriniz veritabanı bağımlılığından kurtulur.'
    },
    {
      id: 302,
      term: 'Active Record Pattern',
      definition: 'Veritabanındaki bir satırı doğrudan bir nesneyle eşleyen ve o nesneye save(), delete() gibi fonksiyonlar kazandıran popüler bir desendir.',
      category: 'Implementation',
      guruTip: 'Basit (CRUD) işlemleri için çok hızlı geliştirme sağlar; ancak karmaşık ve devasa projelerde nesneyi veritabanına çok sıkı bağladığı için risklidir.'
    },
    {
      id: 303,
      term: 'Polyglot Programming',
      definition: 'Bir projenin farklı ihtiyaçları için (Örn: AI için Python, yüksek performans için Go) birden fazla programlama dilinin bir arada kullanılmasıdır.',
      category: 'Modern',
      guruTip: 'Her çiviyi aynı çekiçle çakmak yerine, her probleme en uygun çözümü sunan dili (tooling) kullanma stratejisidir.'
    },
    {
      id: 304,
      term: 'Serverless (Sunucusuz Bilişim)',
      definition: 'Sunucu yönetimi ve ölçeklendirme işlerinin tamamen bulut sağlayıcıya bırakıldığı, sadece kodun çalıştığı süre kadar ödeme yapılan modeldir.',
      category: 'Modern',
      guruTip: 'Altyapı ile uğraşmadan sadece iş mantığınızı (function) yüklersiniz; sistem ihtiyaç anında otomatik ayağa kalkar ve kapanır.'
    },
    {
      id: 305,
      term: 'Cold Start',
      definition: 'Serverless fonksiyonların uzun süre kullanılmadıktan sonra ilk tetiklendiğinde, ayağa kalkma aşamasında yaşadığı kısa süreli gecikmedir.',
      category: 'Modern',
      guruTip: 'Gecikme hassas sistemlerde fonksiyonları "sıcak tutmak" (keeping warm) veya uygun ram seçimiyle bu süreyi minimize etmek kritiktir.'
    },
    {
      id: 306,
      term: 'Four Golden Signals',
      definition: 'SRE disiplininde sistem sağlığını ölçen 4 temel metriktir: Latency (Gecikme), Traffic (Trafik), Errors (Hatalar) ve Saturation (Doygunluk).',
      category: 'Quality',
      guruTip: 'Sistemde bir sorun olduğunda bu 4 sinyalden en az biri mutlaka anomali gösterir; izlenmesi gereken ilk göstergelerdir.'
    },
    {
      id: 307,
      term: 'Latency (Gecikme)',
      definition: 'Bir isteğin gönderilmesiyle yanıtın alınması arasında geçen milisaniyelik (ms) süredir.',
      category: 'Quality',
      guruTip: 'Kullanıcı deneyimini belirleyen en kritik performans metriğidir; özellikle e-ticaret ve oyun sistemlerinde her milisaniye altın değerindedir.'
    },
    {
      id: 308,
      term: 'Throughput (Verim)',
      definition: 'Bir sistemin belirli bir sürede işleyebildiği toplam iş veya istek (Örn: Saniyedeki istek sayısı - RPS) miktarıdır.',
      category: 'Quality',
      guruTip: 'Latency hızınızı, Throughput ise kapasitenizi gösterir. İyi bir mimari, her iki metriği de dengeli şekilde yönetmeyi hedefler.'
    },
    {
      id: 309,
      term: 'Monitoring vs Observability',
      definition: 'Monitoring "Sistem çalışıyor mu?" sorusuna yanıt verirken; Observability "Neden çalışmıyor?" sorusunun cevabını bulmanızı sağlar.',
      category: 'Modern',
      guruTip: 'Monitoring bilinen hataları takip eder (Dashboard); Observability ise log, metrik ve trace verilerini kullanarak hiç bilmediğiniz bir hatanın kök nedenini bulmanızı sağlar.'
    },
    {
      id: 310,
      term: 'Blast Radius (Patlama Yarıçapı)',
      definition: 'Bir sistem bileşeninde meydana gelen hatanın veya güvenlik ihlalinin, sistemin geri kalanını ne kadar etkileyebileceğini ifade eden kavramdır.',
      category: 'Modern',
      guruTip: 'Mikroservisler ve Bulkhead Pattern gibi izolasyon yöntemleri kullanarak, bir hatanın "patlama yarıçapını" sadece o servisle sınırlandırmak kritik bir mimari hedeftir.'
    },
    {
      id: 311,
      term: 'Safe-to-Fail',
      definition: 'Sistemin bir bölümünün çökmesinin tüm işleyişi durdurmadığı ve hataların (deneylerin) sistemi yıkmadan gerçekleşebildiği tasarım anlayışıdır.',
      category: 'Principle',
      guruTip: 'Hata yapmamanın imkansız olduğu karmaşık sistemlerde, hataları tolere edebilen ve bu hatalardan öğrenen bir yapı kurmayı hedefler.'
    },
    {
      id: 312,
      term: 'Reliability vs Availability',
      definition: 'Availability sistemin "ayakta" olma süresini (Uptime); Reliability ise sistemin "doğru ve tutarlı" çalışma yeteneğini temsil eder.',
      category: 'Quality',
      guruTip: 'Bir web sitesi ayakta olabilir (%100 Availability) ama her tıkladığınızda yanlış fiyat dönüyorsa güvenilir (%0 Reliability) değildir.'
    },
    {
      id: 313,
      term: 'MTTA (Mean Time To Acknowledge)',
      definition: 'Bir arıza veya sistem alarmı oluştuktan sonra, sorunun ilgili ekip tarafından fark edilip müdahalenin başladığı ana kadar geçen ortalama süredir.',
      category: 'Quality',
      guruTip: 'İzleme (Monitoring) sistemlerinin ne kadar hızlı olduğunu ve ekibin uyanıklık seviyesini ölçen kritik bir SRE metriğidir.'
    },
    {
      id: 314,
      term: 'Fail-open',
      definition: 'Bir arıza durumunda sistemin (genelde güvenlik filtrelerinin) erişimi kısıtlamak yerine, hizmetin devam etmesi için erişime izin vererek çalışmasıdır.',
      category: 'Quality',
      guruTip: 'Kullanıcı deneyiminin güvenliğin önünde olduğu durumlarda tercih edilir. Örn: Bir yetkilendirme sistemi çöktüğünde kullanıcıların sitede kalmasına izin vermek.'
    },
    {
      id: 315,
      term: 'Fail-closed',
      definition: 'Arıza durumunda sistemin en güvenli konuma geçip tüm erişimi yasaklamasıdır. En güvenli ama kullanılabilirliği en düşük tercihtir.',
      category: 'Quality',
      guruTip: 'Güvenlik kritik sistemlerde (Bankacılık, SSH vb.) tercih edilir; eğer kimlik doğrulaması yapılamıyorsa asla içeri girilemez.'
    },
    {
      id: 316,
      term: 'Post-Mortem (Hata Analizi)',
      definition: 'Büyük bir arızadan sonra; neyin yanlış gittiğini ve nedenini suçlamadan (blameless) inceleyip dökümante eden öğrenme sürecidir.',
      category: 'Modern',
      guruTip: 'Gerçek bir mühendislik kültürü hataları gizlemez; Post-Mortem raporlarıyla bu hataları tüm şirketin öğrenebileceği bir derse dönüştürür.'
    },
    {
      id: 317,
      term: 'Alert Fatigue (Alarm Yorgunluğu)',
      definition: 'Sistemin çok fazla önemsiz veya yanlış alarm üretmesi nedeniyle, ekiplerin alarmlara duyarsızlaşması ve gerçek tehlikeleri görmemesi durumudur.',
      category: 'Quality',
      guruTip: 'Her şeyi değil, sadece aksiyon alınması gereken (actionable) durumları alarm haline getirmelisiniz; gürültüyü azaltmak hayat kurtarır.'
    },
    {
      id: 318,
      term: 'Shared Database (Anti-pattern)',
      definition: 'Birden fazla mikroservisin aynı veritabanına ve tablolara doğrudan erişmesi durumudur; servisler arası bağımlılığı tehlikeli şekilde artırır.',
      category: 'Modern',
      guruTip: 'Mikroservis mimarisinin en büyük günahlarından biridir; bir servisin şema değişikliği diğerlerini bozar ve bağımsız gelişmeyi (decoupling) engeller.'
    },
    {
      id: 319,
      term: 'Distributed Transaction',
      definition: 'Birden fazla servis veya veritabanı üzerinde gerçekleşen ve hepsinin başarıyla tamamlanmasını gerektiren işlem bütünüdür.',
      category: 'Modern',
      guruTip: 'Yönetmesi ve hata ayıklaması (debugging) çok maliyetlidir; modern sistemlerde bunun yerine genellikle Saga Pattern ile nihai tutarlılık tercih edilir.'
    },
    {
      id: 320,
      term: 'Strong Consistency (Güçlü Tutarlılık)',
      definition: 'Veri güncellendiği anda sistemdeki tüm okuyucuların en güncel veriyi göreceği garantisidir.',
      category: 'Foundation',
      guruTip: 'Doğruluğun (Integrity) hızdan önemli olduğu bankacılık gibi finansal sistemlerde vazgeçilmezdir.'
    },
    {
      id: 321,
      term: 'Service Autonomy (Servis Otonomisi)',
      definition: 'Bir servisin diğerlerinden bağımsız olarak geliştirilme, yayınlanma, ölçeklenme ve çalışabilme yeteneğidir.',
      category: 'Modern',
      guruTip: 'Mikroservis mimarisinin "Kutsal Kasesi"dir. Eğer bir servisi güncellemek için diğerlerini de güncellemeniz gerekiyorsa otonomiyi kaybetmişsiniz demektir.'
    },
    {
      id: 322,
      term: 'Optimistic Locking (İyimser Kilitleme)',
      definition: 'Verinin güncellenirken çakışmaların nadir olacağını varsayan, fiziksel kilit kullanmak yerine "versiyon numarası" ile kontrol sağlayan yöntemdir.',
      category: 'Implementation',
      guruTip: 'Performans dostudur; ancak aynı anda yapılan iki güncellemede, versiyonu eski kalan kullanıcı hata alarak işlemi tekrar etmeye zorlanır.'
    },
    {
      id: 323,
      term: 'Pessimistic Locking (Kötümser Kilitleme)',
      definition: 'İşlem sırasında veriyi fiziksel olarak kilitleyen ve o işlem bitene kadar başka kimsenin veriyi değiştirmesine izin vermeyen yöntemdir.',
      category: 'Implementation',
      guruTip: 'Doğruluğun kritik olduğu ve çakışma ihtimalinin yüksek olduğu (Örn: Sınırlı stok azaltma) işlemlerde en güvenli yoldur.'
    },
    {
      id: 324,
      term: 'Database Migration',
      definition: 'Veritabanı şemasındaki her değişikliğin (Yeni tablo, kolon ekleme vb.) kod gibi versiyonlanmış dosyalar üzerinden kontrollü yönetilmesi sürecidir.',
      category: 'Implementation',
      guruTip: 'Veritabanına asla manuel dokunmayın; her değişikliği migration dosyalarıyla yaparak tüm sistemlerin (Dev, Test, Prod) aynı kalmasını sağlayın.'
    },
    {
      id: 325,
      term: 'Transactional Outbox Pattern',
      definition: 'Veritabanı güncellemesi ile bunun bir olay (Event) olarak fırlatılmasının aynı transaction içinde yapılmasını sağlayan desendir.',
      category: 'Pattern',
      guruTip: 'Veritabanı güncellenip mesajın fırlatılamadığı (veya tam tersi) durumları engelleyerek servisler arası nihai tutarlılığı garanti eder.'
    },
    {
      id: 326,
      term: 'Idempotent Consumer',
      definition: 'Aynı mesajın birden fazla kez gelmesi durumunda, sistemin bu mesajı sadece bir kez işlemesini veya her seferinde aynı güvenli sonucu üretmesini sağlayan yapıdır.',
      category: 'Pattern',
      guruTip: 'Dağıtık sistemlerde veri kirliliğini (Örn: Bir ödemenin yanlışlıkla 2 kez alınması) engellemek için hayati bir savunma hattıdır.'
    },
    {
      id: 327,
      term: 'Compensating Transaction (Telafi İşlemi)',
      definition: 'Dağıtık bir işlem (Saga) sırasında bir adım başarısız olduğunda, önceki başarılı adımları geri almak için yapılan ters işlemdir.',
      category: 'Pattern',
      guruTip: 'Geleneksel "Rollback" yapılamayan yerlerde, yapılan işi mantıksal olarak iptal etme (Örn: Ödemeyi iade et, rezervasyonu sil) yöntemidir.'
    },
    {
      id: 328,
      term: 'Change Data Capture (CDC)',
      definition: 'Veritabanındaki veri değişikliklerinin (Insert, Update, Delete) anlık izlenerek bu değişimlerin olay (event) olarak diğer sistemlere aktarılmasıdır.',
      category: 'Modern',
      guruTip: 'Uygulamaya yük bindirmeden, doğrudan veritabanı loglarını okuyarak veriyi senkronize etmenin en modern ve performanslı yoludur.'
    },
    {
      id: 329,
      term: 'A/B Testing',
      definition: 'Uygulamanın bir özelliğinin iki farklı versiyonunun gerçek kullanıcılar üzerinde test edilerek, hangisinin daha başarılı olduğunun ölçülmesidir.',
      category: 'Modern',
      guruTip: 'Tahmin yürütmek yerine, gerçek kullanıcı verisiyle (Data-driven) hangi tasarımın veya özelliğin daha iyi sonuç verdiğine karar vermenizi sağlar.'
    },
    {
      id: 330,
      term: 'Isomorphic JavaScript',
      definition: 'Aynı JavaScript kodunun hem sunucu (Server) hem de istemci (Client) tarafında çalışabildiği uygulama geliştirme yaklaşımıdır.',
      category: 'Modern',
      guruTip: 'SSR\'ın SEO avantajıyla, CSR\'ın zengin etkileşim gücünü tek bir kod tabanında birleştirerek geliştirme hızını artırır.'
    },
    {
      id: 331,
      term: 'Tipping Point (Kırılma Noktası)',
      definition: 'Bir sistemdeki değişim veya evrimin geri döndürülemez hale geldiği ve sistemin tamamen yeni bir yöne evrildiği kritik eşiktir.',
      category: 'Principle',
      guruTip: 'Özellikle monolitik yapıdan mikroservise geçiş gibi büyük değişimlerde, bu eşik geçildikten sonra yeni mimari kendi momentumunu yaratır.'
    },
    {
      id: 332,
      term: 'Contextual Inquiry (Bağlamsal Sorgulama)',
      definition: 'Kullanıcıları kendi gerçek çalışma ortamlarında gözlemleyerek ve mülakat yaparak, gerçek ihtiyaçları anlama metodudur.',
      category: 'Principle',
      guruTip: 'Analiz aşamasında kullanıcıyı yerinde izlemek; masada kurgulanan sahte senaryolar yerine, gerçek hayatın karmaşıklığına uygun mimari kurmanızı sağlar.'
    },
    {
      id: 333,
      term: 'WebHooks',
      definition: 'Bir sistemde olay gerçekleştiğinde, sistemin bunu dış dünyadaki başka bir adrese (URL) otomatik olarak HTTP POST isteği ile bildirmesidir.',
      category: 'Modern',
      guruTip: 'Sürekli "yeni veri var mı?" (Polling) diye sormak yerine, sistemin size "işte yeni veri" (Push) demesini sağlayan en popüler entegrasyon yöntemidir.'
    },
    {
      id: 334,
      term: 'Long Polling',
      definition: 'İstemcinin sunucuya istek gönderip, sunucunun yeni bir veri olana kadar bağlantıyı açık tuttuğu ve veri oluşunca yanıt döndüğü yöntemdir.',
      category: 'Modern',
      guruTip: 'WebSocket kadar hızlı değildir ama gerçek zamanlıya yakın veri akışı sağlamak için kullanılan eski ve güvenilir bir tarayıcı tekniğidir.'
    },
    {
      id: 335,
      term: 'Server-Sent Events (SSE)',
      definition: 'Sunucunun kurulu olan tek bir HTTP bağlantısı üzerinden istemciye tek yönlü ve sürekli veri akışı sağladığı teknolojidir.',
      category: 'Modern',
      guruTip: 'Sadece sunucunun veri bastığı (Örn: Canlı borsa verileri, maç skorları) senaryolarda WebSocket\'e göre daha basit ve verimli bir alternatiftir.'
    },
    {
      id: 336,
      term: 'Shadowing (Traffic Shadowing)',
      definition: 'Gerçek kullanıcı trafiğinin bir kopyasının, asıl sistemi etkilemeden paralel olarak test aşamasındaki yeni bir sürüme de gönderilmesi işlemidir.',
      category: 'Modern',
      guruTip: 'Yeni mimarinizi gerçek üretim yükü ve verisiyle, kullanıcıları hiç riske atmadan %100 gerçekçi test etmenizi sağlar.'
    },
    {
      id: 337,
      term: 'GDPR / KVKK',
      definition: 'Kişisel verilerin toplanması, işlenmesi ve korunmasını yasal çerçeveye oturtan uluslararası ve yerel veri koruma kanunlarıdır.',
      category: 'Quality',
      guruTip: 'Mimaride veriyi sadece kaydetmek yetmez; verinin silinebilirliği (unutulma hakkı) ve gizliliği artık yasal bir zorunluluktur.'
    },
    {
      id: 338,
      term: 'PII (Personally Identifiable Information)',
      definition: 'Bir kişiyi doğrudan veya dolaylı olarak tanımlayabilecek her türlü veridir (İsim, T.C. No, E-posta, IP adresi vb.).',
      category: 'Quality',
      guruTip: 'Sistem loglarına PII verilerinin maskelenmeden (masking) düşmesini engellemeli ve bu verileri DB seviyesinde şifrelemelisiniz.'
    },
    {
      id: 339,
      term: 'Data Anonymization (Anonimleştirme)',
      definition: 'Kişisel verilerin, veri sahibiyle olan fiziksel bağının geri döndürülemez şekilde kopartılarak sadece istatistiksel bir değer haline getirilmesidir.',
      category: 'Quality',
      guruTip: 'Analiz amaçlı veri paylaşımında, PII verilerini anonimleştirerek güvenlik ve gizlilik risklerini tamamen ortadan kaldırabilirsiniz.'
    },
    {
      id: 340,
      term: 'Encryption at Rest vs In Transit',
      definition: 'Verinin hem diskte saklanırken (At Rest) hem de ağ üzerinden taşınırken (In Transit - Örn: HTTPS) şifrelenmiş olması kuralıdır.',
      category: 'Quality',
      guruTip: 'Modern mimaride "tam güvenlik", verinin hem mola verdiği yerde (DB) hem de yolda olduğu anda okunamaz olması demektir.'
    },
    {
      id: 341,
      term: 'Library vs Framework',
      definition: 'Temel fark kontrolün kimde olduğudur. Kütüphaneyi (Library) siz çağırırsınız; Framework ise sizi çağırır (Hollywood Prensibi).',
      category: 'Foundation',
      guruTip: 'Kodun akışını siz yönetiyorsanız kütüphane, akışı sistem yönetiyor ve siz sadece araları dolduruyorsanız framework kullanıyorsunuz demektir.'
    },
    {
      id: 342,
      term: 'Shim vs Polyfill',
      definition: 'Polyfill yeni özellikleri (Örn: Promise) eski tarayıcılara ekler; Shim ise eski yapıları yeni bir arayüze uyduran ince katmandır.',
      category: 'Implementation',
      guruTip: 'Eski tarayıcılarda modern kodların sorunsuz çalışmasını sağlayan "yamalar" olarak düşünebilirsiniz.'
    },
    {
      id: 343,
      term: 'Outbound Gateway (Egress)',
      definition: 'Sistem içindeki servislerin dış dünyadaki (internet) API veya internet sitelerine erişimini denetleyen ve filtreleyen güvenli çıkış kapısıdır.',
      category: 'Modern',
      guruTip: 'Sadece kimin size gelebileceğini değil, servislerinizin dışarıda nereye gidebileceğini de kısıtlayarak veri sızıntısı riskini azaltır.'
    },
    {
      id: 344,
      term: 'Lateral Movement (Yanal Hareket)',
      definition: 'Bir saldırganın sistemdeki zayıf bir noktayı ele geçirdikten sonra ağ içinde diğer sunuculara ve kritik verilere doğru yayılma sürecidir.',
      category: 'Quality',
      guruTip: 'Ağ segmentasyonu kullanarak saldırganın bir servisten diğerine geçişini zorlaştırmalı ve "Patlama Yarıçapını" daraltmalısınız.'
    },
    {
      id: 345,
      term: 'Elasticity (Esneklik)',
      definition: 'Sistemin anlık yük değişimlerine (Örn: Bir reklam sonrası trafik patlaması) saniyeler içinde kaynak artırarak cevap verme ve yük azaldığında kaynakları geri bırakma yeteneğidir.',
      category: 'Modern',
      guruTip: 'Scalability sistemi büyütme "kapasitesini", Elasticity ise bu büyümeyi "dinamik ve maliyet odaklı" (pay-as-you-go) yönetmeyi anlatır.'
    },
    {
      id: 346,
      term: 'High Availability (Yüksek Erişilebilirlik)',
      definition: 'Sistemin herhangi bir bileşeni (Sunucu, DB, Veri Merkezi) çökse bile hizmetin kesintisiz devam etmesini sağlayan mimari tasarımdır.',
      category: 'Quality',
      guruTip: 'Yedeklilik (Redundancy) felsefesine dayanır; "SPOF" olmayan ve her parçanın bir eşleniğinin olduğu güvenli limandır.'
    },
    {
      id: 347,
      term: 'Active-Active vs Active-Passive',
      definition: 'İki sistemin yükü paylaşarak çalışması (Active-Active) veya birinin bekleyip (stand-by) diğeri çökünce devreye girmesi (Active-Passive) durumudur.',
      category: 'Modern',
      guruTip: 'Active-Active yapılar en yüksek performansı ve güvenliği sunar ancak veri senkronizasyonu yönetimi en karmaşık olanlardır.'
    },
    {
      id: 348,
      term: 'Split-brain Syndrome',
      definition: 'Ağ koptuğunda (Partition), dağıtık bir sistemdeki iki grubun da kendini lider ilan edip veriyi farklı işlemesi sonucu oluşan veri tutarsızlığıdır.',
      category: 'Quality',
      guruTip: 'Bu kaosu önlemek için Quorum (Çoğunluk Kararı) mekanizması kullanarak "en az %51 onayı almayan çalışmasın" kuralını uygulamalısınız.'
    },
    {
      id: 349,
      term: 'Module Federation',
      definition: 'Farklı JavaScript uygulamalarının, çalışma zamanında (Runtime) birbirlerinden kod veya bileşen paylaşabilmesini sağlayan mimari teknolojidir.',
      category: 'Frontend',
      guruTip: 'Mikro-frontend dünyasının temelidir; her ekibin kendi uygulamasını bağımsız build edip tarayıcıda devasa bir sistem olarak birleşmesini sağlar.'
    },
    {
      id: 350,
      term: 'Prop Drilling',
      definition: 'React gibi yapılarda, bir verinin en üstten en alt bileşene ulaşması için aradaki hiç ihtiyacı olmayan tüm bileşenlerden tek tek "paslanması" sorunudur.',
      category: 'Frontend',
      guruTip: 'Context API veya State Management araçları kullanarak bu bağımlılık zincirini kırabilir ve kodunuzu daha temiz tutabilirsiniz.'
    },
    {
      id: 351,
      term: 'Lighthouse Score',
      definition: 'Web sitelerinin Performans, SEO, Erişilebilirlik ve En İyi Pratikler konusundaki kalitesini 0-100 arası puanlayan Google standart metriğidir.',
      category: 'Frontend',
      guruTip: 'Bir Frontend mimarisinin başarısının en somut kanıtıdır; profesyonel sistemlerde her kategoride 90+ puan hedeflenmelidir.'
    },
    {
      id: 352,
      term: 'Service Workers',
      definition: 'Web sayfasından bağımsız arka planda çalışan, ağ isteklerini yönetebilen ve çevrimdışı (offline) destek sunan scriptlerdir.',
      category: 'Frontend',
      guruTip: 'PWA (Progressive Web Apps) mimarisinin kalbidir; uygulamanızın internet yokken bile çalışmasını ve anlık bildirim (Push) almasını sağlar.'
    },
    {
      id: 353,
      term: 'Tree Shaking',
      definition: 'Kullanılmayan kodların (Dead Code) build aşamasında otomatik olarak tespit edilip final paketinden temizlenmesi sürecidir.',
      category: 'Frontend',
      guruTip: 'Koca bir kütüphanenin sadece bir fonksiyonunu kullanıyorsanız, Tree Shaking geri kalan gereksiz ağırlığı atarak uygulama boyutunu küçültür.'
    },
    {
      id: 354,
      term: 'Code Splitting',
      definition: 'Uygulama kodunun tek bir büyük dosya yerine, sadece ihtiyaç duyulduğunda (Lazy Loading) yüklenen küçük parçalara bölünmesidir.',
      category: 'Frontend',
      guruTip: 'Kullanıcı ana sayfadayken tüm sitenin kodunu indirmesini engelleyerek "İlk Anlamlı Boyama" (FMP) süresini hızlandırır.'
    },
    {
      id: 355,
      term: 'Brotli & Gzip Sıkıştırma',
      definition: 'Sunucudan tarayıcıya giden dosyaları ağ üzerinden çok daha hızlı taşımak için kullanılan gelişmiş sıkıştırma algoritmalarıdır.',
      category: 'Frontend',
      guruTip: 'Brotli, modern bir algoritma olarak Gzip\'e göre %20-30 daha iyi sıkıştırma sağlar; hızı artırmak için sunucu tarafında mutlaka aktif edilmelidir.'
    },
    {
      id: 356,
      term: 'WebP & Avif Formatları',
      definition: 'JPEG ve PNG gibi klasik formatlara göre çok daha yüksek kaliteyi, çok daha küçük dosya boyutlarıyla sunan modern görsel formatlarıdır.',
      category: 'Frontend',
      guruTip: 'Görsel ağırlıklı sitelerde kaliteyi bozmadan dosya boyutlarını %50 düşürerek mobil kullanıcılar için hayati veri tasarrufu ve hız sağlar.'
    },
    {
      id: 357,
      term: 'ARIA Roles & Attributes',
      definition: 'HTML elemanlarına eklenen ve yardımcı teknolojilere (ekran okuyucular vb.) o elemanın ne işe yaradığını ve durumunu bildiren standart özniteliklerdir.',
      category: 'Frontend',
      guruTip: 'Bir elemana sadece görsel efekt vermek yetmez; ARIA etiketleriyle o elemanın "rolünü" makinelere anlatarak görme engelli kullanıcılar için sistemi erişilebilir kılarsınız.'
    },
    {
      id: 358,
      term: 'Screen Readers (Ekran Okuyucular)',
      definition: 'Erandaki metinleri sese veya Braille alfabesine dönüştürerek görme engelli bireylerin dijital dünyayı kullanmasını sağlayan yazılımlardır.',
      category: 'Frontend',
      guruTip: 'Mimarınızın başarısını ölçmek için sitenizi bir kez de ekran okuyucuyla (Örn: VoiceOver) test etmeli, kullanıcıya "anlamlı" bir akış sunup sunmadığınıza bakmalısınız.'
    },
    {
      id: 359,
      term: 'Contrast Ratio (Kontrast Oranı)',
      definition: 'Metin rengi ile arka plan rengi arasındaki parlaklık farkıdır; WCAG standartlarına göre okunabilirlik için belirli oranlarda (Örn: 4.5:1) olmalıdır.',
      category: 'Frontend',
      guruTip: 'Kötü kontrast sadece görme engelliler için değil, güneş ışığı altında telefonuna bakan herhangi bir kullanıcı için de sistemi kullanılamaz hale getirir.'
    },
    {
      id: 360,
      term: 'Focus Trap (Odak Tuzağı)',
      definition: 'Bir modal (diyalog) açıldığında, kullanıcının klavyedeki "Tab" tuşuyla dolaşırken odağın sadece o modal içinde kalmasını sağlayan erişilebilirlik kuralıdır.',
      category: 'Frontend',
      guruTip: 'Kullanıcının modal arkasındaki elemanlara yanlışlıkla odaklanmasını engelleyerek, klavye ile navigasyon yapanlar için kusursuz bir deneyim sunar.'
    },
    {
      id: 361,
      term: 'Hick\'s Law (Hick Yasası)',
      definition: 'Bir kullanıcının karar verme süresinin, ona sunulan seçeneklerin sayısı ve karmaşıklığı ile doğru orantılı olarak artmasıdır.',
      category: 'Principle',
      guruTip: 'Bir ekranda veya API arayüzünde çok fazla seçenek sunmak "karar felcine" (decision paralysis) neden olur; basitlik her zaman hızı artırır.'
    },
    {
      id: 362,
      term: 'Miller\'s Law (Miller Yasası)',
      definition: 'Ortalama bir insanın kısa süreli belleğinde aynı anda sadece 7 (± 2) öğeyi tutabileceğini savunan bilişsel ilkedir.',
      category: 'Principle',
      guruTip: 'Fonksiyon parametrelerini, modül sayılarını veya menü seçeneklerini bu sınırda tutmak, sistemin anlaşılabilirliğini ve bilişsel yükünü optimize eder.'
    },
    {
      id: 363,
      term: 'Occam\'s Razor (Ockham\'ın Usturası)',
      definition: 'Eşit güçteki iki çözümden, daha az varsayım gerektiren (daha basit olan) çözümün genellikle doğru olduğunu savunan mantık ilkesidir.',
      category: 'Principle',
      guruTip: 'Aynı problemi çözen iki mimariden en sadesini seçin; gereksiz karmaşıklık, içerisinde hata barındırma potansiyeli en yüksek olan yapıdır.'
    },
    {
      id: 364,
      term: 'Cargo Cult Programming',
      definition: 'Nedenini tam anlamadan, sadece başka başarılı yerlerde yapıldığı veya "standart" dendiği için teknoloji veya kod kalıplarını körü körüne kopyalama hatasıdır.',
      category: 'Quality',
      guruTip: 'Sırf dev şirketler kullanıyor diye küçük bir projede devasa altyapılar (Örn: Mikroservisler) kurmak bu hatanın en yaygın örneğidir; ihtiyacınıza odaklanın.'
    },
    {
      id: 365,
      term: 'Twelve-Factor App',
      definition: 'Modern, bulut tabanlı (Cloud-Native) ve SaaS uygulamaları geliştirmek için belirlenmiş 12 temel prensipten oluşan metodolojidir.',
      category: 'Modern',
      guruTip: 'Bu kurallara uyan bir uygulama; her bulut ortamında sorunsuz çalışır, kolayca ölçeklenir ve farklı platformlara taşınabilir (Portability).'
    },
    {
      id: 366,
      term: 'Context-Aware Design',
      definition: 'Uygulamanın; kullanıcının cihazına, ağ hızına, konumuna veya günün saatine göre davranışını dinamik olarak uyarlamasıdır.',
      category: 'Frontend',
      guruTip: 'Ağ hızı yavaşsa düşük kaliteli görsel sunmak veya gece saatlerinde otomatik karanlık moda geçmek gibi "bağlam duyarlı" çözümler deneyimi mükemmelleştirir.'
    },
    {
      id: 367,
      term: 'Vendor Neutrality',
      definition: 'Bir mimarinin belirli bir ticari sağlayıcıya (AWS, Azure, Google Cloud vb.) bağımlı kalmadan farklı platformlarda çalışabilme yeteneğidir.',
      category: 'Modern',
      guruTip: 'Sağlayıcıya bağımlılık (Lock-in) riskini azaltmak için açık kaynaklı ve standart teknolojiler (Örn: Kubernetes) kullanmayı hedefler.'
    },
    {
      id: 368,
      term: 'Self-Service Infrastructure',
      definition: 'Yazılımcıların, sistem ekibine ihtiyaç duymadan kendi sunucu, veritabanı gibi kaynaklarını otomatize platformlar üzerinden kendilerinin açabilmesidir.',
      category: 'Modern',
      guruTip: 'Platform mühendisliğinin temelidir; "IT bürokrasisini" ortadan kaldırarak geliştirme ekiplerinin hızını ve otonomisini maksimize eder.'
    },
    {
      id: 369,
      term: 'GitOps',
      definition: 'Tüm altyapı (IaC) ve uygulama konfigürasyonlarının Git depoları üzerinden yönetildiği, Git\'in "tek doğruluk kaynağı" olduğu operasyonel modeldir.',
      category: 'Modern',
      guruTip: 'Git üzerinde yaptığınız bir değişiklik (PR), otomasyon araçlarıyla doğrudan gerçek ortama yansır; böylece manuel hata riskini sıfıra indirir.'
    },
    {
      id: 370,
      term: 'Declarative Infrastructure',
      definition: 'Sistemin nasıl kurulacağını değil, "ne" olması gerektiğini (Örn: 3 tane sunucu istiyorum) belirten altyapı yönetim şeklidir.',
      category: 'Modern',
      guruTip: 'Siz hedefi tanımlarsınız (Terraform, K8s YAML vb.), sistem o hedefe ulaşmak için gereken tüm teknik adımları kendi arka planında yönetir.'
    },
    {
      id: 371,
      term: 'Cloud Agnostic',
      definition: 'Herhangi bir bulut sağlayıcıya (AWS, Azure vb.) özel servisler yerine, tüm ortamlarda çalışabilen standart yapıları tercih eden mimari yaklaşımdır.',
      category: 'Modern',
      guruTip: 'Vendor Lock-in riskinden kaçınmak isteyen ve yarın başka bir buluta kolayca taşınmak (migration) isteyen şirketlerin en büyük stratejisidir.'
    },
    {
      id: 372,
      term: 'Service Catalog (Servis Kataloğu)',
      definition: 'Bir organizasyondaki tüm mikroservislerin, API\'lerin ve sahiplerinin dökümante edildiği merkezi rehberdir.',
      category: 'Modern',
      guruTip: 'Şirket büyüdükçe "bu servisten kim sorumlu?" veya "bu API ne işe yarıyor?" gibi soruları saniyeler içinde cevaplayan kurumsal hafıza merkezidir.'
    },
    {
      id: 373,
      term: 'Contract Testing (Sözleşme Testi)',
      definition: 'İki servisin birbirleriyle olan haberleşme kuralını (Sözleşme / API şeması) bozup bozmadığını kontrol eden test türüdür.',
      category: 'Quality',
      guruTip: 'E2E testlerin ağırlığına girmeden, servisler arası yapılacak bir değişikliğin diğerini bozup bozmayacağını (Breaking Change) en hızlı yakalama yoludur.'
    },
    {
      id: 374,
      term: 'Schema Registry',
      definition: 'Olay bazlı (Event-driven) sistemlerde mesajların veri yapılarını (şemalarını) merkezi olarak saklayan ve versiyonlayan servistir.',
      category: 'Modern',
      guruTip: 'Mesajın yapısı değiştiğinde tüketicilerin (Consumers) hata almasını engellemek için geriye dönük uyumluluk (Compatibility) kontrolü sağlar.'
    },
    {
      id: 375,
      term: 'Data Mesh',
      definition: 'Merkezi bir veri gölü yerine; verinin, veriyi üreten her bir "Domain" tarafından bir ürün gibi bağımsız yönetildiği modern veri mimarisi felsefesidir.',
      category: 'Modern',
      guruTip: 'Veriyi merkezi ekiplerin elinden kurtarıp gerçek sahiplerine (Domain) vererek, veri analiz süreçlerini mikroservis hızıyla ölçeklendirmenizi sağlar.'
    },
    {
      id: 376,
      term: 'SLV (Service Level Verification)',
      definition: 'Belirlenen kalite (SLO) hedeflerine gerçekten ulaşılıp ulaşılmadığını kanıtlamak için yapılan periyodik doğrulama sürecidir.',
      category: 'Quality',
      guruTip: 'Sadece metrikleri izlemek yetmez; SLV ile sistemin vaat edilen standartları gerçekten karşıladığını periyodik testlerle ispatlamış olursunuz.'
    },
    {
      id: 377,
      term: 'FinOps (Bulut Finans Yönetimi)',
      definition: 'Bulut maliyetlerini optimize etmek için finans, teknoloji ve iş birimlerinin birlikte çalıştığı; herkesin kendi bulut kullanım maliyetinden sorumlu olduğu kültürdür.',
      category: 'Modern',
      guruTip: 'Bulutta sadece kodun çalışması yetmez; sistemin maliyet açısından da sürdürülebilir (cost-effective) olması artık bir mimari zorunluluktur.'
    },
    {
      id: 378,
      term: 'Right-sizing (Doğru Ölçeklendirme)',
      definition: 'Bulut kaynaklarının (CPU, RAM vb.), uygulamanın gerçek performans verilerine bakılarak tam ihtiyacı kadar seçilmesi ve israfın önlenmesi işlemidir.',
      category: 'Modern',
      guruTip: 'Gereğinden fazla kaynak (Over-provisioning) kullanarak bütçeyi yakmak yerine, metrikler ışığında en verimli kaynakları seçerek devasa tasarruf sağlayabilirsiniz.'
    },
    {
      id: 379,
      term: 'Spot Instances (Kesintili Sunucular)',
      definition: 'Bulut sağlayıcıların boşta kalan kapasitelerini çok yüksek indirimlerle sunduğu, ancak ihtiyaç anında birkaç dakika içinde geri alabildiği sunucu tipidir.',
      category: 'Modern',
      guruTip: 'Hata toleransı yüksek olan, stateless (durumsuz) ve arka plan işleri için maliyeti %90\'a kadar düşüren muazzam bir tasarruf aracıdır.'
    },
    {
      id: 380,
      term: 'Green Computing (Yeşil Bilişim)',
      definition: 'Yazılım ve altyapı tasarımlarının, enerji tüketimini ve karbon ayak izini minimize edecek şekilde optimize edilmesidir.',
      category: 'Modern',
      guruTip: 'Verimli yazılmış kod sadece hızlı çalışmakla kalmaz, aynı zamanda daha az CPU tüketerek dünyayı daha az ısıtır. Sürdürülebilirlik artık modern bir mimari metriktir.'
    },
    {
      id: 381,
      term: 'Architectural Decision Record (ADR)',
      definition: 'Bir mimari kararın arkasındaki gerekçeleri, bağlamı ve sonuçlarını dökümante eden kısa ve yapılandırılmış dökümanlardır.',
      category: 'Modern',
      guruTip: 'Gelecekte "Neden bunu böyle yapmışlar?" sorusunu cevaplayan en değerli mirastır. Mimarinin zamana karşı evrimsel günlüğüdür.'
    },
    {
      id: 382,
      term: 'Living Documentation (Yaşayan Dökümantasyon)',
      definition: 'Koddan veya testlerden otomatik üretilen ve yazılım değiştikçe kendini hep güncel tutan dökümantasyon anlayışıdır (Örn: Swagger).',
      category: 'Modern',
      guruTip: 'Elle yazılan dökümanlar hızla eskir ve yalan söyler; yaşayan döküman ise sistemin gerçek halini (Source of Truth) her zaman yansıtır.'
    },
    {
      id: 383,
      term: 'Domain Knowledge (Alan Bilgisi)',
      definition: 'Yazılımın geliştirildiği iş koluna (Örn: Bankacılık, Lojistik vb.) ait tüm kavramların ve süreçlerin teknik ekip tarafından bilinmesi durumudur.',
      category: 'Foundation',
      guruTip: 'Dünyanın en iyi kodunu yazabilirsiniz; ancak iş kurallarını (Business Logic) tam anlamıyorsanız yanlış problemi harika şekilde çözmüş olursunuz.'
    },
    {
      id: 384,
      term: 'Cognitive Complexity (Bilişsel Karmaşıklık)',
      definition: 'Bir kod parçasının bir insan tarafından ne kadar "zor anlaşıldığını" ölçen; insan zihninin kodu okurken ne kadar yorulduğuna odaklanan metriktir.',
      category: 'Quality',
      guruTip: 'Kodunuz sadece makineler için değil, insanlar için yazılır. Bilişsel karmaşıklığı düşük tutmak, uzun vadeli bakım maliyetini düşürmenin anahtarıdır.'
    },
    {
      id: 385,
      term: 'Design Tokens (Tasarım Jetonları)',
      definition: 'Bir tasarım sistemindeki renk, font, boşluk gibi en temel görsel değerlerin; platformdan bağımsız (JSON vb.) merkezi bir şekilde tanımlanmasıdır.',
      category: 'Frontend',
      guruTip: 'Bir rengi her yerde manuel yazmak yerine jetonla tutmak; markanın renk değişikliğini Web, iOS ve Android\'de aynı anda tek bir yerden yönetmenizi sağlar.'
    },
    {
      id: 386,
      term: 'Style Dictionary',
      definition: 'Design Token\'ları alıp farklı platformlar (SASS, Swift, XML vb.) için otomatik olarak değişken çıktıları üreten metodolojidir.',
      category: 'Frontend',
      guruTip: 'Tasarımcı ve yazılımcı arasındaki "renk kodu uyuşmuyor" kavgasını bitiren; tasarımın tek doğruluk kaynağını (Source of Truth) koda aktaran köprüdür.'
    },
    {
      id: 387,
      term: 'Atomic CSS (Utility-First)',
      definition: 'Karmaşık CSS sınıfları yazmak yerine, her biri tek bir görevi yapan küçük yardımcı sınıflar (Örn: p-4, flex, bg-blue) kullanarak arayüz geliştirme yaklaşımıdır.',
      category: 'Frontend',
      guruTip: 'Tailwind CSS gibi araçlarla en yüksek hıza ulaşır; CSS dosya boyutunu minimize ederken tasarım tutarlılığını kod seviyesinde garanti altına alır.'
    },
    {
      id: 388,
      term: 'Component-Driven Development (CDD)',
      definition: 'Ürünü bütünden parçaya değil, en küçük bileşenden (atom) başlayarak bütün sayfalara doğru geliştirme metodolojisidir.',
      category: 'Frontend',
      guruTip: 'Storybook gibi araçlarla her bileşeni izole bir şekilde geliştirip test etmek; sayfanın tamamı bitmeden arayüzü doğrulamayı ve tekrar kullanımı maksimize etmeyi sağlar.'
    },
    {
      id: 389,
      term: 'TTI (Time to Interactive)',
      definition: 'Sayfa yüklendikten sonra kullanıcının sistemle (tıklama, yazma vb.) tam olarak etkileşime girebildiği ana kadar geçen süredir.',
      category: 'Frontend',
      guruTip: 'Sayfanın sadece görünmesi yetmez; eğer kullanıcı butona basıyor ama tepki alamıyorsa deneyim başarısızdır. TTI bu gecikmeyi ölçen hayati bir metriktir.'
    },
    {
      id: 390,
      term: 'CLS (Cumulative Layout Shift)',
      definition: 'Sayfa yüklenirken içeriklerin (Resimler, Reklamlar vb.) aniden yer değiştirmesi sonucu oluşan görsel tutarsızlık skorudur.',
      category: 'Frontend',
      guruTip: 'Okuduğunuz metnin bir görsel yüklenince aşağı kayması berbat bir deneyimdir; elemanlara önceden sabit yer ayırarak CLS skorunu iyileştirmelisiniz.'
    },
    {
      id: 391,
      term: 'LCP (Largest Contentful Paint)',
      definition: 'Sayfanın en büyük görsel veya metin bloğunun ekranda görünme süresidir. Sayfanın "yüklendiği" algısını en çok etkileyen metriktir.',
      category: 'Frontend',
      guruTip: 'Ana sayfadaki dev görseli (Hero Image) doğru sıkıştırmak ve önceliklendirmek (LCP optimization), SEO ve kullanıcı algısı için en kritik hamledir.'
    },
    {
      id: 392,
      term: 'Hydration Error (Hidrasyon Hatası)',
      definition: 'Sunucuda üretilen HTML yapısı ile istemcide (tarayıcıda) React tarafından oluşturulmaya çalışılan yapının birbirine uymaması durumunda oluşan hatadır.',
      category: 'Frontend',
      guruTip: 'SSR süreçlerinde tarayıcıya özel window, localStorage veya rastgele (random) değerlerin kontrolsüz kullanılması bu hatanın en yaygın sebebidir.'
    },
    {
      id: 393,
      term: 'Synchronous Communication (Senkron)',
      definition: 'Bir servisin diğerine istek gönderip, yanıt gelene kadar işlemini durdurarak (blocking) beklediği iletişim yöntemidir (Örn: HTTP REST).',
      category: 'Foundation',
      guruTip: 'Anlık veri ihtiyacı için basit ve hızlıdır; ancak bir servis yavaşladığında tüm sistemi peşinden sürükleme riski taşır.'
    },
    {
      id: 394,
      term: 'Asynchronous Communication (Asenkron)',
      definition: 'İsteğin gönderilip yanıtın beklenmediği; işlemin daha sonra arka planda (Örn: Mesaj kuyruğu üzerinden) tamamlandığı iletişim yöntemidir.',
      category: 'Foundation',
      guruTip: 'Servisler arası bağımlılığı (coupling) azaltır ve sistemin toplam dayanıklılığını (Resilience) zirveye taşır.'
    },
    {
      id: 395,
      term: 'In-process Communication',
      definition: 'Aynı uygulama prosesi içindeki bileşenlerin doğrudan bellek üzerinden, ağa çıkmadan birbiriyle haberleşmesi durumudur.',
      category: 'Foundation',
      guruTip: 'En hızlı ve güvenilir haberleşme yöntemidir; monolitik yapılardan mikroservislere geçerken kaybettiğimiz ana avantaj budur.'
    },
    {
      id: 396,
      term: 'Inter-process Communication (IPC)',
      definition: 'Birbirinden farklı proseslerin veya servislerin, bir ağ protokolü (Örn: gRPC, REST, MQ) üzerinden haberleşmesidir.',
      category: 'Foundation',
      guruTip: 'Ağın her an kopabileceğini (Fallacies of Distributed Computing) her zaman hesaba katmalı ve retry mekanizmalarıyla bu bağı güçlendirmelisiniz.'
    },
    {
      id: 397,
      term: 'Fallacies of Distributed Computing',
      definition: 'Dağıtık sistemler geliştirirken düşülen "ağ güvenilirdir", "gecikme sıfırdır", "topoloji değişmez" gibi 8 hatalı varsayımın genel adıdır.',
      category: 'Principle',
      guruTip: 'Bu yanılgıları bilmek; ağ kopmalarına, gecikmelere ve güvenlik açıklarına karşı daha baştan defansif bir mimari kurmanızı sağlar.'
    },
    {
      id: 398,
      term: 'Network Partition',
      definition: 'Dağıtık bir sistemdeki düğümlerin (nodes) ağ hatası nedeniyle birbirleriyle iletişim kuramaması durumudur. CAP Teoremi\'ndeki "P" harfidir.',
      category: 'Quality',
      guruTip: 'Bölünme anında sistemin ya Tutarlılığı (Consistency) ya da Erişilebilirliği (Availability) feda etmesi gerekir; bu seçimi tasarım aşamasında yapmalısınız.'
    },
    {
      id: 399,
      term: 'Quorum (Mürettebat Çoğunluğu)',
      definition: 'Dağıtık bir sistemde bir işlemin veya kararın meşru kabul edilebilmesi için gereken minimum düğüm (sunucu) sayısıdır.',
      category: 'Modern',
      guruTip: 'Genellikle "N/2 + 1" kuralı uygulanır; bölünme anında en az %51 çoğunluğa sahip olan grup çalışmaya devam eder, diğerleri veri tutarsızlığını önlemek için durur.'
    },
    {
      id: 400,
      term: 'Consistency Model (Tutarlılık Modeli)',
      definition: 'Sistemde bir veri güncellendiğinde, bu değişikliğin diğer okuyucular ne zaman ve hangi sırayla yansıtılacağını belirleyen kurallar kümesidir.',
      category: 'Foundation',
      guruTip: 'Veri yazma hızı ile veri doğruluğu arasındaki ticari pazarlığın (Trade-off) teknik tanımıdır; senaryoya göre uygun modeli (Strong, Eventual vb.) seçmelisiniz.'
    },
    {
      id: 401,
      term: 'Compliance (Uyum)',
      definition: 'Yazılımın ve veri yönetim süreçlerinin; belirli endüstriyel, yasal veya kurumsal standartlara (Örn: SOC2, PCI DSS) uygun olma durumudur.',
      category: 'Quality',
      guruTip: 'Bir mimar sadece kodu değil, o kodun içinde çalışacağı güvenli, denetlenebilir ve yasalara uygun ortamı da tasarlamalıdır.'
    },
    {
      id: 402,
      term: 'SOC2 (Service Organization Control)',
      definition: 'Hizmet sağlayıcıların müşteri verilerini nasıl yönettiğini; Güvenlik, Erişilebilirlik ve Gizlilik kriterlerine göre denetleyen uluslararası standarttır.',
      category: 'Quality',
      guruTip: 'Kurumsal (B2B) bir ürün geliştiriyorsanız, büyük müşterileriniz sizden ilk olarak SOC2 uyumluluğu isteyecektir; teknik güvenin resmi kanıtıdır.'
    },
    {
      id: 403,
      term: 'PCI DSS',
      definition: 'Kredi kartı verilerini işleyen, saklayan veya ileten kuruluşların uyması gereken katı veri güvenliği kuralları bütünüdür.',
      category: 'Quality',
      guruTip: 'Ödeme sistemleri geliştirirken bu kurallara uymak bir seçenek değil, yasal bir zorunluluktur; veri sızıntılarına karşı finansal bir kalkandır.'
    },
    {
      id: 404,
      term: 'HIPAA',
      definition: 'Özellikle sağlık projelerinde, hastaların kişisel sağlık verilerinin (PHI) gizliliğini ve güvenliğini koruyan yasal düzenlemedir.',
      category: 'Quality',
      guruTip: 'Sağlık teknolojilerinde veri gizliliği, teknik performanstan çok daha öncelikli bir mimari gereksinimdir.'
    },
    {
      id: 405,
      term: 'WebAssembly (Wasm)',
      definition: 'Tarayıcıda yüksek performanslı (C++, Rust vb.) kodların neredeyse yerel hızda çalışmasını sağlayan bir binary formatıdır.',
      category: 'Modern',
      guruTip: 'Video düzenleme veya ağır veri işleme gibi JavaScript\'in yavaş kaldığı kompleks işlemlerde, tarayıcıda masaüstü uygulama gücü sunar.'
    },
    {
      id: 406,
      term: 'Edge Functions',
      definition: 'Sunucusuz fonksiyonların merkezi bir sunucu yerine, kullanıcıya en yakın olan CDN uç noktalarında (Edge) çalıştırılması teknolojisidir.',
      category: 'Modern',
      guruTip: 'Gecikmeyi (Latency) minimize eder; kullanıcı dünyanın neresinde olursa olsun isteği ona en yakın konumda işleyerek anlık yanıt üretir.'
    },
    {
      id: 407,
      term: 'Jamstack',
      definition: 'JavaScript, API ve Markup kelimelerinden oluşan; içeriği statik dosyalardan, dinamik işleri ise API\'lerden besleyen modern web mimarisidir.',
      category: 'Modern',
      guruTip: 'Geleneksel sunucu yönetimini yok eder; sitenin tamamını CDN üzerinden dağıtarak en yüksek güvenlik ve hıza ulaşmayı hedefler.'
    },
    {
      id: 408,
      term: 'Headless CMS',
      definition: 'Arka plandaki içerik yönetim sistemi ile kullanıcı arayüzünün tamamen ayrıldığı, içeriğin sadece bir API üzerinden sunulduğu sistemdir.',
      category: 'Modern',
      guruTip: 'Aynı içeriği hem web sitenizde, hem mobil uygulamanızda hem de farklı platformlarda tek bir veri kaynağından (API) yönetmenizi sağlar.'
    },
    {
      id: 409,
      term: 'IaaS (Infrastructure as a Service)',
      definition: 'İşlemci, disk ve ağ gibi temel bilişim kaynaklarının bulut üzerinden kiralandığı modeldir. İşletim sistemine kadar her şeyi siz yönetirsiniz.',
      category: 'Modern',
      guruTip: 'Sanal bir kiralık ev gibidir; en yüksek esnekliği sunar ancak sunucu güncellemeleri ve güvenlik yamaları gibi yönetim yükü tamamen sizdedir.'
    },
    {
      id: 410,
      term: 'PaaS (Platform as a Service)',
      definition: 'Sunucu yönetimiyle uğraşmadan, sadece kodunuzu yükleyip çalıştırdığınız platform modelidir.',
      category: 'Modern',
      guruTip: 'Altyapı detaylarına değil, sadece ürüne ve koda odaklanmak isteyen ekipler için en hızlı geliştirme ve yayınlama (deploy) yoludur.'
    },
    {
      id: 411,
      term: 'SaaS (Software as a Service)',
      definition: 'Yazılımın merkezi olarak barındırıldığı ve kullanıcılara internet üzerinden bir hizmet olarak sunulduğu modeldir.',
      category: 'Modern',
      guruTip: 'Güncelleme, güvenlik ve ölçekleme tamamen sağlayıcının sorumluluğundadır; kullanıcı sadece uygulamayı (Örn: Cloud tabanlı bir mail servisi) kullanır.'
    },
    {
      id: 412,
      term: 'Cache-Aside Pattern',
      definition: 'Uygulamanın veriyi önce önbellekten okuduğu, orada yoksa veritabanından alıp önbelleğe yazdığı en yaygın stratejidir.',
      category: 'Pattern',
      guruTip: 'En esnek yöntemdir; ancak önbellek ve veritabanı arasındaki veri tutarlılığını yönetme sorumluluğu uygulama kodundadır.'
    },
    {
      id: 413,
      term: 'Write-Through Cache',
      definition: 'Verinin aynı anda hem önbelleğe hem de veritabanına yazıldığı stratejidir; bu sayede veri her iki tarafta her zaman güncel kalır.',
      category: 'Pattern',
      guruTip: 'Okuma hızı çok yüksektir çünkü veri her zaman hazırdır; ancak her yazma işlemi iki yere yapıldığı için yazma süresi (latency) biraz artar.'
    },
    {
      id: 414,
      term: 'Write-Behind (Write-Back)',
      definition: 'Verinin önce önbelleğe yazıldığı, veritabanına ise daha sonra asenkron olarak aktarıldığı stratejidir.',
      category: 'Pattern',
      guruTip: 'Yazma performansı zirvedir (In-memory hızı); ancak veritabanına yazılmadan önce bir çöküş yaşanırsa veri kaybı riski taşır.'
    },
    {
      id: 415,
      term: 'Read-Through Cache',
      definition: 'Uygulamanın sadece önbelleğe sorduğu, veri yoksa önbellek katmanının otomatik olarak veritabanından veriyi getirip sunduğu yapıdır.',
      category: 'Pattern',
      guruTip: 'Uygulama kodunu karmaşık önbellek yönetiminden kurtarır; sistem sanki tek bir kaynaktan (Cache) veri okuyormuş gibi sadeleşir.'
    },
    {
      id: 416,
      term: 'Vertical Slice Architecture',
      definition: 'Yazılımı teknik katmanlara (UI, Business, Data) bölmek yerine, her bir iş özelliğini (feature) baştan sona (end-to-end) bir dikey dilim olarak organize eden mimari yaklaşımdır.',
      category: 'Architecture',
      guruTip: 'Katmanlar arası veri taşıma yükünü (abstraction tax) azaltarak geliştirme hızını ve ekip otonomisini maksimize eder.'
    },
    {
      id: 417,
      term: 'Onion Architecture (Soğan Mimarisi)',
      definition: 'Uygulamanın merkezine Domain katmanını koyan ve bağımlılıkların her zaman içe doğru aktığı, dış katmanların (UI, DB) çekirdekten tamamen soyutlandığı mimari yapıdır.',
      category: 'Architecture',
      guruTip: 'Dış katmanları bir soğanın kabuğu gibi soysanız dahi, en içteki iş mantığı çekirdeği hiçbir zarar görmeden çalışmaya devam eder.'
    },
    {
      id: 418,
      term: 'Feature-Sliced Design (FSD)',
      definition: 'Büyük frontend projelerini yönetmek için tasarlanmış; bileşenleri teknik türlerine göre değil, işlevsel kapsamlarına (Layers, Slices, Segments) göre organize eden modern bir metodolojidir.',
      category: 'Frontend',
      guruTip: 'Bağımlılıkların yukarıdan aşağıya (Upper to Lower) akışını katı bir şekilde kontrol ederek frontend karmaşıklığını ve kırılganlığını yok eder.'
    },
    {
      id: 419,
      term: 'Early Return (Erken Dönüş)',
      definition: 'Hata durumlarını veya basit koşulları fonksiyonun en başında (Guard Clause) kontrol edip işlemi sonlandırarak, ana iş mantığının devasa if-else blokları içine gömülmesini engelleyen kodlama stilidir.',
      category: 'Clean Code',
      guruTip: 'Kodun bilişsel yükünü (Cognitive Load) azaltır; fonksiyonu okurken "eğer"ler içinde kaybolmak yerine ana yolu takip edersiniz.'
    },
    {
      id: 420,
      term: 'Atomic Logic (Atomik Mantık)',
      definition: 'Karmaşık iş kurallarını en küçük, bağımsız ve tek başına test edilebilir parçalara bölme disiplinidir.',
      category: 'Principle',
      guruTip: 'Büyük use-case\'leri atomik parçalara ayırırsanız, hem test yazmak kolaylaşır hem de aynı mantığı farklı yerlerde güvenle tekrar kullanabilirsiniz.'
    },
    {
      id: 421,
      term: 'Glassmorphism (Cam Morfizmi)',
      definition: 'Yarı saydam yüzeyler, arka plan bulanıklığı (backdrop-filter: blur) ve ince ışık yansımaları kullanarak arayüzde bir derinlik ve cam panel hissi yaratan modern bir tasarım stilidir.',
      category: 'Design',
      guruTip: 'ArchAcademy\'nin ana estetik dilidir; katmanlar arasındaki hiyerarşiyi fiziksel bir derinlik hissiyle kullanıcıya hissettirir.'
    },
    {
      id: 422,
      term: 'Monolith First (Önce Monolit)',
      definition: 'Bir sistemi başlangıçta mikroservis olarak bölmek yerine, önce tek parça (monolitik) olarak kurup sınırlar netleştiğinde ve ihtiyaç doğduğunda parçalamayı savunan senior mimari stratejisidir.',
      category: 'Strategy',
      guruTip: 'Mikroservislerin getirdiği ağ karmaşıklığına (overhead) girmeden önce, iş kurallarını (Domain) monolit içinde olgunlaştırmayı hedefler.'
    },
    {
      id: 423,
      term: 'Modular Monolith (Modüler Monolit)',
      definition: 'Uygulamanın tek bir proses içinde çalışmasına rağmen, kodun mantıksal olarak birbirine dokunmayan bağımsız modüllere (Bounded Contexts) ayrıldığı mimari yapıdır.',
      category: 'Architecture',
      guruTip: 'Mikroservislerin karmaşıklığı olmadan mikroservislerin modülerlik avantajını sunar; katı modül sınırları sayesinde ileride kolayca ayrıştırılabilir.'
    },
    {
      id: 424,
      term: 'Visual Use Case (Görsel Kullanım Durumu)',
      definition: 'Geleneksel bir use case\'den farklı olarak; kullanıcının bir kavramı öğrenmesini, bir simülasyonu denemesini veya karmaşık bir mimariyi görsel olarak ameliyat etmesini sağlayan interaktif bir eğitim akışıdır.',
      category: 'Methodology',
      guruTip: 'ArchAcademy gibi portal projelerinde, dökümantasyonun kendisi bir interaktif "başarı hikayesi" (use case) haline gelir.'
    },
    {
      id: 425,
      term: 'Design Ubiquitous Language (Tasarımsal Ortak Dil)',
      definition: 'Tasarımcılar ve geliştiriciler arasında kurulan; bileşen adlarından jetonlara (Design Tokens) kadar her şeyin hem tasarım araçlarında hem de kodda aynı isimle anılmasıdır.',
      category: 'Design',
      guruTip: 'Eğer tasarımcı "Aura-Primary" diyorsa ve siz kodda "purple-500" diyorsanız, ortak dil bozulmuştur; tasarım dökümantasyonu yaşayan bir sözleşmedir.'
    },
    {
      id: 426,
      term: 'CQRS (Command Query Responsibility Segregation)',
      definition: 'Sistemin okuma (Query) ve yazma (Command) operasyonlarını birbirinden ayıran mimari desendir. Veri tutarlılığı ve performans optimizasyonu sağlar.',
      category: 'Architecture',
      guruTip: 'Okuma ve yazma yükleri çok farklı olan büyük ölçekli sistemlerde (örn: E-ticaret) hayat kurtarır.'
    },
    {
      id: 427,
      term: 'Microkernel Architecture (Plug-in)',
      definition: 'Sistemin temel bir çekirdek (kernel) ve bu çekirdeğe eklenen bağımsız eklentiler (plug-ins) üzerine kurulu olduğu mimari yapıdır.',
      category: 'Architecture',
      guruTip: 'VS Code veya Chrome gibi uygulamalar en iyi örneğidir. Ana gövde değişmez, yetenekler eklentilerle gelir.'
    },
    {
      id: 428,
      term: 'Space-Based Architecture',
      definition: 'Veri tutarlılığı ve yüksek ölçeklenebilirlik için verinin ve işlem merkezinin "space" adı verilen bir ortamda dağıtık olarak saklandığı yapıdır.',
      category: 'Architecture',
      guruTip: 'Veritabanı darboğazını çözmek için "Cloud-based sharing" mantığını kullanır; veriyi hafızada (in-memory) tutarak hızı artırır.'
    },
    {
      id: 429,
      term: 'Lambda Architecture',
      definition: 'Büyük veri (Big Data) sistemlerinde hem gerçek zamanlı (Speed Layer) hem de geçmişe dönük (Batch Layer) veriyi işlemek için kullanılan hibrit mimari.',
      category: 'Data',
      guruTip: 'Hem anlık veriyi hem de kesinleşmiş geçmiş veriyi aynı anda görmek isteyen finans/analiz sistemleri için idealdir.'
    },
    {
      id: 430,
      term: 'Kappa Architecture',
      definition: 'Lambda mimarisinin karmaşıklığını azaltan, tüm veriyi tek bir "stream processing" katmanı üzerinden işleyen mimarı yapı.',
      category: 'Data',
      guruTip: 'Batch katmanını devre dışı bırakır; her şeyi bir "akış" (stream) olarak görür.'
    },
    {
      id: 431,
      term: 'MVP (Model-View-Presenter)',
      definition: 'UI mantığını Model ve View arasından tamamen ayırarak bir Presenter üzerinden yöneten mimari desendir.',
      category: 'Design Pattern',
      guruTip: 'Unit test yazmayı kolaylaştırır çünkü View sadece bir "dumy" (aptal) arayüze dönüşür.'
    },
    {
      id: 432,
      term: 'Pipeline (Pipe-Filter)',
      definition: 'Bir verinin bir dizi işlemden (filter) sırayla geçerek dönüştürüldüğü mimari stildir.',
      category: 'Architecture',
      guruTip: 'Video sıkıştırma veya log işleme sistemleri gibi aşamalı işlerde çok başarılıdır.'
    },
    {
      id: 433,
      term: 'Serverless (FaaS)',
      definition: 'Geliştiricinin sunucu yönetimiyle ilgilenmediği, kodun olaylar üzerine tetiklenip çalıştığı bulut mimarisi.',
      category: 'Modern',
      guruTip: 'Çalışmadığı sürece para ödemezsin; "Kodum sadece ihtiyaç anında yaşasın" mantığıdır.'
    },
    {
      id: 434,
      term: 'Publish-Subscribe (Pub/Sub)',
      definition: 'Göndericilerin (publishers) mesajları belirli alıcılara değil, bir kanal üzerinden yayınladığı ve ilgilenenlerin (subscribers) bu kanalı dinlediği desen.',
      category: 'Coordination',
      guruTip: 'Sistem bileşenlerini tamamen birbirinden koparır. Kimin kimi dinlediğini bilmesine gerek yoktur.'
    },
    {
      id: 435,
      term: 'Primary-Secondary (Master-Slave)',
      definition: 'Bir ana birimin (Primary) tüm yazma işlemlerini ve kontrolü üstlendiği, diğer birimlerin (Secondary) ise okuma veya yedekleme yaptığı mimari tarz.',
      category: 'Architecture',
      guruTip: 'Veritabanı okuma performansını artırmak ve veri güvenliğini sağlamak için standart bir yöntemdir.'
    },
    {
      id: 436,
      term: 'Peer-to-Peer (P2P)',
      definition: 'Merkezi bir sunucu olmadan, ağdaki her birimin hem istemci hem de sunucu gibi davranarak doğrudan birbirleriyle veri paylaştığı mimari.',
      category: 'Networking',
      guruTip: 'Blockchain ve Torrent gibi sistemlerin temelidir. Tek bir hata noktası (SPOF) içermez.'
    },
    {
      id: 437,
      term: 'Object-Oriented Architecture',
      definition: 'Sistemi birbirleriyle mesajlaşan ve kendi verisini/mantığını saklayan (encapsulation) nesneler bütünü olarak gören klasik mimari.',
      category: 'Architecture',
      guruTip: 'Gerçek dünyayı modellemek için en doğal yoldur ama bazen gereksiz hiyerarşi karmaşası yaratabilir.'
    },
    {
      id: 438,
      term: 'Broker Architecture',
      definition: 'Dağıtık sistemlerde bileşenlerin birbirini tanımasına gerek kalmadan, mesajların bir aracı (broker) üzerinden yönlendirildiği mimari stil.',
      category: 'Coordination',
      guruTip: 'Kafka veya RabbitMQ bu mimarinin en popüler temsilcileridir.'
    },
    {
      id: 439,
      term: 'Component-Based Architecture',
      definition: 'Sistemi bağımsız, tekrar kullanılabilir ve iyi tanımlanmış arayüzleri olan bileşenlere bölen tasarım yaklaşımı.',
      category: 'Architecture',
      guruTip: 'Web bileşenleri (React, Vue) bu mantığın frontend dünyasındaki en net yansımasıdır.'
    },
    {
      id: 440,
      term: 'Concurrency (Eşzamanlılık)',
      definition: 'Birden fazla işlemin aynı zaman dilimi içinde, birbirlerini beklemeden (paralel veya interleaved) yürütülmesidir.',
      category: 'Foundation',
      guruTip: 'Doğru yönetilmezse Race Condition hatalarına yol açar; Lock ve Mutex gibi mekanizmalarla kontrol edilmelidir.'
    },
    {
      id: 441,
      term: 'Data-Centric Architecture',
      definition: 'Tüm sistemin merkezi bir veri tabanı veya veri deposu (Data Store) etrafında kurulduğu, bileşenlerin veriye göre şekillendiği mimari.',
      category: 'Architecture',
      guruTip: 'Verinin kendisi en değerli varlıktır; logic veriye hizmet eder. Büyük veri ambarları bu mantığa yakındır.'
    },
    {
      id: 442,
      term: 'Deployment Manager',
      definition: 'Uygulamanın farklı ortamlara (Dev, Prod) dağıtım sürecini otomatize eden ve yöneten bileşen veya araç.',
      category: 'Modern',
      guruTip: 'CI/CD süreçlerinin orkestra şefidir; hatasız canlıya geçişin anahtarıdır.'
    },
    {
      id: 443,
      term: 'Virtualized Middleware',
      definition: 'Dağıtık sistemlerin katmanları arasında iletişimi sağlayan ara katman yazılımının sanallaştırılarak esnek hale getirilmesi.',
      category: 'Data',
      guruTip: 'Space-Based mimarilerde bileşenlerin birbirini bulmasını ve veri paylaşmasını sağlayan görünmez köprüdür.'
    },
    {
      id: 444,
      term: 'Interpreter (Yorumlayıcı)',
      definition: 'Bilgisayar programlarını satır satır doğrudan yürüten, ara bir makine diline çevirmeden çalıştıran mimaridir.',
      category: 'Interpreter',
      guruTip: 'Python ve JavaScript gibi dillerin çalışma mantığıdır; esnektir ama derlenmiş dillere göre daha yavaştır.'
    },
    {
      id: 445,
      term: 'Broker (Aracı)',
      definition: 'Dağıtık sistemlerde mesajların ve servis isteklerinin merkezi bir aracı üzerinden yönlendirildiği yapıdır.',
      category: 'Coordination',
      guruTip: 'Sistemin ölçeklenmesini sağlar ama Broker çökerse tüm haberleşme kesilir.'
    },
    {
      id: 446,
      term: 'MVC (Model-View-Controller)',
      definition: 'Veri (Model), Kullanıcı Arayüzü (View) ve Mantık (Controller) katmanlarını kesin çizgilerle ayıran klasiktir.',
      category: 'Interface',
      guruTip: 'Web geliştirmenin en temel taşıdır; sorumlulukları ayırmak için hala en iyi yollardan biridir.'
    },
    {
      id: 447,
      term: 'MVVM (Model-View-ViewModel)',
      definition: 'View ile Model arasındaki bağın otomatik bir "Binding" mekanizmasıyla sağlandığı modern UI mimarisidir.',
      category: 'Interface',
      guruTip: 'React, Vue ve Angular gibi modern kütüphanelerin ruhunda bu "veriden görünüme" akış vardır.'
    },
    {
      id: 448,
      term: 'Screaming Architecture (Çığlık Atan Mimari)',
      definition: 'Bir yazılımın klasör yapısının, kullanılan teknolojileri (React, Express, Rails vb.) değil, projenin asıl iş amacını (Banka, E-ticaret vb.) yansıtması gerektiğini savunan yaklaşımdır.',
      category: 'Foundation',
      guruTip: 'Klasörlerinize baktığınızda "Controllers" yerine "UseCases" veya "Orders" görüyorsanız, mimariniz doğru şekilde çığlık atıyor demektir.'
    },
    {
      id: 449,
      term: 'Sovereign Architecture (Egemen Mimari)',
      definition: 'Dijital varlıkların, verilerin ve altyapının kontrolünün tamamen organizasyonda kalmasını sağlayan, dış sağlayıcılara (Cloud vendor-lock vb.) olan bağımlılığı mimari seviyede en aza indiren yaklaşımdır.',
      category: 'Modern',
      guruTip: '"Bulut ölse de sistemim ölmesin" mantığıdır. Portable (taşınabilir) ve uyumlu (compliant) sistemler inşa etmenin anahtarıdır.'
    },
    {
      id: 450,
      term: 'Layer-First vs Feature-First',
      definition: 'Mimarinin klasör organizasyonu stratejisidir. Layer-First kodu teknik katmanlara (Domain, Infra vb.) göre bölerken; Feature-First kodu iş özelliklerine (Orders, Users vb.) göre dikey dilimler (Vertical Slices) halinde böler.',
      category: 'Foundation',
      guruTip: 'Modern projelerde "Feature-First" yaklaşımı sürdürülebilirlik and bağımsızlık açısından çok daha üstündür; mimarinin ne iş yaptığını "haykırmasını" sağlar.'
    },
    {
      id: 452,
      term: 'Islands Architecture',
      definition: 'Sadece sayfanın interaktif olan kısımlarının (adalar) JavaScript ile canlandırıldığı, geri kalanının statik HTML kaldığı modern frontend mimarisidir.',
      category: 'UI Architecture',
      guruTip: 'Astro gibi frameworklerin temelidir. Gereksiz JavaScript yükünü (vampire code) yok eder.'
    }
];


