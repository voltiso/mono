// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _ } from '../flatten'
import type { OmitTrivial_ } from '../pick-omit'
import type { SuggestObject } from './SuggestObject.js'

/** Does not work with index signatures */
export type Merge2Trivial_<A, B> = _<OmitTrivial_<A, keyof B> & B>

/** Does not work with index signatures */
export type Merge2Trivial<
	A extends object,
	B extends SuggestObject<A>,
> = Merge2Trivial_<A, B>
