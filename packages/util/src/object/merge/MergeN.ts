// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Merge_ } from './Merge'

//

export type MergeN_<objs> = MergeN.Rec<objs, {}>
export type MergeN<objs extends readonly object[]> = MergeN_<objs>

export type $MergeN_<objs> = objs extends any ? MergeN_<objs> : never
export type $MergeN<objs extends readonly object[]> = $MergeN_<objs>

//

export namespace MergeN {
	export type Rec<objs, acc> = objs extends readonly []
		? acc
		: objs extends readonly [infer h, ...infer t]
			? [h] extends [object]
				? Rec<t, Merge_<acc, h>>
				: acc
			: never
}
