import { useState } from 'react';

export type TDDPhase = 'RED' | 'GREEN' | 'REFACTOR';

export interface TDDStepInfo {
  phase: TDDPhase;
  title: string;
  badge: string;
  color: string;
  codeSnippet: string;
  testOutput: string;
  description: string;
}

export function useTDDSimulation() {
  const [currentPhase, setCurrentPhase] = useState<TDDPhase>('RED');
  const [testCount, setTestCount] = useState(1);
  const [isRunning, setIsRunning] = useState(false);

  const phaseData: Record<TDDPhase, TDDStepInfo> = {
    RED: {
      phase: 'RED',
      title: '1. Failing Test (Kırmızı Aşama)',
      badge: 'Fail Expected',
      color: '#ef4444',
      codeSnippet: `// ❌ RED: Henüz yazılmamış kod için başarısız test yaz
describe('Calculator.add', () => {
  it('should return 5 when adding 2 and 3', () => {
    const calc = new Calculator();
    expect(calc.add(2, 3)).toBe(5); 
    // ReferenceError: Calculator is not defined
  });
});`,
      testOutput: `FAIL src/calculator.test.ts
✕ should return 5 when adding 2 and 3 (4ms)
  ReferenceError: Calculator is not defined
  Tests: 1 failed, 1 total`,
      description: 'Önce başarısız olan küçük bir test yazılır. Üretim kodu henüz yoktur.'
    },
    GREEN: {
      phase: 'GREEN',
      title: '2. Minimal Code to Pass (Yeşil Aşama)',
      badge: 'Pass Minimal',
      color: '#22c55e',
      codeSnippet: `//  GREEN: Testi geçirecek en basit kodu yaz (Quick Win)
export class Calculator {
  add(a: number, b: number): number {
    return a + b; // Test artık geçiyor!
  }
}`,
      testOutput: `PASS src/calculator.test.ts
✓ should return 5 when adding 2 and 3 (2ms)
  Tests: 1 passed, 1 total
  Snapshots: 0 total`,
      description: 'Sadece testi geçirecek en sade kod yazılır. Fazladan işlev eklenmez.'
    },
    REFACTOR: {
      phase: 'REFACTOR',
      title: '3. Clean & Optimize (Refactor Aşaması)',
      badge: 'Clean & DRY',
      color: '#3b82f6',
      codeSnippet: `// 🧹 REFACTOR: Testlerin güvencesi altında kodu ve tasarımı iyileştir
export interface ICalculator {
  add(...numbers: number[]): number;
}

export class Calculator implements ICalculator {
  add(...numbers: number[]): number {
    return numbers.reduce((acc, curr) => acc + curr, 0);
  }
}`,
      testOutput: `PASS src/calculator.test.ts
✓ should return sum for multiple inputs (1ms)
  Tests: 1 passed, 1 total
  Clean Code Score: 100% (No Regressions)`,
      description: 'Testlerin yeşil ışığı altında kod temizlenir, SRP/DRY uygulanır.'
    }
  };

  const advancePhase = () => {
    setIsRunning(true);
    setTimeout(() => {
      if (currentPhase === 'RED') {
        setCurrentPhase('GREEN');
      } else if (currentPhase === 'GREEN') {
        setCurrentPhase('REFACTOR');
      } else {
        setCurrentPhase('RED');
        setTestCount(prev => prev + 1);
      }
      setIsRunning(false);
    }, 400);
  };

  return {
    currentPhase,
    setCurrentPhase,
    testCount,
    isRunning,
    advancePhase,
    activeInfo: phaseData[currentPhase]
  };
}
