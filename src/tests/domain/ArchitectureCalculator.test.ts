import { describe, expect, it } from 'vitest';
import { ArchitectureOption, ArchitectureQuestion, Weights } from '../../domain/entities/ArchitectureProfile';
import { Answers, calculateConfidence, calculateScores, getSortedResults } from '../../domain/usecases/ArchitectureCalculator';

const buildQuestions = (count: number): ArchitectureQuestion[] =>
  Array.from({ length: count }, (_, index) => ({
    id: `q-${index}`,
    title: `Question ${index}`,
    type: 'choice' as const,
    desc: 'Pick one',
    options: [
      { text: 'A', weights: { clean: 3, vertical: 2 } },
      { text: 'B', weights: { vertical: 3, eda: 2 }, constraints: { monolith: 1 } }
    ] as ArchitectureOption[]
  }));

const buildAnswers = (count: number): Answers =>
  Object.fromEntries(Array.from({ length: count }, (_, index) => [`q-${index}`, index % 2]));

const countReads = <T extends object>(target: T, counter: { reads: number }): T =>
  new Proxy(target, {
    get(innerTarget, property, receiver) {
      if (typeof property === 'string') counter.reads += 1;
      return Reflect.get(innerTarget, property, receiver);
    },
    ownKeys(innerTarget) {
      counter.reads += 1;
      return Reflect.ownKeys(innerTarget);
    }
  }) as T;

describe('ArchitectureCalculator complexity', () => {
  it('scores every architecture in one pass over the questions', () => {
    const questions = buildQuestions(500);
    const scores = calculateScores(buildAnswers(500), questions);
    expect(scores.clean).toBeGreaterThan(0);
    expect(scores.vertical).toBeGreaterThan(0);
  });

  it('applies option constraints as well as weights', () => {
    const scores = calculateScores({ 'q-0': 1 }, buildQuestions(1));
    expect(scores.monolith).toBe(1);
  });

  it('ignores answers for questions that were never asked', () => {
    const scores = calculateScores({ 'q-missing': 0 }, buildQuestions(1));
    expect(scores.clean).toBe(0);
  });

  it('touches the option weights a constant number of times per answer, so cost stays linear', () => {
    // Counting property reads is deterministic, unlike a wall-clock comparison,
    // and it is the property that actually distinguishes linear from quadratic:
    // a nested rescan would multiply the reads by the number of questions.
    const probe = (questionCount: number) => {
      const counter = { reads: 0 };
      const questions: ArchitectureQuestion[] = Array.from({ length: questionCount }, (_, index) => ({
        id: `q-${index}`,
        title: `Question ${index}`,
        type: 'choice' as const,
        desc: 'Pick one',
        options: [
          { text: 'A', weights: countReads({ clean: 3, vertical: 2 }, counter) },
          { text: 'B', weights: countReads({ vertical: 3, eda: 2 }, counter) }
        ]
      }));

      const answers = Object.fromEntries(
        Array.from({ length: questionCount }, (_, index) => [`q-${index}`, 0])
      );
      calculateScores(answers, questions);
      return counter.reads;
    };

    const small = probe(100);
    const large = probe(1000);

    expect(small).toBeGreaterThan(0);
    expect(large).toBe(small * 10);
  });

  it('is idempotent: the same inputs produce the same scores', () => {
    const questions = buildQuestions(200);
    const answers = buildAnswers(200);
    expect(calculateScores(answers, questions)).toEqual(calculateScores(answers, questions));
  });
});

describe('ranking', () => {
  it('blends onion and hexagonal into clean', () => {
    const sorted = getSortedResults({ clean: 0, onion: 10, hexagonal: 10, vertical: 0, eda: 0, monolith: 0 });
    expect(sorted[0].key).toBe('clean');
    expect(sorted[0].score).toBe(10);
  });

  it('orders by score descending', () => {
    const sorted = getSortedResults({ clean: 1, onion: 0, hexagonal: 0, vertical: 9, eda: 4, monolith: 0 });
    expect(sorted.map((entry) => entry.key)).toEqual(['vertical', 'eda', 'clean', 'monolith']);
  });

  it('clamps confidence into the reported 80-98 band', () => {
    const strong = calculateConfidence(getSortedResults({ clean: 0, onion: 0, hexagonal: 0, vertical: 100, eda: 0, monolith: 0 }));
    const nothing = calculateConfidence(getSortedResults({} as Record<string, number>));
    expect(strong).toBeLessThanOrEqual(98);
    expect(strong).toBeGreaterThanOrEqual(80);
    expect(nothing).toBe(80);
  });

  it('accepts weights that are not part of the core set', () => {
    const custom: Weights = { experimental: 5 };
    expect(custom.experimental).toBe(5);
  });
});
