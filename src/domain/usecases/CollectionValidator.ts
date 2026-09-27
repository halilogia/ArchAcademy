import { CmsCollectionName, CmsEnvelope } from '../entities/CmsEntry';
import {
  COLLECTION_SCHEMAS as SHARED_SCHEMAS,
  ValidationIssue,
  validateEnvelope
} from '../../shared/collectionSchema.mjs';

export type ValidationLevel = 'error' | 'warning';

export type { ValidationIssue };

export const COLLECTION_SCHEMAS = SHARED_SCHEMAS;

export const validateCollection = (
  name: CmsCollectionName,
  envelope: CmsEnvelope<unknown>
): ValidationIssue[] => {
  const { errors, warnings } = validateEnvelope(name, envelope);
  return [...errors, ...warnings];
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

export interface EditableField {
  key: string;
  kind: 'string' | 'number' | 'boolean' | 'string-list' | 'json';
  value: unknown;
}

export const describeItem = (item: unknown): EditableField[] => {
  if (typeof item !== 'object' || item === null) return [];
  return Object.entries(item as Record<string, unknown>).map(([key, value]) => {
    if (Array.isArray(value)) {
      const isStringList = value.every((entry) => typeof entry === 'string');
      return { key, kind: isStringList ? 'string-list' : 'json', value } as EditableField;
    }
    if (value !== null && typeof value === 'object') return { key, kind: 'json', value } as EditableField;
    if (typeof value === 'number') return { key, kind: 'number', value } as EditableField;
    if (typeof value === 'boolean') return { key, kind: 'boolean', value } as EditableField;
    return { key, kind: 'string', value } as EditableField;
  });
};
