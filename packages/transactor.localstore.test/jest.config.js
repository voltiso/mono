// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import baseConfig from '@voltiso/config.jest'
import { defineJestConfig } from '@voltiso/config.jest.lib'

// ! need to create a new unique object!
export default defineJestConfig({
	...baseConfig,

	setupFilesAfterEnv: [
		...baseConfig.setupFilesAfterEnv,
		'./jest/setupAfterEnv.ts',
	],

	moduleNameMapper: {
		...baseConfig.moduleNameMapper,

		// '^@voltiso/([^/]*)$': '<rootDir>/node_modules/@voltiso/$1/src', // use source files from this mono-repo
		// '^@voltiso/([^/]*)(.*)$': '@voltiso/$1/src$2', // use source files from this mono-repo
	},
})
