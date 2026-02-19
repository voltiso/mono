// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getJestConfig } from '@voltiso/config.jest'
import { defineJestConfig } from '@voltiso/config.jest.lib'

const baseJestConfig = getJestConfig({ format: 'cjs' })

// ! need to create a new unique object!
export default defineJestConfig({
	...baseJestConfig,
})
