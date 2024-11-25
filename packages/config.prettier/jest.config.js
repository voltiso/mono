// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getJestConfig } from '@voltiso/config.jest'
import { defineJestConfig } from '@voltiso/config.jest.lib'

// const baseJestConfig = getJestConfig()
const baseJestConfig = getJestConfig({ format: 'cjs' }) // for __dirname

// ! need to create a new unique object!
export default defineJestConfig({
	...baseJestConfig,
})
