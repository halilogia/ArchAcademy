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
  backend: 'sqlite' | 'memory';
  allow(clientKey: string): { allowed: boolean; remaining: number; resetInSeconds: number };
  size(): number;
}

export interface AccountStore {
  backend: 'sqlite' | 'file';
  getUser(ownerId: string): Record<string, unknown> | null;
  putUser(user: Record<string, unknown>): void;
  countUsers(): number;
  listSessions(ownerId: string): { token: string; ownerId: string; issuedAt: number; expiresAt: number }[];
  getSession(token: string): { token: string; ownerId: string; issuedAt: number; expiresAt: number } | null;
  putSession(session: { token: string; ownerId: string; issuedAt: number; expiresAt: number }): void;
  deleteSession(token: string): void;
  deleteSessionsFor(ownerId: string): void;
  getResetToken(token: string): Record<string, unknown> | null;
  putResetToken(entry: { token: string; ownerId: string; expiresAt: number; usedAt: number }): void;
  sweep(): void;
}

export interface AuthService {
  backend: 'sqlite' | 'file';
  enabled: boolean;
  countUsers(): number;
  register(ownerId: string, password: string): { ok: boolean; reason?: string; session?: { token: string } };
  issueSession(ownerId: string): { token: string; ownerId: string; issuedAt: number; expiresAt: number };
  login(ownerId: string, password: string): { ok: boolean; reason?: string; session?: { token: string } };
  resolve(token: string | undefined): { ownerId: string; expiresAt: number } | null;
  revoke(ownerId: string): number;
  revokeToken(token: string): void;
  changePassword(ownerId: string, currentPassword: string, nextPassword: string): { ok: boolean; reason?: string };
  requestReset(ownerId: string): { ok: boolean; reason?: string; token?: string; expiresInSeconds?: number };
  completeReset(token: string, nextPassword: string): { ok: boolean; reason?: string };
  sweep(): void;
}

export interface Services {
  db: unknown;
  accountStore: AccountStore | null;
  auth: AuthService | null;
  limiter: RateLimiter;
  progress: ProgressStore;
}

export interface RunningServer {
  server: unknown;
  store: ProgressStore;
  limiter: RateLimiter;
  users: AuthService | null;
  services: Services;
  port: number;
  origin: string;
  close(): Promise<void>;
}

export function hashPassword(password: string, salt?: string): string;
export function verifyPassword(password: string, stored: string): boolean;
export function createFileAccountStore(options: { dataDir: string }): AccountStore;
export function createSqliteAccountStore(db: unknown): AccountStore;
export function createAuthService(options: { store: AccountStore }): AuthService;
export function createProgressStore(options?: { dataDir?: string | null; backend?: 'auto' | 'file'; db?: unknown }): ProgressStore;
export function createRateLimiter(options?: { windowMs?: number; max?: number }): RateLimiter;
export function createServices(options?: { dataDir?: string | null; backend?: 'auto' | 'file'; rateLimit?: { windowMs?: number; max?: number } }): Services;
export function clientKeyOf(request: unknown): string;
export function parseUserTokens(raw: string | undefined | null): { ownerId: string; token: string }[];
export function normalizeBearer(header: string | undefined | null): string;
export function createProgressServer(options?: {
  store?: ProgressStore;
  token?: string;
  userTokens?: { ownerId: string; token: string }[] | string;
  rateLimit?: { windowMs?: number; max?: number };
  dataDir?: string | null;
  backend?: 'auto' | 'file';
  users?: AuthService;
  services?: Services;
}): { server: unknown; store: ProgressStore; limiter: RateLimiter; users: AuthService | null; services: Services };
export function startProgressServer(options?: {
  port?: number;
  host?: string;
  token?: string;
  userTokens?: { ownerId: string; token: string }[] | string;
  dataDir?: string | null;
  rateLimit?: { windowMs?: number; max?: number };
  backend?: 'auto' | 'file';
}): Promise<RunningServer>;
