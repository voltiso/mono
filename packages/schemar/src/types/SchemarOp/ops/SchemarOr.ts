// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$$Literal,
	$$Schema,
	CustomSchema$,
	InferableLiteral,
	Literal$,
} from '~'

export type SchemarOr<A extends $$Schema, B extends $$Schema> = SchemarOr.Impl<
	A,
	B
>

// export type SchemarOr<
// 	A extends $$Schemable,
// 	B extends $$Schemable,
// > = A extends any
// 	? B extends any
// 		? SchemarOr.Impl<InferSchema<A>, InferSchema<B>>
// 		: never
// 	: never

export declare namespace SchemarOr {
	export type Impl<A extends $$Schema, B extends $$Schema> = [A, B] extends [
		$$Literal,
		$$Literal,
	]
		? A extends $$Literal
			? B extends $$Literal
				? Literals<A, B>
				: never
			: never
		: Custom<A, B>

	export type Custom<A extends $$Schema, B extends $$Schema> = A extends {
		Output: unknown
		Input: unknown
	}
		? B extends {
				Output: unknown
				Input: unknown
			}
			? CustomSchema$<{
					Output: A['Output'] | B['Output']
					Input: A['Input'] | B['Input']
				}>
			: never
		: never

	export type Literals<A extends $$Literal, B extends $$Literal> = A extends {
		getValues: Set<infer AA>
	}
		? B extends { getValues: Set<infer BB> }
			? AA | BB extends InferableLiteral
				? Literal$<AA | BB>
				: never
			: never
		: never
}
