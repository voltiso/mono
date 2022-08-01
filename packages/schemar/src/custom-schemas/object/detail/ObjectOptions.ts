// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { InferableObject, SchemaOptions } from '~'
import { defaultSchemaOptions } from '~'

export interface ObjectOptions extends SchemaOptions {
	Output: object
	Input: object

	shape: InferableObject
}

export const defaultObjectOptions = {
	...defaultSchemaOptions,
	Output: 0 as unknown as object,
	Input: 0 as unknown as object,

	shape: 0 as unknown as InferableObject,
}

export type DefaultObjectOptions = typeof defaultObjectOptions
