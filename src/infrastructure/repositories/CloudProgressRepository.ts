import { ProgressEnvelope, ProgressState, normalizeProgress } from '../../domain/entities/Progress';
import { appConfig } from '../config/env';
import { isOnline } from '../storage/SafeStorage';

export interface CloudProgressRepositoryOptions {
  endpoint: string;
  token: string;
  timeoutMs: number;
  ownerId: string;
  maxAttempts?: number;
  fetchImpl?: typeof fetch;
  now?: () => number;
}

export class CloudProgressRepository {
  private readonly endpoint: string;
  private readonly token: string;
  private readonly timeoutMs: number;
  private readonly ownerId: string;
  private readonly maxAttempts: number;
  private readonly doFetch: typeof fetch;
  private readonly now: () => number;

  constructor(options: CloudProgressRepositoryOptions) {
    this.endpoint = options.endpoint;
    this.token = options.token;
    this.timeoutMs = options.timeoutMs;
    this.ownerId = options.ownerId;
    this.maxAttempts = options.maxAttempts ?? 3;
    this.doFetch = options.fetchImpl ?? ((...args: Parameters<typeof fetch>) => fetch(...args));
    this.now = options.now ?? (() => Date.now());
  }

  async pull(): Promise<ProgressState | null> {
    if (!isOnline()) throw new Error('offline');

    const response = await this.request(this.documentUrl(), { method: 'GET' });
    if (response.status === 404) return null;
    if (!response.ok) throw new Error(`sync pull failed with ${response.status}`);

    const envelope = (await response.json()) as Partial<ProgressEnvelope>;
    if (!envelope || typeof envelope !== 'object' || !envelope.progress) return null;
    return normalizeProgress(envelope.progress);
  }

  async push(state: ProgressState): Promise<ProgressState> {
    if (!isOnline()) throw new Error('offline');

    const payload: ProgressEnvelope = {
      ownerId: this.ownerId,
      revision: state.revision,
      syncedAt: new Date().toISOString(),
      progress: state
    };

    const response = await this.request(this.documentUrl(), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`sync push failed with ${response.status}`);

    const merged = (await response.json().catch(() => null)) as Partial<ProgressEnvelope> | null;
    return merged?.progress ? normalizeProgress(merged.progress) : state;
  }

  private documentUrl(): string {
    return `${this.endpoint}/progress/${encodeURIComponent(this.ownerId)}`;
  }

  private async request(url: string, init: RequestInit): Promise<Response> {
    let lastError: unknown = null;

    for (let attempt = 1; attempt <= this.maxAttempts; attempt += 1) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), this.timeoutMs);

      try {
        const response = await this.doFetch(url, {
          ...init,
          headers: {
            Accept: 'application/json',
            ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
            ...(init.headers ?? {})
          },
          signal: controller.signal
        });

        if (response.status >= 500 && attempt < this.maxAttempts) {
          lastError = new Error(`server error ${response.status}`);
        } else {
          return response;
        }
      } catch (error) {
        lastError = error;
      } finally {
        clearTimeout(timer);
      }

      await this.backoff(attempt);
    }

    throw lastError instanceof Error ? lastError : new Error('sync request failed');
  }

  private backoff(attempt: number): Promise<void> {
    const delay = Math.min(2 ** (attempt - 1) * 300, 2000);
    return new Promise((resolve) => {
      setTimeout(resolve, delay + Math.floor(this.now() % 100));
    });
  }
}

export const cloudProgressRepository: CloudProgressRepository | null = appConfig.progressSync.remoteEnabled
  ? new CloudProgressRepository({
      endpoint: appConfig.progressSync.endpoint,
      token: appConfig.progressSync.token,
      timeoutMs: appConfig.progressSync.timeoutMs,
      ownerId: appConfig.progressSync.userId
    })
  : null;
