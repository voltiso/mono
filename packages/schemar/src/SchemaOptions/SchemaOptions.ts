// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomCheck, CustomFix } from '~'

export type SchemaOptions = {
	/** Type-only (no value at runtime) */
	Output: unknown

	/** Type-only (no value at runtime) */
	Input: unknown

	customChecks: readonly CustomCheck[]
	customFixes: readonly CustomFix[]

	isOptional: boolean
	isStrictOptional: boolean
	isReadonly: boolean
	hasDefault: boolean
	default: unknown
	getDefault: (() => unknown) | undefined
}
