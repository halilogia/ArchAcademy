export interface ProgressEnvelopeRecord {
  ownerId: string;
  revision: number;
  syncedAt: string;
  progress: Record<string, unknown>;
}

export interface ProgressStore {
  get(ownerId: string): ProgressEnvelopeRecord | null;
  set(ownerId: string, envelope: ProgressEnvelopeRecord): { stored: ProgressEnvelopeRecord; conflict: boolean };
  remove(ownerId: string): void;
  size(): number;
  compact?(): void;
}

export interface RateLimiter {
  allow(request: unknown): { allowed: boolean; remaining: number; resetInSeconds: number };
  size(): number;
}

export interface RunningServer {
  server: unknown;
  store: ProgressStore;
  limiter: RateLimiter;
  port: number;
  origin: string;
  close(): Promise<void>;
}

export function createProgressStore(options?: { dataDir?: string | null }): ProgressStore;
export function createRateLimiter(options?: { windowMs?: number; max?: number }): RateLimiter;
export function parseUserTokens(raw: string | undefined | null): { ownerId: string; token: string }[];
export function normalizeBearer(header: string | undefined | null): string;
export function authorize(input: {
  header: string | undefined;
  ownerId: string;
  userTokens: { ownerId: string; token: string }[];
  sharedToken: string;
}): { allowed: boolean; reason?: 'unauthorized' | 'forbidden' };
export function createProgressServer(options?: {
  store?: ProgressStore;
  token?: string;
  userTokens?: { ownerId: string; token: string }[] | string;
  rateLimit?: { windowMs?: number; max?: number };
  dataDir?: string | null;
}): { server: unknown; store: ProgressStore; limiter: RateLimiter };
export function startProgressServer(options?: {
  port?: number;
  host?: string;
  token?: string;
  userTokens?: { ownerId: string; token: string }[] | string;
  dataDir?: string | null;
  rateLimit?: { windowMs?: number; max?: number };
}): Promise<RunningServer>;
