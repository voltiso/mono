// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { InferableObjectLike, SchemableLike, SchemaOptions } from '~'
import { defaultSchemaOptions } from '~'

export interface ObjectOptions extends SchemaOptions {
	Output: object
	Input: object

	shape: InferableObjectLike

	indexSignatures: { keySchema: SchemableLike; valueSchema: SchemableLike }[]
}

export const defaultObjectOptions = {
	...defaultSchemaOptions,
	Output: 0 as unknown as object,
	Input: 0 as unknown as object,

	shape: 0 as unknown as InferableObjectLike,

	indexSignatures: [] as [],
}

export type DefaultObjectOptions = typeof defaultObjectOptions
