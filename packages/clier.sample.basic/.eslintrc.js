/** @type {import('eslint').Linter.Config} */
module.exports = {
	rules: {
		'no-console': 0,
		'@typescript-eslint/require-await': 0,
	},
}

// // eslint-disable-next-line @typescript-eslint/no-var-requires
// const eslintrcBase = require('@voltiso/config.eslint.base')

// /** @type {import('eslint').Linter.Config} */
// module.exports = {
// 	...eslintrcBase,
// 	env: {
// 		...eslintrcBase.env,
// 	},
// 	extends: [...eslintrcBase.extends],
// 	parserOptions: {
// 		...eslintrcBase.parserOptions,
// 	},
// 	ignorePatterns: [...eslintrcBase.ignorePatterns],
// 	plugins: [...eslintrcBase.plugins],
// 	rules: {
// 		...eslintrcBase.rules,
// 	},

// 	root: true, // !!!
// }
