// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DefaultSchemaOptions, SchemaOptions } from '~'

export interface UnknownObjectOptions extends SchemaOptions {
	Output: object
	Input: object
}

export interface DefaultUnknownObjectOptions extends DefaultSchemaOptions {
	Output: object
	Input: object
}
