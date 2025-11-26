import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['vite.config.ts', 'eslint.config.js', 'postcss.config.js'],
    languageOptions: {
      parserOptions: {
        project: null, // 👈 ключевой момент
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],

    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    plugins: {
      prettier,
    },

    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tseslint.parser, // важно для flat-config
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },

    rules: {
      // ✔ отключаем точки с запятой
      semi: ['error', 'never'],

      // ✔ prettier без ";" (иначе ESLint и Prettier конфликтуют)
      'prettier/prettier': ['error', { semi: false }],
    },
  },
])
