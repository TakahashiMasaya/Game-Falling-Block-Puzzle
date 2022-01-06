module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
    'p5js/p5': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'plugin:p5js/p5',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'jest',
    'p5js',
  ],
  settings: {
    'import/resolver': {
      typescript: { project: './' },
      node: {
        extensions: [
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
          '.svg',
        ],
      },
      alias: {
        map: [
          [
            '@/',
            './src/',
          ],
        ],
        extensions: [
          '.json',
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.svg',
        ],
      },
    },
  },
  rules: {
    'import/extensions': 'off', // not extensions
    'import/prefer-default-export': 'off', // not use 'export default'
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'class-methods-use-this': 'off',
    'react/function-component-definition': [
      'error', {
        namedComponents: 'arrow-function',
      },
    ],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
        ],
      },
    ],
  },
};
