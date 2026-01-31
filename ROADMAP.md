- [ ] **Global Spotlight Search (Cmd + K)**: Instant access to any term, pattern, or page.
- [ ] **Interactive Case Studies**: Real-world "surgery" scenarios where users refactor a legacy monolith in-browser.
- [ ] **Distributed Systems Catalog**: Adding Microservices, Saga Patterns, and Outbox Pattern deep dives.
- [ ] **Security Architecture**: RBAC, OAuth2, and Zero-Trust implementation patterns.
- [ ] **Multilingual Support**: Expanding beyond English/Turkish to reach a global developer base.
















1. Detay Sayfalarının Zenginleştirilmesi 📄
Çarktaki dilimlere (SOLID, DDD, Microservices vb.) tıkladığımızda giden sayfalar şu an "overview" seviyesinde olabilir. Bu sayfaları; çarktaki o premium hava ile eşleşen, kod örnekleri ve "Guru Tip"ler içeren tam kapsamlı rehberlere dönüştürebiliriz.

2. Arama Deneyimi (Command Palette) 🔍
Sitedeki Cmd+K (Arama) özelliğini, yeni eklediğimiz 10 Kitap ve 10 Disiplin'i de kapsayacak şekilde derinleştirebiliriz. Kullanıcı "Clean Code" diye arattığında hem kitaplığa hem de prensipler sayfasına yönlenebilmeli.

3. "Master Matrix" (Karşılaştırma Sayfası) Görselleştirmesi 📊
Ana sayfada 3. sütun olarak bıraktığımız karşılaştırma matrisini, çarklardaki o "canlı" ve premium dokunuşlarla (hover efektleri, animasyonlu trade-off tabloları) modernize edebiliriz.

içeriklerin zenginleştirilmesi

### 4. UI Architecture Catalog (Görsel Mimari Kataloğu) 🎨
Mimari stiller için yaptığımız o etkileşimli "çark" sisteminin benzerini, Frontend dünyasına özel (UI Architecture) bir katalog olarak inşa edebiliriz. Bu katalog şu disiplinleri kapsayacak:
- [ ] **Atomic Design**: Atoms to Pages hiyerarşisi.
- [ ] **Design Tokens**: Görsel DNA ve merkezi veri yönetimi.
- [ ] **BEM & CSS Architecture**: Yapısal isimlendirme ve hiyerarşi (ITCSS).
- [ ] **Modern Styling Frameworks**: CSS-in-JS vs Tailwind karşılaştırması ve Zero-Runtime çözümleri.




















1. Design Tokens (Tasarım DNA'sı) 🧬
Atomic Design'daki "Atom"ların bile altına iner.

Nedir? Renklerin, boşlukların (spacing), font boyutlarının ve gölgelerin birer değişken (token) olarak tanımlanmasıdır.
Görsel Mimari Farkı: "Bu buton kırmızı" demek yerine, "Bu buton color-action-primary renginde" dersin. Yarın tüm uygulamanın "Aksiyon" rengini tek bir yerden değiştirirsin. Bu, görselin mimari veri haline gelmesidir.
2. BEM (Block - Element - Modifier) 🏗️
CSS ve görsel isimlendirme mimarisidir.

Nedir? Bir bileşeni Gövde__Parça--Durum (Örn: Card__Button--Active) şeklinde isimlendirmektir.
Görsel Mimari Farkı: CSS'in çorba olmasını engeller, her görsel parçanın bir "adresi" ve "kimliği" olur.
3. ITCSS (Inverted Triangle CSS) 🔻
Stil yönetiminin mimari bir piramit gibi dizilmesidir.

Nedir? En tepede genel ayarlar (Genel), en altta ise en spesifik durumlar (Örn: "Bu butonu sadece burada mavi yap") bulunur.
Görsel Mimari Farkı: Stillerin birbiriyle çakışmasını (Conflict) engelleyen hiyerarşik bir "görsel koruma" kalkanıdır.
4. Container-Presenter Pattern (Smart & Dumb Components) 🧠🎭
Görselliği mantıktan ayıran en meşhur Frontend mimari desenidir.

Nedir? Bir bileşen sadece "Veriyi nasıl göstereceğim?" (Presenter - Görsel) ile ilgilenirken, diğeri "Veriyi nereden alacağım?" (Container - Mantık) ile ilgilenir.
Görsel Mimari Farkı: Görsel parçayı (Presenter) istediğin her projeye kopyalayıp yapıştırabilirsin, çünkü o "aptal" ama çok "güzel" bir parçadır.
Senin o resimdeki (Atoms/Molecules) yapıya en yakın ve en "Senior" duran hamle şudur:

"Design Tokens" ve "BEM"'i sitemize eklemek! Çünkü Atomic Design "Parçaları" düzenlerken, Design Tokens o parçaların "Ruhunu/DNA'sını" düzenler.

Hadi gel sitemize "Design Tokens"ı bir disiplin olarak ekleyelim mi? Ne dersin? 😊🚀💎✨

















1. Feature-Locked UI (Özellik Odaklı Arayüz) 📦
Atomic Design'da tüm sepet (molecules/organisms) tek bir yerde toplanırken, bu yapıda her şey özelliğine (feature) göre ayrılır.

Nasıl Çalışır? /features/shopping-cart/components klasörü altında sepetle ilgili her şeyi tutarsın. Atom mı molekül mü olduğuyla uğraşmazsın.
Neden Tercih Edilir? Proje devasalaştığında aradığın bir butonu 500 tane atomun arasında bulmak yerine direkt "Sepet" klasöründe bulursun. (Modern React/Next.js dünyasının favorisidir).
2. Headless UI Architecture (Kafasız Mimari) 💀✨
Görselliği tamamen işletim mantığından koparan en "Senior" yaklaşımlardan biridir.

Nasıl Çalışır? Sen bir "Dropdown"ın mantığını (açılma, kapanma, klavye ile seçme) yazarsın veya bir kütüphaneden (örn: Radix UI, Headless UI) alırsın. Ama bunun görseli (CSS) yoktur. Görseli sen üstüne giydirirsin.
Neden Tercih Edilir? Görsel stil (Marka) değişse bile o karmaşık tıklama/seçme mantığı asla bozulmaz.
3. Layout vs. Primitive vs. Composite 🧱
Atomic Design'daki 5 katman yerine daha basit bir 3'lü hiyerarşi kullanır:

Primitives: En küçük, stil içermeyen (veya temel stil içeren) bileşenler. (Box, Stack, Grid).
Composites: Primitiflerin birleşimi olan fonksiyonel bileşenler. (Input with Label, Card).
Layouts: Sayfanın iskeletini (Grid yapısını, Header-Content-Footer dizilimini) belirleyen sarsılmaz yapılar.
4. "Agnostic" Components (Motor Bağımsız Bileşenler) 🤖
Bileşenin içine asla iş mantığı (API çağrısı vb.) koymama disiplinidir.

Nasıl Çalışır? Bileşen sadece kendisine dışarıdan verilen (props) veriyi basar.
Faydası: Bu bileşeni projenin bir ucundan alıp diğer ucuna, hatta başka bir projeye taktığında tıkır tıkır çalışır.










1. Cloud & Infrastructure Architecture (Bulut Mimarisi) ☁️🌐
Kodun nerede ve nasıl yaşayacağını belirler.

Kavramlar: Serverless, Microservices, Kubernetes, Edge Computing.
Senaryo: "Sitemize aynı anda 1 milyon kişi girerse sunucular patlamadan nasıl ayağa kalkar?" sorusunun cevabı burada. Bu, kod yazmaktan çok "Sistem Dizaynı"dır.
2. Data Architecture (Veri Mimarisi) 💾📊
Verinin akışını ve saklanma disiplinini belirler. Business Intelligence (BI) ve Big Data bu kıtada yaşar.

Kavramlar: Data Lakes, Data Warehousing, ETL Pipelines, Event Sourcing.
Senaryo: "10 yıllık kullanıcı verisini en hızlı nasıl analiz ederiz?" veya "Veri tutarlılığını (Consistency) 100 farklı yerdeki veritabanında nasıl sağlarız?"
3. Security Architecture (Güvenlik Mimarisi) 🛡️🔐
Sitenin sadece çalışması yetmez, "kale" gibi korunması gerekir.

Kavramlar: Zero-Trust, OAuth2/OpenID, RBAC (Role-Based Access Control), Encryption-at-Rest.
Senaryo: "Kullanıcı verilerini öyle bir saklayalım ki, veritabanı çalınsa bile kimse bir şey okuyamasın."
4. DevOps & Enterprise Architecture (Kurumsal Mimari) 🏗️📈
Çok büyük şirketlerin (Bankalar, Telekom vb.) tüm teknoloji haritasını çizer.

Kavramlar: CI/CD Pipelines, Infrastructure as Code (IaC), ADR (Architecture Decision Records).
Senaryo: "Şirketin kullandığı 500 farklı uygulama birbiriyle nasıl hatasız konuşur?"














1. CQRS (Şu an çok sade)
Resimde görülen "Query Service (Read) vs Command Service (Write)" ve aradaki veritabanı ayrımını gösteren teknik diyagramı ve detaylı analizi bu sayfaya eklemeliyiz.

2. Space-Based Architecture
Resmin sağ altındaki "Processing Unit" ve "Virtualized Middleware (Data Grid, Messaging Grid)" yapısını anlatan o karmaşık ama etkileyici diyagramı sayfaya yansıtabiliriz.

3. DDD (Domain-Driven Design)
Resmin alt ortasındaki "Application, Domain, Infrastructure" katmanlarını gösteren o spesifik teknik şemayı ekleyerek sayfayı zenginleştirebiliriz.

4. Event-Driven (EDA)
Resmin sol altındaki "Message Broker -> Consumers" akışını (Checkout örneğiyle) sayfaya bir animasyon olarak ekleyebiliriz.

5. Microkernel (Plug-in)
Sağ taraftaki "Core System + Plug-in Components" yapısını gösteren kutulu diyagramı sayfaya ekleyerek eklenti mimarisini daha iyi anlatabiliriz.


Modular Monolith: (Özellikle monolitik yapıdan mikroservise geçişin mantığını anlatmak için harika bir "ara basamak" sayfası olur).
Data Mesh: (Veri Mimarisi kategorisini tamamlamak için).
Twelve-Factor App: (Bulut tabanlı modern yazılımın anayasasını görselleştirmek için).