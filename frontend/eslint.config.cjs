const angular = require('@angular-eslint/eslint-plugin');
const template = require('@angular-eslint/eslint-plugin-template');
const tsParser = require('@typescript-eslint/parser');
const templateParser = require('@angular-eslint/template-parser');

module.exports = [
  { ignores: ['dist/**', 'node_modules/**', '.angular/**'] },
  {
    files: ['src/**/*.ts'],
    languageOptions: { parser: tsParser },
    plugins: { '@angular-eslint': angular },
    rules: {
      ...angular.configs.recommended.rules,
      '@angular-eslint/prefer-standalone': 'off',
      '@angular-eslint/prefer-inject': 'off',
    },
  },
  {
    files: ['src/**/*.html'],
    languageOptions: { parser: templateParser },
    plugins: { '@angular-eslint/template': template },
    rules: {
      ...template.configs.recommended.rules,
      '@angular-eslint/template/prefer-control-flow': 'off',
    },
  },
];
