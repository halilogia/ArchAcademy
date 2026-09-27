interface ViteEnv {
  VITE_CMS_ENDPOINT?: string;
  VITE_CMS_TOKEN?: string;
  VITE_CMS_TIMEOUT_MS?: string;
  VITE_PROGRESS_SYNC_ENDPOINT?: string;
  VITE_PROGRESS_SYNC_TOKEN?: string;
  VITE_PROGRESS_SYNC_TIMEOUT_MS?: string;
  VITE_PROGRESS_USER_ID?: string;
}

const env: ViteEnv = typeof import.meta !== 'undefined' && import.meta.env
  ? (import.meta.env as unknown as ViteEnv)
  : ({} as ViteEnv);

const asNumber = (raw: string | undefined, fallback: number): number => {
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

const asEndpoint = (raw: string | undefined): string => (raw || '').replace(/\/+$/, '');

export interface AppConfig {
  cms: {
    endpoint: string;
    token: string;
    timeoutMs: number;
    remoteEnabled: boolean;
  };
  progressSync: {
    endpoint: string;
    token: string;
    timeoutMs: number;
    userId: string;
    remoteEnabled: boolean;
  };
}

const cmsEndpoint = asEndpoint(env.VITE_CMS_ENDPOINT);
const syncEndpoint = asEndpoint(env.VITE_PROGRESS_SYNC_ENDPOINT);

export const appConfig: AppConfig = {
  cms: {
    endpoint: cmsEndpoint,
    token: env.VITE_CMS_TOKEN || '',
    timeoutMs: asNumber(env.VITE_CMS_TIMEOUT_MS, 6000),
    remoteEnabled: cmsEndpoint.length > 0
  },
  progressSync: {
    endpoint: syncEndpoint,
    token: env.VITE_PROGRESS_SYNC_TOKEN || '',
    timeoutMs: asNumber(env.VITE_PROGRESS_SYNC_TIMEOUT_MS, 8000),
    userId: env.VITE_PROGRESS_USER_ID || 'local-learner',
    remoteEnabled: syncEndpoint.length > 0
  }
};
