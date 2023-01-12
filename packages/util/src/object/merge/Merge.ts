// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _ } from '../flatten'
import type { SuggestObject } from './Suggest'

/**
 * 💀 You most likely want to use distributive `$Merge_` - this one can be
 * super-slow in generic contexts
 *
 * @inline
 */
export type Merge_<A, B> = _<Omit<A, keyof B> & B>

/**
 * 💀 You most likely want to use distributive `$Merge` - this one can be
 * super-slow in generic contexts
 *
 * @inline
 */
export type Merge<A extends object, B extends SuggestObject<A>> = Merge_<A, B>

//

/**
 * ✅ Distributive version of `Merge_`
 *
 * @inline
 */
export type $Merge_<A, B> = A extends any
	? B extends any
		? Merge_<A, B>
		: never
	: never

/**
 * ✅ Distributive version of `Merge`
 *
 * @inline
 */
export type $Merge<A extends object, B extends SuggestObject<A>> = $Merge_<A, B>

//

//
