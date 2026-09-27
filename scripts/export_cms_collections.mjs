import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const root = process.cwd()
const outDir = path.join(root, 'public', 'cms')

const loadTsModule = async (relativePath) => {
  const filePath = path.join(root, relativePath)
  const source = fs.readFileSync(filePath, 'utf8')
  const transpiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
  })
  const dataUri = `data:text/javascript;base64,${Buffer.from(transpiled.outputText).toString('base64')}`
  return import(dataUri)
}

const envelope = (collection, version, items) => ({
  collection,
  version,
  updatedAt: new Date(0).toISOString(),
  items
})

const buildCollections = async () => {
  const acronyms = await loadTsModule('src/infrastructure/AcronymsData.ts')
  const glossarySource = fs.readFileSync(path.join(root, 'src/infrastructure/GlossaryData.ts'), 'utf8')
  const glossaryCode = glossarySource.replace(
    /import\s*\{[^}]+\}\s*from\s*['"][^'"]+['"];?/,
    `const ACRONYMS_DATA = ${JSON.stringify(acronyms.ACRONYMS_DATA)};`
  )
  const glossaryTranspiled = ts.transpileModule(glossaryCode, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 }
  })
  const glossary = await import(
    `data:text/javascript;base64,${Buffer.from(glossaryTranspiled.outputText).toString('base64')}`
  )

  const searchIndex = await loadTsModule('src/infrastructure/searchIndex.ts')
  const matrix = await loadTsModule('src/infrastructure/ComparisonMatrixData.ts')
  const architecture = await loadTsModule('src/infrastructure/ArchitectureData.ts')

  return {
    'search-index': searchIndex.SEARCH_INDEX_ENVELOPE,
    'acronym-categories': envelope('acronym-categories', '1.0.0', acronyms.ACRONYM_CATEGORIES),
    acronyms: envelope('acronyms', '1.0.0', acronyms.ACRONYMS_DATA),
    glossary: envelope('glossary', '1.0.0', glossary.GLOSSARY_TERMS),
    'comparison-matrix-cards': envelope('comparison-matrix-cards', '1.0.0', matrix.MATRIX_SUMMARY_CARDS),
    'comparison-matrix': envelope('comparison-matrix', '1.0.0', matrix.MATRIX_DATA),
    'architecture-questions': envelope('architecture-questions', '1.0.0', architecture.WIZARD_QUESTIONS),
    architectures: envelope(
      'architectures',
      '1.0.0',
      Object.entries(architecture.ARCHITECTURES).map(([key, value]) => ({ key, ...value }))
    )
  }
}

const write = (collections) => {
  fs.mkdirSync(outDir, { recursive: true })
  const written = []
  for (const [name, payload] of Object.entries(collections)) {
    const target = path.join(outDir, `${name}.json`)
    fs.writeFileSync(target, `${JSON.stringify(payload)}\n`, 'utf8')
    written.push(`${name}.json (${payload.items.length} items)`)
  }
  return written
}

const mode = process.argv[2] ?? 'write'

if (mode === 'check') {
  const collections = await buildCollections()
  const drift = []
  for (const [name, payload] of Object.entries(collections)) {
    const target = path.join(outDir, `${name}.json`)
    if (!fs.existsSync(target)) {
      drift.push(`${name}.json is missing`)
      continue
    }
    if (fs.readFileSync(target, 'utf8').trim() !== JSON.stringify(payload).trim()) {
      drift.push(`${name}.json is out of date`)
    }
  }
  if (drift.length > 0) {
    console.error('[cms-export] stale collections detected:')
    drift.forEach((entry) => console.error(`  - ${entry}`))
    console.error('[cms-export] run "npm run cms:export" and commit the result')
    process.exit(1)
  }
  console.log(`[cms-export] all ${Object.keys(collections).length} collections are up to date`)
} else {
  const collections = await buildCollections()
  const written = write(collections)
  written.forEach((entry) => console.log(`[cms-export] wrote public/cms/${entry}`))
}
