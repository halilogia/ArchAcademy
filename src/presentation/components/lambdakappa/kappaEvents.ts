export interface LogEvent {
  id: number;
  value: number;
  timestamp: string;
}

export const KAPPA_EVENT_LOG: LogEvent[] = [
  { id: 1, value: 10, timestamp: '10:00:01' },
  { id: 2, value: 20, timestamp: '10:00:05' },
  { id: 3, value: 5,  timestamp: '10:00:12' },
  { id: 4, value: 50, timestamp: '10:00:45' }
];
