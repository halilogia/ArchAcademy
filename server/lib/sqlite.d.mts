export interface SqliteModule {
  DatabaseSync: new (path: string) => unknown;
}

export interface SharedRateLimiter {
  backend: 'sqlite';
  allow(clientKey: string): { allowed: boolean; remaining: number; resetInSeconds: number };
  size(): number;
}

export function loadSqlite(): SqliteModule | null;
export function openDatabase(dataDir: string | null): unknown;
export function createSharedRateLimiter(
  db: unknown,
  options?: { windowMs?: number; max?: number }
): SharedRateLimiter;
