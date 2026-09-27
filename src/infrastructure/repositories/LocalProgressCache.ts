import { ProgressEnvelope, ProgressState, normalizeProgress } from '../../domain/entities/Progress';
import { KeyValueStorage, readJson, safeStorage, writeThrough } from '../storage/SafeStorage';

export const PROGRESS_CACHE_KEY = 'arch-progress-cache-v2';
export const LEGACY_PROGRESS_KEY = 'arch_progress';

export class LocalProgressCache {
  private readonly storage: KeyValueStorage;

  constructor(storage: KeyValueStorage = safeStorage) {
    this.storage = storage;
  }

  read(): ProgressState | null {
    return normalizeProgressOrNull(readJson<ProgressEnvelope>(this.storage, PROGRESS_CACHE_KEY));
  }

  write(state: ProgressState, ownerId: string): void {
    const envelope: ProgressEnvelope = {
      ownerId,
      revision: state.revision,
      syncedAt: new Date().toISOString(),
      progress: state
    };
    writeThrough(this.storage, PROGRESS_CACHE_KEY, JSON.stringify(envelope));
  }

  readLegacy(): ProgressState | null {
    return normalizeProgressOrNull(readJson<ProgressState>(this.storage, LEGACY_PROGRESS_KEY));
  }

  clearLegacy(): void {
    this.storage.remove(LEGACY_PROGRESS_KEY);
  }
}

const normalizeProgressOrNull = (value: unknown): ProgressState | null => {
  if (value === null || value === undefined) return null;
  const envelope = value as Partial<ProgressEnvelope> & Partial<ProgressState>;
  if (envelope.progress && typeof envelope.progress === 'object') {
    return normalizeProgress(envelope.progress);
  }
  return normalizeProgress(value, new Date().toISOString());
};
