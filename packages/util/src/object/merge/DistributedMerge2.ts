// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Merge2_ } from '~'

import type { SuggestObject } from './Suggest'

/**
 * Distributed `Merge2` without parameter constraints
 *
 * - Does not work with index signatures
 */
export type $Merge2_<A, B> = A extends any
	? B extends any
		? Merge2_<A, B>
		: never
	: never

/**
 * `Merge2` with parameter constraints
 *
 * - Does not work with index signatures
 */
export type $Merge2<A extends object, B extends SuggestObject<A>> = $Merge2_<
	A,
	B
>
