// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	DefaultSchemaOptions,
	InferableObjectLike,
	SchemableLike,
	SchemaOptions,
} from '~'

export type ObjectIndexSignatureEntry = {
	keySchema: SchemableLike
	valueSchema: SchemableLike
}

export interface ObjectOptions<T extends object = object>
	extends SchemaOptions {
	Output: T
	Input: T

	shape: InferableObjectLike

	indexSignatures: ObjectIndexSignatureEntry[]
}

export interface DefaultObjectOptions extends DefaultSchemaOptions {
	Output: object
	Input: object

	shape: InferableObjectLike
	indexSignatures: []
}
