// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	ExcludeEmptyBraces,
	IsAlmostSame,
	IsCompatible,
	Newable,
} from '@voltiso/util'

import type {
	$$InferableMutableTuple,
	$$InferableObject,
	$$InferableReadonlyTuple,
	$$Schema,
	$$Schemable,
	$$SchemableObject,
	FixTupleShape,
	ImplicitObject,
	Inferable,
	InferableLiteral,
	InferableObject,
	Instance,
	IObject,
	ISchema,
	Literal,
	MutableTuple,
	NonNullish,
	ReadonlyTuple,
} from '~'

/** Groups literals */
export type InferSchema_<S> = InferSchema.Step1<S>

/** Groups literals */
export type InferSchema<S extends $$Schemable> = InferSchema_<S>

/** Does not group literals */
export type $InferSchema_<S> = S extends any ? InferSchema_<S> : never

/** Does not group literals */
export type $InferSchema<S extends $$Schemable> = S extends any
	? InferSchema_<S>
	: never

//

export type A = InferSchema<{}>['simple']

export namespace InferSchema {
	/** Do we have full `ISchema` super-type? */
	export type Step1<S> = ISchema extends ExcludeEmptyBraces<S>
		? ISchema
		: Inferable extends S
		? ISchema
		: Step2<S>

	/** Group literals */
	export type Step2<S> = Extract<S, InferableLiteral> extends never
		? Step3<S>
		:
				| Literal<Extract<S, InferableLiteral>>
				| Step3<Exclude<S, InferableLiteral>>

	/** IObject super-type */
	export type Step3<S> = InferableObject extends ExcludeEmptyBraces<S>
		? IObject | Step4<Exclude<S, $$SchemableObject>>
		: IObject extends ExcludeEmptyBraces<S>
		? IObject | Step4<Exclude<S, $$SchemableObject>>
		: Step4<S>

	/** Other */
	export type Step4<S> = IsCompatible<$$Schema, S> extends true
		? ISchema
		: S extends $$Schema
		? S
		: IsAlmostSame<S, {}> extends true
		? NonNullish
		: S extends $$InferableObject
		? ImplicitObject<S>
		: S extends Newable
		? Instance<S>
		: S extends $$InferableMutableTuple
		? MutableTuple<FixTupleShape<S>>
		: S extends $$InferableReadonlyTuple
		? ReadonlyTuple<FixTupleShape<[...S]>>
		: never
}
