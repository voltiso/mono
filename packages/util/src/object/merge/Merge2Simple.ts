// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _, OmitSignatures, OmitSimple_ } from '~'

import type { SuggestObject } from './SuggestObject'

/** Discards index signatures */
export type Merge2Simple_<A, B> = Impl<OmitSignatures<A>, OmitSignatures<B>>

/** Discards index signatures */
export type Merge2Simple<
	A extends object,
	B extends SuggestObject<A>,
> = Merge2Simple_<A, B>

//

type Impl<A, B> = _<OmitSimple_<A, keyof B> & B>
