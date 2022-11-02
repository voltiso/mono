// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Type_ } from '@voltiso/schemar.types'

import type { $$DocRelatedLike, GetDocTI } from '~/DocRelated'

/** @inline */
export type GetAggregatePromises<R extends $$DocRelatedLike> = {
	[k in keyof GetDocTI<R>['aggregates']]: PromiseLike<
		Type_<GetDocTI<R>['aggregates'][k]>
	>
}
