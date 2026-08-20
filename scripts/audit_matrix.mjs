import fs from "fs";
import path from "path";
import ts from "typescript";

const DATA_FILE = path.resolve("src/infrastructure/ComparisonMatrixData.ts");
const content = fs.readFileSync(DATA_FILE, "utf8");

const transpiled = ts.transpileModule(content, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
}).outputText;

const dataUri = "data:text/javascript;base64," + Buffer.from(transpiled).toString("base64");
const { MATRIX_DATA, MATRIX_SUMMARY_CARDS } = await import(dataUri);

let hasErrors = false;

function logError(msg) {
  console.error("❌ [MATRIX ERROR]: " + msg);
  hasErrors = true;
}

function logSuccess(msg) {
  console.log("✅ [MATRIX AUDIT]: " + msg);
}

console.log("🔍 Denetleniyor: " + MATRIX_DATA.length + " Mimari ve Özet Kartları...\n");

for (const row of MATRIX_DATA) {
  // 1. i18n Eksiksizliği
  if (!row.name || !row.path || !row.color) {
    logError("Eksik temel veri: " + JSON.stringify(row));
  }
  if (!row.size?.tr || !row.size?.en) {
    logError(row.name + " için size (TR/EN) çevirisi eksik!");
  }
  if (!row.bestFor?.tr || !row.bestFor?.en) {
    logError(row.name + " için bestFor (TR/EN) çevirisi eksik!");
  }

  // 2. Sayısal Aralık Kontrolü (1 - 5)
  const numericMetrics = ["speed", "kiss", "dry", "maintAndTest", "flex", "aiLocality"];
  for (const metric of numericMetrics) {
    const val = row[metric];
    if (typeof val !== "number" || val < 1 || val > 5) {
      logError(row.name + " geçerli olmayan " + metric + " değerine sahip: " + val);
    }
  }
}

// 3. Özet Kartları Denetimi
for (const card of MATRIX_SUMMARY_CARDS) {
  if (!card.title?.tr || !card.title?.en || !card.desc?.tr || !card.desc?.en) {
    logError("Özet kartı " + card.id + " için TR veya EN çevirisi eksik!");
  }
}

if (!hasErrors) {
  logSuccess("Tüm " + MATRIX_DATA.length + " mimari kural, puan aralığı ve çift dil (TR/EN) testlerinden %100 başarıyla geçti!");
  process.exit(0);
} else {
  console.error("\n⚠️ Denetim başarısız oldu.");
  process.exit(1);
}
