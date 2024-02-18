// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$$DocRelated,
	$$DocRelatedLike,
	GetDocRepresentative,
} from '~/DocRelated'
import type { AnyDoc } from '~/DocTypes'

import type { CustomDocRef } from './CustomDocRef'

/**
 * ⚠️ This actually is a supertype of `DocRef`
 *
 * - 😱 no ref-counting❗
 */
export interface WeakDocRef<R extends $$DocRelated = AnyDoc>
	extends CustomDocRef<{
		doc: GetDocRepresentative<R>
	}> {}

export type WeakDocRef_<R> = R extends $$DocRelatedLike
	? CustomDocRef<{
			doc: GetDocRepresentative<R>
		}>
	: never
