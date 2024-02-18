// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomOperation } from './_/CustomCheck'
import type { CustomFix } from './_/CustomFix'

export interface SchemaOptions {
	/** Type-only (no value at runtime) */
	Output: unknown

	/** Type-only (no value at runtime) */
	Input: unknown

	/** Name for nicer messages */
	name?: string | undefined

	customFixes: readonly CustomFix[]
	customOperations: readonly CustomOperation[]

	isOptional: boolean
	isStrictOptional: boolean
	isReadonly: boolean

	hasDefault: boolean

	/** Currently not type-exposed */
	default: unknown

	getDefault: (() => unknown) | undefined
}

//

export declare namespace SchemaOptions {
	export interface Default extends SchemaOptions {
		Output: unknown
		Input: unknown

		customFixes: readonly []
		customOperations: readonly []

		isOptional: false
		isStrictOptional: false
		isReadonly: false
		hasDefault: false

		/** Currently not type-exposed */
		default: never

		getDefault: never
	}
}
