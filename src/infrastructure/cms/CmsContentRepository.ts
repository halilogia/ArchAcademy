import { CmsCollectionName, CmsEnvelope } from '../../domain/entities/CmsEntry';
import { CmsSource, ContentRepository } from '../../domain/repositories/ContentRepository';
import { appConfig } from '../config/env';
import { HttpContentClient, createHttpContentClient } from './HttpContentClient';

export interface CmsContentRepositoryOptions {
  remote?: HttpContentClient | null;
  staticBaseUrl?: string | null;
  fetchImpl?: typeof fetch;
  onError?: (collection: CmsCollectionName, error: unknown) => void;
}

const isEnvelope = <T>(value: unknown): value is CmsEnvelope<T> => {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Partial<CmsEnvelope<T>>;
  return Array.isArray(candidate.items);
};

export class CmsContentRepository implements ContentRepository {
  private readonly cache = new Map<CmsCollectionName, CmsEnvelope<unknown>>();
  private readonly inflight = new Map<CmsCollectionName, Promise<CmsEnvelope<unknown>>>();
  private readonly remote: HttpContentClient | null;
  private readonly staticBaseUrl: string | null;
  private readonly doFetch: typeof fetch;
  private readonly onError: (collection: CmsCollectionName, error: unknown) => void;
  private activeSource: CmsSource = 'seed';

  constructor(options: CmsContentRepositoryOptions = {}) {
    this.remote = options.remote ?? null;
    this.staticBaseUrl = options.staticBaseUrl ?? null;
    this.doFetch = options.fetchImpl ?? ((...args: Parameters<typeof fetch>) => fetch(...args));
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
      .then((payload) => {
        this.cache.set(name, payload as CmsEnvelope<unknown>);
        return payload;
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
        const payload = await this.remote.fetchCollection<T>(name);
        this.activeSource = 'remote';
        return payload;
      } catch (error) {
        this.onError(name, error);
      }
    }

    const staticPayload = await this.readStaticCollection<T>(name);
    if (staticPayload) {
      this.activeSource = 'seed';
      return staticPayload;
    }

    throw new Error(`No CMS source available for collection "${name}"`);
  }

  private async readStaticCollection<T>(name: CmsCollectionName): Promise<CmsEnvelope<T> | null> {
    if (!this.staticBaseUrl) return null;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), appConfig.cms.timeoutMs);

    try {
      const response = await this.doFetch(`${this.staticBaseUrl}/${name}.json`, {
        headers: { Accept: 'application/json' },
        signal: controller.signal
      });
      if (!response.ok) return null;
      const payload = await response.json();
      if (!isEnvelope<T>(payload)) {
        throw new Error(`Malformed static CMS payload for collection "${name}"`);
      }
      return {
        collection: payload.collection ?? name,
        version: payload.version ?? 'static',
        updatedAt: payload.updatedAt ?? new Date(0).toISOString(),
        items: payload.items
      };
    } catch (error) {
      this.onError(name, error);
      return null;
    } finally {
      clearTimeout(timer);
    }
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

const resolveStaticBaseUrl = (): string | null => {
  if (appConfig.cms.remoteEnabled) return null;
  const base = import.meta.env?.BASE_URL ?? '/';
  return `${String(base).replace(/\/*$/, '/')}cms`;
};

export const cmsContentRepository: ContentRepository = new CmsContentRepository({
  remote: createRemoteClient(),
  staticBaseUrl: resolveStaticBaseUrl(),
  onError: (collection, error) => {
    if (import.meta.env?.DEV) {
      console.warn(`[cms] "${collection}" fell back to the bundled seed.`, error);
    }
  }
});

