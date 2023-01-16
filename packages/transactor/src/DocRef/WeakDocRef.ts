// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$DocRelatedLike, GetDocRepresentative } from '~/DocRelated'
import type { AnyDoc } from '~/DocTypes'

import type { CustomDocRef, CustomDocRef$ } from './CustomDocRef'

/**
 * ⚠️ This actually is a supertype of `DocRef`
 *
 * - 😱 no ref-counting❗
 */
export interface WeakDocRef<R extends $$DocRelatedLike = AnyDoc>
	extends CustomDocRef<{
		doc: GetDocRepresentative<R>
	}> {}

/**
 * ⚠️ This actually is a supertype of `DocRef`
 *
 * - 😱 no ref-counting❗
 */
export interface WeakDocRef$<R extends $$DocRelatedLike = AnyDoc>
	extends CustomDocRef$<{
		doc: GetDocRepresentative<R>
	}> {}
