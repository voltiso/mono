import {
	InferableLiteral,
	InferableObject,
	InferableTuple,
	RootSchemable,
	ISchema,
	Inferable,
} from '../schema'
import { GetObjectType_ } from './GetObjectType'
import { GetTupleType } from './GetTupleType'
import { GetTypeOptions } from './GetTypeOptions'

export type GetType_<L, IO extends GetTypeOptions> = L extends InferableLiteral
	? L
	: L extends ISchema
	? IO['kind'] extends 'in'
		? L['InputType']
		: IO['kind'] extends 'out'
		? L['OutputType']
		: never
	: L extends InferableTuple
	? GetTupleType<L, IO>
	: L extends InferableObject
	? GetObjectType_<L, IO>
	: never

/**
 * Infer type, or identity if already an Inferable
 */
export type GetType<
	S extends ISchema | Inferable,
	Options extends GetTypeOptions = { kind: 'out' }
> = GetType_<S, Options>

/**
 * Proxy to `GetType`
 */
export type GetOutputType<S extends RootSchemable> = GetType_<
	S,
	{ kind: 'out' }
>

/**
 * Proxy to `GetType`
 */
export type GetInputType<L extends RootSchemable> = GetType_<L, { kind: 'in' }>
