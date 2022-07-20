// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	InferableLiteral,
	InferableObject,
	InferableTuple,
	ISchema,
} from '../schema'
import type { DefaultSchemaOptions, OPTIONS } from '../schema/SchemaOptions.js'

export type GetOptions<L> = L extends
	| InferableLiteral
	| InferableObject
	| InferableTuple
	? DefaultSchemaOptions
	: L extends ISchema
	? L[OPTIONS]
	: never
