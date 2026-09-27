import { describe, expect, it } from 'vitest';
import {
  ARCHETYPE_BANDS,
  bandForScore,
  dominantArchetype,
  emptyBreakdown,
  rankLabel,
  scoreArchetypeQuiz,
  toAttempt
} from '../../domain/usecases/QuizScorer';

describe('bandForScore', () => {
  it('maps percentages onto seniority bands', () => {
    expect(bandForScore(100)).toBe('principal');
    expect(bandForScore(85)).toBe('principal');
    expect(bandForScore(84)).toBe('senior');
    expect(bandForScore(65)).toBe('senior');
    expect(bandForScore(64)).toBe('specialist');
    expect(bandForScore(40)).toBe('specialist');
    expect(bandForScore(39)).toBe('trainee');
    expect(bandForScore(0)).toBe('trainee');
  });
});

describe('dominantArchetype', () => {
  it('picks the highest scoring archetype and falls back to Junior on a tie', () => {
    expect(dominantArchetype({ Architect: 2, Specialist: 1, OverKiller: 0, Junior: 0 })).toBe('Architect');
    expect(dominantArchetype(emptyBreakdown())).toBe('Junior');
  });
});

describe('scoreArchetypeQuiz', () => {
  it('returns a zeroed result for an empty quiz', () => {
    const result = scoreArchetypeQuiz([], '2026-09-27T00:00:00.000Z');
    expect(result.total).toBe(0);
    expect(result.score).toBe(0);
    expect(result.rank).toBe('trainee');
    expect(result.dominantArchetype).toBe('Junior');
  });

  it('weights partial credit through the option weight', () => {
    const result = scoreArchetypeQuiz(
      [
        { questionId: 1, archetype: 'Architect', weight: 10 },
        { questionId: 2, archetype: 'Junior', weight: 2 }
      ],
      '2026-09-27T00:00:00.000Z'
    );
    expect(result.correct).toBe(1);
    expect(result.total).toBe(2);
    expect(result.score).toBe(Math.round((ARCHETYPE_BANDS.Architect + ARCHETYPE_BANDS.Junior * 0.2) / 2));
    expect(result.rank).toBe('specialist');
    expect(result.dominantArchetype).toBe('Architect');
  });

  it('scores a flawless architect run at 100', () => {
    const result = scoreArchetypeQuiz([
      { questionId: 1, archetype: 'Architect', weight: 10 },
      { questionId: 2, archetype: 'Architect', weight: 10 }
    ]);
    expect(result.score).toBe(100);
    expect(result.rank).toBe('principal');
    expect(result.breakdown.Architect).toBe(2);
  });

  it('never exceeds the architect band value', () => {
    const result = scoreArchetypeQuiz([{ questionId: 1, archetype: 'Architect', weight: 10 }]);
    expect(result.score).toBeLessThanOrEqual(ARCHETYPE_BANDS.Architect);
  });
});

describe('toAttempt', () => {
  it('projects a score onto the synced attempt shape', () => {
    const scored = scoreArchetypeQuiz([{ questionId: 1, archetype: 'Specialist', weight: 7 }], '2026-09-27T00:00:00.000Z');
    const attempt = toAttempt('architect-challenge', scored);
    expect(attempt).toEqual({
      quizId: 'architect-challenge',
      correct: 0,
      total: 1,
      score: scored.score,
      rank: scored.rank,
      at: '2026-09-27T00:00:00.000Z'
    });
  });
});

describe('rankLabel', () => {
  it('localizes the band', () => {
    expect(rankLabel('principal', true)).toBe('Principal Architect');
    expect(rankLabel('principal', false)).toBe('Kıdemli Mimar (Principal)');
  });
});
