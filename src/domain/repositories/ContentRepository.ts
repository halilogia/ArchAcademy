import { CmsCollectionName, CmsEnvelope } from '../entities/CmsEntry';

export type CmsSource = 'seed' | 'remote';

export interface ContentRepository {
  getCollection<T>(name: CmsCollectionName): Promise<CmsEnvelope<T>>;
  peekCollection<T>(name: CmsCollectionName): CmsEnvelope<T> | null;
  refresh(name?: CmsCollectionName): Promise<void>;
  readonly source: CmsSource;
  readonly remoteEnabled: boolean;
}
