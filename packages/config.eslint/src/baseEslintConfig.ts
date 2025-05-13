// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { EslintFlatConfig } from '@voltiso/config.eslint.lib'

import { checkHeapSize } from './detail/checkHeapSize.js'
import { ignores } from './detail/ignores.js'
import { overrides } from './overrides.js'

checkHeapSize()

// apply ignores globally
export const baseEslintConfig: EslintFlatConfig[] = overrides.map(config => ({
	...config,
	ignores: [...ignores, ...(config.ignores ?? [])],
}))
