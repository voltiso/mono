// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemaOptions } from '~'

export interface InstanceOptions extends SchemaOptions {
	Constructor: abstract new (...args: any[]) => object
	Output: object
	Input: object
}

export interface DefaultInstanceOptions extends SchemaOptions.Default {
	Constructor: abstract new (...args: any[]) => object

	Output: object
	Input: object
}
