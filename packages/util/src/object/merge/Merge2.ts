// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _, SuggestObject } from '~'

/** @inline */ export type FastMerge2_<A, B> = Omit<A, keyof B> & B

/** @inline */ export type FastMerge2<
	A extends object,
	B extends SuggestObject<A>,
> = FastMerge2_<A, B>

//

//

/** @inline */ export type FastMerge2Reverse_<A, B> = A & Omit<B, keyof A>

/** @inline */ export type FastMerge2Reverse<
	A extends object,
	B extends SuggestObject<A>,
> = FastMerge2Reverse_<A, B>

//

//

//

//

/** @inline */ export type Merge2_<A, B> = _<Omit<A, keyof B> & B>

/** @inline */ export type Merge2<
	A extends object,
	B extends SuggestObject<A>,
> = Merge2_<A, B>

//

//

/** @inline */ export type Merge2Reverse_<A, B> = _<A & Omit<B, keyof A>>

/** @inline */ export type $Merge2Reverse_<A, B> = A extends any
	? B extends any
		? _<A & Omit<B, keyof A>>
		: never
	: never

/** @inline */ export type Merge2Reverse<
	A extends object,
	B extends SuggestObject<A>,
> = Merge2Reverse_<A, B>
