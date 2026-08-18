import fs from 'fs';
import path from 'path';

const files = [
  'vertical.tsx',
  'horizontal.tsx',
  'llm-ops.tsx',
  'containerization.tsx',
  'zero-trust.tsx',
  'docs-annotations.tsx',
  'testing.tsx',
  'onion.tsx',
  'security.tsx',
  'rag-arch.tsx',
  'agentic-ai.tsx',
  'cqrs.tsx',
  'tdd.tsx',
  'eda.tsx',
  'moderate-abstraction.tsx',
  'component-driven.tsx',
  'fsd.tsx'
];

console.log("\n" + "=".repeat(85));
console.log(`${"SAYFA".padEnd(25)} | ${"SATIR".padEnd(8)} | ${"İÇERİK ÖZELLİKLERİ".padEnd(30)} | DURUM`);
console.log("=".repeat(85));

for (const name of files) {
  const fullPath = path.join('src/presentation/pages', name);
  if (!fs.existsSync(fullPath)) continue;
  const content = fs.readFileSync(fullPath, 'utf8');
  
  const hasTabs = content.includes('activeTab') || content.includes('setActiveTab');
  const hasSim = content.includes('Simulat') || content.includes('simulat') || content.includes('demo') || content.includes('Demo');
  const hasHero = content.includes('Hero') || content.includes('ArchHero');
  const hasLegacyEn = content.includes('return <') && content.includes('EN />');
  
  const lines = content.split('\n').length;
  
  let featureDesc = [];
  if (hasHero) featureDesc.push("Hero");
  if (hasTabs) featureDesc.push("Tabs");
  if (hasSim) featureDesc.push("Simulation");
  if (hasLegacyEn) featureDesc.push("⚠️ Legacy EN");

  const status = lines < 100 ? "⚠️ KISA (Genişletilebilir)" : "⚡ İYİ";
  console.log(`${name.padEnd(25)} | ${String(lines).padEnd(8)} | ${featureDesc.join(', ').padEnd(30)} | ${status}`);
}
console.log("=".repeat(85) + "\n");
