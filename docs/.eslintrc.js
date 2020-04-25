const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    jest: true,
    node: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    allowImportExportEverywhere: true
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['react-hooks'],
  rules: {
    // Ignore certain webpack alias because it can't be resolved
    'import/no-unresolved': [
      ERROR,
      { ignore: ['^@theme', '^@docusaurus', '^@generated'] }
    ],
    'consistent-return': ['error', { treatUndefinedAsUnspecified: true }],
    'import/extensions': OFF,
    'no-bitwise': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'global-require': 'off',
    'no-shadow': 'off',
    'no-underscore-dangle': 'off',
    'no-restricted-syntax': 'off',
    'react/jsx-closing-bracket-location': OFF, // Conflicts with Prettier.
    'react/jsx-filename-extension': OFF,
    'react-hooks/rules-of-hooks': OFF,
    'react/prop-types': OFF, // PropTypes aren't used much these days.
    'react/jsx-props-no-spreading': OFF,
    'react/no-array-index-key': OFF,
    'import/no-extraneous-dependencies': OFF
  },
  settings: {
    'import/resolver': {
      alias: [['@site', './']]
    }
  }
};
