// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable unicorn/prefer-module */

import jestEsrConfig from '@voltiso/config.jest'
import { defineJestConfig } from '@voltiso/config.jest.lib'

export const jestNodeConfig = defineJestConfig({
	...jestEsrConfig,

	testEnvironment: require.resolve('jest-environment-node'),
})
