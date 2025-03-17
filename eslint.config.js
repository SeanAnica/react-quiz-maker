import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-explicit-any': 'error', // Erreur en cas de any
      '@typescript-eslint/explicit-module-boundary-types': 'warn', // warning si le type de retour n'est pas là
      '@typescript-eslint/explicit-function-return-type': 'warn', // warning pour avoir un type de retour explicite
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'], // Favoriser les types aux interfaces
    },
  },
);
