// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$DocRelatedLike } from '~/DocRelated'
import type { AnyDoc } from '~/DocTypes'

import type { CustomDocRef } from './CustomDocRef'

/**
 * ⚠️ This actually is a supertype of `DocRef`
 *
 * - Rarely used - no ref-counting❗
 */
export type WeakDocRef<R extends $$DocRelatedLike = AnyDoc> = CustomDocRef<{
	doc: R
}>

// export const WeakDocRef = CustomDocRef

//

//
