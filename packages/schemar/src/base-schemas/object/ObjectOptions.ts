// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schemable, SchemaOptions } from '~'

export type ObjectIndexSignatureEntry = {
	keySchema: $$Schemable
	valueSchema: $$Schemable
}

export interface ObjectOptions<T extends object = object>
	extends SchemaOptions {
	Output: T
	Input: T

	/** Not type-exposed currently */
	shape: object // InferableObjectLike

	/** Currently not type-exposed */
	indexSignatures: ObjectIndexSignatureEntry[]

	/** Constructor must be `Object` */
	isPlain: boolean
}

export namespace ObjectOptions {
	export interface Default extends SchemaOptions.Default {
		Output: object
		Input: object

		/** Not type-exposed currently */
		shape: object // InferableObjectLike

		/** Currently not type-exposed */
		indexSignatures: ObjectIndexSignatureEntry[] // []

		isPlain: false
	}
}
