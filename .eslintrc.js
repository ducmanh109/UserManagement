module.exports = {
  root: true,
  extends: [
    //
    '@react-native-community',
    'plugin:react-native/all',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'prettier',
  ],
  plugins: [
    //
    'react',
    'react-native',
    'import',
    'prettier',
  ],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['tsconfig.json'],
      },
    },
    'react-native/style-sheet-object-names': [
      'EStyleSheet',
      'OtherStyleSheet',
      'PStyleSheet',
    ],
  },
  env: {
    'react-native/react-native': true,
  },
  globals: {},
  rules: {
    'no-console': 'warn',
    'no-var': 'error',
    'import/no-unresolved': 'error',
    'prefer-const': 'error',
    'import/no-named-as-default-member': 'off',
    'react-native/no-unused-styles': 'error',
    'react-native/split-platform-components': 'error',
    'react-native/no-inline-styles': 'error',
    'react-native/no-color-literals': 'error',
    'react-native/no-raw-text': 'error',
    'react-native/no-single-element-style-arrays': 'error',
    'no-useless-rename': 'error',
    'object-shorthand': ['error', 'always'],
    'import/default': 'off',
  },
};
