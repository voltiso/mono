// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { InferableLiteral } from '~/Inferable'
import type { DefaultSchemaOptions, SchemaOptions } from '~/SchemaOptions'

export interface UnknownLiteralOptions extends SchemaOptions {
	Output: InferableLiteral
	Input: InferableLiteral
}

export interface DefaultUnknownLiteralOptions extends DefaultSchemaOptions {
	Output: InferableLiteral
	Input: InferableLiteral
}
