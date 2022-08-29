// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DefaultSchemaOptions, InferableLiteral, SchemaOptions } from '~'

export interface LiteralOptions extends SchemaOptions {
	Output: InferableLiteral
	Input: InferableLiteral

	values: Set<InferableLiteral>
}

export interface DefaultLiteralOptions extends DefaultSchemaOptions {
	Output: InferableLiteral,
	Input: InferableLiteral

	values: Set<never>
}
