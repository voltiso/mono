// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { InferableLiteral, SchemaOptions } from '../../../../schema'
import { defaultSchemaOptions } from '../../../../schema'

export interface UnknownLiteralOptions extends SchemaOptions {
	_out: InferableLiteral
	_in: InferableLiteral
}

export const defaultUnknownLiteralOptions = {
	...defaultSchemaOptions,
	_out: 0 as InferableLiteral,
	_in: 0 as InferableLiteral,
}

export type DefaultUnknownLiteralOptions = typeof defaultUnknownLiteralOptions
