/** @type { import("eslint").Linter.Config } */
module.exports = {
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:svelte/recommended',
		'prettier'
	],
	overrides: [
		{
			files: ['*.svelte'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			}
		}
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte'],
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint', "simple-import-sort"],
	root: true,
	rules: {
		"simple-import-sort/imports": "error",
		"simple-import-sort/exports": "error",
	},
};
