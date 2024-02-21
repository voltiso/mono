// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schemable, SchemaOptions } from '~'

export interface ObjectIndexSignatureEntry {
	keySchema: $$Schemable
	valueSchema: $$Schemable
}

export interface ObjectOptions extends SchemaOptions {
	// Output: T
	// Input: T | undefined // ?

	/** Not type-exposed currently */
	shape: object // InferableObjectLike

	/** Currently not type-exposed */
	indexSignatures: ObjectIndexSignatureEntry[]

	/**
	 * Constructor must be `Object`
	 *
	 * ⚠️ Currently not type-exposed
	 */
	isPlain: boolean
}

export declare namespace ObjectOptions {
	export interface Default extends SchemaOptions.Default {
		Output: object
		Input: object

		/** Not type-exposed currently */
		shape: object // InferableObjectLike

		/** Currently not type-exposed */
		indexSignatures: ObjectIndexSignatureEntry[] // []

		/** Currently not type-exposed */
		isPlain: boolean // false
	}

	// export type Simplify<O> = [
	// 	OmitNever_<{
	// 		[k in keyof O]: k extends keyof Default
	// 			? IsIdentical<O[k], Default[k]> extends true
	// 				? never
	// 				: O[k]
	// 			: never
	// 	}>,
	// ][0]

	// type A = Simplify<{ isReadonly: true }>
}
