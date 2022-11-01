// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Type_ } from '@voltiso/schemar.types'

import type { $$DocRelated, GetDocTI } from '../DocRelated'

/** @inline */
export type GAggregatePromises<R extends $$DocRelated> = {
	[k in keyof GetDocTI<R>['aggregates']]: PromiseLike<
		Type_<GetDocTI<R>['aggregates'][k]>
	>
}
