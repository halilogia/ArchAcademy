import { useCallback, useEffect, useState } from 'react';
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

  const applyEnvelope = useCallback((next: CmsEnvelope<T>) => {
    setEnvelope(next);
    setError(null);
    setStatus('ready');
  }, []);

  const load = useCallback(async () => {
    try {
      applyEnvelope(await repository.getCollection<T>(name));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'CMS unavailable');
      setStatus('error');
    }
  }, [applyEnvelope, name, repository]);

  useEffect(() => {
    if (envelope) return;
    let cancelled = false;
    repository
      .getCollection<T>(name)
      .then((next) => {
        if (!cancelled) applyEnvelope(next);
      })
      .catch((cause: unknown) => {
        if (cancelled) return;
        setError(cause instanceof Error ? cause.message : 'CMS unavailable');
        setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, [applyEnvelope, envelope, name, repository]);

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
