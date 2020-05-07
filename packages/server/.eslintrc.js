module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
		'plugin:@typescript-eslint/recommended',
		'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "no-plusplus": "off",
    "no-param-reassign": [
      "error",
      {
        props: false
      }
    ],
    "prefer-template": "error",
		"no-console":"off",
		"no-unused-vars": "warn",
		'@typescript-eslint/camelcase': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		"@typescript-eslint/no-use-before-define": 'off',
		"no-prototype-builtins": "off",
    'prettier/prettier': ['error', { singleQuote: true, trailingComma: "none" }]
  }
}
