import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');
const pagesDir = path.join(srcDir, 'presentation', 'pages');
const routerFile = path.join(srcDir, 'presentation', 'navigation', 'AppRouter.tsx');

console.log('='.repeat(80));
console.log('🔍 ARCHACADEMY 100% ERİŞİLEBİLİRLİK & ÖKSÜZ (ORPHAN) SAYFA AUDITİ');
console.log('='.repeat(80));

// 1. Tüm sayfa dosyalarını topla
const pageFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx') && !f.startsWith('not-found'));
const pageRoutes = pageFiles.map(f => {
  const name = f.replace('.tsx', '');
  return {
    name,
    route: name === 'home' || name === 'index' ? '/' : `/${name}`,
    file: f
  };
});

// 2. AppRouter.tsx içindeki tanımlı rotaları al
const routerContent = fs.readFileSync(routerFile, 'utf8');
const routerRoutes = new Set();
const routeMatches = routerContent.matchAll(/path=['"]([^'"]+)['"]/g);
for (const m of routeMatches) {
  const p = m[1].startsWith('/') ? m[1] : `/${m[1]}`;
  routerRoutes.add(p);
}

// 3. src/ altındaki TÜM dosyaları oku (AppRouter hariç) ve bu rotalara tıklanacak buton/link var mı say
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.json')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allSrcFiles = getAllFiles(srcDir).filter(f => !f.includes('AppRouter.tsx'));

const unroutedPages = [];
const orphanPages = [];
const fullyAccessiblePages = [];

for (const p of pageRoutes) {
  // A. AppRouter'da var mı?
  const isInRouter = routerRoutes.has(p.route) || p.route === '/';
  if (!isInRouter) {
    unroutedPages.push(p);
  }

  // B. UI'da bir Link, Button, Navbar, Katalog Kartı, Arama Modalı veya Yol Haritası içinde geçiyor mu?
  let mentionCount = 0;
  const mentioningFiles = new Set();

  for (const f of allSrcFiles) {
    const content = fs.readFileSync(f, 'utf8');
    // Rota ismi tırnak içinde geçiyor mu? örn: '/llm-ops' veya 'llm-ops' veya `to="/llm-ops"`
    const regex = new RegExp(`['"\`]${p.route}['"\`]|to=['"]${p.route}['"]|path:\\s*['"]${p.route}['"]`, 'g');
    const matches = content.match(regex);
    if (matches) {
      mentionCount += matches.length;
      mentioningFiles.add(path.basename(f));
    }
  }

  if (mentionCount === 0 && p.route !== '/') {
    orphanPages.push({ ...p, isInRouter });
  } else {
    fullyAccessiblePages.push({ ...p, mentionCount, files: Array.from(mentioningFiles).slice(0, 3) });
  }
}

console.log(`\n📌 Toplam Tanımlı Sayfa Sayısı: ${pageRoutes.length}`);
console.log(`✅ UI'dan (Navigasyon, Arama, Kartlar, Butonlar) Erişilebilen Sayfalar: ${fullyAccessiblePages.length}`);
console.log(`⚠️ AppRouter'da Olmayan Sayfalar: ${unroutedPages.length}`);
console.log(`🚨 UI'da Butonu / Linki Olmayan (Öksüz) Sayfalar: ${orphanPages.length}\n`);

if (unroutedPages.length > 0) {
  console.log('❌ APPROUTER\'DA EKSİK OLANLAR:');
  unroutedPages.forEach(u => console.log(`   - ${u.name} (${u.route})`));
}

if (orphanPages.length > 0) {
  console.log('\n🚨 HİÇBİR MENÜDEN / BUTONDAN ERİŞİLEMEYEN ÖKSÜZ SAYFALAR:');
  orphanPages.forEach(o => console.log(`   - ${o.name} (${o.route}) [AppRouter'da Var mı: ${o.isInRouter ? 'EVET' : 'HAYIR'}]`));
} else {
  console.log('🎉 TEBRİKLER! TÜM SAYFALARA MENÜLERDEN, ARAMADAN VEYA KARTLARDAN %100 ERİŞİLEBİLİYOR!');
}
