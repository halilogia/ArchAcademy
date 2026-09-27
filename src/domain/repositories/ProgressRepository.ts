import { ProgressState } from '../entities/Progress';

export type ProgressSyncStatus = 'idle' | 'syncing' | 'synced' | 'offline' | 'error';

export interface ProgressRepository {
  load(): Promise<ProgressState | null>;
  save(state: ProgressState): Promise<ProgressState>;
  readonly remoteEnabled: boolean;
  readonly cacheEnabled: boolean;
}
