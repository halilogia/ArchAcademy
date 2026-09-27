export const SESSION_TTL_MS: number;
export const RESET_TTL_MS: number;
export const MAX_FAILED_ATTEMPTS: number;
export const LOCKOUT_MS: number;

export interface AccountStoreFileOptions {
  dataDir: string;
}

export interface SessionRecord {
  token: string;
  ownerId: string;
  issuedAt: number;
  expiresAt: number;
}

export interface AccountStore {
  backend: 'sqlite' | 'file';
  getUser(ownerId: string): Record<string, unknown> | null;
  putUser(user: Record<string, unknown>): void;
  countUsers(): number;
  listSessions(ownerId: string): SessionRecord[];
  getSession(token: string): SessionRecord | null;
  putSession(session: SessionRecord): void;
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
  register(ownerId: string, password: string): { ok: boolean; reason?: string; session?: SessionRecord };
  issueSession(ownerId: string): SessionRecord;
  login(ownerId: string, password: string): { ok: boolean; reason?: string; session?: SessionRecord };
  resolve(token: string | undefined): { ownerId: string; expiresAt: number } | null;
  revoke(ownerId: string): number;
  revokeToken(token: string): void;
  changePassword(ownerId: string, currentPassword: string, nextPassword: string): { ok: boolean; reason?: string };
  requestReset(ownerId: string): { ok: boolean; reason?: string; token?: string; expiresInSeconds?: number };
  completeReset(token: string, nextPassword: string): { ok: boolean; reason?: string };
  sweep(): void;
}

export function hashPassword(password: string, salt?: string): string;
export function verifyPassword(password: string, stored: string): boolean;
export function createFileAccountStore(options: AccountStoreFileOptions): AccountStore;
export function createSqliteAccountStore(db: unknown): AccountStore;
export function createAuthService(options: { store: AccountStore }): AuthService;
