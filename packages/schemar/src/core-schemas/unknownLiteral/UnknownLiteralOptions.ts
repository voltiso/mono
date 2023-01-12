// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { InferableLiteral, SchemaOptions } from '~'

export interface UnknownLiteralOptions extends SchemaOptions {
	Output: InferableLiteral
	Input: InferableLiteral
}

export interface DefaultUnknownLiteralOptions extends SchemaOptions.Default {
	Output: InferableLiteral
	Input: InferableLiteral
}
