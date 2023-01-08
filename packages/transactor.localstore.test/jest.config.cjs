'use strict'

// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

const jestEsrConfig = require('@voltiso/config.jest')
const { defineJestConfig } = require('@voltiso/config.jest.lib')

//! need to create a new unique object!
module.exports = defineJestConfig({
	...jestEsrConfig,

	setupFilesAfterEnv: [
		...jestEsrConfig.setupFilesAfterEnv,
		'./jest/setupAfterEnv.ts',
	],

	moduleNameMapper: {
		...jestEsrConfig.moduleNameMapper,

		// '^@voltiso/([^/]*)$': '<rootDir>/node_modules/@voltiso/$1/src', // use source files from this mono-repo
		// '^@voltiso/([^/]*)(.*)$': '@voltiso/$1/src$2', // use source files from this mono-repo
	},
})
