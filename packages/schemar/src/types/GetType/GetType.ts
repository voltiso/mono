// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $Override_ } from '@voltiso/util'

import type {
	$$Inferable,
	$$InferableObject,
	$$InferableTuple,
	$$Schema,
	$$Schemable,
	DefaultGetTypeOptions,
	GetImplicitObjectType,
	GetTypeOptions,
	InferableObject,
	TupleType_,
} from '~'

//

export declare namespace Type {
	export type Get<
		S, // extends $$Schemable,
		IO extends GetTypeOptions,
	> = S extends $$Schema
		? S extends { readonly Output: unknown; readonly Input: unknown }
			? IO['kind'] extends 'in'
				? S['Input']
				: IO['kind'] extends 'out'
				  ? S['Output']
				  : never
			: unknown
		: S extends $$InferableTuple
		  ? TupleType_<S, IO>
		  : S extends $$InferableObject
		    ? InferableObject extends S
					? {}
					: GetImplicitObjectType<S, IO>
		    : S
}

//

//

//

/**
 * Infer type, or identity if already an Inferable
 *
 * @inline
 */
export type Type_<S, PartialOptions extends Partial<GetTypeOptions> = {}> = [
	S,
] extends [$$Schemable]
	? Type<S, PartialOptions>
	: never

/**
 * Infer type, or identity if already an Inferable
 *
 * @inline
 */
export type Type<
	S extends $$Schemable,
	PartialOptions extends Partial<GetTypeOptions> = {},
> = S extends any
	? Type.Get<S, $Override_<DefaultGetTypeOptions, PartialOptions>>
	: never

/**
 * Infer type, or identity if already an Inferable
 *
 * @inline
 */
export type $Type_<
	S,
	PartialOptions extends Partial<GetTypeOptions> = {},
> = S extends any
	? PartialOptions extends any
		? Type_<S, PartialOptions>
		: never
	: never

/**
 * Infer type, or identity if already an Inferable
 *
 * @inline
 */
export type $Type<
	S extends $$Schema | $$Inferable,
	PartialOptions extends Partial<GetTypeOptions> = {},
> = S extends any ? Type_<S, PartialOptions> : never

//

//

//

/**
 * Proxy to `GetType`
 *
 * @inline
 */
export type Output_<S> = Type_<S, { kind: 'out' }>

/**
 * Proxy to `GetType`
 *
 * @inline
 */
export type Output<S extends $$Schema | $$Inferable> = Output_<S>

/**
 * Proxy to `GetType`
 *
 * @inline
 */
export type $Output_<S> = S extends any ? Output_<S> : never

/**
 * Proxy to `GetType`
 *
 * @inline
 */
export type $Output<S extends $$Schema | $$Inferable> = $Output_<S>

//

//

//

/**
 * Proxy to `GetType`
 *
 * @inline
 */
export type Input_<S> = Type_<S, { kind: 'in' }>

/**
 * Proxy to `GetType`
 *
 * @inline
 */
export type Input<S extends $$Schema | $$Inferable> = Input_<S>

/**
 * Proxy to `GetType`
 *
 * @inline
 */
export type $Input_<S> = S extends any ? Input_<S> : never

/**
 * Proxy to `GetType`
 *
 * @inline
 */
export type $Input<S extends $$Schema | $$Inferable> = $Input_<S>
