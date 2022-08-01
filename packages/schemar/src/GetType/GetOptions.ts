// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OPTIONS } from '_'

import type {
	DefaultSchemaOptions,
	InferableLiteral,
	InferableObject,
	InferableTuple,
	ISchema,
} from '~'

export type GetOptions<L> = L extends
	| InferableLiteral
	| InferableObject
	| InferableTuple
	? DefaultSchemaOptions
	: L extends ISchema
	? L[OPTIONS]
	: never
