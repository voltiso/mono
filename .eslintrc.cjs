'use strict'

// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

const baseEslintConfig = require('@voltiso/config.eslint')
const { defineEslintConfig } = require('@voltiso/config.eslint.lib')

const project = [
	'tsconfig.json',
	'packages/*/tsconfig.json',
	'packages/*/*/tsconfig.json',
	'packages/*/*/*/tsconfig.json',
	'packages/*/*/*/*/tsconfig.json',
	'packages/*/*/*/*/*/tsconfig.json',
	'packages/*/*/*/*/*/*/tsconfig.json',
	// 'packages/util/src/tsc-options/*/*/tsconfig.json',
]

module.exports = defineEslintConfig(baseEslintConfig, {
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

			// node: {
			// 	project: ['./tsconfig.json', './packages/*/tsconfig.json'],
			// 	tsconfigRootDir: __dirname,
			// },
		},
	},
})
