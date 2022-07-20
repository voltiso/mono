// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Value } from '../../../key-value'
import type { UnknownProperty } from '../../../UnknownProperty.js'

export type AllowedValue<
	Obj extends object,
	K extends keyof Obj | UnknownProperty,
> = K extends keyof Obj ? Value<Obj, K> : unknown
