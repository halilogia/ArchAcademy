We need answer: translate Turkish software architecture component content into English. Need output only clean valid TypeScript/JSX? User says translate content into English, file is mvvm.tsx. We need provide translated file? Need follow strict rules: preserve code and syntax, preserve technical terms, no markdown wrapping unless requested. "OUTPUT FORMAT: Output ONLY clean, valid TypeScript / code as requested, with NO markdown backtick wrapping unless specifically requested." Here asked "Translate ... content into English" likely expects translated file content, perhaps code block? But says output only clean valid TypeScript/code no markdown. We should output entire file translated strings to English, preserving code. Need use caveman style? User system says "Respond like terse caveman." But task translation requires actual content translation, not commentary. We need translate Turkish text in strings/JSX to English idiomatic American English. Also maintain code exact. Need translate all Turkish user-facing text: titles, descriptions, comments, buttons, list items, table headers, etc. Need preserve code identifiers and technical terms (MVVM, ViewModel, Data Binding, Clean Architecture, etc.). We need produce full file with English strings. Need careful with accents, quotes. Need maybe convert Turkish characters to English. 

Let's parse content. Need translate all Turkish text within JSX:
- ArchHero description: "Model-View-ViewModel. UI mantığını iş mantığından tamamen koparan, veri bağlama (Data Binding) ve reaktif programlama odaklı modern bir mimari desen."
- features descriptions: "Data Binding", "Testability", "Decoupling" with Turkish desc.
- tabs labels: "Principles", "Hybrid Approach", "Now in Android" already English, but maybe "Principles" etc. OK.
- Section heading "MVVM vs. Clean Architecture", etc.
- Note text: "Karıştırılan en büyük nokta: MVVM bir "Sunum Deseni" (Presentation Pattern) iken, Clean Architecture bir "Sistem Mimarisi"dir (System Architecture)."
- Card texts: "UI katmanının iç işleyişine odaklanır..." etc.
- "ViewModel Counterpart in Clean Arch" maybe comments? There's English comment `{/* ViewModel Counterpart in Clean Arch */}` perhaps already English? Actually comment in Turkish? It says `{/* ViewModel Counterpart in Clean Arch */}` English? Need check original: "ViewModel Counterpart in Clean Arch" maybe already English? In file: `{/* ViewModel Counterpart in Clean Arch */}` in Turkish? It is English. Need translate all Turkish comments? For comments, maybe translate? Rules translate content; code comments can be English. Some Turkish comments: `{/* --- MVVM VS CLEAN ARCHITECTURE SECTION --- */}`? It's English? Actually "MVVM VS CLEAN ARCHITECTURE SECTION" all caps English. Some Turkish comments? Let's scan:
`{/* --- MVVM VS CLEAN ARCHITECTURE SECTION --- */}` no Turkish except maybe "Mimarinin Faydaları" etc inside content.
`{/* --- ARCHITECTURE BLUEPRINT (FOLDER STRUCTURE & EXAMPLE) --- */}` English.
`{/* VS Code Inspired Folder Structure */}` English.
`{/* Flow Explanation */}` English.
Need translate all string literals inside JSX, not comments maybe.

We'll go through each Turkish text.

I'll produce full file exactly with code unchanged, but replace Turkish text strings and visible content. Need preserve quotes and JSX expressions. Need translate:

1. description: "Model-View-ViewModel. UI mantığını iş mantığından tamamen koparan, veri bağlama (Data Binding) ve reaktif programlama odaklı modern bir mimari desen." -> "Model-View-ViewModel. Modern architectural pattern that completely decouples UI logic from business logic, focused on data binding and reactive programming."

2. features:
- desc: "ViewModel'deki state değiştiğinde View (UI) anında ve otomatik olarak güncellenir." -> "When state in the ViewModel changes, the View (UI) updates instantly and automatically."
- "ViewModel, UI framework'ünden bağımsız olduğu için saf logic testleri kolaylaşır." -> "ViewModel is independent of the UI framework, so pure logic tests are easier."
- "View ve Model birbirini asla tanımaz; aradaki köprü ViewModel'dir." -> "View and Model never know each other; the bridge between them is the ViewModel."

3. Section heading paragraph: "Karıştırılan en büyük nokta: MVVM bir "Sunum Deseni" (Presentation Pattern) iken, Clean Architecture bir "Sistem Mimarisi"dir (System Architecture)." -> "The biggest misconception: MVVM is a 'Presentation Pattern', while Clean Architecture is a 'System Architecture'."

4. Card1: 
"UI katmanının iç işleyişine odaklanır. Görünüm (View) ile Veri (Model) arasındaki bağı koparmak için "ViewModel" köprüsünü kullanır. <strong> "Bu butona basınca ekranda ne değişecek?" </strong> sorusuna yanıt verir." -> "Focuses on the inner workings of the UI layer. Uses the 'ViewModel' bridge to break the connection between View and Model. Answers the question: <strong>'What will change on screen when this button is pressed?'</strong>"
Need be careful with quotes. Use double quotes? In JSX text can contain. Use English.

"📍 <strong>Kapsam:</strong> Sadece Sunum Katmanı (Presentation Layer)." -> "📍 <strong>Scope:</strong> Presentation Layer only."

5. Card2:
"Tüm uygulamanın (DB, API, Business Logic, UI) nasıl organize edileceğini anlatır. Katmanlar arası bağımlılık kuralına odaklanır. <strong> "İş mantığı (Business Logic) dış dünyadan nasıl korunur?" </strong> sorusuna yanıt verir." -> "Describes how the entire application (DB, API, Business Logic, UI) should be organized. Focuses on the dependency rule between layers. Answers the question: <strong>'How is business logic protected from the outside world?'</strong>"
"📍 <strong>Kapsam:</strong> Tüm Proje ve Katmanlar." -> "📍 <strong>Scope:</strong> Entire project and layers."

6. "ViewModel Counterpart in Clean Arch" section:
- Text: "Clean Architecture'ın <strong>Interface Adapters</strong> (Yeşil halka) katmanında bulunan <strong>Presenter</strong>, tam olarak ViewModel'in görevini yapar:" -> "The <strong>Presenter</strong> in Clean Architecture's <strong>Interface Adapters</strong> layer (green ring) does exactly the ViewModel's job:"
- `<li><strong>UseCase Çıktısını Hazırlar:</strong> Domain katmanından gelen ham entity verisini UI'ın anlayacağı "Display Model"e dönüştürür.</li>` -> "Prepares UseCase output: Converts raw entity data from the domain layer into a 'Display Model' the UI can understand."
- `<li><strong>Durum Yönetimi:</strong> Uygulamanın anlık görsel durumunu (loading, error, list) tutar.</li>` -> "State management: Holds the app's current visual state (loading, error, list)."
Also label "Clean Arch'ta Karşılığı: <span style={{ color: '#3b82f6' }}>Presenter</span>" -> "Clean Architecture equivalent: <span style...>Presenter</span>"
"ViewModel" and "MVVM'deki İsmi" -> "Name in MVVM" maybe "ViewModel" label and "Name in MVVM" on side.

7. Section "UI Katmanı" and "Veri Katmanı":
- `<h3 ...><Layout size={24} /> UI Katmanı</h3>` -> "UI Layer"
- List item1: `<strong>View (Widgets):</strong> Sadece görseli tanımlar. İş mantığı barındırmaz. Flutter'da bunlar Stateless veya Stateful widget'lardır.` -> "View (Widgets): Defines only the visual. Contains no business logic. In Flutter, these are Stateless or Stateful widgets."
- item2: `<strong>ViewModel:</strong> Veriyi UI State'e dönüştürür. Repositories'den gelen veriyi View'un anlayacağı formata sokar.` -> "ViewModel: Converts data into UI state. Formats data from repositories into a structure the View can understand."
- `<h3 ...><Database size={24} /> Veri Katmanı</h3>` -> "Data Layer"
- item1: `<strong>Repositories:</strong> Tekil gerçeklik kaynağıdır (Single Source of Truth). Caching, error handling ve retry mantığı burada yaşar.` -> "Repositories: Single source of truth. Caching, error handling, and retry logic live here."
- item2: `<strong>Services:</strong> En alt katmandır. API endpoint'lerini veya yerel dosyaları wrap eder. Hiçbir state tutmazlar.` -> "Services: Lowest layer. Wrap API endpoints or local files. Hold no state."

8. Trade-off analysis:
- `<h2 ...>Trade-off Analizi</h2>` -> "Trade-off Analysis"
- Table headers: "Avantajlar (Pros)" -> "Pros", "Dezavantajlar (Cons)" -> "Cons"
- row items:
  - "Bağımsız Test Edilebilirlik" -> "Independent Testability"
  - "UI ve İş Mantığı Ayrımı" -> "Separation of UI and Business Logic"
  - "Reaktif ve Dinamik UI Yapısı" -> "Reactive and Dynamic UI Structure"
  - "Küçük Projeler İçin Overkill" -> "Overkill for Small Projects"
  - "Boilerplate (Fazla Dosya) Sayısı" -> "Boilerplate (Too Many Files)"
  - "Öğrenme Eğrisi (Reactive Paradigm)" -> "Learning Curve (Reactive Paradigm)"

9. Hybrid tab:
- WhyLayered badge: "NEDEN HYBRID-FIRST?" -> "WHY HYBRID-FIRST?"
- title: `Google Neden Hibrit <br /><span className="gradient-text">Yapıyı Öneriyor?</span>` -> "Why Google Recommends the Hybrid <br/><span className...>Structure?</span>" maybe "Why Google Recommends the Hybrid Approach?" 
- description: "Google'ın resmi mimari vaka çalışmaları, MVVM'in esnekliği ile katmanlı yapının disiplinini birleştiren Hibrit modeli savunur. Bu sayede hem hız hem de ölçeklenebilirlik korunur." -> "Google's official architecture case studies advocate a hybrid model combining MVVM's flexibility with layered discipline. This preserves both speed and scalability."
- Section heading: "Hibrit MVVM Yaklaşımı" -> "Hybrid MVVM Approach"
- paragraph: "Büyük ölçekli projelerde bağımlılıkları yönetmenin en asil yolu: Veriyi merkezi, arayüzü özellik bazlı kurgulamaktır." -> "The most elegant way to manage dependencies in large-scale projects: centralize data, feature-base the UI."
- h3: "Merkezi Mantık vs. Özellik Bazlı UI" -> "Centralized Logic vs. Feature-Based UI"
- paragraph: "Google'ın önerdiği bu hibrit yapı, uygulamanın farklı katmanlarını "değişim sıklığına" göre gruplar. Data ve Domain katmanları bir kütüphane gibi <strong>merkezi (Type-based)</strong> dururken, UI katmanı tamamen bağımsız <strong>özelliklere (Feature-based)</strong> bölünür." -> "This hybrid structure recommended by Google groups different layers of the app by 'rate of change'. Data and Domain layers sit centrally like a library (Type-based), while the UI layer splits into fully independent features (Feature-based)."
- First card: `lib/data & lib/domain (Horizontal)` maybe "lib/data & lib/domain (Horizontal)" already English? The label is not Turkish except maybe "Horizontal"; okay. Description: "Repositories ve Modeller merkezi kalır. Her feature bunlara erişebilir." -> "Repositories and Models stay central. Every feature can access them."
- Second card: `lib/ui/features (Vertical)` already English? The label is code; okay. Description: "Her sayfa (Auth, Home vb.) kendi ViewModel ve Widget'larını içinde saklar." -> "Each page (Auth, Home etc.) keeps its own ViewModel and Widgets inside."
- h4: "Mimarinin Faydaları:" -> "Benefits of the Architecture:"
- list items:
  1. "Farklı ekipler aynı data katmanını kullanıp farklı featurelar geliştirebilir." -> "Different teams can use the same data layer while developing different features."
  2. "Bir feature silindiğinde diğerlerini asla etkilemez." -> "Deleting one feature never affects the others."
  3. "Unit testler domain katmanında, Widget testler feature katmanında izole edilir." -> "Unit tests isolate in the domain layer, widget tests in the feature layer."
  4. "Uygulama büyüdükçe lib klasörü bir çöplüğe dönüşmez." -> "As the app grows, the lib folder doesn't become a dump."

10. Architecture Blueprint section:
- Project Blueprint header: already English.
- Folder structure labels: 
  - `lib/` no Turkish.
  - `ui/` with `(Kullanıcı Arayüzü)` -> "(User Interface)"
  - `core/` with `(Ortak Bileşenler & Temalar)` -> "(Common Components & Themes)"
  - `vocabulary/` with `(Kelime Öğrenme Modülü)` -> "(Vocabulary Learning Module)"
  - `lessons/` with `(Gramatik & Alıştırmalar)` -> "(Grammar & Exercises)"
  - `domain/` with `(Sadece Tipler & İş Mantığı)` -> "(Types & Business Logic Only)"
  - `word_model.dart` with `(Kelime Tipi / Interface)` -> "(Word Type / Interface)"
  - `lesson_entity.dart` with `(Ders Yapısı / Types)` -> "(Lesson Structure / Types)"
  - `data/` with `(Veri Kaynakları & Repos)` -> "(Data Sources & Repos)"
  - `config/` with `(Env, Theme, Constants)` English.
  - `routing/` with `(GoRouter, Navigasyon)` -> "(GoRouter, Navigation)" maybe "navigation". 
  - `utils/` with `(Helpers, Extensions)` English.
- Note "Mimarın Notu: Esneklik" -> "Architect's Note: Flexibility"
- Note paragraph: "Bu klasörleme yapısı, Google'ın <strong>The Compass</strong> vaka çalışması için sunduğu kurumsal bir referanstır. Mimari bir varış noktası değil, bir yolculuktur. Projeniz küçükse bu yapı "overkill" olabilir; çok devasa ise katmanları ayrı paketlere (Internal Packages) bölmek daha doğru bir adım olabilir. <strong>Önemli olan klasör ismi değil, bağımlılıkların yönüdür.</strong>" -> "This folder structure is an enterprise reference Google provides for <strong>The Compass</strong> case study. Architecture is not a destination, it's a journey. If your project is small, this structure may be overkill; if it's massive, splitting layers into separate internal packages might be the right move. <strong>What matters is not the folder name, but the direction of dependencies.</strong>"
- Flow Explanation:
  - h3: "Dil Öğrenme Uygulaması: Akış Örneği" -> "Language Learning App: Flow Example"
  - p: "Bir kelimeyi havuzdan alıp ekranda göstermeye kadar süren o kusursuz yolculuk:" -> "That flawless journey from pulling a word from the pool to showing it on screen:"
  - Step1: "1. Kelime Havuzu (Data)" -> "1. Word Pool (Data)" 
    p: `<code>VocabularyRepository</code> local veritabanından kelimeleri çeker.` -> "Pulls words from the local database."
  - Step2: "2. Öğrenme Mantığı (Logic)" -> "2. Learning Logic"
    p: `<code>VocabularyViewModel</code> kelimeleri karıştırır ve "Öğrenildi" bilgisini işler.` -> "Shuffles words and processes 'learned' status."
  - Step3: "3. Flashcard Arayüzü (View)" -> "3. Flashcard Interface (View)"
    p: `<code>FlashcardScreen</code> sadece ViewModel'den gelen kelimeyi ekranda parlatır.` -> "Only displays the word from the ViewModel on screen." "parlatır" maybe renders, not literally polish.

11. Now in Android tab:
- Section first heading paragraph:
  - h2 "Now in <span style={{ color: '#34a853' }}>Android</span>" already English.
  - p: "Google'ın resmi "Best Practice" projesi olan <strong>Now in