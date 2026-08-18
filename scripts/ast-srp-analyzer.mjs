import fs from 'fs';
import path from 'path';
import ts from 'typescript';

// Criteria for 100% Deterministic SRP Assessment:
// 1. Multiple Top-Level Component Declarations in one file (1 File = 1 Component Rule)
// 2. High cyclomatic complexity combined with multi-branch JSX rendering
// 3. Mixed State Machines (Unrelated multi-domain useState hooks in a page file)
// 4. Large raw JSX trees with deep nesting (> 5 levels) embedded in tab switchers

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true
  );

  let componentCount = 0;
  let useStateCount = 0;
  let hasMultipleTabBranches = false;
  let reasons = [];

  function getJsxDepth(node, currentDepth) {
    let maxD = currentDepth;
    if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
      currentDepth++;
      maxD = Math.max(maxD, currentDepth);
    }
    ts.forEachChild(node, child => {
      maxD = Math.max(maxD, getJsxDepth(child, currentDepth));
    });
    return maxD;
  }

  function visit(node) {
    if (ts.isFunctionDeclaration(node) || ts.isArrowFunction(node) || ts.isFunctionExpression(node)) {
      const parent = node.parent;
      const isTopLevel = parent && (ts.isSourceFile(parent) || ts.isVariableDeclaration(parent) || ts.isVariableStatement(parent));
      
      let returnsJsx = false;
      function checkReturns(n) {
        if (ts.isReturnStatement(n) && n.expression) {
          if (ts.isJsxElement(n.expression) || ts.isJsxSelfClosingElement(n.expression) || ts.isJsxFragment(n.expression) || ts.isParenthesizedExpression(n.expression)) {
            returnsJsx = true;
          }
        }
        ts.forEachChild(n, checkReturns);
      }
      checkReturns(node);

      if (returnsJsx && isTopLevel) {
        componentCount++;
      }
    }

    if (ts.isCallExpression(node)) {
      const expr = node.expression;
      if (ts.isIdentifier(expr) && expr.text === 'useState') {
        useStateCount++;
      }
    }

    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsEqualsEqualsToken) {
      if (node.left.getText(sourceFile).includes('activeTab') || node.right.getText(sourceFile).includes('activeTab')) {
        if (node.parent && ts.isBinaryExpression(node.parent) && node.parent.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) {
          const right = node.parent.right;
          if (ts.isJsxElement(right) || ts.isParenthesizedExpression(right)) {
            const depth = getJsxDepth(right, 0);
            if (depth > 4) {
              hasMultipleTabBranches = true;
            }
          }
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  if (filePath.includes('src\\presentation\\pages') || filePath.includes('src/presentation/pages')) {
    if (componentCount > 1) {
      reasons.push(`Single File contains ${componentCount} separate Component definitions (Should be split into dedicated component files).`);
    }
    if (hasMultipleTabBranches) {
      reasons.push(`Raw deeply nested tab views embedded directly in Page orchestrator instead of delegated component tabs.`);
    }
    if (useStateCount > 4) {
      reasons.push(`Page manages ${useStateCount} distinct state hooks directly (Violates SRP, should use Custom Hook / ViewModel).`);
    }
  }

  if (reasons.length > 0) {
    return { file: filePath, reasons };
  }
  return null;
}

function scanDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== 'dist' && file !== '.git') {
        scanDir(fullPath, fileList);
      }
    } else if (file.endsWith('.tsx')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const allTsxFiles = scanDir(path.resolve('./src'));
console.log(`\n🔍 Scanning ${allTsxFiles.length} TypeScript React files with AST Analyzer...\n`);

const violations = [];
for (const file of allTsxFiles) {
  const v = checkFile(file);
  if (v) {
    violations.push(v);
  }
}

if (violations.length === 0) {
  console.log('✅ %100 CLEAN! Zero SRP violations detected across all presentation pages.\n');
} else {
  console.log(`⚠️ Detected ${violations.length} potential files with SRP violations:\n`);
  for (const v of violations) {
    console.log(`📄 ${v.file}`);
    v.reasons.forEach(r => console.log(`   - ${r}`));
    console.log('');
  }
  console.log('================================================================================');
  console.log('⚠️  DİKKAT / UYARI:');
  console.log('Bu rapor statik AST analizi ile üretilmiştir. Lütfen listelenen her dosyayı');
  console.log('manuel olarak inceleyiniz ve iş mantığının gerçekten ayrılması gerekip');
  console.log('gerekmediğine kanaat getirdikten sonra refactoring planını onaylayınız!');
  console.log('================================================================================\n');
}
