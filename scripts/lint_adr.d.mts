export interface AdrLintResult {
  number?: string;
  errors: string[];
  warnings: string[];
}

export function lintAdr(markdown: string, fileName: string): AdrLintResult;
