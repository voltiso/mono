// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import baseConfig from '@voltiso/config.jest'
import type { Config } from 'jest'

export const jestNodeConfig = {
	...baseConfig,
	testEnvironment: 'jest-environment-node',
} satisfies Config
