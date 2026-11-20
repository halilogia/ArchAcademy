import type { SceneStatus, SceneTone } from '../../../domain/diagrams/sceneSpec';
import { theme } from '../../themes/theme';

/**
 * Diagram-only tokens. All colours resolve to the ArchAcademy palette; the
 * scene renderer never introduces raw hex values of its own.
 */
export const TONE_COLOR: Record<SceneTone, string> = {
  blue: theme.colors.primary,
  green: theme.colors.accent,
  amber: theme.colors.layers.usecases,
  violet: theme.colors.layers.infrastructure,
  red: theme.colors.layers.entities,
  slate: theme.colors.textSecondary,
};

export const TONE_SOFT: Record<SceneTone, string> = {
  blue: 'rgba(59, 130, 246, 0.16)',
  green: 'rgba(16, 185, 129, 0.16)',
  amber: 'rgba(245, 158, 11, 0.16)',
  violet: 'rgba(139, 92, 246, 0.16)',
  red: 'rgba(239, 68, 68, 0.16)',
  slate: 'rgba(148, 163, 184, 0.14)',
};

export const STATUS_COLOR: Record<SceneStatus, string> = {
  ok: theme.colors.accent,
  warn: theme.colors.layers.usecases,
  down: theme.colors.layers.entities,
};

export const DIAGRAM = {
  canvasBg: theme.colors.bgDark,
  grid: 'rgba(148, 163, 184, 0.07)',
  nodeBg: 'linear-gradient(160deg, rgba(30, 41, 59, 0.96), rgba(15, 23, 42, 0.98))',
  nodeBorder: 'rgba(148, 163, 184, 0.2)',
  muted: theme.colors.textSecondary,
  text: theme.colors.textPrimary,
  surface: theme.colors.surface,
  mono: "'Fira Code', monospace",
  radius: { node: 16, chip: 8, panel: 20 },
} as const;

export const toneOf = (tone: SceneTone | undefined): SceneTone => tone ?? 'blue';
