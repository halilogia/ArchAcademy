import fs from "fs";
import path from "path";

const navbarFile = "src/presentation/components/Navbar.tsx";
const navbarContent = fs.readFileSync(navbarFile, "utf8");

const routerFile = "src/presentation/navigation/AppRouter.tsx";
const routerContent = fs.readFileSync(routerFile, "utf8");

const linkRegex = /to=["\x27]([^"\x27]+)["\x27]/g;
const links = [];
let m;
while ((m = linkRegex.exec(navbarContent)) !== null) {
  links.push(m[1]);
}

console.log("Navbar menülerinde toplam " + links.length + " rota bağlantısı bulundu.");
let deadLinks = 0;
for (const link of links) {
  const pureRoute = link.split("?")[0];
  if (pureRoute === "/" || pureRoute === "") continue;
  if (!routerContent.includes("path=\"" + pureRoute + "\"")) {
    console.error("❌ Geçersiz bağlantı: " + link);
    deadLinks++;
  }
}

if (deadLinks === 0) {
  console.log("✅ Tüm Navbar (Kataloglar, Atölye, Referans) bağlantıları 100% geçerli rotalara ulaşıyor!");
}

