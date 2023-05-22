module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  plugins: ['@eslint-plugin-demo'],
  extends: ['plugin:@eslint-plugin-demo/recommended'],
  rules: {
    '@eslint-plugin-demo/01-no-test-prefixed-function-names': 'off',
    '@eslint-plugin-demo/02-mandatory-comments': 'off',
    '@eslint-plugin-demo/03-theme-colors-only': 'off',
    '@eslint-plugin-demo/04-no-disabled-tests-without-todo': 'off',
    '@eslint-plugin-demo/05-todo-comments-format': 'off',
    '@eslint-plugin-demo/06-package-organization': 'off',
    '@eslint-plugin-demo/07-type-checking': 'off',
  },
  overrides: [
    {
      files: ['packages/06-package-organization/**'],
      rules: {
        '@eslint-plugin-demo/06-package-organization': [
          'error',
          {
            layers: [
              { name: 'components', index: 3 },
              { name: 'services', index: 2 },
              { name: 'utils', index: 1 },
            ],
          },
        ],
      },
    },
  ],
};
