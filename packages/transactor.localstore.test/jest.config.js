// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as jestEsrConfig from '@voltiso/config.jest'
import { defineJestConfig } from '@voltiso/config.jest.lib'

//! need to create a new unique object!
export default defineJestConfig({
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
