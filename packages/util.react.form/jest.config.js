// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineJestConfig } from '@voltiso/config.jest.lib'
import { getJestReactConfig } from '@voltiso/config.jest.react'

const baseConfig = getJestReactConfig({ format: 'cjs' }) // rxjs detected as cjs by jest

//! need to create a new unique object!
export default defineJestConfig({
	...baseConfig,
})
