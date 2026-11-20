import type { SceneLocale } from '../../../../domain/diagrams/sceneSpec';

export type { SceneLocale };

export interface SceneUiLabels {
  play: string;
  pause: string;
  replay: string;
  previous: string;
  next: string;
  step: string;
  whatChanged: string;
}

const LABELS: Record<SceneLocale, SceneUiLabels> = {
  en: {
    play: 'Play',
    pause: 'Pause',
    replay: 'Replay',
    previous: 'Back',
    next: 'Next',
    step: 'Step',
    whatChanged: 'What changed',
  },
  tr: {
    play: 'Oynat',
    pause: 'Duraklat',
    replay: 'Baştan',
    previous: 'Geri',
    next: 'İleri',
    step: 'Adım',
    whatChanged: 'Ne değişti',
  },
};

export const sceneLabels = (locale: SceneLocale): SceneUiLabels => LABELS[locale];
