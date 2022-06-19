import { DefaultSchemaOptions, OPTIONS } from '../schema/SchemaOptions'
import {
	ISchema,
	InferableLiteral,
	InferableObject,
	InferableTuple,
} from '../schema'

export type GetOptions<L> = L extends
	| InferableLiteral
	| InferableObject
	| InferableTuple
	? DefaultSchemaOptions
	: L extends ISchema
	? L[OPTIONS]
	: never
