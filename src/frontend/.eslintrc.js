module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    'plugin:vue/recommended',
    'prettier/vue',
    'plugin:prettier/recommended',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/max-len': [
      'error',
      { code: 120, ignoreComments: true, ignoreHTMLAttributeValues: true, ignoreStrings: true }
    ],
    'vue/require-default-prop': ['off'],
    'vue/no-use-v-if-with-v-for': ['off'],
    'vue/no-v-html': ['off'],
    'prettier/prettier': ['error', { singleQuote: true }]
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
};
