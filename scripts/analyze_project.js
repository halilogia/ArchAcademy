import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = process.cwd();
// Rapor dosyasını scripts klasörünün içine kaydet
const outputFile = path.join(__dirname, 'ai_context_report.txt');
const srcDir = path.join(rootDir, 'src');

// Sadece mantık dosyalarına odaklanıyoruz
const extensions = ['.js', '.jsx', '.ts', '.tsx'];
// Gereksiz klasörler
const ignoreDirs = ['node_modules', '.git', 'dist', 'coverage', '.vscode', 'public', 'assets', 'styles'];

// İçeriği OKANMAYACAK klasörler: ARTIK YOK. Hepsini okuyoruz ama KISITLIYORUZ.
// const excludeContentDirs = ['presentation', 'components', 'pages', 'ui']; 

// HER DOSYA İÇİN MAKSİMUM SATIR SAYISI (Daha fazla içerik görmek için artırdık)
const MAX_LINES_PER_FILE = 150;

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  // ... (Dosya tarama aynı)

  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
       if (!ignoreDirs.includes(file)) {
         arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
       }
    } else {
      const ext = path.extname(file);
      if (extensions.includes(ext)) {
        if (!file.includes('.test.') && !file.includes('.spec.')) {
            arrayOfFiles.push(fullPath);
        }
      }
    }
  });

  return arrayOfFiles;
}

function optimizeContent(content) {
    // 1. Import satırlarını tamamen kaldır (Çünkü dosya adından ne olduğu belli, importlar yer kaplıyor)
    content = content.replace(/^import .*[\r\n]+/gm, "");
    
    // 2. Yorumları temizle
    content = content.replace(/\/\*[\s\S]*?\*\//g, "");
    content = content.replace(/\/\/.*$/gm, "");
    
    // 3. console.log'ları temizle
    content = content.replace(/console\.log\(.*\);?/g, "");

    // 4. Boş satırları sıkıştır
    content = content.replace(/\n\s*\n/g, "\n");
    
    return content.trim();
}

console.log('Optimized Context analysis started...');
let output = `PROJECT CONTEXT (OPTIMIZED)\nGenerated at: ${new Date().toISOString()}\n`;
output += `Strategy: Imports removed. Logic retained. Truncated at ${MAX_LINES_PER_FILE} lines.\n\n`;

try {
    const files = getAllFiles(srcDir, []);
    
    files.forEach(file => {
        const relativePath = path.relative(rootDir, file);
        if (relativePath.includes('.svg') || relativePath.includes('.png')) return;

        let content = fs.readFileSync(file, 'utf8');
        const originalLineCount = content.split('\n').length;
        
        // Önemli: Önce temizle, sonra kes
        content = optimizeContent(content);
        
        const lines = content.split('\n');
        let truncatedContent = content;
        let isTruncated = false;

        if (lines.length > MAX_LINES_PER_FILE) {
            truncatedContent = lines.slice(0, MAX_LINES_PER_FILE).join('\n');
            isTruncated = true;
        }

        if (truncatedContent.length > 5) {
            output += `------------------------------------------------\n`;
            output += `FILE: ${relativePath} `;
            if (isTruncated) {
                output += `(Showing first ${MAX_LINES_PER_FILE} lines of ${originalLineCount})`;
            }
            output += `\n------------------------------------------------\n`;
            output += truncatedContent;
            
            if (isTruncated) {
                output += `\n... [Rest of file truncated for brevity] ...`;
            }
            output += `\n\n`;
        }
    });

    fs.writeFileSync(outputFile, output);
    console.log(`✅ Smart Analysis complete!`);
    console.log(`Output saved to: ${outputFile}`);
    console.log(`Total logic files scanned: ${files.length}`);

} catch (err) {
    console.error('Analysis failed:', err);
}
