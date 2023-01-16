// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$$InferableObject,
	$$InferableTuple,
	$$Schema,
	$$Schemable,
	ImplicitInferSchema$_,
	Rest,
} from '~'

export type GetFinalSchema_<S> = S extends $$Schema & {
	get Final(): infer F
}
	? F
	: ImplicitInferSchema$_<S> extends { get Final(): infer F }
	? F
	: never

export type GetFinalSchema<S extends $$Schemable> = GetFinalSchema_<S>

//

export type RelaxSchema_<S> = S extends $$Schema & {
	get Final(): infer F
}
	? F
	: S extends $$InferableObject
	? { [k in keyof S]: RelaxSchema_<S[k]> }
	: S extends $$InferableTuple
	? RelaxInferableTuple_<S>
	: S

export type RelaxSchema<S extends $$Schemable> = RelaxSchema_<S>

//

export type RelaxInferableTuple_<S> = RelaxInferableTuple.Rec<[], S>

export declare namespace RelaxInferableTuple {
	export type Rec<acc extends unknown[], rest> = rest extends readonly [
		infer head,
		...infer tail,
	]
		? head extends Rest<infer E>
			? Rec<[...acc, ...RelaxSchema_<E>[]], tail>
			: Rec<[...acc, RelaxSchema_<head>], tail>
		: rest extends readonly []
		? acc
		: rest extends readonly Rest<infer E>[]
		? [...acc, ...RelaxSchema_<E>[]]
		: acc
}

export type RelaxInferableTuple<S extends $$Schemable[]> =
	RelaxInferableTuple_<S>
