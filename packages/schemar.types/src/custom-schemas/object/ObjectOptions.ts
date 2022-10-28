// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schemable, DefaultSchemaOptions, SchemaOptions } from '~'

export type ObjectIndexSignatureEntry = {
	keySchema: $$Schemable
	valueSchema: $$Schemable
}

export interface ObjectOptions<T extends object = object>
	extends SchemaOptions {
	Output: T
	Input: T

	shape: {} // InferableObjectLike

	indexSignatures: ObjectIndexSignatureEntry[]

	isPlain: boolean
}

export interface DefaultObjectOptions extends DefaultSchemaOptions {
	Output: object
	Input: object

	shape: {} // InferableObjectLike
	indexSignatures: []

	isPlain: false
}
