// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Merge2_ } from '@voltiso/util'

export type MergeProps_<A, B> = Merge2_<A, B>

// export type MergeProps_<A, B> = A extends any
// 	? B extends any
// 		? Merge2_<A, B>
// 		: never
// 	: never
