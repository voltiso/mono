// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Nullish } from '~'

import type { Merge2Nullish_ } from './Merge2Nullish'

export type MergeNNullish_<objs, accumulator> = objs extends readonly []
	? accumulator
	: objs extends readonly [infer h, ...infer t]
	? [h] extends [object | Nullish]
		? MergeNNullish_<t, Merge2Nullish_<accumulator, h>>
		: accumulator
	: never

/** @inline */ export type MergeNNullish<
	objs extends readonly (object | Nullish)[],
> = MergeNNullish_<objs, {}>
