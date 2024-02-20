// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable unicorn/prefer-module */

// import jestEsrConfig from '@voltiso/config.jest'
// import { defineJestConfig } from '@voltiso/config.jest.lib'

// export const jestReactConfig = defineJestConfig({
// 	...jestEsrConfig,

// 	testEnvironment: require.resolve('jest-environment-jsdom'), // 'jsdom',

// 	setupFilesAfterEnv: [
// 		...jestEsrConfig.setupFilesAfterEnv,
// 		require.resolve('./react-setup-after-env.js'),
// 		require.resolve('react-native/jest/setup'),
// 	],
// })

import * as path from 'node:path'

import { setupFilesAfterEnv as baseSetupFilesAfterEnv } from '@voltiso/config.jest'
import resolve from 'resolve'

export {
	haste,
	moduleNameMapper,
	modulePathIgnorePatterns,
	// testEnvironment,
	testMatch,
	transform,
	transformIgnorePatterns,
} from '@voltiso/config.jest'

const dirname = __dirname // will be transpiled to `import.meta...` by `@voltiso/transform/compat

export const testEnvironment = resolve.sync('jest-environment-jsdom', {
	basedir: dirname,
})

export const setupFilesAfterEnv = [
	...baseSetupFilesAfterEnv,
	path.join(dirname, 'react-setup-after-env.js'),
	resolve.sync('react-native/jest/setup', { basedir: dirname }),
]
