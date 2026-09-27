export interface BeaconSupport {
  longTaskObserver: boolean;
  navigationTiming: boolean;
  memory: boolean;
}

export const describeBeaconSupport = (): BeaconSupport => ({
  longTaskObserver: typeof PerformanceObserver !== 'undefined',
  navigationTiming: typeof performance !== 'undefined' && performance.getEntriesByType !== undefined,
  memory:
    typeof performance !== 'undefined' &&
    typeof (performance as Performance & { memory?: unknown }).memory !== 'undefined'
});
