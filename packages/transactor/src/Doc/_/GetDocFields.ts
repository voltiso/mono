// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocFieldPath } from '~/DocFieldPath'
import type { $$DocRelatedLike } from '~/DocRelated'

import type { GetData } from './GData'

/** @inline */
export type GetDocFields<R extends $$DocRelatedLike> = {
	[k in keyof GetData<R>]: DocFieldPath<GetData<R>[k]>
}
