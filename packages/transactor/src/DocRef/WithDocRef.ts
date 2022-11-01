// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$DocRelated } from '~/Doc'
import type { AnyDocTag } from '~/DocTypes'

import type { GetDocRef } from './GetDocRef'

export interface WithDocRef<D extends $$DocRelated = AnyDocTag> {
	docRef: GetDocRef<{ doc: D; isStrong: true }>
}
