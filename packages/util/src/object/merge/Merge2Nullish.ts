// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Nullish } from '~/nullish'
import type { CanBeUndefined_, IsOptional_, PartialIfNullish_ } from '~/object'
import type { exactOptionalPropertyTypes } from '~/tsc-options'

import type { Merge2Complex_ } from './Merge2Complex'
import type { SuggestObjectNullish } from './SuggestObjectNullish'

// export type Merge2Nullish_<A, B> = _<
// 	A extends Nullish
// 		? B extends Nullish
// 			? {}
// 			: B
// 		: B extends Nullish
// 		? A
// 		: Merge2_<A, B>
// >

// export type Merge2Nullish_<A, B> = exactOptionalPropertyTypes extends true
// 	? Merge2_<PartialIfNullish_<A>, PartialIfNullish_<B>>
// 	: _<
// 			A extends Nullish
// 				? B extends Nullish
// 					? {}
// 					: B
// 				: B extends Nullish
// 				? A
// 				: Merge2_<A, B>
// 	  >

// export type Merge2Nullish_<A, B> = Merge2_<
// 	PartialIfNullish_<A>,
// 	PartialIfNullish_<B>
// >

//

/** @inline */ type Merge2NullishBasic_<A, B> = Merge2Complex_<
	PartialIfNullish_<A>,
	PartialIfNullish_<B>
>

/** @inline */ type Finalize<A, B, Result> = {
	[k in keyof Result]: IsOptional_<Result, k> extends true
		? Result[k]
		: CanBeUndefined_<A, k> extends false
		? CanBeUndefined_<B, k> extends false
			? Exclude<Result[k], undefined>
			: Result[k]
		: Result[k]
}

/** @inline */ export type Merge2Nullish_<A, B> =
	exactOptionalPropertyTypes extends true
		? Merge2NullishBasic_<A, B>
		: Finalize<A, B, Merge2NullishBasic_<A, B>>

//

// type CanBeNullish<X, True = true, False = false> = null extends X
// 	? True
// 	: undefined extends X
// 	? True
// 	: False

// //

// type IsOptionalX_<A, k, AN, True = true, False = false> = AN extends true
// 	? True
// 	: IsOptional_<A, k, True, False>

// type Part1<A, B, AN, BN> = {
// 	[k in keyof A]: k extends keyof B
// 		? Value_<B, k> | IsOptionalX_<B, k, BN, Value_<A, k>, never>
// 		: Value_<A, k>
// }

// type Part2<A, B, AN, BN> = {
// 	[k in keyof B]: k extends keyof A
// 		? Value_<B, k> | IsOptionalX_<B, k, BN, Value_<A, k>, never>
// 		: Value_<B, k>
// }

// //

// export type Merge2Nullish_<A, B> = (A extends Callable | Newable
// 	? A
// 	: unknown) &
// 	(B extends Callable | Newable ? B : unknown) &
// 	_<
// 		Part1<
// 			Exclude<A, Nullish>,
// 			Exclude<B, Nullish>,
// 			CanBeNullish<A>,
// 			CanBeNullish<B>
// 		> &
// 			Part2<
// 				Exclude<A, Nullish>,
// 				Exclude<B, Nullish>,
// 				CanBeNullish<A>,
// 				CanBeNullish<B>
// 			>
// 	>

/** @inline */ export type Merge2Nullish<
	A extends object | Nullish,
	B extends SuggestObjectNullish<A> | Nullish,
> = Merge2Nullish_<A, B>
