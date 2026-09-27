export interface CmsCollectionSummary {
  collection: string;
  version: string | null;
  updatedAt: string | null;
  itemCount: number;
  hasOverride: boolean;
}

export interface CmsStore {
  list(): CmsCollectionSummary[];
  get(name: string): { collection: string; version: string; updatedAt: string; items: unknown[] } | null;
  set(name: string, envelope: { collection: string; version: string; updatedAt: string; items: unknown[] }): void;
  clear(name: string): void;
  writable: boolean;
}

export interface RunningCmsServer {
  server: unknown;
  store: CmsStore;
  port: number;
  origin: string;
  close(): Promise<void>;
}

export function createCmsStore(options: { seedDir: string; dataDir: string | null }): CmsStore;
export function createCmsServer(options: { store: CmsStore; token?: string }): { server: unknown; store: CmsStore };
export function startCmsServer(options?: {
  port?: number;
  host?: string;
  token?: string;
  seedDir?: string;
  dataDir?: string | null;
}): Promise<RunningCmsServer>;
