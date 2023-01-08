// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable unicorn/prefer-module */

import jestEsrConfig from '@voltiso/config.jest'
import { defineJestConfig } from '@voltiso/config.jest.lib'

export const jestReactConfig = defineJestConfig({
	...jestEsrConfig,

	testEnvironment: require.resolve('jest-environment-jsdom'), // 'jsdom',

	setupFilesAfterEnv: [
		...jestEsrConfig.setupFilesAfterEnv,
		require.resolve('./react-setup-after-env.js'),
		require.resolve('react-native/jest/setup'),
	],
})
