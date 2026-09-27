import { CmsCollectionName, CmsEnvelope } from '../../domain/entities/CmsEntry';

export interface HttpContentClientOptions {
  endpoint: string;
  token: string;
  timeoutMs: number;
  fetchImpl?: typeof fetch;
}

export interface HttpContentClient {
  fetchCollection<T>(name: CmsCollectionName): Promise<CmsEnvelope<T>>;
}

const buildUrl = (endpoint: string, name: CmsCollectionName): string =>
  `${endpoint.replace(/\/+$/, '')}/collections/${encodeURIComponent(name)}`;

const isEnvelope = <T>(value: unknown): value is CmsEnvelope<T> => {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Partial<CmsEnvelope<T>>;
  return Array.isArray(candidate.items) && typeof candidate.version === 'string';
};

const normalize = <T>(payload: unknown, name: CmsCollectionName): CmsEnvelope<T> => {
  if (isEnvelope<T>(payload)) {
    return {
      collection: payload.collection ?? name,
      version: payload.version,
      updatedAt: payload.updatedAt ?? new Date(0).toISOString(),
      items: payload.items
    };
  }
  if (Array.isArray(payload)) {
    return {
      collection: name,
      version: 'remote',
      updatedAt: new Date(0).toISOString(),
      items: payload as T[]
    };
  }
  throw new Error(`Malformed CMS payload for collection "${name}"`);
};

export const createHttpContentClient = (options: HttpContentClientOptions): HttpContentClient => {
  const doFetch = options.fetchImpl ?? ((...args: Parameters<typeof fetch>) => fetch(...args));

  return {
    async fetchCollection<T>(name: CmsCollectionName): Promise<CmsEnvelope<T>> {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), options.timeoutMs);

      try {
        const response = await doFetch(buildUrl(options.endpoint, name), {
          headers: {
            Accept: 'application/json',
            ...(options.token ? { Authorization: `Bearer ${options.token}` } : {})
          },
          signal: controller.signal
        });

        if (!response.ok) {
          throw new Error(`CMS responded ${response.status} for "${name}"`);
        }
        return normalize<T>(await response.json(), name);
      } finally {
        clearTimeout(timer);
      }
    }
  };
};
