import {
	defaultSchemaOptions,
	InferableLiteral,
	SchemaOptions,
} from '../../../schema'

export interface LiteralOptions extends SchemaOptions {
	_out: InferableLiteral
	_in: InferableLiteral
	values: Set<InferableLiteral>
}

export const defaultLiteralOptions = {
	...defaultSchemaOptions,
	values: new Set<InferableLiteral>(),
}

export type DefaultLiteralOptions = typeof defaultLiteralOptions
