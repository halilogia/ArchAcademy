# 🏛️ ArchAcademy: Kıdemli Yazılım Mimarı Portalı

<div align="center">
  <a href="README.md">🇬🇧 English</a> | <a href="README.tr.md">🇹🇷 Türkçe</a>
</div>

<br />

[![GPL-3.0 License](https://img.shields.io/badge/License-GPL%203.0-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7-purple.svg)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![PWA](https://img.shields.io/badge/PWA-Ready-orange.svg)](https://vite-pwa-org.netlify.app/)
[![i18n](https://img.shields.io/badge/i18n-TR%2FEN-green.svg)](https://www.i18next.com/)

**ArchAcademy**, kıdemli yazılım mimarlığına geçiş yapan yazılım mühendisleri için tasarlanmış birinci sınıf, yüksek performanslı bir eğitim portalıdır. İnteraktif, cam efektli (glassmorphic) arayüzü ile sürdürülebilir yazılım tasarımı, mimari desenler ve karar alma çerçeveleri hakkında derinlemesine rehberlik sunar.

---

## 🌟 Temel Sütunlar

ArchAcademy üç temel eğitim felsefesi üzerine kurulmuştur:

1. **Görsel Öncelikli Yaklaşım**: Clean Architecture veya Event-Driven Architecture (EDA) gibi kavramlar yalnızca metinlerle anlatılmaz; etkileşimli diyagramlar ve canlı simülasyonlarla görselleştirilir.
2. **Kazanım / Feragat (Trade-off) Zihniyeti**: Her mimari seçim bir dengedir. ArchAcademy, sadece bir desenin *nasıl* uygulanacağına değil; *neden* ve *ne zaman* seçilmesi gerektiğine odaklanır.
3. **Modern & AI-Native Yaklaşım**: Klasik endüstri standartlarının yanı sıra Agentic AI, RAG (Retrieval-Augmented Generation) ve LLM-Ops gibi çağdaş mimarileri de kapsar.

---

## 🚀 Öne Çıkan Özellikler

### 🧩 Mimari Karşılaştırma Matrisi (Master Matrix)
Başlıca mimari stilleri (Clean Architecture, Vertical Slice, Hexagonal, Event-Driven vb.) geliştirme hızı, test edilebilirlik ve ölçeklenebilirlik kriterlerine göre karşılaştırın.

### 🧭 Mimarın Pusulası (Architect's Compass)
Proje gereksinimlerinizi (ekip büyüklüğü, zaman kısıtı, iş alanı karmaşıklığı) analiz ederek en uygun mimari başlangıç noktasını öneren akıllı keşif aracı.

### 🛣️ Mimarın Kariyer Yolculuğu (Roadmap)
**Usta Yazılımcıdan (Craftsman)** **Vizyonere (Visionary)** kadar uzanan; SOLID prensipleri, tasarım desenleri ve stratejik liderliği içeren adım adım kariyer haritası.

### 🧪 Sistem Tasarım Sandbox'ı (`/sandbox`)
Yük dengeleyici, API gateway, mikroservis, mesaj kuyruğu, worker, cache, veritabanı, nesne deposu ve arama motoru bileşenlerini sürükleyip bırakarak topoloji tuvaline yerleştirin. Bağlantıları çizin, kopya sayılarını ayarlayın; topoloji denetçisi tasarımınızı puanlayıp tek hata noktalarını, istemciye açık veritabanlarını, tüketilmeyen kuyrukları, eksik cache katmanlarını ve döngüsel bağımlılıkları işaretlesin.

### 📄 ADR Üreticisi (`/adr-generator`)
Sandbox topolojinizi **MADR 3.0.0** karar kaydına dönüştürür: bağlam, karar etkenleri, değerlendirilen seçenekler, karar, bileşen envanteri, fazlalık planı, otomatik üretilen Mermaid akış şeması, sonuçlar, açık mimari riskler ve gözden geçirme tetikleyicileri. Panoya kopyalayın veya deponuz için `.md` olarak indirin.

### ☁️ Bulut Senkronlu İlerleme
Ders tamamlama, quiz skorları ve kayıtlı tasarımlar bir Zustand deposunda tutulur; çakışma birleştirme, yeniden deneme ve çevrimdışı kuyruklama ile bir REST uç noktasına gönderilir. `npm run sync:serve` bu sözleşmenin bağımlılıksız referans implementasyonunu başlatır ve bir uyumluluk testi gerçek istemciyi ona karşı doğrular. Eski localStorage durumu otomatik olarak taşınır ve uygulama çevrimdışıyken de tam çalışır.

### 📚 CMS portu arkasındaki içerik
Dersler, sözlük, kısaltmalar, karşılaştırma matrisi ve arama içeriği bir `ContentRepository` üzerinden çözülür: `VITE_CMS_ENDPOINT` yapılandırılmışsa önce uzak CMS, sonra paketlenmiş seed, sonra da çevrimdışı için ön belleğe alınmış `public/cms/*.json`. İçerik yazarları TypeScript veri modüllerini düzenleyip `npm run cms:export` çalıştırır; sunum katmanı bu modülleri doğrudan import etmez — bu yüzden sözlük sayfası chunk'ı 198 KB yerine 6.8 KB.

### 📜 Mimari Kısaltmalar & Prensipler Rehberi (`/acronyms`)
Yazılım mühendisliğinin temel kısaltma ve ilkeleri için kapsamlı başvuru kaynağı: **KISS, DRY, WET, AHA, YAGNI, SOLID, GRASP, ACID, CAP, FIRST, STUPID** ve daha fazlası.

### 🔍 Gelişmiş Bulanık Arama (Fuzzy Search)
**Fuse.js** ile güçlendirilmiş akıllı anahtar kelime eşleştirmesi sayesinde 90'dan fazla sayfa ve konsept arasında anında arama yapın.

### 🌍 Çoklu Dil Desteği & SEO
Dinamik meta etiketleri, site haritası ve yapılandırılmış veri optimizasyonu ile tam **TR/EN** dil desteği.

### 🤖 AI-Native & Vibe Coding Mimari Matrisi (AI Context & Locality)
ArchAcademy, mimarileri yalnızca geleneksel metriklerle değil; **AI-Native geliştirme (Vibe Coding, Context Locality, Klasör Atlama)** ekseninde de değerlendirir:

| Mimari / Stil | 📁 AI Locality (Klasör Atlama) | ⭐ GitHub Popülaritesi | 🧘 Vibe Coding (Anlaşılabilirlik) | 🎯 Toplam |
| :--- | :---: | :---: | :---: | :---: |
| 👑 **Vertical Slice Architecture** | ⭐⭐⭐⭐⭐ (5/5) | ⭐⭐⭐⭐ (4/5) | ⭐⭐⭐⭐⭐ (5/5) | **14 / 15** |
| 🚀 **Pragmatic Monolith (Modular)** | ⭐⭐⭐⭐ (4/5) | ⭐⭐⭐⭐⭐ (5/5) | ⭐⭐⭐⭐⭐ (5/5) | **14 / 15** |
| ⚛️ **Component-Driven / Islands** | ⭐⭐⭐⭐ (4/5) | ⭐⭐⭐⭐⭐ (5/5) | ⭐⭐⭐⭐ (4/5) | **13 / 15** |
| 🌐 **Classic MVC** | ⭐⭐⭐ (3/5) | ⭐⭐⭐⭐⭐ (5/5) | ⭐⭐⭐⭐ (4/5) | **12 / 15** |
| ⚡ **Serverless / FaaS** | ⭐⭐⭐⭐ (4/5) | ⭐⭐⭐⭐ (4/5) | ⭐⭐⭐ (3/5) | **11 / 15** |
| 🧱 **n-Tier / Katmanlı Mimari** | ⭐⭐ (2/5) | ⭐⭐⭐⭐⭐ (5/5) | ⭐⭐⭐ (3/5) | **10 / 15** |
| 💎 **Clean Architecture** | ⭐⭐ (2/5) | ⭐⭐⭐⭐⭐ (5/5) | ⭐⭐ (2/5) | **9 / 15** |
| ⬡ **Hexagonal (Ports & Adapters)** | ⭐⭐ (2/5) | ⭐⭐⭐⭐ (4/5) | ⭐⭐ (2/5) | **8 / 15** |

### 📱 PWA & Çevrimdışı Çalışma
Masaüstü ve mobil cihazlara bağımsız bir uygulama olarak yüklenebilir. Tüm mimari rehberler internet bağlantısı olmadan da erişilebilirdir.

---

## 🛠 Teknoloji Yığını

- **Framework**: [React 19](https://react.dev/)
- **Derleme Aracı**: [Vite 7](https://vitejs.dev/)
- **Dil**: [TypeScript 5](https://www.typescriptlang.org/)
- **Yönlendirme (Routing)**: [React Router DOM 7](https://reactrouter.com/)
- **Durum Yönetimi (State)**: [Zustand 5](https://zustand-demo.pmnd.rs/)
- **Arama Motoru**: [Fuse.js](https://www.fusejs.io/)
- **Çoklu Dil (i18n)**: [i18next](https://www.i18next.com/)
- **SEO**: [React Helmet Async](https://github.com/staylor/react-helmet-async)
- **PWA**: [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)
- **Animasyonlar**: [Framer Motion 12](https://www.framer.com/motion/)
- **İkonlar**: [Lucide React](https://lucide.dev/)
- **Stil**: Vanilla CSS (Modern CSS Değişkenleri & Cam Efekti)
- **Test**: [Vitest 4](https://vitest.dev/) + [Testing Library](https://testing-library.com/)

---

## 📥 Başlarken

### Gereksinimler
- Node.js (v18 veya üzeri)
- npm veya yarn

### Kurulum

1. Depoyu klonlayın:
   ```bash
   git clone https://github.com/halilogia/ArchAcademy.git
   ```

2. Proje dizinine gidin:
   ```bash
   cd ArchAcademy
   ```

3. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

4. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

---

## 📂 Proje Yapısı

Proje, frontend için uyarlanmış Clean Architecture prensiplerini takip eder:

```text
.
├── .github/workflows/         # CI/CD İş Akışları (Derleme, Test, Dağıtım)
├── public/                    # Statik Dosyalar (PWA Manifest, Sitemap, Robots)
├── scripts/                   # Grafik üreteci, CMS dışa aktarımı, SPA fallback, içerik denetimleri
├── server/                    # Referans bulut ilerleme senkronizasyon servisi (REST)
├── src/
│   ├── domain/                # Saf İş Mantığı (Entities, Use Cases, Repository Portları)
│   │   ├── entities/          # CmsEntry, Sandbox, Progress
│   │   ├── repositories/      # ContentRepository, ProgressRepository (portlar)
│   │   └── usecases/          # TopologyAnalyzer, AdrGenerator, QuizScorer, ProgressMerger
│   ├── infrastructure/        # Adaptörler: CMS istemcisi, bulut senkronizasyonu, çevrimdışı önbellek, store'lar
│   │   ├── cms/               # Uzak öncelikli içerik deposu + paketlenmiş seed anlık görüntüleri
│   │   ├── config/            # Tipli ortam değişkeni yapılandırması
│   │   ├── repositories/      # CloudProgress, LocalProgressCache, SyncingProgressRepository
│   │   ├── storage/           # Kota toleranslı güvenli depolama sarmalayıcısı
│   │   └── stores/            # Zustand store'ları (ilerleme, sandbox)
│   ├── i18n/                  # Dil Konfigürasyonu ve Çeviriler
│   ├── presentation/          # Arayüz Katmanı
│   │   ├── components/        # Yeniden Kullanılabilir Bileşenler (SEO, Navbar, CommandPalette, sandbox/, adr/)
│   │   ├── pages/             # 90+ Mimari Konu Sayfası (Clean Arch, Agentic AI, Sandbox vb.)
│   │   ├── context/           # İlerleme deposunun ince adaptörü
│   │   ├── hooks/             # Özel React Kancaları (useCmsCollection, useAssessmentQuiz, useLocalStorage)
│   │   ├── navigation/        # Rota Yapılandırması (AppRouter)
│   │   └── themes/            # Tasarım Belirteçleri ve Tema Ayarları
│   ├── tests/                 # Birim ve Entegrasyon Testleri (Vitest)
│   └── assets/                # Görseller ve Stiller
├── eslint.config.js           # ESLint v9+ Yapılandırması
└── vite.config.js             # Vite, PWA ve Vitest Yapılandırması
```

### Yapılandırma

Tüm çalışma zamanı yapılandırması isteğe bağlıdır; bu değişkenler olmadan da uygulama çevrimdışı olarak tam çalışır. Uzak servisleri etkinleştirmek için `.env.example` dosyasını `.env` olarak kopyalayın.

| Değişken | Açıklama |
|----------|---------|
| `VITE_CMS_ENDPOINT` | `GET {endpoint}/collections/{name}` sunan CMS taban adresi |
| `VITE_CMS_TOKEN` | CMS için isteğe bağlı bearer token |
| `VITE_CMS_TIMEOUT_MS` | CMS istek zaman aşımı (varsayılan `6000`) |
| `VITE_PROGRESS_SYNC_ENDPOINT` | İlerleme senkronizasyonu için REST taban adresi (`GET`/`PUT {endpoint}/progress/{ownerId}`) |
| `VITE_PROGRESS_SYNC_TOKEN` | Senkronizasyon uç noktası için isteğe bağlı bearer token |
| `VITE_PROGRESS_SYNC_TIMEOUT_MS` | Senkronizasyon istek zaman aşımı (varsayılan `8000`) |
| `VITE_PROGRESS_USER_ID` | Sunucuda ilerlemeyi kapsamak için kullanılan sahip kimliği (varsayılan `local-learner`) |
| `VITE_BASE_PATH` | Dağıtım taban yolu. CI'da `/ArchAcademy/`, yerelde `/` varsayılan. |

### Kullanılabilir Komutlar

| Komut | Açıklama |
|---------|-------------|
| `npm run dev` | Geliştirme sunucusunu başlatır |
| `npm run build` | Üretim (Production) derlemesi alır |
| `npm run preview` | Üretim derlemesini yerelde önizler |
| `npm run test` | Vitest testlerini izleme modunda çalıştırır |
| `npm run test:run` | Testleri tek seferlik çalıştırır |
| `npm run lint` | ESLint kontrolü yapar |
| `npm run lint:fix` | Kodlama standart hatalarını otomatik düzeltir |
| `npm run check` | TypeScript tip kontrollerini gerçekleştirir |
| `npm run scan` | Otomatik mimari bağımlılık ve sinir ağını günceller |
| `npm run cms:export` | İçerik modüllerini `public/cms/*.json` olarak dışa aktarır |
| `npm run cms:check` | Dışa aktarılan koleksiyonlar veri modüllerinden saptıysa hata verir |
| `npm run docs:audit` | Arama indeksi kapsamını ve sözlük bütünlüğünü denetler |
| `npm run verify` | Tip kontrolü, lint, testler ve içerik denetimini tek komutta çalıştırır |
| `npm run sync:serve` | Referans ilerleme senkronizasyon servisini başlatır |

---

## 📜 Lisans

Bu proje GNU General Public License v3.0 (GPLv3) ile lisanslanmıştır - detaylar için [LICENSE](LICENSE) dosyasına bakabilirsiniz.
