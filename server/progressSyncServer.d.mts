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
  compact(): void;
  backend: 'sqlite' | 'append-log' | 'memory';
  close(): void;
}

export interface RateLimiter {
  allow(request: unknown): { allowed: boolean; remaining: number; resetInSeconds: number };
  size(): number;
}

export interface UserDirectory {
  enabled: boolean;
  size(): number;
  tokenCount(): number;
  register(ownerId: string, password: string): { ok: boolean; reason?: string; token?: string };
  login(ownerId: string, password: string): { ok: boolean; reason?: string; token?: string };
  revoke(ownerId: string): number;
  resolve(header: string | undefined): { ownerId: string; expiresAt: number } | null;
}

export interface RunningServer {
  server: unknown;
  store: ProgressStore;
  limiter: RateLimiter;
  users: UserDirectory;
  port: number;
  origin: string;
  close(): Promise<void>;
}

export function hashPassword(password: string, salt?: string): string;
export function verifyPassword(password: string, stored: string): boolean;
export function createProgressStore(options?: { dataDir?: string | null; backend?: 'auto' | 'file' }): ProgressStore;
export function createRateLimiter(options?: { windowMs?: number; max?: number }): RateLimiter;
export function createUserDirectory(options?: { dataDir?: string | null }): UserDirectory;
export function parseUserTokens(raw: string | undefined | null): { ownerId: string; token: string }[];
export function normalizeBearer(header: string | undefined | null): string;
export function createProgressServer(options?: {
  store?: ProgressStore;
  token?: string;
  userTokens?: { ownerId: string; token: string }[] | string;
  rateLimit?: { windowMs?: number; max?: number };
  dataDir?: string | null;
  backend?: 'auto' | 'file';
  users?: UserDirectory;
}): { server: unknown; store: ProgressStore; limiter: RateLimiter; users: UserDirectory };
export function startProgressServer(options?: {
  port?: number;
  host?: string;
  token?: string;
  userTokens?: { ownerId: string; token: string }[] | string;
  dataDir?: string | null;
  rateLimit?: { windowMs?: number; max?: number };
  backend?: 'auto' | 'file';
}): Promise<RunningServer>;
