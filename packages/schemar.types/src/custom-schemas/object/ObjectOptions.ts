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

export interface ObjectOptions extends SchemaOptions {
	Output: object
	Input: object | undefined

	shape: InferableObjectLike

	indexSignatures: ObjectIndexSignatureEntry[]
}

export interface DefaultObjectOptions extends DefaultSchemaOptions {
	Output: object
	Input: object

	shape: InferableObjectLike
	indexSignatures: []
}
