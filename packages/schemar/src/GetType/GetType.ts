// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { InferableLiteral, InferableObject, InferableTuple } from '~'

import type { GetObjectType_ } from './GetObjectType'
import type { GetTupleType } from './GetTupleType'
import type { GetTypeOptions } from './GetTypeOptions'

/** @inline */
export type GetType_<L, IO extends GetTypeOptions> = L extends {
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
	? GetTupleType<L, IO>
	: L extends InferableObject
	? GetObjectType_<L, IO>
	: object extends L
	? object
	: never

/**
 * Infer type, or identity if already an Inferable
 *
 * @inline
 */
export type GetType<
	S, // extends ISchema | Inferable,
	Options extends GetTypeOptions = { kind: 'out' },
> = GetType_<S, Options>

/**
 * Proxy to `GetType`
 *
 * @inline
 */
export type GetOutputType<S> = GetType_<S, { kind: 'out' }>

/**
 * Proxy to `GetType`
 *
 * @inline
 */
export type GetInputType<S> = GetType_<S, { kind: 'in' }>
