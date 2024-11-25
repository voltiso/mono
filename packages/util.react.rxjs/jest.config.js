// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineJestConfig } from '@voltiso/config.jest.lib'
import { getJestReactConfig } from '@voltiso/config.jest.react'

const baseJestConfig = getJestReactConfig({
	format: 'cjs', // rxjs doesn't include `"type": "module"`
})

// ! need to create a new unique object!
export default defineJestConfig({
	...baseJestConfig,
})
