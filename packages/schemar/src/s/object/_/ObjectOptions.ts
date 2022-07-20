// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { InferableObject, SchemaOptions } from '../../../schema'
import { defaultSchemaOptions } from '../../../schema'

export interface ObjectOptions extends SchemaOptions {
	_out: object
	_in: object
	shape: InferableObject
}

export const defaultObjectOptions = {
	...defaultSchemaOptions,
}

export type DefaultObjectOptions = typeof defaultObjectOptions
