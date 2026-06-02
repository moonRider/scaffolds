import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        document: 'readonly',
        window: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
    },
  },
  {
    files: ['**/*.{tsx,jsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    files: ['*.config.{js,cjs,mjs}', '.*rc.cjs'],
    languageOptions: {
      globals: {
        module: 'readonly',
        process: 'readonly',
      },
    },
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
)
