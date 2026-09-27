import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

const sharedRules = {
  'no-undef': 'off',
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': [
    'error',
    { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_', caughtErrors: 'none' },
  ],
  '@typescript-eslint/no-explicit-any': 'error',
  'no-empty': ['error', { allowEmptyCatch: true }],
}

const languageOptions = {
  ecmaVersion: 2020,
  globals: globals.browser,
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: { jsx: true },
    sourceType: 'module',
  },
}

export default defineConfig([
  globalIgnores(['dist', 'dev-dist', 'coverage', 'node_modules', 'public', 'server/data']),
  {
    files: ['**/*.{js,jsx,mjs,cjs}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions,
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      tseslint.configs.recommended,
    ],
    languageOptions: {
      ...languageOptions,
      parser: tseslint.parser,
      parserOptions: {
        ...languageOptions.parserOptions,
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...sharedRules,
    },
  },
  {
    files: ['**/*.test.{ts,tsx}', 'src/tests/**/*.{ts,tsx}', 'src/infrastructure/**/*.{test,spec}.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    files: [
      'src/presentation/context/**/*.tsx',
      'src/presentation/hooks/**/*.ts',
      'src/infrastructure/stores/**/*.ts',
      'src/infrastructure/cms/**/*.ts',
      'src/infrastructure/repositories/**/*.ts',
      'src/i18n/**/*.ts',
      'src/data/**/*.ts',
    ],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },
  {
    files: ['scripts/**/*.mjs', 'server/**/*.mjs', 'vite.config.js', 'eslint.config.js'],
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
    },
  },
])
