import { useCallback, useEffect, useRef, useState } from 'react';
import { CmsCollectionName, CmsEnvelope } from '../../domain/entities/CmsEntry';
import { CmsSource, ContentRepository } from '../../domain/repositories/ContentRepository';
import { cmsContentRepository } from '../../infrastructure/cms/CmsContentRepository';

export type CmsStatus = 'loading' | 'ready' | 'error';

export interface CmsCollectionState<T> {
  data: T[];
  status: CmsStatus;
  source: CmsSource;
  version: string;
  updatedAt: string;
  error: string | null;
  refresh: () => Promise<void>;
}

export const useCmsCollection = <T,>(
  name: CmsCollectionName,
  repository: ContentRepository = cmsContentRepository
): CmsCollectionState<T> => {
  const peeked = repository.peekCollection<T>(name);
  const [envelope, setEnvelope] = useState<CmsEnvelope<T> | null>(peeked);
  const [status, setStatus] = useState<CmsStatus>(peeked ? 'ready' : 'loading');
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const load = useCallback(async () => {
    setStatus((prev) => (prev === 'ready' ? prev : 'loading'));
    try {
      const next = await repository.getCollection<T>(name);
      if (!mounted.current) return;
      setEnvelope(next);
      setError(null);
      setStatus('ready');
    } catch (cause) {
      if (!mounted.current) return;
      setError(cause instanceof Error ? cause.message : 'CMS unavailable');
      setStatus('error');
    }
  }, [name, repository]);

  useEffect(() => {
    if (!envelope) void load();
  }, [envelope, load]);

  const refresh = useCallback(async () => {
    await repository.refresh(name);
    await load();
  }, [load, name, repository]);

  return {
    data: envelope?.items ?? [],
    status,
    source: repository.source,
    version: envelope?.version ?? '0.0.0',
    updatedAt: envelope?.updatedAt ?? '',
    error,
    refresh
  };
};
