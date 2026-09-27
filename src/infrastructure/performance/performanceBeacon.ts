export interface LongTaskSample {
  startedAt: number;
  durationMs: number;
}

export interface RouteTransitionSample {
  path: string;
  durationMs: number;
  startedAt: number;
}

export interface RuntimeSnapshot {
  collectedAt: number;
  longTasks: LongTaskSample[];
  routeTransitions: RouteTransitionSample[];
  navigation: {
    type: string;
    domContentLoadedMs: number | null;
    loadEventMs: number | null;
    transferSizeBytes: number;
    encodedBodySizeBytes: number;
  } | null;
  resourceCount: number;
  memoryUsedJsHeapMb: number | null;
}

const MAX_SAMPLES = 50;

const round = (value: number, digits = 1): number => {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
};

const percentile = (samples: number[], p: number): number | null => {
  if (samples.length === 0) return null;
  const sorted = [...samples].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.max(0, Math.ceil((p / 100) * sorted.length) - 1));
  return round(sorted[index]);
};

const emptySnapshot = (): RuntimeSnapshot => ({
  collectedAt: Date.now(),
  longTasks: [],
  routeTransitions: [],
  navigation: null,
  resourceCount: 0,
  memoryUsedJsHeapMb: null
});

/**
 * Runtime performance beacon.
 *
 * Bundle size is only half the story: a route can ship a small chunk and still
 * block the main thread for 300ms. This records long tasks, route transition
 * cost and navigation timing, and the diagnostics view reads it back. Sampling is
 * capped so the beacon itself cannot become a leak.
 */
export const createPerformanceBeacon = () => {
  let snapshot = emptySnapshot();
  let observer: PerformanceObserver | null = null;
  let supported = false;

  const readNavigationEntry = (): RuntimeSnapshot['navigation'] => {
    if (typeof performance === 'undefined') return null;
    const entry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    if (!entry) return null;
    return {
      type: entry.type,
      domContentLoadedMs: entry.domContentLoadedEventEnd > 0 ? round(entry.domContentLoadedEventEnd) : null,
      loadEventMs: entry.loadEventEnd > 0 ? round(entry.loadEventEnd) : null,
      transferSizeBytes: entry.transferSize ?? 0,
      encodedBodySizeBytes: entry.encodedBodySize ?? 0
    };
  };

  const readMemory = (): number | null => {
    if (typeof performance === 'undefined') return null;
    const memory = (performance as Performance & { memory?: { usedJSHeapSize: number } }).memory;
    if (!memory) return null;
    return round(memory.usedJSHeapSize / 1024 / 1024, 2);
  };

  const collect = (): RuntimeSnapshot => {
    snapshot = {
      collectedAt: Date.now(),
      longTasks: snapshot.longTasks,
      routeTransitions: snapshot.routeTransitions,
      navigation: readNavigationEntry(),
      resourceCount:
        typeof performance === 'undefined'
          ? 0
          : performance.getEntriesByType('resource').length + performance.getEntriesByType('navigation').length,
      memoryUsedJsHeapMb: readMemory()
    };
    return snapshot;
  };

  return {
    start(): void {
      if (supported || typeof PerformanceObserver === 'undefined') return;
      supported = true;
      try {
        observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            const task = entry as PerformanceEntry & { duration?: number; startTime: number };
            if (typeof task.duration !== 'number') return;
            snapshot = {
              ...snapshot,
              longTasks: [
                ...snapshot.longTasks,
                { startedAt: round(task.startTime), durationMs: round(task.duration) }
              ].slice(-MAX_SAMPLES)
            };
          });
        });
        observer.observe({ type: 'longtask', buffered: true });
      } catch {
        supported = false;
      }
    },

    stop(): void {
      observer?.disconnect();
      observer = null;
      supported = false;
    },

    /** Call right after a route renders to record how long the transition took. */
    recordRouteTransition(path: string, durationMs: number): void {
      snapshot = {
        ...snapshot,
        routeTransitions: [
          ...snapshot.routeTransitions,
          { path, durationMs: round(durationMs), startedAt: Date.now() }
        ].slice(-MAX_SAMPLES)
      };
    },

    snapshot(): RuntimeSnapshot {
      return collect();
    }
  };
};

const beacon = createPerformanceBeacon();

/** Records a route transition on the shared beacon so /diagnostics can read it. */
export const recordRouteTransition = (path: string, durationMs: number): void =>
  beacon.recordRouteTransition(path, durationMs);

export const startPerformanceBeacon = (): void => beacon.start();

export default beacon;

export type PerformanceBeacon = ReturnType<typeof createPerformanceBeacon>;

export { describeBeaconSupport } from './beaconSupport';
export type { BeaconSupport } from './beaconSupport';

export const summarizeRuntime = (snapshot: RuntimeSnapshot) => {
  const longTaskDurations = snapshot.longTasks.map((task) => task.durationMs);
  const transitionDurations = snapshot.routeTransitions.map((entry) => entry.durationMs);

  return {
    collectedAt: snapshot.collectedAt,
    longTaskCount: snapshot.longTasks.length,
    longTaskTotalMs: round(longTaskDurations.reduce((sum, value) => sum + value, 0)),
    longTaskP95Ms: percentile(longTaskDurations, 95),
    worstLongTaskMs: longTaskDurations.length > 0 ? round(Math.max(...longTaskDurations)) : null,
    transitionCount: snapshot.routeTransitions.length,
    transitionP50Ms: percentile(transitionDurations, 50),
    transitionP95Ms: percentile(transitionDurations, 95),
    worstTransitionMs: transitionDurations.length > 0 ? round(Math.max(...transitionDurations)) : null,
    navigation: snapshot.navigation,
    resourceCount: snapshot.resourceCount,
    memoryUsedJsHeapMb: snapshot.memoryUsedJsHeapMb
  };
};

export type RuntimeSummary = ReturnType<typeof summarizeRuntime>;
