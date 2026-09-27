import { CmsCollectionName } from '../entities/CmsEntry';

export interface ValidationIssue {
  level: 'error' | 'warning';
  path: string;
  message: string;
}

export interface CollectionSchema {
  requiredKeys: string[];
  uniqueKey?: string;
  minItems: number;
}

export const COLLECTION_NAMES: CmsCollectionName[];
export const COLLECTION_SCHEMAS: Partial<Record<CmsCollectionName, CollectionSchema>>;
export function isCollectionName(value: string): boolean;
export function isLocalizedString(value: unknown): boolean;
export function validateEnvelope(
  name: CmsCollectionName,
  envelope: unknown
): { errors: ValidationIssue[]; warnings: ValidationIssue[] };
