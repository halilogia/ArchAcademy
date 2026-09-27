import { QuizAttempt, QuizBand } from '../entities/Progress';

export type ArchetypeKey = 'Architect' | 'Specialist' | 'OverKiller' | 'Junior';

export const ARCHETYPE_KEYS: ArchetypeKey[] = ['Architect', 'Specialist', 'OverKiller', 'Junior'];

export const ARCHETYPE_BANDS: Record<ArchetypeKey, number> = {
  Architect: 100,
  Specialist: 68,
  OverKiller: 34,
  Junior: 12
};

export interface ArchetypeAnswer {
  questionId: number;
  archetype: ArchetypeKey;
  weight: number;
}

export interface QuizScore {
  correct: number;
  total: number;
  score: number;
  rank: QuizBand;
  dominantArchetype: ArchetypeKey;
  breakdown: Record<ArchetypeKey, number>;
  at: string;
}

export const emptyBreakdown = (): Record<ArchetypeKey, number> => ({
  Architect: 0,
  Specialist: 0,
  OverKiller: 0,
  Junior: 0
});

export const dominantArchetype = (breakdown: Record<ArchetypeKey, number>): ArchetypeKey => {
  const total = ARCHETYPE_KEYS.reduce((sum, key) => sum + (breakdown[key] ?? 0), 0);
  if (total === 0) return 'Junior';
  return ARCHETYPE_KEYS.reduce(
    (best, key) => (breakdown[key] > breakdown[best] ? key : best),
    'Architect' as ArchetypeKey
  );
};

export const bandForScore = (score: number): QuizBand => {
  if (score >= 85) return 'principal';
  if (score >= 65) return 'senior';
  if (score >= 40) return 'specialist';
  return 'trainee';
};

export const rankLabel = (band: QuizBand, isEn: boolean): string => {
  const labels: Record<QuizBand, { tr: string; en: string }> = {
    principal: { tr: 'Kıdemli Mimar (Principal)', en: 'Principal Architect' },
    senior: { tr: 'Kıdemli Mühendis (Senior)', en: 'Senior Engineer' },
    specialist: { tr: 'Uzman Mühendis', en: 'Specialist Engineer' },
    trainee: { tr: 'Akademi Çırağı', en: 'Academy Trainee' }
  };
  return isEn ? labels[band].en : labels[band].tr;
};

export const scoreArchetypeQuiz = (
  answers: ArchetypeAnswer[],
  at: string = new Date().toISOString()
): QuizScore => {
  const total = answers.length;
  const breakdown = emptyBreakdown();

  if (total === 0) {
    return {
      correct: 0,
      total: 0,
      score: 0,
      rank: 'trainee',
      dominantArchetype: 'Junior',
      breakdown,
      at
    };
  }

  let weighted = 0;
  answers.forEach((answer) => {
    breakdown[answer.archetype] += 1;
    weighted += ARCHETYPE_BANDS[answer.archetype] * (answer.weight / 10);
  });

  const score = Math.round(weighted / total);
  const archetype = dominantArchetype(breakdown);

  return {
    correct: breakdown.Architect,
    total,
    score,
    rank: bandForScore(score),
    dominantArchetype: archetype,
    breakdown,
    at
  };
};

export const toAttempt = (quizId: string, score: QuizScore): QuizAttempt => ({
  quizId,
  correct: score.correct,
  total: score.total,
  score: score.score,
  rank: score.rank,
  at: score.at
});
