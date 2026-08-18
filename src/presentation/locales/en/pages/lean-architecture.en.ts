Need translate Turkish content to English. Output likely full TSX file with translations. Need preserve code, identifiers, structure. Terse caveman style? User asks translate software architecture component content into English. System says respond terse caveman, but task is translation. Need output only clean valid TypeScript/code, no markdown wrapping unless requested. Here need translate, keep code. Caveman style would be for meta commentary, not necessarily inside translated strings? Should translate strings into idiomatic American English while preserving technical terms. But caveman mode applies to response style. However the content itself is UI text, should be natural English architecture tone, not caveman. Need follow rule: "All technical substance stay exact, only fluff die" but translating UI copy, need professional English. But user asked translate content. We should output the entire file with Turkish strings translated to English. Need not add explanation. Also preserve all code exactly except strings/comments. Need translate comments too? "CONTENT" includes code comments: "SONUÇ: Tek bir işlem için 3 dosya ve ..." etc. Likely translate comments to English as well. But comments in code blocks inside template literals, need translate while preserving JS template literal syntax. Be careful with backticks and ${} inside translated strings. Original has template literals with backticks and ${...} in code examples. Need preserve those exactly, translate Turkish inside comments. Also escape apostrophes? In TSX strings using curly quotes okay. Need ensure no invalid code.

Let's parse file. Need translate all Turkish text in JSX and data arrays. Some Turkish in comments and code blocks. Technical terms Keep as English already. Need decide "Yazılımda 'değer üretmeyen' her şey israftır." -> "Anything in software that produces no value is waste." Could be natural. Need maintain architecture tone.

Need preserve lucide icon names, framer motion props, class names, CSS, variables. Need translate only user-facing strings and comments. The file type is TSX, output should be code without markdown fences. The system said "Output ONLY clean, valid TypeScript / code as requested, with NO markdown backtick wrapping unless specifically requested." So final should be just code block? No markdown. But code block content has template literals with backticks; if wrapping in markdown, need fences. They said no backtick wrapping. So output raw code. But final answer as raw code no fences.

Need be thorough.

Let's go through content.

Imports unchanged.

principles array:
- id, title, icon, color, desc.

1. title: '1. Eliminate Waste' already English? In original, first principle title "1. Eliminate Waste". Others "2. Create Knowledge", "3. Defer Commitment", "4. Deliver Fast", "5. Respect People", "6. Build Integrity In", "7. Optimize the Whole". They are already English, keep. Descriptions Turkish translate.

desc 1: 'Yazılımda "değer üretmeyen" her şey israftır. Müşterinin kullanmayacağı ekstra özellikler (Gold Plating), tamamlanmamış işler, gereksiz evrak işleri ve beklemeler hemen elenmelidir.'
Translation: 'Anything in software that does not create value is waste. Extra features the customer will never use (Gold Plating), unfinished work, unnecessary paperwork, and waiting must be eliminated immediately.'
Could be "Anything in software that fails to produce value is waste." Need keep "Gold Plating".

2. desc: 'Yazılım geliştirme bir üretim süreci değil, bir öğrenme sürecidir. En iyi mimari, kodu yazanların domaini en iyi öğrendiği anda ortaya çıkar. Dokümantasyon değil, çalışan kod ve testler bilgiyi taşır.'
Translation: 'Software development is not a production process; it is a learning process. The best architecture emerges at the moment the people writing the code understand the domain best. Working code and tests carry knowledge—not documentation.' Keep "domain" technical term. Note "domini" maybe domain. Good.

3. desc: 'Mimari kararları (örn: NoSQL vs SQL) mümkün olan "son sorumlu ana" kadar erteleyin. Erken verilen kararlar varsayımlara dayanır; geç verilen kararlar ise gerçeklere.'
Translation: 'Defer architectural decisions (e.g., NoSQL vs SQL) until the "last responsible moment" possible. Early decisions rest on assumptions; late decisions rest on facts.' Need preserve "last responsible moment" concept. Good.

4. desc: 'Hız, belirsizliği yok eder. Müşteriye ne kadar hızlı çıktı verirseniz, o kadar hızlı geri bildirim alırsınız. Büyük "Big Bang" sürümler yerine küçük ve sık sürümler esastır.'
Translation: 'Speed destroys uncertainty. The faster you deliver output to the customer, the faster you get feedback. Small, frequent releases are essential instead of large "Big Bang" versions.' Could refine: "Speed eliminates uncertainty." "Rather than big 'Big Bang' releases, small frequent releases are essential."

5. desc: 'Kararları yukarıdaki mimarlar değil, işi yapan uzmanlar vermelidir. Takıma güvenin ve onlara inisiyatif verin. Motivasyonu yüksek bir ekip, en iyi süreçten daha değerlidir.'
Translation: 'Decisions should be made by the experts doing the work, not by architects above them. Trust the team and give them initiative. A highly motivated team is worth more than the best process.'

6. desc: 'Kalite sonradan test edilerek eklenemez; en baştan koda inşa edilmelidir. TDD, Refactoring ve Continuous Integration, sistemin bütünlüğünü (integrity) sağlayan temel araçlardır.'
Translation: 'Quality cannot be added later by testing; it must be built into the code from the start. TDD, Refactoring, and Continuous Integration are the core tools that ensure system integrity.'

7. desc: 'Sadece veritabanını hızlandırmak yetmez; tüm isteğin (request) yaşam döngüsüne bakın. Parçaları optimize etmek (sub-optimization) genellikle bütünün performansını düşürür.'
Translation: 'Speeding up the database alone is not enough; look at the entire lifecycle of the request. Optimizing individual pieces (sub-optimization) often degrades the performance of the whole.' Good.

ArchHero:
title="Lean" unchanged.
subtitle="Architecture" unchanged.
description="Toyota Üretim Sistemi'nden (TPS) yazılıma uyarlanan bu felsefe, 'İsrafı Yok Etme' (Waste Elimination) üzerine kuruludur. Az kod, çok değer."
Translation: "Adapted from the Toyota Production System (TPS) to software, this philosophy is built on "Waste Elimination." Less code, more value."
Need perhaps "This philosophy, adapted from the Toyota Production System (TPS) to software, is founded on Waste Elimination. Less code, more value."
badge="Mary & Tom Poppendieck" unchanged.

Features:
{ icon: <Trash2 />, title: 'Muda (Waste)', desc: 'Ekstra özellik, bekleyen kod, hatalar ve gereksiz işlemler (motion) birer israftır.' }
desc translation: 'Extra features, waiting code, defects, and unnecessary motion are all forms of waste.'

{ icon: <Scissors />, title: 'Tailoring', desc: 'Süreci projeye uydurun. Her proje için devasa mimariler kurmak zorunda değilsiniz.' }
Translation: 'Tailor the process to the project. You do not have to build massive architectures for every project.' Maybe "Don't force massive architectures on every project."

{ icon: <GitMerge />, title: 'Just-in-Time', desc: 'Kararları ihtiyacınız olduğu anda verin; aylar öncesinden değil.' }
Translation: 'Make decisions at the moment you need them, not months in advance.'

Deep dive section: comment "--- LEAN CLEAN HYBRID DEEP DIVE ---" unchanged.

Badge: 'THE NEW GOLD STANDARD' unchanged.

h2: Lean <span className="gradient-text">Clean Architecture</span> unchanged.

p: 'Geleneksel Clean Architecture harika bir disiplindir ancak Lean felsefesiyle birleştiğinde **"Saf Geliştirme Hızı"** (Pure Velocity) doğar. 
                Her klasörün, her interface'in ve her satır kodun bir "kira" bedeli vardır (Maintenance Cost). Sadece ihtiyacınız olanın kirasını ödeyin.'
Translation: 'Traditional Clean Architecture is a great discipline, but when combined with Lean philosophy, **"Pure Velocity"** is born.
Every folder, every interface, and every line of code carries a "rent" cost (Maintenance Cost). Pay rent only for what you need.'
Need keep line break? In code string, maybe can use same structure, with newline inside string? Original inside JSX p with actual newline between text? Let's inspect: It is JSX children, whitespace with newline. Translation can be one line or maintain. Need output valid JSX. We can keep similar.

Then first item:
h4: 'Vertical Slice Over Layered Bloat' (copy title original is English) keep.
p: 'Özellikleri yatay katmanlara boğmak yerine, dikey dilimler (Vertical Slices) halinde organize edin. Bağımsızlık hızı getirir.'
Translation: 'Instead of drowning features in horizontal layers, organize them as vertical slices. Independence brings speed.'

Second:
h4: 'Functional Use Cases' unchanged.
p: 'UseCase'leri sınıflar yerine saf fonksiyonlar olarak yazın. Dependency Injection karmaşasını %80 azaltın.'
Translation: 'Write use cases as pure functions instead of classes. Cut Dependency Injection complexity by 80%.'

Pragmatism scale:
h3: <Scale ... /> Pragmatizm Ölçeği -> "Pragmatism Scale"
Chart labels: Efor, Hız, Kalite, Boilerplate. Need translate Efor -> Effort, Hız -> Speed, Kalite -> Quality, Boilerplate unchanged.
Quote: '"Lean Architecture, kurumsal standartlardan ödün vermeden "Angarya Kod"u (Waste) yok eden bir denge sanatıdır."'
Translation: '"Lean Architecture is the art of balance: it eliminates "Drudgery Code" (Waste) without compromising enterprise standards."' Maybe "grunt work code" but original "Angarya Kod" means "menial/drudgery code". Could use "Busywork Code". Maybe "Waste" in parentheses. Need maybe "Lean Architecture is an art of balance that eliminates 'Busywork Code' (Waste) without sacrificing enterprise standards."

Section 7 principles:
h2: '7 Yalın Mimari Prensibi' -> "7 Lean Architecture Principles"
p: 'Başarılı modern sistemlerin genetik kodu ve israfsız üretim stratejisi.' -> "The genetic code of successful modern systems and a waste-free production strategy."

Gemini AI suggestion block:
h4: 'GEMINI AI ÖNERİSİ' -> "GEMINI AI SUGGESTION"
Content: '"Yazdığınız kodun %20\'si işin %80\'ini yapar. Geri kalan %80 "olsa iyi olur" kısmıdır. O kısmı acımadan silin."' 
Translation with apostrophes: '"20% of the code you write does 80% of the work. The remaining 80% is the "nice-to-have" part. Delete it without mercy."'
Need be careful with curly quotes maybe.

Second: '"Veritabanı şemasını projenin başında değil, use-case\'lerinizi tam anladığınızda tasarlayın. Erken kararlar zincirdir."'
Translation: '"Design the database schema not at the start of the project, but once you fully understand your use cases. Early decisions are chains."' Good. But in code template literal, the string uses straight single quote? Actually inside p JSX text, apostrophes are escaped in original? Original: `"... use-case\'lerinizi ..."` because the entire text is in double quotes? Let's examine:

```
<p style={{ ... }}>
  "{principles[activeTab].id === 'eliminate-waste' ? 'Yazdığınız kodun %20\'si işin %80\'ini yapar. Geri kalan %80 "olsa iyi olur" kısmıdır. O kısmı acımadan silin.' : 
    principles[activeTab].id === 'decide-late' ? 'Veritabanı şemasını projenin başında değil, use-case\'lerinizi tam anladığınızda tasarlayın. Erken kararlar zincirdir.' :
    'Bu prensibi uyguladığınızda kod satır sayınız azalacak ama sistemin "Değer Yoğunluğu" (Value Density) katlanacaktır.'}"
</p>
```

Need preserve JS logic. The strings are single-quoted in JS, containing escaped `\'` for Turkish apostrophes. In English translations, we can use single quotes normally? Escape apostrophes. Could use double quotes inside single-quoted strings. Need be careful with `%20\'si` became Turkish possessive. English "20% of the code" no apostrophe. So simply use single quote strings. "use-case" plural no apostrophe, so no escape needed. "system's" needs apostrophe escape. Could use curly apostrophe ' to avoid escaping? But technical style okay. To preserve syntax, can use curly UTF-8 apostrophe inside single quotes; no escape needed but valid. But better escape with backslash or use double quotes. Original uses single quotes. We can output with same structure, using `'... system\u2019s ...'`? Actually Unicode curly apostrophe is fine in JS string. But maybe avoid non-ASCII? Turkish already non-ASCII. It's fine. But code style maybe use `\'`. Need output valid.

Third: 'Bu prensibi uyguladığınızda kod satır sayınız azalacak ama sistemin "Değer Yoğunluğu" (Value Density) katlanacaktır.'
Translation: '"Applying this principle will reduce your line count, but the system\'s "Value Density" will multiply."' Need keep original phrase. Could be '"When you apply this principle, your line count shrinks, but the system\'s "Value Density" multiplies."'

Lean vs Waste Code Comparison section:
h2: 'İsraf <span style={{ color: '#ef4444' }}>vs</span> Değer' -> "Waste <span ...>vs</span> Value"
p: 'Teknik borç yaratan karmaşa ile yalın kodun savaşı.' -> "The battle between complexity that creates technical debt and lean code."

Left card:
h3: 'Geleneksel "Overkill"' -> 'Traditional "Overkill"'
Code comment: 
```
// 1. Interface Tanımı
interface IGetUserService {
  execute(id: string): Promise<User>;
}

// 2. Sınıf Implementasyonu
class GetUserService implements IGetUserService {
  constructor(private repo: IUserRepository) {}
  async execute(id: string) { ... }
}

// 3. DI Konfigürasyonu (Başka bir dosyada)
container.bind<IGetUserService>(T.U).to(GUS);

// SONUÇ: Tek bir işlem için 3 dosya ve 
// 20 satır boilerplate.
```
Translation comments:
`// 1. Interface Definition`
`// 2. Class Implementation`
`// 3. DI Configuration (In another file)`
`// RESULT: 3 files and 20 lines of boilerplate for a single operation.`
Need preserve code identifiers. Great.

Right card:
h3: 'Lean "Functional"' unchanged? Since English. Could be 'Lean "Functional"'.
Pre comments:
Original:
```
// Sadece Saf Fonksiyon (Pure Function)
export const getUserUseCase = (repo: UserRepo) => 
  (id: string) => repo.findById(id);

// Kullanım:
const user = await getUserUseCase(repo)("123");

// SONUÇ: Sıfır Interface karmaşası, 
// sıfır DI boilerpate. Maksimum test 
// edilebilirlik ve hız. 
// Gerçek yalınlık budur.
```
Translation:
```
// Just a pure function
export const getUserUseCase = (repo: UserRepo) => 
  (id: string) => repo.findById(id);

// Usage:
const user = await getUserUseCase(repo)("123");

// RESULT: Zero interface complexity, 
// zero DI boilerplate. Maximum testability 
// and speed. 
// This is true leanness.
```
Need "boilerplate" typo original "boilerpate" -> fix to boilerplate.

Lean Maturity Model section:
h2: 'Yalın Mimari <span className="gradient-text">Olgunluk Modeli</span>' -> "Lean Architecture <span className="gradient-text">Maturity Model</span>"
p: 'Projenin boyutuna göre Lean prensiplerini nasıl ölçeklendiririz?' -> "How do we scale Lean principles according to project size?"

Cards:
Level 1: title 'Agresif Yalınlık' -> "Aggressive Leanness"; p: 'Sıfır klasör derinli