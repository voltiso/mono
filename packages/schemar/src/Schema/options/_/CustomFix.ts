// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomSchema } from '~'

export interface CustomFix<Input = unknown, Output = unknown> {
	inputSchema: CustomSchema<{ Input: Input }>
	fix(x: this['inputSchema']['Output']): Output | void
}
