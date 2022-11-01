// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$DocRelatedLike, GetDocTag } from '~/DocRelated'
import type { AnyDoc } from '~/DocTypes'

import type { GetDocRef } from './GetDocRef'

export interface WithDocRef<D extends $$DocRelatedLike = AnyDoc> {
	docRef: GetDocRef<{ doc: GetDocTag<D>; isStrong: true }>
}
