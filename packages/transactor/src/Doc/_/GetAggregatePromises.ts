// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Type_ } from '@voltiso/schemar.types'

import type { DocTILike } from '~/Doc'

/** @inline */
export type GAggregatePromises<TI extends DocTILike> = {
	[k in keyof TI['aggregates']]: PromiseLike<Type_<TI['aggregates'][k]>>
}
