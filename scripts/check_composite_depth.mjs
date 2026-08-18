import fs from 'fs';
import path from 'path';

const pagesDir = path.join(process.cwd(), 'src/presentation/pages');
const compDir = path.join(process.cwd(), 'src/presentation/components');

console.log('='.repeat(80));
console.log('📊 TOPLAM KOMPOZİT DERİNLİK (SAYFA + İÇE AKTARILAN TÜM ALT BİLEŞENLER)');
console.log('='.repeat(80));

const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));
const results = [];

for (const file of files) {
  const pPath = path.join(pagesDir, file);
  const content = fs.readFileSync(pPath, 'utf8');
  if (content.includes('Unified into')) continue; // Skip re-exports

  const pageLines = content.split('\n').length;
  let totalLines = pageLines;
  let subCount = 0;

  // Regex to match imports from ../components/
  const matches = content.matchAll(/from\s+['"]\.\.\/components\/([^'"]+)['"]/g);
  for (const match of matches) {
    const importRel = match[1];
    let target = path.join(compDir, importRel);
    if (!target.endsWith('.tsx') && !target.endsWith('.ts')) {
      if (fs.existsSync(target + '.tsx')) target += '.tsx';
      else if (fs.existsSync(target + '.ts')) target += '.ts';
      else if (fs.existsSync(path.join(target, 'index.tsx'))) target = path.join(target, 'index.tsx');
    }

    if (fs.existsSync(target)) {
      const compContent = fs.readFileSync(target, 'utf8');
      totalLines += compContent.split('\n').length;
      subCount++;
    }
  }

  results.push({ name: file, pageLines, subCount, totalLines });
}

results.sort((a, b) => a.totalLines - b.totalLines);

console.log(`${'SAYFA'.padEnd(25)} | ${'SAYFA SATIRI'.padEnd(12)} | ${'BİLEŞEN SAYISI'.padEnd(14)} | ${'TOPLAM SATIR (KOMPOZİT)'}`);
console.log('-'.repeat(80));

for (const r of results) {
  if (r.totalLines < 220) {
    console.log(`⚠️ ${r.name.padEnd(23)} | ${String(r.pageLines).padEnd(12)} | ${String(r.subCount).padEnd(14)} | 🎯 ${r.totalLines} satır (Derinleştirilebilir)`);
  }
}

console.log('\n✅ 220+ SATIR ÜZERİNDEKİ DEVASA / DERİN SAYFALAR (ÖRNEKLER):');
for (const r of results.filter(r => r.totalLines >= 300).slice(0, 8)) {
  console.log(`⚡ ${r.name.padEnd(23)} | ${String(r.pageLines).padEnd(12)} | ${String(r.subCount).padEnd(14)} | 🚀 ${r.totalLines} satır`);
}
