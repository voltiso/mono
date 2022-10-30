// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DefaultSchemaOptions, SchemaOptions } from '~'

export interface UnknownObjectOptions extends SchemaOptions {
	Output: object
	Input: object

	isPlain: boolean
}

export interface DefaultUnknownObjectOptions extends DefaultSchemaOptions {
	/**
	 * For cleaner editor support, we use `object` only for explicit `.plain`
	 * objects
	 */
	Output: {}

	/**
	 * For cleaner editor support, we use `object` only for explicit `.plain`
	 * objects
	 */
	Input: {}

	isPlain: false
}
