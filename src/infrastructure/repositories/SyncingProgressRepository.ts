import { ProgressState, emptyProgress } from '../../domain/entities/Progress';
import { ProgressRepository } from '../../domain/repositories/ProgressRepository';
import { mergeProgress } from '../../domain/usecases/ProgressMerger';
import { appConfig } from '../config/env';
import { CloudProgressRepository, cloudProgressRepository } from './CloudProgressRepository';
import { LocalProgressCache } from './LocalProgressCache';

export class SyncingProgressRepository implements ProgressRepository {
  private readonly cache: LocalProgressCache;
  private readonly cloud: CloudProgressRepository | null;
  private readonly ownerId: string;

  constructor(cache: LocalProgressCache, cloud: CloudProgressRepository | null, ownerId: string) {
    this.cache = cache;
    this.cloud = cloud;
    this.ownerId = ownerId;
  }

  get remoteEnabled(): boolean {
    return this.cloud !== null;
  }

  get cacheEnabled(): boolean {
    return true;
  }

  async load(): Promise<ProgressState | null> {
    const local = this.cache.read() ?? this.cache.readLegacy();
    if (this.cache.readLegacy()) this.cache.clearLegacy();

    if (!this.cloud) return local;

    const remote = await this.cloud.pull().catch(() => null);
    if (!remote) return local;
    if (!local) {
      this.cache.write(remote, this.ownerId);
      return remote;
    }

    const merged = mergeProgress(local, remote);
    this.cache.write(merged, this.ownerId);
    return merged;
  }

  async save(state: ProgressState): Promise<ProgressState> {
    this.cache.write(state, this.ownerId);
    if (!this.cloud) return state;

    const pushed = await this.cloud.push(state);
    const merged = mergeProgress(state, pushed);
    this.cache.write(merged, this.ownerId);
    return merged;
  }

  async pullRemote(): Promise<ProgressState | null> {
    if (!this.cloud) return null;
    const remote = await this.cloud.pull();
    if (!remote) return null;
    const local = this.cache.read() ?? emptyProgress();
    const merged = mergeProgress(local, remote);
    this.cache.write(merged, this.ownerId);
    return merged;
  }
}

export const progressRepository: ProgressRepository = new SyncingProgressRepository(
  new LocalProgressCache(),
  cloudProgressRepository,
  appConfig.progressSync.userId
);
