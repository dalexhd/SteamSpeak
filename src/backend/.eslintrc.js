module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parser: "babel-eslint",
  extends: [
    'plugin:prettier/recommended',
    'eslint:recommended'
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  ignorePatterns: ["node_modules/"],
  rules: {
    "no-plusplus": [
      "error",
      {
        allowForLoopAfterthoughts: true
      }
    ],
    "no-param-reassign": [
      "error",
      {
        props: false
      }
    ],
    "prefer-template": "error",
		"no-console":"off",
		"no-unused-vars": "warn",
		"no-prototype-builtins": "off",
    'prettier/prettier': ['error', { singleQuote: true, trailingComma: "none" }]
  }
}
