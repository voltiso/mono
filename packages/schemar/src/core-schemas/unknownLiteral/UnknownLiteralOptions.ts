// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DefaultSchemaOptions, InferableLiteral, SchemaOptions } from '~'

export interface UnknownLiteralOptions extends SchemaOptions {
	Output: InferableLiteral
	Input: InferableLiteral
}

export interface DefaultUnknownLiteralOptions extends DefaultSchemaOptions {
	Output: InferableLiteral
	Input: InferableLiteral
}
