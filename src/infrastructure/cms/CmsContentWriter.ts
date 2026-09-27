import { CmsCollectionName, CmsEnvelope } from '../../domain/entities/CmsEntry';
import { ValidationIssue } from '../../shared/collectionSchema.mjs';

export interface ContentWriteResult {
  ok: boolean;
  status: number;
  envelope?: CmsEnvelope<unknown>;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
}

const toIssues = (value: unknown): ValidationIssue[] => (Array.isArray(value) ? (value as ValidationIssue[]) : []);

/**
 * Writes a collection back to the CMS. The reference CMS server validates with the
 * same rules the console displays, so a 422 here always matches a red row up there.
 */
export const putCollection = async (
  endpoint: string,
  token: string,
  name: CmsCollectionName,
  envelope: CmsEnvelope<unknown>,
  fetchImpl: typeof fetch = fetch
): Promise<ContentWriteResult> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetchImpl(`${endpoint.replace(/\/+$/, '')}/collections/${name}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(envelope),
      signal: controller.signal
    });

    const payload = (await response.json().catch(() => null)) as
      | (CmsEnvelope<unknown> & { errors?: unknown; warnings?: unknown })
      | null;

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        errors: toIssues(payload?.errors),
        warnings: toIssues(payload?.warnings)
      };
    }

    return {
      ok: true,
      status: response.status,
      envelope: {
        collection: name,
        version: payload?.version ?? envelope.version,
        updatedAt: payload?.updatedAt ?? new Date().toISOString(),
        items: payload?.items ?? envelope.items
      },
      errors: [],
      warnings: toIssues(payload?.warnings)
    };
  } catch (cause) {
    return {
      ok: false,
      status: 0,
      errors: [
        {
          level: 'error',
          path: 'network',
          message: cause instanceof Error ? cause.message : 'request failed'
        }
      ],
      warnings: []
    };
  } finally {
    clearTimeout(timer);
  }
};

export const resetCollection = async (
  endpoint: string,
  token: string,
  name: CmsCollectionName,
  fetchImpl: typeof fetch = fetch
): Promise<boolean> => {
  try {
    const response = await fetchImpl(
      `${endpoint.replace(/\/+$/, '')}/collections/${name}/reset`,
      {
        method: 'POST',
        ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {})
      }
    );
    return response.ok;
  } catch {
    return false;
  }
};
