// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemaOptions } from '~'

export interface UnknownObjectOptions extends SchemaOptions {
	Output: object
	Input: object

	isPlain: boolean
}

export interface DefaultUnknownObjectOptions extends SchemaOptions.Default {
	Output: object
	Input: object

	isPlain: false
}
