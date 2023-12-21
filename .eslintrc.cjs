// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

'use strict'

// const baseEslintConfig = require('@voltiso/config.eslint')
const { defineEslintConfig } = require('@voltiso/config.eslint.lib')

const project = [
	'tsconfig.json',
	//
	'packages/*/tsconfig.json',
	//
	'packages/styler/test/native/tsconfig.json',
	'packages/styler/test/web/tsconfig.json',
	'packages/styler/test/web/tsc-options/*/tsconfig.json',
	//
	'packages/handler/test/tsc-options/*/test-true/tsconfig.json',
	'packages/handler/test/tsc-options/*/test-false/tsconfig.json',
	//
	'packages/schemar/test/tsc-options/*/test-true/tsconfig.json',
	'packages/schemar/test/tsc-options/*/test-false/tsconfig.json',
	//
	'packages/util/src/tsc-options/*/test-true/tsconfig.json',
	'packages/util/src/tsc-options/*/test-false/tsconfig.json',
]

// eslint-disable-next-line n/no-process-env, turbo/no-undeclared-env-vars
const isFastMode = !process.env['FULL']
// const isFastMode = false

// eslint-disable-next-line no-console
console.log(
	new Date().toISOString(),
	'eslint config:',
	isFastMode ? 'FAST' : 'FULL',
)

module.exports = defineEslintConfig({
	extends: [
		isFastMode ? '@voltiso/eslint-config-fast' : '@voltiso/eslint-config',
	],

	root: true,

	parserOptions: {
		project,
		tsconfigRootDir: __dirname,
	},

	settings: {
		'import/resolver': {
			typescript: {
				project,
				tsconfigRootDir: __dirname,
			},
		},
	}
})
