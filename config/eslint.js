// eslint-disable-next-line @typescript-eslint/no-var-requires
const eslintrcBase = require('@voltiso/config.eslint.base')

/** @type {import('eslint').Linter.Config} */
module.exports = {
	...eslintrcBase,
	env: {
		...eslintrcBase.env,
	},
	extends: [...eslintrcBase.extends],
	parserOptions: {
		...eslintrcBase.parserOptions,
		tsconfigRootDir: __dirname, // ! ADDED
	},
	ignorePatterns: [...eslintrcBase.ignorePatterns],
	plugins: [...eslintrcBase.plugins],
	rules: {
		...eslintrcBase.rules,
	},

	root: true, // ! ADDED
}
