export interface KeyValueStorage {
  get(key: string): string | null;
  set(key: string, value: string): boolean;
  remove(key: string): void;
}

export const createMemoryStorage = (): KeyValueStorage => {
  const map = new Map<string, string>();
  return {
    get: (key) => map.get(key) ?? null,
    set: (key, value) => {
      map.set(key, value);
      return true;
    },
    remove: (key) => {
      map.delete(key);
    }
  };
};

const createLocalStorage = (): KeyValueStorage => {
  const store = window.localStorage;
  return {
    get: (key) => {
      try {
        return store.getItem(key);
      } catch {
        return null;
      }
    },
    set: (key, value) => {
      try {
        store.setItem(key, value);
        return true;
      } catch {
        return false;
      }
    },
    remove: (key) => {
      try {
        store.removeItem(key);
      } catch {
        return;
      }
    }
  };
};

export const memoryStorage: KeyValueStorage = createMemoryStorage();
export const safeStorage: KeyValueStorage =
  typeof window !== 'undefined' && 'localStorage' in window
    ? createLocalStorage()
    : memoryStorage;

export const isOnline = (): boolean =>
  typeof navigator === 'undefined' || typeof navigator.onLine !== 'boolean'
    ? true
    : navigator.onLine;

type IdleHandle = { kind: 'idle'; handle: number } | { kind: 'timeout'; handle: number };

const scheduleIdle = (task: () => void): IdleHandle => {
  const idleWindow = typeof window !== 'undefined' ? (window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  }) : undefined;

  if (idleWindow?.requestIdleCallback) {
    return { kind: 'idle', handle: idleWindow.requestIdleCallback(task, { timeout: 1500 }) };
  }
  return { kind: 'timeout', handle: window.setTimeout(task, 0) };
};

const cancelIdle = (token: IdleHandle): void => {
  if (token.kind === 'idle') {
    const idleWindow = window as Window & { cancelIdleCallback?: (handle: number) => void };
    idleWindow.cancelIdleCallback?.(token.handle);
    return;
  }
  window.clearTimeout(token.handle);
};

export const scheduleStorageWrite = (storage: KeyValueStorage, key: string, value: string): void => {
  cancelIdle(scheduleIdle(() => {
    storage.set(key, value);
  }));
};

export const writeThrough = (storage: KeyValueStorage, key: string, value: string): boolean =>
  storage.set(key, value);

export const readJson = <T>(storage: KeyValueStorage, key: string): T | null => {
  const raw = storage.get(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};
