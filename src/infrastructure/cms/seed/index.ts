import { CmsCollectionName, CmsEnvelope } from '../../../domain/entities/CmsEntry';
import { SEARCH_INDEX_ENVELOPE } from './searchIndex.seed';

export type SeedFactory = () => CmsEnvelope<unknown>;

const SEEDS: Partial<Record<CmsCollectionName, SeedFactory>> = {
  'search-index': () => SEARCH_INDEX_ENVELOPE as CmsEnvelope<unknown>
};

export const seedFactoryFor = (name: CmsCollectionName): SeedFactory | null => SEEDS[name] ?? null;

export const isSeeded = (name: CmsCollectionName): boolean => SEEDS[name] !== undefined;

export const listSeededCollections = (): CmsCollectionName[] =>
  (Object.keys(SEEDS) as CmsCollectionName[]).filter((name) => SEEDS[name] !== undefined);
