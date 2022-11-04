// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ToStringKey } from '../key'
import type { Value } from '../value'

export type IEntry = [keyof any, unknown]

export type Entry<O extends object> = O extends unknown
	? {
			[k in keyof O]-?: Value<O, k> extends never ? never : [k, Value<O, k>]
	  }[keyof O]
	: never

//

export type ICoercedEntry = [ToStringKey<keyof any>, unknown]

export type CoercedEntry<O extends object> = O extends unknown
	? {
			[k in keyof O]-?: [ToStringKey<k>, Value<O, k>]
	  }[keyof O]
	: never
