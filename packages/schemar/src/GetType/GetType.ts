// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	Inferable_,
	InferableLiteral,
	InferableObject,
	InferableTuple,
	ISchema_,
} from '~'

import type { GetObjectType_ } from './GetObjectType'
import type { GetTupleType_ } from './GetTupleType'
import type { GetTypeOptions } from './GetTypeOptions'

/**
 * Infer type, or identity if already an Inferable
 *
 * @inline
 */
export type GetType_<
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
	? GetTupleType_<L, IO>
	: L extends InferableObject
	? GetObjectType_<L, IO>
	: never

/**
 * Infer type, or identity if already an Inferable
 *
 * @inline
 */
export type GetType<
	S extends ISchema_ | Inferable_,
	Options extends GetTypeOptions = { kind: 'out' },
> = GetType_<S, Options>

/**
 * Infer type, or identity if already an Inferable
 *
 * @inline
 */
export type $GetType_<
	S,
	Options extends GetTypeOptions = { kind: 'out' },
> = S extends any ? (Options extends any ? GetType_<S, Options> : never) : never

/**
 * Infer type, or identity if already an Inferable
 *
 * @inline
 */
export type $GetType<
	S extends ISchema_ | Inferable_,
	Options extends GetTypeOptions = { kind: 'out' },
> = S extends any ? (Options extends any ? GetType_<S, Options> : never) : never

/**
 * Proxy to `GetType`
 *
 * @inline
 */
export type GetOutputType<S extends ISchema_ | Inferable_> = GetType_<
	S,
	{ kind: 'out' }
>

/**
 * Proxy to `GetType`
 *
 * @inline
 */
export type $GetOutputType<S extends ISchema_ | Inferable_> = S extends any
	? GetOutputType<S>
	: never

/**
 * Proxy to `GetType`
 *
 * @inline
 */
export type GetInputType<S extends ISchema_ | Inferable_> = GetType_<
	S,
	{ kind: 'in' }
>

/**
 * Proxy to `GetType`
 *
 * @inline
 */
export type $GetInputType<S extends ISchema_ | Inferable_> = S extends any
	? GetInputType<S>
	: never
