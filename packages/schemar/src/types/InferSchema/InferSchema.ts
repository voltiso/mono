// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	Assume,
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
	CustomObject$,
	Inferable,
	InferableLiteral,
	InferableObject,
	Input_,
	Instance$,
	IObject$,
	ISchema,
	ISchema$,
	Literal$,
	MutableTuple$,
	NonNullish$,
	Object$,
	Output_,
	ReadonlyTuple$,
	RelaxInferableTuple_,
} from '~'

/** Groups literals */
export type ImplicitInferSchema$_<S> = ImplicitInferSchema$.Step1<S>

/** Groups literals */
export type ImplicitInferSchema$<S extends $$Schemable> =
	ImplicitInferSchema$_<S>

/** Does not group literals */
export type $ImplicitInferSchema$_<S> = S extends any
	? ImplicitInferSchema$_<S>
	: never

/** Does not group literals */
export type $ImplicitInferSchema$<S extends $$Schemable> = S extends any
	? ImplicitInferSchema$_<S>
	: never

//

export type GetObject$<Shape extends $$InferableObject> = GetObject$.Get<
	Assume<
		object,
		Output_<Shape>
		// IsIdentical<Output_<Shape>, {}> extends true ? object : Output_<Shape>
	>,
	Extract<Input_<Shape>, object>
>

// type A = GetObject$<{ a: CustomSchema<{isOptional: true}> }>
// type B = GetImplicitObject$<{ a: CustomSchema<{ isOptional: true }> }>

/** Auto-default to empty object if possible */
export type GetImplicitObject$<Shape extends $$InferableObject> =
	GetObject$.Get<
		Assume<object, Output_<Shape>>,
		Assume<object | undefined, Input_<Shape>>
	>

export declare namespace GetObject$ {
	export type Get<
		Output extends object,
		Input extends object | undefined,
	> = undefined extends Input
		? CustomObject$<{ Output: Output; Input: Input; hasDefault: true }>
		: IsCompatible<Output, Input> extends true
		? Object$<Output>
		: CustomObject$<{ Output: Output; Input: Input }>
}

export declare namespace ImplicitInferSchema$ {
	/** Do we have full `ISchema` super-type? */
	export type Step1<S> = $$Schemable extends S
		? ISchema$
		: ISchema extends ExcludeEmptyBraces<S>
		? ISchema$
		: Inferable extends S
		? ISchema$
		: Step2<S>

	/** Group literals */
	export type Step2<S> = Extract<S, InferableLiteral> extends never
		? Step3<S>
		:
				| Literal$<Extract<S, InferableLiteral>>
				| Step3<Exclude<S, InferableLiteral>>

	/** IObject super-type */
	export type Step3<S> = InferableObject extends ExcludeEmptyBraces<S>
		? IObject$ | Simple<Exclude<S, $$SchemableObject>>
		: IObject$ extends ExcludeEmptyBraces<S>
		? IObject$ | Simple<Exclude<S, $$SchemableObject>>
		: Simple<S>

	/** Other */
	export type Simple<S> = IsCompatible<$$Schema, S> extends true
		? ISchema$
		: S extends $$Schema
		? S
		: IsAlmostSame<S, {}> extends true
		? NonNullish$
		: S extends $$InferableObject
		? GetImplicitObject$<S>
		: S extends Newable
		? Instance$<S>
		: S extends $$InferableMutableTuple
		? MutableTuple$<RelaxInferableTuple_<S>>
		: S extends $$InferableReadonlyTuple
		? ReadonlyTuple$<RelaxInferableTuple_<S>>
		: never
}
