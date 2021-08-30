module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
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
        ],
      },
    },
  },
  rules: {
    'import/extensions': 0,
    'import/prefer-default-export': 0,
    '@typescript-eslint/no-unused-vars': ['error'],
  },
};
