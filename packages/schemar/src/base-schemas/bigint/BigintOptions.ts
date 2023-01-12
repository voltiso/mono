// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemaOptions } from '~'

export interface BigintOptions extends SchemaOptions {
	Output: bigint
	Input: bigint

	min: bigint | undefined
	max: bigint | undefined
}

export namespace BigintOptions {
	export interface Default extends SchemaOptions.Default {
		Output: bigint
		Input: bigint

		min: undefined
		max: undefined
	}
}
