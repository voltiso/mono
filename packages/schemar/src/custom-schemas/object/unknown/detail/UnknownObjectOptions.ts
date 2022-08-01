// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemaOptions } from '~'
import { defaultSchemaOptions } from '~'

export interface UnknownObjectOptions extends SchemaOptions {
	Output: object
	Input: object
}

export const defaultUnknownObjectOptions = {
	...defaultSchemaOptions,
	Output: 0 as unknown as object,
	Input: 0 as unknown as object,
}

export type DefaultUnknownObjectOptions = typeof defaultUnknownObjectOptions
