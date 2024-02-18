// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as baseJestConfig from '@voltiso/config.jest'
import { defineJestConfig } from '@voltiso/config.jest.lib'

//! need to create a new unique object!
export default defineJestConfig({
	...baseJestConfig,
	testEnvironment: 'node',
})
