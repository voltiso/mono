// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Type_ } from '@voltiso/schemar.types'

/** @inline */
export type GAggregatePromises_<TI> = TI extends { aggregates: {} }
	? {
			[k in keyof TI['aggregates']]: PromiseLike<Type_<TI['aggregates'][k]>>
	  }
	: never
