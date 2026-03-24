import path from 'node:path';
import { fileURLToPath } from 'node:url';
import globals from 'globals';
import { FlatCompat } from '@eslint/eslintrc';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettierPlugin from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const airbnbConfigs = compat
  .extends('airbnb', 'airbnb-typescript', 'airbnb/hooks', 'plugin:prettier/recommended')
  .map((config) => ({
    ...config,
    files: ['**/*.{ts,tsx}'],
  }));

export default tseslint.config(
  { ignores: ['dist', 'coverage', 'eslint.config.js', 'jest.config.cjs'] },
  ...airbnbConfigs,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.test.json', './tsconfig.node.json'],
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettierPlugin,
    },
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'prettier/prettier': 'error',
      semi: ['error', 'always'],
      'react/react-in-jsx-scope': 'off',
      'import/extensions': 'off',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.test.ts',
            '**/*.test.tsx',
            'src/jest.setup.ts',
            'vite.config.ts',
            'eslint.config.js',
            'jest.config.cjs',
          ],
        },
      ],
      'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
      'react/function-component-definition': 'off',
    },
  },
);
