import { CmsCollectionName, CmsEnvelope } from '../../domain/entities/CmsEntry';
import { CmsSource, ContentRepository } from '../../domain/repositories/ContentRepository';
import { appConfig } from '../config/env';
import { HttpContentClient, createHttpContentClient } from './HttpContentClient';
import { isSeeded, seedFactoryFor } from './seed';

export interface CmsContentRepositoryOptions {
  remote?: HttpContentClient | null;
  onError?: (collection: CmsCollectionName, error: unknown) => void;
}

export class CmsContentRepository implements ContentRepository {
  private readonly cache = new Map<CmsCollectionName, CmsEnvelope<unknown>>();
  private readonly inflight = new Map<CmsCollectionName, Promise<CmsEnvelope<unknown>>>();
  private readonly remote: HttpContentClient | null;
  private readonly onError: (collection: CmsCollectionName, error: unknown) => void;
  private activeSource: CmsSource = 'seed';

  constructor(options: CmsContentRepositoryOptions = {}) {
    this.remote = options.remote ?? null;
    this.onError = options.onError ?? (() => undefined);
  }

  get source(): CmsSource {
    return this.activeSource;
  }

  get remoteEnabled(): boolean {
    return this.remote !== null;
  }

  peekCollection<T>(name: CmsCollectionName): CmsEnvelope<T> | null {
    return (this.cache.get(name) as CmsEnvelope<T> | undefined) ?? null;
  }

  async getCollection<T>(name: CmsCollectionName): Promise<CmsEnvelope<T>> {
    const cached = this.peekCollection<T>(name);
    if (cached) return cached;

    const pending = this.inflight.get(name);
    if (pending) return pending as Promise<CmsEnvelope<T>>;

    const request = this.resolve<T>(name)
      .then((envelope) => {
        this.cache.set(name, envelope as CmsEnvelope<unknown>);
        return envelope;
      })
      .finally(() => {
        this.inflight.delete(name);
      });

    this.inflight.set(name, request as Promise<CmsEnvelope<unknown>>);
    return request;
  }

  async refresh(name?: CmsCollectionName): Promise<void> {
    const targets: CmsCollectionName[] = name ? [name] : [...this.cache.keys()];
    if (targets.length === 0) return;
    await Promise.all(
      targets.map(async (target) => {
        this.cache.delete(target);
        try {
          await this.getCollection(target);
        } catch (error) {
          this.onError(target, error);
        }
      })
    );
  }

  private async resolve<T>(name: CmsCollectionName): Promise<CmsEnvelope<T>> {
    if (this.remote) {
      try {
        const envelope = await this.remote.fetchCollection<T>(name);
        this.activeSource = 'remote';
        return envelope;
      } catch (error) {
        this.onError(name, error);
      }
    }

    const factory = seedFactoryFor(name);
    if (factory) {
      this.activeSource = 'seed';
      return factory() as CmsEnvelope<T>;
    }

    throw new Error(`No CMS source available for collection "${name}"`);
  }
}

const createRemoteClient = (): HttpContentClient | null => {
  if (!appConfig.cms.remoteEnabled) return null;
  return createHttpContentClient({
    endpoint: appConfig.cms.endpoint,
    token: appConfig.cms.token,
    timeoutMs: appConfig.cms.timeoutMs
  });
};

export const cmsContentRepository: ContentRepository = new CmsContentRepository({
  remote: createRemoteClient(),
  onError: (collection, error) => {
    if (import.meta.env?.DEV) {
      console.warn(`[cms] "${collection}" fell back to the bundled seed.`, error);
    }
  }
});

export const hasSeededCollection = isSeeded;
