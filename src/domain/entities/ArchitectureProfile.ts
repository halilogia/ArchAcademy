export type Weights = Record<string, number>;

export interface ArchitectureOption {
  text: string;
  weights: Weights;
  constraints?: Record<string, number>;
}

export interface ArchitectureQuestion {
  id: string;
  title: string;
  type: 'choice' | 'range';
  desc: string;
  options?: ArchitectureOption[];
  leftLabel?: string;
  rightLabel?: string;
  weights?: {
    low: Weights;
    high: Weights;
  };
}

export interface ArchitectureProfile {
  key: string;
  title: string;
  tag: string;
  desc: string;
  color: string;
  pros: string[];
}

export type ArchitectureAnswers = Record<string, number>;
