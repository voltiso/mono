// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemaOptions } from '~'

export interface BooleanOptions extends SchemaOptions {
	Output: boolean
	Input: boolean
}

export namespace BooleanOptions {
	export interface Default extends SchemaOptions.Default {
		Output: boolean
		Input: boolean
	}
}
