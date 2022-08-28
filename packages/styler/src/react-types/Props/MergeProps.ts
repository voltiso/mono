// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _ } from '@voltiso/util'

// export type MergeProps_<A, B> = Merge2_<A, B>

// export type MergeProps_<A, B> = {
// 	[k in keyof A | keyof B]: k extends keyof B
// 		? B[k]
// 		: k extends keyof A
// 		? A[k]
// 		: never
// }

export type FastMergeProps_<A, B> = B & Omit<A, keyof B>

export type MergeProps_<A, B> = B extends undefined
	? A
	: keyof B extends never
	? A
	: _<B & Omit<A, keyof B>>

// export type MergeProps_<A, B> = keyof A & keyof B extends never
// 	? B & A
// 	: B & Omit<A, keyof B>
