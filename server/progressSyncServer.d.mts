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
}

export interface RunningServer {
  server: unknown;
  store: ProgressStore;
  port: number;
  origin: string;
  close(): Promise<void>;
}

export function createProgressStore(options?: { dataFile?: string | null }): ProgressStore;
export function createProgressServer(options?: { store?: ProgressStore; token?: string }): { server: unknown; store: ProgressStore };
export function startProgressServer(options?: {
  port?: number;
  host?: string;
  token?: string;
  dataFile?: string | null;
}): Promise<RunningServer>;
