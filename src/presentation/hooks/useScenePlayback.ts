import { useCallback, useEffect, useState } from 'react';
import type { SceneStep } from '../../domain/diagrams/sceneSpec';
import { stepDuration } from '../../domain/diagrams/sceneState';

export interface ScenePlayback {
  index: number;
  playing: boolean;
  progress: number;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  next: () => void;
  prev: () => void;
  replay: () => void;
  goTo: (index: number) => void;
}

/**
 * Step index + autoplay for a scene. Timer depends on primitives only, so
 * re-renders (and freshly built specs) never restart the dwell timer.
 */
export function useScenePlayback(steps: SceneStep[]): ScenePlayback {
  const last = Math.max(0, steps.length - 1);
  const [rawIndex, setRawIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  const index = Math.min(rawIndex, last);
  const duration = stepDuration(steps[index]);

  const goTo = useCallback(
    (target: number) => {
      setPlaying(false);
      setRawIndex(() => Math.min(last, Math.max(0, Math.trunc(target))));
    },
    [last],
  );

  useEffect(() => {
    if (!playing || steps.length === 0 || index >= last) return undefined;
    const timer = setTimeout(() => {
      const next = Math.min(last, index + 1);
      setRawIndex(next);
      if (next >= last) setPlaying(false);
    }, duration);
    return () => clearTimeout(timer);
  }, [playing, index, last, duration, steps.length]);

  const play = useCallback(() => {
    if (index >= last) setRawIndex(0);
    setPlaying(true);
  }, [index, last]);

  const pause = useCallback(() => setPlaying(false), []);

  const toggle = useCallback(() => {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (index >= last) setRawIndex(0);
    setPlaying(true);
  }, [playing, index, last]);

  const next = useCallback(() => {
    setPlaying(false);
    setRawIndex((current) => Math.min(last, current + 1));
  }, [last]);

  const prev = useCallback(() => {
    setPlaying(false);
    setRawIndex((current) => Math.max(0, current - 1));
  }, []);

  const replay = useCallback(() => {
    setRawIndex(0);
    setPlaying(true);
  }, []);

  return {
    index,
    playing,
    progress: steps.length === 0 ? 0 : (index + 1) / steps.length,
    play,
    pause,
    toggle,
    next,
    prev,
    replay,
    goTo,
  };
}
