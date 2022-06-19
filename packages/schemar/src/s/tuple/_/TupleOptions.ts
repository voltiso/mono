import {
	defaultSchemaOptions,
	RootSchemable,
	SchemaOptions,
} from '../../../schema'

export interface TupleOptions extends SchemaOptions {
	_out: readonly unknown[]
	_in: readonly unknown[]

	readonlyTuple: boolean
	elementSchemas: RootSchemable[]
}

export const defaultMutableTupleOptions = {
	...defaultSchemaOptions,
	readonlyTuple: false as const,
}

export const defaultReadonlyTupleOptions = {
	...defaultSchemaOptions,
	readonlyTuple: true as const,
}

export type DefaultMutableTupleOptions = typeof defaultMutableTupleOptions
export type DefaultReadonlyTupleOptions = typeof defaultReadonlyTupleOptions
