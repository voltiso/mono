// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _, FastMerge2Reverse_, SuggestObject } from '~'

/** @inline */ export type Merge3_<A, B, C> = _<
	Omit<A, keyof B | keyof C> & Omit<B, keyof C> & C
>

/** @inline */ export type Merge3<
	A extends object,
	B extends SuggestObject<A>,
	C extends SuggestObject<A & B>,
> = Merge3_<A, B, C>

/** @inline */ export type FastMerge3Reverse_<A, B, C> = FastMerge2Reverse_<
	A,
	FastMerge2Reverse_<B, C>
>

export type FastMerge3Reverse<
	A extends object,
	B extends SuggestObject<A>,
	C extends SuggestObject<FastMerge2Reverse_<A, B>>,
> = FastMerge3Reverse_<A, B, C>
