---
description: LinguaLearn - Evolved MVVM Clean Architecture Constitution
---

# LinguaLearn - Evolved MVVM Clean Architecture 🏛️

> "Bu döküman, Flutter mimari rehberinden (Prototype) ilham alınarak Web/React ekosistemi için modernize edilmiş ve geliştirilmeye açık hale getirilmiş standartları içerir."

---

## 📁 Gelişmiş Dosya Yapısı (Evolved Hierarchy)

Proje statik bir prototipten ziyade, büyümeye açık şu katmanlı yapıyı temel alır:

```text
src/
├── ui/                     # SUNUM KATMANI (Presentation)
│   ├── core/               # Sistemsel UI & Paylaşılan Mantık
│   │   ├── ui/             # Tasarım Sistemi (Atoms, Molecules, Organisms)
│   │   ├── themes/         # Görsel Kimlik & Tasarım Tokenları
│   │   ├── hooks/          # Global UI Hookları (useSwipe, useTranslation)
│   │   └── contexts/       # Global React Contextleri
│   └── <feature_name>/     # Özellik Bazlı Modüller
│       ├── view_models/    # UI logic (React Hooks)
│       └── widgets/        # Tamamen stateless JSX bileşenleri
│
├── domain/                 # İŞ MANTIĞI KATMANI (Business Logic)
│   ├── models/             # Saf Veri Yapıları (Interfaces/Types)
│   └── logic/              # Saf Fonksiyonlar (Hesaplamalar, Algoritmalar)
│
├── data/                   # VERİ KATMANI (Infrastructure)
│   ├── repositories/       # Data Access & Contracts
│   ├── services/           # Dış kaynak entegrasyonları (Firebase, API)
│   ├── stores/             # Global State (Zustand)
│   └── model/              # DTO'lar & Data Schemas (Zod)
│
├── routing/                # Rota Tanımları (Regional Routers)
├── utils/                  # Saf Yardımcı Fonksiyonlar (Genel)
└── config/                 # Uygulama Uygulama Ayarları
```

---

## 🏗️ Katman Sorumlulukları & Evrim

### 1. View (widgets/)
- **Statü:** Saf görselleştirme.
- **Kural:** `onboarding_screen.tsx` gibi dosyalar sadece `ViewModel`'i dinler. State yönetimi veya `useEffect` içinde ağır mantık barındırmaz.

### 2. ViewModel (view_models/)
- **Statü:** UI'nın "Beyni".
- **Gelişim:** Sadece state tutmaz, aynı zamanda `Domain/Logic` ve `Data/Services` katmanlarını bir araya getirir. 
- **Kural:** ViewModel'lar (Hook bazlı) JSX döndüremez.

### 3. Domain Logic (domain/logic/)
- **Statü:** Projenin en hayati parçası.
- **Evrim:** Prototipte olmayan, hesaplamaların (örn: puan hesaplama, seviye tespiti) framework'ten bağımsız olarak yapıldığı yerdir. UI'dan tamamen izoledir.

### 4. Data (data/)
- **Statü:** Veri kaynağı ve global state.
- **Evrim:** `stores/` klasörü ile global durumu, `model/` (DTO) ile dış verinin içeriye adaptasyonunu yönetir.

---

## 🏷️ Path Alias Enforcement (ZORUNLU)

Tüm katmanlar `@` aliasları ile izole edilmiştir:
- `@ui`, `@domain`, `@data`, `@utils`, `@routing`, `@config`

> **YASAK:** `../../` relatif yolları kullanılmamalıdır. Mimari katmanlar arası geçişler aliaslar üzerinden yapılmalıdır.

---

## 📏 İsimlendirme Standartları (Naming)

- **Feature Klasörleri:** `snake_case` (örn: `sentence_builder`)
- **ViewModels:** `PascalCaseViewModel.ts` (örn: `DashboardViewModel.ts`)
- **Widgets/Screens:** `PascalCaseScreen.tsx` (örn: `DashboardScreen.tsx`)
- **Modeller/Mantık:** `PascalCase.ts` (örn: `Word.ts`, `SrsLogic.ts`)
- **Servisler:** `camelCase.service.ts` (örn: `auth.service.ts`)

---

## 🧭 Bağımlılık Kuralları (Law of Direction)

1. **Bağımlılık İçe Doğrudur:** UI -> ViewModel -> Domain/Data.
2. **ViewModel Kuralı:** Bir View sadece KENDİ ViewModel'ı ile konuşur.
3. **Data İzolasyonu:** UI bileşenleri asla doğrudan bir Store'a (Zustand) veya dış API servisine erişmez. Her şey ViewModel üzerinden geçer.
4. **Logic Saflığı:** `domain/logic` içindeki fonksiyonlar React'tan ve browser API'lerinden bağımsız olmalıdır (Saf JS/TS).

---

##  Mimari Felsefe: Sabit Temel, Esnek Gelişim

1. **Değişmez Çekirdek (The Core):** MVVM katmanları arasındaki sınırların korunması ve bağımlılıkların yönü (içe doğru) projenin değişmez anayasasıdır.
2. **Yaşayan Yapı (Evolution):** Klasör alt yapıları, kullanılan kütüphaneler ve implementasyon detayları projenin ihtiyaçları doğrultusunda her zaman geliştirilebilir ve modifiye edilebilir.
3. **Prensip Üzerinden Esneklik:** Eğer bir değişiklik Clean Architecture prensiplerini ihlal etmiyorsa ve kodun kalitesini/okunabilirliğini artırıyorsa, geliştirilmeye açıktır.

---

## 🧠 AI Bağlamı & Dosya Kod Düzeni (Locality & Order)

AI'nın (Antigravity) bağlamı kaybetmemesi ve kodun okunabilirliği için şu kurallar geçerlidir:

1. **Bağlamsal Bütünlük (Co-location):** Tasarım (CSS-in-TS) ve bileşen kodları mümkün olduğunca aynı dosyada tutulmalıdır. Ayrı stil dosyaları AI'nın tüm resmi görmesini engeller.
2. **Dosya İçi Hiyerarşi (Order of Importance):** Dosyanın en önemli kısmı (ana bileşen/fonksiyon) en üstte yer almalıdır. Yardımcı fonksiyonlar ve stil tanımları alt kısımlara bırakılmalıdır.
3. **Region Organizasyonu (VS Code Navigator):** Uzun dosyalar mutlaka `#region [BAŞLIK]` ve `#endregion` blokları ile bölümlere ayrılmalıdır. Bu, VS Code'un "Outline" (Anahat) panelinde net bir navigasyon sağlar ve AI'nın kodun yapısını daha hızlı kavramasına yardımcı olur.

---

## ☁️ Sovereign UI Transition (Tailwind-to-Vanilla)

**KRİTİK GEÇİŞ KURALI:** Proje, Tailwind CSS'ten tamamen Vanilla CSS ve Inline Style mimarisine geçmektedir.
- **Otomatik Arınma:** Herhangi bir dosyada işlem (modifikasyon/ekleme) istendiğinde, o dosyadaki tüm Tailwind sınıfları (className içindeki utility class'lar) **sorulmadan** temizlenmelidir.
- **Dönüşüm:** Temizlenen sınıflar, `src/ui/core/themes/index.css` içindeki tasarım token'larına (CSS Variables) bağlı Vanilla CSS veya Inline Styles (`style={{...}}`) olarak yeniden yazılmalıdır.
- **Zero-External CSS:** Yeni eklenen stiller harici bir `.css` dosyasına değil, dosya içi bütünlüğü korumak amacıyla bileşen dosyasına (co-location) eklenmelidir.

---

## 🛑 KESİN TALİMAT (Strict Mandate)

**KRİTİK KURAL:** Sana (Yapay Zeka) verilen mesajda ne söyleniyorsa **SADECE** onu yapacaksın. Kullanıcı tarafından açıkça istenmeyen hiçbir ekleme, düzeltme, modifikasyon veya "iyileştirme" yapman kesinlikle **YASAKTIR**.

- **Sadece söyleneni yap.**
- **Kendiliğinden iş çıkartma.**
- **ASLA AMA ASLA** belirtilen talimatın dışına çıkma.

---
*"Bu mimari, Flutter rehberindeki temel yapı üzerine inşa edilmiş, React ekosisteminin gücüyle geliştirilmiş LinguaLearn'e özel bir standarttır."*
