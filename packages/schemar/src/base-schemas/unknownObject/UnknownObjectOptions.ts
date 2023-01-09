// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DefaultSchemaOptions, SchemaOptions } from '~'

export interface UnknownObjectOptions extends SchemaOptions {
	Output: object
	Input: object

	isPlain: boolean
}

export interface DefaultUnknownObjectOptions extends DefaultSchemaOptions {
	Output: object
	Input: object

	isPlain: false
}
