// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// import jestEsrConfig from '@voltiso/config.jest'
// import { defineJestConfig } from '@voltiso/config.jest.lib'

// export const jestNodeConfig = defineJestConfig({
// 	...jestEsrConfig,

// 	testEnvironment: require.resolve('jest-environment-node'),
// })

import baseConfig from '@voltiso/config.jest'
import type { Config } from 'jest'

export const jestNodeConfig = {
	...baseConfig,
	testEnvironment: 'jest-environment-node',
} satisfies Config
