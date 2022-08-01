// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Merge2_ } from './Merge2'

type _MergeN<objs, accumulator extends object> = objs extends readonly []
	? accumulator
	: objs extends readonly [infer h, ...infer t]
	? [h] extends [object]
		? _MergeN<t, Merge2_<accumulator, h>>
		: accumulator
	: never

export type MergeN<objs extends readonly object[]> = _MergeN<objs, {}>
