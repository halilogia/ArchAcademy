import { CmsCollectionName, CmsEnvelope } from '../entities/CmsEntry';

export type ValidationLevel = 'error' | 'warning';

export interface ValidationIssue {
  level: ValidationLevel;
  path: string;
  message: string;
}

export interface CollectionSchema {
  requiredKeys: string[];
  uniqueKey?: string;
  minItems: number;
  maxItems?: number;
}

export const COLLECTION_SCHEMAS: Partial<Record<CmsCollectionName, CollectionSchema>> = {
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
};

const isLocalized = (value: unknown): boolean => {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return typeof candidate.tr === 'string' && typeof candidate.en === 'string';
};

const LOCALIZED_KEY_HINTS = ['title', 'desc', 'description', 'tagline', 'fullName'];

export const validateCollection = (name: CmsCollectionName, envelope: CmsEnvelope<unknown>): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  const schema = COLLECTION_SCHEMAS[name];

  if (envelope.collection !== name) {
    issues.push({
      level: 'error',
      path: 'collection',
      message: `envelope declares "${envelope.collection}" but was requested as "${name}"`
    });
  }

  if (!Array.isArray(envelope.items)) {
    issues.push({ level: 'error', path: 'items', message: 'items must be an array' });
    return issues;
  }

  if (!schema) {
    issues.push({ level: 'warning', path: 'schema', message: `no schema registered for "${name}"` });
    return issues;
  }

  if (envelope.items.length < schema.minItems) {
    issues.push({
      level: 'error',
      path: 'items',
      message: `expected at least ${schema.minItems} item(s), found ${envelope.items.length}`
    });
  }

  const seen = new Set<string>();

  envelope.items.forEach((item, index) => {
    if (typeof item !== 'object' || item === null) {
      issues.push({ level: 'error', path: `items[${index}]`, message: 'item must be an object' });
      return;
    }

    const record = item as Record<string, unknown>;

    schema.requiredKeys.forEach((key) => {
      if (record[key] === undefined || record[key] === null) {
        issues.push({ level: 'error', path: `items[${index}].${key}`, message: 'required key is missing' });
      }
    });

    if (schema.uniqueKey) {
      const keyValue = record[schema.uniqueKey];
      if (typeof keyValue === 'string' || typeof keyValue === 'number') {
        const key = String(keyValue);
        if (seen.has(key)) {
          issues.push({
            level: 'error',
            path: `items[${index}].${schema.uniqueKey}`,
            message: `duplicate value "${key}"`
          });
        }
        seen.add(key);
      }
    }

    LOCALIZED_KEY_HINTS.forEach((key) => {
      if (record[key] !== undefined && !isLocalized(record[key])) {
        issues.push({
          level: 'warning',
          path: `items[${index}].${key}`,
          message: 'expected a localized { tr, en } string'
        });
      }
    });
  });

  return issues;
};

export interface CollectionReport {
  name: CmsCollectionName;
  version: string;
  updatedAt: string;
  itemCount: number;
  issues: ValidationIssue[];
  errorCount: number;
  warningCount: number;
}

export const summarizeCollection = (
  name: CmsCollectionName,
  envelope: CmsEnvelope<unknown>
): CollectionReport => {
  const issues = validateCollection(name, envelope);
  return {
    name,
    version: envelope.version,
    updatedAt: envelope.updatedAt,
    itemCount: envelope.items.length,
    issues,
    errorCount: issues.filter((issue) => issue.level === 'error').length,
    warningCount: issues.filter((issue) => issue.level === 'warning').length
  };
};
