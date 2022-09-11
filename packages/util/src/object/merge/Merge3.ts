// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _, SuggestObject } from '~'

/** @inline */ export type Merge3_<A, B, C> = _<
	Omit<A, keyof B | keyof C> & Omit<B, keyof C> & C
>

/** @inline */ export type Merge3<
	A extends object,
	B extends SuggestObject<A>,
	C extends SuggestObject<A & B>,
> = Merge3_<A, B, C>
