import { describe, expect, it } from 'vitest';
import { createPerformanceBeacon, summarizeRuntime } from '../../infrastructure/performance/performanceBeacon';
import { describeBeaconSupport } from '../../infrastructure/performance/beaconSupport';

const emptySnapshot = () => ({
  collectedAt: 0,
  longTasks: [],
  routeTransitions: [],
  navigation: null,
  resourceCount: 0,
  memoryUsedJsHeapMb: null
});

describe('performance beacon', () => {
  it('records route transitions with their duration', () => {
    const beacon = createPerformanceBeacon();
    beacon.recordRouteTransition('/sandbox', 412.4567);
    beacon.recordRouteTransition('/adr-generator', 88.2);

    const snapshot = beacon.snapshot();
    expect(snapshot.routeTransitions).toHaveLength(2);
    expect(snapshot.routeTransitions[0].path).toBe('/sandbox');
    expect(snapshot.routeTransitions[0].durationMs).toBe(412.5);
  });

  it('starts with an empty sample set', () => {
    const beacon = createPerformanceBeacon();
    const snapshot = beacon.snapshot();
    expect(snapshot.longTasks).toEqual([]);
    expect(snapshot.routeTransitions).toEqual([]);
  });

  it('survives a runtime without PerformanceObserver or performance', () => {
    expect(() => createPerformanceBeacon().start()).not.toThrow();
    expect(() => createPerformanceBeacon().stop()).not.toThrow();
  });
});

describe('summarizeRuntime', () => {
  it('reports nothing recorded rather than good numbers', () => {
    const summary = summarizeRuntime(emptySnapshot());
    expect(summary.longTaskCount).toBe(0);
    expect(summary.worstLongTaskMs).toBeNull();
    expect(summary.transitionP50Ms).toBeNull();
    expect(summary.worstTransitionMs).toBeNull();
    expect(summary.navigation).toBeNull();
  });

  it('summarizes long task cost and the worst offender', () => {
    const summary = summarizeRuntime({
      ...emptySnapshot(),
      longTasks: [
        { startedAt: 10, durationMs: 55 },
        { startedAt: 40, durationMs: 310 },
        { startedAt: 90, durationMs: 120 }
      ]
    });

    expect(summary.longTaskCount).toBe(3);
    expect(summary.longTaskTotalMs).toBe(485);
    expect(summary.worstLongTaskMs).toBe(310);
    expect(summary.longTaskP95Ms).toBe(310);
  });

  it('summarizes route transitions at p50 and p95', () => {
    const summary = summarizeRuntime({
      ...emptySnapshot(),
      routeTransitions: [
        { path: '/a', durationMs: 100, startedAt: 0 },
        { path: '/b', durationMs: 200, startedAt: 1 },
        { path: '/c', durationMs: 300, startedAt: 2 },
        { path: '/d', durationMs: 400, startedAt: 3 }
      ]
    });

    expect(summary.transitionCount).toBe(4);
    expect(summary.transitionP50Ms).toBe(200);
    expect(summary.transitionP95Ms).toBe(400);
    expect(summary.worstTransitionMs).toBe(400);
  });

  it('passes navigation timing through untouched', () => {
    const summary = summarizeRuntime({
      ...emptySnapshot(),
      navigation: {
        type: 'navigate',
        domContentLoadedMs: 840,
        loadEventMs: 1120,
        transferSizeBytes: 4096,
        encodedBodySizeBytes: 2048
      }
    });

    expect(summary.navigation?.loadEventMs).toBe(1120);
    expect(summary.navigation?.transferSizeBytes).toBe(4096);
  });
});

describe('describeBeaconSupport', () => {
  it('reports which browser capabilities are present', () => {
    const support = describeBeaconSupport();
    expect(typeof support.longTaskObserver).toBe('boolean');
    expect(typeof support.navigationTiming).toBe('boolean');
    expect(typeof support.memory).toBe('boolean');
    expect(support.navigationTiming).toBe(true);
  });
});
