import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactHooks from 'eslint-plugin-react-hooks';

const browserGlobals = {
	AbortController: 'readonly',
	URL: 'readonly',
	console: 'readonly',
	document: 'readonly',
	fetch: 'readonly',
	navigator: 'readonly',
	window: 'readonly',
};

export default [
	{
		ignores: ['.cache/**', 'artifacts/**', 'bazel-*/**'],
	},
	js.configs.recommended,
	{
		files: ['experiences/**/*.ts', 'experiences/**/*.tsx'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
			globals: browserGlobals,
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
			'react-hooks': reactHooks,
		},
		rules: {
			...tsPlugin.configs.recommended.rules,
			...reactHooks.configs.recommended.rules,
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{
					prefer: 'type-imports',
				},
			],
		},
	},
];
