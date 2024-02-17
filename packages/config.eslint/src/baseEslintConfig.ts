// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Linter } from 'eslint'

import { checkHeapSize } from './detail/checkHeapSize.js'
import { ignores } from './detail/ignores.js'
import { overrides } from './overrides.js'

checkHeapSize()

// apply ignores globally
export const baseEslintConfig: Linter.FlatConfig[] = overrides.map(config => ({
	...config,
	ignores: [...ignores, ...(config.ignores ?? [])],
}))
