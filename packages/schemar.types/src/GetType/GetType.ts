// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Override } from '@voltiso/util'

import type {
	$$Schema,
	$$Schemable,
	DefaultGetTypeOptions,
	GetImplicitObjectType,
	GetTypeOptions,
	TupleType_,
} from '~'
import type {
	$$Inferable,
	$$InferableObject,
	$$InferableTuple,
	InferableLiteral,
	InferableObject,
} from '~/Inferable'

//

export namespace Type {
	export type SplitInferables<
		S extends $$Schemable,
		IO extends GetTypeOptions & { isPlain: boolean },
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
	> = S extends { readonly Output: unknown; readonly Input: unknown }
		? IO['kind'] extends 'in'
			? S['Input']
			: IO['kind'] extends 'out'
			? S['Output']
			: never
		: unknown

	export type HandleInferables<
		I extends $$Inferable,
		IO extends GetTypeOptions & { isPlain: boolean },
	> = I extends InferableLiteral
		? I
		: I extends $$InferableTuple
		? TupleType_<I, IO>
		: I extends $$InferableObject
		? InferableObject extends I
			? IO['isPlain'] extends true
				? object
				: {}
			: GetImplicitObjectType<I, IO>
		: object extends I
		? IO['isPlain'] extends true
			? object
			: {}
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
> = Type.SplitInferables<S, Override<DefaultGetTypeOptions, PartialOptions>>

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
