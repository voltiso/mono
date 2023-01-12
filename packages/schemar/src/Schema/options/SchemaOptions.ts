// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomCheck } from './_/CustomCheck'
import type { CustomFix } from './_/CustomFix'

export type SchemaOptions = {
	/** Type-only (no value at runtime) */
	Output: unknown

	/** Type-only (no value at runtime) */
	Input: unknown

	/** Name for nicer messages */
	name?: string | undefined

	customChecks: readonly CustomCheck[]
	customFixes: readonly CustomFix[]

	isOptional: boolean
	isStrictOptional: boolean
	isReadonly: boolean

	hasDefault: boolean
	default: unknown
	getDefault: (() => unknown) | undefined
}

//

export declare namespace SchemaOptions {
	export interface Default extends SchemaOptions {
		Output: unknown
		Input: unknown
		customChecks: readonly []
		customFixes: readonly []
		isOptional: false
		isStrictOptional: false
		isReadonly: false
		hasDefault: false
		default: never
		getDefault: never
	}
}
