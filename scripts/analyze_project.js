import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = process.cwd();
const outputFile = path.join(rootDir, 'project_context_dump.txt');
const srcDir = path.join(rootDir, 'src');

// Taranacak dosya uzantıları
const extensions = ['.js', '.jsx', '.ts', '.tsx', '.css', '.html', '.json'];
// Atlanacak klasörler
const ignoreDirs = ['node_modules', '.git', 'dist', 'coverage', '.vscode', 'public', 'assets'];

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
       if (!ignoreDirs.includes(file)) {
         arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
       }
    } else {
      const ext = path.extname(file);
      if (extensions.includes(ext)) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

// Ana işlem
console.log('Project analysis started...');
let output = `PROJECT CONTEXT DUMP\nGenerated at: ${new Date().toISOString()}\n\n`;

try {
    // 1. SRC klasörünü tara
    const files = getAllFiles(srcDir, []);
    
    // 2. Root dosyalarını ekle (config dosyaları)
    const rootFiles = ['package.json', 'vite.config.js', 'tsconfig.json', 'index.html', 'README.md'];
    rootFiles.forEach(f => {
        const p = path.join(rootDir, f);
        if (fs.existsSync(p)) files.push(p);
    });

    // 3. Dosyaları oku ve rapora ekle
    files.forEach(file => {
        const relativePath = path.relative(rootDir, file);
        // Resim dosyalarını vs okumaya çalışma
        if (relativePath.includes('.svg') || relativePath.includes('.png')) return;

        const content = fs.readFileSync(file, 'utf8');
        
        output += `================================================================================\n`;
        output += `FILE PATH: ${relativePath}\n`;
        output += `================================================================================\n`;
        output += content + '\n\n';
    });

    fs.writeFileSync(outputFile, output);
    console.log(`✅ Analysis complete! All code aggregated into: ${outputFile}`);
    console.log(`Total files analyzed: ${files.length}`);

} catch (err) {
    console.error('Analysis failed:', err);
}
