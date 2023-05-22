module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@eslint-plugin-demo'],
  extends: ['plugin:@eslint-plugin-demo/recommended'],
  rules: {
    // '@eslint-plugin-demo/01-no-test-prefixed-function-names': 'off',
    '@eslint-plugin-demo/02-mandatory-comments': 'off',
    '@eslint-plugin-demo/03-theme-colors-only': 'off',
    '@eslint-plugin-demo/04-no-disabled-tests-without-todo': 'off',
    '@eslint-plugin-demo/05-todo-comments-format': 'off',
  },
};
