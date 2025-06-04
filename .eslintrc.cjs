module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:storybook/recommended',
    'plugin:prettier/recommended', // this must be the last plugin
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: true,
  },
  plugins: ['import', 'react-refresh', 'boundaries'],
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
    'boundaries/include': ['src/**/*'],
    'boundaries/ignore': ['src/stories/**/*', 'src/**/*.d.ts'],
    'boundaries/elements': [
      {
        type: 'globalStyle',
        mode: 'full',
        pattern: ['src/styles/main.scss'],
      },
      {
        type: 'shared',
        mode: 'full',
        pattern: [
          'src/assets/**/*',
          'src/components/**/*',
          'src/configs/**/*',
          'src/hooks/**/*',
          'src/types/**/*',
        ],
      },
      {
        type: 'feature',
        mode: 'full',
        pattern: ['src/features/*/**/*'],
        capture: ['featureName'],
      },
      {
        type: 'page',
        mode: 'full',
        pattern: ['src/pages/*/**/*'],
        capture: ['pageName'],
      },
      {
        type: 'app',
        mode: 'full',
        pattern: ['src/app/**/*'],
      },
    ],
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'external',
          'builtin',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
          },
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        warnOnUnassignedImports: true,
      },
    ],
    'no-plusplus': 'off',
    'consistent-return': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/no-array-index-key': 'warn',
    'react/prop-types': 'off',
    'react/destructuring-assignment': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: false,
      },
    ],
    'jsx-a11y/label-has-associated-control': ['error', { assert: 'either' }],
    'boundaries/no-unknown': ['error'],
    'boundaries/no-unknown-files': ['error'],
    'boundaries/element-types': [
      'error',
      {
        default: 'disallow',
        message:
          '${file.type} is not allowed to import from ${dependency.type}',
        rules: [
          {
            from: ['shared'],
            allow: ['shared'],
          },
          {
            from: ['feature'],
            allow: [
              'shared',
              ['feature', { featureName: '${from.featureName}' }],
            ],
          },
          {
            from: ['page'],
            allow: [
              'shared',
              'feature',
              ['page', { pageName: '${from.pageName}' }],
            ],
          },
          {
            from: ['app'],
            allow: ['shared', 'globalStyle', 'feature', 'page', 'app'],
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
}
