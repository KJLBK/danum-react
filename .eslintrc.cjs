module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		'react-app',
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended',
		'plugin:import/recommended',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
	settings: { react: { version: '18.2' } },
	plugins: ['import', 'react', 'react-refresh'],
	rules: {
		'no-var': 'error',
		'no-multiple-empty-lines': 'error',
		'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
		eqeqeq: 'error',
		'no-unused-vars': 'warn',
		'no-undef': 'warn',
		'react/jsx-no-target-blank': 'off',
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
	},
};
