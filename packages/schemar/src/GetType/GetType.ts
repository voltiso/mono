// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	InferableLike,
	InferableLiteral,
	InferableObject,
	InferableTuple,
	ISchemaLike,
} from '~'

import type { ObjectType_ } from './GetObjectType'
import type { TupleType_ } from './GetTupleType'
import type { GetTypeOptions } from './GetTypeOptions'

/**
 * Infer type, or identity if already an Inferable
 *
 * @inline
 */
export type Type_<
	L,
	IO extends GetTypeOptions = { kind: 'out' },
> = object extends L
	? object
	: L extends {
			readonly InputType: any
			readonly OutputType: any
	  }
	? IO['kind'] extends 'in'
		? L['InputType']
		: IO['kind'] extends 'out'
		? L['OutputType']
		: never
	: L extends InferableLiteral
	? L
	: L extends InferableTuple
	? TupleType_<L, IO>
	: L extends InferableObject
	? ObjectType_<L, IO>
	: never

/**
 * Infer type, or identity if already an Inferable
 *
 * @inline
 */
export type Type<
	S extends ISchemaLike | InferableLike,
	Options extends GetTypeOptions = { kind: 'out' },
> = Type_<S, Options>

/**
 * Infer type, or identity if already an Inferable
 *
 * @inline
 */
export type $Type_<
	S,
	Options extends GetTypeOptions = { kind: 'out' },
> = S extends any ? (Options extends any ? Type_<S, Options> : never) : never

/**
 * Infer type, or identity if already an Inferable
 *
 * @inline
 */
export type $Type<
	S extends ISchemaLike | InferableLike,
	Options extends GetTypeOptions = { kind: 'out' },
> = S extends any ? Type_<S, Options> : never

/**
 * Proxy to `GetType`
 *
 * @inline
 */
export type OutputType<S extends ISchemaLike | InferableLike> = Type_<
	S,
	{ kind: 'out' }
>

/**
 * Proxy to `GetType`
 *
 * @inline
 */
export type $OutputType<S extends ISchemaLike | InferableLike> = S extends any
	? OutputType<S>
	: never

/**
 * Proxy to `GetType`
 *
 * @inline
 */
export type InputType<S extends ISchemaLike | InferableLike> = Type_<
	S,
	{ kind: 'in' }
>

/**
 * Proxy to `GetType`
 *
 * @inline
 */
export type $InputType<S extends ISchemaLike | InferableLike> = S extends any
	? InputType<S>
	: never
