'use strict'

// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

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
	'packages/caller/test/tsc-options/*/test-true/tsconfig.json',
	'packages/caller/test/tsc-options/*/test-false/tsconfig.json',
	//
	'packages/schemar/test/tsc-options/*/test-true/tsconfig.json',
	'packages/schemar/test/tsc-options/*/test-false/tsconfig.json',
	//
	'packages/util/src/tsc-options/*/test-true/tsconfig.json',
	'packages/util/src/tsc-options/*/test-false/tsconfig.json',
]

// eslint-disable-next-line n/no-process-env
const isFastMode = !process.env['FULL']

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
	},
})
