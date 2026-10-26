# 📜 SKILLS.md — ArchAcademy Geliştirici & Ajan Standartları

Bu doküman, ArchAcademy eğitim portalında çalışan ajanlar ve geliştiriciler için mimari sınırları ve Definition of Done (DoD) kriterlerini tanımlar.

---

## 🎯 Temel İlkeler ve Sınırlar

- **Doğruluk:** Eğitim içeriğindeki mimari desenler endüstri standartlarına (Clean Architecture, DDD, 12-Factor App) tam sadık kalmalıdır.
- **Tip Güvenliği:** Kod tabanında saf JS veya tip kaçışları (`any`) yasaktır; tüm modeller katı TypeScript ile yazılır.

---

## 🛠️ Mimari Kurallar

- **İçerik İzolasyonu:** Her mimari ders bağımsız bir JSON / Markdown manifesti ile tanımlanır, bileşen içine statik olarak gömülmez.
- **200 Satır Kuralı:** Dokümantasyon dosyaları 200 satır sınırını aşamaz.

---

## ✅ Tamamlanma Kriteri (Definition of Done)

1. `npm run build` veya TypeScript kontrolü sıfır hatayla geçmeli.
2. `TASKS.md` güncellenmeli.
3. Pre-Push kapısı doğrulanarak commit alınıp GitHub'a push edilmeli.
