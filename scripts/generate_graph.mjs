import fs from 'fs';
import path from 'path';

const SRC_DIR = path.resolve('src');
const OUTPUT_FILE = path.resolve('public/project-graph.json');

const nodes = [];
const links = [];
const fileMap = new Map();

function getCategory(relPath) {
  if (relPath.startsWith('domain')) return 'Domain';
  if (relPath.startsWith('infrastructure')) return 'Infra';
  if (relPath.includes('pages')) return 'Page';
  if (relPath.includes('components')) return 'Component';
  if (relPath.includes('hooks')) return 'Hook';
  if (relPath.includes('context') || relPath.includes('stores')) return 'State';
  if (relPath.includes('navigation') || relPath.includes('routes')) return 'App';
  return 'Other';
}

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== 'dist') {
        scanDir(fullPath);
      }
    } else if (/\.(ts|tsx|js|jsx)$/.test(entry.name) && !entry.name.endsWith('.d.ts') && !entry.name.includes('.test.')) {
      const relPath = path.relative(SRC_DIR, fullPath).replace(/\\/g, '/');
      const stats = fs.statSync(fullPath);
      const node = {
        id: relPath,
        label: path.basename(relPath),
        category: getCategory(relPath),
        size: stats.size
      };
      nodes.push(node);
      fileMap.set(relPath, { fullPath, content: fs.readFileSync(fullPath, 'utf8') });
    }
  }
}

scanDir(SRC_DIR);

const importRegex = /from\s+['"]([^'"]+)['"]/g;

for (const [relPath, { fullPath, content }] of fileMap.entries()) {
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    if (importPath.startsWith('.')) {
      const dir = path.dirname(fullPath);
      const resolved = path.resolve(dir, importPath);
      
      const candidates = [
        resolved + '.ts',
        resolved + '.tsx',
        resolved + '.js',
        resolved + '.jsx',
        path.join(resolved, 'index.ts'),
        path.join(resolved, 'index.tsx'),
        path.join(resolved, 'index.js')
      ];

      for (const cand of candidates) {
        if (fs.existsSync(cand)) {
          const targetRel = path.relative(SRC_DIR, cand).replace(/\\/g, '/');
          if (fileMap.has(targetRel) && relPath !== targetRel) {
            links.push({
              source: relPath,
              target: targetRel,
              value: 1
            });
          }
          break;
        }
      }
    }
  }
}

const graphData = { nodes, links };
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(graphData, null, 2), 'utf8');
console.log(`Successfully generated project graph with ${nodes.length} nodes and ${links.length} links!`);
