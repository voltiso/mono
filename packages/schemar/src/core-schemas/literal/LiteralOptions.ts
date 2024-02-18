// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { InferableLiteral, SchemaOptions } from '~'

export interface LiteralOptions extends SchemaOptions {
	// Output: InferableLiteral
	// Input: InferableLiteral

	values: Set<InferableLiteral>
}

export declare namespace LiteralOptions {
	export interface Default extends SchemaOptions.Default {
		Output: InferableLiteral
		Input: InferableLiteral

		values: Set<never>
	}
}
