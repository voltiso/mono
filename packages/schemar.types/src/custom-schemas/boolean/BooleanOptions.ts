// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DefaultSchemaOptions, SchemaOptions } from '~'

export interface BooleanOptions extends SchemaOptions {
	Output: boolean
	Input: boolean
}

export interface DefaultBooleanOptions extends DefaultSchemaOptions {
	Output: boolean
	Input: boolean
}
