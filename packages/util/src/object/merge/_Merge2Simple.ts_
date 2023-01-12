// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _ } from '../flatten'
import type { OmitSignatures, OmitSimple_ } from '../pick-omit'
import type { SuggestObject } from './Suggest'

/** Discards index signatures */
/** @inline */ export type Merge2Simple_<A, B> = Impl<
	OmitSignatures<A>,
	OmitSignatures<B>
>

/** Discards index signatures */
/** @inline */ export type Merge2Simple<
	A extends object,
	B extends SuggestObject<A>,
> = Merge2Simple_<A, B>

//

/** @inline */ type Impl<A, B> = _<OmitSimple_<A, keyof B> & B>
