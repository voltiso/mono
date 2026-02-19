// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineConfig } from 'eslint/config'

import { checkHeapSize } from './detail/checkHeapSize.js'
import { ignores } from './detail/ignores.js'
import { overrides } from './overrides.js'

checkHeapSize()

export const baseEslintConfig = defineConfig({ ignores }, ...overrides)

// // apply ignores globally
// export const baseEslintConfig: Linter.Config[] = overrides.map(
// 	config =>
// 		({
// 			...config,
// 			ignores: [...ignores, ...(config.ignores ?? [])],
// 		}) satisfies Linter.Config,
// )
