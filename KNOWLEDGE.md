# 🧠 ArchAcademy Mühendislik Hafızası (KNOWLEDGE.md)

Bu dosya, ArchAcademy yazılım mimarisi ve tasarım desenleri eğitim portalının mimari karar kayıtlarını (ADR) ve teknik tuzaklarını (Gotchas) belgeler.

---

## 🏛️ Mimari Karar Kararları (ADR)

### [ADR-01] Etkileşimli Senaryo ve Simülasyon Motoru
- **Karar:** Mimari desenler teorik anlatım yerine çalıştırılabilir mini senaryolar ve interaktif diyagramlar üzerinden sunulur.
- **Gerekçe:** Mimari trade-off'ların (ödünleşimlerin) yalnızca soyut metinlerle değil, görsel geri bildirimle kavranması.

### [ADR-02] İstemci Tarafı Yürütme (Client-Side Sandboxing)
- **Karar:** Kod ve şema simülasyonları sunucuya gitmeksizin WebAssembly / Web Worker içinde izole çalıştırılır.

---

## ⚠️ Kritik Teknik Tuzaklar (Gotchas)

### [GOTCHA-01] Karmaşık Mermaid / SVG Diyagram Yeniden Çizimleri
- **Tuzak:** Sayfa her yeniden render edildiğinde SVG ağacının baştan oluşturulması performansı düşürür.
- **Çözüm:** Diyagramlar `React.memo` / lazy render bileşenleri içine alınarak gereksiz repaint önlenir.
