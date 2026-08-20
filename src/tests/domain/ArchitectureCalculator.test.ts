import { describe, it, expect } from "vitest";
import { calculateScores, getSortedResults, calculateConfidence } from "../../domain/usecases/ArchitectureCalculator";
import { Question } from "../../infrastructure/ArchitectureData";

describe("ArchitectureCalculator Domain Logic", () => {
  const mockQuestions: Question[] = [
    {
      id: "team_size",
      title: "Team Size",
      type: "choice",
      options: [
        { label: "Solo / 1-2", weights: { monolith: 5, vertical: 4 } },
        { label: "Enterprise 50+", weights: { clean: 5, eda: 4 } }
      ]
    },
    {
      id: "time_horizon",
      title: "Time Horizon",
      type: "range",
      weights: {
        low: { monolith: 3, vertical: 2 },
        high: { clean: 4, eda: 3 }
      }
    }
  ];

  it("should calculate correct scores for choice questions", () => {
    const answers = { team_size: 0 };
    const scores = calculateScores(answers, mockQuestions);
    expect(scores.monolith).toBe(5);
    expect(scores.vertical).toBe(4);
    expect(scores.clean).toBe(0);
  });

  it("should calculate correct scores for range questions (high range)", () => {
    const answers = { time_horizon: 10 };
    const scores = calculateScores(answers, mockQuestions);
    expect(scores.clean).toBeGreaterThan(0);
  });

  it("should rank recommendations properly in getSortedResults", () => {
    const scores = {
      clean: 10,
      onion: 4,
      hexagonal: 2,
      vertical: 8,
      eda: 3,
      monolith: 1,
      ddd: 0
    };
    const sorted = getSortedResults(scores);
    expect(sorted[0].key).toBe("clean");
    expect(sorted[0].score).toBe(13);
    expect(sorted[1].key).toBe("vertical");
  });

  it("should compute confidence within 80-98 bound", () => {
    const sorted = [
      { key: "clean", score: 15 },
      { key: "vertical", score: 5 }
    ];
    const confidence = calculateConfidence(sorted);
    expect(confidence).toBeGreaterThanOrEqual(80);
    expect(confidence).toBeLessThanOrEqual(98);
  });
});
