module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@eslint-plugin-demo'],
  extends: ['plugin:@eslint-plugin-demo/recommended'],
  rules: {
    '@eslint-plugin-demo/01-no-test-prefixed-function-names': 'off',
    '@eslint-plugin-demo/02-mandatory-comments': 'off',
  },
};
