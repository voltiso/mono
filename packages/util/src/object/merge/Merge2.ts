// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _, SuggestObject } from '~'

/** @inline */ export type Merge2_<A, B> = _<Omit<A, keyof B> & B>

/** @inline */ export type Merge2<
	A extends object,
	B extends SuggestObject<A>,
> = Merge2_<A, B>
