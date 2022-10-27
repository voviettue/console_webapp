const defaultRules = {
	'no-console': process.env.NODE_ENV !== 'development' ? 'error' : 'off',
	'no-debugger': process.env.NODE_ENV !== 'development' ? 'error' : 'off',
	'@typescript-eslint/no-explicit-any': 'off',
	'vue/multi-word-component-names': 'off',
	'vue/no-setup-props-destructure': 'off',
	'vue/no-v-model-argument': 'off',
	'vue/no-multiple-template-root': 'off',
}

module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:vue/vue3-recommended',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'@nuxtjs/eslint-config-typescript',
		'eslint-config-prettier',
		'prettier',
	],
	parserOptions: {
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser',
		sourceType: 'module',
	},
	plugins: ['vue', '@typescript-eslint', 'eslint-plugin-prettier'],
	rules: defaultRules,
}
