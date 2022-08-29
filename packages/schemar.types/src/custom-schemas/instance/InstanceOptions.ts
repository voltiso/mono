// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DefaultSchemaOptions, SchemaOptions } from '~'

export interface InstanceOptions extends SchemaOptions {
	Constructor: abstract new (...args: any[]) => object
	Output: object
	Input: object
}

export interface DefaultInstanceOptions extends DefaultSchemaOptions {
	Constructor: abstract new (...args: any[]) => object

	Output: object
	Input: object
}
