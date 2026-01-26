# 🧠 ArchBrain Universal - Standalone App Roadmap

Bu uygulama, herhangi bir yazılım projesini sürükle-bırak yöntemiyle 3D nöral ağa dönüştüren bağımsız bir araçtır.

## 🏗️ Architecture Stack
- **Runtime:** Electron or Tauri (Desktop Shell)
- **Scanner Engine:** Node.js + ts-morph (Dependency Analysis)
- **UI Framework:** React + Tailwind
- **Visualization:** Three.js / React Three Fiber

## 🚀 Development Phases

### Phase 1: Core Engine (TAMAMLANDI ✅)
- [x] Recursive file system scanner
- [x] Import/Export dependency extractor
- [x] JSON Data generator

### Phase 2: Desktop Integration (SIRADA ⏳)
- [ ] Electron.js boilerplate setup
- [ ] Native file system dialogs (Open Folder)
- [ ] Real-time file watcher (kod değiştikçe grafik güncellenir)

### Phase 3: 3D Visualization (PREMIUM 💎)
- [ ] 3D Force-directed graph implementation
- [ ] Node clustering (Klasörleri gruplama)
- [ ] Zoom/Pan/Rotate and Node selection

### Phase 4: Pro Insights (SENIOR 🎯)
- [ ] Circular dependency detection
- [ ] Code health analysis scores
- [ ] Export as Image/interactive HTML

---
**Not:** Şu an ana engine (`tools/arch-brain/scanner/engine.cjs`) hazır ve projenizi tarayabiliyor.










Time Travel (Zaman Yolculuğu)
