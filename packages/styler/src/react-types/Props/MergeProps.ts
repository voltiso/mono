// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// import { Merge2Simple_ } from '@voltiso/util'
import type { Merge2Trivial_ } from '@voltiso/util'

import type { Props } from './Props.js'

type Finalize<X> = X extends Props ? X : X & Props

// type AllowUndefined_<Obj> = {
// 	[k in keyof Obj]: IsOptional_<Obj, k> extends true
// 		? Obj[k] | undefined
// 		: Obj[k]
// }

export type MergeProps_<A, B> = Finalize<Merge2Trivial_<A, B>>

export type MergeProps<A extends Props, B extends Props> = MergeProps_<A, B>
