module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
    'p5js/p5': true,
  },
  extends: [
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
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    '@typescript-eslint/no-unused-vars': ['error'],
    'import/no-extraneous-dependencies': 0,
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
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
