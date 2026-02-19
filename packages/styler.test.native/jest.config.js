// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineJestConfig } from '@voltiso/config.jest.lib'
import { getJestReactConfig } from '@voltiso/config.jest.react'

export default defineJestConfig({
	...getJestReactConfig({ mode: 'native', format: 'cjs' }),
})
