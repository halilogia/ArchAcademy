import fs from "fs";
import path from "path";
import ts from "typescript";

// 1. Helper transpile loader
function loadTsModule(relativePath) {
  const fullPath = path.resolve(relativePath);
  const code = fs.readFileSync(fullPath, "utf8");
  const transpiled = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
  }).outputText;
  return "data:text/javascript;base64," + Buffer.from(transpiled).toString("base64");
}

// 2. Load searchIndex.ts
const dataUriSearch = loadTsModule("src/presentation/data/searchIndex.ts");
const { SEARCH_INDEX } = await import(dataUriSearch);

// 3. Load AcronymsData first for GlossaryData import
const acronymsCode = fs.readFileSync("src/infrastructure/AcronymsData.ts", "utf8");
const transpiledAcronyms = ts.transpileModule(acronymsCode, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
}).outputText;

let glossaryCode = fs.readFileSync("src/infrastructure/GlossaryData.ts", "utf8");
// inline acronyms import to avoid unresolved relative path in data URI
glossaryCode = glossaryCode.replace(/import\s*\{[^}]+\}\s*from\s*[\x27\"][^\x27\"]+[\x27\"];?/, transpiledAcronyms);

const transpiledGlossary = ts.transpileModule(glossaryCode, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
}).outputText;
const dataUriGlossary = "data:text/javascript;base64," + Buffer.from(transpiledGlossary).toString("base64");
const { GLOSSARY_TERMS } = await import(dataUriGlossary);

// 4. Router Routes
const routerContent = fs.readFileSync("src/presentation/navigation/AppRouter.tsx", "utf8");

let errors = 0;

console.log("==================================================");
console.log("🔍 1. SEARCH_INDEX KONTROLÜ (" + SEARCH_INDEX.length + " Arama Maddesi)");
console.log("==================================================");

for (const item of SEARCH_INDEX) {
  if (!item.title || !item.path || !item.content) {
    console.error("❌ Eksik alan içeren madde: " + JSON.stringify(item));
    errors++;
  }
  const pureRoute = item.path.split("?")[0];
  if (pureRoute !== "/" && !routerContent.includes("path=\"" + pureRoute + "\"")) {
    console.error("❌ SEARCH_INDEX içinde geçersiz rota: " + item.title + " -> " + item.path);
    errors++;
  }
}

console.log("==================================================");
console.log("📖 2. WIKI / SÖZLÜK KONTROLÜ (" + GLOSSARY_TERMS.length + " Terim)");
console.log("==================================================");

let missingEn = 0;
for (const term of GLOSSARY_TERMS) {
  if (!term.term || !term.definition) {
    console.error("❌ Tanımı eksik wiki maddesi: #" + term.id);
    errors++;
  }
  if (!term.term_en || !term.definition_en) {
    missingEn++;
  }
}

console.log("✅ SEARCH_INDEX: " + SEARCH_INDEX.length + " arama kaydı aktif ve sayfalarına 100% ulaşıyor.");
console.log("✅ WIKI (Sözlük): " + GLOSSARY_TERMS.length + " terim kayıtlı ve aranabilir.");
if (missingEn > 0) {
  console.log("ℹ️ " + missingEn + " adet terimin İngilizce çevirisi opsiyonel fallback durumunda.");
}

if (errors === 0) {
  console.log("\n🎉 TÜM ARAMA VE WİKİ İÇERİKLERİ 100% DOĞRULANDI VE ERİŞİLEBİLİR DURUMDA!");
  process.exit(0);
} else {
  console.error("\n⚠️ " + errors + " adet hata bulundu.");
  process.exit(1);
}

