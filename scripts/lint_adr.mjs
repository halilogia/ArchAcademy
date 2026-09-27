import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const decisionsDir = path.join(root, 'decisions')

const ALLOWED_STATUSES = ['Proposed', 'Accepted', 'Deprecated', 'Superseded', 'Superseded by']
const REQUIRED_SECTIONS = ['Context', 'Decision Drivers', 'Considered Options', 'Decision', 'Consequences', 'Review Triggers']
const FILENAME_PATTERN = /^(\d{4})-[a-z0-9]+(?:-[a-z0-9]+)*\.md$/
const TITLE_PATTERN = /^#\s+(\d{4})\.\s+(.+)$/m
const STATUS_PATTERN = /^\s*-\s+\*\*Status:\*\*\s*(.+)$/m
const DATE_PATTERN = /^\s*-\s+\*\*Date:\*\*\s*(\d{4}-\d{2}-\d{2})/m
const DECIDERS_PATTERN = /^\s*-\s+\*\*Deciders:\*\*\s*(.+)$/m

const headingIndex = (markdown, title) => {
  const pattern = new RegExp(`^##\\s+${title}\\s*$`, 'm')
  const match = pattern.exec(markdown)
  return match ? match.index : -1
}

export const lintAdr = (markdown, fileName) => {
  const errors = []
  const warnings = []

  const fileMatch = FILENAME_PATTERN.exec(fileName)
  if (!fileMatch) {
    errors.push('filename must look like NNNN-kebab-case-title.md')
  }

  const titleMatch = TITLE_PATTERN.exec(markdown)
  if (!titleMatch) {
    errors.push('missing H1 title of the form "# 0000. Decision title"')
  }

  const number = fileMatch?.[1] ?? titleMatch?.[1]
  if (fileMatch && titleMatch && fileMatch[1] !== titleMatch[1]) {
    errors.push(`filename number (${fileMatch[1]}) does not match the H1 number (${titleMatch[1]})`)
  }

  const statusMatch = STATUS_PATTERN.exec(markdown)
  if (!statusMatch) {
    errors.push('missing "- **Status:**" metadata line')
  } else if (!ALLOWED_STATUSES.includes(statusMatch[1].trim())) {
    errors.push(`status "${statusMatch[1].trim()}" is not one of ${ALLOWED_STATUSES.join(', ')}`)
  }

  if (!DATE_PATTERN.test(markdown)) {
    errors.push('missing "- **Date:**" metadata line in YYYY-MM-DD format')
  }

  if (!DECIDERS_PATTERN.test(markdown)) {
    warnings.push('missing "- **Deciders:**" metadata line')
  }

  const positions = REQUIRED_SECTIONS.map((section) => headingIndex(markdown, section));
  REQUIRED_SECTIONS.forEach((section, index) => {
    if (positions[index] === -1) {
      errors.push(`missing "## ${section}" section`);
      return;
    }
    const next = positions[index + 1] ?? markdown.length;
    const body = markdown.slice(positions[index], next).split('\n').slice(1).join('\n').trim();
    if (body.length === 0) errors.push(`section "## ${section}" is empty`);
  });

  const present = positions.filter((position) => position >= 0);
  const ordered = [...present].sort((a, b) => a - b);
  if (present.length !== ordered.length) {
    errors.push('MADR sections must appear in the canonical order');
  }

  if (/\bTBD\b|\bTODO\b/i.test(markdown)) {
    warnings.push('record still contains TBD/TODO placeholders');
  }

  if (statusMatch?.includes('Superseded') && !/^##\s+Supersedes\s*$/m.test(markdown)) {
    warnings.push('status is Superseded but no "## Supersedes" section names the successor');
  }

  return { number, errors, warnings }
}

const collectFiles = (dir) => {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.md'))
    .map((name) => path.join(dir, name))
}

const run = () => {
  const files = collectFiles(decisionsDir)
  if (files.length === 0) {
    console.log('[adr-lint] no decision records found, nothing to lint')
    return
  }

  const seenNumbers = new Map()
  let errorCount = 0
  let warningCount = 0

  files.forEach((file) => {
    const fileName = path.basename(file)
    const markdown = fs.readFileSync(file, 'utf8')
    const { number, errors, warnings } = lintAdr(markdown, fileName)

    if (number) {
      if (seenNumbers.has(number)) {
        errors.push(`decision number ${number} is already used by ${path.basename(seenNumbers.get(number))}`)
      } else {
        seenNumbers.set(number, file)
      }
    }

    errorCount += errors.length
    warningCount += warnings.length

    if (errors.length === 0 && warnings.length === 0) {
      console.log(`  ok    ${fileName}`)
      return
    }
    errors.forEach((message) => console.log(`  error ${fileName}: ${message}`))
    warnings.forEach((message) => console.warn(`  warn  ${fileName}: ${message}`))
  })

  console.log(`\n[adr-lint] ${files.length} record(s): ${errorCount} error(s), ${warningCount} warning(s)`)
  if (errorCount > 0) process.exit(1)
}

if (Boolean(process.argv[1]) && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  run()
}
