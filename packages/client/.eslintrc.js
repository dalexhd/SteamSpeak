module.exports = {
	root: true,
	env: {
		node: true,
		browser: true
	},
	// required to lint *.vue files
	plugins: ['vue'],
	extends: [
		'plugin:vue/recommended',
		'prettier/vue',
		'@vue/airbnb',
		'plugin:prettier/recommended',
		'eslint:recommended'
	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-alert': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'vue/max-len': [
			'error',
			{ code: 120, ignoreComments: true, ignoreHTMLAttributeValues: true, ignoreStrings: true }
		],
		'vue/require-default-prop': ['off'],
		'vue/no-use-v-if-with-v-for': ['off'],
		'consistent-return': ['error', { treatUndefinedAsUnspecified: true }],
		camelcase: 'off',
		'vue/no-v-html': 'off',
		'no-bitwise': 'off',
		'no-param-reassign': 'off',
		'no-plusplus': 'off',
		'global-require': 'off',
		'no-shadow': 'off',
		'no-underscore-dangle': 'off',
		'no-restricted-syntax': 'off',
		'import/no-cycle': ['error', { maxDepth: 1 }],
		'prefer-destructuring': ['error', { object: true, array: false }],
		'prettier/prettier': [
			'error',
			{ singleQuote: true, trailingComma: 'none', arrowParens: 'always', 'global-require': 'none' }
		]
	},
	parserOptions: {
		parser: 'babel-eslint',
		sourceType: 'module'
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx', '.vue']
			}
		}
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
