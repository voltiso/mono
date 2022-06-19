import { defaultSchemaOptions, SchemaOptions } from '../../../../schema'

export interface UnknownTupleOptions extends SchemaOptions {
	_out: readonly unknown[]
	_in: readonly unknown[]

	readonlyTuple: boolean

	minLength: number | undefined
	maxLength: number | undefined
}

export const defaultMutableUnknownTupleOptions = {
	...defaultSchemaOptions,
	_out: 0 as unknown as unknown[],
	_in: 0 as unknown as unknown[],
	readonlyTuple: false as const,
	minLength: undefined,
	maxLength: undefined,
}

export const defaultReadonlyUnknownTupleOptions = {
	...defaultSchemaOptions,
	_out: 0 as unknown as readonly unknown[],
	_in: 0 as unknown as readonly unknown[],
	readonlyTuple: true as const,
	minLength: undefined,
	maxLength: undefined,
}

export type DefaultMutableUnknownTupleOptions =
	typeof defaultMutableUnknownTupleOptions

export type DefaultReadonlyUnknownTupleOptions =
	typeof defaultReadonlyUnknownTupleOptions
