// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schema, $$Schemable, GetTypeOptions, ImplicitObjectType_, TupleType_ } from '~'
import type {
	$$Inferable,
	$$InferableObject,
	$$InferableTuple,
	InferableLiteral,
	InferableObject,
} from '~/Inferable'

//

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Type {
	export type SplitInferables<
		S extends $$Schemable,
		IO extends GetTypeOptions,
	> = S extends $$Schema
		? HandleSchemas<S, IO>
		: S extends $$Inferable
		? HandleInferables<S, IO>
		: never

	// export type SplitInferables<S, IO extends GetTypeOptions> = S extends any
	// 	?
	// 			| HandleSchemas<Extract<S, $$Schema>, IO>
	// 			| HandleInferables<Exclude<S, $$Schema>, IO>
	// 	: never

	export type HandleSchemas<
		S extends $$Schema,
		IO extends GetTypeOptions,
	> = S extends { readonly OutputType: unknown; readonly InputType: unknown }
		? IO['kind'] extends 'in'
			? S['InputType']
			: IO['kind'] extends 'out'
			? S['OutputType']
			: never
		: unknown

	export type HandleInferables<
		I extends $$Inferable,
		IO extends GetTypeOptions,
	> = I extends InferableLiteral
		? I
		: I extends $$InferableTuple
		? TupleType_<I, IO>
		: I extends $$InferableObject
		? InferableObject extends I
			? object
			: ImplicitObjectType_<I, IO>
		: object extends I
		? object
		: never
}

//

//

//

/**
 * Infer type, or identity if already an Inferable
 *
 * @inline
 */
export type Type_<S, IO extends GetTypeOptions = { kind: 'out' }> = [
	S,
] extends [$$Schemable]
	? Type<S, IO>
	: never

/**
 * Infer type, or identity if already an Inferable
 *
 * @inline
 */
export type Type<
	S extends $$Schemable,
	Options extends GetTypeOptions = { kind: 'out' },
> = Type.SplitInferables<S, Options>

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
	S extends $$Schema | $$Inferable,
	Options extends GetTypeOptions = { kind: 'out' },
> = S extends any ? Type_<S, Options> : never

/**
 * Proxy to `GetType`
 *
 * @inline
 */
export type OutputType<S extends $$Schema | $$Inferable> = Type_<
	S,
	{ kind: 'out' }
>

/**
 * Proxy to `GetType`
 *
 * @inline
 */
export type OutputType_<S> = Type_<S, { kind: 'out' }>

/**
 * Proxy to `GetType`
 *
 * @inline
 */
export type $OutputType<S extends $$Schema | $$Inferable> = S extends any
	? OutputType_<S>
	: never

/**
 * Proxy to `GetType`
 *
 * @inline
 */
export type $OutputType_<S> = S extends any ? OutputType_<S> : never

/**
 * Proxy to `GetType`
 *
 * @inline
 */
export type InputType<S extends $$Schema | $$Inferable> = Type_<
	S,
	{ kind: 'in' }
>

/**
 * Proxy to `GetType`
 *
 * @inline
 */
export type InputType_<S> = Type_<S, { kind: 'in' }>

/**
 * Proxy to `GetType`
 *
 * @inline
 */
export type $InputType<S extends $$Schema | $$Inferable> = S extends any
	? InputType_<S>
	: never

/**
 * Proxy to `GetType`
 *
 * @inline
 */
export type $InputType_<S> = S extends any ? InputType_<S> : never
