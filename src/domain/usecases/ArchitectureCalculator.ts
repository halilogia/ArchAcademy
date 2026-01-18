import { Question } from '../../infrastructure/data/ArchitectureData';

export type Scores = Record<string, number>;
export type Answers = Record<string, number>;

export interface SortedResult {
  key: string;
  score: number;
}

export const calculateScores = (answers: Answers, questions: Question[]): Scores => {
  const scores: Scores = {
    clean: 0,
    onion: 0,
    hexagonal: 0,
    vertical: 0,
    eda: 0,
    monolith: 0,
    ddd: 0
  };

  questions.forEach((q) => {
    const answer = answers[q.id];
    if (answer === undefined) return;

    if (q.type === 'choice' && q.options) {
      const option = q.options[answer];
      if (option?.weights) {
        Object.keys(option.weights).forEach(key => {
          scores[key] = (scores[key] || 0) + (option.weights[key] || 0);
        });
      }
      if (option?.constraints) {
        Object.keys(option.constraints).forEach(key => {
          scores[key] = (scores[key] || 0) + (option.constraints[key] || 0);
        });
      }
    } else if (q.type === 'range' && q.weights) {
      // Orijinal .jsx mantığı: 0-4 low, 6-10 high. Orta (5) nötr.
      const val = answer;
      if (val <= 4) {
        const factor = (5 - val) / 5;
        Object.keys(q.weights.low).forEach(key => {
          scores[key] = (scores[key] || 0) + Math.round(q.weights.low[key] * factor * 3);
        });
      } else if (val >= 6) {
        const factor = (val - 5) / 5;
        Object.keys(q.weights.high).forEach(key => {
          scores[key] = (scores[key] || 0) + Math.round(q.weights.high[key] * factor * 3);
        });
      }
    }
  });

  return scores;
};

export const getSortedResults = (scores: Scores): SortedResult[] => {
  const coreScores: Record<string, number> = {
    clean: (scores.clean || 0) + ((scores.onion || 0) * 0.5) + ((scores.hexagonal || 0) * 0.5),
    vertical: scores.vertical || 0,
    eda: scores.eda || 0,
    monolith: scores.monolith || 0
  };

  return Object.keys(coreScores)
    .map(key => ({ key, score: coreScores[key] }))
    .sort((a, b) => b.score - a.score);
};

export const calculateConfidence = (sortedResults: SortedResult[]): number => {
  const total = sortedResults.reduce((a, b) => a + (b.score > 0 ? b.score : 0), 0);
  if (total === 0) return 80;
  
  const confidence = Math.min(Math.round((sortedResults[0].score / total) * 150), 98);
  return confidence;
};
