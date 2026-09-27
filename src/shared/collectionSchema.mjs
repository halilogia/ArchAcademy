/**
 * Single source of truth for CMS collection shapes.
 *
 * Imported by the browser (validation in the Content Console) and by the
 * reference CMS server (write-time validation), so a payload accepted in one
 * place is accepted in the other.
 */

export const COLLECTION_NAMES = [
  'search-index',
  'acronyms',
  'acronym-categories',
  'glossary',
  'comparison-matrix',
  'comparison-matrix-cards',
  'architecture-questions',
  'architectures',
  'project-graph'
]

export const COLLECTION_SCHEMAS = {
  'search-index': {
    requiredKeys: ['id', 'title', 'description', 'path', 'category', 'keywords', 'content'],
    uniqueKey: 'id',
    minItems: 1
  },
  acronyms: {
    requiredKeys: ['id', 'name', 'fullName', 'tagline', 'description', 'category', 'badgeColor'],
    uniqueKey: 'id',
    minItems: 1
  },
  'acronym-categories': { requiredKeys: ['id', 'title', 'icon', 'color', 'desc'], uniqueKey: 'id', minItems: 1 },
  glossary: {
    requiredKeys: ['id', 'term', 'definition', 'category', 'guruTip'],
    uniqueKey: 'id',
    minItems: 1
  },
  'comparison-matrix': {
    requiredKeys: ['name', 'sizeValue', 'speed', 'kiss', 'dry', 'maintAndTest', 'flex', 'aiLocality', 'color', 'path'],
    uniqueKey: 'name',
    minItems: 1
  },
  'comparison-matrix-cards': { requiredKeys: ['id', 'title', 'desc', 'color'], uniqueKey: 'id', minItems: 1 },
  'architecture-questions': { requiredKeys: ['id', 'title', 'type', 'desc'], uniqueKey: 'id', minItems: 1 },
  architectures: { requiredKeys: ['key', 'title', 'tag', 'desc', 'color', 'pros'], uniqueKey: 'key', minItems: 1 },
  'project-graph': { requiredKeys: ['nodes', 'links'], minItems: 1 }
}

export const isCollectionName = (value) => COLLECTION_NAMES.includes(value)

export const isLocalizedString = (value) =>
  typeof value === 'object' && value !== null && typeof value.tr === 'string' && typeof value.en === 'string'

const LOCALIZED_KEY_HINTS = ['title', 'desc', 'description', 'tagline', 'fullName']

/**
 * Validates an envelope against its registered schema.
 * Errors block a write; warnings are advisory.
 */
export const validateEnvelope = (name, envelope) => {
  const errors = []
  const warnings = []

  if (envelope === null || typeof envelope !== 'object') {
    return { errors: [{ level: 'error', path: 'envelope', message: 'payload must be an object' }], warnings }
  }

  if (envelope.collection !== name) {
    errors.push({
      level: 'error',
      path: 'collection',
      message: `envelope declares "${envelope.collection}" but was requested as "${name}"`
    })
  }

  if (typeof envelope.version !== 'string' || envelope.version.length === 0) {
    errors.push({ level: 'error', path: 'version', message: 'version must be a non-empty string' })
  }

  if (!Array.isArray(envelope.items)) {
    errors.push({ level: 'error', path: 'items', message: 'items must be an array' })
    return { errors, warnings }
  }

  const schema = COLLECTION_SCHEMAS[name]
  if (!schema) {
    warnings.push({ level: 'warning', path: 'schema', message: `no schema registered for "${name}"` })
    return { errors, warnings }
  }

  if (envelope.items.length < schema.minItems) {
    errors.push({
      level: 'error',
      path: 'items',
      message: `expected at least ${schema.minItems} item(s), found ${envelope.items.length}`
    })
  }

  const seen = new Set()

  envelope.items.forEach((item, index) => {
    if (typeof item !== 'object' || item === null) {
      errors.push({ level: 'error', path: `items[${index}]`, message: 'item must be an object' })
      return
    }

    const record = item

    schema.requiredKeys.forEach((key) => {
      if (record[key] === undefined || record[key] === null) {
        errors.push({ level: 'error', path: `items[${index}].${key}`, message: 'required key is missing' })
      }
    })

    if (schema.uniqueKey) {
      const keyValue = record[schema.uniqueKey]
      if (typeof keyValue === 'string' || typeof keyValue === 'number') {
        const key = String(keyValue)
        if (seen.has(key)) {
          errors.push({
            level: 'error',
            path: `items[${index}].${schema.uniqueKey}`,
            message: `duplicate value "${key}"`
          })
        }
        seen.add(key)
      }
    }

    LOCALIZED_KEY_HINTS.forEach((key) => {
      if (record[key] !== undefined && !isLocalizedString(record[key])) {
        warnings.push({
          level: 'warning',
          path: `items[${index}].${key}`,
          message: 'expected a localized { tr, en } string'
        })
      }
    })
  })

  return { errors, warnings }
}
